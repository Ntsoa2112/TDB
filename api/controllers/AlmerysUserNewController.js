/**
 * AlmerysUserNewController
 *
 * @description :: Server-side logic for managing almerysusernews
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /*
   * Fonction pour recuperer la liste des TC + details
   * */
  getListeTCdetails: function(req, res)
  {
    var doct = req.param('is_doctocare',null);
    var briant = req.param('is_briant',null);
    var tpmep = req.param('is_tpmep',null);
    async.series([
      function (callback) {
        var options = [];
        options.is_doctocare = doct;
        options.is_briant = briant;
        options.is_tpmep = tpmep;
        AlmerysUserNew.getListeTC(options,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retourne de la liste des TC sn JSON
    })
  },

  getListeCRCdetails: function(req, res)
  {
    var id_type_call = req.param('id_type_call',null);
    var is_css = req.param('is_css',null);
    var options = [];
    options.id_type_call = id_type_call;
    options.is_css = is_css;
    async.series([
      function (callback) {
        AlmerysUserNew.getListeCRC(options,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retourne de la liste des TC sn JSON
    })
  },

  getListeEtatCQdetails: function(req, res)
  {
    var id_type = req.param('id_type',null);
    var options = [];
    options.id_type = id_type;
    async.series([
      function (callback) {
        AlmerysUserNew.getListeEtatCQ(options,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retourne de la liste des TC sn JSON
    })
  },

  /*
   * Fonction pour recuperer la liste des Numero enregistrement+ details
   * */
  getListeNumeroEnregistrement: function(req, res)
  {
    async.series([
      function (callback) {
        AlmerysUserNew.getListeNumeroEnregistrement(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retourne de la liste des TC sn JSON
    })
  },

    /*
   * Fonction pour recuperer la liste cHEF EQUIPE
   * */
    getListeChefEquipe: function(req, res)
    {
      async.series([
        function (callback) {
          AlmerysUserNew.getListeChefEquipe(null,callback);
        }
      ],function (err,result) {
        if (err) return res.send("Erreur de requete");
        return res.ok(JSON.stringify(result[0]));//retourne de la liste des TC sn JSON
      })
    },

    /*
   * Fonction pour recuperer la liste SQ
   * */
  getListeSq: function(req, res)
  {
    async.series([
      function (callback) {
        AlmerysUserNew.getListeSq(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retourne de la liste des TC sn JSON
    })
  },
  /*
* Fonction pour recuperer la liste SQ
* */
  getListeSqAs: function(req, res)
  {
    async.series([
      function (callback) {
        AlmerysUserNew.getListeSqAs(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retourne de la liste des TC sn JSON
    });
  },


  /*
   * Fonction pour afficher la page accueil
   * */
  indexAS : function (req,res) {
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
        Statistique.getDataTemplateAS(null,callback);
      }
    ],function (err,result) {
      return res.view('pages/masque/as/ecoute_as',{layout:false,menu : menu,det_notation : result[0]});
    })
  },

    /*
   * Fonction pour afficher la page masque doctocare
   * */
  indexDoctocare : function (req,res) {
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
        Statistique.getDataTemplateDoctocare(null,callback);
      }
    ],function (err,result) {
      return res.view('pages/masque/doctocare/ecoute_doctocare',{layout:false,menu : menu,det_notation : result[0]});
    });
  },

  indexBriant : function (req,res) {
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
        Statistique.getDataTemplateBriant(null,callback);
      }
    ],function (err,result) {
      return res.view('pages/masque/briant/ecoute_briant',{layout:false,menu : menu,det_notation : result[0]});
    })
  },

  indexBriantAs : function (req,res) {
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
        Statistique.getDataTemplateBriantAs(null,callback);
      }
    ],function (err,result) {
      return res.view('pages/masque/briant_as/ecoute_briant_as',{layout:false,menu : menu,det_notation : result[0]});
    })
  },

  /*
   * Fonction pour afficher la page accueil
   * */
  indexEole : function (req,res) {
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
        Statistique.getDataTemplateEole(null,callback);
      }
    ],function (err,result) {
      return res.view('pages/masque/eole/ecoute_eole',{layout:false,menu : menu,det_notation : result[0]});
    })
  },

    /*
   * Fonction pour afficher la page accueil
   * */
  indexIsoEole : function (req,res) {
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
        Statistique.getDataTemplateIsoEole(null,callback);
      }
    ],function (err,result) {
      return res.view('pages/masque/iso_eole/ecoute_iso_eole',{layout:false,menu : menu,det_notation : result[0]});
    })
  },

    /*
   * Fonction pour afficher la page accueil
   * */
  indexCss : function (req,res) {
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
        Statistique.getDataTemplateCss(null,callback);
      }
    ],function (err,result) {
      return res.view('pages/masque/css/ecoute_css',{layout:false,menu : menu,det_notation : result[0]});
    })
  },

  indexLamie : function (req,res) {
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
        Statistique.getDataTemplateLamie(null,callback);
      }
    ],function (err,result) {
      return res.view('pages/masque/lamie/ecoute_lamie',{layout:false,menu : menu,det_notation : result[0]});
    })
  },



  index : function (req,res) {
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
        Statistique.getDataTemplate(null,callback);
      }
    ],function (err,result) {
      return res.view('pages/masque/ae/ecoute',{layout:false,menu : menu,det_notation : result[0]});
    })
  },

  indexTpmep : function (req,res) {
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
        Statistique.getDataTemplateTpmep(null,callback);
      }
    ],function (err,result) {
      return res.view('pages/masque/tpmep/ecouteTpmep',{layout:false,menu : menu,det_notation : result[0]});
    })
  },

  indexCodelis : function (req,res) {
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
        Statistique.getDataTemplateCodelis(null,callback);
      }
    ],function (err,result) {
      return res.view('pages/masque/codelis/ecoute_codelis',{layout:false,menu : menu,det_notation : result[0]});
    })
  },

  getPonderation : function(req,res){
    async.series([
      function (callback) {
        DetailsNotation.find().exec(function (error, detailsFound) {
          //console.log("Taille found ==> "+ detailsFound.length);
          return callback(null,detailsFound);
        });
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      //console.log("Result === "+result[0].length);
      var MapPonderation = [];
      var ponderationFound = result[0];
      async.each(ponderationFound,function(ponderationNote,callback){
        MapPonderation[ponderationNote.id_details_notation] = ponderationNote.ponderation;
        //console.log("           ==================> "+MapPonderation[ponderationNote.id_details_notation]);
      })
      return res.ok(JSON.stringify(MapPonderation));//retun ponderation du en JSON
    })
  },

  getListeCALLdetails: function(req, res)
  {
    async.series([
      function (callback) {
        AlmerysUserNew.getListeCALL(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retourne de la liste des TC sn JSON
    })
  },

  getListeTypeEtatCQdetails: function(req, res)
  {
    async.series([
      function (callback) {
        AlmerysUserNew.getListeTypeEtatCQ(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retourne de la liste des TC sn JSON
    })
  },

  getListeMutuelleDetails: function(req, res)
  {
    async.series([
      function (callback) {
        AlmerysUserNew.getListeMutuelle(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retourne de la liste des TC sn JSON
    })
  },
};
