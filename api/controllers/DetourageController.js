/**
 * DetourageController
 *
 * @description :: Server-side logic for managing Detourages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {
    if (!req.session.user) return res.redirect('/login');
    if (req.session.user == "ostie") return res.redirect('/ostie');
    var option = [];
    var date_reception = req.param("date_recherche_saisi_reception");
    var traite_reception = req.param("id_traitement_reception_recherche");
    //console.log("DATE ====>"+date_reception);
    //console.log("TRAITE ====>"+traite_reception);
    async.series([
      function (callback) {
        Detourage.listeClientSaisi(option, callback);
      },
      function (callback) {
        Detourage.listeTraite(option, callback);
      },
      function (callback) {
        Detourage.listePriorite(callback)
      },
      function (callback) {
        if (date_reception == null && traite_reception == null) {
          date_reception = "tous".toString();
          traite_reception = " tous ";
          Detourage.ListeTousLesSaisies_sans_option(callback);
        }
        else {
          option.date_reception = date_reception;
          date_reception = date_reception.toString();
          option.traite_reception = traite_reception;
          Detourage.ListeSaisi_Mail(option, callback);
        }
      }
    ], function (err, result) {
      var client = result[0];
      var traite = result[1];
      var priorite = result[2];
      var ListeTousLesSaisies = result[3];
      //console.log("CLIENT  =====>  "+result[2]);
      //    //console.log("TRAITE   "+result[1]);
      var menu = [];
      menu["aceuil"] = "selected";
      menu["dossierAdmin"] = "";
      menu["gestionDossier"] = "";
      menu["statOpAdmin"] = "";
      menu["presence"] = "";
      menu["admin"] = "";
      var resultat = [];
      resultat['date_reception_value_export'] = date_reception;
      //console.log(date_reception);
      resultat['traite_reception_value_export'] = traite_reception;
      resultat['client'] = client;
      resultat['listetouslessaisies'] = ListeTousLesSaisies;
      resultat['traite'] = traite;
      resultat['priorite'] = priorite;
      resultat['layout'] = false;
      resultat['menu'] = menu;
      res.view('pages/Detourage/ListeTousLesSaisies', resultat);
    });
  },
  ModifPriorite: function (req, res) {
    var id_saisi_modif = req.param('id_modif_saisi');
    var modif_det = req.param('id_priorite_modif');
    //console.log("id_saisi_modif ====> "+id_saisi_modif);
    //console.log("modif_det ====>"+modif_det);
    var requete = "UPDATE det_mail_saisi SET id_det_priorite=" + modif_det + " WHERE id_saisi_det=" + id_saisi_modif;
    Detourage.query(requete, function (err, resume) {
      if (err) {
        res.badRequest("ERROR : " + JSON.stringify(err));
      }
      else {
        //   res.json("OK MODIF PRIORITE TERMINER ");
        res.redirect("detourage/index");
      }
    });
  },
  ExportCsv_saisi_mail: function (req, res) {
    //console.log("EXPORT SAISI MAIL DETOURAGE ");
    var jkexcel = require('jkexcel');
    var path = require('path');
    var option = [];
    var date_reception = req.param("date_recherche_saisi_reception");
    var traite_reception = req.param("id_traitement_reception_recherche");
    jkexcel.open(path.join('', 'templates/Template_Detourage_Saisi.xlsx')).then(function (workbook) {
      async.series([
        function (callback) {
          //console.log("Compare"+date_reception);
          if (date_reception == "tous") {
            //console.log("condition ok ");
            Detourage.ListeTousLesSaisies_sans_option(callback);
          }
          else {
            option.date_reception = date_reception;
            option.traite_reception = traite_reception;
            Detourage.ListeSaisi_Mail(option, callback);
          }
        }
      ], function (erreur, resultat) {
        var value_result = resultat[0];
        var feuille = workbook.getSheet(0);
        //  //console.log(value_result);
        var i = 3;
        value_result.forEach(function (saisi) {
          //feuille.setCellValue(i,1,saisi.id_saisi_det);
          feuille.setCellValue(i, 2, saisi.date_heure_reception);
          feuille.setCellValue(i, 3, saisi.traite_reception);
          feuille.setCellValue(i, 4, saisi.visuels_reception);
          feuille.setCellValue(i, 5, saisi.nom_saisi_client);
          feuille.setCellValue(i, 6, saisi.objet_mail_reception);
          feuille.setCellValue(i, 7, saisi.date_heure_envoi);
          feuille.setCellValue(i, 8, saisi.traite_envoi);
          feuille.setCellValue(i, 9, saisi.visuels_envoi);
          feuille.setCellValue(i, 10, saisi.objet_mail_envoi);
          i++;
        });
        //     var feuille = workbook.getSheet(0);
        //     feuille.setCellValue(1, 2, 'TEST EXPORT');
        res.setHeader('Content-disposition', 'attachment; filename=Detourage_Saisi_Export.xlsx');
        res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        workbook.pipe(res);
        //console.log("FIN EXPORT EXCEL DETOURAGE ");
        //   res.json("Terminer ====> regarder Console SAILS ");
      });
    });
  },
  Nouveau_Saisi_Mail: function (req, res) {
    var option;
    async.series([
      function (callback) {
        Detourage.listeClientSaisi(option, callback);
      },
      function (callback) {
        Detourage.listeTraite(option, callback);
      },
    ], function (err, result) {
      var client = result[0];
      var traite = result[1];
      //    //console.log("CLIENT    "+result[0]);
      //    //console.log("TRAITE   "+result[1]);
      var menu = [];
      menu["aceuil"] = "selected";
      menu["dossierAdmin"] = "";
      menu["gestionDossier"] = "";
      menu["statOpAdmin"] = "";
      menu["presence"] = "";
      menu["admin"] = "";
      var resultat = [];
      resultat['client'] = client;
      resultat['traite'] = traite;
      resultat['layout'] = false;
      resultat['menu'] = menu;
      res.view('pages/Detourage/SaisiInformation', resultat);
    });
  },
  Insertion_Nouveau_Saisi_Mail: function (req, res) {
    var date_heure = req.param("Date_Heure_Reception");
    var Type_Traitement = req.param("type_traitement"); //ID TRAITE
    var Client = req.param("client"); // ID CLIENT
    var Objet_Mail_Reception = req.param("Objet_du_mail_reception");
    var date_heure_envoi = req.param("Date_Heure_Envoi");
    var Type_Traitement_envoi = req.param("type_traitement_Envoi");// ID TRAITE
    var Objet_Mail_Envoi = req.param("Objet_mail_Envoi");
    var sql = "INSERT INTO det_mail_saisi (date_heure_reception,id_det_type_traitement,id_client_saisi,id_det_traitement_envoi,objet_mail_reception,date_heure_envoi,objet_mail_envoi) VALUES " +
      "('" + date_heure + "'," + Type_Traitement + "," + Client + "," + Type_Traitement_envoi + ",'" + Objet_Mail_Reception + "','" + date_heure_envoi + "','" + Objet_Mail_Envoi + "')";
    //console.log("query==>"+sql);

    Detourage.query(sql, function (err, insert) {
      if (err) {
        console.log(err);
        res.badRequest(JSON.stringify(err));
      }
      else {
        res.redirect("detourage/index");
      }
    });
  },
  AjoutClient: function (req, res) {
    var option = [];
    option.nom_client = req.param("nouveau_client_saisi");
    //console.log(option.nom_client);
    async.series([
      function (callback) {
        Detourage.AddNewClient(option, callback);
      }
    ], function (err, results) {
      if (err) {
        res.json(err);
      }
      else {
        res.redirect("detourage/Nouveau_Saisi_Mail");
      }
    });
  },
  ModifierClient: function (req, res) {
    var option = [];
    option.id_client_modif = req.param("id_client_modif");
    option.nom_client_modif = req.param("modifier_client_saisi");
    //console.log(option.nom_client_modif);
    async.series([
      function (callback) {
        Detourage.UpdateClient(option, callback);
      }
    ], function (err, results) {
      if (err) {
        res.json(err);
      }
      else {
        res.redirect("detourage/Nouveau_Saisi_Mail");
      }
    });
  },
  SupprimerClient: function (req, res) {
    var option = [];
    option.id_client_supprimer = req.param("id_client_supprimer");
    //console.log(option.id_client_supprimer);
    async.series([
      function (callback) {
        Detourage.DeleteClient(option, callback);
      }
    ], function (err, results) {
      if (err) {
        res.json(err);
      }
      else {
        res.redirect("detourage/Nouveau_Saisi_Mail");
      }
    });
  },
  AjoutTraite: function (req, res) {
    var option = [];
    option.type_traitement = req.param("nouveau_type_traitement");
    option.nombre_visuels = req.param("nouveau_nombre_visuels");
    async.series([
      function (callback) {
        Detourage.AddNewTypeTraite(option, callback);
      }
    ], function (err, results) {
      if (err) {
        res.json(err);
      }
      else {
        res.redirect("detourage/Nouveau_Saisi_Mail");
      }
    });
  },
  ModifierTraite: function (req, res) {
    var option = [];
    option.id_modif_traite = req.param("id_traite_modif");
    option.type_traitement = req.param("modifier_traite");
    option.nombre_visuels = req.param("modifier_nombre_visuels");
    //console.log(option.id_modif_traite);
    async.series([
      function (callback) {
        Detourage.UpdateTypeTraite(option, callback);
      }
    ], function (err, results) {
      if (err) {
        res.json(err);
      }
      else {
        res.redirect("detourage/Nouveau_Saisi_Mail");
      }
    });
  },
  SupprimerTraite: function (req, res) {
    var option = [];
    option.id_delete = req.param("id_traite_supprimer");
    //console.log(option.id_delete);
    async.series([
      function (callback) {
        Detourage.DeleteTypeTraite(option, callback);
      }
    ], function (err, results) {
      if (err) {
        res.json(err);
      }
      else {
        res.redirect("detourage/Nouveau_Saisi_Mail");
      }
    });
  },

  //enregistrement du vitesse d'equilibre

  saveVitesseEquilibre: function (req, res) {

    var opt = [];
    opt.id_client = req.param('id_client', '');
    opt.id_dif = req.param('id_difficulte', '');
    opt.vit = req.param('vitesse_eq', '');

    async.series([
      function (callback) {
        Detourage.isExistingInTable(opt, callback);
      }
    ], function (err, results) {
      if (err) {
        return res.badRequest(err);
      }
      else {
        if (results[0].length > 0) {
          async.series([
            function (callback) {
              Detourage.saveUpdateVitesseEquilibre(opt, callback);
            }
          ], function (err, resUpd) {
            if (err) return res.badRequest(err);
            return res.ok("ok");
          })
        } else {
          async.series([
            function (callback) {
              Detourage.saveInsertVitesseEquilibre(opt, callback);
            }
          ], function (err, resIns) {
            if (err) return res.badRequest(err);
            return res.ok("ok");
          })
        }
      }
    });
  },

  // reporting

  reporting: function (req, res) {
    var params = req.allParams();

    var datenow = new Date().toISOString().replace(/-/, '').replace(/-/, '').substr(0, 8);

    var dtDeb = datenow;
    var dtFin = datenow;
    var etape = 0;
    var id_pers = 0;
    var client_param = 0;
    var groupe_client = 0;
    if (req.param('dateDeb', '') !== '') {
      dtDeb = req.param('dateDeb', '');
      dtFin = req.param('dateFin', '');
    }

    if (req.param('id_pers', '') !== '' && req.param('id_pers', '') !== '0') {
      id_pers = req.param('id_pers', '');
    }

    if (req.param('etape', '') !== '') {
      etape = req.param('etape', '');
    }
    if (req.param('client', '') !== '') {
      client_param = req.param('client', '');
    }
    if (req.param('groupe_client', '') !== '') {
      groupe_client = req.param('groupe_client', '');
    }
    //sails.log(params);
    var cliresult = [];

    async.series([
      function (callback) {
        Detourage.getListClient(etape, client_param, groupe_client, callback);
      }, function (callback) {
        Detourage.getListDifficulte(etape, client_param, groupe_client, callback);
      }, function (callback) {
        Detourage.getListCategorie(callback);
      }, function (callback) {
        Detourage.getListClient(etape, 0, 0, callback);
      }, function (callback) {
        Detourage.getListGroupeClient(0, callback);
      },

    ], function (err, listclient) {
      if (err)
        return res.badRequest(err);
      else {
        var menu = [];
        menu["aceuil"] = "selected";
        menu["dossierAdmin"] = "";
        menu["gestionDossier"] = "";
        menu["statOpAdmin"] = "";
        menu["presence"] = "";
        menu["admin"] = "";

        // parcour de la liste client principale
        async.eachSeries(listclient[0], function (client, next) {
          client.difficulte = [];
          async.eachSeries(listclient[1], function (difficulte, nextA) {
            if (client.id_client === difficulte.id_client) {
              //  sails.log(difficulte);
              var opt = {};
              opt.id_client = client.id_client;
              opt.id_difficulte = difficulte.id_difficulte;
              opt.dateDeb = dtDeb;
              opt.dateFin = dtFin;
              opt.id_pers = Number(id_pers);
              opt.cond = difficulte.condition;

              async.series([
                function (cb) {
                  Detourage.getDataDifficulte(opt, cb);
                },
                function (cb) {
                  Detourage.getTrtDataDifficulte(opt, cb);
                },
                function (cb) {
                  Detourage.getCQDataDifficulte(opt, cb);
                },
                function (cb) {
                  Detourage.getNombreLotClient(opt, cb);
                },
                function (cb) {
                  Detourage.getNombreLotDifficulteClient(opt, cb);
                }
              ], function (err, data) {
                if (data) {
                  difficulte.data = data[0];
                  difficulte.trt = data[1];
                  difficulte.cq = data[2];
                  difficulte.nombre_lot_client = data[3];
                  difficulte.nombre_lot_difficulte = data[4];
                }

                client.difficulte.push(difficulte);
                nextA();
              });
            } else {
              nextA();
            }

          }, function (err, resultsA) {
            cliresult.push(client);
            next();
          });
        }, function (err, results) {
          if (err) {
            return res.badRequest(err);
          } else {
            var resultat = [];
            resultat['layout'] = false;
            resultat['menu'] = menu;
            resultat['clients'] = listclient[0];
            resultat['etapes'] = listclient[2];
            resultat['id_etape'] = etape;
            resultat['id_pers'] = id_pers;
            resultat['dateDeb'] = dtDeb;
            resultat['dateFin'] = dtFin;
            resultat['id_client'] = client_param;
            resultat['id_groupe_client'] = groupe_client;
            resultat['client_select'] = listclient[3];
            resultat['groupe_client'] = listclient[4];
            //sails.log(listclient[0]);

            return res.view('pages/Detourage/reporting', resultat);
          }

        });

      }

    });


  },

  rapportCq: function (req, res) {
    var params = req.allParams();

    var datenow = new Date().toISOString().replace(/-/, '').replace(/-/, '').substr(0, 8);

    var dtDeb = datenow;
    var dtFin = datenow;
    var id_client = 0;
    var id_pers = 0;

    if (req.param('id_client', '') !== '') {
      id_client = req.param('id_client', '');
    }
    if (req.param('dateDeb', '') !== '') {
      dtDeb = req.param('dateDeb', '');
      dtFin = req.param('dateFin', '');
    }
    var menu = [];
    menu["aceuil"] = "selected";
    menu["dossierAdmin"] = "";
    menu["gestionDossier"] = "";
    menu["statOpAdmin"] = "";
    menu["presence"] = "";
    menu["admin"] = "";

    var opt = [];
    opt.dateDeb = dtDeb;
    opt.dateFin = dtFin;
    opt.id_client = id_client;

    async.series([
      function (cb) {
        Detourage.getRapportCQ(opt, cb);
      }, function (cb) {
        Detourage.getListAllClient(0, cb);
      }], function (err, listCq) {
        if (err)
          return res.badRequest(err);
        else {
          var resultat = [];
          resultat['layout'] = false;
          resultat['menu'] = menu;

          resultat['id_pers'] = "";
          resultat['listCq'] = listCq[0];
          resultat['clients'] = listCq[1];
          resultat["id_client"] = id_client;
          resultat['dateDeb'] = dtDeb;
          resultat['dateFin'] = dtFin;

          return res.view('pages/Detourage/rapportCq', resultat);
        }
      }
    );


  },

  synthese: function (req, res) {
    var params = req.allParams();

    var datenow = new Date().toISOString().replace(/-/, '').replace(/-/, '').substr(0, 8);

    var dtDeb = datenow;
    var dtFin = datenow;
    var etape = 0;
    var id_pers = 0;
    if (req.param('dateDeb', '') !== '') {
      dtDeb = req.param('dateDeb', '');
      dtFin = req.param('dateFin', '');
    }

    if (req.param('id_pers', '') !== '' && req.param('id_pers', '') !== '0') {
      id_pers = req.param('id_pers', '');
    }

    if (req.param('etape', '') !== '') {
      etape = req.param('etape', '');
    }
    //sails.log(params);
    var cliresult = [];

    async.series([
      function (callback) {
        Detourage.getListClient(etape, 0, 0, callback);
      }, function (callback) {
        Detourage.getListDifficulte(etape, 0, 0, callback);
      }, function (callback) {
        Detourage.getListCategorie(callback);
      }
    ], function (err, listclient) {
      if (err)
        return res.badRequest(err);
      else {
        var menu = [];
        menu["aceuil"] = "selected";
        menu["dossierAdmin"] = "";
        menu["gestionDossier"] = "";
        menu["statOpAdmin"] = "";
        menu["presence"] = "";
        menu["admin"] = "";

        // parcour de la liste client principale
        async.eachSeries(listclient[0], function (client, next) {
          client.difficulte = [];
          async.eachSeries(listclient[1], function (difficulte, nextA) {
            if (client.id_client === difficulte.id_client) {
              //  sails.log(difficulte);
              var opt = {};
              opt.id_client = client.id_client;
              opt.id_difficulte = difficulte.id_difficulte;
              opt.dateDeb = dtDeb;
              opt.dateFin = dtFin;
              opt.id_pers = Number(id_pers);
              opt.cond = difficulte.condition;

              async.series([
                function (cb) {
                  Detourage.getDataDifficulte(opt, cb);
                },
                function (cb) {
                  Detourage.getTrtDataDifficulte(opt, cb);
                },
                function (cb) {
                  Detourage.getCQDataDifficulte(opt, cb);
                }
              ], function (err, data) {
                if (data) {
                  difficulte.data = data[0];
                  difficulte.trt = data[1];
                  difficulte.cq = data[2];
                }
                client.difficulte.push(difficulte);
                nextA();
              });
            } else {
              nextA();
            }

          }, function (err, resultsA) {
            cliresult.push(client);
            next();
          });
        }, function (err, results) {
          if (err) {
            return res.badRequest(err);
          } else {
            var resultat = [];
            resultat['layout'] = false;
            resultat['menu'] = menu;
            resultat['clients'] = listclient[0];
            resultat['etapes'] = listclient[2];
            resultat['id_etape'] = etape;
            resultat['id_pers'] = id_pers;
            resultat['dateDeb'] = dtDeb;
            resultat['dateFin'] = dtFin;

            //sails.log(listclient[0]);

            return res.view('pages/Detourage/reporting-synthese', resultat);
          }

        });

      }

    });


  },
  suiviVue: function (req, res) {
    var params = req.allParams();

    var datenow = new Date().toISOString().replace(/-/, '').replace(/-/, '').substr(0, 8);

    var dtDeb = datenow;
    var dtFin = datenow;
    var id_client = 0;
    var id_pers = 0;

     if (req.param('id_client', '') !== '') {
       id_client = req.param('id_client', '');
     }
    if (req.param('dateDeb', '') !== '') {
      dtDeb = req.param('dateDeb', '');
      dtFin = req.param('dateFin', '');

    }
    var menu = [];
    menu["aceuil"] = "selected";
    menu["dossierAdmin"] = "";
    menu["gestionDossier"] = "";
    menu["statOpAdmin"] = "";
    menu["presence"] = "";
    menu["admin"] = "";

    var opt = [];
    opt.dateDeb = dtDeb;
    opt.dateFin = dtFin;
    opt.id_client = id_client;

    async.series([
      function (cb) {
        Detourage.getSuiviRef(opt, cb);
      }, function (cb) {
        Detourage.getListIdLot(opt, cb);
      }, function (cb) {
        Detourage.getListNbg100(opt, cb);
      }], function (err, suiviVue) {
        if (err)
          return res.badRequest(err);
        else {
          var resultat = [];
          resultat['layout'] = false;
          resultat['menu'] = menu;

          resultat['id_pers'] = "";
          resultat['suiviRef'] = suiviVue[0];
          resultat['listidLot'] = suiviVue[1];
          resultat['listNbg100'] = suiviVue[2];
          resultat["id_client"] = id_client;
          resultat['dateDeb'] = dtDeb;
          resultat['dateFin'] = dtFin;
         
          return res.view('pages/Detourage/suiviVue', resultat);
        }
      }
    );


  },
};
