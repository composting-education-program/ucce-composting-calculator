function handleFormSubmission(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get the form input values
    var input = document.getElementById("input-text");
    var unit = document.getElementById("measurement");
    var content = document.getElementById("content");

    // Store the input values in local storage
    localStorage.setItem("input", input.value);
    localStorage.setItem("unit", unit.value);

    let description = "Nice work! You were in the top "+ localStorage.getItem("input") + "% of composters in Santa Clara.";
    content.appendChild(createInfoContainerElement(description));

    let stat = "1.5";
    let desc = "kg of CO2 saved";
    
    content.appendChild(createStatsContainerElement(stat, desc));

    let stat2 = "3";
    let desc2 = "miles driven";
    content.appendChild(createTwoStatsRowContainer(stat, stat2, desc, desc2));
    return false; // To prevent the form from clearing
}

function createInfoContainerElement(description) {
    var display = document.createElement("div");
    display.innerHTML = description;
    display.classList.add("bg-green-100", "border-l-4", "border-green-500", "text-green-700", "rounded", "p-4", "mt-4", "md:w-3/12", "w-4/5", "mx-auto");
    
    var info = document.createElement("p");
    info.classList.add("font-bold", "text-center");
    display.appendChild(info);

    return display;
}

function createStatsContainerElement(statistic, description){
    var container = document.createElement("div");
    container.classList.add("p-8", "bg-gray-100", "border", "border-gray-300", "rounded-3xl", "w-4/5", "md:w-3/12","mx-auto", "mt-2");
    
    var stat = document.createElement("p");
    stat.classList.add("font-heading", "mb-6", "text-3xl", "md:text-6xl", "text-anr-blue", "font-black", "tracking-tight" );
    stat.innerHTML = statistic;
    
    var desc = document.createElement("p");
    desc.classList.add("font-heading", "mb-2", "text-l", "text-gray-700", "font-bold");
    desc.innerHTML = description;

    container.appendChild(stat);
    container.appendChild(desc);    

    return container;
}

function createTwoStatsRowContainer(stat1, stat2, desc1, desc2){
    var container = document.createElement("div");
    container.classList.add("flex", "w-4/5", "md:w-3/12", "mx-auto", "mt-2");
    
    var statCont1 = createStatsContainerElement(stat1, desc1);
    statCont1.classList.remove("md:w-3/12")
    statCont1.classList.add("mr-1", "md:w-1/2");
    var statCont2 = createStatsContainerElement(stat2, desc2);
    statCont2.classList.remove("md:w-3/12")
    statCont2.classList.add("ml-1", "md:w-1/2");

    container.appendChild(statCont1);
    container.appendChild(statCont2);

    return container;
}
