/**
 * Detourage.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'ConnexionPostgresql',
  tableName: 'det_mail_saisi',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  autoPK: false,
  attributes: {

  },
  //               Common
  ListeTousLesSaisies_sans_option: function (callback) {
    var requete = " select s.id_det_priorite,priorite.libelle as libelle_priorite,id_saisi_det,date_heure_reception,date_heure_envoi,objet_mail_reception,objet_mail_envoi,nom_saisi_client," +
      " reception.libelle as traite_reception,reception.nombre_visuels as visuels_reception,envoi.libelle as traite_envoi,envoi.nombre_visuels as visuels_envoi " +
      " from det_mail_saisi s left join det_client_saisi c on c.id_client_saisi=s.id_client_saisi left join det_type_traitement reception on " +
      " reception.id_det_type_traitement=s.id_det_type_traitement left join det_type_traitement envoi on envoi.id_det_type_traitement=s.id_det_traitement_envoi left join det_priorite priorite on priorite.id_priorite=s.id_det_priorite order by s.id_det_priorite desc";
    //  //console.log(requete);
    Detourage.query(requete, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },
  ListeSaisi_Mail: function (option, callback) {
    //console.log("DEBUT EXECUTION LISTE SAISI MAIL OPTION");
    var date_reception = option.date_reception;
    //    var date_envoi=option.date_envoi;
    var traite = option.traite_reception;
    //console.log("TRAITE "+traite+" DATE RECEPTION "+date_reception);
    var requete = "select s.id_det_priorite,priorite.libelle as libelle_priorite,id_saisi_det,date_heure_reception,date_heure_envoi,objet_mail_reception,objet_mail_envoi,nom_saisi_client," +
      " reception.libelle as traite_reception,reception.nombre_visuels as visuels_reception,envoi.libelle as traite_envoi,envoi.nombre_visuels as visuels_envoi" +
      " from det_mail_saisi s left join det_client_saisi c on c.id_client_saisi=s.id_client_saisi" +
      " left join det_type_traitement reception on reception.id_det_type_traitement=s.id_det_type_traitement " +
      " left join det_type_traitement envoi on envoi.id_det_type_traitement=s.id_det_traitement_envoi " +
      " left join det_priorite priorite on priorite.id_priorite=s.id_det_priorite " +
      " where date_heure_reception::text LIKE '" + date_reception + " %'" +
      " and reception.id_det_type_traitement=" + traite + " order by s.id_det_priorite desc ";
    if (traite = "tous") {
      requete = "select s.id_det_priorite,priorite.libelle as libelle_priorite," +
        "id_saisi_det,date_heure_reception,date_heure_envoi,objet_mail_reception,objet_mail_envoi,nom_saisi_client," +
        " reception.libelle as traite_reception,reception.nombre_visuels as visuels_reception,envoi.libelle as traite_envoi,envoi.nombre_visuels as visuels_envoi" +
        " from det_mail_saisi s left join det_client_saisi c on c.id_client_saisi=s.id_client_saisi" +
        " left join det_type_traitement reception on reception.id_det_type_traitement=s.id_det_type_traitement " +
        " left join det_type_traitement envoi on envoi.id_det_type_traitement=s.id_det_traitement_envoi " +
        " left join det_priorite priorite on priorite.id_priorite=s.id_det_priorite " +
        " where date_heure_reception::text LIKE '" + date_reception + " %'" +
        " order by s.id_det_priorite desc";
    }
    //  //console.log(requete);
    Detourage.query(requete, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },
  // CLIENT
  AddNewClient: function (option, callback) {
    var requete = "INSERT INTO det_client_saisi(nom_saisi_client) VALUES ('" + option.nom_client + "')";
    //  //console.log(requete);
    Detourage.query(requete, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },
  UpdateClient: function (option, callback) {
    var requete = "UPDATE det_client_saisi SET nom_saisi_client='" + option.nom_client_modif + "' WHERE id_client_saisi=" + option.id_client_modif + "";
    ////console.log(requete);
    Detourage.query(requete, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },
  DeleteClient: function (option, callback) {
    var requete = "DELETE FROM det_client_saisi where id_client_saisi=" + option.id_client_supprimer + "";
    //console.log(requete);
    Detourage.query(requete, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },
  //Type Traitement
  AddNewTypeTraite: function (option, callback) {
    var requete = "INSERT INTO det_type_traitement(libelle,nombre_visuels) VALUES ('" + option.type_traitement + "'," + option.nombre_visuels + ")";
    Detourage.query(requete, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },
  UpdateTypeTraite: function (option, callback) {
    var requete = "UPDATE det_type_traitement SET libelle='" + option.type_traitement + "',nombre_visuels=" + option.nombre_visuels + " WHERE id_det_type_traitement=" + option.id_modif_traite;
    //console.log(requete);
    Detourage.query(requete, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },
  DeleteTypeTraite: function (option, callback) {
    var requete = "DELETE FROM det_type_traitement where id_det_type_traitement=" + option.id_delete + "";
    Detourage.query(requete, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },
  //Affichage DES DONNEES
  listeClientSaisi: function (option, callback) {
    var requete = "SELECT * FROM det_client_saisi";
    Detourage.query(requete, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },
  listeTraite: function (option, callback) {
    var requete = "SELECT * FROM det_type_traitement";
    Detourage.query(requete, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },
  listePriorite: function (callback) {
    var requete = "SELECT * FROM det_priorite";
    Detourage.query(requete, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  // recuperation des liste des clients detourage
  /**
  Entree rien
  Sortie / return  list array client
  
  **/
  getListClient: function (id_cat, id_client, id_groupe, callback) {
    var requete = "select DISTINCT(det_client.*) from det_client JOIN  det_lien_difficulte_client ON det_lien_difficulte_client.id_client = det_client.id_client";
    if (id_cat !== 0) {
      switch (Number(id_cat)) {
        case 1:
          requete = "select DISTINCT(det_client.*) from det_client JOIN  det_lien_difficulte_client ON det_lien_difficulte_client.id_client = det_client.id_client WHERE id_etapes = '27,65,65'  ";
          break;
        case 2:
          requete = "select DISTINCT(det_client.*) from det_client JOIN  det_lien_difficulte_client ON det_lien_difficulte_client.id_client = det_client.id_client WHERE (id_etapes = '540,93,350' OR id_etapes = '350,93,540' OR id_etapes = '93,540,350' OR id_etapes = '93,350,540')";
          break;

      }
    }
    var where_request = " ";
    if (id_client != 0) {
      where_request += " AND det_client.id_client=" + id_client;
    }
    if (id_groupe != 0) {
      where_request = " AND det_client.id_groupe=" + id_groupe;
    }
    requete += where_request + " ORDER BY det_client.id_client;";

    Detourage.query(requete, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  getListGroupeClient: function (id_groupe, callback) {
    var requete = "select * FROM det_groupe_client WHERE 1=1 AND suppr=FALSE";
    if (id_groupe != 0) {
      requete += " AND det_groupe_client.id_groupe=" + id_groupe;
    }
    requete += " ORDER BY det_groupe_client.id_groupe;";


    Detourage.query(requete, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  getSuiviRef: function (opt, callback) {
    var filter = "";
    if (opt.id_client == 1)
      filter += " AND det_client.id_client IN (128,129,130,134,135,136,161,162) \n";
    else
      filter += " AND det_client.id_client IN (156,157,158,159) \n";
    var requete = "SELECT id_lot,det_client.id_client as client,  p_lot.id_etat as etat, id_etape as etape, p_lot.libelle as lot,  p_lot.id_pers as maricule,det_ref.libelle as reference,p_lot.id_dossier,  id_det_ref\n" +
      " FROM p_lot \n" +
      " LEFT JOIN det_ref ON p_lot.id_det_ref=det_ref.id_ref\n" +
      " LEFT JOIN p_lot_client ON p_lot_client.id_lotclient=p_lot.id_lotclient \n" +
      " LEFT JOIN det_image ON  p_lot.libelle=det_image.nom_image \n" +
      " LEFT JOIN det_client ON det_client.id_client=det_image.id_client \n" +
      " WHERE p_lot.id_etape IN(1931,3686)\n" + filter +
      // " AND det_client.id_client IN (156,157,158,159) \n" +
      //    " AND det_client.id_client IN (128,129,130,134,135,136,156,157,158,159,161,162) \n"+
      " AND p_lot_client.libelle between '" + opt.dateDeb + "' AND '" + opt.dateFin + "'\n" +
      " AND p_lot.id_det_ref IS NOT NULL\n" +
      " order by reference,client, lot, etape ;";
    console.log("==> \n ******************** SUIVI REFERENCE******************\n" + requete);
    Detourage.query(requete, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },
  getListIdLot: function (opt, callback) {
    var requete = "SELECT id, id_lot\n" +
      " FROM det_retour_cq \n" +
      " WHERE id_lot in(SELECT id_lot FROM p_lot\n" +
      " LEFT JOIN p_lot_client ON p_lot_client.id_lotclient=p_lot.id_lotclient \n" +
      "WHERE p_lot.id_etape IN(1931,3686)" +
      " AND p_lot_client.libelle between '" + opt.dateDeb + "' AND '" + opt.dateFin + "'\n" +
      " AND p_lot.id_det_ref IS NOT NULL);";
    console.log("==> \n ******************** LIST ID LOT CLIENT RETOUR******************\n" + requete);
    Detourage.query(requete, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },
  getListNbg100: function (opt, callback) {
    var requete = "SELECT  fichier\n"+
    " FROM det_a_livrer\n"+
    " WHERE fichier  SIMILAR TO '%(.100.|.NBG.)%'";
    console.log("==> \n ******************** LIST nbg et 100******************\n" + requete);
    Detourage.query(requete, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  getListAllClient: function (id_cat, callback) {
    var requete = "select DISTINCT(det_client.*) from det_client LEFT JOIN  det_lien_difficulte_client ON det_lien_difficulte_client.id_client = det_client.id_client ORDER BY det_client.id_client;";
    if (id_cat !== 0) {
      switch (Number(id_cat)) {
        case 1:
          requete = "select DISTINCT(det_client.*) from det_client LEFT JOIN  det_lien_difficulte_client ON det_lien_difficulte_client.id_client = det_client.id_client WHERE id_etapes = '27,65,65'  ORDER BY det_client.id_client;";
          break;
        case 2:
          requete = "select DISTINCT(det_client.*) from det_client LEFT JOIN  det_lien_difficulte_client ON det_lien_difficulte_client.id_client = det_client.id_client WHERE id_etapes = '540,93,350'   ORDER BY det_client.id_client;";
          break;

      }
    }


    Detourage.query(requete, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },


  saveInsertVitesseEquilibre: function (option, callback) {
    var requete = "INSERT INTO det_client_cat_vitesse (id_client,id_categorie,vitesse_equilibre) VALUEs (" + option.id_client + "," + option.id_dif + "," + option.vit + ") " +
      ";";

    sails.log(requete);
    Detourage.query(requete, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  saveUpdateVitesseEquilibre: function (option, callback) {
    var requete = "UPDATE det_client_cat_vitesse SET vitesse_equilibre= " + option.vit + " WHERE id_client = " + option.id_client + " AND id_categorie = " + option.id_dif +
      ";";

    sails.log(requete);
    Detourage.query(requete, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  isExistingInTable: function (option, callback) {
    var requete = "SELECT * FROM det_client_cat_vitesse WHERE id_client = " + option.id_client + " AND id_categorie = " + option.id_dif +
      ";";

    sails.log(requete);
    Detourage.query(requete, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  getListCategorie: function (callback) {
    var requete = "select * from det_categorie order by id_categorie asc;";
    Detourage.query(requete, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  getListDesignation: function (callback) {
    var requete = "select DISTINCT(det_groupe_client.*) from det_groupe_client JOIN  det_lien_difficulte_groupe ON det_lien_difficulte_groupe.id_groupe = det_groupe_client.id_groupe ORDER BY det_client.id_groupe;";
    Detourage.query(requete, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  getListDifficulte: function (id_cat, id_client, id_groupe, callback) {
    var requete = "select DISTINCT det_difficulte.libelle dif,det_difficulte.*,det_categorie.*,det_categorie.libelle cat,det_client.id_client,det_client_cat_vitesse.vitesse_equilibre from det_client " +
      "JOIN  det_lien_difficulte_client ON det_lien_difficulte_client.id_client = det_client.id_client " +
      "JOIN det_difficulte ON det_difficulte.id_difficulte = det_lien_difficulte_client.id_difficulte " +
      "left JOIN det_client_cat_vitesse ON (det_difficulte.id_difficulte = det_client_cat_vitesse.id_categorie AND det_client_cat_vitesse.id_client = det_client.id_client)  " +
      "JOIN det_categorie ON det_categorie.id_categorie = det_difficulte.id_categorie ";

    if (id_cat !== 0) {
      switch (Number(id_cat)) {
        case 1:
          requete = "select DISTINCT det_difficulte.libelle dif,det_difficulte.*,det_categorie.*,det_categorie.libelle cat,det_client.id_client,det_client_cat_vitesse.vitesse_equilibre from det_client " +
            "JOIN  det_lien_difficulte_client ON det_lien_difficulte_client.id_client = det_client.id_client " +
            "JOIN det_difficulte ON det_difficulte.id_difficulte = det_lien_difficulte_client.id_difficulte " +
            "left JOIN det_client_cat_vitesse ON (det_difficulte.id_difficulte = det_client_cat_vitesse.id_categorie AND det_client_cat_vitesse.id_client = det_client.id_client)  " +
            "JOIN det_categorie ON det_categorie.id_categorie = det_difficulte.id_categorie WHERE id_etapes = '27,65,65' ";
          break;
        case 2:
          requete = "select DISTINCT det_difficulte.libelle dif,det_difficulte.*,det_categorie.*,det_categorie.libelle cat,det_client.id_client,det_client_cat_vitesse.vitesse_equilibre from det_client " +
            "JOIN  det_lien_difficulte_client ON det_lien_difficulte_client.id_client = det_client.id_client " +
            "JOIN det_difficulte ON det_difficulte.id_difficulte = det_lien_difficulte_client.id_difficulte " +
            "left JOIN det_client_cat_vitesse ON (det_difficulte.id_difficulte = det_client_cat_vitesse.id_categorie AND det_client_cat_vitesse.id_client = det_client.id_client)  " +
            "JOIN det_categorie ON det_categorie.id_categorie = det_difficulte.id_categorie WHERE id_etapes = '540,93,350'  ";
          break;

      }
    }
    var where_request = " ";
    if (id_client != 0) {
      where_request += " AND det_client.id_client=" + id_client;
    }
    if (id_groupe != 0) {
      where_request = " AND det_client.id_groupe=" + id_groupe;
    }
    requete += where_request + " ORDER BY det_client.id_client,det_categorie.id_categorie,det_difficulte.id_difficulte;";

    Detourage.query(requete, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  // get data_difficult

  getDataDifficulte: function (opt, callback) {

    var req_duree = " CASE WHEN " +
      "p_ldt.date_deb_ldt is null or p_ldt.date_fin_ldt is null OR p_ldt.date_deb_ldt='' OR p_ldt.date_fin_ldt='' " +
      "THEN 0 " +
      "ELSE " +
      "EXTRACT(EPOCH FROM (TO_TIMESTAMP(concat_ws(' ', p_ldt.date_fin_ldt, p_ldt.h_fin), 'YYYYMMDD HH24:MI:SS')-TO_TIMESTAMP(concat_ws(' ', p_ldt.date_deb_ldt, p_ldt.h_deb), 'YYYYMMDD HH24:MI:SS'))) END ";
    var req_qte = " CASE WHEN " +
      "p_ldt.id_etape = 126 OR p_ldt.id_etape = 3686 OR p_ldt.id_etape = 125 OR p_ldt.id_etape = 1931 OR  p_ldt.commentaire <> '' " +
      "THEN 0 " +
      "ELSE " +
      "TO_NUMBER(p_ldt.quantite,'FM9999') END ";
    var requete = "SELECT SUM(" + req_qte + ") as qte,"
      + "SUM(" + req_duree + ") as durree "
      + " FROM p_ldt " +
      "	LEFT JOIN p_lot ON p_ldt.id_lot=p_lot.id_lot " +
      " JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien " +
      "	JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape " +
      "	LEFT JOIN det_lien_difficulte_client ON " +
      "	p_etape.id_etape IN (TO_NUMBER(split_part(det_lien_difficulte_client.id_etapes,',','1'),'9999'),TO_NUMBER(split_part(det_lien_difficulte_client.id_etapes,',','2'),'9999'),TO_NUMBER(split_part(det_lien_difficulte_client.id_etapes,',','3'),'9999')) " +
      "	AND (p_lot.libelle like concat('%.', TO_CHAR(det_lien_difficulte_client.id_client,'FM9999'),'.%') OR p_lot.libelle like concat('%.0', TO_CHAR(det_lien_difficulte_client.id_client,'FM9999'),'.%'))" + "";

    var sql_where = "WHERE 1=1 AND p_ldt.date_deb_ldt >= '" + opt.dateDeb + "' AND p_ldt.date_deb_ldt <= '" + opt.dateFin + "' AND p_ldt.id_dossier = 39 AND det_lien_difficulte_client.id_client = " + opt.id_client + " AND det_lien_difficulte_client.id_difficulte = " + opt.id_difficulte + " ";

    if (opt.id_pers !== 0) {
      sql_where += " AND p_ldt.id_pers = '" + opt.id_pers + "' ";
      return callback(null, null);
    } else {
      // traitement du condition
      var cd = opt.cond;
      var list_cond = cd.split('<');
      sql_where += " AND (" + req_duree + ") >= " + Number(list_cond[0]) * 60 + " ";
      if (list_cond[1] !== '') {
        sql_where += " AND (" + req_duree + ") < " + Number(list_cond[1]) * 60 + " "
      }

      requete += sql_where;

      //console.log(requete);

      Detourage.query(requete, function (err, res) {
        if (err) return callback(err);
        return callback(null, res.rows);
      });
    }


  },


  getRapportCQ: function (opt, callback) {
    var sub_wher = "";
    if (opt.id_client != 0)
      sub_wher = " AND p_lot.libelle like '%." + opt.id_client + ".%' "
    var request = "select Count(p_lot.libelle),p_lot.libelle,p_ldt.commentaire,p_ldt.id_etape from p_ldt JOIN p_lot ON p_lot.id_lot = p_ldt.id_lot where p_ldt.id_dossier = 39 AND p_ldt.id_etape = 126 " +
      "AND p_ldt.date_deb_ldt >= '" + opt.dateDeb + "' " + sub_wher + " AND p_ldt.date_deb_ldt <= '" + opt.dateFin + "' GROUP BY p_lot.libelle,id_ldt,p_ldt.id_etape,p_ldt.commentaire ORDER BY p_lot.libelle,id_ldt";
    Detourage.query(request, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  getCQDataDifficulte: function (opt, callback) {

    var req_duree = " CASE WHEN " +
      "p_ldt.date_deb_ldt is null or p_ldt.date_fin_ldt is null OR p_ldt.date_deb_ldt='' OR p_ldt.date_fin_ldt='' " +
      "THEN 0 " +
      "ELSE " +
      "EXTRACT(EPOCH FROM (TO_TIMESTAMP(concat_ws(' ', p_ldt.date_fin_ldt, p_ldt.h_fin), 'YYYYMMDD HH24:MI:SS')-TO_TIMESTAMP(concat_ws(' ', p_ldt.date_deb_ldt, p_ldt.h_deb), 'YYYYMMDD HH24:MI:SS'))) END ";
    var requete = "SELECT SUM(TO_NUMBER(p_ldt.quantite,'9999')) as qte,"
      + "SUM(" + req_duree + ") as durree "
      + " FROM p_ldt " +
      "	LEFT JOIN p_lot ON p_ldt.id_lot=p_lot.id_lot " +
      " JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien " +
      "	JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape " +
      "	LEFT JOIN det_lien_difficulte_client ON " +
      "	p_etape.id_etape IN (TO_NUMBER(split_part(det_lien_difficulte_client.id_etapes,',','1'),'9999')) " +
      "	AND (p_lot.libelle like concat('%.', TO_CHAR(det_lien_difficulte_client.id_client,'FM9999'),'.%') OR p_lot.libelle like concat('%.0', TO_CHAR(det_lien_difficulte_client.id_client,'FM9999'),'.%'))" + "";

    var sql_where = "WHERE 1=1 AND p_ldt.date_deb_ldt >= '" + opt.dateDeb + "' AND p_ldt.date_deb_ldt <= '" + opt.dateFin + "' AND p_ldt.id_dossier = 39 AND det_lien_difficulte_client.id_client = " + opt.id_client + " AND det_lien_difficulte_client.id_difficulte = " + opt.id_difficulte + " ";

    if (opt.id_pers !== 0) {
      sql_where += " AND p_ldt.id_pers = '" + opt.id_pers + "' ";
      // traitement du condition
      var cd = opt.cond;
      var list_cond = cd.split('<');
      sql_where += " AND (" + req_duree + ") >= " + Number(list_cond[0]) * 60 + " ";
      if (list_cond[1] !== '') {
        sql_where += " AND (" + req_duree + ") < " + Number(list_cond[1]) * 60 + " "
      }

      requete += sql_where;

      //console.log(requete);

      Detourage.query(requete, function (err, res) {
        if (err) return callback(err);
        return callback(null, res.rows);
      });
    }

    else {
      return callback(null, null);
    }

  },

  getTrtDataDifficulte: function (opt, callback) {

    var req_duree = " CASE WHEN " +
      "p_ldt.date_deb_ldt is null or p_ldt.date_fin_ldt is null OR p_ldt.date_deb_ldt='' OR p_ldt.date_fin_ldt='' " +
      "THEN 0 " +
      "ELSE " +
      "EXTRACT(EPOCH FROM (TO_TIMESTAMP(concat_ws(' ', p_ldt.date_fin_ldt, p_ldt.h_fin), 'YYYYMMDD HH24:MI:SS')-TO_TIMESTAMP(concat_ws(' ', p_ldt.date_deb_ldt, p_ldt.h_deb), 'YYYYMMDD HH24:MI:SS'))) END ";
    var requete = "SELECT SUM(TO_NUMBER(p_ldt.quantite,'9999')) as qte,"
      + "SUM(" + req_duree + ") as durree "
      + " FROM p_ldt " +
      "	LEFT JOIN p_lot ON p_ldt.id_lot=p_lot.id_lot " +
      " JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien " +
      "	JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape " +
      "	LEFT JOIN det_lien_difficulte_client ON " +
      "	p_etape.id_etape IN (TO_NUMBER(split_part(det_lien_difficulte_client.id_etapes,',','2'),'9999'),TO_NUMBER(split_part(det_lien_difficulte_client.id_etapes,',','3'),'9999')) " +
      "	AND (p_lot.libelle like concat('%.', TO_CHAR(det_lien_difficulte_client.id_client,'FM9999'),'.%') OR p_lot.libelle like concat('%.0', TO_CHAR(det_lien_difficulte_client.id_client,'FM9999'),'.%'))" + "";

    var sql_where = "WHERE 1=1 AND p_ldt.date_deb_ldt >= '" + opt.dateDeb + "' AND p_ldt.date_deb_ldt <= '" + opt.dateFin + "' AND p_ldt.id_dossier = 39 AND det_lien_difficulte_client.id_client = " + opt.id_client + " AND det_lien_difficulte_client.id_difficulte = " + opt.id_difficulte + " ";
    if (opt.id_pers !== 0) {
      sql_where += " AND p_ldt.id_pers = '" + opt.id_pers + "' ";
      // traitement du condition
      var cd = opt.cond;
      var list_cond = cd.split('<');
      sql_where += " AND (" + req_duree + ") >= " + Number(list_cond[0]) * 60 + " ";
      if (list_cond[1] !== '') {
        sql_where += " AND (" + req_duree + ") < " + Number(list_cond[1]) * 60 + " ";
      }

      requete += sql_where;


      Detourage.query(requete, function (err, res) {
        if (err) return callback(err);
        return callback(null, res.rows);
      });
    } else {
      return callback(null, null);
    }

  },
  getNombreLotClient: function (option, callback) {
    var sql = "SELECT DISTINCT p_ldt.id_lot " +
      " FROM p_ldt  LEFT JOIN p_lot ON p_ldt.id_lot=p_lot.id_lot  JOIN p_lien_oper_dossier ON " +
      " p_ldt.id_etape=p_lien_oper_dossier.id_lien   JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape" +
      " LEFT JOIN det_lien_difficulte_client ON       " +
      " p_etape.id_etape IN (TO_NUMBER(split_part(det_lien_difficulte_client.id_etapes,',','2'),'9999')," +
      " TO_NUMBER(split_part(det_lien_difficulte_client.id_etapes,',','3'),'9999')) " +
      " AND (p_lot.libelle like concat('%.', TO_CHAR(det_lien_difficulte_client.id_client,'FM9999'),'.%')" +
      " OR p_lot.libelle like concat('%.0', TO_CHAR(det_lien_difficulte_client.id_client,'FM9999'),'.%')) " +
      " WHERE 1=1 AND p_ldt.date_deb_ldt >= '" + option.dateDeb + "' AND p_ldt.date_deb_ldt <= '" + option.dateFin + "' AND " +
      " p_ldt.id_dossier = 39 AND det_lien_difficulte_client.id_client =" + option.id_client;
    //console.log(sql);
    Detourage.query(sql, function (err, res) {
      if (err) return callback(err);
      //  console.log(res.rows.length);
      //if(res.rows.length.toString()!='0') console.log(lenght);
      return callback(null, res.rows.length);
    });
  },
  getNombreLotDifficulteClient: function (option, callback) {
    var req_duree = " CASE WHEN " +
      "p_ldt.date_deb_ldt is null or p_ldt.date_fin_ldt is null OR p_ldt.date_deb_ldt='' OR p_ldt.date_fin_ldt='' " +
      "THEN 0 " +
      "ELSE " +
      "EXTRACT(EPOCH FROM (TO_TIMESTAMP(concat_ws(' ', p_ldt.date_fin_ldt, p_ldt.h_fin), 'YYYYMMDD HH24:MI:SS')-TO_TIMESTAMP(concat_ws(' ', p_ldt.date_deb_ldt, p_ldt.h_deb), 'YYYYMMDD HH24:MI:SS'))) END ";

    var sql = "SELECT DISTINCT p_ldt.id_lot " +
      " FROM p_ldt  LEFT JOIN p_lot ON p_ldt.id_lot=p_lot.id_lot  JOIN p_lien_oper_dossier ON " +
      " p_ldt.id_etape=p_lien_oper_dossier.id_lien   JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape" +
      " LEFT JOIN det_lien_difficulte_client ON       " +
      " p_etape.id_etape IN (TO_NUMBER(split_part(det_lien_difficulte_client.id_etapes,',','2'),'9999')," +
      " TO_NUMBER(split_part(det_lien_difficulte_client.id_etapes,',','3'),'9999')) " +
      " AND (p_lot.libelle like concat('%.', TO_CHAR(det_lien_difficulte_client.id_client,'FM9999'),'.%')" +
      " OR p_lot.libelle like concat('%.0', TO_CHAR(det_lien_difficulte_client.id_client,'FM9999'),'.%')) " +
      " WHERE 1=1 AND p_ldt.date_deb_ldt >= '" + option.dateDeb + "' AND p_ldt.date_deb_ldt <= '" + option.dateFin + "' AND " +
      " p_ldt.id_dossier = 39 AND det_lien_difficulte_client.id_client =" + option.id_client;
    var sql_where = " ";
    var cd = option.cond;
    var list_cond = cd.split('<');
    sql_where += " AND (" + req_duree + ") >= " + Number(list_cond[0]) * 60 + " ";
    if (list_cond[1] !== '') {
      sql_where += " AND (" + req_duree + ") < " + Number(list_cond[1]) * 60 + " ";
    }

    sql += sql_where;
    //  console.log(sql);
    Detourage.query(sql, function (err, res) {
      if (err) return callback(err);
      // console.log(res.rows.length);
      // if(res.rows.length.toString()!='0') console.log(lenght);
      return callback(null, res.rows.length);
    });
  }
};
