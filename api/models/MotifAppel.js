/**
 * MotifAppel.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'ConnexionPostgresql',
  tableName: 'ms_motif_appel',
  autoCreatedAt: false,
  autoUpdatedAt: false,

  //attributs
  attributes: {
    id_motif_appel: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName:'id_motif_appel'
    },

    libelle: {
      type: 'string',
      required: true,
      columnName:'libelle'
    },

    is_doctocare: {
      type: 'boolean',
      columnName:'is_doctocare'
    },

    is_briant: {
      type: 'boolean',
      columnName:'is_briant'
    },

    is_codelis: {
      type: 'boolean',
      columnName:'is_codelis'
    },
  },
  /*
   * Fonction pour recuperer la liste des Motifs appels
   * */
  getListeMotifAppel: function(option,callback){
    var sql = 'select * from ms_motif_appel where is_doctocare is NULL and is_briant is NULL and is_codelis is NULL ';

    console.log(option.is_doctocare + "==================" + option.is_briant);

    if(option.is_doctocare){
      sql = 'select * from ms_motif_appel where is_doctocare = TRUE';
    }
    if(option.is_briant){
      sql = 'select * from ms_motif_appel where is_briant = TRUE';
    }
    if(option.is_codelis){
      sql = 'select * from ms_motif_appel where is_codelis = TRUE';
    }
    AlmerysUserNew.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

};

