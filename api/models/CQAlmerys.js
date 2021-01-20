/**
 * CQAlmerys.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */


module.exports = {
  connection: 'ConnexionPostgresql',
  attributes: {

  },
  // get sepecialite ou dossier specifique almerys
  listSpecialite: function (option, callback) {
    var sql = "SELECT id_dossier,num_dossier from p_dossier where id_dossier IN(577,579,578,580,29,582,663,701,702,703,704,712,721,723,724,35,41,943,973,978) order by id_dossier asc";


    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },
  listSpecialiteCall: function (option, callback) {
    var sql = "SELECT id_dossier,num_dossier from p_dossier where id_dossier IN(858,859,860,861,496) order by id_dossier asc";
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  // get traitement  interial almerys
  listTraitement: function (option, callback) {
    var sql = "SELECT * from almerys_traitement ";


    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  // get tache  interial almerys
  listTache: function (option, callback) {
    var sql = "select * FROM  almerys_tache ";


    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  listTacheByIdLotClient: function (option, callback) {
    var sql = "select p_etape.id_etape,p_etape.libelle from p_etape join p_lien_oper_dossier ON id_oper = p_etape.id_etape WHERE id_dossier = " + option.id + "";


    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  listTacheBySSP: function (option, callback) {
    var sql = "select p_etape.id_etape,p_etape.libelle from p_etape join p_lien_oper_dossier ON id_oper = p_etape.id_etape WHERE id_dossier = " + option.id + "";


    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  listTacheBySSSP: function (option, callback) {
    var sql = "select p_etape.id_etape,p_etape.libelle from p_etape join p_lien_oper_dossier ON id_oper = p_etape.id_etape WHERE id_dossier = " + option.id + "";


    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },
  //recuperation de tous les sous speciaité
  listSSBySP: function (option, callback) {
    var sql = "SELECT p_dossier.id_dossier,num_dossier,id_lotclient,libelle FROM p_dossier" +
      " JOIN p_lot_client ON p_dossier.id_dossier = p_lot_client.id_dossier " +
      " where p_dossier.id_dossier IN(577,579,578,580,29,582,663,701,702,703,704,712,721,723,724,35,41)";


    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },
  // get sous_sepecialite ou p_lot_client specifique almerys
  listSousSpecialite: function (option, callback) {
    //var sql = "SELECT id_dossier,id_lotclient,libelle,cible_a,cible_b,cible_c,cible_d from p_lot_client where id_dossier ="+option.id_dossier+" AND  id_etat=0 ORDER BY id_lotclient";
    var sql = "SELECT id_dossier,id_lotclient,libelle,cible_a,cible_b,cible_c,cible_d,id_etat,vitesse_equilibre from p_lot_client where id_dossier =" + option.id_dossier + "  AND  id_etat=0  ORDER BY id_lotclient";


    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },


  listSSousSpecialite: function (option, callback) {
    var sql = "SELECT id_ss_spe,id_lotclient,libelle,id_dossier,etat,vitesse_equilibre from almerys_ss_spe where id_dossier =" + option.id_dossier + " AND etat=0 AND id_lotclient =" + option.id_loclient + " ORDER BY libelle";

    ////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  listSSSousSpecialite: function (option, callback) {
    var sql = "SELECT id_ss_spe,id,libelle,etat,vitesse_equilibre from almerys_ss_spe2 where etat=0 AND  id_ss_spe =" + option.id + " ORDER BY libelle";

    ////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  listRestrictionEtape: function (option, callback) {
    var sql = "select p_etape.libelle,almerys_restriction.id from almerys_restriction " +
      "JOIN p_lien_oper_dossier ON p_lien_oper_dossier.id_lien = almerys_restriction.id_table " +
      "JOIN p_etape ON p_etape.id_etape = p_lien_oper_dossier.id_oper " +
      "where almerys_restriction.id_lotclient = " + option.id_lotclient + " " +
      "AND almerys_restriction.id_ss_spe = " + option.id_ss_spe + " AND id_ss_spe2 = " + option.id_ss_spe2 + " " +
      "AND \"table\" = 'p_lien_oper_dossier' ";

    ////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  listRestrictionTache: function (option, callback) {
    var sql = "select almerys_tache.libelle,almerys_restriction.id from almerys_restriction " +
      "JOIN almerys_tache ON almerys_tache.id_tache = almerys_restriction.id_table " +
      "where almerys_restriction.id_lotclient = " + option.id_lotclient + " " +
      "AND almerys_restriction.id_ss_spe = " + option.id_ss_spe + " AND id_ss_spe2 = " + option.id_ss_spe2 + " " +
      "AND \"table\" = 'almerys_tache' ";

    //console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  listRestrictionDistinction: function (option, callback) {
    var sql = "select almerys_distinction.libelle,almerys_restriction.id from almerys_restriction " +
      "JOIN almerys_distinction ON almerys_distinction.id_distinction = almerys_restriction.id_table " +
      "where almerys_restriction.id_lotclient = " + option.id_lotclient + " " +
      "AND almerys_restriction.id_ss_spe = " + option.id_ss_spe + " AND id_ss_spe2 = " + option.id_ss_spe2 + " " +
      "AND \"table\" = 'almerys_distinction' ";

    //console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },
  getSousSpecialite: function (option, callback) {
    var sql = "SELECT id_dossier,id_lotclient,libelle,cible_a,cible_b,cible_c,cible_d from p_lot_client where id_dossier =" + option.id_dossier + "  AND id_lotclient=" + option.id_lot + " ORDER BY id_lotclient";


    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows[0].libelle);
    });
  },


  UpdateSousSpecialite: function (option, callback) {
    var sql = "Update p_lot_client SET  cible_a=" + option.a + ", cible_b=" + option.b + ", cible_c=" + option.c + ", cible_d=" + option.d + "  WHERE id_lotclient=" + option.id_lotclient;
    Ldt.query(sql, function (err, res) {
      if (err) return callback(sql);
      return callback(null, true);
    });
  },

  listSatByCQ: function (option, callback) {
    var sql = "select distinct almerys_user_new.id,sat from almerys_user_new " +
      "Join r_personnel on r_personnel.id_pers = almerys_user_new.matricule " +
      "join r_departement on r_departement.id = r_personnel.id_departement " +
      "JOIN p_lot on p_lot.id_pers=almerys_user_new.matricule " +
      "JOIN almerys_p_lot_new on almerys_p_lot_new.id_lot=p_lot.id_lot  " +
      "where r_personnel.id_departement =" + option.id_dep + " " +
      "AND to_date(almerys_p_lot_new.date_deb,'yyyyMMdd') = to_date('" + option.date + "','yyyyMMdd') order by sat asc";

    //////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  listSat: function (option, callback) {
    var sql = "SELECT sat, id from almerys_user_new order by sat asc";

    ////////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },



  listEtat: function (option, callback) {
    var sql = "select * from almerys_p_etat";
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  listClientCQ: function (option, callback) {
    var sql = "select * from p_client where is_cqalm=true";
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },
  listEtape: function (option, callback) {
    var sql = "select p_etape.id_etape,p_etape.libelle from p_etape JOIN p_lien_oper_dossier ON id_oper = id_etape WHERE id_dossier=" + option;
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },
  listEtapeSolimu: function (option, callback) {
    var sql = "select id_lien as id_etape, libelle from p_lien_oper_dossier " +
      " LEFT JOIN p_etape ON p_etape.id_etape = p_lien_oper_dossier.id_oper " +
      " where id_dossier = 951 " +
      " ORDER by p_etape.libelle";
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  population: function (option, callback) {
    var sql = "select quantite as qte from almerys_population where id_lot_client =" + option.id_lot + " AND pdate ='" + option.pdate + "' order by id desc limit 1";
    //////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      //////console.log(JSON.stringify(res.rows));
      if (res.rows.length < 1) {
        return callback(null, "0");
      } else {
        return callback(null, "" + res.rows[0].qte);
      }
    });
  },

  getLot: function (option, callback) {
    var sql = "select id_lot_client,quantite as qte,echantillon from almerys_population where pdate ='" + new Date().toISOString().replace(/-/, '').replace(/-/, '').substr(0, 8) + "'";
    //////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },
  getLotByDate: function (option, callback) {
    var sql = "select id_lot_client,quantite as qte,echantillon from almerys_population where to_date(pdate,'yyyyMMdd') = to_date('" + option.pdate + "','yyyyMMdd')";
    //////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },
  getPopByDate: function (option, callback) {
    var sql = "select count(almerys_p_lot_new.id_etat) as ct,p_lot.id_lotclient from almerys_p_lot_new join p_lot on p_lot.id_lot = almerys_p_lot_new.id_lot where to_date(almerys_p_lot_new.date_deb,'yyyyMMdd') = to_date('" + option.pdate + "','yyyyMMdd') group by p_lot.id_lotclient";
    //////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },
  getEchByDate: function (option, callback) {
    var sql = "select count(almerys_p_lot_new.id_etat) as ct,p_lot.id_lotclient from almerys_p_lot_new join p_lot on p_lot.id_lot = almerys_p_lot_new.id_lot where almerys_p_lot_new.id_etat <> 1 AND to_date(almerys_p_lot_new.date_deb,'yyyyMMdd') = to_date('" + option.pdate + "','yyyyMMdd') group by p_lot.id_lotclient";
    //////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  getErrByDate: function (option, callback) {
    var sql = "select count(almerys_p_lot_new.id_etat) as ct,p_lot.id_lotclient from almerys_p_lot_new join p_lot on p_lot.id_lot = almerys_p_lot_new.id_lot where almerys_p_lot_new.id_etat IN(4,5) AND to_date(almerys_p_lot_new.date_deb,'yyyyMMdd') = to_date('" + option.pdate + "','yyyyMMdd') group by p_lot.id_lotclient";
    //////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },


  getCategorie: function (option, callback) {
    var sql = "select effectif_echantillonage as echant from almerys_category where " + option.pop + " between effectif_minimal and effectif_maximal";
    //////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows[0].echant);
    });
  },

  addPopulation: function (option, callback) {
    var sql = "INSERT INTO almerys_population (id_lot_client,quantite,pdate) values (" + option.id_lot + "," + option.quantite + ",'" + option.pdate + "')";
    //////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);

      return callback(null, "ok");
    });
  },

  addPopulationNew: function (option, callback) {
    var sql = "INSERT INTO almerys_population (id_lot_client,quantite,pdate,echantillon) values (" + option.id_lot + "," + option.quantite + ",'" + option.pdate + "'," + option.echantillon + ")";
    //////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);

      return callback(null, "ok");
    });
  },

  updatePopulationNew: function (option, callback) {
    var sql = "UPDATE  almerys_population SET quantite = " + option.quantite + ",echantillon =" + option.echantillon + "  WHERE  id_lot_client=" + option.id_lot + " AND pdate='" + option.pdate + "'";
    //////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);

      return callback(null, "ok");
    });
  },
  listMotif: function (option, callback) {

    var id = option.id_etat;
    if (typeof id === 'undefined') {
      id = null;
    }
    var sql = "select id,libelle  from almerys_type_erreur where id_pole_new = " + option.id_pole + " AND id_etat = " + option.id_etat;

    ////console.log("MOTIFFF=====================================================================>"+sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  listErreur: function (option, callback) {
    var id = option.id_etat;
    if (typeof id === 'undefined') {
      id = null;
    }
    var sql = "select DISTINCT ON (libelle) id,libelle  from almerys_type_erreur where id_pole_new = " + option.id_pole + " AND id_etat = " + option.id_etat;
    //////console.log("MOTIFFF=====================================================================>"+sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  listCAT: function (option, callback) {
    var sql = "SELECT id_categorie,libelle_categorie,effectif_echantillonage FROM almerys_category";
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },


  setEchant: function (option, callback) {
    var sql = "UPDATE almerys_p_lot_new SET echantillon = true WHERE id=" + option.id;
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, true);
    });
  },

  getMatr: function (option, callback) {

    var sql = "select p_lot.id_pers from p_lot left join almerys_p_lot_new on almerys_p_lot_new.id_lot= p_lot.id_lot    where almerys_p_lot_new.id=" + option;
    console.log(" \nSQL get matricule >>>" + sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  //Selection des tables concernant cq almerys

  listCqAlm: function (option, callback) {
    var sqlInteral = "SELECT p_dossier.num_dossier as DOSSIER,\n" +
      "    p_lot_client.libelle as LOTCLIENT,\n" +
      "    (SELECT nom from r_personnel where id_pers = almerys_p_lot_new.id_cq) as nom_cq,\n" +
      "    (SELECT prenom from r_personnel where id_pers = almerys_p_lot_new.id_cq) as prenom_cq,\n" +
      "    p_lot.libelle as  LOT, \n" +
      "    p_lot.id_lotclient as  idp, \n" +
      "    p_etape.libelle as ETAPE, \n" +
      "    p_lot.duree as DUREE, \n" +
      "    p_lot.qte_op as QUANTITEOP, \n" +
      "    p_lot.id_pers as MATRICULESAISIE, \n" +
      "    almerys_p_lot_new.id_cq as MATRICULECQ, \n" +
      "    almerys_distinction.libelle as dist, \n" +
      "    almerys_p_lot_new.id as id,\n " +
      "    p_lot.id_dossier as id_dossier, \n" +
      "    almerys_p_lot_new.echantillon as echant, \n" +
      "    p_lot.priority as PRIORITE, \n" +
      "    almerys_p_lot_new.libelle as NUMEROFACTURE, \n" +
      "    almerys_p_lot_new.num_nuo as NUMERONUO, \n" +
      "    almerys_p_lot_new.num_ps as NUMEROPS , \n" +
      "    almerys_interial.num_secu as NUMEROCQ, \n" +
      "    almerys_interial.num_decompte as NUMERODECOMPTE, \n" +
      "    almerys_interial.etat as ETATINT, \n" +
      "    almerys_p_etat.libelle as ETAT, \n" +
      "    almerys_p_lot_new.qte as QUANTITE, \n" +
      "    almerys_tache.libelle as TACHE, \n" +
      "    almerys_p_lot_new.erreur as ERREUR, \n" +
      "    almerys_motif_rejet.libelle as MOTIFREJET, \n" +
      "    almerys_p_lot_new.date_deb as DATE, \n" +
      "    almerys_p_lot_new.h_deb as HEURE, \n" +
      "    almerys_type_controle.libelle as TYPE_CONTROLE , \n" +
      "    almerys_type_controle.id as id_tpc , \n" +
      "    r_departement.libelle as dep, \n" +
      "    r_departement.id as iddep, \n" +
      "    almerys_p_lot_new.id_etat as id_et, \n" +
      "    almerys_p_lot_new.id_motif_rejet as id_mot_rj, \n" +
      "    almerys_type_erreur.libelle as erreur_cq, \n" +
      "    almerys_type_fav.fav_a, \n" +
      "    almerys_type_fav.fav_b, \n" +
      "    almerys_type_fav.fav_c, \n" +
      "    almerys_type_fav.non_fav,\n" +
      "    almerys_ss_spe.libelle sous_sous_spec,\n" +
      "    almerys_ss_spe.id_ss_spe::integer ,\n" +
      "    p_client.nom as clientalm, \n" +
      "    almerys_mutuelle.libelle as libelle_mutuelle,\n" +
      "    almerys_p_lot_new.reprise_fini as reprise_fini,\n" +
      "    almerys_ss_spe2.libelle sous_sous_sous_spec,\n" +
      "    (SELECT sat from almerys_user_new where almerys_user_new.matricule = p_lot.id_pers limit 1) as sat \n";
    if (option.includes(' AND almerys_lien_ss_spe.id_alm_ss_spe  = 791') 
    || option.includes(' AND almerys_lien_ss_spe.id_alm_ss_spe  = 792') 
    || option.includes(' AND almerys_lien_ss_spe.id_alm_ss_spe  = 793') 
    || option.includes(' AND almerys_lien_ss_spe.id_alm_ss_spe  = 794')) {
      sqlInteral += ",almerys_convention.num_am as num_am,almerys_convention.num_interne as interne,\n" +
        "almerys_convention.commentaire as commentaire,id_couleur_nuo,is_am,is_interne,css,almerys_convention.saisie_ok\n";
    }
    sqlInteral += "    FROM almerys_p_lot_new\n " +
      "    JOIN p_lot on almerys_p_lot_new.id_lot = p_lot.id_lot \n" +
      "    JOIN almerys_p_etat on almerys_p_etat.id_etat = almerys_p_lot_new.id_etat \n" +
      "    JOIN p_dossier on p_lot.id_dossier = p_dossier.id_dossier \n" +
      "    JOIN p_lot_client on p_lot.id_lotclient = p_lot_client.id_lotclient\n " +
      "    LEFT JOIN p_lien_oper_dossier ON p_lien_oper_dossier.id_lien = p_lot.id_etape\n " +
      "    LEFT JOIN p_etape on p_etape.id_etape = p_lien_oper_dossier.id_oper \n" +
      "    JOIN p_etat on p_lot.id_etat = p_etat.id_etat \n" +
      "    JOIN r_personnel on r_personnel.id_pers = p_lot.id_pers \n" +
      "    JOIN r_departement on r_personnel.id_departement = r_departement.id \n" +
      "    LEFT JOIN almerys_motif_rejet on almerys_motif_rejet.id = almerys_p_lot_new.id_motif_rejet \n" +
      "    LEFT JOIN almerys_type_erreur on almerys_type_erreur.id = almerys_p_lot_new.id_type_erreur \n" +
      "    LEFT JOIN almerys_type_fav ON almerys_type_fav.id_pole_new = p_lot.id_lotclient \n" +
      "    LEFT JOIN almerys_user_new ON almerys_user_new.matricule = p_lot.id_pers \n" +
      "    LEFT JOIN almerys_type_controle ON almerys_type_controle.id = almerys_p_lot_new.id_type_controle \n" +
      "    LEFT JOIN almerys_distinction ON almerys_distinction.id_distinction = almerys_p_lot_new.id_distinction \n" +
      "    LEFT JOIN almerys_interial ON almerys_interial.id_almerys = almerys_p_lot_new.id \n" +
      "    LEFT JOIN almerys_tache ON almerys_p_lot_new.id_tache = almerys_tache.id_tache \n" +
      "    LEFT JOIN almerys_lien_ss_spe ON almerys_p_lot_new.id = almerys_lien_ss_spe.id_almerys \n" +
      "    LEFT JOIN almerys_ss_spe ON almerys_lien_ss_spe.id_alm_ss_spe = almerys_ss_spe.id_ss_spe \n" +
      "    LEFT JOIN almerys_ss_spe2 ON almerys_lien_ss_spe.id_lien_ss_spe2 = almerys_ss_spe2.id \n" +
      "    LEFT JOIN almerys_mutuelle ON almerys_p_lot_new.id_mutuelle = almerys_mutuelle.id \n" +
      "    LEFT JOIN p_client ON p_client.id_cl = almerys_p_lot_new.id_client_alm \n" +
      "    LEFT JOIN almerys_convention ON almerys_convention.id_almerys = almerys_p_lot_new.id\n" +
      "    LEFT JOIN almerys_nuo_conv_couleur ON almerys_nuo_conv_couleur.id = almerys_convention.id_couleur_nuo\n" +
      "    WHERE 1= 1 AND id_original is null \n" + option;

      if (option.includes(' AND almerys_lien_ss_spe.id_alm_ss_spe  = 791') 
    || option.includes(' AND almerys_lien_ss_spe.id_alm_ss_spe  = 792') 
    || option.includes(' AND almerys_lien_ss_spe.id_alm_ss_spe  = 793') 
    || option.includes(' AND almerys_lien_ss_spe.id_alm_ss_spe  = 794'))
      sqlInteral += " \nORDER BY  NUMERONUO asc,almerys_ss_spe2.id";
    else
      sqlInteral += " \nORDER BY almerys_p_lot_new.id asc";
    console.log("\n ****  SQL LISTE****\n" + sqlInteral);

    Ldt.query(sqlInteral, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  loadCQUpdated: function (option, callback) {


    var sql = "SELECT p_dossier.id_dossier ,p_dossier.num_dossier as DOSSIER, " +
      "    p_lot_client.libelle as LOTCLIENT, " +
      "    (SELECT nom from r_personnel where id_pers = almerys_p_lot_new.id_cq) as nom_cq, " +
      "    (SELECT prenom from r_personnel where id_pers = almerys_p_lot_new.id_cq) as prenom_cq, " +
      "    p_lot.libelle as  LOT, " +
      "    p_lot.id_lotclient as  idp, " +
      "    p_etape.libelle as ETAPE, " +
      "    p_lot.duree as DUREE, " +
      "    p_lot.qte_op as QUANTITEOP, " +
      "    p_lot.id_pers as MATRICULESAISIE, " +
      "    almerys_p_lot_new.id_cq as MATRICULECQ, " +
      "    almerys_distinction.libelle as dist, " +
      "    almerys_p_lot_new.id as id, " +
      "    p_lot.id_dossier as id_dossier, " +
      "    almerys_p_lot_new.echantillon as echant, " +
      "    p_lot.priority as PRIORITE, " +
      "    almerys_p_lot_new.libelle as NUMEROFACTURE, " +
      "    almerys_p_lot_new.num_nuo as NUMERONUO, " +
      "    almerys_p_lot_new.num_ps as NUMEROPS , " +
      "    almerys_interial.num_secu as NUMEROCQ, " +
      "    almerys_interial.num_decompte as NUMERODECOMPTE, " +
      "    almerys_interial.etat as ETATINT, " +
      "      almerys_p_etat.libelle as ETAT, " +
      "    almerys_p_lot_new.qte as QUANTITE, " +
      "    almerys_tache.libelle as TACHE, " +
      "    almerys_p_lot_new.erreur as ERREUR, " +
      "    almerys_motif_rejet.libelle as MOTIFREJET, " +
      "    almerys_p_lot_new.date_deb as DATE, " +
      "    almerys_p_lot_new.h_deb as HEURE, " +
      "    almerys_tache.libelle as TACHE, " +
      "    almerys_type_controle.libelle as TYPE_CONTROLE , " +
      "    almerys_type_controle.id as id_tpc , " +
      "    r_departement.libelle as dep, " +
      "    r_departement.id as iddep, " +
      "    almerys_p_lot_new.id_etat as id_et, " +
      "    almerys_p_lot_new.id_motif_rejet as id_mot_rj, " +
      "    almerys_type_erreur.libelle as erreur_cq, " +
      "      almerys_type_fav.fav_a, " +
      "      almerys_type_fav.fav_b, " +
      "      almerys_type_fav.fav_c, " +
      "      almerys_type_fav.non_fav," +
      "      almerys_ss_spe.libelle sous_sous_spec," +
      "      p_client.nom as clientalm, " +
      "      almerys_mutuelle.libelle as libelle_mutuelle," +
      "      almerys_p_lot_new.reprise_fini as reprise_fini," +
      "      almerys_ss_spe2.libelle sous_sous_sous_spec," +
      "      (SELECT sat from almerys_user_new where almerys_user_new.matricule = p_lot.id_pers limit 1) as sat " +
      "    FROM almerys_p_lot_new " +
      "    JOIN p_lot on almerys_p_lot_new.id_lot = p_lot.id_lot " +
      "    JOIN almerys_p_etat on almerys_p_etat.id_etat = almerys_p_lot_new.id_etat " +
      "    JOIN p_dossier on p_lot.id_dossier = p_dossier.id_dossier " +
      "    JOIN p_lot_client on p_lot.id_lotclient = p_lot_client.id_lotclient " +
      "    LEFT JOIN p_lien_oper_dossier ON p_lien_oper_dossier.id_lien = p_lot.id_etape " +
      "    LEFT JOIN p_etape on p_etape.id_etape = p_lien_oper_dossier.id_oper " +
      "    JOIN p_etat on p_lot.id_etat = p_etat.id_etat " +
      "    JOIN r_personnel on r_personnel.id_pers = p_lot.id_pers " +
      "    JOIN r_departement on r_personnel.id_departement = r_departement.id " +
      "    LEFT JOIN almerys_motif_rejet on almerys_motif_rejet.id = almerys_p_lot_new.id_motif_rejet " +
      "    LEFT JOIN almerys_type_erreur on almerys_type_erreur.id = almerys_p_lot_new.id_type_erreur " +
      "    LEFT JOIN almerys_tache ON almerys_p_lot_new.id_tache = almerys_tache.id_tache " +
      "    LEFT JOIN almerys_type_fav ON almerys_type_fav.id_pole_new = p_lot.id_lotclient " +
      "    LEFT JOIN almerys_user_new ON almerys_user_new.matricule = p_lot.id_pers " +
      "    LEFT JOIN almerys_type_controle ON almerys_type_controle.id = almerys_p_lot_new.id_type_controle " +
      "    LEFT JOIN almerys_distinction ON almerys_distinction.id_distinction = almerys_p_lot_new.id_distinction " +
      "    LEFT JOIN almerys_interial ON almerys_interial.id_almerys = almerys_p_lot_new.id " +
      "    LEFT JOIN almerys_lien_ss_spe ON almerys_p_lot_new.id = almerys_lien_ss_spe.id_almerys " +
      "    LEFT JOIN almerys_ss_spe ON almerys_lien_ss_spe.id_alm_ss_spe = almerys_ss_spe.id_ss_spe " +
      "    LEFT JOIN almerys_ss_spe2 ON almerys_lien_ss_spe.id_lien_ss_spe2 = almerys_ss_spe2.id " +
      "    LEFT JOIN almerys_mutuelle ON almerys_p_lot_new.id_mutuelle = almerys_mutuelle.id " +
      "    LEFT JOIN p_client ON p_client.id_cl = almerys_p_lot_new.id_client_alm " +
      " WHERE 1= 1 AND almerys_p_lot_new.id=" + option;

    ////console.log(sql);//test
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows[0]);
    });
  },

  // get count by etat
  countCqByEtat: function (option, callback) {
    var sql = "SELECT COUNT(p_dossier.num_dossier) as ct " +
      "    FROM almerys_p_lot_new " +
      "    JOIN p_lot on almerys_p_lot_new.id_lot = p_lot.id_lot " +
      "    JOIN almerys_p_etat on almerys_p_etat.id_etat = almerys_p_lot_new.id_etat " +
      "    JOIN p_dossier on p_lot.id_dossier = p_dossier.id_dossier " +
      "    JOIN p_lot_client on p_lot.id_lotclient = p_lot_client.id_lotclient " +
      "    LEFT JOIN p_lien_oper_dossier ON p_lien_oper_dossier.id_lien = p_lot.id_etape " +
      "    LEFT JOIN p_etape on p_etape.id_etape = p_lien_oper_dossier.id_oper " +
      "    JOIN p_etat on p_lot.id_etat = p_etat.id_etat " +
      "    LEFT JOIN almerys_motif_rejet on almerys_motif_rejet.id = almerys_p_lot_new.id_motif_rejet " +
      "    LEFT JOIN almerys_tache ON almerys_p_lot_new.id_tache = almerys_tache.id_tache " +
      "    LEFT JOIN almerys_type_fav ON almerys_type_fav.id_pole_new = p_lot.id_lotclient " +
      //" LEFT JOIN almerys_user  ON almerys_user.matricule = p_lot.id_pers " +
      " WHERE 1= 1 AND almerys_p_lot_new.id_etat =" + option.etat + " " + option.sql;


    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows[0].ct);
    });


  },


  countCqByPole: function (option, callback) {
    var sql = "SELECT COUNT(p_dossier.num_dossier) as ct " +
      "    FROM almerys_p_lot_new " +
      "    JOIN p_lot on almerys_p_lot_new.id_lot = p_lot.id_lot " +
      // "    JOIN almerys_p_etat on almerys_p_etat.id_etat = almerys_p_lot_new.id_etat " +
      "    JOIN p_dossier on p_lot.id_dossier = p_dossier.id_dossier " +
      /* "    JOIN p_lot_client on p_lot.id_lotclient = p_lot_client.id_lotclient " +
       "    JOIN p_lien_oper_dossier ON p_lien_oper_dossier.id_lien = p_lot.id_etape " +
       "    JOIN p_etape on p_etape.id_etape = p_lien_oper_dossier.id_oper " +
       "    JOIN p_etat on p_lot.id_etat = p_etat.id_etat " +*/
      "    JOIN r_personnel on r_personnel.id_pers = p_lot.id_pers " +
      "    LEFT JOIN almerys_motif_rejet on almerys_motif_rejet.id = almerys_p_lot_new.id_motif_rejet " +
      "    LEFT JOIN almerys_tache ON almerys_p_lot_new.id_tache = almerys_tache.id_tache " +
      "    LEFT JOIN almerys_type_fav ON almerys_type_fav.id_pole_new = p_lot.id_lotclient " +
      //" LEFT JOIN almerys_user ON almerys_user.matricule = p_lot.id_pers " +
      " WHERE 1= 1 AND p_dossier.id_dossier =" + option.id_dossier + " AND r_personnel.id_departement=" + option.id_dep + " " + option.sql;


    Ldt.query(sql, function (err, res) {
      if (err) {
        return callback({ er: err, lib: "countCqByPole" });
      } else {
        var sql = "SELECT COUNT(p_dossier.num_dossier) as ct " +
          "    FROM almerys_p_lot_new " +
          "    JOIN p_lot on almerys_p_lot_new.id_lot = p_lot.id_lot " +
          //"    JOIN almerys_p_etat on almerys_p_etat.id_etat = almerys_p_lot_new.id_etat " +
          "    JOIN p_dossier on p_lot.id_dossier = p_dossier.id_dossier " +
          /*"    JOIN p_lot_client on p_lot.id_lotclient = p_lot_client.id_lotclient " +
          "    JOIN p_lien_oper_dossier ON p_lien_oper_dossier.id_lien = p_lot.id_etape " +
          "    JOIN p_etape on p_etape.id_etape = p_lien_oper_dossier.id_oper " +
          "    JOIN p_etat on p_lot.id_etat = p_etat.id_etat " +*/
          "    JOIN r_personnel on r_personnel.id_pers = p_lot.id_pers " +
          "    LEFT JOIN almerys_motif_rejet on almerys_motif_rejet.id = almerys_p_lot_new.id_motif_rejet " +
          "    LEFT JOIN almerys_tache ON almerys_p_lot_new.id_tache = almerys_tache.id_tache " +
          "    LEFT JOIN almerys_type_fav ON almerys_type_fav.id_pole_new = p_lot.id_lotclient " +
          //" LEFT JOIN almerys_user ON almerys_user.matricule = p_lot.id_pers " +
          " WHERE 1= 1 AND p_dossier.id_dossier =" + option.id_dossier + " AND r_personnel.id_departement!=" + option.id_dep + " " + option.sql;
        Ldt.query(sql, function (err, res1) {
          if (err) {
            return callback({ er: err, lib: "countCqByPole" });
          } else {
            return callback(null, { ref: res1.rows[0].ct, pri: res.rows[0].ct });
          }
        });

      }

    });
  },

  countCqByLot: function (option, callback) {
    async.series([
      function (callback) {
        var sql = "SELECT COUNT(p_dossier.num_dossier) as ct " +
          "    FROM almerys_p_lot_new " +
          "    JOIN p_lot on almerys_p_lot_new.id_lot = p_lot.id_lot " +
          // "    JOIN almerys_p_etat on almerys_p_etat.id_etat = almerys_p_lot_new.id_etat " +
          "    JOIN p_dossier on p_lot.id_dossier = p_dossier.id_dossier " +
          /*"    JOIN p_lot_client on p_lot.id_lotclient = p_lot_client.id_lotclient " +
          "    JOIN p_lien_oper_dossier ON p_lien_oper_dossier.id_lien = p_lot.id_etape " +
          "    JOIN p_etape on p_etape.id_etape = p_lien_oper_dossier.id_oper " +
          "    JOIN p_etat on p_lot.id_etat = p_etat.id_etat " +*/
          "    JOIN r_personnel on r_personnel.id_pers = p_lot.id_pers " +
          "    LEFT JOIN almerys_motif_rejet on almerys_motif_rejet.id = almerys_p_lot_new.id_motif_rejet " +
          "    LEFT JOIN almerys_tache ON almerys_p_lot_new.id_tache = almerys_tache.id_tache " +
          "    LEFT JOIN almerys_type_fav ON almerys_type_fav.id_pole_new = p_lot.id_lotclient " +
          //" LEFT JOIN almerys_user ON almerys_user.matricule = p_lot.id_pers " +
          " WHERE 1= 1 AND p_lot.id_lotclient =" + option.id_lot + " AND r_personnel.id_departement=" + option.id_dep + " " + option.sql + "";

        ////////console.log("1:"+sql);
        Ldt.query(sql, function (err, res) {
          if (err) {
            return callback({ er: err, lib: "countCqByLot" });
          } else {
            //////console.log("rf:"+res.rows[0].ct);
            return callback(null, { ct: res.rows[0].ct });
          }
        });
      }, function (callback) {
        var sql = "SELECT libelle from p_lot_client where id_lotclient =" + option.id_lot;
        ////////console.log("2:"+sql);
        Ldt.query(sql, function (err, res1) {
          if (err) {
            return callback({ er: err, lib: "countCqByLot2" });
          } else {
            return callback(null, { name: res1.rows[0].libelle });
          }
        });
      },

      function (callback) {
        var sql = "SELECT COUNT(p_dossier.num_dossier) as ct " +
          "    FROM almerys_p_lot_new " +
          "    JOIN p_lot ON almerys_p_lot_new.id_lot = p_lot.id_lot " +
          "    JOIN almerys_p_etat on almerys_p_etat.id_etat = almerys_p_lot_new.id_etat " +
          "    JOIN p_dossier ON p_lot.id_dossier = p_dossier.id_dossier " +
          "    JOIN p_lot_client ON p_lot.id_lotclient = p_lot_client.id_lotclient " +
          "    LEFT JOIN p_lien_oper_dossier ON p_lien_oper_dossier.id_lien = p_lot.id_etape " +
          "    LEFT JOIN p_etape ON p_etape.id_etape = p_lien_oper_dossier.id_oper " +
          "    JOIN p_etat ON p_lot.id_etat = p_etat.id_etat " +
          "    JOIN r_personnel ON r_personnel.id_pers = p_lot.id_pers " +
          "    LEFT JOIN almerys_motif_rejet on almerys_motif_rejet.id = almerys_p_lot_new.id_motif_rejet " +
          "    LEFT JOIN almerys_tache ON almerys_p_lot_new.id_tache = almerys_tache.id_tache " +
          "    LEFT JOIN almerys_type_fav ON almerys_type_fav.id_pole_new = p_lot.id_lotclient " +
          //" LEFT JOIN almerys_user ON almerys_user.matricule = p_lot.id_pers  " +
          " WHERE 1= 1 AND p_lot.id_lotclient =" + option.id_lot + " AND r_personnel.id_departement!=" + option.id_dep + " " + option.sql;

        Ldt.query(sql, function (err, res1) {
          if (err) {
            return callback({ er: err, lib: "countCqByLot2" });
          } else {
            //////console.log("rf:"+res1.rows[0].ct+" lot:"+option.id_lot);
            return callback(null, { ct: res1.rows[0].ct });
          }
        });
      }
    ], function (err, result) {
      if (err) return callback({ er: err, lib: "countCqByLot22" });
      ////////console.log("ok");
      return callback(null, { ref: result[0].ct, pri: result[2].ct, name: result[1].name });
    })
    /* var sql = "SELECT COUNT(p_dossier.num_dossier) as ct,p_lot_client.libelle as name " +
       "    FROM almerys_p_lot_new " +
       "    JOIN p_lot on almerys_p_lot_new.id_lot = p_lot.id_lot " +
       "    JOIN almerys_p_etat on almerys_p_etat.id_etat = almerys_p_lot_new.id_etat " +
       "    JOIN p_dossier on p_lot.id_dossier = p_dossier.id_dossier " +
       "    JOIN p_lot_client on p_lot.id_lotclient = p_lot_client.id_lotclient " +
       "    JOIN p_lien_oper_dossier ON p_lien_oper_dossier.id_lien = p_lot.id_etape " +
       "    JOIN p_etape on p_etape.id_etape = p_lien_oper_dossier.id_oper " +
       "    JOIN p_etat on p_lot.id_etat = p_etat.id_etat " +
       "    JOIN r_personnel on r_personnel.id_pers = p_lot.id_pers "+
       "    LEFT JOIN almerys_motif_rejet on almerys_motif_rejet.id = almerys_p_lot_new.id_motif_rejet " +
       "    LEFT JOIN almerys_tache ON almerys_p_lot_new.id_tache = almerys_tache.id_tache " +
       "    LEFT JOIN almerys_type_fav ON almerys_type_fav.id_pole_new = p_lot.id_lotclient " +
       " LEFT JOIN almerys_user ON almerys_user.matricule = p_lot.id_pers " +
       " WHERE 1= 1 AND almerys_p_lot_new.id_lot =" + option.id_lot + " AND r_personnel.id_departement="+option.id_dep+" " + option.sql + " GROUP BY p_lot_client.libelle ";
 
     //////console.log("1:"+sql);
     Ldt.query(sql, function (err, res) {
       if (err){
         return callback({er:err,lib:"countCqByLot"});
       }else{
         var sql = "SELECT COUNT(p_dossier.num_dossier) as ct " +
           "    FROM almerys_p_lot_new " +
           "    JOIN p_lot ON almerys_p_lot_new.id_lot = p_lot.id_lot " +
           "    JOIN almerys_p_etat on almerys_p_etat.id_etat = almerys_p_lot_new.id_etat " +
           "    JOIN p_dossier ON p_lot.id_dossier = p_dossier.id_dossier " +
           "    JOIN p_lot_client ON p_lot.id_lotclient = p_lot_client.id_lotclient " +
           "    JOIN p_lien_oper_dossier ON p_lien_oper_dossier.id_lien = p_lot.id_etape " +
           "    JOIN p_etape ON p_etape.id_etape = p_lien_oper_dossier.id_oper " +
           "    JOIN p_etat ON p_lot.id_etat = p_etat.id_etat " +
           "    JOIN r_personnel ON r_personnel.id_pers = p_lot.id_pers "+
           "    LEFT JOIN almerys_motif_rejet on almerys_motif_rejet.id = almerys_p_lot_new.id_motif_rejet " +
           "    LEFT JOIN almerys_tache ON almerys_p_lot_new.id_tache = almerys_tache.id_tache " +
           "    LEFT JOIN almerys_type_fav ON almerys_type_fav.id_pole_new = p_lot.id_lotclient " +
           " LEFT JOIN almerys_user ON almerys_user.matricule = p_lot.id_pers  " +
           " WHERE 1= 1 AND almerys_p_lot_new.id_lot =" + option.id_lot + " AND r_personnel.id_departement!="+option.id_dep+" " + option.sql;
         //////console.log("2:"+sql);
         Ldt.query(sql, function (err, res1) {
           if (err) {
             return callback({er:err,lib:"countCqByLot2"});
           } else {
             return callback(null, {ref:res1.rows[0].ct,pri:res.rows[0].ct,name:res.rows[0].name});
           }
         });
 
       }
 
     });*/
  },


  // Update cq almerys
  is_novice: function (option, callback) {
    var sql = "SELECT  matricule,id_pole,is_novice  FROM almerys_user WHERE matricule=" + option.mat + " AND id_pole=" + option.id_pole;
    Ldt.query(sql, function (err, res) {
      if (err) {
        return callback(err);
      } else {
        if (res.rows.length != 0) {
          return callback(null, false);
        } else {
          return callback(null, res.rows[0].is_novice);
        }
      }

    });
  },

  //getting echantillonage Limit

  limitEchantillonage: function (option, callback) {
    var sql = "";
    Ldt.query(sql, function (err, res) {
      if (err) {
        return callback(err);
      } else {

        return callback(null, true);
      }

    });
  },

  //update almerys_plot_new

  update_almerys_plot: function (option, callback) {
    var sql = "UPDATE almerys_p_lot_new SET ";
    if (option.id_etat != '') {
      sql += " id_etat = " + option.id_etat;
    }
    if (option.id_nuo != '' && option.id_nuo != null) {
      option.id_nuo = option.id_nuo.replace(/\'/g, "\'\'");
      sql += ", num_nuo = '" + option.id_nuo + "'";
    }
    if (option.id_ps != '' && option.id_ps != null) {
      sql += ", num_ps = " + option.id_ps;
    }
    if (option.id_erreur != '') {
      sql += ", id_type_erreur = " + option.id_erreur;
    } else {
      sql += ", id_type_erreur = null";
    }

    if (option.idTPControl != '') {
      sql += ", id_type_controle = " + option.idTPControl;
    }
    if (option.clientalm == '') {
      option.clientalm = 0;
    }
    if (option.reprise_fini != '' && option.reprise_fini != null) {
      sql += ", reprise_fini = " + option.reprise_fini;
    }
    sql += ", id_client_alm = " + option.clientalm;

    sql += ", id_cq = " + option.cq +
      ", is_rejet = " + option.is_rejet +
      " WHERE id=" + option.id;


    var sqlInt = "";
    if (option.isInterial) {
      if ((option.id_nuo != '' && option.id_nuo != null) || (option.eta_int != '' && option.eta_int != null)) {
        sqlInt = "Update almerys_interial SET ";
        if (option.id_nuo != '' && option.id_nuo != null) {
          sqlInt += " num_decompte = '" + option.id_nuo + "'";
          if (option.eta_int != '' && option.eta_int != null) {
            sqlInt += ", etat = '" + option.eta_int + "'";
          }
        } else {
          sqlInt += " etat = '" + option.eta_int + "'";
        }

        sqlInt += " WHERE id_almerys = " + option.id + "";
        ////console.log(sqlInt);
        Ldt.query(sqlInt, function (err, res) {
          if (err) {
            ////console.log(err)
            return callback(err);
          } else {
            Ldt.query(sql, function (err2, res) {
              if (err2) {
                return callback(err2);
              } else {
                return callback(null, true);
              }

            });
          }

        });
      } else {
        Ldt.query(sql, function (err, res) {
          if (err) {
            return callback(err);
          } else {
            return callback(null, true);
          }

        });
      }


    } else {
      Ldt.query(sql, function (err, res) {
        if (err) {
          return callback(err);
        } else {
          return callback(null, true);
        }
      });
    }
    ////////console.log(sql);

  },

  getLsMatOp: function (option, callback) {
    var sql = "SELECT distinct p_lot.id_pers as list " +
      "    FROM almerys_p_lot_new " +
      "    JOIN p_lot on almerys_p_lot_new.id_lot = p_lot.id_lot " +
      "    JOIN almerys_p_etat on almerys_p_etat.id_etat = almerys_p_lot_new.id_etat " +
      "    JOIN p_dossier on p_lot.id_dossier = p_dossier.id_dossier " +
      "    JOIN p_lot_client on p_lot.id_lotclient = p_lot_client.id_lotclient " +
      "    LEFT JOIN p_lien_oper_dossier ON p_lien_oper_dossier.id_lien = p_lot.id_etape " +
      "    LEFT JOIN p_etape on p_etape.id_etape = p_lien_oper_dossier.id_oper " +
      "    JOIN p_etat on p_lot.id_etat = p_etat.id_etat " +
      "    LEFT JOIN almerys_motif_rejet on almerys_motif_rejet.id = almerys_p_lot_new.id_motif_rejet " +
      "    LEFT JOIN almerys_tache ON almerys_p_lot_new.id_tache = almerys_tache.id_tache " +
      "    LEFT JOIN almerys_type_fav ON almerys_type_fav.id_pole_new = p_lot.id_lotclient " +
      //" LEFT JOIN almerys_user  ON almerys_user.matricule = p_lot.id_pers " +
      " WHERE 1= 1 AND almerys_p_lot_new.date_deb ='" + option.date + "' ";


    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });


  },

  getLsByMat: function (option, callback) {
    var sql = "SELECT almerys_p_lot_new.id as id " +
      "    FROM almerys_p_lot_new " +
      "    JOIN p_lot on almerys_p_lot_new.id_lot = p_lot.id_lot " +
      "    JOIN almerys_p_etat on almerys_p_etat.id_etat = almerys_p_lot_new.id_etat " +
      "    JOIN p_dossier on p_lot.id_dossier = p_dossier.id_dossier " +
      "    JOIN p_lot_client on p_lot.id_lotclient = p_lot_client.id_lotclient " +
      "    LEFT JOIN p_lien_oper_dossier ON p_lien_oper_dossier.id_lien = p_lot.id_etape " +
      "    LEFT JOIN p_etape on p_etape.id_etape = p_lien_oper_dossier.id_oper " +
      "    JOIN p_etat on p_lot.id_etat = p_etat.id_etat " +
      "    LEFT JOIN almerys_motif_rejet on almerys_motif_rejet.id = almerys_p_lot_new.id_motif_rejet " +
      "    LEFT JOIN almerys_tache ON almerys_p_lot_new.id_tache = almerys_tache.id_tache " +
      "    LEFT JOIN almerys_type_fav ON almerys_type_fav.id_pole_new = p_lot.id_lotclient " +
      //" LEFT JOIN almerys_user  ON almerys_user.matricule = p_lot.id_pers " +
      " WHERE 1= 1 AND almerys_p_lot_new.date_deb ='" + option.date + "' AND almerys_p_lot_new.echantillon = FALSE AND almerys_p_lot_new.id_etat=1  AND p_lot.id_pers = " + option.id_pers + " AND p_lot.id_lotclient = " + option.id_lc;

    //////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });


  },

  getLsMat: function (option, callback) {
    var sql = "select matricule,r_personnel.id_pers " +
      "from r_personnel " +
      "left join almerys_access_cq on almerys_access_cq.id_pers = r_personnel.id_pers " +
      "where almerys_access_cq.id_pers is null order by r_personnel.id_pers";
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });


  },
  getLsMatSat: function (option, callback) {
    var sql = "select r_personnel.matricule,r_personnel.id_pers " +
      "from r_personnel " +
      "left join almerys_user_new on almerys_user_new.matricule = r_personnel.id_pers " +
      "where almerys_user_new.matricule is null order by r_personnel.id_pers";
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });


  },

  getLsDist: function (option, callback) {
    var sql = "select * " +
      "from almerys_distinction WHERE etat=0 ";
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });


  },
  getLsMatPara: function (option, callback) {
    var sql = "select matricule,r_personnel.id_pers " +
      "from r_personnel " +
      "where actif=true order by r_personnel.id_pers";

    //////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });


  },


  getLsEchant: function (option, callback) {
    var sql = "select * " +
      "from almerys_echant_pers " +
      "where id_lot_client=" + option.id_lot_client + " AND pdate='" + new Date().toISOString().replace(/-/, '').replace(/-/, '').substr(0, 8) + "' order by id_pers";

    //////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });


  },


  getNbEchantLot: function (option, callback) {
    var sql = "select count(id_pers) as ct,id_lot_client " +
      "from almerys_echant_pers " +
      "where  pdate='" + new Date().toISOString().replace(/-/, '').replace(/-/, '').substr(0, 8) + "' GROUP BY id_lot_client";

    //////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });


  },
  getNbEchantLotDate: function (option, callback) {
    var sql = "select count(id_pers) as ct,id_lot_client " +
      "from almerys_echant_pers " +
      "where  to_date(pdate,'yyyyMMdd')=to_date('" + option.pdate + "','yyyyMMdd') GROUP BY id_lot_client";

    //////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });


  },

  getPsEchantLot: function (option, callback) {
    var sql = "select id_pers " +
      "from almerys_echant_pers " +
      "where  pdate='" + new Date().toISOString().replace(/-/, '').replace(/-/, '').substr(0, 8) + "' AND  id_lot_client = " + option.id_lot_client;

    //////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  getAllEchantNow: function (option, callback) {
    var sql = "select * " +
      "from almerys_echant_pers " +
      "where  pdate='" + new Date().toISOString().replace(/-/, '').replace(/-/, '').substr(0, 8) + "' AND  echant_total is not null ";

    //////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },
  updateEchantLot: function (option, callback) {
    var sql = "UPDATE  " +
      " almerys_echant_pers SET echant_total=" + option.echant_total + " " +
      "where  pdate='" + new Date().toISOString().replace(/-/, '').replace(/-/, '').substr(0, 8) + "' AND  id_lot_client = " + option.id_lot_client + " AND id_pers = " + option.id_pers;

    //////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  updateExEchantLot: function (option, callback) {
    var sql = "UPDATE  " +
      " almerys_echant_pers SET echant_choisie=" + option.echant_choisie + ", etape_rst=" + option.rst + " " +
      "where  pdate='" + new Date().toISOString().replace(/-/, '').replace(/-/, '').substr(0, 8) + "' AND  id_lot_client = " + option.id_lot_client + " AND id_pers = " + option.id_pers;

    //////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  addEchantByMt: function (option, callback) {
    var sql = "INSERT INTO " +
      " almerys_echant_pers (id_lot_client,id_pers,pdate)" +
      " VALUES  (" + option.id_lot_client + "," + option.id_pers + ",'" + new Date().toISOString().replace(/-/, '').replace(/-/, '').substr(0, 8) + "')";

    //////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, true);
    });


  },

  delEchantByMt: function (option, callback) {
    var sql = "DELETE FROM " +
      " almerys_echant_pers WHERE id_lot_client = " + option.id + " AND id_pers = " + option.id_pers + " AND pdate = '" + new Date().toISOString().replace(/-/, '').replace(/-/, '').substr(0, 8) + "' ";

    ////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, true);
    });


  },



  getCQMat: function (option, callback) {
    var sql = "select r_personnel.matricule,r_personnel.id_pers,appelation,sat,almerys_access_cq.* from r_personnel join almerys_access_cq on almerys_access_cq.id_pers = r_personnel.id_pers  left join almerys_user_new on almerys_user_new.matricule = r_personnel.id_pers";
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });


  },

  getCQMatSat: function (option, callback) {
    var sql = "select almerys_user_new.matricule,r_personnel.id_pers,appelation,sat from r_personnel join almerys_user_new on almerys_user_new.matricule = r_personnel.id_pers";
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });


  },
  addCQ: function (option, callback) {
    var sql = "insert into almerys_access_cq (id_pers,niveaux) values (" + option.id_pers + "," + option.niv + ")";
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });


  },
  removeCQ: function (option, callback) {
    var sql = "delete from almerys_access_cq where id_pers =" + option.id_pers + "";
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });


  },

  addSat: function (option, callback) {
    var sql = "insert into almerys_user_new (matricule,sat) values (" + option.id_pers + ",'" + option.sat + "')";

    ////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });


  },
  removeSat: function (option, callback) {
    var sql = "delete from almerys_user_new where matricule =" + option.id_pers + "";
    ////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });


  },
  // Fonction pour verifier si l'operateur est actif
  checkPresenceceOpSaisie: function (id_pers, next) {
    var obj_retour = {};
    async.series([
      function (callback) {
        var sql = "select * from " +
          "r_conge " +
          "where id_pers = " + id_pers + " " +
          "and date_debut is not null " +
          "and to_date(date_debut,'DD/MM/YYYY')<=now() " +
          "and to_date(date_fin,'DD/MM/YYYY')>=now() LIMIT 1";
        ModelEASYGPAO.query(sql, function (err, res) {
          if (err) return callback(err);
          return callback(null, res.rows);
        });
      }
    ], function (erreur_conge, result_conge) {
      if (erreur_conge) return next(erreur_conge);
      if (result_conge[0].length != 0) {
        obj_retour.status = "Absent";
        obj_retour.commentaire = "CONGER";
        return next(null, obj_retour);
      } else {
        async.series([
          function (callback) {
            var new_query = "SELECT * from p_ldt where 1=1 and id_pers = " + id_pers + " ORDER BY id_ldt desc LIMIT 1";
            Ldt.query(new_query, function (err, res) {
              if (err) return callback(err);
              return callback(null, res.rows);
            });
          }
        ], function (erreur_ldt, result_ldt) {
          if (erreur_ldt) return next(erreur_ldt);
          if (result_ldt[0].length) {
            var id_type = result_ldt[0][0].id_type_ldt;
            var etat = result_ldt[0][0].id_etat;
            if (parseInt(etat) == 1) {
              obj_retour.status = "Present";
              obj_retour.commentaire = "CONNECTEE GPAO";
              return next(null, obj_retour);
            }
            else {
              obj_retour.status = "Absent";
              obj_retour.commentaire = "DECONNECTEE GPAO";
              return next(null, obj_retour);
            }
          }
          else {
            obj_retour.status = "Present";
            obj_retour.commentaire = "NON CONNECTEE GPAO";
            return next(null, obj_retour);
          }
        });
      }
    });

  },


  insertPrevision : function(options, callback) {
    let request = `
    INSERT INTO almerys_suivi_indicateur_prod(id_specialite, id_s_specialite, id_s_s_specialite, pourcentage_cq, prevision_entrant, frequence_controle, date_prevision, vitesse_equilibre, superviser) VALUES($1, $2, $3, 0, 0, 'Journalier', now(), $4, $5)
    `;

    if(options.superviser === undefined) {
      console.log(options)
    }
    Ldt.query(request, [options.idSpecialite, options.idSSpecialite, options.idSSSpecialite, options.vitesseEquilibre, options.superviser], 
      (err, res) => {
        if(err) return callback(err);
        callback();
      }
    );
  },


  getPrevision : function(options, callback) {
    let request = `
      SELECT 
        almerys_suivi_indicateur_prod.id_specialite,
        almerys_suivi_indicateur_prod.id_s_specialite,
        almerys_suivi_indicateur_prod.id_s_s_specialite,
        almerys_suivi_indicateur_prod.id_suivi,
        almerys_suivi_indicateur_prod.superviser,
        almerys_suivi_indicateur_prod.frequence_controle,
        to_char(almerys_suivi_indicateur_prod.date_prevision, 'YYYY-MM-DD') "date_prevision",
        almerys_suivi_indicateur_prod.pourcentage_cq,
        almerys_suivi_indicateur_prod.prevision_entrant,
        almerys_suivi_indicateur_prod.vitesse_equilibre,
        p_lot_client.libelle "specialite",
        almerys_ss_spe.libelle "sspecialite",
        almerys_ss_spe2.libelle "ssspecialite"
      FROM almerys_suivi_indicateur_prod
      LEFT OUTER JOIN p_lot_client ON p_lot_client.id_lotclient = almerys_suivi_indicateur_prod.id_specialite
      LEFT OUTER JOIN almerys_ss_spe ON almerys_ss_spe.id_ss_spe = almerys_suivi_indicateur_prod.id_s_specialite
      LEFT OUTER JOIN almerys_ss_spe2 ON almerys_ss_spe2.id = almerys_suivi_indicateur_prod.id_s_s_specialite
      WHERE almerys_suivi_indicateur_prod.date_prevision BETWEEN to_date($1, 'YYYY-MM-DD') AND to_date($2, 'YYYY-MM-DD')
      ORDER BY superviser DESC, almerys_suivi_indicateur_prod.date_prevision, almerys_suivi_indicateur_prod.id_specialite, almerys_suivi_indicateur_prod.id_s_specialite, almerys_suivi_indicateur_prod.id_s_s_specialite
    `;
    
    Ldt.query(request, [options.dateDebut, options.dateFin], 
      (err, res) => {
        if(err) return callback(err);
        callback(null, res.rows);
      }
    );
  },


  updatePrevision : function(options, callback) {
    let request = `
      UPDATE almerys_suivi_indicateur_prod SET pourcentage_cq=$1, prevision_entrant=$2, frequence_controle=$3
      WHERE id_suivi = $4
    `;
    let param = [options.pourcentage, options.prevision, options.frequence, options.idSuivi];

    
    Ldt.query(request, param, 
      (err, res) => {
        if (err) {
          console.log(err);
          return callback(err);
        }
        callback();
      }
    );
  },


  recupererControleByJour : function(options, callback) {
    let request = `
      SELECT * 
      FROM almerys_suivi_ctrl_by_jour
      WHERE 
        id_specialite IS NOT DISTINCT FROM $1
        AND id_s_specialite IS NOT DISTINCT FROM $2
        AND id_s_s_specialite IS NOT DISTINCT FROM $3
    `;
    
    let param = [options.idSpecialite, options.idSSpecialite, options.idSSSpecialite];

    Ldt.query(request, param, 
      (err, res) => {
        if (err) {
          console.log(err);
          return callback(err);
        }
        callback(null, res.rows);
      }
    );
  },


  insererControleByJour : function(options, callback) {
    let request = `
      INSERT INTO almerys_suivi_ctrl_by_jour(id_specialite, id_s_specialite, id_s_s_specialite)
      VALUES ($1, $2, $3) RETURNING id_suivi_by_jour
    `;

    let param = [options.idSpecialite, options.idSSpecialite, options.idSSSpecialite];

    Ldt.query(request, param, 
      (err, res) => {
        if (err) {
          console.log(err);
          return callback(err);
        }
        callback(null, res.rows);
      }
    );
  },

  updateControleByJour : function(options, callback) {
    let request = `
      UPDATE almerys_suivi_ctrl_by_jour SET lundi=$1, mardi=$2, mercredi=$3, jeudi=$4, vendredi=$5, samedi=$6, aucun_controle=$7
      WHERE id_suivi_by_jour=$8
    `;


    let param = [options.lundi, options.mardi, options.mercredi, options.jeudi, options.vendredi, options.samedi, options.sansControle,options.idSuivi];

    Ldt.query(request, param, 
      (err, res) => {
        if (err) {
          console.log(err);
          return callback(err);
        }
        callback();
      }
    );
  },


  recupererControleByDate : function(options, callback) {
    
    let request = `
      SELECT 
        to_char(date, 'YYYY-MM-DD') "date",
        id_specialite,
        id_s_specialite,
        id_s_s_specialite,
        id_suivi_by_date
      FROM almerys_suivi_ctrl_by_date
      WHERE 
        id_specialite IS NOT DISTINCT FROM $1
        AND id_s_specialite IS NOT DISTINCT FROM $2
        AND id_s_s_specialite IS NOT DISTINCT FROM $3
        AND date >= to_date($4, 'YYYY-MM-DD')
      ORDER BY date
    `;
    
    let param = [options.idSpecialite, options.idSSpecialite, options.idSSSpecialite, options.now.date];

    Ldt.query(request, param, 
      (err, res) => {
        if (err) {
          console.log(err);
          return callback(err);
        }
        
        callback(null, res.rows);
      }
    );
  },

  recupererControleBySpecificDate : function(options, callback) {
    let request = `
      SELECT 
        to_char(date, 'YYYY-MM-DD') "date",
        id_specialite,
        id_s_specialite,
        id_s_s_specialite,
        id_suivi_by_date
      FROM almerys_suivi_ctrl_by_date
      WHERE 
        id_specialite IS NOT DISTINCT FROM $1
        AND id_s_specialite IS NOT DISTINCT FROM $2
        AND id_s_s_specialite IS NOT DISTINCT FROM $3
        AND date between to_date($4,'YYYY-MM-DD') AND to_date($5,'YYYY-MM-DD')
      ORDER BY date
    `;
    
    let param = [options.idSpecialite, options.idSSpecialite, options.idSSSpecialite, options.dateDebut, options.dateFin];

    Ldt.query(request, param, 
      (err, result) => {
        if (err) {
          console.log(err);
          return callback(err);
        }
        callback(null, result.rows);
      }
    );
  },

  insererControleByDate : function(options, callback) {
    let request = `
      INSERT INTO almerys_suivi_ctrl_by_date(id_specialite,id_s_specialite,id_s_s_specialite,date)
      VALUES($1,$2,$3,$4)
    `;
    
    let param = [options.idSpecialite, options.idSSpecialite, options.idSSSpecialite, options.date];

    Ldt.query(request, param, 
      (err, res) => {
        if (err) {
          console.log(err);
          console.log(options);
          return callback(err);
        }
        callback();
      }
    );
  },

  deleteSpecificDate : function(options, callback) {
    let request = `
      DELETE FROM almerys_suivi_ctrl_by_date WHERE id_suivi_by_date=$1
    `;
    
    let param = [options.idSuivi];

    Ldt.query(request, param, 
      (err, res) => {
        if (err) {
          console.log(err);
          return callback(err);
        }
        callback();
      }
    );
  },


  recupererEtapesGrille : function(options, callback) {
    let request = `
      SELECT 
        *
      FROM almerys_grille_cq_etapes
      WHERE id_type_grille = $1
    `;

    let param = [options.idTypeGrille];

    Ldt.query(request, param, 
      (err, res) => {
        if (err) {
          console.log(err);
          return callback(err);
        }
        
        callback(null, res.rows);
      }
    );
  },

  insererGrille : function(options, callback) {
    let request = `
      INSERT INTO almerys_grille_cq_traitement(id_cq) VALUES($1) RETURNING id_traitement
    `;
    
    let param = [options.id];

    Ldt.query(request, param, 
      (err, res) => {
        if (err) {
          console.log(err);
          console.log(options);
          return callback(err);
        }
        callback(null, res.rows);
      }
    );
  },


  insererEtape : function(options, callback) {
    let request = `
      INSERT INTO almerys_grille_cq_check(id_traitement, id_etape, checked, resultat, id_anomalie, id_description, id_conformite)
      VALUES($1,$2,$3,$4,$5,$6,$7)
    `;
       

    let param = [options.idTraitement, options.idEtape, options.check, options.resultat, options.idAnomalie, options.idDescription, options.idConformite];

    Ldt.query(request, param, 
      (err, res) => {
        if (err) {
          console.log(err);
          console.log(options);
          return callback(err);
        }
        callback();
      }
    );
  },


  updateEtape : function(options, callback) {

    let request = `
      UPDATE almerys_grille_cq_check SET id_anomalie=$1, id_description=$2, id_conformite=$3, resultat=$4
      WHERE id_traitement=$5 AND id_etape=$6
    `;

    let param = [options.idAnomalie, options.idDescription, options.idConformite, options.resultat, options.idTraitement, options.idEtape];

    Ldt.query(request, param, 
      (err, res) => {
        if (err) {
          console.log(err);
          console.log(options);
          return callback(err);
        }
        callback();
      }
    );

  },


  recupererErreursCheckCq : function(options, callback) {
    let request = `
      SELECT 
        almerys_grille_cq_check.id_check,
        almerys_grille_cq_etapes.designation_etape,
        almerys_grille_cq_check.checked,
        almerys_grille_cq_type_resultat.designation_resultat,
        almerys_p_etat.libelle AS "etat_anomalie",
        almerys_type_erreur.libelle AS "desc_anomalie",
        almerys_grille_cq_type_conformite.designation_conformite,
        almerys_grille_cq_check.id_etape,
        almerys_grille_cq_check.id_anomalie,
        almerys_grille_cq_check.id_description,
        almerys_grille_cq_check.id_conformite,
        almerys_grille_cq_check.resultat
      FROM almerys_grille_cq_check
      INNER JOIN almerys_grille_cq_etapes ON almerys_grille_cq_etapes.id_etape = almerys_grille_cq_check.id_etape
      INNER JOIN almerys_grille_cq_type_resultat ON almerys_grille_cq_type_resultat.id_resultat = almerys_grille_cq_check.resultat
      LEFT OUTER JOIN almerys_grille_cq_type_conformite ON almerys_grille_cq_type_conformite.id_conformite = almerys_grille_cq_check.id_conformite
      LEFT OUTER JOIN almerys_p_etat ON almerys_p_etat.id_etat = almerys_grille_cq_check.id_anomalie
      LEFT OUTER JOIN almerys_type_erreur ON almerys_type_erreur.id = almerys_grille_cq_check.id_description
      WHERE almerys_grille_cq_check.id_traitement = $1
      AND almerys_grille_cq_check.resultat = 2
    `;

    let param = [options.idTraitement];

    Ldt.query(request, param, 
      (err, res) => {
        if (err) {
          console.log(err);
          console.log(options);
          return callback(err);
        }
        callback(null, res.rows);
      }
    );
  },

  recupererTraitement : function(options, callback) {
    let request = `
      SELECT 
        id_traitement
      FROM almerys_grille_cq_traitement
      WHERE almerys_grille_cq_traitement.id_cq = $1
    `;

    let param = [options.idCq];

    Ldt.query(request, param, 
      (err, res) => {
        if (err) {
          console.log(err);
          console.log(options);
          return callback(err);
        }
        callback(null, res.rows);
      }
    );
  },

  cqEffectue : function(options, callback) {
    let request = `
      UPDATE almerys_p_lot_new SET id_cq=$1, id_type_controle=$2 WHERE id=$3
    `;

    let param = [options.idCq, options.idTypeControle, options.id];

    Ldt.query(request, param, 
      (err, res) => {
        if (err) {
          console.log(err);
          console.log(options);
          return callback(err);
        }
        callback(null, res.rows);
      }
    );
  },

  recupererTypeGrille : function(options, callback) {
    let request = `
      SELECT 
        almerys_grille_cq_liste_spe.id_pole,
        almerys_grille_cq_liste_spe.id_spe,
        almerys_grille_cq_liste_spe.id_s_spe,
        almerys_grille_cq_liste_spe.id_type_grille,
        almerys_grille_cq_type.designation_grille
      FROM almerys_grille_cq_liste_spe
      INNER JOIN almerys_grille_cq_type ON almerys_grille_cq_liste_spe.id_type_grille = almerys_grille_cq_type.id_type_grille
      WHERE 
        id_pole IS NOT DISTINCT FROM $1
        AND id_spe IS NOT DISTINCT FROM $2
        AND id_s_spe IS NOT DISTINCT FROM $3
    `;
    
    let param = [options.idPole, options.idSpe, options.idSSpe];

    Ldt.query(request, param, 
      (err, res) => {
        if (err) {
          console.log(err);
          return callback(err);
        }
        callback(null, res.rows);
      }
    );
  },


};

