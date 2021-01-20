/**
 * Created by 01020 on 11/11/2016.
 */

/*
Utilisation de la librairie echarts.js

<div id="idDiv"></div>

<script src="/js/echarts/theme.js"></script>
<script src="/js/echarts/echarts.js"></script>

<script>
 var legende = ["","",""];
 var data = [{name:"",value:""},{name:"",value:""},{name:"",value:""}]

 var echartTest = echarts.init(document.getElementById('idDiv'), theme);
 echartTest.setOption(getOptionPieCol(legende,data));

 </script>


 */

// echart pie
function getOptionPie(legende,data){
  return {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      x: 'center',
      y: 'bottom',
      data: legende
    },
    toolbox: {
      show: true,
      feature: {
        magicType: {
          show: true,
          type: ['pie', 'funnel'],
          option: {
            funnel: {
              x: '25%',
              width: '50%',
              funnelAlign: 'left',
              max: 1548
            }
          }
        },
        restore: {
          show: true,
          title: "Restore"
        },
        saveAsImage: {
          show: true,
          title: "Save Image"
        }
      }
    },
    calculable: true,
    series: [{
      name: '',
      type: 'pie',
      radius: '55%',
      center: ['50%', '48%'],
      data: data
    }]
  };
}

//echart line

function getOptionLine(legende,data){
  return  {
    title : {
      text: 'Graphe',
      subtext: ''
    },
    tooltip : {
      trigger: 'axis'
    },
    legend: {
      data:['Nombres']
    },
    toolbox: {
      show : true,
      feature : {
        mark : {show: true},
        magicType : {
          show: true,
          title: "Type",
          type: ['line', 'bar']
        },
        restore : {
          show: true,
          title: "Restore"
        },
        saveAsImage : {
          show: true,
          title: "Save"
        }
      }
    },
    calculable : true,
    xAxis : [
      {
        type : 'category',
        boundaryGap : false,
        data : legende
      }
    ],
    yAxis : [
      {
        type : 'value',
        axisLabel : {
          formatter: '{value}'
        }
      }
    ],
    series : [
      {
        name:'Nombre',
        type:'line',
        data:data,
        markPoint : {
          data : [
            {type : 'max', name: 'Max'},
            {type : 'min', name: 'Min'}
          ]
        },
        markLine : {
          data : [
            {type : 'average', name: '平均值'}
          ]
        }
      }
    ]
  };
}

//echart pie collapse
function getOptionPieCol(legende,data) {
  return {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    toolbox: {
      show: true,
      feature: {
        magicType: {
          show: true,
          type: ['pie', 'funnel']
        },
        restore: {
          show: false,
          title: "Restore"
        },
        saveAsImage: {
          show: false,
          title: "Save Image"
        }
      }
    },
    calculable: true,
    legend: {
      x: 'center',
      y: 'bottom',
      data: legende
    },
    series: [{
      name: '',
      type: 'pie',
      radius: [30, 100],
      center: ['50%', 200],
      roseType: 'area',
      x: '50%',
      max: 10,
      sort: 'ascending',
      data: data
    }]
  };
}

function getOptionPieColCq(legende,data,lgPos) {
  return {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    calculable: true,
    legend: {
      orient : 'vertical',
      x: lgPos,
      y: 'center',
      data: legende
    },
    toolbox: {
      show: true,
      mark : {show: true},
      dataView : {show: true, readOnly: false},
      feature: {
        magicType: {
          show: true,
          type: ['pie', 'funnel'],
          option: {
            funnel: {
              x: '25%',
              width: '50%',
              funnelAlign: 'center',
              max: 1548
            }
          }
        },
        restore: {
          show: true,
          title: "Restore"
        },
        saveAsImage: {
          show: true,
          title: "Save Image"
        }
      }
    },
    series: [{
      name: '',
      type: 'pie',
      radius: ['35%', '55%'],
      itemStyle: {
        normal: {
          label: {
            show: true
          },
          labelLine: {
            show: true
          }
        },
        emphasis: {
          label: {
            show: true,
            position: 'center',
            textStyle: {
              fontSize: '14',
              fontWeight: 'normal'
            }
          }
        }
      },
      data: data
    }]
  };
}


