"use strict";

import Chart from 'chart.js/auto'; // Importera Chart.js

const url = 'https://studenter.miun.se/~mallar/dt211g/';

window.onload = init;

async function init() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const barchartEl = document.getElementById('barChart');
        const doughnutChartEl = document.getElementById('doughnutChart')

        // Filtrera ut bara kurser och program
        const kurser = data.filter(item => item.type === 'Kurs');
        const program = data.filter(item => item.type === 'Program');

        // Sortera kurser och program baserat på applicantsTotal i fallande ordning
        const sortedKurser = kurser.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
        const sortedProgram = program.sort((a, b) => b.applicantsTotal - a.applicantsTotal);

        // Välj de första sex kurserna och fem programmen från den sorterade listan
        const topSixKurser = sortedKurser.slice(0, 6);
        const topSixProgram = sortedProgram.slice(0, 5);

        new Chart(barchartEl, {
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

        new Chart(doughnutChartEl, {
            type: 'bar',
            data: {
                labels: topSixProgram.map(program => program.name),
                datasets: [{
                    label: '# of Applicants',
                    data: topSixProgram.map(program => program.applicantsTotal),
                    borderWidth: 1
                }]
            }
        });
    }
    catch {
        document.getElementById("error").innerHTML = "<p>Något gick fel</p>";
    }
}
