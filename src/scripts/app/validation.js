import jqValidation from 'jquery-validation';
import { getFormData, setFormData } from "./forms";

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
            const url = $currModalForm.attr('action');
            const formData = getFormData();

            $currModalForm.addClass('js__sending');

            $.ajax({
                url,
                data: $.param(formData ? formData.concat(currData) : currData),
                type: 'POST',
                success: (response) => {
                    console.log("succes");
                    console.dir(response);
                    setFormData(null);
                    goToNewUrl('thanks.html');
                },
                error: (error) => {
                    console.log("error");
                    console.dir(error);
                },
                complete: () => {
                    $currModalForm.removeClass('js__sending');
                },
            });
        },
        rules: {
            name: "required",
            phone: {
                required: true,
                phoneRus: true
            },
        },
        messages: {
            name: "Пожалуйста, введите своё имя",
            phone: {
                required: "Пожалуйста, введите свой номер телефона",
                phoneRus: "Пожалуйста, введите корректный номер телефона"
            },
            email: {
                email: "Пожалуйста, введите корректный почтовый адрес"
            },
            message: "Пожалуйста, введите вопрос."
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
    });

    function goToNewUrl(windowPath) {
        window.open(windowPath, '_self');
    }
})();
