/**
 * ReservationSalle.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'EasyGpaoConnexion', // connexion à la base, nom du base:"ConnexionPostgresql"
  tableName: 'r_departement', // nom du table qui est associé avec le modele Test
  autoCreatedAt: false,
  autoUpdatedAt: false,
  autoPK: false,

  attributes: { //attribut user
    id_departement: { //id de la reservation
      type: 'integer',
      required: true,
      unique: true,
      primaryKey: true,
      columnName: 'id_departement'
    },
    libelle: { //Objet de la reservation
      type: 'string',
      required: true,
      unique: false,
      columnName: 'libelle'
    },
    id_responsable: { //MATRICULE
      type: 'integer',
      required: true,
      columnName: 'id_responsable'
    }
  },
  getDepartement: function (req, next) {

    console.log("\n********DEPARTEMENT***********\n")
    var query = 'SELECT libelle, id FROM r_departement order by libelle;';
    console.log(query);
    console.log("\n********fin  DEPARTEMENT***********\n")
  Dossier.query(query, function (err, res) {
    if (err) return next(err);
    return next(null, res.rows);
  });
  },
};
/**
 * Created by 8037 on 04/11/2016.
 */
