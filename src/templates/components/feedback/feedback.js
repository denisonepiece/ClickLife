import './feedback.sass';

loadAllFeedbacks();

function loadAllFeedbacks() {
  const feedbacksBlocks = document.querySelectorAll('.feedbacks');

  for (let i = 0; i < feedbacksBlocks.length; i++) {
    if (feedbacksBlocks[i].querySelector('.button.button_default')) {
      const btnLoad = feedbacksBlocks[i].querySelector('.button.button_default');

      btnLoad.addEventListener('click', function () {
        let url = this.getAttribute('data-action');

        fetch(url)
            .then((response) => {
              return response.text();
            })
            .then((data) => {
              const oldFeedbacks = this.parentNode.querySelectorAll('.feedback');

              for (let i = 0; i < oldFeedbacks.length; i++) {
                oldFeedbacks[i].remove();
              }

              const parser = new DOMParser();
              const newItems = parser.parseFromString(data, 'text/html').querySelectorAll('.feedback');
              this.before(...newItems);
              this.remove();

            });
      });
    }
  }
}
