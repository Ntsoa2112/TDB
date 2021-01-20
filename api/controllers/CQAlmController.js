/**
 * CQAlmController
 *
 * @description :: Server-side logic for managing Cqalms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 
const Ldt = require('../models/Ldt');
const AlmFrequSuiviService = require('../services/AlmFrequSuiviService');
const AlmSuiviProdService = require('../services/AlmSuiviProdService');
 
const moment = require('moment');
const CQAlmerysService = require('../services/CQAlmerysService');
const CQAlmerysExportService = require('../services/CQAlmerysExportService');
 
module.exports = {
  index: function (req, res) {
    if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"] = "";
    menu["dossierAdmin"] = "";
    menu["gestionDossier"] = "selected";
    menu["statOpAdmin"] = "";
    menu["presence"] = "";
    menu["admin"] = "";
    console.log("" + req.session.user);
    return res.view("pages/cq_almerys", { menu: menu, layout: false });
  },
  reporting: function (req, res) {
    if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"] = "";
    menu["dossierAdmin"] = "";
    menu["gestionDossier"] = "selected";
    menu["statOpAdmin"] = "";
    menu["presence"] = "";
    menu["admin"] = "";
 
    return res.view("pages/reporting_almerys", { menu: menu, layout: false });
  },
  suiviIndicateur : function(req, res) {
    if (!req.session.user) return res.redirect('/login');
    return res.view("pages/Almerys/suivi_indicateur", { menu: [], layout: false });
  },
  gestionFrequence : function(req, res) {
    if (!req.session.user) return res.redirect('/login');
    return res.view("pages/Almerys/gestion_frequence", { menu: [], layout: false });
  },
  getLdtBySpec: function (req, res) {
    var id_dossier = req.param("id_dossier");
    var datedeb = req.param("date_deb");
    var datefin = req.param("date_fin");
 
    var option = [];
    option.id_dossier = id_dossier;
    option.datedeb = datedeb;
    option.datefin = datefin;
    async.series([
      function (callback) {
        Ldt.getLdtBySpec(option, callback);
      },
      function (callback) {
        CQAlmerys.listSousSpecialite(option, callback);
      }, 
      function (callback) {
        Ldt.getLdtByDossier(option, callback);
      }, 
      function (callback) {
        return callback(null,{});
        //Ldt.getQteBydate(option, callback);
      }
    ], function (err, result) {
      if (err) return res.send(JSON.stringify(err));
      return res.ok(JSON.stringify(
        {
          qte: result[0],
          souspec: result[1],
          qtesp: result[2],
        //  m9: result[3]['m9'],
        //  p9_11: result[3]['9_11'],
        //  p11_13: result[3]['11_13'],
        //  p13_15: result[3]['13_15'],
        //  p15: result[3]['p15'],
          id_dossier: id_dossier,
        }
      ));
    });
  },
 
  getLdtBySpec_vit: function (req, res) {
    var id_dossier = req.param("id_dossier");
    var datedeb = req.param("date_deb");
    var datefin = req.param("date_fin");
 
    var option = {};
    option.id_dossier = id_dossier;
    option.datedeb = datedeb;
    option.datefin = datefin;
    async.series([
      function (callback) {
        Ldt.getLdtBySpec(option, callback);
      },
      function (callback) {
        CQAlmerys.listSousSpecialite(option, callback);
      }
    ], function (err, result) {
      console.log("Pass here");
      console.log(result);
      if (err) {
        console.log(err);
        return res.send(JSON.stringify(err));
      }
      //console.log(result);
      return res.ok(JSON.stringify(
        {
          qte: result[0],
          souspec: result[1],
          id_dossier: id_dossier,
        }
      ));
    });
  },
  getLdtByDossier : function(req,res) {
    var id_dossier = req.param("id_dossier");
    var datedeb = req.param("date_deb");
    var datefin = req.param("date_fin");
 
    var option = {};
    option.id_dossier = id_dossier;
    option.datedeb = datedeb;
    option.datefin = datefin;
 
    Ldt.getLdtByDossier(option, 
      (err, results) => {
        if(err) {
          console.log(err);
          return res.send(JSON.stringify(err));
        }
 
        return res.ok(results);
      }
    );
  },  
  getVitBydate : function(req,res) {
    var id_dossier = req.param("id_dossier");
    var datedeb = req.param("date_deb");
    var datefin = req.param("date_fin");
 
    var option = {};
    option.id_dossier = id_dossier;
    option.datedeb = datedeb;
    option.datefin = datefin;
 
    Ldt.getVitBydate(option, 
      (err, results) => {
        if(err) {
          console.log(err);
          return res.send(JSON.stringify(err));
        }
        
        return res.ok(results);
      }
    );
  },  
  getLdtBySSpec: function (req, res) {
    var id_lotclient = req.param("id_lotclient");
    var id_ssp = req.param("id_ssp");
    var id_ssp2 = req.param("id_ssp2");
    var datedeb = req.param("date_deb");
    var datefin = req.param("date_fin");
 
    var option = [];
    option.id_ssp = id_ssp;
    option.id_ssp2 = id_ssp2;
    option.id_lotclient = id_lotclient;
    option.datedeb = datedeb;
    option.datefin = datefin;
    console.log(option);
    async.series([
      function (callback) {
        Ldt.getLdtBySSpec(option, callback);
      }, function (callback) {
        Ldt.getCqByEtat(option, callback);
      }, function (callback) {
        Ldt.getLdtBySSpecHp(option, callback);
      }
    ], function (err, result) {
      // console.log(result[0]);
 
      if (err) {
        console.log(err);
        return res.send(JSON.stringify(err));
      }
      //console.log("is OK "+result[0]);
      return res.ok(JSON.stringify({ dt: result[0], et: result[1], hprod: result[2] }));
    });
  },
 
 
  users: function (req, res) {
    if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"] = "";
    menu["dossierAdmin"] = "";
    menu["gestionDossier"] = "selected";
    menu["statOpAdmin"] = "";
    menu["presence"] = "";
    menu["admin"] = "";
 
    return res.view("pages/cq_almerys_user", { menu: menu, layout: false });
  },
 
  sat: function (req, res) {
    if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"] = "";
    menu["dossierAdmin"] = "";
    menu["gestionDossier"] = "selected";
    menu["statOpAdmin"] = "";
    menu["presence"] = "";
    menu["admin"] = "";
 
    return res.view("pages/cq_almerys_sat", { menu: menu, layout: false });
  },
 
  loadSpecialite: function (req, res) {
    async.series([
      function (callback) {
        CQAlmerys.listSpecialite(null, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
 
      return res.ok(JSON.stringify(result[0]));
    });
  },
 
  loadSpecialiteCall: function (req, res) {
    async.series([
      function (callback) {
        CQAlmerys.listSpecialiteCall(null, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
 
      return res.ok(JSON.stringify(result[0]));
    });
  },
 
  loadTache: function (req, res) {
 
    var opt = [];
    opt.id = req.param("id");
    async.series([
      function (callback) {
        CQAlmerys.listTache(opt, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
 
      return res.ok(JSON.stringify(result[0]));
    });
  },
 
  loadTraitement: function (req, res) {
    async.series([
      function (callback) {
        CQAlmerys.listTraitement(null, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
 
      return res.ok(JSON.stringify(result[0]));
    });
  },
  loadSousSpecialite: function (req, res) {
    var id_dossier = req.param('id_dossier');
    var option = [];
    option.id_dossier = id_dossier;
    async.series([
      function (callback) {
        CQAlmerys.listSousSpecialite(option, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
 
      return res.ok(JSON.stringify(result[0]));
    });
  },
  loadSSousSpecialite: function (req, res) {
    var id_dossier = req.param('id_dossier');
    var id_loclient = req.param('id_lotclient');
    var option = [];
    option.id_dossier = id_dossier;
    option.id_loclient = id_loclient;
    async.series([
      function (callback) {
        CQAlmerys.listSSousSpecialite(option, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
 
      return res.ok(JSON.stringify(result[0]));
    });
  },
  loadSSSousSpecialite: function (req, res) {
    var id = req.param('id');
    var option = [];
    option.id = id;
    async.series([
      function (callback) {
        CQAlmerys.listSSSousSpecialite(option, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
 
      return res.ok(JSON.stringify(result[0]));
    });
  },
 
  loadDistinction: function (req, res) {
    var option = [];
    async.series([
      function (callback) {
        CQAlmerys.getLsDist(option, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
 
      return res.ok(JSON.stringify(result[0]));
    });
  },
  ModifCible: function (req, res) {
    var id_lotclient = req.param('id_lotclient');
    var a = req.param('a');
    var b = req.param('b');
    var c = req.param('c');
    var d = req.param('d');
    var option = [];
    option.id_lotclient = id_lotclient;
    option.a = a;
    option.b = b;
    option.c = c;
    option.d = d;
    async.series([
      function (callback) {
        CQAlmerys.UpdateSousSpecialite(option, callback);
      }
    ], function (err, result) {
      if (err) return res.send(JSON.stringify(err));
 
      return res.ok(JSON.stringify(result[0]));
    });
  },
 
  loadSAT: function (req, res) {
    var id_dep = req.param('id_dep');
    var date = req.param('date', "" + (new Date().toISOString().replace(/-/, '').replace(/-/, '').substr(0, 8)));
    var option = [];
    option.id_dep = id_dep;
    option.date = date;
    async.series([
      function (callback) {
        CQAlmerys.listSatByCQ(option, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
 
      return res.ok(JSON.stringify(result[0]));
    });
  },
  loadSATAll: function (req, res) {
    var option = [];
    async.series([
      function (callback) {
        CQAlmerys.listSat(option, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
 
      return res.ok(JSON.stringify(result[0]));
    });
  },
 
 
  loadMOTIF: function (req, res) {
    var id_pole = req.param('id_pole');
    var option = [];
    option.id_pole = id_pole;
    async.series([
      function (callback) {
        CQAlmerys.listMotif(option, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
 
      return res.ok(JSON.stringify(result[0]));
    });
  },
 
  loadERREUR: function (req, res) {
    var id_pole = req.param('id_pole');
    var etat = req.param('etat');
    var option = [];
    option.id_pole = id_pole;
    option.id_etat = etat;
    async.series([
      function (callback) {
        CQAlmerys.listErreur(option, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
 
      return res.ok(JSON.stringify(result[0]));
    });
  },
  loadETAT: function (req, res) {
    async.series([
      function (callback) {
        CQAlmerys.listEtat(null, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
 
      return res.ok(JSON.stringify(result[0]));
    });
  },
  loadETAPE: function (req, res) {
    async.series([
      function (callback) {
        CQAlmerys.listEtape(req.param("iddossier", null), callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
 
      return res.ok(JSON.stringify(result[0]));
    });
  },
  loadETAPESOLIMU: function (req, res) {
    async.series([
      function (callback) {
        CQAlmerys.listEtapeSolimu(req.param("iddossier", null), callback);
      }
    ], function (err, result) {
      //console.log(err);
      if (err) return res.send(err);
      //console.log(result);
      return res.ok(JSON.stringify(result[0]));
    });
  },
  loadCAT: function (req, res) {
    async.series([
      function (callback) {
        CQAlmerys.listCAT(null, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
 
      return res.ok(JSON.stringify(result[0]));
    });
  },
 
  getPop: function (req, res) {
    var dateess = new Date().toISOString().replace(/-/, '').replace(/-/, '').substr(0, 8);
    var option = [];
    option.id_lot = req.param("id_lot_client", null);
    option.pdate = dateess;
    async.series([
      function (callback) {
        CQAlmerys.population(option, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
 
      return res.ok(result[0]);
    });
  },
  getLsMat: function (req, res) {
 
    async.series([
      function (callback) {
        CQAlmerys.getLsMat(null, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
 
      return res.ok(JSON.stringify(result[0]));
    });
  },
 
  getLsMatSat: function (req, res) {
 
    async.series([
      function (callback) {
        CQAlmerys.getLsMatSat(null, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
 
      return res.ok(JSON.stringify(result[0]));
    });
  },
 
  getLsMatPara: function (req, res) {
 
    async.series([
      function (callback) {
        CQAlmerys.getLsMatPara(null, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
 
      return res.ok(JSON.stringify(result[0]));
    });
  },
  getLsCQMatSat: function (req, res) {
 
    async.series([
      function (callback) {
        CQAlmerys.getCQMatSat(null, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
 
      return res.ok(JSON.stringify(result[0]));
    });
  },
 
  getLsCQMat: function (req, res) {
 
    async.series([
      function (callback) {
        CQAlmerys.getCQMat(null, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
 
      return res.ok(JSON.stringify(result[0]));
    });
  },
  addCQ: function (req, res) {
    var option = [];
    option.id_pers = req.param("id_pers");
    option.niv = req.param("niv");
    async.series([
      function (callback) {
        CQAlmerys.addCQ(option, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
 
      return res.ok(JSON.stringify(result[0]));
    });
  },
 
  addSat: function (req, res) {
    var option = [];
    option.id_pers = req.param("id_pers");
    option.sat = req.param("sat");
    async.series([
      function (callback) {
        CQAlmerys.addSat(option, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
 
      return res.ok(JSON.stringify(result[0]));
    });
  },
 
  removeCQ: function (req, res) {
    var option = [];
    option.id_pers = req.param("id_pers");
    async.series([
      function (callback) {
        CQAlmerys.removeCQ(option, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
 
      return res.ok(JSON.stringify(result[0]));
    });
  },
 
  removeSat: function (req, res) {
    var option = [];
    option.id_pers = req.param("id_pers");
    async.series([
      function (callback) {
        CQAlmerys.removeSat(option, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
      return res.ok(JSON.stringify(result[0]));
    });
  },
 
 
  setPop: function (req, res) {
    var dateess = new Date().toISOString().replace(/-/, '').replace(/-/, '').substr(0, 8);
    var option = [];
    option.id_lot = req.param("id_lot_client", null);
    option.quantite = req.param("qte", null);
    option.pdate = dateess;
    async.series([
      function (callback) {
        CQAlmerys.addPopulation(option, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
 
      return res.ok(JSON.stringify(result[0]));
    });
  },
  loadCQAlm: function (req, res) {
    var sql = req.param('sql', '');
 
    CQAlmerysService.loadCQAlm(sql)
 
    .then((listeCQ) => {
      return res.ok(listeCQ);
    })
 
    .catch((err) => {
      console.log(err);
      return res.send(err);
    });
    
  },//added by Vololona
  ExportCq: function (req, res) {
    var sql = req.param('sql', '');
    var xl = require('excel4node');
    console.log("\n REQUETE SQL IMPORTER >>>\n" + sql);
    var wb = new xl.Workbook();
    //var sheet1 = workbook.createSheet('sheet1', 500, 500);
    var ws = wb.addWorksheet('cq_Almerys');//ajouter date et pole de l'export
    //debut style
    var myStyle = wb.createStyle({
      font: {
        bold: true,
      },
      alignment: {
        wrapText: true,
        horizontal: 'center',
        vertical: 'center'
      },
      fill: {
        type: 'pattern', // the only one implemented so far.
        patternType: 'solid', // most common.
        fgColor: '#b4c6e7'// bgColor only applies on patternTypes other than solid.
      }
    });
    var myStyleBorder = wb.createStyle({
      border: { // §18.8.4 border (Border)
        left: {
          style: 'thin',
          color: '#000000'// HTML style hex value
        },
        right: {
          style: 'thin',
          color: '#000000'
        },
        top: {
          style: 'thin',
          color: '#000000'
        },
        bottom: {
          style: 'thin',
          color: '#000000'
        },
        diagonal: {
          style: 'thin',
          color: '#f2f2f2'
        },
        diagonalDown: true,
        diagonalUp: true,
        outline: true
      }
    });
 
    var style_number = wb.createStyle({
      font: {
        size: 11
      },
      numberFormat: '#,##0.00;(#,##0.00);-'
    });
    var mavo_back = wb.createStyle({
      fill: {
        type: 'pattern', // the only one implemented so far.
        patternType: 'solid', // most common.
        fgColor: '#ffff99'// bgColor only applies on patternTypes other than solid.
      }
 
    });
 
    var mena_back = wb.createStyle({
      fill: {
        type: 'pattern', // the only one implemented so far.
        patternType: 'solid', // most common.
        fgColor: '#ff754f'// bgColor only applies on patternTypes other than solid.
      }
 
    });
    var manga_back = wb.createStyle({
      fill: {
        type: 'pattern', // the only one implemented so far.
        patternType: 'solid', // most common.
        fgColor: '#c5faf2'// bgColor only applies on patternTypes other than solid.
      }
 
    });
    //fin fin style
    //en tete
    var dateNowLoc = new Date().toISOString().replace(/-/, '').replace(/-/, '').substr(0, 8);
    ws.cell(1, 1).string("DEPARTEMENT").style(myStyle).style(myStyleBorder);
    ws.cell(1, 2).string("POLE").style(myStyle).style(myStyleBorder);
    ws.cell(1, 3).string("SPECIALITE").style(myStyle).style(myStyleBorder);
    ws.cell(1, 4).string("SOUS SPE").style(myStyle).style(myStyleBorder);
    ws.cell(1, 5).string("SOUS SOUS SPE").style(myStyle).style(myStyleBorder);
    var suite = 0;
    if (sql.includes("701") || sql.includes("702") || sql.includes("703") || sql.includes("704") || sql.includes("721")) {
      ws.cell(1, 6).string("NUM SECU").style(myStyle).style(myStyleBorder);
      ws.cell(1, 7).string("NUM DECOMPTE").style(myStyle).style(myStyleBorder);
      ws.cell(1, 8).string("ETAT").style(myStyle).style(myStyleBorder);
      suite = 9;
    }
    else if (sql.includes("104") || sql.includes("106")) {
      ws.cell(1, 6).string("NUM FACTURE").style(myStyle).style(myStyleBorder);
      ws.cell(1, 7).string("NUM NUO").style(myStyle).style(myStyleBorder);
      ws.cell(1, 8).string("NUM AM").style(myStyle).style(myStyleBorder);
      ws.cell(1, 9).string("NUM INTERNE").style(myStyle).style(myStyleBorder);
      ws.cell(1, 10).string("COMMENTAIRE").style(myStyle).style(myStyleBorder);
      suite = 11;
    }
    else {
      ws.cell(1, 6).string("NUM FACTURE").style(myStyle).style(myStyleBorder);
      ws.cell(1, 7).string("NUM NUO").style(myStyle).style(myStyleBorder);
      suite = 8
    }
    ws.cell(1, suite).string("TYPE FAV").style(myStyle).style(myStyleBorder);
    ws.cell(1, (suite + 1)).string("MONTANT RC").style(myStyle).style(myStyleBorder);
    ws.cell(1, (suite + 2)).string("MATRICULE").style(myStyle).style(myStyleBorder);
    ws.cell(1, (suite + 3)).string("SAT").style(myStyle).style(myStyleBorder);
    ws.cell(1, (suite + 4)).string("CQ").style(myStyle).style(myStyleBorder);
    ws.cell(1, (suite + 5)).string("TYPE CQ").style(myStyle).style(myStyleBorder);
    ws.cell(1, (suite + 6)).string("ETAT").style(myStyle).style(myStyleBorder);
    ws.cell(1, (suite + 7)).string("ETAPE").style(myStyle).style(myStyleBorder);
    ws.cell(1, (suite + 8)).string("HEURE").style(myStyle).style(myStyleBorder);
    ws.cell(1, (suite + 9)).string("TYPE ERREUR").style(myStyle).style(myStyleBorder);
    ws.cell(1, (suite + 10)).string("DISTINCTION").style(myStyle).style(myStyleBorder);
    ws.cell(1, (suite + 11)).string("TACHE").style(myStyle).style(myStyleBorder);
    ws.cell(1, (suite + 12)).string("MOTIF REJET").style(myStyle).style(myStyleBorder);
    ws.cell(1, (suite + 13)).string("CLIENT").style(myStyle).style(myStyleBorder);
    ws.cell(1, (suite + 14)).string("Mutuelle").style(myStyle).style(myStyleBorder);
    ws.cell(1, (suite + 15)).string("ETAT REPRISE").style(myStyle).style(myStyleBorder);
    ws.cell(1, (suite + 16)).string("ETAT SAISIE").style(myStyle).style(myStyleBorder);
    async.series([
      function (callback) {
        CQAlmerys.listCqAlm(sql, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
      else {
        var poleList = [
          {
            id: 41,
            dep: 12,
            lib: "000TEST_DEV"
          }, {
            id: 579,
            dep: 19,
            lib: "ALME_TPS"
          }, {
            id: 578,
            dep: 20,
            lib: "ALM_HOSPI"
          }, {
            id: 580,
            dep: 22,
            lib: "ALM_OPTIQUE"
          }, {
            id: 577,
            dep: 38,
            lib: "ALM_SE"
          }, {
            id: 29,
            dep: 39,
            lib: "ALM_LDR"
          }, {
            id: 583,
            dep: 40,
            lib: "ALM_INTERIAL"
          }, {
            id: 582,
            dep: 49,
            lib: "ALM_DENTAIRE_AUDIO"
          }
        ];
        var line = 2;
        async.each(result[0], function (cqAlm, next) {
          //libelle reprise
          var libelle_etat_reprise_fini = "";
          if (cqAlm.reprise_fini) {
            if (cqAlm.reprise_fini.toString().toLowerCase() == "true") {
              libelle_etat_reprise_fini = "REPRISE TERMINER";
            } else {
              libelle_etat_reprise_fini = "";
            }
          } else {
            libelle_etat_reprise_fini = "";
          }
          //type de sat 
          var typFav = '';
          if (Number(cqAlm.id_dossier) == 701 || Number(cqAlm.id_dossier) == 702 || Number(cqAlm.id_dossier) == 703 || Number(cqAlm.id_dossier) == 704) {
            if (Number(cqAlm.quantite) >= 350) {
              typFav = "NIVEAU A";
            }
            else {
              typFav = "NIVEAU B";
            }
 
          } else {
            if (Number(cqAlm.quantite) >= 100) {
              typFav = "FAV A";
            }
            else if (Number(cqAlm.quantite) < 100 && Number(cqAlm.quantite) >= 50) {
              typFav = "FAV B";
            }
            else if (Number(cqAlm.quantite) < 50 && Number(cqAlm.quantite) >= 30) {
              typFav = "FAV C";
            } else if (Number(cqAlm.quantite) === 0) {
              typFav = "FAV AUTRE";
            }
          }
          var dep = cqAlm.dep;
          if (Number(cqAlm.iddep) == 12)
            dep = poleList[0].lib;
          else if (Number(cqAlm.iddep) == 19)
            dep = poleList[1].lib;
          else if (Number(cqAlm.iddep) == 20)
            dep = poleList[2].lib;
          else if (Number(cqAlm.iddep) == 22)
            dep = poleList[3].lib;
          else if (Number(cqAlm.iddep) == 38)
            dep = poleList[4].lib;
          else if (Number(cqAlm.iddep) == 39)
            dep = poleList[5].lib;
          else if (Number(cqAlm.iddep) == 40)
            dep = poleList[6].lib;
          else if (Number(cqAlm.iddep) == 49)
            dep = poleList[7].lib;
          ws.cell(line, 1).string(dep).style(style_number).style(myStyleBorder);
          ws.cell(line, 2).string(cqAlm.dossier).style(style_number).style(myStyleBorder);
          ws.cell(line, 3).string(cqAlm.lotclient).style(style_number).style(myStyleBorder);
          ws.cell(line, 4).string((cqAlm.sous_sous_spec || '-')).style(style_number).style(myStyleBorder);
          ws.cell(line, 5).string((cqAlm.sous_sous_sous_spec || '-')).style(style_number).style(myStyleBorder);
          //ajout condition pour chaque pole
          if (sql.includes("701") || sql.includes("702") || sql.includes("703") || sql.includes("704") || sql.includes("721")) {
            ws.cell(line, 6).string((cqAlm.numerocq || '-')).style(style_number).style(myStyleBorder);
            ws.cell(line, 7).string((cqAlm.numerodecompte || '-')).style(style_number).style(myStyleBorder);
            ws.cell(line, 8).string((cqAlm.etatint || '-')).style(style_number).style(myStyleBorder);
            suite = 9;
          }
          else if (sql.includes("791") || sql.includes("792") || sql.includes("793") || sql.includes("794")) {
            ws.cell(line, 6).string((cqAlm.numerofacture || '-')).style(style_number).style(myStyleBorder);
            if (Number(cqAlm.id_couleur_nuo) == 1)
              ws.cell(line, 7).string((cqAlm.numeronuo || '-')).style(mavo_back).style(myStyleBorder);
            else if (Number(cqAlm.id_couleur_nuo) == 2)
              ws.cell(line, 7).string((cqAlm.numeronuo || '-')).style(manga_back).style(myStyleBorder);
            else
              ws.cell(line, 7).string((cqAlm.numeronuo || '-')).style(style_number).style(myStyleBorder);
            if (!cqAlm.is_am)
              ws.cell(line, 8).string((cqAlm.num_am || '-')).style(mena_back).style(myStyleBorder);
            else
              ws.cell(line, 8).string((cqAlm.num_am || '-')).style(style_number).style(myStyleBorder);
            if (!cqAlm.is_interne)
              ws.cell(line, 9).string((cqAlm.interne || '-')).style(mena_back).style(myStyleBorder);
            else
              ws.cell(line, 9).string((cqAlm.interne || '-')).style(style_number).style(myStyleBorder);
            ws.cell(line, 10).string((cqAlm.commentaire || '-')).style(style_number).style(myStyleBorder);
            suite = 11;
          }
          else {
            ws.cell(line, 6).string((cqAlm.numerofacture || '-')).style(style_number).style(myStyleBorder);
            ws.cell(line, 7).string((cqAlm.numeronuo || '-')).style(style_number).style(myStyleBorder);
            suite = 8;
 
          }
          ws.cell(line, suite).string(typFav).style(style_number).style(myStyleBorder);
          ws.cell(line, (suite + 1)).string((cqAlm.quantite || '-')).style(style_number).style(myStyleBorder);
          ws.cell(line, (suite + 2)).string(cqAlm.matriculesaisie + '').style(style_number).style(myStyleBorder);
          ws.cell(line, (suite + 3)).string((cqAlm.sat || '-')).style(style_number).style(myStyleBorder);
          ws.cell(line, (suite + 4)).string((cqAlm.nom_cq || '-') + " " + (cqAlm.prenom_cq || '-')).style(style_number).style(myStyleBorder);
          ws.cell(line, (suite + 5)).string((cqAlm.type_controle || '-')).style(style_number).style(myStyleBorder);
          ws.cell(line, (suite + 6)).string((cqAlm.etat || '-')).style(style_number).style(myStyleBorder);
          ws.cell(line, (suite + 7)).string((cqAlm.etape || '-')).style(style_number).style(myStyleBorder);
          ws.cell(line, (suite + 8)).string((cqAlm.heure || '-')).style(style_number).style(myStyleBorder);
          ws.cell(line, (suite + 9)).string((cqAlm.erreur_cq || '-')).style(style_number).style(myStyleBorder);
          ws.cell(line, (suite + 10)).string((cqAlm.dist || '-')).style(style_number).style(myStyleBorder);
          ws.cell(line, (suite + 11)).string((cqAlm.tache || '-')).style(style_number).style(myStyleBorder);
          ws.cell(line, (suite + 12)).string((cqAlm.motifrejet || '-')).style(style_number).style(myStyleBorder);
          ws.cell(line, (suite + 13)).string((cqAlm.clientalm || '-')).style(style_number).style(myStyleBorder);
          ws.cell(line, (suite + 14)).string((cqAlm.libelle_mutuelle || '-')).style(style_number).style(myStyleBorder);
          ws.cell(line, (suite + 15)).string((libelle_etat_reprise_fini || '-')).style(style_number).style(myStyleBorder);
 
          if (sql.includes("791") || sql.includes("792") || sql.includes("793") || sql.includes("794")) {
            if (cqAlm.saisie_ok)
              ws.cell(line, (suite + 16)).string("OK SAISIE").style(style_number).style(myStyleBorder);
          }
          line += 1;
        });
        wb.write('assets/Export_Excel/Cq_Almerys_' + dateNowLoc + '.xlsx');
        console.log('vita >>>> \nassets/Export_Excel/Cq_Almerys_' + dateNowLoc + '.xlsx');
 
       // return res.download('assets/Export_Excel/Cq_Almerys_' + dateNowLoc + '.xlsx')
       /*setTimeout(function(){
          return res.redirect('/Export_Excel/Cq_Almerys_' + dateNowLoc + '.xlsx')
        },1000); */
      }
      setTimeout(function(){
        return res.redirect('/Export_Excel/Cq_Almerys_' + dateNowLoc + '.xlsx')
      },1000);
    });
  },
  GetDAtaEntryAMatr: function (req, res) {
    var option = req.param('id', '');
    console.log("");
    async.series([
      function (callback) {
        CQAlmerys.getMatr(option, callback);
      }
    ], function (err, resultat) {
      if (err) return res.send(err);
 
      return res.ok(JSON.stringify(resultat[0]));
    });
  },//end editing
  loadCQUpdated: function (req, res) {
    var id = req.param('id');
 
    async.series([
      function (callback) {
        CQAlmerys.loadCQUpdated(id, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
 
      return res.ok(JSON.stringify(result[0]));
    });
  },
 
  updateCQLot: function (req, res) {
 
    if (!req.session.user) return res.ok("reload");
    var option = [];
    option.id = req.param("id", null);
    option.id_nuo = req.param("idnuo", null);
    option.id_etat = req.param("id_etat", null);
    option.id_ps = req.param("id_ps", null);
    option.id_erreur = req.param("idErreur", null);
    option.is_rejet = req.param("is_rejet", false);
    option.idTPControl = req.param("idtp", '');
    option.isInterial = req.param("is_interial", false);
    option.eta_int = req.param("eta_int", "");
    option.clientalm = req.param("clientalm", '');
    option.reprise_fini = req.param("is_reprise_fini", '');
    option.cq = req.session.user;
 
 
    var newMotif = req.param("new", null);
    var id_err = req.param("idErreur", null);
    //console.log(id_err!="new");
    if (id_err != "new") {
      async.series([
        function (callback) {
          CQAlmerys.update_almerys_plot(option, callback);
        }
      ], function (err, results) {
        if (err) return res.ok(false);
 
        return res.ok(results[0]);
      });
    } else {
      /**
       * Insertion du nouvelle motif d'erreur
       * */
      async.series([
        function (callback) {
          ListErreur.create({ libelle: newMotif, id_etat: option.id_etat, id_pole_new: req.param("idp", null) }).exec(function (err, errCreer) {
            if (err) { return callback(err); }
            //console.log(' 1 -  ID erreur created', errCreer.id);
            return callback(null, errCreer.id);
          });
        }
      ], function (callback, result) {
 
 
        async.series([
          function (callback) {
            var opt = [];
            opt.id = req.param("id", null);
            opt.id_nuo = req.param("idnuo", null);
            opt.id_etat = req.param("id_etat", null);
            opt.id_ps = req.param("id_ps", null);
            opt.id_erreur = result[0];
            opt.is_rejet = req.param("is_rejet", false);
            opt.idTPControl = req.param("idtp", '');
            option.isInterial = req.param("is_interial", false);
            option.eta_int = req.param("eta_int", "");
            opt.clientalm = req.param("clientalm", '');
            option.reprise_fini = req.param("is_reprise_fini", '');
            opt.cq = req.session.user;
            opt.id_erreur = result[0];
            CQAlmerys.update_almerys_plot(opt, callback);
          }
        ], function (errr, results) {
          if (errr) //console.log(errr); return res.ok(false);
            return res.ok(results[0]);
        });
      });
    }
 
  },
 
  getCQEtat: function (req, res) {
    var sql = req.param('sql', '');
    var tp = req.param('tp', null);
    var data = req.param('sspec', null);
    var option = [];
    var functions = [];
    /*var functionsGraphe = [
     function(callback){
     option.id_dossier = 579;//
     option.id_dep = 19;//TPS
     CQAlmerys.countCqByPole(option,callback);
     },function(callback){
     option.id_dossier = 578;//
     option.id_dep = 20;//HOSPI
     CQAlmerys.countCqByPole(option,callback);
     },function(callback){
     option.id_dossier = 580;//
     option.id_dep = 22;//OPTIQUE
     CQAlmerys.countCqByPole(option,callback);
     },function(callback){
     option.id_dossier = 557;//
     option.id_dep = 38;//SE
     CQAlmerys.countCqByPole(option,callback);
     },function(callback){
     option.id_dossier = 29;//
     option.id_dep = 39;//LDR
     CQAlmerys.countCqByPole(option,callback);
     },function(callback){
     option.id_dossier = 583;//
     option.id_dep = 40;//INTERAL
     CQAlmerys.countCqByPole(option,callback);
     },function(callback){
     option.id_dossier = 582;//
     option.id_dep = 49;//DENTAIRE
     CQAlmerys.countCqByPole(option,callback);
     }
     ];*/
    //dep souspec
 
    var dep = [
      {
        id_dossier: 579,//
        id_dep: 19,//TPS
      }, {
        id_dossier: 578,//
        id_dep: 20,//HOSPI
      }, {
        id_dossier: 580,//
        id_dep: 22,//OPTIQUE
      }, {
        id_dossier: 577,//
        id_dep: 38,//SE
      }, {
        id_dossier: 29,//
        id_dep: 39,//LDR
      }, {
        id_dossier: 583,//
        id_dep: 40,//INTERAL
      }, {
        id_dossier: 582,//
        id_dep: 49,//DENTAIRE
      }
    ];
    if (tp == null) {
      functions = [
        function (callback) {
          option.etat = 1;//saisie
          CQAlmerys.countCqByEtat(option, callback);
        }, function (callback) {
          option.etat = 2;//OK
          CQAlmerys.countCqByEtat(option, callback);
        }, function (callback) {
          option.etat = 3;//NOK
          CQAlmerys.countCqByEtat(option, callback);
        }, function (callback) {
          option.etat = 4;//NRRG
          CQAlmerys.countCqByEtat(option, callback);
        }, function (callback) {
          option.etat = 5;//ES
          CQAlmerys.countCqByEtat(option, callback);
        }, function (callback) {
          option.etat = 6;//En Attente
          CQAlmerys.countCqByEtat(option, callback);
        }, function (callback) {
          option.id_dossier = 579;//
          option.id_dep = 19;//TPS
          CQAlmerys.countCqByPole(option, callback);
        }, function (callback) {
          option.id_dossier = 578;//
          option.id_dep = 20;//HOSPI
          CQAlmerys.countCqByPole(option, callback);
        }, function (callback) {
          option.id_dossier = 580;//
          option.id_dep = 22;//OPTIQUE
          CQAlmerys.countCqByPole(option, callback);
        }, function (callback) {
          option.id_dossier = 577;//
          option.id_dep = 38;//SE
          CQAlmerys.countCqByPole(option, callback);
        }, function (callback) {
          option.id_dossier = 29;//
          option.id_dep = 39;//LDR
          CQAlmerys.countCqByPole(option, callback);
        }, function (callback) {
          option.id_dossier = 583;//
          option.id_dep = 40;//INTERAL
          CQAlmerys.countCqByPole(option, callback);
        }, function (callback) {
          option.id_dossier = 582;//
          option.id_dep = 49;//DENTAIRE
          CQAlmerys.countCqByPole(option, callback);
        }
      ];
 
      var option = [];
      option.sql = sql;
      async.series(functions, function (err, result) {
        if (err) return res.send(err);
 
        if (tp != null) {
          var pole = [];
          return res.ok(JSON.stringify(
            {
              etat: [
                { name: 'SAISIE', value: result[0] },
                { name: 'OK', value: result[1] },
                { name: 'NOK', value: result[2] },
                { name: 'NRRG', value: result[3] },
                { name: 'ES', value: result[4] },
                { name: 'En Attente', value: result[5] }
              ],
              pole: [
                { name: 'TPS', value: [result[6].ref, result[6].pri] }
              ], tp: tp
            }));
        } else {
          return res.ok(JSON.stringify(
            {
              etat: [
                { name: 'SAISIE', value: result[0] },
                { name: 'OK', value: result[1] },
                { name: 'NOK', value: result[2] },
                { name: 'NRRG', value: result[3] },
                { name: 'ES', value: result[4] },
                { name: 'En Attente', value: result[5] }
              ],
              pole: [
                { name: 'TPS', value: [result[6].ref, result[6].pri] },
                { name: 'HOSPI', value: [result[7].ref, result[7].pri] },
                { name: 'OPTIQUE', value: [result[8].ref, result[8].pri] },
                { name: 'SE', value: [result[9].ref, result[9].pri] },
                { name: 'LDR', value: [result[10].ref, result[10].pri] },
                { name: 'INTERAL', value: [result[11].ref, result[11].pri] },
                { name: 'DENTAIRE', value: [result[12].ref, result[12].pri] }
              ], tp: null
            }));
        }
 
      });
 
    } else {
      // get all idsousspec
 
      var spltSSpec = data.split(":");
      var list = [];
      var functionSspec = [
        function (callback) {
          option.etat = 1;//saisie
          CQAlmerys.countCqByEtat(option, callback);
        }, function (callback) {
          option.etat = 2;//OK
          CQAlmerys.countCqByEtat(option, callback);
        }, function (callback) {
          option.etat = 3;//NOK
          CQAlmerys.countCqByEtat(option, callback);
        }, function (callback) {
          option.etat = 4;//NRRG
          CQAlmerys.countCqByEtat(option, callback);
        }, function (callback) {
          option.etat = 5;//ES
          CQAlmerys.countCqByEtat(option, callback);
        }, function (callback) {
          option.etat = 6;//En Attente
          CQAlmerys.countCqByEtat(option, callback);
        }];
      var cpt = 0;
      var option = [];
      async.eachSeries(spltSSpec,
        function (prime, callback) {
          if (cpt != 0) {
            var option = [];
            option.sql = sql;
            option.id_dep = dep[Number(tp)].id_dep;
            option.id_lot = prime;
            functionSspec.push(
              function (callback) {
                CQAlmerys.countCqByLot(option, callback);
              }
            )
            cpt++;
            callback();
          } else {
            cpt++;
            callback();
          }
        }, function (err) {
          if (err) return res.ok(err);
 
          ////console.log(list);
          functions = functionSspec;
          //}
          //var option = [];
          option.sql = sql;
          async.series(functions, function (err, result) {
            if (err) return res.send(err);
 
            if (tp != null) {
              var pole = [];
              var t = 0;
              async.eachSeries(result, function (prime, callback) {
                if (t < 6) {
                  t++;
                } else {
                  pole.push(
                    { name: prime.name, value: [prime.ref, prime.pri] }
                  );
                  t++;
                }
                callback();
              }, function (err) {
                if (err) return res.send(err);
                return res.ok(JSON.stringify(
                  {
                    etat: [
                      { name: 'SAISIE', value: result[0] },
                      { name: 'OK', value: result[1] },
                      { name: 'NOK', value: result[2] },
                      { name: 'NRRG', value: result[3] },
                      { name: 'ES', value: result[4] },
                      { name: 'En Attente', value: result[5] }
                    ],
                    pole: pole, tp: tp
                  }));
 
              });
 
            } else {
              return res.ok(JSON.stringify(
                {
                  etat: [
                    { name: 'SAISIE', value: result[0] },
                    { name: 'OK', value: result[1] },
                    { name: 'NOK', value: result[2] },
                    { name: 'NRRG', value: result[3] },
                    { name: 'ES', value: result[4] },
                    { name: 'En Attente', value: result[5] }
                  ],
                  pole: [
                    { name: 'TPS', value: [result[6].ref, result[6].pri] },
                    { name: 'HOSPI', value: [result[7].ref, result[7].pri] },
                    { name: 'OPTIQUE', value: [result[8].ref, result[8].pri] },
                    { name: 'SE', value: [result[9].ref, result[9].pri] },
                    { name: 'LDR', value: [result[10].ref, result[10].pri] },
                    { name: 'INTERAL', value: [result[11].ref, result[11].pri] },
                    { name: 'DENTAIRE', value: [result[12].ref, result[12].pri] }
                  ], tp: null
                }));
            }
 
          });
        });
      /*option.id_dep = dep[Number(tp)];
       for (var i = 1;i<spltSSpec.length;i++){
       option.id_lot = spltSSpec[i];
       functionSspec.push(
       function(callback){
       CQAlmerys.countCqByLot(option,callback);
       }
       )
       list.push(spltSSpec[i]);
       }*/
 
 
 
    }
  },
 
  setEchantilon: function (req, res) {
    async.series([
      function (callback) {
        EchantillonService.setEchantillon(callback);
      }
 
    ], function (err, result) {
      res.ok(result[0]);
    })
  },
 
  se: function (req, res) {
    async.series([
      function (callback) {
        EchantillonService.setEchantillon(callback);
      }
 
    ], function (err, result) {
      res.ok(result[0]);
    })
  },
  // REcuperation client Almerys CQ
  getclientAlmcq: function (req, res) {
    async.series([
      function (callback) {
        CQAlmerys.listClientCQ(null, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
 
      return res.ok(JSON.stringify(result[0]));
    });
  },
  CheckPresenceOpSaisie: function (req, res) {
    var id_personne = req.param("id_pers");
    async.series([
      function (callback) {
        CQAlmerys.checkPresenceceOpSaisie(id_personne, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
 
      return res.ok(JSON.stringify(result[0]));
    });
  },
 
  /**
   * 
   * PARTIE INDICATEUR SUIVI PROD
   * 
   */
  getPrevision: function(req, res) {
    let options = {
      dateDebut : req.param('debut'),
      dateFin : req.param('fin')
    };
 
    AlmSuiviProdService.getPrevision(options,
      (err, results) => {
        if (err) {
          console.log(err);
          return res.send(err);
        }
        //console.log(results);
        return res.ok(results);
      }
    );
  },
  updatePrevision : function(req, res) {
    let options = {
      pourcentage : req.allParams().pourcentage,
      frequence : req.allParams().frequence,
      prevision : req.allParams().prevision,
      idSuivi : req.allParams().id_suivi,
    };
    
    AlmSuiviProdService.updatePrevision(options,
      (err) => {
        if (err) {
          console.log(err);
          return res.send(err);
        }
        return res.ok('tonga');
      }
    );
  },
  recupererControleByJour : function(req, res) {
    let options = {
      idSpecialite : req.param('idspecialite'),
      idSSpecialite : req.param('idsspecialite'),
      idSSSpecialite : req.param('idssspecialite')
    };
    if (options.idSpecialite === '') options.idSpecialite = null;
    if (options.idSSpecialite === '') options.idSSpecialite = null;
    if (options.idSSSpecialite === '') options.idSSSpecialite = null;
 
    AlmFrequSuiviService.recupererControleByJour(options,
      (err, result) => {
        if (err) {
          console.log(err);
          return res.send(err);
        }
 
        return res.ok(result);
      }  
    );
  },
  updateControleByJour : function(req,res) {
    let options = {
      idSuivi : req.param('id'),
      lundi : req.param('lundi'),
      mardi : req.param('mardi'),
      mercredi : req.param('mercredi'),
      jeudi : req.param('jeudi'),
      vendredi : req.param('vendredi'),
      samedi : req.param('samedi'),
      sansControle : req.param('sans-controle'),
    };
 
 
    AlmFrequSuiviService.updateControleByJour(options, 
      (err) => {
        if (err) {
          console.log(err);
          return res.send(err);
        }
 
        return res.ok('ok');
      }  
    );
    
  },
  recupererControleByDate : function(req, res) {
    let options = {
      idSpecialite : req.param('idspecialite'),
      idSSpecialite : req.param('idsspecialite'),
      idSSSpecialite : req.param('idssspecialite')
    };
    if (options.idSpecialite === '') options.idSpecialite = null;
    if (options.idSSpecialite === '') options.idSSpecialite = null;
    if (options.idSSSpecialite === '') options.idSSSpecialite = null;
 
    AlmFrequSuiviService.recupererControleByDate(options,
      (err,results) => {
        if(err) return res.send(err);
 
        return res.ok(results);
      }  
    );
  },
  insererControleByDate : function(req,res) {
    let options = {
      idSpecialite : req.param('idspecialite'),
      idSSpecialite : req.param('idsspecialite'),
      idSSSpecialite : req.param('idssspecialite'),
      dateDebut : req.param('debut'),
      dateFin : req.param('fin')
    };
 
    AlmFrequSuiviService.insererControleBetweenTwoDates(options,
      (err) => {
        if (err) {
          console.log(err);
          return res.send(err);
        } else {
          return res.ok('ok');
        }
        
      }  
    );
  },
 
  deleteSpecificDate : function(req,res) {
    let options = {
      idSuivi : req.param('id')
    };
 
    AlmFrequSuiviService.deleteSpecifiDate(options, 
      (err) => {
        if (err) {
          console.log(err);
          return res.send(err);
        } else {
          return res.ok('ok');
        }
      }  
    );
  },
 
 
  /**
   * 
   * PARTIE GRILLE CQ
   * 
   */
 
  recupererEtapesGrille : function(req,res) {
    let idTypeGrille = req.param('id-type-grille');
 
    let options = {
      idTypeGrille : idTypeGrille
    };
 
  
    CQAlmerysService.recupererEtapesGrille(options)
 
    .then((liste) => {
      return res.ok(liste);
    })
 
    .catch((err) => {
      console.log(err);
      return res.send(err);
    });
 
  },
 
 
 
  enregistrerGrille : function(req, res) {
    let grille = req.allParams().grille;
    let user = req.session.user;
    grille.idCq = user;
 
    CQAlmerysService.enregistrerGrille(grille)
 
    .then(() => {
      return res.ok();
    })
 
    .catch((err) => {
      console.log(err);
      return res.send(err);
    });
 
  },
 
 
  recupererAnomalies : function(req, res) {
    let idCq = req.param('id');
 
    CQAlmerysService.recupererErreursCheckCq(idCq)
 
    .then((listeErreurs) => {
      return res.ok(listeErreurs);
    })
 
    .catch((err) => {
      console.log(err);
      return res.send(err);
    })
  },
 
 
  updateGrille : function(req, res) {
    let grille = req.allParams().grille;
    let user = req.session.user;
    grille.idCq = user;
    
    CQAlmerysService.updateGrille(grille)
 
    .then(() => {
      return res.ok();
    })
 
    .catch((err) => {
      console.log(err);
      return res.send(err);
    });
 
  },
 
  /**
   * Refactoring ancien code export et ajout liste anomalie 
   * @param {*} req 
   * @param {*} res 
   */
  exportListeCq : function(req, res) {
    let sql = req.param('sql', '');
 
    CQAlmerysExportService.generateExcelCq(sql)
 
    .then((dateNow) => {
      let path = '/Export_Excel/Cq_Almerys_' + dateNow + '.xlsx';
      return res.redirect(path);
    })
 
    .catch((err) => {
      console.log(err);
      return res.send(err);
    });
  },
 
 
  recupererTypeGrille : function(req, res) {
 
    let idPole = req.param("pole");
    let idSpe = req.param('spe');
    let idSSpe = req.param('sspe');
 
    CQAlmerysService.recupererTypeGrille(idPole, idSpe, idSSpe)
 
    .then((typeGrille) => {
      return res.ok(typeGrille);
    })
 
    .catch((err) => {
      console.log(err);
      return res.send(err);
    });
  },

  /**
   * Page d'index de la page de test grille CQ
   */

  CQAlmTest : function(req, res) {
    if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"] = "";
    menu["dossierAdmin"] = "";
    menu["gestionDossier"] = "selected";
    menu["statOpAdmin"] = "";
    menu["presence"] = "";
    menu["admin"] = "";
    console.log("" + req.session.user);
    return res.view("pages/cq_almerys_test", { menu: menu, layout: false });
  }
}