console.clear();
// gsap animation
gsap.registerPlugin(ScrollTrigger, SplitText, CSSRulePlugin);

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
            rotate: "100deg",
        },
        {
            y: "0%",
            rotate: "0",
            duration: 1,
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
            duration: 1,
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
                duration: 1,
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

const AboutTL = gsap.timeline({
    scrollTrigger: {
        trigger: "#about",
        markers: true,
        start: "top 10%",
        // end: "bottom center",
        pin: true,
        // scrub: true,
    },
});

AboutTL.add(SecTitleAni("#about"))
    .add(AboutSecImg(), "-=0.2")
    .add(AboutSecText(), "<");
