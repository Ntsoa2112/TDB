/**
 * Neocles_manager.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'ConnexionPostgresql', // connexion à la base, nom du base:"ConnexionPostgresql"
  tableName: 'neocles_manager', // nom du table qui est associé avec le modele Test

  attributes: { //attribut user
    id: { 
      type: 'integer',
      required: true,
      unique: true,
      primaryKey: true,
      columnName:'id'
    },
    nom: { 
      type: 'string',
      required: true,
      columnName:'nom'
    },
    prenom: { 
      type: 'string',
      required: true,
      columnName:'prenom'
    },
    matricule: {
        type: 'integer',
        required: true,
        unique: true,
        primaryKey: true,
        columnName:'matricule'
    },
    appelation: { 
      type: 'string',
      required: true,
      columnName:'appelation'
    },

  },
};

