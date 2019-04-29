$(() => {
    //data gathering
    (function () {
        const $form = $('.calculate-price-form');
        const $openModalBtn = $('.js__calculate-price-form');
        const $modalForm = $('.user-modal-form');
        let formData = null;

        $openModalBtn.on('click', handleOpenModalClick);
        $modalForm.on('submit', handleModalFormSubmit);

        function handleOpenModalClick() {
            formData = $form.serializeArray();
        }

        function handleModalFormSubmit(e) {
            e.preventDefault();

            const $currModalForm = $(this);
            const currData = $currModalForm.serializeArray();
            const url = $currModalForm.attr('action');

            $.ajax({
                url,
                data: $.param(formData.concat(currData)),
                type: 'POST',
                success: (response) => {
                    console.log("succes");
                    console.dir(response);
                    goToNewUrl('thanks.html');
                },
                error: (error) => {
                    console.dir(error);
                },
            });
        }

        function goToNewUrl(windowPath) {
            window.open(windowPath, '_self');
        }
    })();


    // validation
    (function () {
        const $modalForm = $('.user-modal-form');
        const validateOptions = {
            rules: {
                name: "required",
                phone: {
                    required: true,
                    phoneRus: true,
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
                },
                // highlight: function (element, errorClass, validClass) {
                //     $(element).parents(".tm-highlight").addClass("has-error").removeClass("has-success");
                // },
                // unhighlight: function (element, errorClass, validClass) {
                //     $(element).parents(".tm-highlight").addClass("has-success").removeClass("has-error");
                // }
            },
        };

        $modalForm.each(function () {
            const $form = $(this);

            $form.validate(validateOptions);
        });
    })();
});
