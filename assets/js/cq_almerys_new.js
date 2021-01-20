/**
 * Created by 01020 on 17-Jan-17.update
 */

$(function() {
  $( "#datedeb").datepicker({
    dateFormat: 'yymmdd'
  });
  $( "#datefin").datepicker({
    dateFormat: 'yymmdd'
  });
  $(".modal-dialog").draggable({
    handle: ".modal-header"
  });
} );


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
function loadspecialiteMod() {
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
        $("#depmodal").html(html);
      }
      catch (e) {
        $("#depmodal").html(html);
      }

    },
    error: function (error) {

    }
  });
}
function loadsousspecialiteMod(id) {
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
        $("#sspecmodal").html(html);

      }
      catch (e) {
        idSouspec = [];
        $("#sspecmodal").html(html);
      }


    },
    error: function (error) {

    }
  });
}

function loadPopuMod(id) {
  $.ajax({
    type: "GET",
    url: "/getPopulation?id_lot_client="+id,

    success: function(msg){

        $("#qtemod").val(msg);


    },
    error: function (error) {

    }
  });
}

function updateQte() {
  var idlc = $("#sspecmodal").val();
  var qte = $("#qtemod").val();
  $.ajax({
    type: "GET",
    url: "/setPop?id_lot_client="+idlc+"&qte="+qte,

    success: function(msg){
      alert(msg);
      loadPopuMod(idlc);
    },
    error: function (error) {

    }
  });
}

function loadsat(id_dep) {

  var poleList = [
    {
      id : 41,
      dep : 12,
      lib : "000TEST_DEV"
    },{
      id : 579,
      dep : 19,
      lib : "ALME_TPS"
    },{
      id : 578,
      dep : 20,
      lib : "ALM_HOSPI"
    },{
      id : 580,
      dep : 22,
      lib : "ALM_OPTIQUE"
    },{
      id : 577,
      dep : 38,
      lib : "ALM_SE"
    },{
      id : 29,
      dep : 39,
      lib : "ALM_LDR"
    },{
      id : 583,
      dep : 40,
      lib : "ALM_INTERIAL"
    },{
      id : 582,
      dep : 49,
      lib : "ALM_DENTAIRE_AUDIO"
    }
  ];

  var dep;

  if(Number(id_dep)==41){
    dep = poleList[0].dep;
  }else if(Number(id_dep)==579){
    dep = poleList[1].dep;
  }else if(Number(id_dep)==578){
    dep = poleList[2].dep;
  }else if(Number(id_dep)==580){
    dep = poleList[3].dep;
  }else if(Number(id_dep)==577){
    dep = poleList[4].dep;
  }else if(Number(id_dep)==29){
    dep = poleList[5].dep;
  }else if(Number(id_dep)==583){
    dep = poleList[6].dep;
  }else if(Number(id_dep)==582){
    dep = poleList[7].dep;
  }

  var datecible = $("#datedeb").val();
  $.ajax({
    type: "GET",
    url: "/getsat?id_dep="+dep+"&date="+datecible,

    success: function(msg){

      var html = "<option value=''>SAT</option>";
      var data = null;
      try {
        data = JSON.parse(msg);
        for (var i = 0 ; i<data.length ; i++){
          html += "<option value='"+data[i].id+"'>"+data[i].sat+"</option>"
        }
        $("#sat").html(html);
        $("#divsat").show();
      }
      catch (e) {
        $("#sat").html(html);
      }


    },
    error: function (error) {

    }
  });
}

function loadMotif(id_pole) {
  $.ajax({
    type: "GET",
    url: "/getmotif?id_pole="+id_pole,

    success: function(msg){



      var html = "<option value=''>MOTIF REJET</option>";

      var data = null;
      try {
        data = JSON.parse(msg);
        for (var i = 0 ; i<data.length ; i++){
          html += "<option value='"+data[i].id+"'>"+data[i].libelle+"</option>"
        }
        $("#motif").html(html);
      }
      catch (e) {
        $("#motif").html(html);
      }


    },
    error: function (error) {

    }
  });
}

function loadetat() {
  $.ajax({
    type: "GET",
    url: "/getetat",

    success: function(msg){

      var html = "<option value=''>STATUS</option>";
      var data = null;

      try {
        data = JSON.parse(msg);
        for (var i = 0 ; i<data.length ; i++){
          if(Number(data[i].id_etat)!=3){
            html += "<option value='"+data[i].id_etat+"'>"+data[i].libelle+"</option>"
          }

        }
        $("#etat").html(html);
      }
      catch (e) {
        $("#etat").html(html);
      }


    },
    error: function (error) {

    }
  });
}

