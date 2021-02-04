/**
 * Neo_pers_niveau.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    connection: 'ConnexionPostgresql', // connexion à la base, nom du base:"ConnexionPostgresql"
    tableName: 'neo_pers_niveau', // nom du table qui est associé avec le modele Test
  
    attributes: {
      id: { 
        type: 'integer',
        required: true,
        columnName:'id'
      },
      id_pers: { 
        type: 'integer',
        required: true,
        columnName:'id_pers'
      },
      id_niveau: { 
        type: 'integer',
        required: true,
        columnName:'id_niveau'
      },
      date: {
          type: 'datetime',
          required: true,
          columnName:'date'
      },
  
    },
  };
  