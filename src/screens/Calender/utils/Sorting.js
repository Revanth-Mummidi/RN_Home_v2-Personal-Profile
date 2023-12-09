export const sortByConfirmDate=(objectsArray, ascending = true)=> {
    return objectsArray.slice().sort((a, b) => {
      const dateA = new Date(a.confirm_date);
      const dateB = new Date(b.confirm_date);
      return ascending ? dateA - dateB : dateB - dateA;
    });
  }
export const filterObjectsFromDate= (objectsArray, fromDate)=> {
    const fromDateObj = new Date(fromDate);
    return objectsArray.filter(obj => {
      const confirmDateObj = new Date(obj.confirm_date);
      if(confirmDateObj.toLocaleDateString()==fromDateObj.toLocaleDateString())
      {
        return true;
      }
      else 
      {
        return confirmDateObj>fromDateObj;
      }
    });
  }

  export const filterObjectsFromDatePrev= (objectsArray, fromDate)=> {
    
    const fromDateObj = new Date(fromDate);
    // console.log("IN OREVIOUS",fromDateObj.toDateString());
    let arr= objectsArray.filter(obj => {
      const confirmDateObj = new Date(obj.confirm_date);
      if(confirmDateObj.toLocaleDateString()==fromDateObj.toLocaleDateString())
      {
        return false;
      }
      else 
      {
        return confirmDateObj<fromDateObj;
      }
    });
    // console.log("array=",arr[0].confirm_date);
    return arr;
  }