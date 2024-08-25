// ADD espreadings<30 to userId 1 and 5 in production

var isBinFull = false;
var isBinEmpty = true;
var disposed = document.querySelector(".btn2");
var currMonth = new Date().getMonth();
localStorage.setItem('userNotification', "false");
localStorage.setItem('isNotified', "false");
localStorage.setItem("isDataFetched", "false");


const myPopup = new Popup({
  id: "my-popup",
  title: "",
  content: `
       <div class="modalContainer container binClearContainer">
        <div class=" popup-content disposed-content">
        <h4 class="popupTitle"> <img src="/assets/binClear.png" class="binClearLogo"/> Bin clear!</h4>
          <p class="binClear">Your results have been updated. Checkout the results graph for more information</p>
        </div></div>`,
});

const logoutPop = new Popup({
  id: "logout-popup",
  title: "",
  content: `
       <div class="modalContainer container logoutContainer">
        <div class="popup-content">
        <h5 >Sign out?</h5>
          <p class="binClear">You will be redirected to the login page.</p>
          <div class="userLogOut container">
           <button class="btn btn-warning no myBtn"> No </button>
           &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
          <button class="btn btn-danger yes myBtn"> Yes </button></div>
        </div></div>`,
});

function notificationPermission() {
  // ask for notification from user
  if ("Notification" in window) {
    console.log("Notification API is supported.");

    // Check the current notification permission status
    if (Notification.permission === "granted") {
      console.log("Permission already granted.");
    } else if (Notification.permission === "denied") {
      console.log("Permission was previously denied.");
    } else {
      // Request permission from the user
      Notification.requestPermission().then((permission) => {
        console.log("User responded with:", permission);

        if (permission === "granted") {
          console.log('permission is granted');
        }
      });
    }
  } else {
    console.log("This browser does not support notifications.");
  }
}

if (localStorage.getItem('userNotification') === "false") {
  notificationPermission();
  localStorage.setItem('userNotification', "true");
}
  


function showNotification() {
  // Check if notifications are supported
  if (!("Notification" in window)) {
    console.error("This browser does not support desktop notifications.");
    return;
  }

  // Check notification permission
  if (Notification.permission === "granted") {
    // Show the notification
    const notification = new Notification("Hello!", {
      body: "Thanks for allowing notifications."
    });

    notification.onshow = () => {
      console.log("Notification shown!");
    };

    notification.onclick = () => {
      window.focus();
      setTimeout(() => {
        notification.close();
     },6000)
    };
  } else if (Notification.permission === "default") {
    // Request permission from the user
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        const notification = new Notification("Hello!", {
          body: "Thanks for allowing notifications.",
        });

        notification.onshow = () => {
          console.log("Notification shown!");
        };

        notification.onclick = () => {
          window.focus();
          window.location.href = "/dashboard.html"
         setTimeout(() => {
           notification.close();
         }, 5000);
        };
      } else {
        console.log("Notification permission denied.");
      }
    });
  } else {
    console.log("Notification permission is denied.");
  }
}




