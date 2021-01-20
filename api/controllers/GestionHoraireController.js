/**
 * GestionHoraireController
 *
 * @description :: Server-side logic for managing Gestionhoraires
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  saveGh : function(req, res){
    var opt = [];
    opt.id_pers = req.param("id_pers");
    opt.date = req.param("date");
    opt.heure_travaille = req.param("heure_travaille");
    opt.heure_conge = req.param("heure_conge");

    async.series([
      function (callback) {
        GestionHoraire.getHoraireByPersDate(opt,callback);
      }
    ],function (err,results) {
      if(err){
        return res.ok(false);
      }else {
        var fct = null;
        if(results[0].length>0){
          fct = function (callback) {
            GestionHoraire.updateHoraireByPersDate(opt,callback);
          };
        }else{
          fct = function (callback) {
            GestionHoraire.insertHoraireByPersDate(opt,callback);
          };
        }

        async.series([
          fct
        ],function (err,rest) {
          if(err){
            return res.ok(false);
          }else{
            return res.ok(true);
          }

        })
      }
    });
  },

  getListUserToInsertTime : function(req, res){
    //Personnel.getDataPersSql();
    if (!req.session.user) return res.redirect('/login');

    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    var dateNowLoc = new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);
    var dtSplit = dateNowLoc.split('/');
    var dateNow = req.param("datedeb",dtSplit[2]+"/"+dtSplit[1]+"/"+dtSplit[0]);
    var options = [];
    options.groupe = req.session.user;
    options.id_departement = req.param("pole",req.session.id_departement);
    // //console.log(req.session.user)
    //req.session.equipe = idCp;

    var gHgroupe = [];

    async.series([
        function (callback) {
          options.req = req;
          GestionHoraire.getListPers(options, callback);
        },function (callback) {
          GestionHoraire.getPole(null, callback);
        }],
      function (err, results) {
        if (err)
        {
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        else{
          async.eachSeries(results[0],function (groupe,next) {
            var opt = [];
            opt.id_pers = groupe.id_pers;
            opt.date = dateNow;
            async.series([
              function (callback) {
                GestionHoraire.getHoraireByPersDate(opt,callback);
              }
            ],function (err,resultGH) {
              if (err){
                next();
              }else{
                groupe.gh = resultGH[0];
                gHgroupe.push(groupe);
                next();
              }
            })

          },function (err) {
            if (err)
            {
              return res.badRequest("Problème avec la récupération des données dans la base");
            }
            else{
              var retour = [];
              retour['menu'] = menu;
              retour['result'] = gHgroupe;
              retour['pole'] = results[1];
              retour['date'] = dateNow;
              retour['poleid'] = req.param("pole",req.session.id_departement);
              return res.view('pages/Gestion_Horaire/InsertionHoraire', retour)
            }
          })
        }

      });


    /*return res.view('pages/Gestion_Horaire/InsertionHoraire', {
      menu: menu,
      lpers: [],
      idCP: null,
      listMembre: [],layout:false

    });*/
    //res.view('pages/Gestion_Horaire/InsertionHoraire', retour)
    //  });
  },


  vueGestionHoraire : function(req, res){
    //Personnel.getDataPersSql();
    if (!req.session.user) return res.redirect('/login');

    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    var dateNowLoc = new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);
    var dtSplit = dateNowLoc.split('/');
    var dateNow = req.param("datedeb",dtSplit[2]+"/"+dtSplit[1]+"/"+dtSplit[0]);
    var options = [];
    options.groupe = req.session.user;
    options.id_departement = req.param("pole",req.session.id_departement);
    options.id_sem = req.param("sem");
    ////console.log(req.session.user)
    //req.session.equipe = idCp;

    var fct = null;
    if(req.param("sem",null)===null){
      fct = function (callback) {
        GestionHoraire.getSemaine(dateNow, callback);
      };
    }else{
      fct = function (callback) {
        GestionHoraire.getSemaineId(options, callback);
      }
    }


    async.series([
        function (callback) {
          options.req=req;
          GestionHoraire.getListPers(options, callback);
        },fct,function (callback) {
          GestionHoraire.getPole(null, callback);
        },function (callback) {
          GestionHoraire.getListSemaine(null, callback);
        }],
      function (err, results) {
        if (err)
        {
          sails.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        else{

          var gHgroupe = [];
          async.eachSeries(results[0],function (groupe,next) {
            var opt = [];
            opt.id_pers = groupe.id_pers;

            //Recuperation date now
            var debSplit = results[1][0].date_debut.split('/');
            var finSplit = results[1][0].date_fin.split('/');
            var dateDeb = new Date(""+debSplit[1]+"/"+debSplit[0]+"/"+debSplit[2]);
            var dateFin = new Date(""+finSplit[1]+"/"+finSplit[0]+"/"+finSplit[2]);
            dateFin.setDate(dateFin.getDate()+1);
            dateDeb.setDate(dateDeb.getDate()+1);

            var currentDate = dateDeb;

            /**
             * Boucle async
             * */

            var listPers = [];
            async.whilst(function () {
                return currentDate <= dateFin;
              },
              function (nextt) {
                //Recuperation des donnée
                //opt.date = dateNow;
                var dat = currentDate.toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);
                var datSplt =dat.split('/');
                ////console.log(dat);
                opt.date = datSplt[2]+"/"+datSplt[1]+"/"+datSplt[0];

                async.series([
                  function (callback) {
                    GestionHoraire.getHoraireByPersDate(opt,callback);
                  }
                ],function (err,resultGH) {
                  if (err){
                    nextt();
                  }else{

                    listPers.push(resultGH[0]);
                    //sails.log(resultGH[0]);
                    currentDate = new Date(currentDate.setTime( currentDate.getTime() + 1 * 86400000 ));
                    nextt();
                  }
                })
              },
              function (err) {
                // All things are done!

                //sails.log(listPers);
                groupe.gh = listPers;
                gHgroupe.push(groupe);
                next();
              });




          },function (err) {
            if (err)
            {
              return res.badRequest("Problème avec la récupération des données dans la base");
            }
            else{
              var retour = [];
              retour['menu'] = menu;
              retour['result'] = gHgroupe;
              retour['semaine'] = results[1];
              retour['pole'] = results[2];
              retour['date'] = dateNow;
              retour['listsemaine'] = results[3];
              retour['poleid'] = req.param("pole",req.session.id_departement);
              retour['semid'] = req.param("sem");
              return res.view('pages/Gestion_Horaire/gestionHoraireVue', retour)
            }
          })
        }

      });
  },



  realGestionHoraire : function(req, res){
    //Personnel.getDataPersSql();
    if (!req.session.user) return res.redirect('/login');
    if (req.session.droit!=1) return res.redirect('/');
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    var dateNowLoc = new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);
    var dtSplit = dateNowLoc.split('/');
    var dateNow = req.param("datedeb",dtSplit[2]+"/"+dtSplit[1]+"/"+dtSplit[0]);
    var options = [];
    options.groupe = req.session.user;
    options.id_departement = req.param("pole",req.session.id_departement);
    options.id_sem =req.param("sem");




    ////console.log(req.session.user)
    //req.session.equipe = idCp;

    var fct = null;
    if(req.param("sem",null)===null){
      fct = function (callback) {
        GestionHoraire.getSemaine(dateNow, callback);
      };
    }else{
      fct = function (callback) {
        GestionHoraire.getSemaineId(options, callback);
      }
    }


    async.series([
        function (callback) {
          options.req=req;
          GestionHoraire.getListPers(options, callback);
        },fct,function (callback) {
          GestionHoraire.getPole(null, callback);
        },function (callback) {
          GestionHoraire.getListSemaine(null, callback);
        }],
      function (err, results) {
        if (err)
        {
          sails.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        else{

          var gHgroupe = [];
          async.eachSeries(results[0],function (groupe,next) {
            var opt = [];
            opt.id_pers = groupe.id_pers;
            opt.id_eq = groupe.id_eq;


            async.series([
              function (callback) {
                GestionHoraire.getHoraireJournaliereByEq(opt, callback);
              }
            ],function (err,results_hor) {
              if (err)
              {
                sails.log(err);
                next();
                //return res.badRequest("Problème avec la récupération des données dans la base");
              }else{
                //Recuperation date now
                var debSplit = results[1][0].date_debut.split('/');
                var finSplit = results[1][0].date_fin.split('/');
                var dateDeb = new Date(""+debSplit[1]+"/"+debSplit[0]+"/"+debSplit[2]);
                var dateFin = new Date(""+finSplit[1]+"/"+finSplit[0]+"/"+finSplit[2]);
                dateFin.setDate(dateFin.getDate()+1);
                dateDeb.setDate(dateDeb.getDate()+1);

                var currentDate = dateDeb;

                /**
                 * Boucle async
                 * */

                var listPers = [];
                async.whilst(function () {
                    return currentDate <= dateFin;
                  },
                  function (nextt) {
                    //Recuperation des donnée
                    //opt.date = dateNow;
                    var dat = currentDate.toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);
                    var datSplt =dat.split('/');
                    console.log(dat);
                    opt.date = datSplt[0]+"/"+datSplt[1]+"/"+datSplt[2];

                    async.series([
                      function (callback) {
                        GestionHoraire.getRealHoraireByPersDate(opt,callback);
                      }
                    ],function (err,resultGH) {
                      if (err){
                        nextt();
                      }else{


                        var obj = {};
                        obj.data = resultGH[0];
                        obj.date = datSplt[0]+"/"+datSplt[1]+"/"+datSplt[2];
                        listPers.push(obj);
                        //sails.log(resultGH[0]);
                        currentDate = new Date(currentDate.setTime( currentDate.getTime() + 1 * 86400000 ));
                        nextt();
                      }
                    })
                  },
                  function (err) {
                    // All things are done!

                    //sails.log(listPers);
                    groupe.gh = listPers;
                    groupe.ht = results_hor[0];
                    gHgroupe.push(groupe);
                    next();
                  });

              }
            });
          },function (err) {
            if (err)
            {
              return res.badRequest("Problème avec la récupération des données dans la base");
            }
            else{
              var retour = [];
              retour['menu'] = menu;
              retour['result'] = gHgroupe;
              retour['semaine'] = results[1];
              retour['pole'] = results[2];
              retour['date'] = dateNow;
              retour['listsemaine'] = results[3];
              retour['poleid'] = req.param("pole",req.session.id_departement);
              retour['semid'] = req.param("sem");
              return res.view('pages/Gestion_Horaire/realHoraireVue', retour)
            }
          })
        }

      });
  },


  getDataGestionHoraire : function (req, res) {
    //if (!req.session.user) return res.redirect('/login')
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    var retour=[];
    //retour['menu']=menu;

    var options = [];
    var dateNow = new Date().toISOString().replace(/-/,'').replace(/-/,'').substr(0,8);
    ////console.log("date now: "+dateNow);
    options.dateess = dateNow;
    options.dateess2 = dateNow;
    options.idPers = 38;

    async.series([
        function(callback){
          GestionHoraire.getHoraireParDate(options, callback);
        }],
      function(err, results) {
        if (err) {
          console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        var retour=[];
        retour['resultat']=results[0]; //results[0]
        retour['menu']=menu;
        retour['var_excel']=1; //results[0]
        //retour['layout']=false;
        ////console.log(retour);
        //  return
        res.view('pages/Gestion_Horaire/GestionHoraire',retour)
        //  res.ok(JSON.stringify(results[0]));
      });
  },

  getDataGestionHoraireAlmerys : function (req, res) {
    //if (!req.session.user) return res.redirect('/login')
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    var retour=[];
    //retour['menu']=menu;

    var options = [];
    var dateNow = new Date().toISOString().replace(/-/,'').replace(/-/,'').substr(0,8);
    ////console.log("date now: "+dateNow);
    options.dateess = dateNow; // "20170103"
    options.dateess2 = dateNow;
    options.idPers = 38;

    async.series([
        function(callback){
          GestionHoraire.getHoraireParDate(options, callback);
        }],
      function(err, results) {
        if (err) {
          console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        var retour=[];
        retour['resultat']=results[0]; //results[0]
        retour['menu']=menu;
        retour['var_excel']=1; //results[0]
        //retour['layout']=false;
        ////console.log(retour);
        //  return
        res.view('pages/Gestion_Horaire/GestionHoraireAlmerys',retour)
        //  res.ok(JSON.stringify(results[0]));
      });
  },

  //tableau liste horaire
  getLsHoraire: function (req, res) {
    //if (!req.session.user) return res.redirect('/login');
    var options = [];
    //console.log("date debut  param= "+ req.param('datedeb',null));
    //console.log("date fin  param = "+ req.param('datefin',null));
    var dateess = "";
    var dateess2 = "";

    var dateNow = new Date().toISOString().replace(/-/,'').replace(/-/,'').substr(0,8);
    dateess = dateNow;
    dateess2 = dateNow;

    if(req.param('datedeb',null) != "" && req.param('datefin',null) != "") {
      //console.log("Deb null");
      /*var dateNow = new Date().toISOString().replace(/-/,'').replace(/-/,'').substr(0,8);
      dateess = "20170103";
      dateess2 = dateNow;*/

      dateess = req.param('datedeb',''+new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8);
      dateess2 = req.param('datefin',''+new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8);

      //console.log("date debut  1= "+ dateess);
      //console.log("date fin  1= "+ dateess2);
      //console.log("Fin");
    }

    options.dateess = dateess;
    options.dateess2 = dateess2;

    //console.log("date debut  H= "+ options.dateess);
    //console.log("date fin  H = "+ options.dateess2);

    async.series([
        function(callback){
          GestionHoraire.getHoraireParDate(options, callback);
        }],
      function(err, results) {
        if (err) {
          console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        var retour=[];
        retour['resultat']=results[0]; //results[0]
        res.view( 'pages/Gestion_Horaire/tableauListeHoraire', retour);
      });
  },

  getXlGestionHoraire : function (req, res) {
//recuperation de la library jkexcel
    //console.log("EXCEL");
    var path = require('path');
    var kexcel = require('jkexcel');
    var HashMap = require('hashmap'); //hashMap
    var map = new HashMap();
    var options = [];//option requette
    var dateess = "";
    var dateess2 = "";

    if(req.param('datedeb',null) == null && req.param('datefin',null) == null) {
      var dateNow = new Date().toISOString().replace(/-/,'').replace(/-/,'').substr(0,8);
      dateess = "20170103";
      dateess2 = dateNow;
    }
    else{
      dateess = req.param('datedeb',''+new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8);
      dateess2 = req.param('datefin',''+new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8);
    }
    //console.log("Req param = "+req.param('datedeb',null)+"   dateFin = "+req.param('datefin',null));
    //console.log("dateDeb = "+dateess+"   dateFin = "+dateess2);

    options.dateess = dateess;
    options.dateess2 = dateess2;

    async.series([
        function(callback){
          GestionHoraire.getHoraireParDate(options, callback);
        }],
      function(err, results) {
        if (err) {
          console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        ////console.log("Length ==>  "+results[0].length);
        kexcel.open(path.join('', 'templates/Gestion_Horaire_Classique.xlsx')).then(function(workbook) {  //test_semaine.xlsx
          var sheet = workbook.getSheet(0);

          //Insertion data dans HashMap
          //console.log("HASHMAP");
          for(var i = 3; i<results[0].length; i++)
          {
            var key = parseInt(results[0][i].matricule);
            //console.log(parseInt(results[0][i].matricule));
            if(map.has(key)) //
            {
              //console.log("Existe");
              var mapUpdateDate = map.get(key);
              //console.log(mapUpdateDate);

              mapUpdateDate.set(results[0][i].dateldt, results[0][i].duree);
              //console.log("updated ==>  "+mapUpdateDate);

              mapUpdateDate.forEach(function(heure, date) {
                //console.log("Updated values ====> "+date + " : " + heure);
              });
              map.remove(key);
              map.set(key,mapUpdateDate);
            }
            else{
              //console.log("N'existe pas ");
              var mapDuree = new HashMap();
              mapDuree.set(results[0][i].dateldt, results[0][i].duree);
              map.set(key, mapDuree);
            }
          }
          //console.log("FIN HASHMAP");

          //parcours du fichier excel
          for(var j = 3; j<sheet.getLastRowNumber(); j++)
          {
            var key = parseInt(sheet.getCellValue(j,1));
            var has = map.has(key);
            //console.log("HAS ==>  "+sheet.getCellValue(j,1)+"  "+has);
            if(map.has(key)) // si matricule == clé
            {
              //console.log("Existe ===> key =  ; cell = "+sheet.getCellValue(j,1));

              //console.log("===============> "+map.get(key));

              var colonne = 17;
              var i = 0;
              map.get(key).forEach(function(heure, date) { //parcours value
                //console.log("Date + Heure MAP ====> "+date + " : " + heure);
                i = i +1;
                var d = heure; //Format heures
                var h = Math.floor(d / 3600);
                var m = Math.floor(d % 3600 / 60);
                var s = Math.floor(d % 3600 % 60);
                var hDisplay = h > 0 ? h + (h == 1 ? "" : "") : "";
                var mDisplay = m > 0 ? m + (m == 1 ? "" : "") : "";
                var sDisplay = s > 0 ? s + (s == 1 ? " s " : " s ") : "";
                var duereeHeure = 0;

                if(hDisplay == 0){
                  if(mDisplay == 0){
                    duereeHeure = 0;
                  }
                  duereeHeure = "0," + mDisplay;
                }else{
                  if(mDisplay == 0){
                    duereeHeure = hDisplay;
                  }
                  duereeHeure = hDisplay + "," + mDisplay;
                }

                GestionHoraire.setSeparator(date,function(err, separatedDate){ //Get date par matricule
                  if (err) console.log(err);

                  //console.log("=====================================================>  DATE"+ separatedDate);
                  sheet.setCellValue(2,colonne, separatedDate); // set datel
                });
                if(heure == null)
                {
                  sheet.setCellValue(j,colonne, 0); // update durée
                }
                sheet.setCellValue(j,colonne, duereeHeure); // update durée
                if(i == 6)
                {
                  colonne = colonne + 9;
                  i = 0;
                }
                colonne = colonne + 2;
              });
            }else{
              //console.log("N'existe pas ; cell = "+sheet.getCellValue(j,1));
              sheet.setCellValue(j,17, 0); // update durée
            }
          }
          res.setHeader('Content-disposition', 'attachment; filename=GestionHoraireClassique.xlsx');
          res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          workbook.pipe(res);
        });
      });
  },

  //set semaine

  getXlGestionHoraireAlmerys : function (req, res) {
//recuperation de la library jkexcel
    //console.log("EXCEL");
    var path = require('path');
    var kexcel = require('jkexcel');
    var HashMap = require('hashmap'); //hashMap
    var map = new HashMap();
    var options = [];//option requette
    var dateess = "";
    var dateess2 = "";

    if(req.param('datedeb',null) == null && req.param('datefin',null) == null) {
      var dateNow = new Date().toISOString().replace(/-/,'').replace(/-/,'').substr(0,8);
      dateess = "20170103";
      dateess2 = dateNow;
    }
    else{
      dateess = req.param('datedeb',''+new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8);
      dateess2 = req.param('datefin',''+new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8);
    }
    //console.log("Req param = "+req.param('datedeb',null)+"   dateFin = "+req.param('datefin',null));
    //console.log("dateDeb = "+dateess+"   dateFin = "+dateess2);

    options.dateess = dateess;
    options.dateess2 = dateess2;

    async.series([
        function(callback){
          GestionHoraire.getHoraireParDate(options, callback);
        }],
      function(err, results) {
        if (err) {
          console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        ////console.log("Length ==>  "+results[0].length);
        kexcel.open(path.join('', 'templates/Gestion_Horaire_Almerys.xlsx')).then(function(workbook) {  //Gestion_Horaire_Classique.xlsx
          var sheet = workbook.getSheet(0);

          //Insertion data dans HashMap
          //console.log("HASHMAP");
          for(var i = 3; i<results[0].length; i++)
          {
            var key = parseInt(results[0][i].matricule);
            //console.log(parseInt(results[0][i].matricule));
            if(map.has(key)) //
            {
              //console.log("Existe");
              var mapUpdateDate = map.get(key);
              //console.log(mapUpdateDate);

              mapUpdateDate.set(results[0][i].dateldt, results[0][i].duree);
              //console.log("updated ==>  "+mapUpdateDate);

              mapUpdateDate.forEach(function(heure, date) {
                //console.log("Updated values ====> "+date + " : " + heure);
              });
              map.remove(key);
              map.set(key,mapUpdateDate);
            }
            else{
              //console.log("N'existe pas ");
              var mapDuree = new HashMap();
              mapDuree.set(results[0][i].dateldt, results[0][i].duree);
              map.set(key, mapDuree);
            }
          }
          //console.log("FIN HASHMAP");

          //parcours du fichier excel
          for(var j = 3; j<sheet.getLastRowNumber(); j++)
          {
            var key = parseInt(sheet.getCellValue(j,1));
            var has = map.has(key);
            //console.log("HAS ==>  "+sheet.getCellValue(j,1)+"  "+has);
            if(map.has(key)) // si matricule == clé
            {
              //console.log("Existe ===> key =  ; cell = "+sheet.getCellValue(j,1));

              //console.log("===============> "+map.get(key));

              var colonne = 17;
              var i = 0;
              map.get(key).forEach(function(heure, date) { //parcours value
                //console.log("Date + Heure MAP ====> "+date + " : " + heure);
                i = i +1;
                var d = heure; //Format heures
                var h = Math.floor(d / 3600);
                var m = Math.floor(d % 3600 / 60);
                var s = Math.floor(d % 3600 % 60);
                var hDisplay = h > 0 ? h + (h == 1 ? "" : "") : "";
                var mDisplay = m > 0 ? m + (m == 1 ? "" : "") : "";
                var sDisplay = s > 0 ? s + (s == 1 ? " s " : " s ") : "";
                var duereeHeure = 0;

                if(hDisplay == 0){
                  if(mDisplay == 0){
                    duereeHeure = 0;
                  }
                  duereeHeure = "0," + mDisplay;
                }else{
                  if(mDisplay == 0){
                    duereeHeure = hDisplay;
                  }
                  duereeHeure = hDisplay + "," + mDisplay;
                }

                GestionHoraire.setSeparator(date,function(err, separatedDate){ //Get date par matricule
                  if (err) console.log(err);
                  sheet.setCellValue(2,colonne, separatedDate); // set datel
                });
                if(heure == null)
                {
                  sheet.setCellValue(j,colonne, 0); // update durée
                }
                sheet.setCellValue(j,colonne, duereeHeure); // update durée
                if(i == 6)
                {
                  colonne = colonne + 9;
                  i = 0;
                }
                colonne = colonne + 2;
              });
            }else{
              //console.log("N'existe pas ; cell = "+sheet.getCellValue(j,1));
              sheet.setCellValue(j,17, 0); // update durée
            }
          }
          res.setHeader('Content-disposition', 'attachment; filename=GestionHoraireAlmerys.xlsx');
          res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          workbook.pipe(res);
        });
      });
  },

  //set nom et prenom
  setXlNomPrenom : function (req, res) {
//recuperation de la library jkexcel
    //console.log("EXCEL");
    var path = require('path');
    var kexcel = require('jkexcel');
    var HashMap = require('hashmap'); //hashMap
    var map = new HashMap();
    var options = [];//option requette
    options.matricule = 0;
    async.series([
        function(callback){
          GestionHoraire.getNomPrenom(options, callback);
        }],
      function(err, results) {
        if (err) {
          console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        ////console.log("Length ==>  "+results[0].length);
        kexcel.open(path.join('', 'templates/Gestion_Horaire_Almerys.xlsx')).then(function(workbook) {   //test_semaine.xlsx
          var sheet = workbook.getSheet(0);

          //Insertion data dans HashMap
          //console.log("HASHMAP");
          for(var i = 3; i<results[0].length; i++)
          {
            var key = parseInt(results[0][i].matricule);
            //console.log(parseInt(results[0][i].matricule));
            if(map.has(key)) //
            {
              //console.log("Existe");
              map.remove(key);
              map.set(results[0][i].id_pers, results[0][i].nom +" "+results[0][i].prenom);
            }
            else{
              //console.log("N'existe pas ");
              map.set(results[0][i].id_pers, results[0][i].nom +" "+results[0][i].prenom);
            }
          }
          //console.log("FIN HASHMAP");

          //parcours du fichier excel
          for(var j = 3; j<sheet.getLastRowNumber(); j++)
          {
            var key = parseInt(sheet.getCellValue(j,1)); // ligne + colonne matricule
            var has = map.has(key);
            //console.log("HAS ==>  "+sheet.getCellValue(j,1)+"  "+has);
            if(map.has(key)) // si matricule == clé
            {
              sheet.setCellValue(j,3, map.get(key));
            }
          }
          res.setHeader('Content-disposition', 'attachment; filename=GestionHoraireClassique.xlsx');
          res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          workbook.pipe(res);
        });
      });
  },

  ghoraire : function (req,res) {
    /*
    * checking sessions
    * */
    if (!req.session.user) return res.redirect('/login');
    if (req.session.droit!=1) return res.redirect('/');
    //selecting menu attributes
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    //getting date now using if  selected date is undefined
    var dateNowLoc = new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);

    //create options using for many request
    var dtSplit = dateNowLoc.split('/');
    var dateNow = req.param("datedeb",dtSplit[2]+"/"+dtSplit[1]+"/"+dtSplit[0]);
    var options = [];
    options.groupe = req.session.user;
    options.id_departement = req.param("pole",req.session.id_departement);

      options.id_sem =req.param("sem");

    var id_sem = req.param("sem");

    /*
    * fonction dynamique pour recuperer la datede debut et fin de la semaine selectionner
    * */
    var fct = null;
    if(req.param("sem",null)===null){
      fct = function (callback) {
        GestionHoraire.getSemaine(dateNow, callback);
      };
    }else{
      fct = function (callback) {
        GestionHoraire.getSemaineId(options, callback);
      }
    }

    //Debut async 1
    var idCp = req.param('idcp', null);
    var boolean_have_majoration=false;
    options.id_groupe=idCp;
    console.log(idCp);
    async.series([
        function (callback) {
          if(idCp!=null && idCp!='')
          {
            GestionHoraire.getListPersMultiDepPerEquipe(options,req,callback);
          }
          else
          {
            options.req = req;
            GestionHoraire.getListPers(options, callback);
          }
        },fct,function (callback) {
          GestionHoraire.getPole(null, callback);
        },function (callback) {
          GestionHoraire.getListSemaine(null, callback);
        },function (callback) {
          if(idCp!=null && idCp!='')
          {
            GestionHoraire.checkIfHaveMajoration(idCp,false,callback);
          }
          else
          {
            GestionHoraire.checkIfHaveMajoration(options.id_departement,true,callback);
          }
        },function(callback) {
          {
            GestionHoraire.getPersHCHeureSup(callback);
          }
        }

      ],
      function (err, results) {
        if (err)
        {
          sails.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        else{

          var gHgroupe = [];

          id_sem = results[1][0].id;
          //Debut async 2
          async.eachSeries(results[0],function (groupe,next) {
            var opt = [];
            opt.id_pers = groupe.id_pers;

              //Recuperation date now
              var debSplit = results[1][0].date_debut.split('/');

              var finSplit = results[1][0].date_fin.split('/');
              var dateDeb = new Date(""+debSplit[1]+"/"+debSplit[0]+"/"+debSplit[2]);
              var dateFin = new Date(""+finSplit[1]+"/"+finSplit[0]+"/"+finSplit[2]);
              dateFin.setDate(dateFin.getDate()+1);
              dateDeb.setDate(dateDeb.getDate()+1);

              var currentDate = dateDeb;

              var listPers = [];
              var rPointageJour = [];

              //Debut async 3
              async.whilst(function () {
                  return currentDate <= dateFin;
                },
                function (nextt) {
                  //Recuperation des donnée
                  //opt.date = dateNow;
                  var dat = currentDate.toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);
                  var datSplt =dat.split('/');
                  ////console.log(dat);
                  opt.date = datSplt[2]+"/"+datSplt[1]+"/"+datSplt[0];

                  //Debut async 4
                  async.series([
                    function (callback) {
                      GestionHS.getHSPJByPersDate(opt,callback);
                    }
                  ],function (err,resultGH) {
                    if (err){
                      nextt();
                    }else{

                      listPers.push(resultGH[0]);
                      //sails.log(resultGH[0]);
                      currentDate = new Date(currentDate.setTime( currentDate.getTime() + 1 * 86400000 ));
                      nextt();
                    }
                  });

                  //Fin async 4
                },
                function (err) {
                  // All things are done!

                  //sails.log(listPers);
                  groupe.gh = listPers;
                  gHgroupe.push(groupe);
                  next();
                });


          },function (err) {
            if (err)
            {
              return res.badRequest("Problème avec la récupération des données dans la base");
            }
            else{
              var retour = [];
              boolean_have_majoration = results[4];
              retour['menu'] = menu;
              retour['result'] = gHgroupe;
              retour['semaine'] = results[1];
              retour['pole'] = results[2];
              retour['date'] = dateNow;
              retour['layout'] = false;
              retour['listsemaine'] = results[3];
              retour['poleid'] = req.param("pole",req.session.id_departement);
              retour['semid'] = req.param("sem",id_sem);
              retour['have_majoration'] = boolean_have_majoration;
              retour['hc_pers'] = results[5];
              return res.view('pages/Gestion_Horaire/gestionHoraireVue2_0', retour)
            }
          });

          //Fin async 2
        }

      });
    //Fin async 1

  }

  ,ghoraireForMoment : function (req,res) {
    /*
    * checking sessions
    * */
    if (!req.session.user) return res.redirect('/login');

    //selecting menu attributes
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    //getting date now using if  selected date is undefined
    var dateNowLoc = new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);

    //create options using for many request
    var dtSplit = dateNowLoc.split('/');
    var dateNow = req.param("datedeb",dtSplit[2]+"/"+dtSplit[1]+"/"+dtSplit[0]);
    var options = [];
    options.groupe = req.session.user;
    options.id_departement = req.param("pole",req.session.id_departement);
    options.id_sem = req.param("sem");

    var id_sem = req.param("sem");

    var gHgroupe = [];
    var listdataSm = {};
    /*
    * fonction dynamique pour recuperer la datede debut et fin de la semaine selectionner
    * */
    var fct = null;
    if(req.param("sem",null)===null){
      fct = function (callback) {
        GestionHoraire.getSemaine(dateNow, callback);
      };
    }else{
      fct = function (callback) {
        GestionHoraire.getSemaineMultiple(options, callback);
      }
    }

    //Debut async 1

    async.series([
        function (callback) {
          GestionHoraire.getListPersMultiDep(options, callback);
        },fct,function (callback) {
          GestionHoraire.getPole(null, callback);
        },function (callback) {
          GestionHoraire.getListSemaine(null, callback);
        }],
      function (err, results) {
        if (err)
        {
          sails.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        else{



          id_sem = results[1][0].id;

          var listSm = [];


          var allSem = results[1];

          async.eachSeries(allSem,function (sem, nxt) {
            listSm.push(""+sem.num_semaine);
             gHgroupe = [];

            //Debut async 2
            async.eachSeries(results[0],function (groupe,next) {

              var opt = [];
              opt.id_pers = groupe.id_pers;

              //Recuperation date now
              var debSplit = sem.date_debut.split('/');

              var finSplit = sem.date_fin.split('/');
              var dateDeb = new Date(""+debSplit[1]+"/"+debSplit[0]+"/"+debSplit[2]);
              var dateFin = new Date(""+finSplit[1]+"/"+finSplit[0]+"/"+finSplit[2]);
              dateFin.setDate(dateFin.getDate()+1);
              dateDeb.setDate(dateDeb.getDate()+1);

              var currentDate = dateDeb;

              var listPers = [];
              var rPointageJour = [];

              //Debut async 3
              async.whilst(function () {
                  return currentDate <= dateFin;
                },
                function (nextt) {
                  //Recuperation des donnée
                  //opt.date = dateNow;
                  var dat = currentDate.toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);
                  var datSplt =dat.split('/');
                  ////console.log(dat);
                  opt.date = datSplt[2]+"/"+datSplt[1]+"/"+datSplt[0];

                  //Debut async 4
                  async.series([
                    function (callback) {
                      GestionHS.getHSPJByPersDate(opt,callback);
                    }
                  ],function (err,resultGH) {
                    if (err){
                      nextt();
                    }else{

                      listPers.push(resultGH[0]);
                      //sails.log(resultGH[0]);
                      currentDate = new Date(currentDate.setTime( currentDate.getTime() + 1 * 86400000 ));
                      nextt();
                    }
                  });

                  //Fin async 4
                },
                function (err) {
                  // All things are done!

                  //sails.log(listPers);
                  groupe.gh = listPers;
                  gHgroupe.push(groupe);
                  next();
                });


            },function (err) {
              if (err)
              {
                return res.badRequest("Problème avec la récupération des données dans la base");
              }
              else{

                sails.log("SEMAINE ==>"+sem.num_semaine);

                var s_temp = gHgroupe;

                if(sem.num_semaine==='22'){
                  listdataSm[""+sem.num_semaine]=s_temp;
                }else{
                  s_temp[0].gh = [];
                  listdataSm[""+sem.num_semaine]=s_temp;
                }

                gHgroupe=[];
                //sails.log(listdataSm[""+sem.num_semaine][0].gh);

                nxt()
              }
            });

            //Fin async 2


          },function (err) {
            if (err)
            {
              sails.log(err);
              return res.badRequest("Problème avec la récupération des données dans la base");
            }
            else{
              sails.log(listdataSm["21"][0].gh);
              sails.log(listdataSm["22"][0].gh);
              var retour = [];
              retour['menu'] = menu;
              retour['result'] = listdataSm;
              retour['resultSem'] = listSm;
              retour['semaine'] = results[1];
              retour['pole'] = results[2];
              retour['date'] = dateNow;
              retour['listsemaine'] = results[3];
              retour['poleid'] = req.param("pole",req.session.id_departement);
              retour['semid'] = req.param("sem",id_sem);
              return res.view('pages/Gestion_Horaire/gestionHoraireVueMulti2_0', retour)
            }
          })


        }

      });
    //Fin async 1

  },setXlNomPrenom : function (req, res) {
//recuperation de la library jkexcel
    //console.log("EXCEL");
    var path = require('path');
    var kexcel = require('jkexcel');
    var HashMap = require('hashmap'); //hashMap
    var map = new HashMap();
    var options = [];//option requette
    options.matricule = 0;
    async.series([
        function(callback){
          GestionHoraire.getNomPrenom(options, callback);
        }],
      function(err, results) {
        if (err) {
          console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        ////console.log("Length ==>  "+results[0].length);
        kexcel.open(path.join('', 'templates/Gestion_Horaire_Almerys.xlsx')).then(function(workbook) {   //test_semaine.xlsx
          var sheet = workbook.getSheet(0);

          //Insertion data dans HashMap
          //console.log("HASHMAP");
          for(var i = 3; i<results[0].length; i++)
          {
            var key = parseInt(results[0][i].matricule);
            //console.log(parseInt(results[0][i].matricule));
            if(map.has(key)) //
            {
              //console.log("Existe");
              map.remove(key);
              map.set(results[0][i].id_pers, results[0][i].nom +" "+results[0][i].prenom);
            }
            else{
              //console.log("N'existe pas ");
              map.set(results[0][i].id_pers, results[0][i].nom +" "+results[0][i].prenom);
            }
          }
          //console.log("FIN HASHMAP");

          //parcours du fichier excel
          for(var j = 3; j<sheet.getLastRowNumber(); j++)
          {
            var key = parseInt(sheet.getCellValue(j,1)); // ligne + colonne matricule
            var has = map.has(key);
            //console.log("HAS ==>  "+sheet.getCellValue(j,1)+"  "+has);
            if(map.has(key)) // si matricule == clé
            {
              sheet.setCellValue(j,3, map.get(key));
            }
          }
          res.setHeader('Content-disposition', 'attachment; filename=GestionHoraireClassique.xlsx');
          res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          workbook.pipe(res);
        });
      });
  },

  export_gh : function (req,res) {
    /*
    * checking sessions
    * */

    //var excelbuilder = require('msexcel-builder');
    var xl = require('excel4node');

    if (!req.session.user) return res.redirect('/login');
    //var workbook = excelbuilder.createWorkbook('./', 'sample.xlsx');
    var wb = new xl.Workbook();
    //var sheet1 = workbook.createSheet('sheet1', 500, 500);
    var ws = wb.addWorksheet('GESTION HORAIRE');
    var myStyle = wb.createStyle({
      font: {
        bold: true,
      },
      alignment: {
        wrapText: true,
        horizontal: 'center',
        vertical: 'center'
      },
      fill: {
        type: 'pattern', // the only one implemented so far.
        patternType: 'solid', // most common.
        fgColor: '#b4c6e7'// bgColor only applies on patternTypes other than solid.
      }
    });


    var myStyleSemaine = wb.createStyle({
      font: {
        bold: true,
        size: 11


      },
      alignment: {
        wrapText: true,
        horizontal: 'center',
        vertical: 'center'
      },
      fill: {
        type: 'pattern', // the only one implemented so far.
        patternType: 'solid', // most common.
        fgColor: '#b4c6e7'// bgColor only applies on patternTypes other than solid.
      }
    });

    var myStyleNom = wb.createStyle({
      font: {
        bold: true,
        size: 11
      },
      alignment: {
        wrapText: true,
        horizontal: 'center',
        vertical: 'center'
      },
      fill: {
        type: 'pattern', // the only one implemented so far.
        patternType: 'solid', // most common.
        fgColor: '#f2f2f2'// bgColor only applies on patternTypes other than solid.
      }
    });


    var myStyleBorder = wb.createStyle({
      border: { // §18.8.4 border (Border)
      left: {
        style: 'thin', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
          color: '#000000'// HTML style hex value
      },
      right: {
        style: 'thin',
          color: '#000000'
      },
      top: {
        style: 'thin',
          color: '#000000'
      },
      bottom: {
        style: 'thin',
          color: '#000000'
      },
      diagonal: {
        style: 'thin',
          color: '#f2f2f2'
      },
      diagonalDown: true,
        diagonalUp: true,
        outline: true
    }
    });

    var th = wb.createStyle({
      font: {
        bold: true,
        size: 11
      },
      alignment: {
        wrapText: true,
        horizontal: 'center',
        textRotation : 90,
        vertical: 'center'
      },
      fill: {
        type: 'pattern', // the only one implemented so far.
        patternType: 'solid', // most common.
        fgColor: '#f2f2f2'// bgColor only applies on patternTypes other than solid.
      }
    });


    var style_date = wb.createStyle({
      font: {
        color: '#000000',
        size: 11
      },
      alignment: {
        wrapText: true,
        horizontal: 'center',
        textRotation : 90,
        vertical: 'center'
      }
    });

    ws.cell(1,1,3,3,true).string("IDENTIFICATIONS").style(myStyle).style(myStyleBorder);
    ws.cell(4,3).string("Nom(s) & Prénom(s)").style(myStyleNom).style(myStyleBorder);
    ws.cell(4,2).string("Matricule").style(th).style(myStyleBorder);
    ws.cell(4,1).string("UNITE/POLE").style(th).style(myStyleBorder);

    ws.row(4).setHeight(80);
    ws.column(3).setWidth(50);

    var style_name = wb.createStyle({
      font: {
        color: '#4709ff',
        size: 11
      }
    });



    var style_number = wb.createStyle({
      font: {
        size: 11
      },
      numberFormat: '#,##0.00;(#,##0.00);-'
    });


    var mavo_bsck = wb.createStyle({
      fill: {
        type: 'pattern', // the only one implemented so far.
        patternType: 'solid', // most common.
        fgColor: '#ffd966'// bgColor only applies on patternTypes other than solid.
      }
    });

    var mavo2_back = wb.createStyle({
      fill: {
        type: 'pattern', // the only one implemented so far.
        patternType: 'solid', // most common.
        fgColor: '#ffff99'// bgColor only applies on patternTypes other than solid.
      }
    });





    //getting date now using if  selected date is undefined
    var dateNowLoc = new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);

    //create options using for many request
    var dtSplit = dateNowLoc.split('/');
    var dateNow = req.param("datedeb",dtSplit[2]+"/"+dtSplit[1]+"/"+dtSplit[0]);
    var options = [];
    options.groupe = req.session.user;
    options.id_departement = req.param("pole",req.session.id_departement);
    options.id_sem = req.param("sem");

    /*
    * fonction dynamique pour recuperer la datede debut et fin de la semaine selectionner
    * */
    var fct = null;
    if(req.param("sem",null)===null){
      fct = function (callback) {
        GestionHoraire.getSemaine(dateNow, callback);
      };
    }else{
      fct = function (callback) {
        GestionHoraire.getSemaineId(options, callback);
      }
    }

    //Debut async 1

    async.series([
        function (callback) {
          options.req=req;
          GestionHoraire.getListPers(options, callback);
        },fct,function (callback) {
          GestionHoraire.getPole(null, callback);
        },function (callback) {
          GestionHoraire.getListSemaine(null, callback);
        }],
      function (err, results) {
        if (err)
        {
          sails.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        else{

          var gHgroupe = [];

          /*
          * for header excel id_sem = results[1][0].id;
          * */

          ws.cell(1,4,1,35,true).string("SEMAINE "+results[1][0].id).style(myStyleSemaine).style(myStyleBorder).style(mavo_bsck);
          ws.cell(2,4,2,24,true).string("Heure Travaillée par jour ").style(myStyleSemaine).style(myStyleBorder).style(mavo_bsck);
          ws.cell(2,25,2,35,true).string("Recap Semaine ").style(myStyleSemaine).style(myStyleBorder).style(mavo_bsck);
          ws.cell(3,25,4,25,true).string("Total  Heure sem").style(myStyleSemaine).style(myStyleBorder).style(mavo_bsck);
          ws.cell(3,26,3,29,true).string("Heure Majorée à").style(myStyleSemaine).style(myStyleBorder).style(mavo_bsck);
          ws.cell(3,30,3,31,true).string("Autre Heure").style(myStyleSemaine).style(myStyleBorder).style(mavo_bsck);
          ws.cell(3,32,3,35,true).string("Majoration").style(myStyleSemaine).style(myStyleBorder).style(mavo_bsck);
          /*
          * Heure  majoreé à
          * */

          ws.cell(4,26).string("30%").style({font: {size: 11}}).style(style_date).style(myStyleBorder).style(mavo_bsck);
          ws.cell(4,27).string("40%").style({font: {size: 11}}).style(style_date).style(myStyleBorder).style(mavo_bsck);
          ws.cell(4,28).string("50%").style({font: {size: 11}}).style(style_date).style(myStyleBorder).style(mavo_bsck);
          ws.cell(4,29).string("100%").style({font: {size: 11}}).style(style_date).style(myStyleBorder).style(mavo_bsck);

          /*
          * Autre Heure
          * */

          ws.cell(4,30).string("HC(+)").style({font: {size: 11}}).style(style_date).style(myStyleBorder).style(mavo_bsck);
          ws.cell(4,31).string("HD(-)").style({font: {size: 11}}).style(style_date).style(myStyleBorder).style(mavo_bsck);
          ws.cell(4,32).string("MAJ 30%").style({font: {size: 11}}).style(style_date).style(myStyleBorder).style(mavo_bsck);
          ws.cell(4,33).string("MAJ 40%").style({font: {size: 11}}).style(style_date).style(myStyleBorder).style(mavo_bsck);
          ws.cell(4,34).string("MAJ 50%").style({font: {size: 11}}).style(style_date).style(myStyleBorder).style(mavo_bsck);
          ws.cell(4,35).string("MAJ 100%").style({font: {size: 11}}).style(style_date).style(myStyleBorder).style(mavo_bsck);
          /*
          * Freezz row
          * */
          ws.column(3).freeze(4);
          ws.row(4).freeze();

          /*
          * Filter
          * */
          ws.row(4).filter();
          //Debut async 2

          var pers_nb = 5;
          async.eachSeries(results[0],function (groupe,next) {
            var opt = [];
            opt.id_pers = groupe.id_pers;

            /*sheet1.set(1, pers_nb, ""+groupe.matricule);
            sheet1.set(2,pers_nb, ""+groupe.nom+" "+groupe.prenom);*/

            var dhoraireJ = groupe.horaire_journaliere;

            console.log("DHC:"+dhoraireJ);

            ws.cell(pers_nb,3).string(""+groupe.nom+" "+groupe.prenom).style(style_name).style(myStyleBorder);
            ws.cell(pers_nb,2).string( ""+groupe.matricule).style({font: {size: 11}}).style(myStyleBorder);
            ws.cell(pers_nb,1).string( ""+groupe.dep).style({font: {size: 11}}).style(myStyleBorder);

              //Recuperation date now
              var debSplit = results[1][0].date_debut.split('/');
              var finSplit = results[1][0].date_fin.split('/');
              var dateDeb = new Date(""+debSplit[1]+"/"+debSplit[0]+"/"+debSplit[2]);
              var dateFin = new Date(""+finSplit[1]+"/"+finSplit[0]+"/"+finSplit[2]);
              dateFin.setDate(dateFin.getDate()+1);
              dateDeb.setDate(dateDeb.getDate()+1);

              var currentDate = dateDeb;

              var listPers = [];
              var rPointageJour = [];

            var sum_h_ref = "0";
            var sum_hs_ref = "0";
            var hs_tot = 0;

              //Debut async 3

            var ii = 4;
              async.whilst(function () {
                  return currentDate <= dateFin;
                },
                function (nextt) {
                  //Recuperation des donnée
                  //opt.date = dateNow;
                  var dat = currentDate.toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);
                  var datSplt =dat.split('/');
                  ////console.log(dat);
                  opt.date = datSplt[2]+"/"+datSplt[1]+"/"+datSplt[0];

                  var mois = [
                    "janvier",
                    "fevrier",
                    "mars",
                    "avril",
                    "mai",
                    "juin",
                    "juillet",
                    "aout",
                    "septembre",
                    "octobre",
                    "novembre",
                    "decembre",
                  ]

                  /*sheet1.set(ii, 2, ""+datSplt[2]+"/"+datSplt[1]+"/"+datSplt[0]);
                  sheet1.set(ii, 3, "heure total");
                  sheet1.set(ii+1, 3, "heure sup");*/

                  ws.cell(3,ii,3,ii+2,true).string( ""+datSplt[2]+"-"+mois[Number(datSplt[1])-1]).style(myStyleSemaine).style(myStyleBorder).style(mavo_bsck);

                  ws.cell(4,ii).string( "Heure Total").style({font: {size: 11}}).style(style_date).style(myStyleBorder).style(mavo_bsck);
                  ws.cell(4,ii+1).string("HS JOUR").style({font: {size: 11}}).style(style_date).style(myStyleBorder).style(mavo2_back);
                  ws.cell(4,ii+2).string("HS NUIT").style({font: {size: 11}}).style(style_date).style(myStyleBorder).style(mavo2_back);
                 /* ws.cell(5,ii).string( "heure total").style({font: {size: 14}});
                  ws.cell(5,ii+1).string( "heure sup").style({font: {size: 14}});*/



                  //Debut async 4
                  async.series([
                    function (callback) {
                      GestionHS.getHSPJByPersDate(opt,callback);
                    }
                  ],function (err,resultGH) {
                    if (err){
                      nextt();
                      ii+=3;
                    }else{

                      listPers.push(resultGH[0]);
                      sails.log(resultGH[0]);

                      if(resultGH[0].length>0){
                        if(resultGH[0].length>0){
                          /*sheet1.set(ii, pers_nb, resultGH[0][0].duree_prod);
                          sheet1.set(ii+1, pers_nb, resultGH[0][0].heure_sup || '');*/
                          var dp = resultGH[0][0].duree_prod || '00:00:00';
                          var dhs = resultGH[0][0].heure_sup || '00:00:00';
                          var hist = resultGH[0][0].historique || '';

                          /*if(dhs !=='00:00:00'){



                            if(hist!=='' && hist!=="''"){
                              var histSplit = dp.split(";");

                              var in_h = histSplit[0];
                              var out_h = histSplit[1];

                              var in_4 = '05:00:00';
                              var out_4 = '22:00:00';

                              if(in_h!==''&& in_h!==null){

                              }



                              var timeStart = new Date("01/01/2007 " + valuestart).getHours();
                              var timeEnd = new Date("01/01/2007 " + valuestop).getHours();
                            }

                          }*/

                          var dpSplit = dp.split(":");
                          var dhsSplit = dhs.split(":");
                          var dhcSplit = dhoraireJ.split(":");

                          var conge = Number(resultGH[0][0].conge || '0');



                          var dpNum = Number((Number(dpSplit[0])+(Number(dpSplit[1])/60)+(Number(dpSplit[2])/60/60)).toFixed(2));
                          var dhcNum = Number((Number(dhcSplit[0])+(Number(dhcSplit[1])/60)+(Number(dhcSplit[2])/60/60)).toFixed(2));


                          var congest = wb.createStyle({

                          });

                          if(conge>0){
                            dpNum += conge*dhcNum;
                            congest = wb.createStyle({
                              fill: {
                                type: 'pattern', // the only one implemented so far.
                                patternType: 'solid', // most common.
                                fgColor: '#be2bff'// bgColor only applies on patternTypes other than solid.
                              }
                            });
                          }else{

                            var is_f = resultGH[0][0].is_ferier || false;
                            if(is_f){
                              dpNum += dhcNum;
                              congest = wb.createStyle({
                                fill: {
                                  type: 'pattern', // the only one implemented so far.
                                  patternType: 'solid', // most common.
                                  fgColor: '#0bff97'// bgColor only applies on patternTypes other than solid.
                                }
                              });
                            }
                          }
                          var dhsNum = Number((Number(dhsSplit[0])+(Number(dhsSplit[1])/60)+(Number(dhsSplit[2])/60/60)).toFixed(2));

                          hs_tot += dhsNum;

                          if(isNaN(dpNum)){
                            ws.cell(pers_nb,ii).number(0).style(style_number).style(myStyleBorder).style(congest);
                          }else {
                            ws.cell(pers_nb,ii).number(dpNum).style(style_number).style(myStyleBorder).style(congest);
                          }

                          if(isNaN(dhsNum)){
                            ws.cell(pers_nb,ii+1).number(0).style(style_number).style(myStyleBorder);
                          }else{
                            ws.cell(pers_nb,ii+1).number(dhsNum).style(style_number).style(myStyleBorder);
                          }


                          ws.cell(pers_nb,ii+2).number(0).style(style_number).style(myStyleBorder);
                        }

                      }else{
                        ws.cell(pers_nb,ii).number(0).style(style_number).style(myStyleBorder);
                        ws.cell(pers_nb,ii+1).number(0).style(style_number).style(myStyleBorder);
                        ws.cell(pers_nb,ii+2).number(0).style(style_number).style(myStyleBorder);
                      }

                      sum_h_ref += '+'+xl.getExcelCellRef(pers_nb,ii);
                      sum_hs_ref += '+'+xl.getExcelCellRef(pers_nb,ii+1);
                      currentDate = new Date(currentDate.setTime( currentDate.getTime() + 1 * 86400000 ));
                      ii+=3;
                      nextt();
                    }
                  });

                  //Fin async 4
                },
                function (err) {
                  // All things are done!

                  //sails.log(listPers);

                  sum_h_ref += '';
                  sum_hs_ref += '';

                  sails.log(sum_h_ref);
                  sails.log(sum_hs_ref);
                  groupe.gh = listPers;
                  gHgroupe.push(groupe);



                  var hs30 = 0;
                  var hs40 = 0;

                  if(!isNaN(hs_tot)){
                    hs30 = hs_tot;
                  }
                  var hs50 = 0;
                  if(hs30>8 ){
                    hs30 = 8;
                    hs50 = hs_tot-8;
                  }
                  ws.cell(pers_nb,25).formula(sum_h_ref).style({font: {size: 11}}).style(myStyleBorder);
                  ws.cell(pers_nb,26).number(hs30).style(style_number).style(myStyleBorder);
                  ws.cell(pers_nb,27).number(0).style(style_number).style(myStyleBorder);
                  ws.cell(pers_nb,28).number(hs50).style(style_number).style(myStyleBorder);
                  ws.cell(pers_nb,29).number(0).style(style_number).style(myStyleBorder);
                  ws.cell(pers_nb,30).number(0).style(style_number).style(myStyleBorder);
                  ws.cell(pers_nb,31).number(0).style(style_number).style(myStyleBorder);

                  pers_nb+=1;
                  next();
                });


          },function (err) {
            if (err)
            {
              return res.badRequest("Problème avec la récupération des données dans la base");
            }
            else{
              var retour = [];
              retour['result'] = gHgroupe;
              retour['semaine'] = results[1];
              retour['pole'] = results[2];
              retour['date'] = dateNow;
              retour['listsemaine'] = results[3];
              retour['poleid'] = req.param("pole",req.session.id_departement);
              retour['semid'] = req.param("sem");
             // return res.view('pages/Gestion_Horaire/gestionHoraireVue2_0', retour)

              wb.write('assets/GHEXCEL/GHoraire_sem_'+req.param("sem")+'_'+req.param("pole",req.session.id_departement)+'.xlsx');

              setTimeout(function(){
                return res.redirect('/GHEXCEL/GHoraire_sem_'+req.param("sem")+'_'+req.param("pole",req.session.id_departement)+'.xlsx')
              },1000);


              //return res.ok('congratulations, your workbook created');

             /* workbook.save(function(ok){


                  return res.ok('congratulations, your workbook created');
              });*/
            }
          });

          //Fin async 2
        }

      });
    //Fin async 1

  },
  export_gh_old : function (req,res) {
    /*
    * checking sessions
    * */

    //var excelbuilder = require('msexcel-builder');
    var xl = require('excel4node');

    if (!req.session.user) return res.redirect('/login');
    //var workbook = excelbuilder.createWorkbook('./', 'sample.xlsx');
    var wb = new xl.Workbook();
    //var sheet1 = workbook.createSheet('sheet1', 500, 500);
    var ws = wb.addWorksheet('GESTION HORAIRE');
    var myStyle = wb.createStyle({
      font: {
        bold: true,
      },
      alignment: {
        wrapText: true,
        horizontal: 'center',
        vertical: 'center'
      },
      fill: {
        type: 'pattern', // the only one implemented so far.
        patternType: 'solid', // most common.
        fgColor: '#b4c6e7'// bgColor only applies on patternTypes other than solid.
      }
    });


    var myStyleSemaine = wb.createStyle({
      font: {
        bold: true,
        size: 11


      },
      alignment: {
        wrapText: true,
        horizontal: 'center',
        vertical: 'center'
      },
      fill: {
        type: 'pattern', // the only one implemented so far.
        patternType: 'solid', // most common.
        fgColor: '#b4c6e7'// bgColor only applies on patternTypes other than solid.
      }
    });

    var myStyleNom = wb.createStyle({
      font: {
        bold: true,
        size: 11
      },
      alignment: {
        wrapText: true,
        horizontal: 'center',
        vertical: 'center'
      },
      fill: {
        type: 'pattern', // the only one implemented so far.
        patternType: 'solid', // most common.
        fgColor: '#f2f2f2'// bgColor only applies on patternTypes other than solid.
      }
    });


    var myStyleBorder = wb.createStyle({
      border: { // §18.8.4 border (Border)
        left: {
          style: 'thin', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
          color: '#000000'// HTML style hex value
        },
        right: {
          style: 'thin',
          color: '#000000'
        },
        top: {
          style: 'thin',
          color: '#000000'
        },
        bottom: {
          style: 'thin',
          color: '#000000'
        },
        diagonal: {
          style: 'thin',
          color: '#f2f2f2'
        },
        diagonalDown: true,
        diagonalUp: true,
        outline: true
      }
    });

    var th = wb.createStyle({
      font: {
        bold: true,
        size: 11
      },
      alignment: {
        wrapText: true,
        horizontal: 'center',
        textRotation : 90,
        vertical: 'center'
      },
      fill: {
        type: 'pattern', // the only one implemented so far.
        patternType: 'solid', // most common.
        fgColor: '#f2f2f2'// bgColor only applies on patternTypes other than solid.
      }
    });


    var style_date = wb.createStyle({
      font: {
        color: '#000000',
        size: 11
      },
      alignment: {
        wrapText: true,
        horizontal: 'center',
        textRotation : 90,
        vertical: 'center'
      }
    });

    ws.cell(1,1,3,3,true).string("IDENTIFICATIONS").style(myStyle).style(myStyleBorder);
    ws.cell(4,3).string("Nom(s) & Prénom(s)").style(myStyleNom).style(myStyleBorder);
    ws.cell(4,2).string("Matricule").style(th).style(myStyleBorder);
    ws.cell(4,1).string("UNITE/POLE").style(th).style(myStyleBorder);

    ws.row(4).setHeight(80);
    ws.column(3).setWidth(50);

    var style_name = wb.createStyle({
      font: {
        color: '#4709ff',
        size: 11
      }
    });



    var style_number = wb.createStyle({
      font: {
        size: 11
      },
      numberFormat: '#,##0.00;(#,##0.00);-'
    });


    var mavo_bsck = wb.createStyle({
      fill: {
        type: 'pattern', // the only one implemented so far.
        patternType: 'solid', // most common.
        fgColor: '#ffd966'// bgColor only applies on patternTypes other than solid.
      }
    });

    var mavo2_back = wb.createStyle({
      fill: {
        type: 'pattern', // the only one implemented so far.
        patternType: 'solid', // most common.
        fgColor: '#ffff99'// bgColor only applies on patternTypes other than solid.
      }
    });





    //getting date now using if  selected date is undefined
    var dateNowLoc = new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);

    //create options using for many request
    var dtSplit = dateNowLoc.split('/');
    var dateNow = req.param("datedeb",dtSplit[2]+"/"+dtSplit[1]+"/"+dtSplit[0]);
    var options = [];
    options.groupe = req.session.user;
    options.id_departement = req.param("pole",req.session.id_departement);
    options.id_sem = req.param("sem");

    /*
    * fonction dynamique pour recuperer la datede debut et fin de la semaine selectionner
    * */
    var fct = null;
    if(req.param("sem",null)===null){
      fct = function (callback) {
        GestionHoraire.getSemaine(dateNow, callback);
      };
    }else{
      fct = function (callback) {
        GestionHoraire.getSemaineId(options, callback);
      }
    }

    //Debut async 1

    async.series([
        function (callback) {
          options.req=req;
          GestionHoraire.getListPers(options, callback);
        },fct,function (callback) {
          GestionHoraire.getPole(null, callback);
        },function (callback) {
          GestionHoraire.getListSemaine(null, callback);
        }],
      function (err, results) {
        if (err)
        {
          sails.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        else{

          var gHgroupe = [];

          /*
          * for header excel id_sem = results[1][0].id;
          * */

          ws.cell(1,4,1,31,true).string("SEMAINE "+results[1][0].id).style(myStyleSemaine).style(myStyleBorder).style(mavo_bsck);
          ws.cell(2,4,2,24,true).string("Heure Travaillée par jour ").style(myStyleSemaine).style(myStyleBorder).style(mavo_bsck);
          ws.cell(2,25,2,31,true).string("Recap Semaine ").style(myStyleSemaine).style(myStyleBorder).style(mavo_bsck);
          ws.cell(3,25,4,25,true).string("Total  Heure sem").style(myStyleSemaine).style(myStyleBorder).style(mavo_bsck);
          ws.cell(3,26,3,29,true).string("Heure Majorée à").style(myStyleSemaine).style(myStyleBorder).style(mavo_bsck);
          ws.cell(3,30,3,31,true).string("Autre Heure").style(myStyleSemaine).style(myStyleBorder).style(mavo_bsck);

          /*
          * Heure  majoreé à
          * */

          ws.cell(4,26).string("30%").style({font: {size: 11}}).style(style_date).style(myStyleBorder).style(mavo_bsck);
          ws.cell(4,27).string("40%").style({font: {size: 11}}).style(style_date).style(myStyleBorder).style(mavo_bsck);
          ws.cell(4,28).string("50%").style({font: {size: 11}}).style(style_date).style(myStyleBorder).style(mavo_bsck);
          ws.cell(4,29).string("100%").style({font: {size: 11}}).style(style_date).style(myStyleBorder).style(mavo_bsck);

          /*
          * Autre Heure
          * */

          ws.cell(4,30).string("HC(+)").style({font: {size: 11}}).style(style_date).style(myStyleBorder).style(mavo_bsck);
          ws.cell(4,31).string("HD(-)").style({font: {size: 11}}).style(style_date).style(myStyleBorder).style(mavo_bsck);
          /*
          * Freezz row
          * */
          ws.column(3).freeze(4);
          ws.row(4).freeze();

          /*
          * Filter
          * */
          ws.row(4).filter();
          //Debut async 2

          var pers_nb = 5;
          async.eachSeries(results[0],function (groupe,next) {
            var opt = [];
            opt.id_pers = groupe.id_pers;

            /*sheet1.set(1, pers_nb, ""+groupe.matricule);
            sheet1.set(2,pers_nb, ""+groupe.nom+" "+groupe.prenom);*/

            var dhoraireJ = groupe.horaire_journaliere;

            console.log("DHC:"+dhoraireJ)

            ws.cell(pers_nb,3).string(""+groupe.nom+" "+groupe.prenom).style(style_name).style(myStyleBorder);
            ws.cell(pers_nb,2).string( ""+groupe.matricule).style({font: {size: 11}}).style(myStyleBorder);
            ws.cell(pers_nb,1).string( ""+groupe.dep).style({font: {size: 11}}).style(myStyleBorder);

            //Recuperation date now
            var debSplit = results[1][0].date_debut.split('/');
            var finSplit = results[1][0].date_fin.split('/');
            var dateDeb = new Date(""+debSplit[1]+"/"+debSplit[0]+"/"+debSplit[2]);
            var dateFin = new Date(""+finSplit[1]+"/"+finSplit[0]+"/"+finSplit[2]);
            dateFin.setDate(dateFin.getDate()+1);
            dateDeb.setDate(dateDeb.getDate()+1);

            var currentDate = dateDeb;

            var listPers = [];
            var rPointageJour = [];

            var sum_h_ref = "0";
            var sum_hs_ref = "0";
            var hs_tot = 0;

            //Debut async 3

            var ii = 4;
            async.whilst(function () {
                return currentDate <= dateFin;
              },
              function (nextt) {
                //Recuperation des donnée
                //opt.date = dateNow;
                var dat = currentDate.toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);
                var datSplt =dat.split('/');
                ////console.log(dat);
                opt.date = datSplt[2]+"/"+datSplt[1]+"/"+datSplt[0];

                var mois = [
                  "janvier",
                  "fevrier",
                  "mars",
                  "avril",
                  "mai",
                  "juin",
                  "juillet",
                  "aout",
                  "septembre",
                  "octobre",
                  "novembre",
                  "decembre",
                ]

                /*sheet1.set(ii, 2, ""+datSplt[2]+"/"+datSplt[1]+"/"+datSplt[0]);
                sheet1.set(ii, 3, "heure total");
                sheet1.set(ii+1, 3, "heure sup");*/

                ws.cell(3,ii,3,ii+2,true).string( ""+datSplt[2]+"-"+mois[Number(datSplt[1])-1]).style(myStyleSemaine).style(myStyleBorder).style(mavo_bsck);

                ws.cell(4,ii).string( "Heure Total").style({font: {size: 11}}).style(style_date).style(myStyleBorder).style(mavo_bsck);
                ws.cell(4,ii+1).string("HS JOUR").style({font: {size: 11}}).style(style_date).style(myStyleBorder).style(mavo2_back);
                ws.cell(4,ii+2).string("HS NUIT").style({font: {size: 11}}).style(style_date).style(myStyleBorder).style(mavo2_back);
                /* ws.cell(5,ii).string( "heure total").style({font: {size: 14}});
                 ws.cell(5,ii+1).string( "heure sup").style({font: {size: 14}});*/



                //Debut async 4
                async.series([
                  function (callback) {
                    GestionHS.getHSPJByPersDate(opt,callback);
                  }
                ],function (err,resultGH) {
                  if (err){
                    nextt();
                    ii+=3;
                  }else{

                    listPers.push(resultGH[0]);
                    sails.log(resultGH[0]);

                    if(resultGH[0].length>0){
                      if(resultGH[0].length>0){
                        /*sheet1.set(ii, pers_nb, resultGH[0][0].duree_prod);
                        sheet1.set(ii+1, pers_nb, resultGH[0][0].heure_sup || '');*/
                        var dp = resultGH[0][0].duree_prod || '00:00:00';
                        var dhs = resultGH[0][0].heure_sup || '00:00:00';
                        var hist = resultGH[0][0].historique || '';

                        /*if(dhs !=='00:00:00'){



                          if(hist!=='' && hist!=="''"){
                            var histSplit = dp.split(";");

                            var in_h = histSplit[0];
                            var out_h = histSplit[1];

                            var in_4 = '05:00:00';
                            var out_4 = '22:00:00';

                            if(in_h!==''&& in_h!==null){

                            }



                            var timeStart = new Date("01/01/2007 " + valuestart).getHours();
                            var timeEnd = new Date("01/01/2007 " + valuestop).getHours();
                          }

                        }*/

                        var dpSplit = dp.split(":");
                        var dhsSplit = dhs.split(":");
                        var dhcSplit = dhoraireJ.split(":");

                        var conge = Number(resultGH[0][0].conge || '0');



                        var dpNum = Number((Number(dpSplit[0])+(Number(dpSplit[1])/60)+(Number(dpSplit[2])/60/60)).toFixed(2));
                        var dhcNum = Number((Number(dhcSplit[0])+(Number(dhcSplit[1])/60)+(Number(dhcSplit[2])/60/60)).toFixed(2));


                        var congest = wb.createStyle({

                        });

                        if(conge>0){
                          dpNum += conge*dhcNum;
                          congest = wb.createStyle({
                            fill: {
                              type: 'pattern', // the only one implemented so far.
                              patternType: 'solid', // most common.
                              fgColor: '#be2bff'// bgColor only applies on patternTypes other than solid.
                            }
                          });
                        }else{

                          var is_f = resultGH[0][0].is_ferier || false;
                          if(is_f){
                            dpNum += dhcNum;
                            congest = wb.createStyle({
                              fill: {
                                type: 'pattern', // the only one implemented so far.
                                patternType: 'solid', // most common.
                                fgColor: '#0bff97'// bgColor only applies on patternTypes other than solid.
                              }
                            });
                          }
                        }
                        var dhsNum = Number((Number(dhsSplit[0])+(Number(dhsSplit[1])/60)+(Number(dhsSplit[2])/60/60)).toFixed(2));

                        hs_tot += dhsNum;

                        if(isNaN(dpNum)){
                          ws.cell(pers_nb,ii).number(0).style(style_number).style(myStyleBorder).style(congest);
                        }else {
                          ws.cell(pers_nb,ii).number(dpNum).style(style_number).style(myStyleBorder).style(congest);
                        }

                        if(isNaN(dhsNum)){
                          ws.cell(pers_nb,ii+1).number(0).style(style_number).style(myStyleBorder);
                        }else{
                          ws.cell(pers_nb,ii+1).number(dhsNum).style(style_number).style(myStyleBorder);
                        }


                        ws.cell(pers_nb,ii+2).number(0).style(style_number).style(myStyleBorder);
                      }

                    }else{
                      ws.cell(pers_nb,ii).number(0).style(style_number).style(myStyleBorder);
                      ws.cell(pers_nb,ii+1).number(0).style(style_number).style(myStyleBorder);
                      ws.cell(pers_nb,ii+2).number(0).style(style_number).style(myStyleBorder);
                    }

                    sum_h_ref += '+'+xl.getExcelCellRef(pers_nb,ii);
                    sum_hs_ref += '+'+xl.getExcelCellRef(pers_nb,ii+1);
                    currentDate = new Date(currentDate.setTime( currentDate.getTime() + 1 * 86400000 ));
                    ii+=3;
                    nextt();
                  }
                });

                //Fin async 4
              },
              function (err) {
                // All things are done!

                //sails.log(listPers);

                sum_h_ref += '';
                sum_hs_ref += '';

                sails.log(sum_h_ref);
                sails.log(sum_hs_ref);
                groupe.gh = listPers;
                gHgroupe.push(groupe);



                var hs30 = 0;
                var hs40 = 0;

                if(!isNaN(hs_tot)){
                  hs30 = hs_tot;
                }
                var hs50 = 0;
                if(hs30>8 ){
                  hs30 = 8;
                  hs50 = hs_tot-8;
                }
                ws.cell(pers_nb,25).formula(sum_h_ref).style({font: {size: 11}}).style(myStyleBorder);
                ws.cell(pers_nb,26).number(hs30).style(style_number).style(myStyleBorder);
                ws.cell(pers_nb,27).number(0).style(style_number).style(myStyleBorder);
                ws.cell(pers_nb,28).number(hs50).style(style_number).style(myStyleBorder);
                ws.cell(pers_nb,29).number(0).style(style_number).style(myStyleBorder);
                ws.cell(pers_nb,30).number(0).style(style_number).style(myStyleBorder);
                ws.cell(pers_nb,31).number(0).style(style_number).style(myStyleBorder);

                pers_nb+=1;
                next();
              });


          },function (err) {
            if (err)
            {
              return res.badRequest("Problème avec la récupération des données dans la base");
            }
            else{
              var retour = [];
              retour['result'] = gHgroupe;
              retour['semaine'] = results[1];
              retour['pole'] = results[2];
              retour['date'] = dateNow;
              retour['listsemaine'] = results[3];
              retour['poleid'] = req.param("pole",req.session.id_departement);
              retour['semid'] = req.param("sem");
              // return res.view('pages/Gestion_Horaire/gestionHoraireVue2_0', retour)

              wb.write('assets/GHEXCEL/GHoraire_sem_'+req.param("sem")+'_'+req.param("pole",req.session.id_departement)+'.xlsx');

              setTimeout(function(){
                return res.redirect('/GHEXCEL/GHoraire_sem_'+req.param("sem")+'_'+req.param("pole",req.session.id_departement)+'.xlsx')
              },1000);


              //return res.ok('congratulations, your workbook created');

              /* workbook.save(function(ok){


                   return res.ok('congratulations, your workbook created');
               });*/
            }
          });

          //Fin async 2
        }

      });
    //Fin async 1

  },
  getRPointageJour :function (req,res) {

    var opt = [];
    opt.date = req.param("pdate");
    opt.id_pers = req.param("id_pers");
    async.series([
      function (next) {
        GestionHoraire.getUpdatePointageJour(opt,next);
      }
    ],function (err,rsponse) {
      if(err){
        return res.badRequest(err);
      }else {
        return res.ok(JSON.stringify(rsponse[0]));
      }
    })
  },


};
