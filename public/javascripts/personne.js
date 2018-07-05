//quelles technos? pourquoi? 
//JQuery pour préremplir le modal avec les données en base avant modification (facilité de manipulation du DOM)

$(function(){
   $("#editModal").on('show.bs.modal', function (event) {
        // data collectées dans le bouton pour alimenter le modal => cf var modal = $(this);
       var button = $(event.relatedTarget);
       var person_id = button.data("id");
       var nom = button.data("nom");
       var prenom = button.data("prenom");
       var numero = button.data("numero");
       console.log(person_id);

       var modal = $(this);
       modal.find("#nom").val(nom);
       modal.find("#prenom").val(prenom);
       modal.find("#mobile").val(numero);
       modal.find("#person_id").val(person_id);

   })
});