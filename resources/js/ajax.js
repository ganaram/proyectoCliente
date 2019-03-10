document.addEventListener('DOMContentLoaded', function(){
    $(document).on('click','.create-modal', function() {
        $('#create').modal('show');
        $('.form-horizontal').show();
        $('.modal-title').text('Crear nuevo Post');
      });
      $("#add").click(function() {
        $.ajax({
          type: 'POST',
          url: 'addPost',
          data: {
            '_token': $('input[name=_token]').val(),
            'title': $('input[name=title]').val(),
            'body': $('input[name=body]').val()
          },
          success: function(data){
            if ((data.errors)) {
              $('.error').removeClass('hidden');
              $('.error').text(data.errors.title);
              $('.error').text(data.errors.body);
            } else {
              $('.error').remove();
              $('#table').append("<tr class='post" + data.id + "'>"+
              "<td>" + data.id + "</td>"+
              "<td>" + data.title + "</td>"+
              "<td>" + data.body + "</td>"+
              "<td>" + data.created_at + "</td>"+
              "<td><button class='show-modal btn btn-info btn-sm' data-id='" + data.id + "' data-title='" + data.title + "' data-body='" + data.body + "'><span class='fa fa-eye'></span></button> <button class='edit-modal btn btn-warning btn-sm' data-id='" + data.id + "' data-title='" + data.title + "' data-body='" + data.body + "'><span class='glyphicon glyphicon-pencil'></span></button> <button class='delete-modal btn btn-danger btn-sm' data-id='" + data.id + "' data-title='" + data.title + "' data-body='" + data.body + "'><span class='glyphicon glyphicon-trash'></span></button></td>"+
              "</tr>");
            }
          },
        });
        $('#title').val('');
        $('#body').val('');
      });
    
    // Función con formulario para editar
    $(document).on('click', '.edit-modal', function() {
    $('#footer_action_button').text(" Editar Post");
    $('#footer_action_button').addClass('glyphicon-check');
    $('#footer_action_button').removeClass('glyphicon-trash');
    $('.actionBtn').addClass('btn-success');
    $('.actionBtn').removeClass('btn-danger');
    $('.actionBtn').addClass('edit');
    $('.modal-title').text('Editar!');
    $('.deleteContent').hide();
    $('.form-horizontal').show();
    $('#fid').val($(this).data('id'));
    $('#t').val($(this).data('title'));
    $('#b').val($(this).data('body'));
    $('#myModal').modal('show');
    });
    
    $('.modal-footer').on('click', '.edit', function() {
      $.ajax({
        type: 'POST',
        url: 'editPost',
        data: {
    '_token': $('input[name=_token]').val(),
    'id': $("#fid").val(),
    'title': $('#t').val(),
    'body': $('#b').val()
    },
    success: function(data) {
          $('.post' + data.id).replaceWith(" "+
          "<tr class='post" + data.id + "'>"+
          "<td>" + data.id + "</td>"+
          "<td>" + data.title + "</td>"+
          "<td>" + data.body + "</td>"+
          "<td>" + data.created_at + "</td>"+
     "<td><button class='show-modal btn btn-info btn-sm' data-id='" + data.id + "' data-title='" + data.title + "' data-body='" + data.body + "'><span class='fa fa-eye'></span></button> <button class='edit-modal btn btn-warning btn-sm' data-id='" + data.id + "' data-title='" + data.title + "' data-body='" + data.body + "'><span class='glyphicon glyphicon-pencil'></span></button> <button class='delete-modal btn btn-danger btn-sm' data-id='" + data.id + "' data-title='" + data.title + "' data-body='" + data.body + "'><span class='glyphicon glyphicon-trash'></span></button></td>"+
          "</tr>");
        }
      });
    });
    
    // Función con formulario para borrar
    $(document).on('click', '.delete-modal', function() {
    $('#footer_action_button').text(" Eliminar");
    $('#footer_action_button').removeClass('glyphicon-check');
    $('#footer_action_button').addClass('glyphicon-trash');
    $('.actionBtn').removeClass('btn-success');
    $('.actionBtn').addClass('btn-danger');
    $('.actionBtn').addClass('delete');
    $('.modal-title').text('Eliminar Post');
    $('.id').text($(this).data('id'));
    $('.deleteContent').show();
    $('.form-horizontal').hide();
    $('.title').html($(this).data('title'));
    $('#myModal').modal('show');
    });
    
    $('.modal-footer').on('click', '.delete', function(){
      $.ajax({
        type: 'POST',
        url: 'deletePost',
        data: {
          '_token': $('input[name=_token]').val(),
          'id': $('.id').text()
        },
        success: function(data){
           $('.post' + $('.id').text()).remove();
        }
      });
    });
    
      /// Función para mostrar un modal con la info del ítem.
      $(document).on('click', '.show-modal', function() {
      $('#show').modal('show');
      $('#i').text($(this).data('id'));
      $('#ti').text($(this).data('title'));
      $('#by').text($(this).data('body'));
      $('.modal-title').text('Información del Post.');
      });
    });