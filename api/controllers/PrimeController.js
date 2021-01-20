/**
 * PrimeController
 *
 * @description :: Server-side logic for managing primes
 * @author :: Jack
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index : function(req,res){
    if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";



    var retour=[];
    retour['menu']=menu;
    retour['layout']=false;
    res.view('pages/prime/index',retour);
  },

  setting : function(req,res){
    if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";



    var retour=[];
    retour['menu']=menu;
    retour['layout']=false;
    res.view('pages/prime/setting',retour);
  },

  zoom : function(req,res){


    var id_dossier = req.param('id_dossier');
    var date = req.param('pdate');
    var id_lot = req.param('id_lot');

    var isSocketLaunch = false;

    if(date === new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10)){
      isSocketLaunch = true;
    }

    var retour=[];
    retour['layout']=false;
    retour['id_dossier']=id_dossier;
    retour['pdate']=date;
    retour['id_lot']=id_lot;
    retour['isSocketLaunch']=isSocketLaunch;
    res.view('pages/prime/zoom',retour);
  },

  loadDataZoom : function(req,res){


    var id_dossier = req.param('id_dossier');
    var date = req.param('pdate');
    var id_lot = req.param('id_lot');
    var option=[];
    var isSocketLaunch = false;

    if(date === new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10)){
      isSocketLaunch = true;
    }
    var isRT = false;
    //if(date==)
    option.id_dossier = id_dossier;
    option.pdate = date;
    option.id_lot = id_lot;
    async.series([
      function (callback) {

        CQAlmerys.getSousSpecialite(option, callback);
      },
      function (callback) {
        Crenaux.finCrenaux(option, callback);
      },
      function (callback) {
        Prime.findprimeByDossierLot(option, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
      return res.ok(JSON.stringify({lib :result[0],crenaux :result[1],prime : result[2],isSocketLaunch:isSocketLaunch}));
    });

  },

  loadData : function(req,res){
    //Recuperation de la liste de sous specialite
    var id_dossier = req.param('id_dossier');
    var date = req.param('pdate');
    var isSocketLaunch = false;

    if(date === new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10)){
      isSocketLaunch = true;
    }
    var option = [];
    option.id_dossier = id_dossier;
    option.pdate = date;
    async.series([
      function (callback) {
        CQAlmerys.listSousSpecialite(option, callback);
      },
      function (callback) {
        Crenaux.finCrenaux(option, callback);
      },
      function (callback) {
        Prime.findprimeByDossier(option, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
      return res.ok(JSON.stringify({ssp :result[0],crenaux :result[1],prime : result[2],isSocketLaunch:isSocketLaunch}));
    });
  },

  save : function(req,res){
    //Recuperation de la liste de sous specialite
    var id_prime = req.param('id_prime');
    var cible = req.param('cible');
    var montant = req.param('montant');
    var option = [];
    option.id_prime = id_prime;
    option.cible = cible;
    async.series([

      function (callback) {
        Prime.update({id:id_prime},{cible:cible,montant:Number(montant)}).exec(function afterwards(err, updated){

          if (err) {
            console.log(err);
          }
          return callback(null);
        });
      }
    ], function (err, result) {
      if (err) return res.send(err);
      return res.ok(true);
    });
  },

  /*
  * fonction pour inserer chaque matinee les ligne du table tdb_prime
  * */
  addLine : function (req,res) {
    // Date format yyyy/MM/dd
    var date = req.param("pdate");

    // Liste des dossier concerner

    var list_dossier = [577,578,582,580,579,663,29];
    async.eachSeries(list_dossier,function (prime,callback) {
      var option = [];
      option.id_dossier = prime;
      async.series([
        function(callback){
          CQAlmerys.listSousSpecialite(option,callback);
        }
      ],function (err,results) {
        if(err) return;

        async.eachSeries(results[0],function (ssp,callback) {
          Prime.create({id_spec : prime,id_s_spec : ssp.id_lotclient,date : date,id_crenaux : 1}).exec(function (err, records) {
          });

          Prime.create({id_spec : prime,id_s_spec : ssp.id_lotclient,date : date,id_crenaux : 2}).exec(function (err, records) {
          });

          Prime.create({id_spec : prime,id_s_spec : ssp.id_lotclient,date : date,id_crenaux : 3}).exec(function (err, records) {
          });

          Prime.create({id_spec : prime,id_s_spec : ssp.id_lotclient,date : date,id_crenaux : 4}).exec(function (err, records) {
          });

          Prime.create({id_spec : prime,id_s_spec : ssp.id_lotclient,date : date,id_crenaux : 5}).exec(function (err, records) {
          });
          callback();
        },function(err){
          callback();
        })
      })

      //callback();
    },function(err){
      res.ok("04");
    });

  }
  ,

  /*
  * Fonction pour la modification de la table prime
  * */

  updatePrime : function(req,res){
    // Date format yyyy/MM/dd
    var date = req.param("pdate");

    // Liste des primes


    var dep = {};
    dep[579] = 19;
    dep[578] = 20;
    dep[580] = 22;
    dep[577] = 38;
    dep[29] = 39;
    dep[583] = 40;
    dep[582] = 49;
    dep[663] = 25;

    var mini_sqls = {};
    mini_sqls[1]=" AND h_deb < '09:00' ";
    mini_sqls[2]=" AND h_deb > '09:01' AND h_deb < '11:00' ";
    mini_sqls[3]=" AND h_deb > '11:01' AND h_deb < '13:00' ";
    mini_sqls[4]=" AND h_deb > '13:01' AND h_deb < '15:00' ";
    mini_sqls[5]=" AND h_deb > '15:01' ";


    async.series([
      function(callback){
        Prime.findprime(date,callback);
      }
    ],function(errr,resultat){

      async.eachSeries(resultat[0],function (prime,callback) {



        ////console.log(option);
        if((prime.date)!==null){
          var option = [];
          option.pdate = (prime.date).replace('/','').replace('/','');
          option.id_dossier = prime.id_spec;
          option.id_lotclient = prime.id_s_spec;
          option.id_departement = dep[prime.id_spec];
          option.minisql = mini_sqls[prime.id_crenaux];
          async.series([
            function (callback) {
              Prime.findQte(option,callback);
            },
            function (callback) {
              Prime.findLstPers(option,callback);
            }
          ],function (err3,resultQte) {
            if(err3){
              //console.log(err3);
              callback();
            }
            else{
              //console.log({reel:resultQte[0].pri,json_titulaire:JSON.stringify(resultQte[1].pri),json_renfort:JSON.stringify(resultQte[1].ref)});
              //console.log({id:prime.id});
              var prim = false;
              if(prime.cible!=null){
                if(Number(resultQte[0].pri)>=Number(prime.cible)){
                  prim = true;
                }
              }
              async.series([
                function(callback){
                  Prime.update({id:prime.id},{reel:(resultQte[0].pri || 0),cible:300,montant:500,prime : prim,json_titulaire:JSON.stringify(resultQte[1].pri),json_renfort:JSON.stringify(resultQte[1].ref)}).exec(function afterwards(err, updated){

                    if (err) {
                      console.log(err);
                    }
                    return callback(null);
                  });
                }
              ],function (erreurUpdate,resultsUp) {
                callback();
              })
            }

          })
        }else{
          callback()
        }
        /**/


      },function(err2){

        return res.ok("04");

      });
    });



    /*async.eachSeries(list_dossier,function (prime,callback) {
      var option = [];
      option.id_dossier = prime;
      async.series([
        function(callback){
          CQAlmerys.listSousSpecialite(option,callback);
        }
      ],function (err,results) {
        if(err) return;

        async.eachSeries(results[0],function (ssp,callback) {
          Prime.create({id_spec : prime,id_s_spec : ssp.id_lotclient,date : date,id_crenaux : 1}).exec(function (err, records) {
          });

          Prime.create({id_spec : prime,id_s_spec : ssp.id_lotclient,date : date,id_crenaux : 2}).exec(function (err, records) {
          });

          Prime.create({id_spec : prime,id_s_spec : ssp.id_lotclient,date : date,id_crenaux : 3}).exec(function (err, records) {
          });

          Prime.create({id_spec : prime,id_s_spec : ssp.id_lotclient,date : date,id_crenaux : 4}).exec(function (err, records) {
          });

          Prime.create({id_spec : prime,id_s_spec : ssp.id_lotclient,date : date,id_crenaux : 5}).exec(function (err, records) {
          });
        },function(err){
          callback();
        })
      })

      callback();
    },function(err){
      res.ok("04");
    });*/
  }



};

