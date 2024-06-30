// Name : Lin Htet
// Class: DIT/FT/1B/08
// Admin No: 2340304

import { loadAllDataByYear, displayTop10Degrees } from "./fetchData.js";

class MyDegreeList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
        <link rel ="stylesheet" href ="./css/requirementOne.css">
        <table id="degree-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>University</th>
              <th>School</th>
              <th>Degree</th>
              <th>Median</th>
            </tr>
          </thead>
          <tbody id="degree-list"></tbody>
        </table>
        <div id="noData" part="Nodata">Required Input Data!</div>
      `;
  }

  async fetchAndDisplayData(year) {
    const degreeList = this.shadowRoot.getElementById('degree-list');
    const noData = this.shadowRoot.getElementById('noData');
    degreeList.innerHTML = ''; // Clear previous data
    noData.innerHTML = '';
    try {
      if (year >= 2013 && year <= 2021) {
        const dataBySelectedYear = await loadAllDataByYear(year);
        const top10Data = displayTop10Degrees(dataBySelectedYear, 'basic_monthly_median', year);

        let indexCounter = 1; // Initialize the counter

        top10Data.forEach(degree => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${indexCounter}</td>
            <td>${degree.University}</td>
            <td>${degree.School}</td>
            <td>${degree.Degree}</td>
            <td>$${degree.Median.toFixed(2)}</td>
          `;
          degreeList.appendChild(row);

          indexCounter++; // Increment the counter for the next row
        });
      } else {
        throw new Error("❌ Error: Please enter a valid year between 2013 and 2021");
      }
    } catch (error) {
      alert(error.message);
    }
  }
}

customElements.define('my-degree-list', MyDegreeList);

document.getElementById('submitButton').addEventListener('click', () => {
  const year = document.getElementById('yearInput').value;
  const degreeList = document.querySelector('my-degree-list');
  degreeList.fetchAndDisplayData(year);
});
