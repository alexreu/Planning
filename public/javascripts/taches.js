//quelles technos? pourquoi? 
//JQuery pour préremplir le modal avec les données en base avant modification (facilité de manipulation du DOM)

$(function(){
    $("#update_modal").on('show.bs.modal', function (event) {
        // data collectées dans le bouton pour alimenter le modal => cf var modal = $(this);
        var button = $(event.relatedTarget);
        var name = button.data('name');
        var id =  button.data('id');
        var com =  button.data('com');

        var modal = $(this);
        modal.find('#update_task').val(name);
        modal.find('#update_com').val(com);
        modal.find('#task_id').val(id)
    });
});


