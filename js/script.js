// menu function
const navBtn = document.querySelector(".nav-btn button");
const menu = document.querySelector("#menu");
let navCounter = true;
function MenuHandler(target) {
    console.log(target);
    if (navCounter) {
        navBtn.classList.add("opened");
        menu.classList.add("open");
        navBtn.setAttribute("aria-expanded", navCounter);
    } else {
      navBtn.classList.remove("opened");
      menu.classList.remove("open");
      navBtn.setAttribute("aria-expanded", navCounter);
    }
    navCounter = !navCounter;
}
navBtn.onclick = MenuHandler;
