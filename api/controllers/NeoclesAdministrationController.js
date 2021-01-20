/**
 * NeoclesAdministrationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const NeoclesAdministration = require("../models/NeoclesAdministration");

module.exports = {

  index : function(req, res){
     //-Affichage du view principale
     if (!req.session.user) return res.redirect('/login');
     var menu = [];
     menu["aceuil"]= "selected";
     menu["dossierAdmin"]= "";
     menu["gestionDossier"]= "";
     menu["statOpAdmin"]= "";
     menu["presence"]= "";
     menu["admin"]= "";
     
    return res.view('pages/neocles/administration/userSetting', {
      layout:false, 
      menu : menu
    });

  },

  getNiveau : function(req, res)
  {
    async.series([
      function (callback) {
        NeoclesAdministration.getAllNiveau(callback);
      }
    ],
    function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));
    })
  },

  getSuscribed : function(req, res)
  {
    async.series([
      function (callback) {
        NeoclesAdministration.getUserSucribed(callback);
      }
    ],
    function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));
    })
  },

  getNotSuscribed : function(req, res)
  {
    async.series([
      function (callback) {
        NeoclesAdministration.getUserNotSucribed(callback);
      }
    ],
    function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));
    })
  },

  insertNiveau : function(req, res){
    let param = req.allParams();

    let id_pers = 0;
    let id_niveau = 0;
    if(param.id_pers) id_pers = parseInt(param.id_pers);
    if(param.niveau) id_niveau = parseInt(param.niveau);

    async.series([
      function (callback) {
        NeoclesAdministration.insertNeoPersNiveau(id_pers, id_niveau, param.date, callback);
      }
    ],
    function (err) {
      if (err) return res.send("Erreur de requete");
      return res.ok();
    })
  }
};

