/**
 * PersonnelController
 *
 * @description :: Server-side logic for managing Personnels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  getList: function(req, res)
  {
    if (!req.session.user) return res.redirect('/login');

    Personnel.getDataPersSql(function(err, pers){
      if (err) return res.send(err);
      var retVal = [];
      retVal['personnels'] = pers.rows;
      res.view( 'personnel/ListePersonnel', retVal );
    });
  },

   getListePersonnel : function (req, res) {

       //IMG
       /*if(req.session.image == null){
        Photo.find({id_pers : user.id}, function(err, resultat){
            if(err || resultat[0] == undefined) return err;
            req.session.image = ImageService.toBase64String(resultat[0].photo);
        });*/
        //FIN IMG

    console.log("===========> GET LISTE  PERSONNEL 1 ");

    if (!req.session.user) return res.redirect('/login')
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    var retour=[];

    /*async.series([
        function(callback){
          var options = [];
          options.optionMatricule = "";
          options.optionDepartement = "";
          options.optionFonction = "";
          options.optionPrenom = "";
          options.optionDate = "";
          
          console.log("===========> GET LISTE  PERSONNEL 2 ");
          
          Personnel.getPersWhere(options, callback);
        }
    ],function(err, results){
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");*/

        //console.log("5 Get data");
        //retour['resultat']=results[0];
        retour['menu']=menu;
        retour['var_excel']=1;
        retour['layout']=false;

        //res.view('pages/masque/ListeEcoute',retour);
        return res.view( 'pages/personnel/ListePersonnel', retour );
     // });
  },

  getListePersTab: function (req, res) {
    if (!req.session.user) return res.redirect('/login');
    var options = [];
    console.log("===========> GET LISTE  PERSONNEL TAB ");
    //console.log("MATRICULE PERS"+ req.param('matricule',null));

    ////getLsPers?matricule="+matricule+"&id_departement="+id_departement+"&id_fonction="+id_fonction,

    var matricule_pers = "";
    var prenom_pers = "";
    var id_departement = "";
    var id_fonction = "";
    var date_embauche = "";

    if(req.param('matricule',null) != null){
      matricule_pers = req.param('matricule',null);
    }
    if(req.param('id_departement',null) != null){
      id_departement = req.param('id_departement',null);
    }
    if(req.param('id_fonction',null) != null){
      id_fonction = req.param('id_fonction',null);
    }
    if(req.param('prenom',null) != null){
      prenom_pers = req.param('prenom',null);
    }
    if(req.param('date_embauche',null) != null){
      date_embauche = req.param('date_embauche',null);
    }

    options.optionMatricule = matricule_pers;
    options.optionDepartement = id_departement;
    options.optionFonction = id_fonction;
    options.optionPrenom = prenom_pers;
    options.optionDate = date_embauche;

    console.log("OPTION MATRICULE ====> "+options.optionMatricule);

    async.series([
        function(callback){
          Personnel.getPersWhere(options, callback);
        }],
      function(err, results) {
        if (err) {
          console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        var retour=[];
        retour['resultat']=results[0];
        retour['layout']=false;
        
        console.log("===========> GET LISTE  PERSONNEL TAB 2");
        
        res.view( 'pages/personnel/listePersTab', retour);
      });
  },

  getPhotoPers: function (req, res) {
    if (!req.session.user) return res.redirect('/login');
    
    console.log("===========> GET PHOTO PERS ");
    
    var matricule_pers = "";
    if(req.param('matricule',null) != null){
      matricule_pers = req.param('matricule',null);
    }

    async.series([
        function(callback){
          //Personnel.getPhotoPers(matricule_pers, callback);
          Photo.find({id_pers : matricule_pers}, function(err, resultat){
            if(err || resultat[0] == undefined || resultat.length ==0) return callback(null, null);
            var imageToShow = ImageService.toBase64String(resultat[0].photo);
            return callback(null, imageToShow);
          });
        }
      ],function(err, result) {
        if (err) {
          console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        return res.ok(JSON.stringify(result[0]));
      });
  },


  getListeDepartement: function(req, res)
  {
    async.series([
      function (callback) {
        Personnel.getListeDepartement(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));
    })
  },

  getListeFonction: function(req, res)
  {
    async.series([
      function (callback) {
        Personnel.getListeFonction(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));
    })
  },
};

