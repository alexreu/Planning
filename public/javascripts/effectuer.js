$(function(){
    $("#update_modal").on("show.bs.modal",function(event) {
        var button = $(event.relatedTarget);
        var name = button.data('name');
        var id = button.data('id');
        var com = button.data('com');
        var nom = button.data('nom');
        var prenom = button.data('prenom');

        var modal = $(this);
        modal.find("#update_task").val(name);
    });
});