let calcFormData = null;

export const getFormData = () => calcFormData;
export const setFormData = (data) => calcFormData = data;
export const resetFormData = () => calcFormData = null;

$(() => {
    //data gathering
    (function () {
        const $openModalBtn = $('.js__calculate-price-form');
        const $modal = $($openModalBtn.attr('href'));

        $openModalBtn.on('click', handleOpenModalClick);
        $modal.one('hide', resetFormData);

        function handleOpenModalClick() {
            const $btn = $(this);
            const $form = $($btn.attr('data-target-form'));
            setFormData($form.serializeArray());
        }
    })();
});
