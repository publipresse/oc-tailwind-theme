// Transition entre les pages
if (oc.useTurbo && oc.useTurbo()) {
    var isAnimating = false;
    // Transition lorsqu'on quitte une page
    addEventListener('page:before-visit', async function(e) {
        if (isAnimating) { isAnimating = false; return; }
        e.preventDefault();
        //await gsap.to("#header", {x: 100, duration: 1});
        isAnimating = true;
        oc.visit(e.detail.url);
    });
    
    // Transition quand on arrive sur une nouvelle page
    addEventListener('page:load', function() {
        //gsap.to("#header", {x: 0, duration: 1});
    });
}
