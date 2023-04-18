const feedbackForm = document.querySelector(".feedback");
const form = feedbackForm.querySelector('form');
const URL = form.getAttribute('action');
const ERROR_SEND_TEST = 'Не удалось отправить форму. Попробуйте ещё раз';

const sendData = (onSuccess, onFail, body) => {
  fetch(URL, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail(ERROR_SEND_TEST);
      }
    })
    .catch(() => {
      onFail(ERROR_SEND_TEST);
    });
};

const showMessage = (el) => {
  el.style.display = 'block';
}

const submitButton = document.querySelector('.feedback__form button')

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Отправить';
};

if (feedbackForm) {
   const feedbackSuccess = document.querySelector(".feedback-success");
  const feedbackError = document.querySelector(".feedback-error");

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
      blockSubmitButton();
      sendData(
        () => {
          unblockSubmitButton();
          form.reset();
          showMessage(feedbackSuccess);
        },
        () => {
          showMessage(feedbackError);
          unblockSubmitButton();
        },
        new FormData(evt.target)
      );
  });
}
