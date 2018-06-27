var url = "localhost:3012/";
$("#add_person").on('click', function () {
    let name;
    let firstname;
    name = ("#name").val();
    firstname = ("#first_name").val();

    $.post(url+"/add_person",{
        name: name,
        firstname: firstname
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