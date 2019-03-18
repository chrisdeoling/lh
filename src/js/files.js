export const initFiles = () => {
  var instance;
  $(document).on('click', '.connector-box', function () {
    //var root = $(this).data('root');
    $('.connector-box').removeClass('active');
    $(this).addClass('active');
    $('.drag-field').hide();
    if($(this).hasClass('device')){
      $('#jstree_div').hide();
      $('.drag-field').show();
    }else{
      $('#jstree_div').show();
      $('.addToTable').show();
      $('#jstree_div').jstree("refresh");
      if(instance !== undefined){
        instance.jstree("destroy");
      }else{
        localStorage.removeItem('jstree');
      }
      instance = $('#jstree_div')
      .jstree({
        "plugins" : [
          "contextmenu", "search", "types", "state", "wholerow", "checkbox"
        ],
        'core' : {
          'check_callback' : true,
          'data' : {
            'url' : function (node) {
              //var user_id = $('#client-select').val();
              return node.id === '#' ? 'http://localhost:8080/root.json' : '';
              //'/structure?user_id='+user_id+'&id='+root :
            //  '/structure?user_id='+user_id+'&id='+node.id;
            },
            "data" : function (node) {

            },
            "dataType" : "json" // needed only if you do not supply JSON headers
          }
        },
        "types" : {
          "#" : {
            "max_children" : 1,
            "valid_children" : ["root"]
          },
          "root" : {
            "icon" : "assets/images/tree_folder.svg",
            "valid_children" : ["default"]
          },
          "default" : {
            "icon" : "assets/images/tree_folder.svg",
            "valid_children" : ["default","file"]
          },
          "file" : {
            "icon" : "assets/images/file_icon.svg",
            "valid_children" : []
          }
        },
        "checkbox" : {
          "whole_node" : true,
          'deselect_all': true,
          'three_state' : true,
        }

      });
    }
  });

  $(document).on('click', '.walktrough .walktrough-close', function () {
    $(this).parent().css('visibility','hidden');
  });

  $(document).on('click', 'li > .remove-icon', function () {
    $(this).parent().remove();
  });
}
