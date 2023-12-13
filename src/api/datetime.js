export function datePlusDays(date, offset=1) {
    let offsetDate = new Date(date);
    offsetDate.setDate(offsetDate.getDate() + offset);
    return offsetDate;
}