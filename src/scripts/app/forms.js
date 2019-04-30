let calcFormData = null;

export const getFormData = () => calcFormData;
export const setFormData = (data) => calcFormData = data;

$(() => {
    //data gathering
    (function () {
        const $form = $('.calculate-price-form');
        const $openModalBtn = $('.js__calculate-price-form');

        $openModalBtn.on('click', handleOpenModalClick);

        function handleOpenModalClick() {
            setFormData($form.serializeArray());
        }
    })();
});
