// Get references to the form and display area
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resumeDisplay') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;
const profilePicInput = document.getElementById('profilePicture') as HTMLInputElement;
const profilePicDisplay = document.getElementById('profilePicDisplay') as HTMLImageElement;

// Handle profile picture upload
profilePicInput.addEventListener('change', (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profilePicDisplay.src = e.target?.result as string;
            profilePicDisplay.style.display = 'block'; // Show the image once uploaded
        };
        reader.readAsDataURL(file); // Read the image as Data URL
    }
});

// Handle form submission
form.addEventListener('submit', (event: Event) => {
    event.preventDefault(); // Prevent page reload

    // Collect input values
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const firstName = (document.getElementById('firstName') as HTMLInputElement).value;
    const lastName = (document.getElementById('lastName') as HTMLInputElement).value;
    const name = `${firstName} ${lastName}`;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLInputElement).value;
    const city = (document.getElementById('city') as HTMLInputElement).value;
    const country = (document.getElementById('country') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLInputElement).value;
    const degree = (document.getElementById('degree') as HTMLInputElement).value;
    const companyName = (document.getElementById('companyName') as HTMLInputElement).value;
    const position = (document.getElementById('position') as HTMLInputElement).value;
    const description = (document.getElementById('description') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
    const aboutYourself = (document.getElementById('aboutyourself') as HTMLTextAreaElement).value;

    // Save form data in localStorage with the username as the key
    const resumeData = {
        name, email, phone, address, city, country, education, degree, companyName,
        position, description, skills, aboutYourself
    };
    localStorage.setItem(username, JSON.stringify(resumeData));

    // Generate the resume content dynamically
    const resumeHTML = `
        <h2>Editable Resume</h2>
        <img id="profilePicDisplay" src="${profilePicDisplay.src}" style="width: 150px; height: 150px; border-radius: 50%; margin-bottom: 20px;">
        <h3>Personal Information</h3>
        <p><b>Name:</b> <span contenteditable="true">${name}</span></p>
        <p><b>Email:</b> <span contenteditable="true">${email}</span></p>
        <p><b>Phone:</b> <span contenteditable="true">${phone}</span></p>
        <p><b>Address:</b> <span contenteditable="true">${address}</span></p>
        <p><b>City:</b> <span contenteditable="true">${city}</span></p>
        <p><b>Country:</b> <span contenteditable="true">${country}</span></p>
        <h3>Education</h3>
        <p contenteditable="true">${degree} - ${education}</p>
        <h3>Work Experience</h3>
        <p><b>Company:</b> <span contenteditable="true">${companyName}</span></p>
        <p><b>Position:</b> <span contenteditable="true">${position}</span></p>
        <p contenteditable="true">${description}</p>
        <h3>Skills</h3>
        <p contenteditable="true">${skills}</p>
        <h3>About Yourself</h3>
        <p contenteditable="true">${aboutYourself}</p>
    `;

    // Display the generated resume
    resumeDisplayElement.innerHTML = resumeHTML;

    // Generate a shareable URL with the username only
    const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});

// Handle PDF download
downloadPdfButton.addEventListener('click', () => {
    window.print(); // Open the print dialog and allow the user to save as PDF
});

// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    if (username) {
        // Autofill form if data is found in localStorage
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);
            (document.getElementById('username') as HTMLInputElement).value = username;
            const names = resumeData.name.split(' ');
            (document.getElementById('firstName') as HTMLInputElement).value = names[0];
            (document.getElementById('lastName') as HTMLInputElement).value = names[1] || ''; // Handle case where last name might be undefined
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
            (document.getElementById('address') as HTMLInputElement).value = resumeData.address;
            (document.getElementById('city') as HTMLInputElement).value = resumeData.city;
            (document.getElementById('country') as HTMLInputElement).value = resumeData.country;
            (document.getElementById('education') as HTMLInputElement).value = resumeData.education;
            (document.getElementById('degree') as HTMLInputElement).value = resumeData.degree;
            (document.getElementById('companyName') as HTMLInputElement).value = resumeData.companyName;
            (document.getElementById('position') as HTMLInputElement).value = resumeData.position;
            (document.getElementById('description') as HTMLTextAreaElement).value = resumeData.description;
            (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills;
            (document.getElementById('aboutyourself') as HTMLTextAreaElement).value = resumeData.aboutYourself;
        }
    }
});
