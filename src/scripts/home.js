var carIconSrc = "../images/car.png";
var phoneIconSrc = "../images/charging.png";
var gasIconSrc = "../images/gas-station.png";
var treeIconSrc = "../images/plant.png";
var carbonIconSrc = "../images/carbon-capture.png";

window.onload = function () {
  document
    .getElementById("submit")
    .addEventListener("click", handleFormSubmission);

  // Live form validation.
  const inputField = document.getElementById("input-text");

  inputField.addEventListener("input", function (event) {
    const inputValue = event.target.value;
    const isValidInput = /^\d*\.?\d*$/.test(inputValue); // Regular expression to check for rational numbers

    if (!isValidInput) {
      inputField.value = inputField.value.substring(
        0,
        inputField.value.length - 1,
      ); // Clear the last inputted char if it was invalid.
    }
  });
};

function handleFormSubmission() {
  var content = document.getElementById("user-input-content");
  content.innerHTML = ""; // Clear the content div

  if (
    document.getElementById("input-text").value.trim() == "" ||
    document.getElementById("measurement").value == ""
  ) {
    formValidation();
  } else {
    if (document.getElementById("form-validation-alert") != null) {
      document.getElementById("form-validation-alert").remove();
    }
    var input = document.getElementById("input-text");
    var unit = document.getElementById("measurement");

    // Store the input values in local storage
    localStorage.setItem("input", input.value);
    localStorage.setItem("unit", unit.value);

    let description =
      "Nice work! You were in the top " +
      localStorage.getItem("input") +
      "% of composters in Santa Clara.";
    content.appendChild(createInfoContainerElement(description, "4/5", "1/2"));

    let kgCo2 = convertToKgCO2(input.value, unit.value).toFixed(2);
    let kgDesc = "kg of CO2 saved";

    let tonsOfCo2 = kgCo2 / 1000;

    let milesDriven = convertToMilesDriven(tonsOfCo2).toFixed(2);
    let mdDesc = "miles driven";

    let smartPhonesCharged = convertToSmartPhonesCharged(tonsOfCo2).toFixed(2);
    let spDesc = "smartphones charged";

    let gallonsOfGas = convertToGasConsumed(tonsOfCo2).toFixed(2);
    let gogDesc = "gallons of gas consumed";

    let treeSeedlingsGrown = convertToTreeSeedlingsGrown(tonsOfCo2).toFixed(2);
    let tsgDesc = "tree seedlings grown for 10 years";

    let acresOfForest = convertToAcresOfForest(tonsOfCo2).toFixed(2);
    let aofDesc = "acres of forest in one year";

    content.appendChild(
      createStatsContainerElement(kgCo2, kgDesc, carbonIconSrc, "4/5", "1/2"),
    );

    content.appendChild(
      createTwoStatsRowContainer(
        milesDriven,
        smartPhonesCharged,
        mdDesc,
        spDesc,
        carIconSrc,
        phoneIconSrc,
        "4/5",
        "1/2",
      ),
    );

    content.appendChild(
      createTwoStatsRowContainer(
        gallonsOfGas,
        treeSeedlingsGrown,
        gogDesc,
        tsgDesc,
        gasIconSrc,
        treeIconSrc,
        "4/5",
        "1/2",
      ),
    );
  }
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
  iconSrc,
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

  var desc = document.createElement("span");
  desc.classList.add(
    "font-heading",
    "mb-2",
    "text-l",
    "text-gray-700",
    "font-bold",
  );
  desc.innerHTML = description;

  var icon = document.createElement("img");
  icon.classList.add("inline", "ml-2");
  icon.src = iconSrc;
  icon.alt = "icon";
  icon.style.height = "30px"; // adjust the height as per your requirement

  container.appendChild(stat);
  container.appendChild(desc);
  container.appendChild(icon);

  return container;
}

function createTwoStatsRowContainer(
  stat1,
  stat2,
  desc1,
  desc2,
  icon1,
  icon2,
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

  var statCont1 = createStatsContainerElement(stat1, desc1, icon1);
  statCont1.classList.remove("md:w-3/12");
  statCont1.classList.add("mr-1", "md:w-1/2");
  var statCont2 = createStatsContainerElement(stat2, desc2, icon2);
  statCont2.classList.remove("md:w-3/12");
  statCont2.classList.add("ml-1", "md:w-1/2");

  container.appendChild(statCont1);
  container.appendChild(statCont2);

  return container;
}

function convertToKgCO2(input, unit) {
  if (unit == "kilograms") {
    // Convert from kg to lbs.
    input *= 2.20462;
  }
  if (unit == "gallons") {
    // Convert from gallons to lbs.
    input *= 6.18891540495;
  }
  if (unit == "liters") {
    // Convert from liters to lbs.
    input *= 1.63493925492;
  }

  // Convert from lbs to kg CO2 saved.
  const KgCO2SavedPerPound = 0.1814;
  return input * KgCO2SavedPerPound;
}

function convertToMilesDriven(MetricTonsOfCo2) {
  return MetricTonsOfCo2 / 0.00039;
}

function convertToSmartPhonesCharged(MetricTonsOfCo2) {
  return MetricTonsOfCo2 / 0.00000822;
}

