function supprimerTravail(id) {
  fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("userToken")}`
    }
  })
  .then(response => {
    const status = response.status;

    if (status !== 200) {
      
      document.querySelector(".wrongpassword").innerHTML = "Image non supprimée";
      response.text().then(res => console.log(res));
      return Promise.reject(new Error(status));
    }
    console.log("Travail supprimé avec succès");

    const thumbnailElement = document.getElementById(`thumbnail-${id}`);
    thumbnailElement.remove();
    fetchTravaux();
  })
  .catch(err => console.log(err));
}
const deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach(button => {
  button.addEventListener('click', function () {
    
    const travailId = button.dataset.id;
    
    supprimerTravail(travailId);
  });
});