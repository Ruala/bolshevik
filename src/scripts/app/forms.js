$(() => {
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
            success: (response) => { console.log("succes"); console.dir(response); },
            error: (error) => {  console.dir(error); },
        });
    }
});
