/**
 * GestionCongeController
 *
 * @description :: Server-side logic for managing Gestionconges
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  reporting : function (req,res) {
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
              retour['layout'] = false;
              retour['menu'] = menu;
              retour['result'] = gHgroupe;
              retour['semaine'] = results[1];
              retour['pole'] = results[2];
              retour['date'] = dateNow;
              retour['listsemaine'] = results[3];
              retour['poleid'] = req.param("pole",req.session.id_departement);
              retour['semid'] = req.param("sem");
              return res.view('pages/gestion_conge/reporting_conge', retour)
            }
          })
        }

      });
    /*var retVal = [];
    retVal['layout'] = false;
    return res.view('pages/gestion_conge/reporting_conge',retVal);*/
  }

};

