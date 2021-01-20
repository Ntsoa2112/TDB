/**
 * Created by 8037 on 11/11/2016.
 */
module.exports = {
  GetAll_Departement: function (callback) {
    // var Query = "select * from ac_moyenne join ac_pole on ac_moyenne.id_pole=ac_pole.id_pole";
    var query = "SELECT * FROM r_departement";
    ////console.log('Departement checked');
    ReservationOstie.query(query,
      function (err, retour) {
        if (err) return callback(err);
        return callback(null, retour.rows);
      });
  },
  GetAll_Matricule: function (callback) {
    // var Query = "select * from ac_moyenne join ac_pole on ac_moyenne.id_pole=ac_pole.id_pole";
    var query = "SELECT * FROM r_personnel where actif=true ORDER BY id_pers ASC";
    ////console.log('table R_personnel checked');
    ReservationOstie.query(query,
      function (err, retour) {
        if (err) return callback(err);
        return callback(null, retour.rows);
      });
  },
  /*Get_allP_attente: function (callback) {
    // var Query = "select * from ac_moyenne join ac_pole on ac_moyenne.id_pole=ac_pole.id_pole";
    var query = "SELECT * FROM r_reservation_ostie join r_personnel on r_reservation_ostie.id_pers=r_personnel.id_pers join r_departement on r_personnel.id_departement=r_departement.id " +
      "WHERE r_reservation_ostie.stat='en attente' ORDER BY r_reservation_ostie.id_reservation_ostie ASC";
//    //console.log('table R_personnel checked' );
    ReservationOstie.query(query,
      function (err, retour) {
        if (err) return callback(err);
        return callback(null, retour.rows);
      });
  },*/
  Get_id_consult: function (callback) {
    // var Query = "select * from ac_moyenne join ac_pole on ac_moyenne.id_pole=ac_pole.id_pole";
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    m=parseInt(m)+1;
    var y = date.getFullYear();
    var Day_J=""+y+"-"+m+"-"+d+"";
    var query = "SELECT * FROM r_reservation_ostie join r_personnel on r_reservation_ostie.id_pers=r_personnel.id_pers " +
      "WHERE r_reservation_ostie.stat='en attente' and r_reservation_ostie.date_reservation='"+Day_J+"' order by r_reservation_ostie.id_reservation_ostie asc limit 1";
//    //console.log('table R_personnel checked' );
    ReservationOstie.query(query,
      function (err, retour) {
        if (err) return callback(err);

        return callback(null, retour.rows);
      });
  },

  Get_All_consult: function (callback) {
    // var Query = "select * from ac_moyenne join ac_pole on ac_moyenne.id_pole=ac_pole.id_pole";
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    m=parseInt(m)+1;
    var y = date.getFullYear();
    var Day_J=""+y+"-"+m+"-"+d+"";
    var query = "SELECT r_reservation_ostie.id_pers,nom,prenom,connected,r_reservation_ostie.id_reservation_ostie,r_personnel.id_departement, stat,r_departement.libelle,date_reservation,debut_reservation,fin_reservation,id_ldt,appelation,last_connected_time FROM r_reservation_ostie join r_personnel on r_reservation_ostie.id_pers=r_personnel.id_pers join r_departement on r_personnel.id_departement=r_departement.id " +
        " Left JOIN p_logon on  p_logon.id_pers = r_reservation_ostie.id_pers "+
      "WHERE  r_reservation_ostie.date_reservation='"+Day_J+"' OR r_reservation_ostie.date_reservation='"+(new Date().toISOString()).substr(0,10)+"' order by r_reservation_ostie.stat desc,r_reservation_ostie.id_reservation_ostie asc";
    ////console.log(query);
    ReservationOstie.query(query,
      function (err, retour) {
        if (err) return callback(err);
        return callback(null, retour.rows);
      });
  },

  Get_recap_consult: function (option,callback) {
    // var Query = "select * from ac_moyenne join ac_pole on ac_moyenne.id_pole=ac_pole.id_pole";

    var query = "SELECT r_reservation_ostie.id_pers,nom,prenom,connected,r_reservation_ostie.id_reservation_ostie,r_personnel.id_departement, stat,r_departement.libelle,date_reservation,debut_reservation,fin_reservation,id_ldt,appelation,last_connected_time FROM r_reservation_ostie join r_personnel on r_reservation_ostie.id_pers=r_personnel.id_pers join r_departement on r_personnel.id_departement=r_departement.id " +
      " Left JOIN p_logon on  p_logon.id_pers = r_reservation_ostie.id_pers " +
      " JOIN r_groupe on r_reservation_ostie.id_pers = r_groupe.id_pers "+
      "WHERE  CAST(r_groupe.id_cp as text) like '%"+option.id_cp+"%' AND  (to_date(r_reservation_ostie.date_reservation,'YYYY-MM-DD') between to_date('"+option.datedeb+"','YYYY-MM-DD') AND to_date('"+option.datefin+"','YYYY-MM-DD') ) AND stat = 'terminer'  order by r_reservation_ostie.stat desc,r_reservation_ostie.id_reservation_ostie asc";
    console.log(query);
    ReservationOstie.query(query,
      function (err, retour) {
        if (err) return callback(err);
        return callback(null, retour.rows);
      });
  },


    Get_etat_ostie: function (callback) {
    // var Query = "select * from ac_moyenne join ac_pole on ac_moyenne.id_pole=ac_pole.id_pole";
    var query = "select etat from r_ostie_etat";
    ////console.log(query);
    ReservationOstie.query(query,
      function (err, retour) {
        if (err) return callback(err);
        return callback(null, retour.rows[0].etat);
      });
  },



  Get_count_consult: function (callback) {
    // var Query = "select * from ac_moyenne join ac_pole on ac_moyenne.id_pole=ac_pole.id_pole";
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    m=parseInt(m)+1;
    var y = date.getFullYear();
    var Day_J=""+y+"-"+m+"-"+d+"";
    var query = "SELECT count(r_reservation_ostie.stat) as nbstat, r_reservation_ostie.stat FROM r_reservation_ostie " +
      "join r_personnel on r_reservation_ostie.id_pers=r_personnel.id_pers WHERE  r_reservation_ostie.date_reservation='"+Day_J+"'  OR r_reservation_ostie.date_reservation='"+(new Date().toISOString()).substr(0,10)+"' Group by r_reservation_ostie.stat";
//    //console.log('table R_personnel checked' );
    ReservationOstie.query(query,
      function (err, retour) {
        if (err) return callback(err);

        return callback(null, retour.rows);
      });
  },

  Get_heure_consult: function (callback) {
    // var Query = "select * from ac_moyenne join ac_pole on ac_moyenne.id_pole=ac_pole.id_pole";
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    m=parseInt(m)+1;
    var y = date.getFullYear();
    var Day_J=""+y+"-"+m+"-"+d+"";

    var query = "select id_pers,(TO_TIMESTAMP(CONCAT(date_reservation,' ',fin_reservation,':00'),'yyyy-mm-dd HH24:MI:SS')- " +
      "TO_TIMESTAMP(CONCAT(date_reservation,' ',debut_reservation,':00'),'yyyy-mm-dd HH24:MI:SS'))as duree FROM r_reservation_ostie  WHERE  (date_reservation='"+Day_J+"'  OR r_reservation_ostie.date_reservation='"+(new Date().toISOString()).substr(0,10)+"')  And stat='terminer'";
//    //console.log('table R_personnel checked' );
    ReservationOstie.query(query,
      function (err, retour) {
        if (err) return callback(err);

        return callback(null, retour.rows);
      });
  }
};
