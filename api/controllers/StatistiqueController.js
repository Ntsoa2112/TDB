/**
 * StatistiqueController
 *
 * @description :: Server-side logic for managing Statistiques
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /*
  * Fonction pour afficher la page principale du statisique du masque Almerys call
  * */

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
    var id_ecoute = req.param("id");
    var conforme = req.param("conforme",true);
    return res.view('pages/masque/ae/statistique',{layout:false,menu : menu,id_ecoute:id_ecoute, conforme : conforme});
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
    var id_ecoute = req.param("id");
    var conforme = req.param("conforme",true);
    return res.view('pages/masque/tpmep/statistiqueTpmep',{layout:false,menu : menu,id_ecoute:id_ecoute, conforme : conforme});
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
    var id_ecoute = req.param("id");
    var conforme = req.param("conforme",true);
    return res.view('pages/masque/codelis/statistiqueCodelis',{layout:false,menu : menu,id_ecoute:id_ecoute, conforme : conforme});
  },

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
    var id_ecoute = req.param("id");
    var conforme = req.param("conforme",true);
    return res.view('pages/masque/as/statistiqueAS',{layout:false,menu : menu,id_ecoute:id_ecoute, conforme : conforme});
  },

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
    var id_ecoute = req.param("id");
    var conforme = req.param("conforme",true);
    return res.view('pages/masque/doctocare/statistiqueDoctocare',{layout:false,menu : menu,id_ecoute:id_ecoute, conforme : conforme});
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
    var id_ecoute = req.param("id");
    var conforme = req.param("conforme",true);
    return res.view('pages/masque/briant/statistiqueBriant',{layout:false,menu : menu,id_ecoute:id_ecoute, conforme : conforme});
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
    var id_ecoute = req.param("id");
    var conforme = req.param("conforme",true);
    return res.view('pages/masque/briant_as/statistiqueBriantAs',{layout:false,menu : menu,id_ecoute:id_ecoute, conforme : conforme});
  },

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
    var id_ecoute = req.param("id");
    var conforme = req.param("conforme",true);
    return res.view('pages/masque/eole/statistiqueEole',{layout:false,menu : menu,id_ecoute:id_ecoute, conforme : conforme});
  },

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
    var id_ecoute = req.param("id");
    var conforme = req.param("conforme",true);
    return res.view('pages/masque/iso_eole/statistiqueIsoEole',{layout:false,menu : menu,id_ecoute:id_ecoute, conforme : conforme});
  },

  indexSuiviCQ : function (req,res) {
    //-Affichage du view principale
    if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    var id_ecoute = req.param("id");
    var conforme = req.param("conforme",true);
    return res.view('pages/masque/iso_eole/statistiqueSuiviCQ',{layout:false,menu : menu,id_ecoute:id_ecoute, conforme : conforme});
  },

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
    var id_ecoute = req.param("id");
    var conforme = req.param("conforme",true);
    return res.view('pages/masque/css/statistiqueCss',{layout:false,menu : menu,id_ecoute:id_ecoute, conforme : conforme});
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
    var id_ecoute = req.param("id");
    var conforme = req.param("conforme",true);
    return res.view('pages/masque/lamie/statistiqueLamie',{layout:false,menu : menu,id_ecoute:id_ecoute, conforme : conforme});
  },

  import : function (req,res) {
    //-Affichage du view principale
    if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    return res.view('pages/masque/import',{layout:false,menu : menu});
  },


  /*
  * Fonction de recuperation des liste des TC
  * */

  getLsTC : function (req,res) {
    /*
    * Recuperation des Listes TC dans la base via Le Model Statistique
    * */
    var sql  = req.param("sql");
    async.series([
      function (callback) {
        Statistique.getLsTC(sql,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun de la liste des TC sn JSON
    })
  },

  getLsTCDoctocare : function (req,res) {
    /*
    * Recuperation des Listes TC dans la base via Le Model Statistique
    * */
    var sql  = req.param("sql");
    async.series([
      function (callback) {
        Statistique.getLsTCDoctocare(sql,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun de la liste des TC sn JSON
    })
  },

  getLsTCBriant : function (req,res) {
    /*
    * Recuperation des Listes TC dans la base via Le Model Statistique
    * */
    var sql  = req.param("sql");
    async.series([
      function (callback) {
        Statistique.getLsTCBriant(sql,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun de la liste des TC sn JSON
    })
  },

   getLsCE : function (req,res) {
    /*
    * Recuperation des Listes CE dans la base via Le Model Statistique
    * */
    var sql  = req.param("sql");

    async.series([
      function (callback) {
        Statistique.getLSCE(sql,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun de la liste des TC sn JSON
    })
  },

  getLSSQ : function (req,res) {
    /*
    * Recuperation des Listes CE dans la base via Le Model Statistique
    * */
    var sql4  = req.param("sql");

    async.series([
      function (callback) {
        Statistique.getLSSQ(sql4,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun de la liste des TC sn JSON
    })
  },

   getLsVague : function (req,res) {
    /*
    * Recuperation des Listes de Vague dans la base via Le Model Statistique
    * */

    var sql  = req.param("sql");
    async.series([
      function (callback) {
        Statistique.getLSVague(sql,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun de la liste des TC sn JSON
    })
  },

  /*
  * Fonction pour recuperer les information complete des TC
  * Parametre
  * id_pers
  * */
  getProfile :function (req,res) {
    var id_pers = req.param("id_pers");
    async.series([
      function (callback) {
        Statistique.getProfile(id_pers,callback);
      },function (callback) {
        Photo.find({id_pers : id_pers}, function(err, resultat){

          if(err || resultat[0] == undefined) return callback(null);

          var imageToShow = ImageService.toBase64String(resultat[0].photo);;
          return callback(null,imageToShow);

        });
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify({pr:result[0],ph:result[1]}));//retun des informations compete du en JSON
    })
  },

  getDateNow : function (req,res){
    async.series([
      function (callback) {
        Statistique.getDateNow(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(result[0]);//retun des categorie du en JSON
    })
  },


  getProfileCRC :function (req,res) {
    var id_pers = req.param("id_pers");
    async.series([
      function (callback) {
        Statistique.getProfileCRC(id_pers,callback);
      },function (callback) {
        Photo.find({id_pers : id_pers}, function(err, resultat){

          if(err || resultat[0] == undefined) return callback(null);

          var imageToShow = ImageService.toBase64String(resultat[0].photo);;
          return callback(null,imageToShow);

        });
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify({pr:result[0],ph:result[1]}));//retun des informations compete du en JSON
    })
  },

  /*
  * Fonction pour recharger les Categories et les notations
  * */

  getDataTemplate : function (req,res){
    async.series([
      function (callback) {
        Statistique.getDataTemplate(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getDataTemplateCodelis : function (req,res){
    async.series([
      function (callback) {
        Statistique.getDataTemplateCodelis(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },
  
  getDataTemplateDoctocare : function (req,res){
    async.series([
      function (callback) {
        Statistique.getDataTemplateDoctocare(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getDataTemplateTpmep : function (req,res){
    async.series([
      function (callback) {
        Statistique.getDataTemplateTpmep(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },
  
  getDataTemplateBriant : function (req,res){
    async.series([
      function (callback) {
        Statistique.getDataTemplateBriant(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getDataTemplateBriantAs : function (req,res){
    async.series([
      function (callback) {
        Statistique.getDataTemplateBriantAs(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getDataTemplateAS : function (req,res){
    async.series([
      function (callback) {
        Statistique.getDataTemplateAS(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getDataTemplateIsoEole : function (req,res){
    async.series([
      function (callback) {
        Statistique.getDataTemplateIsoEole(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getDataTemplateCss : function (req,res){
    async.series([
      function (callback) {
        Statistique.getDataTemplateCss(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getDataTemplateLamie : function (req,res){
    async.series([
      function (callback) {
        Statistique.getDataTemplateLamie(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getDataTemplateClientEole : function (req,res){
    async.series([
      function (callback) {
        Statistique.getDataTemplateClientEole(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },
  /*
  * Fonction pour recharger la liste des ecoutes
  * */

  getEcoute : function (req,res){
    var option = [];
    option.id_pers = req.param("id_pers");
    option.date_deb = req.param("date_deb");
    option.date_fin = req.param("date_fin");
    async.series([
      function (callback) {
        Statistique.getEcoute(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getEcouteCodelis : function (req,res){
    var option = [];
    option.id_pers = req.param("id_pers");
    option.date_deb = req.param("date_deb");
    option.date_fin = req.param("date_fin");
    async.series([
      function (callback) {
        Statistique.getEcouteCodelis(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getEcouteDoctocare : function (req,res){
    var option = [];
    option.id_pers = req.param("id_pers");
    option.date_deb = req.param("date_deb");
    option.date_fin = req.param("date_fin");
    async.series([
      function (callback) {
        Statistique.getEcouteDoctocare(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getEcouteTpmep : function (req,res){
    var option = [];
    option.id_pers = req.param("id_pers");
    option.date_deb = req.param("date_deb");
    option.date_fin = req.param("date_fin");
    async.series([
      function (callback) {
        Statistique.getEcouteTpmep(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getEcouteBriant : function (req,res){
    var option = [];
    option.id_pers = req.param("id_pers");
    option.date_deb = req.param("date_deb");
    option.date_fin = req.param("date_fin");
    async.series([
      function (callback) {
        Statistique.getEcouteBriant(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getEcouteBriantAs : function (req,res){
    var option = [];
    option.id_pers = req.param("id_pers");
    option.date_deb = req.param("date_deb");
    option.date_fin = req.param("date_fin");
    async.series([
      function (callback) {
        Statistique.getEcouteBriantAs(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getEcouteAS : function (req,res){
    var option = [];
    option.id_pers = req.param("id_pers");
    option.date_deb = req.param("date_deb");
    option.date_fin = req.param("date_fin");
    async.series([
      function (callback) {
        Statistique.getEcouteAS(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },
  // getEcouteEole
  getEcouteEole : function (req,res){
    var option = [];
    option.id_pers = req.param("id_pers");
    option.date_deb = req.param("date_deb");
    option.date_fin = req.param("date_fin");
    async.series([
      function (callback) {
        Statistique.getEcouteEole(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getEcouteIsoEole : function (req,res){
    var option = [];
    option.id_pers = req.param("id_pers");
    option.date_deb = req.param("date_deb");
    option.date_fin = req.param("date_fin");
    async.series([
      function (callback) {
        Statistique.getEcouteIsoEole(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getEcouteCss : function (req,res){
    var option = [];
    option.id_pers = req.param("id_pers");
    option.date_deb = req.param("date_deb");
    option.date_fin = req.param("date_fin");
    async.series([
      function (callback) {
        Statistique.getEcouteCss(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getEcouteLamie : function (req,res){
    var option = [];
    option.id_pers = req.param("id_pers");
    option.date_deb = req.param("date_deb");
    option.date_fin = req.param("date_fin");
    async.series([
      function (callback) {
        Statistique.getEcouteLamie(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getEcouteAll : function (req,res){
    var option = [];

    option.sql_ce = req.param("sql_ce");
    option.sql_vg = req.param("sql_vg");
    option.date_deb = req.param("date_deb");
    option.date_fin = req.param("date_fin");
    async.series([
      function (callback) {
        Statistique.getEcouteAll(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getEcouteAllCodelis : function (req,res){
    var option = [];

    option.sql_ce = req.param("sql_ce");
    option.sql_vg = req.param("sql_vg");
    option.date_deb = req.param("date_deb");
    option.date_fin = req.param("date_fin");
    async.series([
      function (callback) {
        Statistique.getEcouteAllCodelis(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getEcouteAllAS : function (req,res){
    var option = [];
    console.log("TEST");
    option.sql_ce = req.param("sql_ce");
    option.sql_vg = req.param("sql_vg");
    option.date_deb = req.param("date_deb");
    option.date_fin = req.param("date_fin");
    async.series([
      function (callback) {
        Statistique.getEcouteAllAS(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getEcouteAllDoctocare : function (req,res){
    var option = [];

    option.sql_ce = req.param("sql_ce");
    option.sql_vg = req.param("sql_vg");
    option.date_deb = req.param("date_deb");
    option.date_fin = req.param("date_fin");
    async.series([
      function (callback) {
        Statistique.getEcouteAllDoctocare(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getEcouteAllTpmep : function (req,res){
    var option = [];

    option.sql_ce = req.param("sql_ce");
    option.sql_vg = req.param("sql_vg");
    option.date_deb = req.param("date_deb");
    option.date_fin = req.param("date_fin");
    async.series([
      function (callback) {
        Statistique.getEcouteAllTpmep(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getEcouteAllBriant : function (req,res){
    var option = [];

    option.sql_ce = req.param("sql_ce");
    option.sql_vg = req.param("sql_vg");
    option.date_deb = req.param("date_deb");
    option.date_fin = req.param("date_fin");
    async.series([
      function (callback) {
        Statistique.getEcouteAllBriant(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getEcouteAllBriantAs : function (req,res){
    var option = [];

    option.sql_ce = req.param("sql_ce");
    option.sql_vg = req.param("sql_vg");
    option.date_deb = req.param("date_deb");
    option.date_fin = req.param("date_fin");
    async.series([
      function (callback) {
        Statistique.getEcouteAllBriantAs(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  /*
  * Fonction pour recharger la liste des notes
  * */

  getDataNotation : function (req,res){
    var option = [];
    option.id = req.param("id");
    async.series([
      function (callback) {
        Statistique.getDataNotation(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des notation du en JSON
    })
  },

  getDataCodelisNotation : function (req,res){
    var option = [];
    option.id = req.param("id");
    async.series([
      function (callback) {
        Statistique.getDataCodelisNotation(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des notation du en JSON
    })
  },

  getDataDoctocareNotation : function (req,res){
    var option = [];
    option.id = req.param("id");
    async.series([
      function (callback) {
        Statistique.getDataDoctocareNotation(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des notation du en JSON
    })
  },

  getDataDoctocareSatisfaitProcedure : function (req,res){
    var option = [];
    option.id = req.param("id");
    async.series([
      function (callback) {
        Statistique.getDataDoctocareSatisfaitProcedure(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des notation du en JSON
    })
  },

  getDataBriantNotation : function (req,res){
    var option = [];
    option.id = req.param("id");
    async.series([
      function (callback) {
        Statistique.getDataBriantNotation(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des notation du en JSON
    })
  },

  getDataBriantAsNotation : function (req,res){
    var option = [];
    option.id = req.param("id");
    async.series([
      function (callback) {
        Statistique.getDataBriantAsNotation(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des notation du en JSON
    })
  },

  getDataAsNotation : function (req,res){
    var option = [];
    option.id = req.param("id");
    async.series([
      function (callback) {
        Statistique.getDataAsNotation(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des notation du en JSON
    })
  },

  getDataEoleNotation : function (req,res){
    var option = [];
    option.id = req.param("id");
    async.series([
      function (callback) {
        Statistique.getDataEoleNotation(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des notation du en JSON
    })
  },

  getDataIsoEoleNotation : function (req,res){
    var option = [];
    option.id = req.param("id");
    async.series([
      function (callback) {
        Statistique.getDataIsoEoleNotation(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des notation du en JSON
    })
  },

  getDataCssNotation : function (req,res){
    var option = [];
    option.id = req.param("id");
    async.series([
      function (callback) {
        Statistique.getDataCssNotation(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des notation du en JSON
    })
  },

  getDataLamieNotation : function (req,res){
    var option = [];
    option.id = req.param("id");
    async.series([
      function (callback) {
        Statistique.getDataLamieNotation(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des notation du en JSON
    })
  },


  /*
  * Export dans le template Excel
  * */
  ExportEvaluation : function (req, res) {
//recuperation de la library kexcel
    var jkexcel = require('jkexcel');
    var path = require('path');
    //recuperation de la date d'aujourd'hui de format yyyymmjj
    var id_ecoute  = req.param('id_ecoute');
    /* var dateNow = new Date().toISOString().replace(/-/,'').replace(/-/,'').substr(0,8);
     var datePrim = dateNow.substr(0,4)+req.param('mois','01')+'01';
     var dateDer = dateNow.substr(0,4)+req.param('mois','01')+'31';*/


    var option = [];
    option.id = id_ecoute;
    async.series([
        function(callback){
          Statistique.getDataNotation(option,callback);
        },
        function(callback){
          Statistique.getDataEcoute(option,callback);
        }
    ],
      function(err, results) {
        //return res.ok("ok");
        if (err) {
          //console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }else{
          //template path   templates/reporting-almerys.xlsx

          jkexcel.open(path.join('', 'templates/template_grille.xlsx')).then(function(workbook) {

            var col = [];
            //Ponderation
            col[0] = 3;
            //Maitrisé
            col[1] = 5 ;
            //Non Maitrisé
            col[2] = 6;
            //Note
            col[3] = 7;
            //Commentaire
            col[4] = 8;

            var base = workbook.getSheet(0);
            var libConf = "Conforme";
            if(results[1].date_enregistrement!=null){
              if(!results[1].date_enregistrement){
                libConf = "Non nonforme";
              }
            }
            base.setCellValue(2,1,"TC :"+results[1].nom+" "+results[1].prenom);
            base.setCellValue(4,1,"DATE :"+(results[1].date_enregistrement).toString()/*.substr(0,10)*/);
            base.setCellValue(1,3,"Motif de l'appel  :"+results[1].libelle);
            base.setCellValue(40,3,'=SOMME(C7:C39)');
            base.setCellValue(40,7,'=SOMME(G7:G38)');
            base.setCellValue(41,7,'=G40*20/C40');
            base.setCellValue(40,8,''+libConf);

            async.eachSeries(results[0], function (notation, callback) {


              if(notation.note != null){
                var note = 0;
                if(Number(notation.note)!=0){
                  note = notation.note;
                  base.setCellValue(notation.lg_template,col[1],note);
                }else{
                  base.setCellValue(notation.lg_template,col[2],note);
                }
                base.setCellValue(notation.lg_template,col[0],notation.ponderation);
                base.setCellValue(notation.lg_template,col[3],note);
                base.setCellValue(notation.lg_template,col[4],(notation.commentaire || ''));
              }


              // return res.ok("ok");
              callback();
            },function(err){
              if(err) return res.send(err);

              res.setHeader('Content-disposition', 'attachment; filename=Evaluation_masque_call.xlsx');
              res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
              return workbook.pipe(res);

              //return res.ok(JSON.stringify(results[0]));
            });

          });

        }

      });
  },

  /**
   * fonction pour importer des donnees sous forme EXCEL
   * */

  uploadExcel : function (req,res) {

    var jkexcel = require('jkexcel');
    var path = require('path');
    req.file('excel_input').upload({
      dirname: require('path').resolve(sails.config.appPath, 'assets/import')
    },function (err, files) {
      if (err)
        return res.serverError(err);


      jkexcel.open(files[0].fd).then(function(workbook) {

        var lstRow = [7,8,10,11,12,13,15,16,17,19,20,21,22,23,24,25,26,28,29,31,32,33,35,36,37,38,39];
        var id_tc = req.param("id_tc");
        var num_enr = req.param("n_enr");
        var date = req.param("date");
        var id_motif = req.param("id_motif");
        var duration = req.param("duration");
        var deb = new Date();

        /**
         * Insertion dans la table ecoute
         * */

        async.series([
          function(callback){
            Ecoute.create({id_motif:id_motif, id_pers:id_tc, id_pers_ecoute: req.session.user,duree_appel:duration,deb_ecoute :deb.toISOString() ,fin_ecoute:deb.toISOString() , numero_enregistrement : num_enr, conforme : true,date_enregistrement : (new Date(Date.parse(date)).toISOString()) }).exec(function (err, ecouteCreated){
              if (err) { return callback(err); }
              //console.log(' 1 -  ID ecoute created', ecouteCreated.id_ecoute);
              return callback(null,ecouteCreated.id_ecoute);
            });
          },
          function(callback){
            DetailsNotation.find().exec(function (error, detailsFound) {
              ////console.log("2 -  Taille table ==> "+ detailsFound.length);
              return callback(null,detailsFound);
            });
          }
        ],function(err,result){

          if(err) return res.ok(err);
          var base = workbook.getSheet(0);

          /**
           * Insertion pour chaque note
           * */
          async.eachSeries(result[1],function (prime,callback) {

            if(base.getCellValue(prime.lg_template,6)!=null || base.getCellValue(prime.lg_template,5)!=null){
              var note = 0;
              if(base.getCellValue(prime.lg_template,5)!=null){
                note = base.getCellValue(prime.lg_template,5)
              }else{
                note = base.getCellValue(prime.lg_template,6);
              }
              Note.create({id_details_notation:prime.id_details_notation,commentaire:base.getCellValue(prime.lg_template,8),note:note,id_ecoute:result[0]}).exec(function(err,note) {
                if (err) console.log(err);

              });
            }

            callback();
          },function (erreur) {
            return res.redirect("/import");
          })

        });


      });

    });

    /*req.file('excel_input').upload({
     // maxBytes: 10000000
    }),function (err,uploadedFiles) {
      if(err) return res.ok(err);
      if(uploadedFiles.length === 0) return res.ok('No file was uploaded');
      return res.ok("ok");
    }*/

    /*async.series([
      function (callback) {
        req.file('excel_input').upload({
          maxBytes: 10000000
        }),function (err,uploadedFiles,callback) {
          if(err) return callback(null,err);
          if(uploadedFiles.length === 0) return callback(null ,'No file was uploaded');
          return callback(null,uploadedFiles[0].fd);
        }
      }
    ],function (errUpload,result) {
      if(errUpload){
        //console.log(errUpload);
        return res.ok(errUpload);
      }else{
        //console.log(result[0]);
        return res.ok(result[0]);
      }
    })*/
  },

  // function pour la Statistique eole
  getLsUserCRC : function (req,res) {
    var opt = req.allParams();
    async.series([
      function(next){
        Statistique.getLSUserCRC(opt,next);
      }
    ], function(err , sortie) {
      if(err)
        return res.ok('[]');
      else {
        return res.ok(JSON.stringify(sortie[0]));
      }
    })
  },

  getLsVagueCRC : function (req,res) {
    var opt = req.allParams();
    async.series([
      function(next){
        Statistique.getLSVagueCRC(opt,next);
      }
    ], function(err , sortie) {
      if(err)
        return res.ok('[]');
      else {
        return res.ok(JSON.stringify(sortie[0]));
      }
    })
  },

  getLsEquipeCRC : function (req,res) {
    var opt = req.allParams();
    async.series([
      function(next){
        Statistique.getLSCECRC(opt,next);
      }
    ], function(err , sortie) {
      if(err)
        return res.ok('[]');
      else {
        return res.ok(JSON.stringify(sortie[0]));
      }
    })
  },

  getEcouteAllIsoEole : function (req,res){
    var option = req.allParams();
    console.log(option);
    async.series([
      function (callback) {
        Statistique.getEcouteAllIsoEole(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");

      var retour=[];
      retour['resultat']=result[0];
      retour['layout']=false;
      return res.view('pages/masque/iso_eole/listeEcouteTabIsoEole',retour);

      //return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getEcouteAllIsoEoleStat : function (req,res){
    var option = req.allParams();
    console.log(option);
    async.series([
      function (callback) {
        Statistique.getEcouteAllIsoEole(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");

      var retour=[];
      retour['resultat']=result[0];
      retour['layout']=false;
      //return res.view('pages/masque/iso_eole/listeEcouteTabIsoEole',retour);

      return res.ok(JSON.stringify(result[0]));// retun des categorie du en JSON
    })
  },

  getEcouteAllIsoEoleStatCQ : function (req,res){
    var option = req.allParams();
    console.log(option);
    async.series([
      function (callback) {
        Statistique.getEcouteAllIsoEoleCQ(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");

      var retour=[];
      retour['resultat']=result[0];
      retour['layout']=false;
      //return res.view('pages/masque/iso_eole/listeEcouteTabIsoEole',retour);

      return res.ok(JSON.stringify(result[0]));// retun des categorie du en JSON
    })
  },

  getEcouteAllClientEole : function (req,res){
    var option = req.allParams();

    async.series([
      function (callback) {
        Statistique.getEcouteAllClientEole(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getEcouteAllCss : function (req,res){
    var option = req.allParams();
    console.log(option);
    async.series([
      function (callback) {
        Statistique.getEcouteAllCss(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");

      var retour=[];
      retour['resultat']=result[0];
      retour['layout']=false;
      return res.view('pages/masque/css/listeEcouteTabCss',retour);

      //return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getEcouteAllCssStat : function (req,res){
    var option = req.allParams();
    console.log(option);
    async.series([
      function (callback) {
        Statistique.getEcouteAllCss(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");

      var retour=[];
      retour['resultat']=result[0];
      retour['layout']=false;
      //return res.view('pages/masque/iso_eole/listeEcouteTabIsoEole',retour);

      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getEcouteAllLamie : function (req,res){
    var option = req.allParams();
    console.log(option);
    async.series([
      function (callback) {
        Statistique.getEcouteAllLamie(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");

      var retour=[];
      retour['resultat']=result[0];
      retour['layout']=false;
      return res.view('pages/masque/lamie/listeEcouteTabLamie',retour);

      //return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

  getEcouteAllLamieStat : function (req,res){
    var option = req.allParams();
    console.log(option);
    async.series([
      function (callback) {
        Statistique.getEcouteAllLamie(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");

      var retour=[];
      retour['resultat']=result[0];
      retour['layout']=false;
      //return res.view('pages/masque/iso_eole/listeEcouteTabIsoEole',retour);

      return res.ok(JSON.stringify(result[0]));//retun des categorie du en JSON
    })
  },

};
