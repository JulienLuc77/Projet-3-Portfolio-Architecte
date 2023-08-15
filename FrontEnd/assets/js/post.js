const addButton = document.getElementById('valider-button');
const photoForm = document.getElementById('photo-form');
addButton.addEventListener('click', async function (e) {
  e.preventDefault();

  const title = document.getElementById('photo-title').value;
  const category = document.getElementById('photo-description').value;
  let categoryId;

  const imageFile = document.getElementById('photo-input').files[0];
  const userId = localStorage.getItem('userId');

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
  formData.append('image', imageFile); 
  formData.append('title', title); 
  formData.append('category', categoryId);

  try {
    const response = await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      },
      body: formData
    });

    if (response.ok) {
      console.log('Travail ajouté avec succès');

      
      document.getElementById('photo-title').value = '';
      document.getElementById('photo-description').value = '';
      document.getElementById('photo-input').value = '';
      document.getElementById('photo-preview').style.display = 'none';

      
      ouvrirDeuxiemePageModale();
    } else {
      const errorData = await response.json();
      console.error("Erreur lors de l'ajout :", errorData);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
const photoInput = document.getElementById('photo-input');
const errorMessage = document.getElementById('error-message');

photoInput.addEventListener('change', function (event) {
  const file = event.target.files[0];

  if (file) {
    const fileSizeInMB = file.size / (1024 * 1024); 

    if (fileSizeInMB > 4) {
      errorMessage.style.display = 'block'; 
      photoInput.value = ''; 
    } else {
      errorMessage.style.display = 'none'; 
      photoPreview.style.display = 'inline';
      const reader = new FileReader();
      reader.onload = function () {
        photoPreview.src = reader.result;
      };
      reader.readAsDataURL(file);
      document.querySelector('.custom-file-button').style.display = 'none';
      document.querySelector('.text').style.display = 'none';
    }
  } else {
    photoPreview.style.display = 'none';
    errorMessage.style.display = 'none'; 
  }
});





