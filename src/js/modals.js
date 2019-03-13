//modal confirm
export const initModalConfirm = () => {
  $("*[data-confirm]").on("click", function(e){
    e.preventDefault();

    var href = $(this).attr("href");
    var title = $(this).attr("data-confirm");
    var btnText = $(this).attr("data-confirm-btn");
    var functionName = $(this).attr("data-confirm-call");

    var modalConfirm = $("#modal-confirm");

    modalConfirm.find(".btn-confirm").html(btnText);
    modalConfirm.find(".modal-body p").html(title);

    if(functionName != undefined){
      modalConfirm.find(".btn-confirm").on("click", function(){
        window[functionName]();
        modalConfirm.modal("hide");
      });
    }else{
      modalConfirm.find(".btn-confirm").attr("href", href);
    }

    modalConfirm.modal("show");
  });
}
export const initModalZip = () => {
  $(".header .drag-field").on("click", function(e){
    var modalZip = $("#modal-zip");
    modalZip.modal("show");
  });
}
