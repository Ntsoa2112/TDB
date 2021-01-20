/**
 * NeoclesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Neocles = require("../models/Neocles");

module.exports = {
  
  getUserList: function(req, res)
  {
    async.series([
      function (callback) {
        var options = [];
        Neocles.getListUsers(options,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retourne de la liste des TC sn JSON
    })
  },

  indexNotationAppel : function (req,res) {

    //-Affichage du view principale
    if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    async.series([
      function (callback) {
        let option = [];
        option.id_type_masque = 1;
        Neocles.getColonne(option,callback);
      }
    ],function (err,result) {
      return res.view('pages/neocles/appel/ecoute', {
        layout:false, 
        menu : menu, 
        det_notation : result[0], 
        id_hidden_categorie : 0, 
        id_type_ecoute : 1,
        source : '/neocles-notation-appel',
        title_notation : "NOTATION APPEL"
      });
    });
  },

  indexNotationMailTicket : function (req,res) {

    //-Affichage du view principale
    if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    async.series([
      function (callback) {
        let option = [];
        option.id_type_masque = 2;
        Neocles.getColonne(option,callback);
      }
    ],function (err,result) {
      return res.view('pages/neocles/appel/ecoute', {
        layout:false, 
        menu : menu, 
        det_notation : result[0], 
        id_hidden_categorie : 4, 
        id_type_ecoute : 2,
        source : '/neocles-notation-mail-ticket',
        title_notation : "NOTATION TICKET MAIL"
      });
    });
  },

  indexNotationMailAppel : function (req,res) {

    //-Affichage du view principale
    if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    async.series([
      function (callback) {
        let option = [];
        option.id_type_masque = 2;
        Neocles.getColonne(option,callback);
      }
    ],
    function (err,result) {
      return res.view('pages/neocles/appel/ecoute', {
        layout:false, 
        menu : menu, 
        det_notation : result[0], 
        id_hidden_categorie : 3, 
        id_type_ecoute : 2,
        source : '/neocles-notation-mail-appel',
        title_notation : "NOTATION TICKET APPEL"
      });
    });
  },

  indexListeEcoute : function (req,res) {

    //-Affichage du view principale
    if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    return res.view('pages/neocles/appel/liste_ecoute', {layout:false, menu : menu});
  },

  addNotationAppel : function(req, res){
    //insertion ecoute
    if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    if(!req.allParams().tc_select) return res.redirect('/neocles-notation-appel');

    async.series([
      function (callback) {
        return Neocles.addNotation(req, req.allParams().id_type_ecoute, callback);
      }
    ],
    function (err, result) {
      let params = req.allParams();

      return res.redirect(req.allParams().source);
    });
  },

  updateNotationAppel : function(req, res){
    //update ecoute
    if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    let id = parseInt(req.allParams().id_ecoute);
    if(id <= 0) return res.redirect('/neocles-list-ecoute');

    let type_ecoute = 0;
    async.waterfall([
      function(callback){
        return Neocles.getEcouteById(id, callback);
      },
      function (ecoute, callback) {
        type_ecoute = ecoute.id_type_ecoute;
        return Neocles.updateNotation(req, ecoute.id_type_ecoute, callback);
      }
    ],
    function (err, result) {
      let params = req.allParams();

      return res.redirect('/neocles-list-ecoute' + '?id=' + params.tc_select + '&type=' + type_ecoute + '&date=' + params.date_enregistrement);
    });
  },

  getDetails : function(req, res){
    async.series([
      function (callback) {
        let param = req.allParams();

        //Neocles.getEcouteMensuelle(param.id, param.id_ecoute, param.date, callback);
        Neocles.getDetailsUser(param.id, param.id_ecoute, param.date, callback);
      }
    ],
    function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));
    })
  },

  getListEcoute : function(req, res){
    let id_pers = req.param("id", 0);
    let id_type = req.param("id_type_masque", 1);
    let date = req.param("date", "");

    async.series([function (callback) {
          Neocles.getEcouteMensuelleWithNoteWithColonne(id_pers, id_type , date, callback);
        }], 

      function (err, results) {

        var data = results[0];
        return res.view('pages/neocles/appel/liste_ecoute_ajax', {datas: data, layout: null
      });

    });
  },

  editEcoute : function(req, res){
    //insertion ecoute
    if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    let options = req.param("id", null);
    let idEcoute = parseInt(options);
    if(idEcoute <= 0) return res.badRequest();

    async.waterfall([
        
        function (callback) {
          return Neocles.getEcouteById(idEcoute, callback);
        },

        function(ecoute, callback){
          Neocles.getValeurColonnes(ecoute.id_pers, ecoute.id, function(err, notes){
            if(err) return callback(err);
            return callback(null, ecoute, notes);
          });
        },

        function(ecoute, notes, callback){
          Neocles.getColonne({id_type_masque : ecoute.id_type_ecoute}, function(err, colonnes){
            if(err) return callback(err);
            
            return callback(null, ecoute, notes, colonnes)
          });
        }
      ], 

      function (err, ecoute, notes, colonnes) {
        if(err) return res.badRequest();
        
        //formatter notes en clé valeur
        let noteFormatted = {};
        
        notes.forEach(element => {
          noteFormatted[element.id_colonne] = element;
        });

        return res.view('pages/neocles/appel/edit_ecoute', {
          layout:false, 
          menu : menu, 
          ecoute : ecoute, 
          notes: noteFormatted, 
          det_notation:colonnes, 
          id_hidden_categorie : ecoute.id_hidden_categorie, 
          id_type_ecoute : ecoute.id
        });
    });
  },

  //fonction pour les test unitaires
  test : function(req, res){
    async.series([
      function (callback) {
        let param = req.allParams();

        
        //Neocles.getValeurColonnes(866, 43, callback);
        Neocles.getEcouteMensuelleWithNoteWithColonne(866, 1, '2021/01/05', callback);
      }
    ],
    function (err,result) {
      if (err) return res.send("Erreur de requete");

      console.log(result);

      return res.ok(JSON.stringify(result[0]));
    })
  }

};

