/**
 * ListErreur.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'ConnexionPostgresql',
  tableName: 'almerys_type_erreur',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {

    id: {
      type: 'integer',
      columnName:'id'
    },
    libelle: {
      type: 'string',
      required: true,
      columnName:'libelle'
    },

    id_etat: {
      type: 'integer',
      required: true,
      columnName:'id_etat'
    },
    id_pole_new: {
      type: 'integer',
      required: true,
      columnName:'id_pole_new'
    },
  }
};

