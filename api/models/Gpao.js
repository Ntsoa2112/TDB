/**
 * Gpao.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  },

  //recuper droit d'access Tableau de bord

  getDroit : function (id_pers, next) {
    var requete = "select nivaux from tdb_gestion_access where id_pers = "+id_pers+ " limit 1; ";
    Pointage.query(requete, function(err, res){
      if(err) return next(err);
      return next(null, res.rows);
    });

  }
};

