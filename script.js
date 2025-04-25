    // Select elements
const lengthInput = document.getElementById("lenth");
const passwordInput = document.getElementById("password");
const generateBtn = document.querySelectorAll("button")[0];
const copyBtn = document.querySelectorAll("button")[1];

// Create alert message element
const alertBox = document.createElement("p");
alertBox.style.color = "red";
alertBox.style.marginBottom = "15px";
alertBox.style.fontSize = "0.9rem";
alertBox.style.display = "none";

// Insert alert box before the generate button
generateBtn.parentElement.insertBefore(alertBox, generateBtn);

// Allow only numbers in the length input
lengthInput.addEventListener("input", () => {
    lengthInput.value = lengthInput.value.replace(/[^0-9]/g, "");
});

// Password generator function
function generatePassword(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}

// Generate Password Button
generateBtn.addEventListener("click", () => {
    const length = parseInt(lengthInput.value);

    if (!lengthInput.value) {
        alertBox.textContent = "Please enter a password length.";
        alertBox.style.color = "red";
        alertBox.style.display = "block";
        passwordInput.value = "";
        return;
    }

    if (length < 6) {
        alertBox.textContent = "Password length must be at least 6 characters.";
        alertBox.style.color = "red";
        alertBox.style.display = "block";
        passwordInput.value = "";
        return;
    }

    // Clear alert and generate password
    alertBox.style.display = "none";
    const newPassword = generatePassword(length);
    passwordInput.value = newPassword;
});

// Copy to Clipboard Button
copyBtn.addEventListener("click", () => {
    const password = passwordInput.value;
    if (password === "") {
        alertBox.textContent = "Nothing to copy. Generate a password first.";
        alertBox.style.color = "red";
        alertBox.style.display = "block";
        return;
    }

    navigator.clipboard.writeText(password).then(() => {
        alertBox.textContent = "Password copied to clipboard!";
        alertBox.style.color = "green";
        alertBox.style.display = "block";
    }).catch(() => {
        alertBox.textContent = "Failed to copy password.";
        alertBox.style.color = "red";
        alertBox.style.display = "block";
    });
});
