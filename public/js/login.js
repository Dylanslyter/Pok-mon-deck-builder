

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
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/deck');
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

            const response = await fetch('/api/signup', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                document.location.replace('/deck');
            } else {
                alert('Failed to sign up');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to sign up');
        }
    
    }
};

const loginButton = document.querySelector('#login');
loginButton.addEventListener('click', loginFormHandler)
