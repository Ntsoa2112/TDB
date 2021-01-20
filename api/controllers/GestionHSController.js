/**
 * GestionHSController
 *
 * @description :: Server-side logic for managing Gestionhs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index : function (req,res) {
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

          //Debut async 2
          async.eachSeries(results[0],function (groupe,next) {
            var opt = [];
            opt.id_pers = groupe.id_pers;

            if(groupe.categorie!=='HC'){
              //Recuperation date now
              var debSplit = results[1][0].date_debut.split('/');
              var finSplit = results[1][0].date_fin.split('/');
              var dateDeb = new Date(""+debSplit[1]+"/"+debSplit[0]+"/"+debSplit[2]);
              var dateFin = new Date(""+finSplit[1]+"/"+finSplit[0]+"/"+finSplit[2]);
              dateFin.setDate(dateFin.getDate()+1);
              dateDeb.setDate(dateDeb.getDate()+1);

              var currentDate = dateDeb;

              var listPers = [];

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
                      GestionHS.getHSByPersDate(opt,callback);
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

              //Fin async 3

            }else{
              next();
            }

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
              return res.view('pages/Gestion_Horaire/gestionHSVue', retour)
            }
          });

          //Fin async 2
        }

      });
    //Fin async 1

  },

  saveHS :function (req,res) {
    var opt = [];
    opt.id_pers = req.param("id_pers");
    opt.date = req.param("date");
    opt.value = req.param("value","00:00:00");
    opt.value_40=req.param("value_40","00:00:00");
    opt.value_100=req.param("value_100","00:00:00");
    opt.value_maj_nuit=req.param("maj_nuit","00:00:00");
    opt.value_heure_deduit=req.param("heure_deduit","00:00:00");
    if (typeof opt.value_40 === 'undefined' || opt.value_40=='undefined') {
      // color is undefined
      opt.value_40= "00:00:00"
    }
    if (typeof opt.value_100 === 'undefined'|| opt.value_100=='undefined') {
      // color is undefined
      opt.value_100= "00:00:00"
    }
    opt.is_valide = true;
    async.series([
      function (callback) {
        GestionHS.getHSByPersDate(opt,callback);
      }
    ],function (err,results) {
      if(err){

        return res.ok(false);
      }else {
        var fct = null;
        if(results[0].length>0){
          fct = function (callback) {
            GestionHS.updateHSByPersDate(opt,callback);
          };
        }else{
          fct = function (callback) {
            GestionHS.insertHSByPersDate(opt,callback);
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



  /*
  * ajout des lignes par defaut dans la table HS
  * */

  addAllLineForOneYears : function (req,res) {
    var year = req.param('year','2018');

    var opt = [];

    opt.value = null;
    opt.is_valide = false;

    var dateDeb = new Date(Date.UTC(Number(year), 0, Number('01')));
    var dateFin = new Date(Date.UTC(Number(year),0, Number('31')));

    console.log(dateDeb);
    console.log(dateFin);

    //sails.log(dateDeb.toISOString())
    //sails.log(dateFin.toISOString())

    var currentDate = dateDeb;
    //get all pers actif

    async.series([
        function (callback) {
          var sql = "SELECT id_pers FROM r_personnel where actif = true order by id_pers ";
          GestionHS.query(sql, function(err, res){
            if(err) return callback(err);
            return callback(null, res.rows);
          });
        }
      ],function (err,listPers) {
      if (err) return res.badRequest(err);

      async.whilst(function () {
          return currentDate <= dateFin;
        },
        function (nextt) {

          sails.log(currentDate.toISOString())
          var dat = currentDate.toISOString().replace(/-/, '/').replace(/-/, '/').substr(0, 10);
          var datSplt = dat.split('/');
          opt.date = datSplt[2] + "/" + datSplt[1] + "/" + datSplt[0];

          async.eachSeries(listPers[0], function (pers, next) {

            opt.id_pers = pers.id_pers;

            async.series([
              function (callback) {
                GestionHS.getHSByPersDate(opt, callback);
              }
            ], function (err, results) {
              if (err) {
                next();
              } else {
                var fct = null;
                if (results[0].length > 0) {
                  fct = function (callback) {
                    return callback(null, true);
                  };
                } else {
                  fct = function (callback) {
                    GestionHS.insertHSByPersDate(opt, callback);
                  };
                }

                async.series([
                  fct
                ], function (err, rest) {
                  next();

                })
              }
            });

          }, function (err) {

            currentDate = new Date(currentDate.setTime(currentDate.getTime() + 1 * 86400000));
            nextt();

          })
        }, function (err) {
          // All things are done!

          //sails.log(listPers);
          return res.ok(true);
        });

    });


  }

};

