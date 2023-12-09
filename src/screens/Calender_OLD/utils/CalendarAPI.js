import axios from 'axios';

const URL = 'https://app.evaluatehealth.world/main/';

export const Calendar_Base_URLs = {
  Save_Event_URL:'https://app.evaluatehealth.world/calendar/calender/saveEvent',
}
const queryParams={
  event_name: 'Another Medicines',
  start_date: '10/10/2023 10:50:21',
  end_date: '20/10/2023 10:50:21',
  start_time: '10:50:21',
  end_time: '12:50:21',
  status: 'confirmed',
  details: 'Task Details',
  priority: 1,
  eh_user_id: '0910000000046',
  repetation: '10',
  repetation_criteria: 'day',
  occurance: '10',
  colour_code:'#7DF2FA',
  }

  const types=queryParams.prop

export const calendarSaveEvent=async (calendarSaveEventData,authorization)=>{
  try{
    const response = await axios.post(Calendar_Base_URLs.Save_Event_URL,calendarSaveEventData,{
       headers:{
        Authorization:authorization,
       }
    });

    if(response && response.data)
    {
      return response.data;
    }
    else{
      throw new Error('Failed to post saved event');
    }
  } catch(error){
    console.error('Error Posting Save Event:',error);
    throw error;
  }
}


