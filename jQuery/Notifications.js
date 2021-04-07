

var Notification = function () {

    this.options = function () {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut",
            escapeHtml: false
        };
    };

    this.warning = function (message, options = '') {
        this.options();

        toastr['warning'](message, '', options);
    };


    this.success = function (message, options = '') {
        this.options();
        toastr['success'](message, '', options);
    };

    this.error = function (message, options = '') {
        this.options();
        toastr['error'](message,'', options);
    };

    this.info = function (message, options = '') {
        this.options();
        toastr['info'](message, '', options);
    };

};


