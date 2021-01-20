/**
 * ReservationSalle.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'EasyGpaoConnexion', // connexion à la base, nom du base:"ConnexionPostgresql"
  tableName: 'r_reservation_salle', // nom du table qui est associé avec le modele Test
  autoCreatedAt: false,
  autoUpdatedAt: false,
  autoPK: true,

  attributes: { //attribut user
    id_reservation: { //id de la reservation
      type: 'integer',
      required: true,
      unique: true,
      primaryKey: true,
      columnName: 'id_reservation'
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
    salle: { //Fin reservation
      type: 'integer',
      required: false,
      columnName: 'salle'
    },
    date_reserv:{
      type:'text',
      columnName:'date_reserv'
    }
  },

  getLsReservationDate: function(option, callback){
    var sql = "SELECT * FROM r_reservation_salle join r_departement on r_reservation_salle.id_departement=r_departement.id_departement join r_personnel on r_reservation_salle.id_pers=r_personnel.id_pers where r_reservation_salle.date_reserv = '"+ option.dateReservation + "' and salle = '"+ option.salleReservation + "' ";
    ReservationSalle.query(sql, function(err, res){
      if(err) console.log(err);
      return callback(null, res.rows);
    });
  },
  getLsPersonneReserve: function(option, callback){
    var sql = "SELECT id_pers,id_reservation FROM r_reservation_salle where id_reservation ="+ option;
    ReservationSalle.query(sql, function(err, res){
      if(err) console.log(err);
      return callback(null, res.rows);
    });
  },
};
