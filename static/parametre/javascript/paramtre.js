const form = document.querySelector('#myform');
const nom = document.querySelector('#nom');
const prenom = document.querySelector('#prenom');
const email = document.querySelector('#email');
const tel = document.querySelector('#tel');
const motDePasseactuel = document.querySelector('#password-actu');
const nouveauMotDePasse = document.querySelector('#password-nouv');
const confirmationMotDePasse = document.querySelector('#password-conf');


const change_nom = document.querySelector(".modifie1")
const change_prenom= document.querySelector(".modifie2")
const change_email= document.querySelector(".modifie3")
const change_tel= document.querySelector(".modifie4")
const change_password= document.querySelector(".modifie5")
const list_password = document.querySelector(".change")


change_nom.onclick = ()=>{
  nom.classList.toggle("block")
  if(nom.classList.contains("block")){
    nom.disabled = true;
  }else{
    nom.disabled = false;

  }

}

change_prenom.onclick = ()=>{
  prenom.classList.toggle("block")
  if(prenom.classList.contains("block")){
    prenom.disabled = true;
  }else{
    prenom.disabled = false;

  }
}

change_email.onclick = ()=>{
  email.classList.toggle("block")
  if(email.classList.contains("block")){
    email.disabled = true;
  }else{
    email.disabled = false;

  }
}

change_tel.onclick = ()=>{
  tel.classList.toggle("block")
  if(tel.classList.contains("block")){
    tel.disabled = true;
  }else{
    tel.disabled = false;
  }
}
change_password.onclick = ()=>{
  list_password.classList.toggle("active")
}










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
  } else if (!lettreRegex.test(nom.value)) {

    nom.nextElementSibling.innerText = "Le Nom n'est pas valable ";
    nom.style.borderColor = 'red';
    isError = true;

  } else {

    nom.nextElementSibling.innerText = '';
    nom.style.borderColor = '';

  }

  // verif prenom (kifkif m3a nom)
  if (prenom.value === '') {

    prenom.nextElementSibling.innerText = 'Le champ prénom est requis';
    prenom.style.borderColor = 'red';
    isError = true;

  } else if (!lettreRegex.test(prenom.value)) {

    prenom.nextElementSibling.innerText = "Le Prenom n'est pas valable ";
    prenom.style.borderColor = 'red';
    isError = true;

  } else {

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

  //verif tel : 10 nombre 
  let telRegex = /^\d{10}$/;

  if (tel.value === '') {

    tel.nextElementSibling.innerText = 'Le champ téléphone est requis';
    tel.style.borderColor = 'red';
    isError = true;

  } else if (tel.value.length !== 10 || !telRegex.test(tel.value)) {

    tel.nextElementSibling.innerText = 'Le numéro de téléphone doit contenir 10 chiffres';
    tel.style.borderColor = 'red';
    isError = true;

  } else {

    tel.nextElementSibling.innerText = '';
    tel.style.borderColor = '';

  }


  if(list_password.classList.contains("active")){

    //verif mot de passe
    if (motDePasseactuel.value === '') {
  
     motDePasseactuel.nextElementSibling.innerText = 'Cette champ est requis';
     motDePasseactuel.style.borderColor = 'red';
     isError = true;
  
     // inferieur a 8
   } else if (motDePasseactuel.value.length < 8) {
  
     motDePasseactuel.nextElementSibling.innerText = 'Le mot de passe doit contenir au moins 8 caractères';
     motDePasseactuel.style.borderColor = 'red';
     isError = true;
  
   } else {
  
     motDePasseactuel.nextElementSibling.innerText = '';
     motDePasseactuel.style.borderColor = '';
  
   }
  
      //verif mot de passe
      if (nouveauMotDePasse.value === '') {
  
       nouveauMotDePasse.nextElementSibling.innerText = 'Cette champ est requis';
       nouveauMotDePasse.style.borderColor = 'red';
       isError = true;
   
       // inferieur a 8
     } else if (nouveauMotDePasse.value.length < 8) {
   
       nouveauMotDePasse.nextElementSibling.innerText = 'Le mot de passe doit contenir au moins 8 caractères';
       nouveauMotDePasse.style.borderColor = 'red';
       isError = true;
   
     } else {
   
       nouveauMotDePasse.nextElementSibling.innerText = '';
       nouveauMotDePasse.style.borderColor = '';
   
     }
   
   // confirm le mot de passe 
   if (confirmationMotDePasse.value === '') {
  
     confirmationMotDePasse.nextElementSibling.innerText = 'Cette champ est requis';
     confirmationMotDePasse.style.borderColor = 'red';
     isError = true;
  
     // ikounou kifkif
   } else if (confirmationMotDePasse.value !== nouveauMotDePasse.value) {
  
     confirmationMotDePasse.nextElementSibling.innerText = 'Le mot de passe et la confirmation du mot de passe doivent être identiques';
     confirmationMotDePasse.style.borderColor = 'red';
     isError = true;
  
   } else {
     confirmationMotDePasse.nextElementSibling.innerText = '';
     confirmationMotDePasse.style.borderColor = '';
   }
  }

  return !isError;
}


form.addEventListener("submit", function (event) {
  if (!validation()) {
    event.preventDefault();
  }
});




