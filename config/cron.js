/**
 * Created by 8029 on 22/09/2016.
 */

const AlmSpecService = require("../api/services/AlmSpecService");
const RestrictionPage = require("../api/services/RestrictionPage");

 module.exports.cron = {
   myJobPersEch: {//Cron pour le demarage du systeme d'echantillonage
     //schedule: 's m h * * *',
     schedule: '1 1 10 * * *',
     onTick: function() {
       async.series([
         function (callback) {
           EchantillonService.setPersEchant(null,callback);
         }
       ],function (err,res) {
         console.log('Echantillonage 10h list pers');

       });

     },
     onComplete: function() {
       console.log('I am triggering when job is complete');
     },
     start: false,
     context: undefined
   },
   myJob: {//Cron pour le demarage du systeme d'echantillonage
     //schedule: 's m h * * *',
     schedule: '1 2 10 * * *',
     onTick: function() {
       async.series([
         function (callback) {
           EchantillonService.setEchantillonOp(null,callback);
         }
       ],function (err,res) {
         console.log('Echantillonage 10h First Echantillonage');
         sails.hooks.cron.jobs.myJob2.start();

       })
       //console.log('GO'+(new Date()));
       //sails.hooks.cron.jobs.myJob2.start();

     },
     onComplete: function() {
       console.log('I am triggering when job is complete');
     },
     start: false,
     context: undefined
   },

   update_pointage_jour: {//Cron pour le demarage du systeme d'echantillonage
     //schedule: 's m h * * *',
     schedule: '1 1 5 * * *',
     //schedule: '10 * * * * *',
     onTick: function() {
       async.series([
         function (callback) {
           Pointage.updatePointageJour(null,callback);
         }
       ],function (err,res) {
         console.log('Update pointage jour du 5h est '+res[0]);
        // sails.hooks.cron.jobs.myJob2.start();

       });
       //console.log('GO'+(new Date()));
       //sails.hooks.cron.jobs.myJob2.start();

     },
     onComplete: function() {
       //console.log('I am triggering when job is complete');
     },
     start: true,
     context: false
   },
   update_pointage_jour12: {//Cron pour le demarage du systeme d'echantillonage
     //schedule: 's m h * * *',
     schedule: '1 1 12 * * *',
     onTick: function() {
       async.series([
         function (callback) {
           Pointage.updatePointageJour(null,callback);
         }
       ],function (err,res) {
         console.log('Update pointage jour du 12h est '+res[0]);
         // sails.hooks.cron.jobs.myJob2.start();

       });
       //console.log('GO'+(new Date()));
       //sails.hooks.cron.jobs.myJob2.start();

     },
     onComplete: function() {
       //console.log('I am triggering when job is complete');
     },
     start: false,
     context: undefined
   },

   update_pointage_jour17: {//Cron pour le demarage du systeme d'echantillonage
     //schedule: 's m h * * *',
     schedule: '1 1 17 * * *',
     onTick: function() {
       async.series([
         function (callback) {
           Pointage.updatePointageJour(null,callback);
         }
       ],function (err,res) {
         console.log('Update pointage jour du 17h est '+res[0]);
         // sails.hooks.cron.jobs.myJob2.start();

       });
       //console.log('GO'+(new Date()));
       //sails.hooks.cron.jobs.myJob2.start();

     },
     onComplete: function() {
       //console.log('I am triggering when job is complete');
     },
     start: false,
     context: undefined
   },


   myJobStop: {
     //schedule: 's m h * * *',
     schedule: '1 1 16 * * *',
     onTick: function() {

       sails.hooks.cron.jobs.myJob2.stop();

     },
     onComplete: function() {
       console.log('I am triggering when job is complete');
     },
     start: false,
     context: undefined
   },
   myJob2: {
     //schedule: '*/50 * * * * *',
     schedule: '* * 2 * * *',//repetition tous les 2 heure
     onTick: function() {
       async.series([
         function (callback) {
           EchantillonService.setEchantillonOp(null,callback);
         }
       ],function (err,res) {
         console.log('Echantillonage ok '+(new Date()));
       })
     },
     onComplete: function() {
       console.log('I am triggering when job is complete');
     },
     start: false,
     context: undefined
   },

   relanceSocketOstie: {
        schedule: '*/5 * * * * *',
        onTick: function() {
          console.log('Socket 1');
        },
        start: false
  },


   /*
   * Cron pour ajouter les ligne du jour
   * */

   myJobAddLinePrime: {
     //schedule: 's m h * * *',
     schedule: '1 1 4 * * *',
     onTick: function() {

       // Date format yyyy/MM/dd
       var date = new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);

       // Liste des dossier concerner

       var list_dossier = [577,578,582,580,579,663,29];
       async.eachSeries(list_dossier,function (prime,callback) {
         var option = [];
         option.id_dossier = prime;
         async.series([
           function(callback){
             CQAlmerys.listSousSpecialite(option,callback);
           }
         ],function (err,results) {
           if(err) return;

           async.eachSeries(results[0],function (ssp,callback) {
             Prime.create({id_spec : prime,id_s_spec : ssp.id_lotclient,date : date,id_crenaux : 1}).exec(function (err, records) {
             });

             Prime.create({id_spec : prime,id_s_spec : ssp.id_lotclient,date : date,id_crenaux : 2}).exec(function (err, records) {
             });

             Prime.create({id_spec : prime,id_s_spec : ssp.id_lotclient,date : date,id_crenaux : 3}).exec(function (err, records) {
             });

             Prime.create({id_spec : prime,id_s_spec : ssp.id_lotclient,date : date,id_crenaux : 4}).exec(function (err, records) {
             });

             Prime.create({id_spec : prime,id_s_spec : ssp.id_lotclient,date : date,id_crenaux : 5}).exec(function (err, records) {
             });
             callback();
           },function(err){
             callback();
           })
         })

         //callback();
       },function(err){
         sails.hooks.cron.jobs.myUpdatePrime.start();
       });

     },
     onComplete: function() {
       console.log('I am triggering when job is complete');
     },
     start: false,
     context: undefined
   },


   myUpdatePrime: {
     //schedule: '*/50 * * * * *',
     schedule: '0 */5 * * * *',//repetition tous les 2 Min
     onTick: function() {
       async.series([
         function (callback) {
           var date = new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);

           // Liste des primes


           var dep = {};
           dep[579] = 19;
           dep[578] = 20;
           dep[580] = 22;
           dep[577] = 38;
           dep[29] = 39;
           dep[583] = 40;
           dep[582] = 49;
           dep[663] = 25;

           var mini_sqls = {};
           mini_sqls[1]=" AND h_deb < '09:00' ";
           mini_sqls[2]=" AND h_deb > '09:01' AND h_deb < '11:00' ";
           mini_sqls[3]=" AND h_deb > '11:01' AND h_deb < '13:00' ";
           mini_sqls[4]=" AND h_deb > '13:01' AND h_deb < '15:00' ";
           mini_sqls[5]=" AND h_deb > '15:01' ";


           async.series([
             function(callback){
               Prime.findprime(date,callback);
             }
           ],function(errr,resultat){

             async.eachSeries(resultat[0],function (prime,callback) {


               if((prime.date)!==null){
                 var option = [];
                 option.pdate = (prime.date).replace('/','').replace('/','');
                 option.id_dossier = prime.id_spec;
                 option.id_lotclient = prime.id_s_spec;
                 option.id_departement = dep[prime.id_spec];
                 option.minisql = mini_sqls[prime.id_crenaux];

                 //console.log(option);

                 async.series([
                   function (callback) {
                     Prime.findQte(option,callback);
                   },
                   function (callback) {
                     Prime.findLstPers(option,callback);
                   }
                 ],function (err3,resultQte) {
                   if(err3){
                     console.log(err3);
                     callback();
                   }
                   else{
                     /*console.log({reel:resultQte[0].pri,json_titulaire:JSON.stringify(resultQte[1].pri),json_renfort:JSON.stringify(resultQte[1].ref)});
                      console.log({id:prime.id});*/
                     /*TODO*/
                     var prim = false;
                     if(prime.cible!=null){
                       if(Number(resultQte[0].pri)>=Number(prime.cible)){
                         prim = true;
                       }
                     }
                     /*TODO*/
                     async.series([
                       function(callback){
                         Prime.update({id:prime.id},{reel:(resultQte[0].pri || 0),prime : prim,json_titulaire:JSON.stringify(resultQte[1].pri),json_renfort:JSON.stringify(resultQte[1].ref)}).exec(function afterwards(err, updated){

                           if (err) {
                             console.log(err);
                           }
                           return callback(null);
                         });
                       }
                     ],function (erreurUpdate,resultsUp) {//Free
                       callback();
                     })
                   }
                   //

                 })
               }
               else{
                 callback()
               }


             },function(err2){

                  async.series(
                    [
                      function(callback){
                        var opt = [];
                        opt.id_dossier = 579;
                        opt.pdate = new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);

                        Prime.findprimeByDossier(opt,callback);
                      },
                      function(callback){
                        var opt = [];
                        opt.id_dossier = 578;
                        opt.pdate = new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);

                        Prime.findprimeByDossier(opt,callback);
                      },
                      function(callback){
                        var opt = [];
                        opt.id_dossier = 580;
                        opt.pdate = new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);

                        Prime.findprimeByDossier(opt,callback);
                      },
                      function(callback){
                        var opt = [];
                        opt.id_dossier = 577;
                        opt.pdate = new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);

                        Prime.findprimeByDossier(opt,callback);
                      },
                      function(callback){
                        var opt = [];
                        opt.id_dossier = 29;
                        opt.pdate = new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);

                        Prime.findprimeByDossier(opt,callback);
                      },
                      function(callback){
                        var opt = [];
                        opt.id_dossier = 583;
                        opt.pdate = new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);

                        Prime.findprimeByDossier(opt,callback);
                      },
                      function(callback){
                        var opt = [];
                        opt.id_dossier = 582;
                        opt.pdate = new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);

                        Prime.findprimeByDossier(opt,callback);
                      },
                      function(callback){
                        var opt = [];
                        opt.id_dossier = 663;
                        opt.pdate = new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);

                        Prime.findprimeByDossier(opt,callback);
                      }
                    ],function(err,results){

                      sails.sockets.blast("prime_579",JSON.stringify(results[0]));
                      sails.sockets.blast("prime_578",JSON.stringify(results[1]));
                      sails.sockets.blast("prime_580",JSON.stringify(results[2]));
                      sails.sockets.blast("prime_577",JSON.stringify(results[3]));
                      sails.sockets.blast("prime_29",JSON.stringify(results[4]));
                      sails.sockets.blast("prime_583",JSON.stringify(results[5]));
                      sails.sockets.blast("prime_582",JSON.stringify(results[6]));
                      sails.sockets.blast("prime_663",JSON.stringify(results[7]));

                      console.log("blast prime ok");
                    }
                  )

             });
           });
         }
       ],function (err,res) {

       })
     },
     onComplete: function() {
       console.log('I am triggering when job is complete');
     },
     /*TODO false*/
     start: false,
     context: undefined
   },
   generateSuiviProd : {
    schedule : '0 5 4 * * *',
    //schedule : '0 */1 * * * *',

    onTick : function() {
       AlmSpecService.insertTree( 
         (err) => {
           if(err) console.log(err);
           console.log('insertion specialités suivi prod du 04h 05min terminée');
         }  
       );
    }
  },

  resetQuotaTdbOp :  {
    schedule : '0 5 0 * * *',
    //schedule : '0 */1 * * * *',

    onTick : function() {
       RestrictionPage.resetAllQuota(
         (err) => {
           if(err) console.log(err);
           console.log('reset quota terminé');
         }  
       );
    }
  }

   // CRON CHAT
