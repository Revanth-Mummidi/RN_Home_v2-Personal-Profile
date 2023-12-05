// import React, { useEffect, useState } from 'react';
// import Geolocation from 'react-native-geolocation-service';
// import axios from 'axios';
// import {  PermissionsAndroid } from 'react-native';
// import { infoToast } from '../../screens/_components/toast/toast';

// export const RequestLocationPermission = async () => {
//     {
//         try {
//             const granted = await PermissionsAndroid.request(
//                 PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//                 {
//                     'title': 'Example App',
//                     'message': 'Example App access to your location '
//                 }
//             )
//             if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//                 infoToast('Info', 'Location permission denied');
//             }
//         } catch (err) {
//             console.warn(err)
//         }
//     }
// }
// export const CityFetcher = () => {
//     console.log('position: ');
//     Geolocation.getCurrentPosition(
//         (position) => {
//             const { latitude, longitude } = position.coords;
//             if(latitude && longitude){
//                 return {latitude,longitude} ;
//             }
//             console.log('position: ', position.coords);
//             axios
//                 .get(
//                     `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`
//                 )
//                 .then((response) => {
//                     console.log('geocode: ', response.data);
//                     const results = response.data.results;
//                     if (results.length > 0) {
//                         const addressComponents = results[0].address_components;
//                         const cityComponent = addressComponents.find((component) =>
//                             component.types.includes('locality')
//                         );
//                         if (cityComponent) {
//                             console.log('city: ', cityComponent.long_name);
//                         }
//                     }
//                 })
//                 .catch((error) => {
//                     console.log('Error fetching city: ', error);
//                 });
//         },
//         (error) => {
//             console.log('Error fetching location: ', error);
//         },
//         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
// };