/**
 * Created by 01020 on 07-Feb-17.
 */

//Les variable a utiliser
var data = [];
var ssp = [];
var datspe = [];
var data9h = [];
var data11h = [];
var data13h = [];
var data15h = [];
var dataPlush = [];

function loadspecialite() {
  $.ajax({
    type: "GET",
    url: "/getspecialite",

    success: function(msg){

      var html = "<option value=''>DEPARTEMENT</option>";
      var data = null;

      try {
        data = JSON.parse(msg);
        for (var i = 0 ; i<data.length ; i++){
          html += "<option value='"+data[i].id_dossier+"'>"+data[i].num_dossier+"</option>"
        }
        $("#specialite").html(html);
      }
      catch (e) {
        $("#specialite").html(html);
      }

    },
    error: function (error) {

    }
  });
}
var idSouspec = []
function loadsousspecialite(id) {
  $.ajax({
    type: "GET",
    url: "/getsouspecialite?id_dossier="+id,

    success: function(msg){

      var html = "<option value=''>SOUS SPECIALITE</option>";
      var data = null;

      try {
        data = JSON.parse(msg);
        for (var i = 0 ; i<data.length ; i++){
          idSouspec.push(data[i].id_lotclient);
          html += "<option value='"+data[i].id_lotclient+"'>"+data[i].libelle+"</option>"
        }
        $("#sspecialite").html(html);
        $("#divsspec").show();

      }
      catch (e) {
        idSouspec = [];
        $("#sspecialite").html(html);
        $("#divsspec").hide();
      }


    },
    error: function (error) {

    }
  });
}

function loadvitessecible() {
  var id_lotclient = $("#specialite").val();
  $.ajax({
    type: "GET",
    url: "/getsouspecialite?id_dossier="+id_lotclient,

    success: function(msg){

      var html = "<table class='table table-bordered'>" +
        "<thead>" +
        "<tr>" +
        "<th>Sous-specialités</th>" +
        "<th> 0 - 1 mois  (qte/heure/op)</th>" +
        "<th>1 - 3 mois (qte/heure/op)</th>" +
        "<th>3 - 6 mois (qte/heure/op)</th>" +
        "<th>6 + mois (qte/heure/op)</th>" +
        "<th>option</th>" +
        "</tr>" +
        "</thead>" +
        "<tbody>" ;
      var data = null;

      try {

        data = JSON.parse(msg);
        for (var i = 0 ; i<data.length ; i++){
          //idSouspec.push(data[i].id_lotclient);
          html += "<tr>" +
            "<td><input type='hidden' id='id_lotc_"+data[i].id_lotclient+"' value='"+data[i].id_lotclient+"'/>"+data[i].libelle+"</td>" +
            "<td><input id='a_"+data[i].id_lotclient+"' class='cl_"+data[i].id_lotclient+"' type='text' id='cible_a' value='"+(data[i].cible_a || '0')+"' disabled='true'/></td>" +
            "<td><input id='b_"+data[i].id_lotclient+"' class='cl_"+data[i].id_lotclient+"' type='text' id='cible_b' value='"+(data[i].cible_b || '0')+"' disabled='true'/></td>" +
            "<td><input id='c_"+data[i].id_lotclient+"' class='cl_"+data[i].id_lotclient+"' type='text' id='cible_c' value='"+(data[i].cible_c || '0')+"' disabled='true'/></td>" +
            "<td><input id='d_"+data[i].id_lotclient+"' class='cl_"+data[i].id_lotclient+"' type='text' id='cible_d' value='"+(data[i].cible_d || '0')+"' disabled='true'/></td>" +
            "<td id='id_"+data[i].id_lotclient+"'><a href='#' onclick='enable(\""+data[i].id_lotclient+"\")'><i class='fa fa-edit fa-2x'></i> </a> </td>" +
            "</tr>"
        }

        html +="</tbody>" +
          "</table>";
        $("#div").html(html);

      }
      catch (e) {
      }


    },
    error: function (error) {

    }
  });
}

function enable(clas){
  var html = "<a href='#' onclick='save(\""+clas+"\")'><i class='fa fa-check fa-2x text-success'></i> </a> "
  $('.cl_'+clas).prop("disabled",false);
  $('#id_'+clas).html(html);

}

function save(clas) {
  var id_lc = $("#id_lotc_"+clas).val();
  var a = $("#a_"+clas).val();
  var b = $("#b_"+clas).val();
  var c = $("#c_"+clas).val();
  var d = $("#d_"+clas).val();

  $.ajax({
    type: "GET",
    url: "/modif_cible?id_lotclient="+id_lc+"&a="+a+"&b="+b+"&c="+c+"&d="+d,

    success: function(msg){
      //alert(msg);
      loadvitessecible();

    },
    error: function (error) {
      //alert(error);
    }
  });

}

var html_div_globale = "" ; // html du table de valeur globale
var html_graphe_globale = "<div id='echart_pie_globale' style='height:600px;'></div>" ; // html du graphe de valeur globale


