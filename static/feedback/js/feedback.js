const stars = document.querySelectorAll('.star');

function setRating(rating) {
stars.forEach((star, index) => {
    if (index < rating) {
    star.classList.add('active');
    } else {
    star.classList.remove('active');
    }
});
document.querySelector('#rating').value = rating;
}

stars.forEach((star) => {
star.addEventListener('click', (event) => {
    const rating = parseInt(event.target.getAttribute('data-rating'));
    setRating(rating);
});
});




const form = document.querySelector('#form');
const textarea = document.getElementById("myTextarea");
const textareaCounter = document.getElementById("textareaCounter");
const textareaError = document.getElementById("textareaError");


function validationTextarea() {
  var textareaValue = textarea.value;
  let  lettreRegex = /[><\/;:{}\[\]#@'%"%]+/;

  //si message >500 affiche le message
  if (textareaValue.length > 500) {
    textareaError.style.display = "block";
    textarea.style.borderColor = "red";
    textareaError.innerHTML = "Entrer Un message Inferieur a 500 lettres";
    return false;

    //si message est vide affiche le message

  } else if (lettreRegex.test(textarea.value)) {
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
  if (!validationTextarea()) {
    event.preventDefault();
  }
});


