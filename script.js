function getReadings(userId) {
  var count = [1, 2, 3, 4, 5];
  if (userId === "01") {
    fetch(`https://backend-for-sgdms-1-tkoe.onrender.com/esp${count[0]}`)
      .then((res) => {
        return res.json(); // Ensure the response is returned as JSON
      })
      .then(({ message }) => {
        // update the fill level from here
        console.log(`from chart.js ${message}`);
        chart.updateSeries([parseInt(message)]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  } else if (userId === "02") {
    fetch(`https://backend-for-sgdms-1-tkoe.onrender.com/esp${count[1]}`)
      .then((res) => {
        return res.json(); // Ensure the response is returned as JSON
      })
      .then(({ message }) => {
        // update the fill level from here
        console.log(`from chart.js ${message}`);
        chart.updateSeries([parseInt(message)]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  } else if (userId === "03") {
    fetch(`https://backend-for-sgdms-1-tkoe.onrender.com/esp${count[1]}`)
      .then((res) => {
        return res.json(); // Ensure the response is returned as JSON
      })
      .then(({ message }) => {
        // update the fill level from here
        console.log(`from chart.js ${message}`);
        chart.updateSeries([parseInt(message)]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  } else if (userId === "04") {
    fetch(`https://backend-for-sgdms-1-tkoe.onrender.com/esp${count[2]}`)
      .then((res) => {
        return res.json(); // Ensure the response is returned as JSON
      })
      .then(({ message }) => {
        // update the fill level from here
        console.log(`from chart.js ${message}`);
        chart.updateSeries([parseInt(message)]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  } else if (userId === "05") {
    fetch(`https://backend-for-sgdms-1-tkoe.onrender.com/esp${count[4]}`)
      .then((res) => {
        return res.json(); // Ensure the response is returned as JSON
      })
      .then(({ message }) => {
        // update the fill level from here
        console.log(`from chart.js ${message}`);
        chart.updateSeries([parseInt(message)]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
}

var options = {
  series: [50], // dynamically change this
  chart: {
    height: 400,
    type: "radialBar",
    toolbar: {
      show: true,
      tools: {
        download: false,
      },
    },
  },
  plotOptions: {
    radialBar: {
      startAngle: -160,
      endAngle: 160,
      hollow: {
        margin: 0,
        size: "50%",
        background: "#F5F5D7",
        image: undefined,
        imageOffsetX: 0,
        imageOffsetY: 0,
        position: "front",
        dropShadow: {
          enabled: true,
          top: 3,
          left: 0,
          blur: 4,
          opacity: 0.4,
        },
      },
      track: {
        background: "#fff",
        strokeWidth: "8%",
        margin: 2, // margin is in pixels
        dropShadow: {
          enabled: true,
          top: -3,
          left: 0,
          blur: 4,
          opacity: 0.35,
        },
      },

      dataLabels: {
        show: true,
        name: {
          offsetY: -10,
          show: true,
          color: "#888",
          fontSize: "15px",
        },
        value: {
          formatter: function (val) {
            return parseInt(val);
          },
          color: "#111",
          fontSize: "26px",
          show: true,
        },
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "radial",
      shadeIntensity: 2,
      gradientToColors: ["#C70039"],
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
    },
  },
  stroke: {
    lineCap: "round",
  },
  labels: ["Fill Level"],
};

var optionsForDriver = {
  series: [
    {
      name: "Number of bins cleared",
      data: [0, 5],
    },
  ],
  chart: {
    type: "area",
    height: 200,
    background: "transparent", // Set chart background color
    toolbar: {
      show: false, // Hides the entire toolbar
    },
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "horizontal",
      shadeIntensity: 0.5,
      gradientToColors: ["#50e3c2"], // to set gradient colors
      inverseColors: false,
      opacityFrom: 0.7,
      opacityTo: 0.5,
      stops: [0, 100],
    },
  },
  xaxis: {
    type: "category",
    categories: [],
    labels: {
      style: {
        colors: "#fff", // Set x-axis labels text color to white
        rotate: -45,
      },
    },
  },
  yaxis: {
    title: {
      text: "Net Bins cleared",
      style: {
        color: "#fff", // Set y-axis title color to white
      },
    },
    labels: {
      style: {
        colors: "#fff", // Set y-axis labels text color to white
      },
    },
  },
  grid: {
    borderColor: "#555", // Grid line color
    strokeDashArray: 5,
  },
  colors: ["#66023c"],
  tooltip: {
    theme: "dark", // Set tooltip theme to dark
  },
  theme: {
    mode: "dark", // Use dark mode for the overall theme
  },
};

var chart = new ApexCharts(document.querySelector("#chart"), options);

var chart1 = new ApexCharts(
  document.querySelector("#binClearChart"),
  optionsForDriver
);

chart.render();
chart1.render();

document.querySelector(".logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("name");
  window.location.href = "index.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    // Redirect to login page if not logged in
    window.location.href = "login.html";
  } else {
    var user = localStorage.getItem("name");
    if (!user) return; // Exit if no user is found in localStorage

    document.getElementById("driverName").innerHTML = user;

    fetch("https://backend-for-sgdms-1-tkoe.onrender.com/bins")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data fetched:", data);

        // Find the user in the drivers array
        const driver = data.drivers.find(
          (driver) => driver.driverName === user
        );
        if (driver) {
          // Get userId
          const userId = driver.id;
          switch (userId) {
            case "01":
              setInterval(() => {
                getReadings(userId);
              }, 5000);
              break;
            case "02":
              setInterval(() => {
                getReadings(userId);
              }, 5000);
              break;
            case "03":
              setInterval(() => {
                getReadings(userId);
              }, 5000);
              break;
            case "04":
              setInterval(() => {
                getReadings(userId);
              }, 5000);
              break;
            case "05":
              setInterval(() => {
                getReadings(userId);
              }, 5000);
              break;
            default:
              console.warn("NO such endpoints for esp readings ");
              break;
          }

          // find the links in the object
          const locationLink = data.bins[0].myBins.find(
            (bin) => bin.id === userId
          );
          if (locationLink) {
            console.log(locationLink.driverLink);
            document.querySelector(".collect").addEventListener("click", () => {
              window.location.href = locationLink.driverLink;
            });
          }
          // Find the bin for the user
          const userBin = data.bins[0].myBins.find((bin) => bin.id === userId);
          if (userBin) {
            document.getElementById("location").innerHTML = userBin.location;
            console.log(userBin.driverLink);
          }
        } else {
          console.error("No bin found for user:");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  if (isLoggedIn === "true") {
    // Redirect to dashboard if already logged in
    if (window.location.pathname !== "/dashboard.html") {
      window.location.href = "dashboard.html";
    }
  }
});
