module.exports = {
    Count : function(option, callback){
        Pointage.find({date : (new Date().toISOString()).replace(/-/,'/').replace(/-/,'/').substr(0,10)}, function(req, res){
            if(err) return callback(err);
            return callback(null, res.Count)
        });
    },

    getPresence : function(callback){
        Pointage.presence(null, function(err, presence){
            if(err) return callback(err);
            return callback(null, presence);
        });

    },

    getAllPersonne : function(callback){
        Personnel.count({actif : true}, function(err, countAll){
            if(err) return callback(err);
            return callback(null, countAll);
        });
    },

    getRetard : function(callback){
        Pointage.retard(null, function(err, retard){
            if(err) return callback(err);
            return callback(null, retard);
        });
    }
    ,
  getDepartement : function(callback){
    Pointage.departement(null, function(err, retard){
      if(err) return callback(err);
      return callback(null, retard);
    });
  }
  ,

 //nombre de personne dans le departement
//parametre idDepatement
  getNbPersParIdDep : function(option,callback){
    Pointage.departementById(option, function(err, retard){
      if(err) return callback(err);
      return callback(null, retard);
    });
  }
  ,

  //nbdossier par type de dossier
  getNbDossierParType : function(option,callback){
    Pointage.nbDossierByType(option, function(err, retard){
      if(err) return callback(err);
      return callback(null, retard);
    });
  }
  ,
  //qualite et quantité du dossier
  getQQParDossier : function(option,callback){
    Pointage.qualiteQuantiteByDossier(option, function(err, retard){
      if(err) return callback(err);
      return callback(null, retard);
    });
  }
  ,


  getRetardParIdDep : function(option,callback){
    //console.log("retard===================>"+option.datecible);
    Pointage.retardParIdDepartement(option, function(err, retard){
      if(err) return callback(err);
      return callback(null, retard);
    });
  }
  ,
  getDetailRetardParIdDep : function(option,callback){
    //console.log("retard===================>"+option.datecible);
    Pointage.retardDetailParIdDepartement(option, function(err, retard){
      if(err) return callback(err);
      return callback(null, retard);
    });
  }
  ,

    getRetardParDepartement : function(dateop,callback){
        Pointage.retardParDepartement(dateop, function(err, retard){
            if(err) return callback(err);
            return callback(null, retard);
        });
    },
    //liste conge par date
      getCongeParDate : function(dateop,callback){
        ModelEASYGPAO.listCongeParDate(dateop, function(err, retard){
        if(err) return callback(err);
        return callback(null, retard);
      });
}

}
