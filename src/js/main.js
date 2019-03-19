import * as MODALS from './modals';
import * as FILES from './files';
import * as ADMIN from './admin';

(function () {
    'use strict';

    $(document).ready(() => {
        $('[data-toggle="tooltip"]').tooltip();
        $('thead input[type="checkbox"]').on("click", function(){
          if ($(this).is(':checked')) {
            $(this).closest('table').find('tbody input[type="checkbox"]').prop('checked', true);
            $('.all-actions').css('visibility','visible');
          }else{
            $(this).closest('table').find('tbody input[type="checkbox"]').prop('checked', false);
            $('.all-actions').css('visibility','hidden');
          }
        });
        MODALS.initModalConfirm();
        MODALS.initModalZip();
        ADMIN.initAdmin();
        FILES.initFiles();
    });

})($);
