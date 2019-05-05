import jqValidation from 'jquery-validation';
import { getFormData, resetFormData } from "./calcForm";

jqValidation.validator.addMethod('phoneRus', function(value) {
    return value.match(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/gi);
});

// validation
(function () {
    const $modalForm = $('.user-modal-form');
    const validateOptions = {
        submitHandler: function (form) {
            const $currModalForm = $(form);
            const currData = $currModalForm.serializeArray();
            const formData = getFormData();
            const $btn = $currModalForm.find('button, input[type="submit"]');

            $btn.attr('disable', true);

            $currModalForm.addClass('js__sending');

            $.ajax({
                url: 'mail/mailer.php',
                data: $.param(formData ? formData.concat(currData) : currData),
                type: 'POST',
                success: (response) => {
                    console.log("succes");
                    console.dir(response);
                    resetFormData();
                    goToNewUrl('thanks.html');
                },
                error: (error) => {
                    console.log("error");
                    console.dir(error);
                },
                complete: () => {
                    $currModalForm.removeClass('js__sending');
                    $btn.attr('disable', false);
                },
            });
        },
        rules: {
            name: "required",
            phone: {
                required: true,
                phoneRus: true,
            },
        },
        messages: {
            name: "Пожалуйста, введите своё имя",
            phone: {
                required: "Пожалуйста, введите свой номер телефона",
                phoneRus: "Пожалуйста, введите корректный номер телефона"
            },
        },
        errorElement: "em",
        errorPlacement: function (error, element) {
            // Add the `help-block` class to the error element
            error.addClass("help-block");

            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent("label"));
            } else {
                error.insertAfter(element);
            }
        }
    };

    $modalForm.each(function () {
        const $form = jqValidation(this);

        $form.validate(validateOptions);
        $form.on('submit', prevent);
    });

    function goToNewUrl(windowPath) {
        window.open(windowPath, '_self');
    }

    function prevent(e) {
        e.preventDefault();
        return false;
    }
})();
