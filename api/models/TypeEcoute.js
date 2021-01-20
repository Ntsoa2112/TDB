/**
 * TypeEcoute.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'ConnexionPostgresql',
  tableName: 'ms_type_ecoute',
  autoCreatedAt: false,
  autoUpdatedAt: false,

  //attributs
  attributes: {
    id_type_ecoute: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName:'id_type_ecoute'
    },

    libelle: {
      type: 'string',
      required: true,
      columnName:'libelle'
    },
  },
  /*
   * Fonction pour recuperer la liste des types ecoute
   * */
  getListeTypeEcoute: function(option,callback){
    var is_ggs = " where is_ggs = false ";
    if(option == 1){
      is_ggs = ' where is_ggs = true ';
    }
    var sql = 'select * from ms_type_ecoute ' + is_ggs;
    AlmerysUserNew.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getListeQualite: function(option,callback){
    var sql = 'select * from ms_qualite order by id asc ';
    AlmerysUserNew.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getListeConformite: function(option,callback){
    var sql = 'select * from ms_conformite order by id asc ';
    AlmerysUserNew.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getListeMotifNq: function(option,callback){
    var sql = 'select * from ms_motif_non_qualite order by id asc ';
    AlmerysUserNew.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getListeEvaluateur: function(option,callback){
    var sql = 'select * from ms_evaluateur_crc order by id asc ';
    AlmerysUserNew.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },
};

