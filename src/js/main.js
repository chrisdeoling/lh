import * as MODALS from './modals';
import * as FILES from './files';

(function () {
    'use strict';

    $(document).ready(() => {
        $('[data-toggle="tooltip"]').tooltip();
        MODALS.initModalConfirm();
        MODALS.initModalZip();
        FILES.initFiles();
    });

})($);
