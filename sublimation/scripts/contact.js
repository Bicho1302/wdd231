document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const product = document.getElementById("product").value;
    const message = document.getElementById("message").value.trim();
  
    if (!name || !email || !product) {
      alert("Please fill out all required fields.");
      return;
    }
  
    // Save to localStorage
    const contactData = { name, email, product, message };
    localStorage.setItem("lastContact", JSON.stringify(contactData));
  
    // Redirect with query string
    const params = new URLSearchParams(contactData);
    window.location.href = `form-response.html?${params.toString()}`;
  });
  