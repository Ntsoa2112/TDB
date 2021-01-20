/**
 * SocketServerController
 *
 * @description :: Server-side logic for managing Socketservers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    sendSocket: function (req, res) {
        var id = req.params.all();
        //console.log(id);
        if(id.id_pers!=null){
            ////console.log(id.idClient);
            sails.sockets.blast("prc"+id.id_pers, {message : id.message,qualite: id.qualite});
            console.log("blast success:prc"+id.id_pers);
        }
        return res.ok("ok bb");
    },
  sendSocketChat : function (req, res) {
    var id = req.params.all();
    //console.log(id);
    //console.log(String.raw`` +id.message+ ``);
    var string_message = String.raw`` +id.message+ ``;
    //console.log(string_message);
    var options = {};
    options = JSON.parse(string_message);
    //console.log(id);
    async.series([
      function(callback)
      {
        if(id.id.toString() == "ajout_conversation")
        {
          SocketService.Insert_chat(options,callback);
        }
        else if(id.id.toString() == "ajout_message")
        {
          SocketService.Insert_Message(options,callback);
        }
        else if(id.id.toString() == "ajout_participants")
        {
          SocketService.Insert_Participant(options,callback);
        }
        else if(id.id.toString() == "suppression_participants")
        {
          SocketService.Delete_Participant(options,callback);
        }
        else if(id.id.toString() == "message_received")
        {
          SocketService.Message_Recu(options,callback);
        }
        else if(id.id.toString() == "conversation_received")
        {
          SocketService.Conversation_Recu(options,callback);
        }
        else if(id.id.toString() == "suppression_reussie")
        {
          SocketService.Suppression_Reussie(options,callback);
        }
        else
        {
          return callback(null, "ok");
        }
      }
  ],function(err,result){
      if(err)
      {
        console.log("Erreur ===> "+err);
        return res.ok("Erreur");
      }
      else
      {
        if(id.id!=null){
          ////console.log(id.idClient);
          //sails.sockets.blast(""+id.id, {message : id.message});
          //console.log("blast success:prc"+id.id_pers);
        }
        console.log("DONE");
        return res.ok("ok");
      }
    });
  },

  // test socket server

  sendSocketTest: function (req, res) {
      ////console.log(id.idClient);
      sails.sockets.blast("test", {message : "mande"});
      //console.log("blast success");
    return res.ok("ok bb");
  },
  sendSocketCS: function (req, res) {
    ////console.log(id.idClient);
    var id = req.param("id");
    var data = req.param("data");
    sails.sockets.blast(id, {message : data});
    //console.log("blast socket HENTS");
    return res.ok("ok bb");
  },



  //statut de connection

  ImConnected: function (req, res) {
    ////console.log(id.idClient);
    var id = req.param("id_pers",null);
    var type = req.param("type",null);
    var option  = [];
    option.id_pers = id;

    async.series([
      function(callback){
        User.getRpersById(option, callback);
      }
      ],function (err,results) {

      sails.sockets.blast("dashboard", {id : id, type : type, data : results[0]});
      ////console.log("blast success");
      return res.ok("ok");
    });

  },

  //send socket ostie notification

  notifyOstie: function(req,res){
    async.series([
        function(callback){
          Pointage.getAttenteOstie(null, callback);
        },
        function(callback){
           Pointage.getEncourOstie(null, callback);
        }
    ],
      function(err, results) {
        var min = 0;
          async.eachSeries(results[0], function (prime, callback) {
              var id = prime.id_pers;
              var msg = {};
              if(min==0){
                  if(results[1]>1){
                      msg.message = 'Preparez vous, votre tour sera dans quelques minutes!';
                  }else{
                      msg.message = 'Veulliez vous rendre chez OSTIE immediatement!';
                  }

              }else{
                msg.message = 'votre tour sera dans '+min+' minutes';
              }

              min += 15;
              sails.sockets.blast("ost"+id, msg);
              ////console.log("blast success");
              callback();

          },
          function (err) {
              if (err)
              {
                ////console.log("Erreur recuperation des pers  Ostie");
              }
              else {
            var msg = {};
              sails.sockets.blast("ostie", msg);
                  ////console.log("blast successC");
                return res.ok('ok');
              }


            });

      });

  },

    notifyOpOstieV2: function(req,res){
            var msg = {};
            msg.message = 'Veulliez vous rendre chez OSTIE immediatement!';
            var id_pers = req.param('id_pers','');
           sails.sockets.blast("ost"+id_pers, msg);
           ////console.log("blast successW2");
           return res.ok('ok');

  },
  //send socket Managment pour mis a jour


    notifyWebOstie: function(req,res){
            var msg = {};

           sails.sockets.blast("ostie", msg);
           ////console.log("blast successW");
           return res.ok('ok');

  },

    //send msg to op concern

     notifyOpOstie: function(req,res){
         var minute = 0;

         var id_pers = req.param('id_pers','');
         var id_ostie = req.param('id_ostie','');
             var intervale = setInterval(function() {
                minute +=1;
                //console.log("timer : "+minute+" Minutes passer");

                 if(minute>4){

                     //annuler reservation
                     var date = new Date();
                            var h = date.getHours();
                            var min = date.getMinutes();
                            var fin = "" + h + ":" + min + "";

                            ////console.log(id_ostie + ' ' + fin);
                            var updateQuery = "update r_reservation_ostie set stat='rendez vous annuler',fin_reservation='" + fin + "' where id_reservation_ostie=" + id_ostie + "";
                           // //console.log(updateQuery);
                            ReservationOstie.query(updateQuery, function (err, update) {
                              if (err) {
                                //console.log(err);
                                ////console.log(insert.rows);
                              } else {

                                  clearInterval(intervale);

                                  //send socket on the next

                                  async.series([
                                    function(callback){
                                      Pointage.getAttenteOstie(null, callback);
                                    },
                                    function(callback){
                                       Pointage.getEncourOstie(null, callback);
                                    }
                                ],
                                  function(err, results) {
                                    var min = 0;
                                      async.eachSeries(results[0], function (prime, callback) {
                                          var id = prime.id_pers;
                                          var msg = {};
                                          if(min==0){
                                              if(results[1]>0){
                                                  msg.message = 'Preparez vous, votre tour sera dans quelques minutes!';
                                              }else{
                                                  msg.message = 'Veulliez vous rendre chez OSTIE immediatement!';
                                              }

                                          }else{
                                            msg.message = 'votre tour sera dans '+min+' minutes';
                                          }

                                          min += 15;
                                          sails.sockets.blast("ost"+id, msg);
                                          ////console.log("blast success");
                                          callback();

                                      },
                                      function (err) {
                                          if (err)
                                          {
                                            ////console.log("Erreur recuperation des pers  Ostie");
                                          }
                                          else {
                                        var msg = {};
                                          sails.sockets.blast("ostie", msg);
                                              ////console.log("blast successC");
                                            //return res.ok('ok');
                                          }


                                        });

                                  });

                                //res.redirect('reservation_ostie/index');

                                //   res.redirect('ReservationSalle/index');
                              }
                            })

                 }else{
                     async.series([
                         function(callback){
                             Ldt.getLdtOstie(id_pers,callback);
                         }/*,
                         function(callback){

                         }*/
                     ],function(err,resultat){

                         if(resultat[0]>0){
                             clearInterval(intervale);

                         }else{
                             //send socket Ostie
                            var msg = {};
                            msg.message = 'Veulliez vous rendre chez OSTIE immediatement!';
                            sails.sockets.blast("ost"+id_pers, msg);
                            ////console.log("blast successOPCall");

                         ////console.log("count ostie task "+resultat[0]);


                         }

                     });
                 }

            }, 10000);

         return res.ok("envoyer!");
            ////console.log(sails.hooks.cron.jobs.relanceSocketOstie.start());


    },
  managmentUpdateSocket: function (req, res) {
    var math = require('mathjs');
    var retval = [];
    var dossier =req.param('dossier',null);
    var matricule =req.param('matricule',null);
    var matrSql = "";
    if(matricule!=null && matricule!= 'undefined' && matricule!= ''){
      matrSql = "AND r_personnel.id_pers="+matricule;
    }
    var dateess = new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);
    var datedeb =req.param('datedeb',dateess).replace('/','').replace('/','').substr(0,8);
    var datefin =req.param('datefin',dateess).replace('/','').replace('/','').substr(0,8);
    retval['display'] = "hidden";
    retval['dossier'] = null;

    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    req.session.mat = matricule;
    req.session.dossier = dossier;
    req.session.datedeb = datedeb;
    req.session.datefin = datefin;
    if(dossier!=null && dossier!= 'undefined' && dossier!= ''){
      retval['display'] = "";
      var sql = "SELECT * from p_dossier where id_dossier="+dossier;
      Ldt.query(sql,function(err,result){
        if (err){
          console.log(err);
          return;
        }else{
          //console.log(result);
          retval['dossier'] = result.rows[0];
          retval['etapes'] = [];
          Ldt.query('select id_lien, p_etape.libelle, p_lien_oper_dossier.vitesse from p_lien_oper_dossier LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape WHERE id_dossier = '+dossier+' order by id_lien', function(eror, test)
          {

            if (eror)
            {
              //console.log('erreur 2018');
              return res.send('erreur 2018');
            }else{
              ////console.log( test.length() );
              // return res.send(test);

              retval['etapes'] = test.rows;
              //console.log(retval);
              //return res.ok(retval);
              req.session.mat = matricule;
              req.session.dossier = dossier;
              req.session.datedeb = datedeb;
              req.session.datefin = datefin;

              var sql = "SELECT p_ldt.id_pers, SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree, sum(to_number('0'||quantite,'99999')) as qte,"
                +" p_dossier.num_dossier as num, p_etape.libelle, p_type_ldt.libelle as lib"
                +" from p_ldt"
                +" LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier"
                +" LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient"
                +" LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien"
                +" LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape"
                +" LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat"
                +" LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt"
                +" LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers"
                +" where 1=1 AND p_ldt.id_dossier = "+dossier+" AND date_deb_ldt='"+datedeb+"'  "+matrSql+" "
                +"group by p_ldt.id_pers, p_dossier.num_dossier, p_type_ldt.libelle, p_etape.libelle order by  p_ldt.id_pers, p_dossier.num_dossier, p_etape.libelle, p_type_ldt.libelle "

              Ldt.query(sql, function(er, vop) {
                if (er)
                {
                  //console.log('erreur vop');
                  return res.send('erreur vop');
                }else{
                  retval['vop'] = vop.rows;
                  var sql2 = "select sum(to_number('0'||quantite,'99999')) as qte,SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree from p_ldt where id_dossier="+dossier
                  //console.log(vop.rows);
                  Ldt.query(sql, function(er01, dos) {
                    if (er01)
                    {
                      //console.log('erreur dossier');
                      return res.send('erreur dossier');
                    }else{
                      menu["aceuil"]= "";
                      menu["dossierAdmin"]= "selected";
                      menu["gestionDossier"]= "";
                      menu["statOpAdmin"]= "";
                      menu["presence"]= "";
                      menu["admin"]= "";
                      retval['menu'] = menu;
                      retval['doss'] = dos.rows[0];
                      retval['menu'] = menu;
                      var options = [];
                      options.dossier = dossier;
                      options.dateDebut = datedeb;
                      options.dateFin = datefin;


                      async.series([
                          function(callback){
                            options.type = 2;
                            PointageService.getNbDossierParType(options, callback);
                          },
                          function(callback){
                            options.type = 1;
                            PointageService.getNbDossierParType(options, callback);
                          },
                          function(callback){
                            options.type = 0;
                            PointageService.getNbDossierParType(options, callback);
                          },
                          function(callback){
                            PointageService.getQQParDossier(options, callback);
                          }
                        ],
                        function(err, results){
                          if(err) return res.badRequest("Problème avec la récupération des données dans la base");

                          //traitement des donnees
                          var dossierTermine = results[0];
                          var dossierEnCours = results[1];
                          var dossierLibre = results[2];
                          var qualiteQuantite = results[3];

                          retval['dossierTermine'] = dossierTermine;
                          retval['dossierEnCours'] = dossierEnCours;
                          retval['dossierLibre'] = dossierLibre;
                          retval['qualiteQuantite'] = qualiteQuantite;
                          retval['math'] = math;
                          //console.log("resultT===========>"+results[0]);
                          //console.log("resultEC===========>"+results[1]);
                          //console.log("resultL===========>"+results[2]);
                          //console.log("resultQQ===========>"+results[3]);
                          //console.log("resultTout===========>"+results);

                          sails.sockets.blast(""+dossier+datefin+"man", {vop : vop.rows, dossier : result.rows[0],etapes : test.rows });
                          return res.json({vop : vop.rows, dossier : result.rows[0],etapes : test.rows });
                        });



                      //console.log(matrSql);
                    }
                  });
                }
              });

            }
          });
        }
      });

    }else{
      menu["aceuil"]= "";
      menu["dossierAdmin"]= "selected";
      menu["gestionDossier"]= "";
      menu["statOpAdmin"]= "";
      menu["presence"]= "";
      menu["admin"]= "";
      retval['menu'] = menu;
      retval['dossierTermine'] = 0;
      retval['dossierEnCours'] = 0;
      retval['dossierLibre'] = 0;
      retval['qualiteQuantite'] = [];

      req.session.mat = matricule;
      req.session.dossier = dossier;
      req.session.datedeb = datedeb;
      Photo.find({id_pers : req.session.user}, function(err, resultat){
        if(err || resultat[0] == undefined) return err;

        var imageToShow = ImageService.toBase64String(resultat[0].photo);
        retval['image'] = imageToShow;

        return res.json(retval);
      });
    }
    },

  testLdap: function (req, res) {
    var id = req.params.all();
    //console.log(id);
    var ldap = require('ldapjs');
    var client = ldap.createClient({
      url: 'ldap://10.128.1.21:389'
    });
    //ldap.Attribute.settings.guid_format = ldap.GUID_FORMAT_X;

    var listeUser = [];
    var opts = {
      filter: '(sn=*)',
      scope: 'sub'
    };
    client.bind('EASYTECH\\8029', 'Free*10071992', function(err) {
      if(err){
        //console.log("Ldap Err:"+err)
      }else {
        // console.log("tafa");// c'est pour tester la connection LDap server
      }

      //return res.send("haha")
    });

  },


};

