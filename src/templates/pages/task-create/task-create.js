import 'normalize.css';
import '../../../sass/main.sass';
import '../../../sass/typography.sass';
// Includes
import '../../includes/header/header';
import '../../includes/footer/footer';
// Components
import '../../components/button/button';
import '../../components/modals/modal';
import '../../components/input/input';
import '../../components/select/select';
import '../../components/textarea/textarea';
import '../../components/datepicker/datepicker';
import '../../components/checkbox/checkbox';
import '../../components/modals/modal';
import '../../components/select/select';
// Media
import './task-create.sass';
import '../../../sass/media.sass';

// Yandex maps

ymaps.ready(init);

function init() {
  // Подключаем поисковые подсказки к полю ввода.
  const suggestView = new ymaps.SuggestView('input-addr');
  var map;
  let placemark;

  if($('#input-addr').val() !== 0) {
    geocode();
  }

  $('#input-addr').bind('focusout', function(e) {
    geocode();
  });

  // По дефолту устанавливаем значение
  var map = new ymaps.Map('map', {
    zoom: 7,
    center: [55.76, 37.64],
    controls: [],
  });

  function geocode() {
    // Забираем запрос из поля ввода.
    const request = $('#input-addr').val();
    // Геокодируем введённые данные.
    ymaps.geocode(request).then(function (res) {
      const obj = res.geoObjects.get(0);
      let error;
      let hint;

      if (obj) {
        // Об оценке точности ответа геокодера можно прочитать тут: https://tech.yandex.ru/maps/doc/geocoder/desc/reference/precision-docpage/
        switch (obj.properties.get('metaDataProperty.GeocoderMetaData.precision')) {
          case 'exact':
            break;
          case 'number':
          case 'near':
          case 'range':
            error = 'Неточный адрес, требуется уточнение';
            hint = 'Уточните номер дома';
            break;
          case 'street':
            error = 'Неполный адрес, требуется уточнение';
            hint = 'Уточните номер дома';
            break;
          case 'other':
          default:
            error = 'Неточный адрес, требуется уточнение';
            hint = 'Уточните адрес';
        }
      } else {
        error = 'Адрес не найден';
        hint = 'Уточните адрес';
      }

      // Если геокодер возвращает пустой массив или неточный результат, то показываем ошибку.
      if (error) {
        showError(error);
        showMessage(hint);
      } else {
        showResult(obj);
      }
    }, function (e) {
      console.log(e);
    });
  }

  function showResult(obj) {
    // Удаляем сообщение об ошибке, если найденный адрес совпадает с поисковым запросом.
    $('#suggest').removeClass('input_error');
    $('#notice').css('display', 'none');

    const mapContainer = $('#map');
    const bounds = obj.properties.get('boundedBy');
    // Рассчитываем видимую область для текущего положения пользователя.
    const mapState = ymaps.util.bounds.getCenterAndZoom(
        bounds,
        [mapContainer.width(), mapContainer.height()],
    );
    // Сохраняем полный адрес для сообщения под картой.
    const address = [obj.getCountry(), obj.getAddressLine()].join(', ');
    // Сохраняем укороченный адрес для подписи метки.
    const shortAddress = [obj.getThoroughfare(), obj.getPremiseNumber(), obj.getPremise()].join(' ');
    // Убираем контролы с карты.
    mapState.controls = [];
    // Создаём карту.
    createMap(mapState, shortAddress);
    // Выводим сообщение под картой.
    showMessage(address);
  }

  function showError(message) {
    $('#notice').text(message);
    $('#suggest').addClass('input_error');
    $('#notice').css('display', 'block');
    // Удаляем карту.
    if (map) {
      map.destroy();
      map = null;
    }
  }

  function createMap(state, caption) {
    // Если карта еще не была создана, то создадим ее и добавим метку с адресом.
    if (!map) {
      map = new ymaps.Map('map', state);
      placemark = new ymaps.Placemark(
          map.getCenter(), {
            iconCaption: caption,
            balloonContent: caption,
          }, {
            preset: 'islands#redDotIconWithCaption',
          });
      map.geoObjects.add(placemark);
      // Если карта есть, то выставляем новый центр карты и меняем данные и позицию метки в соответствии с найденным адресом.
    } else {
      map.setCenter(state.center, state.zoom);
      placemark.geometry.setCoordinates(state.center);
      placemark.properties.set({iconCaption: caption, balloonContent: caption});
    }
  }

  function showMessage(message) {
    $('#messageHeader').text('Данные получены:');
    $('#message').text(message);
  }
}

showMaps();

function showMaps() {
  const radio = document.querySelectorAll('.place__radio input');
  const mapBlock = document.querySelector('.place__address');

  check();

  for (let i = 0; i < radio.length; i++) {
    radio[i].addEventListener('change', function() {
      check();
    });
  }

  function check() {
    if (radio[2].checked) {
      mapBlock.style.display = 'block';
    } else {
      mapBlock.style.display = 'none';
    }
  }
}

