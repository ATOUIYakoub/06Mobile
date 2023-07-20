var swiper = new Swiper(".mySwiper", {
  spaceBetween: 25,
  slidesPerView: 3,
  freeMode: true,
  watchSlidesProgress: true,
});

var swiper2 = new Swiper(".mySwiper2", {
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
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



// feed + fiche

const voir_fiche = document.querySelector(".voir-fiche");
const voir_feed = document.querySelector(".consulte");
const feed  =document.querySelector(".feed");
const fiche = document.querySelector(".fiche-technique");

feed.style.display = "none";
voir_fiche.addEventListener("click",()=>{
  setTimeout(()=>{
    feed.style.display = "none";

  },0)
  fiche.style.display = "block";
})

voir_feed.addEventListener("click",()=>{
  setTimeout(()=>{
    fiche.style.display = "none";

  },0)
  feed.style.display = "block";
})