// echart donnut

function getOptionDonnut(legende,data){
  return {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    calculable: true,
    legend: {
      x: 'center',
      y: 'bottom',
      data: legende
    },
    toolbox: {
      show: true,
      feature: {
        magicType: {
          show: true,
          type: ['pie', 'funnel'],
          option: {
            funnel: {
              x: '25%',
              width: '50%',
              funnelAlign: 'center',
              max: 1548
            }
          }
        },
        restore: {
          show: true,
          title: "Restore"
        },
        saveAsImage: {
          show: true,
          title: "Save Image"
        }
      }
    },
    series: [{
      name: '',
      type: 'pie',
      radius: ['35%', '55%'],
      itemStyle: {
        normal: {
          label: {
            show: true
          },
          labelLine: {
            show: true
          }
        },
        emphasis: {
          label: {
            show: true,
            position: 'center',
            textStyle: {
              fontSize: '14',
              fontWeight: 'normal'
            }
          }
        }
      },
      data: data
    }]
  };
}


//echart stacked bar

function getOptionSTKBar(legende,data){
  return {
    tooltip : {
      trigger: 'axis',
      axisPointer : {            //
        type : 'shadow'        //
      }
    },
    legend: {
      data:['renfort', 'principale']
    },
    toolbox: {
      show : true,
      feature : {
        mark : {show: true},
        /*dataView : {
          show: true,
          readOnly: false,
          title: "data"
        },*/
       // magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
        restore : {
          show: true,
          title: "Restore"
        },
        saveAsImage : {
          show: true,
          title: "Save image"
        }
      }
    },
    calculable : true,
    xAxis : [
      {
        type : 'value'
      }
    ],
    yAxis : [
      {
        type : 'category',
        data : legende

      }
    ],
    series : data
  };
}

function getOptionSTKBar2_0(legende,data,label){
  return {
    tooltip : {
      trigger: 'axis',
      axisPointer : {            //
        type : 'shadow'        //
      }
    },
    legend: {
      data:label
    },
    toolbox: {
      show : true,
      feature : {
        mark : {show: true},
        /*dataView : {
         show: true,
         readOnly: false,
         title: "data"
         },*/
        // magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
        restore : {
          show: true,
          title: "Restore"
        },
        saveAsImage : {
          show: true,
          title: "Save image"
        }
      }
    },
    calculable : true,
    xAxis : [
      {
        type : 'value'
      }
    ],
    yAxis : [
      {
        type : 'category',
        data : legende

      }
    ],
    series : data
  };
}

function getOptionBarThermo(legende,data,label){
  return {
    tooltip : {
      trigger: 'axis',
      axisPointer : {            //
        type : 'shadow'        //
      },
      formatter: function (params){
        return params[0].name + '<br/>'
          + params[0].seriesName + ' : ' + params[0].value + '<br/>';
      }
    },
    legend: {
      selectedMode:false,
      data:['Fait']
    },
    toolbox: {
      show : true,
      feature : {
        mark : {show: true},
        /*dataView : {
         show: true,
         readOnly: false,
         title: "data"
         },*/
        // magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
        restore : {
          show: true,
          title: "Restore"
        },
        saveAsImage : {
          show: true,
          title: "Save image"
        }
      }
    },
    calculable : true,
    xAxis : [
      {
        type : 'category',
        data : legende
      }
    ],
    yAxis : [
      {
        type : 'value',
        boundaryGap: [0, 0.1]
      }
    ],
    series : data
  };
}

function optHighchart(legende,data) {
  return {
    chart: {
      type: 'column'
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: legende
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Quantite'
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
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y} heurs<br/>Total: {point.stackTotal} heurs'
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
      }
    },
    series: [{
      name: 'Quantite',
      data: data
    }]
  };
}

function optHighchartMultiple(legende,data) {
  return {
    chart: {
      type: 'column'
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: legende
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Quantite'
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
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y} heurs<br/>Total: {point.stackTotal} heurs'
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
      }
    },
    series: data
  };
}


