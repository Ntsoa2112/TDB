/**
 * NeoclesReporting.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'ConnexionPostgresql',

  attributes: {

  },

  getIso : function(id_equipe, id_type_masque, callback){
    var sql = "SELECT * FROM neo_iso ";
    sql += " WHERE id_equipe = $1 AND id_type_masque = $2";
    
    let param = [id_equipe, id_type_masque];
    Neocles.query(sql, param, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  getNiveau : function(idPers, date, callback){
    var sql = "SELECT * from neo_pers_niveau LEFT JOIN neo_niveau on neo_niveau.id = neo_pers_niveau.id_niveau WHERE id_pers = $1 AND date <= $2 order by date desc, neo_pers_niveau.id DESC LIMIT 1";
    let param = [idPers, date + ""];

    Neocles.query(sql, param, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows[0]);
    });
  },

  getIsoDetails : function(id_pers, id_type_masque, date, callback){
    async.waterfall([
      function (callback){
        NeoclesReporting.getNiveau(id_pers, date, callback)
      },

      function(niveau, callback){
        NeoclesReporting.getIso(niveau.id_equipe, id_type_masque, callback);
      }
    ], 
    function(err, resultat){
      if(err) return callback(err);

      return callback(null, resultat);
    });
  },

  getEcouteNCAnnuelle : function(idPers, idTypeMasque, date, callback){
    let year = date.substring(0,4);

    var sql = "select id_pers, note_total, seuille, extract(MONTH FROM date_enregistrement) AS mois from neo_ecoute where id_pers = $1 AND id_type_ecoute = $2 AND extract(YEAR FROM date_enregistrement) = $3 AND note_total < seuille ORDER BY date_enregistrement, id";
    let param = [idPers, idTypeMasque, year];

    Neocles.query(sql, param, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },
  

  getAllMoisWithDataOfYear : function(idPers, idTypeMasque, date, callback){
    let year = date.substring(0,4);

    var sql = "select distinct(extract(MONTH FROM date_enregistrement)) AS mois from neo_ecoute where id_pers = $1 AND id_type_ecoute = $2 AND extract(YEAR FROM date_enregistrement) = $3  ORDER BY extract(MONTH FROM date_enregistrement)";
    let param = [idPers, idTypeMasque, year];

    Neocles.query(sql, param, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  getConformiteMensuelle : function(id_pers, id_type , date, callback){
    async.series([
      function (callback) {
          NeoclesReporting.getEcouteNCAnnuelle(id_pers, id_type , date, callback);
      },

      function(callback){
          NeoclesReporting.getIsoDetails(id_pers, id_type , date, callback);
      },
      function(callback){
          NeoclesReporting.getAllMoisWithDataOfYear(id_pers, id_type , date, callback);
      }
    ], 
    function (err, results) {
        if (err) return callback("Erreur de requete");

        let retour = {
            data : results[0],
            iso : results[1],
            mois : results[2]
        }

        return callback(null, retour);
    });
  },

  getEcouteAnnuelleParEquipe : function(id_equipe, idTypeMasque, date, callback){
    let year = date.substring(0,4);

    var sql = "SELECT neo_ecoute.id_pers, appelation, note_total, neo_ecoute.seuille, extract(MONTH FROM date_enregistrement) AS mois FROM neo_ecoute";
    sql += " LEFT JOIN neo_niveau ON neo_niveau.id = neo_ecoute.id_niveau "
    sql += " LEFT JOIN r_personnel ON neo_ecoute.id_pers = r_personnel.id_pers "
    sql += " WHERE id_equipe = $1 AND id_type_ecoute = $2 AND extract(YEAR FROM date_enregistrement) = $3  ORDER BY date_enregistrement, neo_ecoute.id";
    let param = [id_equipe, idTypeMasque, year];

    Neocles.query(sql, param, function(err, res){
      if(err) return callback(err);

      return callback(null, res.rows);
    });
  },

  getConformiteParEquipeMensuelle : function(id_equipe, id_type , date, callback){
    async.series([
      function (callback) {
          NeoclesReporting.getEcouteAnnuelleParEquipe(id_equipe, id_type , date, callback);
      },

      function(callback){
          NeoclesReporting.getIso(id_equipe, id_type , callback);
      }
    ], 
    function (err, results) {
        if (err) return callback("Erreur de requete");

        let retour = {
            data : results[0],
            iso : results[1]
        }

        return callback(null, retour);
    });    
  }

};