function loadcategorie() {
  $.ajax({
    type: "GET",
    url: "/getcategorie",

    success: function(msg){

      var html = "<option value=''>CATEGORIE</option>";
      var data = null;

      try {
        data = JSON.parse(msg);
        for (var i = 0 ; i<data.length ; i++){
          html += "<option value='"+data[i].id_categorie+"'> <span class='badge bg-red'>"+data[i].libelle_categorie+"</span> => "+data[i].effectif_echantillonage+"</option>"
        }
        $("#categorie").html(html);
      }
      catch (e) {
        $("#categorie").html(html);
      }


    },
    error: function (error) {

    }
  });
}
var fltr = 0;
var donneAll = [];
function searchCQalm(a) {
  donneAll = [];
  fltr = a;
  var sql = "";
  var dtdb = $("#datedeb").datepicker().val();
  var dtfn = $("#datefin").datepicker().val();
  var sp = $("#specialite").val();
  var ssp = $("#sspecialite").val();
  var sat = $("#sat").val();
  var mrj = $("#motif").val();
  var stat = $("#etat").val();
  var tpfav = $("#typefav").val();
  var cat = $("#categorie").val();
  var mat = $("#matr").val();
  var dist = $("#distinction").val();


  if(dtdb != '' || dtfn != ''){
    if(dtdb == ''){
      sql = " AND almerys_p_lot_new.date_deb " +
        " = '"+dtfn+" ";
    }else if(dtfn == ''){
      sql = " AND almerys_p_lot_new.date_deb " +
        " = '"+dtdb+"' ";
    }else if(dtfn == dtdb){
      sql = " AND almerys_p_lot_new.date_deb " +
        " = '"+dtdb+"' ";
    }else{
      sql = " AND to_date(almerys_p_lot_new.date_deb,'YYYYMMDD') " +
        " between to_date('"+dtdb+"','YYYYMMDD') AND to_date('"+dtfn+"','YYYYMMDD') ";

    }
  }

  if(ssp != ''){

    sql += " AND p_lot.id_lotclient = "+ssp+" ";
  }else{
    if(sp != ''){
      sql += " AND p_dossier.id_dossier = "+sp+" ";
    }
  }
  if(sat != ''){
    sql += " AND almerys_user_new.id  = "+sat+" ";
  }
  if(mrj != ''){
    sql += " AND almerys_motif_rejet.id  = "+mrj+" ";
  }
  if(mat != ''){
    sql += " AND p_lot.id_pers = "+mat+" ";
    //alert(mat);
  }if(stat != ''){
    sql += " AND almerys_p_lot_new.id_etat  = "+stat+" ";
  }if(dist != ''){
    sql += " AND almerys_distinction.id_distinction = "+dist+" ";
  }
  if(tpfav != ''){
    if (tpfav == 1)
      sql += " AND CAST(almerys_p_lot_new.qte AS double precision)>=100 ";
    else if ( tpfav == 2)
      sql += " AND CAST(almerys_p_lot_new.qte AS double precision) BETWEEN 50 AND 99.99 ";
    else if ( tpfav == 3)
      sql += " AND CAST(almerys_p_lot_new.qte AS double precision) BETWEEN 30 AND 49.99 ";
    else
      sql += " AND CAST(almerys_p_lot_new.qte AS double precision)< 30 ";
  }


  if(a != 0){
    sql += " AND almerys_p_lot_new.echantillon  = true ";
  }

  console.log(sql);
  $.ajax({
    type: "POST",
    url: "/getlistcq",
    data : 'sql=' + sql,

    beforeSend: function(xhr){
      $( "#loadC").show();
    },
    success: function(msg){
      $( "#loadC").hide();
      //console.log(msg);
      var data = JSON.parse(msg);
      donneAll = data;
      var html = "<div class='x_panel'>"+
        "        <div class='x_title'>" +
        "<table class='table table-bordered'>" +
        " <tr>" +
        "   <td><h2>Total : <span class=''>"+data.length+"</span></h2></td>" +
        "   <td><h2>ISO : <span class='' id='iso'></span></h2></td>" +
        "   <td><h2>FAV : <span class='' id='fav'></span></h2></td>" +
        "   <td><h2>CIBLE : <span class='' id='cible'></span></h2></td>" +
        "</tr>" +
        "</table>"+
        "        <ul class='nav navbar-right panel_toolbox'>"+
        "          <li><a class='collapse-link'><i class='fa fa-chevron-up'></i></a>"+
        "          </li>"+
        ""+
        "          <li><a class='close-link'><i class='fa fa-close'></i></a>"+
        "          </li>"+
        "          </ul>"+
        "          <div class='clearfix'></div>"+
        "          </div>"+
        "          <div class='x_content'>"+
        ""+
        "          <div id='tableFiltre'>"+
        "          <table  id='datatable-buttons' class='table table-striped table-bordered'>"+
        "          <thead>"+
        "          <tr class=''>"+
          "          <th id='date_deb_ldt' class='th text-center'>DEPARTEMENT PRINCIPALE</td>"+
          "          <th id='date_deb_ldt' class='th text-center'>DEPARTEMENT</td>"+
          "          <th id='date_deb_ldt' class='th text-center'>SOUS SPECIALITE</td>"+
          "          <th id='date_deb_ldt' class='th text-center'>NUM FACTURE</td>"+
          "          <th id='date_deb_ldt' class='text-center'>NUM NUO</th>"+
          "          <th id='date_fin_ldt' class='text-center'>TYPE FAV</th>"+
          "          <th id='appelation' class='text-center'>MONTANT RC</th>"+
          "          <th id='appelation' class='text-center'>MATRICULE</th>"+
          "          <th id='appelation' class='text-center'>SAT</th>"+
          "          <th id='appelation' class='text-center'>CQ</th>"+
          "          <th id='appelation' class='text-center'>TYPE CQ</th>"+
          "          <th id='appelation' class='text-center'>ETAT</th>"+
          "          <th id='appelation' class='text-center'>HEURE</th>"+
          "          <th id='appelation' class='text-center'>TYPE ERREUR</th>"+
          "          <th id='appelation' class='text-center'>DISTINCTION</th>"+
          "          <th id='appelation' class='text-center'>MOTIF REJET</th>"+
        "          </tr>"+
        "          </thead>"+
        "          <tbody>";

      var poleList = [
        {
          id : 41,
          dep : 12,
          lib : "000TEST_DEV"
        },{
          id : 579,
          dep : 19,
          lib : "ALME_TPS"
        },{
          id : 578,
          dep : 20,
          lib : "ALM_HOSPI"
        },{
          id : 580,
          dep : 22,
          lib : "ALM_OPTIQUE"
        },{
          id : 577,
          dep : 38,
          lib : "ALM_SE"
        },{
          id : 29,
          dep : 39,
          lib : "ALM_LDR"
        },{
          id : 583,
          dep : 40,
          lib : "ALM_INTERIAL"
        },{
          id : 582,
          dep : 49,
          lib : "ALM_DENTAIRE_AUDIO"
        }
      ];



      for (var i = 0 ; i<data.length ; i++)
      {
        //console.log(data[i].etat);
        var libb = data[i].numerofacture || 'aucun';

        if(libb.trim() == "")
        {
          libb = "aucun";
        }
        var classes = "";
        var modlaunch = "<td><a class='' href='#' data-toggle='modal' data-target='#myModalCq' /onclick='loadModal(\""+data[i].id+"\",\""+data[i].idp+"\",\""+data[i].numerofacture+"\",\""+data[i].quantite+"\",\""+data[i].numeronuo+"\",\""+data[i].numerops+"\",\""+data[i].matriculesaisie+"\",\""+data[i].id_mot_rj+"\",\""+data[i].id_et+"\",\""+data[i].echant+"\");'>"+libb+"</a></td>";
        if(Number(niveaux)==2)
        {
          modlaunch = " <td><a class=''>"+data[i].numerofacture+"</a></td>";
        }
        else if(Number(niveaux)==1)
        {
          modlaunch = "<td><a class='' href='#' data-toggle='modal' data-target='#myModalCq' onclick='loadModal(\""+data[i].id+"\",\""+data[i].idp+"\",\""+data[i].numerofacture+"\",\""+data[i].quantite+"\",\""+data[i].numeronuo+"\",\""+data[i].numerops+"\",\""+data[i].matriculesaisie+"\",\""+data[i].id_mot_rj+"\",\""+data[i].id_et+"\",\""+data[i].echant+"\");'>"+libb+"</a></td>";

        }
        else if(Number(niveaux)==0 && data[i].etat=="Saisie" )
        {
          modlaunch = "<td><a class='' href='#' data-toggle='modal' data-target='#myModalCq' onclick='loadModal(\""+data[i].id+"\",\""+data[i].idp+"\",\""+data[i].numerofacture+"\",\""+data[i].quantite+"\",\""+data[i].numeronuo+"\",\""+data[i].numerops+"\",\""+data[i].matriculesaisie+"\",\""+data[i].id_mot_rj+"\",\""+data[i].id_et+"\",\""+data[i].echant+"\");'>"+libb+"</a></td>";

        }
        else if(Number(user)==Number(data[i].matriculecq))
        {
          modlaunch = "<td><a class='' href='#' data-toggle='modal' data-target='#myModalCq' onclick='loadModal(\""+data[i].id+"\",\""+data[i].idp+"\",\""+data[i].numerofacture+"\",\""+data[i].quantite+"\",\""+data[i].numeronuo+"\",\""+data[i].numerops+"\",\""+data[i].matriculesaisie+"\",\""+data[i].id_mot_rj+"\",\""+data[i].id_et+"\",\""+data[i].echant+"\");'>"+libb+"</a></td>";

        }
        else
        {
          modlaunch = " <td><a class=''>"+libb+"</a></td>";

        }


        //modlaunch = " <td><a class=''  href='#' data-toggle='modal' data-target='#myModalCq'>"+libb+"</a></td>";

        var dep =data[i].dep;

        if(Number(data[i].iddep)==12)
        {
          dep = poleList[0].lib;
        }
        else if(Number(data[i].iddep)==19)
        {
          dep = poleList[1].lib;
        }
        else if(Number(data[i].iddep)==20)
        {
          dep = poleList[2].lib;
        }else if(Number(data[i].iddep)==22)
        {
          dep = poleList[3].lib;
        }
        else if(Number(data[i].iddep)==38)
        {
          dep = poleList[4].lib;
        }else if(Number(data[i].iddep)==39)
        {
          dep = poleList[5].lib;
        }
        else if(Number(data[i].iddep)==40)
        {
          dep = poleList[6].lib;
        }
        else if(Number(data[i].iddep)==49)
        {
          dep = poleList[7].lib;
        }
        var pole = "";
        //console.log()
        for(var e = 0; e<poleList.length;e++)
        {
          if((poleList[e].id)==Number(data[i].id_dossier) )
          {
            pole = poleList[e].lib;
            break;
          }
        }

        var typFav = "NON FAV";
        if(Number(data[i].quantite)>=100)
        {
          typFav = "FAV A";
        }
        else if(Number(data[i].quantite) < 100 && Number(data[i].quantite) >= 50)
        {
          typFav = "FAV B";
        }
        else if(Number(data[i].quantite) < 50 && Number(data[i].quantite) >= 30)
        {
          typFav = "FAV C";
        }
        var nom_cq = (data[i].nom_cq || '-')+" "+(data[i].prenom_cq || '-');
        html += " <tr class=''  id='tr_"+data[i].id+"'>"+
          "            <td class='"+classes+"'>"+dep+"</td>"+
          "            <td class='"+classes+"'>"+data[i].dossier+"</td>"+
          "            <td class='"+classes+"'>"+data[i].lotclient+"</td>"+
          modlaunch+
          "            <td class='"+classes+"'>"+(data[i].numeronuo  || '-')+"</td>"+
//"            <td class='"+classes+"'>"+(data[i].numerops  || '-')+"</td>"+
//"            <td class='"+classes+"'>"+data[i].typefav+"</td>"+
          "            <td class='"+classes+"'>"+typFav+"</td>"+
          "            <td class='"+classes+"'>"+data[i].quantite+"</td>"+
          "            <td class='"+classes+"'>"+data[i].matriculesaisie+"</td>"+
          "            <td class='"+classes+"'>"+(data[i].sat || '-')+"</td>"+
          "            <td class='"+classes+"'>"+(nom_cq || '-')+"</td>"+
          "   <td class='"+classes+"' id='tc_"+data[i].id+"'>"+(data[i].type_controle || '-')+"</td>"+
          "            <td class='"+classes+"'>"+data[i].etat+"</td>"+
          "            <td class='"+classes+"'>"+(data[i].heure || '-')+"</td>"+
          "            <td class='"+classes+"'>"+(data[i].erreur_cq || '-')+"</td>"+
          "            <td class='"+classes+"'>"+(data.dist || '-')+"</td>"+
          "            <td class='"+classes+"'>"+(data[i].motifrejet || '-')+"</td>"+
          "            </tr>";
      }

      html += "</tbody></table></div></div></div><script src='/js/custom.min.js'></script>";
      $("#div").html(html);
      loadNbISO(data);
    },
    error: function (error)
    {
      $( "#loadC").hide();
    }
  });
}
var typeG = 1;
function loadGraph() {
  //getCQEtat

  var sql = "";
  var dtdb = $("#datedeb").datepicker().val();
  var dtfn = $("#datefin").datepicker().val();
  var sp = $("#specialite").val();
  var ssp = $("#sspecialite").val();
  var sat = $("#sat").val();
  var mrj = $("#motif").val();
  var stat = $("#etat").val();
  var tpfav = $("#typefav").val();
  var cat = $("#categorie").val();
  var tp = null;
  if(dtdb != '' || dtfn != ''){
    if(dtdb == ''){
      sql = " AND to_date(almerys_p_lot_new.date_deb,'YYYYMMDD') " +
        " = to_date('"+dtfn+"','YYYYMMDD') ";
    }else if(dtfn == ''){
      sql = " AND to_date(almerys_p_lot_new.date_deb,'YYYYMMDD') " +
        " = to_date('"+dtdb+"','YYYYMMDD') ";
    }else if(dtfn == dtdb){
      sql = " AND to_date(almerys_p_lot_new.date_deb,'YYYYMMDD') " +
        " = to_date('"+dtdb+"','YYYYMMDD') ";
    }else{
      sql = " AND to_date(almerys_p_lot_new.date_deb,'YYYYMMDD') " +
        " between to_date('"+dtdb+"','YYYYMMDD') AND to_date('"+dtfn+"','YYYYMMDD') ";

    }
  }
  if(sp != ''){
    if(Number(sp)==579){
      tp = 0;
    }else if(Number(sp)==578){
      tp = 1;
    }else if(Number(sp)==580){
      tp = 2;
    }else if(Number(sp)==577){
      tp = 3;
    }else if(Number(sp)==29){
      tp = 4;
    }else if(Number(sp)==583){
      tp = 5;
    }else if(Number(sp)==582){
      tp = 6;
    }
    typeG = 0;
    sql += " AND p_dossier.id_dossier = "+sp+" ";
  }
  if(ssp != ''){
    //sql += " AND p_lot_client.id_lotclient = "+ssp+" ";
  }
  if(sat != ''){
    sql += " AND almerys_user.id  = "+sat+" ";
  }
  if(mrj != ''){
    sql += " AND almerys_motif_rejet.id  = "+mrj+" ";
  }
  if(tpfav != ''){
    if (tpfav == 1)
      sql += " AND CAST(almerys_p_lot_new.qte AS double precision)>=100 ";
    else if ( tpfav == 2)
      sql += " AND CAST(almerys_p_lot_new.qte AS double precision) BETWEEN 50 AND 99.99 ";
    else if ( tpfav == 3)
      sql += " AND CAST(almerys_p_lot_new.qte AS double precision) BETWEEN 30 AND 49.99 ";
    else
      sql += " AND CAST(almerys_p_lot_new.qte AS double precision)< 30 ";
  }
  var uri = "";
   if(tp!=null){
     uri = "&tp="+tp+"&sspec="

     for(var a = 0 ;a<idSouspec.length;a++){
       uri += ":"+idSouspec[a];
     }
     console.log("uri="+uri);
   }
  $.ajax({
    type: "POST",
    url: "/getCQEtat",
    data : 'sql=' + sql+uri,
    beforeSend: function(xhr){
      $( "#loadG").show();
    },
    success: function(msg){
      $( "#loadG").hide();
      console.log(msg);
      var dat = JSON.parse(msg);
      var data = dat.etat;
      var data2 = dat.pole;
      var html = "<div class='x_panel'>"+
        "        <div class='x_title'>"+
        "          <h2>STAT <span class=''></span></h2>"+
        "        <ul class='nav navbar-right panel_toolbox'>"+
        "          <li><a class='collapse-link'><i class='fa fa-chevron-up'></i></a>"+
        "          </li>"+
        ""+
        "          <li><a class='close-link'><i class='fa fa-close'></i></a>"+
        "          </li>"+
        "          </ul>"+
        "          <div class='clearfix'></div>"+
        "          </div>"+
        "          <div class='x_content'>"+
        ""+
        "          <div id='tableFiltre'><div class='col-md-4'>"+
        " <div id='echart_cq' style='height:400px;'></div>"+
        " </div>" +
        "<div class='col-md-8'>"+
        " <div id='echart_stk' style='height:400px;'></div>"+
        " </div>" +
        "<script src='/js/custom.min.js'></script>";

      html += "</div></div> </div>";
      $("#divGraph").html(html);
      var echartPieCollapseDossier = echarts.init(document.getElementById('echart_cq'), theme);
      echartPieCollapseDossier.setOption(getOptionPieColCq([data[1].name,data[2].name,data[3].name,data[4].name,data[5].name],[data[1],data[2],data[3],data[4],data[5]],'left'));
   var echartSTKDossier = echarts.init(document.getElementById('echart_stk'), theme);
      if(dat.tp!=null){

        var lib = [];
        var rf = [];
        var pri = [];
        for(var s = 0 ; s<data2.length;s++){
          lib.push(data2[s].name);
          rf.push(data2[s].value[1]);
          pri.push(data2[s].value[0]);
        }
          var seriesList = [];
          seriesList.push(
            {
              name:'renfort',
              type:'bar',
              stack: '总量',
              itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
              data:rf
            }
          );seriesList.push(
            {
              name:'principale',
              type:'bar',
              stack: '总量',
              itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
              data:pri
            }
          )
        //console.log(JSON.stringify(seriesList));
        echartSTKDossier.setOption(getOptionSTKBar(lib,[seriesList[0],seriesList[1]]));
        //echartSTKDossier.setOption(getOptionPieColCq(['renfort','principale'],[{name : 'renfort',value : data2[0].value[0]},{name : 'principale',value : data2[0].value[1]}],'right'));
      }else{
        var seriesList = [];
        seriesList.push(
          {
            name:'renfort',
            type:'bar',
            stack: '总量',
            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:[data2[0].value[0],data2[1].value[0],data2[2].value[0],data2[3].value[0],data2[4].value[0],data2[5].value[0],data2[6].value[0]]
          }
        );
        seriesList.push(
          {
            name:'principale',
            type:'bar',
            stack: '总量',
            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:[data2[0].value[1],data2[1].value[1],data2[2].value[1],data2[3].value[1],data2[4].value[1],data2[5].value[1],data2[6].value[1]]
          }
        )
        //console.log(JSON.stringify(seriesList));
        echartSTKDossier.setOption(getOptionSTKBar([data2[0].name,data2[1].name,data2[2].name,data2[3].name,data2[4].name,data2[5].name,data2[6].name],[seriesList[0],seriesList[1]]));
      }

    },
    error: function (error) {
      $( "#loadG").hide();
    }
  });
}


