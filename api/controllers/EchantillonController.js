/**
 * EchantillonController
 *
 * @description :: Server-side logic for managing Echantillons
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /*
      page de parametrage des echantillons  par lot_client ou sous specialite;
   */
	index : function (req,res) {

    if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    async.series([
      function (callback) {
        CQAlmerys.listSSBySP(null,callback);
      }
    ],function (err,result) {
      res.view('pages/EchantSetting',{layout: false,menu : menu,sspec : result[0]});
    })

  },

  /*
  recuperation des valeur des echantillons et des population
   */

  get_pop : function(req,res){
    async.series([
      function (callback) {
        CQAlmerys.getLot(null,callback);
      }
    ],function (err,result) {
      res.ok(JSON.stringify(result[0]));
    })
  },

  /*
  recupration des listes des echantillons par matricule
  parametre id_lot_client
   */
  get_ech_by_mat : function(req,res){
    var id = req.param("id",null);
    var option  = []
    option.id_lot_client  = id;
    async.series([
      function (callback) {
        CQAlmerys.getLsEchant(option,callback);
      }
    ],function (err,result) {
      res.ok(JSON.stringify(result[0]));
    })
  },

  /*
  recperation de nombre des op assigné par sous specialite
   */
  get_nb_by_lot : function(req,res){
    async.series([
      function (callback) {
        CQAlmerys.getNbEchantLot(null,callback);
      }
    ],function (err,result) {
      res.ok(JSON.stringify(result[0]));
    })
  },

  /*
  Distrubition des echantillon par matrcule
  parametre
  id_lot_client

   */

  set_echant_by_op : function(req,res){
    var id_lot_client= req.param("id_lotclient",null);
    var nb_op= req.param("op",null);
    var nb_ec= req.param("ech",null);
    var type= req.param("type",null);
    var nbEchPmat = parseInt(nb_ec/nb_op);
    var rst = nb_ec - nbEchPmat*nb_op;

    var option  = [];
    option.id_lot_client = id_lot_client;
    async.series([
      function (callback) {
        CQAlmerys.getPsEchantLot(option,callback);
      }
    ],function (err,result) {
      //res.ok(JSON.stringify(result[0]));
      //parcours des listes des personnes
        async.eachSeries(result[0],function (prime,callback) {
          var id_pers = prime.id_pers;
          var t = nbEchPmat;

          if(rst>0){
            t += 1;
            rst -=1;
          }

          option.id_pers = id_pers;
          option.echant_total = t;

          /*
          Enregistrement des repartitions des echantillons par matricule
           */
          async.series([
            function (callback) {
              CQAlmerys.updateEchantLot(option,callback);
            }
          ],function(errIns,resultIns){
            callback();
          });
        },function(err){
          return res.ok(true);
        });
    })
  },

  /*
  Ajout desnombre d'echantilons
  parametre id_lot_client
  id_pers
   */
  add_ech_by_mat : function(req,res){
    var id = req.param("id",null);
    var id_pers = req.param("id_pers",null);
    var option  = []
    option.id_lot_client  = id;
    option.id_pers  = id_pers;
    async.series([
      function (callback) {
        CQAlmerys.addEchantByMt(option,callback);
      }
    ],function (err,result) {
      res.ok(JSON.stringify(result[0]));
    })
  },

  /*
  Ajout de la population avec calcul d'echantillon
  parametre
  id_lotclient,population
  return
  nbEchant,status true or false

   */
  save_population_al : function (req,res) {
    var id_lotclient = req.param("id_lotclient",null);
    var population = req.param("pop",null);
    var type = req.param("type",null);


    var opt = [];
    opt.pop = population;
    async.series([
      function (callback) {
        CQAlmerys.getCategorie(opt,callback);
      }
    ],function (err,echantillon) {
      //console.log(echantillon);
      var ech = echantillon;
      var option = [];
      option.id_lot = id_lotclient;
      option.quantite = population;
      option.echantillon = echantillon;
      option.pdate = ''+(new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8);
      var functionAdd = function (callback){
        CQAlmerys.addPopulationNew(option,callback);
      };
      if(Number (type)==1){
        functionAdd = function (callback){
          CQAlmerys.updatePopulationNew(option,callback);
        }
      }

      async.series([
        functionAdd
      ],function (err,result) {
        return res.ok(JSON.stringify({st:true,ech:ech}))
      })
    });

  },

  /*
  lancement des echantillonage

   */
  launch : function (req,res) {
    async.series([
      function (callback) {
        //EchantillonService.setEchantillonOp(null,callback);
        EchantillonService.setPersEchant(null,callback);
      }
    ],function (err,result) {
      return res.ok(result[0]);
    });
  },
  del_ech_by_mat : function (req,res) {
    var option = [];
    option.id_pers = req.param("id_pers");
    option.id = req.param("id");
    async.series([
      function (callback) {
        //EchantillonService.setEchantillonOp(null,callback);
        CQAlmerys.delEchantByMt(option,callback);
      }
    ],function (err,result) {
      if(err) return res.ok(JSON.stringify(err));
      return res.ok(result[0]);
    });
  },

  get_list_param : function (req,res) {
    var option = [];
    option.pdate = req.param("pdate");
    async.series([
      function (callback) {
        CQAlmerys.listSSBySP(option,callback);
      },function (callback) {
        CQAlmerys.getLotByDate(option,callback);
      },function (callback) {
        CQAlmerys.getNbEchantLotDate(option,callback);
      },function (callback) {
        CQAlmerys.getErrByDate(option,callback);
      },function (callback) {
        CQAlmerys.getPopByDate(option,callback);
      },function (callback) {
        CQAlmerys.getEchByDate(option,callback);
      }
    ],function (err,result) {
      if(err) return res.ok(JSON.stringify(err));
      return res.ok(JSON.stringify({listSSp:result[0],listPopSSp:result[1],nbPersSSp:result[2],nbErrSSp:result[3],lpop:result[4],lech:result[5]}));
    });
  }
};

