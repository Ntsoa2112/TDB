/**
 * WebServiceController
 *
 * @description :: Server-side logic for managing Webservices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  // getting duration pointage and duration GPAO by date
  pointage_jour:function(req,res){
    var date_cible = req.param('date','');
    var response =[];
    async.series([
      function (callback) {
        User.getActifRpers(null,callback);
      }
    ],function (errReq,results) {
      if(errReq) return res.ok(errReq);

      async.eachSeries(results[0],function (prime,callback) {
        var option = {};
        option.id_pers = prime.id_pers;
        option.date = date_cible;
          async.series([
            function (callback) {
              Ldt.getHprod(option,callback);
            },function (callback) {
              Pointage.getHpointage(option,callback);
            },function (callback) {
              ModelEASYGPAO.getStCongeParDate(option,callback);
            }
          ],function (errReq,resultss) {
            response[prime.id_pers]={res : resultss[0], pointage:resultss[1], conge : resultss[2]};
            //response[prime.id_pers]=JSON.parse(resultss[0]);

            callback();
          });

      },function (erreur) {
        if(erreur) return res.ok(erreur);



            return res.ok(JSON.stringify(response));

      });


    });
  },
};

