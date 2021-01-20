/**
 * Specialite.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
connection: 'ConnexionPostgresql',
  tableName: 'ms_mode',
  autoCreatedAt: false,
  autoUpdatedAt: false,

  //attributs
  attributes: {
    id_mode: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName:'id_mode'
    },

    libelle: {
      type: 'string',
      required: true,
      columnName:'libelle'
    },
  },
  /*
   * Fonction pour recuperer la liste des Modes ecoutes
   * */
  getListeMode: function(option,callback){
    var sql = 'select * from ms_mode';
    AlmerysUserNew.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },
  getListeModeCRC: function(option,callback){
    var sql = 'select * from ms_mode_crc';
    AlmerysUserNew.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },
};

