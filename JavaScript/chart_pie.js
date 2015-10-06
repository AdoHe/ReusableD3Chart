var chart = c3.generate({
    bindto: '#chart',
    data: {
      columns: [
        ['success: 30', 30],
      ],
      type: 'pie',
    },
    legend: {
      show: true
    },
    color: {
      pattern: ['#aec7e8']
    }
});

setTimeout(function () {
    chart.load({
        columns: [
          ['success: 50', 50],
        ],
        unload: true
    });
}, 1000 * 10);
