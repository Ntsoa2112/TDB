/**
 * MotifNonConformite.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'ConnexionPostgresql',
  tableName: 'ms_motif_non_conformite',
  autoCreatedAt: false,
  autoUpdatedAt: false,

  //attributs
  attributes: {
    id_motif_non_conformite: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName:'id_motif_non_conformite'
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
  getListeMotifNonConformite: function(option,callback){
    var sql = 'select * from ms_motif_non_conformite';
    AlmerysUserNew.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },
};

