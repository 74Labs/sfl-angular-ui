'use strict';

angular.module('sfl.ui', [
    'ngAnimate',
    'darthwade.dwLoading',
    'oitozero.ngSweetAlert',
    'toastr',
    'pascalprecht.translate'
])

.config(function (toastrConfig) {

    angular.extend(toastrConfig, {
        autoDismiss: true,
        containerId: 'toast-container',
        maxOpened: 0,
        newestOnTop: true,
        positionClass: 'toast-top-right',
        preventDuplicates: false,
        preventOpenDuplicates: false,
        target: 'body',
        timeOut: 3000
    });

})

.run(function (dwLoading) {

    dwLoading.setDefaultOptions({
        text: ' ',
        active: false,
        overlay: true,
        spinner: true,
        spinnerOptions: {
            corners: 0.8,
            width: 5,
            length: 9,
            radius: 16,
            top: 'auto',
            left: 'auto'
        }
    });

})

.service('sflUi', function ($translate, dwLoading, SweetAlert, toastr) {

    var self = this;

    self.loaders = {
        show: function (key) {
            dwLoading.start(key || 'busy');
        },
        hide: function (key) {
            dwLoading.finish(key || 'busy');
        }
    };

    self.alerts = {
        error: function (message) {
            SweetAlert.swal($translate.instant('ERROR'), message, 'error');
        },
        success: function (message) {
            SweetAlert.swal($translate.instant('SUCCESS'), message, 'success');
        },
        confirm: function (message, confirmCallback, cancelCallback) {
            SweetAlert.swal({
                    title: $translate.instant('CONFIRMATION'),
                    text: message,
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: $translate.instant('YES'),
                    cancelButtonText: $translate.instant('CANCEL'),
                    closeOnConfirm: true,
                    closeOnCancel: true
                },
                function (isConfirm) {
                    if (isConfirm) {
                        if (confirmCallback) confirmCallback();
                    } else {
                        if (cancelCallback) cancelCallback();
                    }
                }
            );
        }
    };

    self.toasts = toastr;

});
