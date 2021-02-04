function suivi_conformite(){
    var id= $("#id_pers").val() ;
    var mois = $("#mois").val();
    if(id && mois){
        $("#tableau_conformite").empty();
        $.ajax({
            url : '/suivi_conformite', // La ressource ciblée
            type : 'GET', // Le type de la requête HTTP.
            data : 'id=' + id+'&my='+mois,
            dataType : 'html', // On désire recevoir du HTML
            success : function(code_html, statut){ // code_html contient le HTML renvoyé
                $("#tableau_conformite").append(code_html);
            }
        });
    }
}

function suivi_en_details(){
    var id= $("#id_pers").val() ;
    var mois = $("#mois").val();
    if(id && mois){
        $("#tableau_en_details").empty();
        $.ajax({
        url : '/suivi_en_details', // La ressource ciblée
        type : 'GET', // Le type de la requête HTTP.
        data : 'id=' + id+'&my='+mois,
        dataType : 'html', // On désire recevoir du HTML
        success : function(code_html, statut){ // code_html contient le HTML renvoyé
            $("#tableau_en_details").append(code_html);
        }
    });
   }  
}

function suivi_coaching(){
    var id= $("#id_pers").val() ;
    var mois = $("#mois").val();
    if(id && mois){
        $("#mois_menu").empty();
        $.ajax({
        url : '/suivi_coaching', // La ressource ciblée
        type : 'GET', // Le type de la requête HTTP.
        data : 'id=' + id+'&my='+mois,
        dataType : 'html', // On désire recevoir du HTML
        success : function(code_html, statut){ // code_html contient le HTML renvoyé
            $("#mois_menu").append(code_html);
        }
    });
   }  
}

function  compte_rendu(mois, annee, id_pers){
    $("#tableau_cr").empty();
    $.ajax({
        url : '/suivi_coaching_month', // La ressource ciblée
        type : 'POST', // Le type de la requête HTTP.
        data : 'id_pers=' + id_pers+'&m='+mois+'&y='+annee,
        dataType : 'html', // On désire recevoir du HTML
        success : function(code_html, statut){ // code_html contient le HTML renvoyé
            $("#tableau_cr").append(code_html);
        }
    });
}