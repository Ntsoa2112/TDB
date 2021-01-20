const CQAlmerys = require("../models/CQAlmerys");
const moment = require('moment');
const DateService = require("./DateService");

module.exports = {

    recupererControleByJour : function(options, callback) {
        CQAlmerys.recupererControleByJour(options, 
            (err, controle) => {
                if(err) return callback(err);

                if(controle.length === 0) {
                    CQAlmerys.insererControleByJour(options,
                        ((err, idSuivi)=> {
                            
                            if(err) return callback(err);
                            let createdLine =  {
                                    id_suivi_by_jour : idSuivi[0].id_suivi_by_jour,
                                    id_specialite: options.idSpecialite,
                                    id_s_specialite: options.idSSpecialite,
                                    id_s_s_specialite: options.idSSSpecialite,
                                    aucun_controle: null,
                                    lundi: null,
                                    mardi: null,
                                    mercredi: null,
                                    jeudi: null,
                                    vendredi: null,
                                    samedi: null 
                            };

                            callback(null, createdLine);

                        })
                    );
                } else {
                    callback(null, controle[0]);
                }
                
            }
        );  
    },


    updateControleByJour : function(options, callback) {
        CQAlmerys.updateControleByJour(options,
            (err) => {
                if(err) return callback(err);
                callback();
            }
        );
    },


    recupererControleByDate : function(options, callback) {
        let now = DateService.getDateNow();
        options.now = now;
        CQAlmerys.recupererControleByDate(options,
            (err, results) => {
                if(err) return callback(err);
                callback(null, results);
            }   
        );
    },

    insererControleByDate : function(options,callback) {
        CQAlmerys.insererControleByDate(options,
            (err) => {
                if (err) {
                    console.log(err);
                    return callback(err);
                }
                callback();
            }  
        );
    },

    recupererControleBySpecificDate : function(options, callback) {
        CQAlmerys.recupererControleBySpecificDate(options,
            (err, results) =>  {
                if (err) {
                    console.log(err);
                    return callback(err);
                }
                callback(null, results);
            }
        );
    },


    insererControleBetweenTwoDates : function(options, callback) {
        let debut = new Date(options.dateDebut);
        let fin = new Date(options.dateFin);

        let dates = this.getDates(debut,fin);

        async.series( 
            dates.map(
            (current) => {
                options.date = current;
                let asyncFunc = (asyncCallback) => {
                    this.insererDateIfNotExists(options, 
                        (err) => {
                            if (err) {
                                console.log(err);
                                return asyncCallback(err);
                              }
                            
                            asyncCallback();
                        }
                    );
                }

                return asyncFunc;
            }
            ),

            (err) => {
                if(err) return callback(err);
                callback();
            }
        );
    },

    insererDateIfNotExists : function(options, callback) {
        options.dateDebut = options.date;
        options.dateFin = options.date;

        this.recupererControleBySpecificDate(options,
            (err, res) => {
                 if (err) {
                    console.log(err);
                    return callback(err);
                  };

                if(res.length === 0) {
                    CQAlmerys.insererControleByDate(options,
                        (erreur) => {
                            if (erreur) {
                                console.log(erreur);
                                return callback(erreur);
                              }
                            callback();
                        }
                    );
                } else {
                    callback();
                }
            }
        );
    },

    getDates : function(startDate, endDate) {
        var dates = [],
        currentDate = startDate,

        addDays = function(days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        };

        while (currentDate <= endDate) {
          dates.push(currentDate);
          currentDate = addDays.call(currentDate, 1);
        }

        return dates;
    },

    deleteSpecifiDate: function(options, callback) {
        CQAlmerys.deleteSpecificDate(options,
            (err) => {
                if (err) {
                    console.log(err);
                    return callback(err);
                }

                callback();
            }    
        );
    },

    /**
     * Récupère les controles (par jour et par date du jour specifié pour la specialité specifiée)
     */
    recupererAllControlForADay : function(options, callback) {
        let createdLine =  {
            id_suivi_by_jour : null,
            id_specialite: options.idSpecialite,
            id_s_specialite: options.idSSpecialite,
            id_s_s_specialite: options.idSSSpecialite,
            aucun_controle: null,
            lundi: null,
            mardi: null,
            mercredi: null,
            jeudi: null,
            vendredi: null,
            samedi: null,
            controle_by_date : null
        };

        CQAlmerys.recupererControleByJour(options, 
            (err, controleByJour) => {
                if (err) {
                    console.log(err);
                    return callback(err);
                }
               
                createdLine.id_suivi_by_jour = controleByJour.id_suivi_by_jour;
                createdLine.lundi = controleByJour.lundi;
                createdLine.mardi = controleByJour.mardi;
                createdLine.mercredi = controleByJour.mercredi;
                createdLine.jeudi = controleByJour.jeudi;
                createdLine.vendredi = controleByJour.vendredi;
                createdLine.samedi = controleByJour.samedi;
                createdLine.aucun_controle = controleByJour.aucun_controle;

                this.recupererControleBySpecificDate(options,
                    (err, controlByDate) => {
                        if (err) {
                            console.log(err);
                            return callback(err);
                        }

                        if(controlByDate.length === 0) {
                            createdLine.controle_by_date = false;
                        } else {
                            createdLine.controle_by_date = true;
                        }

                        callback(null, createdLine);

                    }    
                );

            }    
        );
    }
};