<!DOCTYPE html>

<html lang="en">
<head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <meta charset="utf-8">
  <meta name="generator" content="Bootply" />
  <link rel="stylesheet" href="/styles/importer.css">
  <link rel="stylesheet" href="/bootflat/css/bootflat.min.css">
  <link rel="stylesheet" href="/font-awesome/css/font-awesome.min.css">
  <link rel="stylesheet" href="/css/local.css">
  <link rel="stylesheet" href="/css/Style_v3.css">

  <link rel="stylesheet" href="/jquery-ui/jquery-ui.css">

  <link rel="stylesheet" href="/css/bootstrap-duration-picker.css">

  <!-- bootbox code -->
  <script src="js/bootbox.min.js"></script>

  <!-- check select -->
  <link rel="stylesheet" href="/css/bootstrap-multiselect.css">

  <style type="text/css">
    .notation_almerys{
    }
    .colorTable{
      background-color:red;
    }
    input[type=radio] {
      display: block;
      margin: 0 auto;
    }
    label {
      display: inline-block;
    }
  </style>
  <title>Ecoute Masque</title>
</head>
<body onload="loadAll();">
<!-- HEADER -->
<%
var mapPonderation = {};
if(req.session.droit==1){

%>
<% include ../../includes/entete.ejs %>
<% }else{

%>
<% include ../../includes/enteteOperateur.ejs %>

<% }%>
<!-- /HEADER -->

