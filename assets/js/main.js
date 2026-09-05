(function () {
    'use strict';

    /* ---------- Dark mode ---------- */
    var root = document.documentElement;
    var darkToggleBtns = document.querySelectorAll('[data-dark-toggle]');

    function setToggleIcons(isDark) {
        darkToggleBtns.forEach(function (btn) {
            var icon = btn.querySelector('i');
            if (icon) icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        });
    }
    setToggleIcons(root.classList.contains('dark'));

    darkToggleBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var isDark = !root.classList.contains('dark');
            root.classList.toggle('dark', isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            setToggleIcons(isDark);
        });
    });

    /* ---------- Mobile nav ---------- */
    var navToggle = document.getElementById('nav-toggle');
    var mobileMenu = document.getElementById('mobile-menu');

    function closeMobileMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.querySelector('i').className = 'fa-solid fa-bars-staggered';
    }

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', function () {
            var isOpen = mobileMenu.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
            navToggle.querySelector('i').className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars-staggered';
        });
        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    /* ---------- Mouse-tracking spotlight glow ---------- */
    var spotlight = document.getElementById('spotlight');
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var hasFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (spotlight && !prefersReducedMotion && hasFinePointer) {
        var rafId = null;
        var targetX = window.innerWidth / 2;
        var targetY = window.innerHeight / 2;

        function renderSpotlight() {
            spotlight.style.setProperty('--x', targetX + 'px');
            spotlight.style.setProperty('--y', targetY + 'px');
            rafId = null;
        }

        window.addEventListener('mousemove', function (e) {
            targetX = e.clientX;
            targetY = e.clientY;
            spotlight.classList.add('active');
            if (!rafId) rafId = requestAnimationFrame(renderSpotlight);
        });
        document.addEventListener('mouseleave', function () {
            spotlight.classList.remove('active');
        });
    }

    /* ---------- Scroll reveal ---------- */
    var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add('in-view'); });
    }

    /* ---------- Scrollspy ---------- */
    var spySections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link');
    if ('IntersectionObserver' in window && spySections.length) {
        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    navLinks.forEach(function (link) {
                        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
                    });
                }
            });
        }, { rootMargin: '-40% 0px -55% 0px' });
        spySections.forEach(function (s) { spy.observe(s); });
    }

    /* ---------- Skill proficiency bars ---------- */
    var skillBars = document.querySelectorAll('.skill-bar-fill');
    if ('IntersectionObserver' in window && skillBars.length) {
        var barObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var target = entry.target;
                    target.style.width = target.getAttribute('data-level') + '%';
                    barObserver.unobserve(target);
                }
            });
        }, { threshold: 0.4 });
        skillBars.forEach(function (bar) { barObserver.observe(bar); });
    } else {
        skillBars.forEach(function (bar) { bar.style.width = bar.getAttribute('data-level') + '%'; });
    }

    /* ---------- Project filter ---------- */
    var filterButtons = document.querySelectorAll('[data-filter]');
    var projectCards = document.querySelectorAll('[data-project]');
    filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterButtons.forEach(function (b) {
                b.classList.remove('bg-indigo-600', 'text-white');
                b.classList.add('bg-slate-100', 'text-slate-600');
            });
            btn.classList.add('bg-indigo-600', 'text-white');
            btn.classList.remove('bg-slate-100', 'text-slate-600');

            var filter = btn.getAttribute('data-filter');
            projectCards.forEach(function (card) {
                var tags = (card.getAttribute('data-project') || '').split(',');
                var show = filter === 'all' || tags.indexOf(filter) !== -1;
                card.classList.toggle('hidden-project', !show);
            });
        });
    });

    /* ---------- Scroll-to-top ---------- */
    var scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function () {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 600);
        }, { passive: true });
        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---------- Contact form ---------- */
    var contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var statusEl = document.getElementById('contact-status');
            var submitBtn = contactForm.querySelector('button[type="submit"]');
            var originalLabel = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { Accept: 'application/json' }
            }).then(function (response) {
                if (response.ok) {
                    statusEl.textContent = "Thanks — your message has been sent. I'll get back to you soon.";
                    statusEl.className = 'mt-4 text-sm font-semibold text-emerald-400';
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            }).catch(function () {
                statusEl.textContent = 'Something went wrong sending your message — please email me directly instead.';
                statusEl.className = 'mt-4 text-sm font-semibold text-red-400';
            }).finally(function () {
                submitBtn.disabled = false;
                submitBtn.textContent = originalLabel;
            });
        });
    }

    /* ---------- Entrance animation ---------- */
    document.body.classList.add('loaded');
})();
