 // Set the Last Modified date in the footer.
 document.getElementById('lastModified').textContent = document.lastModified;
    
 // Retrieve the current timestamp.
 const currentVisit = Date.now();
 const lastVisit = localStorage.getItem('lastVisit');
 const visitMessageEl = document.getElementById('visitMessage');
 let message = "";
 
 if (!lastVisit) {
   // First time visitor.
   message = "Welcome! Let us know if you have any questions.";
 } else {
   const timeDifference = currentVisit - lastVisit;
   const oneDay = 86400000; // Number of milliseconds in one day
   
   if (timeDifference < oneDay) {
     message = "Back so soon! Awesome!";
   } else {
     const daysAgo = Math.floor(timeDifference / oneDay);
     message = "You last visited " + daysAgo + (daysAgo === 1 ? " day" : " days") + " ago.";
   }
 }
 
 // Display the visit message.
 visitMessageEl.textContent = message;
 // Store the current visit timestamp for future visits.
 localStorage.setItem('lastVisit', currentVisit);
 const navToggle = document.getElementById('nav-toggle');
 const mainNav = document.getElementById('main-nav');

 navToggle.addEventListener('click', function() {
   mainNav.classList.toggle('open');
 });