function calculateTotalDaysFromSpecificYear(startDate, endDate, year) {
    if (new Date(startDate).getFullYear() < year) {
        startDate = new Date(year, 0, 1);
    }
    if (new Date(endDate).getFullYear() > year) {
        endDate = new Date(year, 11, 31);
    }
    const hour = 1000 * 60 * 60;
    const day = hour * 24;
    const differenceMs = Math.abs(endDate - startDate);
    const vacationDays = Math.round(differenceMs / day) + 1;
    return vacationDays;
}

module.exports = { calculateTotalDaysFromSpecificYear };

