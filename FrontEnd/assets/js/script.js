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