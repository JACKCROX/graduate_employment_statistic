// Name : Lin Htet
// Class: DIT/FT/1B/08
// Admin No: 2340304

import { getByUniversityAndYear, displaySumarryOfEmploymentRateFtPerm } from "./fetchData.js";

class MySummaryRate extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <link rel ="stylesheet" href ="./css/requirementTwo.css">
        <table id="degree-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>School</th>
              <th>Degree</th>
              <th>Full Time Employment Rate</th>
            </tr>
          </thead>
          <tbody id="degree-list"></tbody>
        </table>
        <div id="noData" part="Nodata">Required Input Data!</div>
      `;
    }

    async fetchAndDisplayData(university, year) {
        const degreeList = this.shadowRoot.getElementById('degree-list');
        const noData = this.shadowRoot.getElementById('noData');
        degreeList.innerHTML = ''; // Clear previous data
        noData.innerHTML = ''; // Clear previous data

        try {
            if (year >= 2013 && year <= 2021) {
                if (university !== "") {
                    if (university === "SUTD" && year <= 2014 || university === "SUSS" && year <= 2017) {

                        throw new Error(`❌ Error: ${university} does not have data for year ${year}`);
                    }
                    else {
                        const dataBySelectedYearAndUniversity = await getByUniversityAndYear(university, year);
                        const fullTimeRateData = displaySumarryOfEmploymentRateFtPerm(dataBySelectedYearAndUniversity, 'school', 'degree');


                        let indexCounter = 1; // Initialize the counter

                        fullTimeRateData.forEach(uni => {
                            // Check if uni is defined before accessing its properties
                            if (uni && uni.school && uni.degree && uni.employment_rate_ft_perm !== undefined) {
                                const row = document.createElement('tr');
                                row.innerHTML = `
                      <td>${indexCounter}</td>
                      <td>${uni.school}</td>
                      <td>${uni.degree}</td>
                      <td>$${uni.employment_rate_ft_perm.toFixed(2)}</td>
                    `;
                                degreeList.appendChild(row);

                                indexCounter++; // Increment the counter for the next row
                            }
                        });
                    }
                } else {
                    throw new Error(`❌ Error: Please select a university.`);
                }
            } else {
                throw new Error(`❌ Error: Missing Required Data for University Or Year (2013-2021)`);
            }
        } catch (error) {
            alert(error.message);
        }
    }
}

customElements.define('my-degree-list', MySummaryRate);

document.getElementById('submitButton').addEventListener('click', () => {
    const year = document.getElementById('yearInput').value;
    const university = document.getElementById('universityOption').value;
    const degreeList = document.querySelector('my-degree-list');
    degreeList.fetchAndDisplayData(university, year);
});

