$(() => {
    const $tabcontrolButton = $('.tm-button-tabcontrol');
    const $tabcontrolName = $tabcontrolButton.find('.tm-tabcontrol-name');

    const $controlledTab = $('.tm-tab');
    const $controlledTabElement = $controlledTab.find('li > a');

    $tabcontrolButton.on('click', handleTabToggle);
    $controlledTabElement.on('click', handleTabcontrolNameChange);

    function handleTabToggle() {
        $controlledTab.toggleClass('tm-tabcontrol-open');
        $tabcontrolButton.toggleClass('tm-tabcontrol-button-pressed');
    }

    function handleTabcontrolNameChange() {
        const $controlledTabItem = $(this).find('.tm-tabcontrol-item');
        $tabcontrolName.html($controlledTabItem.html());
        handleTabToggle();
    }

});
