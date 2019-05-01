import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

const simpleRangeInput = document.querySelectorAll('input[type="range"]');
const handleSlideWrapper = (target, input) => (values, handle) => {
    const val = parseInt(values[handle]);

    target.value = val;
    input.value = val;
};
const handleInputWrapper = (slider, input, min, max) => (e) => {
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

for (const input of simpleRangeInput) {
    const options = {
        start: input.value,
        step: parseInt(input.getAttribute('step')) || 1,
        range: {
            'min': parseInt(input.getAttribute('min')),
            'max': parseInt(input.getAttribute('max')),
        },
    };
    const parent = input.parentNode;
    const slider = document.createElement('div');
    const target = document.querySelector(input.getAttribute('data-target'));
    const handleInput = handleInputWrapper(slider, input, options.range.min, options.range.max);
    const handleSlide = handleSlideWrapper(target, input);

    input.style.display = 'none';
    parent.insertBefore(slider, input);
    noUiSlider.create(slider, options);

    slider.noUiSlider.on('slide', handleSlide);
    target.addEventListener('input', handleInput);
}
