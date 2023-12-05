import {BaseToast, ErrorToast} from 'react-native-toast-message';
export const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
      style={
        {
          // borderLeftColor: 'green',
        }
      }
      contentContainerStyle={{
        backgroundColor: '#C5F7DD',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
      style={
        {
          // borderLeftColor: 'red',
        }
      }
      contentContainerStyle={{
        backgroundColor: '#F1B2AD',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
      }}
    />
  ),
  info: props => (
    <BaseToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
      style={{
        borderLeftColor: 'blue',
      }}
      contentContainerStyle={{
        backgroundColor: '#CCE3FD',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
      }}
    />
  ),
  warning: props => (
    <BaseToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
      style={{
        borderLeftColor: 'orange',
        borderRightColor: 'orange',
      }}
      contentContainerStyle={{
        backgroundColor: '#FCE7C3',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
      }}
    />
  ),
};
