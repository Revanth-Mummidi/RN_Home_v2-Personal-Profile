
import Toast from 'react-native-toast-message';
function successToast(text1, text2) {
    Toast.show({
        type: 'success',
        text1: text1,
        text2: text2,
        position: 'bottom',
        visibilityTime: 2000,
        autoHide: true,
    });
}
function errorToast(text1, text2) {
    Toast.show({
        type: 'error',
        text1: text1,
        text2: text2,
        position: 'bottom',
        visibilityTime: 3000,
    });
}
function infoToast(text1, text2) {
    Toast.show({
        type: 'info',
        text1: text1,
        text2: text2,
        position: 'bottom',
        visibilityTime: 3000,
        autoHide: true,
    });
}
function warningToast(text1, text2) {
    Toast.show({
        type: 'warning',
        text1: text1,
        text2: text2,
        position: 'bottom',
        visibilityTime: 3000,
        autoHide: true,
    });
}

export {
    successToast,
    errorToast,
    infoToast,
    warningToast
};