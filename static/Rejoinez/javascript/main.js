//Les Elements Html (3eytna l les champs)

const form = document.querySelector('form');
const nom = document.querySelector('#nom');
const prenom = document.querySelector('#prenom');
const email = document.querySelector('#email');
const user = document.querySelector('#user');
const motDePasse = document.querySelector('#motDePasse');
const confirmationMotDePasse = document.querySelector('#confirmationMotDePasse');


function validation() {
  let isError = false;

  // verif nom 
  let lettreRegex = /^[a-zA-Z]+$/;
    // if vide 
  if (nom.value === '') {
    //nextElementSibling ma3ntha l'element li qedamou direct .
    //ila9 ikounou khawa tema 3endhoum parent wahed .
    nom.nextElementSibling.innerText = 'Le champ nom est requis';
    nom.style.borderColor = 'red';
    isError = true;

    // if entree un caractere special 
  } else if(!lettreRegex.test(nom.value)){

    nom.nextElementSibling.innerText = "Le Nom n'est pas valable ";
    nom.style.borderColor = 'red';
    isError = true;
    
  }else {

    nom.nextElementSibling.innerText = '';
    nom.style.borderColor = '';

  }
  
  // verif prenom (kifkif m3a nom)
  if (prenom.value === '') {

    prenom.nextElementSibling.innerText = 'Le champ prénom est requis';
    prenom.style.borderColor = 'red';
    isError = true;

  }else if(!lettreRegex.test(prenom.value)){

    prenom.nextElementSibling.innerText = "Le Prenom n'est pas valable ";
    prenom.style.borderColor = 'red';
    isError = true;

  }else {

    prenom.nextElementSibling.innerText = '';
    prenom.style.borderColor = '';

  }
  

  // verif email 
  if (email.value === '') {

    email.nextElementSibling.innerText = 'Le champ email est requis';
    email.style.borderColor = 'red';
    isError = true;

    //la fin = @gmail.com
  } else if (!email.value.endsWith('@gmail.com')) {

    email.nextElementSibling.innerText = 'L\'adresse email doit se terminer par @gmail.com';
    email.style.borderColor = 'red';
    isError = true;

  } else {
    email.nextElementSibling.innerText = '';
    email.style.borderColor = '';
  }


   // verif Username 

   let lettreRegexs = /^[a-zA-Z0-9]+$/;
   // if vide 
 if (user.value === '') {
   //nextElementSibling ma3ntha l'element li qedamou direct .
   //ila9 ikounou khawa tema 3endhoum parent wahed .
   user.nextElementSibling.innerText = 'Username est requis';
   user.style.borderColor = 'red';
   isError = true;

   // if entree un caractere special 
 } else if(!lettreRegexs.test(user.value)){

   user.nextElementSibling.innerText = "UserName n'est pas valable ";
   user.style.borderColor = 'red';
   isError = true;
   
 }else {

   user.nextElementSibling.innerText = '';
   user.style.borderColor = '';

 }


  //verif mot de passe
  if (motDePasse.value === '') {

    motDePasse.nextElementSibling.innerText = 'Le champ mot de passe est requis';
    motDePasse.style.borderColor = 'red';
    isError = true;

    // inferieur a 8
  } else if (motDePasse.value.length < 8) {

    motDePasse.nextElementSibling.innerText = 'Le mot de passe doit contenir au moins 8 caractères';
    motDePasse.style.borderColor = 'red';
    isError = true;

  } else {

    motDePasse.nextElementSibling.innerText = '';
    motDePasse.style.borderColor = '';

  }
  
  // confirm le mot de passe 
  if (confirmationMotDePasse.value === '') {

    confirmationMotDePasse.nextElementSibling.innerText = 'Le champ de confirmation du mot de passe est requis';
    confirmationMotDePasse.style.borderColor = 'red';
    isError = true;

    // ikounou kifkif
  } else if (confirmationMotDePasse.value !== motDePasse.value) {

    confirmationMotDePasse.nextElementSibling.innerText = 'Le mot de passe et la confirmation du mot de passe doivent être identiques';
    confirmationMotDePasse.style.borderColor = 'red';
    isError = true;

  } else {
    confirmationMotDePasse.nextElementSibling.innerText = '';
    confirmationMotDePasse.style.borderColor = '';
  }
  
  return !isError;
}

// ida mekach erreur i submit l form 
form.addEventListener('submit', (event) => {
  if (!validation()) {
    event.preventDefault();
  }
});