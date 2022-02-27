function getClosestVacation(dates, target) {
    if (!target) target = Date.now();
    else if (target instanceof Date) target = target.getTime();

    var nearest = Infinity;
    var resDate = "";

    dates.forEach(function (date, index) {
        if (date instanceof Date) date = date.getTime();
        var distance = Math.abs(date - target);
        if (distance < nearest) {
            nearest = distance;
            resDate = new Date(date);
        }
    });

    return resDate;
}
module.exports = { getClosestVacation };