var html_div_heure = "" ; // html du table de valeur par lapse de temps
var html_graphe_heure = "<div id='graphe_heure' style='height:600px;'></div>" ; // html du graphe de valeur par lapse de temps

var html_div_quantite = "" ; // html du table de quantite group by sous-specialite
var html_graphe_quantite = "<div id='graphe_quantite' style='height:600px;'></div>" ; // html du graphe de quantite group by sous-specialite

var html_div_vitesse = "" ; // html du table de vitesse group by sous-specialite
var html_graphe_vitesse = "<div id='graphe_quantite' style='height:600px;'></div>" ; // html du graphe de vitesse group by sous-specialite


var libGlobale = [];
var dataGlobale = [];

/*function de changement de contenu du DIV valeur globale
 * parametre fenetre
 * 1=>tableau de valeur globale
 * 2=>graphe de valeur globale
 * */
function  change_globale(fenetre) {
  if(Number(fenetre)==1){

    $("#div_globale").html(html_div_globale);
    for(var i = 0; i<data.length;i++){
      $(".dep_"+data[i].id_pers).html(""+(data[i].libelle ||'-'));

    }
    reloadDatatableGlobale();
  }else if (Number(fenetre)==2){
    $.getScript("/js/echarts/theme.js");
    $.getScript("/js/echarts/echarts.js");
    $("#div_globale").html(html_graphe_globale);


    var echartPieCollapseAl = echarts.init(document.getElementById('echart_pie_globale'), theme);
    echartPieCollapseAl.setOption(getOptionPieCol(libGlobale,dataGlobale));
  }

  //reloadDatatable();//reload des donnees datatable

}

/*fonction pour le changement de fennetre Div repartition par heure
 * parametre fenetre
 * 1=>tableau de valeur heure
 * 2=>graphe de valeur heure
 */

function change_heure(fenetre){
  if(Number(fenetre)==1){

    $("#div_heure").html(html_div_heure);

    //rajouter les donnees de departement
    for(var i = 0; i<data.length;i++){
      $(".dep_"+data[i].id_pers).html(""+(data[i].libelle ||'-'));

    }

    //rajouter les valeurs par heure
    for(var i = 0; i<data9h.length;i++){
      var qt = Number(""+(data9h[i].qte ||'0'));
      //console.log("#9h_"+data9h[i].id_pers);
      $("#9h_"+data9h[i].id_pers).html(""+(data9h[i].qte ||'0'));


    }for(var i = 0; i<data11h.length;i++){
      var qt = Number(""+(data11h[i].qte ||'0'));
      //console.log("#11h_"+data11h[i].id_pers);
      $("#11h_"+data11h[i].id_pers).html(""+(data11h[i].qte ||'0'));


    }for(var i = 0; i<data13h.length;i++){
      var qt = Number(""+(data13h[i].qte ||'0'));
      //console.log("#13h_"+data13h[i].id_pers);
      $("#13h_"+data13h[i].id_pers).html(""+(data13h[i].qte ||'0'));


    }
    //console.log(data15h);
    for(var i = 0; i<data15h.length;i++){
      var qt = Number(""+(data15h[i].qte ||'0'));
      //console.log("#15h_"+data15h[i].id_pers);
      $("#15h_"+data15h[i].id_pers).html(""+(data15h[i].qte ||'0'));


    }for(var i = 0; i<dataPlush.length;i++){
      var qt = Number(""+(dataPlush[i].qte ||'0'));
      //console.log("#plush_"+dataPlush[i].id_pers);
      $("#plush_"+dataPlush[i].id_pers).html(""+(dataPlush[i].qte ||'0'));


    }
    reloadDatatableHeure();
  }else if (Number(fenetre)==2){




    var lib_heure = [];
    var qte9h = [];
    var qte9_11h = [];
    var qte11_13h = [];
    var qte13_15h = [];
    var qte15_ph = [];
    for(var i = 0; i<data.length;i++){
      lib_heure.push(""+data[i].id_pers);
      qte9h.push(Number($("#9h_"+data[i].id_pers).text()));
      qte9_11h.push(Number($("#11h_"+data[i].id_pers).text()));
      qte11_13h.push(Number($("#13h_"+data[i].id_pers).text()));
      qte13_15h.push(Number($("#15h_"+data[i].id_pers).text()));
      qte15_ph.push(Number($("#plush_"+data[i].id_pers).text()));

    }

    $("#div_heure").html(html_graphe_heure);
    var echartSTKHeure = echarts.init(document.getElementById('graphe_heure'), theme);

    var seriesList = [];
    seriesList.push(
      {
        name:'< 9H',
        type:'bar',
        stack: '总量',
        itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
        data:qte9h
      }
    );

    seriesList.push(
      {
        name:'9 - 11H',
        type:'bar',
        stack: '总量',
        itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
        data:qte9_11h
      }
    );

    seriesList.push(
      {
        name:'11 - 13H',
        type:'bar',
        stack: '总量',
        itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
        data:qte11_13h
      }
    );

    seriesList.push(
      {
        name:'13 - 15 H',
        type:'bar',
        stack: '总量',
        itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
        data:qte13_15h
      }
    );

    seriesList.push(
      {
        name:'15H - plus',
        type:'bar',
        stack: '总量',
        itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
        data:qte15_ph
      }
    );

    echartSTKHeure.setOption(getOptionSTKBar2_0(lib_heure,seriesList,['< 9H','9 - 11H','11 - 13H','13 - 15 H','15H - plus']));

  }
}


