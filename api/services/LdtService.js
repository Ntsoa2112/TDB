module.exports = {


  getRepartitionParDate : function(option,callback){
    //
        Ldt.repartitionParDate(option, function(err, dossier){
            if(err) return callback(err);
            return callback(null, dossier);
        });
    },

  //return  ldt avec
  getLdtParEtape : function(option,callback){
    //
    Ldt.etapeLdtParDate(option, function(err, etape){
      if(err) return callback(err);
      return callback(null, etape);
    });
  },
  getListeConnected : function(option,callback){
    //
    Ldt.listeConnected(option, function(err, etape){
      if(err) return callback(err);
      return callback(null, etape);
    });
  },

  getHeureLdt : function(option,callback){
    //
    Ldt.heureLdt(option, function(err, etape){
      if(err) return callback(err);
      return callback(null, etape);
    });
  },
getJourLdt : function(option,callback){
    //
    Ldt.JourLdt(option, function(err, etape){
      if(err) return callback(err);
      return callback(null, etape);
    });
  },

  getHeureLdtAll : function(option,callback){
    //
    for (var i = 0; i<option.data.length;i++){

    }
    Ldt.heureLdt(option, function(err, etape){
      if(err) return callback(err);
      return callback(null, etape);
    });
  },

  //retourne les donnees des suivisOp avec filtre(TOUS/NON CONNECTEE/CONNECTER/)
  getHeureFiltreLdt: function(option, callback) {
    var dataLdt = "";
    var type = option.types;
    dataLdt = option.data;
    var dataLdtSplit = dataLdt.split(":");
    var donnee = [];
    var compteur = 0;
    for (var i=0;i<dataLdtSplit.length-1;i++){

      var itemDataSplit = dataLdtSplit[i].split("?");
      if(type==5){//type non connecter
        if(itemDataSplit[1]=="Non connectée GPAO"){
          donnee[compteur]=[];
          donnee[compteur].id_util = itemDataSplit[0];
          donnee[compteur].appelation = itemDataSplit[1];
          donnee[compteur].dureeHprod = itemDataSplit[4];
          donnee[compteur].duree = itemDataSplit[2];
          donnee[compteur].typeClasse = itemDataSplit[5];
          donnee[compteur].nom = itemDataSplit[6];

          compteur ++;
        }
      }else if(type==4){
        //sinon
        if(itemDataSplit[1]!="Non connectée GPAO" && parseInt(itemDataSplit[5])!=1){
          donnee[compteur]=[];
          donnee[compteur].id_util = itemDataSplit[0];
          donnee[compteur].appelation = itemDataSplit[1];
          donnee[compteur].dureeHprod = parseFloat(itemDataSplit[4])*3600;
          donnee[compteur].duree = parseFloat(itemDataSplit[2])*3600;
          donnee[compteur].typeClasse = parseInt(itemDataSplit[5]);
          donnee[compteur].nom = itemDataSplit[6];
          compteur ++;
        }
      }else if(type==2){
        if(itemDataSplit[1]!="Non connectée GPAO" && parseInt(itemDataSplit[5])!=1){
          var prod =(parseFloat(itemDataSplit[2])) - (parseFloat(itemDataSplit[4]));
          if(parseFloat(itemDataSplit[2])<8 &&  parseInt(itemDataSplit[5])==0){
            donnee[compteur]=[];
            donnee[compteur].id_util = itemDataSplit[0];
            donnee[compteur].appelation = itemDataSplit[1];
            donnee[compteur].dureeHprod = parseFloat(itemDataSplit[4])*3600;
            donnee[compteur].duree = parseFloat(itemDataSplit[2])*3600;
            donnee[compteur].typeClasse = parseInt(itemDataSplit[5]);
          donnee[compteur].nom = itemDataSplit[6];
            compteur ++;
          }

        }
      }else if(type==3){
        var hprod =parseFloat(itemDataSplit[4]);
        if(hprod>1){
          donnee[compteur]=[];
          donnee[compteur].id_util = itemDataSplit[0];
          donnee[compteur].appelation = itemDataSplit[1];
          donnee[compteur].dureeHprod = parseFloat(itemDataSplit[4])*3600;
          donnee[compteur].duree = parseFloat(itemDataSplit[2])*3600;
          donnee[compteur].typeClasse = parseInt(itemDataSplit[2]);
          donnee[compteur].nom = itemDataSplit[6];
          compteur ++;
        }
      }else if(type==6){
        var test =parseInt(itemDataSplit[5]);
        if(test==1 && itemDataSplit[1]!="Non connectée GPAO"){
          donnee[compteur]=[];
          donnee[compteur].id_util = itemDataSplit[0];
          donnee[compteur].appelation = itemDataSplit[1];
          donnee[compteur].dureeHprod = parseFloat(itemDataSplit[4])*3600;
          donnee[compteur].duree = parseFloat(itemDataSplit[2])*3600;
          donnee[compteur].typeClasse = parseInt(itemDataSplit[5]);
          donnee[compteur].nom = itemDataSplit[6];
          compteur ++;
        }
      }else{
        donnee[compteur]=[];
        donnee[compteur].id_util = itemDataSplit[0];
        donnee[compteur].appelation = itemDataSplit[1];
        donnee[compteur].dureeHprod = parseFloat(itemDataSplit[4])*3600;
        donnee[compteur].duree = parseFloat(itemDataSplit[2])*3600;
        donnee[compteur].typeClasse = parseInt(itemDataSplit[5]);
          donnee[compteur].nom = itemDataSplit[6];
        compteur ++;
      }


    }


    return callback(null, donnee);
  },


  getQte : function(option,callback){

    /*async.series([
      function (callback) {
        Ldt.heureLdt(option, function(err, qte){
          if(err)  return callback(err);
          sails.socket.blast("");
        });
      },function (callback) {
        Ldt.heureLdt(option, function(err, qte){
          if(err)  callback(err);
          return callback(null, etape);
        });
      },function (callback) {
        Ldt.heureLdt(option, function(err, qte){
          if(err)  callback(err);
          return callback(null, etape);
        });
      },function (callback) {
        Ldt.heureLdt(option, function(err, qte){
          if(err)  callback(err);
          return callback(null, etape);
        });
      },function (callback) {
        Ldt.heureLdt(option, function(err, qte){
          if(err)  callback(err);
          return callback(null, etape);
        });
      },function (callback) {
        Ldt.heureLdt(option, function(err, qte){
          if(err)  callback(err);
          return callback(null, etape);
        });
      },
    ])*/


  },

  // recuperation des lignes des temps par date/idpers/type
  /*
  * Entree
  * Date debut string
  * Date Fin string
  * Id_pers ou non
  * type ou non
  *
  * */
  getReporting : function (option , next) {
      //
  }





}
