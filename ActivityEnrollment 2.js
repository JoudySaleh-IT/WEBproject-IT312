//Already done: Retrieve kids' names from localStorage and populate the dropdown
window.addEventListener("DOMContentLoaded", () => {
    const childSelect = document.getElementById("child-select");

    // Do NOT clear hardcoded kids
    // Just add kids from localStorage directly
    const storedKids = JSON.parse(localStorage.getItem("registeredKids")) || [];

    storedKids.forEach((name) => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        childSelect.appendChild(option);
    });

    populateFilterOptions(); // Fill coach & prerequisite filters
    populateAllActivities(); // Show all activities on load
});


// Multidimensional array of activities
const activities = [
    ["Swimming", "Nina", null, "Act1.JPG"],
    ["Horse Riding", "Sofia", "Skill level: Beginner", "Act2.JPG"],
    ["Volleyball", "Ahmed", "Skill level: Advanced", "Act3.JPG"],
    ["Ballet", "Sarah", "Age:8+", "Act4.JPG"],
    ["Gymnastics", "Natasha", "Skill level: Intermediate", "Act5.JPG"],
    ["Karate", "Khaild", "Age:16+", "Act6.JPG"],
    ["Tennis", "David", "Age:7+", "Act7.JPG"],
    ["Football", "Omar", "Age:11+", "Act8.JPG"]
];


//  Fill in the filter options from the array (no duplicates)
function populateFilterOptions() {
    const filterSelect = document.getElementById("filter-select");

    const coachSet = new Set();
    const prerequisiteSet = new Set();

    activities.forEach(([_, coach, prerequisite]) => {
        coachSet.add(coach);
        if (prerequisite) prerequisiteSet.add(prerequisite);
    });

    const coachGroup = document.createElement("optgroup");
    coachGroup.label = "Coach Name";
    coachSet.forEach((coach) => {
        const opt = document.createElement("option");
        opt.value = coach;
        opt.textContent = coach;
        coachGroup.appendChild(opt);
    });

    const prerequisiteGroup = document.createElement("optgroup");
    prerequisiteGroup.label = "Prerequisite";
    prerequisiteSet.forEach((pre) => {
        const opt = document.createElement("option");
        opt.value = pre;
        opt.textContent = pre;
        prerequisiteGroup.appendChild(opt);
    });

    // Clear existing dynamic groups first
    filterSelect.innerHTML = `
        <option value="">Select a Filter</option>
    `;
    filterSelect.appendChild(coachGroup);
    filterSelect.appendChild(prerequisiteGroup);
}

//  Filter activity cards based on selected coach or prerequisite
document.getElementById("filter-select").addEventListener("change", (e) => {
    const selected = e.target.value;
    const list = document.querySelector(".activity-list");

    // Remove old activities
    const existingCards = list.querySelectorAll(".activity-card");
    existingCards.forEach((card) => card.remove());

    const filtered = activities.filter(([name, coach, prerequisite]) => {
        return coach === selected || prerequisite === selected;
    });

    // If nothing matches, show all
    const displayActivities = filtered.length ? filtered : activities;

    displayActivities.forEach(([name, coach, _, image]) => {
        const card = document.createElement("div");
        card.className = "activity-card";
    
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "activity";
        checkbox.value = name;
        checkbox.id = name;
    
        const img = document.createElement("img");
        img.src = `images/${image}`;
        img.alt = `${name} activity`;
        img.className = "activity-image";
    
        const label = document.createElement("label");
        label.htmlFor = name;
        label.textContent = name;
    
        card.appendChild(checkbox);
        card.appendChild(img);
        card.appendChild(label);
        list.appendChild(card);
    });
    
});

// Handle form submission
document.getElementById("activity-enrollment-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const selectedChild = document.getElementById("child-select").value;
    const checkedActivities = document.querySelectorAll('input[name="activity"]:checked');

    if (!selectedChild) {
        alert("Please select a child before submitting.");
        return;
    }

    if (checkedActivities.length === 0) {
        alert("Please select at least one activity.");
        return;
    }

    // Remove any previously shown info
    const existingOutput = document.getElementById("enrollment-output");
    if (existingOutput) existingOutput.remove();

    // Create a container to show output
    const outputDiv = document.createElement("div");
    outputDiv.id = "enrollment-output";
    outputDiv.style.marginTop = "2em";

    const title = document.createElement("h3");
    title.textContent = `Enrollment Confirmation for ${selectedChild}`;
    outputDiv.appendChild(title);

    const ul = document.createElement("ul");
    checkedActivities.forEach((checkbox) => {
        const activityName = checkbox.value;
        const coach = activities.find(([name]) => name === activityName)?.[1];

        const li = document.createElement("li");
        li.textContent = `${activityName} (Coach: ${coach})`;
        ul.appendChild(li);
    });

    outputDiv.appendChild(ul);
    document.querySelector(".main-content").appendChild(outputDiv);

    // Clear the form
    document.getElementById("child-select").value = "";
    document.getElementById("filter-select").value = "";

    const allCheckboxes = document.querySelectorAll('input[name="activity"]');
    allCheckboxes.forEach((box) => box.checked = false);
});
