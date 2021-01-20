function getval(sel) {
   //alert(sel.value);
   getLstEtape(sel.value);
   getLsApplication(sel.value);
   getLsApplicationTab(sel.value);
   getLsTestTab(sel.value);
   //getStat(sel.value);
   getLsTestTabAttente(sel.value);
}

function onLoadDossierApp(){
	getLsDossier();
	getLsApplicationTab("a");
}

function onLoadDossierTest(){
	getLsDossier();
	//getLsTestTab("a");
}

function onLoadDossierStat(){
	getLsDossier();
	//getStat("a");
//	getLsTestTabAttente("a");
}

function onDossierStat(){
	var e = document.getElementById("dossierDash");
	var strDossier = e.options[e.selectedIndex].value;
	//var datdeb = document.getElementById('datdeb').value;
	//var datfin = document.getElementById('datfin').value;
	getGrapheDossier(strDossier);
}

function getGrapheDossier(idDossier/*,datdeb,datfin*/)
{
	$.ajax({
	type: "GET",
	url: "/getGrapheDossier?idDossier="+idDossier/*+"&datedeb="+datdeb+"&datefin="+datfin*/,
	success: function(msg){
		$("#ajaxDossier").html(msg);
	},
	 error: function (error) {
		  //alert('error; ' +error);
	  }
	});
}

function getLsDossier()
{
  $.ajax({
	type: "GET",
	url: "/getLsDossier",
	success: function(msg){
	  $("#dossierDash").html(msg);
	},
	error: function (error) {
	  //alert('error; ' +error);
	}
  });
}

function getStockAlmerys()
{
  $.ajax({
    type: "GET",
    url: "/ajax_stock_almerys",
    success: function(msg){
      $("#table_volume").html(msg);
    },
    error: function (error) {
      //alert('error; ' +error);
    }
  });
}

function getCadenceAlmerys()
{
  $.ajax({
    type: "GET",
    url: "/ajax_cadence_almerys",
    success: function(msg){
      $("#table_volume").html(msg);
    },
    error: function (error) {
      //alert('error; ' +error);
    }
  });


}


function getAllHmAlmerys()
{
  $.ajax({
    type: "GET",
    url: "/hm_almerys",
    success: function(msg){
      $("#table_hmorte").html(msg);
    },
    error: function (error) {
      //alert('error; ' +error);
    }
  });


}
function getQualiteAlmerys() {
  $.ajax({
    type: "GET",
    url: "/ajax_qualite_almerys",
    success: function (msg) {
      $("#table_volume").html(msg);
    },
    error: function (error) {
      //alert('error; ' +error);
    }
  });
}

function getHMortlmerys() {
  $.ajax({
    type: "GET",
    url: "/ajax_hm_almerys",
    success: function (msg) {
      $("#typeHM").html(msg);
    },
    error: function (error) {
      //alert('error; ' +error);
    }
  });
}
function getLsDepartement()
{
  $.ajax({
    type: "GET",
    url: "/getLsDepartement",
    success: function(msg){
      $("#departDashAdmin").html(msg);
    },
    error: function (error) {
      //alert('error; ' +error);
    }
  });
}

function getLsSpecialite()
{
  $.ajax({
    type: "GET",
    url: "/getLsSpecialite",
    success: function(msg){
      $("#specDashAdmin").html(msg);
    },
    error: function (error) {
      //alert('error; ' +error);
    }
  });
}


function getLsGroupe()
{
  $.ajax({
    type: "GET",
    url: "/getLsGroupe",
    success: function(msg){
      $("#departGroupeDashAdmin").html(msg);
    },
    error: function (error) {
      //alert('error; ' +error);
    }
  });
}


function getLsDepartementGroupe(id)
{
  $.ajax({
    type: "GET",
    url: "/getLsGroupeDep?groupe="+id,
    success: function(msg){
      $("#departDashAdmin").html(msg);
    },
    error: function (error) {
      //alert('error; ' +error);
    }
  });
}

function getLsDossierAdmin()
{
  $.ajax({
    type: "GET",
    url: "/getLsDossierAdmin",
    success: function(msg){
      $("#dossierDashAdmin").html(msg);
    },
    error: function (error) {
      //alert('error; ' +error);
    }
  });
}

function getLsApplication(idDossier)
{
  $.ajax({
	type: "GET",
	url: "/getLsApplication?idDossier="+idDossier,
	success: function(msg){
	  $("#applicationDash").html(msg);
	  $("#application").html(msg);
	},
	error: function (error) {
	  //alert('error; ' +error);
	}
  });
}

function getLsApplicationTab(idDossier)
{
  $.ajax({
	type: "GET",
	url: "/getLsApplicationTab?idDossier="+idDossier,
	success: function(msg){
	  $("#applicationList").html(msg);
	},
	error: function (error) {
	  alert('error; ' +error);
	}
  });
}

function getLsTestTab(idDossier)
{
  $.ajax({
	type: "GET",
	url: "/getLsTestTab?idDossier="+idDossier,
	success: function(msg){
	  $("#testList").html(msg);
	},
	error: function (error) {
	  alert('error; ' +error);
	}
  });
}

function getStat(idDossier)
{
  $.ajax({
	type: "GET",
	url: "/getStat?idDossier="+idDossier,
	success: function(msg){
	  $("#stat").html(msg);
	},
	error: function (error) {
	  alert('error; ' +error);
	}
  });
}

function getLsTestTabAttente(idDossier)
{
  $.ajax({
	type: "GET",
	url: "/getLsTestTabAttente?idDossier="+idDossier,
	success: function(msg){
	  $("#testListAttente").html(msg);
	},
	error: function (error) {
	  alert('error; ' +error);
	}
  });
}
