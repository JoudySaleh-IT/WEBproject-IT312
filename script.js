
// Get the tooltip element
const tooltip = document.querySelector(".review-tooltip");
const reviewCards = document.querySelectorAll(".review-card");

reviewCards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    const name = card.getAttribute("data-customer");
    const rate = card.getAttribute("data-rate");
    const feedback = card.getAttribute("data-feedback");

    tooltip.innerHTML = `
      <strong>Parent:</strong> ${name}<br>
      <strong>Rating:</strong> ${rate}<br>
      <strong>Feedback:</strong> ${feedback}
    `;

    const rect = card.getBoundingClientRect();
    const tooltipWidth = 250;
    const spacing = 10;

    let top = rect.top + window.scrollY + 10;
    let left;

    if (rect.right + tooltipWidth + spacing < window.innerWidth) {
      left = rect.right + window.scrollX + spacing; // show on right
    } else {
      left = rect.left + window.scrollX - tooltipWidth - spacing; // show on left
    }

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
    tooltip.style.display = "block";
  });

  card.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
  });
});

// Mobile tap
card.addEventListener('click', (e) => {
  if (window.innerWidth <= 768) {
    e.stopPropagation();
    const feedback = card.getAttribute('data-feedback');
    const rate = card.getAttribute('data-rate');
    const customer = card.getAttribute('data-customer');

    tooltip.innerHTML = `<strong>Customer:</strong> ${customer}<br><strong>Rating:</strong> ${rate}<br><strong>Feedback:</strong> ${feedback}`;
    tooltip.style.display = 'block';

    const rect = card.getBoundingClientRect();
    tooltip.style.position = 'absolute';
    tooltip.style.top = `${window.scrollY + rect.bottom + 10}px`;
    tooltip.style.left = '5%';
    tooltip.style.right = '5%';
    tooltip.style.width = '90%';
  }
});


// Hide when tapping outside
document.addEventListener('click', () => {
if (window.innerWidth <= 768) {
  tooltip.style.display = 'none';
}
});


document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const themeModeText = document.getElementById("theme-mode-text");

  // Apply saved theme on every page
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggle) themeToggle.checked = true;
    if (themeModeText) themeModeText.textContent = "Dark";
  } else {
    document.body.classList.remove("dark-mode");
    if (themeToggle) themeToggle.checked = false;
    if (themeModeText) themeModeText.textContent = "Light";
  }

  // Enable toggle behavior if toggle exists (homepage)
  if (themeToggle) {
    themeToggle.addEventListener("change", () => {
      const mode = themeToggle.checked ? "dark" : "light";
      document.body.classList.toggle("dark-mode", themeToggle.checked);
      if (themeModeText) themeModeText.textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
      localStorage.setItem("theme", mode);
    });
  }
});

const themeToggle = document.getElementById('theme-toggle');
const themeModeText = document.getElementById('theme-mode-text');
const logo = document.getElementById('site-logo'); // <--- get logo

if (themeToggle && themeModeText) {
  themeToggle.addEventListener('change', () => {
    // Toggle dark mode class
    document.body.classList.toggle('dark-mode', themeToggle.checked);

    // Update theme text
    themeModeText.textContent = themeToggle.checked ? "Dark" : "Light";

    

    // Store user preference
    const currentTheme = themeToggle.checked ? "dark" : "light";
    localStorage.setItem("theme", currentTheme);
  });

  // Apply saved theme on load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add('dark-mode');
    themeToggle.checked = true;
    themeModeText.textContent = "DARK";

  }
}


