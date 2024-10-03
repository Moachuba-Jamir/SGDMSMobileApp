document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const btn = document.getElementById('loginBtn');
    btn.classList.toggle('btnActive');
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username !== "" && password !== "") {
      // Check that both fields are filled
      try {
        const response = await fetch(
          "https://dglmawjx1pzub.cloudfront.net/login",
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


// password toggle 
const passwordField = document.getElementById("password");
const passIcon = document.querySelector(".showPass .pass");

document.querySelector(".showPass").addEventListener("click", () => {
  const isPassword = passwordField.type === "password";
  passwordField.type = isPassword ? "text" : "password";
  passIcon.src = isPassword ? "/assets/pass.png" : "/assets/closedEye.png";
  passIcon.style.filter = "invert(100%)";
});


