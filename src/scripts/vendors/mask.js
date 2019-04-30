import Inputmask from 'inputmask';

$(() => {
    const phoneMask = Inputmask('+7(999)999-99-99');
    const phones = document.querySelectorAll('input[name="phone"]');

    phoneMask.mask(phones);
});

