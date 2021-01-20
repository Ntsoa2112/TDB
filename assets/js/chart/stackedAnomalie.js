
function stackHigh(){

  /*console.log("mat:"+JSON.stringify(mat));
  console.log("npom:"+JSON.stringify(pbom));
  console.log("npim:"+JSON.stringify(pbim));
  console.log("abs:"+JSON.stringify(abs));
  console.log("ret:"+JSON.stringify(retard));
  console.log("ag:"+JSON.stringify(ag));*/

  var data = [1,0,2,0,6,0,2,5];


  //convertir les donnees
  for(var key in data){

  }

  var option = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'STAT Anomalie OP'
    },
    xAxis: {
      categories: mat
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Nombres'
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
        }
      }
    },
    legend: {
      align: 'right',
      x: -30,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false
    },
    tooltip: {
      headerFormat: '<b>Matricule:{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y} <br/>Total: {point.stackTotal} '
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
          style: {
            textShadow: '0 0 3px black'
          }
        }
      },series: {
        cursor: 'pointer',
        point: {
          events: {
            click: function(e) {
              goDet(mat[Math.floor(this.x)])

              //alert(''+);
              //this.update({ color: '#f00' }, true, false)
            }
          }
        }
      }
    },
    series: [{
      name: 'Pointage BIO OUT manquant',
      data: pbom
    }, {
      name: 'Pointage BIO IN manquant',
      data: pbim
    }, {
      name: 'Retard',
      data: retard
    }, {
      name: 'Absent',
      data: abs
    }, {
      name: 'Anomalie GPAO',
      data: ag
    }]
  };
  Highcharts.chart('anomChart',option);
  //$('#'+idElement).highcharts();
}
$(document).ready(function() {

  stackHigh();
});
