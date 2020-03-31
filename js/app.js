/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
  const navList = document.getElementById("navbar__list");
  const sectionContainer = document.querySelectorAll("section");
  const h1 = document.querySelector('h1');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Helper function to remove class from nav links
function rmNavLinkActiveClass() {
  let navLinks = document.querySelectorAll('.menu__link');
  navLinks.forEach(link => {
    link.classList.remove("your-active-link");
  })
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
// Loop through each section in the section container and create nav link for each one
function populateNavBar() {
  sectionContainer.forEach(el => {
    const navlistElement = `<li class='${el.className}'><a href="#${el.id}" class='menu__link ${el.id}'>${el.dataset.nav}</a></li>`
    navList.insertAdjacentHTML('beforeend', navlistElement)
  })
}


// Add class 'active' to section when near top of viewport
// Check when each section is in viewport. Resource used: https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/;
function checkIfSectionInView() {
  let isInViewport = function(element) {
    let bounding = element.getBoundingClientRect();
    return (
      bounding.top <= 50 &&
      (bounding.bottom - 300) <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      (bounding.right - 100) <=
        (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  sectionContainer.forEach(section => {
    window.addEventListener('scroll', function(event) {
      if (isInViewport(section)) {
        rmNavLinkActiveClass()
        let navLink = document.querySelector(`.${section.id}`)
        navLink.classList.add("your-active-link");
        section.classList.add("your-active-class");
      } else {
        section.classList.remove("your-active-class");
      }
    })
  })
}


// Scroll to anchor ID using scrollTO event
function scrollOnClick() {
  navList.addEventListener('click', function(event) {
    event.preventDefault();
    const clickedItem = event.target;
    if (clickedItem.hasAttribute('href')) {
      const elementToScrollTo = document.getElementById(clickedItem.classList[1]);
      elementToScrollTo.scrollIntoView({
        behavior: 'smooth'
      })
    }
  })
}


// Display "back to top button" once the user scrolls down
window.onscroll = function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("scroll-btn").style.display = "block";
  }
  else {
    document.getElementById("scroll-btn").style.display = "none";
  }
};


//Scrolls to top of the page once "back top button" is clicked
function scrollToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  rmNavLinkActiveClass();
}

/**
 * End Main Functions
 * Begin Events
 * 
*/





document.addEventListener('DOMContentLoaded', function () {
  // Build menu 
populateNavBar()

// Scroll to section on link click
scrollOnClick()


// Set sections as active
checkIfSectionInView();
});
