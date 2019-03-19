//modal confirm
export const initAdmin = () => {
  $('.favorites-link').on("click", function(e){
    e.preventDefault();
    $(this).toggleClass('checked');
  });
  $('.remove-link').on("click", function(e){
    e.preventDefault();
    $(this).closest( "tr" ).remove();
  });
}
