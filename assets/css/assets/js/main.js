/*=========================================================
    Community Alert System
    main.js
=========================================================*/

"use strict";

/*=========================================================
    SELECTORS
=========================================================*/

const navbar = document.querySelector(".navbar");
const backToTop = document.getElementById("backToTop");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");
const counters = document.querySelectorAll(".counter");
const contactForm = document.querySelector(".contact-form");

/*=========================================================
    STICKY NAVBAR
=========================================================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        navbar.style.padding = "10px 0";
        navbar.style.background = "#0f172a";

    } else {

        navbar.style.padding = "18px 0";
        navbar.style.background = "rgba(17,24,39,.85)";

    }

});

/*=========================================================
    BACK TO TOP
=========================================================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.style.display = "flex";

    } else {

        backToTop.style.display = "none";

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/*=========================================================
    ACTIVE NAVBAR
=========================================================*/

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop=section.offsetTop-120;

        if(pageYOffset>=sectionTop){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#" + current){

            link.classList.add("active");

        }

    });

});

/*=========================================================
    COUNTER ANIMATION
=========================================================*/

const counterAnimation=()=>{

    counters.forEach(counter=>{

        const target=+counter.innerText;

        const update=()=>{

            const value=+counter.getAttribute("data-count")||0;

            const increment=Math.ceil(target/80);

            if(value<target){

                counter.setAttribute("data-count",value+increment);

                counter.innerText=value+increment;

                setTimeout(update,20);

            }else{

                counter.innerText=target;

            }

        }

        update();

    });

}

let counterStarted=false;

window.addEventListener("scroll",()=>{

    const stats=document.querySelector(".statistics");

    if(!stats) return;

    const top=stats.getBoundingClientRect().top;

    if(top<window.innerHeight-150 && !counterStarted){

        counterStarted=true;

        counterAnimation();

    }

});

/*=========================================================
    SMOOTH SCROLL
=========================================================*/

navLinks.forEach(link=>{

    link.addEventListener("click",function(e){

        e.preventDefault();

        const id=this.getAttribute("href");

        document.querySelector(id).scrollIntoView({

            behavior:"smooth"

        });

    });

});

/*=========================================================
    CONTACT FORM
=========================================================*/

if(contactForm){

contactForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    const inputs=contactForm.querySelectorAll("input, textarea");

    let valid=true;

    inputs.forEach(input=>{

        if(input.value.trim()===""){

            valid=false;

            input.style.borderColor="red";

        }else{

            input.style.borderColor="#198754";

        }

    });

    if(valid){

        alert("Message Sent Successfully!");

        contactForm.reset();

        inputs.forEach(input=>{

            input.style.borderColor="#dee2e6";

        });

    }else{

        alert("Please fill all fields.");

    }

});

}

/*=========================================================
    FADE ANIMATION
=========================================================*/

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

},{
threshold:.15
});

document.querySelectorAll(".service-card,.problem-card,.alert-card,.feature-box,.stat-box").forEach(el=>{

el.style.opacity="0";
el.style.transform="translateY(40px)";
el.style.transition=".6s";

observer.observe(el);

});

/*=========================================================
    CURRENT YEAR
=========================================================*/

const year=document.getElementById("year");

if(year){

year.textContent=new Date().getFullYear();

}

/*=========================================================
    END
=========================================================*/
