let travaux;
let travauxFiltres;

fetch('http://localhost:5678/api/works')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des projets');
    }
    return response.json();
  })
  .then(data => {
    travaux = data;
    travauxFiltres = data; 
    console.log(travaux);

    let galerieElement = document.querySelector('#gallery');
    galerieElement.innerHTML = '';

    travaux.forEach(travail => {
      let figureElement = document.createElement('figure');
      let imageElement = document.createElement('img');
      imageElement.src = travail.imageUrl;
      imageElement.alt = travail.title;

      let figcaptionElement = document.createElement('figcaption');
      figcaptionElement.textContent = travail.title;

      figureElement.appendChild(imageElement);
      figureElement.appendChild(figcaptionElement);

      galerieElement.appendChild(figureElement);
    });
  })
  .catch(error => {
    console.error(error);
  });

fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(data => {
    console.log(data);

    function filtrerTravauxParCategorie(categorieId) {
      if (categorieId === 0) {
        travauxFiltres = travaux;
      } else {
        travauxFiltres = travaux.filter(travail => travail.category.id === categorieId);
      }
      mettreAJourAffichageTravaux(travauxFiltres);
    }

    function mettreAJourAffichageTravaux(travauxFiltres) {
      let galerieElement = document.querySelector('#gallery');
      galerieElement.innerHTML = '';

      travauxFiltres.forEach(travail => {
        let figureElement = document.createElement('figure');

        let imageElement = document.createElement('img');
        imageElement.src = travail.imageUrl;
        imageElement.alt = travail.title;

        let figcaptionElement = document.createElement('figcaption');
        figcaptionElement.textContent = travail.title;

        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);

        galerieElement.appendChild(figureElement);
      });
    }

    let menuCategories = document.getElementById('menu-categories');

    let categoriesData = [
      {
        "id": 0,
        "name": "Tous"
      },
      {
        "id": 1,
        "name": "Objets"
      },
      {
        "id": 2,
        "name": "Appartements"
      },
      {
        "id": 3,
        "name": "Hôtels & restaurants"
      }
    ];

    categoriesData.forEach(function (categorie) {
      let lienCategorie = document.createElement('a');
      lienCategorie.textContent = categorie.name;
      lienCategorie.href = '#';
      lienCategorie.classList.add('categorie-btn');
      lienCategorie.addEventListener('click', function (event) {
        event.preventDefault();
        filtrerTravauxParCategorie(categorie.id); 
      });

      let listItem = document.createElement('li');
      listItem.appendChild(lienCategorie);

      menuCategories.appendChild(listItem);
    });
  })
  .catch(error => console.error('Erreur lors de la récupération des données :', error));

  document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("loginButton");
    loginButton.addEventListener("click", function (event) {
        event.preventDefault(); 
        loginUser();
    });
});

function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const validEmail = "sophie.bluel@test.tld";
    const validPassword = "SOphie";

    if (email === validEmail && password === validPassword) {
        
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4";
        localStorage.setItem("userToken", token);

        
        window.location.href = "./index.html?authenticated=true";
    } else {
        
        alert("Identifiant ou mot de passe incorrect.");
    }
}

document.addEventListener("DOMContentLoaded", function () {
 
  const urlParams = new URLSearchParams(window.location.search);
  const isAuthenticated = urlParams.get('authenticated');

 
  const token = localStorage.getItem("userToken");
  if (token && isAuthenticated !== "true") {
     
      window.location.href = "./index.html?authenticated=true";
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.getElementById("logoutButton");
  logoutButton.addEventListener("click", function (event) {
      event.preventDefault(); 

      
      localStorage.removeItem("userToken");

      
      window.location.href = "./index2.html";
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const loginListItem = document.getElementById("loginListItem");
  const logoutListItem = document.getElementById("logoutListItem");
  const modifyImageBtn = document.getElementById("modifyImageBtn");
  const modifyProjectsBtn = document.getElementById("modifyProjectsBtn");
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector(".close-btn");
  const filterButtons = document.getElementById("menu-categories"); // Récupérer le conteneur des boutons filtres

  const token = localStorage.getItem("userToken");

  if (token) {
      
      loginListItem.style.display = "none";
      logoutListItem.style.display = "block";

     
      modifyImageBtn.classList.remove("hide-btn");
      modifyProjectsBtn.classList.remove("hide-btn");

      
      filterButtons.style.display = "none";
  } else {
      
      loginListItem.style.display = "block";
      logoutListItem.style.display = "none";

      
      modifyImageBtn.classList.add("hide-btn");
      modifyProjectsBtn.classList.add("hide-btn");

   
      filterButtons.style.display = "block";
  }

  logoutButton.addEventListener("click", function (event) {
      event.preventDefault(); 

      
      localStorage.removeItem("userToken");

      
      window.location.href = "./index2.html";
  });

  modifyImageBtn.addEventListener("click", function () {
      modal.style.display = "block";
  });

  modifyProjectsBtn.addEventListener("click", function () {
      modal.style.display = "block";
  });

  closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
      if (event.target === modal) {
          modal.style.display = "none";
      }
  });
});