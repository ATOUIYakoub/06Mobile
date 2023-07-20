//Les Elements Html (3eytna l les champs)
const email = document.querySelector('#email');



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

 
  
  return !isError;
}

// ida mekach erreur i submit l form 
form.addEventListener('submit', (event) => {
  if (!validation()) {
    event.preventDefault();
  }
});