 $(function () {
    $('#containerByDossie').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Statistique de dossier'
        },
        subtitle: {
            text: 'Source: easytech.mg'
        },
        xAxis: {
            categories: dte,
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
            data: qte

        }, {
            name: 'Qualité',
            data: qlte

        }, {
            name: 'Vitesse brute',
            data: vb

        }, {
            name: 'Vitesse nette',
            data: vn

        }]
    });
});