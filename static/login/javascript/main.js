// ckeckbox !Font-bold! (reste connecter) 
let checkbox = document.querySelector("#reste")
let label = document.querySelector(".label")

label.addEventListener("click", () => {
   this.classList.toggle("active");
})

checkbox.addEventListener("click", () => {
   label.classList.toggle("active");
})

   // Récupération des éléments du formulaire
   var email = document.getElementById("email");
   var emailError = document.getElementById("emailError");
   var user = document.getElementById("user");
   var motDePasse = document.getElementById("password");

//validation
function validate() {


   let isError = false;
  
   // verif user
   let lettreRegex = /^[a-zA-Z0-9]+$/;
   if (user.value === '') {

      user.nextElementSibling.innerText = "UserName est requis";
      user.style.borderColor = 'red';
      isError = true;

   } else if (!lettreRegex.test(user.value)) {

      user.nextElementSibling.innerText = "user n'est pas valable ";
      user.style.borderColor = 'red';
      isError = true;

   } else {

      user.nextElementSibling.innerText = '';
      user.style.borderColor = '';

   }
   // Validation du champ "Email"
   if (email.value == "") {
      emailError.textContent = "L'email est obligatoire";
      email.style.borderColor = "red";
      email.style.borderWidth = "2px";
      email.style.outline = "0";
      email.focus();
      return false;
   } else if (!isValidEmail(email.value)) {
      emailError.textContent = "L'adresse email est incorrecte";
      email.style.borderColor = "red";
      email.style.borderWidth = "2px";
      email.style.outline = "0";
      email.focus();
      return false;
   }




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
  return !isError;

}
function isValidEmail(email) {
   // Vérification de la validité de l'email avec une expression régulière
   var emailRegex = /\S+@\S+\.\S+/;
   if (!emailRegex.test(email)) {
      return false;
   }
   // Vérification si l'email se termine par "@gmail.com"
   var domain = email.split("@")[1];
   return domain === "gmail.com";
}
const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
   if (!validate()) {
      event.preventDefault();
   }
});



