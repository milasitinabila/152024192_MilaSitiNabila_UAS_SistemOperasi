// DOM Elements
const editBtn = document.getElementById('editBtn');
const editModal = document.getElementById('editModal');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const cvForm = document.getElementById('cvForm');

// CV Elements
const cvName = document.getElementById('cvName');
const cvTitle = document.getElementById('cvTitle');
const cvAbout = document.getElementById('cvAbout');
const cvEmail = document.getElementById('cvEmail');
const cvPhone = document.getElementById('cvPhone');
const cvLocation = document.getElementById('cvLocation');
const profileImg = document.getElementById('profileImg');

// Form Inputs
const fullNameInput = document.getElementById('fullName');
const jobTitleInput = document.getElementById('jobTitle');
const aboutMeInput = document.getElementById('aboutMe');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const locationInput = document.getElementById('location');

// Initialize the CV
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Load saved data
    loadCVData();
    
    // Animate skill bars
    animateSkillBars();
    
    // Add event listeners
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Edit button click
    editBtn.addEventListener('click', openModal);
    
    // Close modal buttons
    closeModal.addEventListener('click', closeModalFunc);
    cancelBtn.addEventListener('click', closeModalFunc);
    
    // Form submit
    cvForm.addEventListener('submit', saveCVData);
    
    // Close modal when clicking outside
    editModal.addEventListener('click', function(e) {
        if (e.target === editModal) {
            closeModalFunc();
        }
    });
}

// Modal Functions
function openModal() {
    editModal.style.display = 'flex';
    // Load current data into form
    loadCurrentDataToForm();
}

function closeModalFunc() {
    editModal.style.display = 'none';
}

// Load current CV data into form
function loadCurrentDataToForm() {
    fullNameInput.value = cvName.textContent !== '[Nama Lengkap]' ? cvName.textContent : '';
    jobTitleInput.value = cvTitle.textContent !== '[Posisi / Jabatan]' ? cvTitle.textContent : '';
    aboutMeInput.value = cvAbout.textContent.startsWith('Deskripsi') ? '' : cvAbout.textContent;
    emailInput.value = cvEmail.textContent !== 'email@contoh.com' ? cvEmail.textContent : '';
    phoneInput.value = cvPhone.textContent !== '+62 812 3456 7890' ? cvPhone.textContent : '';
    locationInput.value = cvLocation.textContent !== 'Kota, Negara' ? cvLocation.textContent : '';
}

// Save CV Data
function saveCVData(e) {
    e.preventDefault();
    
    // Get form values
    const fullName = fullNameInput.value.trim();
    const jobTitle = jobTitleInput.value.trim();
    const aboutMe = aboutMeInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const location = locationInput.value.trim();
    
    // Update CV display
    if (fullName) {
        cvName.textContent = fullName;
        updateProfileInitials(fullName);
    }
    
    if (jobTitle) cvTitle.textContent = jobTitle;
    if (aboutMe) cvAbout.textContent = aboutMe;
    if (email) cvEmail.textContent = email;
    if (phone) cvPhone.textContent = phone;
    if (location) cvLocation.textContent = location;
    
    // Save to localStorage
    saveToLocalStorage({ fullName, jobTitle, aboutMe, email, phone, location });
    
    // Close modal
    closeModalFunc();
    
    // Show success message
    showNotification('Data CV berhasil disimpan!');
}

// Update profile picture with initials
function updateProfileInitials(fullName) {
    const initials = fullName
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .substring(0, 3);
    
    profileImg.innerHTML = `<span style="font-size: 3rem; font-weight: bold;">${initials}</span>`;
}

// Save data to localStorage
function saveToLocalStorage(data) {
    localStorage.setItem('cvData', JSON.stringify(data));
}

// Load data from localStorage
function loadCVData() {
    const savedData = localStorage.getItem('cvData');
    
    if (savedData) {
        const data = JSON.parse(savedData);
        
        // Apply saved data to CV
        if (data.fullName) {
            cvName.textContent = data.fullName;
            updateProfileInitials(data.fullName);
        }
        if (data.jobTitle) cvTitle.textContent = data.jobTitle;
        if (data.aboutMe) cvAbout.textContent = data.aboutMe;
        if (data.email) cvEmail.textContent = data.email;
        if (data.phone) cvPhone.textContent = data.phone;
        if (data.location) cvLocation.textContent = data.location;
    }
}

// Animate skill bars
function animateSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(skill => {
        const level = skill.getAttribute('data-level');
        setTimeout(() => {
            skill.style.width = `${level}%`;
        }, 300);
    });
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
    `;
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Add some CSS for the notification if not already in style.css
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #AA60C8;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    </style>
`);