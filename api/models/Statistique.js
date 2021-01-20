/**
 * Statistique.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'ConnexionPostgresql',
  tableName: 'almerys_user_new',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  autoPK: false,
  attributes: {

  },

  getLsTC : function (option,callback) {
    var sql = " SELECT * FROM almerys_user_new WHERE num_tel is not null AND suppr is null "+option+" ORDER BY pseudo ";

    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getLsTCDoctocare : function (option,callback) {
    var sql = " SELECT * FROM almerys_user_new WHERE is_doctocare = TRUE AND num_tel is not null "+option+" ORDER BY pseudo ";

    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getLsTCBriant : function (option,callback) {
    var sql = " SELECT * FROM almerys_user_new WHERE is_briant = TRUE and num_tel is not null "+option+" ORDER BY pseudo ";

    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getEcoute : function (option,callback) {
    var sql = " SELECT SUM(note) as nt,SUM(CASE WHEN note is not null THEN ponderation ELSE 0 END) as pnd,date_enregistrement,deb_ecoute,ms_motif_appel.libelle,ms_ecoute.id_ecoute,conforme " +
      "FROM ms_ecoute " +
      "JOIN ms_note ON ms_note.id_ecoute = ms_ecoute.id_ecoute " +
      "JOIN ms_details_notation ON ms_details_notation.id_details_notation = ms_note.id_details_notation " +
      "JOIN ms_motif_appel ON ms_motif_appel.id_motif_appel = ms_ecoute.id_motif " +
      "WHERE ms_ecoute.id_pers = "+option.id_pers+" AND is_as = false AND is_doctocare is NULL AND is_briant is NULL AND is_codelis is NULL " +
      "AND to_date(to_char(deb_ecoute,'yyyyMMdd'),'yyyyMMdd') BETWEEN to_date('"+option.date_deb+"','yyyyMMdd') AND  to_date('"+option.date_fin+"','yyyyMMdd') GROUP BY date_enregistrement,deb_ecoute,ms_motif_appel.libelle,ms_ecoute.id_ecoute,conforme ORDER BY date_enregistrement  ";

    ////console.log(sql);
    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getEcouteCodelis : function (option,callback) {
    var sql = " SELECT SUM(note) as nt,SUM(CASE WHEN note is not null THEN ponderation ELSE 0 END) as pnd,date_enregistrement,deb_ecoute,ms_motif_appel.libelle,ms_ecoute.id_ecoute,conforme " +
      "FROM ms_ecoute " +
      "JOIN ms_note ON ms_note.id_ecoute = ms_ecoute.id_ecoute " +
      "JOIN ms_details_notation ON ms_details_notation.id_details_notation = ms_note.id_details_notation " +
      "JOIN ms_motif_appel ON ms_motif_appel.id_motif_appel = ms_ecoute.id_motif " +
      "WHERE ms_ecoute.id_pers = "+option.id_pers+" AND is_codelis = true " +
      "AND to_date(to_char(deb_ecoute,'yyyyMMdd'),'yyyyMMdd') BETWEEN to_date('"+option.date_deb+"','yyyyMMdd') AND  to_date('"+option.date_fin+"','yyyyMMdd') GROUP BY date_enregistrement,deb_ecoute,ms_motif_appel.libelle,ms_ecoute.id_ecoute,conforme ORDER BY date_enregistrement  ";

    ////console.log(sql);
    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getEcouteDoctocare : function (option,callback) {
    var sql = " SELECT SUM(note) as nt,SUM(CASE WHEN note is not null THEN ponderation ELSE 0 END) as pnd,date_enregistrement,deb_ecoute,ms_motif_appel.libelle,ms_ecoute.id_ecoute,conforme " +
      "FROM ms_ecoute " +
      "JOIN ms_note ON ms_note.id_ecoute = ms_ecoute.id_ecoute " +
      "JOIN ms_details_notation ON ms_details_notation.id_details_notation = ms_note.id_details_notation " +
      "JOIN ms_motif_appel ON ms_motif_appel.id_motif_appel = ms_ecoute.id_motif " +
      "WHERE ms_ecoute.id_pers = "+option.id_pers+" AND is_doctocare = true " +
      "AND to_date(to_char(deb_ecoute,'yyyyMMdd'),'yyyyMMdd') BETWEEN to_date('"+option.date_deb+"','yyyyMMdd') AND  to_date('"+option.date_fin+"','yyyyMMdd') GROUP BY date_enregistrement,deb_ecoute,ms_motif_appel.libelle,ms_ecoute.id_ecoute,conforme ORDER BY date_enregistrement  ";

    ////console.log(sql);
    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getEcouteTpmep : function (option,callback) {
    var sql = " SELECT SUM(note) as nt,SUM(CASE WHEN note is not null THEN ponderation ELSE 0 END) as pnd,date_enregistrement,deb_ecoute,ms_motif_appel.libelle,ms_ecoute.id_ecoute,conforme " +
      "FROM ms_ecoute " +
      "JOIN ms_note ON ms_note.id_ecoute = ms_ecoute.id_ecoute " +
      "JOIN ms_details_notation ON ms_details_notation.id_details_notation = ms_note.id_details_notation " +
      "JOIN ms_motif_appel ON ms_motif_appel.id_motif_appel = ms_ecoute.id_motif " +
      "WHERE ms_ecoute.id_pers = "+option.id_pers+" AND is_tpmep = true " +
      "AND to_date(to_char(deb_ecoute,'yyyyMMdd'),'yyyyMMdd') BETWEEN to_date('"+option.date_deb+"','yyyyMMdd') AND  to_date('"+option.date_fin+"','yyyyMMdd') GROUP BY date_enregistrement,deb_ecoute,ms_motif_appel.libelle,ms_ecoute.id_ecoute,conforme ORDER BY date_enregistrement  ";

    ////console.log(sql);
    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getEcouteBriant : function (option,callback) {
    var sql = " SELECT SUM(note) as nt,SUM(CASE WHEN note is not null THEN ponderation ELSE 0 END) as pnd,date_enregistrement,deb_ecoute,ms_motif_appel.libelle,ms_ecoute.id_ecoute,conforme " +
      "FROM ms_ecoute " +
      "JOIN ms_note ON ms_note.id_ecoute = ms_ecoute.id_ecoute " +
      "JOIN ms_details_notation ON ms_details_notation.id_details_notation = ms_note.id_details_notation " +
      "JOIN ms_motif_appel ON ms_motif_appel.id_motif_appel = ms_ecoute.id_motif " +
      "WHERE ms_ecoute.id_pers = "+option.id_pers+" AND is_briant = true " +
      "AND to_date(to_char(deb_ecoute,'yyyyMMdd'),'yyyyMMdd') BETWEEN to_date('"+option.date_deb+"','yyyyMMdd') AND  to_date('"+option.date_fin+"','yyyyMMdd') GROUP BY date_enregistrement,deb_ecoute,ms_motif_appel.libelle,ms_ecoute.id_ecoute,conforme ORDER BY date_enregistrement  ";

    ////console.log(sql);
    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getEcouteBriantAs : function (option,callback) {
    var sql = " SELECT SUM(note) as nt,SUM(CASE WHEN note is not null THEN ponderation ELSE 0 END) as pnd,date_enregistrement,deb_ecoute,ms_motif_appel.libelle,ms_ecoute.id_ecoute,conforme " +
      "FROM ms_ecoute " +
      "JOIN ms_note ON ms_note.id_ecoute = ms_ecoute.id_ecoute " +
      "JOIN ms_details_notation ON ms_details_notation.id_details_notation = ms_note.id_details_notation " +
      "JOIN ms_motif_appel ON ms_motif_appel.id_motif_appel = ms_ecoute.id_motif " +
      "WHERE ms_ecoute.id_pers = "+option.id_pers+" AND is_briant_as = true " +
      "AND to_date(to_char(deb_ecoute,'yyyyMMdd'),'yyyyMMdd') BETWEEN to_date('"+option.date_deb+"','yyyyMMdd') AND  to_date('"+option.date_fin+"','yyyyMMdd') GROUP BY date_enregistrement,deb_ecoute,ms_motif_appel.libelle,ms_ecoute.id_ecoute,conforme ORDER BY date_enregistrement  ";

    ////console.log(sql);
    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getEcouteAS : function (option,callback) {
    var sql = " SELECT DISTINCT SUM(note) as nt,SUM(CASE WHEN note is not null THEN ponderation ELSE 0 END) as pnd,date_enregistrement,deb_ecoute,ms_motif_appel.libelle,ms_ecoute.id_ecoute,conforme " +
      "FROM ms_ecoute " +
      "JOIN ms_note ON ms_note.id_ecoute = ms_ecoute.id_ecoute " +
      "JOIN ms_details_notation ON ms_details_notation.id_details_notation = ms_note.id_details_notation " +
      "JOIN ms_motif_appel ON ms_motif_appel.id_motif_appel = ms_ecoute.id_motif " +
      "WHERE ms_ecoute.id_pers = "+option.id_pers+" AND is_as = true " +
      "AND to_date(to_char(deb_ecoute,'yyyyMMdd'),'yyyyMMdd') BETWEEN to_date('"+option.date_deb+"','yyyyMMdd') AND  to_date('"+option.date_fin+"','yyyyMMdd') GROUP BY date_enregistrement,deb_ecoute,ms_motif_appel.libelle,ms_ecoute.id_ecoute,conforme ORDER BY date_enregistrement  ";

    console.log(" GET ECOUTE AS ====> "+sql);
    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getEcouteEole : function (option,callback) {
    var sql = " SELECT DISTINCT SUM(note) as nt,SUM(CASE WHEN note is not null THEN ponderation ELSE 0 END) as pnd,date_enregistrement,deb_ecoute,ms_motif_appel_crc.libelle,ms_ecoute.id_ecoute,conforme " +
      "FROM ms_ecoute " +
      "JOIN ms_note ON ms_note.id_ecoute = ms_ecoute.id_ecoute " +
      "JOIN ms_details_notation ON ms_details_notation.id_details_notation = ms_note.id_details_notation " +
      "JOIN ms_motif_appel_crc ON ms_motif_appel_crc.id_motif_appel_crc = ms_ecoute.id_motif " +
      "WHERE ms_ecoute.id_pers = "+option.id_pers+" AND is_eole = true " +
      "AND to_date(to_char(deb_ecoute,'yyyyMMdd'),'yyyyMMdd') BETWEEN to_date('"+option.date_deb+"','yyyyMMdd') AND  to_date('"+option.date_fin+"','yyyyMMdd') GROUP BY date_enregistrement,deb_ecoute,ms_motif_appel_crc.libelle,ms_ecoute.id_ecoute,conforme ORDER BY date_enregistrement  ";

    console.log(sql);
    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getEcouteIsoEole : function (option,callback) {
    var sql = " SELECT DISTINCT SUM(note) as nt,SUM(CASE WHEN note is not null THEN ponderation ELSE 0 END) as pnd,date_enregistrement,deb_ecoute,ms_motif_appel_crc.libelle,ms_ecoute.id_ecoute,conforme " +
      "FROM ms_ecoute " +
      "JOIN ms_note ON ms_note.id_ecoute = ms_ecoute.id_ecoute " +
      "JOIN ms_details_notation ON ms_details_notation.id_details_notation = ms_note.id_details_notation " +
      "JOIN ms_motif_appel_crc ON ms_motif_appel_crc.id_motif_appel_crc = ms_ecoute.id_motif " +
      "WHERE ms_ecoute.id_pers = "+option.id_pers+" AND is_ggs = true " +
      "AND to_date(to_char(deb_ecoute,'yyyyMMdd'),'yyyyMMdd') BETWEEN to_date('"+option.date_deb+"','yyyyMMdd') AND  to_date('"+option.date_fin+"','yyyyMMdd') GROUP BY date_enregistrement,deb_ecoute,ms_motif_appel_crc.libelle,ms_ecoute.id_ecoute,conforme ORDER BY date_enregistrement  ";

    console.log(sql);
    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getEcouteCss : function (option,callback) {
    var sql = " SELECT DISTINCT SUM(note) as nt,SUM(CASE WHEN note is not null THEN ponderation ELSE 0 END) as pnd,date_enregistrement,deb_ecoute,ms_motif_appel_crc.libelle,ms_ecoute.id_ecoute,conforme " +
      "FROM ms_ecoute " +
      "JOIN ms_note ON ms_note.id_ecoute = ms_ecoute.id_ecoute " +
      "JOIN ms_details_notation ON ms_details_notation.id_details_notation = ms_note.id_details_notation " +
      "JOIN ms_motif_appel_crc ON ms_motif_appel_crc.id_motif_appel_crc = ms_ecoute.id_motif " +
      "WHERE ms_ecoute.id_pers = "+option.id_pers+" AND is_css = true " +
      "AND to_date(to_char(deb_ecoute,'yyyyMMdd'),'yyyyMMdd') BETWEEN to_date('"+option.date_deb+"','yyyyMMdd') AND  to_date('"+option.date_fin+"','yyyyMMdd') GROUP BY date_enregistrement,deb_ecoute,ms_motif_appel_crc.libelle,ms_ecoute.id_ecoute,conforme ORDER BY date_enregistrement  ";

    console.log(sql);
    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getEcouteLamie : function (option,callback) {
    var sql = " SELECT DISTINCT SUM(note) as nt,SUM(CASE WHEN note is not null THEN ponderation ELSE 0 END) as pnd,date_enregistrement,deb_ecoute,ms_motif_appel_crc.libelle,ms_ecoute.id_ecoute,conforme " +
      "FROM ms_ecoute " +
      "JOIN ms_note ON ms_note.id_ecoute = ms_ecoute.id_ecoute " +
      "JOIN ms_details_notation ON ms_details_notation.id_details_notation = ms_note.id_details_notation " +
      "JOIN ms_motif_appel_crc ON ms_motif_appel_crc.id_motif_appel_crc = ms_ecoute.id_motif " +
      "WHERE ms_ecoute.id_pers = "+option.id_pers+" AND is_lamie = true " +
      "AND to_date(to_char(deb_ecoute,'yyyyMMdd'),'yyyyMMdd') BETWEEN to_date('"+option.date_deb+"','yyyyMMdd') AND  to_date('"+option.date_fin+"','yyyyMMdd') GROUP BY date_enregistrement,deb_ecoute,ms_motif_appel_crc.libelle,ms_ecoute.id_ecoute,conforme ORDER BY date_enregistrement  ";

    console.log(sql);
    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },


  getEcouteAll : function (option,callback) {
    var sql = " SELECT ms_ecoute.commentaire_non_conformite, ms_ecoute.raisons, ms_ecoute.commentaire_appreciation_francais," +
      " ms_ecoute.commentaire_appreciation_metier, ms_ecoute.reprise_francais, ms_ecoute.reprise_metier," +
      " ms_type_ecoute.libelle as type_ecoute, ms_appreciation.libelle as appreciation, ms_motif_non_conformite.libelle as nc," +
      "ms_specialite.libelle as spec,ms_mode.libelle as mode,francais_formation,metier_formation,almerys_user_new.pseudo," +
      "SUM(note) as nt,almerys_user_new.matricule,almerys_user_new.id_ce as ice,almerys_user_new.id_vague,numero_enregistrement," +
      "SUM(CASE WHEN note is not null THEN ponderation ELSE 0 END) as pnd,date_enregistrement,DATE_PART('epoch', fin_ecoute - deb_ecoute ) as dur_ecoute," +
      "deb_ecoute,fin_ecoute,ms_motif_appel.libelle,conforme,ms_ecoute.id_ecoute,ms_ecoute.id_pers " +
      " ,conforme,(SELECT pseudo from almerys_user_new as au WHERE au.id_ce = almerys_user_new.id_ce AND id_ce = matricule limit 1) as ce,r_personnel.appelation,duree_appel " +
      "FROM ms_ecoute " +
      "LEFT JOIN ms_note ON ms_note.id_ecoute = ms_ecoute.id_ecoute " +
      "LEFT JOIN ms_details_notation ON ms_details_notation.id_details_notation = ms_note.id_details_notation " +
      "JOIN ms_motif_appel ON ms_motif_appel.id_motif_appel = ms_ecoute.id_motif " +
      "JOIN almerys_user_new ON almerys_user_new.matricule = ms_ecoute.id_pers " +
      "JOIN r_personnel ON r_personnel.id_pers = ms_ecoute.id_pers_ecoute " +

      "LEFT JOIN ms_type_ecoute ON ms_type_ecoute.id_type_ecoute = ms_ecoute.id_type_ecoute " +
      "LEFT JOIN ms_appreciation ON ms_appreciation.id_appreciation = ms_ecoute.id_appreciation " +

      "LEFT JOIN ms_mode ON ms_mode.id_mode = ms_ecoute.id_mode " +
      "LEFT JOIN ms_motif_non_conformite ON ms_motif_non_conformite.id_motif_non_conformite = ms_ecoute.id_motif_non_conformite " +
      "LEFT JOIN ms_specialite ON ms_specialite.id_specialite = ms_ecoute.id_specialite " +
      "WHERE 1=1 AND almerys_user_new.suppr is NULL " +option.sql_ce+" "+option.sql_vg+" AND ms_ecoute.is_as = false AND ms_ecoute.is_doctocare is NULL and ms_ecoute.is_briant is NULL  and ms_ecoute.is_codelis is NULL "+
      "AND to_date(to_char(date_enregistrement,'yyyyMMdd'),'yyyyMMdd') BETWEEN to_date('"+option.date_deb+"','yyyyMMdd') AND  to_date('"+option.date_fin+"','yyyyMMdd')  " +
      "GROUP BY almerys_user_new.pseudo,almerys_user_new.matricule,ms_ecoute.id_pers,date_enregistrement,deb_ecoute,ms_motif_appel.libelle,ms_ecoute.id_ecoute,almerys_user_new.id_ce,conforme,almerys_user_new.id_vague,numero_enregistrement,r_personnel.appelation,duree_appel,conforme,ms_mode.libelle,ms_motif_non_conformite.libelle,ms_specialite.libelle, francais_formation,metier_formation,ms_type_ecoute.libelle, ms_appreciation.libelle  " +
      "ORDER BY almerys_user_new.id_ce,ms_ecoute.id_pers,date_enregistrement  ";

    console.log(sql);
    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//on retourne ici la liste des ecoutes 160
    });
  },


  getEcouteAllCodelis : function (option,callback) {
    var sql = " SELECT ms_ecoute.commentaire_non_conformite, ms_ecoute.raisons, ms_ecoute.commentaire_appreciation_francais," +
      " ms_ecoute.commentaire_appreciation_metier, ms_ecoute.reprise_francais, ms_ecoute.reprise_metier," +
      " ms_type_ecoute.libelle as type_ecoute, ms_appreciation.libelle as appreciation, ms_motif_non_conformite.libelle as nc," +
      "ms_specialite.libelle as spec,ms_mode.libelle as mode,francais_formation,metier_formation,almerys_user_new.pseudo," +
      "SUM(note) as nt,almerys_user_new.matricule,almerys_user_new.id_ce as ice,almerys_user_new.id_vague,numero_enregistrement," +
      "SUM(CASE WHEN note is not null THEN ponderation ELSE 0 END) as pnd,date_enregistrement,DATE_PART('epoch', fin_ecoute - deb_ecoute ) as dur_ecoute," +
      "deb_ecoute,fin_ecoute,ms_motif_appel.libelle as motif_appel,conforme,ms_ecoute.id_ecoute,ms_ecoute.id_pers " +
      " ,conforme,(SELECT pseudo from almerys_user_new as au WHERE au.id_ce = almerys_user_new.id_ce AND id_ce = matricule limit 1) as ce,r_personnel.appelation,duree_appel " +
      "FROM ms_ecoute " +
      "LEFT JOIN ms_note ON ms_note.id_ecoute = ms_ecoute.id_ecoute " +
      "LEFT JOIN ms_details_notation ON ms_details_notation.id_details_notation = ms_note.id_details_notation " +
      "JOIN ms_motif_appel ON ms_motif_appel.id_motif_appel = ms_ecoute.id_motif " +
      "JOIN almerys_user_new ON almerys_user_new.matricule = ms_ecoute.id_pers " +
      "JOIN r_personnel ON r_personnel.id_pers = ms_ecoute.id_pers_ecoute " +

      "LEFT JOIN ms_type_ecoute ON ms_type_ecoute.id_type_ecoute = ms_ecoute.id_type_ecoute " +
      "LEFT JOIN ms_appreciation ON ms_appreciation.id_appreciation = ms_ecoute.id_appreciation " +

      "LEFT JOIN ms_mode ON ms_mode.id_mode = ms_ecoute.id_mode " +
      "LEFT JOIN ms_motif_non_conformite ON ms_motif_non_conformite.id_motif_non_conformite = ms_ecoute.id_motif_non_conformite " +
      "LEFT JOIN ms_specialite ON ms_specialite.id_specialite = ms_ecoute.id_specialite " +
      "WHERE 1=1 AND almerys_user_new.suppr is NULL AND almerys_user_new.is_doctocare is NULL and almerys_user_new.is_briant is NULL " +option.sql_ce+" "+option.sql_vg+" AND ms_ecoute.is_codelis = true "+
      "AND to_date(to_char(date_enregistrement,'yyyyMMdd'),'yyyyMMdd') BETWEEN to_date('"+option.date_deb+"','yyyyMMdd') AND  to_date('"+option.date_fin+"','yyyyMMdd')  " +
      "GROUP BY almerys_user_new.pseudo,almerys_user_new.matricule,ms_ecoute.id_pers,date_enregistrement,deb_ecoute,ms_motif_appel.libelle,ms_ecoute.id_ecoute,almerys_user_new.id_ce,conforme,almerys_user_new.id_vague,numero_enregistrement,r_personnel.appelation,duree_appel,conforme,ms_mode.libelle,ms_motif_non_conformite.libelle,ms_specialite.libelle, francais_formation,metier_formation,ms_type_ecoute.libelle, ms_appreciation.libelle  " +
      "ORDER BY almerys_user_new.id_ce,ms_ecoute.id_pers,date_enregistrement  ";

    console.log(sql);
    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//on retourne ici la liste des ecoutes 160
    });
  },

  getEcouteAllAS : function (option,callback) {
    async.series([
      function (callback) {
        if(option.sql_ce != "")
        {
          Statistique.getListCampagneParResponsable(option.sql_ce,callback);
        }
        else
        {
          callback(null,"");
        }
      }
    ],function(eroor_loop,valueCampagne){
        if(eroor_loop) return callback(eroor_loop);
      var array_campagne = [];
        if(option.sql_ce != "")
        {
          valueCampagne[0].forEach(function (campagne) {
            array_campagne.push(campagne.id_campagne);
          });
          option.sql_ce = " AND ms_ecoute.id_campagne IN ("+array_campagne.join()+") ";
        }
      var sql = " SELECT DISTINCT ms_ecoute.commentaire_non_conformite, ms_ecoute.raisons, ms_ecoute.commentaire_appreciation_francais," +
        " ms_ecoute.commentaire_appreciation_metier, ms_ecoute.reprise_francais, ms_ecoute.reprise_metier, ms_campagne.libelle as campagne ," +
        " ms_type_ecoute.libelle as type_ecoute, ms_appreciation.libelle as appreciation, ms_motif_non_conformite.libelle as nc," +
        "ms_specialite.libelle as spec,ms_mode.libelle as mode,francais_formation,metier_formation,almerys_user_new.pseudo," +
        "SUM(note) as nt,almerys_user_new.matricule,almerys_user_new.id_ce as ice,almerys_user_new.id_vague,numero_enregistrement," +
        "SUM(CASE WHEN note is not null THEN ponderation ELSE 0 END) as pnd,date_enregistrement,DATE_PART('epoch', fin_ecoute - deb_ecoute ) as dur_ecoute," +
        "deb_ecoute,fin_ecoute,ms_motif_appel.libelle,conforme,ms_ecoute.id_ecoute,ms_ecoute.id_pers " +
        " ,conforme," +
        "  ms_responsable_campagne.id_responsable as matricule_responsable, " +
        //"(SELECT pseudo from almerys_user_new as au WHERE au.id_ce = almerys_user_new.id_ce AND id_ce = matricule limit 1) as ce," +
        " (SELECT pseudo from almerys_user_new as au WHERE au.id_ce = id_responsable limit 1) as ce, " +
        "r_personnel.appelation,duree_appel " +
        "FROM ms_ecoute " +
        "LEFT JOIN ms_note ON ms_note.id_ecoute = ms_ecoute.id_ecoute " +
        "LEFT JOIN ms_details_notation ON ms_details_notation.id_details_notation = ms_note.id_details_notation " +

        "LEFT JOIN ms_motif_appel ON ms_motif_appel.id_motif_appel = ms_ecoute.id_motif " + // + LEFT JOIN
        "LEFT JOIN almerys_user_new ON almerys_user_new.matricule = ms_ecoute.id_pers " + // + LEFT JOIN
        "LEFT JOIN r_personnel ON r_personnel.id_pers = ms_ecoute.id_pers_ecoute " + // + LEFT JOIN

        "LEFT JOIN ms_type_ecoute ON ms_type_ecoute.id_type_ecoute = ms_ecoute.id_type_ecoute " +
        "LEFT JOIN ms_appreciation ON ms_appreciation.id_appreciation = ms_ecoute.id_appreciation " +

        "LEFT JOIN ms_mode ON ms_mode.id_mode = ms_ecoute.id_mode " +
        "LEFT JOIN ms_motif_non_conformite ON ms_motif_non_conformite.id_motif_non_conformite = ms_ecoute.id_motif_non_conformite " +
        "LEFT JOIN ms_specialite ON ms_specialite.id_specialite = ms_ecoute.id_specialite " +
        "LEFT JOIN ms_campagne ON ms_campagne.id_campagne = ms_ecoute.id_campagne " +
        "LEFT JOIN ms_responsable_campagne ON ms_responsable_campagne.id_campagne = ms_ecoute.id_campagne " +
        "WHERE 1=1 AND almerys_user_new.suppr is NULL " +option.sql_ce+" "+option.sql_vg+"  AND ms_ecoute.is_as = true  "+
        "AND to_date(to_char(date_enregistrement,'yyyyMMdd'),'yyyyMMdd') BETWEEN to_date('"+option.date_deb+"','yyyyMMdd') AND  to_date('"+option.date_fin+"','yyyyMMdd')  " +
        "GROUP BY almerys_user_new.pseudo,almerys_user_new.matricule,ms_ecoute.id_pers,date_enregistrement,deb_ecoute,ms_motif_appel.libelle,ms_ecoute.id_ecoute,almerys_user_new.id_ce,conforme,almerys_user_new.id_vague,numero_enregistrement,r_personnel.appelation,duree_appel,conforme,ms_mode.libelle,ms_motif_non_conformite.libelle,ms_specialite.libelle, francais_formation,metier_formation,ms_type_ecoute.libelle, ms_appreciation.libelle, ms_campagne.libelle,ms_responsable_campagne.id_responsable   " +
        "ORDER BY almerys_user_new.id_ce,ms_ecoute.id_pers,date_enregistrement  ";

      console.log(sql);
      Statistique.query(sql, function(err, res){
        if(err) return callback(err);
        return callback(null, res.rows);//on retourne ici la liste des ecoutes 160
      });
    });

  },
  getListCampagneParResponsable: function (id_pers,callback) {
      var sql = "SELECT * FROM ms_responsable_campagne WHERE ms_responsable_campagne.id_responsable="+id_pers;
    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//on retourne ici la liste des ecoutes 160
    });
  },

  getEcouteAllDoctocare : function (option,callback) {
    var sql = " SELECT ms_ecoute.doctocare_procedure, ms_ecoute.doctocare_satisfait, ms_ecoute.conformite_mail, ms_ecoute.commentaire_non_conformite, ms_ecoute.raisons, ms_ecoute.commentaire_appreciation_francais," +
      " ms_ecoute.commentaire_appreciation_metier, ms_ecoute.reprise_francais, ms_ecoute.reprise_metier," +
      " ms_type_ecoute.libelle as type_ecoute, ms_appreciation.libelle as appreciation, ms_motif_non_conformite.libelle as nc," +
      "ms_specialite.libelle as spec,ms_mode.libelle as mode,francais_formation,metier_formation,almerys_user_new.pseudo," +
      "SUM(note) as nt,almerys_user_new.matricule,almerys_user_new.id_ce as ice,almerys_user_new.id_vague,numero_enregistrement," +
      "SUM(CASE WHEN note is not null THEN ponderation ELSE 0 END) as pnd,date_enregistrement,DATE_PART('epoch', fin_ecoute - deb_ecoute ) as dur_ecoute," +
      "deb_ecoute,fin_ecoute,ms_motif_appel.libelle,conforme,ms_ecoute.id_ecoute,ms_ecoute.id_pers " +
      " ,conforme,(SELECT pseudo from almerys_user_new as au WHERE au.id_ce = almerys_user_new.id_ce AND id_ce = matricule limit 1) as ce,r_personnel.appelation,duree_appel " +
      "FROM ms_ecoute " +
      "LEFT JOIN ms_note ON ms_note.id_ecoute = ms_ecoute.id_ecoute " +
      "LEFT JOIN ms_details_notation ON ms_details_notation.id_details_notation = ms_note.id_details_notation " +
      "JOIN ms_motif_appel ON ms_motif_appel.id_motif_appel = ms_ecoute.id_motif " +
      "JOIN almerys_user_new ON almerys_user_new.matricule = ms_ecoute.id_pers " +
      "JOIN r_personnel ON r_personnel.id_pers = ms_ecoute.id_pers_ecoute " +

      "LEFT JOIN ms_type_ecoute ON ms_type_ecoute.id_type_ecoute = ms_ecoute.id_type_ecoute " +
      "LEFT JOIN ms_appreciation ON ms_appreciation.id_appreciation = ms_ecoute.id_appreciation " +

      "LEFT JOIN ms_mode ON ms_mode.id_mode = ms_ecoute.id_mode " +
      "LEFT JOIN ms_motif_non_conformite ON ms_motif_non_conformite.id_motif_non_conformite = ms_ecoute.id_motif_non_conformite " +
      "LEFT JOIN ms_specialite ON ms_specialite.id_specialite = ms_ecoute.id_specialite " +
      "WHERE 1=1 AND almerys_user_new.suppr is NULL " +option.sql_ce+" "+option.sql_vg+" AND ms_ecoute.is_doctocare = true  "+
      "AND to_date(to_char(date_enregistrement,'yyyyMMdd'),'yyyyMMdd') BETWEEN to_date('"+option.date_deb+"','yyyyMMdd') AND  to_date('"+option.date_fin+"','yyyyMMdd')  " +
      "GROUP BY almerys_user_new.pseudo,almerys_user_new.matricule,ms_ecoute.id_pers,date_enregistrement,deb_ecoute,ms_motif_appel.libelle,ms_ecoute.id_ecoute,almerys_user_new.id_ce,conforme,almerys_user_new.id_vague,numero_enregistrement,r_personnel.appelation,duree_appel,conforme,ms_mode.libelle,ms_motif_non_conformite.libelle,ms_specialite.libelle, francais_formation,metier_formation,ms_type_ecoute.libelle, ms_appreciation.libelle  " +
      "ORDER BY almerys_user_new.id_ce,ms_ecoute.id_pers,date_enregistrement  ";

    console.log(sql);
    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//on retourne ici la liste des ecoutes 160
    });
  },

  getEcouteAllTpmep : function (option,callback) {
    var sql = " SELECT ms_ecoute.commentaire_non_conformite, ms_ecoute.raisons, ms_ecoute.commentaire_appreciation_francais," +
      " ms_ecoute.commentaire_appreciation_metier, ms_ecoute.reprise_francais, ms_ecoute.reprise_metier," +
      " ms_type_ecoute.libelle as type_ecoute, ms_appreciation.libelle as appreciation, ms_motif_non_conformite.libelle as nc," +
      "ms_specialite.libelle as spec,ms_mode.libelle as mode,francais_formation,metier_formation,almerys_user_new.pseudo," +
      "SUM(note) as nt,almerys_user_new.matricule,almerys_user_new.id_vague,numero_enregistrement, almerys_user_new.id_ce as ice, " + //
      "SUM(CASE WHEN note is not null THEN ponderation ELSE 0 END) as pnd,date_enregistrement,DATE_PART('epoch', fin_ecoute - deb_ecoute ) as dur_ecoute," +
      "deb_ecoute,fin_ecoute,ms_motif_appel.libelle,conforme,ms_ecoute.id_ecoute,ms_ecoute.id_pers, " +
      " (SELECT pseudo from almerys_user_new as au WHERE au.id_ce = almerys_user_new.id_ce AND id_ce = matricule limit 1) as ce, "+  //
      " conforme,r_personnel.appelation,duree_appel " + 
      "FROM ms_ecoute " +
      "LEFT JOIN ms_note ON ms_note.id_ecoute = ms_ecoute.id_ecoute " +
      "LEFT JOIN ms_details_notation ON ms_details_notation.id_details_notation = ms_note.id_details_notation " +
      "LEFT JOIN ms_motif_appel ON ms_motif_appel.id_motif_appel = ms_ecoute.id_motif " +
      "JOIN almerys_user_new ON almerys_user_new.matricule = ms_ecoute.id_pers " +
      "JOIN r_personnel ON r_personnel.id_pers = ms_ecoute.id_pers_ecoute " +

      "LEFT JOIN ms_type_ecoute ON ms_type_ecoute.id_type_ecoute = ms_ecoute.id_type_ecoute " +
      "LEFT JOIN ms_appreciation ON ms_appreciation.id_appreciation = ms_ecoute.id_appreciation " +

      "LEFT JOIN ms_mode ON ms_mode.id_mode = ms_ecoute.id_mode " +
      "LEFT JOIN ms_motif_non_conformite ON ms_motif_non_conformite.id_motif_non_conformite = ms_ecoute.id_motif_non_conformite " +
      "LEFT JOIN ms_specialite ON ms_specialite.id_specialite = ms_ecoute.id_specialite " +
      "WHERE 1=1  AND almerys_user_new.suppr is NULL AND ms_ecoute.is_tpmep = true AND almerys_user_new.id_ce = 1019 "+ //" +option.sql_ce+"  "+option.sql_vg+"
      "AND to_date(to_char(date_enregistrement,'yyyyMMdd'),'yyyyMMdd') BETWEEN to_date('"+option.date_deb+"','yyyyMMdd') AND  to_date('"+option.date_fin+"','yyyyMMdd')  " +
      "GROUP BY almerys_user_new.pseudo,almerys_user_new.matricule,ms_ecoute.id_pers,date_enregistrement, "+
      "deb_ecoute,ms_motif_appel.libelle,ms_ecoute.id_ecoute,conforme,almerys_user_new.id_vague, "+
      "numero_enregistrement,r_personnel.appelation,duree_appel,conforme,ms_mode.libelle, "+
      "ms_motif_non_conformite.libelle,ms_specialite.libelle, francais_formation,metier_formation, "+
      "ms_type_ecoute.libelle, ms_appreciation.libelle, almerys_user_new.id_ce  " + //
      "ORDER BY ms_ecoute.id_pers,date_enregistrement, almerys_user_new.id_ce  "; //

    console.log(sql);
    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//on retourne ici la liste des ecoutes 160
    });
  },

  getEcouteAllBriant : function (option,callback) {
    var sql = " SELECT ms_ecoute.commentaire_non_conformite, ms_ecoute.raisons, ms_ecoute.commentaire_appreciation_francais," +
      " ms_ecoute.commentaire_appreciation_metier, ms_ecoute.reprise_francais, ms_ecoute.reprise_metier," +
      " ms_type_ecoute.libelle as type_ecoute, ms_appreciation.libelle as appreciation, ms_motif_non_conformite.libelle as nc," +
      "ms_specialite.libelle as spec,ms_mode.libelle as mode,francais_formation,metier_formation,almerys_user_new.pseudo," +
      "SUM(note) as nt,almerys_user_new.matricule,almerys_user_new.id_ce as ice,almerys_user_new.id_vague,numero_enregistrement," +
      "SUM(CASE WHEN note is not null THEN ponderation ELSE 0 END) as pnd,date_enregistrement,DATE_PART('epoch', fin_ecoute - deb_ecoute ) as dur_ecoute," +
      "deb_ecoute,fin_ecoute,ms_motif_appel.libelle,conforme,ms_ecoute.id_ecoute,ms_ecoute.id_pers " +
      " ,conforme,(SELECT pseudo from almerys_user_new as au WHERE au.id_ce = almerys_user_new.id_ce AND id_ce = matricule limit 1) as ce,r_personnel.appelation,duree_appel " +
      "FROM ms_ecoute " +
      "LEFT JOIN ms_note ON ms_note.id_ecoute = ms_ecoute.id_ecoute " +
      "LEFT JOIN ms_details_notation ON ms_details_notation.id_details_notation = ms_note.id_details_notation " +
      "JOIN ms_motif_appel ON ms_motif_appel.id_motif_appel = ms_ecoute.id_motif " +
      "JOIN almerys_user_new ON almerys_user_new.matricule = ms_ecoute.id_pers " +
      "JOIN r_personnel ON r_personnel.id_pers = ms_ecoute.id_pers_ecoute " +

      "LEFT JOIN ms_type_ecoute ON ms_type_ecoute.id_type_ecoute = ms_ecoute.id_type_ecoute " +
      "LEFT JOIN ms_appreciation ON ms_appreciation.id_appreciation = ms_ecoute.id_appreciation " +

      "LEFT JOIN ms_mode ON ms_mode.id_mode = ms_ecoute.id_mode " +
      "LEFT JOIN ms_motif_non_conformite ON ms_motif_non_conformite.id_motif_non_conformite = ms_ecoute.id_motif_non_conformite " +
      "LEFT JOIN ms_specialite ON ms_specialite.id_specialite = ms_ecoute.id_specialite " +
      "WHERE 1=1 AND almerys_user_new.suppr is NULL " +option.sql_ce+" "+option.sql_vg+" AND ms_ecoute.is_briant = true  AND almerys_user_new.is_briant = true "+
      "AND to_date(to_char(date_enregistrement,'yyyyMMdd'),'yyyyMMdd') BETWEEN to_date('"+option.date_deb+"','yyyyMMdd') AND  to_date('"+option.date_fin+"','yyyyMMdd')  " +
      "GROUP BY almerys_user_new.pseudo,almerys_user_new.matricule,ms_ecoute.id_pers,date_enregistrement,deb_ecoute,ms_motif_appel.libelle,ms_ecoute.id_ecoute,almerys_user_new.id_ce,conforme,almerys_user_new.id_vague,numero_enregistrement,r_personnel.appelation,duree_appel,conforme,ms_mode.libelle,ms_motif_non_conformite.libelle,ms_specialite.libelle, francais_formation,metier_formation,ms_type_ecoute.libelle, ms_appreciation.libelle  " +
      "ORDER BY almerys_user_new.id_ce,ms_ecoute.id_pers,date_enregistrement  ";

    console.log("SQL - BRIANT ====>>>>> ");
    console.log(sql);
    console.log("FIN SQL - BRIANT ====>>>>> ");
    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//on retourne ici la liste des ecoutes 160
    });
  },

  getEcouteAllBriantAs : function (option,callback) {
    var sql = " SELECT ms_ecoute.commentaire_non_conformite, ms_ecoute.raisons, ms_ecoute.commentaire_appreciation_francais," +
      " ms_ecoute.commentaire_appreciation_metier, ms_ecoute.reprise_francais, ms_ecoute.reprise_metier," +
      " ms_type_ecoute.libelle as type_ecoute, ms_appreciation.libelle as appreciation, ms_motif_non_conformite.libelle as nc," +
      "ms_specialite.libelle as spec,ms_mode.libelle as mode,francais_formation,metier_formation,almerys_user_new.pseudo," +
      "SUM(note) as nt,almerys_user_new.matricule,almerys_user_new.id_ce as ice,almerys_user_new.id_vague,numero_enregistrement," +
      "SUM(CASE WHEN note is not null THEN ponderation ELSE 0 END) as pnd,date_enregistrement,DATE_PART('epoch', fin_ecoute - deb_ecoute ) as dur_ecoute," +
      "deb_ecoute,fin_ecoute,ms_motif_appel.libelle,conforme,ms_ecoute.id_ecoute,ms_ecoute.id_pers " +
      " ,conforme,(SELECT pseudo from almerys_user_new as au WHERE au.id_ce = almerys_user_new.id_ce AND id_ce = matricule limit 1) as ce,r_personnel.appelation,duree_appel " +
      "FROM ms_ecoute " +
      "LEFT JOIN ms_note ON ms_note.id_ecoute = ms_ecoute.id_ecoute " +
      "LEFT JOIN ms_details_notation ON ms_details_notation.id_details_notation = ms_note.id_details_notation " +
      "JOIN ms_motif_appel ON ms_motif_appel.id_motif_appel = ms_ecoute.id_motif " +
      "JOIN almerys_user_new ON almerys_user_new.matricule = ms_ecoute.id_pers " +
      "JOIN r_personnel ON r_personnel.id_pers = ms_ecoute.id_pers_ecoute " +

      "LEFT JOIN ms_type_ecoute ON ms_type_ecoute.id_type_ecoute = ms_ecoute.id_type_ecoute " +
      "LEFT JOIN ms_appreciation ON ms_appreciation.id_appreciation = ms_ecoute.id_appreciation " +

      "LEFT JOIN ms_mode ON ms_mode.id_mode = ms_ecoute.id_mode " +
      "LEFT JOIN ms_motif_non_conformite ON ms_motif_non_conformite.id_motif_non_conformite = ms_ecoute.id_motif_non_conformite " +
      "LEFT JOIN ms_specialite ON ms_specialite.id_specialite = ms_ecoute.id_specialite " +
      "WHERE 1=1 AND almerys_user_new.suppr is NULL " +option.sql_ce+" "+option.sql_vg+" AND ms_ecoute.is_briant_as = true  AND almerys_user_new.is_briant = true "+
      "AND to_date(to_char(date_enregistrement,'yyyyMMdd'),'yyyyMMdd') BETWEEN to_date('"+option.date_deb+"','yyyyMMdd') AND  to_date('"+option.date_fin+"','yyyyMMdd')  " +
      "GROUP BY almerys_user_new.pseudo,almerys_user_new.matricule,ms_ecoute.id_pers,date_enregistrement,deb_ecoute,ms_motif_appel.libelle,ms_ecoute.id_ecoute,almerys_user_new.id_ce,conforme,almerys_user_new.id_vague,numero_enregistrement,r_personnel.appelation,duree_appel,conforme,ms_mode.libelle,ms_motif_non_conformite.libelle,ms_specialite.libelle, francais_formation,metier_formation,ms_type_ecoute.libelle, ms_appreciation.libelle  " +
      "ORDER BY almerys_user_new.id_ce,ms_ecoute.id_pers,date_enregistrement  ";

    console.log("SQL - BRIANT ====>>>>> ");
    console.log(sql);
    console.log("FIN SQL - BRIANT ====>>>>> ");
    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//on retourne ici la liste des ecoutes 160
    });
  },

  getEcouteAllClientEole : function (option,callback) {

    sails.log(option);
    var sqlWhere = ' ';
    if(option.id_ce !== '' && option.id_ce !== null  && typeof option.id_ce !== 'undefined')
      sqlWhere += ' AND almerys_user_new_crc.id_equipe_crc = \''+option.id_ce+'\' ';
    if(option.vague !== '' && option.vague !== null  && typeof option.vague !== 'undefined')
      sqlWhere += ' AND almerys_user_new_crc.vague = \''+option.vague+'\' ';

    var sql = " SELECT DISTINCT ms_ecoute.commentaire_non_conformite, ms_ecoute.raisons, ms_ecoute.commentaire_appreciation_francais," +
      " ms_ecoute.commentaire_appreciation_metier, ms_ecoute.eole_formation, ms_ecoute.reprise_francais, ms_ecoute.reprise_metier, ms_campagne.libelle as campagne ," +
      " ms_type_ecoute.libelle as type_ecoute, ms_appreciation.libelle as appreciation, ms_motif_non_conformite.libelle as nc," +
      "ms_specialite.libelle as spec,ms_mode.libelle as mode,francais_formation,metier_formation,almerys_user_new_crc.prenom as pseudo," +
      "SUM(note) as nt,almerys_user_new_crc.id,almerys_user_new_crc.id_equipe_crc as ice,almerys_user_new_crc.vague,numero_enregistrement," +
      "SUM(CASE WHEN note is not null THEN ponderation ELSE 0 END) as pnd,date_enregistrement,DATE_PART('epoch', fin_ecoute - deb_ecoute ) as dur_ecoute," +
      "deb_ecoute,fin_ecoute,ms_motif_appel.libelle,conforme,ms_ecoute.id_ecoute,ms_ecoute.id_pers " +
      " ,conforme,(SELECT libelle from ms_equipe_crc WHERE ms_equipe_crc.id_equipe_crc = almerys_user_new_crc.id_equipe_crc limit 1) as ce,r_personnel.appelation,duree_appel " +
      "FROM ms_ecoute " +
      "LEFT JOIN ms_note ON ms_note.id_ecoute = ms_ecoute.id_ecoute " +
      "LEFT JOIN ms_details_notation ON ms_details_notation.id_details_notation = ms_note.id_details_notation " +
      "JOIN ms_motif_appel_crc ms_motif_appel ON ms_motif_appel.id_motif_appel_crc = ms_ecoute.id_motif " +
      "JOIN almerys_user_new_crc ON almerys_user_new_crc.id = ms_ecoute.id_pers " +
      "JOIN r_personnel ON r_personnel.id_pers = ms_ecoute.id_pers_ecoute " +

      "LEFT JOIN ms_type_ecoute ON ms_type_ecoute.id_type_ecoute = ms_ecoute.id_type_ecoute " +
      "LEFT JOIN ms_appreciation ON ms_appreciation.id_appreciation = ms_ecoute.id_appreciation " +

      "LEFT JOIN ms_mode_crc ms_mode ON ms_mode.id_mode_crc = ms_ecoute.id_mode " +
      "LEFT JOIN ms_motif_non_conformite ON ms_motif_non_conformite.id_motif_non_conformite = ms_ecoute.id_motif_non_conformite " +
      "LEFT JOIN ms_specialite ON ms_specialite.id_specialite = ms_ecoute.id_specialite " +
      "LEFT JOIN ms_campagne ON ms_campagne.id_campagne = ms_ecoute.id_campagne " +
      "WHERE 1=1 AND almerys_user_new.suppr is NULL " +sqlWhere+"  AND ms_ecoute.is_eole = true  "+
      "AND to_date(to_char(date_enregistrement,'yyyyMMdd'),'yyyyMMdd') BETWEEN to_date('"+option.date_deb+"','yyyyMMdd') AND  to_date('"+option.date_fin+"','yyyyMMdd')  " +
      "GROUP BY almerys_user_new_crc.prenom,almerys_user_new_crc.id,ms_ecoute.id_pers,date_enregistrement,deb_ecoute,ms_motif_appel.libelle,ms_ecoute.id_ecoute,almerys_user_new_crc.id_equipe_crc,conforme,almerys_user_new_crc.vague,numero_enregistrement,r_personnel.appelation,duree_appel,conforme,ms_mode.libelle,ms_motif_non_conformite.libelle,ms_specialite.libelle, francais_formation,metier_formation,ms_type_ecoute.libelle, ms_appreciation.libelle, ms_campagne.libelle   " +
      "ORDER BY almerys_user_new_crc.id_equipe_crc,ms_ecoute.id_pers,date_enregistrement  ";

    console.log(sql);
    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//on retourne ici la liste des ecoutes 160
    });
  },

  getEcouteAllIsoEole : function (option,callback) {

    sails.log(option);
    var sqlWhere = ' ';
    if(option.id_ce !== '' && option.id_ce !== null  && typeof option.id_ce !== 'undefined')
      sqlWhere += ' AND almerys_user_new_crc.id_equipe_crc = \''+option.id_ce+'\' ';
    /*if(option.vague !== '' && option.vague !== null  && typeof option.vague !== 'undefined')
      sqlWhere += ' AND almerys_user_new_crc.vague = \''+option.vague+'\' ';*/
    if(option.id_tc !== '' && option.id_tc !== null  && typeof option.id_tc !== 'undefined' && option.id_tc !== 'u')
      sqlWhere += ' AND almerys_user_new_crc.id = \''+option.id_tc+'\' ';

    var whereDate = " ";
    if(option.date_deb && option.date_fin)
    {
      whereDate = "AND to_date(to_char(date_enregistrement,'yyyyMMdd'),'yyyyMMdd') BETWEEN to_date('"+option.date_deb+"','yyyyMMdd') AND  to_date('"+option.date_fin+"','yyyyMMdd')  ";
    }
    if(option.date_deb && !option.date_fin)
    {
      whereDate = "AND to_date(to_char(date_enregistrement,'yyyyMMdd'),'yyyyMMdd') = to_date('"+option.date_deb+"','yyyyMMdd')  ";
    }
    
    var sql = " SELECT DISTINCT ms_ecoute.commentaire_non_conformite, ms_ecoute.raisons, ms_ecoute.commentaire_appreciation_francais," +
      " ms_ecoute.commentaire_appreciation_metier, ms_ecoute.iso_eole_formation, ms_ecoute.reprise_francais, ms_ecoute.reprise_metier, ms_campagne.libelle as campagne ," +
      " ms_type_ecoute.libelle as type_ecoute, ms_appreciation.libelle as appreciation, ms_motif_non_conformite.libelle as nc," +
      "ms_specialite.libelle as spec,ms_mode.libelle as mode,francais_formation,metier_formation,almerys_user_new_crc.nom as pseudo, almerys_user_new_crc.nom as nom_crc," +
      "SUM(note) as nt,almerys_user_new_crc.id,almerys_user_new_crc.id_equipe_crc as ice,almerys_user_new_crc.vague,numero_enregistrement," +
      "SUM(CASE WHEN note is not null THEN ponderation ELSE 0 END) as pnd,date_enregistrement,date_ecoute,DATE_PART('epoch', fin_ecoute - deb_ecoute ) as dur_ecoute," +
      "deb_ecoute,fin_ecoute,ms_motif_appel.libelle,conforme,ms_ecoute.id_ecoute,ms_ecoute.id_pers " +
      " ,conforme,(SELECT libelle from ms_equipe_crc WHERE ms_equipe_crc.id_equipe_crc = almerys_user_new_crc.id_equipe_crc limit 1) as ce,r_personnel.appelation,duree_appel, " +
      
      //"string_agg(concat(commentaire,'(',type_commentaire_ggs,')'), ';') as synthese, "+
      "(select string_agg(commentaire, ';') from ms_note where type_commentaire_ggs = '1' and ms_note.id_ecoute = ms_ecoute.id_ecoute and commentaire != '') as synthese_metier,  "+
      "(select string_agg(commentaire, ';') from ms_note where type_commentaire_ggs = '2' and ms_note.id_ecoute = ms_ecoute.id_ecoute and commentaire != '') as synthese_charte,  "+
      "(select string_agg(commentaire, ';') from ms_note where type_commentaire_ggs = '3' and ms_note.id_ecoute = ms_ecoute.id_ecoute and commentaire != '') as synthese_discours,  "+

      
      "ms_type_call.libelle as call, ms_qualite.libelle as qualite, ms_motif_non_qualite.libelle as motif_nq, ms_evaluateur_crc.nom as evaluateur "+
      
      "FROM ms_ecoute " +
      "LEFT JOIN ms_note ON ms_note.id_ecoute = ms_ecoute.id_ecoute " +
      "LEFT JOIN ms_details_notation ON ms_details_notation.id_details_notation = ms_note.id_details_notation " +
      "JOIN ms_motif_appel_crc ms_motif_appel ON ms_motif_appel.id_motif_appel_crc = ms_ecoute.id_motif " +
      "JOIN almerys_user_new_crc ON almerys_user_new_crc.id = ms_ecoute.id_pers " +
      "JOIN r_personnel ON r_personnel.id_pers = ms_ecoute.id_pers_ecoute " +

      "LEFT JOIN ms_type_ecoute ON ms_type_ecoute.id_type_ecoute = ms_ecoute.id_type_ecoute " +
      "LEFT JOIN ms_appreciation ON ms_appreciation.id_appreciation = ms_ecoute.id_appreciation " +

      "LEFT JOIN ms_mode_crc ms_mode ON ms_mode.id_mode_crc = ms_ecoute.id_mode " +
      "LEFT JOIN ms_motif_non_conformite ON ms_motif_non_conformite.id_motif_non_conformite = ms_ecoute.id_motif_non_conformite " +
      "LEFT JOIN ms_specialite ON ms_specialite.id_specialite = ms_ecoute.id_specialite " +
      "LEFT JOIN ms_campagne ON ms_campagne.id_campagne = ms_ecoute.id_campagne " +


      "LEFT JOIN ms_type_call ms_type_call ON ms_type_call.id = ms_ecoute.id_call  " +
      "LEFT JOIN ms_qualite ms_qualite ON ms_qualite.id = ms_ecoute.id_qualite  " +
      "LEFT JOIN ms_motif_non_qualite ms_motif_non_qualite ON ms_motif_non_qualite.id = ms_ecoute.id_motif_nq  " +
      "LEFT JOIN ms_evaluateur_crc ms_evaluateur_crc ON ms_evaluateur_crc.id = ms_ecoute.id_evaluateur  " +

      "WHERE 1=1 " +sqlWhere+"  AND ms_ecoute.is_ggs = true  "+ whereDate +
      //"AND to_date(to_char(date_enregistrement,'yyyyMMdd'),'yyyyMMdd') BETWEEN to_date('"+option.date_deb+"','yyyyMMdd') AND  to_date('"+option.date_fin+"','yyyyMMdd')  " +
      " GROUP BY almerys_user_new_crc.prenom,almerys_user_new_crc.id,ms_ecoute.id_pers,date_enregistrement,deb_ecoute,ms_motif_appel.libelle,ms_ecoute.id_ecoute,almerys_user_new_crc.id_equipe_crc,conforme,almerys_user_new_crc.vague,numero_enregistrement,r_personnel.appelation,duree_appel,conforme,ms_mode.libelle,ms_motif_non_conformite.libelle,ms_specialite.libelle, francais_formation,metier_formation,ms_type_ecoute.libelle, ms_appreciation.libelle, ms_campagne.libelle,   " +
      "ms_type_call.libelle,ms_qualite.libelle,ms_motif_non_qualite.libelle,ms_evaluateur_crc.nom "+
      "ORDER BY almerys_user_new_crc.id_equipe_crc,ms_ecoute.id_pers,date_enregistrement  ";

    console.log(sql);
    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//on retourne ici la liste des ecoutes 160
    });
  },

  getEcouteAllIsoEoleCQ : function (option,callback) {

    sails.log(option);
    var sqlWhere = ' ';
    if(option.id_ce !== '' && option.id_ce !== null  && typeof option.id_ce !== 'undefined')
      sqlWhere += ' AND almerys_user_new_crc.id_equipe_crc = \''+option.id_ce+'\' ';
    
    if(option.id_tc !== '' && option.id_tc !== null  && typeof option.id_tc !== 'undefined' && option.id_tc !== 'u')
      sqlWhere += ' AND almerys_user_new_crc.id = \''+option.id_tc+'\' ';

    var whereDate = " ";
    if(option.date_deb && option.date_fin)
    {
      whereDate = "AND to_date(to_char(date_enregistrement,'yyyyMMdd'),'yyyyMMdd') BETWEEN to_date('"+option.date_deb+"','yyyyMMdd') AND  to_date('"+option.date_fin+"','yyyyMMdd')  ";
    }
    if(option.date_deb && !option.date_fin)
    {
      whereDate = "AND to_date(to_char(date_enregistrement,'yyyyMMdd'),'yyyyMMdd') = to_date('"+option.date_deb+"','yyyyMMdd')  ";
    }
    
    var sql = " SELECT DISTINCT ms_ecoute.id_pers_ecoute, ms_ecoute.commentaire_non_conformite, ms_ecoute.raisons, ms_ecoute.commentaire_appreciation_francais," +
      " ms_ecoute.commentaire_appreciation_metier, ms_ecoute.iso_eole_formation, ms_ecoute.reprise_francais, ms_ecoute.reprise_metier, ms_campagne.libelle as campagne ," +
      " ms_type_ecoute.libelle as type_ecoute, ms_appreciation.libelle as appreciation, ms_motif_non_conformite.libelle as nc," +
      "ms_specialite.libelle as spec,ms_mode.libelle as mode,francais_formation,metier_formation,almerys_user_new_crc.nom as pseudo, almerys_user_new_crc.nom as nom_crc," +
      "SUM(note) as nt,almerys_user_new_crc.id,almerys_user_new_crc.id_equipe_crc as ice,almerys_user_new_crc.vague,numero_enregistrement," +
      "SUM(CASE WHEN note is not null THEN ponderation ELSE 0 END) as pnd,date_enregistrement,date_ecoute,DATE_PART('epoch', fin_ecoute - deb_ecoute ) as dur_ecoute, DATE_PART('epoch', fin_etat_cq - debut_etat_cq ) as dur_etat_cq," +
      "deb_ecoute,fin_ecoute,ms_motif_appel.libelle,conforme,ms_ecoute.id_ecoute,ms_ecoute.id_pers " +
      " ,conforme,(SELECT libelle from ms_equipe_crc WHERE ms_equipe_crc.id_equipe_crc = almerys_user_new_crc.id_equipe_crc limit 1) as ce,r_personnel.appelation,duree_appel, " +
      
      "(select string_agg(commentaire, ';') from ms_note where type_commentaire_ggs = '1' and ms_note.id_ecoute = ms_ecoute.id_ecoute and commentaire != '') as synthese_metier,  "+
      "(select string_agg(commentaire, ';') from ms_note where type_commentaire_ggs = '2' and ms_note.id_ecoute = ms_ecoute.id_ecoute and commentaire != '') as synthese_charte,  "+
      "(select string_agg(commentaire, ';') from ms_note where type_commentaire_ggs = '3' and ms_note.id_ecoute = ms_ecoute.id_ecoute and commentaire != '') as synthese_discours,  "+

      "ms_type_call.libelle as call, ms_qualite.libelle as qualite, ms_motif_non_qualite.libelle as motif_nq, ms_evaluateur_crc.nom as evaluateur, "+
      
      "ms_ecoute.debut_etat_cq, ms_ecoute.fin_etat_cq, ms_type_etat_cq.id as id_type, ms_type_etat_cq.libelle as type_etat_cq, ms_etat_cq.libelle as etat_cq "+

      "FROM ms_ecoute " +
      "LEFT JOIN ms_note ON ms_note.id_ecoute = ms_ecoute.id_ecoute " +
      "LEFT JOIN ms_details_notation ON ms_details_notation.id_details_notation = ms_note.id_details_notation " +
      "LEFT JOIN ms_motif_appel_crc ms_motif_appel ON ms_motif_appel.id_motif_appel_crc = ms_ecoute.id_motif " +
      "LEFT JOIN almerys_user_new_crc ON almerys_user_new_crc.id = ms_ecoute.id_pers " +
      "LEFT JOIN r_personnel ON r_personnel.id_pers = ms_ecoute.id_pers_ecoute " +

      "LEFT JOIN ms_type_ecoute ON ms_type_ecoute.id_type_ecoute = ms_ecoute.id_type_ecoute " +
      "LEFT JOIN ms_appreciation ON ms_appreciation.id_appreciation = ms_ecoute.id_appreciation " +

      "LEFT JOIN ms_mode_crc ms_mode ON ms_mode.id_mode_crc = ms_ecoute.id_mode " +
      "LEFT JOIN ms_motif_non_conformite ON ms_motif_non_conformite.id_motif_non_conformite = ms_ecoute.id_motif_non_conformite " +
      "LEFT JOIN ms_specialite ON ms_specialite.id_specialite = ms_ecoute.id_specialite " +
      "LEFT JOIN ms_campagne ON ms_campagne.id_campagne = ms_ecoute.id_campagne " +

      "LEFT JOIN ms_type_etat_cq ON ms_ecoute.id_type_etat_cq = ms_type_etat_cq.id " +
      "LEFT JOIN ms_etat_cq ON ms_ecoute.id_etat_cq = ms_etat_cq.id " +

      "LEFT JOIN ms_type_call ms_type_call ON ms_type_call.id = ms_ecoute.id_call  " +
      "LEFT JOIN ms_qualite ms_qualite ON ms_qualite.id = ms_ecoute.id_qualite  " +
      "LEFT JOIN ms_motif_non_qualite ms_motif_non_qualite ON ms_motif_non_qualite.id = ms_ecoute.id_motif_nq  " +
      "LEFT JOIN ms_evaluateur_crc ms_evaluateur_crc ON ms_evaluateur_crc.id = ms_ecoute.id_evaluateur  " +

      "WHERE 1=1 " +sqlWhere+"  AND ms_ecoute.is_ggs = true  "+ whereDate +
      
      " GROUP BY ms_ecoute.debut_etat_cq, ms_ecoute.fin_etat_cq, ms_type_etat_cq.id, ms_type_etat_cq.libelle, ms_etat_cq.libelle, almerys_user_new_crc.prenom,almerys_user_new_crc.id,ms_ecoute.id_pers,date_enregistrement,deb_ecoute,ms_motif_appel.libelle,ms_ecoute.id_ecoute,almerys_user_new_crc.id_equipe_crc,conforme,almerys_user_new_crc.vague,numero_enregistrement,r_personnel.appelation,duree_appel,conforme,ms_mode.libelle,ms_motif_non_conformite.libelle,ms_specialite.libelle, francais_formation,metier_formation,ms_type_ecoute.libelle, ms_appreciation.libelle, ms_campagne.libelle,   " +
      "ms_type_call.libelle,ms_qualite.libelle,ms_motif_non_qualite.libelle,ms_evaluateur_crc.nom "+
      "ORDER BY ms_ecoute.id_ecoute, ms_ecoute.id_pers_ecoute, date_enregistrement  "; //almerys_user_new_crc.id_equipe_crc,

    console.log(sql);
    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//on retourne ici la liste des ecoutes 160
    });
  },

  getEcouteAllCss : function (option,callback) {

    sails.log(option);
    var sqlWhere = ' ';
    if(option.id_ce !== '' && option.id_ce !== null  && typeof option.id_ce !== 'undefined')
      sqlWhere += ' AND almerys_user_new_crc.id_equipe_crc = \''+option.id_ce+'\' ';
    /*if(option.vague !== '' && option.vague !== null  && typeof option.vague !== 'undefined')
      sqlWhere += ' AND almerys_user_new_crc.vague = \''+option.vague+'\' ';*/
    if(option.id_tc !== '' && option.id_tc !== null  && typeof option.id_tc !== 'undefined' && option.id_tc !== 'u')
      sqlWhere += ' AND almerys_user_new_crc.id = \''+option.id_tc+'\' ';
    if(option.mutuelle !== '' && option.mutuelle !== null  && typeof option.mutuelle !== 'undefined' && option.mutuelle !== 'u')
      sqlWhere += ' AND ms_ecoute.id_mutuelle = \''+option.mutuelle+'\' ';


    var whereDate = " ";
    if(option.date_deb && option.date_fin)
    {
      whereDate = "AND to_date(to_char(date_enregistrement,'yyyyMMdd'),'yyyyMMdd') BETWEEN to_date('"+option.date_deb+"','yyyyMMdd') AND  to_date('"+option.date_fin+"','yyyyMMdd')  ";
    }
    if(option.date_deb && !option.date_fin)
    {
      whereDate = "AND to_date(to_char(date_enregistrement,'yyyyMMdd'),'yyyyMMdd') = to_date('"+option.date_deb+"','yyyyMMdd')  ";
    }

    var sql = " SELECT DISTINCT ms_ecoute.commentaire_non_conformite, ms_ecoute.raisons, ms_ecoute.commentaire_appreciation_francais," +
      " ms_ecoute.commentaire_appreciation_metier, ms_ecoute.iso_eole_formation, ms_ecoute.reprise_francais, ms_ecoute.reprise_metier, ms_campagne.libelle as campagne ," +
      " ms_type_ecoute.libelle as type_ecoute, ms_appreciation.libelle as appreciation, ms_motif_non_conformite.libelle as nc," +
      "ms_specialite.libelle as spec,ms_mode.libelle as mode,francais_formation,metier_formation,almerys_user_new_crc.nom as pseudo, almerys_user_new_crc.nom as nom_crc," +
      "SUM(note) as nt,almerys_user_new_crc.id,almerys_user_new_crc.id_equipe_crc as ice,almerys_user_new_crc.vague,numero_enregistrement," +
      "SUM(CASE WHEN note is not null THEN ponderation ELSE 0 END) as pnd,date_enregistrement, date_ecoute,DATE_PART('epoch', fin_ecoute - deb_ecoute ) as dur_ecoute," +
      "deb_ecoute,fin_ecoute,ms_motif_appel.libelle,conforme,ms_ecoute.id_ecoute,ms_ecoute.id_pers " +
      " ,conforme,(SELECT libelle from ms_equipe_crc WHERE ms_equipe_crc.id_equipe_crc = almerys_user_new_crc.id_equipe_crc limit 1) as ce,r_personnel.appelation,duree_appel, " +
      
      //"string_agg(concat(commentaire,'(',type_commentaire_ggs,')'), ';') as synthese, "+
      "(select string_agg(commentaire, ';') from ms_note where type_commentaire_ggs = '1' and ms_note.id_ecoute = ms_ecoute.id_ecoute and commentaire != '') as synthese_metier,  "+
      "(select string_agg(commentaire, ';') from ms_note where type_commentaire_ggs = '2' and ms_note.id_ecoute = ms_ecoute.id_ecoute and commentaire != '') as synthese_charte,  "+
      "(select string_agg(commentaire, ';') from ms_note where type_commentaire_ggs = '3' and ms_note.id_ecoute = ms_ecoute.id_ecoute and commentaire != '') as synthese_discours,  "+


      "ms_mutuelle.libelle as mutuelle, ms_qualite.libelle as qualite, ms_conformite.libelle as conformite, ms_motif_non_qualite.libelle as motif_nq, ms_evaluateur_crc.nom as evaluateur "+
      
      "FROM ms_ecoute " +
      "LEFT JOIN ms_note ON ms_note.id_ecoute = ms_ecoute.id_ecoute " +
      "LEFT JOIN ms_details_notation ON ms_details_notation.id_details_notation = ms_note.id_details_notation " +
      "JOIN ms_motif_appel_crc ms_motif_appel ON ms_motif_appel.id_motif_appel_crc = ms_ecoute.id_motif " +
      "JOIN almerys_user_new_crc ON almerys_user_new_crc.id = ms_ecoute.id_pers " +
      "JOIN r_personnel ON r_personnel.id_pers = ms_ecoute.id_pers_ecoute " +

      "LEFT JOIN ms_type_ecoute ON ms_type_ecoute.id_type_ecoute = ms_ecoute.id_type_ecoute " +
      "LEFT JOIN ms_appreciation ON ms_appreciation.id_appreciation = ms_ecoute.id_appreciation " +

      "LEFT JOIN ms_mode_crc ms_mode ON ms_mode.id_mode_crc = ms_ecoute.id_mode " +
      "LEFT JOIN ms_motif_non_conformite ON ms_motif_non_conformite.id_motif_non_conformite = ms_ecoute.id_motif_non_conformite " +
      "LEFT JOIN ms_specialite ON ms_specialite.id_specialite = ms_ecoute.id_specialite " +
      "LEFT JOIN ms_campagne ON ms_campagne.id_campagne = ms_ecoute.id_campagne " +


      "LEFT JOIN ms_mutuelle ms_mutuelle ON ms_mutuelle.id = ms_ecoute.id_mutuelle  " +
      "LEFT JOIN ms_qualite ms_qualite ON ms_qualite.id = ms_ecoute.id_qualite  " +
      "LEFT JOIN ms_conformite ms_conformite ON ms_conformite.id = ms_ecoute.id_qualite  " +
      "LEFT JOIN ms_motif_non_qualite ms_motif_non_qualite ON ms_motif_non_qualite.id = ms_ecoute.id_motif_nq  " +
      "LEFT JOIN ms_evaluateur_crc ms_evaluateur_crc ON ms_evaluateur_crc.id = ms_ecoute.id_evaluateur  " +

      "WHERE 1=1 " +sqlWhere+"  AND ms_ecoute.is_css = true  "+ whereDate +
      //"AND to_date(to_char(date_enregistrement,'yyyyMMdd'),'yyyyMMdd') BETWEEN to_date('"+option.date_deb+"','yyyyMMdd') AND  to_date('"+option.date_fin+"','yyyyMMdd')  " +
      " GROUP BY almerys_user_new_crc.prenom,almerys_user_new_crc.id,ms_ecoute.id_pers,date_enregistrement,deb_ecoute,ms_motif_appel.libelle,ms_ecoute.id_ecoute,almerys_user_new_crc.id_equipe_crc,conforme,almerys_user_new_crc.vague,numero_enregistrement,r_personnel.appelation,duree_appel,conforme,ms_mode.libelle,ms_motif_non_conformite.libelle,ms_specialite.libelle, francais_formation,metier_formation,ms_type_ecoute.libelle, ms_appreciation.libelle, ms_campagne.libelle,   " +
      "ms_mutuelle.libelle,ms_qualite.libelle, ms_conformite.libelle, ms_motif_non_qualite.libelle,ms_evaluateur_crc.nom "+
      "ORDER BY almerys_user_new_crc.id_equipe_crc,ms_ecoute.id_pers,date_enregistrement  ";

    console.log(sql);
    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//on retourne ici la liste des ecoutes 160
    });
  },

  getEcouteAllLamie : function (option,callback) {

    sails.log(option);
    var sqlWhere = ' ';
    if(option.id_ce !== '' && option.id_ce !== null  && typeof option.id_ce !== 'undefined')
      sqlWhere += ' AND almerys_user_new_crc.id_equipe_crc = \''+option.id_ce+'\' ';
    if(option.id_tc !== '' && option.id_tc !== null  && typeof option.id_tc !== 'undefined' && option.id_tc !== 'u')
      sqlWhere += ' AND almerys_user_new_crc.id = \''+option.id_tc+'\' ';
    if(option.mutuelle !== '' && option.mutuelle !== null  && typeof option.mutuelle !== 'undefined' && option.mutuelle !== 'u')
      sqlWhere += ' AND ms_ecoute.id_mutuelle = \''+option.mutuelle+'\' ';


    var whereDate = " ";
    if(option.date_deb && option.date_fin)
    {
      whereDate = "AND to_date(to_char(date_enregistrement,'yyyyMMdd'),'yyyyMMdd') BETWEEN to_date('"+option.date_deb+"','yyyyMMdd') AND  to_date('"+option.date_fin+"','yyyyMMdd')  ";
    }
    if(option.date_deb && !option.date_fin)
    {
      whereDate = "AND to_date(to_char(date_enregistrement,'yyyyMMdd'),'yyyyMMdd') = to_date('"+option.date_deb+"','yyyyMMdd')  ";
    }

    var sql = " SELECT DISTINCT ms_ecoute.commentaire_non_conformite, ms_ecoute.raisons, ms_ecoute.commentaire_appreciation_francais," +
      " ms_ecoute.commentaire_appreciation_metier, ms_ecoute.iso_eole_formation, ms_ecoute.reprise_francais, ms_ecoute.reprise_metier, ms_campagne.libelle as campagne ," +
      " ms_type_ecoute.libelle as type_ecoute, ms_appreciation.libelle as appreciation, ms_motif_non_conformite.libelle as nc," +
      "ms_specialite.libelle as spec,ms_mode.libelle as mode,francais_formation,metier_formation,almerys_user_new_crc.nom as pseudo, almerys_user_new_crc.nom as nom_crc," +
      "SUM(note) as nt,almerys_user_new_crc.id,almerys_user_new_crc.id_equipe_crc as ice,almerys_user_new_crc.vague,numero_enregistrement," +
      "SUM(CASE WHEN note is not null THEN ponderation ELSE 0 END) as pnd,date_enregistrement,DATE_PART('epoch', fin_ecoute - deb_ecoute ) as dur_ecoute," +
      "deb_ecoute,fin_ecoute,ms_motif_appel.libelle,conforme,ms_ecoute.id_ecoute,ms_ecoute.id_pers " +
      " ,conforme,(SELECT libelle from ms_equipe_crc WHERE ms_equipe_crc.id_equipe_crc = almerys_user_new_crc.id_equipe_crc limit 1) as ce,r_personnel.appelation,duree_appel, " +
      
      //"string_agg(concat(commentaire,'(',type_commentaire_ggs,')'), ';') as synthese, "+
      "(select string_agg(commentaire, ';') from ms_note where type_commentaire_ggs = '1' and ms_note.id_ecoute = ms_ecoute.id_ecoute and commentaire != '') as synthese_metier,  "+
      "(select string_agg(commentaire, ';') from ms_note where type_commentaire_ggs = '2' and ms_note.id_ecoute = ms_ecoute.id_ecoute and commentaire != '') as synthese_charte,  "+
      "(select string_agg(commentaire, ';') from ms_note where type_commentaire_ggs = '3' and ms_note.id_ecoute = ms_ecoute.id_ecoute and commentaire != '') as synthese_discours,  "+


      "ms_mutuelle.libelle as mutuelle, ms_qualite.libelle as qualite, ms_conformite.libelle as conformite, ms_motif_non_qualite.libelle as motif_nq, ms_evaluateur_crc.nom as evaluateur "+
      
      "FROM ms_ecoute " +
      "LEFT JOIN ms_note ON ms_note.id_ecoute = ms_ecoute.id_ecoute " +
      "LEFT JOIN ms_details_notation ON ms_details_notation.id_details_notation = ms_note.id_details_notation " +
      "JOIN ms_motif_appel_crc ms_motif_appel ON ms_motif_appel.id_motif_appel_crc = ms_ecoute.id_motif " +
      "JOIN almerys_user_new_crc ON almerys_user_new_crc.id = ms_ecoute.id_pers " +
      "JOIN r_personnel ON r_personnel.id_pers = ms_ecoute.id_pers_ecoute " +

      "LEFT JOIN ms_type_ecoute ON ms_type_ecoute.id_type_ecoute = ms_ecoute.id_type_ecoute " +
      "LEFT JOIN ms_appreciation ON ms_appreciation.id_appreciation = ms_ecoute.id_appreciation " +

      "LEFT JOIN ms_mode_crc ms_mode ON ms_mode.id_mode_crc = ms_ecoute.id_mode " +
      "LEFT JOIN ms_motif_non_conformite ON ms_motif_non_conformite.id_motif_non_conformite = ms_ecoute.id_motif_non_conformite " +
      "LEFT JOIN ms_specialite ON ms_specialite.id_specialite = ms_ecoute.id_specialite " +
      "LEFT JOIN ms_campagne ON ms_campagne.id_campagne = ms_ecoute.id_campagne " +


      "LEFT JOIN ms_mutuelle ms_mutuelle ON ms_mutuelle.id = ms_ecoute.id_call  " +
      "LEFT JOIN ms_qualite ms_qualite ON ms_qualite.id = ms_ecoute.id_qualite  " +
      "LEFT JOIN ms_conformite ms_conformite ON ms_conformite.id = ms_ecoute.id_qualite  " +
      "LEFT JOIN ms_motif_non_qualite ms_motif_non_qualite ON ms_motif_non_qualite.id = ms_ecoute.id_motif_nq  " +
      "LEFT JOIN ms_evaluateur_crc ms_evaluateur_crc ON ms_evaluateur_crc.id = ms_ecoute.id_evaluateur  " +

      "WHERE 1=1 " +sqlWhere+"  AND ms_ecoute.is_lamie = true  "+ whereDate +
      //"AND to_date(to_char(date_enregistrement,'yyyyMMdd'),'yyyyMMdd') BETWEEN to_date('"+option.date_deb+"','yyyyMMdd') AND  to_date('"+option.date_fin+"','yyyyMMdd')  " +
      " GROUP BY almerys_user_new_crc.prenom,almerys_user_new_crc.id,ms_ecoute.id_pers,date_enregistrement,deb_ecoute,ms_motif_appel.libelle,ms_ecoute.id_ecoute,almerys_user_new_crc.id_equipe_crc,conforme,almerys_user_new_crc.vague,numero_enregistrement,r_personnel.appelation,duree_appel,conforme,ms_mode.libelle,ms_motif_non_conformite.libelle,ms_specialite.libelle, francais_formation,metier_formation,ms_type_ecoute.libelle, ms_appreciation.libelle, ms_campagne.libelle,   " +
      "ms_mutuelle.libelle,ms_qualite.libelle, ms_conformite.libelle, ms_motif_non_qualite.libelle,ms_evaluateur_crc.nom "+
      "ORDER BY almerys_user_new_crc.id_equipe_crc,ms_ecoute.id_pers,date_enregistrement  ";

    console.log(sql);
    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//on retourne ici la liste des ecoutes 160
    });
  },


  getDataTemplate : function (option,callback) {
    var sql = " SELECT ms_details_notation.id_details_notation,ms_details_notation.ponderation,ms_details_notation.libelle as notation,ms_categorie_notation.id_categorie_notation,ms_categorie_notation.libelle as categorie, ms_categorie_notation.icone as icone, ms_categorie_notation.couleur_icone as couleur FROM ms_details_notation JOIN ms_categorie_notation ON ms_categorie_notation.id_categorie_notation = ms_details_notation.id_categorie_notation WHERE type_appel = 1 ORDER BY ms_categorie_notation.id_categorie_notation,ms_details_notation.id_details_notation ";

    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getDataTemplateCodelis : function (option,callback) {
    var sql = " SELECT ms_details_notation.id_details_notation,ms_details_notation.ponderation,ms_details_notation.libelle as notation,ms_categorie_notation.id_categorie_notation,ms_categorie_notation.libelle as categorie, ms_categorie_notation.icone as icone, ms_categorie_notation.couleur_icone as couleur FROM ms_details_notation JOIN ms_categorie_notation ON ms_categorie_notation.id_categorie_notation = ms_details_notation.id_categorie_notation WHERE type_appel = 7 ORDER BY ms_categorie_notation.id_categorie_notation,ms_details_notation.id_details_notation ";

    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getDataTemplateCodelis : function (option,callback) {
    var sql = " SELECT ms_details_notation.id_details_notation,ms_details_notation.ponderation,ms_details_notation.libelle as notation,ms_categorie_notation.id_categorie_notation,ms_categorie_notation.libelle as categorie, ms_categorie_notation.icone as icone, ms_categorie_notation.couleur_icone as couleur FROM ms_details_notation JOIN ms_categorie_notation ON ms_categorie_notation.id_categorie_notation = ms_details_notation.id_categorie_notation WHERE type_appel = 7 ORDER BY ms_categorie_notation.id_categorie_notation,ms_details_notation.id_details_notation ";

    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  /*getDataTemplateDoctocare : function (option,callback) {
    var sql = " SELECT ms_details_notation.id_details_notation,ms_details_notation.ponderation,ms_details_notation.libelle as notation,ms_categorie_notation.id_categorie_notation,ms_categorie_notation.libelle as categorie, ms_categorie_notation.icone as icone, ms_categorie_notation.couleur_icone as couleur FROM ms_details_notation JOIN ms_categorie_notation ON ms_categorie_notation.id_categorie_notation = ms_details_notation.id_categorie_notation WHERE type_appel = 9 ORDER BY ms_categorie_notation.id_categorie_notation,ms_details_notation.id_details_notation ";

    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },*/

  getDataTemplateBriant : function (option,callback) {
    var sql = " SELECT ms_details_notation.id_details_notation,ms_details_notation.ponderation,ms_details_notation.libelle as notation,ms_categorie_notation.id_categorie_notation,ms_categorie_notation.libelle as categorie, ms_categorie_notation.icone as icone, ms_categorie_notation.couleur_icone as couleur FROM ms_details_notation JOIN ms_categorie_notation ON ms_categorie_notation.id_categorie_notation = ms_details_notation.id_categorie_notation WHERE type_appel = 8 ORDER BY ms_categorie_notation.id_categorie_notation,ms_details_notation.id_details_notation ";

    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getDataTemplateBriantAs : function (option,callback) {
    var sql = " SELECT ms_details_notation.id_details_notation,ms_details_notation.ponderation,ms_details_notation.libelle as notation,ms_categorie_notation.id_categorie_notation,ms_categorie_notation.libelle as categorie, ms_categorie_notation.icone as icone, ms_categorie_notation.couleur_icone as couleur FROM ms_details_notation JOIN ms_categorie_notation ON ms_categorie_notation.id_categorie_notation = ms_details_notation.id_categorie_notation WHERE type_appel = 13 ORDER BY ms_categorie_notation.id_categorie_notation,ms_details_notation.id_details_notation ";

    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  /*getDataTemplateBriant : function (option,callback) {
    var sql = " SELECT ms_details_notation.id_details_notation,ms_details_notation.ponderation,ms_details_notation.libelle as notation,ms_categorie_notation.id_categorie_notation,ms_categorie_notation.libelle as categorie, ms_categorie_notation.icone as icone, ms_categorie_notation.couleur_icone as couleur FROM ms_details_notation JOIN ms_categorie_notation ON ms_categorie_notation.id_categorie_notation = ms_details_notation.id_categorie_notation WHERE type_appel = 6 ORDER BY ms_categorie_notation.id_categorie_notation,ms_details_notation.id_details_notation ";

    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },*/

   getDateNow : function (option,callback) {
      var sql = "SELECT current_time";
      Statistique.query(sql, function(err, res){
        if(err) return callback(err);
        return callback(null, res.rows);//
      });
    },

    getDataTemplateAS : function (option,callback) { //2
      var sql = " SELECT ms_details_notation.id_details_notation,ms_details_notation.ponderation,ms_details_notation.libelle as notation,ms_categorie_notation.id_categorie_notation,ms_categorie_notation.libelle as categorie, ms_categorie_notation.icone as icone, ms_categorie_notation.couleur_icone as couleur FROM ms_details_notation JOIN ms_categorie_notation ON ms_categorie_notation.id_categorie_notation = ms_details_notation.id_categorie_notation WHERE type_appel = 5 ORDER BY ms_categorie_notation.id_categorie_notation,ms_details_notation.id_details_notation ";

      Statistique.query(sql, function(err, res){
        if(err) return callback(err);
        return callback(null, res.rows);//
      });
    },

    getDataTemplateDoctocare : function (option,callback) { //2
      var sql = " SELECT ms_details_notation.id_details_notation,ms_details_notation.ponderation,ms_details_notation.libelle as notation,ms_categorie_notation.id_categorie_notation,ms_categorie_notation.libelle as categorie, ms_categorie_notation.icone as icone, ms_categorie_notation.couleur_icone as couleur FROM ms_details_notation JOIN ms_categorie_notation ON ms_categorie_notation.id_categorie_notation = ms_details_notation.id_categorie_notation WHERE type_appel = 9 ORDER BY ms_categorie_notation.id_categorie_notation,ms_details_notation.id_details_notation ";

      Statistique.query(sql, function(err, res){
        if(err) return callback(err);
        return callback(null, res.rows);//
      });
    },

    getDataTemplateTpmep : function (option,callback) { 
      var sql = " SELECT ms_details_notation.id_details_notation,ms_details_notation.ponderation,ms_details_notation.libelle as notation,ms_categorie_notation.id_categorie_notation,ms_categorie_notation.libelle as categorie, ms_categorie_notation.icone as icone, ms_categorie_notation.couleur_icone as couleur FROM ms_details_notation JOIN ms_categorie_notation ON ms_categorie_notation.id_categorie_notation = ms_details_notation.id_categorie_notation WHERE type_appel = 10 ORDER BY ms_categorie_notation.id_categorie_notation,ms_details_notation.id_details_notation ";

      Statistique.query(sql, function(err, res){
        if(err) return callback(err);
        return callback(null, res.rows);//
      });
    },

    // getDataTemplateIsoEole

    getDataTemplateIsoEole : function (option,callback) {
      var sql = " SELECT ms_details_notation.id_type_commentaire_ggs,ms_details_notation.fait_part,ms_details_notation.id_details_notation,ms_details_notation.ponderation,ms_details_notation.libelle as notation,ms_categorie_notation.id_categorie_notation,ms_categorie_notation.libelle as categorie, ms_categorie_notation.icone as icone, ms_categorie_notation.couleur_icone as couleur FROM ms_details_notation JOIN ms_categorie_notation ON ms_categorie_notation.id_categorie_notation = ms_details_notation.id_categorie_notation WHERE type_appel = 14 ORDER BY ms_categorie_notation.id_categorie_notation,ms_details_notation.id_details_notation ";

      Statistique.query(sql, function(err, res){
        if(err) return callback(err);
        return callback(null, res.rows);//
      });
    },

    getDataTemplateCss : function (option,callback) {
      var sql = " SELECT ms_details_notation.id_details_notation,ms_details_notation.ponderation,ms_details_notation.libelle as notation,ms_categorie_notation.id_categorie_notation,ms_categorie_notation.libelle as categorie, ms_categorie_notation.icone as icone, ms_categorie_notation.couleur_icone as couleur FROM ms_details_notation JOIN ms_categorie_notation ON ms_categorie_notation.id_categorie_notation = ms_details_notation.id_categorie_notation WHERE type_appel = 11 ORDER BY ms_categorie_notation.id_categorie_notation,ms_details_notation.id_details_notation ";

      Statistique.query(sql, function(err, res){
        if(err) return callback(err);
        return callback(null, res.rows);//
      });
    },

    getDataTemplateLamie : function (option,callback) {
      var sql = " SELECT ms_details_notation.id_details_notation,ms_details_notation.ponderation,ms_details_notation.libelle as notation,ms_categorie_notation.id_categorie_notation,ms_categorie_notation.libelle as categorie, ms_categorie_notation.icone as icone, ms_categorie_notation.couleur_icone as couleur FROM ms_details_notation JOIN ms_categorie_notation ON ms_categorie_notation.id_categorie_notation = ms_details_notation.id_categorie_notation WHERE type_appel = 12 ORDER BY ms_categorie_notation.id_categorie_notation,ms_details_notation.id_details_notation ";

      Statistique.query(sql, function(err, res){
        if(err) return callback(err);
        return callback(null, res.rows);//
      });
    },

    getDataTemplateClientEole : function (option,callback) {
      var sql = " SELECT ms_details_notation.id_details_notation,ms_details_notation.ponderation,ms_details_notation.libelle as notation,ms_categorie_notation.id_categorie_notation,ms_categorie_notation.libelle as categorie, ms_categorie_notation.icone as icone, ms_categorie_notation.couleur_icone as couleur FROM ms_details_notation JOIN ms_categorie_notation ON ms_categorie_notation.id_categorie_notation = ms_details_notation.id_categorie_notation WHERE type_appel = 3 ORDER BY ms_categorie_notation.id_categorie_notation,ms_details_notation.id_details_notation ";

      Statistique.query(sql, function(err, res){
        if(err) return callback(err);
        return callback(null, res.rows);//
      });
    },

    getDataTemplateEole : function (option,callback) {
      var sql = " SELECT ms_details_notation.id_details_notation,ms_details_notation.ponderation,ms_details_notation.libelle as notation,ms_categorie_notation.id_categorie_notation,ms_categorie_notation.libelle as categorie, ms_categorie_notation.icone as icone, ms_categorie_notation.couleur_icone as couleur FROM ms_details_notation JOIN ms_categorie_notation ON ms_categorie_notation.id_categorie_notation = ms_details_notation.id_categorie_notation WHERE type_appel = 3 ORDER BY ms_categorie_notation.id_categorie_notation,ms_details_notation.id_details_notation ";

      Statistique.query(sql, function(err, res){
        if(err) return callback(err);
        return callback(null, res.rows);//
      });
    },

    /*getDataTemplateIsoEole : function (option,callback) {
      var sql = " SELECT ms_details_notation.fait_part, type_ms_details_notation.id_details_notation,ms_details_notation.ponderation,ms_details_notation.libelle as notation,ms_categorie_notation.id_categorie_notation,ms_categorie_notation.libelle as categorie, ms_categorie_notation.icone as icone, ms_categorie_notation.couleur_icone as couleur FROM ms_details_notation JOIN ms_categorie_notation ON ms_categorie_notation.id_categorie_notation = ms_details_notation.id_categorie_notation WHERE type_appel = 14 ORDER BY ms_categorie_notation.id_categorie_notation,ms_details_notation.id_details_notation ";

      Statistique.query(sql, function(err, res){
        if(err) return callback(err);
        return callback(null, res.rows);//
      });
    },*/

    getDataTemplateTpmep : function (option,callback) {
      var sql = " SELECT ms_details_notation.id_details_notation,ms_details_notation.ponderation, "+
      "ms_details_notation.libelle as notation,ms_categorie_notation.id_categorie_notation, "+
      "ms_categorie_notation.libelle as categorie, ms_categorie_notation.icone as icone, "+
      "ms_categorie_notation.couleur_icone as couleur FROM ms_details_notation "+
      "JOIN ms_categorie_notation ON ms_categorie_notation.id_categorie_notation = ms_details_notation.id_categorie_notation "+
      "WHERE type_appel = 10 ORDER BY ms_categorie_notation.id_categorie_notation, "+
      "ms_details_notation.id_details_notation ";
  
      Statistique.query(sql, function(err, res){
        if(err) return callback(err);
        return callback(null, res.rows);//
      });
    },

  getDataNotation : function (option,callback) {
      var sql = " SELECT * FROM ms_note JOIN ms_details_notation ON ms_details_notation.id_details_notation=ms_note.id_details_notation" +
        " WHERE id_ecoute ="+option.id;

      Statistique.query(sql, function(err, res){
        if(err) return callback(err);
        return callback(null, res.rows);//
      });
    },

    getDataCodelisNotation : function (option,callback) {
      var sql = " SELECT * FROM ms_note JOIN ms_details_notation ON ms_details_notation.id_details_notation=ms_note.id_details_notation" +
        " WHERE id_ecoute ="+option.id;

      Statistique.query(sql, function(err, res){
        if(err) return callback(err);
        return callback(null, res.rows);//
      });
    },

    getDataDoctocareNotation : function (option,callback) {
      var sql = " SELECT ms_note.*, ms_details_notation.ponderation, ms_details_notation.id_details_notation FROM ms_note JOIN ms_details_notation ON ms_details_notation.id_details_notation=ms_note.id_details_notation" +
        " WHERE 1 = 1 AND ms_details_notation.type_appel= 9 AND id_ecoute ="+option.id;

      Statistique.query(sql, function(err, res){
        if(err) return callback(err);
        return callback(null, res.rows);//
      });
    },

    getDataDoctocareSatisfaitProcedure : function (option,callback) {
      var sql = " SELECT doctocare_satisfait, doctocare_procedure from ms_ecoute WHERE id_ecoute ="+option.id;

      Statistique.query(sql, function(err, res){
        if(err) return callback(err);
        return callback(null, res.rows);//
      });
    },

    getDataBriantNotation : function (option,callback) {
      var sql = " SELECT ms_note.*, ms_details_notation.ponderation, ms_details_notation.id_details_notation FROM ms_note JOIN ms_details_notation ON ms_details_notation.id_details_notation=ms_note.id_details_notation" +
        " WHERE 1 = 1 AND ms_details_notation.type_appel= 8 AND id_ecoute ="+option.id;

      Statistique.query(sql, function(err, res){
        if(err) return callback(err);
        return callback(null, res.rows);//
      });
    },

    getDataBriantAsNotation : function (option,callback) {
      var sql = " SELECT ms_note.*, ms_details_notation.ponderation, ms_details_notation.id_details_notation FROM ms_note JOIN ms_details_notation ON ms_details_notation.id_details_notation=ms_note.id_details_notation" +
        " WHERE 1 = 1 AND ms_details_notation.type_appel= 13 AND id_ecoute ="+option.id;

      Statistique.query(sql, function(err, res){
        if(err) return callback(err);
        return callback(null, res.rows);//
      });
    },

    getDataASNotation : function (option,callback) {
        var sql = " SELECT * FROM ms_note JOIN ms_details_notation ON ms_details_notation.id_details_notation=ms_note.id_details_notation" +
          " WHERE 1=1 AND ms_details_notation.type_appel= 2 AND  id_ecoute ="+option.id;

        Statistique.query(sql, function(err, res){
          if(err) return callback(err);
          return callback(null, res.rows);//
        });
      },

      getDataEoleNotation : function (option,callback) {
          var sql = " SELECT * FROM ms_note JOIN ms_details_notation ON ms_details_notation.id_details_notation=ms_note.id_details_notation" +
            " WHERE 1=1 AND ms_details_notation.type_appel= 3 AND  id_ecoute ="+option.id;

          Statistique.query(sql, function(err, res){
            if(err) return callback(err);
            return callback(null, res.rows);//
          });
        },

        getDataIsoEoleNotation : function (option,callback) {
            var sql = " SELECT ms_note.*, ms_details_notation.ponderation FROM ms_note JOIN ms_details_notation ON ms_details_notation.id_details_notation=ms_note.id_details_notation" +
              " WHERE 1=1 AND ms_details_notation.type_appel= 14 AND  id_ecoute ="+option.id;

            Statistique.query(sql, function(err, res){
              if(err) return callback(err);
              return callback(null, res.rows);//
            });
          },

          getDataCssNotation : function (option,callback) {
            var sql = " SELECT * FROM ms_note JOIN ms_details_notation ON ms_details_notation.id_details_notation=ms_note.id_details_notation" +
              " WHERE 1=1 AND ms_details_notation.type_appel= 11 AND  id_ecoute ="+option.id;
      
            Statistique.query(sql, function(err, res){
              if(err) return callback(err);
              return callback(null, res.rows);//
            });
          },
      
          getDataLamieNotation : function (option,callback) {
            var sql = " SELECT * FROM ms_note JOIN ms_details_notation ON ms_details_notation.id_details_notation=ms_note.id_details_notation" +
              " WHERE 1=1 AND ms_details_notation.type_appel= 12 AND  id_ecoute ="+option.id;
      
            Statistique.query(sql, function(err, res){
              if(err) return callback(err);
              return callback(null, res.rows);//
            });
          },

    getLSCE : function (option,callback) {
      var sql = " select distinct * from almerys_user_new where matricule = id_ce ORDER BY pseudo";

      Statistique.query(sql, function(err, res){
        if(err) return callback(err);
        return callback(null, res.rows);//
      });
    },

    getLSSQ : function (option,callback) {
      var sql2 = "select distinct almerys_user_new.*, r_personnel.appelation from almerys_user_new join r_personnel on almerys_user_new.matricule = r_personnel.id_pers where almerys_user_new.matricule in (1007,974,745,766,748) ORDER BY pseudo";

      Statistique.query(sql2, function(err, res){
        if(err) return callback(err);
        return callback(null, res.rows);//
      });
    },

    getLSVague : function (option,callback) {
      var sql = "select distinct ms_vague.id_vague as id_vague,libelle from ms_vague Left join almerys_user_new on  almerys_user_new.id_vague = ms_vague.id_vague WHERE 1=1 "+option+" order by ms_vague.id_vague";

      Statistique.query(sql, function(err, res){
        if(err) return callback(err);
        return callback(null, res.rows);//
      });
    },
  getDataEcoute : function (option,callback) {
    var sql = " SELECT * FROM ms_ecoute JOIN r_personnel ON r_personnel.id_pers=ms_ecoute.id_pers JOIN ms_motif_appel ON ms_motif_appel.id_motif_appel = ms_ecoute.id_motif " +
      " WHERE id_ecoute ="+option.id;

    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows[0]);//
    });
  },


  getProfile : function (option,callback) {
    var sql = " SELECT almerys_user_new.matricule,almerys_user_new.sat,almerys_user_new.pseudo," +
      " r_personnel.nom,r_personnel.prenom," +
      " ms_vague.libelle,almerys_user_new.num_tel,ms_niveau.libelle as niveau " +
      " FROM almerys_user_new " +
      " JOIN ms_vague ON ms_vague.id_vague = almerys_user_new.id_vague " +
      " JOIN r_personnel ON r_personnel.id_pers = almerys_user_new.matricule " +
      " JOIN ms_niveau ON ms_niveau.id_niveau = almerys_user_new.id_niveau " +
      " WHERE almerys_user_new.matricule = "+option;

    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows[0]);//
    });
  },

  getProfileCRC : function (option,callback) {
    var sql = "select almerys_user_new_crc.*, ms_equipe_crc.* from almerys_user_new_crc join ms_equipe_crc on almerys_user_new_crc.id_equipe_crc = ms_equipe_crc.id_equipe_crc where id ="+option;

    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows[0]);//
    });
  },

  getLSUserCRC : function (option,callback) {
    var sql = "select distinct * from almerys_user_new_crc ";
    var sqlWhere = ' WHERE 1=1 ';
    if(option.id_ce !== '' && option.id_ce !== null  && typeof option.id_ce !== 'undefined')
      sqlWhere += ' AND id_equipe_crc = \''+option.id_ce+'\' ';
    if(option.vague !== '' && option.vague !== null  && typeof option.vague !== 'undefined')
      sqlWhere += ' AND vague = \''+option.vague+'\' ';
    if(option.is_ggs !== '' && option.is_ggs !== null  && typeof option.is_ggs !== 'undefined')
      sqlWhere += ' AND is_ggs = true ';
    if(option.is_css !== '' && option.is_css !== null  && typeof option.is_css !== 'undefined')
      sqlWhere += ' AND is_css = true ';

    var sqlOrder = ' ORDER BY nom,prenom ASC ';
    sql +=  sqlWhere + sqlOrder;

    sails.log(sql);
    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },


  getLSVagueCRC : function (option,callback) {
    var sql = "select distinct vague from almerys_user_new_crc ";
    var sqlWhere = ' WHERE 1=1 ';
    if(option.id_ce !== '' && option.id_ce !== null  && typeof option.id_ce !== 'undefined')
      sqlWhere += ' AND id_equipe_crc = \''+option.id_ce+'\' ';

    var sqlOrder = ' ORDER BY vague ASC ';
    sql +=  sqlWhere + sqlOrder;

    sails.log(sql);
    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getLSCECRC : function (option,callback) {
    var sql = "select distinct * from ms_equipe_crc ";
    var sqlWhere = ' WHERE 1=1 ';
    var sqlOrder = ' ORDER BY libelle ASC ';
    sql +=  sqlWhere + sqlOrder;

    sails.log(sql);
    Statistique.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },
};
