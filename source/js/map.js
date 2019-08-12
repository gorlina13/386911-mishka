'use strict';

function initMap() {
  var ZOOM = 17;
  var TITLE = 'Мишка';

  var LAT_LNG = {
    lat: 59.938549,
    lng: 30.322993
  };

  var MAP_OPTIONS = {
    zoom: ZOOM,
    center: LAT_LNG,
    scrollwheel: false
  };

  var PIN = {
    url: 'img/icon-map-pin.svg',
    width: 67,
    height: 100,
    originX: 0,
    originY: 0,
    anchorX: 33.5,
    anchorY: 100
  }

  var mapArea = document.querySelector('.map__interactive');

  if (mapArea !== null) {
    mapArea.classList.remove('map__interactive--hidden');
    var map = new google.maps.Map(mapArea, MAP_OPTIONS);

    var pin = {
      url: PIN.url,
      size: new google.maps.Size(PIN.width, PIN.height),
      origin: new google.maps.Point(PIN.originX, PIN.originY),
      anchor: new google.maps.Point(PIN.anchorX, PIN.anchorY),
      scaledSize: new google.maps.Size(PIN.width, PIN.height)
    };

    var marker = new google.maps.Marker({
      position: LAT_LNG,
      map: map,
      title: TITLE,
      icon: pin
    });
  }
}
