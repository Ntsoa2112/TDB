/**
 * MotifAppelController
 *
 * @description :: Server-side logic for managing motifappels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /*
   * Fonction pour recuperer la liste des motifs apples
   * */
  getListeMotifAppel: function(req, res)
  {
    var doct = req.param('is_doctocare',null);
    var briant = req.param('is_briant',null);
    var codelis = req.param('is_codelis',null);
    console.log(doct + "==================" + briant);
    async.series([
      function (callback) {
        var options = [];
        options.is_doctocare = doct;
        options.is_briant = briant;
        options.is_codelis = codelis;
        MotifAppel.getListeMotifAppel(options,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retourne de la liste des TC sn JSON
    })
  },
};

