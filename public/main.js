var url = "http://localhost:3012/";
$("#add_person").on('click', function () {
    let name;
    let firstname;
    name = $("#name").val();
    firstname = $("#first_name").val();

    console.log(name);
    console.log(firstname);

    $.post(url+"add_person",{
        nom: name,
        prenom: firstname
    },
        function (result, status) {
            if (status === 'success'){
                console.log("personne ajoutée");
            }else {
                console.log('erreur lors de l\'ajout');
            }
        }
    )

});