/*fonction pour le changement de fennetre Div repartition quantite par sous specialite
 * parametre fenetre
 * 1=>tableau de valeur quantite
 * 2=>graphe de valeur quantite
 */
function change_qte(fenetre){
  if(Number(fenetre)==1){

    $("#div_qte").html(html_div_quantite);

    for(var i = 0; i<data.length;i++){
      $(".dep_"+data[i].id_pers).html(""+(data[i].libelle ||'-'));

    }

    for(var i = 0; i<datspe.length;i++){
      var qt = Number(""+(datspe[i].qte ||'0'));
      var duree = Number(""+(datspe[i].duree ||'0'));
      var vitesse = 0;
      $("#"+datspe[i].id_pers+"_"+datspe[i].id_lotclient).html(""+(datspe[i].qte ||'0'));
      if(qt!=0){
        $("#"+datspe[i].id_pers+"_"+datspe[i].id_lotclient).addClass("btn-success");
      }
    }
    reloadDatatableHeure();
  }else if (Number(fenetre)==2){
    $("#div_qte").html(html_graphe_quantite);

    reloadDatatableQte();
  }
}

/*fonction pour le changement de fennetre Div repartition vitesse par sous specialite
 * parametre fenetre
 * 1=>tableau de valeur vitesse
 * 2=>graphe de valeur vitesse
 */
function change_vitesse(fenetre){
  if(Number(fenetre)==1){

    $("#div_vitesse").html(html_div_vitesse);
    for(var i = 0; i<data.length;i++){
      $(".dep_"+data[i].id_pers).html(""+(data[i].libelle ||'-'));
    }

    for(var i = 0; i<datspe.length;i++){
      var qt = Number(""+(datspe[i].qte ||'0'));
      var duree = Number(""+(datspe[i].duree ||'0'));
      var vitesse = 0;
      //$("#"+datspe[i].id_pers+"_"+datspe[i].id_lotclient).html(""+(datspe[i].qte ||'0'));
      if(qt!=0){
        //$("#"+datspe[i].id_pers+"_"+datspe[i].id_lotclient).addClass("btn-success");
        if(duree!=0){
          vitesse = qt/duree;
        }
      }


      $("#vit_"+datspe[i].id_pers+"_"+datspe[i].id_lotclient).html(""+(vitesse).toFixed(2));

      if(vitesse!=0){
        $("#vit_"+datspe[i].id_pers+"_"+datspe[i].id_lotclient).addClass("btn-success");
      }

    }
    reloadDatatableVitesse();
  }else if (Number(fenetre)==2){
    $("#div_vitesse").html(html_graphe_vitesse);
  }
}


