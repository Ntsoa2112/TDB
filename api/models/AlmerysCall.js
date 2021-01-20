/**
 * AlmerysCall.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var moment = require('moment');
module.exports = {

  connection: 'ConnexionPostgresql',
  tableName: 'almerys_p_lot',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  autoPK: false,
  attributes: {

  },

  getNombreLotParDate: function(option, callback){
    var sql = "SELECT"+
      " p_lot_client.libelle  AS lib," +
      " p_ldt.id_lotclient  AS idlotclient,"+
      " p_etape.libelle  AS libel,"+
      " p_etape.id_etape  AS etape"+
      " , COUNT(p_lot.id_etape ) AS nb,"+
      " p_ldt.date_deb_ldt AS date " +
      "FROM p_ldt " +
      "LEFT JOIN p_lot ON p_lot.id_lot=p_ldt.id_lot " +
      "INNER JOIN p_lot_client ON p_lot.id_lotclient = p_lot_client.id_lotclient " +
      "LEFT JOIN p_lien_oper_dossier ON p_lot.id_etape=p_lien_oper_dossier.id_lien " +
      "LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape " +
      "WHERE p_lot_client.id_dossier = "+option.id_dossier+" AND to_date(date_deb_ldt,'yyyymmdd') between to_date('"+option.date_deb+"','yyyymmdd') and to_date('"+option.date_fin+"','yyyymmdd') AND p_lot_client.id_lotclient <> 15449 " +
      "GROUP BY " +
      "p_lot_client.libelle, " +
      "p_etape.libelle,p_etape.id_etape, " +
      "p_ldt.id_lotclient," +
      "p_ldt.date_deb_ldt " +
      "ORDER BY p_ldt.date_deb_ldt ASc,p_ldt.id_lotclient";
    //console.log(sql);
    AlmerysCall.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });

  },

  getNombreLotParDateV2: function(option, callback){
    var sql = "SELECT"+
      " p_lot_client.libelle  AS lib," +
      " p_ldt.id_lotclient  AS idlotclient,"+
      " p_etape.libelle  AS libel,"+
      " p_lot.id_etape  AS etape"+
      " , COUNT(p_lot.id_etape ) AS nb,"+
      " p_ldt.date_deb_ldt AS date " +
      "FROM p_ldt " +
      "LEFT JOIN p_lot ON p_lot.id_lot=p_ldt.id_lot " +
      "INNER JOIN p_lot_client ON p_lot.id_lotclient = p_lot_client.id_lotclient " +
      "LEFT JOIN p_lien_oper_dossier ON p_lot.id_etape=p_lien_oper_dossier.id_lien " +
      "LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape " +
      "WHERE p_lot_client.id_dossier = "+option.id_dossier+" AND p_lot.id_etape IN (3388,3387,3386,3385,3384,3383,3382,3381,3380,3379,3085,2422,2434,2420)" +
      " AND p_ldt.id_lotclient IN (17943,19201,19202,19203,19204,19205,19206,19207,19208,19209,19210,19211,19212,19213,19214,19215,19216,19217,19994,19884,20483,20699,21044) AND to_date(date_deb_ldt,'yyyymmdd') between to_date('"+option.date_deb+"','yyyymmdd') and to_date('"+option.date_fin+"','yyyymmdd') " +
      "GROUP BY " +
      "p_lot_client.libelle, " +
      "p_etape.libelle,p_lot.id_etape, " +
      "p_ldt.id_lotclient," +
      "p_ldt.date_deb_ldt " +
      "ORDER BY p_ldt.date_deb_ldt ASc,p_ldt.id_lotclient";
    //console.log(sql);
    AlmerysCall.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });

  },
  // recuperation des historique des volumes

  getHistoVolume : function (option, callback) {
    var sql = "select id_volume,valeur,type, date_ajout,libelle from p_volume_recue" +
      " join tb_specialite on tb_specialite.id_spec = p_volume_recue.id_specialite order by p_volume_recue.date_ajout  Limit 50";

    AlmerysCall.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });

  },
  //insertion des volumes recus
  addVolume : function (option, callback) {
    var sql = "insert into p_volume_recue (valeur,date_ajout,id_specialite,type) values ("+option.valeur+",'"+option.date_ajout+"',"+option.id_spec+","+option.type+") ";

    AlmerysCall.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, true);//
    });

  },
  //mis à jour des volumes recue
  updateVolume : function (option, callback) {
    var sql = "update  p_volume_recue set valeur="+option.valeur+",date_ajout='"+option.date_ajout+"' where id_volume = "+option.id_volume+" ";

    AlmerysCall.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, true);//
    });

  },

  //suppression d'un element du stock
  deleteVolume : function (option, callback) {
    var sql = "delete from  p_volume_recue where id_volume = "+option.id_volume+" ";

    AlmerysCall.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, true);//
    });

  },

  /*   cadence d'equilibre   */

  // recuperation des historique des vitesses d'equilibre

  getHistoCadence : function (option, callback) {
    var sql = "select id_cadence,valeur, date_ajout,libelle from p_cadence_eq" +
      " join tb_specialite on tb_specialite.id_spec = p_cadence_eq.id_specialite order by p_cadence_eq.date_ajout  Limit 50";

    AlmerysCall.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });

  },
  //insertion des volumes recus
  addCadence : function (option, callback) {
    var sql = "insert into p_cadence_eq (valeur,date_ajout,id_specialite) values ("+option.valeur+",'"+option.date_ajout+"',"+option.id_spec+") ";

    AlmerysCall.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, true);//
    });

  },
  //mis à jour des cadences
  updateCadence : function (option, callback) {
    var sql = "update  p_cadence_eq set valeur="+option.valeur+",date_ajout='"+option.date_ajout+"' where id_cadence = "+option.id_cadence+" ";

    AlmerysCall.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, true);//
    });

  },

  //suppression d'un element de la cadence
  deleteCadence : function (option, callback) {
    var sql = "delete from  p_cadence_eq where id_cadence = "+option.id_cadence+" ";

    AlmerysCall.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, true);//
    });

  },


  /*   cadence d'equilibre   */

  // recuperation des historique des Taux d'erreur global par specialite

  getHistoQualite : function (option, callback) {
    var sql = "select id_qualite,valeur, date_ajout,libelle from p_qualite_err" +
      " join tb_specialite on tb_specialite.id_spec = p_qualite_err.id_specialite order by p_qualite_err.date_ajout DESC Limit 50";

    AlmerysCall.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });

  },
  //insertion des volumes recus
  addQualite : function (option, callback) {
    var sql = "insert into p_qualite_err (valeur,date_ajout,id_specialite) values ("+option.valeur+",'"+option.date_ajout+"',"+option.id_spec+") ";

    AlmerysCall.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, true);//
    });

  },
  //mis à jour des taux d'erreur
  updateQualite : function (option, callback) {
    var sql = "update  p_qualite_err set valeur="+option.valeur+",date_ajout='"+option.date_ajout+"' where id_qualite = "+option.id_qualite+" ";

    AlmerysCall.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, true);//
    });

  },

  //suppression d'un element du  taux d'erreur par specialite
  deleteQualite : function (option, callback) {
    var sql = "delete from  p_qualite_err where id_qualite = "+option.id_qualite;

    AlmerysCall.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, true);//
    });

  },


  getHistoHmorte : function (option, callback) {
    var sql = "select almerys_type_heure.libelle as lib,h_deb,h_fin,nb_pers_concerne, date,tb_specialite.libelle from almerys_heure_morte" +
      " join tb_specialite on tb_specialite.id_spec = almerys_heure_morte.id_spec JOIN almerys_type_heure on almerys_heure_morte.id_type_heure=almerys_type_heure.id_type order by almerys_heure_morte.date DESC Limit 50";
    //console.log("sql===========>"+sql);
    AlmerysCall.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });

  },
    //insertion des heures mortes
  addHmorte : function (option, callback) {
    var sql = "insert into almerys_heure_morte (id_type_heure,nb_pers_concerne,date,id_spec,h_deb,h_fin) values ("+option.id_type_heure+","+option.nb_pers_concerne+",'"+option.date+"',"+option.id_spec+",'"+option.h_deb+"','"+option.h_fin+"') ";

    AlmerysCall.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, true);//
    });

  },

  /**
   * Fonction recuperation Liste Specialite Dans Ticketing CALL
   * @param option
   * @param callback
   */
  getListSpecialiteTicketing : function(option, callback) {
    var sql = "SELECT id,libelle FROM almerys_call_ticket_specialite ORDER BY libelle asc";
    AlmerysCall.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  getListActionTicketing : function(option, callback) {
    var sql = "SELECT id,libelle FROM almerys_call_ticket_action WHERE is_vue ORDER BY libelle asc";
    AlmerysCall.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  /**
   * Fonction recuperation Liste Etat Demande Dans Ticketing CALL
   * @param option
   * @param callback
   */
  getListEtatDemandeTicketing : function(option, callback) {
  var sql = "SELECT id,libelle FROM almerys_call_ticket_etat_demande WHERE id_demande IN (0,"+option.id_demande_ticket+") ORDER BY libelle asc";
    AlmerysCall.query(sql, function (err, res) {
    if (err) return callback(err);
    return callback(null, res.rows);
  });
},

  /**
   * Fonction recuperation Liste Etat Demande Dans Ticketing CALL
   * @param option
   * @param callback
   */
  getListClientTicketing : function(option, callback) {
  var sql = "SELECT numero_client,nom FROM p_client where description='client_call' ORDER BY nom";
    AlmerysCall.query(sql, function (err, res) {
    if (err) return callback(err);
    return callback(null, res.rows);
  });
},
  /***
   * Fonction recuperation Liste Demande Ticketing (SAISIE , REMONTEE , CONTESTATION PEC)
   * @param option
   * @param callback
   */
  getListDemandeTicketing: function(option, callback) {
    var sql = "SELECT id,libelle FROM almerys_call_ticketing_demande ORDER BY id";
    AlmerysCall.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },
  /**
   * Fonction recuperation liste Nature Erreur
   * @param option
   * @param callback
   */
  getListNatureErreur: function(option, callback) {
    var sql = "SELECT id,libelle FROM almerys_call_ticket_saisie_nature_erreur ORDER BY id";
    AlmerysCall.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },
  /**
   * Fonction recuperation donnee Remontée Ticketing CALL
   * @param option
   * @param callback
   */
  getRemonteTicketing : function(option, callback) {
    var sql = "SELECT almerys_call_ticket.id_ticket," +
      " date_insert, " +
      " almerys_call_ticket.heure_debut_appel, " +
      " almerys_call_ticket.heure_enregistrement, " +
      " almerys_call_ticket.specialite, " +
      " almerys_call_ticket.tc, " +
      " almerys_call_ticket_prenom_fr.prenom_fr as prenom_fr," +
      " almerys_call_ticket.client, " +
      " almerys_call_ticket.ps, " +
      " almerys_call_ticket.nni, " +
      " almerys_call_ticket.num_facture, " +
      " almerys_call_ticket.num_pec, " +
      " almerys_call_ticket.id_etat_demande, " +
      " almerys_call_ticket.value_demande, " +
      " almerys_call_ticket_etat_demande.libelle as libelle_etat, " +
      " almerys_call_ticket.id_pertinence as id_pertinence, " +
      " almerys_call_ticket.id_action as id_action, " +
      " almerys_call_ticket_action.libelle as libelle_action " +
      " FROM almerys_call_ticket " +
      " LEFT JOIN almerys_call_ticket_etat_demande ON almerys_call_ticket_etat_demande.id = almerys_call_ticket.id_etat_demande " +
      " LEFT JOIN almerys_call_ticket_action ON almerys_call_ticket_action.id = almerys_call_ticket.id_action " +
      " LEFT JOIN almerys_call_ticket_prenom_fr ON almerys_call_ticket_prenom_fr.id_pers = almerys_call_ticket.tc " +
      " WHERE 1=1 ";
    if(option.id_demande.toString() === '1')
    {
      sql+= " AND almerys_call_ticket.demande = 'REMONTEE' AND id_traitement = 0 ";
    }
    else
    {
      sql+= " AND almerys_call_ticket.demande = 'SAISIE' AND id_traitement = 0 ";
    }
    if(option.date_deb !== '' && option.date_fin !== '')
    {
      if(option.date_deb === option.date_fin)
      {
        sql+= " AND to_date(date_insert,'DD/MM/YYYY') = to_date('"+option.date_deb+"','YYYYMMDD') ";
      }
      else
      {
        sql+= "AND to_date(date_insert,'DD/MM/YYYY') >= to_date('"+option.date_deb+"','YYYYMMDD') " +
          " AND to_date(date_insert,'DD/MM/YYYY') <= to_date('"+option.date_fin+"','YYYYMMDD') ";
      }
    }

    if(option.specialite !== "")
    {
      sql+= " AND specialite IN ('"+option.specialite+"') ";
    }
    if(option.matricule !== "" && option.matricule !=='0')
    {
      sql+= " AND tc = "+option.matricule+" ";
    }
    if(option.num_finess !== "" && option.num_finess !=='0')
    {
      sql+= " AND ps = '"+option.num_finess+"' ";
    }
    if(option.client !== "")
    {
      sql+= " AND client='"+option.client+"' ";
    }
    if(option.id_etat !== "")
    {
      if(option.id_etat === "2")
      {
        sql+= " AND (almerys_call_ticket.id_etat_demande = "+option.id_etat+" OR almerys_call_ticket.id_etat_demande is null) ";
      }
      else
      {
        sql+= " AND almerys_call_ticket.id_etat_demande = "+option.id_etat+" ";
      }
    }
    if(option.id_ticket !== "")
    {
      sql+= " AND almerys_call_ticket.id_ticket = "+option.id_ticket+" ";
    }
    sql+= "ORDER BY almerys_call_ticket.id_ticket DESC";
    console.log(sql);
    AlmerysCall.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },
  // ----------------------------------------------------- FULL SECTION TRAITEMENT REMONTEE -----------------------------------------------//
  /***
   * Fonction pour Verification/Enregistrement status initial de la remonte
   * @param options
   * @param callback
   * @constructor
   */
  InitialisationRemonte: function (options, callback) {
    // Verification SI HISTORIQUE INITIAL TRAITEMENT EXIST
    var sql = "SELECT id FROM almerys_call_ticket_historique_remonte WHERE id_etat = 2 AND id_ticket ="+options.id_ticket+" LIMIT 1";
    AlmerysCall.query(sql, function (err, result_historique_init) {
      if (err) return callback(err);
      if(result_historique_init.rows.length === 0)
      {
        // Insertion Historique Initialisation (Depart Donnee)
        async.series([
          function(cb_series) {
            let momentTemp  = moment(options.date_insert, "DD/MM/YYYY");
            let paramnew = {
              id_ticket: options.id_ticket,
              id_pers: options.tc,
              id_action: 4,
              id_etat: 2,
              commentaire: 'Enregistrement Traitement (Ticketing)',
              h_deb: options.heure_debut_appel+':00',
              h_fin: options.heure_enregistrement+':00',
              date_action: momentTemp.format("YYYYMMDD"),
              id_etat_precedent: 0,
            };
            AlmerysCall.InsertionNouvelleHistorique(paramnew, cb_series);
          }
        ],function(error_insertion, retour_insertion){
          if(error_insertion) return callback(error_insertion);
          return callback(null, true);
        });
      }else
      {
        // Deja Enregistrer
        return callback(null, true);
      }
    });
  },
  /***
   * Fonction Insertion New Historique
   * @param options
   * @param callback
   * @constructor
   */
  InsertionNouvelleHistorique: function(options, callback) {
    var sql = "INSERT INTO almerys_call_ticket_historique_remonte (id_ticket, id_pers, id_action, id_etat, commentaire, h_deb, h_fin, date_action," +
      " id_etat_precedent) " +
      " VALUES (" +
      " "+options.id_ticket+",  " +
      " "+options.id_pers+",  " +
      " "+options.id_action+",  " +
      " "+options.id_etat+",  " +
      " '"+options.commentaire+"',  " +
      " '"+options.h_deb+"',  " +
      " '"+options.h_fin+"',  " +
      " '"+options.date_action+"',  " +
      " "+options.id_etat_precedent+"  " +
      ") RETURNING id,id_pers,id_etat_precedent";
    AlmerysCall.query(sql, function (err, result) {
      if (err) return callback(err);
      return callback(null, result.rows);
    });
  },
  /***
   * Fonction Modification Etat Ticket
   * @param options
   * @param callback
   * @constructor
   */
  ModificationEtatTicket: function (options, callback) {
    var sql = "UPDATE almerys_call_ticket SET id_etat_demande = "+options.id_etat+" " +
      " WHERE id_ticket = " +
      " "+options.id_ticket+"  " +
      "";
    AlmerysCall.query(sql, function (err, result) {
      if (err) return callback(err);
      return callback(null, result.rows);
    });
  },
  /***
   * Fonction Verification
   * @param options
   * @param callback
   */
  checkECRemonte: function (options, id_pers_traite, callback) {
    var query_ticket = "SELECT id,id_pers,id_etat_precedent FROM almerys_call_ticket_historique_remonte WHERE id_ticket="+options.id_ticket+" AND id_etat = 1 LIMIT 1";
    var query_id_pers = "SELECT almerys_call_ticket_historique_remonte.id,almerys_call_ticket_historique_remonte.id_pers," +
      "almerys_call_ticket_historique_remonte.id_etat_precedent,almerys_call_ticket_historique_remonte.id_ticket,almerys_call_ticket.ps " +
      "FROM almerys_call_ticket_historique_remonte " +
      " LEFT JOIN almerys_call_ticket ON almerys_call_ticket.id_ticket = almerys_call_ticket_historique_remonte.id_ticket" +
      " WHERE almerys_call_ticket_historique_remonte.id_pers="+id_pers_traite+" AND almerys_call_ticket_historique_remonte.id_etat = 1 LIMIT 1";
    async.parallel([
      function(cb_para) {
        AlmerysCall.query(query_ticket, function (err, result) {
          if (err) return cb_para(err);
          return cb_para(null, result.rows);
        });
      },
      function(cb_para) {
        AlmerysCall.query(query_id_pers, function (err, result) {
          if (err) return cb_para(err);
          return cb_para(null, result.rows);
        });
      }
    ],function(error_param, resulta_param){
      if(error_param) return callback(error_param);
      var dataHistorique_Ticket = resulta_param[0];
      var dataHistorique_Pers = resulta_param[1];
      if(dataHistorique_Ticket.length === 0 && dataHistorique_Pers.length === 0)
      {
        // TRAITEMENT OK
        const objetRetour = {
          status: 'ok'
        };
        return callback(null, objetRetour);
      }
      else
      {
        // CHECK SI ENCOURS PERSO
        if(parseInt(id_pers_traite) === parseInt(dataHistorique_Pers[0].id_pers))
        {
          // TRAITEMENT DEJA ENCOURS PAR LA MEME PERSONNE
          // ---- Recuperation Traitement TICKET
          let objetRetour = {};
          objetRetour.status='ec_me';
          objetRetour.dataHistorique = dataHistorique_Pers[0];
          var parameterTicket = {
            date_deb: '',
            date_fin: '',
            specialite: '',
            matricule: '0',
            id_etat: '',
            client: '',
            id_ticket: dataHistorique_Pers[0].id_ticket+'',
            num_finess: '',
            id_demande: 1,
          };
          async.parallel([
            function(callback_new) {
              AlmerysCall.getRemonteTicketing(parameterTicket, callback_new);
            },
            function(cb_series_doublons) {
            var newoption = {
              ps : dataHistorique_Pers[0].ps
            };
              AlmerysCall.getDoublonNumFinessRemonte(newoption, cb_series_doublons);
            },
            // Recuperation Historique Traitement
            function(callback_new) {
              AlmerysCall.getHistoriqueRemonteCall(parameterTicket, callback_new);
            }
          ],function(erreur_series, result_series) {
            if (erreur_series) {
              return callback('Une erreur est survenue lors de la recuperation de donnée');
            }
            else {
              objetRetour.dataTicket = result_series[0][0];
              objetRetour.dataDoublons = result_series[1];
              objetRetour.dataHistoriqueRemonte = result_series[2];
              return callback(null, objetRetour);
            }
          });
        }
        else
        {
          if(dataHistorique_Ticket.length>0)
          {
            // TRAITEMENT DEJA PRIS PAR UN AUTRE
            const objetRetour = {
              status: 'ec'
            };
            return callback(null, objetRetour);
          }
        }
      }
    });
  },
  /***
   * Fonction pour Mettre A jour les données Historique;
   * @param option
   * @param callback
   * @constructor
   */
  UpdateHistoriqueRemonte: function(options, callback) {
    var sql = "UPDATE almerys_call_ticket_historique_remonte SET " +
      " id_action = "+options.id_action+" ," +
      " id_etat = "+options.id_etat+", " +
      " pertinence = "+options.pertinence+", " +
      "commentaire = '"+options.commentaire+"', " +
      "h_fin= '"+options.h_fin+"' " +

      " WHERE id = "+options.id_historique+" ";
    console.log(sql);
    AlmerysCall.query(sql, function (err, result) {
      if (err) return callback(err);
      return callback(null, result.rows);
    });
  },

  UpdateEtatRemonte: function(options, callback) {
    var sql = "UPDATE almerys_call_ticket SET " +
      " id_etat_demande = "+options.id_etat+" " +
      " ,id_pertinence = "+options.pertinence+" " +
      " ,id_action = "+options.id_action+" " +
      " WHERE id_ticket = "+options.id_ticket+" ";
    console.log(sql);
    AlmerysCall.query(sql, function (err, result) {
      if (err) return callback(err);
      return callback(null, result.rows);
    });
  },
  /***
   * FOnction recuperation tous les utilisateur Remonte Call
   * @param callback
   */
  getAllListUtilisateurRemonteCall: function(callback) {
    var sql = "SELECt almerys_call_ticket_profil.id, almerys_call_ticket_profil.id_pers,appelation,almerys_call_ticket_profil.id_niveau," +
      " almerys_call_ticket_type_profil.libelle as libelle_niveau, almerys_call_ticket_prenom_fr.prenom_fr FROM almerys_call_ticket_profil "+
    " LEFT JOIN r_personnel ON r_personnel.id_pers = almerys_call_ticket_profil.id_pers "+
    " LEFT JOIN almerys_call_ticket_type_profil ON almerys_call_ticket_type_profil.id = almerys_call_ticket_profil.id_niveau " +
    " LEFT JOIN almerys_call_ticket_prenom_fr ON almerys_call_ticket_prenom_fr.id_pers = r_personnel.id_pers " +
      " ORDER BY almerys_call_ticket_profil.id_pers";
    AlmerysCall.query(sql, function (err, result) {
      if (err) return callback(err);
      return callback(null, result.rows);
    });
  },
  /***
   * Fonction recuperation Utilisateur Remonte Call
   * @param id_pers
   * @param callback
   */
  getSingleUtilisateurRemonteCall: function(id_pers, callback) {
    var sql= "SELECT almerys_call_ticket_profil.id, almerys_call_ticket_profil.id_pers, almerys_call_ticket_profil.id_niveau " +
      ",etat_autoriser,etat_afficher FROM almerys_call_ticket_profil  " +
      " LEFT JOIN almerys_call_ticket_type_profil ON almerys_call_ticket_type_profil.id = almerys_call_ticket_profil.id_niveau" +
      " WHERE almerys_call_ticket_profil.id_pers= "+id_pers+" ORDER BY almerys_call_ticket_profil.id DESC ";
    AlmerysCall.query(sql, function (err, result) {
      if (err) return callback(err);
      return callback(null, result.rows);
    });
  },
  /**
   * Fonction Modification Droit
   * @param option
   * @param callback
   */
  setNiveauUtilisateurRemonteCall: function(option, callback) {
    var sql = "UPDATE almerys_call_ticket_profil SET id_niveau = "+option.id_niveau+" WHERE id = "+option.id;
    AlmerysCall.query(sql, function (err, result) {
      if (err) return callback(err);
      return callback(null, result.rows);
    });
  },
  /**
   * Fonction Insertion NOuveau Utilisateur REMONTE
   * @param option
   * @param callback
   */
  insertUtilisateurRemonteCall: function(option, callback) {
    var sql = "INSERT INTO almerys_call_ticket_profil (id_pers,id_niveau) VALUES ("+option.id_pers+", "+option.id_niveau+") ";
    AlmerysCall.query(sql, function (err, result) {
      if (err) return callback(err);
      return callback(null, result.rows);
    });
  },

  /**
   * Fonction recuperation liste Niveau profil remonte Call
   * @param option
   * @param callback
   */
  getListeNiveauProfilRemonte: function(option, callback) {
    var sql = "SELECT id,libelle FROM almerys_call_ticket_type_profil ORDER BY id";
    AlmerysCall.query(sql, function (err, result) {
      if (err) return callback(err);
      return callback(null, result.rows);
    });
  },
  /**
   * Fonction Verification Si Utilisateur Remonte Existe Deja
   * @param option
   * @param callback
   */
  checkIfUtilisateurRemonteCallExist: function (option, callback) {
    var sql = "SELECT id FROM almerys_call_ticket_profil WHERE id_pers="+option.id_pers+" ORDER BY id desc";
    AlmerysCall.query(sql, function (err, result) {
      if (err) return callback(err);
      if(result.rows.length ===0 )
      {
        return callback(null, false);
      }
      else
      {
        return callback(null, true);
      }
    });
  },

  SupprimerUtilisateurRemonteCallExist: function (option, callback) {
    var sql = "DELETE FROM almerys_call_ticket_profil WHERE id_pers="+option.id_pers+"";
    AlmerysCall.query(sql, function (err, result) {
      if (err) return callback(err);
      return callback(null, result.rows);
    });
  },

  /**
   * Fonction Recuperation Donnée Doublons
   * @param option
   * @param callback
   */
  getDoublonNumFinessRemonte: function(option, callback) {
    let jsonObjetPS = { date_deb: '',
      date_fin: '',
      specialite: '',
      matricule: '0',
      id_etat: '',
      client: '' ,
      num_finess: option.ps,
      id_ticket: '',
      id_demande: 1
    };
    //console.log(jsonObjetPS);
    async.series([
      function(cb_ticket) {
        AlmerysCall.getRemonteTicketing(jsonObjetPS, cb_ticket);
      }
    ],function(erreur_ticket, resulticket){
      if(erreur_ticket)
      {
        console.log(erreur_ticket);
        return callback(erreur_ticket);
      }
      if(resulticket[0].length>1)
      {
        const jsonC = {
          isDoublons : true,
          listeDoublons: resulticket[0]
        };
        return callback(null, jsonC);
      }
      else
      {
        const jsonC = {
          isDoublons : false
        };
        return callback(null, jsonC);
      }
    });
  },


  /**
   * Fonction recuperation Historique Traitement Remonte
   * @param option
   * @param callback
   */
  getHistoriqueRemonteCall:function (option, callback) {
    var sql = "SELECT "+
    " to_char(to_date(date_action, 'YYYYMMDD'),'DD/MM/YYYY') as date_action, "+
    " almerys_call_ticket_historique_remonte.h_deb, "+
    " almerys_call_ticket_historique_remonte.h_fin, " +
      " almerys_call_ticket_historique_remonte.id_pers," +
      " almerys_call_ticket_historique_remonte.pertinence, "+
    " almerys_call_ticket_etat_demande.libelle as libelle_etat, "+
    " almerys_call_ticket_action.libelle as libelle_action, "+
    " almerys_call_ticket_historique_remonte.commentaire as commentaire "+
    " FROM almerys_call_ticket_historique_remonte"+
    " INNER JOIN almerys_call_ticket_action ON almerys_call_ticket_action.id = almerys_call_ticket_historique_remonte.id_action"+
    " INNER JOIN almerys_call_ticket_etat_demande ON almerys_call_ticket_etat_demande.id = almerys_call_ticket_historique_remonte.id_etat"+
    " where id_ticket = "+option.id_ticket+" AND id_action NOT IN (5)"+
    " ORDER BY almerys_call_ticket_historique_remonte.id desc";
    console.log(sql);
    AlmerysCall.query(sql, function (err, result) {
      if (err) return callback(err);
      return callback(null, result.rows);
    });
  },
  /**
   * Fonction Initialisation donnee sans Execution Info
   * @param params
   * @param callback
   */
  getInfoWithoutInit : function(params, callback) {
    const objetRetour = {
      status: 'ec_vue_tc',
    };
    async.series([
      function(cb_series_doublons) {
        AlmerysCall.getDoublonNumFinessRemonte(params, cb_series_doublons);
      }
    ],function(error_doublons, result_doublons){
      if(error_doublons)
      {
        return callback(error_doublons);
      }
      else
      {
        objetRetour.dataDoublons = result_doublons[0];
        return callback(null, objetRetour);
      }
    });
  },

  /**
   * Fonction recuperation donnee Etat Traitement Et Pertinence Ticketing CALL
   * @param option
   * @param callback
   */
  getDataRemonteeReportingEtatEtPertinence : function(option, callback) {
    var sql = "SELECT "+
    " id_ticket,id_etat_demande,id_pertinence "+
    " FROM "+
    " almerys_call_ticket "+
    " WHERE "+
    " demande = 'REMONTEE' "+
      " AND id_traitement = 0 ";
    if(option.date_deb !== '' && option.date_fin !== '')
    {
      if(option.date_deb === option.date_fin)
      {
        sql+= " AND to_date(date_insert,'DD/MM/YYYY') = to_date('"+option.date_deb+"','YYYYMMDD') ";
      }
      else
      {
        sql+= "AND to_date(date_insert,'DD/MM/YYYY') >= to_date('"+option.date_deb+"','YYYYMMDD') " +
          " AND to_date(date_insert,'DD/MM/YYYY') <= to_date('"+option.date_fin+"','YYYYMMDD') ";
      }
    }

    if(option.specialite !== "")
    {
      sql+= " AND specialite='"+option.specialite+"' ";
    }
    if(option.matricule !== "" && option.matricule !=='0')
    {
      sql+= " AND tc = "+option.matricule+" ";
    }
    if(option.num_finess !== "" && option.num_finess !=='0')
    {
      sql+= " AND ps = '"+option.num_finess+"' ";
    }
    if(option.client !== "")
    {
      sql+= " AND client='"+option.client+"' ";
    }
    if(option.id_etat !== "")
    {
      if(option.id_etat === "2")
      {
        sql+= " AND (almerys_call_ticket.id_etat_demande = "+option.id_etat+" OR almerys_call_ticket.id_etat_demande is null) ";
      }
      else
      {
        sql+= " AND almerys_call_ticket.id_etat_demande = "+option.id_etat+" ";
      }
    }
    if(option.id_ticket !== "")
    {
      sql+= " AND almerys_call_ticket.id_ticket = "+option.id_ticket+" ";
    }
    sql+= "ORDER BY almerys_call_ticket.id_ticket DESC";
    //console.log(sql);
    AlmerysCall.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },

  /***
   * Fonction Verification
   * @param options
   * @param callback
   */
  checkECSaisie: function (options, id_pers_traite, callback) {
    var query_ticket = "SELECT id,id_pers,id_etat_precedent FROM almerys_call_ticket_historique_remonte WHERE id_ticket="+options.id_ticket+" AND id_etat = 1 LIMIT 1";
    var query_id_pers = "SELECT almerys_call_ticket_historique_remonte.id,almerys_call_ticket_historique_remonte.id_pers," +
      "almerys_call_ticket_historique_remonte.id_etat_precedent,almerys_call_ticket_historique_remonte.id_ticket,almerys_call_ticket.ps " +
      "FROM almerys_call_ticket_historique_remonte " +
      " LEFT JOIN almerys_call_ticket ON almerys_call_ticket.id_ticket = almerys_call_ticket_historique_remonte.id_ticket" +
      " WHERE almerys_call_ticket_historique_remonte.id_pers="+id_pers_traite+" AND almerys_call_ticket_historique_remonte.id_etat = 1 LIMIT 1";
    async.parallel([
      function(cb_para) {
        AlmerysCall.query(query_ticket, function (err, result) {
          if (err) return cb_para(err);
          return cb_para(null, result.rows);
        });
      },
      function(cb_para) {
        AlmerysCall.query(query_id_pers, function (err, result) {
          if (err) return cb_para(err);
          return cb_para(null, result.rows);
        });
      }
    ],function(error_param, resulta_param){
      if(error_param) return callback(error_param);
      var dataHistorique_Ticket = resulta_param[0];
      var dataHistorique_Pers = resulta_param[1];
      if(dataHistorique_Ticket.length === 0 && dataHistorique_Pers.length === 0)
      {
        // TRAITEMENT OK
        const objetRetour = {
          status: 'ok'
        };
        return callback(null, objetRetour);
      }
      else
      {
        // CHECK SI ENCOURS PERSO
        try {
          if(parseInt(id_pers_traite) === parseInt(dataHistorique_Pers[0].id_pers))
          {
            // TRAITEMENT DEJA ENCOURS PAR LA MEME PERSONNE
            // ---- Recuperation Traitement TICKET
            let objetRetour = {};
            objetRetour.status='ec_me';
            objetRetour.dataHistorique = dataHistorique_Pers[0];
            var parameterTicket = {
              date_deb: '',
              date_fin: '',
              specialite: '',
              matricule: '0',
              id_etat: '',
              client: '',
              id_ticket: dataHistorique_Pers[0].id_ticket+'',
              num_finess: '',
              id_demande: 2
            };
            async.parallel([
              function(callback_new) {
                AlmerysCall.getRemonteTicketing(parameterTicket, callback_new);
              },
              // Recuperation Historique Traitement
              function(callback_new) {
                AlmerysCall.getHistoriqueRemonteCall(parameterTicket, callback_new);
              }
            ],function(erreur_series, result_series) {
              if (erreur_series) {
                return callback('Une erreur est survenue lors de la recuperation de donnée');
              }
              else {
                objetRetour.dataTicket = result_series[0][0];
                objetRetour.dataHistoriqueSaisie = result_series[1];
                return callback(null, objetRetour);
              }
            });
          }
          else
          {
            if(dataHistorique_Ticket.length>0)
            {
              // TRAITEMENT DEJA PRIS PAR UN AUTRE
              const objetRetour = {
                status: 'ec'
              };
              return callback(null, objetRetour);
            }
          }
        }
        catch (e) {
          console.log(e);
          return callback(e);
          //return res.badRequest("Une erreur est survenue");
        }
      }
    });
  },
  /**
   * Fonction Modification ligne ticket Saisie
   * @param options
   * @param callback
   * @constructor
   */
  UpdateSaisieMain: function(options, callback) {
    var sql = "UPDATE almerys_call_ticket SET " +
      " nni = '"+options.objet_ticket_modif.nni.replace(/'/g,"''")+"' " +
      " ,num_facture = '"+options.objet_ticket_modif.num_facture.replace(/'/g,"''")+"' " +
      " ,num_pec = '"+options.objet_ticket_modif.num_pec.replace(/'/g,"''")+"' " +
      " ,ps = '"+options.objet_ticket_modif.ps.replace(/'/g,"''")+"' " +
      " ,specialite = '"+options.objet_ticket_modif.specialite.replace(/'/g,"''")+"' " +
      " ,value_demande = '"+options.objet_ticket_modif.value_demande.replace(/'/g,"''")+"' " +
      " ,id_etat_demande = "+options.id_etat+" " +
      " ,id_pertinence = "+options.pertinence+" " +
      " ,id_action = "+options.id_action+" " +
      " WHERE id_ticket = "+options.id_ticket+" ";
    console.log(sql);
    AlmerysCall.query(sql, function (err, result) {
      if (err) return callback(err);
      return callback(null, result.rows);
    });
  },
  /**
   *
   * @param options
   * @param callback
   * @constructor
   */
  SaveHistoriqueUpdateSaisie: function(options, callback) {
    var query = " INSERT INTO almerys_call_ticket_historique_modification(id_historique,specialite,ps,num_facture,nni,num_pec,value_demande) "+
      " VALUES " +
      " (" +
      " "+options.id_historique+", " +
      " '"+options.objet_ticket_ancienne_valeur.specialite.replace(/'/g,"''")+"', " +
      " '"+options.objet_ticket_ancienne_valeur.ps.replace(/'/g,"''")+"', " +
      " '"+options.objet_ticket_ancienne_valeur.num_facture.replace(/'/g,"''")+"', " +
      " '"+options.objet_ticket_ancienne_valeur.nni.replace(/'/g,"''")+"', " +
      " '"+options.objet_ticket_ancienne_valeur.num_pec.replace(/'/g,"''")+"', " +
      " '"+options.objet_ticket_ancienne_valeur.value_demande.replace(/'/g,"''")+"' " +
      " )";
    AlmerysCall.query(query, function (err, result) {
      if (err) return callback(err);
      return callback(null, result.rows);
    });
  },
  /***
   * Fonction pour Mettre A jour les données Historique;
   * @param option
   * @param callback
   * @constructor
   */
  UpdateHistoriqueSaisie: function(options, req, callback) {
    var sql = "UPDATE almerys_call_ticket_historique_remonte SET " +
      " id_action = "+options.id_action+" ," +
      " id_etat = "+options.id_etat+", " +
      " pertinence = "+options.pertinence+", " +
      "commentaire = '"+options.commentaire+"', " +
      "h_fin= '"+options.h_fin+"', " +
      " id_droit = "+req.session.UserRemonteCall.id_niveau+" " +

      " WHERE id = "+options.id_historique+" ";
    console.log(sql);
    AlmerysCall.query(sql, function (err, result) {
      if (err) return callback(err);
      return callback(null, result.rows);
    });
  },
  /**
   * Fonction pour Mettre à jour
   * @param options
   * @param callback
   */
  getModificationResaisieTicket: function (options, callback) {
    var sql = "select almerys_call_ticket_etat_demande.libelle as etat, "+
    " almerys_call_ticket_historique_remonte.id_pers, "+
     " almerys_call_ticket_historique_remonte.commentaire, "+
     " almerys_call_ticket_historique_remonte.date_action "+
    "from almerys_call_ticket_historique_remonte "+
    " LEFT JOIN almerys_call_ticket_etat_demande ON almerys_call_ticket_etat_demande.id = almerys_call_ticket_historique_remonte.id_etat "+
    " where    id_droit IN ("+options.id_droit+") AND id_ticket="+options.id_ticket+" ORDER BY almerys_call_ticket_historique_remonte.id desc LIMIT 1";
    //console.log(sql);
    AlmerysCall.query(sql, function (err, result) {
      if (err) return callback(err);
      return callback(null, result.rows);
    });
  },
  /**
   * FOnction pour recuperer derniere modification rappel
   * @param options
   * @param callback
   */
  getLastRappelModificationResaisieTicket: function (options, callback) {
    var sql = "select commentaire, date_action from almerys_call_ticket_historique_remonte "+
    " WHERE id_historique_old != 0 AND id_historique_old "+
    " is not null and id_ticket = "+options.id_ticket+" ORDER BY id desc limit 1 ";
    //console.log(sql);
    AlmerysCall.query(sql, function (err, result) {
      if (err) return callback(err);
      var stringReturnedVal = "";
      if(result.rows.length !== 0)
      {
        let commentaire = result.rows[0].commentaire;
        let date_action = result.rows[0].date_action;
        if(commentaire === 'Action: PS à rappeler Injoignable')
        {
          stringReturnedVal = "Injoignable " + date_action;
        }
        else
        {
          stringReturnedVal = "OK " + date_action;
        }
      }
      return callback(null, stringReturnedVal);
    });
  },
  //mis à jour des des heures mortes
  /*updateHmorte : function (option, callback) {
    var sql = "update  almerys_heure_morte set valeur="+option.valeur+",date_ajout='"+option.date_ajout+"' where id_qualite = "+option.id_qualite+" ";

    AlmerysCall.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, true);//
    });

  },*/

  //suppression d'un element des heures mortes
  /*deleteQualite : function (option, callback) {
    var sql = "delete from  p_qualite_err where id_qualite = "+option.id_qualite;

    AlmerysCall.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, true);//
    });

  },*/



};

