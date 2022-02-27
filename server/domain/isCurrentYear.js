function isCurrentYear(date) {
    const currentYear = new Date().getFullYear();
    return new Date(date).getFullYear() === currentYear;
}
module.exports = { isCurrentYear };