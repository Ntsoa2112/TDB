/**
 * Note.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'ConnexionPostgresql',
  tableName: 'ms_note',
  autoCreatedAt: false,
  autoUpdatedAt: false,

  //attributs
  attributes: {
    id_note: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName:'id_note'
    },

    id_details_notation: {
      type: 'integer',
      required: true,
      columnName:'id_details_notation'
    },

    commentaire: {
      type: 'string',
      //required: true,
      columnName:'commentaire'
    },

    note: {
      type: 'float',
      //required: true,
      columnName:'note'
    },

    id_ecoute: {
      type: 'integer',
      required: true,
      columnName:'id_ecoute'
    },

    type_commentaire_ggs: {
      type: 'string',
      //required: true,
      columnName:'type_commentaire_ggs'
    },
  },
};

