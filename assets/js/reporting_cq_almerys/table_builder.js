/**
 * 
 * Ce fichier contient des fonctions utilisés pour la construction
 * des tableaux dans la partie reporting cq Almerys
 * 
 */


 /**
  * Conteneur du tableau Valeur globale
  */
 function getValeurGlobaleContainer() {
    return "<div class='col-md-12 col-sm-12 col-xs-12'>"+
    "          <div class='x_panel'>"+
    "            <div class='x_title'>"+
    "            <h2>Valeur globale</h2>"+
    "          <ul class='nav navbar-right panel_toolbox'>"+
    "            <li><a class='collapse-link'><i class='fa fa-chevron-up'></i></a>"+
    "            </li>"+
    "            <li><a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-expanded='false'><i class='fa fa-wrench'></i></a>" +
    "                 <ul class='dropdown-menu' role='menu'>" +
    "                     <li><a href='#' onclick='change_globale(1);'>Données</a> </li>" +
    "                     <li><a href='#' onclick='change_globale(2)'>Graphe</a> </li>" +
    "                  </ul>"+
    "            </li>"+
    ""+
    "            <li><a class='close-link'><i class='fa fa-close'></i></a>"+
    "            </li>"+
    "            </ul>"+
    "            <div class='clearfix'></div>"+
    "            </div>"+
    "            <div class='x_content' id='div_globale'>";
 }

 /**
  * Header du tableau Valeur globale
  */
 function getValeurGlobaleHeader() {
     return "<table class='table table-bordered' id='datatable-buttons_g'>" +
     "<thead>" +
     "<tr>" +
     "<th class='sorting_asc'>Matricule</th>" +
     "<th>Departement</th>" +
     "<th>Quantité <span class='fa fa-sort pull-right'></span> </th>" +
     "<th>Vitesse <span class='fa fa-sort pull-right'></span></th>" +
     "<th>Duree(en heure) <span class='fa fa-sort pull-right'></span></th></tr>"+
     "</thead>" +
     "<tbody>";
 }









 /**
  * Conteneur du tableau Repartition par heure
  */
 function getRepartitionParHeureContainer() {
    return "<div class='col-md-12 col-sm-12 col-xs-12'>"+
    "          <div class='x_panel'>"+
    "            <div class='x_title'>"+
    "            <h2>Repartition par heure</h2>"+
    "          <ul class='nav navbar-right panel_toolbox'>"+
    "            <li><a class='collapse-link'><i class='fa fa-chevron-up'></i></a>"+
    "            </li>"+
    "            <li><a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-expanded='false'><i class='fa fa-wrench'></i></a>" +
    "                 <ul class='dropdown-menu' role='menu'>" +
    "                     <li><a href='#' onclick='change_heure(1);'>Données</a> </li>" +
    "                     <li><a href='#' onclick='change_heure(2);'>Graphe</a> </li>" +
    "                  </ul>"+
    "            </li>"+
    ""+
    ""+
    "            <li><a class='close-link'><i class='fa fa-close'></i></a>"+
    "            </li>"+
    "            </ul>"+
    "            <div class='clearfix'></div>"+
    "            </div>"+
    "            <div class='x_content' id='div_heure'>";
 }

 /**
  * Header du tableau Repartition par heure
  */
 function getRepartitionParHeureHeader() {
    return "<table class='table table-bordered' id='datatable-buttons_h'>" +
    "<thead>" +
    "<tr>" +
    "<th>Matricule</th><th>Departement</th><th>07 à 8h<span class='fa fa-sort pull-right'></span></th><th>08 à 9h <span class='fa fa-sort pull-right'></span></th><th>09 à 9h45<span class='fa fa-sort pull-right'></span></th><th>10 à 11h</th><th> 11 à 11h45<span class='fa fa-sort pull-right'></span></th>" +
    "<th>12h30 à 14h<span class='fa fa-sort pull-right'></span></th><th>14 à 15h <span class='fa fa-sort pull-right'></span></th><th> 15 à 16h <span class='fa fa-sort pull-right'></span></th><th>16 à 17h</th><th> 17 à 18h <span class='fa fa-sort pull-right'></span></th>" +
    "</tr>" +
    "</thead>" +
    "<tbody>";
 }










 /**
  * Conteneur du tableau Quantite par Sous specialité
  */
 function getQteSSContainer() {
    return "<div class='col-md-12 col-sm-12 col-xs-12'>"+
    "          <div class='x_panel'>"+
    "            <div class='x_title'>"+
    "            <h2>Quantite par Sous specialité</h2>"+
    "          <ul class='nav navbar-right panel_toolbox'>"+
    "            <li><a class='collapse-link'><i class='fa fa-chevron-up'></i></a>"+
    "            </li>"+
    "            <li><a class='close-link'><i class='fa fa-close'></i></a>"+
    "            </li>"+
    "            </ul>"+
    "            <div class='clearfix'></div>"+
    "            </div>"+
    "            <div class='x_content' id='div_qte'>";
 }

 /**
  * Header du tableau Quantite par Sous specialité
  */
 function getQteSSHeader() {
    return "<table class='table table-bordered' id='datatable-buttons_q'>" +
    "<thead>" +
    "<tr>"+
    "<th>Matricule</th>"+
    "<th>Departement</th>";
 }








 /**
  * Conteneur du tableau vitesse par Sous specialité
  */
 function getVitesseSSContainer() {
    return "<div class='col-md-12 col-sm-12 col-xs-12'>"+
    "          <div class='x_panel'>"+
    "            <div class='x_title'>"+
    "            <h2>Vitesse par Sous specialité</h2>"+
    "          <ul class='nav navbar-right panel_toolbox'>"+
    "            <li><a class='collapse-link'><i class='fa fa-chevron-up'></i></a>"+
    "            </li>"+
    "            <li><a class='close-link'><i class='fa fa-close'></i></a>"+
    "            </li>"+
    "            </ul>"+
    "            <div class='clearfix'></div>"+
    "            </div>"+
    "            <div class='x_content' id='div_vitesse'>";
 }

 /**
  * Header du tableau vitesse par Sous specialité
  */
 function getVitesseSSHeader() {
    return "<table class='table table-bordered' id='datatable-buttons_v'>" +
    "<thead>" +
    "<tr>"+
    "<th>Matricule</th>"+
    "<th>Departement</th>";
 }









 /**
  * Conteneur du tableau synthèse
  */
 function getSyntheseContainer() {
    return "<div class='col-md-12 col-sm-12 col-xs-12'>"+
    "          <div class='x_panel'>"+
    "            <div class='x_title'>"+
    "            <h2>Synthese</h2>"+
    "          <ul class='nav navbar-right panel_toolbox'>"+
    "            <li><a class='collapse-link'><i class='fa fa-chevron-up'></i></a>"+
    "            </li>"+
    "            <li><a class='close-link'><i class='fa fa-close'></i></a>"+
    "            </li>"+
    "            </ul>"+
    "            <div class='clearfix'></div>"+
    "            </div>"+
    "            <div class='x_content' id='div_synthese'>";
 }

 /**
  * Header du tableau synthèse
  */
 function getSyntheseHeader() {
    return "<table class='table table-bordered' id='datatable-buttons_sy'>"+
    "<thead><tr><th>SOUS-SPECIALITE</th><th>REPARTITION</th><th>QUANTITE</th><th>TEMPS</th><th>VITESSE</th><th>NB OP</th></tr><thead><tbody>";
 }








 /**
  * Construit les parties headers dynamiques ===> les sous-spécialités
  */
 function buildDynamicHeaders(ssp = []) {
    //=> on prend les headers statiques
    var htm_div_synthese = getSyntheseHeader();
    var html_div_quantite = getQteSSHeader();
    var html_div_vitesse = getVitesseSSHeader();

    //=> on rajoute les valeurs dynamiques
    if(ssp.length > 0) {
        var styleA = "style='background-color: #fff8fd'";
        var  styleB= "style='background-color: #b2e5ff'";
        var stTemp = styleA;

        for(var i = 0; i<ssp.length;i++){

            html_div_quantite += "<th>"+ssp[i].libelle+" <span class='fa fa-sort pull-right' style='background-color: #b2e5ff'></span></th>";

            html_div_vitesse += "<th>"+ssp[i].libelle+" <span class='fa fa-sort pull-right'></span></th>";

            htm_div_synthese += "<tr>"+
              "<td "+stTemp+">"+ssp[i].libelle+"</td>"+
              "<td "+stTemp+">Titulaire</td>"+
              "<td "+stTemp+" id='t_q_"+ssp[i].id_lotclient+"'>0</td>"+
              "<td "+stTemp+" id='t_t_"+ssp[i].id_lotclient+"'>0</td>"+
              "<td "+stTemp+" id='t_v_"+ssp[i].id_lotclient+"'>0</td>"+
              "<td "+stTemp+" id='t_op_"+ssp[i].id_lotclient+"'>0</td>"+
              "</tr>";

            htm_div_synthese += "<tr>"+
              "<td "+stTemp+"></td>"+
              "<td "+stTemp+">Basculer</td>"+
              "<td "+stTemp+" id='b_q_"+ssp[i].id_lotclient+"'>0</td>"+
              "<td "+stTemp+" id='b_t_"+ssp[i].id_lotclient+"'>0</td>"+
              "<td "+stTemp+" id='b_v_"+ssp[i].id_lotclient+"'>0</td>"+
              "<td "+stTemp+" id='b_op_"+ssp[i].id_lotclient+"'>0</td>"+
              "</tr>";

            htm_div_synthese += "<tr>"+
              "<td "+stTemp+"></td>"+
              "<td "+stTemp+">Total</td>"+
              "<td "+stTemp+" id='tot_q_"+ssp[i].id_lotclient+"'>0</td>"+
              "<td "+stTemp+" id='tot_t_"+ssp[i].id_lotclient+"'>0</td>"+
              "<td "+stTemp+" id='tot_v_"+ssp[i].id_lotclient+"'>0</td>"+
              "<td "+stTemp+" id='tot_op_"+ssp[i].id_lotclient+"'>0</td>"+
              "</tr>";

            if(stTemp == styleA){
              stTemp=styleB;
            }else{
              stTemp = styleA;
            }

        }
    } 


    htm_div_synthese += "<tr>"+
        "<td class='btn-info'>Total</td>"+
        "<td class='btn-info'></td>"+
        "<td class='btn-info' id='t_qte'>0</td>"+
        "<td class='btn-info' id='t_temp'>0</td>"+
        "<td class='btn-info' id='t_vitesse'>0</td>"+
        "<td class='btn-info' id='t_op'>0</td>"+
        "</tr>"+ 
        "</tbody></table>";

    html_div_quantite += "</tr>"+
        "</thead>" +
        "<tbody>";

    html_div_vitesse += "</tr>"+
        "</thead>" +
        "<tbody>";
    
    return {
        html_div_vitesse : html_div_vitesse,
        html_div_quantite : html_div_quantite,
        htm_div_synthese : htm_div_synthese
    };
    
 }




 /**
  * Place les colonnes et les lignes des tableaux
  * @param {*} data 
  * @param {*} ssp 
  */
 function buildTablesBody(data = [], ssp = []) {
    var html_div_globale = '';
    var html_div_quantite = '';
    var html_div_vitesse = '';
    var html_div_heure = '';

    if(data.length > 0) {
        for (var i = 0 ; i<data.length ; i++){
            var m_html ="";
            var m_html_vit ="";
            
            var vitesse = 0;
            var cl = "btn-danger";

            if(Number(data[i].qte || 0)!=0 && Number(data[i].duree || 0)!=0){
              vitesse =(Number(data[i].qte)/Number(data[i].duree)).toFixed(2) ;
              cl = "";
            }
            for(var e = 0; e<ssp.length;e++){
              m_html += "<td id='"+data[i].id_pers+"_"+ssp[e].id_lotclient+"' class='"+cl+"'>0</td>";
              m_html_vit += "<td id='vit_"+data[i].id_pers+"_"+ssp[e].id_lotclient+"' class='"+cl+"'>0</td>";
            }

            html_div_globale += "<tr>" +
              "<td class='"+cl+"'>"+data[i].id_pers+"</td>" +
              "<td class='"+cl+" dep_"+data[i].id_pers+"'></td>" +
              "<td class='"+cl+"'>"+(data[i].qte || '0')+"</td>" +
              "<td class='"+cl+"'>"+vitesse+"</td>"+
              "<td class='"+cl+"'>"+Number(data[i].duree || '0').toFixed(2)+"</td>"+
              "</tr>" ;

            html_div_quantite += "<tr>" +
              "<td class='"+cl+"'>"+data[i].id_pers+"</td><td class='"+cl+" dep_"+data[i].id_pers+"'></td>"  +m_html +"</tr>";
              

            html_div_vitesse += "<tr>" +
              "<td class='"+cl+"'>"+data[i].id_pers+"</td><td class='"+cl+" dep_"+data[i].id_pers+"' id='dep_"+data[i].id_pers+"'></td>"  +m_html_vit +"</tr>";

            html_div_heure += "<tr>" +
              "<td class='"+cl+"'>"+data[i].id_pers+"</td><td class='"+cl+" dep_"+data[i].id_pers+"'></td>" +
              "<td class='"+cl+"' id='7_8"+data[i].id_pers+"'>0</td><td class='"+cl+"' id='8_9"+data[i].id_pers+"'>0</td><td class='"+cl+"' id='9_9h45"+data[i].id_pers+"'>0</td><td class='"+cl+"' id='10_11"+data[i].id_pers+"'>0</td><td class='"+cl+"' id='11_11h45"+data[i].id_pers+"'>0</td>" +
              "<td class='"+cl+"' id='12h30_14"+data[i].id_pers+"'>0</td><td class='"+cl+"' id='14_15"+data[i].id_pers+"'>0</td><td class='"+cl+"' id='15_16"+data[i].id_pers+"'>0</td><td class='"+cl+"' id='16_17"+data[i].id_pers+"'>0</td><td class='"+cl+"' id='17_18"+data[i].id_pers+"'>0</td>" +
              "</tr>";

        }
    }

    html_div_globale += "</tbody>" +
        "</table>";
    html_div_quantite += "</tbody>" +
        "</table>";
    html_div_vitesse += "</tbody>" +
        "</table>";
    html_div_heure += "</tbody>" +
        "</table>";    

    return {
        html_div_globale : html_div_globale,
        html_div_quantite : html_div_quantite,
        html_div_vitesse : html_div_vitesse,
        html_div_heure : html_div_heure,
    };

 }