<!-- Main -->
<div id="page-wrapper">
  <div class="row">

    <!--div de selection --->

    <!--Form group de selection-->

    <div class="">
      <div class="form-group col-md-2">
        <label for="tc_select">TC</label>
        <select class="form-control" id="tc_select" onchange="load_profile(this.value);">
          <option value="">-</option>
        </select>
      </div>
      <div class="form-group col-md-2">
        <label for="motif_appel_select">Numero enregistrement</label>
        <!--<input type="number" min="0" class="form-control" id="numero_enregistrement_input" name="numero_enregistrement_input" value ="0" required></input>-->
		<input type="text" min="0" class="form-control" id="numero_enregistrement_input" name="numero_enregistrement_input" value ="0" required></input>
      </div>
	  <div class="form-group col-md-2">
        <label for="motif_appel_select">Date enregistrement</label>
        <input type="text" class="form-control" id="date_enregistrement" name="date_enregistrement"></input>
		<!--<input class="form-control" type="date" id="datedeb" name="datedeb" placeholder = "Date" value="/>-->
      </div>

	  <div class="form-group col-md-2">
		<label for="duration">Durée appel</label>
		<!--<input class="form-control" id="duration" type="text" name="duration" onchange="setDuree(this.value);"/></input>-->
		<input class="form-control" id="duration1" type="text" name="duration1" placeholder="00:00:00" onchange="validerDuree(this);" required ></input>

		<!--<div class="dureeAppel"></div>
		<div style="clear:both;"></div>-->
	  </div>

      <div class="form-group col-md-2">
        <label for="motif_appel_select">Motif appel</label>
        <select class="form-control" id="motif_appel_select" multiple="multiple" onclick="controle_numero_enregistrement()" onchange="load_notation()" > <!--  -->
          <option value="1">-</option>
        </select>
        <input type="text" class="form-control hidden" id="input_motif" name="input_motif" placeholder="Nouveau motif..." oninput="load_input_motif()"></input>
      </div>

	  <div class="form-group col-md-1">
        <label for="motif_appel_select">Spécialité</label>
        <select class="form-control" id="specialite_select" onclick="controle_numero_enregistrement()" onchange="load_specialite()"> <!--  -->
          <option value="1">-</option>
        </select>
      </div>

	  <div class="form-group col-md-1">
        <label for="motif_appel_select">Mode</label>
        <select class="form-control" id="mode_select" onclick="controle_numero_enregistrement()" onchange="load_specialite()"> <!--  -->
          <option value="">-</option>
        </select>
      </div>

	<!--<div class="container">
		<strong>Select Language:</strong>
		<select id="multiple-checkboxes" multiple="multiple">
			<option value="php">PHP</option>
			<option value="javascript">JavaScript</option>
			<option value="java">Java</option>
			<option value="sql">SQL</option>
			<option value="jquery">Jquery</option>
			<option value=".net">.Net</option>
		</select>
	</div>-->

      <!--Fin du form group de selection-->
    </div>
    <!--fin div de selection --->

    <!-- Div pour afficher le profile du TC -->
    <div class="col-md-12 col-sm-12 col-xs-12 hidden" id="panel_info">
      <div class="x_panel">
        <div class="x_title">
          <h2 id="td_pseudo"></h2>
          <ul class="nav navbar-right panel_toolbox">
            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
            </li>

            <!--<li><a class="close-link"><i class="fa fa-close"></i></a>
            </li>-->
          </ul>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">

          <div class="col-md-2">
            <img src="" class="img-circle" style="width:150px;height:150px;" alt="User Image" id="pdp">
          </div>
          <!--Form group de colone principale-->
          <div class="col-md-5">
            <div  class="gray"></div>
            <div class="gray"><span id="td_nom"></span> <span id="td_prenom"></span></div>
            <div  class="gray"><b><u>SAT</u>:</b> <span id="td_sat"></span></div>
            <div  class="gray"><b><u>Niveau</u>:</b> <span id="td_niveau"></span></div>
            <div  class="gray"><b><u>Vague</u>:</b> <span id="td_vague"></span></div>
            <div  class="gray"><b><u>Numero tel</u>:</b> <span id="td_numtel"></span></div>
            <div  class="gray"><b><u>Matricule</u>:</b> <span id="td_matricule"></span></div>
          </div>
          <!--Fin du form group de colone principale-->

        </div>
      </div>
    </div>

    <!-- DIV pour afficher la table NOTATION    <div class="notation_almerys hidden" id="notation_almerys"> -->
    <div class="col-md-12 col-sm-12 col-xs-12 hidden" id="notation_almerys">
      <div class="x_panel">
        <div class="x_title">
			<div class="col-md-2 col-lg-2 col-xs-12">
				<h2>Notation</h2>
			</div>
			<div class="col-md-1 col-lg-1 col-xs-12 pull-left">
				<input type='text' id='total_note' name='total_note' class='form-control' value='' disabled>
			</div>
			<div class="col-md-1 col-lg-1 col-xs-12 pull-left" style="margin-top:9px;font-size:18px;">
				<label id="hours" >00</label>:<label id="minutes">00</label>:<label id="seconds">00</label>
			</div>
			<div class="col-md-9 col-lg-8 col-xs-12">
				<ul class="nav navbar-right panel_toolbox">
					<li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
					</li>
				</ul>
			</div>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <div class="panel-group" id="accordion">
            <!-- FORM -->
            </br>

            <div class="row fixed">
                <div class="col-md-5 col-lg-5 col-xs-12">  </div>
                <div class="col-md-1 col-lg-1 col-xs-12 center">
                  <i class="fa fa-ban red" aria-hidden="true"> NA</i>
                </div>
                <div class="col-md-1 col-lg-1 col-xs-12 center">
                  <i class="fa fa-thumbs-o-up " aria-hidden="true"> MAITRISÉ</i>
                </div>
                <div class="col-md-2 col-lg-2 col-xs-12 center">
                  <i class="fa fa-thumbs-down" aria-hidden="true"> NON MAITRISÉ</i>
                </div>
                <div class="col-md-3 col-lg-3 col-xs-12">
                  <i class="fa fa-commenting-o" aria-hidden="true"></i>
                  <label>COMMENTAIRES</label>
                </div>
            </div>

            <form method="POST" action="/enregistrerNotation" data-parsley-validate class="form-horizontal" id = "MyForm">
              <input type='text' id='id_tc_form' name='id_tc_form' class='form-control hidden' value="">
              <input type='text' id='id_motif_appel_form' name='id_motif_appel_form' class='form-control hidden' value="">
              <input type='text' id='id_specialite_form' name='id_specialite_form' class='form-control hidden' value="">
			  <input type='text' id='id_mode_form' name='id_mode_form' class='form-control hidden' value="">
              <input type='text' id='numero_enregistrement_form' name='numero_enregistrement_form' class='form-control hidden' value="">
              <input type='text' id='date_enregistrement_form' name='date_enregistrement_form' class='form-control hidden' value=""><br/>
              <input type='text' id='duree_enregistrement_form' name='duree_enregistrement_form' class='form-control hidden' value=""><br/>
              <input type='text' id='date_debut_form' name='date_debut_form' class='form-control hidden' value=""><br/>

			  <!-- //id='collapse"+notation.id_categorie_notation+"' class='panel-collapse collapse' -->

              <%

                  //boucle des detail notation
                  var lastID = 0;
                  var html = "";
                  var icon = [];

                  icon.push();
                  det_notation.forEach(function (notation) {
                    mapPonderation[notation.id_details_notation] = notation.ponderation;
                    if(lastID!=Number(notation.id_categorie_notation)){
                      if(lastID != 0){
                        html +="</div>" +
                        "</div>" +
                        "</div>";
                      }
                      lastID=Number(notation.id_categorie_notation);
                      html += "<div class='panel panel-default'>"+
                        "          <div class='title-flat title1'>"+
                        "              <h4 class='title1'>"+
                        "                 <a class='"+notation.icone+"' aria-hidden='true'   style='color:"+notation.couleur+"'> </a><a   style='color:"+notation.couleur+"' data-toggle='collapse' data-parent='#accordion' href='#collapse"+notation.id_categorie_notation+"'> "+notation.categorie+"</a>"+
                        "              </h4>"+
                        "          </div>"+
                        "          <div >"+      //id='collapse"+notation.id_categorie_notation+"' class='panel-collapse collapse'
                        "            <div class='panel-body'>";
                    }


                    if(Number(notation.id_details_notation)!=27){
                      html += "<div class='row'>"+
                      "          <div class='col-md-5 col-lg-5 col-xs-12'>"+notation.notation+"</div>"+
                      ""+
                      "          <div class='col-md-1 col-lg-1 col-xs-4'><input type='radio' name='"+notation.id_details_notation+"' id='"+notation.id_details_notation+"' value='0' required='required'></div>"+
                      "          <div class='col-md-1 col-lg-1 col-xs-4'><input type='radio' name='"+notation.id_details_notation+"' id='"+notation.id_details_notation+"' value='1' required='required'></div>"+
                      "          <div class='col-md-1 col-lg-1 col-xs-4'><input type='radio' name='"+notation.id_details_notation+"' id='"+notation.id_details_notation+"' value='2' required='required'></div>"+
                      "          <div class='col-md-4 col-lg-4 col-xs-12'><textarea class='form-control' rows='1' id='commentaire-"+notation.id_details_notation+"' name='commentaire-"+notation.id_details_notation+"' placeholder='Commentaire...'></textarea></div>"+
                      ""+
                          " </div>";
                    }
                    else{
                      html += "<div class='row'>"+
                        "          <div class='col-md-5 col-lg-5 col-xs-12'>"+notation.notation+"</div>"+
                        ""+
                        "          <div class='col-md-3 col-lg-3 col-xs-4'> <input type='number' step='any' min='0' max='10' class='form-control' id='"+notation.id_details_notation+"' name='"+notation.id_details_notation+"' placeholder=' ' required='required' /></div>"+
                       "          <div class='col-md-4 col-lg-4 col-xs-12'><textarea class='form-control' rows='1' id='commentaire-"+notation.id_details_notation+"' name='commentaire-"+notation.id_details_notation+"' placeholder='Commentaire...'></textarea></div>"+
                        ""+
                        " </div>";
                    }

                  });

				  html += "<br/><br/>"+
						"<div class='row'>"+
						  "          <div class='col-md-5 col-lg-5 col-xs-12'><label style='font-size:18px;'>Besoin de formation : </label></div>"+
						  ""+
						  "          <div class='col-md-1 col-lg-1 col-xs-4'>Français <input type='checkbox' name='Francais' id='Francais' value='Francais'></div>"+
						  "          <div class='col-md-1 col-lg-1 col-xs-4'>Métier <input type='checkbox' name='Metier' id='Metier' value='Metier'></div>"+
						  "          <div class='col-md-1 col-lg-1 col-xs-4'>Aucun <input type='checkbox' name='Aucun' id='Aucun' value='Aucun'></div>"+
						  "          <div class='col-md-4 col-lg-4 col-xs-12'><textarea class='form-control hidden' rows='1' id='commentaire_francais' name='commentaire_francais' placeholder='Commentaire Français...'></textarea></div>"+
						  ""+
                        " </div>"+
						"<div class='row'>"+
						  "          <div class='col-md-5 col-lg-5 col-xs-12'></div>"+
						  ""+
						  "          <div class='col-md-1 col-lg-1 col-xs-4' ></div>"+
						  "          <div class='col-md-1 col-lg-1 col-xs-4'></div>"+
						  "          <div class='col-md-1 col-lg-1 col-xs-4'></div>"+
						  "          <div class='col-md-4 col-lg-4 col-xs-12'><textarea class='form-control hidden' rows='1' id='commentaire_metier' name='commentaire_metier' placeholder='Commentaire Metier...'></textarea></div>"+
						  ""+
                        " </div>";

                  //console.log(mapPonderation);
                  html += "</div></div></div></div><div class='form-group'>"+
					"<div class='col-md-8'>"+
					"</div>"+
					"<div class='col-md-4'>"+
					  "<label style='font-size:18px;'>Note :</label>"+
					  "<input type='text' id='total_note_tc' name='total_note_tc' class='form-control' value='' disabled>"+
					"</div>"+
				"</div>"+

				"<!--<div class='form-group'>"+
					"<div class='col-md-8'>"+
					"</div>"+
					"<div class='col-md-2' style='padding-top:30px;'>"+
						"<label style='font-size:18px;' for='duration'>Durée</label>"+
						"<input class='form-control' id='duration' type='text' name='duration'/></input>"+
					"</div>"+
				"</div>-->"+

				"<div class='form-group hidden' id='notation_conforme'>"+
					"<div class='col-md-8'>"+
					"</div>"+
					"<div class='col-md-2 col-lg-2 col-xs-4' style='padding-top:30px;' ><label style='font-size:18px;' >Conforme : </label></div>"+
					"<div class='col-md-1 col-lg-1 col-xs-4' style='padding-top:30px;'><label><div class ='pull-left'><input type='radio' name='conformite' id='conformite_oui' value='1'  checked='checked'>Oui</label></div></div>"+
					"<div class='col-md-1 col-lg-1 col-xs-4' style='padding-top:30px;'><label><input type='radio' name='conformite' id='conformite_non' value='0'>Non</label></div>"+
				"</div>"+

				"<div class='form-group hidden' id='motif_non_conformite'>"+
					"<div class='form-group ' >"+
						"<div class='col-md-8'>"+
						"</div>"+
						"<div class='col-md-2 col-lg-1 col-xs-8' style='padding-top:30px;' ><label style='font-size:15px;color:green;' >Motif non-conformité: </label></div>"+
						"<div class='col-md-1 col-lg-3 col-xs-8' style='padding-top:30px;'><select class='form-control' name='id_motif_non_conformite' id='motif_non_conformite_select' onclick='controle_numero_enregistrement()' onchange='load_notation()'>"+
						  "<option value='0'>-</option>"+
						"</select></div>"+
					"</div>"+
					"<div class='form-group '>"+
						"<div class='col-md-8'>"+
						"</div>"+
						"<div class='col-md-2 col-lg-1 col-xs-8' style='padding-top:30px;' ><label style='font-size:15px;color:green;' >Commentaire: </label></div>"+
						"<div class='col-md-1 col-lg-3 col-xs-8' style='padding-top:30px;'><textarea class='form-control' rows='2' id='commentaire_motif_non_conformite' name='commentaire_motif_non_conformite' placeholder='Commentaire motif de non-conformité...'></textarea></div>"+
					"</div>"+
				"</div>"+


				"<div class='form-group' style='margin-left:150px'>"+
					"<div class='col-md-12' style='padding-top:20px;'>"+
					  "<button type='submit' class='btn btn-primary pull-right'>  Enregistrer  </button>"+
					"</div>"+
				"</div>";


               %>
              <%-html%>
            </form>
			<!--<button class="btn btn-primary pull-right" id ="testButton">  Test besoin formation  </button>-->
          </div>
        </div>
      </div>
    </div>
