/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  dashboardSuivis: function(req, res)
  {

    if (!req.session.user) return res.redirect('/login');
    var math = require('mathjs');
    var retval = [];
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";


    retval['menu']= menu;
    retval["layout"] = false;

    var dateess = req.param('datedeb',''+new Date().toISOString()).replace(/-/,'/').replace(/-/,'/').substr(0,10);
    var datees2 = req.param('datedeb',''+new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8);
    if(dateess==''){
      dateess = (''+new Date().toISOString()).replace(/-/,'/').replace(/-/,'/').substr(0,10);
      datees2 = (new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8);
    }
    var dossier = req.param('dossier','');
    var dep = req.param('departement','');
    var groupe = req.param('groupe','');
    var equipe = req.param('groupe','');
    var filtre = req.param('filtre','1');
    req.session.datechoice = req.param('datedeb',''+new Date().toISOString()).substr(0,10);
    req.session.dossier = dossier;
    req.session.departement = dep;
    req.session.groupe = groupe;
    req.session.equipe = equipe;
    req.session.filtre = filtre;
    var options = [];
    options.datecible=dateess;
    options.datesess=datees2;
    options.dossier= dossier;
    options.departement= dep;
    options.groupe= groupe;
    options.equipe= equipe;
    options.datecible =new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);



    async.series([
        function(callback){
          LdtService.getListeConnected(options, callback);
        },
        function(callback){
          Ldt.listeConnectedGPAO(options, callback);
        },
        function(callback){
          PointageService.getCongeParDate(options, callback);
        },
        function(callback){
          Ldt.listeConnectedPointage(options, callback);
        },
        function(callback){
          Ldt.dossierAlmConnectedByDate(options, callback)
        },

        function(callback){// list retard
          Pointage.retard(options, callback)
        },
        function(callback){// list present
          Pointage.presence(options, callback)
        },
        function(callback){// list present
          Pointage.listPersonnel(options, callback)
        },
        function(callback){
          Ldt.dossierClassConnectedByDate(options, callback)
        },
        function(callback){// list present
          Pointage.statusPersonnel(options, callback);
        }
      ],
      function(err, results) {
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        //traitement des donnees
        var listePConnected = results[0];
        var listeinLdtConnected = results[1];
        var listeConge = results[2];
        ////console.log(results[1]);

        return res.view('pages/DashboardSuivis',{
          menu : menu,
          layout : false,
          listePersonneConnected :  listePConnected,
          listeinLdtConnected :  listeinLdtConnected,
          listeinPtConnected :  results[3],
          statusPers :  results[9],
          dossAl :  results[4],
          dossCl :  results[8],
          retard :  results[5],
          present :  results[6],
          pers :  results[7],
          listeConge : listeConge,
          dossier :  dossier,
          dep :  dep,
          math :  math,
          groupe :  groupe,
          filtre :  filtre,
          datecible :  datees2
        });
      });
  },

  getDataDashboardSuivis: function(req, res)
  {

    var math = require('mathjs');
    var retval = [];

    var dateess = req.param('datedeb',''+new Date().toISOString()).replace(/-/,'/').replace(/-/,'/').substr(0,10);
    var datees2 = req.param('datedeb',''+new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8);
    if(dateess==''){
      dateess = (''+new Date().toISOString()).replace(/-/,'/').replace(/-/,'/').substr(0,10);
      datees2 = (new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8);
    }
    var dossier = req.param('dossier','');
    var dep = req.param('departement','');
    var groupe = req.param('groupe','');
    var filtre = req.param('filtre','1');
    req.session.datechoice = req.param('datedeb',''+new Date().toISOString()).substr(0,10);
    req.session.dossier = dossier;
    req.session.departement = dep;
    req.session.groupe = groupe;
    req.session.filtre = filtre;
    var options = [];
    options.datecible=dateess;
    options.datesess=datees2;
    options.dossier= dossier;
    options.departement= dep;
    options.groupe= groupe;
    options.datecible =new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);



    async.series([
        function(callback){
          LdtService.getListeConnected(options, callback);
        },
        function(callback){
          Ldt.listeConnectedGPAO(options, callback);
        },
        function(callback){
          PointageService.getCongeParDate(options, callback);
        },
        function(callback){
          Ldt.listeConnectedPointage(options, callback);
        },
        function(callback){
          Ldt.dossierAlmConnectedByDate(options, callback);
        },

        function(callback){// list retard
          Pointage.retard(options, callback);
        },
        function(callback){// list present
          Pointage.presence(options, callback);
        },
        function(callback){// list present
          Pointage.listPersonnel(options, callback);
        },
        function(callback){
          Ldt.dossierClassConnectedByDate(options, callback)
        },
        function(callback){// list present
          Pointage.statusPersonnel(options, callback);
        }
      ],
      function(err, results) {
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        //traitement des donnees
        var listePConnected = results[0];
        var listeinLdtConnected = results[1];
        var listeConge = results[2];
        //console.log(results[1]);

        return res.json({
          listePersonneConnected :  listePConnected,
          listeinLdtConnected :  listeinLdtConnected,
          listeinPtConnected :  results[3],
          statusPers :  results[9],
          dossAl :  results[4],
          dossCl :  results[8],
          retard :  results[5],
          present :  results[6],
          pers :  results[7],
          listeConge : listeConge,
          dossier :  dossier
        });
      });
  },


  dashAdmin: function (req, res) {
    ////console.log(id.idClient);
    if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    return res.view("pages/dashTDB",{menu : menu,layout : false});
  },

  grapheSuivis: function (req, res) {

    var dateess = req.param('datedeb',''+new Date().toISOString()).replace(/-/,'/').replace(/-/,'/').substr(0,10);
    var datees2 = req.param('datedeb',''+new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8);
    var rt = false;

    if(dateess==''+(new Date().toISOString()).replace(/-/,'/').replace(/-/,'/').substr(0,10)){
      rt = true;
    }
    if(dateess==''){
      dateess = (''+new Date().toISOString()).replace(/-/,'/').replace(/-/,'/').substr(0,10);
      datees2 = (new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8);
    }
    var dossier = req.param('dossier','');
    var dep = req.param('departement','');
    var equipe = req.param('equipe','');
    var groupe = req.param('groupe','');
    var filtre = req.param('filtre','1');
    var options = [];
    options.datecible=dateess;
    options.datesess=datees2;
    options.dossier= dossier;
    options.departement= dep;
    options.groupe= groupe;
    options.equipe= equipe;



    async.series([
        function(callback){
          LdtService.getListeConnected(options, callback);
        },
        function(callback){
          LdtService.getHeureLdt(options, callback);
        },
        function(callback){
          PointageService.getCongeParDate(options, callback);
        }
      ],
      function(err, results) {
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        //traitement des donnees
        var listePConnected = results[0];
        var listeinLdtConnected = results[1];
        var listeConge = results[2];
        return res.view("pages/ajax/graphe_suivis_op",{
          layout : false,
          listePersonneConnected :  listePConnected,
          listeinLdtConnected :  listeinLdtConnected,
          listeConge : listeConge,
          dossier :  dossier,
          dep :  dep,
          groupe :  groupe,
          filtre :  filtre,
          datecible :  datees2,
          realtime :  rt
        });
      });

  },
};

