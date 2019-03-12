import * as MODALS from './modals';

(function () {
    'use strict';

    $(document).ready(() => {
        $('[data-toggle="tooltip"]').tooltip();
        MODALS.initModalConfirm();
    });

})($);
