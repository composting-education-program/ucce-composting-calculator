window.onload = function () {
  document
    .getElementById("submit")
    .addEventListener("click", handleFormSubmission);
  createStatistics();
};

function handleFormSubmission() {
  var input = document.getElementById("input-text");
  var unit = document.getElementById("measurement");
  var content = document.getElementById("user-input-content");

  // Store the input values in local storage
  localStorage.setItem("input", input.value);
  localStorage.setItem("unit", unit.value);

  content.innerHTML = ""; // Clear the content div

  let description =
    "Nice work! You were in the top " +
    localStorage.getItem("input") +
    "% of composters in Santa Clara.";
  content.appendChild(createInfoContainerElement(description, "4/5", "1/2"));

  let stat = "1.5";
  let desc = "kg of CO2 saved";

  content.appendChild(createStatsContainerElement(stat, desc, "4/5", "1/2"));

  let stat2 = "3";
  let desc2 = "miles driven";
  content.appendChild(
    createTwoStatsRowContainer(stat, stat2, desc, desc2, "4/5", "1/2"),
  );
}

function createInfoContainerElement(
  description,
  mobileWidth = "4/5",
  desktopWidth = "3/12",
) {
  var display = document.createElement("div");
  display.innerHTML = description;
  display.classList.add(
    "bg-green-100",
    "border-l-4",
    "border-green-500",
    "text-green-700",
    "rounded",
    "p-4",
    "mt-4",
    `md:w-${desktopWidth}`,
    `w-${mobileWidth}`,
    "mx-auto",
  );

  var info = document.createElement("p");
  info.classList.add("font-bold", "text-center");
  display.appendChild(info);

  return display;
}

function createStatsContainerElement(
  statistic,
  description,
  width = "4/5",
  desktopWidth = "3/12",
) {
  var container = document.createElement("div");
  container.classList.add(
    "p-8",
    "bg-gray-100",
    "border",
    "border-gray-300",
    "rounded-3xl",
    `w-${width}`,
    `md:w-${desktopWidth}`,
    "mx-auto",
    "mt-2",
  );

  var stat = document.createElement("p");
  stat.classList.add(
    "font-heading",
    "mb-6",
    "text-3xl",
    "md:text-6xl",
    "text-anr-blue",
    "font-black",
    "tracking-tight",
  );
  stat.innerHTML = statistic;

  var desc = document.createElement("p");
  desc.classList.add(
    "font-heading",
    "mb-2",
    "text-l",
    "text-gray-700",
    "font-bold",
  );
  desc.innerHTML = description;

  container.appendChild(stat);
  container.appendChild(desc);

  return container;
}

function createTwoStatsRowContainer(
  stat1,
  stat2,
  desc1,
  desc2,
  mobileWidth = "4/5",
  desktopWidth = "3/12",
) {
  var container = document.createElement("div");
  container.classList.add(
    "flex",
    `w-${mobileWidth}`,
    `md:w-${desktopWidth}`,
    "mx-auto",
  );

  var statCont1 = createStatsContainerElement(stat1, desc1);
  statCont1.classList.remove("md:w-3/12");
  statCont1.classList.add("mr-1", "md:w-1/2");
  var statCont2 = createStatsContainerElement(stat2, desc2);
  statCont2.classList.remove("md:w-3/12");
  statCont2.classList.add("ml-1", "md:w-1/2");

  container.appendChild(statCont1);
  container.appendChild(statCont2);

  return container;
}

function createStatistics() {
  const pieChartElement = document.getElementById("pie-chart").getContext("2d");
  new Chart(pieChartElement, {
    type: "pie",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      aspectRatio: 1,
      maintainAspectRatio: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  const barChartElement = document.getElementById("bar-chart").getContext("2d");
  new Chart(barChartElement, {
    type: "bar",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      aspectRatio: 2.2,
      maintainAspectRatio: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  const rightChartContainer = document.getElementById("right-flex-container");
  rightChartContainer.appendChild(
    createInfoContainerElement("Some more statistics go here!", "1", "1"),
  );
}