var idp=null;
var id=null;
var idrej=null;
var idst=null;
var is_rejet=false;


function updateCQ() {

  var etat = $("#statut").val();
  var id_motif = $("#motifmodal").val();
  var newMotif = $("#new_motif").val();
  var nuo = $("#nnuo").val();
  var ps = $("#nps").val();
  var id_tp = $("#type_controle").val();
  var param = "";
  if(Number(id_tp)!=0){
    param = "&idtp="+id_tp;
  }
  $.ajax({
    type: "POST",
    url: "/updateCQ",
    data : "id=" + id+"&idp="+idp+"&id_nuo="+nuo+"&id_ps="+ps+"&id_etat="+etat+"&idErreur="+id_motif+"&new="+newMotif+"&is_rejet="+is_rejet+param,

    success: function(msg){
      if(msg == "reload"){
        window.location.reload();
      }else{
        loadCQUpdated(id);
      }

      //alert(msg);
    },
    error: function (error) {
    }

  });

}

function loadCQUpdated(id){
  $.ajax({
    type: "POST",
    url: "/loadCQUpdated",
    data : "id=" + id,

    success: function(msg){

      var data = JSON.parse(msg);

      var libb = data.numerofacture || 'aucun';

      var poleList = [
        {
          id : 41,
          dep : 12,
          lib : "000TEST_DEV"
        },{
          id : 579,
          dep : 19,
          lib : "ALME_TPS"
        },{
          id : 578,
          dep : 20,
          lib : "ALM_HOSPI"
        },{
          id : 580,
          dep : 22,
          lib : "ALM_OPTIQUE"
        },{
          id : 577,
          dep : 38,
          lib : "ALM_SE"
        },{
          id : 29,
          dep : 39,
          lib : "ALM_LDR"
        },{
          id : 583,
          dep : 40,
          lib : "ALM_INTERIAL"
        },{
          id : 582,
          dep : 49,
          lib : "ALM_DENTAIRE_AUDIO"
        }
      ];

      if(libb.trim() == "")
      {
        libb = "aucun";
      }
      var classes = "";
      var modlaunch = "<td><a class='' href='#' data-toggle='modal' data-target='#myModalCq' onclick='loadModal(\""+data.id+"\",\""+data.idp+"\",\""+data.numerofacture+"\",\""+data.quantite+"\",\""+data.numeronuo+"\",\""+data.numerops+"\",\""+data.matriculesaisie+"\",\""+data.id_mot_rj+"\",\""+data.id_et+"\",\""+data.echant+"\");'>"+libb+"</a></td>";
      if(Number(niveaux)==2)
      {
        modlaunch = " <td><a class=''>"+data.numerofacture+"</a></td>";
      }
      else if(Number(niveaux)==1)
      {
        modlaunch = "<td><a class='' href='#' data-toggle='modal' data-target='#myModalCq' onclick='loadModal(\""+data.id+"\",\""+data.idp+"\",\""+data.numerofacture+"\",\""+data.quantite+"\",\""+data.numeronuo+"\",\""+data.numerops+"\",\""+data.matriculesaisie+"\",\""+data.id_mot_rj+"\",\""+data.id_et+"\",\""+data.echant+"\");'>"+libb+"</a></td>";

      }
      else if(Number(niveaux)==0 && data.etat=="Saisie" )
      {
        modlaunch = "<td><a class='' href='#' data-toggle='modal' data-target='#myModalCq' onclick='loadModal(\""+data.id+"\",\""+data.idp+"\",\""+data.numerofacture+"\",\""+data.quantite+"\",\""+data.numeronuo+"\",\""+data.numerops+"\",\""+data.matriculesaisie+"\",\""+data.id_mot_rj+"\",\""+data.id_et+"\",\""+data.echant+"\");'>"+libb+"</a></td>";

      }
      else if(Number(user)==Number(data.matriculecq))
      {
        modlaunch = "<td><a class='' href='#' data-toggle='modal' data-target='#myModalCq' onclick='loadModal(\""+data.id+"\",\""+data.idp+"\",\""+data.numerofacture+"\",\""+data.quantite+"\",\""+data.numeronuo+"\",\""+data.numerops+"\",\""+data.matriculesaisie+"\",\""+data.id_mot_rj+"\",\""+data.id_et+"\",\""+data.echant+"\");'>"+libb+"</a></td>";

      }
      else
      {
        modlaunch = " <td><a class=''>"+libb+"</a></td>";

      }

      var dep =data.dep;

      if(Number(data.iddep)==12)
      {
        dep = poleList[0].lib;
      }
      else if(Number(data.iddep)==19)
      {
        dep = poleList[1].lib;
      }
      else if(Number(data.iddep)==20)
      {
        dep = poleList[2].lib;
      }else if(Number(data.iddep)==22)
      {
        dep = poleList[3].lib;
      }
      else if(Number(data.iddep)==38)
      {
        dep = poleList[4].lib;
      }else if(Number(data.iddep)==39)
      {
        dep = poleList[5].lib;
      }
      else if(Number(data.iddep)==40)
      {
        dep = poleList[6].lib;
      }
      else if(Number(data.iddep)==49)
      {
        dep = poleList[7].lib;
      }
      var pole = "";
      //console.log()
      for(var e = 0; e<poleList.length;e++)
      {
        if((poleList[e].id)==Number(data.id_dossier) )
        {
          pole = poleList[e].lib;
          break;
        }
      }

      var typFav = "NON FAV";
      if(Number(data.quantite)>=100)
      {
        typFav = "FAV A";
      }
      else if(Number(data.quantite) < 100 && Number(data.quantite) >= 50)
      {
        typFav = "FAV B";
      }
      else if(Number(data.quantite) < 50 && Number(data.quantite) >= 30)
      {
        typFav = "FAV C";
      }

      var nom_cq = (data.nom_cq || '-')+" "+(data.prenom_cq || '-');
      var html = ""+
        "            <td class='"+classes+"'>"+dep+"</td>"+
        "            <td class='"+classes+"'>"+data.dossier+"</td>"+
        "            <td class='"+classes+"'>"+data.lotclient+"</td>"+
        modlaunch+
        "            <td class='"+classes+"'>"+(data.numeronuo  || '-')+"</td>"+
//"            <td class='"+classes+"'>"+(data.numerops  || '-')+"</td>"+
//"            <td class='"+classes+"'>"+data.typefav+"</td>"+
        "            <td class='"+classes+"'>"+typFav+"</td>"+
        "            <td class='"+classes+"'>"+data.quantite+"</td>"+
        "            <td class='"+classes+"'>"+data.matriculesaisie+"</td>"+
        "            <td class='"+classes+"'>"+(data.sat || '-')+"</td>"+
        "            <td class='"+classes+"'>"+(nom_cq || '-')+"</td>"+
        "   <td class='"+classes+"' id='tc_"+id+"'>"+(data.type_controle || '-')+"</td>"+
        "            <td class='"+classes+"'>"+data.etat+"</td>"+
        "            <td class='"+classes+"'>"+(data.heure || '-')+"</td>"+
        "            <td class='"+classes+"'>"+(data.erreur_cq || '-')+"</td>"+
        "            <td class='"+classes+"'>"+(data.dist || '-')+"</td>"+
        "            <td class='"+classes+"'>"+(data.motifrejet || '-')+"</td>";

      $("#tr_"+id).html(html);


      loadNbISO(donneAll);

    },
    error: function (error) {

    }

  });
}



