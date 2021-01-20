/**
 * Specialite.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
connection: 'ConnexionPostgresql',
  tableName: 'ms_specialite',
  autoCreatedAt: false,
  autoUpdatedAt: false,

  //attributs
  attributes: {
    id_specialite: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName:'id_specialite'
    },

    libelle: {
      type: 'string',
      required: true,
      columnName:'libelle'
    },
  },
  /*
   * Fonction pour recuperer la liste des Motifs appels
   * */
  getListeSpecialite: function(option,callback){
    var sql = 'select * from ms_specialite WHERE is_as = FALSE';
    AlmerysUserNew.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getListeSpecialiteAS: function(option,callback){
    var sql = 'select * from ms_specialite WHERE is_as = TRUE';
    AlmerysUserNew.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getListeSpecialiteDoctocare: function(option,callback){
    var sql = 'select * from ms_specialite WHERE is_doctocare = TRUE';
    AlmerysUserNew.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getListeCampagneAS: function(option,callback){
    var sql = 'select * from ms_campagne ';
    AlmerysUserNew.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getListeMotifCRC: function(option,callback){
    var sql = 'select * from ms_motif_appel_crc ';
    AlmerysUserNew.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },
};

