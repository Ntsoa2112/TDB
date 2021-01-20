/**
 * EcouteController
 *
 * @description :: Server-side logic for managing ecoutes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /*
  * Fonction retournant la liste des ecoutes
  */
    getListeEcoute : function (req, res) {
    //if (!req.session.user) return res.redirect('/login')
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    var retour=[];

    async.series([
        function(callback){
          //console.log("3 Async.series ");
          var options = [];
          options.optionDate = ""; //2017-04-14 03:00:00+03
          options.optionDate2 = ""; //2017-04-14 03:00:00+03
          options.optionTc = "";
          options.optionNumero = "";
          options.optionSq = "";
          //console.log("OPTION DATE ====> "+options.optionDate);
          Ecoute.getEcouteParDate(options, callback);
          //console.log("4 Fin ecoute.getEcouteParDate ");
        }],
      function(err, results){
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        //console.log("5 Get data");
        //retour['resultat']=results[0];
        retour['menu']=menu;
        retour['var_excel']=1;
        retour['layout']=false;
        ////console.log(retour);
        //  return
        //console.log("test 3");
        res.view('pages/masque/ae/ListeEcoute',retour);
        //  res.ok(JSON.stringify(results[0]));
      });
  },

  getListeEcouteCodelis : function (req, res) {
    //if (!req.session.user) return res.redirect('/login')
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    var retour=[];

    async.series([
        function(callback){
          //console.log("3 Async.series ");
          var options = [];
          options.optionDate = ""; //2017-04-14 03:00:00+03
          options.optionDate2 = ""; //2017-04-14 03:00:00+03
          options.optionTc = "";
          options.optionNumero = "";
          options.optionSq = "";
          //console.log("OPTION DATE ====> "+options.optionDate);
          Ecoute.getEcouteParDateCodelis(options, callback);
          //console.log("4 Fin ecoute.getEcouteParDate ");
        }],
      function(err, results){
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        retour['menu']=menu;
        retour['var_excel']=1;
        retour['layout']=false;

        res.view('pages/masque/codelis/ListeEcouteCodelis',retour);
        //  res.ok(JSON.stringify(results[0]));
      });
  },

  getListeEcouteAS : function (req, res) {
    //if (!req.session.user) return res.redirect('/login')
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    var retour=[];

    async.series([
        function(callback){
          //console.log("3 Async.series ");
          var options = [];
          options.optionDate = ""; //2017-04-14 03:00:00+03
          options.optionDate2 = ""; //2017-04-14 03:00:00+03
          options.optionTc = "";
          options.optionNumero = "";
          options.optionSq = "";
          options.optionCamp = "";
          //console.log("OPTION DATE ====> "+options.optionDate);
          Ecoute.getEcouteParDateAS(options, callback);
          //console.log("4 Fin ecoute.getEcouteParDate ");
        }],
      function(err, results){
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        //console.log("5 Get data");
        //retour['resultat']=results[0];
        retour['menu']=menu;
        retour['var_excel']=1;
        retour['layout']=false;
        ////console.log(retour);
        //  return
        //console.log("test 3");
        res.view('pages/masque/as/ListeEcouteAS',retour);
        //  res.ok(JSON.stringify(results[0]));
      });
  },

  getListeEcouteDoctocare : function (req, res) {
    //if (!req.session.user) return res.redirect('/login')
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    var retour=[];

    async.series([
        function(callback){
          //console.log("3 Async.series ");
          var options = [];
          options.optionDate = ""; //2017-04-14 03:00:00+03
          options.optionDate2 = ""; //2017-04-14 03:00:00+03
          options.optionTc = "";
          options.optionNumero = "";
          options.optionSq = "";
          options.optionCamp = "";
          //console.log("OPTION DATE ====> "+options.optionDate);
          Ecoute.getEcouteParDateDoctocare(options, callback);
          //console.log("4 Fin ecoute.getEcouteParDate ");
        }],
      function(err, results){
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        //console.log("5 Get data");
        //retour['resultat']=results[0];
        retour['menu']=menu;
        retour['var_excel']=1;
        retour['layout']=false;
        ////console.log(retour);
        //  return
        //console.log("test 3");
        res.view('pages/masque/doctocare/ListeEcouteDoctocare',retour);
        //  res.ok(JSON.stringify(results[0]));
      });
  },

  getListeEcouteTpmep : function (req, res) {
    if (!req.session.user) return res.redirect('/login')
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    var retour=[];

    async.series([
        function(callback){
          //console.log("3 Async.series ");
          var options = [];
          options.optionDate = ""; //2017-04-14 03:00:00+03
          options.optionDate2 = ""; //2017-04-14 03:00:00+03
          options.optionTc = "";
          options.optionNumero = "";
          options.optionSq = "";
          options.optionCamp = "";
          //console.log("OPTION DATE ====> "+options.optionDate);
          Ecoute.getEcouteParDateTpmep(options, callback);
          //console.log("4 Fin ecoute.getEcouteParDate ");
        }],
      function(err, results){
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        retour['menu']=menu;
        retour['var_excel']=1;
        retour['layout']=false;
        ////console.log(retour);
        //  return
        //console.log("test 3");
        res.view('pages/masque/tpmep/ListeEcouteTpmep',retour);
        //  res.ok(JSON.stringify(results[0]));
      });
  },

  getListeEcouteBriant : function (req, res) {
    //if (!req.session.user) return res.redirect('/login')
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    var retour=[];

    async.series([
        function(callback){
          //console.log("3 Async.series ");
          var options = [];
          options.optionDate = ""; //2017-04-14 03:00:00+03
          options.optionDate2 = ""; //2017-04-14 03:00:00+03
          options.optionTc = "";
          options.optionNumero = "";
          options.optionSq = "";
          options.optionCamp = "";
          //console.log("OPTION DATE ====> "+options.optionDate);
          Ecoute.getEcouteParDateBriant(options, callback);
          //console.log("4 Fin ecoute.getEcouteParDate ");
        }],
      function(err, results){
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        //console.log("5 Get data");
        //retour['resultat']=results[0];
        retour['menu']=menu;
        retour['var_excel']=1;
        retour['layout']=false;
        ////console.log(retour);
        //  return
        //console.log("test 3");
        res.view('pages/masque/briant/ListeEcouteBriant',retour);
        //  res.ok(JSON.stringify(results[0]));
      });
  },

  getListeEcouteBriantAs : function (req, res) {
    //if (!req.session.user) return res.redirect('/login')
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    var retour=[];

    async.series([
        function(callback){
          //console.log("3 Async.series ");
          var options = [];
          options.optionDate = ""; //2017-04-14 03:00:00+03
          options.optionDate2 = ""; //2017-04-14 03:00:00+03
          options.optionTc = "";
          options.optionNumero = "";
          options.optionSq = "";
          options.optionCamp = "";
          //console.log("OPTION DATE ====> "+options.optionDate);
          Ecoute.getEcouteParDateBriantAs(options, callback);
          //console.log("4 Fin ecoute.getEcouteParDate ");
        }],
      function(err, results){
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        //console.log("5 Get data");
        //retour['resultat']=results[0];
        retour['menu']=menu;
        retour['var_excel']=1;
        retour['layout']=false;
        ////console.log(retour);
        //  return
        //console.log("test 3");
        res.view('pages/masque/briant_as/ListeEcouteBriantAs',retour);
        //  res.ok(JSON.stringify(results[0]));
      });
  },

   /*
  * Fonction retournant la liste des ecoutes
  */
  getListeEcouteTab: function (req, res) {
    if (!req.session.user) return res.redirect('/login');
    var options = [];
    //console.log("date ecoute"+ req.param('dateEcoute',null));
    //console.log("ID TC"+ req.param('idTc',null));
    //console.log("NUmero enregistrement"+ req.param('numero',null));

    var date_ecoute = ""; // 2017-04-14 03:00:00+03
    var date_ecoute2 = ""; // 2017-04-14 03:00:00+03
    var id_tc = "";
    var numero = "";
    var idEquipe = "";
    var idSq = "";
    
    var conforme = "";

    if(req.param('idTc',null) != null){
      id_tc = req.param('idTc',null);
    }
    if(req.param('numero',null) != null){
      numero = req.param('numero',null);
    }
    if(req.param('idChef',null) != null){
      idEquipe = req.param('idChef',null);
    }
    if(req.param('iqSq',null) != null){
      idSq = req.param('iqSq',null);
    }
    
    if(req.param('conforme',null) != null){
      conforme = req.param('conforme',null);
    }

    if(req.param('dateEcoute',null) != "") {
      //console.log("Date ecoute null");
      //date_ecoute = req.param('dateEcoute',''+new Date().toISOString()) + " 03:00:00+03";  //.replace(/-/,'').replace(/-/,'').substr(0,8)
      date_ecoute = req.param('dateEcoute',null);
      //console.log("date ecoute last= "+ date_ecoute);
      //console.log("Fin");
    }
    if(req.param('dateEcoute2',null) != "") {
      //console.log("Date ecoute null 2");
      //date_ecoute2 = req.param('dateEcoute2',''+new Date().toISOString()) + " 03:00:00+03";  //.replace(/-/,'').replace(/-/,'').substr(0,8)
      date_ecoute2 = req.param('dateEcoute2',null);
      //console.log("date ecoute last= "+ date_ecoute2);
      //console.log("Fin");
    }

    options.optionDate = date_ecoute;
    options.optionDate2 = date_ecoute2;
    options.optionTc = id_tc;
    options.optionNumero = numero;
    options.idChef = idEquipe;
    options.optionSq = idSq;
    options.optionConforme = conforme;

    //console.log("OPTION DATE 1 ====> "+options.optionDate);
    //console.log("OPTION DATE 2 ====> "+options.optionDate2);
    //console.log("date Ecoute= "+ options.dateEcoute);

    async.series([
        function(callback){
          Ecoute.getEcouteParDate(options, callback);
        }],
      function(err, results) {
        if (err) {
          console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        var retour=[];
        retour['resultat']=results[0];
        retour['layout']=false;
        res.view( 'pages/masque/ae/listeEcouteTab', retour);
      });
  },

  getListeEcouteTabCodelis: function (req, res) {
    if (!req.session.user) return res.redirect('/login');
    var options = [];
    var date_ecoute = ""; // 2017-04-14 03:00:00+03
    var date_ecoute2 = ""; // 2017-04-14 03:00:00+03
    var id_tc = "";
    var numero = "";
    var idEquipe = "";
    var idSq = "";
    
    var conforme = "";

    if(req.param('idTc',null) != null){
      id_tc = req.param('idTc',null);
    }
    if(req.param('numero',null) != null){
      numero = req.param('numero',null);
    }
    if(req.param('idChef',null) != null){
      idEquipe = req.param('idChef',null);
    }
    if(req.param('iqSq',null) != null){
      idSq = req.param('iqSq',null);
    }
    
    if(req.param('conforme',null) != null){
      conforme = req.param('conforme',null);
    }

    if(req.param('dateEcoute',null) != "") {date_ecoute = req.param('dateEcoute',null);
    }
    if(req.param('dateEcoute2',null) != "") {date_ecoute2 = req.param('dateEcoute2',null);
    }

    options.optionDate = date_ecoute;
    options.optionDate2 = date_ecoute2;
    options.optionTc = id_tc;
    options.optionNumero = numero;
    options.idChef = idEquipe;
    options.optionSq = idSq;
    options.optionConforme = conforme;
    async.series([
        function(callback){
          Ecoute.getEcouteParDateCodelis(options, callback);
        }],
      function(err, results) {
        if (err) {
          console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        var retour=[];
        retour['resultat']=results[0];
        retour['layout']=false;
        res.view( 'pages/masque/codelis/listeEcouteTabCodelis', retour);
      });
  },

  getListeEcouteTabAS: function (req, res) {
    if (!req.session.user) return res.redirect('/login');
    var options = [];
    //console.log("date ecoute"+ req.param('dateEcoute',null));
    //console.log("ID TC"+ req.param('idTc',null));
    //console.log("NUmero enregistrement"+ req.param('numero',null));

    var date_ecoute = ""; // 2017-04-14 03:00:00+03
    var date_ecoute2 = ""; // 2017-04-14 03:00:00+03
    var id_tc = "";
    var numero = "";
    var idEquipe = "";
    var idSq = "";
    var id_campagne = "";
    
    var conforme = "";

    if(req.param('idTc',null) != null){
      id_tc = req.param('idTc',null);
    }
    if(req.param('numero',null) != null){
      numero = req.param('numero',null);
    }

    if(req.param('camp',null) != null){
      id_campagne = req.param('camp',null);
    }
    if(req.param('idChef',null) != null){
      idEquipe = req.param('idChef',null);
    }
    if(req.param('iqSq',null) != null){
      idSq = req.param('iqSq',null);
    }
    
    if(req.param('conforme',null) != null){
      conforme = req.param('conforme',null);
    }

    if(req.param('dateEcoute',null) != "") {
      //console.log("Date ecoute null");
      //date_ecoute = req.param('dateEcoute',''+new Date().toISOString()) + " 03:00:00+03";  //.replace(/-/,'').replace(/-/,'').substr(0,8)
      date_ecoute = req.param('dateEcoute',null);
      //console.log("date ecoute last= "+ date_ecoute);
      //console.log("Fin");
    }
    if(req.param('dateEcoute2',null) != "") {
      //console.log("Date ecoute null 2");
      //date_ecoute2 = req.param('dateEcoute2',''+new Date().toISOString()) + " 03:00:00+03";  //.replace(/-/,'').replace(/-/,'').substr(0,8)
      date_ecoute2 = req.param('dateEcoute2',null);
      //console.log("date ecoute last= "+ date_ecoute2);
      //console.log("Fin");
    }

    options.optionDate = date_ecoute;
    options.optionDate2 = date_ecoute2;
    options.optionTc = id_tc;
    options.optionNumero = numero;
    options.idChef = idEquipe;
    options.optionSq = idSq;
    options.optionConforme = conforme;
    options.optionCamp = id_campagne;

    sails.log(options);

    //console.log("OPTION DATE 1 ====> "+options.optionDate);
    //console.log("OPTION DATE 2 ====> "+options.optionDate2);
    //console.log("date Ecoute= "+ options.dateEcoute);

    async.series([
        function(callback){
          Ecoute.getEcouteParDateAS(options, callback);
        }],
      function(err, results) {
        if (err) {
          console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        var retour=[];
        retour['resultat']=results[0];
        retour['layout']=false;
        res.view( 'pages/masque/as/listeEcouteTabAS', retour);
      });
  },

  getListeEcouteTabDoctocare: function (req, res) {
    if (!req.session.user) return res.redirect('/login');
    var options = [];
    //console.log("date ecoute"+ req.param('dateEcoute',null));
    //console.log("ID TC"+ req.param('idTc',null));
    //console.log("NUmero enregistrement"+ req.param('numero',null));

    var date_ecoute = ""; // 2017-04-14 03:00:00+03
    var date_ecoute2 = ""; // 2017-04-14 03:00:00+03
    var id_tc = "";
    var numero = "";
    var idEquipe = "";
    var idSq = "";
    var id_campagne = "";
    
    var conforme = "";

    if(req.param('idTc',null) != null){
      id_tc = req.param('idTc',null);
    }
    if(req.param('numero',null) != null){
      numero = req.param('numero',null);
    }

    if(req.param('camp',null) != null){
      id_campagne = req.param('camp',null);
    }
    if(req.param('idChef',null) != null){
      idEquipe = req.param('idChef',null);
    }
    if(req.param('iqSq',null) != null){
      idSq = req.param('iqSq',null);
    }
    
    if(req.param('conforme',null) != null){
      conforme = req.param('conforme',null);
    }

    if(req.param('dateEcoute',null) != "") {
      //console.log("Date ecoute null");
      //date_ecoute = req.param('dateEcoute',''+new Date().toISOString()) + " 03:00:00+03";  //.replace(/-/,'').replace(/-/,'').substr(0,8)
      date_ecoute = req.param('dateEcoute',null);
      //console.log("date ecoute last= "+ date_ecoute);
      //console.log("Fin");
    }
    if(req.param('dateEcoute2',null) != "") {
      //console.log("Date ecoute null 2");
      //date_ecoute2 = req.param('dateEcoute2',''+new Date().toISOString()) + " 03:00:00+03";  //.replace(/-/,'').replace(/-/,'').substr(0,8)
      date_ecoute2 = req.param('dateEcoute2',null);
      //console.log("date ecoute last= "+ date_ecoute2);
      //console.log("Fin");
    }

    options.optionDate = date_ecoute;
    options.optionDate2 = date_ecoute2;
    options.optionTc = id_tc;
    options.optionNumero = numero;
    options.idChef = idEquipe;
    options.optionSq = idSq;
    options.optionConforme = conforme;
    options.optionCamp = id_campagne;

    sails.log(options);

    //console.log("OPTION DATE 1 ====> "+options.optionDate);
    //console.log("OPTION DATE 2 ====> "+options.optionDate2);
    //console.log("date Ecoute= "+ options.dateEcoute);

    async.series([
        function(callback){
          Ecoute.getEcouteParDateDoctocare(options, callback);
        }],
      function(err, results) {
        if (err) {
          console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        var retour=[];
        retour['resultat']=results[0];
        retour['layout']=false;
        res.view( 'pages/masque/doctocare/listeEcouteTabDoctocare', retour);
      });
  },

  getListeEcouteTabTpmep: function (req, res) {
    if (!req.session.user) return res.redirect('/login');
    var options = [];
    
    var date_ecoute = ""; // 2017-04-14 03:00:00+03
    var date_ecoute2 = ""; // 2017-04-14 03:00:00+03
    var id_tc = "";
    var numero = "";
    var idEquipe = "";
    var idSq = "";
    var id_campagne = "";
    
    var conforme = "";

    if(req.param('idTc',null) != null){
      id_tc = req.param('idTc',null);
    }
    if(req.param('numero',null) != null){
      numero = req.param('numero',null);
    }

    if(req.param('camp',null) != null){
      id_campagne = req.param('camp',null);
    }
    if(req.param('idChef',null) != null){
      idEquipe = req.param('idChef',null);
    }
    if(req.param('iqSq',null) != null){
      idSq = req.param('iqSq',null);
    }
    
    if(req.param('conforme',null) != null){
      conforme = req.param('conforme',null);
    }

    if(req.param('dateEcoute',null) != "") {
      date_ecoute = req.param('dateEcoute',null);
    }
    if(req.param('dateEcoute2',null) != "") {
      date_ecoute2 = req.param('dateEcoute2',null);
    }

    options.optionDate = date_ecoute;
    options.optionDate2 = date_ecoute2;
    options.optionTc = id_tc;
    options.optionNumero = numero;
    options.idChef = idEquipe;
    options.optionSq = idSq;
    options.optionConforme = conforme;
    options.optionCamp = id_campagne;

    sails.log(options);

    //console.log("OPTION DATE 1 ====> "+options.optionDate);
    //console.log("OPTION DATE 2 ====> "+options.optionDate2);
    //console.log("date Ecoute= "+ options.dateEcoute);

    async.series([
        function(callback){
          Ecoute.getEcouteParDateTpmep(options, callback);
        }],
      function(err, results) {
        if (err) {
          console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        var retour=[];
        retour['resultat']=results[0];
        retour['layout']=false;
        res.view( 'pages/masque/tpmep/listeEcouteTabTpmep', retour);
      });
  },

  getListeEcouteTabBriant: function (req, res) {
    if (!req.session.user) return res.redirect('/login');
    var options = [];
    //console.log("date ecoute"+ req.param('dateEcoute',null));
    //console.log("ID TC"+ req.param('idTc',null));
    //console.log("NUmero enregistrement"+ req.param('numero',null));

    var date_ecoute = ""; // 2017-04-14 03:00:00+03
    var date_ecoute2 = ""; // 2017-04-14 03:00:00+03
    var id_tc = "";
    var numero = "";
    var idEquipe = "";
    var idSq = "";
    var id_campagne = "";
    
    var conforme = "";

    if(req.param('idTc',null) != null){
      id_tc = req.param('idTc',null);
    }
    if(req.param('numero',null) != null){
      numero = req.param('numero',null);
    }

    if(req.param('camp',null) != null){
      id_campagne = req.param('camp',null);
    }
    if(req.param('idChef',null) != null){
      idEquipe = req.param('idChef',null);
    }
    if(req.param('iqSq',null) != null){
      idSq = req.param('iqSq',null);
    }
    
    if(req.param('conforme',null) != null){
      conforme = req.param('conforme',null);
    }

    if(req.param('dateEcoute',null) != "") {
      //console.log("Date ecoute null");
      //date_ecoute = req.param('dateEcoute',''+new Date().toISOString()) + " 03:00:00+03";  //.replace(/-/,'').replace(/-/,'').substr(0,8)
      date_ecoute = req.param('dateEcoute',null);
      //console.log("date ecoute last= "+ date_ecoute);
      //console.log("Fin");
    }
    if(req.param('dateEcoute2',null) != "") {
      //console.log("Date ecoute null 2");
      //date_ecoute2 = req.param('dateEcoute2',''+new Date().toISOString()) + " 03:00:00+03";  //.replace(/-/,'').replace(/-/,'').substr(0,8)
      date_ecoute2 = req.param('dateEcoute2',null);
      //console.log("date ecoute last= "+ date_ecoute2);
      //console.log("Fin");
    }

    options.optionDate = date_ecoute;
    options.optionDate2 = date_ecoute2;
    options.optionTc = id_tc;
    options.optionNumero = numero;
    options.idChef = idEquipe;
    options.optionSq = idSq;
    options.optionConforme = conforme;
    options.optionCamp = id_campagne;

    sails.log(options);

    //console.log("OPTION DATE 1 ====> "+options.optionDate);
    //console.log("OPTION DATE 2 ====> "+options.optionDate2);
    //console.log("date Ecoute= "+ options.dateEcoute);

    async.series([
        function(callback){
          Ecoute.getEcouteParDateBriant(options, callback);
        }],
      function(err, results) {
        if (err) {
          console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        var retour=[];
        retour['resultat']=results[0];
        retour['layout']=false;
        res.view( 'pages/masque/briant/listeEcouteTabBriant', retour);
      });
  },

  getListeEcouteTabBriantAs: function (req, res) {
    if (!req.session.user) return res.redirect('/login');
    var options = [];
    //console.log("date ecoute"+ req.param('dateEcoute',null));
    //console.log("ID TC"+ req.param('idTc',null));
    //console.log("NUmero enregistrement"+ req.param('numero',null));

    var date_ecoute = ""; // 2017-04-14 03:00:00+03
    var date_ecoute2 = ""; // 2017-04-14 03:00:00+03
    var id_tc = "";
    var numero = "";
    var idEquipe = "";
    var idSq = "";
    var id_campagne = "";
    
    var conforme = "";

    if(req.param('idTc',null) != null){
      id_tc = req.param('idTc',null);
    }
    if(req.param('numero',null) != null){
      numero = req.param('numero',null);
    }

    if(req.param('camp',null) != null){
      id_campagne = req.param('camp',null);
    }
    if(req.param('idChef',null) != null){
      idEquipe = req.param('idChef',null);
    }
    if(req.param('iqSq',null) != null){
      idSq = req.param('iqSq',null);
    }
    
    if(req.param('conforme',null) != null){
      conforme = req.param('conforme',null);
    }

    if(req.param('dateEcoute',null) != "") {
      //console.log("Date ecoute null");
      //date_ecoute = req.param('dateEcoute',''+new Date().toISOString()) + " 03:00:00+03";  //.replace(/-/,'').replace(/-/,'').substr(0,8)
      date_ecoute = req.param('dateEcoute',null);
      //console.log("date ecoute last= "+ date_ecoute);
      //console.log("Fin");
    }
    if(req.param('dateEcoute2',null) != "") {
      //console.log("Date ecoute null 2");
      //date_ecoute2 = req.param('dateEcoute2',''+new Date().toISOString()) + " 03:00:00+03";  //.replace(/-/,'').replace(/-/,'').substr(0,8)
      date_ecoute2 = req.param('dateEcoute2',null);
      //console.log("date ecoute last= "+ date_ecoute2);
      //console.log("Fin");
    }

    options.optionDate = date_ecoute;
    options.optionDate2 = date_ecoute2;
    options.optionTc = id_tc;
    options.optionNumero = numero;
    options.idChef = idEquipe;
    options.optionSq = idSq;
    options.optionConforme = conforme;
    options.optionCamp = id_campagne;

    sails.log(options);

    //console.log("OPTION DATE 1 ====> "+options.optionDate);
    //console.log("OPTION DATE 2 ====> "+options.optionDate2);
    //console.log("date Ecoute= "+ options.dateEcoute);

    async.series([
        function(callback){
          Ecoute.getEcouteParDateBriantAs(options, callback);
        }],
      function(err, results) {
        if (err) {
          console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        var retour=[];
        retour['resultat']=results[0];
        retour['layout']=false;
        res.view( 'pages/masque/briant_as/listeEcouteTabBriantAs', retour);
      });
  },

   /*
  * Fonction get Ecoute by id
  */
  findEcouteByIdUpdate: function(req, res)
  {
    //if (!req.session.user) return res.redirect('/login');
    var id=req.param('id',null);
    var id_pers=req.param('id_pers',null);
    //console.log("RECUP ID ECOUTE ====> " + id);
    //console.log("RECUP ID PERS ====> " + id_pers);

    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    async.series([
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getNoteParEcoute(options, callback);
        /*},
        function (callback) {
          Statistique.getDataTemplate(null,callback);*/
        },
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getBesoinFormationEcoute(options, callback);
        },
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getEcoute(options, callback);
        }
      ],function(err, results) {
        if (err) {
          console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        var retour=[];
        retour['menu']=menu;
        retour['resultatNote']=results[0];
        retour['id_pers_tc']=id_pers;

        return res.view('pages/masque/ae/modifierEcoute2',{layout : false, menu : menu, det_notation : results[0] , id_pers_tc : id_pers, det_formation : results[1] , det_ecoute : results[2] });
      });
  },

  findEcouteByIdUpdateCodelis: function(req, res)
  {
    //if (!req.session.user) return res.redirect('/login');
    var id=req.param('id',null);
    var id_pers=req.param('id_pers',null);
    //console.log("RECUP ID ECOUTE ====> " + id);
    //console.log("RECUP ID PERS ====> " + id_pers);

    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    async.series([
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getNoteParEcouteCodelis(options, callback);
        /*},
        function (callback) {
          Statistique.getDataTemplate(null,callback);*/
        },
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getBesoinFormationEcoute(options, callback);
        },
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getEcoute(options, callback);
        }
      ],function(err, results) {
        if (err) {
          console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        var retour=[];
        retour['menu']=menu;
        retour['resultatNote']=results[0];
        retour['id_pers_tc']=id_pers;

        return res.view('pages/masque/codelis/modifierEcouteCodelis',{layout : false, menu : menu, det_notation : results[0] , id_pers_tc : id_pers, det_formation : results[1] , det_ecoute : results[2] });
      });
  },

  findEcouteByIdUpdateAS: function(req, res)
  {
    //if (!req.session.user) return res.redirect('/login');
    var id=req.param('id',null);
    var id_pers=req.param('id_pers',null);
    //console.log("RECUP ID ECOUTE ====> " + id);
    //console.log("RECUP ID PERS ====> " + id_pers);

    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    async.series([
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getNoteParEcouteAS(options, callback);
        /*},
        function (callback) {
          Statistique.getDataTemplate(null,callback);*/
        },
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getBesoinFormationEcoute(options, callback);
        },
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getEcoute(options, callback);
        }
      ],function(err, results) {
        if (err) {
          console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        var retour=[];
        retour['menu']=menu;
        retour['resultatNote']=results[0];
        retour['id_pers_tc']=id_pers;

        return res.view('pages/masque/as/modifierEcouteAS',{layout : false, menu : menu, det_notation : results[0] , id_pers_tc : id_pers, det_formation : results[1] , det_ecoute : results[2] });
      });
  },

  findEcouteByIdUpdateDoctocare: function(req, res)
  {
    //if (!req.session.user) return res.redirect('/login');
    var id=req.param('id',null);
    var id_pers=req.param('id_pers',null);
    //console.log("RECUP ID ECOUTE ====> " + id);
    //console.log("RECUP ID PERS ====> " + id_pers);

    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    async.series([
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getNoteParEcouteDoctocare(options, callback);
        /*},
        function (callback) {
          Statistique.getDataTemplate(null,callback);*/
        },
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getBesoinFormationEcoute(options, callback);
        },
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getEcoute(options, callback);
        }
      ],function(err, results) {
        if (err) {
          console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        var retour=[];
        retour['menu']=menu;
        retour['resultatNote']=results[0];
        retour['id_pers_tc']=id_pers;

        return res.view('pages/masque/doctocare/modifierEcouteDoctocare',{layout : false, menu : menu, det_notation : results[0] , id_pers_tc : id_pers, det_formation : results[1] , det_ecoute : results[2] });
      });
  },

  findEcouteByIdUpdateTpmep: function(req, res)
  {
    //if (!req.session.user) return res.redirect('/login');
    var id=req.param('id',null);
    var id_pers=req.param('id_pers',null);
    //console.log("RECUP ID ECOUTE ====> " + id);
    //console.log("RECUP ID PERS ====> " + id_pers);

    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    async.series([
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getNoteParEcouteTpmep(options, callback);
        /*},
        function (callback) {
          Statistique.getDataTemplate(null,callback);*/
        },
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getBesoinFormationEcoute(options, callback);
        },
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getEcoute(options, callback);
        }
      ],function(err, results) {
        if (err) {
          console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        var retour=[];
        retour['menu']=menu;
        retour['resultatNote']=results[0];
        retour['id_pers_tc']=id_pers;

        return res.view('pages/masque/tpmep/modifierEcouteTpmep',{layout : false, menu : menu, det_notation : results[0] , id_pers_tc : id_pers, det_formation : results[1] , det_ecoute : results[2] });
      });
  },

  findEcouteByIdUpdateBriant: function(req, res)
  {
    //if (!req.session.user) return res.redirect('/login');
    var id=req.param('id',null);
    var id_pers=req.param('id_pers',null);
    //console.log("RECUP ID ECOUTE ====> " + id);
    //console.log("RECUP ID PERS ====> " + id_pers);

    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    async.series([
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getNoteParEcouteBriant(options, callback);
        /*},
        function (callback) {
          Statistique.getDataTemplate(null,callback);*/
        },
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getBesoinFormationEcoute(options, callback);
        },
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getEcoute(options, callback);
        }
      ],function(err, results) {
        if (err) {
          console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        var retour=[];
        retour['menu']=menu;
        retour['resultatNote']=results[0];
        retour['id_pers_tc']=id_pers;

        return res.view('pages/masque/briant/modifierEcouteBriant',{layout : false, menu : menu, det_notation : results[0] , id_pers_tc : id_pers, det_formation : results[1] , det_ecoute : results[2] });
      });
  },

  findEcouteByIdUpdateBriantAs: function(req, res)
  {
    //if (!req.session.user) return res.redirect('/login');
    var id=req.param('id',null);
    var id_pers=req.param('id_pers',null);
    //console.log("RECUP ID ECOUTE ====> " + id);
    //console.log("RECUP ID PERS ====> " + id_pers);

    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    async.series([
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getNoteParEcouteBriantAs(options, callback);
        /*},
        function (callback) {
          Statistique.getDataTemplate(null,callback);*/
        },
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getBesoinFormationEcoute(options, callback);
        },
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getEcoute(options, callback);
        }
      ],function(err, results) {
        if (err) {
          console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        var retour=[];
        retour['menu']=menu;
        retour['resultatNote']=results[0];
        retour['id_pers_tc']=id_pers;

        return res.view('pages/masque/briant_as/modifierEcouteBriantAs',{layout : false, menu : menu, det_notation : results[0] , id_pers_tc : id_pers, det_formation : results[1] , det_ecoute : results[2] });
      });
  },

 /*
  * Fonction update ecoute
  */
  updateNoteEcoute: function (req, res)
  {
    if (!req.session.user) return res.redirect('/login');
    var params = req.params.all();
    /*//console.log('PARAMS ALL ===> ' + params.id_application);
    //console.log('PARAMS ALL ===> ' + req.param('nomApplication',null));
    //console.log('PARAMS ALL ===> ' + req.param('nom_application',null));
    var id = params.id_application;
    Application.update({id_application: id}, params).exec(function (err, model) {
      if (err) res.send("Error:".err);
      return res.redirect('accueil');
    });*/
  },

  getListeEcouteTabIsoEole : function (req, res) {
    if (!req.session.user) return res.redirect('/login')
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    var retour=[];

    var options = [];

    var date_ecoute = ""; // 2017-04-14 03:00:00+03
    var date_ecoute2 = ""; // 2017-04-14 03:00:00+03
    var id_tc = "";
    var numero = "";
    var idEquipe = "";
    var idSq = "";
    var id_campagne = "";
    
    var conforme = "";
    if(req.param('idTc',null) != null){
      id_tc = req.param('idTc',null);
    }
    if(req.param('numero',null) != null){
      numero = req.param('numero',null);
    }
    if(req.param('camp',null) != null){
      id_campagne = req.param('camp',null);
    }
    if(req.param('idChef',null) != null){
      idEquipe = req.param('idChef',null);
    }
    if(req.param('iqSq',null) != null){
      idSq = req.param('iqSq',null);
    }
    if(req.param('conforme',null) != null){
      conforme = req.param('conforme',null);
    }
    if(req.param('dateEcoute',null) != "") {
      date_ecoute = req.param('dateEcoute',null);
    }
    if(req.param('dateEcoute2',null) != "") {
      date_ecoute2 = req.param('dateEcoute2',null);
    }

    options.optionDate = date_ecoute;
    options.optionDate2 = date_ecoute2;
    options.optionTc = id_tc;
    options.optionNumero = numero;
    options.idChef = idEquipe;
    options.optionSq = idSq;
    options.optionConforme = conforme;
    options.optionCamp = id_campagne;

    sails.log(options);

    async.series([
        function(callback){
          Ecoute.getEcouteParDateIsoEole(options, callback);
          //console.log("4 Fin ecoute.getEcouteParDate ");
        }],
      function(err, results){
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        var retour=[];
        retour['resultat']=results[0];
        retour['layout']=false;
        res.view('pages/masque/iso_eole/listeEcouteTabIsoEole',retour);
      });
  },

  getListeEcouteIsoEole : function (req, res) {
    //if (!req.session.user) return res.redirect('/login')
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    var retour=[];

    async.series([
        function(callback){
          //console.log("3 Async.series ");
          var options = [];
          options.optionDate = "";
          //console.log("OPTION DATE ====> "+options.optionDate);
          Ecoute.getEcouteParDateIsoEole(options, callback);
          //console.log("4 Fin ecoute.getEcouteParDate ");
        }],
      function(err, results){
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        retour['menu']=menu;
        retour['var_excel']=1;
        retour['layout']=false;
        res.view('pages/masque/iso_eole/ListeEcouteIsoEole',retour);
      });
  },


  getListeEcouteTabCss : function (req, res) {
    if (!req.session.user) return res.redirect('/login')
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    var retour=[];

    var options = [];

    var date_ecoute = ""; // 2017-04-14 03:00:00+03
    var date_ecoute2 = ""; // 2017-04-14 03:00:00+03
    var id_tc = "";
    var numero = "";
    var idEquipe = "";
    var idSq = "";
    var id_campagne = "";
    
    var conforme = "";
    if(req.param('idTc',null) != null){
      id_tc = req.param('idTc',null);
    }
    if(req.param('numero',null) != null){
      numero = req.param('numero',null);
    }
    if(req.param('camp',null) != null){
      id_campagne = req.param('camp',null);
    }
    if(req.param('idChef',null) != null){
      idEquipe = req.param('idChef',null);
    }
    if(req.param('iqSq',null) != null){
      idSq = req.param('iqSq',null);
    }
    if(req.param('conforme',null) != null){
      conforme = req.param('conforme',null);
    }
    if(req.param('dateEcoute',null) != "") {
      date_ecoute = req.param('dateEcoute',null);
    }
    if(req.param('dateEcoute2',null) != "") {
      date_ecoute2 = req.param('dateEcoute2',null);
    }

    options.optionDate = date_ecoute;
    options.optionDate2 = date_ecoute2;
    options.optionTc = id_tc;
    options.optionNumero = numero;
    options.idChef = idEquipe;
    options.optionSq = idSq;
    options.optionConforme = conforme;
    options.optionCamp = id_campagne;

    sails.log(options);

    async.series([
        function(callback){
          Ecoute.getEcouteParDateCss(options, callback);
          //console.log("4 Fin ecoute.getEcouteParDate ");
        }],
      function(err, results){
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        var retour=[];
        retour['resultat']=results[0];
        retour['layout']=false;
        res.view('pages/masque/css/listeEcouteTabCss',retour);
      });
  },

  getListeEcouteCss : function (req, res) {
    //if (!req.session.user) return res.redirect('/login')
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    var retour=[];

    async.series([
        function(callback){
          //console.log("3 Async.series ");
          var options = [];
          options.optionDate = "";
          //console.log("OPTION DATE ====> "+options.optionDate);
          Ecoute.getEcouteParDateCss(options, callback);
          //console.log("4 Fin ecoute.getEcouteParDate ");
        }],
      function(err, results){
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        retour['menu']=menu;
        retour['var_excel']=1;
        retour['layout']=false;
        res.view('pages/masque/css/ListeEcouteCss',retour);
      });
  },

  getListeEcouteLamie : function (req, res) {
    //if (!req.session.user) return res.redirect('/login')
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    var retour=[];

    async.series([
        function(callback){
          //console.log("3 Async.series ");
          var options = [];
          options.optionDate = "";
          Ecoute.getEcouteParDateLamie(options, callback);
        }],
      function(err, results){
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        retour['menu']=menu;
        retour['var_excel']=1;
        retour['layout']=false;
        res.view('pages/masque/lamie/ListeEcouteLamie',retour);
      });
  },

  getListeEcouteTabLamie : function (req, res) {
    if (!req.session.user) return res.redirect('/login')
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    var retour=[];

    var options = [];

    var date_ecoute = ""; // 2017-04-14 03:00:00+03
    var date_ecoute2 = ""; // 2017-04-14 03:00:00+03
    var id_tc = "";
    var numero = "";
    var idEquipe = "";
    var idSq = "";
    var id_campagne = "";
    
    var conforme = "";
    if(req.param('idTc',null) != null){
      id_tc = req.param('idTc',null);
    }
    if(req.param('numero',null) != null){
      numero = req.param('numero',null);
    }
    if(req.param('camp',null) != null){
      id_campagne = req.param('camp',null);
    }
    if(req.param('idChef',null) != null){
      idEquipe = req.param('idChef',null);
    }
    if(req.param('iqSq',null) != null){
      idSq = req.param('iqSq',null);
    }
    if(req.param('conforme',null) != null){
      conforme = req.param('conforme',null);
    }
    if(req.param('dateEcoute',null) != "") {
      date_ecoute = req.param('dateEcoute',null);
    }
    if(req.param('dateEcoute2',null) != "") {
      date_ecoute2 = req.param('dateEcoute2',null);
    }

    options.optionDate = date_ecoute;
    options.optionDate2 = date_ecoute2;
    options.optionTc = id_tc;
    options.optionNumero = numero;
    options.idChef = idEquipe;
    options.optionSq = idSq;
    options.optionConforme = conforme;
    options.optionCamp = id_campagne;

    sails.log(options);

    async.series([
        function(callback){
          Ecoute.getEcouteParDateLamie(options, callback);
        }],
      function(err, results){
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        var retour=[];
        retour['resultat']=results[0];
        retour['layout']=false;
        res.view('pages/masque/lamie/listeEcouteTabLamie',retour);
      });
  },

  findEcouteByIdUpdateIsoEole: function(req, res)
  {
    //if (!req.session.user) return res.redirect('/login');
    var id=req.param('id',null);
    var id_pers=req.param('id_pers',null);
    //console.log("RECUP ID ECOUTE ====> " + id);
    //console.log("RECUP ID PERS ====> " + id_pers);

    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    async.series([
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getNoteParEcouteIsoEole(options, callback);
        /*},
        function (callback) {
          Statistique.getDataTemplate(null,callback);*/
        },
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getBesoinFormationEcoute(options, callback);
        },
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getEcoute(options, callback);
        }
      ],function(err, results) {
        if (err) {
          console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        var retour=[];
        retour['menu']=menu;
        retour['resultatNote']=results[0];
        retour['id_pers_tc']=id_pers;

        return res.view('pages/masque/iso_eole/modifierEcouteIsoEole',{layout : false, menu : menu, det_notation : results[0] , id_pers_tc : id_pers, det_formation : results[1] , det_ecoute : results[2] });
      });
  },

  findEcouteByIdUpdateCss: function(req, res)
  {
    //if (!req.session.user) return res.redirect('/login');
    var id=req.param('id',null);
    var id_pers=req.param('id_pers',null);

    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    async.series([
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getNoteParEcouteCss(options, callback);
        /*},
        function (callback) {
          Statistique.getDataTemplate(null,callback);*/
        },
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getBesoinFormationEcoute(options, callback);
        },
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getEcoute(options, callback);
        }
      ],function(err, results) {
        if (err) {
          console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        var retour=[];
        retour['menu']=menu;
        retour['resultatNote']=results[0];
        retour['id_pers_tc']=id_pers;

        return res.view('pages/masque/css/modifierEcouteCss',{layout : false, menu : menu, det_notation : results[0] , id_pers_tc : id_pers, det_formation : results[1] , det_ecoute : results[2] });
      });
  },

  findEcouteByIdUpdateLamie: function(req, res)
  {
    //if (!req.session.user) return res.redirect('/login');
    var id=req.param('id',null);
    var id_pers=req.param('id_pers',null);

    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    async.series([
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getNoteParEcouteLamie(options, callback);
        /*},
        function (callback) {
          Statistique.getDataTemplate(null,callback);*/
        },
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getBesoinFormationEcoute(options, callback);
        },
        function(callback){
          var options = [];
          options.idEcoute = id;
          Ecoute.getEcoute(options, callback);
        }
      ],function(err, results) {
        if (err) {
          console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        var retour=[];
        retour['menu']=menu;
        retour['resultatNote']=results[0];
        retour['id_pers_tc']=id_pers;

        return res.view('pages/masque/lamie/modifierEcouteLamie',{layout : false, menu : menu, det_notation : results[0] , id_pers_tc : id_pers, det_formation : results[1] , det_ecoute : results[2] });
      });
  },
};

