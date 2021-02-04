module.exports = {
    
    fiche_suivi_conformite: function(id_fiche){
        var id_fiche = id_fiche;
        var sql = "SELECT * FROM neocles_fiche WHERE id = "+id_fiche;
  
        Neocles_fiche.query( sql, function(err, resultat){
            if(err) return res.send(err);
            console.log("resultat : ");
            console.log(resultat);
            var donne = "metyyy";
            return donne;
        });
    },

    recevoir_donnee: function(req, nbr_ticket, name){
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
    },

    calcul_note: function(l1, l2, l3, l4, nbr_ticket) {
        function verif(l){
            if(!l || l=="" || l==null){
                return 0;
            }
            else{
                return parseInt(l,10);
            }
        }
        var note = [];
        for(var i=1; i<=nbr_ticket; i++){
            l1[i] = verif(l1[i]);
            l2[i] = verif(l2[i]);
            l3[i] = verif(l3[i]);
            l4[i] = verif(l4[i]);
            note[i] = l1[i] + l2[i] + l3[i] + l4[i];      
        }
        return note;
    }
}