import noUiSlider from '../vendors/nouislider/nouislider';
import '../vendors/nouislider/nouislider.css';

const simpleRangeInput = document.querySelectorAll('input[type="range"]');
const handleSlideWrapper = (target, input) => (values, handle) => {
    const val = parseInt(values[handle]);

    target.value = val;
    input.value = val;
};
const handleChangeWrapper = (slider, input, min, max) => (e) => {
    const target = e.target;
    let val = parseInt(target.value);

    if (min !== undefined && val < min) {
        val = min;
    }

    if (max !== undefined && val > max) {
        val = max;
    }

    slider.noUiSlider.set(val);
    input.value = val;
};
const targetHandlersWrapper = () => {
    let savedVal = null;

    return {
        handleTargetFocus: (e) => {
            const target = e.target;

            savedVal = target.value;
            target.value = '';
        },
        handleTargetBlur: (e) => {
            const target = e.target;

            if (target.value) {
                return;
            }

            e.target.value = savedVal;
        },
    };
};
const hideSliderHandlers = (slider) => {
    const sliderHandlers = slider.querySelectorAll('[data-handle]');

    for (const handler of sliderHandlers) {
        const index = parseInt(handler.getAttribute('data-handle'));

        if (index === 0) continue;

        handler.style.visibility = 'hidden';
    }
};

for (const input of simpleRangeInput) {
    const options = {
        connect: true,
        solo: true,
        start: [input.value, parseInt(input.getAttribute('max'))],
        step: parseInt(input.getAttribute('step')) || 1,
        range: {
            'min': parseInt(input.getAttribute('min')),
            'max': parseInt(input.getAttribute('max')),
        },
    };
    const parent = input.parentNode;
    const slider = document.createElement('div');
    const target = document.querySelector(input.getAttribute('data-target'));
    const handleChange = handleChangeWrapper(slider, input, options.range.min, options.range.max);
    const handleSlide = handleSlideWrapper(target, input);
    const {handleTargetFocus, handleTargetBlur} = targetHandlersWrapper();


    input.style.display = 'none';
    slider.classList.add('noUi-solo');
    parent.insertBefore(slider, input);

    noUiSlider.create(slider, options);
    hideSliderHandlers(slider);

    slider.noUiSlider.on('slide', handleSlide);

    target.addEventListener('change', handleChange);
    target.addEventListener('focus', handleTargetFocus);
    target.addEventListener('blur', handleTargetBlur);
}
