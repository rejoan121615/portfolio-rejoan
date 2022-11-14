console.clear();
// gsap animation
gsap.registerPlugin(ScrollTrigger, SplitText, CSSRulePlugin, GSDevTools);

function MenuAnimation() {
    const menuSplitText = new SplitText("#menu li a", { type: "lines" });
    const navBtn = document.querySelector(".nav-btn button");
    let navCounter = true;

    const tl = gsap.timeline({ paused: true });

    tl.fromTo(
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
        if (navCounter) {
            navBtn.classList.add("opened");
            navBtn.setAttribute("aria-expanded", navCounter);
            menu.classList.add("open");
            setTimeout(() => {
                tl.play();
            }, 800);
        } else {
            setTimeout(() => {
                navBtn.classList.remove("opened");
                navBtn.setAttribute("aria-expanded", navCounter);
                menu.classList.remove("open");
            }, 800);
            tl.reverse();
        }
        navCounter = !navCounter;
    }
    navBtn.onclick = MenuHandler;
}

MenuAnimation();

// main section animation-----------------------------------------------------------

function MainHeadingAnimation() {
    const tl = gsap.timeline();
    const mailTitleLetterWrap = new SplitText("#main .name-container h1", {
        type: "chars",
        charsClass: "letter-wrap",
    });

    // const mainTitleLetter = new SplitText("#main .name-container h1", {
    //     type: "chars",
    //     charsClass: "letter",
    // });

    tl
        //     .fromTo(
        //     "#loader",
        //     { y: "200px" },
        //     {
        //         y: 0,
        //         duration: 0.5,
        //     }
        // )
        .fromTo(
            [mailTitleLetterWrap.chars],
            {
                y: "150px",
            },
            {
                y: "0",
                duration: 1,
            },
            "<"
        );
    return tl;
}

// loading indicator------------------------------------------------

function LoadingScreenAnimation() {
    const loaderCircle = document.querySelectorAll("#main #loader circle");
    const loaderBg = document.querySelector("#loading-bg");

    const tl = gsap.timeline();

    const completeDash = "910px 1000px";

    tl.set(loaderCircle, {
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
        })
        .fromTo(
            "#loader",
            {
                y: "85px",
            },
            {
                y: 0,
                duration: 0.5,
            },
            "-=1.3"
        )
        .add(MainHeadingAnimation(), "<");

    return tl;
}

function MainScreenAssetsAnimation() {
    const time = 0.7;
    return gsap
        .timeline()
        .from("#page-progress", {
            // x: "-200%",
            y: "200%",
            duration: time,
        })
        .from(
            "header > .container .brand",
            {
                // x: "-200%",
                y: "-200%",
                duration: time,
            },
            "<"
        )
        .from(
            "header .menu",
            {
                // x: "200%",
                y: "-200%",
                duration: time,
            },
            "<"
        );
}

// Master timeline ---------------------------------

const MasterTl = gsap.timeline();

// MasterTl.add(LoadingScreenAnimation()).add(
//     MainScreenAssetsAnimation(),
//     "-=0.3"
// );

// snap animation ------------------------------

// function SnapSection() {
//     let sections = gsap.utils.toArray('.panel');
//     gsap.to(sections, {
//         xPercent: -100 * (sections.length - 1),
//         ease: "none",
//         scrollTrigger: {
//             trigger: ".container",
//             scrub: 1,
//                  },
//     });
// }

// SnapSection()

// section title animation ----------------------------
function SecTitleAni(selector) {
    const letter = new SplitText(`${selector} .section-title h1`, {
        type: "chars",
        charsClass: "letter",
    });
    const gradient = new SplitText(`${selector} .section-title .gradient`, {
        type: "chars",
        charsClass: "grd-letter",
    });
    console.log(letter);
    console.log(gradient);
    return gsap.timeline().fromTo(
        [letter.chars, gradient.chars],
        {
            y: "150%",
            rotate: "30deg",
        },
        {
            y: "0%",
            rotate: "0",
            duration: 0.6,
            // repeat: -1,
            stagger: {
                each: 0.05,
            },
        }
    );
}

// SecTitleAni("#about");
// about section animation ------------------------------

function AboutSecImg() {
    const tl = gsap.timeline();

    tl.fromTo(
        "#about .container .discription .image img",
        {
            filter: " blur(20px)",
        },
        {
            filter: "blur(0px)",
            duration: 1,
        }
    );

    return tl;
}

// AboutSecImg();

function AboutSecText() {
    const word = new SplitText("#about .container .discription .text", {
        type: "word",
        wordsClass: "letter-wrap",
    });
    const letter = new SplitText("#about .container .discription .text", {
        type: "chars",
        charsClass: "letter",
    });
    const imgAfter = CSSRulePlugin.getRule(
        "#about .container .discription .text .img::after"
    );
    // const img = new SplitText("#about .container .discription .text .img", {
    //     type: 'line',
    //     charsClass: 'img-wrap'
    // });
    // console.log('image', img)
    const tl = gsap.timeline();

    tl.fromTo(
        letter.chars,
        {
            y: "100%",
        },
        {
            y: "0%",
            duration: 0.6,
            stagger: {
                each: 0.0001,
            },
        }
    )

        .from(
            imgAfter,
            {
                cssRule: {
                    y: "110%",
                },
                duration: 0.6,
            },
            "<"
        )
        .from(
            "#about .container .discription .text .img img",
            {
                y: "110%",
                duration: 1,
            },
            "<"
        )
        .to(
            imgAfter,
            {
                cssRule: {
                    y: "-100%",
                },
            },
            "+=0.2"
        );

    return tl;
}

// AboutSecText();

