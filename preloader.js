window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelector('#preloader').classList.add('hidden');
        document.querySelector('.container').classList.add('visible');
    }, 1700);
});