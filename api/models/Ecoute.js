/**
 * Ecoute.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'ConnexionPostgresql',
  tableName: 'ms_ecoute',
  autoCreatedAt: false,
  autoUpdatedAt: false,

  //attributs
  attributes: {
    id_ecoute: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName:'id_ecoute'
    },

    date_enregistrement: {
      type: 'datetime',
      required: true,
      columnName:'date_enregistrement'
    },

    date_ecoute: {
      type: 'datetime',
      columnName:'date_ecoute'
    },

    id_motif: {
      type: 'integer',
      //required: true,
      columnName:'id_motif'
    },

    id_pers: {
      type: 'integer',
      //required: true,
      columnName:'id_pers'
    },

    id_pers_ecoute: {
      type: 'integer',
      //required: true,
      columnName:'id_pers_ecoute'
    },

    numero_enregistrement: {
      type: 'integer',
      //required: true,
      columnName:'numero_enregistrement'
    },

    conforme: {
      type: 'boolean',
      columnName:'conforme'
    },

    is_as: {
      type: 'boolean',
      columnName:'is_as'
    },

    is_doctocare: {
      type: 'boolean',
      columnName:'is_doctocare'
    },

    is_codelis: {
      type: 'boolean',
      columnName:'is_codelis'
    },

    is_briant: {
      type: 'boolean',
      columnName:'is_briant'
    },


    is_eole: {
      type: 'boolean',
      columnName:'is_eole'
    },

    is_tpmep: {
      type: 'boolean',
      columnName:'is_tpmep'
    },

    is_iso_eole: {
      type: 'boolean',
      columnName:'is_iso_eole'
    },

    duree_appel: {
      type: 'string',
      required: false,
      columnName:'duree_appel'
    },

    deb_ecoute: {
      type: 'datetime',
      //required: true,
      columnName:'deb_ecoute'
    },

    fin_ecoute: {
      type: 'datetime',
      //required: true,
      columnName:'fin_ecoute'
    },

    id_specialite: {
      type: 'integer',
      //required: true,
      columnName:'id_specialite'
    },

    id_campagne: {
      type: 'integer',
      required: false,
      columnName:'id_campagne'
    },

    id_mode: {
      type: 'integer',
      //required: true,
      columnName:'id_mode'
    },

    francais_formation: {
      type: 'string',
      required: false,
      columnName:'francais_formation'
    },

    metier_formation: {
      type: 'string',
      columnName:'metier_formation'
    },

    eole_formation: {
      type: 'string',
      required: false,
      columnName:'eole_formation'
    },

    iso_eole_formation: {
      type: 'string',
      columnName:'iso_eole_formation'
    },

    id_motif_non_conformite: {
      type: 'integer',
      columnName:'id_motif_non_conformite'
    },

    commentaire_non_conformite: {
      type: 'string',
      columnName:'commentaire_non_conformite'
    },

    id_type_ecoute: {
      type: 'integer',
      columnName:'id_type_ecoute'
    },

    raisons: {
      type: 'string',
      columnName:'raisons'
    },

    id_appreciation: {
      type: 'integer',
      columnName:'id_appreciation'
    },

    commentaire_appreciation_francais: {
      type: 'string',
      columnName:'commentaire_appreciation_francais'
    },

    commentaire_appreciation_metier: {
      type: 'string',
      columnName:'commentaire_appreciation_metier'
    },

    reprise_francais: {
      type: 'string',
      columnName:'reprise_francais'
    },

    reprise_metier: {
      type: 'string',
      columnName:'reprise_metier'
    },

    commentaire_suivi_ecoute: {
      type: 'string',
      columnName:'commentaire_suivi_ecoute'
    },

    conformite_mail: {
      type: 'string',
      required: false,
      columnName:'conformite_mail'
    },

    is_briant_as: {
      type: 'boolean',
      columnName:'is_briant_as'
    },

    //GGS
    id_call: {
      type: 'integer',
      required: false,
      columnName:'id_call'
    },

    id_qualite: {
      type: 'integer',
      required: false,
      columnName:'id_qualite'
    },

    id_motif_nq: {
      type: 'integer',
      required: false,
      columnName:'id_motif_nq'
    },

    id_evaluateur: {
      type: 'integer',
      required: false,
      columnName:'id_evaluateur'
    },

    is_ggs: {
      type: 'boolean',
      columnName:'is_ggs'
    },

    is_css: {
      type: 'boolean',
      columnName:'is_css'
    },

    id_mutuelle: {
      type: 'integer',
      columnName:'id_mutuelle'
    },

    id_conformite: {
      type: 'integer',
      columnName:'id_conformite'
    },

    is_lamie: {
      type: 'boolean',
      columnName:'is_lamie'
    },

    //ETAT CQ
    id_etat_cq: {
      type: 'integer',
      columnName:'id_etat_cq'
    },

    id_type_etat_cq: {
      type: 'integer',
      columnName:'id_type_etat_cq'
    },

    debut_etat_cq: {
      type: 'datetime',
      columnName:'debut_etat_cq'
    },

    fin_etat_cq: {
      type: 'datetime',
      columnName:'fin_etat_cq'
    },

    // new doctocare
    doctocare_satisfait: {
      type: 'boolean',
      columnName:'doctocare_satisfait'
    },
    doctocare_procedure: {
      type: 'boolean',
      columnName:'doctocare_procedure'
    },
  },
  
   getEcouteParDate: function(option, callback){
    //console.log("1 Modele ecoute ::: Fonction getEcouteParDate");
    //+"where ms_ecoute.date_enregistrement = '"+ option.dateEcoute + "'";
    //console.log("===========> OPTION DATE 1 "+option.optionDate);
    //console.log("===========> OPTION DATE 2 "+option.optionDate2);
    //console.log("===========> ID TC 2 "+option.optionTc);
    //console.log("===========> NUMERO 2 "+option.optionNumero);
    //console.log("===========> NUMERO 2 "+option.idChef);
    //console.log("===========> NUMERO 2 "+option.optionSq);

    var sqlDate = "";
    var sqlDate2 = "";
    var sqlTc = "";
    var sqlNumero = "";
    var sqlSq = "";

    var sqlConforme = "";

    if(option.optionDate != "" && option.optionDate != null && option.optionDate2 == ""){
      var temp = option.optionDate + " 03:00:00+03";
      sqlDate = " and ms_ecoute.date_enregistrement = '"+ temp + "' ";
      //console.log("=============================================> DATE 1 "+sqlDate);
    }
    if(option.optionDate2 != "" && option.optionDate2 != null  && option.optionDate == ""){
      var temp = option.optionDate2 + " 03:00:00+03";
      sqlDate = " and ms_ecoute.date_enregistrement = '"+ temp + "' ";
      //console.log("=============================================> DATE 2 "+sqlDate);
    }
    if(option.optionDate != "" && option.optionDate2 != ""){
      var temp = option.optionDate + " 03:00:00+03";
      var temp2 = option.optionDate2 + " 03:00:00+03";
      sqlDate = " and (ms_ecoute.date_enregistrement)::timestamp BETWEEN ('" + temp + " ')::timestamp and('" + temp2 + " ')::timestamp ";
      //console.log("=============================================> DATE BETWEEN "+sqlDate);
    }
    if(option.optionTc != ""){
      sqlTc = " and ms_ecoute.id_pers = '"+ option.optionTc + "' " ;
    }
    if(option.optionNumero != ""){
      sqlNumero = " and ms_ecoute.numero_enregistrement = '"+ option.optionNumero + "' ";
    }
    if(option.optionSq != ""){
      sqlSq = " and ms_ecoute.id_pers_ecoute = '"+ option.optionSq + "' ";
    }

    if(option.optionConforme != ""){
      var boolConforme = true;
      if(option.optionConforme == 2){
        boolConforme = false;
      }
      sqlConforme = " and ms_ecoute.conforme = '"+ boolConforme + "' ";
    }

    var sqlFiltre = sqlDate + sqlTc + sqlNumero + sqlSq + sqlConforme;

    var sql = "select (select r_personnel.appelation as tc from r_personnel where ms_ecoute.id_pers = r_personnel.id_pers), (select r_personnel.appelation as pers_ecoute from r_personnel where ms_ecoute.id_pers_ecoute = r_personnel.id_pers),ms_ecoute.id_ecoute, ms_ecoute.conforme, ms_ecoute.id_pers, ms_ecoute.date_enregistrement, ms_ecoute.numero_enregistrement, ms_ecoute.francais_formation, ms_ecoute.id_mode, ms_ecoute.metier_formation, ms_ecoute.id_mode, (select ms_motif_appel.libelle from ms_motif_appel where ms_ecoute.id_motif = ms_motif_appel.id_motif_appel) from ms_ecoute join ms_note on ms_ecoute.id_ecoute = ms_note.id_ecoute where 1=1 "+sqlFiltre+" group by ms_ecoute.id_ecoute order by ms_ecoute.date_enregistrement DESC";

    var sql2 ="select (select r_personnel.appelation as tc from r_personnel where ms_ecoute.id_pers = r_personnel.id_pers), (select r_personnel.appelation as pers_ecoute from r_personnel where ms_ecoute.id_pers_ecoute = r_personnel.id_pers),ms_ecoute.id_ecoute, ms_ecoute.conforme, ms_ecoute.id_pers, ms_ecoute.date_enregistrement, ms_ecoute.numero_enregistrement, ms_ecoute.francais_formation, ms_ecoute.id_mode, ms_ecoute.metier_formation, ms_ecoute.id_mode, (select ms_motif_appel.libelle from ms_motif_appel where ms_ecoute.id_motif = ms_motif_appel.id_motif_appel),almerys_user_new.id_ce, r_personnel.appelation as ce from ms_ecoute left join ms_note on ms_ecoute.id_ecoute = ms_note.id_ecoute join almerys_user_new on ms_ecoute.id_pers = almerys_user_new.matricule left join r_personnel on almerys_user_new.id_ce = r_personnel.id_pers where 1=1 "+sqlFiltre+" AND ms_ecoute.is_as = FALSE AND ms_ecoute.is_doctocare is NULL AND ms_ecoute.is_briant is NULL AND ms_ecoute.is_codelis is NULL group by ms_ecoute.id_ecoute,almerys_user_new.id_ce,r_personnel.appelation order by ms_ecoute.date_enregistrement DESC ";
    if(sqlFiltre == ""){
      sql2 = sql2 + " LIMIT 20 ";
    }
    Ecoute.query(sql2, function(err, res){
      if(err) {
        sails.log(err);
        //console.log(""+sql2);
        return callback(err);
      }else{
        //console.log("2 =====> Return res"+ res);
        //sails.log("REQ ================================================>>>>>>>>>>>>>>>>");
        //console.log(sql2);
      return callback(null, res.rows);
      }

    });
  },

  /*getEcouteParDateCodelis: function(option, callback){
    var sqlDate = "";
    var sqlDate2 = "";
    var sqlTc = "";
    var sqlNumero = "";
    var sqlSq = "";

    var sqlConforme = "";

    if(option.optionDate != "" && option.optionDate != null && option.optionDate2 == ""){
      var temp = option.optionDate + " 03:00:00+03";
      sqlDate = " and ms_ecoute.date_enregistrement = '"+ temp + "' ";
      //console.log("=============================================> DATE 1 "+sqlDate);
    }
    if(option.optionDate2 != "" && option.optionDate2 != null  && option.optionDate == ""){
      var temp = option.optionDate2 + " 03:00:00+03";
      sqlDate = " and ms_ecoute.date_enregistrement = '"+ temp + "' ";
      //console.log("=============================================> DATE 2 "+sqlDate);
    }
    if(option.optionDate != "" && option.optionDate2 != ""){
      var temp = option.optionDate + " 03:00:00+03";
      var temp2 = option.optionDate2 + " 03:00:00+03";
      sqlDate = " and (ms_ecoute.date_enregistrement)::timestamp BETWEEN ('" + temp + " ')::timestamp and('" + temp2 + " ')::timestamp ";
      //console.log("=============================================> DATE BETWEEN "+sqlDate);
    }
    if(option.optionTc != ""){
      sqlTc = " and ms_ecoute.id_pers = '"+ option.optionTc + "' " ;
    }
    if(option.optionNumero != ""){
      sqlNumero = " and ms_ecoute.numero_enregistrement = '"+ option.optionNumero + "' ";
    }
    if(option.optionSq != ""){
      sqlSq = " and ms_ecoute.id_pers_ecoute = '"+ option.optionSq + "' ";
    }

    if(option.optionConforme != ""){
      var boolConforme = true;
      if(option.optionConforme == 2){
        boolConforme = false;
      }
      sqlConforme = " and ms_ecoute.conforme = '"+ boolConforme + "' ";
    }

    var sqlFiltre = sqlDate + sqlTc + sqlNumero + sqlSq + sqlConforme;

    var sql = "select (select r_personnel.appelation as tc from r_personnel where ms_ecoute.id_pers = r_personnel.id_pers), (select r_personnel.appelation as pers_ecoute from r_personnel where ms_ecoute.id_pers_ecoute = r_personnel.id_pers),ms_ecoute.id_ecoute, ms_ecoute.conforme, ms_ecoute.id_pers, ms_ecoute.date_enregistrement, ms_ecoute.numero_enregistrement, ms_ecoute.francais_formation, ms_ecoute.id_mode, ms_ecoute.metier_formation, ms_ecoute.id_mode, (select ms_motif_appel.libelle from ms_motif_appel where ms_ecoute.id_motif = ms_motif_appel.id_motif_appel) from ms_ecoute join ms_note on ms_ecoute.id_ecoute = ms_note.id_ecoute where 1=1 "+sqlFiltre+" group by ms_ecoute.id_ecoute order by ms_ecoute.date_enregistrement DESC";

    var sql2 ="select (select r_personnel.appelation as tc from r_personnel where ms_ecoute.id_pers = r_personnel.id_pers), (select r_personnel.appelation as pers_ecoute from r_personnel where ms_ecoute.id_pers_ecoute = r_personnel.id_pers),ms_ecoute.id_ecoute, ms_ecoute.conforme, ms_ecoute.id_pers, ms_ecoute.date_enregistrement, ms_ecoute.numero_enregistrement, ms_ecoute.francais_formation, ms_ecoute.id_mode, ms_ecoute.metier_formation, ms_ecoute.id_mode, (select ms_motif_appel.libelle from ms_motif_appel where ms_ecoute.id_motif = ms_motif_appel.id_motif_appel),almerys_user_new.id_ce, r_personnel.appelation as ce from ms_ecoute left join ms_note on ms_ecoute.id_ecoute = ms_note.id_ecoute join almerys_user_new on ms_ecoute.id_pers = almerys_user_new.matricule left join r_personnel on almerys_user_new.id_ce = r_personnel.id_pers where 1=1 "+sqlFiltre+" AND ms_ecoute.is_codelis = TRUE group by ms_ecoute.id_ecoute,almerys_user_new.id_ce,r_personnel.appelation order by ms_ecoute.date_enregistrement DESC ";
    if(sqlFiltre == ""){
      sql2 = sql2 + " LIMIT 20 ";
    }
    Ecoute.query(sql2, function(err, res){
      if(err) {
        sails.log(err);
        return callback(err);
      }else{
      return callback(null, res.rows);
      }

    });
  },*/

  getEcouteParDateCodelis: function(option, callback){

    var sqlDate = "";
    var sqlDate2 = "";
    var sqlTc = "";
    var sqlNumero = "";
    var sqlSq = "";

    var sqlConforme = "";

    if(option.optionDate != "" && option.optionDate != null && option.optionDate2 == ""){
      var temp = option.optionDate + " 03:00:00+03";
      sqlDate = " and ms_ecoute.date_enregistrement = '"+ temp + "' ";
      //console.log("=============================================> DATE 1 "+sqlDate);
    }
    if(option.optionDate2 != "" && option.optionDate2 != null  && option.optionDate == ""){
      var temp = option.optionDate2 + " 03:00:00+03";
      sqlDate = " and ms_ecoute.date_enregistrement = '"+ temp + "' ";
      //console.log("=============================================> DATE 2 "+sqlDate);
    }
    if(option.optionDate != "" && option.optionDate2 != ""){
      var temp = option.optionDate + " 03:00:00+03";
      var temp2 = option.optionDate2 + " 03:00:00+03";
      sqlDate = " and (ms_ecoute.date_enregistrement)::timestamp BETWEEN ('" + temp + " ')::timestamp and('" + temp2 + " ')::timestamp ";
      //console.log("=============================================> DATE BETWEEN "+sqlDate);
    }
    if(option.optionTc != ""){
      sqlTc = " and ms_ecoute.id_pers = '"+ option.optionTc + "' " ;
    }
    if(option.optionNumero != ""){
      sqlNumero = " and ms_ecoute.numero_enregistrement = '"+ option.optionNumero + "' ";
    }
    if(option.optionSq != ""){
      sqlSq = " and ms_ecoute.id_pers_ecoute = '"+ option.optionSq + "' ";
    }
    if(sqlFiltre == ""){
      sql2 = sql2 + " LIMIT 20 ";
    }
    if(option.optionConforme != ""){
      var boolConforme = true;
      if(option.optionConforme == 2){
        boolConforme = false;
      }
      sqlConforme = " and ms_ecoute.conforme = '"+ boolConforme + "' ";
    }

    var sqlFiltre = sqlDate + sqlTc + sqlNumero + sqlSq + sqlConforme;

    var sql = "select (select r_personnel.appelation as tc from r_personnel where ms_ecoute.id_pers = r_personnel.id_pers), (select r_personnel.appelation as pers_ecoute from r_personnel where ms_ecoute.id_pers_ecoute = r_personnel.id_pers),ms_ecoute.id_ecoute, ms_ecoute.conforme, ms_ecoute.id_pers, ms_ecoute.date_enregistrement, ms_ecoute.numero_enregistrement, ms_ecoute.francais_formation, ms_ecoute.id_mode, ms_ecoute.metier_formation, ms_ecoute.id_mode, (select ms_motif_appel.libelle from ms_motif_appel where ms_ecoute.id_motif = ms_motif_appel.id_motif_appel) from ms_ecoute join ms_note on ms_ecoute.id_ecoute = ms_note.id_ecoute where 1=1 "+sqlFiltre+" group by ms_ecoute.id_ecoute order by ms_ecoute.date_enregistrement DESC";

    var sql2 ="select (select r_personnel.appelation as tc from r_personnel where ms_ecoute.id_pers = r_personnel.id_pers), (select r_personnel.appelation as pers_ecoute from r_personnel where ms_ecoute.id_pers_ecoute = r_personnel.id_pers),ms_ecoute.id_ecoute, ms_ecoute.conforme, ms_ecoute.id_pers, ms_ecoute.date_enregistrement, ms_ecoute.numero_enregistrement, ms_ecoute.francais_formation, ms_ecoute.id_mode, ms_ecoute.metier_formation, ms_ecoute.id_mode, (select ms_motif_appel.libelle from ms_motif_appel where ms_ecoute.id_motif = ms_motif_appel.id_motif_appel),almerys_user_new.id_ce, r_personnel.appelation as ce from ms_ecoute left join ms_note on ms_ecoute.id_ecoute = ms_note.id_ecoute join almerys_user_new on ms_ecoute.id_pers = almerys_user_new.matricule left join r_personnel on almerys_user_new.id_ce = r_personnel.id_pers where 1=1 "+sqlFiltre+" AND ms_ecoute.is_codelis = TRUE group by ms_ecoute.id_ecoute,almerys_user_new.id_ce,r_personnel.appelation order by ms_ecoute.date_enregistrement DESC ";
    if(sqlFiltre == ""){
      sql2 = sql2 + " LIMIT 20 ";
    }
    Ecoute.query(sql2, function(err, res){
      if(err) {
        sails.log(err);
        return callback(err);
      }else{
      return callback(null, res.rows);
      }

    });
  },

  getEcouteParDateAS: function(option, callback){
    //console.log("1 Modele ecoute ::: Fonction getEcouteParDate");
    //+"where ms_ecoute.date_enregistrement = '"+ option.dateEcoute + "'";
    //console.log("===========> OPTION DATE 1 "+option.optionDate);
    //console.log("===========> OPTION DATE 2 "+option.optionDate2);
    //console.log("===========> ID TC 2 "+option.optionTc);
    //console.log("===========> NUMERO 2 "+option.optionNumero);
    //console.log("===========> NUMERO 2 "+option.idChef);
    //console.log("===========> NUMERO 2 "+option.optionSq);

    var sqlDate = "";
    var sqlDate2 = "";
    var sqlTc = "";
    var sqlNumero = "";
    var sqlSq = "";

    var sqlConforme = "";

    sails.log(option);

    if(option.optionDate != "" && option.optionDate != null && option.optionDate2 == ""){
      var temp = option.optionDate + " 03:00:00+03";
      sqlDate = " and ms_ecoute.date_enregistrement = '"+ temp + "' ";
      //console.log("=============================================> DATE 1 "+sqlDate);
    }
    if(option.optionDate2 != "" && option.optionDate2 != null  && option.optionDate == ""){
      var temp = option.optionDate2 + " 03:00:00+03";
      sqlDate = " and ms_ecoute.date_enregistrement = '"+ temp + "' ";
      //console.log("=============================================> DATE 2 "+sqlDate);
    }
    if(option.optionDate != "" && option.optionDate2 != ""){
      var temp = option.optionDate + " 03:00:00+03";
      var temp2 = option.optionDate2 + " 03:00:00+03";
      sqlDate = " and (ms_ecoute.date_enregistrement)::timestamp BETWEEN ('" + temp + " ')::timestamp and('" + temp2 + " ')::timestamp ";
      //console.log("=============================================> DATE BETWEEN "+sqlDate);
    }
    if(option.optionTc != ""){
      sqlTc = " and ms_ecoute.id_pers = '"+ option.optionTc + "' " ;
    }
    /*if(option.optionNumero != ""){
      sqlNumero = " and ms_ecoute.numero_enregistrement = '"+ option.optionNumero + "' ";
    }*/
    if(option.optionSq != ""){
      sqlSq = " and ms_ecoute.id_pers_ecoute = '"+ option.optionSq + "' ";
    }

    if(option.optionCamp != "" && option.optionCamp != null){
      sqlSq = " and ms_ecoute.id_campagne = '"+ option.optionCamp + "' ";
    }

    if(option.optionConforme != ""){
      var boolConforme = true;
      if(option.optionConforme == 2){
        boolConforme = false;
      }
      sqlConforme = " and ms_ecoute.conforme = '"+ boolConforme + "' ";
    }

    var sqlFiltre = sqlDate + sqlTc + sqlNumero + sqlSq + sqlConforme;

    var sql = "select (select r_personnel.appelation as tc from r_personnel where ms_ecoute.id_pers = r_personnel.id_pers), (select r_personnel.appelation as pers_ecoute from r_personnel where ms_ecoute.id_pers_ecoute = r_personnel.id_pers),ms_ecoute.id_ecoute, ms_ecoute.conforme, ms_ecoute.id_pers, ms_ecoute.date_enregistrement, ms_ecoute.numero_enregistrement, ms_ecoute.francais_formation, ms_ecoute.id_mode, ms_ecoute.metier_formation, ms_ecoute.id_mode, (select ms_motif_appel.libelle from ms_motif_appel where ms_ecoute.id_motif = ms_motif_appel.id_motif_appel) from ms_ecoute join ms_note on ms_ecoute.id_ecoute = ms_note.id_ecoute where 1=1 "+sqlFiltre+" group by ms_ecoute.id_ecoute order by ms_ecoute.date_enregistrement DESC";

    var sql2 ="select (select r_personnel.appelation as tc from r_personnel where ms_ecoute.id_pers = r_personnel.id_pers), (select r_personnel.appelation as pers_ecoute from r_personnel where ms_ecoute.id_pers_ecoute = r_personnel.id_pers),ms_ecoute.id_ecoute, ms_ecoute.conforme, ms_ecoute.id_pers, ms_ecoute.date_enregistrement, ms_ecoute.numero_enregistrement, ms_ecoute.francais_formation, ms_ecoute.id_mode, ms_ecoute.metier_formation, ms_ecoute.id_mode, ms_specialite.libelle as specialite, ms_campagne.libelle as campagne, (select ms_motif_appel.libelle from ms_motif_appel where ms_ecoute.id_motif = ms_motif_appel.id_motif_appel),almerys_user_new.id_ce, r_personnel.appelation as ce from ms_ecoute left join ms_note on ms_ecoute.id_ecoute = ms_note.id_ecoute join almerys_user_new on ms_ecoute.id_pers = almerys_user_new.matricule left join r_personnel on almerys_user_new.id_ce = r_personnel.id_pers  left join ms_specialite on ms_specialite.id_specialite = ms_ecoute.id_specialite  left join ms_campagne on ms_campagne.id_campagne = ms_ecoute.id_campagne where 1=1 "+sqlFiltre+" AND ms_ecoute.is_as = TRUE group by ms_ecoute.id_ecoute,almerys_user_new.id_ce,r_personnel.appelation,ms_specialite.libelle, ms_campagne.libelle order by ms_ecoute.date_enregistrement DESC ";
    if(sqlFiltre == ""){
      sql2 = sql2 + " LIMIT 20 ";
    }
    console.log(sql2);
    Ecoute.query(sql2, function(err, res){
      if(err) {
        sails.log(err);
        //console.log(""+sql2);
        return callback(err);
      }else{
        //console.log("2 =====> Return res"+ res);
        //sails.log("REQ ================================================>>>>>>>>>>>>>>>>");
        //console.log(sql2);
      return callback(null, res.rows);
      }

    });
  },

  getEcouteParDateDoctocare: function(option, callback){
    var sqlDate = "";
    var sqlDate2 = "";
    var sqlTc = "";
    var sqlNumero = "";
    var sqlSq = "";

    var sqlConforme = "";

    sails.log(option);

    if(option.optionDate != "" && option.optionDate != null && option.optionDate2 == ""){
      var temp = option.optionDate + " 03:00:00+03";
      sqlDate = " and ms_ecoute.date_enregistrement = '"+ temp + "' ";
      //console.log("=============================================> DATE 1 "+sqlDate);
    }
    if(option.optionDate2 != "" && option.optionDate2 != null  && option.optionDate == ""){
      var temp = option.optionDate2 + " 03:00:00+03";
      sqlDate = " and ms_ecoute.date_enregistrement = '"+ temp + "' ";
      //console.log("=============================================> DATE 2 "+sqlDate);
    }
    if(option.optionDate != "" && option.optionDate2 != ""){
      var temp = option.optionDate + " 03:00:00+03";
      var temp2 = option.optionDate2 + " 03:00:00+03";
      sqlDate = " and (ms_ecoute.date_enregistrement)::timestamp BETWEEN ('" + temp + " ')::timestamp and('" + temp2 + " ')::timestamp ";
      //console.log("=============================================> DATE BETWEEN "+sqlDate);
    }
    if(option.optionTc != ""){
      sqlTc = " and ms_ecoute.id_pers = '"+ option.optionTc + "' " ;
    }
    /*if(option.optionNumero != ""){
      sqlNumero = " and ms_ecoute.numero_enregistrement = '"+ option.optionNumero + "' ";
    }*/
    if(option.optionSq != ""){
      sqlSq = " and ms_ecoute.id_pers_ecoute = '"+ option.optionSq + "' ";
    }

    if(option.optionCamp != "" && option.optionCamp != null){
      sqlSq = " and ms_ecoute.id_campagne = '"+ option.optionCamp + "' ";
    }

    if(option.optionConforme != ""){
      var boolConforme = true;
      if(option.optionConforme == 2){
        boolConforme = false;
      }
      sqlConforme = " and ms_ecoute.conforme = '"+ boolConforme + "' ";
    }

    var sqlFiltre = sqlDate + sqlTc + sqlNumero + sqlSq + sqlConforme;

    var sql = "select (select r_personnel.appelation as tc from r_personnel where ms_ecoute.id_pers = r_personnel.id_pers), (select r_personnel.appelation as pers_ecoute from r_personnel where ms_ecoute.id_pers_ecoute = r_personnel.id_pers),ms_ecoute.id_ecoute, ms_ecoute.conforme, ms_ecoute.id_pers, ms_ecoute.date_enregistrement, ms_ecoute.numero_enregistrement, ms_ecoute.francais_formation, ms_ecoute.id_mode, ms_ecoute.metier_formation, ms_ecoute.id_mode, (select ms_motif_appel.libelle from ms_motif_appel where ms_ecoute.id_motif = ms_motif_appel.id_motif_appel) from ms_ecoute join ms_note on ms_ecoute.id_ecoute = ms_note.id_ecoute where 1=1 "+sqlFiltre+" group by ms_ecoute.id_ecoute order by ms_ecoute.date_enregistrement DESC";

    var sql2 ="select (select r_personnel.appelation as tc from r_personnel where ms_ecoute.id_pers = r_personnel.id_pers), (select r_personnel.appelation as pers_ecoute from r_personnel where ms_ecoute.id_pers_ecoute = r_personnel.id_pers),ms_ecoute.id_ecoute, ms_ecoute.conforme, ms_ecoute.id_pers, ms_ecoute.date_enregistrement, ms_ecoute.numero_enregistrement, ms_ecoute.francais_formation, ms_ecoute.id_mode, ms_ecoute.metier_formation, ms_ecoute.id_mode, ms_specialite.libelle as specialite, ms_campagne.libelle as campagne, (select ms_motif_appel.libelle from ms_motif_appel where ms_ecoute.id_motif = ms_motif_appel.id_motif_appel),almerys_user_new.id_ce, r_personnel.appelation as ce from ms_ecoute left join ms_note on ms_ecoute.id_ecoute = ms_note.id_ecoute join almerys_user_new on ms_ecoute.id_pers = almerys_user_new.matricule left join r_personnel on almerys_user_new.id_ce = r_personnel.id_pers  left join ms_specialite on ms_specialite.id_specialite = ms_ecoute.id_specialite  left join ms_campagne on ms_campagne.id_campagne = ms_ecoute.id_campagne where 1=1 "+sqlFiltre+" AND ms_ecoute.is_doctocare = TRUE group by ms_ecoute.id_ecoute,almerys_user_new.id_ce,r_personnel.appelation,ms_specialite.libelle, ms_campagne.libelle order by ms_ecoute.date_enregistrement DESC ";

    if(sqlFiltre == ""){
      sql2 = sql2 + " LIMIT 20 ";
    }

    Ecoute.query(sql2, function(err, res){
      if(err) {
        sails.log(err);
        return callback(err);
      }else{
      return callback(null, res.rows);
      }

    });
  },

  getEcouteParDateTpmep: function(option, callback){
    var sqlDate = "";
    var sqlDate2 = "";
    var sqlTc = "";
    var sqlNumero = "";
    var sqlSq = "";

    var sqlConforme = "";

    sails.log(option);

    if(option.optionDate != "" && option.optionDate != null && option.optionDate2 == ""){
      var temp = option.optionDate + " 03:00:00+03";
      sqlDate = " and ms_ecoute.date_enregistrement = '"+ temp + "' ";
      //console.log("=============================================> DATE 1 "+sqlDate);
    }
    if(option.optionDate2 != "" && option.optionDate2 != null  && option.optionDate == ""){
      var temp = option.optionDate2 + " 03:00:00+03";
      sqlDate = " and ms_ecoute.date_enregistrement = '"+ temp + "' ";
      //console.log("=============================================> DATE 2 "+sqlDate);
    }
    if(option.optionDate != "" && option.optionDate2 != ""){
      var temp = option.optionDate + " 03:00:00+03";
      var temp2 = option.optionDate2 + " 03:00:00+03";
      sqlDate = " and (ms_ecoute.date_enregistrement)::timestamp BETWEEN ('" + temp + " ')::timestamp and('" + temp2 + " ')::timestamp ";
      //console.log("=============================================> DATE BETWEEN "+sqlDate);
    }
    if(option.optionTc != ""){
      sqlTc = " and ms_ecoute.id_pers = '"+ option.optionTc + "' " ;
    }
    /*if(option.optionNumero != ""){
      sqlNumero = " and ms_ecoute.numero_enregistrement = '"+ option.optionNumero + "' ";
    }*/
    if(option.optionSq != ""){
      sqlSq = " and ms_ecoute.id_pers_ecoute = '"+ option.optionSq + "' ";
    }

    if(option.optionCamp != "" && option.optionCamp != null){
      sqlSq = " and ms_ecoute.id_campagne = '"+ option.optionCamp + "' ";
    }

    if(option.optionConforme != ""){
      var boolConforme = true;
      if(option.optionConforme == 2){
        boolConforme = false;
      }
      sqlConforme = " and ms_ecoute.conforme = '"+ boolConforme + "' ";
    }

    var sqlFiltre = sqlDate + sqlTc + sqlNumero + sqlSq + sqlConforme;

    var sql = "select (select r_personnel.appelation as tc from r_personnel where ms_ecoute.id_pers = r_personnel.id_pers), (select r_personnel.appelation as pers_ecoute from r_personnel where ms_ecoute.id_pers_ecoute = r_personnel.id_pers),ms_ecoute.id_ecoute, ms_ecoute.conforme, ms_ecoute.id_pers, ms_ecoute.date_enregistrement, ms_ecoute.numero_enregistrement, ms_ecoute.francais_formation, ms_ecoute.id_mode, ms_ecoute.metier_formation, ms_ecoute.id_mode, (select ms_motif_appel.libelle from ms_motif_appel where ms_ecoute.id_motif = ms_motif_appel.id_motif_appel) from ms_ecoute join ms_note on ms_ecoute.id_ecoute = ms_note.id_ecoute where 1=1 "+sqlFiltre+" group by ms_ecoute.id_ecoute order by ms_ecoute.date_enregistrement DESC";

    var sql2 ="select (select r_personnel.appelation as tc from r_personnel where "+
    "ms_ecoute.id_pers = r_personnel.id_pers), (select r_personnel.appelation as pers_ecoute "+
    "from r_personnel where ms_ecoute.id_pers_ecoute = r_personnel.id_pers),ms_ecoute.id_ecoute, "+
    "ms_ecoute.conforme, ms_ecoute.id_pers, ms_ecoute.date_enregistrement, "+
    "ms_ecoute.numero_enregistrement, ms_ecoute.francais_formation, ms_ecoute.id_mode, "+
    "ms_ecoute.metier_formation, ms_ecoute.id_mode, ms_specialite.libelle as specialite, "+
    "ms_campagne.libelle as campagne, (select ms_motif_appel.libelle from ms_motif_appel "+
    "where ms_ecoute.id_motif = ms_motif_appel.id_motif_appel),almerys_user_new.id_ce, "+
    "r_personnel.appelation as ce from ms_ecoute "+
    "left join ms_note on ms_ecoute.id_ecoute = ms_note.id_ecoute "+
    "join almerys_user_new on ms_ecoute.id_pers = almerys_user_new.matricule "+
    "left join r_personnel on almerys_user_new.id_ce = r_personnel.id_pers  "+
    "left join ms_specialite on ms_specialite.id_specialite = ms_ecoute.id_specialite  "+
    "left join ms_campagne on ms_campagne.id_campagne = ms_ecoute.id_campagne "+
    "where 1=1 "+sqlFiltre+" AND ms_ecoute.is_tpmep = TRUE AND almerys_user_new.id_ce = 1019 "+
    "group by ms_ecoute.id_ecoute,almerys_user_new.id_ce,r_personnel.appelation,"+
    "ms_specialite.libelle, ms_campagne.libelle "+
    "order by ms_ecoute.date_enregistrement DESC ";
    if(sqlFiltre == ""){
      sql2 = sql2 + " LIMIT 20 ";
    }
    console.log("==================================================== LISTE ECOUTE TPMEP");
    console.log(sql2);

    Ecoute.query(sql2, function(err, res){
      if(err) {
        sails.log(err);
        return callback(err);
      }else{
      return callback(null, res.rows);
      }

    });
  },

  getEcouteParDateBriant: function(option, callback){
    var sqlDate = "";
    var sqlDate2 = "";
    var sqlTc = "";
    var sqlNumero = "";
    var sqlSq = "";

    var sqlConforme = "";

    sails.log(option);

    if(option.optionDate != "" && option.optionDate != null && option.optionDate2 == ""){
      var temp = option.optionDate + " 03:00:00+03";
      sqlDate = " and ms_ecoute.date_enregistrement = '"+ temp + "' ";
      //console.log("=============================================> DATE 1 "+sqlDate);
    }
    if(option.optionDate2 != "" && option.optionDate2 != null  && option.optionDate == ""){
      var temp = option.optionDate2 + " 03:00:00+03";
      sqlDate = " and ms_ecoute.date_enregistrement = '"+ temp + "' ";
      //console.log("=============================================> DATE 2 "+sqlDate);
    }
    if(option.optionDate != "" && option.optionDate2 != ""){
      var temp = option.optionDate + " 03:00:00+03";
      var temp2 = option.optionDate2 + " 03:00:00+03";
      sqlDate = " and (ms_ecoute.date_enregistrement)::timestamp BETWEEN ('" + temp + " ')::timestamp and('" + temp2 + " ')::timestamp ";
      //console.log("=============================================> DATE BETWEEN "+sqlDate);
    }
    if(option.optionTc != ""){
      sqlTc = " and ms_ecoute.id_pers = '"+ option.optionTc + "' " ;
    }
    /*if(option.optionNumero != ""){
      sqlNumero = " and ms_ecoute.numero_enregistrement = '"+ option.optionNumero + "' ";
    }*/
    if(option.optionSq != ""){
      sqlSq = " and ms_ecoute.id_pers_ecoute = '"+ option.optionSq + "' ";
    }

    if(option.optionCamp != "" && option.optionCamp != null){
      sqlSq = " and ms_ecoute.id_campagne = '"+ option.optionCamp + "' ";
    }

    if(option.optionConforme != ""){
      var boolConforme = true;
      if(option.optionConforme == 2){
        boolConforme = false;
      }
      sqlConforme = " and ms_ecoute.conforme = '"+ boolConforme + "' ";
    }

    var sqlFiltre = sqlDate + sqlTc + sqlNumero + sqlSq + sqlConforme;

    var sql = "select (select r_personnel.appelation as tc from r_personnel where ms_ecoute.id_pers = r_personnel.id_pers), (select r_personnel.appelation as pers_ecoute from r_personnel where ms_ecoute.id_pers_ecoute = r_personnel.id_pers),ms_ecoute.id_ecoute, ms_ecoute.conforme, ms_ecoute.id_pers, ms_ecoute.date_enregistrement, ms_ecoute.numero_enregistrement, ms_ecoute.francais_formation, ms_ecoute.id_mode, ms_ecoute.metier_formation, ms_ecoute.id_mode, (select ms_motif_appel.libelle from ms_motif_appel where ms_ecoute.id_motif = ms_motif_appel.id_motif_appel) from ms_ecoute join ms_note on ms_ecoute.id_ecoute = ms_note.id_ecoute where 1=1 "+sqlFiltre+" group by ms_ecoute.id_ecoute order by ms_ecoute.date_enregistrement DESC";

    var sql2 ="select (select r_personnel.appelation as tc from r_personnel where ms_ecoute.id_pers = r_personnel.id_pers), (select r_personnel.appelation as pers_ecoute from r_personnel where ms_ecoute.id_pers_ecoute = r_personnel.id_pers),ms_ecoute.id_ecoute, ms_ecoute.conforme, ms_ecoute.id_pers, ms_ecoute.date_enregistrement, ms_ecoute.numero_enregistrement, ms_ecoute.francais_formation, ms_ecoute.id_mode, ms_ecoute.metier_formation, ms_ecoute.id_mode, ms_specialite.libelle as specialite, ms_campagne.libelle as campagne, (select ms_motif_appel.libelle from ms_motif_appel where ms_ecoute.id_motif = ms_motif_appel.id_motif_appel),almerys_user_new.id_ce, r_personnel.appelation as ce from ms_ecoute left join ms_note on ms_ecoute.id_ecoute = ms_note.id_ecoute join almerys_user_new on ms_ecoute.id_pers = almerys_user_new.matricule left join r_personnel on almerys_user_new.id_ce = r_personnel.id_pers  left join ms_specialite on ms_specialite.id_specialite = ms_ecoute.id_specialite  left join ms_campagne on ms_campagne.id_campagne = ms_ecoute.id_campagne where 1=1 "+sqlFiltre+" AND ms_ecoute.is_briant = TRUE AND almerys_user_new.suppr is null group by ms_ecoute.id_ecoute,almerys_user_new.id_ce,r_personnel.appelation,ms_specialite.libelle, ms_campagne.libelle order by ms_ecoute.date_enregistrement DESC ";
    if(sqlFiltre == ""){
      sql2 = sql2 + " LIMIT 20 ";
    }
    Ecoute.query(sql2, function(err, res){
      if(err) {
        sails.log(err);
        return callback(err);
      }else{
      return callback(null, res.rows);
      }

    });
  },

  getEcouteParDateBriantAs: function(option, callback){
    var sqlDate = "";
    var sqlDate2 = "";
    var sqlTc = "";
    var sqlNumero = "";
    var sqlSq = "";

    var sqlConforme = "";

    sails.log(option);

    if(option.optionDate != "" && option.optionDate != null && option.optionDate2 == ""){
      var temp = option.optionDate + " 03:00:00+03";
      sqlDate = " and ms_ecoute.date_enregistrement = '"+ temp + "' ";
      //console.log("=============================================> DATE 1 "+sqlDate);
    }
    if(option.optionDate2 != "" && option.optionDate2 != null  && option.optionDate == ""){
      var temp = option.optionDate2 + " 03:00:00+03";
      sqlDate = " and ms_ecoute.date_enregistrement = '"+ temp + "' ";
      //console.log("=============================================> DATE 2 "+sqlDate);
    }
    if(option.optionDate != "" && option.optionDate2 != ""){
      var temp = option.optionDate + " 03:00:00+03";
      var temp2 = option.optionDate2 + " 03:00:00+03";
      sqlDate = " and (ms_ecoute.date_enregistrement)::timestamp BETWEEN ('" + temp + " ')::timestamp and('" + temp2 + " ')::timestamp ";
      //console.log("=============================================> DATE BETWEEN "+sqlDate);
    }
    if(option.optionTc != ""){
      sqlTc = " and ms_ecoute.id_pers = '"+ option.optionTc + "' " ;
    }
    /*if(option.optionNumero != ""){
      sqlNumero = " and ms_ecoute.numero_enregistrement = '"+ option.optionNumero + "' ";
    }*/
    if(option.optionSq != ""){
      sqlSq = " and ms_ecoute.id_pers_ecoute = '"+ option.optionSq + "' ";
    }

    if(option.optionCamp != "" && option.optionCamp != null){
      sqlSq = " and ms_ecoute.id_campagne = '"+ option.optionCamp + "' ";
    }

    if(option.optionConforme != ""){
      var boolConforme = true;
      if(option.optionConforme == 2){
        boolConforme = false;
      }
      sqlConforme = " and ms_ecoute.conforme = '"+ boolConforme + "' ";
    }

    var sqlFiltre = sqlDate + sqlTc + sqlNumero + sqlSq + sqlConforme;

   //var sql = "select (select r_personnel.appelation as tc from r_personnel where ms_ecoute.id_pers = r_personnel.id_pers), (select r_personnel.appelation as pers_ecoute from r_personnel where ms_ecoute.id_pers_ecoute = r_personnel.id_pers),ms_ecoute.id_ecoute, ms_ecoute.conforme, ms_ecoute.id_pers, ms_ecoute.date_enregistrement, ms_ecoute.numero_enregistrement, ms_ecoute.francais_formation, ms_ecoute.id_mode, ms_ecoute.metier_formation, ms_ecoute.id_mode, (select ms_motif_appel.libelle from ms_motif_appel where ms_ecoute.id_motif = ms_motif_appel.id_motif_appel) from ms_ecoute join ms_note on ms_ecoute.id_ecoute = ms_note.id_ecoute where 1=1 "+sqlFiltre+" group by ms_ecoute.id_ecoute order by ms_ecoute.date_enregistrement DESC";

    var sql2 ="select (select r_personnel.appelation as tc from r_personnel where ms_ecoute.id_pers = r_personnel.id_pers), (select r_personnel.appelation as pers_ecoute from r_personnel where ms_ecoute.id_pers_ecoute = r_personnel.id_pers),ms_ecoute.id_ecoute, ms_ecoute.conforme, ms_ecoute.id_pers, ms_ecoute.date_enregistrement, ms_ecoute.numero_enregistrement, ms_ecoute.francais_formation, ms_ecoute.id_mode, ms_ecoute.metier_formation, ms_ecoute.id_mode, ms_specialite.libelle as specialite, ms_campagne.libelle as campagne, (select ms_motif_appel.libelle from ms_motif_appel where ms_ecoute.id_motif = ms_motif_appel.id_motif_appel),almerys_user_new.id_ce, r_personnel.appelation as ce from ms_ecoute left join ms_note on ms_ecoute.id_ecoute = ms_note.id_ecoute join almerys_user_new on ms_ecoute.id_pers = almerys_user_new.matricule left join r_personnel on almerys_user_new.id_ce = r_personnel.id_pers  left join ms_specialite on ms_specialite.id_specialite = ms_ecoute.id_specialite  left join ms_campagne on ms_campagne.id_campagne = ms_ecoute.id_campagne where 1=1 "+sqlFiltre+" AND ms_ecoute.is_briant_as = TRUE AND almerys_user_new.suppr is null group by ms_ecoute.id_ecoute,almerys_user_new.id_ce,r_personnel.appelation,ms_specialite.libelle, ms_campagne.libelle order by ms_ecoute.date_enregistrement DESC ";
    if(sqlFiltre == ""){
      sql2 = sql2 + " LIMIT 20 ";
    }
    Ecoute.query(sql2, function(err, res){
      if(err) {
        sails.log(err);
        return callback(err);
      }else{
      return callback(null, res.rows);
      }

    });
  },

  getNoteParEcoute: function(option, callback){
    //var sql = "select ms_note.*, ms_details_notation.libelle, ms_details_notation.ponderation from ms_note join ms_details_notation on ms_note.id_details_notation = ms_details_notation.id_details_notation where id_ecoute = '"+ option.idEcoute + "'";
    var sql = "select ms_note.*, ms_details_notation.libelle as notation, ms_details_notation.id_details_notation, ms_details_notation.ponderation, ms_details_notation.id_details_notation,ms_categorie_notation.id_categorie_notation,ms_categorie_notation.libelle as categorie, ms_categorie_notation.icone as icone, ms_categorie_notation.couleur_icone as couleur FROM ms_note JOIN ms_details_notation ON ms_note.id_details_notation = ms_details_notation.id_details_notation JOIN ms_categorie_notation ON ms_categorie_notation.id_categorie_notation = ms_details_notation.id_categorie_notation WHERE id_ecoute = '"+ option.idEcoute + "' AND ms_details_notation.type_appel=1 ORDER BY ms_categorie_notation.id_categorie_notation,ms_details_notation.id_details_notation";
    //sails.log(sql);
    Ecoute.query(sql, function(err, res){
      if(err) console.log(err);
      return callback(null, res.rows);
    });
  },

  getNoteParEcouteCodelis: function(option, callback){
    //var sql = "select ms_note.*, ms_details_notation.libelle, ms_details_notation.ponderation from ms_note join ms_details_notation on ms_note.id_details_notation = ms_details_notation.id_details_notation where id_ecoute = '"+ option.idEcoute + "'";
    var sql = "select ms_note.*, ms_details_notation.libelle as notation, ms_details_notation.id_details_notation, ms_details_notation.ponderation, ms_details_notation.id_details_notation,ms_categorie_notation.id_categorie_notation,ms_categorie_notation.libelle as categorie, ms_categorie_notation.icone as icone, ms_categorie_notation.couleur_icone as couleur FROM ms_note JOIN ms_details_notation ON ms_note.id_details_notation = ms_details_notation.id_details_notation JOIN ms_categorie_notation ON ms_categorie_notation.id_categorie_notation = ms_details_notation.id_categorie_notation WHERE id_ecoute = '"+ option.idEcoute + "' AND ms_details_notation.type_appel=7 ORDER BY ms_categorie_notation.id_categorie_notation,ms_details_notation.id_details_notation";
    //sails.log(sql);
    Ecoute.query(sql, function(err, res){
      if(err) console.log(err);
      return callback(null, res.rows);
    });
  },

  getNoteParEcouteAS: function(option, callback){ //2
    //var sql = "select ms_note.*, ms_details_notation.libelle, ms_details_notation.ponderation from ms_note join ms_details_notation on ms_note.id_details_notation = ms_details_notation.id_details_notation where id_ecoute = '"+ option.idEcoute + "'";
    var sql = "select ms_note.*, ms_details_notation.libelle as notation, ms_details_notation.id_details_notation, ms_details_notation.ponderation, ms_details_notation.id_details_notation,ms_categorie_notation.id_categorie_notation,ms_categorie_notation.libelle as categorie, ms_categorie_notation.icone as icone, ms_categorie_notation.couleur_icone as couleur FROM ms_note JOIN ms_details_notation ON ms_note.id_details_notation = ms_details_notation.id_details_notation JOIN ms_categorie_notation ON ms_categorie_notation.id_categorie_notation = ms_details_notation.id_categorie_notation WHERE id_ecoute = '"+ option.idEcoute + "' AND ms_details_notation.type_appel=5 ORDER BY ms_categorie_notation.id_categorie_notation,ms_details_notation.id_details_notation";
    //sails.log(sql);
    Ecoute.query(sql, function(err, res){
      if(err) console.log(err);
      return callback(null, res.rows);
    });
  },

  getNoteParEcouteDoctocare: function(option, callback){ //2
    //var sql = "select ms_note.*, ms_details_notation.libelle, ms_details_notation.ponderation from ms_note join ms_details_notation on ms_note.id_details_notation = ms_details_notation.id_details_notation where id_ecoute = '"+ option.idEcoute + "'";
    var sql = "select ms_note.*, ms_details_notation.libelle as notation, ms_details_notation.id_details_notation, ms_details_notation.ponderation, ms_details_notation.id_details_notation,ms_categorie_notation.id_categorie_notation,ms_categorie_notation.libelle as categorie, ms_categorie_notation.icone as icone, ms_categorie_notation.couleur_icone as couleur FROM ms_note JOIN ms_details_notation ON ms_note.id_details_notation = ms_details_notation.id_details_notation JOIN ms_categorie_notation ON ms_categorie_notation.id_categorie_notation = ms_details_notation.id_categorie_notation WHERE id_ecoute = '"+ option.idEcoute + "' AND ms_details_notation.type_appel=9 ORDER BY ms_categorie_notation.id_categorie_notation,ms_details_notation.id_details_notation";
    //sails.log(sql);
    Ecoute.query(sql, function(err, res){
      if(err) console.log(err);
      return callback(null, res.rows);
    });
  },

  getNoteParEcouteTpmep: function(option, callback){ //2
    //var sql = "select ms_note.*, ms_details_notation.libelle, ms_details_notation.ponderation from ms_note join ms_details_notation on ms_note.id_details_notation = ms_details_notation.id_details_notation where id_ecoute = '"+ option.idEcoute + "'";
    var sql = "select ms_note.*, ms_details_notation.libelle as notation, ms_details_notation.id_details_notation, ms_details_notation.ponderation, ms_details_notation.id_details_notation,ms_categorie_notation.id_categorie_notation,ms_categorie_notation.libelle as categorie, ms_categorie_notation.icone as icone, ms_categorie_notation.couleur_icone as couleur FROM ms_note JOIN ms_details_notation ON ms_note.id_details_notation = ms_details_notation.id_details_notation JOIN ms_categorie_notation ON ms_categorie_notation.id_categorie_notation = ms_details_notation.id_categorie_notation WHERE id_ecoute = '"+ option.idEcoute + "' AND ms_details_notation.type_appel=10 ORDER BY ms_categorie_notation.id_categorie_notation,ms_details_notation.id_details_notation";
    //sails.log(sql);
    Ecoute.query(sql, function(err, res){
      if(err) console.log(err);
      return callback(null, res.rows);
    });
  },

  getNoteParEcouteBriant: function(option, callback){ //2
    //var sql = "select ms_note.*, ms_details_notation.libelle, ms_details_notation.ponderation from ms_note join ms_details_notation on ms_note.id_details_notation = ms_details_notation.id_details_notation where id_ecoute = '"+ option.idEcoute + "'";
    var sql = "select ms_note.*, ms_details_notation.libelle as notation, ms_details_notation.id_details_notation, ms_details_notation.ponderation, ms_details_notation.id_details_notation,ms_categorie_notation.id_categorie_notation,ms_categorie_notation.libelle as categorie, ms_categorie_notation.icone as icone, ms_categorie_notation.couleur_icone as couleur FROM ms_note JOIN ms_details_notation ON ms_note.id_details_notation = ms_details_notation.id_details_notation JOIN ms_categorie_notation ON ms_categorie_notation.id_categorie_notation = ms_details_notation.id_categorie_notation WHERE id_ecoute = '"+ option.idEcoute + "' AND ms_details_notation.type_appel=8 ORDER BY ms_categorie_notation.id_categorie_notation,ms_details_notation.id_details_notation";
    //sails.log(sql);
    Ecoute.query(sql, function(err, res){
      if(err) console.log(err);
      return callback(null, res.rows);
    });
  },

  getNoteParEcouteBriantAs: function(option, callback){ //2
    //var sql = "select ms_note.*, ms_details_notation.libelle, ms_details_notation.ponderation from ms_note join ms_details_notation on ms_note.id_details_notation = ms_details_notation.id_details_notation where id_ecoute = '"+ option.idEcoute + "'";
    var sql = "select ms_note.*, ms_details_notation.libelle as notation, ms_details_notation.id_details_notation, ms_details_notation.ponderation, ms_details_notation.id_details_notation,ms_categorie_notation.id_categorie_notation,ms_categorie_notation.libelle as categorie, ms_categorie_notation.icone as icone, ms_categorie_notation.couleur_icone as couleur FROM ms_note JOIN ms_details_notation ON ms_note.id_details_notation = ms_details_notation.id_details_notation JOIN ms_categorie_notation ON ms_categorie_notation.id_categorie_notation = ms_details_notation.id_categorie_notation WHERE id_ecoute = '"+ option.idEcoute + "' AND ms_details_notation.type_appel=13 ORDER BY ms_categorie_notation.id_categorie_notation,ms_details_notation.id_details_notation";
    //sails.log(sql);
    Ecoute.query(sql, function(err, res){
      if(err) console.log(err);
      return callback(null, res.rows);
    });
  },

  getNoteParEcouteIsoEole: function(option, callback){ //2
    //var sql = "select ms_note.*, ms_details_notation.libelle, ms_details_notation.ponderation from ms_note join ms_details_notation on ms_note.id_details_notation = ms_details_notation.id_details_notation where id_ecoute = '"+ option.idEcoute + "'";
    var sql = "select ms_note.*, ms_details_notation.id_type_commentaire_ggs,ms_details_notation.fait_part, ms_details_notation.libelle as notation, ms_details_notation.id_details_notation, ms_details_notation.ponderation, ms_details_notation.id_details_notation,ms_categorie_notation.id_categorie_notation,ms_categorie_notation.libelle as categorie, ms_categorie_notation.icone as icone, ms_categorie_notation.couleur_icone as couleur FROM ms_note JOIN ms_details_notation ON ms_note.id_details_notation = ms_details_notation.id_details_notation JOIN ms_categorie_notation ON ms_categorie_notation.id_categorie_notation = ms_details_notation.id_categorie_notation WHERE id_ecoute = '"+ option.idEcoute + "' AND ms_details_notation.type_appel=14 ORDER BY ms_categorie_notation.id_categorie_notation,ms_details_notation.id_details_notation";
    //sails.log(sql);
    Ecoute.query(sql, function(err, res){
      if(err) console.log(err);
      return callback(null, res.rows);
    });
  },

  getNoteParEcouteCss: function(option, callback){ //2
    //var sql = "select ms_note.*, ms_details_notation.libelle, ms_details_notation.ponderation from ms_note join ms_details_notation on ms_note.id_details_notation = ms_details_notation.id_details_notation where id_ecoute = '"+ option.idEcoute + "'";
    var sql = "select ms_note.*, ms_details_notation.libelle as notation, ms_details_notation.id_details_notation, ms_details_notation.ponderation, ms_details_notation.id_details_notation,ms_categorie_notation.id_categorie_notation,ms_categorie_notation.libelle as categorie, ms_categorie_notation.icone as icone, ms_categorie_notation.couleur_icone as couleur FROM ms_note JOIN ms_details_notation ON ms_note.id_details_notation = ms_details_notation.id_details_notation JOIN ms_categorie_notation ON ms_categorie_notation.id_categorie_notation = ms_details_notation.id_categorie_notation WHERE id_ecoute = '"+ option.idEcoute + "' AND ms_details_notation.type_appel=11 ORDER BY ms_categorie_notation.id_categorie_notation,ms_details_notation.id_details_notation";
    //sails.log(sql);
    Ecoute.query(sql, function(err, res){
      if(err) console.log(err);
      return callback(null, res.rows);
    });
  },

  getNoteParEcouteLamie: function(option, callback){ //2
    //var sql = "select ms_note.*, ms_details_notation.libelle, ms_details_notation.ponderation from ms_note join ms_details_notation on ms_note.id_details_notation = ms_details_notation.id_details_notation where id_ecoute = '"+ option.idEcoute + "'";
    var sql = "select ms_note.*, ms_details_notation.libelle as notation, ms_details_notation.id_details_notation, ms_details_notation.ponderation, ms_details_notation.id_details_notation,ms_categorie_notation.id_categorie_notation,ms_categorie_notation.libelle as categorie, ms_categorie_notation.icone as icone, ms_categorie_notation.couleur_icone as couleur FROM ms_note JOIN ms_details_notation ON ms_note.id_details_notation = ms_details_notation.id_details_notation JOIN ms_categorie_notation ON ms_categorie_notation.id_categorie_notation = ms_details_notation.id_categorie_notation WHERE id_ecoute = '"+ option.idEcoute + "' AND ms_details_notation.type_appel=12 ORDER BY ms_categorie_notation.id_categorie_notation,ms_details_notation.id_details_notation";
    //sails.log(sql);
    Ecoute.query(sql, function(err, res){
      if(err) console.log(err);
      return callback(null, res.rows);
    });
  },

  getBesoinFormationEcoute: function(option, callback){
    //var sql = "select ms_note.*, ms_details_notation.libelle, ms_details_notation.ponderation from ms_note join ms_details_notation on ms_note.id_details_notation = ms_details_notation.id_details_notation where id_ecoute = '"+ option.idEcoute + "'";
    var sql = "select francais_formation, metier_formation, conformite_mail, iso_eole_formation FROM ms_ecoute WHERE id_ecoute = '"+ option.idEcoute + "' ";
    Ecoute.query(sql, function(err, res){
      if(err) console.log(err);
      return callback(null, res.rows);
    });
  },

  getEcoute: function(option, callback){
    //var sql = "select ms_note.*, ms_details_notation.libelle, ms_details_notation.ponderation from ms_note join ms_details_notation on ms_note.id_details_notation = ms_details_notation.id_details_notation where id_ecoute = '"+ option.idEcoute + "'";
    var sql = "select * FROM ms_ecoute WHERE id_ecoute = '"+ option.idEcoute + "' ";
    Ecoute.query(sql, function(err, res){
      if(err) console.log(err);
      return callback(null, res.rows);
    });
  },

  //select besoin_formation, commentaire_formation from ms_ecoute where id_ecoute = 201;

