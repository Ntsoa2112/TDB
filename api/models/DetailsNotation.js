/**
 * DetailsNotation.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'ConnexionPostgresql',
  tableName: 'ms_details_notation',
  autoCreatedAt: false,
  autoUpdatedAt: false,

  //attributs
  attributes: {
    id_details_notation: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName:'id_details_notation'
    },

    libelle: {
      type: 'string',
      required: true,
      columnName:'libelle'
    },

    id_categorie_notation: {
      type: 'integer',
      required: true,
      columnName:'id_categorie_notation'
    },

    ponderation: {
      type: 'integer',
      required: true,
      columnName:'ponderation'
    },

    lg_template: {
      type: 'integer',
      columnName:'lg_template'
    },
  },
};

