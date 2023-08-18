let travaux;
let travauxFiltres;

function fetchTravaux() {
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

      
      if (travaux.length > 0) {
        const userId = travaux[0].userId;
        localStorage.setItem('userId', userId);
      }

      console.log(travaux);
      mettreAJourAffichageTravaux();
    })
    .catch(error => {
      console.error(error);
    });
}

function mettreAJourAffichageTravaux() {
  let galerieElement = document.querySelector('#gallery');
  galerieElement.innerHTML = '';

  let thumbnailsContainer = document.getElementById('thumbnails-container');
  thumbnailsContainer.innerHTML = '';

  function afficherPage1() {
    let page1 = document.querySelector('.page1');
    let page2 = document.querySelector('.page2');
    page1.style.display = 'block';
    page2.style.display = 'none';
    validButton.setAttribute('disabled', 'disabled');
  }

  function afficherDeuxiemePage() {
    let page1 = document.querySelector('.page1');
    let page2 = document.querySelector('.page2');
    page1.style.display = 'none';
    page2.style.display = 'block';
  }
  
  function retourPagePrecedente() {
    let page1 = document.querySelector('.page1');
    let page2 = document.querySelector('.page2');
    page2.style.display = 'none';
    page1.style.display = 'block';
  }
  
  function ouvrirDeuxiemePageModale() {
    afficherPage1();  
    afficherDeuxiemePage();
  }
  
  const addPhotoButton = document.getElementById('add-photo-button');
  addPhotoButton.addEventListener('click', function () {
    
    ouvrirDeuxiemePageModale();
  });
  
  const retourButton = document.getElementById('retour-page-precedente');
  retourButton.addEventListener('click', function () {
    
    retourPagePrecedente();
  });
  
const photoForm = document.getElementById('photo-form');
const validButton = photoForm.querySelector('.valid');


function checkFormValidity() {
  if (photoForm.checkValidity()) {
    validButton.removeAttribute('disabled');
  } else {
    validButton.setAttribute('disabled', 'disabled');
  }
}
function fermerModale() {
  afficherPage1();
  let modal = document.getElementById('modal');
  modal.style.display = 'none';
}

photoForm.addEventListener('input', checkFormValidity);
photoForm.addEventListener('change', checkFormValidity);
photoForm.addEventListener('submit', function (event) {
  event.preventDefault(); 

 
  const title = document.getElementById('photo-title').value;
  const category = document.getElementById('photo-description').value;
  const imageFile = document.getElementById('photo-input').files[0];

  
  const newPhoto = {
    title: title,
    category: category,
    imageUrl: URL.createObjectURL(imageFile) 
  };

  
  travauxFiltres.push(newPhoto);

  
  photoForm.reset();
  const photoInput = document.getElementById('photo-input');
  photoInput.value = '';
  
  
  photoPreview.style.display = 'none';
  photoPreview.src = '';
  
  mettreAJourAffichageTravaux();
  fermerModale();
});
const photoInput = document.getElementById('photo-input');
const photoPreview = document.getElementById('photo-preview');


photoInput.addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    
    photoPreview.style.display = 'inline';
    const reader = new FileReader();
    reader.onload = function () {
      photoPreview.src = reader.result;
    };
    reader.readAsDataURL(file);
    document.querySelector('.custom-file-button').style.display = 'none';
    document.querySelector('.text').style.display = 'none';

  } else {
    
    photoPreview.style.display = 'none';
  }
});
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

    let thumbnailElement = document.createElement('div');
    thumbnailElement.classList.add('thumbnail');

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = '<i class="fa-regular fa-trash-can" style="color: #ffffff;"></i>';
    deleteButton.addEventListener('click', function () {
      supprimerTravail(travail.id);
    });

    let editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.textContent = 'éditer';

    let thumbnailImageElement = document.createElement('img');
    thumbnailImageElement.src = travail.imageUrl;
    thumbnailImageElement.alt = travail.title;

    thumbnailElement.appendChild(deleteButton);
    thumbnailElement.appendChild(editButton);
    thumbnailElement.appendChild(thumbnailImageElement);

    thumbnailsContainer.appendChild(thumbnailElement);
  });
}

function fetchCategories() {
  fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      afficherCategories(data);
    })
    .catch(error => console.error('Erreur lors de la récupération des données :', error));
}

