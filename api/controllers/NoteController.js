/**
 * NoteController
 *
 * @description :: Server-side logic for managing notes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  verifierNumeroEnregistrement : function (req, res){
    var num = req.param('numero_enregistrement',null);
    var option = [];
    option.optionNum = num;
      async.series([
        function (callback) {
          Ecoute.verifierNumeroEnregistrement(option,callback);
        }
      ],function (err,result) {
        if (err) return res.send("Erreur de requete");
        return res.ok(JSON.stringify(result[0]));//retourne de la liste des TC sn JSON
      })
  },

  
  enregistrerNoteNA: function (req, res)
  {
    if (!req.session.user) return res.redirect('/login');
    
    //console.log("MOTIF APPEL ============================>   "+req.param('id_motif_appel_form',null));
    //console.log("*******************************  ID TC  "+req.param('id_tc_form',null));
    //console.log("*******************************  ID MOTIF APPEL  "+req.param('id_motif_appel_form',null));
    //console.log("*******************************  ID SPECIALITE  "+req.param('id_specialite_form',null));

    var id_tc = parseInt(req.param('id_tc_form',null));

    var numero_enregistrement = 1;
    if(req.param('numero_enregistrement_form',null)){
      numero_enregistrement = req.param('numero_enregistrement_form',null);
    }
    //console.log("Test numero ==================>" + numero_enregistrement);

    var id_motif_appel = 1;
    if(req.param('id_motif_appel_form',null)){
      id_motif_appel = req.param('id_motif_appel_form',null);
    }
    //console.log("Test id motif appel ==================>" + id_motif_appel);

    var id_specialite = 1;
    if(req.param('id_specialite_form',null)){
      id_specialite = req.param('id_specialite_form',null);
    }

    var id_campagne = 0;
    var is_as = false;

    if(req.param('campagne_form',null)){
      id_campagne = req.param('campagne_form',null);
      is_as = true;
    }
    //console.log("Test specialite ==================>" + id_specialite);

    var is_doctocare = false;
    if(req.param('is_doctocare_form',null)){
      is_as = false;
      is_doctocare = true;
    }

    var id_mode = 1;
    if(req.param('id_mode_form',null)){
      id_mode = req.param('id_mode_form',null);
    }
    //console.log("Test specialite ==================>" + id_mode);

    var date_enregistrement = req.param('date_enregistrement_form',null);

    var date_debut = req.param('date_debut_form',null);

    var francais_formation = req.param('francais_formation_form',null);
    var metier_formation = req.param('metier_formation_form',null);
    //FIN BESOIN DE FORMATION


    //console.log("*******************************  Numero enregistrement "+ numero_enregistrement);
    //console.log("*******************************  DATE enregistrement "+ date_enregistrement);

    //console.log("id_motif_appel ==========================> "+id_motif_appel);

    //New champs
    var id_type_ecoute = 0;
    var raisons = '';
    var id_appreciation = 0;
    var commentaire_appreciation_francais = '';
    var commentaire_appreciation_metier = '';
    var reprise_francais = req.param('reprise_francais_form',null);
    var reprise_metier = req.param('reprise_metier_form',null);

    if(req.param('id_type_ecoute_form',null)){
      id_type_ecoute = req.param('id_type_ecoute_form',null);
    }
    if(req.param('raison_form',null)){
      raisons = req.param('raison_form',null);
    }
    if(req.param('id_appreciation_form',null)){
      id_appreciation = req.param('id_appreciation_form',null);
    }
    if(req.param('commentaire_appreciation_francais_form',null)){
      commentaire_appreciation_francais = req.param('commentaire_appreciation_francais_form',null);
    }
    if(req.param('commentaire_appreciation_metier_form',null)){
      commentaire_appreciation_metier = req.param('commentaire_appreciation_metier_form',null);
    }
    if(req.param('reprise_francais_form',null)){
      reprise_francais = req.param('reprise_francais_form',null);
    }
    if(req.param('reprise_metier_form',null)){
      reprise_metier = req.param('reprise_metier_form',null);
    }
    //Fin new champs

    async.series([
          function(callback) {
            //console.log("==========================================> COMFORME = "+ req.param('conformite',null));
            var conformite = req.param('conformite2',null);
            

            var duree  = req.param('duree_enregistrement_form',null);    // =========================DUREE ECOUTE  duration
            //console.log("==========================================> DUREE = "+ req.param('duree_enregistrement_form',null));

            //console.log("==========================================> DEBUT ECOUTE = "+ date_debut);
            //console.log("==========================================> FIN ECOUTE = "+ Date.now());

            var deb = new Date();
            var dtSplit = date_debut.split(':');
            deb.setHours(Number(dtSplit[0]));
            deb.setMinutes(Number(dtSplit[1]));
            deb.setSeconds(Number(dtSplit[2]));
            var fin = new Date();

            Ecoute.create({date_enregistrement: (new Date(Date.parse(date_enregistrement)).toISOString()),id_motif:id_motif_appel, id_pers:id_tc, id_pers_ecoute: req.session.user, numero_enregistrement : numero_enregistrement, conforme : conformite, duree_appel : duree, deb_ecoute : deb.toISOString(), fin_ecoute : fin.toISOString(), id_specialite : id_specialite, id_mode : id_mode, francais_formation : francais_formation, metier_formation : metier_formation, id_type_ecoute : id_type_ecoute, raisons : raisons, id_appreciation : id_appreciation, commentaire_appreciation_francais : commentaire_appreciation_francais, commentaire_appreciation_metier : commentaire_appreciation_metier, reprise_francais : reprise_francais, reprise_metier : reprise_metier, id_campagne : id_campagne, is_as : is_as, is_doctocare : is_doctocare}).exec(function (err, ecouteCreated){
              if (err) { console.log(err);
                 }
              //console.log(' CREATION ECOUTE NA');
              //console.log(' 1 -  ID ecoute created', ecouteCreated.id_ecoute);
              return callback(null,ecouteCreated);
            });
          }

        ],function(callback, results){
          res.redirect('back');
        });
  },

  modifierNoteNA: function (req, res)
  {
    if (!req.session.user) return res.redirect('/login');
    //console.log("MOTIF APPEL ============================>   "+req.param('id_motif_appel_form',null));
    //console.log("*******************************  ID TC  "+req.param('id_tc_form',null));
    //console.log("*******************************  ID MOTIF APPEL  "+req.param('id_motif_appel_form',null));
    //console.log("*******************************  ID SPECIALITE  "+req.param('id_specialite_form',null));

    //get id ecoute
    var id_ecoute = req.param('id_ecoute',null);


    var id_tc = parseInt(req.param('id_tc_form',null));

    var numero_enregistrement = 1;
    if(req.param('numero_enregistrement_form',null)){
      numero_enregistrement = req.param('numero_enregistrement_form',null);
    }
    //console.log("Test numero ==================>" + numero_enregistrement);

    var id_motif_appel = 1;
    if(req.param('id_motif_appel_form',null)){
      id_motif_appel = req.param('id_motif_appel_form',null);
    }
    //console.log("Test id motif appel ==================>" + id_motif_appel);

    var id_specialite = 1;
    if(req.param('id_specialite_form',null)){
      id_specialite = req.param('id_specialite_form',null);
    }
    //console.log("Test specialite ==================>" + id_specialite);

    var id_mode = 1;
    if(req.param('id_mode_form',null)){
      id_mode = req.param('id_mode_form',null);
    }
    //console.log("Test specialite ==================>" + id_mode);

    var date_enregistrement = req.param('date_enregistrement_form',null);

    var date_debut = req.param('date_debut_form',null);

    var francais_formation = req.param('francais_formation_form',null);
    var metier_formation = req.param('metier_formation_form',null);
    //FIN BESOIN DE FORMATION


    //console.log("*******************************  Numero enregistrement "+ numero_enregistrement);
    //console.log("*******************************  DATE enregistrement "+ date_enregistrement);

    //console.log("id_motif_appel ==========================> "+id_motif_appel);

    //New champs
    var id_type_ecoute = 0;
    var raisons = '';
    var id_appreciation = 0;
    var commentaire_appreciation_francais = '';
    var commentaire_appreciation_metier = '';
    var reprise_francais = req.param('reprise_francais_form',null);
    var reprise_metier = req.param('reprise_metier_form',null);

    if(req.param('id_type_ecoute_form',null)){
      id_type_ecoute = req.param('id_type_ecoute_form',null);
    }
    if(req.param('raison_form',null)){
      raisons = req.param('raison_form',null);
    }
    if(req.param('id_appreciation_form',null)){
      id_appreciation = req.param('id_appreciation_form',null);
    }

    var id_campagne = 0;
    
    if(req.param('campagne_form',null)){
      id_campagne = req.param('campagne_form',null);
    }
    if(req.param('commentaire_appreciation_francais_form',null)){
      commentaire_appreciation_francais = req.param('commentaire_appreciation_francais_form',null);
    }
    if(req.param('commentaire_appreciation_metier_form',null)){
      commentaire_appreciation_metier = req.param('commentaire_appreciation_metier_form',null);
    }
    if(req.param('reprise_francais_form',null)){
      reprise_francais = req.param('reprise_francais_form',null);
    }
    if(req.param('reprise_metier_form',null)){
      reprise_metier = req.param('reprise_metier_form',null);
    }
    //Fin new champs

    


    async.series([
          function(callback) {
            //console.log("==========================================> COMFORME = "+ req.param('conformite',null));
            //conformite
            var conformite = req.param('conformite2',null);
            
            
            var duree  = req.param('duree_enregistrement_form',null);    // =========================DUREE ECOUTE  duration
            //console.log("==========================================> DUREE = "+ req.param('duree_enregistrement_form',null));

            //console.log("==========================================> DEBUT ECOUTE = "+ date_debut);
            //console.log("==========================================> FIN ECOUTE = "+ Date.now());

            var deb = new Date();
            var dtSplit = date_debut.split(':');
            deb.setHours(Number(dtSplit[0]));
            deb.setMinutes(Number(dtSplit[1]));
            deb.setSeconds(Number(dtSplit[2]));
            var fin = new Date();

            Ecoute.update({id_ecoute:id_ecoute},{date_enregistrement: (new Date(Date.parse(date_enregistrement)).toISOString()),id_motif:id_motif_appel, id_pers:id_tc, id_pers_ecoute: req.session.user, numero_enregistrement : numero_enregistrement, conforme : conformite, duree_appel : duree, deb_ecoute : deb.toISOString(), fin_ecoute : fin.toISOString(), id_specialite : id_specialite, id_mode : id_mode, francais_formation : francais_formation, metier_formation : metier_formation, id_type_ecoute : id_type_ecoute, raisons : raisons, id_appreciation : id_appreciation, commentaire_appreciation_francais : commentaire_appreciation_francais, commentaire_appreciation_metier : commentaire_appreciation_metier, reprise_francais : reprise_francais, reprise_metier : reprise_metier,id_campagne : id_campagne}).exec(function (err, ecouteCreated){
              if (err) { console.log(err); }
              //console.log(' CREATION ECOUTE NA');
              //console.log(' 1 -  ID ecoute created', ecouteCreated.id_ecoute);
              return callback(null,ecouteCreated);
            });
          }

        ],function(callback, results){
          //res.redirect('back');
          res.redirect('listeEcoute');
        });
  },

  enregistrerNote: function (req, res)
  {
    //insertion ecoute
    if (!req.session.user) return res.redirect('/login');

    sails.log(req.allParams());
    var id_tc = parseInt(req.param('id_tc_form',null));

    var numero_enregistrement = 1;
    if(req.param('numero_enregistrement_form',null)){
      numero_enregistrement = req.param('numero_enregistrement_form',null);
    }

    var id_motif_appel = 1;
    if(req.param('id_motif_appel_form',null)){
      id_motif_appel = req.param('id_motif_appel_form',null);
    }

    var id_specialite = 1;
    if(req.param('id_specialite_form',null)){
      id_specialite = req.param('id_specialite_form',null);
    }

    var id_campagne = 0;
    var is_as = false;

    if(req.param('campagne_form',null)){
      id_campagne = req.param('campagne_form',null);
      is_as = true;
    }

    var is_ggs = false;
    var is_css = false;
    var is_lamie = false;
    if(req.param('eole_form',null)){
      var ggs_css = req.param('eole_form',null);
      if(ggs_css == 1){
        is_ggs = true;
      }
      if(ggs_css == 2){
        is_css = true;
      }
      if(ggs_css == 3){
        is_lamie = true;
      }
    }

    var id_mode = 1;
    if(req.param('id_mode_form',null)){
      id_mode = req.param('id_mode_form',null);
    }

    var ponderation_value = req.param('ponderation_value',null); // null ou 1 ou 0

    var date_enregistrement = req.param('date_enregistrement_form',null);

    var date_ecoute = req.param('date_ecoute_form',null);

    var date_debut = req.param('date_debut_form',null);

    //BESOIN DE FORMATION
    var checkedValueF = req.param('Francais',null);
		var checkedValueM = req.param('Metier',null);
		var checkedValueA = req.param('Aucun',null);

		var commentaire_formation_francais = req.param('commentaire_francais',null);
    var commentaire_formation_metier = req.param('commentaire_metier',null);

    var commentaire_formation_eole = req.param('commentaire_formation_eole',null);
    var commentaire_formation_iso_eole = req.param('commentaire_formation_iso_eole',null);

		if (typeof checkedValueF == 'undefined'){
			checkedValueF = '';
      commentaire_formation_francais = '';
		}
		if (typeof checkedValueM == 'undefined'){
			checkedValueM = '';
      commentaire_formation_metier = ''; 
    }
    
		var francais_formation = checkedValueF +"/"+commentaire_formation_francais;
    var metier_formation = checkedValueM +"/"+commentaire_formation_metier;

    //Motif non conformite
    var id_motif_non_conformite;

    // CONFORMITE MAIL ENVOYE 
    console.log(req.param('Conforme',null));
    console.log(req.param('NonConforme',null));
    console.log(req.param('NonEvaluable',null));
    var checkedValueC = req.param('Conforme',null);
		var checkedValueNC = req.param('NonConforme',null);
    var checkedValueNE = req.param('NonEvaluable',null);

    var checkedValueConformite = "";

    if (checkedValueC){
      checkedValueConformite = checkedValueC;
		}
		if (checkedValueNC){
      checkedValueConformite = checkedValueNC; 
    }
    if (checkedValueNE){
      checkedValueConformite = checkedValueNE; 
    }
    console.log("CHECKED VALUE CONFORMITE ====> ")+ checkedValueConformite;
    var commentaire_conformite = req.param('commentaire_conformite',null);
    var conformite_mail = checkedValueConformite +"/"+commentaire_conformite;
    console.log("CONFORMITE MAIL ====> " + conformite_mail);
    // FIN CONFORMITE MAIL ENVOYE 

    if (typeof req.param('id_motif_non_conformite',null) !== 'undefined' && req.param('id_motif_non_conformite',null) !== "" && req.param('id_motif_non_conformite',null) !== null ){
      id_motif_non_conformite = req.param('id_motif_non_conformite',null);
    }else{
      //console.log("UNDEFINED");
      id_motif_non_conformite = 0;
    }
    //Fin Motif non conformite

    var commentaire_motif_non_conformite = req.param('commentaire_motif_non_conformite',null);

    var is_doctocareM = null;
    var is_briantM = null;
    var is_codelisM = null;

    if(req.param('is_doctocare',null)){
      is_doctocareM = true;
    }
    if(req.param('is_briant',null)){
      is_briantM = true;
    }
    if(req.param('is_codelis',null)){
      is_codelisM = true;
    }

    console.log(' =====================>  -  CREATION MOTIF APPEL ==> '+ id_motif_appel);
    console.log(' =====================>  -  CREATION MOTIF APPEL ==> '+ is_doctocareM + " ===> " + is_briantM);
    console.log(' =====================>  -  CREATION MOTIF APPEL ==> '+ parseInt(id_motif_appel));
    
    //GGS
    var id_type_ecoute = 0;
    var id_call = 0;
    var id_qualite = 0;
    var id_motif_nq = 0;
    var id_evaluateur = 0;

    if(req.param('type_ecoute_form',null)){
      id_type_ecoute = req.param('type_ecoute_form',null);
    }
    if(req.param('call_form',null)){
      id_call = req.param('call_form',null);
    }
    if(req.param('qualite_form',null)){
      id_qualite = req.param('qualite_form',null);
    }
    if(req.param('motif_nq_form',null)){
      id_motif_nq = req.param('motif_nq_form',null);
    }
    if(req.param('evaluateur_form',null)){
      id_evaluateur = req.param('evaluateur_form',null);
    }
    //Fin GGS

    // CSS
    var id_mutuelle = 0;
    var id_conformite = 0;
    if(req.param('mutuelle_form',null)){
      id_mutuelle = req.param('mutuelle_form',null);
    }
    if(req.param('conformite_form',null)){
      id_conformite = req.param('conformite_form',null);
    }
    // Fin CSS

    // new doctocare
    var doctocare_satisfait = false;
    if(req.param('check_satisfait',null) == 1){
      doctocare_satisfait = true;
    }
    var doctocare_procedure = false;
    if(req.param('check_procedure',null) == 1){
      doctocare_procedure = true;
    }
    console.log("SATISFAIT ===> "+doctocare_satisfait);
    console.log("PROCEDURE ===> "+doctocare_procedure);
    //fin new doctocare

    async.series([
      function(callback) {
        //console.log(' > create MOTIF '+ id_motif_appel + " INTEGER ===> "+typeof(23));
        if(isNaN(parseInt(id_motif_appel))){
          async.series([
            function(callback) {
              MotifAppel.query("insert into ms_motif_appel (libelle,is_doctocare,is_briant,is_codelis) values ('"+id_motif_appel+"', "+is_doctocareM+", "+is_briantM+", "+is_codelisM+")", function(err, val){
                if(err) return callback(err);
                return callback(null,val);
              });
            }
           ],function(erreur,result){
              var sql = "select id_motif_appel from ms_motif_appel where libelle = '"+id_motif_appel+"' AND is_doctocare is "+is_doctocareM+" AND is_briant is "+is_briantM+" ";
              console.log(sql);
              MotifAppel.query(sql, function(err, motif){
                if(err) return callback(err);
                console.log(motif.rows[0].id_motif_appel);
                console.log(motif.rows[0]);
                console.log(' =====================>  -  ID motif created  '+ motif.rows[0].id_motif_appel);
                id_motif_appel = motif.rows[0].id_motif_appel;
                return callback(null,motif.rows[0].id_motif_appel);
              });
          })
        }
        else{
          console.log(' ==================================> Not integer ');
          return callback(null,id_motif_appel);
        }
      }
    ],function(erreur,result){
      async.series([

        function(callback) {
          //console.log("ID MOTIF APPEL ===========================================> "+result[0]);
          //console.log("==========================================> COMFORME = "+ req.param('conformite',null));
          var conformite = true;
          if(Number(req.param('conformite',null)) == 0){
            conformite = false;
          }

          var duree  = 10;    // =========================DUREE ECOUTE  duration
          if( !isNaN(req.param('duree_enregistrement_form',null))){
            duree = req.param('duree_enregistrement_form',null);
          }

          var deb = new Date(); //get date postgres
          console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>>>>> new date()"+deb);
          console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>>>>> date_debut "+date_debut);
          
          var dtSplit = date_debut.split(':');
          deb.setHours(Number(dtSplit[0]));
          deb.setMinutes(Number(dtSplit[1]));
          deb.setSeconds(Number(dtSplit[2]));
          var fin = new Date();
        
          var is_doctocare = null;
          var is_briant = null;
          var is_codelis = null;
          var is_tpmep = null;
          var is_briant_as = null;
          if(req.param('is_doctocare',null)){
            is_doctocare = true;
          }
          if(req.param('is_briant',null)){
            is_briant = true;
          }
          if(req.param('is_codelis',null)){
            is_codelis = true;
          }
          console.log("IS TPMEP ================> 1 " + req.param('is_tpmep',null));
          if(req.param('is_tpmep',null)){
            console.log("IS TPMEP ================> 2 " + req.param('is_tpmep',null));
            is_tpmep = true;
          }
          if(req.param('is_briant_as',null)){
            is_briant_as = true;
          }

          var dt_ecoute = null;
          if(req.param('date_ecoute_form',null)){
            dt_ecoute = new Date(Date.parse(date_ecoute)).toISOString();
          }

          Ecoute.create({date_ecoute: dt_ecoute,date_enregistrement: (new Date(Date.parse(date_enregistrement)).toISOString()),id_motif:result[0], id_pers:id_tc, id_pers_ecoute: req.session.user, numero_enregistrement : numero_enregistrement, conforme : conformite, duree_appel : duree, deb_ecoute : deb, fin_ecoute : fin.toISOString(), id_specialite : id_specialite, id_mode : id_mode, francais_formation : francais_formation, metier_formation : metier_formation, id_motif_non_conformite : id_motif_non_conformite, commentaire_non_conformite : commentaire_motif_non_conformite, id_campagne : id_campagne, is_as : is_as, is_ggs : is_ggs , is_css : is_css, is_lamie : is_lamie, eole_formation : commentaire_formation_eole, iso_eole_formation : commentaire_formation_iso_eole, is_doctocare : is_doctocare, is_briant:is_briant, is_codelis:is_codelis, is_tpmep:is_tpmep, conformite_mail:conformite_mail, is_briant_as : is_briant_as, id_type_ecoute : id_type_ecoute, id_call : id_call, id_qualite : id_qualite, id_motif_nq : id_motif_nq, id_evaluateur : id_evaluateur, id_mutuelle:id_mutuelle, id_conformite:id_conformite, doctocare_satisfait : doctocare_satisfait,doctocare_procedure:doctocare_procedure}).exec(function (err, ecouteCreated){
            if (err) { console.log(err); }
            //console.log(' 1 -  ID ecoute created', ecouteCreated.id_ecoute);
            return callback(null,ecouteCreated);
          });
        },
        function (callback){
          DetailsNotation.find().exec(function (error, detailsFound) {
            //console.log("2 -  Taille table ==> "+ detailsFound.length);
            return callback(null,detailsFound);
          });
        }
      ],function(callback, results){
        var detailsFound = results[1];
        var ecouteCreated = results[0];
        //console.log(' 1-1 -  ID ecoute created', ecouteCreated.id_ecoute);
        //console.log("2-2 -  Taille table ==> "+ detailsFound.length);

        async.each(detailsFound,function(detail,callback){

          var note = req.param(''+detail.id_details_notation,null);
          var commentaire = req.param('commentaire-'+detail.id_details_notation,null);

          //Type commentaire
          var type_commentaire = null;
          if(req.param('type_commentaire-'+detail.id_details_notation,null)){
            type_commentaire = req.param('type_commentaire-'+detail.id_details_notation,null);
          }

          if(req.param('is_briant',null)){
            if(detail.id_details_notation == 202){
              var value_202 = req.param(''+detail.id_details_notation,null);
              if(value_202 == 2){
                note = 175;
              }
              if(value_202 == 1){
                note = 87.5;
              }
              if(value_202 == 0){
                note = 0;
              }
            }
          }

          var id_details_notation = detail.id_details_notation; //id_detail_notation
          var noteFin = note;

          if(req.param('is_doctocare',null) || req.param('is_briant',null) || req.param('is_briant_as',null)){
            if(note == 110){
              noteFin = null;
            }
            else if(note == 111){
              noteFin = detail.ponderation / 2;
            }
            else if(note == 112){
              noteFin = detail.ponderation;
            }
            else if(note == 113){
              noteFin = 0;
            }
          }
          else if(req.param('eole_form',null) == 1){
            console.log("IS EOLE FORM ===> GGS *****");
            if(note == 110){
              noteFin = 0;
              console.log("IS EOLE FORM 110 ===> " + noteFin);
            }
            else if(note == 111){
              noteFin = detail.ponderation * (-1);
              console.log("IS EOLE FORM 111 ===> " + noteFin);
            }
            else if(note == 112){
              noteFin = null;
              console.log("IS EOLE FORM 112 ===> " + noteFin);
            }
            else if(note == 113){
              noteFin = (detail.ponderation / 2 ) * (-1);
              console.log("IS EOLE FORM 113 ===> " + noteFin);
            }
          }
          else{
            if(note == 110){
              noteFin = null;
            }
            else if(note == 111){
              noteFin = detail.ponderation;
            }
            else if(note == 112){
              noteFin = 0;
            }
          }
          //console.log("INDICE i id_details_notation================> "+detail.id_details_notation);
          //console.log("COMMENTAIRE + NOTE ================> "+commentaire+"  ==== "+noteFin);

          Note.create({id_details_notation:detail.id_details_notation,commentaire:commentaire,note:noteFin,id_ecoute:ecouteCreated.id_ecoute, type_commentaire_ggs : type_commentaire}).exec(function(err,note) {
            if (err) console.log(err);
            //console.log('ID Note created', note.id_note);
          });
        });
        var retval = [];
        retval['id_ecoute'] = ecouteCreated.id_ecoute;
        res.redirect('back');
      });
    })
//ASYNC____________________________________________________________________________________________________________________
  },

  enregistrerEtatCQ: function (req, res)
  {
    if (!req.session.user) return res.redirect('/login');

    var date_enregistrement = req.param('date_enregistrement_cq',null);
    var id_type_etat_cq = req.param('type_etat_cq_select',null);
    var id_etat_cq = req.param('etat_cq_select',null);

    var debut_etat_cq = req.param('debut_etat_cq',null);

    var deb = new Date();
    var dtSplit = debut_etat_cq.split(':');
    deb.setHours(Number(dtSplit[0]));
    deb.setMinutes(Number(dtSplit[1]));
    deb.setSeconds(Number(dtSplit[2]));
    var fin = new Date();

    console.log("date_enregistrement ====> " + date_enregistrement);
    console.log("id_type_etat_cq ====> " + id_type_etat_cq);
    console.log("id_etat_cq ====> " + id_etat_cq);
    console.log("debut_etat_cq ====> " + deb);
    console.log("fin_etat_cq ====> " + fin);

    async.series([
        function(callback) {
          Ecoute.create({date_enregistrement: (new Date(Date.parse(date_enregistrement)).toISOString()),id_pers_ecoute: req.session.user, numero_enregistrement : 1, debut_etat_cq : deb, fin_etat_cq : fin, id_type_etat_cq : id_type_etat_cq, id_etat_cq : id_etat_cq, is_ggs : true}).exec(function (err, ecouteCreated){
            if (err) { 
              console.log(err);
            }
            return callback(null,ecouteCreated);
          });
        }
      ],function(callback, results){
        res.redirect('back');
    });
  },

  modifierNote: function (req, res)
  {
    if (!req.session.user) return res.redirect('/login');
    var id_ecoute = req.param('id_ecoute',null);

    sails.log(req.allParams());

    //BESOIN DE FORMATION UPDATE
    var checkedValueF = req.param('Francais',null);
		var checkedValueM = req.param('Metier',null);
		var checkedValueA = req.param('Aucun',null);
    var commentaire_formation_francais = req.param('commentaire_francais',null);
    var commentaire_formation_metier = req.param('commentaire_metier',null);
		if (typeof checkedValueF == 'undefined'){
			checkedValueF = '';
      commentaire_formation_francais = '';
		}
		if (typeof checkedValueM == 'undefined'){
			checkedValueM = '';
      commentaire_formation_metier = '';
		}
		var francais_formation = checkedValueF +"/"+commentaire_formation_francais;
    var metier_formation = checkedValueM +"/"+commentaire_formation_metier;

    // CONFORMITE MAIL ENVOYE 
    var checkedValueC = req.param('Conforme',null);
		var checkedValueNC = req.param('NonConforme',null);
    var checkedValueNE = req.param('NonEvaluable',null);

    var checkedValueConformite = "";

    if (checkedValueC){
      checkedValueConformite = checkedValueC;
		}
		if (checkedValueNC){
      checkedValueConformite = checkedValueNC; 
    }
    if (checkedValueNE){
      checkedValueConformite = checkedValueNE; 
    }
    console.log("CHECKED VALUE CONFORMITE ====> ")+ checkedValueConformite;
    var commentaire_conformite = req.param('commentaire_conformite',null);
    var conformite_mail = checkedValueConformite +"/"+commentaire_conformite;
    console.log("CONFORMITE MAIL ====> " + conformite_mail);
    // FIN CONFORMITE MAIL ENVOYE 

    var id_campagne = 0;
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> " + req.param('campagne_form',null));
    if(req.param('campagne_form',null)){
      id_campagne = req.param('campagne_form',null);
    }

    //Motif non conformite
    var id_motif_non_conformite;
    if (typeof req.param('id_motif_non_conformite',null) !== 'undefined' && req.param('id_motif_non_conformite',null) !== "" && req.param('id_motif_non_conformite',null) !== null ){
      id_motif_non_conformite = req.param('id_motif_non_conformite',null);
    }else{
      id_motif_non_conformite = 0;
    }
    var commentaire_motif_non_conformite = req.param('commentaire_motif_non_conformite',null);
    //Fin

    //new
    var numero_enregistrement = req.param('numero_enregistrement_form',null);
    var id_motif_appel = 0;
    if(req.param('id_motif_appel_form',null)){
      id_motif_appel = req.param('id_motif_appel_form',null);
    }
    var id_mode = 0;
    if(req.param('id_mode_form',null)){
      id_mode = req.param('id_mode_form',null);
    }
    var id_specialite = 0;
    if(req.param('id_specialite_form',null)){
      id_specialite = req.param('id_specialite_form',null);
    }

    var date_enregistrement = req.param('date_enregistrement_form',null);
    var date_ecoute = req.param('date_ecoute_form',null);
    var duree  = req.param('duree_enregistrement_form',null);
    //fin

    //GGS
    var id_type_ecoute = 0;
    var id_call = 0;
    var id_qualite = 0;
    var id_motif_nq = 0;
    var id_evaluateur = 0;

    if(req.param('type_ecoute_form',null)){
      id_type_ecoute = req.param('type_ecoute_form',null);
    }
    if(req.param('call_form',null)){
      id_call = req.param('call_form',null);
    }
    if(req.param('qualite_form',null)){
      id_qualite = req.param('qualite_form',null);
    }
    if(req.param('motif_nq_form',null)){
      id_motif_nq = req.param('motif_nq_form',null);
    }
    if(req.param('evaluateur_form',null)){
      id_evaluateur = req.param('evaluateur_form',null);
    }
    //Fin GGS

    // CSS
    var id_mutuelle = 0;
    var id_conformite = 0;
    if(req.param('mutuelle_form',null)){
      id_mutuelle = req.param('mutuelle_form',null);
    }
    if(req.param('conformite_form',null)){
      id_conformite = req.param('conformite_form',null);
    }
    // Fin CSS

     // new doctocare
     var doctocare_satisfait = false;
     if(req.param('check_satisfait',null) == 1){
       doctocare_satisfait = true;
     }
     var doctocare_procedure = false;
     if(req.param('check_procedure',null) == 1){
       doctocare_procedure = true;
     }
     console.log("SATISFAIT ===> "+doctocare_satisfait);
     console.log("PROCEDURE ===> "+doctocare_procedure);
     //fin new doctocare

    var commentaire_formation_iso_eole = req.param('commentaire_formation_iso_eole',null);
    
    async.series([
        function (callback){
          DetailsNotation.find().exec(function (error, detailsFound) {
            return callback(null,detailsFound);
          });
        },
        function(callback) {
          var conformite = true;
          if(Number(req.param('conformite',null)) == 0){
            conformite = false;
          }

          //Update ecoute  id_call:id_call,
          /*var dt_ecoute = null;
          if(req.param('date_ecoute_form',null)){
            dt_ecoute = new Date(Date.parse(date_ecoute)).toISOString();
          }*/
          Ecoute.update({id_ecoute:id_ecoute},{conforme : conformite, francais_formation : francais_formation, metier_formation : metier_formation, numero_enregistrement : numero_enregistrement, id_motif : id_motif_appel, id_specialite : id_specialite, id_mode : id_mode, date_ecoute : date_ecoute, date_enregistrement : date_enregistrement, duree_appel : duree, id_motif_non_conformite : id_motif_non_conformite, commentaire_non_conformite : commentaire_motif_non_conformite, id_campagne : id_campagne, conformite_mail:conformite_mail, id_type_ecoute:id_type_ecoute, id_qualite:id_qualite, id_motif_nq:id_motif_nq, id_mutuelle:id_mutuelle, id_conformite:id_conformite, iso_eole_formation : commentaire_formation_iso_eole, doctocare_satisfait:doctocare_satisfait, doctocare_procedure:doctocare_procedure}).exec(function (err, ecouteCreated){
            if (err) { console.log(err); }
            return callback(null,ecouteCreated);
          });
        }
      ],function(callback, results){
        var detailsFound = results[0];

        async.each(detailsFound,function(detail,callback){
          var note = req.param(''+detail.id_details_notation,null);
          var commentaire = req.param('commentaire-'+detail.id_details_notation,null);

          //Type commentaire
          var type_commentaire = null;
          if(req.param('type_commentaire-'+detail.id_details_notation,null)){
            type_commentaire = req.param('type_commentaire-'+detail.id_details_notation,null);
          }

          if(req.param('is_briant',null)){
            if(detail.id_details_notation == 202){
              var value_202 = req.param(''+detail.id_details_notation,null);
              if(value_202 == 2){
                note = 175;
              }
              if(value_202 == 1){
                note = 87.5;
              }
              if(value_202 == 0){
                note = 0;
              }
            }
          }

          var id_details_notation = detail.id_details_notation; //id_detail_notation
          var noteFin = note;

          if(req.param('is_doctocare',null) || req.param('is_briant',null) || req.param('is_briant_as',null)){
            if(note == 110){
              noteFin = null;
            }
            else if(note == 111){
              noteFin = detail.ponderation / 2;
            }
            else if(note == 112){
              noteFin = detail.ponderation;
            }
            else if(note == 113){
              noteFin = 0;
            }
          }
          else if(req.param('eole_form',null) == 1){
            console.log("IS EOLE FORM ===> GGS *****");
            if(note == 110){
              noteFin = 0;
              console.log("IS EOLE FORM 110 ===> " + noteFin);
            }
            else if(note == 111){
              noteFin = detail.ponderation * (-1);
              console.log("IS EOLE FORM 111 ===> " + noteFin);
            }
            else if(note == 112){
              noteFin = null;
              console.log("IS EOLE FORM 112 ===> " + noteFin);
            }
            else if(note == 113){
              noteFin = (detail.ponderation / 2 ) * (-1);
              console.log("IS EOLE FORM 113 ===> " + noteFin);
            }
          }
          else{
            if(note == 110){
              noteFin = null;
            }
            else if(note == 111){
              noteFin = detail.ponderation;
            }
            else if(note == 112){
              noteFin = 0;
            }
          }
          
          //Update note
          Note.update({id_ecoute:id_ecoute,id_details_notation:detail.id_details_notation},{commentaire:commentaire,note:noteFin, type_commentaire_ggs:type_commentaire}).exec(function(err,note) {
            if (err) console.log(err);
            //console.log('+++++++++++++++++++++++++++++++++ NOTE UPDATED ==> '+noteFin + ' ('+detail.id_details_notation+')'+ ' ('+id_ecoute+')');
          });
        })
        var redirect = 'listeEcoute';
        var is_doctocare = req.param('is_doctocare',null);
        var is_briant = req.param('is_briant',null);
        var is_briant_as = req.param('is_briant_as',null);
        var is_codelis = req.param('is_codelis',null);
        var is_tpmep = req.param('is_tpmep',null);
        var is_ggs = req.param('is_ggs',null);
        var is_css = req.param('is_css',null);
        var is_lamie = req.param('is_lamie',null);
        if(is_doctocare){
          redirect = 'listeEcouteDoctocare';
        }
        if(is_briant){
          redirect = 'listeEcouteBriant';
        }
        if(is_briant_as){
          redirect = 'listeEcouteBriantAs';
        }
        if(is_codelis){
          redirect = 'listeEcouteCodelis';
        }
        if(is_tpmep){
          redirect = 'listeEcouteTpmep';
        }
        if(is_ggs){
          redirect = 'listeEcouteIsoEole';
        }
        if(is_ggs){
          redirect = 'listeEcouteIsoEole';
        }
        if(is_css){
          redirect = 'listeEcouteCss';
        }
        if(is_lamie){
          redirect = 'listeEcouteLamie';
        }
        res.redirect(redirect);
      })
    //})
//ASYNC____________________________________________________________________________________________________________________
  }
};

 /*var deb = new Date();
          var dtSplit = date_debut.split(':');
          deb.setHours(Number(dtSplit[0]));
          deb.setMinutes(Number(dtSplit[1]));
          deb.setSeconds(Number(dtSplit[2]));
          var fin = new Date();*/
