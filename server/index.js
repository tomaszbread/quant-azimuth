const path = require('path');
const { getLeaveAnnualVacationDays } = require('./domain/getLeaveAnnualVacationDays');
const { getClosestVacation } = require('./domain/getClosestVacation');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const vacationType = { annuals: 30 };

const env = {
  port: 3000
};
server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

const TOKENS = {
  /* User 1 - Admin */
  'Bearer f1r57u53rv4l1d4dm1n70k3n_2': 1,
  /* User 3 - Regular User */
  'Bearer 7h1rdr36ul4ru53rv4l1d70k3n_3': 3,
};

const jwt = require('jsonwebtoken');
const { ConsoleReporter } = require('jasmine');

server.post('/login', (req, res, next) => {
  if (!req.body.username && !req.body.password) {
    res.send(400, 'Username and Password required');
  }

  const user = router.db.get('users')
    .find({
      username: req.body.username,
      password: req.body.password
    }).value();

  const password = router.db.get('users')
    .find({
      password: req.body.password
    }).value();

  if (!user && !password) {
    res.send(403, 'Username or password invalid');
  }

  const token = jwt.sign(user, 'secret cat');

  res.jsonp({
    token,
    user,
    roles: user.roles
  });
});


server.get('/employees', (req, res, next) => {
  const employees = router.db.get('employees').value();
  const vacations = router.db.get('vacations').value();

  const employeesList = employees.map(emp => {
    emp = Object.assign({}, emp);
    const today = new Date();
    const vacationForEmloyee = vacations.filter(v => v.employeeId == emp.id && v.vacationType == vacationType.annuals);
    const vacationStartDates = vacationForEmloyee.map(res => new Date(res.vacationStartDate));
    emp.remainingAnnualVacationDays = getLeaveAnnualVacationDays(vacationForEmloyee, emp.dateOfEmployment);
    emp.closestVacation = getClosestVacation(vacationStartDates, today);
    return emp;
  });

  res.jsonp(employeesList);
});

server.get('/leaveAnnualVacationDays', (req, res, next) => {
  const employee = router.db.get('employees').filter(emp => emp.id == Number(req.query.employeeId)).first().value();
  const vacationForEmloyee = router.db.get('vacations').filter(v => v.employeeId == Number(req.query.employeeId) && v.vacationType == vacationType.annuals).value();
  const remainingAnnualVacationDays = getLeaveAnnualVacationDays(vacationForEmloyee, employee.dateOfEmployment);
  res.jsonp(remainingAnnualVacationDays);
});


server.use((req, res, next) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    const token = req.get('Authorization').replace('Bearer ', '');
    const user = jwt.decode(token);

    if (!user) {
      res.send(401, 'Invalid Token - Only accepting Authorization: Bearer {valid_token}');
    } else if (!req.body.userId) {
      req.body.userId = user.id;
      next();
    } if (req.body.userId !== user.id) {
      res.send(403, 'Access denied. User can only edit own resources');
    }
  } else {
    next();
  }
});


// AutoAdd createdAt field
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }
  next();
});

server.use(router);
server.listen(env.port, () => {
  console.log('JSON Server is running on http://localhost:' + env.port + '/');
});

