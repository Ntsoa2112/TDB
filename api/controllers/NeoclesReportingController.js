/**
 * NeoclesReportingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Neocles = require("../models/Neocles");
const NeoclesReporting = require("../models/NeoclesReporting");

module.exports = { 
    
    getEquipeList: function(req, res)
    {
      async.series([
        function (callback) {
          var options = [];
          Neocles.getListEquipe(options,callback);
        }
      ],function (err,result) {
        if (err) return res.send("Erreur de requete");
        return res.ok(JSON.stringify(result[0]));//retourne de la liste des TC sn JSON
      })
    },
  
    getTypeList: function(req, res)
    {
      async.series([
        function (callback) {
          var options = [];
          Neocles.getListTypes(options, callback);
        }
      ],function (err,result) {
        if (err) return res.send("Erreur de requete");
        return res.ok(JSON.stringify(result[0]));
      })
    },

    indexReportingIndivuduel : function(req, res){
        if (!req.session.user) return res.redirect('/login');
        var menu = [];
        menu["aceuil"]= "selected";
        menu["dossierAdmin"]= "";
        menu["gestionDossier"]= "";
        menu["statOpAdmin"]= "";
        menu["presence"]= "";
        menu["admin"]= "";
        
        return res.view('pages/neocles/reporting/individuel', {layout : false, menu : menu});
    },
    
    indexReportingEquipe : function(req, res){
        if (!req.session.user) return res.redirect('/login');
        var menu = [];
        menu["aceuil"]= "selected";
        menu["dossierAdmin"]= "";
        menu["gestionDossier"]= "";
        menu["statOpAdmin"]= "";
        menu["presence"]= "";
        menu["admin"]= "";
        
        return res.view('pages/neocles/reporting/par_equipe', {layout : false, menu : menu});
    },

    getListEcoute : function(req, res){
        let id_pers = req.param("id", 0);
        let id_type = req.param("id_type_masque", 1);
        let date = req.param("date", "");

        if(req.session.isFormateur == false) id_pers = req.session.user;

        async.series([
            function (callback) {
                Neocles.getEcouteMensuelleWithNoteWithColonne(id_pers, id_type , date, callback);
            }
        ], 
        function (err, results) {
            if (err) return res.send("Erreur de requete");

            return res.ok(JSON.stringify(results[0]));
        });
    },

    //conformité individuel mensuelle
    getConformiteData : function(req, res){
        let id_pers = req.param("id", 0);
        let id_type = req.param("id_type_masque", 1);
        let date = req.param("date", "");

        if(req.session.isFormateur == false) id_pers = req.session.user;

        async.series([
            function (callback) {
                NeoclesReporting.getConformiteMensuelle(id_pers, id_type , date, callback);
            }
        ], 
        function (err, results) {
            if (err) return res.send("Erreur de requete");

            return res.ok(JSON.stringify(results[0]));
        });
    },

    getConformiteParEquipe : function(req, res){
        let id_equipe = req.param("id", 0);
        let id_type = req.param("id_type_masque", 1);
        let date = req.param("date", "");


        async.series([
            function (callback) {
                NeoclesReporting.getConformiteParEquipeMensuelle(id_equipe, id_type , date, callback);
            }
        ], 
        function (err, results) {
            if (err) return res.send("Erreur de requete");

            return res.ok(JSON.stringify(results[0]));
        });
    }

};

