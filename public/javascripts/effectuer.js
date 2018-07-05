//quelles technos? pourquoi? 
//JQuery pour préremplir le modal avec les données en base avant modification (facilité de manipulation du DOM)

$(function(){
    $("#update_toDo").on("show.bs.modal",function(event) {
        // data collectées dans le bouton pour alimenter le modal => cf var modal = $(this);
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
