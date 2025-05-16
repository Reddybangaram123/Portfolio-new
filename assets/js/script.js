$(document).ready(function () {
    // Mobile menu toggle
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // Scroll events
    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        // Scroll-to-top button visibility
        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // Scroll spy for navigation highlighting
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // Smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear');
    });

    // EmailJS Contact Form Submission
    $("#contact-form").submit(function (event) {
        event.preventDefault();
        
        // Initialize EmailJS (only needs to be done once, but harmless to repeat)
        emailjs.init("woneRXsKF3YXbOM4b");
        
        // Send form data
        emailjs.sendForm('service_y8ypu4u', 'template_mavjp9c', this)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                $("#contact-form")[0].reset();
                Swal.fire({
                    icon: 'success',
                    title: 'Message Sent!',
                    text: 'I will get back to you soon.',
                    confirmButtonColor: '#3085d6'
                });
            }, function(error) {
                console.log('FAILED...', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Please try again later.',
                    confirmButtonColor: '#3085d6'
                });
            });
    });
});

// Tab visibility change handler
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Portfolio | Gopal Reddy";
        $("#favicon").attr("href", "assets/images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "assets/images/favhand.png");
    }
});

// Typed.js effect
var typed = new Typed(".typing-text", {
    strings: ["frontend development", "backend development", "web designing", "web development"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});

// Fetch and display skills
async function fetchData(type = "skills") {
    let response = type === "skills" 
        ? await fetch("skills.json") 
        : await fetch("./projects/projects.json");
    return await response.json();
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    skillsContainer.innerHTML = skills.map(skill => `
        <div class="bar">
            <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
            </div>
        </div>`
    ).join('');
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    projectsContainer.innerHTML = projects
        .slice(0, 10)
        .filter(project => project.category != "android")
        .map(project => `
        <div class="box tilt">
            <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
            <div class="content">
                <div class="tag">
                    <h3>${project.name}</h3>
                </div>
                <div class="desc">
                    <p>${project.desc}</p>
                    <div class="btns">
                        <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                        <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
                    </div>
                </div>
            </div>
        </div>`
        ).join('');

    // Initialize tilt.js for projects
    VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });

    // Scroll reveal animation
    ScrollReveal().reveal('.work .box', { interval: 200 });
}

// Initialize on page load
fetchData().then(showSkills);
fetchData("projects").then(showProjects);

// Initialize tilt.js globally
VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });

// Preloader
function loader() {
    document.querySelector('.loader-container').classList.add('fade-out');
}
window.onload = function() {
    setTimeout(loader, 500);
};

// Disable developer tools
document.onkeydown = function (e) {
    if (e.keyCode == 123 || 
        (e.ctrlKey && e.shiftKey && ['I','C','J'].includes(String.fromCharCode(e.keyCode))) ||
        (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))) {
        return false;
    }
};

// Scroll Reveal Animations
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

// Apply animations to various sections
srtop.reveal('.home .content h3, .home .content p, .home .content .btn', { delay: 200 });
srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter, .home .telegram, .home .instagram, .home .dev', { interval: 600 });

srtop.reveal('.about .content h3, .about .content .tag, .about .content p, .about .content .box-container, .about .content .resumebtn', { delay: 200 });
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });
srtop.reveal('.education .box', { interval: 200 });
srtop.reveal('.work .box', { interval: 200 });
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });