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

  // При клике по кнопке запускаем верификацию введёных данных.
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
    ymaps.geocode(request).then(function(res) {
      const obj = res.geoObjects.get(0);
      let error; let hint;

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
    }, function(e) {
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

// Yandex maps end

showMaps();

function showMaps() {
  const radio = document.querySelectorAll('.place__radio input');
  const mapBlock = document.querySelector('.place__address');

  for (let i = 0; i < radio.length; i++) {
    radio[i].addEventListener('change', function() {
      if (radio[2].checked) {
        mapBlock.style.display = 'block';
      } else {
        mapBlock.style.display = 'none';
      }
    });
  }
}

loadFiles();

function loadFiles() {
  const loadFiles = document.querySelector('.load-files');
  const fileInput = loadFiles.querySelector('input');
  const message = loadFiles.querySelector('.sub');
  const fileBuffer = [];

  fileInput.addEventListener('change', function() {
    // eslint-disable-next-line no-unused-vars
    for (const [, value] of Object.entries(this.files)) {
      fileUpload(value);
    }

    displayBuffer();
  });

  function log(text) {
    message.innerHTML = text;
  }

  function fileUpload(file) {
    let xhr = new XMLHttpRequest();

    xhr.onload = xhr.onerror = function() {
      if (this.status === 200) {
        pushToBuffer(file);
      } else {
        log('Возникла ошибка при загрузке файла' + this.status);
      }
    };

    xhr.upload.onprogress = function (e) {
      log(e.loaded + ' / ' + e.total);
    };

    xhr.open('post', 'https://click-life.ru/api/attaches/upload', true);
    xhr.send(file);
  }

  function pushToBuffer(file) {
    fileBuffer.push(file);
  }

  function displayBuffer() {
    const filesList = document.querySelector('.load-files__list');
    // Очищаем буффер
    filesList.innerHTML = '';
    // Заполняем блок актуальными файлами
    let files = '';

    fileBuffer.forEach((file, index) => {
      files += `<span class="load-files__item">${file.name}<span class="btn-delete" data="${index}"></span></span>`;
    });

    console.log(fileBuffer);

    filesList.insertAdjacentHTML('afterbegin', files);
    deleteFromBuffer();
  }

  function deleteFromBuffer() {
    const btnsDelete = document.querySelectorAll('.load-files__item .btn-delete');

    for (let i = 0; i < btnsDelete.length; i++) {
      btnsDelete[i].addEventListener('click', function() {
        const btnAttr = btnsDelete[i].getAttribute('data');
        delete fileBuffer[btnAttr];
        displayBuffer();
      });
    }
  }
}
