document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const form = document.getElementById('childRegistrationForm');
    const fileInput = document.getElementById('childPhotoUpload');
    const photoPreview = document.getElementById('childPhotoPreview');
    const imagePlaceholder = document.querySelector('.image-placeholder');

    // Handle photo preview
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                photoPreview.src = e.target.result;
                photoPreview.style.display = 'block';
                imagePlaceholder.style.backgroundColor = 'transparent';
            };
            reader.readAsDataURL(file);
        } else if (file) {
            showAlert('Please upload an image file (JPEG, PNG, etc.)');
            fileInput.value = ''; // Clear invalid file
        }
    });

    // Form submission handler
    form.addEventListener('submit', function(FormValidator) {
        FormValidator.preventDefault();
        
        // Get form values
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const gender = document.querySelector('input[name="gender"]:checked');
        const dob = document.getElementById('dob').value;
        const age = document.getElementById('age').value;
        const weight = document.getElementById('weight').value;
        const height = document.getElementById('height').value;
        const email = document.getElementById('email').value.trim();
        
        // Validation checks
        if (!firstName || !lastName || !gender || !dob || !age || !weight || !height || !email) {
            showAlert('Please fill in all required fields.');
            return false;
        }
        if (/^\d/.test(firstName) || /^\d/.test(lastName)) {
            showAlert('Names cannot start with numbers.');
            return false;
        }
        const dobDate = new Date(dob);
        const minDate = new Date('2020-01-01');
        if (dobDate > minDate) {
            showAlert('Child must be at least 5 years old (born before 2020).');
            return false;
        }
        if (parseInt(age) < 5) {
            showAlert('Child must be at least 5 years old.');
            return false;
        }
        if (!email.includes('@') && !email.includes('.')) {
            showAlert('Please enter a valid email address.');
            return false;
        }
        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            showAlert('Please enter valid numbers for weight and height.');
            return false;
        }

        // Process form data
        const processFormData = () => {
            const childData = {
                firstName,
                lastName,
                gender: gender.value,
                dob,
                age,
                weight,
                height,
                email,
                photo: null
            };

            // Handle photo upload
            const processPhoto = () => {
                return new Promise((resolve) => {
                    if (fileInput.files.length > 0) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            childData.photo = e.target.result;
                            resolve();
                        };
                        reader.readAsDataURL(fileInput.files[0]);
                    } else {
                        resolve();
                    }
                });
            };

            processPhoto().then(() => {
                // Save data to localStorage
                // Save to localStorage
                saveChildToLocalStorage(childData);
                
                // Show success message
                showAlert('Child registered successfully!', true);
                
                // Prepare print after slight delay
                setTimeout(() => {
                    printChildData(childData);
                }, 1500);
            });
        };

        processFormData();
    });

    // Save Child to LocalStorage
    function saveChildToLocalStorage(childData) {
        const existingChildren = JSON.parse(localStorage.getItem('childrenData')) || [];
        existingChildren.push(childData);
        localStorage.setItem('childrenData', JSON.stringify(existingChildren));

        // ✅ Also update the list used by the filter
        const fullName = `${childData.firstName} ${childData.lastName}`;
        const registeredKids = JSON.parse(localStorage.getItem('registeredKids')) || [];
    
        if (!registeredKids.includes(fullName)) {
            registeredKids.push(fullName);
            localStorage.setItem('registeredKids', JSON.stringify(registeredKids));
        } 
    }

    // Show Alert Message
    function showAlert(message, isSuccess = false) {
        const alertBox = document.createElement('div');
        alertBox.textContent = message;
        alertBox.style.position = 'fixed';
        alertBox.style.top = '20px';
        alertBox.style.left = '50%';
        alertBox.style.transform = 'translateX(-50%)';
        alertBox.style.padding = '15px 25px';
        alertBox.style.backgroundColor = isSuccess ? '#4CAF50' : '#FF4E88';
        alertBox.style.color = 'white';
        alertBox.style.borderRadius = '5px';
        alertBox.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        alertBox.style.zIndex = '1000';
        alertBox.style.fontWeight = 'bold';
        
        document.body.appendChild(alertBox);
        
        setTimeout(() => {
            alertBox.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(alertBox);
            }, 500);
        }, 3000);
    }

     // Print Child Data
    function printChildData(childData) {
        const printWindow = window.open('', '_blank');
    const content = `
        <html>
        <head>
            <title>Child Registration</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
                h1 { text-align: center; color: #FF4E88; }
                .photo-container {
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin: 20px auto;
                    border: 3px solid #FF4E88;
                }
                .photo-container img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                td {
                    padding: 8px;
                    border-bottom: 1px solid #ddd;
                }
                td:first-child {
                    font-weight: bold;
                    width: 30%;
                }
            </style>
        </head>
        <body>
            <h1>Child Registration</h1>
            <div class="photo-container">
                ${childData.photo ? `<img src="${childData.photo}" alt="Child Photo">` : 'No Photo'}
            </div>
            <table>
                <tr><td>Name:</td><td>${childData.firstName} ${childData.lastName}</td></tr>
                <tr><td>Gender:</td><td>${childData.gender === 'M' ? 'Male' : 'Female'}</td></tr>
                <tr><td>Date of Birth:</td><td>${childData.dob}</td></tr>
                <tr><td>Age:</td><td>${childData.age}</td></tr>
                <tr><td>Weight:</td><td>${childData.weight} kg</td></tr>
                <tr><td>Height:</td><td>${childData.height} cm</td></tr>
                <tr><td>Email:</td><td>${childData.email}</td></tr>
            </table>
            <script>
                window.onload = function() {
                    window.print();
                    setTimeout(() => {
                        window.close();
                        window.opener.location.href = 'ParentDashboard.html'; 
                    }, 500);
                };
            </script>
        </body>
        </html>
    `;
    printWindow.document.open();
    printWindow.document.write(content);
    printWindow.document.close();
    
    }
});
