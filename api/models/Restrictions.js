
module.exports = {
    attributes : {

    },

    CheckIfAccessible : function(nomMenu, idPers, callback){
        let query = `
            SELECT 
                ` + nomMenu + ` 
            FROM p_logon
            WHERE id_pers = $1
        `;

        Ldt.query(query, [idPers],
            
            function(err, res) {
                if(err) {
                    console.log(err);
                    callback(err);
                }

                try{
                    callback(null, res.rows);
                } catch(erreur) {
                    callback(erreur);
                }
            }
            
        );
    },


    decrementQuota : function(nomMenu, idPers, callback) {
        let request = `
            UPDATE p_logon SET ` + nomMenu + ` = ` + nomMenu + ` - 1 WHERE id_pers = $1 AND ` + nomMenu + ` >= 0
            RETURNING ` + nomMenu + `
        `;

        Ldt.query(request, [idPers],
            
            function(err, res) {
                if(err) {
                    console.log(err);
                    callback(err);
                }
                callback(null, res.rows);
            }
            
        );
    },


    resetQuota : function(nomMenu, callback) {
        let request = `
            UPDATE p_logon SET ` + nomMenu + ` = 5
        `;

        Ldt.query(request,
            
            function(err, res) {
                if(err) {
                    console.log(err);
                    callback(err);
                }
                callback();
            }
            
        );
    },


    resetAllQuota : function(callback) {
        let request = `
            UPDATE p_logon SET 
            tdb_op = 5,
            real_gestion_horaire = 0,
            anomalie_op = 0,
            suivi_heure_op = 0,
            retard_par_departement = 0,
            reporting_flexicap = 0,
            stat_op = 0,
            centralisation_consommation_dossier = 24,
            centralisation_vitesse_qualite = 0,
            centralisation = 0,
            almerys_call = 0,
            rp_almerys = 0,
            page_heure_pause_almerys = 0,
            suivi_indicateur_prod = 0,
            solimu_reporting = 0,
            solimu_reporting_op = 0,
            page_heure_pause_call = 0,
            statistique_doctocare = 0,
            statistique_briant_as = 0,
            statistique_codelis = 0,
            statistique_ae = 0,
            statistique_as = 0,
            statistique_iso_eole = 0,
            detourage_reporting = 0
        `;

        Ldt.query(request,
            
            function(err, res) {
                if(err) {
                    console.log(err);
                    callback(err);
                }
                callback();
            }
            
        );
    },
}