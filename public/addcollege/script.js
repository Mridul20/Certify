// This is a demo of GentleForm:
// https://github.com/Zhouzi/GentleForm

const toaster = document.getElementsByClassName('toaster')[0];
const form = document.querySelector('form');

GentleForm(form, function (event) {
  event.preventDefault();

  if (this.isValid()) addToast('success', 'Yay, the form is valid!');else
  addToast('error', 'Oops, the form is invalid.');
});

function addToast(type, message) {
  const toast = document.createElement('div');

  toast.classList.add('toast');
  toast.classList.add('toast--' + type);
  toast.innerHTML = message;

  toaster.appendChild(toast);

  toast.addEventListener('transitionend', function (event) {
    if (event.propertyName !== 'transform') return;

    if (toast.classList.contains('toast--show')) {
      setTimeout(function () {
        toast.classList.remove('toast--show');
      }, 3000);
    } else {
      toaster.removeChild(toast);
    }
  }, false);

  setTimeout(() => toast.classList.add('toast--show'), 100);
}