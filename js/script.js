/*------------popups----------------*/
  
const modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal'),
      modalCloseBtn = document.querySelector('[data-close]');

modalTrigger.forEach(btn => {
  btn.addEventListener('click', () => {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
  });
});

function closeMode() {
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
};

modalCloseBtn.addEventListener('click', closeMode);

modal.addEventListener('click', (e) => {
if (e.target === modal) {
    closeMode();
  }
});

document.addEventListener('keydown', (e) => {
if (e.code === 'Escape' && modal.classList.contains('show')) {
    closeMode();
  }
});