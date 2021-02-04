/**
 * FichedesuivineoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const { to } = require('mathjs');
var service  = require('../services/FicheSuivi');
module.exports = {
  
    fichedesuiviendetail : function(req, res){
        if (!req.session.user) return res.redirect('/login');
        var menu = [];
        menu["aceuil"]= "";
        menu["dossierAdmin"]= "";
        menu["gestionDossier"]= "";
        menu["statOpAdmin"]= "";
        menu["presence"]= "";
        menu["admin"]= "";
        var create = false;
        var update = false;
        if(req.param('create') == "create"){
            create = true;
        }
        else if(req.param('create') == "update"){
            update = true;
        }
        const id = req.session.user;
        // const id=8054;
        const depart = req.session.id_departement;
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
                    return res.view('pages/neocles/fiche_de_suivi/fichedesuiviendetail', {layout : false, menu : menu, manager: manager, id:id, id_appelation: resultat, create: create, update});
                })
            }
            else{
                var manager = false;
                return res.view('pages/neocles/fiche_de_suivi/fichedesuiviendetail', {layout : false, menu : menu, manager: manager, id:id,create: create, update});
            }
        });
        
    },
    fichedesuivideconformite : function(req, res){
        if (!req.session.user) return res.redirect('/login');
        var menu = [];
        menu["aceuil"]= "";
        menu["dossierAdmin"]= "";
        menu["gestionDossier"]= "";
        menu["statOpAdmin"]= "";
        menu["presence"]= "";
        menu["admin"]= "";
        const id = req.session.user;
        var update = false
        if(req.param("update")){
            update = true
        };
        //const id=8054;
        const depart = req.session.id_departement;
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
                    return res.view('pages/neocles/fiche_de_suivi/fichedesuivideconformite', {layout : false, menu : menu, manager: manager, id:id, id_appelation: resultat, update: update});
                })
            }
            else{
                var manager = false;
                return res.view('pages/neocles/fiche_de_suivi/fichedesuivideconformite', {layout : false, menu : menu, manager: manager, id:id, update: update});
            }
            
        });
    },

    suivi_conformite : function(req, res){
        if (!req.session.user) return res.redirect('/login');
        var menu = [];
        menu["aceuil"]= "";
        menu["dossierAdmin"]= "";
        menu["gestionDossier"]= "";
        menu["statOpAdmin"]= "";
        menu["presence"]= "";
        menu["admin"]= "";

        var id = req.param("id");
        var my = req.param("my");
        var annee = my.substr( 0, 4);
        var mois = my.substr( 5, 2);
        var update= false;
        var fiche ;
        /*
        function conformite_mois(annee, id_pers, niveau, seuil_ticket, fiche, ticket_tec, qualite1, qualite2, qualite3, ticket , my , id,  implication) {
            var conf = [], e = 0, id_fiche;
            for(var i =1; i<=12; i++){
                var sql = "SELECT id FROM neocles_fiche WHERE id_pers ='"+id_pers+"' AND date_part('month', date_fiche) = "+i+" AND date_part('year', date_fiche) = "+annee;
                Neocles_fiche.query(sql, function (err, fiche) {
                    if(err) return res.send(err);
                    if(fiche.rowCount == 1){
                        id_fiche = fiche.rows[0].id;
                        sql = "select note as note_q1 from neocles_qualite qua INNER JOIN neocles_ticket tic ON tic.id = qua.id_ticket WHERE tic.id_fiche="+ id_fiche+" AND qua.num = 1 ORDER BY tic.num";
                        Neocles_fiche.query(sql, function (err, qual1) {
                            if(err) return res.send(err);
                            e = e + 1;
                            conf[e] = 11;  
                        })                    
                    }
                    else{
                        e = e + 1;
                        conf[e] = 0;                        
                    }
                    setTimeout(teste,2000)
                    //console.log(e);
                    function teste() {
                            console.log(conf);
                    }

                })
            }
        }
        
        function conf_mois(mois, annee, id_pers, niveau, seuil_ticket, fiche, ticket_tec, qualite1, qualite2, qualite3, ticket , my , id,  implication, conf) {
            var sql = "SELECT id FROM neocles_fiche WHERE id_pers ='"+id_pers+"' AND date_part('month', date_fiche) = "+mois+" AND date_part('year', date_fiche) = "+annee;
            Neocles_fiche.query(sql, function(err, fiche) {
                if(err) return res.send(err);
                if(fiche.rowCount == 1){
                    var id_fiche = fiche.rows[0].id;
                    console.log( "mety ve");
                    //return  res.view('pages/neocles/fiche_de_suivi/tableau_conformite', {layout : false, menu : menu, fiche: fiche, ticket_tec : ticket_tec, qualite1, qualite2, qualite3, seuil_ticket: seuil_ticket, ticket : ticket, my : my, id : id, imp : implication, conf});
                    
                    sql = "select note as note_q1 from neocles_qualite qua INNER JOIN neocles_ticket tic ON tic.id = qua.id_ticket WHERE tic.id_fiche="+ id_fiche+" AND qua.num = 1 ORDER BY tic.num";
                    Neocles_fiche.query(sql, function(err, qual1) {
                        if(err) return res.send(err);
                        return "mety ve";
                        
                        sql = "select note as note_q2 from neocles_qualite qua INNER JOIN neocles_ticket tic ON tic.id = qua.id_ticket WHERE tic.id_fiche="+ id_fiche+" AND qua.num = 2 ORDER BY tic.num";
                        Neocles_fiche.query(sql, function(err, qual2) {
                            if(err) return res.send(err);
                            sql = "select note as note_q3 from neocles_qualite qua INNER JOIN neocles_ticket tic ON tic.id = qua.id_ticket WHERE tic.id_fiche="+ id_fiche+" AND qua.num = 3 ORDER BY tic.num";
                            Neocles_fiche.query(sql, function (err, qual3) {
                                if(err) return res.send(err);
                                var somme_q = 0, total_rejet = 0;
                                for(var i = 0; i < qual1.rowCount; i++){
                                    somme_q = qual1.rows[i].note_q1 + qual2.rows[i].note_q2 + qual3.rows[i].note_q3;
                                    if(somme_q < seuil_ticket){
                                        total_rejet = total_rejet + 1;
                                    }
                                }
                                console.log("total_rejet :" +total_rejet );
                                return total_rejet;
                                
                                var cf = 0;
                                switch(niveau){
                                    case 1:
                                        switch(total_rejet){
                                            case 0:
                                                cf = 99.99;
                                            case 1:
                                                cf = 99.35;
                                            case 2:
                                                cf = 97.5;
                                            case 3:
                                                cf = 96;
                                            case 4:
                                                cf = 93.5;
                                            case 5:
                                            case 6:
                                                cf = 90;
                                            case 7:
                                                cf = "Travail non conforme";
                                            default:
                                                cf = "Travail non conforme";
                                        }
                                    case 2:
                                        switch(total_rejet){
                                            case 0:
                                                cf = 99.99;
                                            case 1:
                                                cf = 99;
                                            case 2:
                                                cf = 96;
                                            case 3:
                                                cf = 90;
                                            case 4:
                                                cf = 93.5
                                            default:
                                                cf = "Travail non conforme";
                                        }
                                    default:
                                        cf = res.send("Votre niveau n'existe pas");
                                }
                                console.log(cf);
                                return cf;
                                
                                
                            })
                        })
                        
                    })
                }
            })
        }
        */
        //var sql = "select id_niveau from neo_pers_niveau where id_pers = '"+id+"' and date = (select MAX(date) from neo_pers_niveau where id_pers = '"+id+"')";
        var sql = "select pers_niv.id_niveau, niv.seuil_ticket from neo_pers_niveau pers_niv INNER JOIN neo_niveau niv ON pers_niv.id_niveau = niv.id  where id_pers = '"+id+"' and date = (select MAX(date) from neo_pers_niveau where id_pers = '"+id+"')"
        Neo_pers_niveau.query(sql, function(err, resultat){
            if(err) return res.send(err);
            if(resultat.rowCount != 0){
                var seuil_ticket = resultat.rows[0].seuil_ticket;           
                if(resultat.rows[0].id_niveau == 5){
                    var niveau = 2;
                    var ticket = 20;
                }
                else{
                    var niveau = 1;
                    var ticket = 13;
                }
                sql = "SELECT id FROM neocles_fiche WHERE id_pers ='"+id+"' AND date_part('month', date_fiche) = "+mois+" AND date_part('year', date_fiche) = "+annee;
                Neocles_fiche.query(sql,  function(err, resultat){
                    if(err) return res.send(err);
                    if(resultat.rowCount == 1){
                        fiche = true;
                        var id_fiche = resultat.rows[0].id;

                        //Nom ticket et son id
                        sql = "SELECT num, nom, t3, note as note_tec, ticket.id as ticket_id from neocles_technicite tec INNER JOIN neocles_ticket ticket ON tec.id_ticket = ticket.id WHERE ticket.id_fiche = "+ id_fiche+" ORDER BY num;";
                        Neocles_fiche.query(sql, function(err, ticket_tec){
                            if(err) return res.send(err);
                            ticket_tec = ticket_tec;
                            sql = "select note as note_q1 from neocles_qualite qua INNER JOIN neocles_ticket tic ON tic.id = qua.id_ticket WHERE tic.id_fiche="+ id_fiche+" AND qua.num = 1 ORDER BY tic.num";
                            Neocles_fiche.query(sql, function(err, qualite1){
                                if(err) return res.send(err);
                                //return  res.view('pages/neocles/fiche_de_suivi/tableau_conformite', {layout : false, menu : menu, ticket_tec : ticket_tec, qualite : qualite});
                                sql = "select note as note_q2 from neocles_qualite qua INNER JOIN neocles_ticket tic ON tic.id = qua.id_ticket WHERE tic.id_fiche="+ id_fiche+" AND qua.num = 2 ORDER BY tic.num";
                                Neocles_fiche.query(sql, function(err, qualite2){
                                    if(err) return res.send(err);
                                    //return  res.view('pages/neocles/fiche_de_suivi/tableau_conformite', {layout : false, menu : menu, ticket_tec : ticket_tec, qualite : qualite});
                                    sql = "select note as note_q3 from neocles_qualite qua INNER JOIN neocles_ticket tic ON tic.id = qua.id_ticket WHERE tic.id_fiche="+ id_fiche+" AND qua.num = 3 ORDER BY tic.num";
                                    Neocles_fiche.query(sql, function(err, qualite3){
                                        if(err) return res.send(err);
                                        sql = "select inactivite, auto_affectation from neocles_implication imp INNER JOIN neocles_ticket tic ON imp.id_ticket = tic.id WHERE tic.id_fiche="+ id_fiche+" ORDER BY tic.num ";
                                        Neocles_fiche.query(sql,  function(err, implication){
                                            if(err) return res.send(err);
                                            return  res.view('pages/neocles/fiche_de_suivi/tableau_conformite', {layout : false, menu : menu, fiche: fiche, ticket_tec : ticket_tec, qualite1, qualite2, qualite3, seuil_ticket: seuil_ticket, ticket : ticket, my : my, id : id, imp : implication});
                                            /*
                                            for(var m = 1; m<=12; m++){
                                                console.log(m +" , " + annee +" , "+ id +" , " + niveau +" , "+ seuil_ticket);
                                                conf[m] = conf_mois(m, annee, id, niveau, seuil_ticket);
                                                //conf[m] = teste();                                                  
                                            }
                                            */
                                           //conformite_mois( annee, id, niveau, seuil_ticket, fiche, ticket_tec, qualite1, qualite2, qualite3, ticket , my , id,  implication);
                                           //console.log("conf : " + conf);
                                            //setTimeout(ret,1000);
                                            //function ret() {
                                                //console.log(conf);
                                                //return  res.view('pages/neocles/fiche_de_suivi/tableau_conformite', {layout : false, menu : menu, fiche: fiche, ticket_tec : ticket_tec, qualite1, qualite2, qualite3, seuil_ticket: seuil_ticket, ticket : ticket, my : my, id : id, imp : implication, conf});
                                           // }
                                            
                                        })
                                        
                                    })
                                })
                            })                                              
                        })                                              
                    }
                    else{
                        //Le fiche n'existe pas; nous allons le créer
                        fiche = false;
                        return  res.view('pages/neocles/fiche_de_suivi/tableau_conformite', {layout : false, menu : menu, ticket : ticket, my : my, id : id, fiche: fiche});
                    }
                });
            }
            else{
                return res.send("Numéro matricule incorrecte");
            }
        })
        
    },

    suivi_en_details : function(req, res){
        if (!req.session.user) return res.redirect('/login');
        var menu = [];
        menu["aceuil"]= "";
        menu["dossierAdmin"]= "";
        menu["gestionDossier"]= "";
        menu["statOpAdmin"]= "";
        menu["presence"]= "";
        menu["admin"]= "";
        var id = req.param("id");
        var my = req.param("my");
        var annee = my.substr( 0, 4);
        var mois = my.substr( 5, 2);

        var sql = "select id_niveau from neo_pers_niveau where id_pers = '"+id+"' and date = (select MAX(date) from neo_pers_niveau where id_pers = '"+id+"')";
        Neo_pers_niveau.query(sql, function(err, resultat){
            if(err) return res.send(err);
            if(resultat.rowCount != 0){               
                if(resultat.rows[0].id_niveau == 5){
                    var niveau = 2;
                    var ticket = 20;
                }
                else{
                    var niveau = 1;
                    var ticket = 13;
                }
                sql = "SELECT * FROM neocles_fiche WHERE id_pers ='"+id+"' AND date_part('month', date_fiche) = "+mois+" AND date_part('year', date_fiche) = "+annee;
                Neocles_fiche.query(sql, function(err, resultat){
                    if(err) return res.send(err);
                    if(resultat.rowCount == 1){
                        //Le fiche existe déjà
                        var id_fiche = resultat.rows[0].id;
                        //Ticket
                        sql = "select * from neocles_ticket where id_fiche = " + id_fiche +" ORDER BY num";
                        Neocles_fiche.query(sql, function(err, donne_ticket){
                            if(err) return res.send(err);
                            var nbr_ticket = donne_ticket.rowCount;
                            sql = "select qua.num as type_qaulite, q1, q2, q3, q4, note, tic.num as num_ticket from neocles_qualite qua INNER JOIN neocles_ticket tic ON qua.id_ticket = tic.id where tic.id_fiche = "+id_fiche+" ORDER BY tic.num ";
                            Neocles_fiche.query(sql, function(err, qualite){
                                if(err) return res.send(err);
                                sql = "select num, t1, t2, t3, note from neocles_technicite tec INNER JOIN neocles_ticket tic ON tec.id_ticket = tic.id where tic.id_fiche = "+id_fiche+" ORDER BY tic.num ";
                                Neocles_fiche.query(sql, function(err, technicite){
                                    if(err) return res.send(err);
                                    sql = "select type, com1, com2, com3, com4, tic.num from neocles_commentaire tec INNER JOIN neocles_ticket tic ON tec.id_ticket = tic.id where tic.id_fiche = "+id_fiche+" ORDER BY tic.num ";
                                    Neocles_fiche.query(sql, function(err, commentaire){
                                        if(err) return res.send(err);
                                        return  res.view('pages/neocles/fiche_de_suivi/update_tableau_details', {layout : false, menu : menu, id_fiche, donne_ticket : donne_ticket, ticket: nbr_ticket, my : my, id : id, qualite:qualite, technicite: technicite });
                                    })
                                    //return res.send("id_fiche");
                                    
                                })
                            })
                        })
                        
                    }
                    else{
                        //Le fiche n'existe pas; nous allons le créer
                        return  res.view('pages/neocles/fiche_de_suivi/tableau_en_details', {layout : false, menu : menu, ticket : ticket, my : my, id : id});
                    }
                });
            }
            else{
                return res.send("Numéro matricule incorrecte");
            }
        })
    },

    post_suivi_details: function(req, res){
        if (!req.session.user) return res.redirect('/login');
        var menu = [];
        menu["aceuil"]= "";
        menu["dossierAdmin"]= "";
        menu["gestionDossier"]= "";
        menu["statOpAdmin"]= "";
        menu["presence"]= "";
        menu["admin"]= "";
        var id_pers = parseInt( req.param("id"), 10);
        const id = req.session.user;
        var my = req.param("my");
        var nbr_ticket = req.param("ticket");
        var date_now = new Date().toISOString().slice(0,10);
        var date_ticke = new Date(my).toISOString().slice(0,10);

        //Qualité 1
        nom_ticket = service.recevoir_donnee(req, nbr_ticket, "ticket");
        q1l1 = service.recevoir_donnee(req, nbr_ticket, "q1l1_");
        q1l1_com = service.recevoir_donnee(req, nbr_ticket, "inpl1");
        q1l2 = service.recevoir_donnee(req, nbr_ticket, "q1l2_");
        q1l2_com = service.recevoir_donnee(req, nbr_ticket, "inpl2");
        q1l3 = service.recevoir_donnee(req, nbr_ticket, "q1l3_");
        q1l3_com = service.recevoir_donnee(req, nbr_ticket, "inpl3");
        q1l4 = service.recevoir_donnee(req, nbr_ticket, "q1l4_");
        q1l4_com = service.recevoir_donnee(req, nbr_ticket, "inpl4");
        note_q1 = service.calcul_note(q1l1, q1l2, q1l3, q1l4, nbr_ticket);
        
        //Qualité 2
        q2l5 = service.recevoir_donnee(req, nbr_ticket, "q2l5_");
        q2l5_com = service.recevoir_donnee(req, nbr_ticket, "inpl5");
        q2l6 = service.recevoir_donnee(req, nbr_ticket, "q2l6_");
        q2l6_com = service.recevoir_donnee(req, nbr_ticket, "inpl6");
        q2l7 = service.recevoir_donnee(req, nbr_ticket, "q2l7_");
        q2l7_com = service.recevoir_donnee(req, nbr_ticket, "inpl7");
        q2l8 = service.recevoir_donnee(req, nbr_ticket, "q2l8_");
        q2l8_com = service.recevoir_donnee(req, nbr_ticket, "inpl8");
        note_q2 = service.calcul_note(q2l5, q2l6, q2l7, q2l8, nbr_ticket);

        //Qualité 3
        q3l12 = service.recevoir_donnee(req, nbr_ticket, "q3l12_");
        q3l12_com = service.recevoir_donnee(req, nbr_ticket, "inpl12");
        q3l13 = service.recevoir_donnee(req, nbr_ticket, "q3l13_");
        q3l13_com = service.recevoir_donnee(req, nbr_ticket, "inpl13");
        q3l14 = service.recevoir_donnee(req, nbr_ticket, "q3l14_");
        q3l14_com = service.recevoir_donnee(req, nbr_ticket, "inpl14");
        q3l15 = service.recevoir_donnee(req, nbr_ticket, "q3l15_");
        q3l15_com = service.recevoir_donnee(req, nbr_ticket, "inpl15");
        note_q3 = service.calcul_note(q3l12, q3l13, q3l14, q3l15, nbr_ticket);

        //Technicité
        tec1 = service.recevoir_donnee(req, nbr_ticket, "tec1_");
        tec1_com = service.recevoir_donnee(req, nbr_ticket, "inpl9");
        tec2 = service.recevoir_donnee(req, nbr_ticket, "tec2_");
        tec2_com = service.recevoir_donnee(req, nbr_ticket, "inpl10");
        tec3 = service.recevoir_donnee(req, nbr_ticket, "tec3_");
        tec3_com = service.recevoir_donnee(req, nbr_ticket, "inpl16");
        note_tec = tec1;

        //insertion fiche
        var sql = "insert into neocles_fiche(id_pers, id_manager, date_creation, date_fiche) values("+id_pers+","+id+",'"+date_now+"','"+date_ticke+"')";
        Neocles_fiche.query(sql, function(err){
            if(err) return res.send(err);
            //sql = "insert into neocles_ticket(num, nom, id_fiche) values(1, 'test', 1)";
            sql = "select id as id_fiche from neocles_fiche where id_pers = "+id_pers+" AND id_manager = "+id+" AND date_fiche = '"+date_ticke+"'";   
            Neocles_fiche.query(sql, function(err, resultat){
                if(err) return res.send(err);
                if(resultat.rowCount == 1){
                    var id_fiche = resultat.rows[0].id_fiche;
                    //Insertion ticket et son nom dans la table ticket
                    var id_ticket = 0 , num_colone=0, e=0;
                    for(var i = 1; i<=nbr_ticket; i++ ){                      
                        sql = "insert into neocles_ticket(num, nom, id_fiche) values ("+i+",'"+nom_ticket[i]+"',"+id_fiche+")";                   
                        Neocles_fiche.query(sql, function(err){
                            if(err) return res.send(err);
                            e = e + 1;
                            if(e == nbr_ticket){
                                donnee_ticket(id_fiche);
                                return res.redirect("/fiche_suivi_en_detail/create");
                            }                
                        })
                    }

                    function donnee_ticket(id_fiche) {
                        var sql = "select id as id_ticket, num from neocles_ticket where id_fiche = "+id_fiche;
                        Neocles_fiche.query(sql, function(err, resultat){
                            if(err) return res.send(err);                       
                            //insertion qualité
                            for(var i =0; i<resultat.rowCount; i++){
                                //console.log(resultat.rows[i].id_ticket + " et num " + resultat.rows[i].num);
                                id_ticket = resultat.rows[i].id_ticket;
                                num_colone = resultat.rows[i].num;
                                insertion_qualite(1, id_ticket, q1l1, q1l2, q1l3, q1l4, note_q1, num_colone);
                                insertion_qualite(2, id_ticket, q2l5, q2l6, q2l7, q2l8, note_q2, num_colone);
                                insertion_qualite(3, id_ticket, q3l12, q3l13, q3l14, q3l15, note_q3, num_colone);
                                insertion_commentaire("q1", id_ticket, q1l1_com, q1l2_com, q1l3_com, num_colone, q1l4_com);
                                insertion_commentaire("q2", id_ticket, q2l5_com, q2l6_com, q2l7_com, num_colone, q2l8_com);
                                insertion_commentaire("q3", id_ticket, q3l12_com, q3l13_com, q3l14_com, num_colone, q3l15_com);
                                insertion_commentaire("tec", id_ticket, tec1_com, tec2_com, tec3_com, num_colone);
                                insertion_technicite(id_ticket, tec1, tec2, tec3, num_colone, note_tec);
                            } 

                        })
                    }                    
                    

                    function insertion_qualite(num_qualite, id_ticket, q1, q2, q3, q4, note, num_colone){
                        var sql = "insert into neocles_qualite(num, id_ticket, q1, q2, q3, q4, note) values("+num_qualite+","+id_ticket+",'"+q1[num_colone]+"','"+q2[num_colone]+"','"+q3[num_colone]+"','"+q4[num_colone]+"',"+note[num_colone]+")";
                        Neocles_fiche.query(sql, function(err){
                            if(err) return res.send(err);
                        })                     
                    } 
                    
                    function insertion_commentaire(type, id_ticket, com1, com2, com3,  num_colone, com4 = ""){
                        var sql;
                        if(type == "tec"){
                            sql = "insert into neocles_commentaire(id_ticket, type, com1, com2, com3) values("+id_ticket+",'"+type+"','"+com1[num_colone]+"','"+com2[num_colone]+"','"+com3[num_colone]+"')";
                        }
                        else{
                            sql = "insert into neocles_commentaire(id_ticket, type, com1, com2, com3, com4) values("+id_ticket+",'"+type+"','"+com1[num_colone]+"','"+com2[num_colone]+"','"+com3[num_colone]+"','"+com4[num_colone]+"')";
                        }
                        Neocles_fiche.query(sql, function(err){
                            if(err) return res.send(err);
                        }) 
                    }

                    function insertion_technicite(id_ticket, t1, t2, t3, num_colone, note){
                        if(!t1[num_colone] || t1[num_colone] == ''){
                            t1[num_colone] = null;
                        }
                        var sql = "insert into neocles_technicite(id_ticket, t1, t2, t3, note) values("+id_ticket+","+t1[num_colone]+",'"+t2[num_colone]+"','"+t3[num_colone]+"',"+note[num_colone]+")";
                        Neocles_fiche.query(sql, function(err){
                            if(err) return res.send(err);
                        }) 
                    }
                }
            })
        })
    },

    post_update_suivi_details: function(req, res){
        if (!req.session.user) return res.redirect('/login');
        var menu = [];
        menu["aceuil"]= "";
        menu["dossierAdmin"]= "";
        menu["gestionDossier"]= "";
        menu["statOpAdmin"]= "";
        menu["presence"]= "";
        menu["admin"]= "";
        var id_pers = parseInt( req.param("id"), 10);
        var my = req.param("my");
        var nbr_ticket = req.param("ticket");
        var id_fiche = req.param("id_fiche");
        var date_now = new Date().toISOString().slice(0,10);
        var date_ticket = new Date(my).toISOString().slice(0,10);

        //Qualité 1
        nom_ticket = service.recevoir_donnee(req, nbr_ticket, "ticket");
        q1l1 = service.recevoir_donnee(req, nbr_ticket, "q1l1_");
        q1l1_com = service.recevoir_donnee(req, nbr_ticket, "inpl1");
        q1l2 = service.recevoir_donnee(req, nbr_ticket, "q1l2_");
        q1l2_com = service.recevoir_donnee(req, nbr_ticket, "inpl2");
        q1l3 = service.recevoir_donnee(req, nbr_ticket, "q1l3_");
        q1l3_com = service.recevoir_donnee(req, nbr_ticket, "inpl3");
        q1l4 = service.recevoir_donnee(req, nbr_ticket, "q1l4_");
        q1l4_com = service.recevoir_donnee(req, nbr_ticket, "inpl4");
        note_q1 = service.calcul_note(q1l1, q1l2, q1l3, q1l4, nbr_ticket);
        
        //Qualité 2
        q2l5 = service.recevoir_donnee(req, nbr_ticket, "q2l5_");
        q2l5_com = service.recevoir_donnee(req, nbr_ticket, "inpl5");
        q2l6 = service.recevoir_donnee(req, nbr_ticket, "q2l6_");
        q2l6_com = service.recevoir_donnee(req, nbr_ticket, "inpl6");
        q2l7 = service.recevoir_donnee(req, nbr_ticket, "q2l7_");
        q2l7_com = service.recevoir_donnee(req, nbr_ticket, "inpl7");
        q2l8 = service.recevoir_donnee(req, nbr_ticket, "q2l8_");
        q2l8_com = service.recevoir_donnee(req, nbr_ticket, "inpl8");
        note_q2 = service.calcul_note(q2l5, q2l6, q2l7, q2l8, nbr_ticket);

        //Qualité 3
        q3l12 = service.recevoir_donnee(req, nbr_ticket, "q3l12_");
        q3l12_com = service.recevoir_donnee(req, nbr_ticket, "inpl12");
        q3l13 = service.recevoir_donnee(req, nbr_ticket, "q3l13_");
        q3l13_com = service.recevoir_donnee(req, nbr_ticket, "inpl13");
        q3l14 = service.recevoir_donnee(req, nbr_ticket, "q3l14_");
        q3l14_com = service.recevoir_donnee(req, nbr_ticket, "inpl14");
        q3l15 = service.recevoir_donnee(req, nbr_ticket, "q3l15_");
        q3l15_com = service.recevoir_donnee(req, nbr_ticket, "inpl15");
        note_q3 = service.calcul_note(q3l12, q3l13, q3l14, q3l15, nbr_ticket);

        //Technicité
        tec1 = service.recevoir_donnee(req, nbr_ticket, "tec1_");
        tec1_com = service.recevoir_donnee(req, nbr_ticket, "inpl9");
        tec2 = service.recevoir_donnee(req, nbr_ticket, "tec2_");
        tec2_com = service.recevoir_donnee(req, nbr_ticket, "inpl10");
        tec3 = service.recevoir_donnee(req, nbr_ticket, "tec3_");
        tec3_com = service.recevoir_donnee(req, nbr_ticket, "inpl16");
        note_tec = tec1;

        //sql = "insert into neocles_ticket(num, nom, id_fiche) values(1, 'test', 1)";
        //Insertion ticket et son nom dans la table ticket
        var sql = "select id as id_ticket, num from neocles_ticket where id_fiche = "+id_fiche;
        Neocles_fiche.query(sql, function(err, info_ticket){
            if(err) return res.send(err);
            for(var i = 1; i<=info_ticket.rowCount; i++ ){  
                id_ticket = info_ticket.rows[i-1].id_ticket;
                num_colone = info_ticket.rows[i-1].num;
                update_nom(id_ticket, nom_ticket[num_colone]);
                update_qualite(1, id_ticket, q1l1, q1l2, q1l3, q1l4, note_q1, num_colone);
                update_qualite(2, id_ticket, q2l5, q2l6, q2l7, q2l8, note_q2, num_colone);
                update_qualite(3, id_ticket, q3l12, q3l13, q3l14, q3l15, note_q3, num_colone);
                update_commentaire("q1", id_ticket, q1l1_com, q1l2_com, q1l3_com, num_colone, q1l4_com);
                update_commentaire("q2", id_ticket, q2l5_com, q2l6_com, q2l7_com, num_colone, q2l8_com);
                update_commentaire("q3", id_ticket, q3l12_com, q3l13_com, q3l14_com, num_colone, q3l15_com);
                update_commentaire("tec", id_ticket, tec1_com, tec2_com, tec3_com, num_colone);
                update_technicite(id_ticket, tec1, tec2, tec3, num_colone, note_tec);
                if(i == info_ticket.rowCount){
                    return res.redirect("/fiche_suivi_en_detail/update");
                }
            }
        })

        /*
        var id_ticket = 0 , num_colone=0, e=0;
        for(var i = 1; i<=nbr_ticket; i++ ){                      
            sql = "insert into neocles_ticket(num, nom, id_fiche) values ("+i+",'"+nom_ticket[i]+"',"+id_fiche+")";                   
            Neocles_fiche.query(sql, function(err){
                if(err) return res.send(err);
                e = e + 1;
                if(e == nbr_ticket){
                    donnee_ticket(id_fiche);
                    return res.redirect("/fiche_suivi_en_detail/create");
                }                
            })
        }
        */
                                    
        function update_nom(id_ticket, nom){
            var sql = "update neocles_ticket set nom ='"+nom+"' where id ="+id_ticket;
            Neocles_fiche.query(sql, function(err){
                if(err) return res.send(err);
            }) 
        }
        function update_qualite(num_qualite, id_ticket, q1, q2, q3, q4, note, num_colone){
            var sql = "update neocles_qualite set q1 ='"+q1[num_colone]+"', q2='"+q2[num_colone]+"', q3='"+q3[num_colone]+"', q4='"+q4[num_colone]+"', note="+note[num_colone]+" where id_ticket ="+id_ticket+" and num="+num_qualite;
            Neocles_fiche.query(sql, function(err){
                if(err) return res.send(err);
            })                     
        } 
        
        function update_commentaire(type, id_ticket, com1, com2, com3,  num_colone, com4 = ""){
            var sql;
            if(type == "tec"){
                sql = "update neocles_commentaire set com1='"+com1[num_colone]+"', com2='"+com2[num_colone]+"', com3='"+com3[num_colone]+"' where id_ticket ="+id_ticket+" and type='"+type+"' ";
            }
            else{
                sql = "update neocles_commentaire set com1='"+com1[num_colone]+"', com2='"+com2[num_colone]+"', com3='"+com3[num_colone]+"', com4='"+com4[num_colone]+"' where id_ticket ="+id_ticket;
            }
            Neocles_fiche.query(sql, function(err){
                if(err) return res.send(err);
            }) 
        }

        function update_technicite(id_ticket, t1, t2, t3, num_colone, note){
            if(!t1[num_colone] || t1[num_colone] == ''){
                t1[num_colone] = null;
            }
            var sql = "update neocles_technicite set t1="+t1[num_colone]+", t2='"+t2[num_colone]+"', t3='"+t3[num_colone]+"', note="+note[num_colone]+" where id_ticket = "+id_ticket;
            Neocles_fiche.query(sql, function(err){
                if(err) return res.send(err);
            }) 
        }
    },

    post_update_conformite: function(req, res){
        if (!req.session.user) return res.redirect('/login');
        var menu = [];
        menu["aceuil"]= "";
        menu["dossierAdmin"]= "";
        menu["gestionDossier"]= "";
        menu["statOpAdmin"]= "";
        menu["presence"]= "";
        menu["admin"]= "";
        const id = parseInt( req.session.user, 10);
        var id_pers = parseInt( req.param("id"), 10);
        var my = req.param("my");
        var nbr_ticket = req.param("ticket");
        var date_now = new Date().toISOString().slice(0,10);
        var date_ticke = new Date(my).toISOString().slice(0,10);
        function recevoir(req, nbr_ticket, name){
            var tab = [];
            for(var i=1; i<=nbr_ticket; i++){
                if(req.param(name+""+i) == undefined ){
                    tab[i] = "";
                }
                else{
                    tab[i] = req.param(name+""+i);
                }            
            }
            return tab;
        }

        var inactivite = recevoir(req, nbr_ticket, "inactivite");
        var auto_affect = recevoir(req, nbr_ticket, "affect");
        var id_ticket = recevoir(req, nbr_ticket, "id_ticket")

        function insertion_implication(id_ticket, inactivite, auto_affect){
            var sql = "insert into neocles_implication(id_ticket, inactivite, auto_affectation) values("+id_ticket+",'"+inactivite+"','"+auto_affect+"')";
            Neocles_fiche.query(sql, function(err){
                if(err) return res.send(err);
                
            })                     
        }

        function update_implication(id_ticket, inactivite, auto_affect){
            var sql = "update neocles_implication set inactivite = '"+inactivite+"', auto_affectation = '"+auto_affect+"' WHERE id_ticket = "+ id_ticket;
            Neocles_fiche.query(sql, function(err){
                if(err) return res.send(err);                
            })  
        }

        var implic = req.param("implic");
        var ina, aff, id_tic;
        for(var i = 1; i <= nbr_ticket; i++){
            ina = inactivite[i];
            aff = auto_affect[i];
            id_tic = id_ticket[i];
            if(implic[0] == 1 ){
                update_implication(id_tic, ina, aff);
            }
            else{
                insertion_implication(id_tic, ina, aff);
            }
            
        }
        
        return res.redirect("/fiche_suivi_de_conformite/update");
    }
}

