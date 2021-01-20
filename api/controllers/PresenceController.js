/**
 * presenceController
 *
 * @description :: Server-side logic for managing presences
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require('fs');


module.exports = {
	 getpresenceToday: function (req, res) {
    	var retval = [];
         var dateess = new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);
        var sql = "SELECT * from r_pointage where pdate='" +dateess+ "' AND id_util="+req.session.user+"  AND source IN ('IN', 'OUT','IN_ARO', 'OUT_ARO','IN_ARO1', 'OUT_ARO1', 'IN_RDJ', 'OUT_RDJ') order by entree asc";
    Ldt.query(sql,function(err,result){
      if (err){
        //console.log('err');
        return;
      }
      else{
        //console.log(sql);
        retval['presence'] = result['rows'];
        Photo.find({id_pers : req.session.user}, function(err, resultat){
          if(err || resultat[0] == undefined) return err;

          var imageToShow = ImageService.toBase64String(resultat[0].photo);
          retval['image'] = imageToShow;
          return res.view( 'pages/presencePage', retval);
        });
    }
    });
     },

  // pour mettre a jour le p_logon
     updatelastDateConnected: function (req, res) {
		return res.ok(true);
       /*var options = req.param("id",null);
       async.series([
           function(callback){
             Pointage.updateLastConnectedTime(options, callback);
           }
         ],
         function(err, results) {
           if (err) return res.badRequest("Problème avec la récupération des données dans la base=>"+err);

           return res.ok(results[0]);
         });*/
     },

      // upload data in  server and insert in database
      /* POST url http://db1.easytech.mg:9090/uploadData
              param : id_pers, image
       */


     uploadInsertDb: function (req, res) {
       console.log("start upload");
       req.file('image').upload({
         // don't allow the total upload size to exceed ~10MB
         maxBytes: 10000000
       },function whenDone(err, uploadedFiles) {
         if (err) {
           return res.negotiate(err);
         }

         // If no files were uploaded, respond with an error.
         if (uploadedFiles.length === 0){
           return res.badRequest('No file was uploaded');
         }else{

           fs.readFile(uploadedFiles[0].fd, 'hex', function(err, imgData) {
             ////console.log('imgData',imgData);
             imgData = '\\x' + imgData;
             Screen.create({
                 id_pers : parseInt(req.param("id_pers",null)),//req.param("id",null)
                 photo: imgData,
                 // photo: uploadedFiles,
               })
               .exec(function (err){
                 if (err) return res.negotiate(err);
                 console.log("success upload File");
                 return res.ok(JSON.stringify(imgData));
               });
           });
          /* Screen.create({
               id_pers : 8029,
               time : new Date(),
               photo: ImageService.base64_encode(uploadedFiles[0].fd),
              // photo: uploadedFiles,
             })
             .exec(function (err){
               if (err) return res.negotiate(err);
               return res.ok(JSON.stringify(uploadedFiles));
             });*/
         }


         // Save the "fd" and the url where the avatar for a user can be accessed

       });
     },

  showPhinDb: function (req, res) {

        Screen.find({id : req.param("id",null)}, function(err, resultat){
          if(err || resultat[0] == undefined) return res.redirect('/');

          var imageToShow = ImageService.toBase64String(resultat[0].photo);
          req.session.ph = imageToShow;
          res.view('upload');
        });

  },

  showPhinDbByID: function (req, res) {
    /*if (!req.session.user) return res.redirect('/login');
    if (!req.session.admin) return res.redirect('/Admin');*/
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";




      async.series([
          function(callback){
            Plogon.getPlogon(callback);
          }
        ],
        function(err, results) {
          if (err) return res.badRequest("Problème avec la récupération des données dans la base=>"+err);

          ////console.log(results);
          res.view('pages/screenOp',{menu: menu,image : [],plogon : results[0]});
        });
      /*async.eachSeries(resultat, function (prime, callback) {
        //console.log(prime.id);
        image[i]=[];
        image[i].id=prime.id;
        image[i].time=prime.time;
        image[i].photo=ImageService.toBase64String(prime.photo);
        i++;
        callback(); // Alternatively: callback(new Error());
      }, function (err) {
        if (err) { throw err; }
          //console.log('Well done :-)!');


      });*/

  },

  showPhinDbByIDAjax: function (req, res) {
    if (!req.session.user) return res.redirect('/login');


    Screen.find({id_pers : req.param("id_pers",null)}).sort('time DESC').limit(5).exec( function(err, resultat){

      var image = [];
      var i = 0;

      async.eachSeries(resultat, function (prime, callback) {
       //console.log(prime.id);
       image[i]=[];
       image[i].id=prime.id;
       image[i].time=prime.time;
       image[i].photo=ImageService.toBase64String(prime.photo);
       i++;
       callback(); // Alternatively: callback(new Error());
       }, function (err) {
       if (err) { throw err; }
       //console.log('Well done :-)!');
       res.view('pages/screen',{image : image, layout :  false});

       });
    });

  },


     getPresenceThisMounth: function (req, res) {

     },

     getPresenceByMounth: function (req, res) {

     },

    updatePointageJour: function (req, res) {
        var pdate = req.param("pdate");
        var id_util = req.param("id_pers");

        var sql = "select updatepointagejourbyidpers("+id_util+",'"+pdate+"') ";

        async.series([
          function (next) {
            Ldt.query(sql, function (err, res) {
              if (err)
                return next(err);
              return next(null, res.rows);
            });
          }
        ],function (err,results) {
          if(err) return res.ok(false);
          return res.ok(true);
        })


     },

  validatePointageJour: function (req, res) {
        var pdate = req.param("pdate");
        var id_util = req.param("id_pers");
        var dateNow = new Date().toISOString().substr(0,10);

        var sql = "INSERT INTO r_flag_pointage_jour(pdate, id_util, date_modif, is_valide, id_pers_modif, table_modifier) " +
          " VALUES ('"+pdate+"', "+id_util+", '"+dateNow+"', true, "+req.session.user+", '') ";

        async.series([
          function (next) {
            Ldt.query(sql, function (err, res) {
              if (err)
                return next(err);
              return next(null, res.rows);
            });
          }
        ],function (err,results) {
          if(err) return res.ok(false);
          return res.ok(true);
        })


     },
};

