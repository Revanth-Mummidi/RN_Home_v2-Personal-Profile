function validatePassword(password) {
    // Check if password length is at least 6 characters
    if (password.length < 6) {
        return false;
    }

    // Check if password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return false;
    }

    // Check if password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        return false;
    }

    // Check if password contains at least one digit
    if (!/[0-9]/.test(password)) {
        return false;
    }

    // Check if password contains at least one special character
    if (!/[!@#$%^&*]/.test(password)) {
        return false;
    }

    // Password passed all validations
    return true;
}
function validateName(name) {
    if (name.length < 3) {
        return false;
    }

    // Check if name contains only alphabets
    // allow spaces and hyphens
    if (!/^[a-zA-Z\s-]+$/.test(name)) {
        return false;
    }
    

    // Name passed all validations
    return true;
}
//   export validatePassword;
export {
    validatePassword,
    validateName,
};