const CQAlmerys = require("../models/CQAlmerys");
const Ldt = require("../models/Ldt");

module.exports = {

    getPrevision : function(options, callback) {
        CQAlmerys.getPrevision(options,
            (err, results) => {
                if(err) return callback(err);

                let splitDate = options.dateDebut.split('-');
                options.dateDebut = splitDate[0] + '' + splitDate[1] + '' + splitDate[2];
                splitDate = options.dateFin.split('-');
                options.dateFin = splitDate[0] + '' + splitDate[1] + '' + splitDate[2];

                Ldt.getDetailsSpecialite(options, 
                    (errDetails, listeDetails) => {
                        if(errDetails) return callback(errDetails);
                        let newArray = results.map(
                            (currentSpec) => {
                                currentSpec.date = '';
                                currentSpec.duree = 0;
                                currentSpec.quantite = 0;
                                currentSpec.vitesse_reelle = 0;
                                listeDetails.forEach(currentDetails => {
                                    if(currentSpec.specialite === currentDetails.specialite && currentSpec.sspecialite === currentDetails.sous_specialite && currentSpec.ssspecialite === currentDetails.sous_sous_specialite) {
                                        currentSpec.date = currentDetails.debut;
                                        currentSpec.duree = this.round(parseInt(currentDetails.sum_duree)/3600, 2);
                                        currentSpec.quantite = parseInt(currentDetails.sum_qte);
                                        currentSpec.vitesse_reelle = (currentSpec.duree !== 0) ? this.round(currentSpec.quantite/currentSpec.duree, 2) : 0;
                                    }
                                });

                                return currentSpec;
                            }
                        );
                        callback(null, newArray);
                    }     
                );
                
            }    
        );
    },
    
    round : function(number, decimalPlaces) {
        const factorOfTen = Math.pow(10, decimalPlaces)
        return Math.round(number * factorOfTen) / factorOfTen;
    },

    updatePrevision : function(options, callback) {
        CQAlmerys.updatePrevision(options,
            (err) => {
                if(err) return callback(err)
                callback();
            }    
        );
    }

};