function loadModal(idd,po,numfact,qte,nuo,ps,mat,idrejt,idstat,tpControle){
  id = idd;
  idp = po;
  idrej = idrejt;
  idst = idstat;
  //alert(id);
  $("#titre").text(numfact+" | "+qte);
  $("#nfact").val(numfact);
  $("#mont").val(qte);
  $("#nnuo").val(nuo);
  $("#nps").val(ps);
  $("#matricule").val(mat);
//console.log(tpControle);
  if(tpControle=="true"){
    $("#type_controle").html("<option value='0'>ISO<option>");
  }else{
    var ht = "<option value='1'>FAV</option><option value='2'>CIBLE</option><option value='3'>ISO</option>";
    $("#type_controle").html(ht);
  }
  $.ajax({
    type: "GET",
    url: "/getetat",
    success: function(msg){

      var html = "<option value=''></option>";
      var data = JSON.parse(msg);

      for (var i = 0 ; i<data.length ; i++){
        if(Number(data[i].id_etat)!=1 && Number(data[i].id_etat)!=3){
          if(Number(data[i].id_etat)==Number(idst)){
            if(Number(data[i].id_etat)!=3){
              html += "<script>loadMotifMod("+data[i].id_etat+");</script>"
            }
            html += "<option value='"+data[i].id_etat+"' selected='true'>"+data[i].libelle+"</option>"
          }else{
            html += "<option value='"+data[i].id_etat+"'>"+data[i].libelle+"</option>"
          }

        }
      }
      $("#statut").html(html);
    },
    error: function (error) {

    }
  });


}

