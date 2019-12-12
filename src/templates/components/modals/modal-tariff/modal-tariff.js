const countWeek = document.querySelector('.count-week');
const countMonth = document.querySelector('.count-month');

initCount(countWeek);
initCount(countMonth);

function initCount(part) {
  const minus = part.querySelector('.minus');
  const plus = part.querySelector('.plus');
  const value = part.querySelector('.value');
  const total = part.querySelector('.total b');
  const input = part.querySelector('input[name="count"]');

  let countValue = +value.innerHTML;
  const totalValue = +total.innerHTML.slice(0, -1);

  minus.onclick = () => countMinus();
  plus.onclick = () => countPlus();

  function countMinus() {
    if (countValue !== 1) {
      countValue--;
    }

    input.value = countValue;
    value.innerHTML = countValue;
    updateTotal();
  }

  function countPlus() {
    countValue++;

    input.value = countValue;
    value.innerHTML = countValue;
    updateTotal();
  }

  function updateTotal() {
    total.innerHTML = totalValue * countValue + ' ₽';
  }
}
