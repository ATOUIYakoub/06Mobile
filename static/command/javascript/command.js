// //Les Elements Html (3eytna l les champs)

const form = document.querySelector('#myform');
const nom = document.querySelector('#nom');
const prenom = document.querySelector('#prenom');
const email = document.querySelector('#email');
const tel = document.querySelector('#tel');
const teltwo = document.querySelector('#teltwo');
const addresse = document.querySelector('#addresse');
const commune = document.querySelector('#commune');
const wilaya = document.querySelector('#wilaya');
const textarea = document.querySelector("#myTextarea");
const textareaCounter = document.querySelector("#textareaCounter");
const textareaError = document.querySelector("#textareaError");




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

   //verif tel2 : 10 nombre 
   if (teltwo.value === '') {
      isError = false;

   } else if (teltwo.value.length !== 10 || !telRegex.test(teltwo.value)) {

      teltwo.nextElementSibling.innerText = 'Le numéro de téléphone doit contenir 10 chiffres';
      teltwo.style.borderColor = 'red';
      isError = true;

   } else {

      teltwo.nextElementSibling.innerText = '';
      teltwo.style.borderColor = '';

   }


   // verif addrees 
   let lettreRegexadd = /^[a-zA-Z]+$/;
   // if vide 
   if (addresse.value === '') {
      //nextElementSibling ma3ntha l'element li qedamou direct .
      //ila9 ikounou khawa tema 3endhoum parent wahed .
      addresse.nextElementSibling.innerText = 'Le champ addresse est requis';
      addresse.style.borderColor = 'red';
      isError = true;

      // if entree un caractere special 
   } else if (!lettreRegexadd.test(addresse.value)) {

      addresse.nextElementSibling.innerText = "Le addresse n'est pas valable ";
      addresse.style.borderColor = 'red';
      isError = true;

   } else {

      addresse.nextElementSibling.innerText = '';
      addresse.style.borderColor = '';

   }


   // verif commune 
   let lettreRegexcommune = /^[a-zA-Z]+$/;
   // if vide 
   if (commune.value === '') {
      //nextElementSibling ma3ntha l'element li qedamou direct .
      //ila9 ikounou khawa tema 3endhoum parent wahed .
      commune.nextElementSibling.innerText = 'Le champ commune est requis';
      commune.style.borderColor = 'red';
      isError = true;

      // if entree un caractere special 
   } else if (!lettreRegexcommune.test(commune.value)) {

      commune.nextElementSibling.innerText = "Le commune n'est pas valable ";
      commune.style.borderColor = 'red';
      isError = true;

   } else {

      commune.nextElementSibling.innerText = '';
      commune.style.borderColor = '';
   }




      // wilaya commune 
      let lettreRegexwilaya= /^[a-zA-Z]+$/;
      // if vide 
      if (wilaya.value === '') {
         //nextElementSibling ma3ntha l'element li qedamou direct .
         //ila9 ikounou khawa tema 3endhoum parent wahed .
         wilaya.nextElementSibling.innerText = 'Le champ wilaya est requis';
         wilaya.style.borderColor = 'red';
         isError = true;
   
         // if entree un caractere special 
      } else if (!lettreRegexwilaya.test(wilaya.value)) {
   
         wilaya.nextElementSibling.innerText = "Le wilaya n'est pas valable ";
         wilaya.style.borderColor = 'red';
         isError = true;
   
      } else {
   
         wilaya.nextElementSibling.innerText = '';
         wilaya.style.borderColor = '';
      }

      const err_term = document.querySelector(".erreur-term");
      if(!checkbo.checked){
         err_term.innerHTML ="Lire Les Terms"
         isError = true;
      }

   return !isError;
}





function validationTextarea() {
   var textareaValue = textarea.value;
   let lettreRegex = /[><\/;:{}\[\]#@'%"%]+/;

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
   var compteur = textarea.value.length;
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



// ckeckbox !Font-bold! (reste connecter) 
let checkbo = document.querySelector("#reste")
let label = document.querySelector("label")


checkbo.addEventListener("click", () => {
   label.classList.toggle("active");

})