</div>
<!-- FIN DIV pour afficher la div NOTATION -->

</div>
</br>
</br>

</body>

<script src="/js/jquery-1.12.4.js"></script>
<!--<script src="/js/base.min.js"></script>-->
<script src="/js/project.min.js"></script>
<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/scripts.js"></script>

<script src="/js/vendors/echarts.min.js"></script>
<script src="/js/dependencies/sails.io.js"></script>
<script src="/js/jquery-ui.min.js"></script>
<script src="/js/echarts/theme.js"></script>
<script src="/js/echarts/echarts.js"></script>
<script src="/js/custom.min.js"></script><!--script customise-->
<script src="/js/bootstrap-duration-picker-debug.js"></script>

<script src="/js/bootstrap-multiselect.js"></script>

<!--<script type="text/javascript" src="/js/jquery.timesetter.js"></script>-->

<!--<script src="/js/bootstrap-duration-picker.js"></script>-->
<!--<h2>Demo 2:</h2>
<div class="div2"></div>
<div style="clear:both;"></div>-->

<!-- la superficie utilisé est 90% avec un resultat au nombre de 155 dans 4602 actes P999-10 traitement au hasard -->

<script type="text/javascript">
	//OPTION CHECK BOX
	$(document).ready(function() {
		$('#multiple-checkboxes').multiselect();
	});
	//FIN

	var hoursLabel = document.getElementById("hours");
	var minutesLabel = document.getElementById("minutes");
	var secondsLabel = document.getElementById("seconds");
	var totalSeconds = 0;
	//setInterval(setTime, 1000);

