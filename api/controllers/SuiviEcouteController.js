/**
 * SuiviEcouteController
 *
 * @description :: Server-side logic for managing Suiviecoutes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
      /*
  * Fonction pour afficher la page principale du suivi ecoute du masque Almerys call
  * */
  index : function (req,res) {
    if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    var id_ecoute = req.param("id");
    var conforme = req.param("conforme",true);
    return res.view('pages/masque/suiviEcoute',{layout:false,menu : menu,id_ecoute:id_ecoute, conforme : conforme});
  },

   /*
  * Fonction pour afficher la page suivi des écoutes
  * */
 getSuiviEcoute : function (req,res) {
    var option = [];
    option.optionDate = req.param("dateSuivi");
    option.optionDate2 = req.param("dateSuivi2");
    option.optionCq = req.param("cqSuivi");
    console.log(option.optionDate+ "  ======>  "+option.optionCq);
    async.series([
      function (callback) {
        SuiviEcoute.getSuiviEcoute(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun JSON
    })
  },

  getSuiviEcouteSemaine : function (req,res) {
    var option = [];
    option.optionDate = req.param("dateSuivi");
    option.optionDate2 = req.param("dateSuivi2");
    option.optionCq = req.param("cqSuivi");
    console.log("  ======>  "+option.optionCq);
    async.series([
      function (callback) {
        SuiviEcoute.getSuiviEcouteSemaine(option,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retun JSON
    })
  },

   /*
  * Fonction pour modifier commentaire
  * */
 modifierCommentaireSuivi: function (req, res)
 {
   if (!req.session.user) return res.redirect('/login');
    var id_pers_ecoute = req.param('id_pers_ecoute',null);
    var commentaire_suivi = req.param('commentaire_suivi',null);
    var date_suivi = req.param('date_suivi',null);

    console.log(" DATA ===> "+id_pers_ecoute + " "+commentaire_suivi+" "+date_suivi);
    var sql ="update ms_ecoute set commentaire_suivi_ecoute = '"+commentaire_suivi+"' where id_pers_ecoute  = "+id_pers_ecoute+" and deb_ecoute::timestamp::date = '"+date_suivi+"'";
    
    async.series([
        function(callback) {
          Ecoute.query(sql, function(err, res){
            if(err) {
              sails.log(err);
              return callback(err);
            }else{
              console.log(sql);
              return callback(null, res);
            }
          });
        }
      ],function(callback, results){
        //res.redirect('back');
        res.redirect('suiviEcoute');
      });
 },

};

