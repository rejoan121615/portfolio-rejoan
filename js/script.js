// gsap animation
gsap.registerPlugin(ScrollTrigger, SplitText);

const menuSplitText = new SplitText("#menu li a", { type: "lines" });


// menu function
const navBtn = document.querySelector(".nav-btn button");
// const menu = document.querySelector("#menu");
let navCounter = true;

const menuTL = gsap.timeline({ paused: true });

// menuTL.fromTo(
//     "#menu",
//     {
//         clipPath: "circle(0% at calc((100vw - 5%)) 45px)",
//     },
//     {
//         clipPath: "circle(150% at 90% 28px)",
//         duration: 0.8,
//         delay: 0.15,
//     }
// );
menuTL
    .fromTo(
        menuSplitText.lines,
        {
            y: "115%",
        },
        {
            y: "0%",
            duration: 0.6,
        }
    )

function MenuHandler(target) {
    console.log(target);
    if (navCounter) {
        navBtn.classList.add("opened");
        navBtn.setAttribute("aria-expanded", navCounter);
        menu.classList.add("open");
        setTimeout(() => {
            menuTL.play();
        }, 800);
    } else {
        setTimeout(() => {
            navBtn.classList.remove("opened");
            navBtn.setAttribute("aria-expanded", navCounter);
            menu.classList.remove("open");
        }, 800);
        menuTL.reverse();
    }
    navCounter = !navCounter;
}
navBtn.onclick = MenuHandler;


// main section animation
new SplitText('#main .name-container h1', {
  type: 'chars',
  charsClass: 'letter-wrap',
})

const mainTitle = new SplitText('#main .name-container h1', {
  type: 'chars',
  charsClass: 'letter',
})

console.log(mainTitle);

gsap.fromTo(mainTitle.chars, {
  x: "-100%"
}, {
  x: "0",
  duration: 0.8,
  delay: 1,
});