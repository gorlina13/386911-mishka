'use strict';

function initMap() {
  var myLatLng = {lat: 59.938549, lng: 30.322993};
  var map = new google.maps.Map(document.querySelector('.contacts__map'), {
    zoom: 17,
    center: myLatLng,
    scrollwheel: false
  });

  var pin = {
    url: 'img/icon-map-pin.svg',
    scaledSize: new google.maps.Size(67, 100),
  };

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Мишка',
    icon: pin
  });
}
