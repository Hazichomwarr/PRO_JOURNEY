const isLeapYear = (year) => {
    if (year % 4 === 0) {
        if ((year % 100 === 0) && (year % 400 !== 0)) {
            return `${year} is not a leap year.`;
        }
        return `${year} is a leap year.`;
    }
    return `${year} is not a leap year.`;
}

const year = 2021;