//Motif non conformité
	$("input[name='conformite']").change(function() {
		if($(this).attr('id')=="conformite_non"){
			$("#motif_non_conformite").removeClass("hidden");
		}else{
			$("#motif_non_conformite").addClass("hidden");
		}
	});

//FORMATION
	$(document).ready(function() {



		$('#Francais').change(function() {
			if(this.checked) {
				$("#commentaire_francais").removeClass("hidden");
			}
			if(!this.checked) {
				$("#commentaire_francais").addClass("hidden");
			}
		});
		$('#Metier').change(function() {
			if(this.checked) {
				$("#commentaire_metier").removeClass("hidden");
			}
			if(!this.checked) {
				$("#commentaire_metier").addClass("hidden");
			}
		});
		$('#Aucun').change(function() {
			if(this.checked) {
				$("#commentaire_francais").addClass("hidden");
				$("#commentaire_metier").addClass("hidden");
			}
		});
	});


	//get formation val
	/*$('#testButton').on('click', function (e) {
		var checkedValueF = $('#Francais:checked').val();
		var checkedValueM = $('#Metier:checked').val();
		var checkedValueA = $('#Aucun:checked').val();
		if (typeof checkedValueF == 'undefined'){
			checkedValueF = '';
		}
		if (typeof checkedValueM == 'undefined'){
			checkedValueM = '';
		}
		var res = checkedValueF +","+checkedValueM;
		alert(res);
	})*/

	function setTime()
	{
		++totalSeconds;
		secondsLabel.innerHTML = pad(totalSeconds%60);
		minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
		var totalMinutes = parseInt(totalSeconds/60);
		minutesLabel.innerHTML = pad(parseInt(totalMinutes%60));
		hoursLabel.innerHTML = pad(parseInt(totalMinutes/60));
	}

	function pad(val)
	{
		var valString = val + "";
		if(valString.length < 2)
		{
			return "0" + valString;
		}
		else
		{
			return valString;
		}
	}
