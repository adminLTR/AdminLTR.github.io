/**
 * returns the age of a person that has been born in the given date
 * @param {Date | string} date date of birth
 */
function getAge(date) {
    const newDate = new Date(date);
    const today = new Date();
    const diff = today.getFullYear() - newDate.getFullYear();
    return diff
}