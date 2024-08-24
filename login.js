document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username !== "" && password !== "") {
      // Check that both fields are filled
      try {
        const response = await fetch(
          "https://backend-for-sgdms-1-tkoe.onrender.com/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          // Successfully authenticated
          console.log(`From login endpoint: ${JSON.stringify(data, null, 2)}`);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("name", username);
          window.location.href = "dashboard.html";
        } else {
          var err = document.querySelector(".error");
          err.innerHTML = "Incorrect username or password";
        }
      } catch (error) {
        // Handle fetch error
        console.warn("Error driver does not exist ");
      }
    } else {
      alert("Make sure to enter both your username and password");
    }
  });

window.onload = function () {
  var isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    window.location.href = "dashboard.html";
  }
};

document.getElementById("password").addEventListener("change", function () {
  const showPassElement = document.querySelector(".showPass");
  const passIcon = document.querySelector(".showPass .pass");
  var count = 1;
  const passwordField = document.getElementById("password");
  document.querySelector(".showPass").addEventListener("click", () => {
    if (count == 1) {
      // Show password
      passwordField.type = "text";
      passIcon.src = "/assets/pass.png"; // Change to the icon for hidden password
      passIcon.style.filter = "invert(100%)";
      count++;
    } else if (count == 2) {
      // Hide password
      passwordField.type = "password";
      passIcon.src = "/assets/closedEye.png"; // Change to the icon for visible password
      passIcon.style.filter = "invert(100%)"; // Reset filter

      count--;
    }
  });
});