// Yandex maps end

loadFiles();

function loadFiles() {
  const loadFiles = document.querySelector('.load-files');
  const fileInput = loadFiles.querySelector('input');
  const message = loadFiles.querySelector('.sub');
  let usedFiles = document.querySelector('input[name="usedFiles"]').value.split(',');
  const fileList = loadFiles.querySelector('.load-files__list');


  if(usedFiles[0] == '') {
    usedFiles = [];
  }

  if(document.querySelector('.load-files__item')) {
    deleteFiles();
  }

  // При загрузке файлов, по одному отправляем на сервер
  fileInput.addEventListener('change', function () {
    for (const [, file] of Object.entries(this.files)) {
      fileUpload(file);
    }
  });

  // Выводим файл пользователю, с ссылкой, названием и id
  function displayFile(response) {
    const fileView =
        `<span class="load-files__item">` +
        `<a href="https://click-life.ru/${response.path}" target="_blank">${response.title}</a>` +
        `<span class="btn-delete" data="${response.id}"></span>` +
        `</span>`;

    fileList.insertAdjacentHTML('beforeend', fileView);
    deleteFiles();
  }

  function log(text) {
    message.innerHTML = text;
  }

  function fileUpload(file) {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('attaches', file, file.name);

    xhr.onload = xhr.onerror = function () {
      if (this.status === 200) {
        const data = JSON.parse(xhr.response);
        displayFile(data);
        usedFiles.push(data.id);
        updateUsedFiles();
        log('Загрузка завершена');
      } else {
        log('Возникла ошибка при загрузке файла' + this.status);
      }
    };

    xhr.upload.onprogress = function (e) {
      log(Math.trunc((e.loaded / e.total) * 100) + '%');
    };

    xhr.open('post', 'https://click-life.ru/api/attaches/upload', true);
    xhr.send(formData);
  }

  function deleteFiles() {
    const deleteButtons = document.querySelectorAll('.load-files__item');

    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].querySelector('.btn-delete').onclick = function () {
        usedFiles.splice(usedFiles.indexOf(+this.getAttribute('data')), 1);
        this.parentNode.remove();
        updateUsedFiles();
      };
    }
  }

  function updateUsedFiles() {
    const usedFilesInput = document.querySelector('input[name="usedFiles"]');

    usedFilesInput.value = usedFiles.toString();
  }
}

changeCategories();

function changeCategories() {
  const category = document.getElementsByName('parent_category')[0];
  const subcategory = document.getElementsByName('child_category')[0];

  category.parentNode.addEventListener('click', function() {
    const categoryId = category.value;

    fetch(`https://click-life.ru/api/categories/${categoryId}`)
        .then(function(response) {
          if (!response.ok) {
            return 'Данные не получены';
          }

          return response.json();
        }).then(function(data) {
          selectUpdate(data);
        });
  });

  function selectUpdate(data) {
    subcategory.innerHTML = '';

    subcategory.nextElementSibling.remove();
    subcategory.nextElementSibling.remove();

    for (let i = 0; i < data.length; i++) {
      const newOption = new Option(data[i].name, data[i].id);

      subcategory.append(newOption);
    }

    initSelects('.select-sub');
  }
}

function initSelects(selectClass) {
  let x;
  let i;
  let j;
  let selElmnt;
  let a;
  let b;
  let c;

  x = document.querySelectorAll(selectClass);

  for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName('select')[0];
    a = document.createElement('DIV');
    a.setAttribute('class', 'input__field select-selected');
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    b = document.createElement('DIV');
    b.setAttribute('class', 'select-items select-hide');
    for (j = 1; j < selElmnt.length; j++) {
      c = document.createElement('DIV');
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener('click', function (e) {
        let y;
        let i;
        let k;
        let s;
        let h;
        s = this.parentNode.parentNode.getElementsByTagName('select')[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName('same-as-selected');
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute('class');
            }
            this.setAttribute('class', 'same-as-selected');
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener('click', function (e) {
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle('select-hide');
      this.parentNode.classList.toggle('select-arrow-active');
    });
  }

  function closeAllSelect(elmnt) {
    let x;
    let y;
    let i;
    const arrNo = [];
    x = document.getElementsByClassName('select-items');
    y = document.getElementsByClassName('select-selected');
    for (i = 0; i < y.length; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i);
      } else {
        y[i].classList.remove('select-arrow-active');
      }
    }
    for (i = 0; i < x.length; i++) {
      if (arrNo.indexOf(i)) {
        x[i].parentNode.classList.remove('select-arrow-active');
        x[i].classList.add('select-hide');
      }
    }
  }

  document.addEventListener('click', closeAllSelect);
}

