document.addEventListener('DOMContentLoaded', function() {
    // Default children data
    const defaultChildren = [
        {
            firstName: "Olivia",
            lastName: "Rich",
            age: 12,
            height: 152,
            weight: 45,
            gender: "F",
            dob: "2011-05-15",
            email: "olivia@example.com",
            photo: "images/kid12.png"
        },
        {
            firstName: "Josh",
            lastName: "Rich",
            age: 9,
            height: 138,
            weight: 38,
            gender: "M",
            dob: "2014-08-22",
            email: "josh@example.com",
            photo: "images/kid9.png"
        },
        {
            firstName: "Daniel",
            lastName: "Rich",
            age: 15,
            height: 156,
            weight: 40,
            gender: "M",
            dob: "2015-03-10",
            email: "daniel@example.com",
            photo: "images/kid3.png"
        }
        
    ];

    // Initialize or retrieve children data
    let storedChildren = JSON.parse(localStorage.getItem('childrenData'));
    
    if (!storedChildren || storedChildren.length === 0) {
        localStorage.setItem('childrenData', JSON.stringify(defaultChildren));
        storedChildren = defaultChildren;
    }

    // Display children
    displayChildren(storedChildren);

    // Filter functionality
    const filterSelect = document.getElementById('filter-select');
    filterSelect.addEventListener('change', function() {
        const filteredChildren = filterChildren(storedChildren, this.value);
        displayChildren(filteredChildren);
    });

    // Display children cards
    function displayChildren(children) {
        const cardsContainer = document.querySelector('.cards-container');
        cardsContainer.innerHTML = '';

        children.forEach(child => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${child.photo || 'images/default-child.png'}" alt="${child.firstName}" class="child-image">
                <h3>${child.firstName} ${child.lastName}</h3>
                <hr>
                <p>Age: ${child.age}</p>
                <p>Height: ${child.height} cm</p>
                <p>Weight: ${child.weight} kg</p>
                <p>Gender: ${child.gender === 'M' ? 'Male' : 'Female'}</p>
                <button class="primary see-details" data-id="${child.firstName}-${child.lastName}">See Details</button>
            `;
            cardsContainer.appendChild(card);
        });

        // Add event listeners to detail buttons
        document.querySelectorAll('.see-details').forEach(button => {
            button.addEventListener('click', function() {
                const childId = this.getAttribute('data-id');
                const child = storedChildren.find(c => 
                    `${c.firstName}-${c.lastName}` === childId);
                showChildDetails(child);
            });
        });

        // Add Child button
        const addButton = document.createElement('a');
        addButton.href = 'ChildRegister.html';
        addButton.className = 'button primary';
        addButton.textContent = '+ Add a New Child';
        cardsContainer.appendChild(addButton);
    }

    // Filter children based on selection
    function filterChildren(children, filterType) {
        const filtered = [...children];
        
        switch(filterType) {
            case 'A-Z':
                return filtered.sort((a, b) => a.firstName.localeCompare(b.firstName));
            case 'Z-A':
                return filtered.sort((a, b) => b.firstName.localeCompare(a.firstName));
            case 'Oldest-first':
                return filtered.sort((a, b) => b.age - a.age);
            case 'Youngest-first':
                return filtered.sort((a, b) => a.age - b.age);
            default:
                return filtered;
        }
    }

    // Show detailed child view
    function showChildDetails(child) {
        const detailsHTML = `
            <div class="child-details-overlay">
                <div class="child-details-modal">
                    <div class="detail-header">
                        <img src="${child.photo || 'images/default-child.png'}" 
                             alt="${child.firstName}" 
                             class="detail-image">
                        <h2>${child.firstName} ${child.lastName}</h2>
                    </div>
                    <div class="detail-content">
                        <p><strong>Age:</strong> ${child.age} years</p>
                        <p><strong>Date of Birth:</strong> ${child.dob}</p>
                        <p><strong>Height:</strong> ${child.height} cm</p>
                        <p><strong>Weight:</strong> ${child.weight} kg</p>
                        <p><strong>Gender:</strong> ${child.gender === 'M' ? 'Male' : 'Female'}</p>
                        <p><strong>Contact Email:</strong> ${child.email}</p>
                    </div>
                    <button class="button secondary close-details">Close</button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', detailsHTML);
        
        document.querySelector('.close-details').addEventListener('click', function() {
            document.querySelector('.child-details-overlay').remove();
        });
    }

    const style = document.createElement('style');
style.textContent = `
    .child-details-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .child-details-modal {
        background-color: white;
        color: #333;
        padding: 2rem;
        border-radius: 0.5rem;
        width: 80%;
        max-width: 500px;
        box-shadow: 0 0 20px rgba(0,0,0,0.2);
    }

    body.dark-mode .child-details-modal {
        background-color: #1e1e1e;
        color: #f0f0f0;
        box-shadow: 0 0 20px rgba(255,255,255,0.1);
    }

    .detail-header {
        text-align: center;
        margin-bottom: 1.5rem;
    }

    .detail-image {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid #FF8C9E;
        margin-bottom: 1rem;
    }

    .detail-content {
        margin-bottom: 1.5rem;
    }

    .detail-content p {
        margin: 0.5rem 0;
        padding: 0.3rem 0;
        border-bottom: 1px solid #eee;
    }

    body.dark-mode .detail-content p {
        border-bottom: 1px solid #444;
    }
`;
document.head.appendChild(style);

});