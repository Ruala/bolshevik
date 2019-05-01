let calcFormData = null;

export const getFormData = () => calcFormData;
export const setFormData = (data) => calcFormData = data;

$(() => {
    //data gathering
    (function () {
        const $openModalBtn = $('.js__calculate-price-form');

        $openModalBtn.on('click', handleOpenModalClick);

        function handleOpenModalClick() {
            const $btn = $(this);
            const $form = $($btn.attr('data-target-form'));
            setFormData($form.serializeArray());
        }
    })();
});
