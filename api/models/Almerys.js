/**
 * Almerys.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    //request for ldt_by_spc betwen two date
    get_ldt_by_spec: function(option, callback) {
      var sql = "select * from ldt_by_spec " +
        "to_date(date_deb,'yyyymmdd') " +
        "between to_date('"+option.datedeb+"','yyyymmdd') " +
        "and to_date('"+option.datefin+"','yyyymmdd') ";
      Ldt.query(sql, function (err, res) {
        if (err) return callback(err);
        return callback(null, res.rows);
      });

    },



    //request for norme ISO error for almerys_compatage between two date
    get_iso_by_spec: function(option, callback) {
      var sql = "select * from almerys_lot_specialite " +
        "to_date(date_deb,'yyyymmdd') " +
        "between to_date('"+option.datedeb+"','yyyymmdd') " +
        "and to_date('"+option.datefin+"','yyyymmdd') ";
      Ldt.query(sql, function (err, res) {
        if (err) return callback(err);
        return callback(null, res.rows);
      });

    },

    //request for error on almerys_comptage between two date
    get_iso_by_spec: function(option, callback) {
      var sql = "select * from almerys_lot_specialite " +
                "to_date(date_deb,'yyyymmdd') " +
      "between to_date('"+option.datedeb+"','yyyymmdd') " +
      "and to_date('"+option.datefin+"','yyyymmdd') ";
      Ldt.query(sql, function (err, res) {
        if (err) return callback(err);
        return callback(null, res.rows);
      });

    },




  },

  get_es: function(option, callback) {
    var sql = "select count(*) as ct from almerys_p_lot_new join p_lot on p_lot.id_lot= almerys_p_lot_new.id_lot where almerys_p_lot_new.id_etat = 5 AND p_lot.id_pers = "+option.idPers+" AND almerys_p_lot_new.date_deb = '"+option.datecible+"'";
    //console.log(sql)
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      if(res.rows.length ==0){
        return callback(null, 0);
      }else{

        ////console.log(res);
        //console.log(res.rows[0].ct);

        return callback(null, res.rows[0].ct);
      }

    });

  },

  get_nrrg: function(option, callback) {
    var sql = "select count(*) as ct from almerys_p_lot_new join p_lot on p_lot.id_lot= almerys_p_lot_new.id_lot where almerys_p_lot_new.id_etat = 4 AND p_lot.id_pers = "+option.idPers+" AND almerys_p_lot_new.date_deb = '"+option.datecible+"'";
    //console.log(sql)
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      if(res.rows.length ==0){
        return callback(null, 0);
      }else{
        ////console.log(res);
        //console.log(res.rows[0].ct);
        return callback(null, res.rows[0].ct);
      }

    });

  },
  get_listErreur: function(option, callback) {
    var sql = "select almerys_type_erreur.libelle,almerys_p_lot_new.num_nuo from almerys_p_lot_new join p_lot on p_lot.id_lot= almerys_p_lot_new.id_lot " +
      "JOIN almerys_type_erreur ON  almerys_type_erreur.id = almerys_p_lot_new.id_type_erreur   " +
      "where almerys_p_lot_new.id_etat = "+option.idEtat+" AND p_lot.id_pers = "+option.idPers+" AND almerys_p_lot_new.date_deb = '"+option.datecible+"'";
    //console.log(sql)
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);

        return callback(null, res.rows);

    });

  },

  get_list_pers_sspec: function(option, callback) {
    var sql = "SELECT distinct p_lot.id_pers,p_lot_client.id_lotclient as id_pole_new "+
      "    FROM almerys_p_lot_new "+
      "    JOIN p_lot on almerys_p_lot_new.id_lot = p_lot.id_lot "+
      "    JOIN almerys_p_etat on almerys_p_etat.id_etat = almerys_p_lot_new.id_etat "+
      "    JOIN p_dossier on p_lot.id_dossier = p_dossier.id_dossier "+
      "    JOIN p_lot_client on p_lot.id_lotclient = p_lot_client.id_lotclient "+
      "    JOIN p_lien_oper_dossier ON p_lien_oper_dossier.id_lien = p_lot.id_etape "+
      "    JOIN p_etape on p_etape.id_etape = p_lien_oper_dossier.id_oper "+
      "    JOIN p_etat on p_lot.id_etat = p_etat.id_etat "+
      "    LEFT JOIN almerys_motif_rejet on almerys_motif_rejet.id = almerys_p_lot_new.id_motif_rejet "+
      "    LEFT JOIN almerys_tache ON almerys_p_lot_new.id_tache = almerys_tache.id_tache "+
      "    LEFT JOIN almerys_type_fav ON almerys_type_fav.id_pole_new = p_lot.id_lotclient " +
      //" LEFT JOIN almerys_user  ON almerys_user.matricule = p_lot.id_pers " +
      " WHERE 1= 1 AND almerys_p_lot_new.date_deb ='"+new Date().toISOString().replace(/-/,'').replace(/-/,'').substr(0,8)+ "' ";
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });

  },
  /***  -----------------------    FUNCTION  ALMERYS HEURE HORS PROD   ---------------------  ***/
  // get rows list of Date Ldt
  getListDateLdt: function(date_debut,date_fin,callback){
    var query = "SELECT DISTINCT ON (date_deb_ldt) date_deb_ldt FROM p_ldt WHERE p_ldt.date_deb_ldt >= '"+date_debut+"' AND p_ldt.date_deb_ldt <= '"+date_fin+"'";
    Ldt.query(query, function(err,res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },
  // get user from ldt by date
  getListPersByDate: function(date_get,id_dossier,id_pers,callback){

    var query = "SELECT DISTINCT ON (p_ldt.id_pers) id_pers FROM p_ldt WHERE p_ldt.date_deb_ldt = '"+date_get+"' AND id_dossier="+id_dossier+"";
    if(id_pers.toString()!="0")
    {
      query = "SELECT DISTINCT ON (p_ldt.id_pers) id_pers FROM p_ldt WHERE p_ldt.date_deb_ldt = '"+date_get+"' AND id_dossier="+id_dossier+" AND id_pers="+id_pers+"";
    }
    Ldt.query(query, function(err,res){
      if(err)
      {
        //console.log(err);
        return callback(err);
      }
      //console.log(res.rows);
      return callback(null, res.rows);
    });
  },
  // get duration by pers,date,dossier,type
  getDuration: function(id_pers,date_value,id_dossier,id_type,callback){
    var query = "SELECT SUM(DATE_PART('epoch', ('2011-12-29 '||p_ldt.h_fin)::timestamp - ('2011-12-29 '||p_ldt.h_deb)::timestamp )) as duree "+
        " FROM p_ldt WHERE 1=1 AND p_ldt.date_deb_ldt = '"+date_value+"' AND id_dossier="+id_dossier+" AND id_pers="+id_pers+" AND id_type_ldt="+id_type+"";
    Ldt.query(query, function(err,res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  }
};

