/**
 * CategorieNotation.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'ConnexionPostgresql',
  tableName: 'ms_categorie_notation',
  autoCreatedAt: false,
  autoUpdatedAt: false,

  //attributs
  attributes: {
    id_categorie_notation: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName:'id_categorie_notation'
    },

    libelle: {
      type: 'string',
      required: true,
      columnName:'libelle'
    },
  },
};

