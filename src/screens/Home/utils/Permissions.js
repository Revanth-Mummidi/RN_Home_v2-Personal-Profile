
import { PermissionsAndroid } from 'react-native';
import {launchCamera,launchImageLibrary,ImagePicker} from 'react-native-image-picker'
import Contacts from 'react-native-contacts';
import Geolocation from '@react-native-community/geolocation';

export async function getAllContacts() {
  try {
    const permission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS
    );
    if (permission === 'granted') {
      const allContacts = await Contacts.getAll();
      const contactDict = {};
      const contactSections = [];

      allContacts.forEach((contact) => {
        if (contact.displayName != null) {
          const firstLetter = contact.displayName.charAt(0).toUpperCase();

          if (!contactDict[firstLetter]) {
            contactDict[firstLetter] = [];
          }

          contactDict[firstLetter].push(contact);
        }
      });

      Object.keys(contactDict).forEach((letter) => {
        contactSections.push({
          title: letter,
          data: contactDict[letter],
        });
      });

      contactSections.sort((a, b) => a.title.localeCompare(b.title));

      return contactSections;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return []; 
  }
}

export const requestMediaPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      {
        title: 'Example App',
        message: 'Example App access to your Media ',
      },
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      // setMsg('Media Permission Denied');
      // setVisibleToast(true);
    } else {
      console.log("DUCEESS")
      // setMediaPermissionGranted(true);
      // requestDocumentPermission();
    }
  } catch (err) {
    console.warn(err);
  }
};
export async function requestLocationPermission() {
  let ret = false;
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      ret = true;
    } else {
      console.log('You cannot use Geolocation');
      ret = false;
    }
  } catch (err) {
    ret = false;
    console.log("GEO LOCATIOM ERROR",err);
  }
  return ret;
}

export async function requestCameraPermission () {
    let ret = false;
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        
        if( granted === PermissionsAndroid.RESULTS.GRANTED){
            ret = true;
            console.log('success')
        }
      } catch (err) {
        console.warn(err);
        ret = false;
      }
    }

    return ret;
  };

  export const getLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        error => {
          console.log('Error getting location:', error);
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    });
  };

  export async function requestExternalWritePermission () {
    let ret = false;
    if (Platform.OS === 'android') {
      try {
        
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        console.log(granted)
        if(granted === PermissionsAndroid.RESULTS.GRANTED){
            ret = true;
            
        }
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      //ret = false;
    } 
    return ret;
  };

 export const requestMicrophonePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Example App',
          message: 'Example App access to your Microphone ',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        // setMsg('Microphone Permission Denied');
        // setVisibleToast(true);
      } else {
       console.log("success");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  export async function selectFile() {
    var newSelectedImages = [];
    var options = {
      title: 'Select Image',
      quality:100,
      selectionLimit: 5,
      customButtons: [
        { 
          name: 'customOptionKey', 
          title: 'Choose file from Custom Option' 
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    
   await launchImageLibrary(options, res => {
     if (res.didCancel) {
      console.log('User cancelled image -------picker');
    } else if (res.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (res.customButton) {
      console.log(
        'User tapped custom button: ',
        res.customButton
      );
      alert(res.customButton);
    }else{
         newSelectedImages = res.assets;
      }
    });
    console.log(newSelectedImages)
    return newSelectedImages;
  };

 export  async function selectImageFromCamera()  {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

   const res = await launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response.assets)
         return response.assets;
      }
      return response;
    });

    return res;
  };

  

 export const requestDocumentPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Example App',
          message: 'Example App access to your Storage ',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        setMsg('Storage Permission Denied');
        setVisibleToast(true);
      } else {
        setStoragePermissionGranted(true);
        requestMicrophonePermission();
      }
    } catch (err) {
      console.warn(err);
    }
  };
