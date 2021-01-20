/**
 * Etape.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'ConnexionPostgresql', // connexion à la base, nom du base:"ConnexionPostgresql"
  tableName: 'p_etape', // nom du table qui est associé avec le modele Test
  autoCreatedAt: false,
  autoUpdatedAt: false,

  //attributs
  attributes: {
    id_etape: { //id etape
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName:'id_etape'
    },

    libelle: { //libelle etape
      type: 'string',
      required: true,
      columnName:'libelle'
    },

    parent_etape: { //parent etape
      type: 'string',
      columnName:'parent_etape'
    }
  },

  insertVitesseQte: function(option, callback) {
    var sql = "UPDATE p_lien_oper_dossier SET vitesse="+option.vit+", " +
      "quantite_journalier ="+option.qte+" WHERE id_lien="+option.id;

    //console.log("sql=====>" + sql);

    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });

  }
};

