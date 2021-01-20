$(function () {

    $(document).ready(function () {

        // Build the chart
        $('#containerHeure').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Rapport sur les heures productives'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'Heure productive',
                    y: 56.33
                }, {
                    name: 'Formation',
                    y: 24.03,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Pause',
                    y: 10.38
                }, {
                    name: 'Panne réseau',
                    y: 4.77
                }, {
                    name: 'Réunion',
                    y: 0.91
                }, {
                    name: 'Test application',
                    y: 0.2
                }]
            }]
        });
    });
});