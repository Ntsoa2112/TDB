/**
 * Neocles_fiche.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    connection: 'ConnexionPostgresql', // connexion à la base, nom du base:"ConnexionPostgresql"
    tableName: 'neocles_fiche', // nom du table qui est associé avec le modele Test
  
    attributes: {
      id: { 
        type: 'integer',
        required: false,
        columnName:'id'
      },
      id_pers: { 
        type: 'integer',
        required: true,
        columnName:'id_pers'
      },
      id_manager: { 
        type: 'integer',
        required: true,
        columnName:'id_manager'
      },
      date_creation: {
          type: 'datetime',
          required: true,
          columnName:'date_creation'
      },
      date_fiche: {
        type: 'datetime',
        required: true,
        columnName:'date_fiche'
      },
  
    },
  };
  