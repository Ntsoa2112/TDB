/**
 * Created by 01020 on 11/11/2016.
 */


var timerDelay = parseInt(document.getElementById("timereload").value);

var interval =  setInterval(reloadVariable, timerDelay * 1000)
$( "#timereload" )
  .keyup(function() {
    var value = $( this ).val();
    timerDelay = parseInt(value);
    clearInterval(interval);
    interval =  setInterval(reloadVariable, timerDelay * 1000)
    console.log("change timer");
  })
  .keyup();


//$("#tbPers").html(""+htm_upd_modal);
// function pour le rafraichissement des pages
//alert(timerDelay*1000);

function reloadVariable() {
  var data = [];
  var rs_dossierCl = [];
  var rs_dossierAl = [];
  var rs_conge = [];
  var rs_conneced = [];
  var rs_ptconneced = [];
  var rs_inLdt = [];
  var ret = [];
  var pres = [];
  var lp = [];
  var data_stat = [];

  //recuperation des donnée avec REST URL json;
  $.ajax({
    type: "GET",
    url: "/get_data_dash_suivis",
    beforeSend: function(xhr){
    },
    success: function(msg){


      //affectation dans le variable data
      data = msg;

      rs_dossierCl = data.dossCl;
      rs_dossierAl = data.dossAl;
      rs_conge = data.listeConge;
      rs_conneced = data.listePersonneConnected;
      rs_ptconneced = data.listeinPtConnected;
      rs_inLdt = data.listeinLdtConnected;
      ret = data.retard;
      pres = data.present;
      lp = data.pers;

        data_stat = data.statusPers;
        htm_upd_modal = "";
        htm_upd_modal_pt_ok = "";
        htm_upd_modal_pt_nok = "";
        htm_upd_modal_pt_gpao = "";
        htm_upd_modal_pt_gpao_nok = "";

  //alert(JSON.stringify(data_status));
      for(var i=0;i<data_stat.length;i++){
          var str_gpao = "";
          var str_gpao_bio = "";
            var str_gpao_ct = "";
        if(data_stat[i].connecting != '' && data_stat[i].connecting != null){
          str_gpao_ct = data_stat[i].connecting;
        }
          if(data_stat[i].connected == true){
              str_gpao = "<i class='fa fa-check'></i>";
              htm_upd_modal_pt_gpao += "<tr><td>"+data_stat[i].appelation+"</td><td>"+data_stat[i].id_pers+"</td><td>"+data_stat[i].libelle+"</td><td>"+str_gpao_ct+"</td><td><i class='fa fa-check'></i></td><td><i class='fa fa-check'></i></td></tr>";
          }

          if(data_stat[i].pt != null){
              str_gpao_bio = "<i class='fa fa-check'></i>";
              htm_upd_modal_pt_ok += "<tr><td>"+data_stat[i].appelation+"</td><td>"+data_stat[i].id_pers+"</td><td>"+data_stat[i].libelle+"</td><td>"+str_gpao_ct+"</td><td>"+str_gpao+"</td><td>"+str_gpao_bio+"</td></tr>";
              if(data_stat[i].connected == false){
                htm_upd_modal_pt_gpao_nok += "<tr><td>"+data_stat[i].appelation+"</td><td>"+data_stat[i].id_pers+"</td><td>"+data_stat[i].libelle+"</td><td>"+str_gpao_ct+"</td><td></td><td><i class='fa fa-check'></i></td></tr>";
              }
          }else{
              htm_upd_modal_pt_nok += "<tr><td>"+data_stat[i].appelation+"</td><td>"+data_stat[i].id_pers+"</td><td>"+data_stat[i].libelle+"</td><td>"+str_gpao_ct+"</td><td>"+str_gpao+"</td><td></td></tr>";
          }
            htm_upd_modal += '<tr><td>'+data_stat[i].appelation+'</td><td>'+data_stat[i].id_pers+'</td><td>'+data_stat[i].libelle+'</td><td>'+str_gpao_ct+'</td><td>'+str_gpao+'</td><td>'+str_gpao_bio+'</td></tr>';

     }
      //chagement des dashboard numerique

      $("#nbconge").html(""+rs_conge.length);
      $("#nbpointage").html(""+(rs_conneced.length-rs_ptconneced.length));
      $("#nbactif").html(""+(rs_conneced.length));
      $("#nbpointagebio").html(""+(rs_ptconneced.length));
      $("#nbgpao").html(""+rs_inLdt.length);
      $("#nbgpaonok").html(""+(rs_ptconneced.length));
      $("#nbdossier").html(""+(rs_dossierAl.length+rs_dossierCl.length));
      $("#nbdosAl").html("Connectés par dossier("+rs_dossierAl.length+")");
      $("#nbdosCl").html("Connectés par dossier("+rs_dossierCl.length+")");

      //operation au niveau de retard
      var objRetA = {name:'retard(s)',value:ret};
      var objNormalA = {name:'Normale(s)',value:lp-ret};
      var objAbseA = {name:'Absent(s)',value:lp-pres};
      var d_retard = [objRetA,objNormalA,objAbseA];
      var l_retard = ['retard(s)','Normale(s)','Absent(s)'];

      //operation au niveau des dossiers
      //Almerys
      var l_dossierAl = [];
      var d_dossierAl = [];
      for(var i = 0; i<rs_dossierAl.length ;i++){
        l_dossierAl.push(rs_dossierAl[i].num_dossier);
        var obdata = {};
        obdata.value = rs_dossierAl[i].pers;
        obdata.name = rs_dossierAl[i].num_dossier;
        d_dossierAl.push(obdata)
      }
      //Classique

      var l_dossierCl = [];
      var d_dossierCl = [];
      for(var i = 0; i<rs_dossierCl.length ;i++){
        l_dossierCl.push(rs_dossierCl[i].num_dossier);
        var obdata = {};
        obdata.value = rs_dossierCl[i].pers;
        obdata.name = rs_dossierCl[i].num_dossier;
        d_dossierCl.push(obdata)
      }

      // operation au niveau des congés
      var l_type_conge = [];
      var d_type_conge = [];
      var last_conge = null;
      var cout_conge = 0;

      for(var i = 0; i< rs_conge.length ;i++){

        if(last_conge!=rs_conge[i].type_conge){

          if(last_conge!=null){
            l_type_conge.push(last_conge);
            var objectdata = {};
            objectdata.value = cout_conge;
            objectdata.name = last_conge;
            d_type_conge.push(objectdata);
            cout_conge = 1;
          }else{

            cout_conge ++;
          }

          last_conge = rs_conge[i].type_conge;
          if(i==rs_conge.length-1){

            l_type_conge.push(last_conge);
            var objectdata = {};
            objectdata.value = cout_conge;
            objectdata.name = last_conge;
            d_type_conge.push(objectdata);
          }


        }else{
          cout_conge ++;
          if(i==rs_conge.length-1){

            l_type_conge.push(last_conge);
            var objectdata = {};
            objectdata.value = cout_conge;
            objectdata.name = last_conge;
            d_type_conge.push(objectdata);
          }
        }
      }


      //setting option
      //Almerys
      var opt_dossierAl = getOptionPieCol(l_dossierAl,d_dossierAl);
      echartPieCollapseAl.setOption(opt_dossierAl);
      //classique

      var opt_dossierCl = getOptionPieCol(l_dossierCl,d_dossierCl);
      echartPieCollapseCl.setOption(opt_dossierCl);

      var opt_conge = getOptionPie(l_type_conge,d_type_conge);
      echartPie.setOption(opt_conge);


      var opt_ret = getOptionDonnut(l_retard,d_retard);
      echartDonut.setOption(opt_ret);

      //alert(JSON.stringify(lp));
      //alert("mande");
    },
    error: function (error) {
      //alert('error; ' +error);
    }
  });


}

