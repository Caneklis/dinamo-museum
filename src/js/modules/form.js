

  const feedbackForm = document.querySelector(".feedback");

if (feedbackForm) {
  const feedbackSuccess = document.querySelector(".feedback-success");
  const form = feedbackForm.querySelector('form')

  form.addEventListener("submit", function (event) {
    let data = this;
    event.preventDefault();
    fetch(data.getAttribute("action"), {
      method: data.getAttribute('method'),
      body: new FormData(data)
    })
      .then((res) => res.text())
      .then(function (data) {
        feedbackForm.querySelector('button').style.display = "none";
        feedbackSuccess.style.display = "block";

        setTimeout(() => {
          form.reset();
        }, 500);
      })
      .catch((err) => {
        console.log("Error:", err);
      });;
  });
}