function getReadings(userId) {
  var count = [1, 2, 3, 4, 5];
  var button = document.querySelector(".btn2");
  if (userId === "01") {
    fetch(`https://backend-for-sgdms-1.onrender.com/esp${count[0]}`)
      .then((res) => {
        return res.json(); // Ensure the response is returned as JSON
      })
      .then((data) => {
        // update the fill level from here
        console.log(`from chart.js ${data.message}`);
        chart.updateSeries([parseInt(data.message)]);

        if (parseInt(data.message) > 80) {
          isBinEmpty = false;
          isBinFull = true;
          if (localStorage.getItem("isNotified") === "false") {
            showNotification();
            localStorage.setItem("isNotified", "true");
          } else {
            setInterval(() => {
              showNotification();
            }, 600000);
          }
        }

        if (isBinFull) {
          button.classList.remove("disabled");
          isBinEmpty = true;
          isBinFull = false;
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  } else if (userId === "02") {
    fetch(`https://backend-for-sgdms-1.onrender.com/esp${count[1]}`)
      .then((res) => {
        return res.json(); // Ensure the response is returned as JSON
      })
      .then((data) => {
        // update the fill level from here
        console.log(`from chart.js ${data.message}`);
        chart.updateSeries([parseInt(data.message)]);

        if (parseInt(data.message) > 80) {
          isBinEmpty = false;
          isBinFull = true;
        }

        if (isBinFull && parseInt(data.message) < 30) {
          button.classList.remove("disabled");
          isBinEmpty = true;
          isBinFull = false;
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  } else if (userId === "03") {
    fetch(`https://backend-for-sgdms-1.onrender.com/esp${count[2]}`)
      .then((res) => {
        return res.json(); // Ensure the response is returned as JSON
      })
      .then((data) => {
        // update the fill level from here
        console.log(`from chart.js ${data.message}`);
        chart.updateSeries([parseInt(data.message)]);

        if (parseInt(data.message) > 80) {
          isBinEmpty = false;
          isBinFull = true;
        }

        if (isBinFull && parseInt(data.message) < 30) {
          button.classList.remove("disabled");
          isBinEmpty = true;
          isBinFull = false;
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  } else if (userId === "04") {
    fetch(`https://backend-for-sgdms-1.onrender.com/esp${count[3]}`)
      .then((res) => {
        return res.json(); // Ensure the response is returned as JSON
      })
      .then((data) => {
        // update the fill level from here
        console.log(`from chart.js ${data.message}`);
        chart.updateSeries([parseInt(data.message)]);

        if (parseInt(data.message) > 80) {
          isBinEmpty = false;
          isBinFull = true;
        }

        if (isBinFull && parseInt(data.message) < 30) {
          button.classList.remove("disabled");
          isBinEmpty = true;
          isBinFull = false;
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  } else if (userId === "05") {
    fetch(`https://backend-for-sgdms-1.onrender.com/esp${count[4]}`)
      .then((res) => {
        return res.json(); // Ensure the response is returned as JSON
      })
      .then((data) => {
        // update the fill level from here
        console.log(`from chart.js ${data.message}`);
        chart.updateSeries([parseInt(data.message)]);

        if (parseInt(data.message) > 80) {
          isBinEmpty = false;
          isBinFull = true;
        }

        if (isBinFull) {
          button.classList.remove("disabled");
          isBinEmpty = true;
          isBinFull = false;
        }
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
      gradientToColors: ["#e50800"],
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
      data: [0],
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
      type: "vertical",
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
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    labels: {
      style: {
        colors: "#fff",
        fontSize: "10px", // Set x-axis labels text color to white
        rotate: -45,
      },
    },
  },
  yaxis: {
    title: {
      text: "Total Bins cleared",
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
  
  // localStorage.removeItem("isLoggedIn");
  // localStorage.removeItem("name");
  document.querySelector(".no").addEventListener("click", () => {
    logoutPop.hide();
  });
  document.querySelector(".yes").addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("name");
    localStorage.removeItem('isNotified');
    localStorage.removeItem('userNotification');
    localStorage.removeItem('isDataFetched');
    window.location.href = "index.html";
  });
  logoutPop.show();
});

document.addEventListener("DOMContentLoaded", () => {
  localStorage.removeItem("analytics");

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  var myDriverAnalytics = [];

  // initially load the analytics
  fetch(
    `https://backend-for-sgdms-1.onrender.com/driverAnalytics?userName=${localStorage.getItem(
      "name"
    )}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("from the post analytics initial:", data);
      let user = localStorage.getItem("name");

      // Check if data is the driver object
      if (data && data.driverName === user) {
        console.log(`initial : ${data.analytics[2024]}`);
        localStorage.setItem("analytics", JSON.stringify(data.analytics[2024]));
        let analytics = localStorage.getItem("analytics");
        let pureAnalytics = JSON.parse(analytics);
        // Check if data is the driver object
        if (data && data.driverName === user) {
          console.log(`initial : ${data.analytics[2024]}`);
          localStorage.setItem(
            "analytics",
            JSON.stringify(data.analytics[2024])
          );
          let analytics = localStorage.getItem("analytics");
          let pureAnalytics = JSON.parse(analytics);

          chart1.updateSeries([
            {
              name: "Number of bins cleared",
              data: pureAnalytics, // updated data
            },
          ]);
        } else
          chart1.updateSeries([
            {
              name: "Number of bins cleared",
              data: pureAnalytics, // updated data
            },
          ]);
      } else {
        console.error("Driver data not found or doesn't match the user");
      }
    })
    .catch((error) => {
      console.error("Error fetching driver analytics:", error);
    });

  if (!isLoggedIn) {
    // Redirect to login(index) page if not logged in
    window.location.href = "index.html";
  } else {
    var user = localStorage.getItem("name");
    if (!user) return; // Exit if no user is found in localStorage

    document.getElementById("driverName").innerHTML = user;

    fetch("https://backend-for-sgdms-1.onrender.com/bins")
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
          console.log(userId);
          // Attach the event listener only after userId is set
          disposed.addEventListener("click", () => {
            if (!userId) {
              console.error("userId is undefined");
              return;
            }
            const data = {
              userId: userId,
              monthIndex: currMonth,
            };

            fetch(
              "https://backend-for-sgdms-1.onrender.com/driverAnalytics",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  credentials: "include",
                },
                body: JSON.stringify(data),
              }
            )
              .then((response) => response.json())
              .then((data) => {
                console.log(
                  "from the post analytics front end:",
                  data.analytics[2024]
                );

                // mapping a null value if month has value 0 for better UI
                //  let pureAnalytics = data.analytics[2024].map((value) =>
                //    value === 0 ? null : value
                //  );
                chart1.updateSeries([
                  {
                    name: "Number of bins cleared",
                    data: data.analytics[2024], // updated data
                  },
                ]);
                // Add these lines
                localStorage.setItem(
                  "analytics",
                  JSON.stringify(data.analytics[2024])
                );

                console.log(`Is this the driver : ${myDriverAnalytics}`);
              })
              .catch((error) => {
                console.error("Error in POST request:", error);
              });

            disposed.classList.add("disabled");
            myPopup.show();
            setTimeout(() => {
              myPopup.hide();
            }, 5000);
          });

          switch (userId) {
            case "01":
              if (localStorage.getItem('isDataFetched') === "false") {
                getReadings(userId);
                localStorage.setItem("isDataFetched", "true");
              } else {
                 setInterval(() => {
                   getReadings(userId);
                 }, 600000);
              }
              break;
            case "02":
               if (localStorage.getItem("isDataFetched") === "false") {
                 getReadings(userId);
                 localStorage.setItem("isDataFetched", "true");
               } else {
                 setInterval(() => {
                   getReadings(userId);
                 }, 600000);
               }
              break;
            case "03":
             if (localStorage.getItem("isDataFetched") === "false") {
               getReadings(userId);
               localStorage.setItem("isDataFetched", "true");
             } else {
               setInterval(() => {
                 getReadings(userId);
               }, 600000);
             }
              break;
            case "04":
              if (localStorage.getItem("isDataFetched") === "false") {
                getReadings(userId);
                localStorage.setItem("isDataFetched", "true");
              } else {
                setInterval(() => {
                  getReadings(userId);
                }, 600000);
              }
              break;
            case "05":
               if (localStorage.getItem("isDataFetched") === "false") {
                 getReadings(userId);
                 localStorage.setItem("isDataFetched", "true");
               } else {
                 setInterval(() => {
                   getReadings(userId);
                 }, 600000);
               }
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