function loadData(){
  var id_dossier = $("#specialite").val();
  var datedeb = $("#datedeb").val();

  $.ajax({
    type: "GET",
    url: "/rp_data?id_dossier="+id_dossier+"&date_deb="+datedeb,
    beforeSend: function(xhr){
      $( "#loadG").show();
    },
    success: function(msg){

    console.log();
      libGlobale = [];
      dataGlobale=[];

      try {
        var data2 = JSON.parse(msg);
        data = data2.qte;
        ssp = data2.souspec;
        datspe = data2.qtesp;
        data9h = data2.m9;
        data11h = data2.p9_11;
        data13h = data2.p11_13;
        data15h = data2.p13_15;
        dataPlush = data2.p15;
        var lib = [];
        var vit = [];
        var donnee = [];
        var html_table_global = "<div class='col-md-6 col-sm-6 col-xs-12'>"+
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
       html_div_globale = "<table class='table table-bordered' id='datatable-buttons_g'>" +
          "<thead>" +
          "<tr>" +
          "<th class='sorting_asc'>Matricule</th>" +
          "<th>Departement</th>" +
          "<th>Quantité <span class='fa fa-sort pull-right'></span> </th>" +
          "<th>Vitesse <span class='fa fa-sort pull-right'></span></th>" +
          "<th>Duree(en heure) <span class='fa fa-sort pull-right'></span></th></tr>"+
          "</thead>" +
          "<tbody>";
        var html = "<table class='table table-bordered'>" +
          "<thead>" +
          "<tr>" +
          "<th>Matricule</th>" +
          "<th>Quantité</th>" +
          "<th>Vitesse</th>" +
          "<th>Duree(en heure)</th>";

        var html_table_heure = "<div class='col-md-6 col-sm-6 col-xs-12'>"+
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
        html_div_heure ="<table class='table table-bordered' id='datatable-buttons_h'>" +
          "<thead>" +
          "<tr>";
        var html_table_ss = "<div class='col-md-12 col-sm-12 col-xs-12'>"+
          "          <div class='x_panel'>"+
          "            <div class='x_title'>"+
          "            <h2>Quantite par Sous specialité</h2>"+
          "          <ul class='nav navbar-right panel_toolbox'>"+
          "            <li><a class='collapse-link'><i class='fa fa-chevron-up'></i></a>"+
          "            </li>"+
        /*  "            <li><a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-expanded='false'><i class='fa fa-wrench'></i></a>" +
          "                 <ul class='dropdown-menu' role='menu'>" +
          "                     <li><a href='#' onclick=''>Données</a> </li>" +
          "                     <li><a href='#' onclick=''>Graphe</a> </li>" +
          "                  </ul>"+
          "            </li>"+*/
          ""+
          "            <li><a class='close-link'><i class='fa fa-close'></i></a>"+
          "            </li>"+
          "            </ul>"+
          "            <div class='clearfix'></div>"+
          "            </div>"+
          "            <div class='x_content' id='div_qte'>";
        html_div_quantite ="<table class='table table-bordered' id='datatable-buttons_q'>" +
          "<thead>" +
          "<tr>"+
          "<th>Matricule</th>"+
          "<th>Departement</th>";

        var html_table_ss_vit = "<div class='col-md-12 col-sm-12 col-xs-12'>"+
          "          <div class='x_panel'>"+
          "            <div class='x_title'>"+
          "            <h2>Vitesse par Sous specialité</h2>"+
          "          <ul class='nav navbar-right panel_toolbox'>"+
          "            <li><a class='collapse-link'><i class='fa fa-chevron-up'></i></a>"+
          "            </li>"+
         /* "            <li><a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-expanded='false'><i class='fa fa-wrench'></i></a>" +
          "                 <ul class='dropdown-menu' role='menu'>" +
          "                     <li><a href='#' onclick=''>Données</a> </li>" +
          "                     <li><a href='#' onclick=''>Graphe</a> </li>" +
          "                  </ul>"+
          "            </li>"+*/
          ""+
          "            <li><a class='close-link'><i class='fa fa-close'></i></a>"+
          "            </li>"+
          "            </ul>"+
          "            <div class='clearfix'></div>"+
          "            </div>"+
          "            <div class='x_content' id='div_vitesse'>";
        html_div_vitesse = "<table class='table table-bordered' id='datatable-buttons_v'>" +
          "<thead>" +
          "<tr>"+
          "<th>Matricule</th>"+
          "<th>Departement</th>";
        var html = "<table class='table table-bordered'>" +
          "<thead>" +
          "<tr>" +
          "<th>Matricule</th>" +
          "<th>Quantité</th>" +
          "<th>Vitesse</th>" +
          "<th>Duree(en heure)</th>";


    var html_table_synthese = "<div class='col-md-12 col-sm-12 col-xs-12'>"+
          "          <div class='x_panel'>"+
          "            <div class='x_title'>"+
          "            <h2>Synthese</h2>"+
          "          <ul class='nav navbar-right panel_toolbox'>"+
          "            <li><a class='collapse-link'><i class='fa fa-chevron-up'></i></a>"+
          "            </li>"+
         /* "            <li><a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-expanded='false'><i class='fa fa-wrench'></i></a>" +
          "                 <ul class='dropdown-menu' role='menu'>" +
          "                     <li><a href='#' onclick=''>Données</a> </li>" +
          "                     <li><a href='#' onclick=''>Graphe</a> </li>" +
          "                  </ul>"+
          "            </li>"+*/
          ""+
          "            <li><a class='close-link'><i class='fa fa-close'></i></a>"+
          "            </li>"+
          "            </ul>"+
          "            <div class='clearfix'></div>"+
          "            </div>"+
          "            <div class='x_content' id='div_synthese'>";

        var htm_div_synthese = "<table class='table table-bordered' id='datatable-buttons_synth'>"+
        "<thead><tr><th>SOUS-SPECIALITE</th><th>REPARTITION</th><th>QUANTITE</th><th>TEMPS</th><th>VITESSE</th><th>NB OP</th></tr><thead><tbody>";



        for(var i = 0; i<ssp.length;i++){
          html_div_quantite += "<th>"+ssp[i].libelle+" <span class='fa fa-sort pull-right'></span></th>";
          html_div_vitesse += "<th>"+ssp[i].libelle+" <span class='fa fa-sort pull-right'></span></th>";
          htm_div_synthese += "<tr>"+
                              "<td>"+ssp[i].libelle+"</td>"+
                              "<td><tr>Titulaire</tr><tr>Basculer</tr><tr>Total</tr></td>"+
                              "<td><ul><li>Titulaire</li><li>Basculer</li><li>Total</li></ul></td>"+
                              "<td><ul><li>Titulaire</li><li>Basculer</li><li>Total</li></ul></td>"+
                              "<td><ul><li>Titulaire</li><li>Basculer</li><li>Total</li></ul></td>"+
                              "<td><ul><li>Titulaire</li><li>Basculer</li><li>Total</li></ul></td>"+
                              "</tr>";
        }

        htm_div_synthese += "</tbody></table>";

        html_div_quantite += "</tr>"+
          "</thead>" +
          "<tbody>";
        html_div_vitesse += "</tr>"+
          "</thead>" +
          "<tbody>";

        html_div_heure += "<th>Matricule</th><th>Departement</th><th><9H <span class='fa fa-sort pull-right'></span></th><th>9-11H <span class='fa fa-sort pull-right'></span></th><th>11-13H <span class='fa fa-sort pull-right'></span></th><th>13-15H</th><th> 15H - plus<span class='fa fa-sort pull-right'></span></th></tr>" +
          "</thead>" +
          "<tbody>";


        var html_graphe = "";
        for (var i = 0 ; i<data.length ; i++){
          var m_html ="";
          var m_html_vit ="";
          /*for(var e = 0; e<ssp.length;e++){;
           m_html += "<td id='"+data[i].id_pers+"_"+ssp[e].id_lotclient+"'>0</td>";
           }*/
          var vitesse = 0;
          var cl = "btn-danger";
          if(Number(data[i].qte || 0)!=0 && Number(data[i].duree || 0)!=0){
            vitesse =(Number(data[i].qte)/Number(data[i].duree)).toFixed(2) ;
            cl = "";
          }
          for(var e = 0; e<ssp.length;e++){;
            m_html += "<td id='"+data[i].id_pers+"_"+ssp[e].id_lotclient+"' class='"+cl+"'>0</td>";
            m_html_vit += "<td id='vit_"+data[i].id_pers+"_"+ssp[e].id_lotclient+"' class='"+cl+"'>0</td>";
          }


          libGlobale.push(""+data[i].id_pers);

          lib.push(data[i].id_pers);
          vit.push(vitesse);
          var obj = {name:""+data[i].id_pers,value:vitesse};

          dataGlobale.push(obj);
          donnee.push(obj);
          html_div_globale += "<tr>" +
            "<td class='"+cl+"'>"+data[i].id_pers+"</td>" +
            "<td class='"+cl+" dep_"+data[i].id_pers+"'></td>" +
            "<td class='"+cl+"'>"+(data[i].qte || '0')+"</td>" +
            "<td class='"+cl+"'>"+vitesse+"</td>"+
            "<td class='"+cl+"'>"+Number(data[i].duree || '0').toFixed(2)+"</td>"+
            "</tr>";
          html_div_quantite += "<tr>" +
            "<td class='"+cl+"'>"+data[i].id_pers+"</td><td class='"+cl+" dep_"+data[i].id_pers+"'></td>"  +m_html +"</tr>";
          html_div_vitesse += "<tr>" +
            "<td class='"+cl+"'>"+data[i].id_pers+"</td><td class='"+cl+" dep_"+data[i].id_pers+"'></td>"  +m_html_vit +"</tr>";
          html_div_heure += "<tr>" +
            "<td class='"+cl+"'>"+data[i].id_pers+"</td><td class='"+cl+" dep_"+data[i].id_pers+"'></td>" +
            "<td class='"+cl+"' id='9h_"+data[i].id_pers+"'>0</td><td class='"+cl+"' id='11h_"+data[i].id_pers+"'>0</td><td class='"+cl+"' id='13h_"+data[i].id_pers+"'>0</td><td class='"+cl+"' id='15h_"+data[i].id_pers+"'>0</td><td class='"+cl+"' id='plush_"+data[i].id_pers+"'>0</td></tr>"
        }
        html +="</tbody>" +
          "</table>";

        html_div_globale += "</tbody>" +
          "</table>";
      html_table_global += html_div_globale + "</div></div></div>";
        html_div_heure += "</tbody>" +
          "</table>";
        html_table_heure += html_div_heure + "</div></div></div>";
        html_div_quantite += "</tbody>" +
          "</table>";
        html_table_ss +=html_div_quantite + "</div></div></div>";
        html_div_vitesse += "</tbody>" +
          "</table>";
        html_table_ss_vit += html_div_vitesse + "</div></div></div>";
        html_table_synthese += htm_div_synthese + "</div></div></div>";

        $("#divGraph").html(html_table_global+html_table_heure+html_table_ss+html_table_ss_vit);
        $("#divGraphique").html(html_graphe);

        for(var i = 0; i<data.length;i++){
          $(".dep_"+data[i].id_pers).html(""+(data[i].libelle ||'-'));
          //console.log("#"+etat[i].idet+"_"+etat[i].id_pers);

        }

        for(var i = 0; i<datspe.length;i++){
          var qt = Number(""+(datspe[i].qte ||'0'));
          var duree = Number(""+(datspe[i].duree ||'0'));
          var vitesse = 0;
          $("#"+datspe[i].id_pers+"_"+datspe[i].id_lotclient).html(""+(datspe[i].qte ||'0'));
          if(qt!=0){
            $("#"+datspe[i].id_pers+"_"+datspe[i].id_lotclient).addClass("btn-success");
            if(duree!=0){
              vitesse = qt/duree;
            }
          }


          $("#vit_"+datspe[i].id_pers+"_"+datspe[i].id_lotclient).html(""+(vitesse).toFixed(2));

          if(vitesse!=0){
            $("#vit_"+datspe[i].id_pers+"_"+datspe[i].id_lotclient).addClass("btn-success");
          }

        }

        for(var i = 0; i<data9h.length;i++){
          var qt = Number(""+(data9h[i].qte ||'0'));
          //console.log("#9h_"+data9h[i].id_pers);
          $("#9h_"+data9h[i].id_pers).html(""+(data9h[i].qte ||'0'));


        }for(var i = 0; i<data11h.length;i++){
          var qt = Number(""+(data11h[i].qte ||'0'));
          //console.log("#11h_"+data11h[i].id_pers);
          $("#11h_"+data11h[i].id_pers).html(""+(data11h[i].qte ||'0'));


        }for(var i = 0; i<data13h.length;i++){
          var qt = Number(""+(data13h[i].qte ||'0'));
          //console.log("#13h_"+data13h[i].id_pers);
          $("#13h_"+data13h[i].id_pers).html(""+(data13h[i].qte ||'0'));


        }
        //console.log(data15h);
        for(var i = 0; i<data15h.length;i++){
          var qt = Number(""+(data15h[i].qte ||'0'));
          //console.log("#15h_"+data15h[i].id_pers);
          $("#15h_"+data15h[i].id_pers).html(""+(data15h[i].qte ||'0'));


        }for(var i = 0; i<dataPlush.length;i++){
          var qt = Number(""+(dataPlush[i].qte ||'0'));
          //console.log("#plush_"+dataPlush[i].id_pers);
          $("#plush_"+dataPlush[i].id_pers).html(""+(dataPlush[i].qte ||'0'));


        }

        $.getScript("/js/custom.min.js");

        reloadDatatableGlobale();
        reloadDatatableHeure();
        reloadDatatableQte();
        reloadDatatableVitesse();
        //reloadDatatable();//reload des donnees datatable

        /*var echartSTKDossier = echarts.init(document.getElementById('echart_stk'), theme);

         var seriesList = [];
         seriesList.push(
         {
         name:'vitesse',
         type:'bar',
         stack: '总量',
         itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
         data:vit
         }
         )
         echartSTKDossier.setOption(getOptionSTKBar(lib,[seriesList[0]]));*/


      }
      catch (e) {
        /*idSouspec = [];
         $("#sspecialite").html(html);
         $("#divsspec").hide();*/
        console.log(e);
        $("#divGraph").html("<p>aucun enregistrement effectué.</p>");
      }
      $( "#loadG").hide();
      //alert(msg);
    },
    error: function (error) {
      $( "#loadG").hide();
      alert(error);
    }
  });
}


