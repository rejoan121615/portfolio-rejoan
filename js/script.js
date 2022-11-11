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

// MainHeadingAnimation()

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

// LoadingScreenAnimation();
// main section animation ------------------------------------

// Master timeline ---------------------------------

const MasterTl = gsap.timeline();

MasterTl.add(LoadingScreenAnimation());
// .add(MainHeadingAnimation());
