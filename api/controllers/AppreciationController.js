/**
 * AppreciationController
 *
 * @description :: Server-side logic for managing Appreciations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getListeAppreciation: function(req, res)
  {
    async.series([
      function (callback) {
        Appreciation.getListeAppreciation(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retourne de la liste des TC sn JSON
    })
  },
};

