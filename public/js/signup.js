const validateInput = (email, password) => {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }
    return true;
}


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

const signUpButton = document.querySelector('#signup')
signUpButton.addEventListener('click', signupFormHandler)