function loadDT() {
  var id_lotclient = $("#sspecialite").val();
  var id_dossier = $("#specialite").val();
  if(id_dossier!=""){
    if(id_lotclient!=""){
      loadDataL();
    }else{
      loadData();
    }
  }else{
    alert("Choix du departement obligatoire");
  }
}

function loadDataL(){
  var id_lotclient = $("#sspecialite").val();
  var datedeb = $("#datedeb").val();

  $.ajax({
    type: "GET",
    url: "/rp_datas?id_lotclient="+id_lotclient+"&date_deb="+datedeb,
    beforeSend: function(xhr){
      $( "#loadG").show();
    },
    success: function(msg){



      try {
        var dt= JSON.parse(msg);
        var data = dt.dt;
        var etat = dt.et;
        var hprod = dt.hprod;
        var lib = [];
        var vit = [];
        var donnee = [];
        var html =  "<div class='col-md-12 col-sm-12 col-xs-12'>"+
          "          <div class='x_panel'>"+
          "            <div class='x_title'>"+
          "            <h2>Detail par sous spécialité</h2>"+
          "          <ul class='nav navbar-right panel_toolbox'>"+
          "            <li><a class='collapse-link'><i class='fa fa-chevron-up'></i></a>"+
          "            </li>"+
          ""+
          "            <li><a class='close-link'><i class='fa fa-close'></i></a>"+
          "            </li>"+
          "            </ul>"+
          "            <div class='clearfix'></div>"+
          "            </div>"+
          "            <div class='x_content'>"+
          "<table class='table table-bordered' id='detail-table'>" +
          "<thead>" +
          "<tr>" +
          "<th>Matricule</th>" +
          "<th>Quantité</th>" +
          "<th>Vitesse</th>" +
          "<th>Duree Prod(en heure)</th>" +
          "<th>Duree Hors Prod(en heure)</th>" +
          "<th>OK</th>" +
          "<th>Saisie</th>" +
          "<th>NRRG</th>" +
          "<th>ES</th>" +
          "<th>En attente</th>" +
          "<th>Nbre Echantillon</th>" +
          "<th>Taux d'erreur</th>";



        /*for(var i = 0; i<ssp.length;i++){
         html += "<th>"+ssp[i].libelle+"</th>";
         }*/

        html += "</tr>" +
          "</thead>" +
          "<tbody>";


        var html_graphe = "<div id='echart_stk' style='height:400px;'></div>";
        for (var i = 0 ; i<data.length ; i++){

          /*for(var e = 0; e<ssp.length;e++){;
           m_html += "<td id='"+data[i].id_pers+"_"+ssp[e].id_lotclient+"'>0</td>";
           }*/
          var vitesse = 0;
          var cl = "btn-danger";
          if(Number(data[i].qte || 0)!=0 && Number(data[i].duree || 0)!=0){
            vitesse =Math.round(Number(data[i].qte)/Number(data[i].duree),2) ;
            cl = "";
          }
          var m_html ="<td id='2_"+data[i].id_pers+"' class='"+cl+"'>0</td><td id='1_"+data[i].id_pers+"' class='"+cl+"'>0</td><td id='4_"+data[i].id_pers+"' class='"+cl+"'>0</td>" +
            "<td id='5_"+data[i].id_pers+"' class='"+cl+"'>0</td><td id='6_"+data[i].id_pers+"' class='"+cl+"'>0</td><td id='7_"+data[i].id_pers+"' class='"+cl+"'>0</td><td id='8_"+data[i].id_pers+"' class='"+cl+"'>0</td>";
          /* for(var e = 0; e<ssp.length;e++){;
           m_html += "<td id='"+data[i].id_pers+"_"+ssp[e].id_lotclient+"' class='"+cl+"'>0</td>";
           }*/


          lib.push(data[i].id_pers);
          vit.push(vitesse);
          var obj = {name:data[i].id_pers,value:vitesse};
          donnee.push(obj);
          html += "<tr>" +
            "<td class='"+cl+"'>"+data[i].id_pers+"</td>" +
            "<td class='"+cl+"'>"+(data[i].qte || '0')+"</td>" +
            "<td class='"+cl+"'>"+vitesse+"</td>" +
            "<td class='"+cl+"'>"+Number(data[i].duree || '0').toFixed(2)+"</td>" +
            "<td class='"+cl+"' id='hprod_"+data[i].id_pers+"'>0</td>" +
            m_html+
            "</tr>"
        }
        html += "</tbody></table></div></div></div>";
        $("#divGraph").html(html);



        for(var i = 0; i<hprod.length;i++){
          var qt = Number(""+(hprod[i].duree ||'0'));
          //console.log("#15h_"+data15h[i].id_pers);
          $("#hprod_"+hprod[i].id_pers).html(""+Number(hprod[i].duree ||'0').toFixed(2));
        }
        /*var echartSTKDossier = echarts.init(document.getElementById('echart_stk'), theme);

        var seriesList = [];
        seriesList.push(
          {
            name:'vitesse',
            type:'bar',
            stack: '总量',
            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:vit
          }
        )
        echartSTKDossier.setOption(getOptionSTKBar(lib,[seriesList[0]]));
        html +="</tbody>" +
          "</table>";*/


        for(var i = 0; i<etat.length;i++){
          var qt = Number(""+(etat[i].qte ||'0'));
          $("#"+etat[i].idet+"_"+etat[i].id_pers).html(""+(etat[i].qte ||'0'));
          //console.log("#"+etat[i].idet+"_"+etat[i].id_pers);

        }


        for (var i = 0 ; i<data.length ; i++){
          var echantTot = Number($("#2_"+data[i].id_pers).text())+Number($("#4_"+data[i].id_pers).text())+Number($("#5_"+data[i].id_pers).text());
          var err = Number($("#4_"+data[i].id_pers).text())+Number($("#5_"+data[i].id_pers).text());
          var taux = 0;

          if(echantTot!=0){
            taux = err/echantTot;
          }
          $("#7_"+data[i].id_pers).html(""+echantTot);
          $("#8_"+data[i].id_pers).html(""+taux.toFixed(2));
        }

        var handleDataTableButtons_d = function() {
          if ($("#detail-table").length) {
            $("#detail-table").DataTable({
              dom: "Bfrtip",
              searching: false,
              paging: false,
              "aLengthMenu": [[25, 50, 75, -1], [25, 50, 75, "All"]],
              "iDisplayLength": 25,
              buttons: [
                {
                  extend: "copy",
                  className: "btn-sm"
                },
                {
                  extend: "csv",
                  className: "btn-sm"
                },
                {
                  extend: "excel",
                  className: "btn-sm"
                },
                {
                  extend: "pdfHtml5",
                  className: "btn-sm"
                },
                {
                  extend: "print",
                  className: "btn-sm"
                },
              ],
              responsive: true
            });
          }
        };

        TableManageButtons_d = function() {
          "use strict";
          return {
            init: function() {
              handleDataTableButtons_d();
            }
          };
        }();


        TableManageButtons_d.init();

      }
      catch (e) {
        $("#divGraph").html("<p>aucun enregistrement effectué.</p>:"+e);
      }

      $( "#loadG").hide();
    },
    error: function (error) {
      $( "#loadG").hide();
      alert(error);
    }
  });
}

