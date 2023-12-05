import { warningToast } from "../../screens/_components/toast/toast";

export const calculateAgeFromDate = (date) => { 
    const dateParts = date.split("-");
    // Create a new Date object with the provided date parts
    const selectedDate = new Date(
        parseInt(dateParts[0]),  // Year
        parseInt(dateParts[1]) - 1,  // Month (subtract 1 as months are zero-based)
        parseInt(dateParts[2])  // Day
    );
    const currentDate = new Date();
    let age = currentDate.getFullYear() - selectedDate.getFullYear();
    const monthDifference = currentDate.getMonth() - selectedDate.getMonth();

    if (
        monthDifference < 0 ||
        (monthDifference === 0 && currentDate.getDate() < selectedDate.getDate())
    ) {
        age--;
    }
    console.log(age);
    return age;
};

export const convertDateToString = (date) => {
    console.log(date);
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    const dateString = [year, month, day].join('-');
    console.log(dateString);
    return dateString;
}