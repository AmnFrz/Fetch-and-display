// DOM elements
const usersContainer = document.getElementById('usersContainer');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const reloadBtn = document.getElementById('reloadBtn');

// API URL - Fixed the typo from the task description
const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Function to fetch user data
async function fetchUsers() {
    try {
        // Show loading and hide error
        loadingElement.style.display = 'block';
        errorElement.style.display = 'none';
        usersContainer.innerHTML = '';

        // Fetch data from API
        const response = await fetch(API_URL);

        // Check if response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse JSON response
        const users = await response.json();

        // Hide loading
        loadingElement.style.display = 'none';

        // Display users
        displayUsers(users);

    } catch (error) {
        // Hide loading and show error
        loadingElement.style.display = 'none';
        errorElement.style.display = 'block';
        errorElement.textContent = `Failed to load users: ${error.message}`;
        console.error('Error fetching users:', error);
    }
}

// Function to display users
function displayUsers(users) {
    usersContainer.innerHTML = '';

    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';

        // Format address
        const address = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;

        userCard.innerHTML = `
            <div class="user-name">${user.name}</div>
            <div class="user-email">📧 ${user.email}</div>
            <div class="user-address">
                <strong>Address:</strong><br>
                🏠 ${address}
            </div>
        `;

        usersContainer.appendChild(userCard);
    });
}

// Event listener for reload button
reloadBtn.addEventListener('click', fetchUsers);

// Initial fetch when page loads
document.addEventListener('DOMContentLoaded', fetchUsers);