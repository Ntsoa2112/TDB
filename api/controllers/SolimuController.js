/**
 * SolimuController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  IndexStatistique: function (req,res) {
    if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"] = "";
    menu["dossierAdmin"] = "";
    menu["gestionDossier"] = "selected";
    menu["statOpAdmin"] = "";
    menu["presence"] = "";
    menu["admin"] = "";

    return res.view("pages/solimu/statistique_saisie/index", {menu: menu, layout: false});
  },
  // RECUPERATION DONNEE SAISIE
  getDonneeSaisie: function (req, res) {
    var retour = [];
    //Recuperation Parametre
    var date_deb = req.param("date_deb");
    var date_fin = req.param("date_fin");
    var id_lot_client = req.param("id_lot_client");
    var id_dossier = req.param("id_dossier");
    // RECUPERATION DATE ENTRE INTERVA DEB FIN
    async.series([
      function(callback)
      {
        var optionTemp = {};
        optionTemp.date_deb = date_deb;
        optionTemp.date_fin = date_fin;
        optionTemp.id_dossier = id_dossier;
        Solimu.getListeDateEntreInterVal(optionTemp,callback);
      }
    ],function(err, dates)
    {
      if(err)
      {
        return res.error(err);
      }
      else
      {
        async.forEachSeries(dates[0], function(info_date, callback_date_suivant) {
          var optionTemp = {};
          optionTemp.date_deb = date_deb;
          optionTemp.date_fin = date_fin;
          optionTemp.id_dossier = id_dossier;
          optionTemp.id_lot_client = id_lot_client;
          optionTemp.date = info_date.date_deb_ldt;
          optionTemp.id_pers = info_date.id_pers;
          async.series([
          //async.parallel([
            // Recuperation QTE PDF
            function(callback){
            optionTemp.etat = 2;
              Solimu.getNombrePDFTraiterparDateetMatricule(optionTemp,callback);
            },
            // Recuperation QTE Acte Saisie
            function(callback){
              optionTemp.etat = 2;
              Solimu.getNombreActeParDateetMatricule(optionTemp,callback);
            },
            // Recuperation Facture Temporarise
            function(callback){
            optionTemp.etat = 6;
              Solimu.getNombrePDFTraiterparDateetMatricule(optionTemp,callback);
            },
            // Recuperation Facture rejet
            function(callback){
            optionTemp.etat = 3;
              Solimu.getNombrePDFTraiterparDateetMatricule(optionTemp,callback);
            },
            // Nombre Echantillon
            // function(callback){
            //
            // },
            // Nombre Erreur
            // Heure Prod
          ],function(err,reponseParallel)
          {
            if(err) return res.badRequest(err);
            var obj = {};
            obj.date = info_date.date_deb_ldt;
            obj.id_pers = info_date.id_pers;
            obj.nombre_pdf_traite = reponseParallel[0][0].count;
            obj.nombre_acte_traite = reponseParallel[1][0].count;
            obj.nombre_pdf_temporaire = reponseParallel[2][0].count;
            obj.nombre_pdf_rejeter = reponseParallel[3][0].count;
            obj.nombre_echantillon = "";
            obj.nombre_erreur = "";
            obj.heure_prod = "";
            retour.push(obj);
            callback_date_suivant();
          });
        }, function(err)
        {
          return res.json(JSON.stringify(retour));
        });
      }
    });
  },
  IndexCQ : function (req,res) {
    if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"] = "";
    menu["dossierAdmin"] = "";
    menu["gestionDossier"] = "selected";
    menu["statOpAdmin"] = "";
    menu["presence"] = "";
    menu["admin"] = "";

    return res.view("pages/solimu/cq/index", {menu: menu, layout: false});
  },
// RECUPERATION DONNEE ECHANTILLONAGE
  getDonneeEchantillon: function (req, res) {
    var retour = [];
    //Recuperation Parametre
    var date_deb = req.param("date_deb");
    var date_fin = req.param("date_fin");
    //var id_lot_client = req.param("id_lot_client");
    var lot_client = req.param("lot_client");
    var id_dossier = 951;//req.param("id_dossier");
    var isCurrentLotCQ = false;
    var previousLotCq = "";
    var compteur = 0;
    // RECUPERATION DATE ENTRE INTERVA DEB FIN
    async.series([
    //async.parallel([
      function(callback)
      {
        // LOAD ECHANTILLON ISO / REPRISE
        async.series([
          function(callback)
          {
            var optionTemp = {};
            optionTemp.date_deb = date_deb;
            optionTemp.date_fin = date_fin;
            optionTemp.id_dossier = id_dossier;
            optionTemp.id_lot_client = lot_client;
            Solimu.getEchantillonSolimu(optionTemp,callback);
          }
        ],function(err, echantillons)
        {
          if(err)
          {
            console.log(err);
            return res.badRequest(err);
          }
          else
          {
            async.forEachSeries(echantillons[0], function(echantillon, callback_date_suivant) {
             // console.log(compteur);
              var optionTemp = {};
              async.parallel([
                // Recuperation NUMERO FACTURE PAR FACTURE
                function(callback){
                  optionTemp.id_facture = echantillon.id_facture;
                  Solimu.getNumFactureByidFacture(optionTemp,callback);
                },
                // Recuperation ERREUR
                function(callback){
                  optionTemp.id = echantillon.id;
                  Solimu.getListeErreurParEchantillon(optionTemp,callback);
                },
                // Recuperation Date Saisie
                function(callback){
                  optionTemp.id_lot_cq = echantillon.id_lot_cq;
                  Solimu.getDateSaisieEchantillon(optionTemp,callback);
                },
                // Recuperation HEURE PASSER PAR LOT CQ
                function(callback){
                  optionTemp.id_lot_cq = echantillon.id_lot_cq;
                  Solimu.getHeureProdEchantillon(optionTemp,callback);
                },
                // RECUPERATION ETAPE GPAO
                function(callback){
                  optionTemp.id_lot_cq = echantillon.id_lot_cq;
                  Solimu.getEtapeSolimu(optionTemp,callback);
                }

              ],function(err,reponseParallel)
              {
                isCurrentLotCQ = true;
                if(err)
                {
                  return callback(err);
                }
                var boleanIsFirst = false;
                if(previousLotCq.toString() != echantillon.id_lot_cq.toString())
                {
                  boleanIsFirst = true;
                }
                if(reponseParallel[1].length != 0)
                {
                  async.forEachSeries(reponseParallel[1], function(erreur, callback_erreur_suivant) {
                    var obj = {};
                    if(boleanIsFirst)
                    {
                      obj.date = echantillon.date_insert;
                      obj.date_saisie = reponseParallel[2];
                      obj.id_facture = echantillon.id_facture;
                      obj.id_lot_cq = echantillon.id_lot_cq;
                      obj.heure_prod = "-";
                      if(boleanIsFirst)
                      {
                        obj.heure_prod = reponseParallel[3][0].duree;
                      }
                      obj.nom_pdf = reponseParallel[3][0].nom_pdf;
                      obj.etape = reponseParallel[4][0].etape;
                      if(reponseParallel[0][0])
                      {
                        obj.num_facture = reponseParallel[0][0].valeur;
                      }else
                      {
                        obj.num_facture = "";
                      }
                      obj.status = echantillon.status;
                      obj.type_controle = echantillon.type_controle;
                      if(reponseParallel[4][0].etape == "Reprise")
                      {
                        obj.type_controle = "REPRISE-1";
                      }
                      else if(reponseParallel[4][0].etape == "CQ")
                      {
                        obj.type_controle = "CQ-ISO-1";
                      }
                      else
                      {
                        obj.type_controle = reponseParallel[4][0].etape;
                      }
                      obj.id_pers_cq = echantillon.id_pers_cq;
                      obj.id_pers_traite = echantillon.id_pers_traite;
                      obj.nombre_erreur = reponseParallel[1].length;
                      boleanIsFirst = false;
                    }
                    else
                    {
                      obj.date = echantillon.date_insert;
                      obj.date_saisie = "-";
                      obj.id_facture = "-";
                      obj.etape = "-";
                      obj.id_lot_cq = "-";
                      obj.nom_pdf = "-";
                      obj.num_facture = "-";
                      obj.status = "-";
                      obj.heure_prod = "-";
                      obj.type_controle = "-";
                      obj.id_pers_cq = "-";
                      obj.id_pers_traite = "-";
                      obj.nombre_erreur = "-";
                    }
                    obj.commentaire = echantillon.commentaire;
                    obj.erreur = erreur.type_traitement+":"+erreur.commentaire;
                    retour.push(obj);
                    callback_erreur_suivant();
                  },function(err)
                  {
                    callback_date_suivant();
                    previousLotCq = echantillon.id_lot_cq;
                  });
                }
                else
                {
                  var obj = {};
                  obj.date = echantillon.date_insert;
                  obj.date_saisie = reponseParallel[2];
                  obj.heure_prod = "-";
                  if(boleanIsFirst)
                  {
                    if(reponseParallel[3][0])
                    {
                      obj.heure_prod = reponseParallel[3][0].duree;
                    }
                  }
                  obj.nom_pdf = "";
                  if(reponseParallel[3][0])
                  {
                    obj.nom_pdf = reponseParallel[3][0].nom_pdf;
                  }
                  obj.id_facture = echantillon.id_facture;
                  obj.id_lot_cq = echantillon.id_lot_cq;
                  if(reponseParallel[0][0])
                  {
                    obj.num_facture = reponseParallel[0][0].valeur;
                  }else
                  {
                    obj.num_facture = "";
                  }
                  obj.status = echantillon.status;
                  obj.type_controle = echantillon.type_controle;
                  if(reponseParallel[4][0].etape == "Reprise")
                  {
                    obj.type_controle = "REPRISE-1";
                  }
                  else if(reponseParallel[4][0].etape == "CQ")
                  {
                    obj.type_controle = "CQ-ISO-1";
                  }
                  else
                  {
                    obj.type_controle = reponseParallel[4][0].etape;
                  }
                  obj.id_pers_cq = echantillon.id_pers_cq;
                  obj.id_pers_traite = echantillon.id_pers_traite;
                  obj.nombre_erreur = reponseParallel[1].length;
                  obj.commentaire = echantillon.commentaire;
                  obj.etape = reponseParallel[4][0].etape;
                  obj.erreur = "";
                  retour.push(obj);
                  previousLotCq = echantillon.id_lot_cq;
                  callback_date_suivant();
                }
              });
            }, function(err)
            {
              if(err) return callback(err);
              return callback(null,"done");
            });
          }
        });
      },
      function(callback){
        // TRAITEMENT CQ REJET
        async.series([
          function(cb)
          {
            var optionTemp = {};
            optionTemp.date_deb = date_deb;
            optionTemp.date_fin = date_fin;
            optionTemp.id_lot_client = lot_client;
            Solimu.getListLotClientEchantillonRejet(optionTemp,cb);
          }
        ],function(erreur_cqrejet, retour_cq_rejet){
          if(erreur_cqrejet) return callback(erreur_cqrejet);
          async.forEachSeries(retour_cq_rejet[0], function(echantillonRejet, callback_date_suivant) {
            //compteur++;
            //console.log(compteur);
            var optionTemp = {};
            async.series([
            //async.parallel([
              // Recuperation Date Saisie
              function(callback){
                optionTemp.id_lot_cq = echantillonRejet.id_lot;
                Solimu.getDateSaisieAndPersEchantillon(optionTemp,callback);
              },
              // Recuperation HEURE PASSER PAR LOT CQ
              function(callback){
                optionTemp.id_lot_cq = echantillonRejet.id_lot;
                Solimu.getHeureProdEchantillon(optionTemp,callback);
              },
            ],function(err,reponseParallel)
            {
              if(err)
              {
                console.log(err);
                return callback(err);
              }
                var obj = {};
                obj.date = echantillonRejet.date_deb_ldt;
                obj.date_saisie = reponseParallel[0].date_saisie;
                obj.id_facture = "-";
                obj.etape = "-";
                obj.id_lot_cq = echantillonRejet.id_lot;
                obj.nom_pdf = echantillonRejet.libelle_lot;
                obj.num_facture = "-";
                obj.status = "-";
                obj.commentaire = "";
                obj.nombre_erreur = "-";
                obj.erreur = "";
                if(echantillonRejet.id_etat)
                {
                  if(echantillonRejet.id_etat.toString() == "5")
                  {
                    obj.status = "OK";
                    obj.commentaire = "REJET OK";
                  }
                  else
                  {
                    obj.status = "ES";
                    obj.nombre_erreur = "1";
                    if(echantillonRejet.id_etat.toString() == "3")
                    {
                      //obj.commentaire = "MOTIF ERRONER";
                      obj.erreur = "MOTIF ERRONER";
                    }else if(echantillonRejet.id_etat.toString() == "2")
                    {
                      //obj.commentaire = "PDF A VALIDER";
                      obj.erreur = "PDF A VALIDER";
                    }
                  }
                }
                if(reponseParallel[1][0])
                {
                  obj.heure_prod = reponseParallel[1][0].duree;
                }
                else
                {
                  obj.heure_prod = 0;
                }
                obj.type_controle = echantillonRejet.libelle_etape;
                obj.id_pers_cq = echantillonRejet.id_pers_cq;
                obj.id_pers_traite =  reponseParallel[0].id_pers_traite;
                //if()
                retour.push(obj);
                callback_date_suivant();
            });
          }, function(err)
          {
            if(err) return callback(err);
            return callback(null,"done");
          });
        });
      }
    ],function(erreurEchantillon, retourOkSend){
      if(erreurEchantillon) res.badRequest(erreurEchantillon);
      return res.json(JSON.stringify(retour));
    });
  },
  /**
   *  STATISTIQUE OPERATEUR CQ
   */
  IndexStatistiqueOP: function (req,res) {
    if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"] = "";
    menu["dossierAdmin"] = "";
    menu["gestionDossier"] = "selected";
    menu["statOpAdmin"] = "";
    menu["presence"] = "";
    menu["admin"] = "";

    return res.view("pages/solimu/statistique_saisie/index", {menu: menu, layout: false});
  },
  /**
   *  REPORTING OPERATEUR
   * @param req
   * @param res
   * @returns {*}
   * @constructor
   */
  IndexReporting: function(req,res) {
    //if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"] = "";
    menu["dossierAdmin"] = "";
    menu["gestionDossier"] = "selected";
    menu["statOpAdmin"] = "";
    menu["presence"] = "";
    menu["admin"] = "";

    return res.view("pages/solimu/reporting/index", {menu: menu, layout: false});
  },
  // RECUPERATION DONNEE REPORTING
  getDonneeReporting: function (req,res) {
    var retour = [];
    //Recuperation Parametre
    var date_deb = req.param("date_deb");
    var date_fin = req.param("date_fin");
    var lot_client = req.param("lot_client");
    var etape = req.param("etape");
    var matricule = req.param("matricule");
    var multi_etape = req.param("multi_etape");
    var etapeOnly = "";
    //var id_lot_client = req.param("id_lot_client");
    var id_dossier = 951;//req.param("id_dossier");
    async.series([
      function(callback){
        var optionTemp = {};
        optionTemp.date_deb = date_deb;
        optionTemp.date_fin = date_fin;
        optionTemp.id_dossier = id_dossier;
        optionTemp.id_pers= matricule;
        optionTemp.id_etape = etape;
        optionTemp.id_lot_client = lot_client;
        optionTemp.multi_etape = multi_etape;
        Solimu.getReportingDateWithMatricule(optionTemp,callback);
      }
    ],function(err,result){
      if(err)
      {
        return res.badRequest(err);
      }else
      {
        async.forEachSeries(result[0], function(reporting, callback_reporting_suivant) {
          var object = {};
          object.id_pers = reporting.id_pers;
          object.date = reporting.date_traitement;
          async.series([
            function(callback){
              var optionTemp = {};
              optionTemp.id_pers = object.id_pers;
              optionTemp.date =  object.date;
              optionTemp.lib_etape =  etapeOnly;
              optionTemp.id_etape = etape;
              optionTemp.id_lot_client = lot_client;
              optionTemp.multi_etape = multi_etape;
              Solimu.getQuantite(optionTemp,callback);
            },
            // RECUPERATION HEURE PROD
            function(callback){
              var optionTemp = {};
              optionTemp.id_pers = object.id_pers;
              optionTemp.date =  object.date;
              optionTemp.id_lot_client = lot_client;
              optionTemp.id_etape = etape;
              optionTemp.multi_etape = multi_etape;
              Solimu.getHeureProdParDateetMatricule(optionTemp,callback);
            },
            // RECUPERATION HEURE HORS PROD
            function (callback) {
              var optionTemp = {};
              optionTemp.id_pers = object.id_pers;
              optionTemp.date =  object.date;
              optionTemp.id_lot_client = lot_client;
              optionTemp.id_etape = etape;
              Solimu.getHeureHorsProdParDateetMatricule(optionTemp,callback);
            },
            // RECUPERATION NOMBRE ECHANTILLON PAR SAISIE
            function (callback) {
              var optionTemp = {};
              optionTemp.id_pers = object.id_pers;
              optionTemp.date = object.date;
              optionTemp.id_lot_client = lot_client;
              optionTemp.id_etape = etape;
              optionTemp.multi_etape = multi_etape;
              Solimu.getEchantillonControllerParDateEtMatricule(optionTemp,callback);
            }
          ],function(error_parralel, retour_parallele)
          {
            if(error_parralel)
            {
              return res.badRequest(error_parralel);
            }
            object.quantite = retour_parallele[0];
            if(retour_parallele[1][0].duree==null)
            {
              object.heure_prod = 0;
            }else
            {
              object.heure_prod = parseFloat(retour_parallele[1][0].duree).toFixed(4);
            }
            if(retour_parallele[2][0].duree==null)
            {
              object.heure_hors_prod = 0;
            }else
            {
              object.heure_hors_prod = parseFloat(retour_parallele[2][0].duree).toFixed(4);
            }
            object.vitesse = parseFloat(object.quantite) / parseFloat(object.heure_prod);
            object.vitesse =parseFloat(object.vitesse).toFixed(5);
            object.nombre_echantillon = retour_parallele[3].nombre_echantillon;
            object.nombre_es = retour_parallele[3].nombre_es;
            object.nombre_nrrg = retour_parallele[3].nombre_nrrg;
            object.taux_de_qualite = retour_parallele[3].taux_de_qualite;
            retour.push(object);
            callback_reporting_suivant();
          });
        }, function(err)
        {
          return res.json(JSON.stringify(retour));
          //return res.json(retour);
        });
      }
    });

  },
  Indexlot: function(req,res) {
    //if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"] = "";
    menu["dossierAdmin"] = "";
    menu["gestionDossier"] = "selected";
    menu["statOpAdmin"] = "";
    menu["presence"] = "";
    menu["admin"] = "";

    return res.view("pages/solimu/cq_autre/index", {menu: menu, layout: false});
  },
  // RECUPERATION DONNEE LOT
  getDonneeLot: function (req,res) {
    var retour = [];
    //Recuperation Parametre
    var date_deb = req.param("date_deb");
    var date_fin = req.param("date_fin");
    var lot_client = req.param("lot_client");
    var etape = req.param("etape");
    var lot_libelle = req.param("lot_libelle");
    var etapeOnly = "";
    //var id_lot_client = req.param("id_lot_client");
    var id_dossier = 951;//req.param("id_dossier");
    async.series([
      function(callback){
        var optionTemp = {};
        optionTemp.date_deb = date_deb;
        optionTemp.date_fin = date_fin;
        optionTemp.id_dossier = id_dossier;
        optionTemp.lot_client = lot_client;
        optionTemp.etape = etape;
        optionTemp.lot_libelle = lot_libelle;
        Solimu.getLotUniqueByDate(optionTemp,callback);
      }
    ],function(err,result){
      if(err)
      {
        return res.badRequest(err);
      }else
      {
        async.forEachSeries(result[0], function(lot, callback_reporting_suivant) {
          async.series([
         //   async.series([
            function(callback)
            {
              Solimu.getInfoLotById(lot.id_lot,callback);
            },
            function(callback)
            {
              Solimu.getCommentaireRejet(lot.id_lot,callback);
            },
            function(callback)
            {
              var optionT = {};
              optionT.id_lot_cq = lot.id_lot;
              Solimu.getHeureProdEchantillon(optionT,callback);
            }
          ],function(erroned, lotValues){
            if(erroned) return res.badRequest(erroned);
            var obj = {};
            obj.id_lot = lot.id_lot;
            obj.dossier = lotValues[0][0].num_dossier;
            obj.lot_client = lotValues[0][0].ldg;
            obj.lot = lotValues[0][0].lib;
            obj.etape = lotValues[0][0].etape;
            obj.etat =lotValues[0][0].etat;
            obj.details = lotValues[1];
            obj.duree =parseFloat(lotValues[2][0].duree).toFixed(5);
            obj.qte = lotValues[0][0].qte;
            if(obj.qte == null)
            {
              obj.qte = "";
            }
            obj.vitesse = parseFloat(obj.qte) / parseFloat(obj.duree);
            obj.vitesse =parseFloat(obj.vitesse).toFixed(5);
            obj.matricule = lotValues[0][0].id_pers;
            if(obj.matricule == null)
            {
              obj.matricule = "";
            }
            retour.push(obj);
            callback_reporting_suivant();
          });
        },
          function(err)
          {
            return res.json(JSON.stringify(retour));
          });
      }
    });
  },
  /***
   *  REPORTING PDF
   */
  IndexVolumePdf: function (req,res) {
    var menu = [];
    menu["aceuil"] = "";
    menu["dossierAdmin"] = "";
    menu["gestionDossier"] = "selected";
    menu["statOpAdmin"] = "";
    menu["presence"] = "";
    menu["admin"] = "";

    return res.view("pages/solimu/reporting_volume_pdf/index", {menu: menu, layout: false});
  },
  // RECUPERATION DONNEE REPORTING PDF
  getDonneeReportingPdf: function (req,res) {
    var retour = [];
    //Recuperation Parametre
    var date_deb = req.param("date_deb");
    var date_fin = req.param("date_fin");
    var lot_client = req.param("lot_client");
    var etape = req.param("etape");
    var matricule = req.param("matricule");
    var multi_etape = req.param("multi_etape");
    var etapeOnly = "";
    //var id_lot_client = req.param("id_lot_client");
    var id_dossier = 951;//req.param("id_dossier");
    async.series([
      function(callback){
        var optionTemp = {};
        optionTemp.date_deb = date_deb;
        optionTemp.date_fin = date_fin;
        optionTemp.id_dossier = id_dossier;
        optionTemp.id_pers= matricule;
        optionTemp.id_etape = etape;
        optionTemp.id_lot_client = lot_client;
        optionTemp.multi_etape = multi_etape;
        Solimu.getReportingDateWithMatricule(optionTemp,callback);
      }
    ],function(err,result){
      if(err)
      {
        return res.badRequest(err);
      }else
      {
        async.forEachSeries(result[0], function(reporting, callback_reporting_suivant) {
          var object = {};
          object.id_pers = reporting.id_pers;
          object.date = reporting.date_traitement;
          async.series([
            function(callback){
              var optionTemp = {};
              optionTemp.id_pers = object.id_pers;
              optionTemp.date =  object.date;
              optionTemp.lib_etape =  etapeOnly;
              optionTemp.id_etape = etape;
              optionTemp.id_lot_client = lot_client;
              optionTemp.multi_etape = multi_etape;
              Solimu.getQuantitePDF(optionTemp,callback);
            },
            // RECUPERATION HEURE PROD
            function(callback){
              var optionTemp = {};
              optionTemp.id_pers = object.id_pers;
              optionTemp.date =  object.date;
              optionTemp.id_lot_client = lot_client;
              optionTemp.id_etape = etape;
              optionTemp.multi_etape = multi_etape;
              Solimu.getHeureProdParDateetMatricule(optionTemp,callback);
            },
            // RECUPERATION HEURE HORS PROD
            function (callback) {
              var optionTemp = {};
              optionTemp.id_pers = object.id_pers;
              optionTemp.date =  object.date;
              optionTemp.id_lot_client = lot_client;
              optionTemp.id_etape = etape;
              Solimu.getHeureHorsProdParDateetMatricule(optionTemp,callback);
            },
            // RECUPERATION NOMBRE ECHANTILLON PAR SAISIE
            function (callback) {
              var optionTemp = {};
              optionTemp.id_pers = object.id_pers;
              optionTemp.date = object.date;
              optionTemp.id_lot_client = lot_client;
              optionTemp.id_etape = etape;
              optionTemp.multi_etape = multi_etape;
              Solimu.getEchantillonControllerParDateEtMatricule(optionTemp,callback);
            }
          ],function(error_parralel, retour_parallele)
          {
            if(error_parralel)
            {
              return res.badRequest(error_parralel);
            }
            object.quantite = retour_parallele[0];
            if(retour_parallele[1][0].duree==null)
            {
              object.heure_prod = 0;
            }else
            {
              object.heure_prod = parseFloat(retour_parallele[1][0].duree).toFixed(4);
            }
            if(retour_parallele[2][0].duree==null)
            {
              object.heure_hors_prod = 0;
            }else
            {
              object.heure_hors_prod = parseFloat(retour_parallele[2][0].duree).toFixed(4);
            }
            object.vitesse = parseFloat(object.quantite) / parseFloat(object.heure_prod);
            object.vitesse =parseFloat(object.vitesse).toFixed(5);
            object.nombre_echantillon = retour_parallele[3].nombre_echantillon;
            object.nombre_es = retour_parallele[3].nombre_es;
            object.nombre_nrrg = retour_parallele[3].nombre_nrrg;
            object.taux_de_qualite = retour_parallele[3].taux_de_qualite;
            retour.push(object);
            callback_reporting_suivant();
          });
        }, function(err)
        {
          return res.json(JSON.stringify(retour));
          //return res.json(retour);
        });
      }
    });
  },
  /***
   * *  *** ** SECTION REPORTING OP SOLIMU
   */
  IndexReportingOP: function (req,res) {
    var menu = [];
    menu["aceuil"] = "";
    menu["dossierAdmin"] = "";
    menu["gestionDossier"] = "selected";
    menu["statOpAdmin"] = "";
    menu["presence"] = "";
    menu["admin"] = "";

    return res.view("pages/solimu/reporting_op/index", {menu: menu, layout: false});
  },
  // action recuperation Reporting Op Saisie
  getDonneeReportingOpSaisie: function(req, res) {
    var retour = [];
    //Recuperation Parametre
    var date_deb = req.param("date_deb");
    var date_fin = req.param("date_fin");
    var lot_client = req.param("lot_client");
    var etat_solimut = req.param("etat_solimut");
    var specialite_solimut = req.param("specialite_solimut");
    var etapeOnly = "";
    //var id_lot_client = req.param("id_lot_client");
    var id_dossier = 951;//req.param("id_dossier");
    // RECUPERATION UTILISATEUR PARTICIPER
    async.parallel([
      // RECUPERATION LISTE SAISIE
      function(callback_series) {
        let options = {
          date_deb: date_deb,
          date_fin: date_fin,
          lot_client: lot_client,
          etat_solimut: etat_solimut,
          specialite_solimut: specialite_solimut,
        };
        Solimu.getListeMatriculeOpTraitement(options, callback_series);
      },
    ],function( erreur_recuperationMatricule, result_recuperationMatricule){
      if(erreur_recuperationMatricule)
      {
        res.badRequest(erreur_recuperationMatricule);
      }
      else
      {
        //return res.json(result_recuperationMatricule[0]);
        async.forEachSeries(result_recuperationMatricule[0],function(matriculeFull,nextMatricule){
          retour.push(matriculeFull.id_pers);
          nextMatricule();
        },function(error_LoopMatricue){
          // APPELER SI BOUCLE MATRICULE TERMINER --- Envoi Information Cline
          return res.json(JSON.stringify(retour));
        });
      }
    });
  },
  getDonneeReportingOpSaisieParMatricule: function(req, res) {
    // Recuperation IdLotGpao
    var date_deb = req.param("date_deb");
    var date_fin = req.param("date_fin");
    var lot_client = req.param("lot_client");
    var etat_solimut = req.param("etat_solimut");
    var specialite_solimut = req.param("specialite_solimut");
    var matricule = req.param("matricule");
    async.series([
      function(callback_seriesNew) {
        let options = {
          date_deb: date_deb,
          date_fin: date_fin,
          lot_client: lot_client,
          etat_solimut: etat_solimut,
          specialite_solimut: specialite_solimut,
          id_pers: matricule,
        };
        Solimu.getListeLotGpaoParFacture(options, callback_seriesNew);
      },
      function(callback_seriesNew) {
        let options = {
          date_deb: date_deb,
          date_fin: date_fin,
          lot_client: lot_client,
          etat_solimut: etat_solimut,
          specialite_solimut: specialite_solimut,
          id_pers: matricule,
        };
        Solimu.getListeLotGpaoParFactureSaisieSeul(options, callback_seriesNew);
      },
    ],function(erreur_LotSaisie, result_LotSaisie){
      if(erreur_LotSaisie)
      {
        console.log('FOund');
        return res.badRequest(erreur_LotSaisie);
      }else
      {
        if(result_LotSaisie[0].length === 0)
        {
          // Charger Next User
          var objretour = {message: 'pas de lot'};
          return res.json(objretour);
        }
        else
        {
          // VARIABLE LISTE LOT
          var stringListeLot = result_LotSaisie[0].join(",");
          var stringListeLotSaisieFull = result_LotSaisie[1].join(",");
          // Recuperation Information Suivant Lot Saisie et MATRICULE
          async.parallel([
            // Recuperation Quantite Lot
            function(callback_para) {
              return callback_para(null, result_LotSaisie[0].length);
            },
            // Recuperation Quantite Facture
            function(callback_para) {
              console.log("Start Facture");
              Solimu.getListeFactureWrite(stringListeLotSaisieFull,specialite_solimut, callback_para);
            },
            // Recuperation Quantite Acte
            function(callback_para) {
              console.log("Start Lige Acte");
              Solimu.getNombreLigneActeFacture(stringListeLotSaisieFull,specialite_solimut, callback_para);
            },
            // Recuperation Heure Prod
            function(callback_para) {
              console.log("Start Heure Prod");
              let options = {
                date_deb: date_deb,
                date_fin: date_fin,
                lot_client: lot_client,
                etat_solimut: etat_solimut,
                specialite_solimut: specialite_solimut,
                listelotSaisie: stringListeLot,
                id_pers: matricule,
              };
              Solimu.getHeurProdEntreIntervalDateEtMatricule(options, callback_para);
            },
            // Recuperation Nombre Echantillon Valide
            function(callback_para) {
              console.log("Start Echant");
              var optionTemp = {};
              optionTemp.id_pers = matricule;
              optionTemp.date_deb= date_deb;
              optionTemp.date_fin= date_fin;
              optionTemp.id_lot_client = lot_client;
              optionTemp.id_etape = 4882;
              optionTemp.listeLotSaise = stringListeLot;
              Solimu.getEchantillonControllerParDateEtMatriculeAndListeLot(optionTemp, callback_para);
            },
            function(callback_seriesNew) {
              var optionTemp = {};
              optionTemp.id_pers = matricule;
              optionTemp.date_deb= date_deb;
              optionTemp.date_fin= date_fin;
              optionTemp.id_lot_client = lot_client;
              optionTemp.id_etape = 4882;
              optionTemp.listeLotSaise = stringListeLot;
              Solimu.getEchantillonRejetParDateEtMatricule(optionTemp, callback_seriesNew);
            },
          ],function(erreur_parallel, result_parallel){
            if(erreur_parallel) {
              return res.badRequest(erreur_parallel);
            }
            // VALEUR REJET
            var nombreechantillonrejet = result_parallel[5].nombre_echantillon;
            var nombreerreur = result_parallel[5].nombre_erreur;
            var objMatricule = {};
            objMatricule.id_pers = matricule;
            objMatricule.quantite_lot= result_parallel[0];
            objMatricule.quantite_facture= result_parallel[1];
            objMatricule.quantite_acte= result_parallel[2];
            objMatricule.heure_prod= result_parallel[3];
            objMatricule.vitesse="";
            objMatricule.nombre_echantillon= result_parallel[4].nombre_echantillon;
            let nombre_erreur = 0;
            nombre_erreur = parseFloat(result_parallel[4].nombre_es) + parseFloat(result_parallel[4].nombre_nrrg);
            if(isNaN(nombre_erreur))
            {
              nombre_erreur = 0;
            }
            objMatricule.nombre_erreur= nombre_erreur;
            // CHECK CODE AFTER
            if(etat_solimut === '2')
            {
              objMatricule.vitesse= parseFloat(result_parallel[2])/parseFloat(result_parallel[3]);
              objMatricule.vitesse = objMatricule.vitesse.toFixed(2);
            }
            else if(etat_solimut === '3')
            {
              objMatricule.vitesse= parseFloat(result_parallel[0])/parseFloat(result_parallel[3]);
              objMatricule.vitesse = objMatricule.vitesse.toFixed(2);
              objMatricule.quantite_facture= 0;
              objMatricule.quantite_acte= 0;
              objMatricule.nombre_echantillon = nombreechantillonrejet;
              objMatricule.nombre_erreur = nombreerreur;
            }
            else if(etat_solimut === '')
            {
              objMatricule.vitesse= parseFloat(result_parallel[0])/parseFloat(result_parallel[3]);
              objMatricule.vitesse = objMatricule.vitesse.toFixed(2);
              objMatricule.nombre_echantillon = parseFloat(objMatricule.nombre_echantillon) + parseFloat(nombreechantillonrejet);
              objMatricule.nombre_erreur = parseFloat(objMatricule.nombre_erreur) + parseFloat(nombreerreur);
            }
            //console.log('Fin traite matricule '+matricule);
            //console.log(objMatricule);
            var objretour = objMatricule;
            objretour.message= 'ok';
            return res.json(objretour);
          });
        }
      }
    });
  },
  // Action Test Batch Dispatch
  testBatchDispatch: function(req, res) {
    async.series([
      function(callback) {
        Solimu.dispatchFactureNonDispatcher(callback);
      }
    ],function(erreur_B, result_B){
      if(erreur_B)
      {
        return res.badRequest(erreur_B);
      }
      else
      {
        return res.json(result_B[0]);
        //return res.ok("Execution Batch terminer");
      }
    });
  }
};

