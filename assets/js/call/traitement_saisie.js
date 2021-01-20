// AFFICHAGE TABLEAU SAISIE
function afficherTableauSaisie(data)
{
  dataSaisieGlobal = data;
  //  console.log(data);
  var html ="<div class='col-md-12 col-sm-12 col-xs-12'>"+
    "          <div class='x_panel'>"+
    "            <div class='x_title'>"+
    "            <h2>TRAITEMENT SAISIE CALL</h2>"+
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
    "       " +
    "   <div id='tableFiltre'>" +
    "<h2></h2>"+
    "          <table  id='datatable-remonte-buttons' class='table table-striped table-bordered'>" +
    "          <thead>" +
    "          <tr class=''>" +
    "           <th id='Date' class='th text-center'>DATE</th>" +
    "           <th id='Pole' class='th text-center'>POLE</th>" +
    "           <th id='Sphere' class='th text-center'>Sphere</th>" +
    "           <th id='TC' class='text-center'>TC</th>" +
    "           <th id='NUO' class='text-center'>	NUO</th>" +
    "           <th id='Numero FINESS' class='text-center'>	Numero FINESS</th>" +
    "           <th id='Numero Facture' class='text-center'>	Numero Facture</th>" +
    "           <th id='Numero PEC' class='text-center'>	Numero PEC</th>" +
    "           <th id='NNI' class='text-center'> NNI</th>" +
    "           <th id='Date_naiss' class='text-center'> Date de naissance</th>" +
    "           <th id='Numero PEC' class='text-center'> SAT</th>" +
    "           <th id='ETAT' class='text-center'>ETAT</th>" +
    "           <th id='boutton' class=''></th>" +
    "          </tr>" +
    "          </thead>" +
    "          <tbody>" +
    "";
  // Boucle Donnee Remonte
  for(var i=0,maxlength=data.length;i<maxlength;i++)
  {
    let arrayValueDemande = data[i].value_demande.split("$separator$");
    let Sphere = arrayValueDemande[0];
    let NUO = arrayValueDemande[1];
    let Date_Naisse = arrayValueDemande[2];
    let SAT = arrayValueDemande[3];
    let Commentaire = arrayValueDemande[4];
    let NomPS = arrayValueDemande[5];
    let NumTel = arrayValueDemande[6];
    let nature_erreur = "";
    if(arrayValueDemande.length === 8)
      nature_erreur = arrayValueDemande[7];

    let date_insert_string = data[i].date_insert;
    if(date_insert_string.length === 9)
    {
      date_insert_string = "0"+date_insert_string;
    }
    let html_bouttonTraite = "<td></td>";
    let stringValueEtatNouveau = "";
    if(data[i].libelle_etat)
    {
      stringValueEtatNouveau = data[i].libelle_etat;
    }
    else
    {
      stringValueEtatNouveau = "Non Traité";
    }
    // Verification Action EN COURS APPEL
    if(data[i].id_action)
    {
      if(data[i].id_action.toString() === '1' || data[i].id_action.toString() === '2')
      {
        stringValueEtatNouveau = data[i].libelle_etat +" ("+data[i].libelle_action+")";
      }
    }
    // BLOCKER BOUTTON TRAITEMENT SI UTILISATEUR
    if(data[i].id_etat_demande) {
      /*if (data[i].id_etat_demande.toString() !== '6' && data[i].id_etat_demande.toString() != '3') {*/
      html_bouttonTraite = "<td><button class='btn btn-info' onclick='launchModalTraitementSaisie(" + i + ")'>Details</button></td>";
      /*                        }*/
    }
    else
    {
      html_bouttonTraite = "<td><button class='btn btn-info' onclick='launchModalTraitementSaisie(" + i + ")'>Details</button></td>";
    }
    html+="<tr>" +
      "   <td>"+date_insert_string+"</td>" +
      "   <td>"+data[i].specialite+"</td>" +
      "   <td>"+Sphere+"</td>" +
      "   <td>"+nullsetEmpty(data[i].prenom_fr)+"</td>" +
      "   <td>"+NUO+"</td>" +
      "   <td>"+data[i].ps+"</td>" +
      "   <td>"+data[i].num_facture+"</td>" +
      "   <td>"+data[i].num_pec+"</td>" +
      "   <td>"+data[i].nni+"</td>" +
      "   <td>"+Date_Naisse+"</td>" +
      "   <td>"+SAT+"</td>" +
      "   <td>"+stringValueEtatNouveau+"</td>" +
      "  "+html_bouttonTraite+" " +
      "</tr>";
  }
  html += "</tbody></table></div></div></div>";
  $("#div").append(html);
}

