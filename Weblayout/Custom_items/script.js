document.addEventListener("DOMContentLoaded", function() {
    //Select styling plugin.
    const element = document.querySelector('#selectCustom');
    const choices = new Choices(element, {
        searchEnabled: false,
        itemSelectText: '',
        placeholderValue: 'Material',
        classNames: {
            containerOuter: 'choices header_choices',
        },
    });

    //Connecting Yandex maps.
    ymaps.ready(init);
        function init(){
            // Create a map.
            var myMap = new ymaps.Map("map", {
            // Map center coordinates.
            // Default order: "latitude, longitude".
            // In order not to determine the coordinates of the map center manually,
            // use the Find Coordinates tool.
                center: [48.872185, 2.354224],
            // Zoom level. Valid values:
            // from 0 (worldwide) to 19.
                zoom: 15
            });
        // Placement of a geo object on the map.
            var myPlacemark = new ymaps.Placemark([48.872185, 2.354224], {}, {
                iconLayout: 'default#image',
                iconImageHref: '/img/icon.svg',
                iconImageSize: [50, 50],
                iconImageOffset: [-25, -42]
            });
        // Outputting the result to the page.
        myMap.geoObjects.add(myPlacemark);

    }

    // Phone mask plugin.
    var selector = document.querySelector("input[type='tel']");
    var im = new Inputmask("+7(999)999-99-99");
    im.mask(selector);

    //Form validation plugin.
    new JustValidate('.send-form', {
        rules: {
            name: {
                required: true,
                minLength: 2,
                maxLength: 10,
            },
            tel: {
                required: true,
                function: (name, value) => {
                    const phone = selector.Inputmask.unmaskedvalue()
                    console.log(phone);
                    return Number(phone) && phone.length === 10;
                }
            },
            mail: {
                required: true,
                email: true,
            },

        },
        messages: {
            name: {
                required: `You didn't enter a name`,
                minLength: 'Name too short',
                maxLength: 'Name too long',
            },
            tel: {
                required: 'You have not entered a phone',
                function: 'Number entered incorrectly',
            },
            mail: {
                required: 'You have not entered an e-mail',
                email: 'Wrong address entered',
            },
        },
    });

    //Tooltip Plugin
    tippy('#marker2', {
        content: 'Chapter 2, page 176',
        theme: 'test',
      });


});