function convertToGasConsumed(MetricTonsOfCo2) {
  return MetricTonsOfCo2 / 0.008887;
}

function convertToTreeSeedlingsGrown(MetricTonsOfCo2) {
  return MetricTonsOfCo2 / 0.06;
}

function convertToAcresOfForest(MetricTonsOfCo2) {
  return MetricTonsOfCo2 / 0.84;
}

function formValidation() {
  var alert =
    document.getElementById("form-validation-alert") != null
      ? document.getElementById("form-validation-alert")
      : document.createElement("div");
  alert.id = "form-validation-alert";
  var error = "";
  if (
    document.getElementById("input-text").value.trim() == "" &&
    document.getElementById("measurement").value == ""
  ) {
    error = "Please enter a valid quantity and unit for composting";
  } else if (document.getElementById("input-text").value.trim() == "") {
    error = "Please enter a valid quantity for composting.";
  } else {
    error = "Please enter a valid unit for composting.";
  }
  alert.innerHTML =
    `<div class="w-4/5 md:w-[40%] mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <strong class="font-bold">Uh-oh! That's not how much you composted!</strong>
    <span class="block sm:inline">` +
    error +
    `</span>
  </div>`;
  document.getElementById("form").appendChild(alert);
}

// Load data and create charts using Google Sheets API

const DISCOVERY_DOCS = [
  "https://sheets.googleapis.com/$discovery/rest?version=v4",
];

function handleClientLoad() {
  gapi.load("client", initClient);
}

function initClient() {
  try {
    gapi.client
      .init({
        apiKey: "AIzaSyAalwjvT0D5TWInJchaijnw6L7iap6nCJ0",
        discoveryDocs: DISCOVERY_DOCS,
      })
      .then(function () {
        loadSheets();
      });
  } catch (e) {
    console.log(e);
  }
}

function loadSheets() {
  const spreadsheetId = "1a2lu7WKtuDUc8pVww3tYwzoSUcgwdtpoWC1CxdEGaoI";
  const sheetName = "Sheet1";

  gapi.client.sheets.spreadsheets.values
    .get({
      spreadsheetId,
      range: sheetName,
    })
    .then(
      function (response) {
        const values = response.result.values;
        totalFoodCompost = values[1][3];
        totalYardCompost = values[1][4];
        foodWasteMonth1 = values[3][5];
        foodWasteMonth2 = values[3][6];
        foodWasteMonth3 = values[3][7];
        foodWasteMonth4 = values[3][8];
        foodWasteDataByMonth = [
          foodWasteMonth1,
          foodWasteMonth2,
          foodWasteMonth3,
          foodWasteMonth4,
        ];
        yardWasteMonth1 = values[4][5];
        yardWasteMonth2 = values[4][6];
        yardWasteMonth3 = values[4][7];
        yardWasteMonth4 = values[4][8];
        yardWasteDataByMonth = [
          yardWasteMonth1,
          yardWasteMonth2,
          yardWasteMonth3,
          yardWasteMonth4,
        ];

        let averageTotalCompostPerUser = 0;
        for (var i = 1; i < values.length; i++) {
          averageTotalCompostPerUser += parseInt(values[i][0]);
          averageTotalCompostPerUser += parseInt(values[i][1]);
        }
        averageTotalCompostPerUser =
          averageTotalCompostPerUser / (values.length - 1);
        createCharts(
          totalFoodCompost,
          totalYardCompost,
          foodWasteDataByMonth,
          yardWasteDataByMonth,
          averageTotalCompostPerUser,
        );
      },
      function (response) {
        console.error(
          "Error loading sheet data:",
          response.result.error.message,
        );
      },
    );
}

function createCharts(
  totalFoodCompost,
  totalYardCompost,
  foodWasteDataByMonth,
  yardWasteDataByMonth,
  averageTotalCompostPerUser,
) {
  const pieChartElement = document.getElementById("pie-chart").getContext("2d");
  new Chart(pieChartElement, {
    type: "pie",
    data: {
      labels: ["Food Waste (gallons)", "Yard Waste (gallons)"],
      datasets: [
        {
          labels: [],
          data: [totalFoodCompost, totalYardCompost],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Food Waste vs Yard Waste",
        },
      },
      responsive: true,
      aspectRatio: 1,
      maintainAspectRatio: true,
    },
  });

  const stackedBarChartElement = document
    .getElementById("bar-chart")
    .getContext("2d");
  new Chart(stackedBarChartElement, {
    type: "bar",
    data: {
      labels: ["June 2023", "July 2023", "August 2023", "September 2023"],
      datasets: [
        {
          label: "Food Waste (gallons)",
          data: foodWasteDataByMonth,
          borderWidth: 1,
        },
        {
          label: "Yard Waste (gallons)",
          data: yardWasteDataByMonth,
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Food Waste vs Yard Waste by Month",
        },
      },
      responsive: true,
      aspectRatio: 1.9,
      maintainAspectRatio: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
          beginAtZero: true,
          max: 200,
        },
      },
    },
  });
  const rightChartContainer = document.getElementById("right-flex-container");
  rightChartContainer.appendChild(
    createInfoContainerElement(
      "Average compost per UCCE survey respondent: " +
        averageTotalCompostPerUser +
        " gallons",
      "1",
      "1",
    ),
  );
}
