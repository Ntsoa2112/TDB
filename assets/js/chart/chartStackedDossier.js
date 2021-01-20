$(function () {
    $('#containerEtape').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Avencement des Etapes du dossier'
        },
        xAxis: {
            categories: etape
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Pourcentage'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'vitesse',
            data: dataetape
        }]
    });
});
