import ImageColors from 'react-native-image-colors';

const FetchColors = async (ImgBase64, image, setColors, setLoading) => {
  let result;
  if (ImgBase64) {
    result = await ImageColors.getColors('data:image/gif;base64,' + ImgBase64, {
      fallback: '#000000',
      quality: 'low',
      pixelSpacing: 5,
      headers: {
        authorization: 'Basic 123',
      },
    });
  } else {
    result = await ImageColors.getColors(image, {
      fallback: '#000000',
      quality: 'low',
      pixelSpacing: 5,
      cache: true,
      headers: {
        authorization: 'Basic 123',
      },
    });
  }

  switch (result.platform) {
    case 'android':
    case 'web':
      setColors({
        colorOne: {value: result.dominant, name: 'dominant'},
        colorTwo: {value: result.average, name: 'average'},
        colorThree: {value: result.vibrant, name: 'vibrant'},
        colorFour: {value: result.darkVibrant, name: 'darkVibrant'},
        colorFive: {value: result.lightVibrant, name: 'lightVibrant'},
        colorSix: {value: result.darkMuted, name: 'darkMuted'},
        colorSeven: {value: result.lightMuted, name: 'lightMuted'},
        colorEight: {value: result.muted, name: 'muted'},
        rawResult: JSON.stringify(result),
      });
      break;
    case 'ios':
      setColors({
        colorOne: {value: result.background, name: 'background'},
        colorTwo: {value: result.detail, name: 'detail'},
        colorThree: {value: result.primary, name: 'primary'},
        colorFour: {value: result.secondary, name: 'secondary'},
        rawResult: JSON.stringify(result),
      });
      break;
    default:
      throw new Error('Unexpected platform');
  }

  setLoading(false);
};

export default FetchColors;