//rafraichissement de
function reloadDatatableGlobale(){

  var handleDataTableButtons_g = function() {
    if ($("#datatable-buttons_g").length) {
      $("#datatable-buttons_g").DataTable({
        dom: "Bfrtip",
        searching: false,
        paging: true,
        "aLengthMenu": [[25, 50, 75, -1], [25, 50, 75, "All"]],
        "iDisplayLength": 25,
        buttons: [
          {
            extend: "copy",
            className: "btn-sm"
          },
          {
            extend: "csv",
            className: "btn-sm"
          },
          {
            extend: "excel",
            className: "btn-sm"
          },
          {
            extend: "pdfHtml5",
            className: "btn-sm"
          },
          {
            extend: "print",
            className: "btn-sm"
          },
        ],
        responsive: true
      });
    }
  };

  TableManageButtons_g = function() {
    "use strict";
    return {
      init: function() {
        handleDataTableButtons_g();
      }
    };
  }();
  TableManageButtons_g.init();
}

//rafraichessement de la table repartition par heure
function reloadDatatableHeure(){

  var handleDataTableButtons_h = function() {
    if ($("#datatable-buttons_h").length) {
      $("#datatable-buttons_h").DataTable({
        dom: "Bfrtip",
        searching: false,
        paging: true,
        "aLengthMenu": [[25, 50, 75, -1], [25, 50, 75, "All"]],
        "iDisplayLength": 25,
        buttons: [
          {
            extend: "copy",
            className: "btn-sm"
          },
          {
            extend: "csv",
            className: "btn-sm"
          },
          {
            extend: "excel",
            className: "btn-sm"
          },
          {
            extend: "pdfHtml5",
            className: "btn-sm"
          },
          {
            extend: "print",
            className: "btn-sm"
          },
        ],
        responsive: true
      });
    }
  };

  TableManageButtons_h = function() {
    "use strict";
    return {
      init: function() {
        handleDataTableButtons_h();
      }
    };
  }();

  TableManageButtons_h.init();

}

