const navbar = document.getElementsByTagName("ul")[4];
const navNextButton = document.getElementsByClassName("scroll-nav-button");
const barIcon = document.getElementsByClassName("fa-solid fa-bars")[0];
const leftMenu = document.getElementsByClassName("left-menu")[0];
const ul = document.getElementsByTagName("ul");
const showmorebutton = document.getElementById("show-more");
const showlessbutton = document.getElementById("show-less");
const subul = document.getElementById("subul");
const darkmodebutton = document.getElementById("darkmode-button");



// how many rows of the subscription list stay visible when it is short (title + 5 channels)
const visibleSubs = 6;



// Code for converting the left menu to expand
barIcon.onclick = function () {
  // Class that makes hover active after expand
  leftMenu.classList.add("hovactive");

  // the menu is open if its first item is already a wide row
  const isOpen = leftMenu.children[0].children[0].classList.contains("left-menu-row");

  // on phones the menu is hidden until it is opened (see "open" in the css)
  leftMenu.classList.toggle("open", !isOpen);

  for (let i = 0; i < leftMenu.children.length; i++) {
    const child = leftMenu.children[i];

    // everything after the first <ul> (lines and the other lists) only shows when open
    if (i > 0) {
      child.classList.toggle("disnone", isOpen);
    }

    // menu items: wide row with bigger text when open, icon only when closed
    if (child.tagName === "UL") {
      for (let k = 0; k < child.children.length; k++) {
        child.children[k].classList.toggle("left-menu-row", !isOpen);
        child.children[k].children[1].classList.toggle("bigger-span", !isOpen);
      }
    }
  }

  fitContentToMenu();

  // a long subscription list starts short, with a "Show more" row
  if (subul.children.length > 10) {
    showLessSubs();
  } else {
    showmorebutton.classList.add("disnone");
    showlessbutton.classList.add("disnone");
  }
}



// push the page content right by the real left menu width, so nothing sits under the menu
function fitContentToMenu() {
  document.body.children[1].style.marginLeft = leftMenu.clientWidth.toString() + "px";
}

fitContentToMenu();
window.addEventListener("resize", fitContentToMenu);



// on phones, tapping the dark area outside the open menu closes it
document.addEventListener("click", function (e) {
  const phone = window.matchMedia("(max-width: 640px)").matches;
  if (phone && leftMenu.classList.contains("open") &&
      !leftMenu.contains(e.target) && !barIcon.contains(e.target)) {
    barIcon.click();
  }
});



// hide the channels after the first few and show the "Show more" row
function showLessSubs() {
  for (let i = visibleSubs; i < subul.children.length; i++) {
    subul.children[i].classList.add("disnone");
  }
  showmorebutton.classList.remove("disnone");
}


//show more button on click: show every channel and "Show less", hide "Show more"
showmorebutton.onclick = function () {
  for (let i = 0; i < subul.children.length; i++) {
    subul.children[i].classList.remove("disnone");
  }
  showmorebutton.classList.add("disnone");
}


//show less button
showlessbutton.onclick = showLessSubs;



//dark modbutton 


// darkmodebutton.onclick = function(){

// }




//scrooling variables and functions 
let scrollProgress = 0;
const minScrollProgress = 0;
const scrollweight = 200;



// Scroll navigation button actions
navNextButton[0].onclick = function () {
  scrollProgress -= scrollweight;
  console.log(scrollProgress);

  navNextButton[1].classList.remove("disnone");

  if (scrollProgress <= minScrollProgress) {
    scrollProgress = minScrollProgress;
    navNextButton[0].classList.add("disnone");
  }

  navbar.scrollTo(scrollProgress, 0);
}





navNextButton[1].onclick = function () {
  scrollProgress += scrollweight;
  console.log(scrollProgress);

  navNextButton[0].classList.remove("disnone");

  // how far the chips can scroll depends on the screen width
  const maxScrollProgress = navbar.scrollWidth - navbar.clientWidth;
  if (scrollProgress >= maxScrollProgress) {
    scrollProgress = maxScrollProgress;
    navNextButton[1].classList.add("disnone");
  }

  navbar.scrollTo(scrollProgress, 0);
}
