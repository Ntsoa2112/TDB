/*alm_vol_qual: function(req,res){
        var math = require('mathjs');
       var datedeb =req.param('datedeb',''+(new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8));
       var datefin =req.param('datefin',''+(new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8));
        var options = [];
        options.datedeb = datedeb;
        options.datefin = datefin;
        async.series([
            function(callback){
                Dossier.getErrOk(options, callback);
            },function(callback){
                Dossier.getErrISO(options, callback);
            }
        ],
          function(err, results) {
            if (err){
              //console.log("Erreur re recup ldtNbOpSpec ou ldtSpec");
            }else{

                async.forEach(results[])
                return res.ok(results);

            }

          });

    }*/
