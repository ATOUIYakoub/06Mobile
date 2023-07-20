

// Fonction pour calculer le prix total de toutes les boîtes
function calculateTotal() {
  let prices = document.querySelectorAll(".prix span");
  const totalPrice = document.querySelector('#total-price');

  let total = 0;

  // Bouclez à travers chaque prix
  for (let i = 0; i < prices.length; i++) {
    total += parseFloat(prices[i].textContent);
  }

  // Mettre à jour le prix total sur la page
  totalPrice.textContent = total.toFixed(2);
}


calculateTotal();









// Sélectionnez les éléments de case à cocher et le bouton de suppression
const checkboxes = document.querySelectorAll('.checkbox');
const deleteButton = document.getElementById('delete-button');

const emptyMessage = document.getElementById('empty-message');
 const emptyHead = document.getElementById('empty-head');

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
    // updateTotalPrice();
  });
});

// Attacher un gestionnaire d'événements de clic au bouton de suppression
function removeCheckedBoxes() {
  // Get all the checkboxes in the document
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  // Loop through the checkboxes and check if they are checked
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      // If the checkbox is checked, remove its parent box element
      checkbox.closest('.box').remove();
    }
  });
}
// const deleteButton = document.getElementById('delete-button');
deleteButton.addEventListener('click', () => {
  removeCheckedBoxes();
  calculateTotal();
  // Masquer le bouton de suppression
  deleteButton.style.display = 'none';
   // Vérifier si tous les éléments ont été supprimés
  const boxes = document.querySelectorAll('.box');
  if (boxes.length === 0) {
    console.log("vvvvvvide");
     emptyMessage.style.display = 'block';
     document.querySelector('.box-total-price').style.display="none";
     emptyHead.style.display ='none';
   } else {
     emptyMessage.style.display = 'none';
     document.querySelector('.box-total-price').style.display="block";
     emptyHead.style.display ='block';
   }
});