/*   FiveSecondChrono: {//Cron
     //schedule: 's m h * * *',
     schedule: '*!/5 * * * * *',
     onTick: function() {
       console.log("CHACHACHA");
        async.parallel([
          function(callback){
            SocketService.getArrayParticipant(callback);
          },
          function(callback){
            SocketService.getArrayMessage(callback);
          },
          function (callback) {
            SocketService.getArraySupprimerEn(callback);
          }
        ],function(err, result){
          if(err)
          {
            console.log(err);
          }
          else
          {
            var object = {};
            object.liste_array_participant = result[0];
            object.liste_array_message=result[1];
            object.liste_array_supprimer=result[2];
            var id = "Batch";
            // ENVOI SOCKET
            sails.sockets.blast(""+id, {message : object});
           // console.log(object);
           // console.log("terminer");
          }
        });
     },
     /!*onComplete: function() {
       console.log('I am triggering when job is complete');
     },*!/
     //start: false,
    // context: undefined
   },*/
   // CRON FACTURE SOLIMUT
   /*FactureSolimut: {
     //schedule: 's m h * * *',
     schedule: '*!/1 * * * *',
     onTick: function() {
       console.log("CHACHACHA");
       async.series([
         function(callback) {
           Solimu.dispatchFactureNonDispatcher(callback);
         }
       ],function(erreur_B, result_B){
         if(erreur_B)
         {
           //return res.badRequest(erreur_B);
           console.log(erreur_B);
         }
         else
         {
           console.log("Execution Batch Facture Terminer");
           //return res.json(result_B[0]);
           //return res.ok("Execution Batch terminer");
         }
       });
     },
     /!*onComplete: function() {
       console.log('I am triggering when job is complete');
     },*!/
     //start: false,
     // context: undefined
   },



   

*/
 };

