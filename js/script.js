// Scroll Animation Observer
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();

    // Countdown Timer
    const targetDate = new Date('2026-01-11T18:00:00').getTime();
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            // Expired
            document.getElementById('days').innerText = "00";
            document.getElementById('hours').innerText = "00";
            document.getElementById('minutes').innerText = "00";
            document.getElementById('seconds').innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        updateElement('days', days);
        updateElement('hours', hours);
        updateElement('minutes', minutes);
        updateElement('seconds', seconds);
    };

    const updateElement = (id, value) => {
        const element = document.getElementById(id);
        const formattedValue = value < 10 ? `0${value}` : value;
        
        if (element.innerText !== formattedValue.toString()) {
            element.style.transform = "scale(1.2)";
            element.style.color = "#e0be10"; // primary-dark
            setTimeout(() => {
                element.innerText = formattedValue;
                element.style.transform = "scale(1)";
                element.style.color = ""; // reset
            }, 150);
        }
    };

    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    // Drawer Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    const drawerBackdrop = document.getElementById('drawer-backdrop');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    const toggleDrawer = () => {
        const isOpen = mobileDrawer.classList.contains('open');
        if (isOpen) {
            mobileDrawer.classList.remove('open');
            drawerBackdrop.classList.remove('open');
        } else {
            mobileDrawer.classList.add('open');
            drawerBackdrop.classList.add('open');
        }
    };

    mobileMenuBtn.addEventListener('click', toggleDrawer);
    closeDrawerBtn.addEventListener('click', toggleDrawer);
    drawerBackdrop.addEventListener('click', toggleDrawer);

    drawerLinks.forEach(link => {
        link.addEventListener('click', toggleDrawer);
    });

    // Scroll Spy
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    // Re-select drawer links in case they weren't captured (though querySelectorAll is static, so it's fine)

    const highlightNavLink = () => {
        let scrollY = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Offset for sticky nav
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Desktop
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href').includes(sectionId)) {
                        link.classList.add('active-link');
                    }
                });
                // Mobile Drawer
                drawerLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href').includes(sectionId)) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNavLink);
});
