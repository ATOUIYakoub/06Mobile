//Nouveau Produit
const carouselItems = document.querySelectorAll('.carousele-item');
const intervalTime = 10000; //chhal les seconds bah tetbedel hadik lwela qa3 (Milli Secound)
let index = 0;

function changeCarouselItem() {
  carouselItems.forEach(item => {
    item.classList.remove('active');
  });
  index++;
  if (index > carouselItems.length - 1) {
    index = 0;
  }
  carouselItems[index].classList.add('active');
}

setInterval(changeCarouselItem, intervalTime);




// la liste de telephone (nrmlmnt hadou ghir nta3 front makach rah tesh9houm)

const nav = document.getElementById('myNav-tel');
let startX, scrollLeft;

nav.addEventListener('mousedown', (e) => {
  startX = e.pageX - nav.offsetLeft;
  scrollLeft = nav.scrollLeft;
});

nav.addEventListener('mousemove', (e) => {
  if (!startX) return;
  e.preventDefault();
  const x = e.pageX - nav.offsetLeft;
  const walk = (x - startX) * 2; // koul matzid l chiffre hada iwelli ki imachi chwya la sourie ye3bou bzaf les mark tel 
  nav.scrollLeft = scrollLeft - walk;
});

nav.addEventListener('mouseup', () => {
  startX = null;
});

nav.addEventListener('mouseleave', () => {
  startX = null;
});

// la liste de accessor (nrmlmnt hadou ghir nta3 front makach rah tesh9houm)
const navc = document.getElementById('myNav-accessor');


navc.addEventListener('mousedown', (e) => {
  startX = e.pageX - navc.offsetLeft;
  scrollLeft = navc.scrollLeft;
});

navc.addEventListener('mousemove', (e) => {
  if (!startX) return;
  e.preventDefault();
  const x = e.pageX - navc.offsetLeft;
  const walk = (x - startX) * 2; // koul matzid l chiffre hada iwelli ki imachi chwya la sourie ye3bou bzaf les mark tel 
  navc.scrollLeft = scrollLeft - walk;
});

navc.addEventListener('mouseup', () => {
  startX = null;
});

navc.addEventListener('mouseleave', () => {
  startX = null;
});


//  (Active class)  (nrmlmnt hadou ghir nta3 front makach rah tesh9houm)

let lis = document.querySelectorAll("#myNav-tel li");

lis.forEach((li) => {
  // console.log(li)
  li.addEventListener("click", (e) => {
    lis.forEach((li) => {
      li.classList.remove("activate");
    })
    // add active class on Self 
    e.target.classList.add("activate");
  })
})

let lis_accessor = document.querySelectorAll("#myNav-accessor li");

lis_accessor.forEach((li) => {
  // console.log(li)
  li.addEventListener("click", (e) => {
    lis_accessor.forEach((li) => {
      li.classList.remove("activate");
    })
    // add active class on Self 
    e.target.classList.add("activate");
  })
})



// hadi nta3 les photos nta3  les produit (rani khadem b Framework)
var swiper1 = new Swiper(".swiper1", {
  slidesPerView: 4,
  spaceBetween: 50,
  centerSlide: "true",
  grabCursor: "true",
  fade: "true",


  navigation: {
    nextEl: ".swiper1 .swiper-button-next",
    prevEl: ".swiper1 .swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    580: {
      slidesPerView: 2,
    },
    868: {
      slidesPerView: 3,
    },
    1090: {
      slidesPerView: 4,
    },
  },
});








// Sélectionnez tous les éléments de la liste de navigation
const navItems = document.querySelectorAll('#myNav-tel ul li');

// Ajoutez un écouteur d'événement "click" à chaque élément
navItems.forEach(item => {
  item.addEventListener('click', function() {
    // Récupérez l'ID de l'élément sur lequel l'utilisateur a cliqué
    const clickedItemId = this.id;

    // Récupérez toutes les cartes de téléphone qui doivent être affichées dans le wrapper de carte
    const cardsToShow = document.querySelectorAll(`.card-tel[data-type="${clickedItemId}"]`);

    // Masquez toutes les cartes de téléphone dans le wrapper de carte
    document.querySelectorAll('.card-tel').forEach(card => card.parentElement.style.display = 'none');

    // Affichez les cartes de téléphone sélectionnées dans le wrapper de carte
    cardsToShow.forEach(card => card.parentElement.style.display = 'block');
  });
});





// Sélectionnez tous les éléments de la liste de navigation
const navItemsaccessor = document.querySelectorAll('#myNav-accessor ul li');

// Ajoutez un écouteur d'événement "click" à chaque élément
navItemsaccessor.forEach(item => {
  item.addEventListener('click', function() {
    // Récupérez l'ID de l'élément sur lequel l'utilisateur a cliqué
    const clickedItemId = this.id;

    // Récupérez toutes les cartes de téléphone qui doivent être affichées dans le wrapper de carte
    const cardsToShow = document.querySelectorAll(`.card-accessor[data-type="${clickedItemId}"]`);

    // Masquez toutes les cartes de téléphone dans le wrapper de carte
    document.querySelectorAll('.card-accessor').forEach(card => card.parentElement.style.display = 'none');

    // Affichez les cartes de téléphone sélectionnées dans le wrapper de carte
    cardsToShow.forEach(card => card.parentElement.style.display = 'block');
  });
});