//-----------fin function

//Almerys
var legende_dossierAl = [];
var data_dossierAl = [];
for(var i = 0; i<res_dossierAl.length ;i++){
  legende_dossierAl.push(res_dossierAl[i].num_dossier);
  var objectdata = {};
  objectdata.value = res_dossierAl[i].pers;
  objectdata.name = res_dossierAl[i].num_dossier;
  data_dossierAl.push(objectdata)
}

//classique
var legende_dossierCl = []
var data_dossierCl = [];
for(var i = 0; i<res_dossierCl.length ;i++){
  legende_dossierCl.push(res_dossierCl[i].num_dossier);
  var objectdata = {};
  objectdata.value = res_dossierCl[i].pers;
  objectdata.name = res_dossierCl[i].num_dossier;
  data_dossierCl.push(objectdata)
}

//alert(JSON.stringify(res_conge));

var legende_type_conge = [];
var data_type_conge = [];
var last_conge = null;
var cout_conge = 0;

for(var i = 0; i< res_conge.length ;i++){
  //

  //compter conger par type_conge
  if(last_conge!=res_conge[i].type_conge){

    if(last_conge!=null){
      legende_type_conge.push(last_conge);
      var objectdata = {};
      objectdata.value = cout_conge;
      objectdata.name = last_conge;
      data_type_conge.push(objectdata);
      cout_conge = 1;
    }else{

      cout_conge ++;
    }

    last_conge = res_conge[i].type_conge;
    if(i==res_conge.length-1){

      legende_type_conge.push(last_conge);
      var objectdata = {};
      objectdata.value = cout_conge;
      objectdata.name = last_conge;
      data_type_conge.push(objectdata);
    }


  }else{
    cout_conge ++;
    if(i==res_conge.length-1){

      legende_type_conge.push(last_conge);
      var objectdata = {};
      objectdata.value = cout_conge;
      objectdata.name = last_conge;
      data_type_conge.push(objectdata);
    }
  }
}


var objRet = {name:'retard(s)',value:retvalue};
var objNormal = {name:'Normale(s)',value:lpersvalue-retvalue};
var objAbse = {name:'Absent(s)',value:lpersvalue-presvalue};

var data_retard = [objRet,objNormal,objAbse];
var legende_retard = ['retard(s)','Normale(s)','Absent(s)'];

//alert(JSON.stringify(data_type_conge));



//Almerys
var echartPieCollapseAl = echarts.init(document.getElementById('echart_pieAl'), theme);
echartPieCollapseAl.setOption(getOptionPieCol(legende_dossierAl,data_dossierAl));

//Classique

var echartPieCollapseCl = echarts.init(document.getElementById('echart_pieCl'), theme);
echartPieCollapseCl.setOption(getOptionPieCol(legende_dossierCl,data_dossierCl));

//retard
var echartDonut = echarts.init(document.getElementById('echart_donut'), theme);
echartDonut.setOption(getOptionDonnut(legende_retard,data_retard));

//Congé

var categorie_donut_data =data_type_conge;
var echartPie = echarts.init(document.getElementById('echart_pie'), theme, categorie_donut_data);
echartPie.setOption(getOptionPie(legende_type_conge,categorie_donut_data));


