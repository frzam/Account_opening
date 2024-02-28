document.addEventListener('DOMContentLoaded', function () {
  const nationalityDropdown = document.getElementById('nationality');
  const countries = getAllCountries();
  
  countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country;
    option.textContent = country;
    nationalityDropdown.appendChild(option);
  });
});

    function getAllCountries() {
    return ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
  }
  
  function submitForm() {
    const formData = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      middleName: document.getElementById('middleName').value,
      dob: document.getElementById('dob').value,
      nationality: document.getElementById('nationality').value,
      idNumber: document.getElementById('idNumber').value,
      mobileNumber: document.getElementById('mobileNumber').value,
      addressLine1: document.getElementById('addressLine1').value,
      addressLine2: document.getElementById('addressLine2').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      pinCode: document.getElementById('pinCode').value,
    };
  
    // Validation error messages
    const validationErrors = {};
  
    // Validate all required fields
    for (const key in formData) {
      if (!formData[key]) {
        validationErrors[key] = `Please fill in the ${key} field.`;
      }
    }
  
    // Validate ID Number
    const isIdNumberValid = /^[a-zA-Z0-9]{12}$/.test(formData.idNumber);
    if (!isIdNumberValid) {
      validationErrors.idNumber = 'Please enter a valid Aadhaar or Passport number .';
    }
  
    // Validate Mobile Number
    const isMobileNumberValid = /^[0-9]{10}$/.test(formData.mobileNumber);
    if (!isMobileNumberValid) {
      validationErrors.mobileNumber = 'Please enter a valid 10-digit mobile number.';
    }
  
    // Display validation error messages
    for (const key in validationErrors) {
      const errorElement = document.getElementById(`${key}Error`);
      if (errorElement) {
        errorElement.textContent = validationErrors[key];
      }
    }
  
    // Check if there are validation errors
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
  
    //with form submission
    fetch('/submit-application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        console.error('Error submitting application:', error);
        alert('Error submitting application. Please try again.');
      });
  
    // Clear form fields
    clearForm();
  }
  
  
  let currentUser = null;

// URL of the node application
const apiUrl = 'http://localhost:3000';

// This function is called on login().
function login() {
  //with form submission
  var path = '/login'

  var loginData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
      };
      // Send req localhost:3306/login
      fetch(apiUrl+path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(loginData),  
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.status);
        if (data.status == 'Successful'){
          alert('Login successful. Welcome!');
        }else{
          alert('Login Failed.');
        }})
      .catch((error) => {
        console.error('Error submitting application:', error);
        alert('Error submitting application. Please try again.');
      });
    }
  // let currentUser = null;
  // console.log('csrUsername: ', csrUsername)
  // if (
  //   (usernameInput === csrUsername && passwordInput === csrPassword) ||
  //   (usernameInput === branchManagerUsername && passwordInput === branchManagerPassword)
  // ) {
  //   // Set the current user based on the entered credentials
  //   currentUser = {
  //     username: usernameInput,
  //     role: usernameInput === csrUsername ? 'csr' : 'branchmanager',
  //   };

  //   // Successful login
  //   alert(`Login successful. Welcome, ${currentUser.username}!`);

  //   // Hide the login form
  //   document.getElementById('loginForm').style.display = 'none';

  //   // Show the appropriate UI based on the user role
  //   if (currentUser.role === 'csr') {
  //     document.getElementById('csrDashboard').style.display = 'block';
  //   } else if (currentUser.role === 'branchmanager') {
  //     document.getElementById('branchManagerUI').style.display = 'block';
  //     loadApplications();
  //   }
  // } else {
  //   // Failed login
  //   alert('Invalid username or password. Please try again.');
  // }



function openNewAccount() {
  
  document.getElementById('csrDashboard').style.display = 'none';
  document.getElementById('branchManagerUI').style.display = 'none';

  // Show the account opening form
  document.getElementById('accountFormContainer').style.display = 'block';
}


function submitForm() {
    const newApplication = {
      id: generateApplicationId(),
      firstName: document.getElementById('firstName').value,
      middleName: document.getElementById('middleName').value,
      lastName: document.getElementById('lastName').value,
      dob: document.getElementById('dob').value,
      nationality: document.getElementById('nationality').value,
      idNumber: document.getElementById('idNumber').value,
      mobileNumber: document.getElementById('mobileNumber').value,
      addressLine1: document.getElementById('addressLine1').value,
      addressLine2: document.getElementById('addressLine2').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      pinCode: document.getElementById('pinCode').value,
      status: 'Pending Approval',
    
    };
       // Check if any field is empty
       for (const key in newApplication) {
        if (newApplication[key] === '') {
            alert(`Please fill in all fields.`);
            return; 
        }
    }

  // Load existing applications 
  let applications = JSON.parse(localStorage.getItem('applications')) || [];
  applications.push(newApplication);

  // Save applications 
  localStorage.setItem('applications', JSON.stringify(applications));

  // Notify CSR form submission
  alert('Application submitted successfully. Case assigned to Branch Manager.');

  // Clear form fields
  clearForm();

  // Reload applications for the Branch Manager
  loadApplications();
}

