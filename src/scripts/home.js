function handleFormSubmission(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get the form input values
    var input = document.getElementById("input-text");
    var unit = document.getElementById("measurement");

    // Store the input values in local storage
    localStorage.setItem("input", input.value);
    localStorage.setItem("unit", unit.value);

    var display = document.createElement("div");
    display.innerHTML = "You have composted "+ localStorage.getItem("input") + " " + localStorage.getItem("unit") + " of organic matter";
    document.getElementById("content").appendChild(display);

    return false; // To prevent the form from clearing
}