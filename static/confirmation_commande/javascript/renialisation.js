//Les Elements Html (3eytna l les champs)
const code = document.querySelector("#code");
const form = document.querySelector("form");

console.log(form)

function validation() {
  let isError = false;

  //verif code : 6 nombre
  let telRegex = /^\d{6}$/;

  if (code.value === "") {
    code.nextElementSibling.innerText = "Veuillez Saisaire Le Code";
    code.style.borderColor = "red";
    isError = true;
    // change le nul dans le condition
  } else if (code.value.length !== 6 || !telRegex.test(code.value)) {
    code.nextElementSibling.innerText = "Le Code doit contenir 6 chiffres";
    code.style.borderColor = "red";
    isError = true;
  } else {
    code.nextElementSibling.innerText = "";
    code.style.borderColor = "";
  }

  return !isError;
}

// ida mekach erreur i submit l form
form.addEventListener("submit", (event) => {
  if (!validation()) {
    event.preventDefault();
  }
});

