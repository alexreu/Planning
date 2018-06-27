var url = "http://localhost:3012/";
//Ajout d'une personne à partir du formulaire du front
$("#add_person").on('click', function () {
    let name;
    let firstname;
    name = $("#name").val();
    firstname = $("#first_name").val();

    $.post(url+"add_person",{
        nom: name,
        prenom: firstname
    },
        function (status) {
            if (status === 'success'){
                console.log("personne ajoutée");
            }else {
                console.log('erreur lors de l\'ajout');
            }
        }
    )

});

//Ajout d'une tâche à partir du formulaire du front
$("#add_task").on('click', function () {
    let task;
    task = $("#task_name").val();

    $.post(url+"add_task",{
        task : task ,
    },
        function (status) {
            if (status === 'success'){
                console.log("tâche ajoutée");
            }else {
                console.log('erreur lors de l\'ajout');
            }
        }
    )

});

// recuperation du modal pré remplie avec les données à modifier

$("#update_modal").on('show.bs.modal', function (event) {
    var link = $(event.relatedTarget);
    var recipient = link.data('name');
    var id = link.data('id');
    var modal = $(this);
    modal.find('#update_task').val(recipient)
    modal.find('#task_id').val(id)
});