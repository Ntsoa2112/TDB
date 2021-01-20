const xl = require('excel4node');
const CQAlmerys = require('../models/CQAlmerys');
const CQAlmerysService = require('./CQAlmerysService');

const poleList = [
    {
      id: 41,
      dep: 12,
      lib: "000TEST_DEV"
    }, {
      id: 579,
      dep: 19,
      lib: "ALME_TPS"
    }, {
      id: 578,
      dep: 20,
      lib: "ALM_HOSPI"
    }, {
      id: 580,
      dep: 22,
      lib: "ALM_OPTIQUE"
    }, {
      id: 577,
      dep: 38,
      lib: "ALM_SE"
    }, {
      id: 29,
      dep: 39,
      lib: "ALM_LDR"
    }, {
      id: 583,
      dep: 40,
      lib: "ALM_INTERIAL"
    }, {
      id: 582,
      dep: 49,
      lib: "ALM_DENTAIRE_AUDIO"
    }
  ];

var myStyle = null;
var myStyleBorder = null;
var style_number = null;
var mavo_back = null;
var mena_back = null;
var manga_back = null ;


module.exports = {

    generateExcelCq : function(sql) {
        return new Promise((resolve, reject) => {

            this.buildJsonToExport(sql)

            .then((formatedList) => {
                return this.buildWorkBook(formatedList, sql);
            })

            .then((dateNow) => {
                resolve(dateNow);
            })

            .catch((err) => {
                reject(err);
            })

        });
    },


    buildWorkBook : function(liste, sql) {
 
        return new Promise((resolve, reject) => {
            
            try {
                let wb = new xl.Workbook();

                myStyle = wb.createStyle({
                    font: {
                    bold: true,
                    },
                    alignment: {
                    wrapText: true,
                    horizontal: 'center',
                    vertical: 'center'
                    },
                    fill: {
                    type: 'pattern', // the only one implemented so far.
                    patternType: 'solid', // most common.
                    fgColor: '#b4c6e7'// bgColor only applies on patternTypes other than solid.
                    }
                });
                
                myStyleBorder = wb.createStyle({
                    border: { // §18.8.4 border (Border)
                    left: {
                        style: 'thin',
                        color: '#000000'// HTML style hex value
                    },
                    right: {
                        style: 'thin',
                        color: '#000000'
                    },
                    top: {
                        style: 'thin',
                        color: '#000000'
                    },
                    bottom: {
                        style: 'thin',
                        color: '#000000'
                    },
                    diagonal: {
                        style: 'thin',
                        color: '#f2f2f2'
                    },
                    diagonalDown: true,
                    diagonalUp: true,
                    outline: true
                    }
                });
                
                style_number = wb.createStyle({
                    font: {
                    size: 11
                    },
                    numberFormat: '#,##0.00;(#,##0.00);-'
                });
                
                mavo_back = wb.createStyle({
                    fill: {
                    type: 'pattern', // the only one implemented so far.
                    patternType: 'solid', // most common.
                    fgColor: '#ffff99'// bgColor only applies on patternTypes other than solid.
                    }
                
                });
                
                mena_back = wb.createStyle({
                    fill: {
                    type: 'pattern', // the only one implemented so far.
                    patternType: 'solid', // most common.
                    fgColor: '#ff754f'// bgColor only applies on patternTypes other than solid.
                    }
                });
                
                manga_back = wb.createStyle({
                    fill: {
                    type: 'pattern', // the only one implemented so far.
                    patternType: 'solid', // most common.
                    fgColor: '#c5faf2'// bgColor only applies on patternTypes other than solid.
                    }
                });
                
                let ws = wb.addWorksheet('CQ Almerys');

                var dateNowLoc = new Date().toISOString().replace(/-/, '').replace(/-/, '').substr(0, 8);

                let arrayHeader = this.buildExcelHeader(sql);

                arrayHeader.forEach((current, index) => {
                    ws.cell(1, (index+1)).string(current).style(myStyle).style(myStyleBorder); 
                });

                liste.forEach((current, index) => {
                    current.etatReprise = this.checkEtatReprise(current.reprise_fini);
                    current.typeFav = this.checkTypeFav(current.id_dossier, current.quantite);
                    current.departement = current.dep;
                    current.departement = this.checkDepartement(current.iddep);

                    let colAIntegrer = this.buildExcelLine(sql, current);
                    current.etatSaisie = "-";

                    if (sql.includes("791") || sql.includes("792") || sql.includes("793") || sql.includes("794")) {
                        if (cqAlm.saisie_ok) current.etatSaisie = "OK SAISIE"
                    }

                    colAIntegrer.forEach((currentCol, currentIndex) => {
                        let col = (current[currentCol.libelle]) ? current[currentCol.libelle] + "" : "-";
                        ws.cell((index+2), (currentIndex+1)).string(col).style(currentCol.style).style(myStyleBorder);
                    });
                });

                wb.write('assets/Export_Excel/Cq_Almerys_' + dateNowLoc + '.xlsx',
                    (err, _stats) => {
                        if(err) return reject(err);
                        resolve(dateNowLoc);
                    }
                );

            } catch (error) {
                reject(error);
            }


        });

    },


    
    /**
     * Cette fonction listera les en-têtes avec leur numero de colonne (dans le bon ordre)
     */
    buildExcelHeader : function(sql) {
        let arrayOut = ["DEPARTEMENT","POLE","SPECIALITE","SOUS SPE","SOUS SOUS SPE"];

        if (sql.includes("701") || sql.includes("702") || sql.includes("703") || sql.includes("704") || sql.includes("721")) {
            arrayOut.push("NUM SECU");
            arrayOut.push("NUM DECOMPTE");
            arrayOut.push("ETAT");
        } else if (sql.includes("104") || sql.includes("106")) {
            arrayOut.push("NUM FACTURE");
            arrayOut.push("NUM NUO");
            arrayOut.push("NUM AM");
            arrayOut.push("NUM INTERNE");
            arrayOut.push("COMMENTAIRE");
        } else {
            arrayOut.push("NUM FACTURE");
            arrayOut.push("NUM NUO");
        }

        arrayOut.push("TYPE FAV");
        arrayOut.push("MONTANT RC");
        arrayOut.push("MATRICULE");
        arrayOut.push("SAT");
        arrayOut.push("CQ");
        arrayOut.push("TYPE CQ");
        arrayOut.push("ETAT");
        arrayOut.push("ETAPE");
        arrayOut.push("HEURE");
        arrayOut.push("TYPE ERREUR");
        arrayOut.push("DISTINCTION");
        arrayOut.push("TACHE");
        arrayOut.push("MOTIF REJET");
        arrayOut.push("CLIENT");
        arrayOut.push("Mutuelle");
        arrayOut.push("ETAT REPRISE");
        arrayOut.push("ETAT SAISIE");
        arrayOut.push("LISTE ANOMALIE");

        return arrayOut;
    },

    /**
     * Renvoie dans un tableau la liste des champs à intégrer (dans le bon ordre)
     * Les champs sont dans l'objet courant de la liste obtenue
     * @param {*} sql 
     * @param {*} etatReprise 
     * @param {*} typeFav 
     * @param {*} dep 
     */
    buildExcelLine : function(sql, cqAlm) {
        let arrayOut = [
            {
                style : style_number,
                libelle : "departement"
            },
            {
                style : style_number,
                libelle : "dossier"
            },
            {
                style : style_number,
                libelle : "lotclient"
            },
            {
                style : style_number,
                libelle : "sous_sous_spec"
            },
            {
                style : style_number,
                libelle : "sous_sous_sous_spec"
            }
        ];
        
        if (sql.includes("701") || sql.includes("702") || sql.includes("703") || sql.includes("704") || sql.includes("721")) {
            arrayOut.push({
                style : style_number,
                libelle : "numerocq"
            });
            arrayOut.push({
                style : style_number,
                libelle : "numerodecompte"
            });
            arrayOut.push({
                style : style_number,
                libelle : "etatint"
            });
        } else if (sql.includes("791") || sql.includes("792") || sql.includes("793") || sql.includes("794")) {
            arrayOut.push({
                style : style_number,
                libelle : "numerofacture"
            });
            arrayOut.push({
                style : this.checkNumeroNuoStyle(cqAlm),
                libelle : "numeronuo"
            });
            arrayOut.push({
                style : (cqAlm.is_am) ? style_number : mena_back,
                libelle : "num_am"
            });
            arrayOut.push({
                style : (cqAlm.is_interne) ? style_number : mena_back,
                libelle : "interne"
            });
            arrayOut.push({
                style : style_number,
                libelle : "commentaire"
            });
        } else {
            arrayOut.push({
                style : style_number,
                libelle : "numerofacture"
            });
            arrayOut.push({
                style : style_number,
                libelle : "numeronuo"
            });
        }

        arrayOut.push({
            style : style_number,
            libelle : "typeFav"
        });
        arrayOut.push({
            style : style_number,
            libelle : "quantite"
        });
        arrayOut.push({
            style : style_number,
            libelle : "matriculesaisie"
        });
        arrayOut.push({
            style : style_number,
            libelle : "sat"
        });
        arrayOut.push({
            style : style_number,
            libelle : "nom_cq"
        });
        arrayOut.push({
            style : style_number,
            libelle : "type_controle"
        });
        arrayOut.push({
            style : style_number,
            libelle : "etat"
        });
        arrayOut.push({
            style : style_number,
            libelle : "etape"
        });
        arrayOut.push({
            style : style_number,
            libelle : "heure"
        });
        arrayOut.push({
            style : style_number,
            libelle : "erreur_cq"
        });
        arrayOut.push({
            style : style_number,
            libelle : "dist"
        });
        arrayOut.push({
            style : style_number,
            libelle : "tache"
        });
        arrayOut.push({
            style : style_number,
            libelle : "motifrejet"
        });
        arrayOut.push({
            style : style_number,
            libelle : "clientalm"
        });
        arrayOut.push({
            style : style_number,
            libelle : "libelle_mutuelle"
        });
        arrayOut.push({
            style : style_number,
            libelle : "etatReprise"
        });

        arrayOut.push({
            style : style_number,
            libelle : "etatSaisie"
        });

        arrayOut.push({
            style : style_number,
            libelle : "anomalies"
        });

        return arrayOut;
    },


    buildJsonToExport : function(sql) {
        return new Promise((resolve, reject) => {
            this.getListeCqAlm(sql)

            .then((listeCq) => {
                return this.setAnomalies(listeCq);
            })

            .then((listeCqWithAnomalies) => {
                resolve(listeCqWithAnomalies);
            })

            .catch((err) => {
                reject(err);
            });
        });
    },


    getListeCqAlm : function(sql) {
        return new Promise((resolve, reject) => {
            CQAlmerys.listCqAlm(sql,
                (err, liste) => {
                    if(err) reject(err);
                    resolve(liste);
                }    
            );
        });
    },

    setAnomalies : function(listeCq) {
        return Promise.all(
            listeCq.map((current) => {
                return this.setAnomalie(current);
            })
        );
    },

    setAnomalie : function(cq) {
        return new Promise((resolve, reject) => {

            CQAlmerysService.recupererErreursCheckCq(cq.id)

            .then((anomalies) => {

                let output = ""
                anomalies.forEach((current) => {
                    if(current.desc_anomalie !== null) {
                        output += "*" + current.desc_anomalie + "\r\n\n";
                    }
                });
                cq.anomalies = output; //=> on rajoute les anomalies et on renvoie la ligne entière
                resolve(cq); 
            })

            .catch((err) => {
                reject(err);
            });

        });
    },

    checkEtatReprise : function(reprise) {
        var etatReprise = "";

        if (reprise && (reprise.toString().toLowerCase() == "true")) {
            etatReprise = "REPRISE TERMINER";
        } 

        return etatReprise;
    },


    checkTypeFav : function(idDossier, quantite) {
        var typFav = '';

        if (Number(idDossier) == 701 || Number(idDossier) == 702 || Number(idDossier) == 703 || Number(idDossier) == 704) {
          if (Number(quantite) >= 350) {
            typFav = "NIVEAU A";
          }
          else {
            typFav = "NIVEAU B";
          }

        } else {
          if (Number(quantite) >= 100) {
            typFav = "FAV A";
          }
          else if (Number(quantite) < 100 && Number(quantite) >= 50) {
            typFav = "FAV B";
          }
          else if (Number(quantite) < 50 && Number(quantite) >= 30) {
            typFav = "FAV C";
          } else if (Number(quantite) === 0) {
            typFav = "FAV AUTRE";
          }
        }

        return typFav;
    },


    checkDepartement : function(idDep) {
        idDep = parseInt(idDep);

        switch(idDep) {

            case(12) : {
                return poleList[0].lib; 
                break;
            }

            case(19) : {
                return poleList[1].lib; 
                break;
            }

            case(20) : {
                return poleList[2].lib; 
                break;
            }

            case(22) : {
                return poleList[3].lib; 
                break;
            }

            case(38) : {
                return poleList[4].lib; 
                break;
            }

            case(39) : {
                return poleList[5].lib; 
                break;
            }

            case(40) : {
                return poleList[6].lib; 
                break;
            }

            case(49) : {
                return poleList[7].lib; 
                break;
            }

        };
    },

    checkNumeroNuoStyle : function(cqAlm) {
        if (Number(cqAlm.id_couleur_nuo) == 1) return mavo_back;
        else if (Number(cqAlm.id_couleur_nuo) == 2) return manga_back;
        else return style_number;
    }


};