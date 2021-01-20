/**
 * Personnel.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'EasyGpaoConnexion', // connexion à la base, nom du base:"EasyGpaoConnexion"
  tableName: 'r_personnel',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  autoPK: false,

  attributes: { //attribut user
    id: { //id du personnel
      type: 'integer',
      required: true,
      unique: true,
      primaryKey: true,
      columnName:'id_pers'
    },
    matricule: {
      type: 'string',
      required: true,
      unique: true,
      columnName:'matricule'
    },
    nom: {
      type: 'string',
      required: true,
      columnName:'nom'
    },
    prenom: {
      type: 'string',
      required: true,
      columnName:'prenom'
    },
    appelation: {
      type: 'string',
      required: true,
      columnName:'appelation'
    },
    adresse: {
      type: 'string',
      required: true,
      columnName:'adresse'
    },
    id_departement: {
      type: 'integer',
      required: true,
      columnName:'id_departement'
    },
    id_fonction: {
      type: 'integer',
      required: true,
      columnName:'id_fonction'
    }
  },
  //Getting data pers
  getDataPersSql: function(option, callback){

    var sql = "select r_personnel.id_pers, r_personnel.nom, r_personnel.prenom, r_personnel.cin, r_departement.libelle as departement, r_fonction.libelle as fonction from r_personnel join r_departement on r_departement.id_departement = r_personnel.id_departement join r_fonction on r_fonction.id_fonction = r_personnel.id_fonction where r_personnel.actif = true;";

    Personnel.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  // where ....
  getPersWhere: function(option, callback){
    //console.log("Fonction getPersWhere");
    //console.log("===========> OPTION MATRICULE  "+option.optionMatricule);
    //console.log("===========> OPTION MATRICULE  "+option.optionDepartement);
    //console.log("===========> OPTION MATRICULE  "+option.optionFonction);
    //console.log("===========> OPTION MATRICULE  "+option.optionPrenom);
    //console.log("===========> OPTION MATRICULE  "+option.optionDate);

    var sqlMatricule = "";
    var sqlPrenom = "";
    var sqlDepartement = "";
    var sqlFonction = "";
    var sqlDate = "";

    var sql = "";

    if(option.optionMatricule != "" ){
      sqlMatricule = " and r_personnel.id_pers = '"+ option.optionMatricule + "' ";
    }
    if(option.optionDepartement != "" ){
      sqlDepartement = " and r_personnel.id_departement = '"+ option.optionDepartement + "' ";
    }
    if(option.optionFonction != "" ){
      sqlFonction = " and r_personnel.id_fonction = '"+ option.optionFonction + "' ";
    }
    if(option.optionPrenom != "" ){
      sqlPrenom = " AND LOWER(r_personnel.appellation) like LOWER('"+ option.optionPrenom + "%') ";
    }
    if(option.optionDate != "" ){
      sqlDate = " and r_personnel.date_embauche = '"+ option.optionDate + "' ";
    }

    var sqlFiltre = sqlMatricule + sqlDepartement + sqlFonction + sqlPrenom + sqlDate;
    //console.log("===========> SQL FILTRE "+sqlFiltre);

    if(sqlFiltre != "" ){
      sql = "select r_personnel.id_pers, r_personnel.nom, r_personnel.prenom, r_personnel.appellation, "+
            "r_personnel.cin, r_departement.libelle as departement, r_fonction.libelle as fonction "+
            //"r_photo.photo "+
            "from r_personnel "+
            "join r_departement on r_departement.id_departement = r_personnel.id_departement "+
            "join r_fonction on r_fonction.id_fonction = r_personnel.id_fonction "+
            //"left join r_photo on r_personnel.id_pers = r_photo.id_pers "+
            "where r_personnel.actif = true AND NOT r_personnel.id_pers = 1 "+sqlFiltre+" "+
            "order by r_personnel.id_pers;";
    }
    else{
      sql = "select r_personnel.id_pers, r_personnel.nom, r_personnel.prenom, r_personnel.appellation, "+
            "r_personnel.cin, r_departement.libelle as departement, r_fonction.libelle as fonction "+
            //"r_photo.photo "+
            "from r_personnel "+
            "join r_departement on r_departement.id_departement = r_personnel.id_departement "+
            "join r_fonction on r_fonction.id_fonction = r_personnel.id_fonction "+
            //"left join r_photo on r_personnel.id_pers = r_photo.id_pers "+
            "where r_personnel.actif = true AND r_personnel.id_pers = 0  "+
            "order by r_personnel.id_pers;";
    }

    console.log("===========> SQL  PERSONNEL  ===> "+sql);

    Personnel.query(sql, function(err, res){
      if(err) //console.log(sql);
      sails.log(res);
      console.log("2 =====> Return res"+ res);
      return callback(null, res.rows);
    });
  },

  getListeDepartement: function(option,callback){
    var sql = 'select id_departement, libelle from r_departement order by libelle';
    Personnel.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getPhotoPers: function(id_pers,callback){
    var sql = 'select r_photo.photo '+
              'from r_personnel '+
              'left join r_photo on r_personnel.id_pers = r_photo.id_pers '+
              'where r_personnel.actif = true AND r_personnel.id_pers = '+ id_pers + ' ORDER BY r_photo.id DESC '+
              'LIMIT 1';
    console.log(sql);
    Personnel.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  getListeFonction: function(option,callback){
    var sql = 'select id_fonction, libelle from r_fonction order by libelle';
    Personnel.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

 /***   --------   GESTION PERS HIERARCHIE     --------  ***/
  getListePersonnage: function (id_pers,callback) {
   var arrayTemp = [];
   var sql_personne = "select id_sub as id_pers from r_hierarchie_par_personne where id_pers = "+id_pers;
   var sql_departement = "select DISTINCT r_personnel.id_pers from r_hierarchie LEFT JOIN r_personnel ON " +
     " (r_personnel.id_departement = r_hierarchie.id_departement " +
     " AND r_personnel.id_fonction = r_hierarchie.id_fonction) where " +
     " r_hierarchie.id_pers= "+id_pers+" AND r_personnel.actif = TRUE ORDER BY r_personnel.id_pers";
   async.parallel([
     function (callback_s1) {
       ModelEASYGPAO.query(sql_personne, function(err, res){
         if(err) return callback_s1(err);
         if(res.rows) {
           res.rows.forEach(function(id_p){
             arrayTemp.push(id_p.id_pers);
           });
         }
         return callback_s1(null, res.rows);
       });
     },
     function (callback_s2) {
       ModelEASYGPAO.query(sql_departement, function(err, res){
         if(err) return callback_s2(err);
         if(res.rows) {
           res.rows.forEach(function(id_p){
             arrayTemp.push(id_p.id_pers);
           });
         }
         return callback_s2(null, res.rows);
       });
     }
   ],function(err, ValeurDuRetour){
     if(arrayTemp.length == 0)
     {
       arrayTemp.push(0);
     }
     //console.log(arrayTemp);
     return callback(null,arrayTemp);
   });

 },

 /*** ----- RECUPERATION LISTE MATRICULE AFFECTER DOSSIER SOLIMU ----- ***/
  getListUserSolimu: function(callback) {
   var sql = 'select id_pers from p_affectation where id_dossier = 951 AND id_pers IN (814,943,1241,177) GROUP BY id_pers ORDER BY id_pers';
   Ldt.query(sql, function(err, res){
     if(err) return callback(err);
     return callback(null, res.rows);//
   });
 }

};

