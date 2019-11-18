function registration() {
  function firstStep() {
    const regModal = document.querySelector('modal-reg-fiz');
    const regBtn = regModal.querySelector('.button_fill-big');

    function existAcc() {
      var myData = {
        a: 1,
        b: 2
      };

      var data = new FormData();
      data.append("json", JSON.stringify(myData));

      fetch(`https://denisonepiece.github.io/test.json`, {
        method: "post",
        body: data,
      }).then(function(response) {

        if (!response.ok) {
          return Promise.reject(new Error(
              'Response failed: ' + response.status + ' (' + response.statusText + ')'
          ));
        }
        return response.json();
      }).then(function(data) {
        console.log(data);
      }).catch(function(error) {
      });
    }

  }

}



