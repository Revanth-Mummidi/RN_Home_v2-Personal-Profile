import axios from "axios";
// export async function getData(){
               
//   var h = [];
  

  
  
//     const apiURL = 'https://app.evaluatehealth.world/tracker/Tracker/globalDocuments'
//     const authToken= 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjk2NTExMDc2LCJqdGkiOiI4ZGVjNGExMi1hNTcxLTRjNDEtOTRlZC05NzI3MDg1M2YyYjAiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMDkxMDAwMDAwMDA0NiIsIm5iZiI6MTY5NjUxMTA3Nn0.MYdqBgz6_-Ru8b1Mu1B8286aknzkTZ9DRyq7cVBcchM'   
//       console.log(`Bearer ${authToken}`);
//     const response = await axios.post(apiURL,{} ,{
//       headers: {
//         Authorization: `Bearer ${authToken}`, // Set the content type for the FormData
//       },
//     });
//     // console.log(response.data)
//       h =  response.data;
//      return h;

//   }
  

import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export async function getData() {
  var cachedData = null;

  // Check if data is cached
  try {
    const cachedDataJSON = await AsyncStorage.getItem('cachedData');
    if (cachedDataJSON) {
      cachedData = await JSON.parse(cachedDataJSON);
    }
  } catch (error) {
    console.error('Error loading cached data:', error);
  }

  // If cached data is available, return it
  if (cachedData) {
    console.log('returning cacheddata')
    return cachedData;
  }
  else{

  // If not cached, make the API request
  const apiURL = 'https://app.evaluatehealth.world/tracker/Tracker/globalDocuments';
  const authToken= 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjk2NTExMDc2LCJqdGkiOiI4ZGVjNGExMi1hNTcxLTRjNDEtOTRlZC05NzI3MDg1M2YyYjAiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMDkxMDAwMDAwMDA0NiIsIm5iZiI6MTY5NjUxMTA3Nn0.MYdqBgz6_-Ru8b1Mu1B8286aknzkTZ9DRyq7cVBcchM'   


  try {

    console.log("FETCING FROM THE API")
    const response = await axios.post(apiURL, {}, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    // Cache the response.data
    await AsyncStorage.setItem('cachedData', JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
}

  