//Rafraichissement du table quantite
function reloadDatatableQte(){
  var handleDataTableButtons_q = function() {
    if ($("#datatable-buttons_q").length) {
      $("#datatable-buttons_q").DataTable({
        dom: "Bfrtip",
        searching: false,
        paging: true,
        "aLengthMenu": [[25, 50, 75, -1], [25, 50, 75, "All"]],
        "iDisplayLength": 25,
        buttons: [
          {
            extend: "copy",
            className: "btn-sm"
          },
          {
            extend: "csv",
            className: "btn-sm"
          },
          {
            extend: "excel",
            className: "btn-sm"
          },
          {
            extend: "pdfHtml5",
            className: "btn-sm"
          },
          {
            extend: "print",
            className: "btn-sm"
          },
        ],
        responsive: true
      });
    }
  };

  TableManageButtons_q = function() {
    "use strict";
    return {
      init: function() {
        handleDataTableButtons_q();
      }
    };
  }();
  TableManageButtons_q.init();
}


//rafraichissement de la table de vitesse
function reloadDatatableVitesse(){
  var handleDataTableButtons_v = function() {
    if ($("#datatable-buttons_v").length) {
      $("#datatable-buttons_v").DataTable({
        dom: "Bfrtip",
        searching: false,
        paging: true,
        "aLengthMenu": [[25, 50, 75, -1], [25, 50, 75, "All"]],
        "iDisplayLength": 25,
        buttons: [
          {
            extend: "copy",
            className: "btn-sm"
          },
          {
            extend: "csv",
            className: "btn-sm"
          },
          {
            extend: "excel",
            className: "btn-sm"
          },
          {
            extend: "pdfHtml5",
            className: "btn-sm"
          },
          {
            extend: "print",
            className: "btn-sm"
          },
        ],
        responsive: true
      });
    }
  };

  TableManageButtons_v = function() {
    "use strict";
    return {
      init: function() {
        handleDataTableButtons_v();
      }
    };
  }();


  TableManageButtons_v.init();
}


