const modal = document.getElementsByClassName('modal');
const showButton = document.getElementById('show-modal-btn');
const closeButton = document.getElementById('close-modal-btn');
console.log("yo");

showButton.addEventListener('click', () => {
    Array.from(modal).forEach((modal) => {
        modal.classList.remove('hidden');
    });
});

closeButton.addEventListener('click', () => {
    Array.from(modal).forEach((modal) => {
        modal.classList.add('hidden');
    });
});
