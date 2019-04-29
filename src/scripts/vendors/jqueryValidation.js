import 'jquery-validation';

$.validator.addMethod('phoneRus', function(value) {
    return value.match(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/gi);
});
