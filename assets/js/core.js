initPageTransitions();

addEventListener('page:loaded', function() {
    initGsap();
    initLenis();
    initImages();
    initHeadroom();
    initFancybox();
    initForm();
});

function initPageTransitions() {
    if (oc.useTurbo && oc.useTurbo()) {
        // Transition de sortie : pause le rendu le temps de l'animation
        addEventListener('page:before-render', async function(e) {
            if (document.documentElement.hasAttribute('data-turbo-preview')) return;
            e.preventDefault();
            //await gsap.to("#header", { x: 100, duration: 1 });
            e.detail.resume();
        });

        // Transition d'entrée : animation après rendu de la nouvelle page
        addEventListener('page:render', function() {
            //gsap.to("#header", { x: 0, duration: 1 });
        });
    }
}

function initGsap() {
    if(typeof ScrollTrigger !== 'undefined') { gsap.registerPlugin(ScrollTrigger); }
    if(typeof SplitText !== 'undefined') { gsap.registerPlugin(SplitText); }
    if(typeof GSDevTools !== 'undefined') { gsap.registerPlugin(GSDevTools); }

    // GSDevTools.create();
}

function initLenis() {

    // Init lenis
    window.scroll = new Lenis();
    window.scroll.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        window.scroll.raf(time * 1000); // Convert time from seconds to milliseconds
    });
    gsap.ticker.lagSmoothing(0);

    // Gestion des ancres
    document.querySelectorAll('*[href*="#"]').forEach(function(el) {
        el.addEventListener('click', function(e) {
            const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--spacing-header-h'));
            const target = el.getAttribute('href');
            const hash = '#'+target.split('#')[1];

            if(target.charAt(0) == '#') {
                e.preventDefault();
                window.scroll.scrollTo(hash, { offset: -offset });
            } else {
                const actualPathname = window.location.pathname;
                const targetPathname = new URL(target).pathname
                if(actualPathname == targetPathname) {
                    e.preventDefault();
                    window.scroll.scrollTo(hash, { offset: -offset });
                }
            }
        });
    })
}

// Initialisation du lazyload
function initImages() {
    const imagesToResize = document.querySelectorAll('img[sizes]');
    addEventListener('resize', function(e) {
        imagesToResize.forEach(function(el) {
            const width = el.clientWidth;
            el.sizes = width+'px';
        })
    });
}

// Gestion de l'entête sticky.
function initHeadroom() {
    let offset = 0;

    let el = document.body;
    setClasses(0, 0);

    ScrollTrigger.create({
        trigger: el,
        start: 'top+='+offset+' top',
        end: 'bottom bottom',
        onEnter: function(self) { 
            setClasses(self.progress, self.direction)
        },
        onUpdate: function(self) {
            setClasses(self.progress, self.direction);
        }
    });

    function setClasses(progress, direction) {
        switch(progress) {
            case 0:
                el.classList.remove('not-top');
                el.classList.add('top');
                break;
            case 1:
                el.classList.remove('top');
                el.classList.add('bottom');
                break;
            default:
                el.classList.remove('top');
                el.classList.add('not-top');
                break;
        }

        switch(direction) {
            case 1:
                el.classList.remove('pinned');
                el.classList.add('unpinned');
                break;
            default:
                el.classList.remove('unpinned');
                el.classList.add('pinned');
                break;
        }
    }
}

// Initialisation du fancybox
function initFancybox() {
    if (typeof Fancybox !== "undefined") {
        Fancybox.bind("[data-fancybox]", {

        });
    }
}

// Gestion des classes sur un formulaire
function initForm() {

    // Champs invalides après soumission
    addEventListener('ajax:invalid-field', function(e) {
        const element = e.detail.element;
        const form = element.closest('form');
        form.querySelectorAll('[name="' + element.name + '"]').forEach(function(el) {
            el.setAttribute('aria-invalid', 'true');
        });
    });

    // Nettoyage des champs au moment de la validation
    addEventListener('ajax:promise', function(e) {
        e.target.querySelectorAll('[aria-invalid]').forEach(function(el) {
            el.removeAttribute('aria-invalid');
        });
    });
    
    // On réinitialise la fonction en cas de refresh ajax
    addEventListener('ajax:update-complete', function(e) {
        // Refresh form
        initForm();
        // Refresh scroll trigger
        if(typeof ScrollTrigger !== 'undefined') { ScrollTrigger.refresh() }
    });
}

// Fonction utilitaire pour calculer une valeur avec Gsap
function calculateVar(progress, x, y, start, end) {
    return progress < start ? x : x + (y - x) * (Math.min(progress, 1) - start) / (end - start);
}