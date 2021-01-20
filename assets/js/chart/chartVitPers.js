$(function () {
    $('#containerVitesseMensuel').highcharts({
        title: {
            text: 'Vitesse des operateur',
            x: -20 //center
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Vitesse (Heure)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 'Heure'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Vitesse Brute',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 220.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'Vitesse Nette',
            data: [0, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }]
    });
});