const addButton = document.getElementById('valider-button');
const photoForm = document.getElementById('photo-form');
addButton.addEventListener('submit', function (e) {
  e.preventDefault();
  
  const title = document.getElementById('photo-title').value;
  const category = document.getElementById('photo-description').value;
  const imageFile = document.getElementById('photo-input').files[0];
  const userId = localStorage.getItem('userId');


  const formData = new FormData();
  formData.append('image', imageFile); 
  formData.append('title', title); 
  formData.append('category', category);
  formData.append('userId', userId);

  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      'accept':'application/json',
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    },
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout du travail');
      }
      return response.json();
    })
    .then(data => {
      console.log('Travail ajouté avec succès:', data);
      
      fetchTravaux();

      return false();
    })
    .catch(error => {
      console.error('Erreur:', error);
      
      
      const errorMessage = document.getElementById('error-message');
      errorMessage.textContent = 'Erreur lors de l\'ajout du travail. Veuillez réessayer.';
    });
});