// FONCTION Lancement TRAITEMENT SAISIE
function launchModalTraitementSaisie(indexGlobal)
{
  var objSaisieSelected = dataSaisieGlobal[indexGlobal];
  //alert("ouverture saisie ok");
  console.log(objSaisieSelected);
  canModif = true;
  valeurHistoriqueSaisieGlobal = {};
  valeurSaisieGlobal = {};
  $.ajax({
    type: "POST",
    url: "/call/ticketing/saisie/init-traitement-saisie",
    data: objSaisieSelected,
    beforeSend: function (xhr) {
    },
    success: function (msg) {
      //$("#loadC").hide();
      var data = msg;
      fullDataSaisieGlobal = data;
      console.log("rtour init");
      // JUSTE AFFICHAGE INFORMATION (PAS DE MODIFICATION POSSIBLE)
      if(fullDataSaisieGlobal.status === 'nouveau_vue_tc')
      {
        canModif = false;
        //alert("Test Droit Op");
        showModalSaisie(data);
      }
      else if(fullDataSaisieGlobal.status === 'ec')
      {
        alert("Déja en cours de traitement par une autre personne");
        return;
      }
      else if(fullDataSaisieGlobal.status === 'ok' )
      {
        //alert("Nouveau OK");
        showModalSaisie(data);
      }
      else if(fullDataSaisieGlobal.status === 'ec_me')
      {
        alert("Vous avez encore un traitement remontée non terminé");
        showModalSaisie(data);
      }

      console.log(data);

    },
    error: function (error) {
      alert("Echec Initialisation Donnee Remonter!")
      //alert(JSON.stringify(error));
    }
  });
}

// Afficher Modal Traitement Remontée
function showModalSaisie(dataRemonte) {

  // Initialisation Traitement Remonte
  // Assignation Donnee SAISIE
  valeurHistoriqueSaisieGlobal = dataRemonte.dataHistoriqueSaisie;
  valeurSaisieGlobal = dataRemonte.dataTicket;
  let arrayValueDemande = valeurSaisieGlobal.value_demande.split("$separator$");
  let Sphere = arrayValueDemande[0];
  let NUO = arrayValueDemande[1];
  let Date_Naisse = arrayValueDemande[2];
  let SAT = arrayValueDemande[3];
  let Commentaire = arrayValueDemande[4];
  let NomPS = arrayValueDemande[5];
  let NumTel = arrayValueDemande[6];
  let nature_erreur = "";
  if(arrayValueDemande.length === 8)
    nature_erreur = arrayValueDemande[7];
  //console.log(valeurHistorique);
  $("#modal_saisie_tc").val(dataRemonte.dataTicket.prenom_fr);
  $("#modal_saisie_specialite").val(dataRemonte.dataTicket.specialite);
  $("#modal_saisie_finess").val(dataRemonte.dataTicket.ps);
  $("#modal_saisie_nuo").val(NUO);
  $("#modal_saisie_num_fac").val(dataRemonte.dataTicket.num_facture);
  $("#modal_saisie_num_pec").val(dataRemonte.dataTicket.num_pec);
  $("#modal_saisie_nni").val(dataRemonte.dataTicket.nni);
  $("#modal_saisie_date_nais").val(Date_Naisse);
  $("#modal_saisie_commentaire").val(Commentaire);
  $("#liste_traitement_saisie_modal").html("");
  //if(dataListeEtatAutoriserGlobal === "")
  //{
    // Assignation Option Traitement N2 Call
  $("#boutton_valider_traitement_modaltraitesaisie").hide();
  // Assigner Tableau Historique Remonte Call
  if(dataRemonte.dataHistoriqueSaisie.length > 0)
  {
    ShowTableauHistoriqueSaisie(dataRemonte.dataHistoriqueSaisie);
  }
  if(!canModif)
  {
    $("#boutton_annuler_traitement_modaltraitesaisie").hide();
  }
  else
  {
    AssignerListeValeurEtatDemandeSaisieUserN2Call();
  }
  //}
  // Affichage Nature Erreur Pour N2 Call
  $("#modal_saisie_nature_erreur").val('');
  $("#show_nature_erreur").hide();
  if(dataIdNiveauGlobal === 8 || dataIdNiveauGlobal === 5)
  {
    $("#show_nature_erreur").show();
    $("#modal_saisie_nature_erreur").val(nature_erreur);
  }
  // Affichage Modal Info Et Traitement
  $("#div_traitement_suite_saisie").hide();
  $("#myModalTraiteSaisie").modal('show');
}

