/**
 * NeoclesAdministration.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'ConnexionPostgresql',

  attributes: {

  },

  getAllNiveau : function(callback){
    var sql = "SELECT * FROM neo_niveau ORDER BY id";

    Neocles.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  getAllNeocles : function(callback){
    var sql = "SELECT id_pers FROM r_personnel WHERE id_departement = 23 AND actif  ORDER BY id_pers";

    Neocles.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  getUserNotSucribed : function(callback){
    var sql = "SELECT id_pers, r_personnel.nom, r_personnel.prenom, r_personnel.appelation FROM r_personnel ";
    sql += " WHERE actif AND id_departement = 23 ";
    sql += " AND id_pers NOT IN (select distinct(neo_pers_niveau.id_pers) from neo_pers_niveau  ";
    sql += " left join r_personnel on neo_pers_niveau.id_pers = r_personnel.id_pers ";
    sql += " left join neo_niveau on neo_niveau.id = neo_pers_niveau.id_niveau ";
    sql += " where actif order by neo_pers_niveau.id_pers) ORDER BY id_pers";

    Neocles.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  //retourne la liste des USERS id_pers seulement sans details
  getAllSuscribed : function(callback){
    var sql = "SELECT DISTINCT(neo_pers_niveau.id_pers) FROM neo_pers_niveau LEFT JOIN r_personnel ON r_personnel.id_pers = neo_pers_niveau.id_pers WHERE actif ORDER BY neo_pers_niveau.id_pers";

    Neocles.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  //retourne la liste des USERS id_pers seulement sans details
  getLastNiveau : function(id_pers, callback){
    var sql = "select distinct(neo_pers_niveau.id_pers), neo_pers_niveau.id ,  date, r_personnel.nom, r_personnel.prenom, r_personnel.appelation, id_niveau, neo_niveau.libelle as niveau from neo_pers_niveau ";
    sql += " left join r_personnel on neo_pers_niveau.id_pers = r_personnel.id_pers ";
    sql += " left join neo_niveau on neo_niveau.id = neo_pers_niveau.id_niveau ";
    sql += " where neo_pers_niveau.id_pers = $1  order by date DESC, neo_pers_niveau.id DESC, neo_pers_niveau.id DESC LIMIT 1";

    let param = [id_pers]

    Neocles.query(sql, param, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  //retourne la liste des USERS dan getAllSuscribed et les remplies avec les details
  getUserSucribed : function(callback){
    var retour = [];

    async.waterfall([
      
      function(callback){
        return NeoclesAdministration.getAllSuscribed(callback);
      },

      function(allSuscribed, callback){

        async.each(allSuscribed, function(suscribed, callbackSeries){

          NeoclesAdministration.getLastNiveau(suscribed.id_pers, function(err, niveau){
            if(err) return callbackSeries(err);
          
            retour.push(niveau[0]);
            return callbackSeries(null);
          });
        }, 
        function(err){
          if(err)
            return callback(err);

          return callback(null, retour);
        });
      }
    ], 
    function(err, result){
      if(err) return callback(err);

      retour = retour.sort((a, b) => {
        if(a.id_pers > b.id_pers) return 1;
        if(a.id_pers < b.id_pers) return -1;
        return 0;
      });

      return callback(null, retour);
    });
  },

  getUserSucribed_old_misy_doublon : function(callback){
    var sql = "select distinct(neo_pers_niveau.id_pers), r_personnel.nom, r_personnel.prenom, r_personnel.appelation, id_niveau, neo_niveau.libelle as niveau from neo_pers_niveau ";
    sql += " left join r_personnel on neo_pers_niveau.id_pers = r_personnel.id_pers ";
    sql += " left join neo_niveau on neo_niveau.id = neo_pers_niveau.id_niveau ";
    sql += " where actif  order by neo_pers_niveau.id_pers ";

    Neocles.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  insertNeoPersNiveau : function(id_pers, id_niveau, date, callback){

    var sql = "INSERT INTO neo_pers_niveau (id_pers, id_niveau, date) VALUES ($1, $2, $3)";
    let param = [id_pers, id_niveau, date];

    Neocles.query(sql, param, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  }

};

