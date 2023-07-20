//get des elements html

const form = document.querySelector('#form');
const email = document.querySelector('#email');
const nom = document.querySelector('#nom');
const textarea = document.getElementById("myTextarea");
const textareaCounter = document.getElementById("textareaCounter");
const textareaError = document.getElementById("textareaError");

function validation() {
  let isError = false;

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

    nom.nextElementSibling.innerText = "Le Nom ou Le Prenom n'est pas valable ";
    nom.style.borderColor = 'red';
    isError = true;

  } else {

    nom.nextElementSibling.innerText = '';
    nom.style.borderColor = '';

  }
  return !isError;
}

function validationTextarea() {
  var textareaValue = textarea.value;
  let lettreRegex = /^[a-zA-Z]+$/;

  //si message >500 affiche le message
  if (textareaValue.length > 500) {
    textareaError.style.display = "block";
    textarea.style.borderColor = "red";
    textareaError.innerHTML = "Entrer Un message Inferieur a 500 lettres";
    return false;

    //si message est vide affiche le message

  } else if (!lettreRegex.test(textarea.value)) {
    textareaError.style.display = "block";
    textareaError.innerText = "Le message n'est pas valable ";
    textarea.style.borderColor = 'red';
    isError = true;

  } else if (textareaValue === "") {
    textareaError.innerHTML = "Le champ Message est requis"
  } else {
    textareaError.style.display = "none";
    textarea.style.borderColor = "initial";
    return true;
  }
}

//counter
textarea.addEventListener("input", function () {
  var compteur = textarea.value.length + 1;
  if (textarea.value === "") {
    textareaCounter.innerText = "0/500"
  } else {
    if (compteur <= 500) {
      textareaCounter.innerText = compteur + "/500";
      textareaCounter.style.color = "green";
    } else {
      textareaCounter.innerText = "Attention!!!";
      textareaCounter.style.color = "red";

    }
  }
});

//submit ida mekach les erreurs

form.addEventListener("submit", function (event) {
  if (!validation() || !validationTextarea()) {
    event.preventDefault();
  }
});