/**
 * GestionController
 *
 * @description :: Server-side logic for managing Cestions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 * http://blog.mixu.net/2011/02/03/javascript-node-js-and-for-loops/
 */

module.exports = {

  //page almerys controller

  gestion : function (req, res) {
    var math = require('mathjs');

    /* class des menus*/

    var menu = [];
    menu["aceuil"] = "selected";
    menu["dossierAdmin"] = "";
    menu["gestionDossier"] = "";
    menu["statOpAdmin"] = "";
    menu["presence"] = "";
    menu["admin"] = "";

    var datedeb = req.param('datedeb', '' + (new Date().toISOString()).replace(/-/, '').replace(/-/, '').substr(0, 8));
    var datefin = req.param('datefin', '' + (new Date().toISOString()).replace(/-/, '').replace(/-/, '').substr(0, 8));

    var url = 'pages/gestionAlmerys';
    if(datedeb==datefin){
      url = 'pages/gestionAlmerysDetail';
    }

    var options = [];
    options.datedeb = datedeb;

    var conge = [];
    options.datefin = datefin;

    //declaration d'un fonction callback

    function attendre(callback) {
      callback();
    }


    //recuperation des données utile

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
    ],function(err, results) {
      if (err){
        //console.log("Erreur re recup ldtNbOpSpec ou ldtSpec");
      }else{

        var ldtSpec = results[0];
        var ldtNbOpSpec = results[1];
        var listSpecialite = results[2];
        if(datedeb==datefin){
          /* heure total des congé par specialité */
          /**  boucle specialite*/
          attendre(function () {
            var ii = 0;
            for(var i=0;i<ldtNbOpSpec.length;i++) {
              attendre(function () {
                var opt = [];
                opt.idSpec = ldtNbOpSpec[i].id_spec;

                /**recuperation des pers par specialite*/
                async.series([
                    function (callback) {
                      User.getCongeParDateId(opt, callback);
                    }],
                  function (err, resPers) {
                    if (err) {
                      //console.log("Erreur recuperation des pers par specialite");

                    } else {
                      var hConge = 0;
                      var hCongeMed = 0;
                      var id_pers = 0;

                      /**  boucle des listes des personnes du specialite prime.id_spec*/
                      var listPers = resPers[0];
                      for (var y = 0; y < listPers.length; y++) {
                        attendre(function () {
                          var optPers = [];
                          optPers.id_pers = listPers[y].id_pers;
                          id_pers = listPers[y].id_pers;
                          optPers.datedeb = datedeb;
                          /**recuperation des heures conges de pers.id_pers*/
                          async.series([
                              function (callback) {
                                ModelEASYGPAO.getCongeParDateId(optPers, callback);
                              },
                              function (callback) {
                                ModelEASYGPAO.getCongeMedParDateId(optPers, callback);
                              }],
                            function (err, resConge) {
                              if (err) {
                                //console.log("Erreur recuperation heure conge par pers");
                              } else {
                                if (resConge[0] != null) hConge = hConge + Number(resConge[0]);
                                if (resConge[1] != null) hCongeMed = hCongeMed + Number(resConge[1]);
                              }
                            });

                        })
                      }

                      //console.log("Conge:"+ii+"=>"+hConge);
                      //console.log("CongeMedicale:"+ii+"=>"+hConge);
                      var congeObject = { hconge:hConge,hcongeMed:hCongeMed};
                      attendre(function (){

                        conge.push("hConge",congeObject);

                        /*

                         conge[ii].hConge = hConge;
                         conge[ii].hCongeMed = hCongeMed;*/
                        //console.log("CongeTout:"+ii+"=>"+JSON.stringify(conge[ii]));
                      })

                      ii++;
                    }
                  });
              })
            }


          })
          //loagpage
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
      }

    });

  }
};

