/**
 * Niveau.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'ConnexionPostgresql',
  tableName: 'ms_niveau',
  autoCreatedAt: false,
  autoUpdatedAt: false,

  //attributs
  attributes: {
    id_niveau: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName:'id_niveau'
    },

    libelle: {
      type: 'string',
      required: true,
      columnName:'libelle'
    },
  },
};

