/**
 * Created by 01020 on 11/11/2016.
 */


//var interval =  setInterval(reloadVariable, 4 * 1000)



//$("#tbPers").html(""+htm_upd_modal);
// function pour le rafraichissement des pages
//alert(timerDelay*1000);

function reloadVariable() {
  var data = null;
  //recuperation des donnée avec REST URL json;
  $.ajax({
    type: "GET",
    url: "/jsonDossier?dossier="+id_doss+"&datedeb="+pdate+"&datefin="+pdate+"&matricule="+mat,
    beforeSend: function(xhr){
    },
    success: function(msg){


      //affectation dans le variable data
      data = JSON.parse(msg);
      console.log(data);
      var vop = data.vop;
      var etape = data.etapes;
      var dossier = data.dossier;
      if(dossier!=null){

        var dureeTot = 0;
        var vitCibleTot = 0;
        var qteCibleTot = 0;
        for (var ii = 0; ii < vop.length; ii++) {
          dureeTot += Number(vop[ii].duree);
        }
        for(var ii = 0; ii<etape.length;ii++){
          vitCibleTot += Number(etape[ii].vitesse);
          qteCibleTot += Number(etape[ii].quantite_journalier);
        }
        //parcour du vop resultat des ldt

        var qteTotal = 0;
        for (var cpt = 0; cpt<vop.length;cpt++){
          qteTotal+=Number(vop[cpt].qte);
        }


        var pQuantite = 0;
        if(Number(dossier.volume_prevue)!=0){
          pQuantite = ((qteTotal)/Number(qteCibleTot))*100;
        }


        var nbQUpdate = qteTotal*100/qteCibleTot;

        LiquiQdGlobal.update(nbQUpdate);
//calcule vitesse globale



        //vitCibleTot=vitCibleTot/etape.length;
        var vitesGlobal = 0;
        if(dureeTot!=0){
          vitesGlobal = Math.round(qteTotal/(dureeTot/3600),2);
        }
        //alert(vitesGlobal);
        var nbUpdate = Math.round(vitesGlobal*100/vitCibleTot,2);
        PowerVitesseG.update(nbUpdate);
        //goPowerGauge('vittesse'+dossier.id_dossier,vitCibleTot,valu);

        //parcour pour les etapes

        for (var tt = 0; tt < etape.length; tt++) {
          var qteEtape = 0;

          var vitCibleEtap = 0;
          vitCibleEtap = etape[tt].vitesse;
          var dureEtape = 0;
          for (var cpt = 0; cpt < vop.length; cpt++) {
            if (etape[tt]['libelle'] == vop[cpt]['libelle']) {
              if (etape[tt]['qte'] != null && etape[tt]['qte'] != '') {
                console.log('===============>' + etape[tt]['id_lien'] + ':' + vop[cpt]['qte']);

              }
              qteEtape = qteEtape + Number(vop[cpt]['qte']);//Number(vop[cpt]['qte']);
              dureEtape += Number(vop[cpt].duree);
            }
          }
          var pqEtape = 0;
          if (Number(dossier.volume_prevue) != 0) {
            if (qteEtape != 0 && Number(dossier.volume_prevue) != 0) {
              pqEtape = (qteEtape / Number(dossier.volume_prevue)) * 100;
            }
          }
          dureEtape = dureEtape / 3600;

          var vitEtape = 0;
          if (dureEtape != 0) {
            vitEtape = Math.round(qteEtape / dureEtape, 2);
          }
          /*LiquiQEtape[tt].update(pqEtape);
           PowerVEtape[tt].update(vitEtape);*/
          console.log("index:"+tt)
          //LiquiQEtape[tt].update(pqEtape);
          loadRang(id_doss,etape[tt]['id_etape'],""+pdate,"rang"+tt);
          //PowerVEtape[Number(tt)].update(vitEtape);

        }
      }

      //Console.log(data);
      //alert(JSON.stringify(lp));
      //alert("mande");
    },
    error: function (error) {
      //alert('error; ' +error);
    }
  });


}


