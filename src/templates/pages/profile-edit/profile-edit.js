import 'normalize.css';
import '../../../sass/main.sass'
import '../../../sass/typography.sass'
import './profile-edit.sass'

//Includes
import '../../includes/header/header'
import '../../includes/footer/footer'

//Components
import '../../components/notification/notification'
import '../../components/button/button'
import '../../components/profile-elect/profile-elect'
import '../../components/modals/modal'
import '../../components/input/input'
import '../../components/add-phone-block/addPhoneBlock'
import '../../components/textarea/textarea'

//media
import '../../../sass/media.sass'


function handleFileSelect(evt) {
  let file = evt.target.files;
  let f = file[0];

  if (!f.type.match('image.*')) {
    alert("Image only please....");
  }
  let reader = new FileReader();

  reader.onload = (function(theFile) {
    return function(e) {
      const photoDemo = document.querySelector('.information-edit__photo');
      photoDemo.style.backgroundImage = 'url('+ e.target.result + ')';
    };
  })(f);

  reader.readAsDataURL(f);
}

document.getElementById('file')
  .addEventListener('change', handleFileSelect, false);


