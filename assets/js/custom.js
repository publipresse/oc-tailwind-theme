// Lorsque le DOM est prêt 
addEventListener('page:loaded', function() {
    initCustom();
});

window.document.addEventListener('offline.boxes.editorRefreshed', function (e) {
    initCustom();
});

function initCustom() {

}