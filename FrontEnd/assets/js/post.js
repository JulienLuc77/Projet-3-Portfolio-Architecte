const addButton = document.getElementById('valider-button');
const photoForm = document.getElementById('photo-form');
addButton.addEventListener('click', function (e) {
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

    case "Hôtels & restaurants":
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

  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    },
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});