// Fonction Affichage Traitement Suite
function ModifierTraitementModalSaisie(valeur_TraitementSaisie) {
  if(valeur_TraitementSaisie.toString() === '')
  {
    return;
  }
  if(valeur_TraitementSaisie.toString() === '6')
  {
    $("#div_form_saisie_traitement").show();
  }
  else
  {
    $("#div_form_saisie_traitement").hide();
  }
  $("#modal_saisie_commentaire_action").val("");
  $("#div_traitement_suite_saisie").show();
  $("#boutton_valider_traitement_modaltraitesaisie").show();
}

// Fonction pour modifier etat demande user N2 Call
function AssignerListeValeurEtatDemandeSaisieUserN2Call()
{
  var arrayIntListeAutoriser = dataListeEtatAutoriserGlobal.split(',');
  console.log("Array");
  console.log(arrayIntListeAutoriser);
  var html = "";
  html += "<option value=''></option>";
  for(let i = 0; i<etatDenandeSaisieGlobal.length; i++)
  {
    if(arrayIntListeAutoriser.includes(etatDenandeSaisieGlobal[i].id.toString()))
    {
      html += "<option value='"+etatDenandeSaisieGlobal[i].id+"'>"+etatDenandeSaisieGlobal[i].libelle+"</option>";
    }
  }
  $("#liste_traitement_saisie_modal").html(html);
}

