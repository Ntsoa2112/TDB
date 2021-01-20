/**
 * Created by 8029 on 29/08/2016.
 */
module.exports = {

    ajaxPointageAdd: function (req, res) {
        if (!req.session.user)
            return res.redirect('/login');
        var idpers = req.param('id_pers', '');
        var date = (new Date().toISOString()).replace(/-/,'/').replace(/-/,'/').substr(0,10);
        var entree = req.param('entree', '');
        var source = req.param('source', '');
        var com = req.param('com', 'TDB CP');
        var dateFormat = require('dateformat');
        var dt = new Date(date);
        var now = new Date();
        var options = [];
        options.id_pers = idpers;
        options.date = date;
        options.date_easy = "" + dateFormat(dt, "dd/mm/yyyy");
        options.heure = entree;
        options.id_pointeuse = source;
        options.date_modif = "" + dateFormat(dt, "dd/mm/yyyy");
        options.id_pers_modif = req.session.user;
        options.commentaire = com;
        async.series([function (callback) {
                Pointage.addRpointage(options, callback);
            }, function (callback) {
                ModelEASYGPAO.addRpointage(options, callback);
            }], function (err, results) {
            var html = "Echec d'enregistrement";
            if (results[0] == true && results[1] == true) {
                html = "Enregistrement ok";
            }
            return res.ok(html);
        });
    },

    gpaoPointageAdd: function (req, res) {
        var idpers = req.param('id_pers', '');
        var date = req.param('pdate', '');
        var entree = req.param('entree', '');
        var source = req.param('source', '');
        var com = req.param('com', 'TDB CP');
        var dateFormat = require('dateformat');
        var dt = new Date(date);
        var now = new Date();
        //console.log("date:" + date);
        var options = [];
        options.id_pers = idpers;
        options.date = date;
        options.date_easy = "" + dateFormat(dt, "dd/mm/yyyy");
        options.heure = entree;
        options.id_pointeuse = source;
        options.date_modif = "" + dateFormat(dt, "dd/mm/yyyy");
        options.id_pers_modif = idpers;
        options.commentaire = com;

      return res.ok("Enregistrement ok");
        /*async.series([function (callback) {
                Pointage.addRpointage(options, callback);
            }, function (callback) {
                ModelEASYGPAO.addRpointage(options, callback);
            }], function (err, results) {
            var html = "Echec d'enregistrement";
            if (results[0] == true && results[1] == true) {
                html = "Enregistrement ok";
            }
            return res.ok(html);
        });*/
    },

    ajaxPointageForm: function (req, res) {
        var idpers = req.param('id_pers', '');
        var date = req.param('pdate', '');

        var options = [];
        options.id_pers = idpers;
        options.date = date;
        return res.view('pages/ajax/ajaxAddPointage', {idpers: idpers, dt: date, layout: null});
    },

    ajaxAnomalieTab: function (req, res) {
        var idcp = req.param('id_cp', '');
        var idpaie = req.param('id_paie', '');

        var options = [];
        options.id_cp = idcp;
        options.id_paie = idpaie;
        async.series([function (callback) {
                Pointage.getAnomaliePointageByCP(options, callback);
            }], function (err, results) {
            var listeAnomalie = results[0];
            var listeAnomalieDesc = results[1];
            return res.view('pages/ajax/ajaxAnomalieTab', {anomalie: listeAnomalie, layout: null});
        });

    },
  ajaxHeureTab: function (req, res) {
        var idcp = req.param('id_cp', '');
        var idpers = req.param('idpers', '');
        var pdate = req.param('pdate', '');
        var pdatefin = req.param('pdatefin', '');

        var options = [];
        options.id_cp = idcp;
        options.idpers = idpers;
        options.pdate = pdate;
        options.pdatefin = pdatefin;
        async.series([function (callback) {
                Pointage.getHeurePointageByCP(options, callback);
            }], function (err, results) {
            var listeAnomalie = results[0];
            return res.view('pages/ajax/ajaxHeureTab', {anomalie: listeAnomalie, layout: null});
        });

    }, ajaxAnomalieDet: function (req, res) {
        var idpers = req.param('id_pers', '');
        var idpaie = req.param('id_paie', '');

        var options = [];
        options.id_pers = idpers;
        options.id_paie = idpaie;
        async.series([function (callback) {
                Pointage.getAnomaliePointageByOP(options, callback);
            }], function (err, results) {
            var listeAnomalie = results[0];
            return res.view('pages/ajax/jaxAnomalieDetail', {mat: idpers, anomal: listeAnomalie, layout: null});
        });

//<<<<<<< HEAD
    },
//=======
  ajaxSLast: function (req, res) {
    var math = require('mathjs');
    var id_pers = req.param('id_pers','');

    var option = [];
    option.id_pers = id_pers;
    async.series([
        function(callback){
          Pointage.statusPersonnelById(option, callback);
        }
      ],
      function(err, results) {
        res.view("pages/ajax/ajaxSuivisOpRT",{status : results[0],layout : false});
      });

  },

//>>>>>>> c74b70d06c189fd1efa13cda38f10b84c223f306

     ajaxPointageDet: function (req, res) {
        var idpers = req.param('id_pers', '');
        var date = req.param('pdate', '');

        var options = [];
        options.id_pers = idpers;
        options.date = date;
        async.series([function (callback) {
                Pointage.getLsPointage(options, callback);
            }], function (err, results) {
            var listePt = results[0];
            return res.view('pages/ajax/AjaxLsPointageModal', {pointage: listePt, idpers: idpers, pdate: date, layout: null});
        });

    },
    //ajax pour lineChart du Dashboard OP
    ajaxLineChart: function (req, res) {
        var id = req.param('id', '');
        return res.view('pages/ajax/ajaxLineDash', {id: id});

    },
    //ajax pour etapes detaille d'un dossier

    ajaxEtapeDonut: function (req, res) {
        var idPers = req.session.user;
        var dateess = req.session.datechoice;
        var dossier = req.param('id', '');
        var options = [];
        options.dateess = dateess;
        options.idPers = idPers;
        options.dossier = dossier;
        async.series([function (callback) {
                LdtService.getLdtParEtape(options, callback);
            }
        ],
                function (err, results) {
                    var listeEtape = results[0];
                    return res.view('pages/ajax/ajaxDetailEtape', {etape: listeEtape, layout: null});
                });
    },
// hajax pour le select de type d'heure morte
    ajaxHMAlm: function (req, res) {
        User.query('select * from almerys_type_heure', function (eror, test)
        {
            var str = '';
            if (eror)
            {
                return res.send('erreur 2018');
            } else {
                // return res.send(test);
                for (var i = 0; i < test.rows.length; i++) {

                    str += '<option value=' + test.rows[i].id_type + '>' + test.rows[i].libelle + '</option>';

                    ////console.log( test.rows.length );
                }
                return res.send(str);
            }
        });
    },
    //Ajax for table filtré du suivis OP
    ajaxTableFiltree: function (req, res) {
        var math = require('mathjs');
        var type = parseInt(req.param('type', '0'));
        var dataString = req.param('data', '')

        var option = [];
        option.types = type;
        option.data = dataString;
        async.series([
            function (callback) {
                LdtService.getHeureFiltreLdt(option, callback);
            }
        ],
                function (err, results) {
                    if (err)
                        return res.badRequest("Problème avec la récupération des données dans la base");

                    //traitement des donnees
                    var donnees = results[0];

                    return res.view('pages/ajax/ajaxSuivisOp', {

                        math: math,
                        donnees: donnees,
                        layout: false
                    });
                });

    },

    /* Fonction fo the managment controller

     */
    ajaxRangByDoss: function (req, res) {
        var math = require('mathjs');
        var id_dossier = req.param('id_dossier', '');
        var pdate = req.param('pdate', '');
        var id_etape = req.param('id_etape', '');

        var option = [];
        option.date = pdate;
        option.id_dossier = id_dossier;
        option.id_etape = id_etape;
        async.series([
            function (callback) {
                Ldt.getRang(option, callback);
            }
        ],
                function (err, results) {
                    var rangList = results[0];
                    res.view('pages/ajax/ajaxRang', {layout: false, rangList: rangList, math: math});
                });

    },
    jsonRangByDoss: function (req, res) {
        var id_dossier = req.param('id_dossier', '');
        var pdate = req.param('pdate', '');
        var id_etape = req.param('id_etape', '');

        var option = [];
        option.date = pdate;
        option.id_dossier = id_dossier;
        option.id_etape = id_etape;
        async.series([
            function (callback) {
                Ldt.getJsonRang(option, callback);
            }
        ],
                function (err, results) {
                    var rangList = results[0];
                    res.ok(JSON.stringify({rangList: rangList}));
                });

    }, ajaxOstieCP: function (req, res) {
        var id_cp = req.param('id_cp', '');
        var pdate = req.param('pdate', '');
        var pdate2 = req.param('pdate2', '');
        var option = [];
        option.datedeb = pdate;
        option.datefin = pdate2;
        option.id_cp = id_cp;
        async.series([
            function (callback) {
                ReservationOstieService.Get_recap_consult(option, callback);
            }
        ],
                function (err, results) {
                    var rangList = results[0];
                    res.view('pages/ajax/ajaxOstieTab', {layout: false, ostie: rangList});
                });

    }, ajaxPrBrPointage: function (req, res) {
        var id_pers = req.param('id_pers', '');
        var pdate = req.param('pdate', '');
        var option = [];
        option.date = pdate;
        option.id_pers = id_pers;
        async.series([
            function (callback) {
                Pointage.getPointagePB(option, callback);
            }
        ],
                function (err, results) {
                    var pointage = results[0];
                    res.view('pages/ajax/ajaxPBsuivis', {layout: false, pointage: pointage, id_pers: id_pers});
                });

    },

    ajaxLdtByOp: function (req, res) {
        var math = require('mathjs');
        var id_pers = req.param('id_pers', '');
        var pdate = req.param('pdate', '');

        var option = [];
        option.date = pdate;
        option.id_pers = id_pers;
        async.series([
            function (callback) {
                Ldt.getLdtOneByOp(option, callback);
            }
        ],
                function (err, results) {
                    res.view('pages/ajax/ajaxLdt', {layout: false, ldtOne: results[0], math: math});
                });

    },

    ajaxOneLdt: function (req, res) {
        var math = require('mathjs');
        var id_ldt = req.param('id_ldt', '');

        var option = [];
        option.id_pers = req.session.user;
        option.id_ldt = id_ldt;
        async.series([
            function (callback) {
                Ldt.getOneLdt(option, callback);
            }
        ],
                function (err, results) {

                    if (err)
                        return res.send(err);

                 return  res.json(JSON.stringify(results[0]));
                   // return    res.ok(results[0]);
                });
    },

  // recuperation des données dans la ligne de temps
  getReporting : function (req, res) {
    // 
  }

};
