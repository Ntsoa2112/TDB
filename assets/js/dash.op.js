/**
 * Created by 01020 on 12/12/2016.
 */
var timerDelay = parseInt(document.getElementById("timereload").value);

var interval =  setInterval(reloadVariable, 60 * 1000)
$( "#timereload" )
  .keyup(function() {
    var value = $( this ).val();
    timerDelay = parseInt(value);
    clearInterval(interval);
    interval =  setInterval(reloadVariable, timerDelay * 1000)
    console.log("change timer");
  })
  .keyup();

function reloadVariable() {

  $.ajax({
    type: "GET",
    url: "/ldtByOpJson?idpers="+idpers,
    beforeSend: function(xhr){
    },
    success: function(data){
      /*recuperation des liste des pointage*/
      var dataPointage = data.pointage;
      var h_theorique = '';

      /* diferenciation des in de out*/
      var listIn = [];
      var listOut = [];
      for (var i = 0; i<dataPointage.length ;i++){
        h_theorique = dataPointage[i].horaire_journaliere;
        if((dataPointage[i]['source']).indexOf("IN")===0){
          listIn.push(dataPointage[i]['entree']);
        }else{
          listOut.push(dataPointage[i]['entree']);
        }
      }

      /* factorisation des anomalies*/

      /*calcule de reel pointage*/
      var tableIn =[];
      var tableOut =[];

      var lastIn = null;
      var lastOut = null;
      //recuperation de la liste exacte des heures de pointages sans doublons
      for (var i = 0;i<listIn.length;i++){
        if(lastIn !== null){
          var lastInsplit = lastIn.split(":");
          var linNum = new Date().setHours(parseInt(lastInsplit[0]), parseInt(lastInsplit[1]), parseInt(lastInsplit[2]));
          var Insplit = listIn[i].split(":");
          var inNum = new Date().setHours(parseInt(Insplit[0]), parseInt(Insplit[1]), parseInt(Insplit[2]));
          //comparaison par rapport au last In si la #ce entre in[i] et lastIn < 1 Min
          if(((inNum-linNum)/1000)/60 > 1/*min*/){
            //on affecte in[i] dans lastIn et dans tableIn
            lastIn  = listIn[i];
            tableIn.push(lastIn);

          }
        }else{
          lastIn  = listIn[i];
          tableIn.push(lastIn);
        }
      }

      for (var i = 0;i<listOut.length;i++){

        if(lastOut !== null){
          var lastOutsplit = lastOut.split(":");
          var loutNum = new Date().setHours(parseInt(lastOutsplit[0]), parseInt(lastOutsplit[1]), parseInt(lastOutsplit[2]));
          var Outsplit = listOut[i].split(":");
          var outNum = new Date().setHours(parseInt(Outsplit[0]), parseInt(Outsplit[1]), parseInt(Outsplit[2]));
          //comparaison par rapport au lastOut si la #ce entre out[i] et lastOut < 1 Min
          if(((outNum-loutNum)/1000)/60 > 1/*min*/){
            //on affecte out[i] dans lastOut et dans tableOut
            lastOut  = listOut[i];
            tableOut.push(lastOut);

          }
        }else{

          lastOut  = listOut[i];
          tableOut.push(lastOut);
        }
      }

      var th_split = h_theorique.split(":");
      var dure_theorique = 1000 * (parseInt(th_split[0])*60*60+parseInt(th_split[1])*60+parseInt(th_split[1]));

      /*calcule de reel pointage*/
      var  dur_tmp = 0;
      for(var i=0 ; i<tableIn.length;i++) {
        if (tableIn.length < tableOut.length) {
          console.log("anomalie pointage");
        } else {
          var date_in_tmp = new Date();
          var date_out_tmp = new Date();
          var in_split = tableIn[i].split(":");
          date_in_tmp.setHours(parseInt(in_split[0]), parseInt(in_split[1]), parseInt(in_split[2]));
          var out_split = [];
          if (typeof tableOut[i] === "undefined") {

          } else {
            out_split = tableOut[i].split(":");
            date_out_tmp.setHours(parseInt(out_split[0]), parseInt(out_split[1]), parseInt(out_split[2]));
          }
          var tmp = dateDiff(date_in_tmp, date_out_tmp);
          dur_tmp += (date_out_tmp - date_in_tmp);

          console.log("temp : " + (date_out_tmp - date_in_tmp));
          console.log(date_in_tmp);
          console.log(date_out_tmp);
        }
      }
      var h_cons =  format(dur_tmp);
      var charDuree = ""+h_cons.hour+":"+h_cons.min+":"+h_cons.sec;

      var h_tot = dure_theorique;
      var dtt = h_tot - dur_tmp;
      console.log(dur_tmp);
      var p_time = 0;
      if(h_tot!=0){
        p_time = (dur_tmp/h_tot)*100;
      }
      gauge1.update(p_time);
      if((h_tot - dur_tmp)<0){
        dtt = 0;
      }
      var h_rest = format(dtt);
      console.log(h_tot);
      console.log(dur_tmp);
      var charRest = ""+h_rest.hour+":"+h_rest.min+":"+h_rest.sec;

      var dateNow = new Date();
      var charRest = ""+h_rest.hour+":"+h_rest.min+":"+h_rest.sec;
      var d_split = charRest.split(":");
      dateNow.setHours(dateNow.getHours()+parseInt(d_split[0]),  dateNow.getMinutes()+parseInt(d_split[1]),  dateNow.getSeconds()+parseInt(d_split[2]));
      $("#cons").html(""+charDuree);
      $("#rest").html(""+charRest);
      $("#htheorique").html(""+h_theorique);
      $("#fin").html(""+dateNow.getHours()+":"+dateNow.getMinutes()+":"+dateNow.getSeconds());
    },
    error: function (error) {
      //alert('error; ' +error);
    }
  });




}
/*********************************************************************************************/
function dateDiff(date1, date2){
  var diff = {}                           // Initialisation du retour
  var tmp = date2 - date1;

  tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
  diff.sec = tmp % 60;                    // Extraction du nombre de secondes

  tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
  diff.min = tmp % 60;                    // Extraction du nombre de minutes

  tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
  diff.hour = tmp % 24;                   // Extraction du nombre d'heures

  tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
  diff.day = tmp;

  return tmp;
}
/*************************************************************************************/
function format(duree){
  var diff = {};
  duree = Math.floor(duree/1000);             // Nombre de secondes entre les 2 dates
  diff.sec = duree % 60;                    // Extraction du nombre de secondes

  duree = Math.floor((duree-diff.sec)/60);    // Nombre de minutes (partie entière)
  diff.min = duree % 60;                    // Extraction du nombre de minutes

  duree = Math.floor((duree-diff.min)/60);    // Nombre d'heures (entières)
  diff.hour = duree % 24;                   // Extraction du nombre d'heures

  duree = Math.floor((duree-diff.hour)/24);   // Nombre de jours restants
  diff.day = duree;

  return diff;
}
/******************************************************************************************/
