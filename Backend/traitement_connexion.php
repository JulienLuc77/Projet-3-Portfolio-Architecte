<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];
  
    
    
    $utilisateur_email = 'sophie.bluel@test.tld';
    $utilisateur_motdepasse = 'SOphie';
  
    if ($email === $utilisateur_email && $password === $utilisateur_motdepasse) {
      
      header('Location: ../Frontend/index.html');
      exit();
    } else {
      
      echo "Les informations de connexion sont incorrectes.";
    }
  }
?>