
const { listCqAlm } = require('../models/CQAlmerys');
const CQAlmerys = require('../models/CQAlmerys');

module.exports = {

    recupererEtapesGrille : function(options) {

        return new Promise((resolve, reject) => {

            CQAlmerys.recupererEtapesGrille(options, 
                (err, res) => {
                    if (err) {
                        return reject(err);
                    }
    
                    let headers = this.filtrerHeader(res);


                    for (const key in headers) {
                        if (headers.hasOwnProperty(key)) {
                            const element = headers[key];
                            let etapes = this.filtreEtapes(res, element.id_etape);
                            element.childs = etapes
                        }
                    }

                    //console.log(filteredEtapes.headers);
                    resolve(headers);
                }
            );

        });

    },


    /**
     * Filtre les header et les étapes dans la liste reçue en paramètre
     * @param {*} listeEtapes 
     */
    filtrerHeader : function(listeEtapes = []) {
        let tableHeader = {};

        listeEtapes.forEach((current) => {
            if(current.parent_id === null) {
                (current.anterieur === null) ? tableHeader['0'] = current : tableHeader[current.anterieur] = current;
            } 
        });

        return tableHeader;
    },


    filtreEtapes : function(listeEtapes = [], idParent) {
        let sortie = {};

        listeEtapes.forEach((current) => {
            if(current.parent_id === parseInt(idParent)) {
                (current.anterieur === null) ? sortie['0'] = current : sortie[current.anterieur] = current;
            } 
        });

        return sortie;
    },


    enregistrerGrille : function(grille) {

        return new Promise((resolve, reject) => {
            
            this.insererGrille(grille.id)

            .then((idTraitement) => {
                return this.insererEtapes(idTraitement, grille.cq);
            })

            .then(() => {
                return this.cqEffectue(grille.idCq, grille.type_cq, grille.id);
            })

            .then(() => {
                resolve();
            })

            .catch((err) => {
                reject(err);
            });

        });

    },

    insererGrille : function(idCq) {

        return new Promise((resolve, reject) => {
            let options = {
                id : idCq
            };

            CQAlmerys.insererGrille(options,
                (err, idTraitement) => {
                    if(err) return reject(err);
                    resolve(idTraitement[0].id_traitement);
                }
            );

        });

    },


    insererEtapes : function(idTraitement, listeAInserer) {

        return Promise.all(
            listeAInserer.map((current) => {
                return this.insererEtape(idTraitement, current);
            })
        );

    },

    insererEtape : function(idTraitement, etapes) {

        return new Promise((resolve, reject) => {
        
            let options = {
                idTraitement : this.checkValidityInt(idTraitement),
                idEtape : this.checkValidityInt(etapes.etape),
                check : etapes.check,
                resultat : etapes.resultat,
                idAnomalie : this.checkValidityInt(etapes.anomalie),
                idDescription : this.checkValidityInt(etapes.description),
                idConformite : this.checkValidityInt(etapes.conformite)
            };

            CQAlmerys.insererEtape(options,
                (err) => {
                    if(err) return reject(err);
                    resolve();
                }
            );

        });
    },


    checkValidityInt : function(entree) {
        if(isNaN(parseInt(entree))) {
            return null;
        }

        return entree;
    },

    /**
     * Récupère les anomalies 
     * @param {*} idCq 
     */
    recupererErreursCheckCq : function(idCq) {

        return new Promise((resolve, reject) => {

            this.recupererTraitement(idCq)

            .then((idTraitement) => {
                return this.recupererErreur(idTraitement);
            })

            .then((listeErreurs) => {
                resolve(listeErreurs);
            })

            .catch((err) => {
                reject(err);
            });

        });

    },

    recupererTraitement : function(idCq) {

        return new Promise((resolve, reject) => {
            let options = {
                idCq : idCq
            };

            CQAlmerys.recupererTraitement(options,
                (err, res) => {
                    if(err) return reject(err);
                    
                    if(res.length < 1) {
                        resolve(0);
                    } else {
                        resolve(res[0].id_traitement);
                    }
                    
                }
            );
             
        });
    },


    recupererErreur : function(idTraitement) {
        let options = {
            idTraitement : idTraitement
        };

        return new Promise((resolve, reject) => {
            
            CQAlmerys.recupererErreursCheckCq(options,
                (err, res) => {
                    if(err) return reject(err);
                    resolve(res);
                }
            );
            
        });

    },


    cqEffectue : function(idCq, idTypeControle, id) {
        let options = {
            idCq : idCq,
            idTypeControle : idTypeControle,
            id : id
        };

        return new Promise((resolve, reject) => {

            CQAlmerys.cqEffectue(options,
            
                (err) => {
                    if(err) reject(err);
                    resolve();
                }
                
            );

        });
    },


    updateGrille : function(grille) {

        return new Promise((resolve, reject) => {

            this.recupererTraitement(grille.id)

            .then((idTraitement) => {
                return this.updateEtapes(idTraitement, grille.cq);
            })

            .then(() => {
                return this.cqEffectue(grille.idCq, grille.type_cq, grille.id);
            })

            .then(() => {
                resolve();
            })

            .catch((err) => {
                reject(err);
            });

        });
    },

    updateEtapes : function(idTraitement ,listeEtapes) {
        return Promise.all(
            listeEtapes.map((current) => {
                return this.updateEtape(idTraitement, current);
            })
        );
    },


    updateEtape : function(idTraitement, etape) {
        return new Promise((resolve, reject) => {

            let options = {
                idTraitement : this.checkValidityInt(idTraitement),
                idEtape : this.checkValidityInt(etape.etape),
                resultat : etape.resultat,
                idAnomalie : this.checkValidityInt(etape.anomalie),
                idDescription : this.checkValidityInt(etape.description),
                idConformite : this.checkValidityInt(etape.conformite)
            };

            CQAlmerys.updateEtape(options,
                (err) => {
                    if(err) reject(err);
                    resolve();
                }
            );
        });
    },


    recupererTypeGrille : function(idPole, idSpe, idSSpe) {

        return new Promise((resolve, reject) => {

            let options = {
                idPole : idPole,
                idSpe : idSpe,
                idSSpe : idSSpe
            };

            CQAlmerys.recupererTypeGrille(options,
                (err, res) => {
                    if(err) reject(err);
                    resolve(res[0]);
                }
            );

        });

    },


    loadCQAlm : function(sql) {
        return new Promise((resolve, reject) => {
            this.getListeCqAlm(sql)

            .then((listeCqAlm) => {
                return this.buildAllCQLine(listeCqAlm);
            })

            .then((formatedList) => {
                resolve(formatedList);
            })

            .catch((err) => {
                reject(err);
            });
        });
    },


    getListeCqAlm : function(sql) {
        return new Promise((resolve, reject) => {
            CQAlmerys.listCqAlm(sql,
                (err, res) => {
                    if(err) reject(err);
                    resolve(res);
                }
            );
        });
    },


    /**
     * Récupère le type de grille d'une ligne de la liste CQ Almerys et le met dans l'objet puis renvoie cet objet
     * @param {*} oneLineCq 
     */
    buildCQLine : function(oneLineCq) {
        return new Promise((resolve, reject) => {
            this.recupererTypeGrille(oneLineCq.id_dossier, oneLineCq.idp, oneLineCq.id_ss_spe)

            .then((typeGrille) => {
                if(typeGrille) {
                    oneLineCq.id_type_grille = typeGrille.id_type_grille;
                    oneLineCq.designation_grille = typeGrille.designation_grille;
                } else {
                    oneLineCq.id_type_grille = 0;
                    oneLineCq.designation_grille = "Pas de grille affilié";
                }
                
                return this.recupererErreursCheckCq(oneLineCq.id);
            })

            .then((listeErreurs) => {
                let listeErr = ``;

                listeErreurs.forEach((current) => {
                    if(current.desc_anomalie !== null) {
                        listeErr += `
                            <li> ${current.desc_anomalie} </li>
                        `;
                    }
                });

                oneLineCq.erreurs_cq = listeErr;
                resolve(oneLineCq);
            })

            .catch((err) => {
                reject(err);
            });
        });
    },

    buildAllCQLine: function(listeCq) {
        return Promise.all(
            listeCq.map((current) => {
                return this.buildCQLine(current);
            })
        );
    },


}