function searchHeurealm(a) {
  // donneAll = [];
  fltr = a;
  var dtdb = $("#datedeb").datepicker().val();
  var dtfn = $("#datefin").datepicker().val();
  var sp = $("#specialite").val();
  var matricule= $("#matr").val();
  if(isNaN(parseInt(matricule.toString())) && matricule!="")
  {
    alert("Veuillez entrer un matricule valide!");
    return;
  }
  if(matricule == "") matricule="0";
  if(sp.toString() == "")
  {
    alert("Veuillez selectionner un POLE!");
    return;
  }
  if(dtdb.toString() == "" || dtfn.toString() == "")
  {
    alert("Veuillez selectionner les deux dates!");
    return;
  }
  $.ajax({
    type: "POST",
    url: "/getlistHeureNonProductifAlmerys",
    data: "datedeb=" + dtdb + "&datefin=" + dtfn + "&id_dossier=" + sp + "&id_pers="+matricule+"",

    beforeSend: function (xhr) {
      $("#loadC").show();
      $("#tableFiltre").remove();
    },
    success: function (msg) {
      $("#loadC").hide();
      var data = JSON.parse(msg);
    //  console.log(data);
   //   var donneAll = data;
    //declaration variable total
      var total_formation_assistance_op=0;
      var total_formation_pratique=0;
      var total_formation_sous_charge=0;
      var total_formation_theorique=0;
      var total_reunion_administrative=0;
      var total_reunion_interne= 0;
      var total_heure_total=0;
      var html =
        "          <div id='tableFiltre'>" +
        "<h2>FORMATION / REUNION</h2>"+
        "          <table  id='datatable-buttons' class='table table-striped table-bordered'>" +
        "          <thead>" +
        "          <tr class=''>" +
        "          <th id='Date' class='th text-center'>DATE</th>" +
        "          <th id='Matricule' class='text-center'>MATRICULE</th>" +
        "          <th id='Formation_assistance_op' class='text-center'>	FORMATION: ASSISTANCE OP</th>" +
        "          <th id='Formation_pratique' class='text-center'>	FORMATION: PRATIQUE</th>" +
        "          <th id='Formation_sous-charge' class='text-center'>	FORMATION: SOUS-CHARGE</th>" +
        "          <th id='Formation_theorique' class='text-center'>	FORMATION: THEORIQUE</th>" +
        "          <th id='Reunion_Administrative/RH' class='text-center'>	REUNION: ADMINISTRATIVE/RH</th>" +
        "          <th id='Reunion_Interne' class='text-center'>	REUNION: INTERNE</th>" +
        "          <th id='Total' class='text-center'>TOTAL(personne)</th>" +
        "          </tr>" +
        "          </thead>" +
        "          <tbody>" +
        "";
      data[0].forEach(function(object){
        var style_formation_assistance_op="style='background-color: blue;color:white'";
        var style_formation_pratique="style='background-color: blue;color:white'";
        var style_formation_souscharge="style='background-color: blue;color:white'";
        var style_formation_theorique="style='background-color: blue;color:white'";
        var style_formation_administrative="style='background-color: blue;color:white'";
        var style_reunion_interne="style='background-color: blue;color:white'";
        if(object.formation_assistance_op.toString() == "0") style_formation_assistance_op="style='background-color: #c2c6d6;'";
        if(object.formation_pratique.toString() == "0") style_formation_pratique="style='background-color: #c2c6d6;'";
        if(object.formation_souscharge.toString() == "0") style_formation_souscharge="style='background-color: #c2c6d6;'";
        if(object.formation_theorique.toString() == "0") style_formation_theorique="style='background-color: #c2c6d6;'";
        if(object.formation_administrative.toString() == "0") style_formation_administrative="style='background-color: #c2c6d6;'";
        if(object.reunion_interne.toString() == "0") style_reunion_interne="style='background-color: #c2c6d6;'";
        //Continue Calcule
        total_formation_assistance_op +=parseInt(object.formation_assistance_op);
        total_formation_pratique += parseInt(object.formation_pratique.toString());
        total_formation_sous_charge += parseInt(object.formation_souscharge.toString());
        total_formation_theorique += parseInt(object.formation_theorique.toString());
        total_reunion_administrative += parseInt(object.formation_administrative.toString());
        total_reunion_interne += parseInt(object.reunion_interne.toString());
        total_heure_total += parseInt(SommeHeureFormationReunion(object));

     //   console.log(total_formation_assistance_op+" - "+object.id_pers+" - "+changeSecondToBasicHourFormat(total_formation_assistance_op));
        //console.log(total_heure_total+" - "+object.id_pers);
        // Continue HTML ROW 1
        html+="<tr><td>"+object.date+"</td><td>"+object.id_pers+"</td>" +
          "<td "+style_formation_assistance_op+">"+changeSecondToBasicHourFormat(object.formation_assistance_op)+"</td>" +
          "<td "+style_formation_pratique+">"+changeSecondToBasicHourFormat(object.formation_pratique)+"</td>" +
          "<td "+style_formation_souscharge+">"+changeSecondToBasicHourFormat(object.formation_souscharge)+"</td>" +
          "<td "+style_formation_theorique+">"+changeSecondToBasicHourFormat(object.formation_theorique)+"</td>" +
          "<td "+style_formation_administrative+">"+changeSecondToBasicHourFormat(object.formation_administrative)+"</td>" +
          "<td "+style_reunion_interne+">"+changeSecondToBasicHourFormat(object.reunion_interne)+"</td>" +
          "<td>"+changeSecondToBasicHourFormat(SommeHeureFormationReunion(object))+"</td>" +
          "</tr>";
      });
      html +="<tr><td>TOTAL = </td><td></td>" +
        "<td>"+changeSecondToBasicHourFormat(total_formation_assistance_op)+"</td>" +
        "<td>"+changeSecondToBasicHourFormat(total_formation_pratique)+"</td>"+
        "<td>"+changeSecondToBasicHourFormat(total_formation_sous_charge)+"</td>"+
        "<td>"+changeSecondToBasicHourFormat(total_formation_theorique)+"</td>"+
        "<td>"+changeSecondToBasicHourFormat(total_reunion_administrative)+"</td>"+
        "<td>"+changeSecondToBasicHourFormat(total_reunion_interne)+"</td>"+
        "<td>"+changeSecondToBasicHourFormat(total_heure_total)+"</td>"+
        "</tr>";
      html += "</tbody></table>";
      // PROBLEME add


      html += ""+
      "<h2>PROBLEME TECHNIQUE</h2>"+
        "          <table  id='datatable-buttons_2' class='table table-striped table-bordered'>" +
        "          <thead>" +
        "          <tr class=''>" +
        "          <th id='Date' class='th text-center'>DATE</th>" +
        "          <th id='Matricule' class='text-center'>MATRICULE</th>" +
        "          <th id='Formation_assistance_op' class='text-center'>PROBLEME: INTERNET</th>" +
        "          <th id='Formation_pratique' class='text-center'>PROBLEME: MACHINE</th>" +
        "          <th id='Total' class='text-center'>TOTAL(personne)</th>" +
        "          </tr>" +
        "          </thead>" +
        "          <tbody>" +
        "";
      // Declaration Somme Probleme Interaction
      var total_probleme_internet=0;
      var total_probleme_machine= 0;
      var total_heure_second_total=0;

      data[1].forEach(function(object){
        var style_probleme_internet="style='background-color: blue;color:white'";
        var style_probleme_machine="style='background-color: blue;color:white'";

        if(object.probleme_internet.toString() == "0") style_probleme_internet="style='background-color: #c2c6d6;'";
        if(object.probleme_machine.toString() == "0") style_probleme_machine="style='background-color: #c2c6d6;'";
        // Assigne Total
        total_probleme_internet= total_probleme_internet + parseInt(object.probleme_internet.toString());
        total_probleme_machine= total_probleme_machine + parseInt(object.probleme_machine.toString());
       // alert(total_heure_second_total);
        total_heure_second_total = total_heure_second_total + parseInt(SommeHeureProblemeTechnique(object));
        html+="<tr><td>"+object.date+"</td><td>"+object.id_pers+"</td>" +
          "<td "+style_probleme_internet+">"+changeSecondToBasicHourFormat(object.probleme_internet)+"</td>" +
          "<td "+style_probleme_machine+">"+changeSecondToBasicHourFormat(object.probleme_machine)+"</td>" +
          "<td>"+changeSecondToBasicHourFormat(SommeHeureProblemeTechnique(object))+"</td></tr>";
      });

      html += "<tr>" +
        "<td>TOTAL =</td><td></td>" +
        "<td>"+changeSecondToBasicHourFormat(total_probleme_internet)+"</td>" +
        "<td>"+changeSecondToBasicHourFormat(total_probleme_machine)+"</td>" +
        "<td>"+changeSecondToBasicHourFormat(total_heure_second_total)+"</td>" +
        "</tr>" +
        "</tbody></table>";
      html += "</div>";
      $("#div").append(html);
      reloadDatatableHeure();
      reloadDatatableHeure_Second();
    },
    error: function (error) {
      alert(error);
    }
  });
}
function changeSecondToBasicHourFormat(seconds){
  /*var formatcorrect=  moment("2015-01-01").startOf('day')
    .seconds(seconds)
    .format('HH:mm:ss');*/
  var dur = moment.duration(seconds, "seconds");
  var formatcorrect = Math.floor(dur.asHours()) + moment.utc(dur.asMilliseconds()).format(":mm:ss");
  if(parseInt(Math.floor(dur.asHours()))<10)
  {
    formatcorrect = "0"+Math.floor(dur.asHours()) + moment.utc(dur.asMilliseconds()).format(":mm:ss");
  }
  return formatcorrect.toString();
}

function reloadDatatableHeure(){
  var handleDataTableButtons_v = function() {
    if ($("#datatable-buttons").length) {
      $("#datatable-buttons").DataTable({
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

function reloadDatatableHeure_Second(){
  var handleDataTableButtons_v = function() {
    if ($("#datatable-buttons_2").length) {
      $("#datatable-buttons_2").DataTable({
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
// Calcule some personne Formation/reunion
function SommeHeureFormationReunion(obj){
  var somme = 0;
  somme = parseInt(obj.formation_assistance_op.toString()) + parseInt(obj.formation_pratique.toString()) + parseInt(obj.formation_souscharge.toString()) + parseInt(obj.formation_theorique.toString()) + parseInt(obj.formation_administrative.toString()) + parseInt(obj.reunion_interne.toString());
  /*if(somme == 0)
  {
    alert("TONGA");
  }*/
  return somme;
}
// Calcule some personne Probleme technique
function SommeHeureProblemeTechnique(obj){
  var somme = 0;
  somme = parseInt(obj.probleme_internet.toString())+parseInt(obj.probleme_machine.toString());
  return somme;
}
