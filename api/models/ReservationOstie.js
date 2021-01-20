/**
 * ReservationOstie.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'ConnexionPostgresql', // connexion à la base, nom du base:"ConnexionPostgresql"
  tableName: 'r_reservation_OSTIE', // nom du table qui est associé avec le modele Test
  autoCreatedAt: false,
  autoUpdatedAt: false,
  autoPK: true,

  attributes: { //attribut user
    id_reservation_OSTIE: { //id de la reservation
      type: 'integer',
      required: true,
      unique: true,
      primaryKey: true,
      columnName: 'id_reservation_OSTIE'
    },
    objet: { //Objet de la reservation
      type: 'text',
      required: false,
      unique: false,
      columnName: 'objet'
    },
    id_pers: { //MATRICULE
      type: 'integer',
      required: false,
      columnName: 'id_pers'
    },
    id_departement: { //Departement
      type: 'integer',
      required: false,
      columnName: 'id_departement'
    },
    debut_reservation: { //Debut reservation
      type: 'text',
      required: false,
      columnName: 'debut_reservation'
    },
    fin_reservation: { //Fin reservation
      type: 'text',
      required: false,
      columnName: 'fin_reservation'
    },
    stat: { //Fin reservation
      type: 'text',
      required: false,
      columnName: 'stat'
    },
    Date_reservation:{
      type:'text',
      columnName:'Date_reservation'
    }
  }
};

