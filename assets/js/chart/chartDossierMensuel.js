$(function () {
    
    $('#containerMensuel').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Heure prod'
        },
        xAxis: {
            categories: cars
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Temps consomé'
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
            name: 'Heure Prod',
            data: prod
        }, {
            name: 'Heure Hors Prod',
            data: hprod
        }]
    });
});