//modal confirm
export const initAdmin = () => {

  $('.favorite-link').on("click", function(e){
    e.preventDefault();
    $(this).toggleClass('checked');
  });

  $('.delete-link').on("click", function(e){
    e.preventDefault();
    $(this).closest("tr").remove();
  });

  $('.delete-all-link').on("click", function(e){
    e.preventDefault();
    $( "tbody tr" ).each(function( index ) {
      if($(this).find('input[type="checkbox"]').is(':checked')) {
        $(this).remove();
      }
    });
    $('thead input[type="checkbox"]').prop('checked', false);
  });

  $('.favorite-all-link').on("click", function(e){
    e.preventDefault();
    $( "tbody tr" ).each(function( index ) {
      if($(this).find('input[type="checkbox"]').is(':checked')) {
        $(this).find('.favorite-link').addClass('checked');
      }
    });
  });

  $('#modal-checkbox-lang-all').on("click", function(){
    if ($(this).is(':checked')) {
      $('.languages-scrolled-list .custom-control-input').prop('checked', true);
      var counter = $( ".languages-scrolled-list .custom-control-input:checked" ).length;
      $('.modal-footer p span').html(counter);
    }else{
      $('.languages-scrolled-list .custom-control-input').prop('checked', false);
    }
  });
  $('.languages-scrolled-list .custom-control-input').on("click", function(){
    $('#modal-checkbox-lang-all').prop('checked', false);
    var counter = $( ".languages-scrolled-list .custom-control-input:checked" ).length;
    $('.modal-footer p span').html(counter);
  });
}
