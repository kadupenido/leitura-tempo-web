function getData() {

  var dataIni = moment($('#dataInicio').val()).toISOString();
  var dataFim = moment($('#dataFim').val()).toISOString();

  var url = 'https://leitura-tempo.onrender.com/leitura?dataInicio=' + dataIni + '&dataFim=' + dataFim;

  $.get(url, function (data, status) {

    var Tvalues = [];
    var Hvalues = [];
    var timeStamp = [];

    var tempMax = (Math.round(data.temperatura.maxima * 10) / 10) + '°C';
    var umidMax = (Math.round(data.umidade.maxima * 10) / 10) + '%';

    var tempMin = (Math.round(data.temperatura.minima * 10) / 10) + '°C';
    var umidMin = (Math.round(data.umidade.minima * 10) / 10) + '%';

    Tvalues.push(...data.leituras.map(f => (Math.round(f.temperatura * 10) / 10)));
    Hvalues.push(...data.leituras.map(f => (Math.round(f.umidade * 10) / 10)));
    timeStamp.push(...data.leituras.map(f => moment(f.data).format('DD/MM/YYYY HH:mm')));

    var temp = (Math.round(Tvalues[Tvalues.length - 1] * 10) / 10) + '°C';
    var umid = (Math.round(Hvalues[Hvalues.length - 1] * 10) / 10) + '°C';

    $('#temp').text('Atual: ' + temp);
    $('#umid').text('Atual: ' + umid);

    $('#tempMax').text('Maxima: ' + tempMax);
    $('#umidMax').text('Maxima: ' + umidMax);

    $('#tempMin').text('Minima: ' + tempMin);
    $('#umidMin').text('Minima: ' + umidMin);

    var options = {
      chart: {
        type: 'area',
        stacked: false,
        height: 450,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },
      series: [{
        name: 'Temperatura',
        data: Tvalues
      }, {
        name: 'Umidade',
        data: Hvalues
      }],
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
      },
      xaxis: {
        categories: timeStamp
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        },
      },
    }

    var chart = new ApexCharts(document.querySelector("#chart_div"), options);

    chart.render();
  });
}

$(document).ready(function () {

  $('#dataInicio').val(moment().subtract(8, 'Hour').format('YYYY-MM-DD HH:mm'));
  $('#dataFim').val(moment().format('YYYY-MM-DD HH:mm'));

  getData();
});