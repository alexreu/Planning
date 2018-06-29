// recuperation du modal pré remplie avec les données à modifier
$(function(){
    $("#update_modal").on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var name = button.data('name');
        //var id =  button.$(this).data('id');
        var com =  button.data('com');
        var modal = $(this);
        modal.find('#update_task').val(name)
        modal.find('#update_com').val(com)
        //modal.find('#task_id').val(id)
    });
})


