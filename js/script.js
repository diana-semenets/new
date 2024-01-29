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

function onEntry(entry) {
    entry.forEach(change => {
      if (change.isIntersecting) {
       change.target.classList.add('move');
      }
    });
  }
  
  let options = {
    threshold: [0.5] };
  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll('section');
  
  for (let elm of elements) {
    observer.observe(elm);
  }

//---------------------form

const form = document.querySelector('form'),
inputs = document.querySelectorAll('input');


const message = {
loading: 'Отправляем...',
success: 'Отправлено',
failure: 'Ошибка отправки'
};

const postData = async (url, data) => {
document.querySelector('.status').textContent = message.loading;
let res = await fetch(url, {
    method: "POST",
    body: data
});

return await res.text();
};

const clearInputs = () => {
inputs.forEach(item => {
    item.value = '';
});
};



  form.addEventListener('submit', (e) => {
      e.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      form.appendChild(statusMessage);

      const formData = new FormData(form);

      postData('sendmail/sendmail.php', formData)
          .then(res => {
              console.log(res);
              closeMode();
          })
          .catch(() => 
          statusMessage.textContent = message.failure)
          .finally(() => {
              clearInputs();
              setTimeout(() => {
                  statusMessage.remove();
              }, 5000);
          });
  });
  


  