function filtrerTravauxParCategorie(categorieId) {
  if (categorieId === 0) {
    travauxFiltres = travaux;
  } else {
    travauxFiltres = travaux.filter(travail => travail.category.id === categorieId);
  }
  mettreAJourAffichageTravaux();
}
function supprimerTravail(id) {
  travauxFiltres = travauxFiltres.filter(travail => travail.id !== id);
  mettreAJourAffichageTravaux();
}
function afficherCategories(categoriesData) {
  let menuCategories = document.getElementById('menu-categories');
  menuCategories.innerHTML = '';

  let lienTous = document.createElement('a');
  lienTous.textContent = "Tous";
  lienTous.href = '#';
  lienTous.classList.add('categorie-btn', 'active'); 
  lienTous.addEventListener('click', function (event) {
    event.preventDefault();
    filtrerTravauxParCategorie(0);

    
    menuCategories.querySelectorAll('.categorie-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    lienTous.classList.add('active');
  });

  let listItemTous = document.createElement('li');
  listItemTous.appendChild(lienTous);

  menuCategories.appendChild(listItemTous);

  categoriesData.forEach(function (categorie) {
    let lienCategorie = document.createElement('a');
    lienCategorie.textContent = categorie.name;
    lienCategorie.href = '#';
    lienCategorie.classList.add('categorie-btn');
    lienCategorie.addEventListener('click', function (event) {
      event.preventDefault();
      filtrerTravauxParCategorie(categorie.id);

      
      menuCategories.querySelectorAll('.categorie-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      lienCategorie.classList.add('active');
    });

    let listItem = document.createElement('li');
    listItem.appendChild(lienCategorie);

    menuCategories.appendChild(listItem);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  fetchCategories(); 
  fetchTravaux();
});
function createThumbnail(travail) {
  let thumbnailElement = document.createElement('div');
  thumbnailElement.classList.add('thumbnail');

  let deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.innerHTML = '<i class="fa-regular fa-trash-can" style="color: #ffffff;"></i>';
  deleteButton.addEventListener('click', function () {
    supprimerTravail(travail.id);
  });

  
  let editButton = document.createElement('button');
  editButton.classList.add('edit-button');
  editButton.textContent = 'éditer';

 
  let thumbnailImageElement = document.createElement('img');
  thumbnailImageElement.src = travail.imageUrl;
  thumbnailImageElement.alt = travail.title;


  thumbnailElement.appendChild(deleteButton);
  thumbnailElement.appendChild(editButton);
  thumbnailElement.appendChild(thumbnailImageElement);

  return thumbnailElement;
}

function afficherThumbnails() {
  let thumbnailsContainer = document.getElementById('thumbnails-container');
  thumbnailsContainer.innerHTML = '';

  travauxFiltres.forEach(travail => {
    let thumbnailElement = createThumbnail(travail);
    thumbnailsContainer.appendChild(thumbnailElement);
  });
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

      
      window.location.href = "./login.html";
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const loginListItem = document.getElementById("loginListItem");
  const logoutListItem = document.getElementById("logoutListItem");
  const modifyImageBtn = document.getElementById("modifyImageBtn");
  const modifyProjectsBtn = document.getElementById("modifyProjectsBtn");
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector(".close-btn");
  const filterButtons = document.getElementById("menu-categories"); 

  const token = localStorage.getItem("userToken");

  if (token) {
      
      loginListItem.style.display = "none";
      logoutListItem.style.display = "block";

     
      modifyImageBtn.classList.remove("hide-btn");
      modifyProjectsBtn.classList.remove("hide-btn");

      
      filterButtons.style.display = "none";
      filterButtons.classList.add("hidden");
  } else {
      
      loginListItem.style.display = "block";
      logoutListItem.style.display = "none";

      
      modifyImageBtn.classList.add("hide-btn");
      modifyProjectsBtn.classList.add("hide-btn");

      filterButtons.classList.remove("hidden");
      filterButtons.style.display = "block";
  }

  logoutButton.addEventListener("click", function (event) {
      event.preventDefault(); 

      
      localStorage.removeItem("userToken");

      
      window.location.href = "./login.html";
  });

  modifyImageBtn.addEventListener("click", function () {
      afficherPage1();
      ouvrirDeuxiemePageModale();
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
  const closeBtnPage1 = document.querySelector(".page1 .close-btn");
  closeBtnPage1.addEventListener("click", function () {
    modal.style.display = "none";
  });

  
  const closeBtnPage2 = document.getElementById("close-btn");
  closeBtnPage2.addEventListener("click", () => {
    modal.style.display = "none";
  });

});
document.addEventListener("DOMContentLoaded", function () {
  const bandElement = document.querySelector(".band");
  const modeEditionBtn = document.getElementById("modeEditionBtn");
  const publishChangesBtn = document.getElementById("publishChangesBtn");

  modeEditionBtn.addEventListener("click", function () {
    modal.style.display = "block";
});
  publishChangesBtn.addEventListener("click", async function () {
    const title = document.getElementById("photo-title").value;
    const category = document.getElementById("photo-description").value;
    let categoryId;

    const imageFile = document.getElementById("photo-input").files[0];

    switch (category) {
      case "Objets":
        categoryId = 1;
        break;

      case "Appartements":
        categoryId = 2;
        break;

      case "Hotels & restaurants":
        categoryId = 3;
        break;

      default:
        categoryId = 0;
        break;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("title", title);
    formData.append("category", categoryId);

    try {
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log("Travail ajouté avec succès");

        document.getElementById("photo-title").value = "";
        document.getElementById("photo-description").value = "";
        document.getElementById("photo-input").value = "";
        document.getElementById("photo-preview").style.display = "none";

        travauxFiltres.push({
          title: title,
          category: {
            id: categoryId,
            name: category,
          },
          imageUrl: URL.createObjectURL(imageFile),
        });

        afficherThumbnails();
        fermerModale();
      } else {
        const errorData = await response.json();
        console.error("Erreur lors de l'ajout :", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  const token = localStorage.getItem("userToken");
  if (token) {
    bandElement.style.display = "block";
  }
});