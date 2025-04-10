// scripts/directory.js

// Get references to the container and toggle button
const directoryContainer = document.getElementById('directory-container');
const toggleButton = document.getElementById('toggleView');
let currentView = 'grid'; // initial view is grid

// Fetch members data from the JSON file
async function fetchMembers() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error('Error fetching members:', error);
  }
}

// Create a member card (or list item) for a single member
function createMemberCard(member) {
  const card = document.createElement('div');
  card.classList.add('member-card');
  
  // If an image filename is provided, create an <img> element
  if (member.image) {
    const img = document.createElement('img');
    img.src = `images/${member.image}`;  // assumes images are stored in an "images" folder
    img.alt = member.name;
    card.appendChild(img);
  }
  
  // Member name as heading
  const name = document.createElement('h2');
  name.textContent = member.name;
  card.appendChild(name);
  
  // Membership level
  const membership = document.createElement('p');
  membership.textContent = `Membership: ${member.membership}`;
  card.appendChild(membership);
  
  // Address
  const address = document.createElement('p');
  address.textContent = member.address;
  card.appendChild(address);
  
  // Phone number
  const phone = document.createElement('p');
  phone.textContent = member.phone;
  card.appendChild(phone);
  
  // Website URL as a link
  const website = document.createElement('a');
  website.href = member.website;
  website.textContent = member.website;
  website.target = '_blank';
  card.appendChild(website);
  
  // Optional description
  if (member.description) {
    const description = document.createElement('p');
    description.textContent = member.description;
    card.appendChild(description);
  }
  
  return card;
}

// Display all members in the directory container
function displayMembers(members) {
  // Clear any existing content
  directoryContainer.innerHTML = '';
  
  members.forEach(member => {
    const card = createMemberCard(member);
    directoryContainer.appendChild(card);
  });
}

// Toggle between grid and list views
function toggleView() {
  if (currentView === 'grid') {
    directoryContainer.classList.remove('directory-grid');
    directoryContainer.classList.add('directory-list');
    toggleButton.textContent = 'Switch to Grid View';
    currentView = 'list';
  } else {
    directoryContainer.classList.remove('directory-list');
    directoryContainer.classList.add('directory-grid');
    toggleButton.textContent = 'Switch to List View';
    currentView = 'grid';
  }
}

// Event listener for the toggle button
toggleButton.addEventListener('click', toggleView);

// Fetch and display members when the page loads
fetchMembers();
