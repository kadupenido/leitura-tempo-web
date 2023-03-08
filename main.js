var url = 'https://leitura-tempo.onrender.com/leitura';

var Tvalues = [];
var Hvalues = [];
var timeStamp = [];

function getData() {
    $.get(url, function (data, status) {

        Tvalues = [];
        Hvalues = [];
        timeStamp = [];

        var tempMax = (Math.round(data.temperatura.maxima * 10) / 10) + '°C';
        var umidMax = (Math.round(data.umidade.maxima * 10) / 10) + '%';

        var tempMin = (Math.round(data.temperatura.minima * 10) / 10) + '°C';
        var umidMin = (Math.round(data.umidade.minima * 10) / 10) + '%';

        var tempMax = (Math.round(data.temperatura.maxima * 10) / 10) + '°C';
        var umidMax = (Math.round(data.umidade.maxima * 10) / 10) + '%';

        Tvalues.push(...data.leituras.map(f => f.temperatura));
        Hvalues.push(...data.leituras.map(f => f.umidade));
        timeStamp.push(...data.leituras.map(f => moment(f.data).format('DD/MM/YYYY HH:mm')));

        $('#temp').text('Atual: ' + tempMin);
        $('#umid').text('Atual: ' + umidMin);

        $('#tempMax').text('Maxima: ' + tempMax);
        $('#umidMax').text('Maxima: ' + umidMax);

        $('#tempMin').text('Minima: ' + tempMin);
        $('#umidMin').text('Minima: ' + umidMin);

        showGraph();
    });
}

function showGraph() {
    var ctx = document.getElementById("Chart").getContext('2d');
    var Chart2 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeStamp,
            datasets: [{
                label: "Temperatura",
                fill: false,  //Try with true
                backgroundColor: 'rgba( 243, 156, 18 , 1)', //Dot marker color
                borderColor: 'rgba( 243, 156, 18 , 1)', //Graph Line Color
                data: Tvalues,
            },
            {
                label: "Umidade",
                fill: false,  //Try with true
                backgroundColor: 'rgba(156, 18, 243 , 1)', //Dot marker color
                borderColor: 'rgba(156, 18, 243 , 1)', //Graph Line Color
                data: Hvalues,
            }],
        },
        options: {
            title: {
                display: false,
                text: ""
            },
            maintainAspectRatio: false,
            elements: {
                line: {
                    tension: 0.5 //Smoothening (Curved) of data lines
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}

setInterval(getData, 1000 * 60);

$(document).ready(function () {
    getData();
});
