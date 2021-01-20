/**
 * Created by 8029 on 22/09/2016.
 */

module.exports = {
  CronManagementByDossier: function (callback) {
      var sql = "SELECT * from p_dossier where";
      var dateess = new Date().toISOString().replace(/-/,'/').replace(/-/,'/').substr(0,10);
      var datedeb =req.param('datedeb',dateess).replace('/','').replace('/','').substr(0,8);
      Ldt.query(sql, function (err, result) {
        if (err) {
          console.log(err);
          return;
        } else {
          //console.log(result);

          for(var i = 0;i<result.rows.length;i++){
            Ldt.query('select id_lien, p_etape.libelle, p_lien_oper_dossier.vitesse from p_lien_oper_dossier LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape WHERE id_dossier = ' + result.rows[i].id_dossier + ' order by id_lien', function (eror, test) {

              if (eror) {
                //console.log('erreur 2018');
                return res.send('erreur 2018');
              } else {
                ////console.log( test.length() );

                // return res.send(test);

                //return res.ok(retval);

                var sql = "SELECT p_ldt.id_pers, SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree, sum(to_number('0'||quantite,'99999')) as qte,"
                  + " p_dossier.num_dossier as num, p_etape.libelle, p_type_ldt.libelle as lib"
                  + " from p_ldt"
                  + " LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier"
                  + " LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient"
                  + " LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien"
                  + " LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape"
                  + " LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat"
                  + " LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt"
                  + " LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers"
                  + " where 1=1 AND p_ldt.id_dossier = " + result.rows[i].id_dossier  + " AND date_deb_ldt='" + datedeb + "'  "
                  + "group by p_ldt.id_pers, p_dossier.num_dossier, p_type_ldt.libelle, p_etape.libelle order by  p_ldt.id_pers, p_dossier.num_dossier, p_etape.libelle, p_type_ldt.libelle "

                Ldt.query(sql, function (er, vop) {
                  if (er) {
                    //console.log('erreur vop');
                    return res.send('erreur vop');
                  } else {
                    //envoi des socket

                    sails.sockets.blast(""+result.rows[i].id_dossier+datedeb+"man", {vop : vop.rows, dossier : result.rows[i],etapes : test.rows });
                    //sails.sockets.blast("a", {vop : vop.rows, dossier : result.rows[i],etapes : test.rows });
                  }
                });
              }
            });
          }

        }
      });
    return null;

  },
  getLdtWithTypeLDT: function (id_pers,callback) {
    var query= "    select p_ldt.id_type_ldt,p_type_ldt.libelle,p_type_ldt.productif,p_dossier.num_dossier,p_ldt.id_etape," +
      " p_etape.libelle as etape_libelle from p_ldt " +
      " JOIN p_dossier ON p_dossier.id_dossier=p_ldt.id_dossier " +
      " JOIN p_type_ldt ON p_type_ldt.id_type_ldt=p_ldt.id_type_ldt " +
      " JOIN p_lien_oper_dossier on p_lien_oper_dossier.id_lien=p_ldt.id_etape "+

   " JOIN p_etape ON p_etape.id_etape=p_lien_oper_dossier.id_oper "+
      " where p_ldt.id_etat=1 and p_ldt.id_pers="+id_pers+" ";
  //  console.log("Request "+query);
    Ldt.query(query, function(er, returnedData) {
      if(er)
      {
        console.log(er);
        return er;
      }
      return callback(null,returnedData.rows);
    });
  },
  getifHasCongeNow: function(id_pers,callback) {
   var query= "select * from r_conge where id_pers="+id_pers+" AND now()::date BETWEEN to_date(date_debut,'DD/MM/YYYY') " +
     " AND to_date(date_fin,'DD/MM/YYYY') ";
    ModelEASYGPAO.query(query, function(er, returnedData) {
      if(er)
      {
        console.log(er);
        return er;
      }
      var retour="";
      if(returnedData.rows.length > 0)
      {
          retour="Congee ";
          if(returnedData.rows[0].heure_debut=='AM')
          {
               retour+="Matin";
          }
          if(returnedData.rows[0].heure_fin=='PM')
          {
            retour+="Apres-Midi";
          }
      }
	//  console.log(retour);
      return callback(null,retour);
    });
  },
  // GESTION CHAT GPAO
  /*** INSERTION CONVERTATION
   *
   * @param req
   * @param res
   * @constructor
   */
  Insert_chat : function (options,next){
    var allparams = options;
    var nom_convertation = allparams.nom_conversation;
    var guid_conversation = allparams.guid_conversation;
    var dateNow = allparams.date;
    var heureNow = allparams.heure;
    var arrayStringParticipants = allparams.participants.split("|");
    // INSERTION CONVERTATION
    async.series([
      function(callback)
      {
        var sql_convertation = "INSERT INTO Conversation (last_message_date, nom_conversation, last_message_hour, guid_conversation) " +
          " VALUES ('"+dateNow + "', '" + nom_convertation + "', '" + heureNow + "', '" + guid_conversation + "') RETURNING id_conversation";
        console.log("New convertation "+sql_convertation);

        ChatGPAO.query(sql_convertation, function (err, res) {
          if (err)
            return callback(err);
          return callback(null, res.rows);
        });
      }
    ],function(err,resultInsert){
      if(err)
      {
        console.log(err);
        return next("OK");
      }else
      {
        var conversation_id = guid_conversation;

        var i = 0;
        async.forEachSeries(arrayStringParticipants, function(participant, callback_date_suivant) {
          async.series([
            function(callback){
              var isnewSender = "false";
              if(i == 0)
              {
                isnewSender = "true";
                i = i+1;
              }
              var sql = "INSERT INTO Participant (guid_conversation, id_pers,sent) VALUES('" + conversation_id + "', " + participant + ","+isnewSender+")";
              ChatGPAO.query(sql, function (err, res) {
                if (err)
                  return callback(err);
                return callback(null, res.rows);
              });
            },
          ],function(err,reponseParallel)
          {
            if(err) return next(err);
            callback_date_suivant();
          });
        }, function(error)
        {
          return next(null,"Ajout terminée");
        });
      }
    });
  },
  /** FONCTIONNALITE AJOUT MESSAGE
   *
   * @param options
   * @param next
   * @constructor
   */
  Insert_Message : function (options,next){
    var allparams = options;
    var sender = allparams.sender;
    var guid_conversation = allparams.guid_conversation;
    var dateNow = allparams.date;
    var heureNow = allparams.heure;
    var contenu = allparams.contenu;
    var guid_message = allparams.guid_message;

    var today = new Date;
    var jour = (parseInt(today.getDate()) < 10 ) ? "0" + today.getDate() : today.getDate();
    var month = ((parseInt(today.getMonth()) + 1) < 10 ) ? "0" + (parseInt(today.getMonth()) + 1) : (parseInt(today.getMonth()) + 1);
    var heureZero = (parseInt(today.getHours()) < 10 ) ? "0" + today.getHours() : today.getHours();
    var minuteZero = (parseInt(today.getMinutes()) < 10 ) ? "0" + today.getMinutes() : today.getMinutes();

    var date = today.getFullYear() + "" + month + "" + jour; 
    var heure = heureZero + ":" + minuteZero;  
    console.log(date + " " + heure + " " + today.getMonth());

    // INSERTION CONVERTATION
    async.parallel([
      function(callback)
      {
        var sql_convertation = "INSERT INTO Message (guid_conversation, id_sender, contenu, date_envoi, heure_envoi ,guid_message) VALUES" +
          "('" + guid_conversation + "', '" + sender + "', '" + contenu + "', '" + date + "', '" + heure + "', " +
          "'"+ guid_message +"')";
        ChatGPAO.query(sql_convertation, function (err, res) {
          if (err)
            return callback(err);
          return callback(null, res.rows);
        });
      },
      function (callback) {
        var update_convertation = "UPDATE Conversation  set last_message_date = '" + dateNow + "'," +
          " last_message_hour = '" + heureNow + "' WHERE guid_conversation = '" + guid_conversation + "'";
        ChatGPAO.query(update_convertation, function (err, res) {
          if (err)
            return callback(err);
          return callback(null, res.rows);
        });
      },
      function (callback) {
        var select_participants = "SELECT * FROM Participant WHERE guid_conversation = '"+guid_conversation+"'";
        ChatGPAO.query(select_participants, function (err, res) {
          if (err)
            return callback(err);
          return callback(null, res.rows);
        });
      }
    ],function(err,resultInsert){
      if(err)
      {
        console.log(err);
        return next("OK");
      }else
      {
        async.forEachSeries(resultInsert[2], function(participant, callback_suivant) {
          async.series([
            function (callback) {
              var bool = "false";
              if(participant.id_pers == sender)
              {
                bool = "true";
              }
              var insertStatus = "INSERT INTO statut_message (guid_message,id_pers,sent) VALUES('"+guid_message+"',"+participant.id_pers+","+bool+")";
              ChatGPAO.query(insertStatus, function (err, res) {
                if (err)
                {
                  console.log(err);
                  return callback(err);
                }

                return callback(null, res.rows);
              });
            }
          ],function(erroner, valeurParticipant){
            callback_suivant();
          });
        },function(err)
        {
          if(err) next(err);
          return next(null,"Ajout terminée");
        })

      }
    });
  },
  /** FONCTIONNALITE AJOUT PARTICIPANTS
   *
   * @param options
   * @param next
   * @constructor
   */
  Insert_Participant : function (options,next){
    var allparams = options;
    var guid_conversation = allparams.guid_conversation;
    var arrayStringParticipants = allparams.participants.split("|");
    async.forEachSeries(arrayStringParticipants, function(participant, callback_date_suivant) {
      async.series([
        function(callback){
        if(participant == "")
        {
          participant = "null";
          return callback(null,"done");
        }
          var sql = "INSERT INTO Participant (guid_conversation, id_pers) VALUES ('" + guid_conversation + "', " + participant + ")";
          ChatGPAO.query(sql, function (err, res) {
            if (err)
              return callback(err);
            return callback(null, res.rows);
          });
        },
      ],function(err,reponseParallel)
      {
        if(err) return next(err);
        callback_date_suivant();
      });
    }, function(error)
    {
      return next(null,"Ajout terminée");
    });
  },
  /** FONCTIONNALITE SUPPRESSION PARTICIPANT
   *
   * @param options
   * @param next
   * @constructor
   */
  Delete_Participant : function (options,next){
    console
    var allparams = options;
    var guid_conversation = allparams.guid_conversation;
    var sender = allparams.sender;
    var arrayStringParticipants = allparams.participants.split("|");
    var idSuppression = "";

    async.forEachSeries(arrayStringParticipants, function(participant, callback_date_suivant) {

      async.series([
        function(callback){
          var sql = "INSERT INTO suppression_participant (guid_conversation,id_pers) VALUES ('" + guid_conversation + "'," + participant +") RETURNING id_supprimer";
          ChatGPAO.query(sql, function (err, res) {
            if (err)
              return callback(err);
            console.log(res.rows[0].id_supprimer);
            idSuppression = res.rows[0].id_supprimer;
            return callback(null, res.rows);
          });
        },
        function (callback) {
          var select_participants = "SELECT * FROM Participant WHERE guid_conversation = '"+guid_conversation+"'";
          ChatGPAO.query(select_participants, function (err, res) {
              if (err)
                return callback(err);
            //return callback(null, res.rows);

            async.forEachSeries(res.rows, function(participant, callback_suivant) {
              
              async.series([
                
                function (callback) {
                  var bool = "false";
                  if(participant.id_pers == sender)
                  {
                    bool = "true";
                  }
                  var insertStatus = "INSERT INTO statut_suppression (id_suppression,id_participant,sent) VALUES('"+idSuppression+"',"+participant.id_pers+","+bool+")";
                  console.log(insertStatus);
                  ChatGPAO.query(insertStatus, function (err, res) {
                    if (err)
                    {
                      console.log(err);
                      return callback(err);
                    }
    
                    return callback(null, res.rows);
                  });
                }
              ],function(erroner, valeurParticipant){
                callback_suivant();
              });// end of series

            },function(err)
            {
              if(err) callback(err);
             return callback(null,"Ajout terminée");
            });// end of forEachSeries

          });// end of query
        },

      ], function(err, result){

          if(err) next(err);

          async.series([
            function(callback){
              var sql = "DELETE FROM Participant  WHERE guid_conversation='" + guid_conversation + "' and id_pers=" + participant+"";
              ModelEASYGPAO.query(sql, function (err, res) {
                if (err)
                  return callback(err);
                return callback(null, res.rows);
              });
            },
                        
          ],function(err,responseParallel)
          {
            if(err) return next(err);
     
            callback_date_suivant();
          });

      });// end of series
     
    }, function(error)
    {
      return next(null,"Ajout terminée");
    });
  },
  Message_Recu : function (options,next){
    var allparams = options;
    var guid_message = allparams.guid_message;
    var participant = allparams.participant;
    async.series([
      function(callback){
        var sql = "UPDATE statut_message SET sent=true WHERE guid_message='" + guid_message + "' and id_pers=" + participant+"";
        ChatGPAO.query(sql, function (err, res) {
          if (err)
            return callback(err);
          return callback(null, res.rows);
        });
      },
    ],function(err,reponseParallel)
    {
      if(err) return next(err);
      return next(null,"Update terminer");
    });
  },

  Conversation_Recu : function (options,next){
    var allparams = options;
    var guid_conversation = allparams.guid_conversation;
    var participant = allparams.participant;
    async.series([
      function(callback){
        var sql = "UPDATE Participant SET sent=true WHERE guid_conversation='" + guid_conversation + "' and id_pers=" + participant+"";
        ChatGPAO.query(sql, function (err, res) {
          if (err)
            return callback(err);
          return callback(null, res.rows);
        });
      },
    ],function(err,reponseParallel)
    {
      if(err) return next(err);
      return next(null,"Update terminer");
    });
  },

  Suppression_Reussie : function (options,next){
    var allparams = options;
    var idSuppression = allparams.id_suppression;
    var participant = allparams.id_suppression;
    console.log(participant);
    async.series([
      function(callback){
        var sql = "UPDATE statut_suppression SET sent=true WHERE id_suppression='" + idSuppression + "' and id_participant=" + participant+"";
        ChatGPAO.query(sql, function (err, res) {
          if (err)
            return callback(err);
          return callback(null, res.rows);
        });
      },
    ],function(err,reponseParallel)
    {
      if(err) return next(err);
      return next(null,"Update terminer");
    });
  },

  getArrayParticipant : function (callback) {
    var arrayConv = [];
    var query = "SELECT * FROM Conversation ";
    async.series([
      function(callback)
      {
        ChatGPAO.query(query, function (err, res) {
          if (err)
            return callback(err);
          return callback(null, res.rows);
        });
      }
    ],function(err, conversation)
    {
      if(err) return callback(err);
      async.forEachSeries(conversation[0], function(conv, callback_date_suivant) {
        var ConvObj = {};
        ConvObj.guid_conversation = conv.guid_conversation;
        ConvObj.nom_conversation = conv.nom_conversation;
        ConvObj.date = conv.last_message_date;
        ConvObj.heure = conv.last_message_hour;
        // RECUPERATION PARTICIPANT CONVERTATION
        async.series([
          function(callback)
          {
            var sql_convertation = "SELECT guid_conversation,id_pers FROM Participant WHERE sent = FALSE AND guid_conversation='"+conv.guid_conversation+"'";
            ChatGPAO.query(sql_convertation, function (err, res) {
              if (err)
                return callback(err);
              return callback(null, res.rows);
            });
          },
          function(callback)
          {
            var sql_convertation = "SELECT id_pers FROM Participant WHERE guid_conversation='"+conv.guid_conversation+"'";
            ChatGPAO.query(sql_convertation, function (err, res) {
              if (err)
                return callback(err);
              return callback(null, res.rows);
            });
          }
        ],function(err,resultPartic){
          if(err)
          {
            console.log(err);
            return callback("OK");
          }else
          {
            var stringArray = [];
            var trueParticipant = [];

            async.forEachSeries(resultPartic[0], function(particip, callback_suivant) {
              stringArray.push(particip.id_pers);
              callback_suivant();
            },function(err)
            {
              ConvObj.participants = stringArray.join("|");
              arrayConv.push(ConvObj);
             // callback_date_suivant();
            });

            async.forEachSeries(resultPartic[1], function(particip, callback_suivant) {
              trueParticipant.push(particip.id_pers);
              callback_suivant();
            },function(err)
            {
              ConvObj.true_participants = trueParticipant.join("|");
              arrayConv.push(ConvObj);
              callback_date_suivant();
            });


          }
        });
      },function(err)
      {
        // FIN
        callback(null,arrayConv);
      });
    });
  },


  getArrayMessage: function (callback) {
    var arrayMessage = [];
    // INSERTION CONVERTATION
    async.series([
      function(callback)
      {
        var sql_convertation = "SELECT guid_message,id_pers FROM statut_message WHERE sent = FALSE";
        ChatGPAO.query(sql_convertation, function (err, res) {
          if (err)
            return callback(err);
          return callback(null, res.rows);
        });
      }
    ],function(err,resultInsert){
      if(err)
      {
        console.log(err);
        return callback("OK");
      }else
      {
        async.forEachSeries(resultInsert[0], function(mess, callback_date_suivant) {
          
          var MessageObj = {};
          async.parallel([
            function(callback)
            {
              var sql_MessIndex = "SELECT * FROM Message WHERE guid_message = '"+mess.guid_message+"'";
              ChatGPAO.query(sql_MessIndex, function (err, res) {
                if (err)
                  return callback(err);
                return callback(null, res.rows);
              });
            },
            function(callbacks)
            {
              var stringArray = [];
              var sql_MessIndex = "SELECT * FROM statut_message WHERE guid_message = '"+mess.guid_message+"' AND sent = false";
              
              ChatGPAO.query(sql_MessIndex, function (error, res) {
                if (error)
                  return callbacks(err);

                async.forEachSeries(res.rows, function(mess, callback_date_suivant) {
                  stringArray.push(mess.id_pers);
                  callback_date_suivant();
                },function(err)
                {
                  //console.log(stringArray.join("|"));
                  if(err) return callbacks(err);
                  if(stringArray.length ==0)
                  {
                    return callbacks(null, "");
                  }else
                  {
                    return callbacks(null, stringArray.join("|"));
                  }
                });
              });
            }
          ],function(err, message){
            if(err) return callback(err);
            if(message[0].length == 0)
            {

            }
            else
            {
              MessageObj.guid_conversation = message[0][0].guid_conversation;
              MessageObj.sender = message[0][0].id_sender;
              MessageObj.contenu = message[0][0].contenu;
              MessageObj.heure = message[0][0].heure_envoi;
              MessageObj.date = message[0][0].date_envoi;
              MessageObj.guid_message = mess.guid_message;
              MessageObj.participants = message[1];
              arrayMessage.push(MessageObj);
            }
            callback_date_suivant();
          });
        },function(err)
        {
          //DONE
          //console.log(arrayMessage);
          return callback(null,arrayMessage);
        });
      }
    });
  },

  getArraySupprimerEn: function (callback) {
    var arrayToSend = [];

    async.series([
      function(callback) {

        var sql_convertation = "SELECT DISTINCT id_suppression FROM statut_suppression WHERE sent = FALSE";

        ChatGPAO.query(sql_convertation, function (err, res) {

          if (err)
            return callback(err);
          return callback(null, res.rows);

        });

      }
    ],function(err, results){

        if(err){

          console.log(err);
          return callback("ok");

        }else {
          
            async.forEachSeries(results[0], function(ids, callbackNext){
              //console.log(ids.id_suppression);
              var jsonToSend = {};
              
              async.parallel(
              [

                function (callback){
                  
                  var sql_convertation = "SELECT guid_conversation, id_pers FROM suppression_participant WHERE id_supprimer=" + ids.id_suppression;
                  //console.log();

                  ChatGPAO.query(sql_convertation, function (err, res) {
          
                    if (err)
                      return callback(err);
                    return callback(null, res.rows);

          
                  });
                },

                function (callback){
                  var object = {};
                  var listeParticipants = [];
                  var sql_convertation = "SELECT id_participant FROM statut_suppression WHERE id_suppression='" + ids.id_suppression + "' and sent=FALSE";
                  //console.log();
                  
                  ChatGPAO.query(sql_convertation, function (err, res) {
                    
                    if (err) {
                      console.log(err);
                      return callback(err);
                    }
                    //return callback(null, res.rows);
                   // console.log(res.rows);
                    
                    async.forEachSeries(res.rows, function(result, callback_suivant){
                      //console.log(result);
                      listeParticipants.push(result.id_participant);
                      
                      callback_suivant();
                    }, function(err)
                    {
                      //console.log(listeParticipants.join("|"));
                      if(err) return callback(err);
                      if(listeParticipants.length ==0)
                      {
                        return callback(null, "");
                      }else
                      {
                        //console.log(listeParticipants);
                        object.id_suppression = ids.id_suppression;
                        object.liste_participants = listeParticipants.join("|");
                        return callback(null, object);
                      }
                    });

                  });
                },
                
              ], function(erreur, resultats){
                if(erreur) console.log(erreur);
                  //console.log(resultats[0][0]);
                  //console.log(resultats[1]);
                jsonToSend.guid_conversation = resultats[0][0].guid_conversation;
                jsonToSend.id_pers = resultats[0][0].id_pers;
                jsonToSend.participants = resultats[1].liste_participants;
                jsonToSend.id_suppression = resultats[1].id_suppression;
                //console.log(jsonToSend);
                arrayToSend.push(jsonToSend);
                //console.log(arrayToSend);
                callbackNext();
              });
              
            },function(err)
            {
              if(err) console.log(err);
              //DONE
              //console.log(arrayToSend);
              return callback(null,arrayToSend);
            });
            
        }

    });
    
  }

};
