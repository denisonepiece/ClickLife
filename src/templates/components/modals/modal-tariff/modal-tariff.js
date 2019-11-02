const countWeek = document.querySelector('.count-week');
const countMounth = document.querySelector('.count-mounth');

initCount(countWeek);
initCount(countMounth);

function initCount(part) {
  const minus = part.querySelector('.minus');
  const plus = part.querySelector('.plus');
  const value = part.querySelector('.value');
  const total = part.querySelector('.total b');

  let countValue = +value.innerHTML;
  const totalValue = +total.innerHTML.slice(0, -1);

  minus.onclick = () => countMinus();
  plus.onclick = () => countPlus();

  function countMinus() {
    if(countValue !== 1) {
      countValue--;
    }

    value.innerHTML = countValue;
    updateTotal();
  }

  function countPlus() {
    countValue++;
    value.innerHTML = countValue;
    updateTotal();
  }

  function updateTotal() {
    total.innerHTML = totalValue * countValue + ' ₽';
  }
}