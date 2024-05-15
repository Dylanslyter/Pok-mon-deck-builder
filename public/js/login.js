const bcrypt = require('bcrypt');

const hashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const validateInput = (email, password) => {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }
    return true;
}


const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim(); //need to find the id of the email input
    const password = document.querySelector('#password-login').value.trim(); //need to find the id of the password input. also is it best practice to .trim() here?

    try {
        validateInput(email, password);
        const hashedPassword = await hashedPassword(password);
        const response = await fetch('controllers/api/authController', {
            method: 'POST',
            body: JSON.stringify({ email, hashedPassword }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/main');
        } else {
            alert('Failed to log in');
        }
    } catch (error) {
        console.error(error);
        alert('Failed to log in');
    }
};


const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-signup').value.trim(); //need to find the id of the name input
    const email = document.querySelector('#email-signup').value.trim(); //need to find the id of the email input
    const password = document.querySelector('#password-signup').value.trim(); //need to find the id of the password input

    if (name && email && password) {
        try {
            validateInput(email, password);
            const hashedPassword = await hashedPassword(password);
            const response = await fetch('controllers/api/authController', {
                method: 'POST',
                body: JSON.stringify({ name, email, hashedPassword }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                document.location.replace('/main');
            } else {
                alert('Failed to sign up');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to sign up');
        }
    
    }
};


