/**
 * MotifNonConformiteController
 *
 * @description :: Server-side logic for managing Motifnonconformites
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
 getListeMotifNonConformite: function(req, res)
  {
    async.series([
      function (callback) {
        MotifNonConformite.getListeMotifNonConformite(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retourne de la liste des TC sn JSON
    })
  },
};

