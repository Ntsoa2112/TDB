/**
 * MenagementController
 *
 * @description :: Server-side logic for managing Menagements
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Highcharts = require('highcharts');
module.exports = {

  //getListeDossier
  getLsDossierAdmin: function (req, res) {
   //  if (!req.session.user) return res.redirect('/login');
    var idPers = req.session.user;
    User.query('SELECT p_dossier.id_dossier,p_dossier.num_dossier FROM  p_dossier  WHERE  id_etat = 0 ORDER BY num_dossier ASC', function(eror, test)
    {
      //console.log( "taile ============================> "+test.rows.length );
      var str = '<option value=""></option>';
      if (eror)
      {
        return res.send('erreur 2018');
      }else{
        // return res.send(test);
        for(var i=0 ; i< test.rows.length ; i++){
          if(req.session.dossier!=null){
            if(parseInt(req.session.dossier)==parseInt(test.rows[i].id_dossier)){
              //console.log("session dossier is===>true");
              str += '<option value=' +test.rows[i].id_dossier +' selected="true">' + test.rows[i].num_dossier  +'</option>';
            }else {
              str += '<option value=' +test.rows[i].id_dossier +'>' + test.rows[i].num_dossier  +'</option>';
            }
          }else {
            str += '<option value=' +test.rows[i].id_dossier +'>' + test.rows[i].num_dossier  +'</option>';
          }
        }
        return res.send(str);
      }
    });
  },

  getPresence: function (req, res) {
    //if (!req.session.user) return res.redirect('/login');
    var idPers = req.session.user;
    var retVal = [];
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    var datedeb =req.param('datedeb',''+new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8);
    var datedeb2 =req.param('datedeb',''+new Date().toISOString()).replace(/-/,'/').replace(/-/,'/').substr(0,10);
    var sqql = "select count(*) from ("+
      "select distinct(id_util) , count(distinct pdate)  from r_pointage INNER JOIN r_personnel ON r_personnel.id_pers = r_pointage.id_util "+
      "where pdate = '"+datedeb2+"' and r_personnel.actif = true  group by id_util order by id_util" +
      ") AS presence";
    User.query("select count(*) from ("+
    "select distinct(id_util) , count(distinct pdate)  from r_pointage INNER JOIN r_personnel ON r_personnel.id_pers = r_pointage.id_util "+
    "where pdate = '"+datedeb2+"' and r_personnel.actif = true  group by id_util order by id_util" +
    ") AS presence", function(eror, test)
    {
      ////console.log( "taile ============================> "+test.rows.length );

      var str = '';
      if (eror)
      {
        //console.log( "error ============================> "+eror );
        return res.send('erreur Presance');
      }else{
        // return res.send(test);
        //console.log( "sql ============================> "+sqql );
        str =test.rows;
        retVal['present']= test.rows[0]['count'];
        //console.log( "response pres ============================> "+test.rows[0]['count'] );
        User.query("select count(*) from r_personnel where actif=true", function(err, pers)
        {
          ////console.log( "taile ============================> "+test.rows.length );

          var str = '';
          if (err)
          {
            //console.log( "error ============================> "+err );
            return res.send('erreur Personnel');
          }else{
            // return res.send(test);
            str =pers.rows;
            retVal['tout']= pers.rows[0]['count'];
            //console.log( "response tout============================> "+pers.rows[0]['count'] );
            User.query("select getretard('"+datedeb2+"')", function(errr, ret)
            {
              ////console.log( "taile ============================> "+test.rows.length );

              var str = '';
              if (errr)
              {
                //console.log( "error ============================> "+errr );
                return res.send('erreur Personnel');
              }else{
                // return res.send(test);
                str =ret.rows;
                menu["aceuil"]= "";
                menu["dossierAdmin"]= "";
                menu["gestionDossier"]= "";
                menu["statOpAdmin"]= "";
                menu["presence"]= "selected";
                menu["admin"]= "";
                retVal['retard']= ret.rows.length;
                retVal['menu']= menu;
                //console.log( "response ret ============================> "+ret.rows.length);
                Photo.find({id_pers : req.session.user}, function(err, resultat){
                  if(err || resultat[0] == undefined) return err;

                  var imageToShow = ImageService.toBase64String(resultat[0].photo);
                  retVal['image'] = imageToShow;

                  return res.view( 'pages/pointage_op', retVal);
                });

              }
            });
          }
        });
      }
    });
  },

  getRetard: function (req, res) {
    // if (!req.session.user) return res.redirect('/login');
    var idPers = req.session.user;
    var retVal = [];
    var dateCible = req.param('datedeb',''+new Date().toISOString()).replace(/-/,'/').replace(/-/,'/').substr(0,10);
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    req.session.datechoice = dateCible;
    async.series([
        function(callback){
          PointageService.getRetardParDepartement(dateCible, callback);
        }
      ],
      function(err, results){
        if(err) return res.badRequest("Problème avec la récupération des données dans la base");

        //traitement des donnees
        var retardParDepartement = results[0];

        //console.log(results);



        return res.view('pages/pointage_op', {
          retardParDepartement : retardParDepartement,
          menu : menu
        });
      });
  },

  getRetardParDepartement: function (req, res) {
    // if (!req.session.user) return res.redirect('/login');
    // if (req.session.droit!=1) return res.redirect('/');
    var idPers = req.session.user;
    var retVal = [];
    var dateCible = req.param('datedeb',''+new Date().toISOString()).replace(/-/,'/').replace(/-/,'/').substr(0,10);
    var dep = req.param('dep','');
    var view = 'pages/retard_volume_horaire_op'
    var isDep = 1;
    if(dep==''){
      isDep = 0;
    }
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    req.session.dep = dep;
    req.session.datechoice = dateCible;
    var options = [];
    options.datecible=dateCible;
    if(dep==''){
      dep= 1;
    }
    options.idDep= dep;
    var data = 'huhu';
    async.series([
        function(callback){
          PointageService.getRetardParIdDep(options, callback);
        },
        PointageService.getDepartement,
        function(callback){
          PointageService.getDetailRetardParIdDep(options, callback);
        },
        function(callback){
          PointageService.getNbPersParIdDep(dep, callback);
        },
        function(callback){
          PointageService.getRetardParDepartement(dateCible, callback);
        }
      ],
      function(err, results){
        if(err) return res.badRequest("Problème avec la récupération des données dans la base");

        //traitement des donnees
        var retardParDepartement = results[0];
        var departement = results[1];
        var retardHeurParDepartement = results[2];
        var NbDep = results[3];
        var retard = results[4];
        //console.log("result===========>"+results[1]);



        return res.view(view, {
          retardParDepartement : retardParDepartement,
          retardHeurParDepartement : retardHeurParDepartement,
          departement : departement,
          retard : retard,
          NbDep : NbDep,
          isDep : isDep,
          menu : menu
        });
      });
  },

  index: function (req, res) {
    var math = require('mathjs');
    // if (!req.session.user) return res.redirect('/login');
    // if (req.session.user=="ostie") return res.redirect('/ostie');
    var retval = [];
    var dossier =req.param('dossier',null);
    var matricule =req.param('matricule',null);
    var matrSql = "";
    if(matricule!=null && matricule!= 'undefined' && matricule!= ''){
      matrSql = "AND r_personnel.id_pers="+matricule;
    }
    var dateess = new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);
    var datedeb =req.param('datedeb',dateess).replace('/','').replace('/','').substr(0,8);
    var datefin =req.param('datefin',dateess).replace('/','').replace('/','').substr(0,8);
    retval['display'] = "hidden";
    retval['dossier'] = null;

    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    req.session.mat = matricule;
    req.session.dossier = dossier;
    req.session.datedeb = datedeb;
    req.session.datefin = datefin;
    if(dossier!=null && dossier!= 'undefined' && dossier!= ''){
      retval['display'] = "";
      var sql = "SELECT * from p_dossier where id_dossier="+dossier;
      Ldt.query(sql,function(err,result){
        if (err){
          console.log(err);
          return;
        }else{
          retval['dossier'] = result.rows[0];
          retval['etapes'] = [];
          Ldt.query('select id_lien, p_etape.libelle, p_etape.id_etape, p_lien_oper_dossier.vitesse, p_lien_oper_dossier.quantite_journalier from p_lien_oper_dossier LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape WHERE id_dossier = '+dossier+' order by id_lien', function(eror, test)
          {

            if (eror)
            {
              //console.log('erreur 2018');
              return res.send('erreur 2018');
            }else{
              ////console.log( test.length() );

              // return res.send(test);

              retval['etapes'] = test.rows;
              //return res.ok(retval);
              req.session.mat = matricule;
              req.session.dossier = dossier;
              req.session.datedeb = datedeb;
              req.session.datefin = datefin;

              var sql = "SELECT p_ldt.id_pers, SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree, sum(to_number('0'||quantite,'99999')) as qte,"
                +" p_dossier.num_dossier as num, p_etape.libelle, p_etape.id_etape, p_type_ldt.libelle as lib"
                +" from p_ldt"
                +" LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier"
                +" LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient"
                +" LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien"
                +" LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape"
                +" LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat"
                +" LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt"
                +" LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers"
                +" where 1=1 AND p_ldt.id_dossier = "+dossier+" AND date_deb_ldt='"+datedeb+"'  "+matrSql+" "
                +"group by p_ldt.id_pers, p_dossier.num_dossier, p_type_ldt.libelle, p_etape.id_etape, p_etape.libelle order by  p_ldt.id_pers, p_dossier.num_dossier, p_etape.libelle, p_type_ldt.libelle "

              Ldt.query(sql, function(er, vop) {
                if (er)
                {
                  //console.log('erreur vop');
                  return res.send('erreur vop');
                }else{
                  retval['vop'] = vop.rows;
                  var sql2 = "select sum(to_number('0'||quantite,'99999')) as qte,SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree from p_ldt where id_dossier="+dossier

                  Ldt.query(sql, function(er01, dos) {
                    if (er01)
                    {
                        //console.log('erreur dossier');
                        return res.send('erreur dossier');
                    }else{
                      menu["aceuil"]= "";
                      menu["dossierAdmin"]= "selected";
                      menu["gestionDossier"]= "";
                      menu["statOpAdmin"]= "";
                      menu["presence"]= "";
                      menu["admin"]= "";
                      retval['menu'] = menu;
                      retval['doss'] = dos.rows[0];
                      retval['menu'] = menu;
                      var options = [];
                      options.dossier = dossier;
                      options.dateDebut = datedeb;
                      options.dateFin = datefin;


                      async.series([
                          function(callback){
                            options.type = 2;
                            PointageService.getNbDossierParType(options, callback);
                          },
                          function(callback){
                            options.type = 1;
                            PointageService.getNbDossierParType(options, callback);
                          },
                          function(callback){
                            options.type = 0;
                            PointageService.getNbDossierParType(options, callback);
                          },
                          function(callback){
                            PointageService.getQQParDossier(options, callback);
                          },
                          function(callback){
                            Ldt.connectedByDateDossier(options, callback);
                          },
                          function(callback){
                            Ldt.etapeByDateDossier(options, callback);
                          }
                        ],
                        function(err, results){
                          if(err) return res.badRequest("Problème avec la récupération des données dans la base");

                          //traitement des donnees
                          var dossierTermine = results[0];
                          var dossierEnCours = results[1];
                          var dossierLibre = results[2];
                          var qualiteQuantite = results[3];
                          var persCon = results[4];
                          var etapeData = results[5];

                          retval['dossierTermine'] = dossierTermine;
                          retval['dossierEnCours'] = dossierEnCours;
                          retval['dossierLibre'] = dossierLibre;
                          retval['qualiteQuantite'] = qualiteQuantite;
                          retval['datesock'] = datedeb;
                          retval['math'] = math;
                          retval['persCon'] = persCon;
                          retval['etapeData'] = etapeData;
                          retval['dossie'] = dossier;
                          retval['matricule'] = matricule;
                          retval['layout'] = false;






                          return res.view( 'pages/management', retval);
                        });



                    }
                  });
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
      retval['dossierTermine'] = 0;
      retval['dossierEnCours'] = 0;
      retval['dossierLibre'] = 0;
      retval['qualiteQuantite'] = [];
      retval['layout'] = false;

      req.session.mat = matricule;
      req.session.dossier = dossier;
      req.session.datedeb = datedeb;
      return res.view( 'pages/management', retval);
    }
  },
  dashCp: function (req, res) {
    var retval = [];
    var menu = [];

    var options = [];
    options.datecible =new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);
    menu["aceuil"]= "";
    menu["dossierAdmin"]= "selected";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    retval['menu'] = menu;
    async.series([
        function(callback){
          Ldt.dossierByDate(options, callback);
        },function(callback){
          Ldt.listeConnectedGPAO(options, callback);
        }
      ],
      function(err, results) {
        if (err) return res.badRequest("Problème avec la récupération des données dans la base"+err);

        retval["doss"]= results[0];
        retval["connected"]= results[1];
        retval["Highcharts"]= Highcharts;
        return res.view( 'pages/DashboardCp', retval);
      });

  },
/*
  jsonDossier: function (req, res) {
    var retval = [];
    var dossier =req.param('dossier',null);
    var dateess = new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);
    var datedeb =req.param('datedeb',dateess).replace('/','').replace('/','').substr(0,8);
    var datefin =req.param('datefin',dateess).replace('/','').replace('/','').substr(0,8);
    var matricule =req.param('matricule',null);
    var matrSql = "";
    if(matricule!=null && matricule!= 'undefined' && matricule!= ''){
      matrSql = "AND r_personnel.id_pers="+matricule;
    }
    retval['display'] = "hidden";
    retval['dossier'] = null;
      retval['display'] = "";
      var sql = "SELECT * from p_dossier where id_dossier="+dossier;
      Ldt.query(sql,function(err,result){
        if (err){
          console.log(err);
          return;
        }else{
          retval['dossier'] = result.rows[0];
          retval['etapes'] = [];
          Ldt.query('select id_lien, p_etape.libelle, p_etape.id_etape, p_lien_oper_dossier.vitesse, p_lien_oper_dossier.quantite_journalier from p_lien_oper_dossier LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape WHERE id_dossier = '+dossier+' order by id_lien', function(eror, test)
          {

            if (eror)
            {
              //console.log('erreur 2018');
              return res.send('erreur 2018');
            }else{
              ////console.log( test.length() );

              // return res.send(test);

              retval['etapes'] = test.rows;
              var sql = "SELECT p_ldt.id_pers, SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree, sum(to_number('0'||quantite,'99999')) as qte,"
                +" p_dossier.num_dossier as num, p_etape.libelle, p_etape.id_etape, p_type_ldt.libelle as lib"
                +" from p_ldt"
                +" LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier"
                +" LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient"
                +" LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien"
                +" LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape"
                +" LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat"
                +" LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt"
                +" LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers"
                +" where 1=1 AND p_ldt.id_dossier = "+dossier+" AND date_deb_ldt='"+datedeb+"'  "+matrSql+" "
                +"group by p_ldt.id_pers, p_dossier.num_dossier, p_type_ldt.libelle, p_etape.id_etape, p_etape.libelle order by  p_ldt.id_pers, p_dossier.num_dossier, p_etape.libelle, p_type_ldt.libelle "

              Ldt.query(sql, function(er, vop) {
                if (er)
                {
                  //console.log('erreur vop');
                  return res.send('erreur vop');
                }else{
                  retval['vop'] = vop.rows;
                  var sql2 = "select sum(to_number('0'||quantite,'99999')) as qte,SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree from p_ldt where id_dossier="+dossier

                  Ldt.query(sql, function(er01, dos) {
                    if (er01)
                    {
                      //console.log('erreur dossier');
                      return res.send('erreur dossier');
                    }else{
                      retval['doss'] = dos.rows[0];
                      var options = [];
                      options.dossier = dossier;
                      options.dateDebut = datedeb;
                      options.dateFin = datefin;


                      async.series([
                          function(callback){
                            options.type = 2;
                            PointageService.getNbDossierParType(options, callback);
                          },
                          function(callback){
                            options.type = 1;
                            PointageService.getNbDossierParType(options, callback);
                          },
                          function(callback){
                            options.type = 0;
                            PointageService.getNbDossierParType(options, callback);
                          },
                          function(callback){
                            PointageService.getQQParDossier(options, callback);
                          },
                          function(callback){
                            Ldt.connectedByDateDossier(options, callback);
                          },
                          function(callback){
                            Ldt.etapeByDateDossier(options, callback);
                          }
                        ],
                        function(err, results){
                          if(err) return res.badRequest("Problème avec la récupération des données dans la base");

                          //traitement des donnees
                          var dossierTermine = results[0];
                          var dossierEnCours = results[1];
                          var dossierLibre = results[2];
                          var qualiteQuantite = results[3];
                          var persCon = results[4];
                          var etapeData = results[5];

                          retval['dossierTermine'] = dossierTermine;
                          retval['dossierEnCours'] = dossierEnCours;
                          retval['dossierLibre'] = dossierLibre;
                          retval['qualiteQuantite'] = qualiteQuantite;
                          retval['datesock'] = datedeb;
                          retval['persCon'] = persCon;
                          retval['etapeData'] = etapeData;
                          retval['dossier'] = dossier;

                          return res.send(retval);
                        });



                    }
                  });
                }
              });

            }
          });
        }
      });


  },
*/

  jsonDossier: function (req, res) {
    var retval = [];
    var dossier = req.param('dossier', null);
    var dateess = new Date().toISOString().replace(/-/, '/').replace(/-/, '/').substr(0, 10);
    var datedeb = req.param('datedeb', dateess).replace('/', '').replace('/', '').substr(0, 8);
    var datefin = req.param('datefin', dateess).replace('/', '').replace('/', '').substr(0, 8);
    var matricule = req.param('matricule', null);
    var matrSql = "";
    if (matricule != null && matricule != 'undefined' && matricule != '') {
      matrSql = "AND r_personnel.id_pers=" + matricule;
    }

    var options = [];
    options.dossier = dossier;
    options.dateDebut = datedeb;
    options.datedeb = datedeb;
    options.dateFin = datefin;
    options.matrSql = matrSql;


    async.series([
        function(callback){
          options.type = 2;
          PointageService.getNbDossierParType(options, callback);
        },
        function(callback){
          options.type = 1;
          PointageService.getNbDossierParType(options, callback);
        },
        function(callback){
          options.type = 0;
          PointageService.getNbDossierParType(options, callback);
        },
        function(callback){
          PointageService.getQQParDossier(options, callback);
        },
        function(callback){
          Ldt.connectedByDateDossier(options, callback);
        },
        function(callback){
          Ldt.etapeByDateDossier(options, callback);
        },
        function(callback){
          Ldt.getDossier(options, callback);
        },
        function(callback){
          Ldt.getEtape(options, callback);
        },
        function(callback){
          Ldt.getVop(options, callback);
        }/*,
        function(callback){
          Ldt.getDoss(options, callback);
        }*/
      ],
      function(err, results){
        if(err) return res.badRequest("Problème avec la récupération des données dans la base");

        //traitement des donnees
        var dossierTermine = results[0];
        var dossierEnCours = results[1];
        var dossierLibre = results[2];
        var qualiteQuantite = results[3];
        var persCon = results[4];
        var etapeData = results[5];
        var etapes = results[7];
        var dossiers = results[6];
        var vop = results[8];
        //var doss = results[9];

        return res.ok(JSON.stringify({
          dossierTermine:dossierTermine,
          dossierEnCours:dossierEnCours,
          dossierLibre:dossierLibre,
          qualiteQuantite:qualiteQuantite,
          datesock:datedeb,
          persCon:persCon,
          etapeData:etapeData,
          dossiers:dossier,
          dossier:dossiers,
          etapes:etapes,
          vop:vop
          //doss:doss



        }));
      });

  }

};

