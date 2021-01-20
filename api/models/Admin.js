/**
 * Almerys.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    },
  // Recuperation liste personne ACCes HR
  getListePersonneAccesHR: function(callback){
    var query = " SELECT DISTINCT tdb_droit_gestion.id_pers,appelation FROM tdb_droit_gestion LEFT JOIN r_personnel ON r_personnel.id_pers= tdb_droit_gestion.id_pers " +
   " GROUP BY tdb_droit_gestion.id_pers,appelation ORDER BY tdb_droit_gestion.id_pers ";
    Ldt.query(query, function(err,res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },
  // Recuperation liste departement affecter a une personne
  getListeDepartementAccesHRParPers: function(option,callback){
    var query = " SELECT tdb_droit_gestion.id,libelle FROM tdb_droit_gestion LEFT JOIN r_departement ON r_departement.id = tdb_droit_gestion.id_privilege "+
   " where tdb_droit_gestion.id_pers= "+option.id_pers+" AND id_type=1 ORDER BY libelle";
    Ldt.query(query, function(err,res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },
  // Recuperation liste departement non affecter a une personne
  getListeDepartementNonAccesHRParPers: function(option,callback){
    var query = "SELECT id,libelle FROM r_departement WHERE r_departement.id NOT IN " +
      " (SELECT tdb_droit_gestion.id_privilege from tdb_droit_gestion where tdb_droit_gestion.id_pers= "+option.id_pers+" AND id_type=1) " +
      " ORDER BY r_departement.id ";
    Ldt.query(query, function(err,res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },
  // GET LISTE EQUIPE AFFECTER => filtre
  getListeEquipeAccesHRParPers: function(option,callback){
    var query = " SELECT tdb_droit_gestion.id,r_personnel.id_pers,appelation FROM tdb_droit_gestion " +
      "LEFT JOIN r_personnel ON r_personnel.id_pers=tdb_droit_gestion.id_privilege " +
      "  WHERE tdb_droit_gestion.id_pers= "+option.id_pers+" AND id_type=2 ";
    Ldt.query(query, function(err,res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },
  // GET LISTE EQUIPE NON AFFECTER => filtre
  getListeEquipeNonAccesHRParPers: function(option,callback){
    async.series([
      function (cb_new) {
        Admin.getListeEquipeAccesHRParPers(option,cb_new);
      }
    ],function(err,retournewCB){
      var requete_filtre = "";
      if(retournewCB[0].length > 0) {
        requete_filtre = " AND id_pers not in (";
        retournewCB[0].forEach(function (personne) {
          requete_filtre += personne.id_pers+",";
        });
        requete_filtre += "0) ";
        var query = " SELECT id_pers,appellation as appelation FROM r_personnel LEFT JOIN r_fonction ON r_fonction.id_fonction = " +
          "r_personnel.id_fonction " +
       " WHERE actif=TRUE "+requete_filtre+" AND is_cp ORDER BY id_pers ASC";
        console.log(query);
        ModelEASYGPAO.query(query, function(err,res){
          if(err) return callback(err);
          return callback(null, res.rows);
        });
      }
      else
      {
        var query = " SELECT id_pers,appellation as appelation FROM r_personnel LEFT JOIN r_fonction ON r_fonction.id_fonction = " +
          "r_personnel.id_fonction " +
          " WHERE actif=TRUE "+requete_filtre+" AND is_cp ORDER BY id_pers ASC";
        ModelEASYGPAO.query(query, function(err,res){
          if(err) return callback(err);
          return callback(null, res.rows);
        });
      }
    });
  },

};

