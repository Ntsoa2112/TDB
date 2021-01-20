/**
 * GestionHoraire.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
module.exports = {
  connection: 'ConnexionPostgresql',
  tableName: 'almerys_p_lot',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  autoPK: false,
  attributes: {

  },

  //WHERE (start_date, end_date) OVERLAPS ('2012-01-01'::DATE, '2012-04-12'::DATE)
  //and (date_deb_ldt)::timestamp BETWEEN ('2016-11-14 '||p_ldt.h_deb)::timestamp and('2016-11-24 '||p_ldt.h_fin)::timestamp
  //and date_deb_ldt = '" + option.dateess + "'


  /*
   SELECT SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree,
   date_deb_ldt as date_ldt, r_personnel.matricule as matricule, r_personnel.nom as nom, r_personnel.prenom as prenom
   from p_ldt
   LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient
   LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien
   LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers
   where 1=1 and p_ldt.id_type_ldt = 0 and (date_deb_ldt)::timestamp BETWEEN ('20161103 '||p_ldt.h_deb)::timestamp and('20161106 '||p_ldt.h_fin)::timestamp
   group by r_personnel.id_pers, p_ldt.id_pers, p_ldt.date_deb_ldt
   */

   getNomPrenom: function(option, callback){ // AND p_ldt.id_pers = "+option.idPers+"
    var sql = "SELECT r_personnel.id_pers, r_personnel.nom, r_personnel.prenom from r_personnel"; // where r_personnel.id_pers = '" + option.matricule + " '
    GestionHoraire.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  getListPers: function(option, callback){ // AND p_ldt.id_pers = "+option.idPers+"
     // ADD HIERARCHIE CHECK --
    var StringarrayHierarchie = option.req.session.array_pers_hierarchie.join(",");
    var stringView = "0,"+ StringarrayHierarchie;
    console.log(stringView);
    var sql = "SELECT r_personnel.*,r_departement.libelle as dep,r_equipe.horaire_journaliere from r_personnel " +
      " join r_departement on r_departement.id = r_personnel.id_departement " +
      " join r_equipe on r_equipe.id_equipe = r_personnel.id_eq " +
      " where actif=true AND r_personnel.id_departement="+option.id_departement+" AND r_personnel.id_pers IN ("+stringView+") ORDER BY id_pers";
    // where r_personnel.id_pers = '" + option.matricule + " '
    //console.log(sql);
    GestionHoraire.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  getListPersMultiDep: function(option, callback){ // AND p_ldt.id_pers = "+option.idPers+"
    var sql = "SELECT r_personnel.*,r_departement.libelle as dep,r_equipe.horaire_journaliere from r_personnel " +
      " join r_departement on r_departement.id = r_personnel.id_departement " +
      " join r_equipe on r_equipe.id_equipe = r_personnel.id_eq " +
      " where actif=true AND r_personnel.id_departement IN ("+option.id_departement+") ORDER BY id_pers";
    // where r_personnel.id_pers = '" + option.matricule + " '
    //console.log(sql);
    GestionHoraire.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  // GET LIST PERS MULTI DEP PAR EQUIPE
  getListPersMultiDepPerEquipe: function(option,req,callback){
     option.groupe = option.id_groupe;
    async.series([
      function(callback){
        Dossier.groupeDe(option,callback);
      }
    ],function(err,ListPers){
      async.series([
        function(callback)
        {
          var string_return="";
          var arrayHierarchiePers = req.session.array_pers_hierarchie;
          string_return = "0,";
          ListPers[0].forEach(function(PersV){
            arrayHierarchiePers.forEach(function(PersH){
              if(PersV.id_pers.toString().trim() == PersH.toString().trim())
              {
                string_return+= PersV.id_pers+",";
              }
            });
          });
          string_return = string_return.slice(0, -1);
          callback(null,string_return);
        }
      ],function(err,StringReturn){
        var listIdPers = StringReturn[0];
       // console.log(listIdPers);
        var sql = "SELECT r_personnel.*,r_departement.libelle as dep,r_equipe.horaire_journaliere from r_personnel " +
          " join r_departement on r_departement.id = r_personnel.id_departement " +
          " join r_equipe on r_equipe.id_equipe = r_personnel.id_eq " +
          " where actif=true AND r_personnel.id_pers IN ("+listIdPers+") ORDER BY id_pers";
        // AND r_personnel.id_departement IN ("+option.id_departement+")
        // where r_personnel.id_pers = '" + option.matricule + " '
        //console.log(sql);
        GestionHoraire.query(sql, function(err, res){
          if(err) return callback(err);
          return callback(null, res.rows);
        });
      });
    });
  },

  getPole: function(option, callback){ // AND p_ldt.id_pers = "+option.idPers+"
    var sql = "SELECT * FROM r_departement ORDER BY libelle"; // where r_personnel.id_pers = '" + option.matricule + " '
    GestionHoraire.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  /**
   * Get liste horaire by pers
   *
   */
  getHoraireByPersDate: function(option, callback){ // AND p_ldt.id_pers = "+option.idPers+"
    var sql = "SELECT id, date, id_pers, heure_travaille,heure_conge,date " +
      " FROM r_heure_travaille where date='"+option.date+"' and id_pers = "+option.id_pers+" "; // where r_personnel.id_pers = '" + option.matricule + " '

    //sails.log(sql);
    GestionHoraire.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  getHoraireJournaliereByEq: function(option, callback){ // AND p_ldt.id_pers = "+option.idPers+"
    var sql = "SELECT horaire_journaliere from r_equipe where id_equipe =  "+option.id_eq+" "; // where r_personnel.id_pers = '" + option.matricule + " '

    //sails.log(sql);
    GestionHoraire.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  getRealHoraireByPersDate: function(option, callback){ // AND p_ldt.id_pers = "+option.idPers+"
    var sql = "SELECT * " +
      " FROM r_pointage_jour   "  +
      " LEFT JOIN r_heure_sup ON (id_pers=id_util AND to_date(\"date\",'DD/MM/YYYY')= to_date(pdate,'YYYY/MM/DD')) " +
      " where pdate='"+option.date+"' and id_util = "+option.id_pers+" "; // where r_personnel.id_pers = '" + option.matricule + " '


    sails.log(sql);
    GestionHoraire.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },




  getSemaine: function(option, callback){ // AND p_ldt.id_pers = "+option.idPers+"
    var sql = " select * from r_semaine where to_date('"+option+"','DD/MM/YYY') between to_date(date_debut,'DD/MM/YYY') AND  to_date(date_fin,'DD/MM/YYY') "; // where r_personnel.id_pers = '" + option.matricule + " '

    //sails.log(sql);
    ModelEASYGPAO.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },
  getSemaineId: function(option, callback){ // AND p_ldt.id_pers = "+option.idPers+"
    var sql = " select * from r_semaine where id="+option.id_sem; // where r_personnel.id_pers = '" + option.matricule + " '

    //sails.log(sql);
    ModelEASYGPAO.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  getSemaineMultiple: function(option, callback){ // AND p_ldt.id_pers = "+option.idPers+"
    var sql = " select * from r_semaine where num_semaine IN("+option.id_sem+")"; // where r_personnel.id_pers = '" + option.matricule + " '

    //sails.log(sql);
    ModelEASYGPAO.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  getListSemaine: function (option,next) {
    var dateNowLoc = new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);
    var dtSplit = dateNowLoc.split('/');
    var dateNow = dtSplit[2]+"/"+dtSplit[1]+"/"+dtSplit[0];

    async.series([
      function(callback){
        GestionHoraire.getSemaine(dateNow,callback);
      }
    ],function (err,result) {
      if(err){
        return next(err);
      }else{
       // "select * from r_semaine where num_semaine<="+result[0][0].num_semaine+" order by id desc"
        var sql = "select * from r_semaine where num_semaine IS NOT NULL order by id desc";
     //   var sql = "select * from r_semaine where num_semaine<="+result[0][0].num_semaine+" order by id desc";
        //sails.log(sql);
        ModelEASYGPAO.query(sql, function(err, res){
          if(err) {
            return next(err);
          }else{
            return next(null, res.rows);
          }

        });
      }
    })
  },


  insertHoraireByPersDate: function(option, callback){ // AND p_ldt.id_pers = "+option.idPers+"
    var sql = "INSERT INTO " +
      "  r_heure_travaille (date,id_pers,heure_travaille,heure_conge) values ('"+option.date+"', "+option.id_pers+","+option.heure_travaille+","+option.heure_conge+") "; // where r_personnel.id_pers = '" + option.matricule + " '

    //sails.log(sql);
    GestionHoraire.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, true);
    });
  },

  updateHoraireByPersDate: function(option, callback){ // AND p_ldt.id_pers = "+option.idPers+"
    var sql = "UPDATE  " +
      "  r_heure_travaille SET heure_travaille='"+option.heure_travaille+"', heure_conge='"+option.heure_conge+"' where date='"+option.date+"' and id_pers ="+option.id_pers+" "; // where r_personnel.id_pers = '" + option.matricule + " '

    //sails.log(sql);
    GestionHoraire.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, true);
    });
  },


  getHoraireParDate: function(option, callback){ // AND p_ldt.id_pers = "+option.idPers+"
    var sql = "SELECT SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree,"
    +"date_deb_ldt as dateldt, r_personnel.matricule as matricule, r_personnel.nom as nom, r_personnel.prenom as prenom "
    +"from p_ldt "
    +"LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient "
    +"LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien "
    +"LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers "
    //+"where 1=1 and p_ldt.id_type_ldt = 0 and (date_deb_ldt)::timestamp BETWEEN ('20170102 '||p_ldt.h_deb)::timestamp and('20170106 '||p_ldt.h_fin)::timestamp "
    +"where 1=1 and p_ldt.id_type_ldt = 0 and p_ldt.date_deb_ldt='20190716' "
	/*and (date_deb_ldt)::timestamp BETWEEN ('" + option.dateess + " '||p_ldt.h_deb)::timestamp and('" + option.dateess2 + " '||p_ldt.h_fin)::timestamp " */
    +"group by r_personnel.id_pers, p_ldt.id_pers, p_ldt.date_deb_ldt order by p_ldt.date_deb_ldt";
	console.log("TEST SQL "+sql);
    GestionHoraire.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  getNombreLotParDate: function(option, callback){
    var sql = "SELECT"+
        " p_lot_client.libelle  AS lib," +
        " p_ldt.id_lotclient  AS idlotclient,"+
        " p_etape.libelle  AS libel,"+
        " p_etape.id_etape  AS etape"+
        " , COUNT(p_lot.id_etape ) AS nb,"+
        " p_ldt.date_deb_ldt AS date " +
        "FROM p_ldt " +
        "LEFT JOIN p_lot ON p_lot.id_lot=p_ldt.id_lot " +
        "INNER JOIN p_lot_client ON p_lot.id_lotclient = p_lot_client.id_lotclient " +
        "LEFT JOIN p_lien_oper_dossier ON p_lot.id_etape=p_lien_oper_dossier.id_lien " +
        "LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape " +
        "WHERE p_lot_client.id_dossier = "+option.id_dossier+" AND to_date(date_deb_ldt,'yyyymmdd') between to_date('"+option.date_prime+"','yyyymmdd') and to_date('"+option.date_deb+"','yyyymmdd') " +
        "GROUP BY " +
        "p_lot_client.libelle, " +
        "p_etape.libelle,p_etape.id_etape, " +
        "p_ldt.id_lotclient," +
        "p_ldt.date_deb_ldt " +
        "ORDER BY p_ldt.date_deb_ldt ASc,p_ldt.id_lotclient";

    AlmerysCall.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  setSeparator : function (dateString, callback) {
    var dateSplit = dateString.split("");
    var dateArray = JSON.parse("[" + dateSplit + "]");
    //console.log(dateArray[2]);
    //console.log("Taille date array "+dateArray.length);
    var dateSeparatedArray = new Array(dateArray.length + 3);
    dateSeparatedArray[0] = dateArray[0];
    dateSeparatedArray[1] = dateArray[1];
    dateSeparatedArray[2] = dateArray[2];
    dateSeparatedArray[3] = dateArray[3];
    dateSeparatedArray[4] = "-";
    dateSeparatedArray[5] = dateArray[4];
    dateSeparatedArray[6] = dateArray[5];
    dateSeparatedArray[7] = "-";
    dateSeparatedArray[8] = dateArray[6];
    dateSeparatedArray[9] = dateArray[7];
    //console.log("Separated date "+dateSeparatedArray);
    var dateSeparatedString = dateSeparatedArray.join("");
    //console.log(" Separated date string ==> "+dateSeparatedString);
    var finalDate = new Date(dateSeparatedString);
    //console.log(finalDate);
    return callback(null, dateSeparatedString);
  },


  getUpdatePointageJour : function (option,callback) {
    var sql = "SELECT * " +
      " FROM r_pointage_jour where pdate='"+option.date+"' and id_util = "+option.id_pers+" "; // where r_personnel.id_pers = '" + option.matricule + " '

    sails.log(sql);
    GestionHS.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  // Fonction pour veerifier si un departement peut avoir majoration
  checkIfHaveMajoration: function (id_response,booleanDep,callback) {
    var sql = 'select id_pers from r_personnel LEFT JOIN r_departement ON r_departement.id = r_personnel.id_departement where id_pers= '+id_response+' and have_majoration';
    if(booleanDep)
    {
      sql= 'select * from r_departement where have_majoration and id='+id_response;
    }
  //  console.log("e "+sql);
    var boolean_return=false;
    GestionHS.query(sql, function (err, res) {
      if (err) return callback(err);
      if(res.rows.length != 0)
      {
        boolean_return=true;
      }
      return callback(null, boolean_return);
    });
  },
  // Fonction recuperation Heure Sup
  getPersHCHeureSup: function (callback){
    var sql= "SELECT * FROM r_hc_heure_sup";
    GestionHS.query(sql, function (err, res) {
      if (err) return callback(err);
      var array = [];
      res.rows.forEach(function(objet){
        array.push(objet.id_pers);
      });
      return callback(null, array);
    });
  }

};

