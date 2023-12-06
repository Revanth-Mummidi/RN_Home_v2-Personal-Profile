//Changed
export const BMIconverter=(weight,height)=>{
    const bmi = weight / Math.pow(height / 100, 2);
    
    return bmi;
};

export const parseDateString=(dateString)=>{
    // Split the string into year, month, and day components
    const [year, month, day] = dateString.split("-").map(Number);
  
    // Create a Date object using the components (subtract 1 from month as months are zero-based in JavaScript)
    const parsedDate = new Date(year, month - 1, day);
  
    // Check if the Date object is valid
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date string");
    }
  
    return parsedDate;
  }