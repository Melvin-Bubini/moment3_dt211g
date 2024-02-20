"use strict";

import Chart from 'chart.js/auto'; // Importera Chart.js

const url = 'https://studenter.miun.se/~mallar/dt211g/';

window.onload = init;

async function init() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const chartEl = document.getElementById('myChart');

        // Filtrera ut bara kurser
        const kurser = data.filter(item => item.type === 'Kurs');

        // Sortera kurser baserat på applicantsTotal i fallande ordning
        const sortedKurser = kurser.sort((a, b) => b.applicantsTotal - a.applicantsTotal);

        // Välj de första sex kurserna från den sorterade listan
        const topSixKurser = sortedKurser.slice(0, 6);

        new Chart(chartEl, {
            type: 'bar',
            data: {
                labels: topSixKurser.map(kurs => kurs.name),
                datasets: [{
                    label: '# of Applicants',
                    data: topSixKurser.map(kurs => kurs.applicantsTotal),
                    borderWidth: 1
                }]
            }
        });
    }
    catch {
        document.getElementById("error").innerHTML = "<p>Något gick fel</p>";
    }
}
