/**
 * ModelEASYGPAO.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'EasyGpaoConnexion',
  tableName: 'r_conge',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  autoPK: false,
  attributes: {
    id : { type: 'integer' }
  },//selection de liste de conge dans la base easyGPAO avec parametre date
  listCongeParDate: function(option, callback){
    var sql = "select id_pers, date_debut,motif, date_fin,type_conge " +
      "From r_conge WHERE 1=1 " +
      "AND to_date(date_debut,'dd/mm/yyyy') <= to_date('"+option.datesess+"','yyyymmdd') " +
      "AND to_date(date_fin,'dd/mm/yyyy')>= to_date('"+option.datesess+"','yyyymmdd')  ORDER BY type_conge";

      ModelEASYGPAO.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },


  // selection des dossiers par lapse de date et matricule
  listCongeParDateId: function(option, callback){

    /*var criteria = {
      date_debut : {
        '<=': new Date(option.datedeb)
      },
      date_fin : {
        '>=': new Date(option.datefin)
      }
    };*/
    var sql = "select id_pers, date_debut,motif, date_fin,type_conge,decision_dir,decision_niv_sup " +
      "From r_conge WHERE 1=1 " +
      "AND id_pers = "+option.id_pers+" " +
      "AND to_date(date_debut,'dd/mm/yyyy') <= to_date('"+option.datedeb+"','yyyymmdd') " +
      "AND to_date(date_fin,'dd/mm/yyyy')>= to_date('"+option.datefin+"','yyyymmdd')";

    ModelEASYGPAO.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  // calcule de delai en heure du conge d'une personne
  getCongeParDateId: function(option, callback){

    var sql = "select * from get_heure_conge_spe("+option.id_pers+",'"+option.datedeb+"')";

    ModelEASYGPAO.query(sql, function(err, res){
      if(err) return callback(err);
      ////console.log(sql);
      ////console.log("spe========================>"+JSON.stringify(res.rows))
      return callback(null, res.rows[0].get_heure_conge_spe);
    });
  },

  // calcule de delai en heure du conge maladie
  getCongeMedParDateId: function(option, callback){

    var sql = "select * from get_heure_conge_Maladie("+option.id_pers+",'"+option.datedeb+"')";
   // //console.log(sql);
    ModelEASYGPAO.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows[0].get_heure_conge_Maladie);
    });
  },
  addRpointage: function(option, callback){
    //date : 26/12/2016
    var sql = "INSERT INTO r_pointage " +
      "(id_pers,date,heure,id_pointeuse,date_modif,id_pers_modif,commentaire_modif)" +
      " VALUES " +
      " ("+option.id_pers+",'"+option.date_easy+"','"+option.heure+"',"+option.id_pointeuse+",'"+option.date_modif+"',"+option.id_pers_modif+",'"+option.commentaire+"')";
    //console.log("r_pointage ea=="+sql);
    ModelEASYGPAO.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, true);
    });
  },

  //getting stat conge by date and by id pers
  getStCongeParDate: function(option, callback){
    var sql = "select id_pers, date_debut, date_fin,type_conge " +
      "From r_conge WHERE 1=1 " +
      "AND id_pers = "+option.id_pers+" " +
      "AND to_date(date_debut,'dd/mm/yyyy') <= to_date('"+option.date+"','yyyymmdd') " +
      "AND to_date(date_fin,'dd/mm/yyyy')>= to_date('"+option.date+"','yyyymmdd')  ORDER BY type_conge";
  //  //console.log(sql);
    ModelEASYGPAO.query(sql, function(err, res){
      if(err) return callback(err);

      if(res.rows.length != 0){
        return callback(null, res.rows[0].type_conge);
      }else{
        return callback(null, "");
      }

    });
  },

  //pour savoir si l'utilisateur est un formatteur
  isFormateur : function(id_pers, callback){
    var sql = "SELECT is_formateur FROM r_personnel LEFT JOIN r_fonction ON r_personnel.id_fonction = r_fonction.id_fonction WHERE id_pers = $1";
    let param = [id_pers];
    
    ModelEASYGPAO.query(sql, param, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows[0].is_formateur);
    });
  }

};

