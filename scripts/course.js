// course.js

// Example array of courses
let courses = [
    {
      code: "CSE110",
      name: "Introduction to Programming",
      credits: 3,
      completed: false,
    },
    {
      code: "CSE111",
      name: "Programming with Functions",
      credits: 4,
      completed: false,
    },
    {
      code: "WDD130",
      name: "Web Fundamentals",
      credits: 3,
      completed: false,
    },
    {
      code: "WDD210",
      name: "Web Frontend Development",
      credits: 4,
      completed: false,
    },
    {
      code: "WDD230",
      name: "Advanced CSS Techniques",
      credits: 3,
      completed: false,
    },
    {
      code: "WDD231",
      name: "Intermediate Frontend Development",
      credits: 3,
      completed: false,
    },
  ];
  
  // Mark any courses you have completed:
  courses[0].completed = true; // Example: Mark the first course as completed
  // ...set others to true if you've completed them
  
  const courseContainer = document.getElementById("courseContainer");
  const totalCreditsElement = document.getElementById("totalCredits");
  
  // Function to display courses based on a filter (all, CSE, WDD)
  function displayCourses(filter) {
    // Clear existing courses
    courseContainer.innerHTML = "";
  
    // Filter array
    let filtered = [];
    if (filter === "all") {
      filtered = courses;
    } else {
      filtered = courses.filter((course) => course.code.startsWith(filter));
    }
  
    // Build and inject course cards
    filtered.forEach((course) => {
      const card = document.createElement("div");
      card.classList.add("course-card");
  
      // If completed, add a special class
      if (course.completed) {
        card.classList.add("completed");
      }
  
      const title = document.createElement("h3");
      title.textContent = `${course.code}: ${course.name}`;
  
      const credits = document.createElement("p");
      credits.textContent = `Credits: ${course.credits}`;
  
      card.appendChild(title);
      card.appendChild(credits);
      courseContainer.appendChild(card);
    });
  
    // Calculate total credits of displayed courses
    const total = filtered.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsElement.textContent = `Total Credits: ${total}`;
  }
  
  // Set up filter buttons
  const filterButtons = document.querySelectorAll(".filter-buttons button");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      displayCourses(btn.dataset.filter);
    });
  });
  
  // Display all courses by default
  displayCourses("all");
  