// Fonction pour enregistrer les Modifications Par Historique
function ValiderTraitementSaisie()
{
  // Recuperation des Informations d'origine
  let separator = "$separator$";
  let arrayValueDemande = fullDataSaisieGlobal.dataTicket.value_demande.split(separator);
  let Sphere = arrayValueDemande[0];
  let SAT = arrayValueDemande[3];
  let NomPS = arrayValueDemande[5];
  let NumTel = arrayValueDemande[6];
  let nature_erreur = "";
  if(arrayValueDemande.length === 8)
    nature_erreur = arrayValueDemande[7];
  // declaration variable Validation Traitement
  var action = "";
  var etat_traitement = $("#liste_traitement_saisie_modal").val();
  var commentaire = $("#modal_saisie_commentaire_action").val();
  // declaration variable
  var specialite = $("#modal_saisie_specialite").val();
  var ps = $("#modal_saisie_finess").val();
  var nuo = $("#modal_saisie_nuo").val();
  var num_facture = $("#modal_saisie_num_fac").val();
  var num_pec = $("#modal_saisie_num_pec").val();
  var nni = $("#modal_saisie_nni").val();
  var date_naiss = $("#modal_saisie_date_nais").val();
  var commentaire_saisie = $("#modal_saisie_commentaire").val();
  if(dataIdNiveauGlobal === 8 || dataIdNiveauGlobal === 5)
  {
    nature_erreur = $("#modal_saisie_nature_erreur").val();
    if(nature_erreur === '')
    {
      alert("Nature erreur est obligatoire");
      return;
    }
  }
  var nouveau_value_demande = Sphere+separator+
    nuo+separator+
    date_naiss+separator+
    SAT+separator+
    commentaire_saisie+separator+
    NomPS+separator+
    NumTel+""+separator+""+nature_erreur;
  var objetModification = {
    specialite: specialite,
    ps: ps,
    num_facture: num_facture,
    num_pec: num_pec,
    nni: nni,
    value_demande: nouveau_value_demande,
  };
  // Verification donnee ObjetModification;
  if(isNaN(parseInt(objetModification.ps.toString())) && objetModification.ps!="")
  {
    alert("Veuillez entrer un N° Finess valide!");
    return;
  }
  if(isNaN(parseInt(objetModification.num_facture.toString())) && objetModification.num_facture!="")
  {
    alert("Veuillez entrer un N° facture valide!");
    return;
  }
  if(isNaN(parseInt(objetModification.num_pec.toString())) && objetModification.num_pec!="")
  {
    alert("Veuillez entrer un N° pec valide!");
    return;
  }
  if(isNaN(parseInt(objetModification.nni.toString())) && objetModification.nni!="")
  {
    alert("Veuillez entrer un NNI valide!");
    return;
  }
  if(objetModification.nni.toString().length !== 13)
  {
    alert("Veuillez entrer un NNI valide!");
    return;
  }
  if(objetModification.ps.toString().length > 9)
  {
    alert("Veuillez entrer un N° Finess valide!");
    return;
  }
  var objetAncienneValeur = {
    specialite: fullDataSaisieGlobal.dataTicket.specialite,
    ps: fullDataSaisieGlobal.dataTicket.ps,
    num_facture: fullDataSaisieGlobal.dataTicket.num_facture,
    num_pec: fullDataSaisieGlobal.dataTicket.num_pec,
    nni: fullDataSaisieGlobal.dataTicket.nni,
    value_demande: fullDataSaisieGlobal.dataTicket.value_demande,
  };
  // Verification action
  if(etat_traitement.toString() !== "6")
  {
    action = "3";
  }
  else
  {
    action = $("#action_saisie_modal").val();
    console.log("Action --> "+action);
    if(action.toString() === "")
    {
      alert("Veuillez selectionner l'action svp");
      return;
    }
  }
  var jsonValidation = {
    id_etat: etat_traitement,
    id_action: action,
    pertinence: 0,
    id_historique: fullDataSaisieGlobal.dataHistorique.id,
    id_ticket: fullDataSaisieGlobal.dataTicket.id_ticket,
    objet_ticket_modif: objetModification,
    objet_ticket_ancienne_valeur: objetAncienneValeur,
    commentaire: commentaire.replace(/'/g,"''"),
  };
  // Verification Obligation Validation traitement
  if(etat_traitement.toString() === "")
  {
    alert("Merci de selectionner le traitement svp!");
    return;
  }
  // Verif N2 Call Traité
  if(etat_traitement.toString() === '6')
  {
    if(commentaire === '' || action === '')
    {
      alert("Obligatoire");
      return;
    }
  }
  else if(etat_traitement.toString() === '7')
  {
    // pas de regle
  }
  else
  {
    if(commentaire === '')
    {
      alert("Le commentaire est obligatoire , merci de le renseigner svp!");
      return;
    }
  }
  console.log(jsonValidation);
  $.ajax({
    type: "POST",
    url: "/call/ticketing/saisie/valider-traitement-saisie",
    data: jsonValidation,
    beforeSend: function (xhr) {
    },
    success: function (msg) {
      //$("#loadC").hide();
      alert("Traitement Remontée Valider");
      loadDataRemonter();
      $("#myModalTraiteSaisie").modal("hide");
    },
    error: function (error) {
      alert("Echec Initialisation Donnée Remontée!");
      //alert(JSON.stringify(error));
    }
  });
}

// Fonction pour annuler les Modifications Par Historique
function AnnulerTraitementSaisie()
{
// Debut Annulation
  let valeurEtatPrecedentAction;
  //alert(JSON.stringify(fullDataRemonteGlobal.dataHistorique));
  if(fullDataSaisieGlobal.dataHistorique.id_etat_precedent)
  {
    valeurEtatPrecedentAction = fullDataSaisieGlobal.dataHistorique.id_etat_precedent;
  }
  else
  {
    valeurEtatPrecedentAction = 2;
  }
  var jsonAnnlulation = {
    id_etat: valeurEtatPrecedentAction,
    id_action: 5,
    pertinence: 0,
    id_historique: fullDataSaisieGlobal.dataHistorique.id,
    id_ticket: fullDataSaisieGlobal.dataTicket.id_ticket,
    commentaire: 'traitement annuler',
  };
  console.log(jsonAnnlulation);
  $.ajax({
    type: "POST",
    // UTILISER LA MEME FONCTION POUR LA REMONTE
    url: "/call/ticketing/remonte/annuler-traitement-remonte",
    data: jsonAnnlulation,
    beforeSend: function (xhr) {
    },
    success: function (msg) {
      //$("#loadC").hide();
      alert("Traitement Remontée Annulée");
      loadDataRemonter();
    },
    error: function (error) {
      alert("Echec Initialisation Donnee Remontée!")
      //alert(JSON.stringify(error));
    }
  });
}

// Affichage Tableau Historique SAISIE
function ShowTableauHistoriqueSaisie(dataHistoriqueRemonte) {
  $("#HistoriqueDataSaisie").html("");
  var html ="          <table  id='datatable-remonte-buttons' class='table table-striped table-bordered'>" +
    "          <thead>" +
    "          <tr class=''>" +
    "           <th id='date_action' class='th text-center'>Date action</th>" +
    /*            "           <th id='h_deb' class='text-center'>Heure debut</th>" +
                "           <th id='h_fin' class='text-center'>Heure fin</th>" +*/
    "           <th id='id_pers' class='text-center'>Matricule</th>" +
    /*            "           <th id='pertinence' class='text-center'>Pertinence</th>" +*/
    "           <th id='etat' class='text-center'>Etat</th>" +
    "           <th id='action' class='text-center'>Action</th>" +
    "           <th id='commentaire' class='text-center'>Commentaire</th>" +
    "          </tr>" +
    "          </thead>" +
    "          <tbody>" +
    "";
  // Boucle Donnee Remonte
  for(var i=0,maxlength=dataHistoriqueRemonte.length;i<maxlength;i++)
  {
    html+="<tr>" +
      "   <td>"+dataHistoriqueRemonte[i].date_action+"</td>" +
      /*                "   <td>"+dataHistoriqueRemonte[i].h_deb+"</td>" +
                      "   <td>"+dataHistoriqueRemonte[i].h_fin+"</td>" +*/
      "   <td>"+dataHistoriqueRemonte[i].id_pers+"</td>" +
      /*                "   <td>"+pertinence_valuetemp+"</td>" +*/
      "   <td>"+dataHistoriqueRemonte[i].libelle_etat+"</td>" +
      "   <td>"+dataHistoriqueRemonte[i].libelle_action+"</td>" +
      "   <td>"+dataHistoriqueRemonte[i].commentaire+"</td>" +
      "</tr>";
  }
  html += "</tbody></table>";
  $("#HistoriqueDataSaisie").append(html);
}

