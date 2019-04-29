(function(){
    if (!document.getElementById('map')) return;

    const firstScript = document.querySelectorAll('script')[0];
    const script = document.createElement('script');
    const placemarkOptions = {
        coords: [55.844733068907196,37.57289899999999],
        hintContent: 'Большевик!',
        balloonContent: 'Большевик! Самый большой!',
    };
    const mapPositionOptions = {
        center: [55.844733068907196,37.57289899999999],
        zoom: 17,
        controls: [],
    };
    const mapOptions = {
        searchControlProvider: 'yandex#search',
    };

    script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    script.async = true;
    firstScript.parentNode.insertBefore(script, firstScript);

    script.addEventListener('load', function () {
        ymaps.ready(init);
    });

    function init(){
        const myMap = new ymaps.Map('map', mapPositionOptions, mapOptions);

        myMap.geoObjects.add(new ymaps.Placemark(placemarkOptions.coords, {
            hintContent: placemarkOptions.hintContent,
            balloonContent: placemarkOptions.balloonContent,
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'images/baloon.png',
            iconImageSize: [28, 40],
            iconImageOffset: [-30, -50],
        }));
    }
})();
