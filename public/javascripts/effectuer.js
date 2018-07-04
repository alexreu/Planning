$(function(){
    $("#update_toDo").on("show.bs.modal",function(event) {
        var button = $(event.relatedTarget);
        var id = button.data('id');
        var date_debut = button.data('debut');
        var date_fin = button.data('fin');
        var hour = button.data('hour');

        var modal = $(this);
        modal.find("#date_debut").val(date_debut);
        modal.find("#date_fin").val(date_fin);
        modal.find("#hour").val(hour);
        modal.find("#_id").val(id);
    });
});
