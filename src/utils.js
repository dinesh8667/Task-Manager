export function dateFormatter(date) {
    const formattedDate = date.split('-').reverse().join('-');
    return formattedDate;
}