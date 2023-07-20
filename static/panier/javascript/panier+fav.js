
// Sélectionnez tous les éléments de quantité, de prix et de prix total
let prices = document.querySelectorAll(".prix span");
let boxTotals =document.querySelectorAll(".sous-prix .prix-total")
let quantities  = document.querySelectorAll('.quantity');


// Fonction pour calculer le prix total d'une boîte
function calculateBoxTotal(quantity, price) {
  const boxTotal = quantity * price;
  return boxTotal.toFixed(2);
}
// initialisation
window.onload = ()=>{
   let total = 0;
    for (let i = 0; i < quantities.length; i++) {
       boxTotals[i].textContent =parseFloat(prices[i].textContent).toFixed(2) ;
       total = total+parseFloat(prices[i].textContent);
      }
      document.getElementById('total-price').textContent = total.toFixed(2);
 } 

// Fonction pour calculer le prix total de toutes les boîtes
function calculateTotal() {
  let total = 0;

  // Bouclez à travers chaque boîte
  for (let i = 0; i < quantities.length; i++) {
    const quantity = quantities[i].value;
    const price = prices[i].textContent;
    const boxTotal = calculateBoxTotal(quantity, price);
    boxTotals[i].textContent = boxTotal;
    total += parseFloat(boxTotal);
  }

  // Mettre à jour le prix total sur la page
  document.getElementById('total-price').textContent = total.toFixed(2);
  
}


// Attachez un gestionnaire d'événements d'entrée à chaque élément de quantité
quantities.forEach((quantity) => {
  quantity.addEventListener('input', calculateTotal);
});








// Sélectionnez les éléments de case à cocher et le bouton de suppression
const checkboxes = document.querySelectorAll('.checkbox');
const deleteButton = document.getElementById('delete-button');
const totalPrice = document.querySelector('#total-price');
const emptyMessage = document.getElementById('empty-message');
const emptyHead = document.getElementById('empty-head');
// Fonction pour mettre à jour le prix total
function updateTotalPrice() {
  let total = 0;
  // Bouclez à travers chaque boîte
  const boxes = document.querySelectorAll('.box');
  boxes.forEach(box => {
    const checkbox = box.querySelector('.checkbox');
    const price = box.querySelector('.prix span').textContent;
    const quantity = box.querySelector('.quantity').value;
    // Ajouter le prix de chaque boîte si elle n'est pas cochée
    if (!checkbox.checked) {
      total += price * quantity;
    }
  });
  // Mettre à jour le prix total
  totalPrice.textContent = parseFloat(total).toFixed(2) ;
      // Vérifier si tous les éléments ont été supprimés
      if (boxes.length === 0) {
         emptyMessage.style.display = 'block';
         document.querySelector('.box-total-price').style.display="none";
         emptyHead.style.display ='none';
       } else {
         emptyMessage.style.display = 'none';
         document.querySelector('.box-total-price').style.display="block";
         emptyHead.style.display ='block';
       }

}

// Fonction pour afficher ou masquer le bouton de suppression
function toggleDeleteButton() {
  // Vérifier si au moins une case à cocher est cochée
  const checked = Array.from(checkboxes).some(checkbox => checkbox.checked);
  if (checked) {
    deleteButton.style.display = 'block';
  } else {
    deleteButton.style.display = 'none';
  }
}

// Attacher un gestionnaire d'événements de changement à chaque case à cocher
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    toggleDeleteButton();
    updateTotalPrice();
  });
});

// Attacher un gestionnaire d'événements de clic au bouton de suppression
deleteButton.addEventListener('click', () => {
  // Bouclez à travers chaque boîte
  const boxes = document.querySelectorAll('.box');
  boxes.forEach(box => {
    // Vérifiez si la case à cocher est cochée
    const checkbox = box.querySelector('.checkbox');
    if (checkbox.checked) {
      // Supprimez la boîte
      box.remove();
    }
  });
  // Masquer le bouton de suppression
  deleteButton.style.display = 'none';
  // Mettre à jour le prix total
  updateTotalPrice();
});


// var deleteBtn = document.getElementById("delete-button");
// window.addEventListener("scroll", function() {
//   if (window.pageYOffset > 50) {
//     deleteBtn.style.top = "10px";
//   } else {
//     deleteBtn.style.top = "95px";
//   }

// });
