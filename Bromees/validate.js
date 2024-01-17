function resetForm() {
  document.getElementById('firstName').value = '';
  document.getElementById('lastName').value = '';
  document.getElementById('email').value = '';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  document.getElementById('confirmPassword').value = '';
}


function validateForm() {
    var firstName = document.getElementById('firstName').value.trim();
    var lastName = document.getElementById('lastName').value.trim();
    var email = document.getElementById('email').value.trim();
    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value.trim();
    var confirmPassword = document.getElementById('confirmPassword').value.trim();
  
    if (firstName === '' || lastName === '' || email === '' || username === '' || password === '' || confirmPassword === '') {
      alert('All fields must be filled out');
      return false;
    }
  
    // Email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email format');
      return false;
    }
  
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return false;
    }
      var apiUrl = ' http://localhost:3002/register';
      var data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: password
    };
  
    // Perform the API call using fetch method
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(apiResponse => {
      if(apiResponse.code===201){
        showModal(apiResponse);
      } else {
        alert(apiResponse.msg);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('There was an error submitting the form.');
      resetForm();
    });
      return false;
  }

 // Function to show the modal with content
function showModal(apiResponse) {
  const modal = document.getElementById('myModal');
  const modalFirstName = document.getElementById('modalFirstName');
  const modalLastName = document.getElementById('modalLastName');
  const modalUsername = document.getElementById('modalUsername');
  const modalEmail = document.getElementById('modalEmail');

  // Set the content of the modal
  modalFirstName.textContent = apiResponse.userData.firstName;
  modalLastName.textContent = apiResponse.userData.lastName;
  modalUsername.textContent = apiResponse.userData.username;
  modalEmail.textContent = apiResponse.userData.email;
  modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById('myModal');
  modal.style.display = 'none';
  resetForm();
}
  