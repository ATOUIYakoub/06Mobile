
/*favois*/
const heartBtns = document.querySelectorAll("#heart-btn");
let emptyHead = document.querySelector("#empty-head")
function toggleHeart() {
  const heartIcon = this.querySelectorAll(".fa-heart");
  heartIcon.forEach(icon => icon.classList.toggle("show"));
}

heartBtns.forEach(btn => btn.addEventListener("click", toggleHeart));




/**** sidebar ****/
      var menuButton = document.querySelector('.menu-button');
      var closeButton = document.querySelector('.close-button');
      var container = document.querySelector('#container');

      menuButton.addEventListener('click', function() {
        container.classList.add('show-sidebar');
      });

      closeButton.addEventListener('click', function() {
        container.classList.remove('show-sidebar');
      });

 /***telephone Accessoire  */
 const select = document.querySelector('select');
const title = document.querySelector('#title');

// Ajouter un écouteur d'événements pour écouter les changements de sélection
select.addEventListener('change', function() {
  // Vérifier si l'option "Telephones" est sélectionnée
  if (select.value === 'Telephones') {
    // Si c'est le cas, afficher "Telephones" comme titre
    title.textContent = 'Telephones';
  } else {
    // Sinon, afficher "Accessoire" comme titre
    title.textContent = 'Accessoire';
  }
});
 
 
/**filttre */
 
function rechercherProduits() {
 
// définir les valeurs par défaut
var prixMinDefault = 1;
var prixMaxDefault = 1000000;

// récupérer les éléments HTML des champs "prix min" et "prix max"
var prixMinInput = document.getElementById("min-price");
var prixMaxInput = document.getElementById("max-price");


// vérifier si les champs ont une valeur, sinon utiliser les valeurs par défaut
if (!prixMinInput.value) {
  prixMinInput.value = prixMinDefault;
}
if (!prixMaxInput.value) {
  prixMaxInput.value = prixMaxDefault;
}

// récupérer les autres valeurs de recherche
const enStock = document.getElementById('en-stock').checked;
const prixMin = parseInt(prixMinInput.value);
const prixMax = parseInt(prixMaxInput.value);
let produitsAffiches = 0;
  // Sélection des éléments correspondant aux produits
  const produits = document.querySelectorAll('.box');

  // Filtrage des produits selon les critères de recherche
  
  if (prixMax >= prixMin) {
    produits.forEach(produit => {
      const prix = parseInt(produit.querySelector('.prix').textContent);
      const disponibilite = produit.querySelector('.statut').textContent;
  
      if (prix >= prixMin && prix <= prixMax && (!enStock || disponibilite === 'EN STOK')) {
        produit.style.display = 'flex';
        emptyHead.style.display ='flex';
        produitsAffiches++;
      } else {
        produit.style.display = 'none';
        emptyHead.style.display = 'none'
      }
    });
  } else {
    
     prixMinInput.style.border = "1px solid red";
     prixMaxInput.style.border = "1px solid red";
    //  alert("Le prix minimum doit être inférieur ou égal au prix maximum.");
    document.getElementById("message").textContent="prix minimum doit être inférieur ";

  }
  const videMessage = document.getElementById("videMessage");
  console.log(videMessage)
  if (produitsAffiches === 0) {
    console.log("erro")
    videMessage.style.display ="flex"
  } else {
    videMessage.style.display = 'none';
    prixMinInput.style.border = "none";
    prixMaxInput.style.border = "none";
   //  alert("Le prix minimum doit être inférieur ou égal au prix maximum.");
   document.getElementById("message").textContent="";

  }
  
}
const boutonRecherche = document.getElementById('filter-btn');
boutonRecherche.addEventListener('click', rechercherProduits);


