import moment from "moment";
export const monthsArr=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
export const toMonth = month => {
  return monthsArr[month];
};
export const WeeksArr=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
export const ConvertDateTimeToCompleteString = (newDate, newTime) => {
  return (
    newDate.getDate() + ' ' + toMonth(newDate.getMonth()) + ' ' + newDate.getFullYear() + ' , ' + TimeWithAmAndPM(newTime)
  );
};

export const durationFormat=(startTime)=>{
  return startTime.slice(0,-6)+startTime.slice(-3,startTime.length);
 }
export const FormatDateAndTime = inputDate => {
  const day = inputDate.getDate().toString().padStart(2, '0');
  const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
  const year = inputDate.getFullYear();
  const hours = inputDate.getHours().toString().padStart(2, '0');
  const minutes = inputDate.getMinutes().toString().padStart(2, '0');
  const seconds = inputDate.getSeconds().toString().padStart(2, '0');

  return {
    date: `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`,
    time: `${hours}:${minutes}:${seconds}`,
  };
};

export const ConvertStringToDate = (dateString) => {
  const [datePart, timePart] = dateString.split(' ');
  const [day, month, year] = datePart.split('/');
  const [hours, minutes, seconds] = timePart.split(':');

  // Note: Months in JavaScript Date are 0-based, so we subtract 1 from the month
  return new Date(year, month - 1, day, hours, minutes, seconds);
};

export const TimeWithAmAndPM = newTime => {
  return newTime.toLocaleString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export const DateTimeCompleteString=(inputString)=> {
    const formattedDate = moment(inputString, 'DD/MM/YYYY HH:mm:ss').format('DD MMM YYYY , h:mm A');
    return formattedDate;
  }

export const AddTimeToDate=(newDate,newTime)=>{
    let t1=newDate;
    t1.setHours(newTime.getHours());
    t1.setMinutes(newTime.getMinutes());
    t1.setSeconds(newTime.getSeconds());
    return t1;
}