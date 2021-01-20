/**
 * CentralisationController
 *
 * @description :: Server-side logic for managing centralisations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  // index
  index: function (req, res) {
    var menu = [];
    menu["aceuil"] = "";
    menu["dossierAdmin"] = "";
    menu["gestionDossier"] = "selected";
    menu["statOpAdmin"] = "";
    menu["presence"] = "";
    menu["admin"] = "";
    var html_project;
    var init_dossier = 830;
    async.series([
      function (next) {
        Centralisation.getlisteProjet(next);
      },
      
    ], function (err, result) {
      if (err) return res.badRequest(err);
      else {
        async.eachSeries(result[0], function (projet, next) {
          html_project += '<option value="0"></option>';
          if (init_dossier === Number(projet.id_dossier))
            html_project += '<option value="' + projet.id_dossier + '" selected>' + projet.num_dossier + '</option>';
          else
            html_project += '<option value="' + projet.id_dossier + '" >' + projet.num_dossier + '</option>';
          next();
        }, function (err) {
          if (err) return res.badRequest(err);
          else {
            return res.view('pages/centralisation/index', { menu: menu, html_project: html_project});
          }
        })
      }
    });
  },

  ajaxCentralisationGlobale: function (req, res) {
    var opt = [];
    opt.id_dossier = req.param('id_dossier');
    opt.date = req.param('date', '');

    var retData = {};

    async.series([
      function (next) {
        Centralisation.getSommeLdtByIdDossier(opt, next);
      },
      function (next) {
        Centralisation.getDetailProject(opt.id_dossier, next);
      }
    ], function (err, result) {
      if (err) return res.badRequest(err);
      else {
        retData.valuesProject = result[0];
        retData.detailProject = result[1];
        return res.ok(JSON.stringify(retData));
      }
    })

  },

  //après selection de dossier
  ajaxSelectionDossier: function (req, res) {

    console.log("\n ------- DEBUT SELECTION DOSSIER------")
    var opt = [];
    opt.id_dossier = req.param('id_dossier');
      var retData = {};
      var html_etape;
      var html_lotclient;
    async.series([
      function (next) {
        Centralisation.getListEtape(opt.id_dossier, next);
      },
      function (next) {
        Centralisation.getListLotClient(opt.id_dossier, next);
      },
      function (next) {
        Departement.getDepartement(opt.id_dossier, next);
      }

    ], function (err, result) {
      if (err) return res.badRequest(err);
      else {
        retData.listEtape = result[0];
        retData.listLotClient = result[1];
        retData.listDepartement = result[2];
        return res.ok(JSON.stringify(retData));
      }
    })

  },

  ajaxByLotClient:function(req,res)
  {
   console.log("\n ***********DEBUT TRAITEMENT AFFICHAGE PAR LOT CLIENT - PAR ETAPE*****************\n ");
    var opt=[];
    opt.id_dossier=req.param('id_dossier');
    opt.dateDeb=req.param('dateDeb');
    opt.dateFin=req.param('dateFin');
    opt.id_etape=req.param('id_etape');
    opt.id_lotclient=req.param('id_lotclient');
    opt.matricule=req.param('matricule');
    opt.h_debut=req.param('h_debut');
    opt.h_fin=req.param('h_fin');
    opt.depart=req.param('depart');
    var retData = {};
    async.series([
      function (next) {
        Centralisation.getSommeLdtByIdLotClient(opt, next);
      },
      function (next) {
        Centralisation.getDetailProject(opt.id_dossier, next);
      },
      function (next) {
        Centralisation.getFrequenceFaute(opt, next);
      },
      function (next) {
        Centralisation.getLdtByLot(opt, next);
      },
      function (next) {
        Centralisation.getByOp(opt, next);
      }
    ], function (err, result) {
      if (err) return res.badRequest(err);
      else {
        retData.valuesProject = result[0];
        retData.detailProject = result[1];
        retData.frequence = result[2];
        retData.detailLot=result[3];
        retData.detailOp=result[4];
        return res.ok(JSON.stringify(retData));
      }
    })
  },
  //redirection vers la page ALS
  consommation_dossier: function (req, res) {
    var menu = [];
    menu["aceuil"] = "";
    menu["dossierAdmin"] = "";
    menu["gestionDossier"] = "selected";
    menu["statOpAdmin"] = "";
    menu["presence"] = "";
    menu["admin"] = "";
    var html_project;
    var init_dossier = 830;
    async.series([
      function (next) {
        Centralisation.getProjetAls(next);
      }
      
    ], function (err, result) {
      html_project += '<option value="0"></option>';
      if (err) return res.badRequest(err);
      else {
        async.eachSeries(result[0], function (projet, next) {
         
          if (init_dossier === Number(projet.id_dossier))
            html_project += '<option value="' + projet.id_dossier + '" selected>' + projet.num_dossier + '</option>';
          else
            html_project += '<option value="' + projet.id_dossier + '" >' + projet.num_dossier + '</option>';
          next();
        }, function (err) {
          if (err) return res.badRequest(err);
          else {
            return res.view('pages/centralisation/consommation_dossier', { menu: menu, html_project: html_project });
          }
        })
      }
    });
  },

  //vitesse qualites

  vitesse_qualite: function (req, res) {
    //

    var menu = [];
    menu["aceuil"] = "";
    menu["dossierAdmin"] = "";
    menu["gestionDossier"] = "selected";
    menu["statOpAdmin"] = "";
    menu["presence"] = "";
    menu["admin"] = "";
    var html_project;
    var init_dossier = 830;
    async.series([
      function (next) {
        Centralisation.getlisteProjet(next);
      }
    ], function (err, result) {
      if (err) return res.badRequest(err);
      else {
        async.eachSeries(result[0], function (projet, next) {
          html_project += '<option value="0"></option>';
          if (init_dossier === Number(projet.id_dossier))
            html_project += '<option value="' + projet.id_dossier + '" selected>' + projet.num_dossier + '</option>';
          else
            html_project += '<option value="' + projet.id_dossier + '" >' + projet.num_dossier + '</option>';
          next();
        }, function (err) {
          if (err) return res.badRequest(err);
          else {
            return res.view('pages/centralisation/vitesse_qualite', { menu: menu, html_project: html_project });
          }
        })
      }
    });
  },

  ajaxData: function (req, res) {
    var opt = [];
    opt.id_pers = req.param('id_pers', 0);
    opt.id_dossier = req.param('id_dossier', 0);
    opt.dateDeb = req.param('dateDeb', '');
    opt.dateFin = req.param('dateFin', '');

    if (opt.id_pers === '')
      opt.id_pers = 0;

    if (opt.id_dossier === '0' && opt.id_dossier === '')
      opt.id_dossier = 0;

    async.series([
      function (next) {
        Centralisation.getDataByDateByIdPers(opt, next);
      }
    ], function (err, result) {
      if (err) return res.badRequest(err);
      else {
        return res.ok(JSON.stringify(result[0]));
      }
    });

  }




};

