import 'normalize.css';
import '../../../sass/main.sass'
import '../../../sass/typography.sass'
import './settings.sass'
//Includes
import '../../includes/header/header'
import '../../includes/footer/footer'
//Components
import '../../components/notification/notification'
import '../../components/button/button'
import '../../components/input/input'
import '../../components/input-phone/input-phone'

//Media
import '../../../sass/media.sass'

manageEmail();

function manageEmail() {
  const emailBlock = document.querySelector('.email');
  const changeBtn = emailBlock.querySelector('.button');
  const staticEmail = emailBlock.querySelector('.input_fixed');
  const message = emailBlock.querySelector('.message');
  const input = emailBlock.querySelector('.input__field');




  changeBtn.onclick = () => {
    let emailState = emailBlock.classList[1];

    if(emailState === '-no-mail-') {
      message.style.display = 'none';
      input.parentNode.style.display = "block"
    }

    console.log();

    if(input.parentNode.classList[1] == 'input_success') {
      input.parentNode.style.display = "none";
      message.style.display = 'block';
    }

  }

}
