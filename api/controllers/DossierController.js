/**
 * DossierController
 *
 * @description :: Server-side logic for managing Dossiers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    index: function (req, res) {
      if (!req.session.user) return res.redirect('/login');
      var retval = [];
      var menu = [];
      menu["aceuil"]= "selected";
      menu["dossierAdmin"]= "";
      menu["gestionDossier"]= "";
      menu["statOpAdmin"]= "";
      menu["presence"]= "";
      menu["admin"]= "";
      var dossier =req.param('dossier',null);
      var datedeb =req.param('datedeb','20160714').replace(/-/,'').replace(/-/,'').substr(0,8);
      retval['display'] = "hidden";
      retval['dossier'] = null;
      if(dossier!=null){
        retval['display'] = "";
        var sql = "SELECT * from p_dossier where id_dossier="+dossier;
        Ldt.query(sql,function(err,result){
          if (err){
            console.log(err);

            return;
          }else{
            //console.log(result);
            retval['dossier'] = result.rows[0];
            retval['etapes'] = [];
            Ldt.query('select id_lien, p_etape.libelle from p_lien_oper_dossier LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape WHERE id_dossier = '+dossier+' order by id_lien', function(eror, test)
            {

              if (eror)
              {
                //console.log('erreur 2018');
                return res.send('erreur 2018');
              }else{
                ////console.log( test.length() );

                    // return res.send(test);
                retval['etapes'] = test.rows;
                //console.log(retval);
                //return res.ok(retval);

                var sql = "SELECT p_ldt.id_pers, SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree, sum(to_number('0'||quantite,'99999')) as qte,"
                +" p_dossier.num_dossier as num, p_etape.libelle, p_type_ldt.libelle as lib"
                +" from p_ldt"
                +" LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier"
                +" LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient"
                +" LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien"
                +" LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape"
                +" LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat"
                +" LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt"
                +" LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers"
                +" where 1=1 AND p_ldt.id_dossier = "+dossier+" AND p_ldt.date_deb_ldt = '"+datedeb+"' AND p_ldt.id_pers="+req.session.user
                +" group by p_ldt.id_pers, p_dossier.num_dossier, p_type_ldt.libelle, p_etape.libelle order by  p_ldt.id_pers, p_dossier.num_dossier, p_etape.libelle, p_type_ldt.libelle "

                Ldt.query(sql, function(er, vop) {
                  if (er)
                  {
                    //console.log('erreur vop');
                    return res.send('erreur vop');
                  }else{
                    menu["aceuil"]= "";
                    menu["dossierAdmin"]= "selected";
                    menu["gestionDossier"]= "";
                    menu["statOpAdmin"]= "";
                    menu["presence"]= "";
                    menu["admin"]= "";
                    retval['menu'] = menu;
                    retval['vop'] = vop.rows;
                    //console.log(vop.rows);
                    Photo.find({id_pers : req.session.user}, function(err, resultat){
                      if(err || resultat[0] == undefined) return err;

                      var imageToShow = ImageService.toBase64String(resultat[0].photo);
                      retval['image'] = imageToShow;
                      return res.view( 'pages/dossierDashb', retval);
                    })
                  }
                });

              }
            });
          }
        });

      }else{
        menu["aceuil"]= "";
        menu["dossierAdmin"]= "selected";
        menu["gestionDossier"]= "";
        menu["statOpAdmin"]= "";
        menu["presence"]= "";
        menu["admin"]= "";
        retval['menu'] = menu;
        Photo.find({id_pers : req.session.user}, function(err, resultat){
          if(err || resultat[0] == undefined) return err;

          var imageToShow = ImageService.toBase64String(resultat[0].photo);
          retval['image'] = imageToShow;
          return res.view( 'pages/dossierDashb', retval);
        })

      }


    /*Ldt.query('select get_ldt_b_id(226)',function(err,result){
      if (err){
        //console.log('err');
        return;
      }
      else{

        for(var i=0;i<result['rows'].length;i++){
          var ligne = result['rows'][i].get_ldt_b_id;
          var castlign = ligne.substr(1, ligne.length-1);
          var tabsrt = castlign.split(",");
          //console.log('i='+i+' '+result['rows'][i].get_ldt_b_id);
          //console.log(tabsrt[0]);
        }
        retval['ldt'] = result['rows'];

*/
        /* var plotly = require('plotly')("JackFree", "0ts7ueitzo");

          var data = [
            {
              x: ["2013-10-04 22:23:00", "2013-11-04 22:23:00", "2013-12-04 22:23:00"],
              y: [1, 3, 6],
              type: "scatter"
            }
          ];
          var graphOptions = {filename: "date-axes", fileopt: "overwrite"};
          plotly.plot(data, graphOptions, function (err, msg) {
              //console.log(msg);
          });*/

      },


  /*
  findDossier: function(req, res)
  {
    var retVal = [];
    Dossier.query('select * from p_dossier order by id_dossier', function(err, found){
      if(err){
        console.log(err);
      }
      var retVal = [];
      retVal['dossiers'] = found.rows;
      ////console.log(found.rows);
      res.view( 'dossier/listeDossier', retVal );
      //return res.send(found.rows);
    });
  },

  findDossierById: function(req, res)
  {
    var id = req.param('id');
    //console.log("id dossier ==> "+id);
    var retVal = [];
    Dossier.findOne(id).exec(function (err, dossier){
      if (err){
        console.log(err);
      }
      Etape.query('select id_lien, p_etape.libelle, p_etape.id_etape, p_etape.parent_etape from p_lien_oper_dossier LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape WHERE id_dossier = '+id+' order by id_lien', function(eror, etape)
      {
        if (eror){
          return res.send('erreur');
        }
        Etape.query('select * from p_etape', function(eror, etapeAll)
        {
          if (eror){
            return res.send('erreur');
          }
          //console.log("dossier ==> "+dossier);
          retVal['dossiers'] = dossier;
          retVal['etapes'] = etape.rows;
          retVal['etapesAll'] = etapeAll.rows;
          res.view( 'dossier/modifierDossier', retVal );
        });
      });
    });
  },

  avancement: function(req, res)
  {
    var id = req.param('id');
    //console.log("id dossier ==> "+id);
    var retVal = [];
    Dossier.findOne(id).exec(function (err, dossier){
      if (err){
        console.log(err);
      }

    });
  },



  updateDossier: function (req, res)
  {
    //console.log('Fonction update dossier ****************************** ');

    //var id = req.param('id');
    var params = req.params.all();
    //console.log('PARAMS ALL ===> ' + params.id_dossier);
    //console.log('ID PERS CP ===> ' + params.id_pers_cp);
    var id = params.id_dossier;
    Dossier.update({id_dossier: id}, params).exec(function (err, model) {
      if (err) {
        //res.send("Error:".err);
        console.log(err);
      }
      else {
        var url = 'http://localhost:1340/findDossierById?id=1';
        var urlTest = 'http://google.com';
        return res.redirect('listeDossier');
      }
    });
  },*/


  //NEW ==================================================================================================

  findDossier: function(req, res)
  {
    var retVal = [];
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["dossierOP"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    Dossier.query('select * from p_dossier order by id_dossier', function(err, found){
      if(err){
        console.log(err);
      }

//exemple
      Etape.query('select id_lien, p_etape.libelle, p_etape.id_etape, p_etape.parent_etape from p_lien_oper_dossier LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape WHERE id_dossier = 1 order by id_lien', function(eror, etape)
      {
        if (eror){
          return res.send('erreur');
        }
        Etape.query('select * from p_etape', function(eror, etapeAll)
        {
          if (eror){
            return res.send('erreur');
          }
          menu["aceuil"]= "";
          menu["dossierAdmin"]= "";
          menu["gestionDossier"]= "selected";
          menu["statOpAdmin"]= "";
          menu["presence"]= "";
          menu["admin"]= "";
          retVal['menu'] = menu;
          retVal['etapes'] = etape.rows;
          retVal['etapesAll'] = etapeAll.rows;


          retVal['dossiers'] = found.rows;
          ////console.log(found.rows);
            res.view( 'pages/dossier/listeDossier', retVal );

          //return res.send(found.rows);
        });
      });
    });
  },

  findDossierById: function(req, res)
  {
    var id = req.param('id');
    //console.log("id dossier ==> "+id);
    var retVal = [];
    var menu = [];
    menu["aceuil"]= "";
    menu["dossierAdmin"]= "";
    menu["dossierOP"]= "";
    menu["gestionDossier"]= "selected";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    var queryToDossier = "SELECT " +
      "id_dossier, num_dossier,atelier, corresp ,demarrage,delai,date_livr,vitesse_estime,vitesse_reelle,volume_prevue,resource_op,resource_cp,p_client.nom as client,p_etat.libelle as etat " +
      "FROM p_dossier " +
      " LEFT JOIN p_client ON  p_dossier.id_cl = p_client.id_cl"+
      " LEFT JOIN p_etat ON p_dossier.id_etat= p_etat.id_etat"+
      " WHERE id_dossier=" + id;
    //Dossier.findOne(id).exec(function (err, dossier){
    Dossier.query(queryToDossier ,function (err, dossier){
      if (err){
        console.log(err);
      }
      //console.log("Find one dossier "+id);

      var queryEtape = 'select id_lien,vitesse,quantite_journalier,id_dossier, p_etape.libelle, p_etape.id_etape, p_etape.parent_etape from p_lien_oper_dossier LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape WHERE id_dossier = '+id+' order by id_lien';
      Etape.query(queryEtape, function(eror, etape)
      {
        if (eror){
          //console.log(eror);
        }
        //console.log("Find etape dossier "+id);
        Etape.query('select * from p_etape', function(eror, etapeAll)
        {
          if (eror){
            //console.log(eror);
          }
          //console.log("Find all etape ");
          menu["aceuil"]= "";
          menu["dossierAdmin"]= "selected";
          menu["gestionDossier"]= "";
          menu["statOpAdmin"]= "";
          menu["presence"]= "";
          menu["admin"]= "";
          retVal['menu'] = menu;
          retVal['dossiers'] = dossier.rows;
          retVal['etapes'] = etape.rows;
          retVal['etapesAll'] = etapeAll.rows;
            return res.view('pages/dossier/modifierDossier',retVal);

        });
      });
    });
  },findDossierByIdV2: function(req, res)
  {
    var id = req.param('id');
    //console.log("id dossier ==> "+id);
    var retVal = [];
    var menu = [];
    menu["aceuil"]= "";
    menu["dossierAdmin"]= "";
    menu["dossierOP"]= "";
    menu["gestionDossier"]= "selected";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    var queryToDossier = "SELECT " +
      "id_dossier, num_dossier,atelier, corresp ,demarrage,delai,date_livr,vitesse_estime,vitesse_reelle,volume_prevue,resource_op,resource_cp,p_client.nom as client,p_etat.libelle as etat " +
      "FROM p_dossier " +
      " LEFT JOIN p_client ON  p_dossier.id_cl = p_client.id_cl"+
      " LEFT JOIN p_etat ON p_dossier.id_etat= p_etat.id_etat"+
      " WHERE id_dossier=" + id;
    //Dossier.findOne(id).exec(function (err, dossier){
    Dossier.query(queryToDossier ,function (err, dossier){
      if (err){
        console.log(err);
      }
      //console.log("Find one dossier "+id);

      var queryEtape = 'select id_lien,vitesse,quantite_journalier,id_dossier, p_etape.libelle, p_etape.id_etape, p_etape.parent_etape from p_lien_oper_dossier LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape WHERE id_dossier = '+id+' order by id_lien';
      Etape.query(queryEtape, function(eror, etape)
      {
        if (eror){
          //console.log(eror);
        }
        //console.log("Find etape dossier "+id);
        Etape.query('select * from p_etape', function(eror, etapeAll)
        {
          if (eror){
            //console.log(eror);
          }
          //console.log("Find all etape ");
          //console.log("dossier FsARANY  =========================================================> "+dossier.rows);
          menu["aceuil"]= "";
          menu["dossierAdmin"]= "selected";
          menu["gestionDossier"]= "";
          menu["statOpAdmin"]= "";
          menu["presence"]= "";
          menu["admin"]= "";
          retVal['menu'] = menu;
          retVal['dossiers'] = dossier.rows;
          retVal['etapes'] = etape.rows;
          retVal['etapesAll'] = etapeAll.rows;
            return res.view('pages/dossier/modifierDossierV2',retVal);

        });
      });
    });
  },

  updateDossier: function (req, res)
  {
    //console.log('************************************************* ===>  Fonction update dossier ****************************** ');

    //
    /// string updateDossierQuery = "UPDATE p_dossier SET num_dossier = " + num_dossier + " ,atelier=" + atelier + ",corresp= " + cp + ",demarrage = " + demarrage + ",delai=" + delai + ",date_livr = " + date_livr + ",vitesse_estime = " + vitesse_estime + ",vitesse_reelle =" + vitesse_reelle + ",volume_prevue=" + volume_prevu + ",resource_op  = " + ressource_op + ",resource_cp  = " + ressource_cp + ",id_equipe="+id_equipe+",id_cl="+id_cl+",id_etat="+id_etat+" WHERE id_dossier="+idDossier;


    //var id = req.param('id');
    var params = req.params.all();
    //console.log('PARAMS ALL ===> ' + params.id_dossier);
    //console.log('ID PERS CP ===> ' + params.id_pers_cp);
    var id = params.id_dossier;
    Dossier.update({id_dossier: id}, params).exec(function (err, model) {
      if (err) {
        //res.send("Error:".err);
        console.log(err);
      }
      else {
        var url = 'http://localhost:1340/findDossierById?id=1';
        var urlTest = 'http://google.com';
        return res.redirect('listeDossier');
      }
    });
  },

  updateEtape: function (req, res)
  {
    //console.log('************************************************* ===>  Fonction update Etape ****************************** ');

    //
    /// string updateDossierQuery = "UPDATE p_dossier SET num_dossier = " + num_dossier + " ,atelier=" + atelier + ",corresp= " + cp + ",demarrage = " + demarrage + ",delai=" + delai + ",date_livr = " + date_livr + ",vitesse_estime = " + vitesse_estime + ",vitesse_reelle =" + vitesse_reelle + ",volume_prevue=" + volume_prevu + ",resource_op  = " + ressource_op + ",resource_cp  = " + ressource_cp + ",id_equipe="+id_equipe+",id_cl="+id_cl+",id_etat="+id_etat+" WHERE id_dossier="+idDossier;


    //var id = req.param('id');
    var params = req.params.all();

    var options = [];
    options.vit=params.vit;
    options.qte=params.qte;
    options.id= params.id;
    async.series([
        function(callback){
          Etape.insertVitesseQte(options, callback);
        },
      ],
      function(err, results) {
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        return res.redirect('findDossierById?id='+req.param('idetape','1'));
      }
    );

    /*//console.log('PARAMS ALL ===> ' + params.id_dossier);
    //console.log('ID PERS CP ===> ' + params.id_pers_cp);
    var id = params.id_dossier;
    Dossier.update({id_dossier: id}, params).exec(function (err, model) {
      if (err) {
        //res.send("Error:".err);
        console.log(err);
      }
      else {
        var url = 'http://localhost:1340/findDossierById?id=1';
        var urlTest = 'http://google.com';
        return res.redirect('listeDossier');
      }
    });*/
  },

  /*Modification des equipe de cp*/
  modifEquipe : function (req, res) {
    if (!req.session.user) return res.redirect('/login');

    var idcp = req.param('idcp',null)
    var idpers =req.param('idpers',null);

    var options = [];
    options.idcp = idcp;
    options.idpers = idpers;

    async.series([
        function(callback){
          Dossier.addPersInGroup(options, callback);
        }],
      function(err, results) {
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");


        return res.ok("ok");

      });
  },  delEquipe : function (req, res) {
    if (!req.session.user) return res.redirect('/login');

    var idcp = req.param('idcp',null)
    var idpers =req.param('idpers',null);

    var options = [];
    options.idcp = idcp;
    options.idpers = idpers;

    async.series([
        function(callback){
          Dossier.delPersInGroup(options, callback);
        }],
      function(err, results) {
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");


        return res.ok("ok");

      });
  },

  /* gestion des groupe*/

  gestionGroupe : function (req, res) {

    /* class des menus*/
    /*if (!req.session.user) return res.redirect('/login');
    if (req.session.user == "ostie") return res.redirect('/ostie');*/
    if (req.session.droit!=1) return res.redirect('/');
    var menu = [];
    menu["aceuil"] = "";
    menu["dossierAdmin"] = "";
    menu["gestionDossier"] = "selected";
    menu["statOpAdmin"] = "";
    menu["presence"] = "";
    menu["admin"] = "";


    var idCp = req.param('idcp', null);
    if (idCp != null) {
      var options = [];
      options.groupe = idCp;
      req.session.equipe = idCp;

      async.series([
          function (callback) {
            Dossier.personnel(options, callback);
          },
          function (callback) {
            Dossier.groupeDe(options, callback);
          }],
        function (err, results) {
          if (err) return res.badRequest("Problème avec la récupération des données dans la base");


          return res.view('pages/dossier/gestionGroupe', {
            menu: menu,
            lpers: results[0],
            idCP: idCp,
            listMembre: results[1],layout:false

          });

        });
    } else {
      return res.view('pages/dossier/gestionGroupe', {
        menu: menu,
        lpers: [],
        idCP: null,
        listMembre: [],layout:false

      });
    }
  },
  
  // fonction ajax dossier 
  initDataDossier : function (req,res) {
    var id_dossier = req.param("id_dossier","0");

    var retVal ={};

    async.series([
      function (next) {
        Dossier.getNonAffectedEtapes(id_dossier,next);
      },
      function (next) {
        Dossier.getAffectedEtapes(id_dossier,next);
      },
      function (next) {
        Dossier.getClient(next);
      },function (next) {
        Dossier.getDetailDossierClient(id_dossier,next);
      }
    ], function (err, result) {
        if(err)
        {
          return res.badRequest(err);
        }
        else {
          retVal.nonAffected = result[0];
          retVal.Affected = result[1];
          retVal.clients = result[2];
          retVal.detail = result[3];

          return res.ok(JSON.stringify(retVal));
        }

    });

    
  }


  //NEW
};

