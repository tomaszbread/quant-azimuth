const { isCurrentYear } = require('./isCurrentYear');
const { isPreviousYear } = require('./isPreviousYear');
const { calculateTotalDaysFromSpecificYear } = require('./calculateTotalDaysFromSpecificYear');
const vacationType = { annuals: 30 };

function getLeaveAnnualVacationDays(list, dateOfEmployment) {

    var employmentInCurrentYear = isCurrentYear(dateOfEmployment);
    const annualVacations = list.filter(vac => vac.vacationType == vacationType.annuals);

    const annaulsFromCurrentYear = annualVacations.filter(annual => isCurrentYear(annual.vacationStartDate) || isCurrentYear(annual.vacationEndDate));
    const daysFromCurrent = annaulsFromCurrentYear.map(days => calculateTotalDaysFromSpecificYear(new Date(days.vacationStartDate), new Date(days.vacationEndDate), new Date().getFullYear()));
    const reduceDaysFromCurrent = daysFromCurrent.reduce((a, b) => a + b, 0);

    if (employmentInCurrentYear) {
        return 30 - reduceDaysFromCurrent;
    }

    const annaulsFromPreviousYear = annualVacations.filter(annual => isPreviousYear(annual.vacationStartDate) || isPreviousYear(annual.vacationEndDate));
    const daysFromPrev = annaulsFromPreviousYear.map(days => calculateTotalDaysFromSpecificYear(new Date(days.vacationStartDate), new Date(days.vacationEndDate), new Date().getFullYear() - 1));
    const reduceDaysFromPrev = daysFromPrev.reduce((a, b) => a + b, 0);

    const daysFromPreviusYear = Math.min(30 - reduceDaysFromPrev, 5);
    const leaveAnualsDays = (30 - reduceDaysFromCurrent) + daysFromPreviusYear;
    return leaveAnualsDays;
}

module.exports = { getLeaveAnnualVacationDays };
