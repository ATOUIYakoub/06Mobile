//Les Elements Html (3eytna l les champs)
const motDePasse = document.querySelector('#motDePasse');
const confirmationMotDePasse = document.querySelector('#confirmationMotDePasse');
const form = document.querySelector("form");

console.log(form)

function validation() {
  let isError = false;

  //verif mot de passe
  if (motDePasse.value === '') {

    motDePasse.nextElementSibling.innerText = 'Cette champ est requis';
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

    confirmationMotDePasse.nextElementSibling.innerText = 'Cette champ est requis';
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
form.addEventListener("submit", (event) => {
  if (!validation()) {
    event.preventDefault();
  }
});

