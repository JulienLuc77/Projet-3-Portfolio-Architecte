const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", loginUser);

function loginUser(event) {
  event.preventDefault(); 

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then(response => {
    const status = response.status;

    if (status != 200) {
      document.querySelector(".wrongpassword").innerHTML = "Identifiant ou mot de passe incorrect.";
      response.text().then(res => console.log(res));
      return Promise.reject(new Error(status));
    }
    return response.json();
})
.then(result => {
  localStorage.setItem("userToken", result.token);
  window.location.href = "./index.html";
})
.catch(err => 
  console.log(err));
}

