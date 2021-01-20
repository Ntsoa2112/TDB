$(function () {
    $('#chartP').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Chart Globale des Presonnel en ce moment'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Connecter',
                y: 56.33+0.91
            }, {
                name: 'En pause',
                y: 24.03,
                sliced: true,
                selected: true
            }, {
                name: 'Absent',
                y: 10.38
            }, {
                name: 'Sans Dossier',
                y: 4.77+0.2
            }]
        }]
    });
});