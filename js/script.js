
// menu function 
const navBtn = document.querySelector(".nav-btn button");

let navCounter = false;
function MenuHandler() {
  if (navCounter) {
    
  } else {
  }
  navCounter = !navCounter;
  console.log(navCounter);
}

navBtn.onclick = MenuHandler;