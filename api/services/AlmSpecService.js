const CQAlmerys = require("../models/CQAlmerys");
const AlmFrequSuiviService = require("./AlmFrequSuiviService");
const DateService = require("./DateService");


module.exports = {


    getSousSpecialite : function(idDossier, callback) {
        var option = {
            id_dossier : idDossier
        };

        CQAlmerys.listSousSpecialite(option, 
            (err, liste) => {
                if(err) return callback(err, null);
                return  callback(null, liste);
            }    
        );
    },


    getSSousSpecialite : function(idDossier, idLotClient, callback) {
        var option = {
            id_dossier : idDossier,
            id_loclient : idLotClient
        };

        CQAlmerys.listSSousSpecialite(option, 
            (err, liste) => {
                if(err) callback(err);
                callback(null, liste);
            }    
        );
    },


    getSSSousSpecialite : function(idSSousSpe, callback) {
        var option = {
            id : idSSousSpe,
        };

        CQAlmerys.listSSSousSpecialite(option, 
            (err, liste) => {
                if(err) return callback(err, null);
                return  callback(null, liste);
            }    
        );
    },


    generateSpecialiteTree : function(idDossier, callback) {
        let tree = {};
        let now = DateService.getDateNow().date;
        
        this.getSousSpecialite(idDossier, 

            (errSSpec, listeSousSpecialite) => {
                if(errSSpec) callback(errSSpec);
                if(listeSousSpecialite === null) listeSousSpecialite = [];
                
                async.series(

                    listeSousSpecialite.map (

                        (currentSousSpecialite) => {
                            tree[currentSousSpecialite.id_lotclient] = {
                                vitesse_equilibre : currentSousSpecialite.vitesse_equilibre
                            };
    
                            let currentFunc = (sSpecCall) => {
                                this.getSSousSpecialite( currentSousSpecialite.id_dossier, currentSousSpecialite.id_lotclient, 
                                    (errSSpec, listeSousSousSpecialite) => {
                                        if(errSSpec) return sSpecCall(errSSpec);
                                        
                                        if(listeSousSousSpecialite.length === 0) {
                                            let options = {
                                                idSpecialite : currentSousSpecialite.id_lotclient,
                                                idSSpecialite : null,
                                                idSSSpecialite : null,
                                                dateDebut : now,
                                                dateFin : now
                                            };

                                            AlmFrequSuiviService.recupererAllControlForADay(options, 
                                                (err, resultat) => {
                                                    if(err) return SSSSpecCall(err);

                                                    let superviser = this.aSuperviser(resultat);
                                                    console.log(superviser)
                                                    tree[currentSousSpecialite.id_lotclient] = {
                                                        vitesse_equilibre : currentSousSpecialite.vitesse_equilibre,
                                                        superviser : superviser
                                                    };

                                                    sSpecCall();
                                                }    
                                            );
                                        } else {
                                            async.series(
                                                listeSousSousSpecialite.map(
                                                    (internalArrayIndex) => {
                                                        tree[internalArrayIndex.id_lotclient][internalArrayIndex.id_ss_spe] = {
                                                            vitesse_equilibre : internalArrayIndex.vitesse_equilibre
                                                        };
                
                                                        let currentInternalFunc = (ssSpecCall) => {
                                                            this.getSSSousSpecialite(internalArrayIndex.id_ss_spe, 
                
                                                                (errSSSpec, listeSousSousSousSpecialite) => {
                                                                    if(errSSSpec) return ssSpecCall(errSSSpec);
                                                                    
                                                                    if(listeSousSousSousSpecialite.length === 0 ) { 
    
                                                                        let options = {
                                                                            idSpecialite : internalArrayIndex.id_lotclient,
                                                                            idSSpecialite : internalArrayIndex.id_ss_spe,
                                                                            idSSSpecialite : null,
                                                                            dateDebut : now,
                                                                            dateFin : now
                                                                        };
    
                                                                        AlmFrequSuiviService.recupererAllControlForADay(options, 
                                                                            (err, resultat) => {
                                                                                if(err) return SSSSpecCall(err);
    
                                                                                let superviser = this.aSuperviser(resultat);
                                                                                
                                                                                tree[internalArrayIndex.id_lotclient][internalArrayIndex.id_ss_spe] = {
                                                                                    vitesse_equilibre : internalArrayIndex.vitesse_equilibre,
                                                                                    superviser : superviser
                                                                                };
    
                                                                                ssSpecCall();
                                                                            }    
                                                                        );
    
                                                                    } else {
    
                                                                        async.series(
                                                                            listeSousSousSousSpecialite.map(
                                                                                (currentSSSSpeIndex) => {
        
                                                                                    let currentSSSSFunc = (SSSSpecCall) => {
                                                                                        
                                                                                        let options = {
                                                                                            idSpecialite : internalArrayIndex.id_lotclient,
                                                                                            idSSpecialite : internalArrayIndex.id_ss_spe,
                                                                                            idSSSpecialite : currentSSSSpeIndex.id,
                                                                                            dateDebut : now,
                                                                                            dateFin : now
                                                                                        };
        
        
                                                                                        AlmFrequSuiviService.recupererAllControlForADay(options, 
                                                                                            (err, resultat) => {
                                                                                                if(err) return SSSSpecCall(err);
        
                                                                                                let superviser = this.aSuperviser(resultat);
        
                                                                                                tree[internalArrayIndex.id_lotclient][internalArrayIndex.id_ss_spe][currentSSSSpeIndex.id] = {
                                                                                                    vitesse_equilibre : currentSSSSpeIndex.vitesse_equilibre,
                                                                                                    superviser : superviser
                                                                                                };
        
                                                                                                SSSSpecCall();
                                                                                            }    
                                                                                        );
        
                                                                                    };
        
                                                                                    return currentSSSSFunc;
                                                                                    
                                                                                }
                                                                            ),
        
                                                                            (SSSSpecErr) => {
                                                                                if(SSSSpecErr) return ssSpecCall(SSSSpecErr);
                                                                                ssSpecCall();
                                                                            }
                                                                        ); 
                                                                    }                                                            
                                                                }
                                                            );
                                                        }
    
                                                        return currentInternalFunc;
                                                    }
                                                ),
                                                (SSSpecErr) => {
                                                    if(SSSpecErr) return sSpecCall(SSSpecErr);
                                                    sSpecCall();
                                                }
                                            ); //=> fin du async interne
                                        }

                                    }
                                );
                            }
                                

                            return currentFunc;
                        }
                    ),
                    
                    (SSpecErr) => {
                        if(SSpecErr) return callback(SSpecErr);
                        callback(null, tree);
                    }

                ); //=> fin du async externe
            }
        );

    },

    buildRequestTable : function(callback) {
        let requestTable = [];
        this.generateSpecialiteTree(35,

            (err, tree) => {
                if(err) return callback(err);
                
                    for (const sKey in tree) {
                        if (tree.hasOwnProperty(sKey)) {
                            const sElement = tree[sKey];
                            if(sKey == '28159') {
                                console.log(sElement.superviser)
                                console.log(sElement)
                            }
                            if(Object.keys(sElement).length < 3 && sElement.superviser !== undefined) {
                                let objectToPush = {
                                    idSpecialite : sKey,
                                    idSSpecialite : null,
                                    idSSSpecialite : null,
                                    vitesseEquilibre : sElement.vitesse_equilibre,
                                    superviser : sElement.superviser
                                };

                                requestTable.push(objectToPush);

                            } else {
                                for (const ssKey in sElement) {
                                    if (sElement.hasOwnProperty(ssKey) && ssKey !== "vitesse_equilibre") {
                                        const ssElement = sElement[ssKey];
                                        if(sKey == '28159') {
                                            console.log(ssElement.superviser)
                                            console.log(ssElement)
                                        }
                                        if(Object.keys(ssElement).length < 3 && ssElement.superviser !== undefined) {
                                            let objectToPush = {
                                                idSpecialite : sKey,
                                                idSSpecialite : ssKey,
                                                idSSSpecialite : null,
                                                vitesseEquilibre : ssElement.vitesse_equilibre,
                                                superviser : ssElement.superviser
                                            };

                                            requestTable.push(objectToPush);
                                        } else {

                                            for (const sssKey in ssElement) {
                                                if (ssElement.hasOwnProperty(sssKey) && sssKey !== "vitesse_equilibre") {
                                                    const sssElement = ssElement [sssKey];
                                                    let vitesseEqu = (sssElement === null) ? null : sssElement.vitesse_equilibre;
                                                    let objectToPush = {
                                                        idSpecialite : sKey,
                                                        idSSpecialite : ssKey,
                                                        idSSSpecialite : sssKey,
                                                        vitesseEquilibre : vitesseEqu,
                                                        superviser : sssElement.superviser
                                                    };
        
                                                    requestTable.push(objectToPush);
                                                } 
                                            }

                                        }
                                    } 
                                }
                            }  
                        } 
                    }


                    callback(null , requestTable);
                    
            }

        );

    },

    insertTree : function(callback) {
        this.buildRequestTable(
            (err, table) => {
                if(err) return callback(err);
                 //console.log(table);               
                async.series( 
                    table.map(
                    (current) => {
                        
                        let asyncFunc = (asyncCallback) => {
                            CQAlmerys.insertPrevision(current, 
                                (err) => {
                                    if(err) return asyncCallback(err);
                                    asyncCallback();
                                }
                            );
                        };

                        return asyncFunc;
                    }
                    ),

                    (err) => {
                        if(err) callback(err);
                        callback();
                    }
                );
            }
        );
    },

    aSuperviser : function(controles) { //=> false : A ne pas controler
        let now = new Date();
        if(controles.aucun_controle === true) return false; //=> Aucune supervision
        if(controles.controle_by_date === true) return false; //=> Pas de controle pour la date
        if(now.getDay() === 6 && controles.samedi === true) return false; //=> Si samedi et pas de controle le samedi
        if(now.getDay() === 5 && controles.vendredi === true) return false; //=> Si vendredi et pas de controle le vendredi
        if(now.getDay() === 4 && controles.jeudi === true) return false; //=> Si jeudi et pas de controle le jeudi
        if(now.getDay() === 3 && controles.mercredi === true) return false; //=> Si mercredi et pas de controle le mercredi
        if(now.getDay() === 2 && controles.mardi === true) return false; //=> Si mardi et pas de controle le mardi
        if(now.getDay() === 1 && controles.lundi === true) return false; //=> Si lundi et pas de controle le lundi
        return true;
    },


};