// const AboutTL = gsap.timeline({
//     scrollTrigger: {
//         trigger: "#about",
//         start: "top 10%",
//         pin: true,
//         scrub: true,
//     },
// });

// AboutTL.add(SecTitleAni("#about"))
//     .add(AboutSecImg(), "-=0.2")
//     .add(AboutSecText(), "<");

// square circle animation
// function SQCircleAnimation() {
//     const tl = gsap.timeline();

//     tl.fromTo(
//         "#squre-circle .wrapper svg path",
//         {
//             rotate: "0deg",
//         },
//         {
//             rotate: "90deg",
//             duration: 2,
//             stagger: 0.2,
//         }
//     );

//     return tl;
// }

// SQCircleAnimation()

// my skill section
function MySkillAnimation() {
    const Tl = gsap.timeline();
    const element = [
        ...document.querySelectorAll("#skills circle"),
        ...document.querySelectorAll("#skills path"),
    ];

    // gsap.set(element, {
    //     opacity: 0,
    // });
    // box animation ------------------
    function Box() {
        const Boxtl = gsap
            .timeline({ defaults: { duration: 0.7 } })
            .from("#skills #Expand-box #box-top", {
                y: "-100px",
                opacity: 0,
                delay: 1,
            })
            .from(
                "#skills #Expand-box #box-left",
                {
                    x: "-100px",
                    opacity: 0,
                },
                "<"
            )
            .from(
                "#skills #Expand-box #box-right",
                {
                    x: "100px",
                    opacity: 0,
                },
                "<"
            );
        return Boxtl;
    }

    // container circle and childs

    function Childs(selector, pos = "40% 20%") {
        const tl = gsap.timeline();
        const element = document.querySelector(`#skills #${selector} circle`);
        const text = document.querySelector(`#skills #${selector} path`);
        const box = document.querySelector("#Expand-box");
        console.log(text);
        tl.from(element, {
            transformOrigin: "50% 50%",
            scale: 0,
            duration: 0.5,
        }).from(text, {
            transformOrigin: "50% 50%",
            scale: 0,
            ease: "bounce",
        });

        return tl;
    }
    // Childs('html');
    const cirSm = "0px 810px";
    const cirLg = "0px 1550px";
    function Circle(target, duration = 3, dash) {
        const CircleTl = gsap
            .timeline({
                defaults: {
                    duration: duration,
                },
            })
            .fromTo(
                `#skills #ex-circle-${target}`,
                {
                    strokeDasharray: `0px ${dash[1]}px`,
                },
                {
                    strokeDasharray: `${dash[0]}px ${dash[1]}px`,
                }
            );
        return CircleTl;
    }

    Tl.add(Box())
        .add(Circle(1, 2.5, [810, 810]))
        .add(Childs("CSS"), "-=2.25")
        .add(Childs("JS"), "-=1.75")
        .add(Childs("html"), "-=0.95")
        .add(Circle(2, 6, [1550, 1550]), "+=0.1")
        .add(Childs("EXPRESS"), "-=5.905")
        .add(Childs("BT5"), "-=5.50")
        .add(Childs("gsap"), "-=5.1")
        .add(Childs("chart"), "-=4.72")
        .add(Childs("sql"), "-=4.3")
        .add(Childs("TAILWIND"), "-=3.85")
        .add(Childs("GIT"), "-=3.3")
        .add(Childs("NODE"), "-=2.65")
        .add(Childs("REACT"), "-=1.65");
    // GSDevTools.create();
    return Tl;
}

// const SkillSectionTL = gsap
//     .timeline({
//         scrollTrigger: {
//             trigger: "#skill",
//             start: "top 10%",
//             pin: true,
//             scrub: 1,
//             markers: true
//         },
//     })
//     .add(SecTitleAni("#skill"))
//     .add(MySkillAnimation());

// project list section ----------------------------------------------
const projectList = document.querySelectorAll(
    "#projects .project-wrap .pro-card"
);

function AnimateProjectCard(selector, index) {
    const nth = document.querySelector(`.pro-card:nth-child(${index + 1})`);
    console.log(nth);
    const title = selector.querySelector(".details h1");
    const img = selector.querySelector(".details .img-wrap");
    const bgImg = selector.querySelector(".bg");
    const link = selector.querySelector(".details .link a");
    const imgShadow = selector.querySelector(".shadow");

    console.log(imgShadow);
    // console.log(title);

    const word = new SplitText(title, {
        type: "words",
        wordsClass: "letter-wrap",
    });
    const Tl = gsap.timeline({
        scrollTrigger: {
            trigger: selector,
            // markers: true,
        },
    });

    Tl.fromTo(
        selector.querySelectorAll(".letter-wrap"),
        {
            y: "50px",
            opacity: 0,
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: {
                each: 0.1,
            },
        }
    )
        .to(imgShadow, {
            scaleY: "0",
            ease: "ease-in",
            duration: 1,
        })
        .from(
            link,
            {
                scale: 0,
                opacity: 1,
                duration: 0.6,
            },
            "<"
    );
    
    // GSDevTools.create()
    return Tl;
}

function AnimateProjectBg(selector, index) {
    // const nth = document.querySelector(`.pro-card:nth-child(${index + 1}) .bg`);
    const bgImg = selector.querySelector(".bg");
    console.log(bgImg)

    const Tl = gsap.timeline({
        scrollTrigger: {
            trigger: selector,
            markers: true,
            scrub: true
        },
    });

    Tl.fromTo(bgImg, {
        y: "40%"
    }, {
        y: '-30%'
    })

    // GSDevTools.create()
    return Tl;
}


projectList.forEach((item, index) => {
    AnimateProjectCard(item, index);
    AnimateProjectBg(item, index)
});
