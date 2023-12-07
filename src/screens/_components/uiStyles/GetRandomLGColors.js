

export default function getRandomLGColor() {
        // Example usage:
  const colorArray1 = ['#3498db', '#2ecc71', '#e74c3c'];
  const colorArray2 = ['#ffcc00', '#9933cc', '#ff6666'];
  
    const colorInd1= Math.random() % colorArray1.length;
    const RandomLinearColor1=colorArray1[colorInd1];
    const colorInd2= Math.random() %colorArray2.length;
    const RandomLinearColor2=colorArray2[colorInd2]; 
    const c1='#3498db';
    const c2='#9933cc'; 
    // return {c1,c2};
    return {RandomLinearColor1,RandomLinearColor2};
  }
  

  
