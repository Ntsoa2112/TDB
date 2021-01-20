/**
 * Created by 8037 on 04/11/2016.
 */
module.exports = {
GetAll_Departement:function(callback) {
  // var Query = "select * from ac_moyenne join ac_pole on ac_moyenne.id_pole=ac_pole.id_pole";
  var query ="SELECT * FROM r_departement" ;
  //console.log('Departement checked' );
  ReservationSalle.query(query,
    function (err, retour) {
      if (err) return callback(err);
      return callback(null, retour.rows);
    });
  },
  GetAll_Matricule:function(callback) {
    // var Query = "select * from ac_moyenne join ac_pole on ac_moyenne.id_pole=ac_pole.id_pole";
    var query ="SELECT * FROM r_personnel ORDER BY id_pers ASC" ;
   //console.log('table R_personnel checked' );
    ReservationSalle.query(query,
      function (err, retour) {
        if (err) return callback(err);
        return callback(null, retour.rows);
      });
  },
  Get_allP_attente:function(callback) {
    // var Query = "select * from ac_moyenne join ac_pole on ac_moyenne.id_pole=ac_pole.id_pole";
    var query ="SELECT * FROM r_reservation_ostie join r_personnel on r_reservation_ostie.id_pers=r_personnel.id_pers ORDER BY r_reservation_ostie.id_reservation_ostie ASC" ;
//    //console.log('table R_personnel checked' );
    ReservationOstie.query(query,
      function (err, retour) {
        if (err) return callback(err);
        return callback(null, retour.rows);
      });
  },

  fonctionEnvoyerMail: function (userMail, objet, message,nom, next) {
    //console.log("============================================== SEND EMAIL WITH NODE MAILER SMTP");


    var nodemailer = require('nodemailer');
    var smtpTransport = require('nodemailer-smtp-transport');

    var lstIdPersonne =[];
    var lstMailPersonne =[];

    //______Transporter____
    //console.log(" ******************************** creation transporter");
    var transporter = nodemailer.createTransport(smtpTransport({
      host: '10.128.1.3',  //smtp.office365.com
      port: '25',
      auth: { user: 'erica@et.in', pass: 'erica' },
      secureConnection: false
    }));
    //console.log(" fin creation transporter **********************************");

    async.each('null', function(personne, callback){
      lstIdPersonne.push(personne.id_pers);
      var queryGetMailPersonne = "select id_pers from r_personnel where id_pers = 8037";
      //console.log(" ===================== ===> " +queryGetMailPersonne);
      User.query(queryGetMailPersonne, function(err, mailPersonne){
        if (err)
        {
          //console.log('errr ====> get id ronny r peronnel'+err);
        }
        ////console.log("mail personne ===> "+mailPersonne.rows[0].email);
        if(mailPersonne.rows[0].email != null){
          lstMailPersonne.push(mailPersonne.rows[0].email);
        }
        callback(null);
      });
    },function(err){
      //Envoyer mail

      transporter.sendMail({ // envoie de l'email
        from: "Easytech <"+userMail+">", //sender
        //to: 'all@et.in', //receiver
        to:'all@et.in',
        /*from: "mirah@et.in", //sender
         from: 'erica@et.in',*/
        subject: objet+'.',  //l'application [nom_app] du dossier [nom_dossier] a été [validé/rejeté]
        html: '<font face="Calibri"><p>Bonjour, </p></br></br>'+message+'</p></br></br><p>Cordialement.</p></br> '+nom+' </font>',
        text: message,
        alternatives: [{
          contentType: "text/calendar",
          content: '12-1 pause'
        }]

      },function(error, response) {
        if (error)
        {
          //console.log(error);
        }
        //console.log('Message envoyé'+JSON.stringify(response));
        return next(null);
      });
      //FIN ENVOIE EMAIL
      //console.log('=========>'+userMail+'Objet======>'+objet+'message========>'+message);

    });
  },
  Getid_Reservationsearch:function(option,callback) {
    var specialite= option.specialite;
    var query="SELECT * FROM ac_moyenne JOIN ac_pole ON ac_moyenne.id_pole=ac_pole.id_pole WHERE ac_moyenne.id_pole=" +specialite+ " AND ac_moyenne.date >= '" +datedepart+ "' AND ac_moyenne.date <=  '"+datefin+"'ORDER BY date ASC";
    //console.log('valeur specialite=' + specialite);
    //console.log('valeur date=' + datedepart);
    //console.log('valeur datefin='+datefin);
    if(specialite==0)
    {
      query="SELECT * FROM ac_moyenne JOIN ac_pole ON ac_moyenne.id_pole=ac_pole.id_pole WHERE ac_moyenne.date >= '" +datedepart+ "' AND ac_moyenne.date <=  '"+datefin+"'ORDER BY date ASC";
    }
    moyenne.query(query,
      function (err, retour) {
        if (err){
          return callback(err);
        }else {
          //console.log(retour);
          return callback(null, retour.rows);
        }
      }
    );
  }

};
