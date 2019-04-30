$(() => {
    const $simpleInput = $('input[type="range"]');
    const hadleInput = ($target) => (e) => $target.text(e.target.value);

    $simpleInput.each(function () {
        const $input = $(this);
        const $target = $($input.attr('data-target'));
        const handler = hadleInput($target);

        $input.on('input', handler);
    });
});