function loadMotifMod(etat){

    $.ajax({
      type: "GET",
      url: "/getErreur?id_pole="+idp+"&etat="+etat,

      success: function(msg){
        $("#new").addClass("hidden");
        var html = "<option value=''></option>";
        var data = JSON.parse(msg);

        for (var i = 0 ; i<data.length ; i++){
          if(Number(data[i].id)==Number(idrej)){
            html += "<option value='"+data[i].id+"' selected='true'>"+data[i].libelle+"</option>"
          }else{
            html += "<option value='"+data[i].id+"'>"+data[i].libelle+"</option>"
          }

        }

        if(Number(etat)>=4  && Number(etat)<=5){
          html += "<option value='new'>Nouvelle</option>";
        }

        $("#motifmodal").html(html);
      },
      error: function (error) {

      }
    });



}

function onNew(id){
  if(id=="new"){
    $("#new").removeClass("hidden");
  }else{
    $("#new").addClass("hidden");
  }
}

function loadSAT(){

    $.ajax({
      type: "GET",
      url: "/getsatall",

      success: function(msg){

        var html = "<option value=''></option>";
        var data = JSON.parse(msg);

        for (var i = 0 ; i<data.length ; i++){
            html += "<option value='"+data[i].id+"'>"+data[i].sat+"</option>"
        }
        $("#sat").html(html);
      },
      error: function (error) {//test

      }
    });
}

function loadNbISO(data) {
  var nbISO = 0;
  var nbFAV = 0;
  var nbCIBLE = 0;

  for (var i = 0 ; i<data.length ; i++){
    if(Number(data[i].id_tpc)==1){
      nbFAV +=1;
    }else if(Number(data[i].id_tpc)==2){
      nbCIBLE +=1;
    }else if(Number(data[i].id_tpc)==3){
      nbISO +=1;
    }
  }

  $("#iso").html(""+nbISO);
  $("#fav").html(""+nbFAV);
  $("#cible").html(""+nbCIBLE);
}

function loaddistinction() {
  $.ajax({
    type: "GET",
    url: "/loadDistinction",

    success: function(msg){

      var html = "<option value=''>DISTINCTION</option>";
      var data = null;

      try {
        data = JSON.parse(msg);
        for (var i = 0 ; i<data.length ; i++){
          html += "<option value='"+data[i].id_distinction+"'>"+data[i].libelle+"</option>"
        }
        $("#distinction").html(html);
      }
      catch (e) {
        $("#distinction").html(html);
      }

    },
    error: function (error) {

    }
  });
}


