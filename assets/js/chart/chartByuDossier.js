$(function () {
    $('#containerByDossier').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Monthly Average Rainfall'
        },
        subtitle: {
            text: 'Source: easytech.mg'
        },
        xAxis: {
            categories: [
                'Lun',
                'Mar',
                'Mer',
                'Jeu',
                'Ven',
                'Sam'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Quantité',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0]

        }, {
            name: 'Qualité',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5]

        }, {
            name: 'Vitesse brute',
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3]

        }, {
            name: 'Vitesse nette',
            data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5]

        }]
    });
});