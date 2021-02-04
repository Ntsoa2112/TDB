/**
 * CoachingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    fichecoaching : function(req, res){
        if (!req.session.user) return res.redirect('/login');
        var menu = [];
        menu["aceuil"]= "";
        menu["dossierAdmin"]= "";
        menu["gestionDossier"]= "";
        menu["statOpAdmin"]= "";
        menu["presence"]= "";
        menu["admin"]= "";
        const id = req.session.user;
        
        var create = false;
        if(req.param("create")){
            create = true;
        }
        var sql = "SELECT * FROM neocles_manager WHERE matricule ='"+id+"'";
        Neocles_manager.query(sql, function(err, resultat){
            if(err) return res.send(err);
            //console.log(resultat.rows[0].nom);
            if(resultat.rowCount == 1){
                var manager = true;
                sql = "select distinct(neo.id_pers), pers.appelation from neo_pers_niveau neo INNER JOIN r_personnel pers ON neo.id_pers = pers.id_pers";
                Neo_pers_niveau.query(sql, function(err, resultat){
                    if(err) return res.send(err);
                    //console.log(resultat.rows[0].appelation);
                    return res.view('pages/neocles/fiche_de_suivi/fichedecoaching', {layout : false, menu : menu, manager: manager, id:id, id_appelation: resultat, create});
                })
            }
            else{
                var manager = false;
                return res.view('pages/neocles/fiche_de_suivi/fichedecoaching', {layout : false, menu : menu, manager: manager, id:id, create});
            }
        });
    },

    suivi_coaching : function (req, res) {
        if (!req.session.user) return res.redirect('/login');
        var menu = [];
        menu["aceuil"]= "";
        menu["dossierAdmin"]= "";
        menu["gestionDossier"]= "";
        menu["statOpAdmin"]= "";
        menu["presence"]= "";
        menu["admin"]= "";
        const id = req.session.user;       
        var id_pers = req.param("id");
        var my = req.param("my");
        var annee = my.substr( 0, 4);
        var mois = my.substr( 5, 2);
        var date_now = new Date().toISOString().slice(0,10);
        var mois_now = date_now.substr( 5, 2);
        var annee_now = date_now.substr( 0, 4);

        var sql = "select * from neocles_compte_rendu where id_pers ="+id_pers+" and date_part('year', date_compte_rendu) = "+annee;
        Neocles_manager.query(sql, function (err, resultat) {
            if(err) return res.send(err);
            var disabled = [], couleur = [];
            for(var i =1; i<=12; i++){
                disabled[i] =  "disabled";
                couleur[i] = "gris";
            }
            if(resultat.rowCount == 0){
                if(annee == annee_now){
                    disabled[1] = "";
                    couleur[1] = "vert";
                    disabled[2] = "";
                    couleur[2] = "vert";
                    if(mois_now > 1){
                        couleur[1] = "red";
                    }                   
                    return res.view('pages/neocles/fiche_de_suivi/mois_menu', {layout : false, menu : menu, disabled, couleur, id_pers, annee});
                }
                else if(annee<annee_now){
                    for(var i =1; i<=12; i++){
                        disabled[i] =  "";
                        couleur[i] = "red";
                    }
                    return res.view('pages/neocles/fiche_de_suivi/mois_menu', {layout : false, menu : menu, disabled, couleur, id_pers, annee});
                }
                else{
                    return res.view('pages/neocles/fiche_de_suivi/mois_menu', {layout : false, menu : menu, disabled, couleur,id_pers, annee});
                }
            }
            else{
                var date_cr, mois, valider;
                mois_now = parseInt( mois_now, 10);
                for(var i=12; i>=1; i--){
                    disabled[i] = "";
                    couleur[i] = "vert";
                    if(!resultat.rows[i-1]){
                        if(i > mois_now){
                            disabled[i] = "disabled";
                            couleur[i] = "gris";
                        }
                        else if(i < mois_now){
                            if(resultat.rows[i-2] && resultat.rows[i-2].valider){                                
                                couleur[i] = "red";
                            }
                            else if(resultat.rows[i-2] && !resultat.rows[i-2].valider){
                                disabled[i] = "disabled";
                                couleur[i] = "gris";
                            }
                        }
                        else{
                            if(!resultat.rows[i-2]){
                                disabled[i] = "disabled";
                                couleur[i] = "gris";
                            }
                            else if(resultat.rows[i-2] && !resultat.rows[i-2].valider){
                                disabled[i] = "disabled";
                                couleur[i] = "gris";
                            }
                            
                        }
                    }
                    else{
                        date_cr = resultat.rows[i-1].date_compte_rendu;
                        mois = new Date(date_cr).toISOString().slice(0,10);
                        mois = parseInt( mois.substr( 5, 2), 10);
                        valider = resultat.rows[i-1].valider;
                        if( valider == false){
                            couleur[mois] = "jaune"; // Mbola tsy valider fa enregistrer
                            disabled[mois] = "";
                            disabled[mois+1] = "disabled";
                            couleur[mois+1] = "gris";                          
                            if(mois < mois_now){
                                couleur[mois] = "red";
                                couleur[mois_now] = "gris"
                                disabled[mois_now] = "disabled";
                            }
                        }
                        else{
                            couleur[mois] = "violet";
                        }
                    }
                }
                /*
                for(var i=0; i<resultat.rowCount; i++){
                    date_cr = resultat.rows[i].date_compte_rendu;
                    mois = new Date(date_cr).toISOString().slice(0,10);
                    console.log(mois);
                    mois = parseInt( mois.substr( 5, 2), 10);
                    console.log(mois);
                    valider = resultat.rows[i].valider;


                    if(valider == false){
                        disabled[mois] = "";
                        couleur[mois] = "jaune";
                        if(mois < mois_now){
                            couleur[mois] = "orange"; //Efa conserver fa tsy valider
                            disabled[mois_now] = "disabled";
                            couleur[mois_now] = "gris";
                        }
                    }
                    else{
                        disabled[mois] = "";
                        couleur[mois] = "violet"; //Efa valider nef afaka jerena
                    }
                }
                
                */
                return res.view('pages/neocles/fiche_de_suivi/mois_menu', {layout : false, menu : menu, disabled, couleur,id_pers, annee});
            }
        })
    },

    suivi_coaching_month: function (req, res) {
        if (!req.session.user) return res.redirect('/login');
        var menu = [];
        menu["aceuil"]= "";
        menu["dossierAdmin"]= "";
        menu["gestionDossier"]= "";
        menu["statOpAdmin"]= "";
        menu["presence"]= "";
        menu["admin"]= "";
        const id = req.session.user;
        
        var id_pers= req.param("id_pers"), mois = req.param("m"), annee = req.param("y");
        var sql = "select * from neocles_compte_rendu where id_pers ="+id_pers+" and date_part('year', date_compte_rendu) = "+annee+" and date_part('month', date_compte_rendu) = "+mois;
        Neocles_manager.query(sql, function (err, resultat) {
            if(err) return res.send(err);
            var existe = false;
            if(resultat.rowCount == 1){
                existe = true;
                return res.view('pages/neocles/fiche_de_suivi/Tableau_cr', {layout : false, menu : menu, mois,id_pers, annee, existe, resultat});
            }
            else{
                return res.view('pages/neocles/fiche_de_suivi/Tableau_cr', {layout : false, menu : menu, mois,id_pers, annee, existe});
            }
        })
    },

    compte_rendu_post: function (req, res) {
        if (!req.session.user) return res.redirect('/login');
        var menu = [];
        menu["aceuil"]= "";
        menu["dossierAdmin"]= "";
        menu["gestionDossier"]= "";
        menu["statOpAdmin"]= "";
        menu["presence"]= "";
        menu["admin"]= "";
        const id = req.session.user;
        
        var date_now = new Date().toISOString().slice(0,10);
        
        var id_pers= req.param("id_pers"), mois = req.param("mois"), annee = req.param("annee");
        var q1 = req.param("q1"), q2 = req.param("q2"), t1 = req.param("t1"), t2 = req.param("t2"), imp1 = req.param("imp1"), imp2 = req.param("imp2");
        var submit = req.param("submit");
        var sauve = true, update = false;
        var date_compte_rendu = new Date(annee, mois, 01).toISOString().slice(0,10);
        if(submit == "Conserver"){
            sauve = false;
        }
        var sql = "insert into neocles_compte_rendu(id_pers, id_manager, date_creation, date_compte_rendu, qual_positif, technicite_positif, implication_positif, qual_ameliorer, technicite_ameliorer, implication_ameliorer, valider) values("+id_pers+","+id+",'"+date_now+"','"+date_compte_rendu+"','"+q1+"','"+t1+"','"+imp1+"','"+q2+"','"+t2+"','"+imp2+"',"+sauve+")";
        if(req.param("update")){
            update = true;
            var id_cr = req.param("id_cr");
            sql = "update neocles_compte_rendu set id_manager = "+id+", qual_positif = '"+q1+"', technicite_positif = '"+t1+"', implication_positif = '"+imp1+"', qual_ameliorer = '"+q2+"', technicite_ameliorer = '"+t2+"', implication_ameliorer = '"+imp2+"', valider = "+sauve+" where id = " + id_cr;     
        }    
        Neocles_manager.query(sql, function (err) {
            if(err) return res.send(err);
            return res.redirect('/coaching/create');
        })

    }

};

