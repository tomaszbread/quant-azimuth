function isPreviousYear(date) {
    const previousYear = new Date().getFullYear() - 1;
    return new Date(date).getFullYear() === previousYear;
}

module.exports = { isPreviousYear };