/**
 * AlmerysController
 *
 * @description :: Server-side logic for managing Almerys
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
function nullsetzero(value){
  if(!value) return "0";
  if(value.toString()=="null")
    return "0";
  return value;
};

module.exports = {

  volume : function (req, res) {
    //recuperation des parametres

    var datedeb =req.param('datedeb',''+(new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8));
    var datefin =req.param('datefin',''+(new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8));
    var options = [];
    options.datedeb = datedeb;
    options.datefin = datefin;
    async.series([
      function(callback){
        Dossier.ldtSpec(options, callback);
      }
    ],function (err,resultat) {

    });

  },

  gestion : function (req, res) {
    /*if (!req.session.user) return res.redirect('/login');
    if (req.session.user=="ostie") return res.redirect('/ostie');*/

    var math = require('mathjs');

    /* class des menus*/

    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    var datedeb =req.param('datedeb',''+(new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8));
    var datefin =req.param('datefin',''+(new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8));

    var url = 'pages/gestionAlmerys';
    if(datedeb==datefin){
      url = 'pages/gestionAlmerysDetail';
    }

    var options = [];
    options.datedeb = datedeb;

    var conge = [];
    options.datefin = datefin;
    async.series([
        function(callback){
          Dossier.ldtSpec(options, callback);
        },
      function(callback){
          Dossier.ldtNbOpSpec(options, callback);
        },
      function(callback){
          Dossier.getListSpecialite(options, callback);
        }
    ],
      function(err, results) {
        if (err){
          //console.log("Erreur re recup ldtNbOpSpec ou ldtSpec");
        }else{
          var i = 0;
          if(datedeb==datefin){
            /* heure total des congé par specialité */
            /**  boucle specialite*/
            async.eachSeries(results[1], function (prime, callback) {

              var opt = [];
              opt.idSpec = prime.id_spec;
              /**recuperation des pers par specialite*/
              async.series([
                  function(callback){
                    User.getCongeParDateId(opt, callback);
                  }],
                function(err, resPers) {
                  if (err){
                    //console.log("Erreur recuperation des pers par specialite");

                  }else{
                    var hConge = 0;
                    var hCongeMed = 0;
                    var id_pers = 0;
                    ////console.log(prime.id_spec);
                    /**  boucle des listes des personnes du specialite prime.id_spec*/
                    async.eachSeries(resPers[0], function (pers, callback) {//

                      var optPers = [];
                      optPers.id_pers = pers.id_pers;
                      id_pers = pers.id_pers;
                      optPers.datedeb = datedeb;
                      ////console.log("id_pers = "+id_pers);

                      /**recuperation des heures conges de pers.id_pers*/
                      async.series([
                          function(callback){
                            ModelEASYGPAO.getCongeParDateId(optPers, callback);
                          },
                          function(callback){
                            ModelEASYGPAO.getCongeMedParDateId(optPers, callback);
                          }],
                        function(err, resConge) {
                          ////console.log("fin = "+id_pers)
                          if (err){
                            //console.log("Erreur recuperation heure conge par pers");
                          } else{
                            if(resConge[0]!=null) hConge = hConge + Number(resConge[0]);
                            if(resConge[1]!=null) hCongeMed = hCongeMed + Number(resConge[1]);
                          }
                          callback();
                        });

                      /** fin recuperation heure conge par pers*/

                    },function (errPers) {
                      if(errPers){
                        //console.log("Erreur boucle personne");

                      }else{
                        /*//console.log("hconge:"+hConge);
                        //console.log("hCongeMed:"+hCongeMed);*/
                        var congeObject = { hConge:hConge,hCongeMed:hCongeMed};
                        conge.push(prime.id_spec,congeObject);

                        callback();

                      }

                    });
                    /** fin boucle personne*/
                    i++;
                    //callback();
                  }


                });

              /** fin recuperation des pers par specialite*/

              //callback(); // Alternatively: callback(new Error());
            }, function (err) {
              if (err)
              {
                //console.log("Erreur recuperation des pers par specialite");
              }
              else {
                //console.log("conge:"+JSON.stringify(conge));
                return res.view(url,{
                  menu : menu,
                  math : math,
                  datedeb : datedeb,
                  datefin : datefin,
                  ldtSpec : results[0],
                  effectif : results[1],
                  spec : results[2],
                  conge : conge,
                });
              }


            });


            /**fin  boucle spacialite*/

          }else{
            //console.log("effectif:"+JSON.stringify(results[1]));
            return res.view(url,{
              menu : menu,
              math : math,
              datedeb : datedeb,
              datefin : datefin,
              ldtSpec : results[0],
              effectif : results[1],
              spec : results[2],
              conge : conge,
            });
          }

        }

      });


  },
    //fonction pour la recuperation des heures mensuelle et par specialite
    getCongeAnnuelAlm : function(req, res){

        //les parametres pour les requettes
        //variable date annuelle
        var date_debut = "01/01/2016";
        var date_fin = "31/12/2016";


        var options = [];

        async.series([
            function(callback){
              Dossier.getLPersGBySpec(options, callback);
            },
            function(callback){
                Pointage.listPersonnelRows(options,callback);
            }
        ],function(err,response){
            var list_des_pers = response[1];
            //console.log(list_des_pers);

            var conge_par_date_pers = [];
            //recuperation des heures de conge de chaque personne

            async.eachSeries(list_des_pers,function(pers,callback){

                var object_conge = {};

                callback();
            },function(err){

            });
            return res.json(JSON.stringify(list_des_pers));
        });
        //congés paye
        //congés maladies
        //congés maternité
        //permission
        //assistance maternelle
        //evenement exceptionnel

    },

  gestionAjax : function (req, res) {
    var math = require('mathjs');

    /* class des menus*/

    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    var datedeb =req.param('datedeb',''+(new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8));
    var datefin =req.param('datefin',''+(new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8));

    var url = 'pages/Almerys/rh_alm';


    ////console.log("moment:"+moment.weekDays(true));

    var options = [];
    options.datedeb = datedeb;

    var conge = [];
    options.datefin = datefin;
    async.series([
        function(callback){
          Dossier.ldtSpec(options, callback);
        },
        function(callback){
          Dossier.getListSpecialite(options, callback);
        }
      ],
      function(err, results) {
        if (err){
          //console.log("Erreur re recup ldtNbOpSpec ou ldtSpec");
        }else{
          var i = 0;
          if(datedeb==datefin){
            /* heure total des congé par specialité */
            /**  boucle specialite*/
            async.eachSeries(results[1], function (prime, callback) {

              var opt = [];
              opt.idSpec = prime.id_spec;
              /**recuperation des pers par specialite*/
              async.series([
                  function(callback){
                    User.getCongeParDateId(opt, callback);
                  }],
                function(err, resPers) {
                  if (err){
                    //console.log("Erreur recuperation des pers par specialite");

                  }else{
                    var hConge = 0;
                    var hCongeMed = 0;
                    var id_pers = 0;
                    ////console.log(prime.id_spec);
                    /**  boucle des listes des personnes du specialite prime.id_spec*/
                    async.eachSeries(resPers[0], function (pers, callback) {//

                      var optPers = [];
                      optPers.id_pers = pers.id_pers;
                      id_pers = pers.id_pers;
                      optPers.datedeb = datedeb;
                      ////console.log("id_pers = "+id_pers);

                      /**recuperation des heures conges de pers.id_pers*/
                      async.series([
                          function(callback){
                            ModelEASYGPAO.getCongeParDateId(optPers, callback);
                          },
                          function(callback){
                            ModelEASYGPAO.getCongeMedParDateId(optPers, callback);
                          }],
                        function(err, resConge) {
                          ////console.log("fin = "+id_pers)
                          if (err){
                            //console.log("Erreur recuperation heure conge par pers");
                          } else{
                            if(resConge[0]!=null) hConge = hConge + Number(resConge[0]);
                            if(resConge[1]!=null) hCongeMed = hCongeMed + Number(resConge[1]);
                          }
                          callback();
                        });

                      /** fin recuperation heure conge par pers*/

                    },function (errPers) {
                      if(errPers){
                        //console.log("Erreur boucle personne");

                      }else{
                        /*//console.log("hconge:"+hConge);
                         //console.log("hCongeMed:"+hCongeMed);*/
                        var congeObject = { hConge:hConge,hCongeMed:hCongeMed};
                        conge.push(prime.id_spec,congeObject);

                        callback();

                      }

                    });
                    /** fin boucle personne*/
                    i++;
                    //callback();
                  }


                });

              /** fin recuperation des pers par specialite*/

              //callback(); // Alternatively: callback(new Error());
            }, function (err) {
              if (err)
              {
                //console.log("Erreur recuperation des pers par specialite");
              }
              else {
                //console.log("conge:"+JSON.stringify(conge));
                return res.view(url,{
                  menu : menu,
                  math : math,
                  datedeb : datedeb,
                  datefin : datefin,
                  label : req.param("label",""),
                  ldtSpec : results[0],
                  spec : results[1],
                  conge : conge,
                  layout:false
                });
              }


            });


            /**fin  boucle spacialite*/

          }else{
            //console.log("effectif:"+JSON.stringify(results[1]));
            return res.view(url,{
              menu : menu,
              math : math,
              datedeb : datedeb,
              datefin : datefin,
              label : req.param("label",""),
              ldtSpec : results[0],
              effectif : results[1],
              spec : results[2],
              conge : conge,
              layout:false
            });
          }

        }

      });


  },

  modifSpec : function (req, res) {
    // if (!req.session.user) return res.redirect('/login');

    var idDossier = req.param('iddossier',null)
    var idSpec =req.param('idspec',null);

    var options = [];
    options.id_spec = idSpec;
    options.id_dossier = idDossier;

    async.series([
        function(callback){
          Dossier.addDossierInSpec(options, callback);
        }],
      function(err, results) {
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");


        return res.ok("ok");

      });
  },

  gestionSpec : function (req, res) {

    /* class des menus*/
    /*if (!req.session.user) return res.redirect('/login');
    if (req.session.user=="ostie") return res.redirect('/ostie');
*/
    var menu = [];
    menu["aceuil"]= "";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "selected";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";


    var idSpec =req.param('idspec',null);
    if(idSpec!=null){
      var options = [];
      options.id_spec = idSpec;
      req.session.specialite = idSpec;

      async.series([
          function(callback){
            Dossier.dossier(options, callback);
          },
          function(callback){
            Dossier.specDossier(options, callback);
          }],
        function(err, results) {
          if (err) return res.badRequest("Problème avec la récupération des données dans la base");


          return res.view('pages/dossier/modifierDossierV2',{
            menu : menu,
            dossiersAll : results[0],
            idSpec : idSpec,
            dossiers : results[1]

          });

        });
    }else {
      return res.view('pages/dossier/modifierDossierV2',{
        menu : menu,
        dossiersAll : [],
        idSpec : null,
        dossiers : []

      });
    }





  },
  getLsSpecialite: function (req, res) {
    var idPers = req.session.user;
    User.query('SELECT * FROM tb_specialite ORDER BY id_spec ASC', function(eror, test)
    {
      ////console.log( "taile ============================> "+test.rows.length );
      var str = '<option value="">TOUS LES SPECIALITE</option>';
      if (eror)
      {
        return res.send('erreur 2018');
      }else{
        // return res.send(test);
        for(var i=0 ; i< test.rows.length ; i++){
          if(req.session.specialite != null ){
            if(parseInt(req.session.specialite) == parseInt(test.rows[i].id_spec)){
              str += '<option value=' +test.rows[i].id_spec +' selected="true">' + test.rows[i].libelle  +'</option>';
            }else{
              str += '<option value=' +test.rows[i].id_spec +'>' + test.rows[i].libelle  +'</option>';
            }
          }else {
            str += '<option value=' +test.rows[i].id_spec +'>' + test.rows[i].libelle  +'</option>';
          }

          ////console.log( test.rows.length );
        }
        return res.send(str);
      }
    });
  },

  readXcel : function (req, res) {
    /*var math = require('mathjs');*/
    //var sync = require('synchronize');

    var path = require('path');
    var kexcel = require('kexcel');


    var datedeb =req.param('datedeb',''+(new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8));
    var datefin =req.param('datefin',''+(new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8));

    var options = [];
    options.datedeb = datedeb;
    options.datefin = datefin;

    async.series([
        function(callback){
          Dossier.ldtSpec(options, callback);
        },
        function(callback){
          Dossier.ldtNbOpSpec(options, callback);
        }],
      function(err, results) {
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");


        var ldt = results[0];

        var lastPole = 0;
        var SPECIALITE = [];
        SPECIALITE[1] = 6;
        SPECIALITE[2] = 9;
        SPECIALITE[3] = 10;
        SPECIALITE[4] = 11;
        SPECIALITE[5] = 12;
        SPECIALITE[6] = 14;
        SPECIALITE[7] = 15;
        SPECIALITE[8] = 16;
        SPECIALITE[9] = 17;
        SPECIALITE[10] = 18;
        SPECIALITE[11] = 20;
        SPECIALITE[12] = 21;
        SPECIALITE[13] = 23;
        SPECIALITE[14] = 24;
        SPECIALITE[15] = 25;
        SPECIALITE[15] = 26;
        SPECIALITE[17] = 27;
        SPECIALITE[18] = 28;
        SPECIALITE[19] = 29;
        SPECIALITE[20] = 30;
        SPECIALITE[21] = 32;
        SPECIALITE[22] = 33;
        SPECIALITE[23] = 35;
        SPECIALITE[24] = 36;
        SPECIALITE[25] = 37;
        SPECIALITE[26] = 38;
        SPECIALITE[27] = 39;
        SPECIALITE[28] = 40;
        SPECIALITE[29] = 42;
        SPECIALITE[30] = 43;
        SPECIALITE[31] = 44;
        SPECIALITE[32] = 45;

        var dataFinal = [];

        var lastId = null;

        var ii = 0;

        kexcel.open(path.join('', 'test.xlsx')).then(function(workbook) {

          var sheet = workbook.getSheet(0);

          if(datedeb==datefin){
            sheet = workbook.getSheet(1);
          }

            ldt.forEach(function (ldt) {
              ////console.log(ldt.id_spec);
              if(ldt.id_spec!=lastId){
                if(dataFinal[ii]!=null){
                  if(datedeb!=datefin){
                    sheet.setCellValue(SPECIALITE[dataFinal[ii].id_spec],8,dataFinal[ii].hprod);
                    sheet.setCellValue(SPECIALITE[dataFinal[ii].id_spec],9,dataFinal[ii].hhprod);
                    sheet.setCellValue(SPECIALITE[dataFinal[ii].id_spec],13,dataFinal[ii].qte);
                    sheet.setCellValue(SPECIALITE[dataFinal[ii].id_spec],21,dataFinal[ii].err);
                  }else {
                    var sp = SPECIALITE[dataFinal[ii].id_spec];
                    sheet.setCellValue(SPECIALITE[dataFinal[ii].id_spec],6,dataFinal[ii].hprod);
                    sheet.setCellValue(SPECIALITE[dataFinal[ii].id_spec],8,dataFinal[ii].ostie);
                    sheet.setCellValue(SPECIALITE[dataFinal[ii].id_spec],9,dataFinal[ii].formation);
                    sheet.setCellValue(SPECIALITE[dataFinal[ii].id_spec],10,dataFinal[ii].pinternet);
                    sheet.setCellValue(SPECIALITE[dataFinal[ii].id_spec],11,dataFinal[ii].lenteur);
                    sheet.setCellValue(SPECIALITE[dataFinal[ii].id_spec],12,dataFinal[ii].pmachine);
                    sheet.setCellValue(SPECIALITE[dataFinal[ii].id_spec],5,'=G'+sp+'+H'+sp+'+I'+sp+'+J'+sp+'+K'+sp+'');
                  }


                }
                ii++;
                dataFinal[ii]=[];
                dataFinal[ii].specialite = ldt.libelle;
                dataFinal[ii].id_spec = ldt.id_spec;
                dataFinal[ii].qte = Number(ldt.qte);
                dataFinal[ii].err = Number(ldt.err);
                dataFinal[ii].hhprod = 0;
                dataFinal[ii].hprod = 0;
                dataFinal[ii].ostie = 0;
                dataFinal[ii].formation = 0;
                dataFinal[ii].lenteur = 0;
                dataFinal[ii].pinternet = 0;
                dataFinal[ii].pmachine = 0;
                if(ldt.id_type_ldt==0){
                  dataFinal[ii].hprod = Number(ldt.somme/3600);
                }else if(ldt.id_type_ldt==2){
                  dataFinal[ii].formation = Number(ldt.somme/3600);
                  dataFinal[ii].hhprod = Number(ldt.somme/3600);
                }else if(ldt.id_type_ldt==20){
                  dataFinal[ii].lenteur = Number(ldt.somme/3600);
                  dataFinal[ii].hhprod = Number(ldt.somme/3600);
                }else if(ldt.id_type_ldt==19 || ldt.id_type_ldt==6){
                  dataFinal[ii].pinternet = Number(ldt.somme/3600);
                  dataFinal[ii].hhprod = Number(ldt.somme/3600);
                }else if(ldt.id_type_ldt==11){
                  dataFinal[ii].ostie = Number(ldt.somme/3600);
                  dataFinal[ii].hhprod = Number(ldt.somme/3600);
                }else if(ldt.id_type_ldt==5 || ldt.id_type_ldt==7){
                  dataFinal[ii].pmachine = Number(ldt.somme/3600);
                  dataFinal[ii].hhprod = Number(ldt.somme/3600);
                }else{
                  //dataFinal[ii].hhprod = Number(ldt.somme/3600);
                }
                lastId= ldt.id_spec;

              }else{
                dataFinal[ii].qte += Number(ldt.qte);
                dataFinal[ii].err += Number(ldt.err);
                if(ldt.id_type_ldt==0){
                  dataFinal[ii].hprod += Number(ldt.somme)/3600;
                }else if(ldt.id_type_ldt==2){
                  dataFinal[ii].formation += Number(ldt.somme/3600);
                  dataFinal[ii].hhprod += Number(ldt.somme/3600)

                }else if(ldt.id_type_ldt==20){
                  dataFinal[ii].lenteur += Number(ldt.somme/3600);
                  dataFinal[ii].hhprod += Number(ldt.somme/3600)
                }else if(ldt.id_type_ldt==19 || ldt.id_type_ldt==6){
                  dataFinal[ii].pinternet += Number(ldt.somme/3600);
                  dataFinal[ii].hhprod += Number(ldt.somme/3600)
                }else if(ldt.id_type_ldt==11){
                  dataFinal[ii].ostie += Number(ldt.somme/3600);
                  dataFinal[ii].hhprod += Number(ldt.somme/3600)
                }else if(ldt.id_type_ldt==5 || ldt.id_type_ldt==7){
                  dataFinal[ii].pmachine += Number(ldt.somme/3600);
                  dataFinal[ii].hhprod += Number(ldt.somme/3600)
                }else{
                  //dataFinal[ii].hhprod += Number(ldt.somme/3600);
                }
              }
          });

          res.setHeader('Content-disposition', 'attachment; filename=example.xlsx');
          res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          workbook.pipe(res);

        });


      });



    //return res.ok("haha");

    /* class des menus*/






  },
  //edit stock controller

  stock: function (req, res) {
    if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    var retval = [];
    retval['menu']= menu;
    retval['layout']= false;

    return res.view('pages/Almerys/stock.ejs',retval);
  },

  //ajax    affichage des donnees en tableau

  ajaxStock: function (req,res) {
    var retval = [];
    retval['layout']=false;

    async.series([
        function(callback){
          AlmerysCall.getHistoVolume(null, callback);
        }],
      function(err, results) {
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        retval['stock']= results[0];
        return res.view('pages/ajax/ajaxHistoVolume.ejs',retval);
      });

  },
  //ajout de nombre de stock dans la base des données
  addStock: function (req,res) {
    var option = [];
    option.id_spec = req.param("id_spec","");
    option.valeur = req.param("valeur",0);
    option.type = req.param("type",0);
    option.date_ajout = req.param("date_ajout","");

    async.series([
        function(callback){
          AlmerysCall.addVolume(option, callback);
        }],
      function(err, results) {
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        return res.ok("true")
      });

  },

  // modifier la valeur des volume recues

  updateStock: function (req,res) {
    var option = [];
    option.id_volume = req.param("id_volume","");
    option.valeur = req.param("valeur",0);
    option.date_ajout = req.param("date_ajout","");

    async.series([
        function(callback){
          AlmerysCall.updateVolume(option, callback);
        }],
      function(err, results) {
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        return res.ok("true");
      });

  },
  // supprimer la valeur des volume recues

  deleteStock: function (req,res) {
    var option = [];
    option.id_volume = req.param("id_volume","");

    async.series([
        function(callback){
          AlmerysCall.deleteVolume(option, callback);
        }],
      function(err, results) {
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        return res.ok("true");
      });

  },

  // modifier la cadence d'equilibre par specialite

  cadence: function (req, res) {
    if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    var retval = [];
    retval['menu']= menu;
    retval['layout']= false;

    return res.view('pages/Almerys/cadence.ejs',retval);
  },

  //ajax    affichage des donnees en tableau

  ajaxCadence: function (req,res) {
    var retval = [];
    retval['layout']=false;

    async.series([
        function(callback){
          AlmerysCall.getHistoCadence(null, callback);
        }],
      function(err, results) {
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        retval['cadence']= results[0];
        return res.view('pages/ajax/ajaxHistoCadence.ejs',retval);
      });

  },
  //ajout de nombre de stock dans la base des données
  addCadence: function (req,res) {
    var option = [];
    option.id_spec = req.param("id_spec","");
    option.valeur = req.param("valeur",0);
    option.date_ajout = req.param("date_ajout","");

    async.series([
        function(callback){
          AlmerysCall.addCadence(option, callback);
        }],
      function(err, results) {
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        return res.ok("true")
      });

  },

  // modifier la valeur des volume recues

  updateCadence: function (req,res) {
    var option = [];
    option.id_cadence = req.param("id_cadence","");
    option.valeur = req.param("valeur",0);
    option.date_ajout = req.param("date_ajout","");

    async.series([
        function(callback){
          AlmerysCall.updateCadence(option, callback);
        }],
      function(err, results) {
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        return res.ok("true");
      });

  },
  // supprimer la valeur des volume recues

  deleteCadence: function (req,res) {
    var option = [];
    option.id_cadence = req.param("id_cadence","");

    async.series([
        function(callback){
          AlmerysCall.deleteCadence(option, callback);
        }],
      function(err, results) {
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        return res.ok("true");
      });

  },

  // modifier la norme globale de taux d'erreur par specialite

  qualite: function (req, res) {
    if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    var retval = [];
    retval['menu']= menu;
    retval['layout']= false;

    return res.view('pages/Almerys/qualite.ejs',retval);
  },

  //ajax    affichage des donnees en tableau

  ajaxQualite: function (req,res) {
    var retval = [];
    retval['layout']=false;

    async.series([
        function(callback){
          AlmerysCall.getHistoQualite(null, callback);
        }],
      function(err, results) {
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        retval['qualite']= results[0];
        return res.view('pages/ajax/ajaxHistoQualite.ejs',retval);
      });

  },
  //ajout de taux d'erreur dans la base des données
  addQualite: function (req,res) {
    var option = [];
    option.id_spec = req.param("id_spec","");
    option.valeur = req.param("valeur",0);
    option.date_ajout = req.param("date_ajout","");

    async.series([
        function(callback){
          AlmerysCall.addQualite(option, callback);
        }],
      function(err, results) {
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        return res.ok("true")
      });

  },

  // modifier la valeur des taux d'erreur acceptable

  updateQualite: function (req,res) {
    var option = [];
    option.id_qualite = req.param("id_qualite","");
    option.valeur = req.param("valeur",0);
    option.date_ajout = req.param("date_ajout","");

    async.series([
        function(callback){
          AlmerysCall.updateQualite(option, callback);
        }],
      function(err, results) {
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        return res.ok("true");
      });

  },
  // supprimer la valeur des volume recues

  deleteQualite: function (req,res) {
    var option = [];
    option.id_qualite = req.param("id_qualite","");

    async.series([
        function(callback){
          AlmerysCall.deleteQualite(option, callback);
        }],
      function(err, results) {
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");
        return res.ok("true");
      });

  },


  // ajax filtre controller

  ajaxForm: function (req,res) {
    var retval = [];
    retval['val']=req.param('type','0');
    retval['layout']=false;
    res.view('pages/ajax/forms/ajaxFiltreAlmerys',retval);

  },

    //Almerys async request for database
    //function finale pour l'app almerys

    alm_suivis: function(req,res){
        async.series([
            function(callback){
                LdtType.get_list_type(callback);
            }
        ],function(err,response){
            if (err) return res.ok(err);

            var function_list = [];
            /*async.each(response[0],function(type,callback){
                var opt = {};
                opt.type = type.id;
                function_list.push(function(callback){
                    LdtType.get_ldt_by_spec_alm(opt,callback);
                });

            });*/
            //console.log(response);
            return res.ok(response);
        })
    },


    alm_vol_qual: function(req,res){
        var math = require('mathjs');
       var datedeb =req.param('datedeb',''+(new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8));
       var datefin =req.param('datefin',''+(new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8));
        var options = [];
        options.datedeb = datedeb;

        var conge = [];
        options.datefin = datefin;
        async.series([
            /*function(callback){
                Dossier.ldtSpec(options, callback);
            },
            function(callback){
                Dossier.ldtNbOpSpec(options, callback);
            },*/
            function(callback){
                Dossier.getListSpecialite(options, callback);
            }
        ],
          function(err, results) {
            if (err){
              //console.log("Erreur re recup ldtNbOpSpec ou ldtSpec");
            }else{

                /*return res.view('pages/Almerys/qual_alm',{
                  math : math,
                  datedeb : datedeb,
                  datefin : datefin,
                  ldtSpec : results[0],
                  effectif : results[1],
                  spec : results[2],
                  layout: false
                });*/

              /* parcour des liste des specialites*/
              var fonctionErrOk = [];
              var fonctionErrIso = [];
              var fonctionVolumeRecu = [];
              var fonctionVolumeTraite = [];
              var fonctionVolumeStock = [];
              var fonctionCadence = [];
              var cpt = 0;
              async.eachSeries(results[0],function (prime,callback) {
                var opt = [];
                opt.id_spec  = prime.id_spec;
                opt.datedeb  = datedeb;
                opt.datefin  = datefin;
                cpt = cpt + 6;
                fonctionErrOk.push(function (callback) {
                  Dossier.get_err_ok_spec(opt,callback);
                });
                fonctionErrIso.push(function (callback) {
                  Dossier.get_err_iso_spec(opt,callback);
                });


                opt.type  = 1;
                fonctionVolumeRecu.push(function (callback) {

                  Dossier.get_volume_spec_by_type(opt,callback);
                });

                opt.type  = 0;
                fonctionVolumeTraite.push(function (callback) {

                  Dossier.get_volume_spec_by_type(opt,callback);
                });

                opt.type  = 2;
                fonctionVolumeStock.push(function (callback) {

                  Dossier.get_volume_spec_by_type(opt,callback);
                });

                fonctionCadence.push(function (callback) {

                  Dossier.get_cadence_spec(opt,callback);
                });
                callback();
              },function (err) {

               var errok =  function err_ok(callback) {
                  async.parallel(fonctionErrOk,function (errasync) {
                    //return res.send("function initialized");
                    callback();
                  })
                };

                var erriso =  function err_ok(callback) {
                  async.parallel(fonctionErrIso,function (errasync) {
                    //return res.send("function initialized");
                    callback();
                  })
                };
                var volumetraite =  function volm(callback) {
                  async.parallel(fonctionVolumeTraite,function (errasync) {
                    //return res.send("function initialized")
                    // ;
                    callback();
                  })
                };


                var volumerecu =  function volr(callback) {
                  async.parallel(fonctionVolumeRecu,function (errasync) {
                    //return res.send("function initialized")
                    // ;
                    callback();
                  })
                };

                var volumestock =  function vols(callback) {
                  async.parallel(fonctionVolumeStock,function (errasync) {
                    //return res.send("function initialized")
                    // ;
                    callback();
                  })
                };

                var cadence =  function cad(callback) {
                  async.parallel(fonctionCadence,function (errasync) {
                    //return res.send("function initialized");
                    callback();
                  })
                };

                var ldtspec =  function ldt(callback) {
                  async.parallel(fonctionCadence,function (errasync) {
                    //return res.send("function initialized");
                    callback();
                  })
                };

                var functPara = [];
                functPara.push(volumerecu);
                functPara.push(volumetraite);
                functPara.push(function (callback) {
                  Dossier.ldtSpec(options,callback);
                });
                functPara.push(volumestock);
                functPara.push(cadence);
                functPara.push(erriso);
                functPara.push(errok);

                async.parallel(functPara,function (errasync) {


                  //return res.send("function initialized");
                })

              })


            }

            return res.view('pages/Almerys/qual_alm',{
              math : math,
              datedeb : datedeb,
              datefin : datefin,
              specialite : results[0],
              cpt : cpt+1,
              layout: false
            });

          });

    },

    //page des heure morte  d'amlerys

    hMorte: function (req,res) {



        return res.view('pages/Almerys/heure_morte',{layout:false});

  },

    ajaxHMorte: function (req,res) {
    var retval = [];
    retval['layout']=false;

    async.series([
        function(callback){
          AlmerysCall.getHistoHmorte(null, callback);
        }],
      function(err, results) {
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        retval['hmorte']= results[0];
        return res.view('pages/ajax/ajaxHeureMorte.ejs',retval);
      });

  },

    addHmort: function (req,res) {
        var option = [];
        option.id_spec = req.param("id_spec","");
        option.id_type_heure = req.param("typeHM","");
        option.nb_pers_concerne = req.param("nbpers",0);
        option.date = req.param("date","");
        option.h_deb = req.param("hdeb","");
        option.h_fin = req.param("hfin","");

        async.series([
            function(callback){
              AlmerysCall.addHmorte(option, callback);
            }],
          function(err, results) {
            if (err) return res.badRequest("Problème avec la récupération des données dans la base");

            return res.ok("true")
          });

      },
  PageHeureNonProdAlmerys: function(req,res) {
    var menu = [];
    menu["aceuil"] = "";
    menu["dossierAdmin"] = "";
    menu["gestionDossier"] = "selected";
    menu["statOpAdmin"] = "";
    menu["presence"] = "";
    menu["admin"] = "";

    res.view("pages/Almerys/heure",{menu: menu, layout: false});
  },

  getListHeureNonProdAlmerys: function(req,res) {
    var date_deb=req.param('datedeb');
    var date_fin=req.param('datefin');
    var typeHeure = req.param('type_heure');
    var id_dossier = req.param('id_dossier');
    var id_pers = req.param('id_pers');
    console.log(date_deb);
    console.log(date_fin);
    console.log(id_dossier);
//    return res.ok("ok");
    var array_Global=[];
    var array=[];
    var array_second=[];
//
    async.series([
      function(callback){
        // Get Date
        Almerys.getListDateLdt(date_deb,date_fin,callback);
      }
    ],function(err,dateValues){
      if(err) return res.badRequest(err);
      async.forEachSeries(dateValues[0],function (dateValue,Callback_s1) {
        //Get Pers
        console.log(dateValue.date_deb_ldt);
        async.series([
          function(callback){
            Almerys.getListPersByDate(dateValue.date_deb_ldt,id_dossier,id_pers,callback);
          }
        ],function(err_inner,persValues){
          if(err_inner) return res.badRequest(err_inner);
          //Get Heure
          async.forEachSeries(persValues[0],function (persValue,Callback_s2) {
            async.series([
              //    "FORMATION: ASSISTANCE OP"
              function(callback){
                Almerys.getDuration(persValue.id_pers,dateValue.date_deb_ldt,id_dossier,22,callback);
              },
              //    "FORMATION: PRATIQUE"
              function(callback){
                Almerys.getDuration(persValue.id_pers,dateValue.date_deb_ldt,id_dossier,23,callback);
              },
              //    "FORMATION: SOUS-CHARGE"
              function(callback){
                Almerys.getDuration(persValue.id_pers,dateValue.date_deb_ldt,id_dossier,15,callback);
              },
              //    "FORMATION: THEORIQUE"
              function(callback){
                Almerys.getDuration(persValue.id_pers,dateValue.date_deb_ldt,id_dossier,2,callback);
              },
              //          "REUNION: ADMINISTRATIVE/RH"
              function (callback) {
                Almerys.getDuration(persValue.id_pers,dateValue.date_deb_ldt,id_dossier,25,callback);
              },
              //          "REUNION: INTERNE"
              function (callback) {
                Almerys.getDuration(persValue.id_pers,dateValue.date_deb_ldt,id_dossier,12,callback);
              },
              // PROBLEME TECHNIQUE
              //PROBLEME : INTERNET
              function (callback) {
                Almerys.getDuration(persValue.id_pers,dateValue.date_deb_ldt,id_dossier,6,callback);
              },
              // PROBLEME: MACHINE
              function (callback) {
                Almerys.getDuration(persValue.id_pers,dateValue.date_deb_ldt,id_dossier,5,callback);
              }
            ],function(err_heure,heureValue){
              var object={};
              object.date=dateValue.date_deb_ldt;
              object.id_pers=persValue.id_pers;
              object.formation_assistance_op=nullsetzero(heureValue[0][0].duree);
              object.formation_pratique=nullsetzero(heureValue[1][0].duree);
              object.formation_souscharge=nullsetzero(heureValue[2][0].duree);
              object.formation_theorique=nullsetzero(heureValue[3][0].duree);
              object.formation_administrative=nullsetzero(heureValue[4][0].duree);
              object.reunion_interne=nullsetzero(heureValue[5][0].duree);
              array.push(object);
              var object_second={};
              object_second.date=dateValue.date_deb_ldt;
              object_second.id_pers=persValue.id_pers;
              object_second.probleme_internet=nullsetzero(heureValue[6][0].duree);
              object_second.probleme_machine=nullsetzero(heureValue[7][0].duree);
              array_second.push(object_second);
              Callback_s2();
            });
          }, function() {
            Callback_s1();
          });
        });
      }, function() {
        array_Global.push(array);
        array_Global.push(array_second);
        return res.ok(JSON.stringify(array_Global));
      });
      //   res.json(dateValues);
    });

  },

};

