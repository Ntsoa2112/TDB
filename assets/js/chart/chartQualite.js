$(function () {
    $('#containerQualite').highcharts({
        title: {
            text: 'Qualité'
        },

        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'May',
                'Jun',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            crosshair: true
        },

        yAxis: {
            type: 'logarithmic',
            minorTickInterval: 0.1
        },

        tooltip: {
            headerFormat: '<b>{series.name}</b><br />',
            pointFormat: 'x = {point.x}, y = {point.y}'
        },

        series: [{
            name: 'Qualité',
            data: [1, 54, 40, 8, 16, 32, 64, 128, 256, 512]
         },{
            name: 'Quantité',
            data: [6, 215, 60, 8, 716, 32, 64, 128, 25, 51]
         }
         ]
    });
});
