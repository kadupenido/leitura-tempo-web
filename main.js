var url = 'https://leitura-tempo.onrender.com/leitura';

var Tvalues = [];
var Hvalues = [];
var timeStamp = [];

function getData() {

    var url2 = url + '?dataInicio=' + $('#dataInicio').val() + '&dataFim=' + $('#dataFim').val();

    $.get(url2, function (data, status) {

        Tvalues = [];
        Hvalues = [];
        timeStamp = [];

        var tempMax = (Math.round(data.temperatura.maxima * 10) / 10) + '°C';
        var umidMax = (Math.round(data.umidade.maxima * 10) / 10) + '%';

        var tempMin = (Math.round(data.temperatura.minima * 10) / 10) + '°C';
        var umidMin = (Math.round(data.umidade.minima * 10) / 10) + '%';

        Tvalues.push(...data.leituras.map(f => f.temperatura));
        Hvalues.push(...data.leituras.map(f => f.umidade));
        timeStamp.push(...data.leituras.map(f => moment(f.data).format('DD/MM/YYYY HH:mm')));

        var temp = (Math.round(Tvalues[Tvalues.length - 1] * 10) / 10) + '°C';
        var umid = (Math.round(Hvalues[Hvalues.length - 1] * 10) / 10) + '°C';

        $('#temp').text('Atual: ' + temp);
        $('#umid').text('Atual: ' + umid);

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
                backgroundColor: '#FF3853', //Dot marker color
                borderColor: '#FF3853', //Graph Line Color
                data: Tvalues,
            },
            {
                label: "Umidade",
                fill: false,  //Try with true
                backgroundColor: '#00B050', //Dot marker color
                borderColor: '#00B050', //Graph Line Color
                data: Hvalues,
            }],
        },
        options: {
            title: {
                display: false,
                text: ""
            },
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        suggestedMin: 15,
                        suggestedMax: 80,
                    }
                }]
            }
        }
    });

}

setInterval(getData, 1000 * 15);

$(document).ready(function () {

    $('#dataInicio').val(moment().subtract(8, 'Hour').format('YYYY-MM-DD HH:mm'));
    $('#dataFim').val(moment().format('YYYY-MM-DD HH:mm'));

    getData();
});

