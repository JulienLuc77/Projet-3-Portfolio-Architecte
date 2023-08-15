function supprimerTravail(id) {
  return fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
    }
  })
  .then(response => {
    if (response.ok) {
      console.log("Travail supprimé avec succès");

      const thumbnailElement = document.getElementById(`thumbnail-${id}`);
      thumbnailElement.remove();
    } else {
      return response.text().then(res => {
        console.error("Erreur lors de la suppression :", res);
        throw new Error("Échec de la suppression");
      });
    }
  });
}


const deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach(button => {
  button.addEventListener('click', async function (e) {
    e.preventDefault(); 

    const travailId = button.dataset.id;

    try {
      await supprimerTravail(travailId);
    } catch (error) {
      console.error(error);
    }
  });
});


const deleteGalleryButton = document.getElementById('delete-gallery-button');
const confirmationModal = document.querySelector('.confirmation-modal');
const confirmYesButton = document.getElementById('confirm-yes');
const confirmNoButton = document.getElementById('confirm-no');

deleteGalleryButton.addEventListener('click', function () {
  confirmationModal.style.display = 'block'; 
});

confirmNoButton.addEventListener('click', function () {
  confirmationModal.style.display = 'none'; 
});

confirmYesButton.addEventListener('click', async function () {
  confirmationModal.style.display = 'none';

  try {
    await supprimerGalerie(); 
  } catch (error) {
    console.error(error);
  }
});


async function supprimerGalerie() {
  const travauxASupprimer = [...travauxFiltres]; 

  
  for (const travail of travauxASupprimer) {
    try {
      await supprimerTravail(travail.id);
    } catch (error) {
      console.error(error);
    }
  }

  
  mettreAJourAffichageTravaux();
}