function loadApplications() {
  const applicationsList = document.getElementById('applicationsList');
  applicationsList.innerHTML = ''; // Clear the list before loading

  // Load existing applications 
  let applications = JSON.parse(localStorage.getItem('applications')) || [];

  // Display applications in the list
  applications.forEach(application => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<button type="button" class="btn btn-link" onclick="viewDetails(${application.id})">${application.firstName} ${application.lastName} - ${application.status}</button>`;
    applicationsList.appendChild(listItem);
  });
}

function viewDetails(applicationId) {
    
    let applications = JSON.parse(localStorage.getItem('applications')) || [];
  
    // Find the selected application
    const selectedApplication = applications.find(application => application.id === applicationId);
  
    const detailsMessage = `Details for Application #${applicationId}:
    First Name: ${selectedApplication.firstName}
    Last Name: ${selectedApplication.middleName || 'N/A'}
    Middle Name: ${selectedApplication.lastName || 'N/A'}
    Date of Birth: ${selectedApplication.dob || 'N/A'}
    Nationality: ${selectedApplication.nationality || 'N/A'}
    ID Number: ${selectedApplication.idNumber || 'N/A'}
    Mobile Number: ${selectedApplication.mobileNumber || 'N/A'}
    Address Line 1: ${selectedApplication.addressLine1 || 'N/A'}
    Address Line 2: ${selectedApplication.addressLine2 || 'N/A'}
    City: ${selectedApplication.city || 'N/A'}
    State: ${selectedApplication.state || 'N/A'}
    Pin Code: ${selectedApplication.pinCode || 'N/A'}
    Status: ${selectedApplication.status}
    Account Number: ${selectedApplication.accountNumber || 'Not Generated yet'}`;

    
    // Display details
    alert(detailsMessage);
    
    // Display approve/reject buttons
    const approveButton = document.createElement('button');
    approveButton.textContent = 'Approve';
    approveButton.className = 'btn btn-success';
    approveButton.onclick = () => approveApplication(selectedApplication.id);
    
    const rejectButton = document.createElement('button');
    rejectButton.textContent = 'Reject';
    rejectButton.className = 'btn btn-danger';
    rejectButton.onclick = () => rejectApplication(selectedApplication.id);
  
    // Clear previous buttons
    const actionsContainer = document.getElementById('actionsContainer');
    actionsContainer.innerHTML = '';
    
  
    actionsContainer.appendChild(approveButton);
    actionsContainer.appendChild(rejectButton);
  }
  

function approveApplication(applicationId) {
    
    let applications = JSON.parse(localStorage.getItem('applications')) || [];
    const applicationIndex = applications.findIndex(app => app.id === applicationId);
  
    if (applications[applicationIndex].status === 'Pending Approval') {
      applications[applicationIndex].status = 'Approved';
      applications[applicationIndex].accountNumber = generateAccountNumber();
  
      
      localStorage.setItem('applications', JSON.stringify(applications));
  
      // Display approval details
      const approvedApplication = applications[applicationIndex];
      alert(`Application approved. Account number generated: ${approvedApplication.accountNumber}`);
    } else {
      alert('Application has already been processed.');
    }
  
    // Reload applications for the Branch Manager
    loadApplications();
  }
  
  function generateAccountNumber() {
  
    return Math.floor(Math.random() * 10000000000) + 10000000000;
  
}


function rejectApplication(applicationId) {
    let applications = JSON.parse(localStorage.getItem('applications')) || [];
    const applicationIndex = applications.findIndex(app => app.id === applicationId);
    
    if (applications[applicationIndex].status === 'Pending Approval') {
      applications[applicationIndex].status = 'Rejected';
      alert('Application rejected.');
    } else {
      alert('Application has already been processed.');
    }
  
    // Remove the rejected application from the list
    applications = applications.filter(app => app.status !== 'Rejected');
    
    // Save updated applications 
    localStorage.setItem('applications', JSON.stringify(applications));
  
    // Reload applications for the Branch Manager
    loadApplications();
  }
  

function clearForm() {
 
  document.getElementById('firstName').value = '';
  document.getElementById('lastName').value = '';
  document.getElementById('middleName').value = '';
  document.getElementById('dob').value = '';
  document.getElementById('nationality').value = '';
  document.getElementById('idNumber').value = '';
  document.getElementById('mobileNumber').value = '';
  document.getElementById('addressLine1').value = '';
  document.getElementById('addressLine2').value = '';
  document.getElementById('city').value = '';
  document.getElementById('state').value = '';
  document.getElementById('pinCode').value = '';

}

function generateApplicationId() {
  // Use a more robust method, like a timestamp combined with a random component
  return Date.now() + Math.floor(Math.random() * 1000);
}


function clearApplications() {
  // Clear applications in local storage
  localStorage.removeItem('applications');

  // Clear the applications list on the UI
  document.getElementById('applicationsList').innerHTML = '';

  const actionsContainer = document.getElementById('actionsContainer');
  actionsContainer.innerHTML = '';
}


function goBack() {
  // Hide all UI elements
  document.getElementById('csrDashboard').style.display = 'none';
  document.getElementById('branchManagerUI').style.display = 'none';
  document.getElementById('accountFormContainer').style.display = 'none';

  // Show the login form
  document.getElementById('loginForm').style.display = 'block';
}



  
