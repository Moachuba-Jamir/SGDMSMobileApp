var options = {
  series: [89], // dynamically change this
  chart: {
    height: 350,
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
        background: "#fff",
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
          data: [0, 3],
        },
      ],
      chart: {
        type: "area",
        height: 200,
        background: "transparent", // Set chart background color
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

chart.render();


  var chart1 = new ApexCharts(
    document.querySelector("#binClearChart"),
    optionsForDriver
);
  
  chart1.render();

  document.querySelector(".collect").addEventListener("click", function () {
    window.location.href =
      "https://maps.app.goo.gl/5P11PxgNJj9cq3U16";
  });