</script>


<!-- Date enregistrement -->
<script type="text/javascript">
  var date = new Date();

  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  var today = day + "-" + month + "-" + year;
  //document.getElementById('date_enregistrement').value = today;
</script>

<script language="javascript">
	 function controle_numero_enregistrement(){
		if($("#numero_enregistrement_input").val() == ""){
			alert("Veuillez remplir le champ numero enregistrement!");
		}
	  }

	  $(function() {
		$( "#fin_input").datepicker({
		  dateFormat: 'yymmd'
		});
		$( "#date_enregistrement").datepicker({
		  dateFormat: 'yy-mm-dd'
		}).datepicker("setDate", new Date());
		$('#duration').durationPicker({
			lang: 'en',
			//showDays : false,
			showSeconds: true
		}); //DURATION                  <<========================
	  } );

  //alert("55");

  var noteTotal=0;
  var noteTotalPonderation = 0;
  var MapPonderation = <%-JSON.stringify(mapPonderation)%>;

  //alert(JSON.stringify(MapPonderation));

  $('input[type=radio]').on('change', function() {
    //alert($(this).attr('class') + "  " + $(this).val());

    noteTotal=0;
    noteTotalPonderation=0;
    // prendre la valeurs des radio checked
    //calculer note
    // note si maitrise
    // algo null (somme note sans les NA)
     /*
     total note = total ponderation
     et
     total note = total ponderation sans les NA
      */
    //calculer note a partir des ponderations

    $("input[type='radio']:checked").each(function(){
		if($(this).attr('id')!="conformite_non" && $(this).attr('id')!="conformite_oui"){   //CHANGED *******************************************************************************************
		  var ponderation = 0;
		  var noteValue = Number($(this).val());
		  if(noteValue == 1)
			noteTotal += MapPonderation[$(this).attr('id')];

		  if(noteValue != 0)
			noteTotalPonderation += MapPonderation[$(this).attr('id')];
		}
    });

    /*alert (noteTotal);
	if vide
    alert (noteTotalPonderation);*/

	if ($("#27").val() !== ""){
		//alert("non vide radio");
		var total_temp = 0;
		var noteTotalPonderation_temp = 0;
		total_temp = noteTotal + Number($("#27").val());
		noteTotalPonderation_temp = noteTotalPonderation + Number(MapPonderation[$("#27").attr('id')]);

		var moyenne = (total_temp * 20)/noteTotalPonderation_temp;

		$("#total_note_tc").val(""+Number(moyenne.toFixed(2))+" / 20");
		$("#total_note").val(""+Number(moyenne.toFixed(2))+" / 20");
		if(moyenne<15){
		  $("#notation_conforme").removeClass("hidden");
		}else{
		  $("#notation_conforme").addClass("hidden");
		}
	}
	else{
		//alert("vide radio");
		var moyenne = (noteTotal * 20)/noteTotalPonderation;
		$("#total_note_tc").val(""+Number(moyenne.toFixed(2))+" / 20");
		$("#total_note").val(""+Number(moyenne.toFixed(2))+" / 20");
		if(moyenne<15){
		  $("#notation_conforme").removeClass("hidden");
		}else{
		  $("#notation_conforme").addClass("hidden");
		}
	}
  });

	var total_temp = 0;
	var noteTotalPonderation_temp = 0;

	$("#27").keyup(function() {
		if ($("#27").val()!== ""){
			//alert("non vide keyup");
			total_temp = noteTotal + Number($("#27").val());
			noteTotalPonderation_temp = noteTotalPonderation + Number(MapPonderation[$("#27").attr('id')]);
			var moyenne = (total_temp * 20)/noteTotalPonderation_temp;

			$("#total_note_tc").val(""+Number(moyenne.toFixed(2))+" / 20");
			$("#total_note").val(""+Number(moyenne.toFixed(2))+" / 20");
			if(moyenne<15){
			  $("#notation_conforme").removeClass("hidden");
			}else{
			  $("#notation_conforme").addClass("hidden");
			}
		}else{
			//alert("vide keyup");
			var moyenne = (noteTotal * 20)/noteTotalPonderation;
			$("#total_note_tc").val(""+Number(moyenne.toFixed(2))+" / 20");
			$("#total_note").val(""+Number(moyenne.toFixed(2))+" / 20");
			if(moyenne<15){
			  $("#notation_conforme").removeClass("hidden");
			}else{
			  $("#notation_conforme").addClass("hidden");
			}
		}
	});


  /*
   * Fonction pour afficher la liste deroulante des TC et la liste des motifs appels
   * */
  function loadAll(){
    loadTC();
    loadMotifAppels();
	loadSpecialite();
	loadMode();
	loadMotifNonConformite();
  }

  /*
   * Fonction pour afficher la liste deroulante des TC
   * */
  function loadTC(){
    $.ajax({
      type: "GET",
      url: "/getLsTCdetails",

      success: function(msg){
        var html = "<option value=''></option>";
        var data = JSON.parse(msg);

        for (var i = 0 ; i<data.length ; i++){
          html += "<option value='"+data[i].matricule+"'>"+data[i].matricule+" - "+data[i].pseudo+" - "+data[i].appelation+"</option>";
        }
        $("#tc_select").html(html);
      },
      error: function (error) {

      }
    });
  }

  /*
   * Fonction pour afficher la liste deroulante des motifs appels
   * */
  function loadMotifAppels(){
    $.ajax({
      type: "GET",
      url: "/getLsMotifAppel",

      success: function(msg){
        var html = "";
        var data = JSON.parse(msg);

        for (var i = 0 ; i<data.length ; i++){
          html += "<option value='"+data[i].id_motif_appel+"'>"+data[i].libelle+"</option>";
        }
		//html += "<option value='0'><br>+ NOUVEAU MOTIF </br></option>";
		html += "<option value='0'><br>+ NOUVEAU MOTIF </br></option>";
		$("#motif_appel_select").html(html);
		$('#motif_appel_select').multiselect();

      },
      error: function (error) {
        alert("ERROR MOTIF APPEL");
      }
    });
  }

  /*
   * Fonction pour afficher la liste deroulante des motifs de non conformité
   * */
  function loadMotifNonConformite(){
    $.ajax({
      type: "GET",
      url: "/getLsMotifNonConformite",

      success: function(msg){
        var html = "<option value=''></option>";
        var data = JSON.parse(msg);

        for (var i = 0 ; i<data.length ; i++){
          html += "<option value='"+data[i].id_motif_non_conformite+"'>"+data[i].libelle+"</option>";
        }

        $("#motif_non_conformite_select").html(html);
      },
      error: function (error) {
        alert("ERROR MOTIF APPEL");
      }
    });
  }

    /*
   * Fonction pour afficher la liste deroulante des spécialités
   * */
  function loadSpecialite(){
    $.ajax({
      type: "GET",
      url: "/getLsSpecialiteMasque",

      success: function(msg){
        var html = "<option value=''></option>";
        var data = JSON.parse(msg);

        for (var i = 0 ; i<data.length ; i++){
          html += "<option value='"+data[i].id_specialite+"'>"+data[i].libelle+"</option>";
        }
        $("#specialite_select").html(html);
      },
      error: function (error) {
        alert("ERROR SPECIALITE");
      }
    });
  }

      /*
   * Fonction pour afficher la liste deroulante des modes écoutes
   * */
  function loadMode(){
    $.ajax({
      type: "GET",
      url: "/getLsModeMasque",

      success: function(msg){
        var html = "<option value=''></option>";
        var data = JSON.parse(msg);

        for (var i = 0 ; i<data.length ; i++){
          html += "<option value='"+data[i].id_mode+"'>"+data[i].libelle+"</option>";
        }
        $("#mode_select").html(html);
      },
      error: function (error) {
        alert("ERROR MODE ECOUTE");
      }
    });
  }

   /*
   * Fonction String to seconds (duration)
   * */
	function toSeconds(hms){
		//var hms = '00:04:33';   // your input string
		var a = hms.split(':'); // split it at the colons
		var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
		//alert(seconds);
	}

	function bootTest(){
		alert("Format invalide");
		bootbox.dialog({
		  message: "Format du durée d'appel invalide",
		  title: "Format invalide",
		  buttons: {
			main: {
			  label: "ok",
			  className: "btn-primary",
			  callback: function() {
				//$( "#duration1" ).val("invalide");;
			  }
			}
		  }
		});
	}

  /*
	valider format durée enregistrement
  */
  function validerDuree(inputField) {
        //var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(inputField.value);
        var isValid = /^(?:1[0-2]|0[0-9]):[0-5][0-9]:[0-5][0-9]$/.test(inputField.value);
        //var isValid = /^([0-2][0-3]):([0-5][0-9]):([0-5][0-9])$/.test(inputField.value);
        if (isValid) {
            //inputField.style.backgroundColor = '#bfa';
			//alert("valide");
        } else {
			alert("Format durée appel invalide");
			/*bootbox.dialog({
			  message: "Format du durée d'appel invalide",
			  title: "Format invalide",
			  buttons: {
				main: {
				  label: "ok",
				  className: "btn-primary",
				  callback: function() {
					//$( "#duration1" ).val("invalide");;
				  }
				}
			  }
			});*/
            //inputField.style.backgroundColor = '#fba';
        }
        return isValid;
    }


    /*
   * Fonction pour charger la table NOTATION
   * parametre
   * id_pers
   * */
  function load_notation() {
	 //setInterval(setTime, 1000);

    if($( "#motif_appel_select option:selected" ).val() == 0){
      $("#motif_appel_select").addClass("hidden");
      $("#input_motif").removeClass("hidden");
      //$("#notation_almerys").removeClass("hidden");

    }else{
      //$("#notation_almerys").removeClass("hidden");
      var id_tc = $( "#tc_select option:selected" ).val(); //id tc
      var id_motif_appel = $( "#motif_appel_select option:selected" ).val(); // id motif appel
      var numero_enregistrement = $( "#numero_enregistrement_input" ).val(); // numero enregistrement

	  var id_specialite = $( "#specialite_select option:selected" ).val(); // id specialite

	  var id_mode = $( "#mode_select option:selected" ).val(); // id mode

	  //Date enregistrement -------------------------------------------------
		var date = new Date();
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		if (month < 10) month = "0" + month;
		if (day < 10) day = "0" + day;
		var today = year + "-" + month + "-" + day;
		var date_enregistrement = ""; // numero enregistrement
		if($( "#date_enregistrement" ).val() == ""){
			date_enregistrement = today;
		}else{
			date_enregistrement = $( "#date_enregistrement" ).val(); // numero enregistrement
		}
		//var duration = $( "#duration" ).val();
		var hms = $( "#duration1" ).val();
		var a = hms.split(':');
		var duration = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
		//alert(duration);
	//Fin date enregistrement -------------------------------------------------


      $("#id_tc_form").val(id_tc);
      $("#numero_enregistrement_form").val(numero_enregistrement);
      $("#id_motif_appel_form").val(id_motif_appel);
	  $("#id_specialite_form").val(id_specialite);
	  $("#id_mode_form").val(id_mode);
	  $("#date_enregistrement_form").val(date_enregistrement);
	  $("#duree_enregistrement_form").val(duration);

	  //alert(new Date().getTime());
      var dtTemp = new Date();
	  $("#date_debut_form").val(dtTemp.getHours()+':'+dtTemp.getMinutes()+':'+dtTemp.getSeconds());
      //alert(dtTemp.getHours()+':'+dtTemp.getMinutes()+':'+dtTemp.getSeconds());
    }
  }


  function load_specialite() {
	  //$("#notation_almerys").removeClass("hidden");
	  var id_tc = $( "#tc_select option:selected" ).val(); //id tc
	  var id_motif_appel = $( "#motif_appel_select option:selected" ).val(); // id motif appel
	  var numero_enregistrement = $( "#numero_enregistrement_input" ).val(); // numero enregistrement

	  var id_specialite = $( "#specialite_select option:selected" ).val(); // id specialite

	  var id_mode = $( "#mode_select option:selected" ).val(); // id mode
		//alert(id_specialite);

	  //Date enregistrement -------------------------------------------------
		var date = new Date();
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		if (month < 10) month = "0" + month;
		if (day < 10) day = "0" + day;
		var today = year + "-" + month + "-" + day;
		var date_enregistrement = ""; // numero enregistrement
		if($( "#date_enregistrement" ).val() == ""){
			date_enregistrement = today;
		}else{
			date_enregistrement = $( "#date_enregistrement" ).val(); // numero enregistrement
		}
		//var duration = $( "#duration" ).val();
		var hms = $( "#duration1" ).val();
		var a = hms.split(':');
		var duration = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
		//alert(duration);
	//Fin date enregistrement -------------------------------------------------

	  $("#id_tc_form").val(id_tc);
	  $("#numero_enregistrement_form").val(numero_enregistrement);
	  $("#id_motif_appel_form").val(id_motif_appel);
	  $("#id_specialite_form").val(id_specialite);
	  $("#id_mode_form").val(id_mode);
	  $("#date_enregistrement_form").val(date_enregistrement);
	  $("#duree_enregistrement_form").val(duration);

	  //alert(new Date().getTime());
	  var dtTemp = new Date();
	  $("#date_debut_form").val(dtTemp.getHours()+':'+dtTemp.getMinutes()+':'+dtTemp.getSeconds());
	  //alert(dtTemp.getHours()+':'+dtTemp.getMinutes()+':'+dtTemp.getSeconds());
  }

  /*
   * Fonction pour charger les informations generale du TC
   * parametre
   * id_pers
   * */

  function load_profile(id_pers) {
    $.ajax({
      type: "GET",
      url: "/getProfile?id_pers="+id_pers,

      success: function(msg){
        var dataAll = JSON.parse(msg);
        var data = dataAll.pr;
        var ph = dataAll.ph;
        //alert(msg);
        $("#td_nom").html(""+data.nom);
        $("#td_prenom").html(""+data.prenom);
		$("#td_matricule").html(""+data.matricule);
        $("#td_pseudo").html(""+data.pseudo);
        $("#td_sat").html(""+data.sat);
        $("#td_vague").html(""+data.libelle);
        $("#td_niveau").html(""+data.niveau);
        $("#td_numtel").html(""+data.num_tel);
        $("#pdp").attr("src","data:image/png;base64, "+ph+"");
        $("#panel_info").removeClass("hidden");


		//$("#notation_almerys").removeClass("hidden");
		var id_tc = $( "#tc_select option:selected" ).val(); //id tc
		var id_motif_appel = $( "#motif_appel_select option:selected" ).val(); // id motif appel
		var numero_enregistrement = $( "#numero_enregistrement_input" ).val(); // numero enregistrement

		var id_specialite = $( "#specialite_select option:selected" ).val(); // id specialite

		var id_mode = $( "#mode_select option:selected" ).val(); // id mode


	//Date enregistrement -------------------------------------------------
		var date = new Date();
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		if (month < 10) month = "0" + month;
		if (day < 10) day = "0" + day;
		var today = year + "-" + month + "-" + day;
		var date_enregistrement = ""; // numero enregistrement
		if($( "#date_enregistrement" ).val() == ""){
			date_enregistrement = today;
		}else{
			date_enregistrement = $( "#date_enregistrement" ).val(); // numero enregistrement
		}
		//var duration = $( "#duration" ).val();
		var hms = $( "#duration1" ).val();
		var a = hms.split(':');
		var duration = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
		//alert(date_enregistrement);
	//Fin date enregistrement -------------------------------------------------


		$("#id_tc_form").val(id_tc);
		$("#numero_enregistrement_form").val(numero_enregistrement);
		$("#id_motif_appel_form").val(id_motif_appel);
		$("#id_specialite_form").val(id_specialite);
		$("#id_mode_form").val(id_mode);
		$("#date_enregistrement_form").val(date_enregistrement);
		$("#duree_enregistrement_form").val(duration);

		//load_notation();
		setInterval(setTime, 1000);
		$("#notation_almerys").removeClass("hidden");
      },
      error: function (error) {

      }
    });
  }


  function load_input_motif(){
    var id_tc = $( "#tc_select option:selected" ).val(); //id tc
    var id_motif_appel = $( "#input_motif" ).val(); // id motif appel   +++++++++++++++++++++++
    var numero_enregistrement = $( "#numero_enregistrement_input" ).val(); // numero enregistrement

	var id_specialite = $( "#specialite_select option:selected" ).val(); // id specialite

	var id_mode = $( "#mode_select option:selected" ).val(); // id mode


	//Date enregistrement -------------------------------------------------
		var date = new Date();
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		if (month < 10) month = "0" + month;
		if (day < 10) day = "0" + day;
		var today = year + "-" + month + "-" + day;
		var date_enregistrement = ""; // numero enregistrement
		if($( "#date_enregistrement" ).val() == ""){
			date_enregistrement = today;
		}else{
			date_enregistrement = $( "#date_enregistrement" ).val(); // numero enregistrement
		}
		//var duration = $( "#duration" ).val();
		var hms = $( "#duration1" ).val();
		var a = hms.split(':');
		var duration = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
		//alert(date_enregistrement);
	//Fin date enregistrement -------------------------------------------------


    $("#id_tc_form").val(id_tc);
    $("#numero_enregistrement_form").val(numero_enregistrement);
    $("#id_motif_appel_form").val(id_motif_appel);
	$("#id_specialite_form").val(id_specialite);
	$("#id_mode_form").val(id_mode);
    $("#date_enregistrement_form").val(date_enregistrement);
    var dtTemp = new Date();
    $("#date_debut_form").val(dtTemp.getHours()+':'+dtTemp.getMinutes()+':'+dtTemp.getSeconds());
	$("#duree_enregistrement_form").val(duration);
  }

  function setDuree(valDuree){
	//alert(val);
	$("#duree_enregistrement_form").val(valDuree);
  }

</script>
<script type="text/javascript" >
  $('.closeall').click(function(){
    $('.panel-collapse.in')
      .collapse('hide');
  });
  $('.openall').click(function(){
    $('.panel-collapse:not(".in")')
      .collapse('show');
  });
</script>
<!--fin script customise-->
</html>