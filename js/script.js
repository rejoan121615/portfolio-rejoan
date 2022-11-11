console.clear();
// gsap animation
gsap.registerPlugin(ScrollTrigger, SplitText, CSSRulePlugin);

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
menuTL.fromTo(
    menuSplitText.lines,
    {
        y: "115%",
    },
    {
        y: "0%",
        duration: 0.6,
    }
);

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
new SplitText("#main .name-container h1", {
    type: "chars",
    charsClass: "letter-wrap",
});

const mainTitle = new SplitText("#main .name-container h1", {
    type: "chars",
    charsClass: "letter",
});

// console.log(mainTitle);

// gsap.fromTo(mainTitle.chars, {
//   x: "-100%"
// }, {
//   x: "0",
//   duration: 0.8,
//   delay: 1,
// });

// loading indicator
const loaderCircle = document.querySelectorAll("#main #loader circle");
const loaderBg = document.querySelector("#loading-bg");

const loadingTl = gsap.timeline();

const completeDash = "910px 1000px";

loadingTl
    .set("#main #loader", {
        y: '50%'
    })
    .set(loaderCircle, {
        strokeDasharray: "0px 1000px",
    })
    .to(loaderCircle[0], {
        strokeDasharray: completeDash,
        duration: 1,
        delay: 1,
    })
    .to(loaderCircle[1], {
        strokeDasharray: completeDash,
        duration: 1,
    })
    .to(
        loaderCircle[2],
        {
            strokeDasharray: completeDash,
            duration: 0.8,
            delay: 0.2,
        },
        "<"
    )
    .to("#loading-bg .shade", {
        scaleY: "0",
        duration: 1.4,
        delay: 0.5,
        stagger: {
            from: "end",
            each: 0.05,
        },
        onComplete: () => {
            gsap.set("#main #loader", {
                zIndex: 0,
            });
            // document.querySelector("#loading-bg").remove();
        },
    });
// .to(
//     CSSRulePlugin.getRule("#loading-bg:before"),

//     {
//         cssRule: {
//             scaleY: "0",
//         },
//         duration: 0.75,
//         ease: "power1.out",
//         delay: 0.1,
//     },
//     "<"
// )
//     .to(
//         "#loading-bg",
//         {
//             scaleY: "0",
//             duration: 0.75,
//             ease: "power1.out",
//             delay: 0.1,
//         },
//         "<"
//     );
