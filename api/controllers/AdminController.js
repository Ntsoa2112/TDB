/**
 * Created by 8029 on 29/08/2016.
 */
module.exports = {
  ronny_test: function(req,res) {
    var retour={};
    retour['layout']=false;
    //////console.log(retour);
    //  return
    res.view('pages/test_ronny',retour);
  },

  getListAdmin: function (req, res) {
    var retval = [];

    var menu = [];
    menu["aceuil"]= "";
    menu["dossierAdmin"]= "";
    menu["dossierOP"]= "";
    menu["gestionDossier"]= "selected";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    var sql = "SELECT r_personnel.matricule,r_personnel.appelation from tb_droit join r_personnel on r_personnel.id_pers=tb_droit.id_util where 1=1 AND tb_droit.droit = TRUE  order by tb_droit.id_util asc";
    Ldt.query(sql,function(err,result){
      if (err){
        //console.log('err');
        return;
      }
      else{
        //console.log(sql);

        var menu = [];
        menu["aceuil"]= "";
        menu["dossierAdmin"]= "";
        menu["dossierOP"]= "";
        menu["gestionDossier"]= "";
        menu["statOpAdmin"]= "";
        menu["presence"]= "";
        menu["admin"]= "selected";
        retval['admin'] = result['rows'];
        retval['menu'] = menu;
        Photo.find({id_pers : req.session.user}, function(err, resultat){
          if(err || resultat[0] == undefined) return err;

          var imageToShow = ImageService.toBase64String(resultat[0].photo);
          retval['image'] = imageToShow;

          return res.view( 'pages/admin/list_admin', retval);
        })

      }




    });
  },
  addAdmin: function (req, res) {
    var id = parseInt(req.param('matricule',null))

    var sql = "";
  },
  /** GESTION ACCES GESTION HR ***/
  // PAGE D'acceuil gestion acces
  IndexGestionAccesHR: function (req,res) {
    var menu = [];
    menu["aceuil"] = "";
    menu["dossierAdmin"] = "";
    menu["gestionDossier"] = "selected";
    menu["statOpAdmin"] = "";
    menu["presence"] = "";
    menu["admin"] = "";
    res.view("pages/GestionAcces/index",{menu: menu, layout: false});
  },
  listPersonneAcces: function(req,res) {
    async.series([
      function(callback)
      {
        Admin.getListePersonneAccesHR(callback);
      }
    ],function(err,response){
      if(err) return res.badRequest(err);
      else return res.ok(JSON.stringify(response[0]));
    })
  },
  listDataAcces: function (req,res) {
    var id_pers = req.param("id_pers");
    var opt = {};
    opt.id_pers=id_pers;
    async.series([
      // LISTE DEPAETEMENT
     function (callback) {
          Admin.getListeDepartementAccesHRParPers(opt,callback);
        },
      // LISTE DEPARTEMENT NON AFFECTER
     function (callback) {
          Admin.getListeDepartementNonAccesHRParPers(opt,callback);
        },
      // LISTE EQUIPE
     function (callback) {
          Admin.getListeEquipeAccesHRParPers(opt,callback);
        },
      // LISTE EQUIPE NON AFFECTER
     function (callback) {
          Admin.getListeEquipeNonAccesHRParPers(opt,callback);
       }
    ],function(err,result){
      if(err) return res.badRequest(err);
      var dataReturn = {};
      dataReturn.Departement= result[0];
      dataReturn.NonDepartement= result[1];
      dataReturn.Equipe= result[2];
      dataReturn.NonEquipe= result[3];
      return res.ok(JSON.stringify(dataReturn));
    })
  }

};