// verifier numero enregistrement
  verifierNumeroEnregistrement: function(option, callback){
    var sql = "select numero_enregistrement from ms_ecoute where numero_enregistrement = '" +option.optionNum+ "' ";
    Ecoute.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getEcouteParDateIsoEole: function(option, callback){
    var sqlDate = "";
    
    if(option.optionDate != "" && option.optionDate != null && option.optionDate2 == ""){
      var temp = option.optionDate + " 03:00:00+03";
      sqlDate = " and ms_ecoute.date_enregistrement = '"+ temp + "' ";
    }
    var sql ="select "+
            "(select r_personnel.appelation as tc from r_personnel where ms_ecoute.id_pers = r_personnel.id_pers), "+
            //"(select almerys_user_new_crc.nom as tc from almerys_user_new_crc where ms_ecoute.id_pers = almerys_user_new_crc.id), "+
            "(select r_personnel.appelation "+
            "as pers_ecoute from r_personnel where ms_ecoute.id_pers_ecoute = r_personnel.id_pers),"+
            "ms_ecoute.id_ecoute, ms_ecoute.conforme, ms_ecoute.id_pers, ms_ecoute.date_enregistrement, "+
            "ms_ecoute.numero_enregistrement, ms_ecoute.francais_formation, ms_ecoute.id_mode, "+
            "ms_ecoute.metier_formation, ms_ecoute.id_mode, ms_specialite.libelle as specialite, "+
            "ms_campagne.libelle as campagne, (select ms_motif_appel.libelle from ms_motif_appel "+
            "where ms_ecoute.id_motif = ms_motif_appel.id_motif_appel),almerys_user_new.id_ce, "+
            "r_personnel.appelation as ce from ms_ecoute left join ms_note on "+
            "ms_ecoute.id_ecoute = ms_note.id_ecoute join almerys_user_new on "+
            "ms_ecoute.id_pers = almerys_user_new.matricule left join r_personnel "+
            "on almerys_user_new.id_ce = r_personnel.id_pers  left join ms_specialite "+
            "on ms_specialite.id_specialite = ms_ecoute.id_specialite  left join ms_campagne "+
            "on ms_campagne.id_campagne = ms_ecoute.id_campagne where 1=1 "+sqlDate+" "+
            "AND ms_ecoute.is_ggs = TRUE group by ms_ecoute.id_ecoute,"+
            "almerys_user_new.id_ce,r_personnel.appelation,ms_specialite.libelle, "+
            "ms_campagne.libelle order by ms_ecoute.date_enregistrement DESC ";

    Ecoute.query(sql, function(err, res){
      if(err) {
        sails.log(err);
        return callback(err);
      }else{
      return callback(null, res.rows);
      }
    });
  },

  getEcouteParDateCss: function(option, callback){
    var sqlDate = "";
    
    if(option.optionDate != "" && option.optionDate != null && option.optionDate2 == ""){
      var temp = option.optionDate + " 03:00:00+03";
      sqlDate = " and ms_ecoute.date_enregistrement = '"+ temp + "' ";
    }
    var sql ="select "+
            "(select r_personnel.appelation as tc from r_personnel where ms_ecoute.id_pers = r_personnel.id_pers), "+
            //"(select almerys_user_new_crc.nom as tc from almerys_user_new_crc where ms_ecoute.id_pers = almerys_user_new_crc.id), "+
            "(select r_personnel.appelation "+
            "as pers_ecoute from r_personnel where ms_ecoute.id_pers_ecoute = r_personnel.id_pers),"+
            "ms_ecoute.id_ecoute, ms_ecoute.conforme, ms_ecoute.id_pers, ms_ecoute.date_enregistrement, "+
            "ms_ecoute.numero_enregistrement, ms_ecoute.francais_formation, ms_ecoute.id_mode, "+
            "ms_ecoute.metier_formation, ms_ecoute.id_mode, ms_specialite.libelle as specialite, "+
            "ms_campagne.libelle as campagne, (select ms_motif_appel.libelle from ms_motif_appel "+
            "where ms_ecoute.id_motif = ms_motif_appel.id_motif_appel),almerys_user_new.id_ce, "+
            "r_personnel.appelation as ce from ms_ecoute left join ms_note on "+
            "ms_ecoute.id_ecoute = ms_note.id_ecoute join almerys_user_new on "+
            "ms_ecoute.id_pers = almerys_user_new.matricule left join r_personnel "+
            "on almerys_user_new.id_ce = r_personnel.id_pers  left join ms_specialite "+
            "on ms_specialite.id_specialite = ms_ecoute.id_specialite  left join ms_campagne "+
            "on ms_campagne.id_campagne = ms_ecoute.id_campagne where 1=1 "+sqlDate+" "+
            "AND ms_ecoute.is_css = TRUE group by ms_ecoute.id_ecoute,"+
            "almerys_user_new.id_ce,r_personnel.appelation,ms_specialite.libelle, "+
            "ms_campagne.libelle order by ms_ecoute.date_enregistrement DESC ";

    Ecoute.query(sql, function(err, res){
      if(err) {
        sails.log(err);
        return callback(err);
      }else{
      return callback(null, res.rows);
      }
    });
  },

  getEcouteParDateLamie: function(option, callback){
    var sqlDate = "";
    
    if(option.optionDate != "" && option.optionDate != null && option.optionDate2 == ""){
      var temp = option.optionDate + " 03:00:00+03";
      sqlDate = " and ms_ecoute.date_enregistrement = '"+ temp + "' ";
    }
    var sql ="select "+
            "(select r_personnel.appelation as tc from r_personnel where ms_ecoute.id_pers = r_personnel.id_pers), "+
            //"(select almerys_user_new_crc.nom as tc from almerys_user_new_crc where ms_ecoute.id_pers = almerys_user_new_crc.id), "+
            "(select r_personnel.appelation "+
            "as pers_ecoute from r_personnel where ms_ecoute.id_pers_ecoute = r_personnel.id_pers),"+
            "ms_ecoute.id_ecoute, ms_ecoute.conforme, ms_ecoute.id_pers, ms_ecoute.date_enregistrement, "+
            "ms_ecoute.numero_enregistrement, ms_ecoute.francais_formation, ms_ecoute.id_mode, "+
            "ms_ecoute.metier_formation, ms_ecoute.id_mode, ms_specialite.libelle as specialite, "+
            "ms_campagne.libelle as campagne, (select ms_motif_appel.libelle from ms_motif_appel "+
            "where ms_ecoute.id_motif = ms_motif_appel.id_motif_appel),almerys_user_new.id_ce, "+
            "r_personnel.appelation as ce from ms_ecoute left join ms_note on "+
            "ms_ecoute.id_ecoute = ms_note.id_ecoute join almerys_user_new on "+
            "ms_ecoute.id_pers = almerys_user_new.matricule left join r_personnel "+
            "on almerys_user_new.id_ce = r_personnel.id_pers  left join ms_specialite "+
            "on ms_specialite.id_specialite = ms_ecoute.id_specialite  left join ms_campagne "+
            "on ms_campagne.id_campagne = ms_ecoute.id_campagne where 1=1 "+sqlDate+" "+
            "AND ms_ecoute.is_lamie = TRUE group by ms_ecoute.id_ecoute,"+
            "almerys_user_new.id_ce,r_personnel.appelation,ms_specialite.libelle, "+
            "ms_campagne.libelle order by ms_ecoute.date_enregistrement DESC ";

    Ecoute.query(sql, function(err, res){
      if(err) {
        sails.log(err);
        return callback(err);
      }else{
      return callback(null, res.rows);
      }
    });
  },
};
