// Name : Lin Htet
// Class: DIT/FT/1B/08
// Admin No: 2340304

// const readline = require("readline-sync");
// const fetch = require('node-fetch');
// import {axios} from '/axios';


// // Data Variable from Server
// let allUniversityData;
// let allUniversityList;
// let selectedOverallEmploymentRate;
// let selectedDataByYear;
// let selectedDataByPreviousYear;
// let selectedDataByUniversity;
// let arrayOfPercentile;
// let finalArray;

// /***********************************************************************/

// /* Fetching data from server */
// function loadAllUniversityData() {
//     return new Promise((resolve, reject) => {
//         fetch('http://localhost:8081/all')
//             .then(response => response.json())

//             .then(function (data) {
//                 resolve(data)
//             });
//     });
// }

// function getUniversityData() {
//     return new Promise((resolve, reject) => {
//         fetch('http://localhost:8081/university')
//             .then(response => response.json())

//             .then(function (data) {
//                 resolve(data)
//             });
//     });
// }

// async function getByUniversityAndYear(uniCode, year) {
//     const maximumRefetchingData = 3;
//     let retries = 0;
//     while (retries < maximumRefetchingData) {
//         try {
//             const response = await axios.get(`http://localhost:8081/university/${uniCode}/year/${year}`);
//             return response.data;
//         } catch (error) {
//             if (error.code === 'ECONNRESET') {
//                 console.log('Connection reset, retrying...');
//                 retries++;
//             } else {
//                 throw error;
//             }
//         }
//     }
//     throw new Error(`Failed to establish connection after ${maximumRefetchingData} retries.`);
// }


//////////////////////////////////////////////Fetching TOP 10 Degrees by the user input year//////////////////////////////////////////////
function loadAllDataByYear(year) {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8081/year/' + year)
            .then(response => response.json())

            .then(function (data) {
                resolve(data)

            });
    });
}

//////////////////////////////////////////////Display TOP 10 Degrees by the user input year//////////////////////////////////////////////
function displayTop10Degrees(toSortValue, attrToSort, year) {
    let finalSort = [...toSortValue];
    let finalResultArray = [];

    finalSort.sort(function (a, b) {
        if ((a[attrToSort]) < (b[attrToSort])) {
            return 1;
        } else if ((a[attrToSort]) > (b[attrToSort])) {
            return -1;
        }
        return 0;
    });

    // console.log(`\nThe top 10 degrees having highest “Basic Monthly Salary - Median (S$) in year ${year}\n_____________________________________________________________________________`);
    for (let i = 0; i < 10; i++) {
        finalResultArray.push({
            University: finalSort[i].university,
            School: finalSort[i].school,
            Degree: finalSort[i].degree,
            Median: finalSort[i].basic_monthly_median
        })
    }
    // console.log(finalResultArray);
    return finalResultArray;
}

//////////////////////////////////////////////Fetching University and Year by the user input//////////////////////////////////////////////

function getByUniversityAndYear(uniCode, year) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8081/university/${uniCode}/year/${year}`)
            .then(response => response.json())

            .then(function (data) {
                resolve(data)

            })
    });
}

//////////////////////////////////////////////Display Summary of Full-Time Permanent Employment Rate by the user input//////////////////////////////////////////////
function displaySumarryOfEmploymentRateFtPerm(toSortValue, attrToSort, attr_2_toSort) {

    let dataToSort = [...toSortValue];
    let arrayForFullTimeEmployee = [];
    dataToSort.sort(function (a, b) {
        if ((a[attrToSort]) > (b[attrToSort])) {
            return 1;
        } else if ((a[attrToSort]) < (b[attrToSort])) {
            return -1;
        }
        return 0;
    });

    let sortByDegree = [...dataToSort];
    sortByDegree.sort(function (a, b) {
        if ((a[attr_2_toSort]) > (b[attr_2_toSort])) {
            return 1;
        } else if ((a[attr_2_toSort]) < (b[attr_2_toSort])) {
            return -1;
        }
        return 0;
    });

    console.log(`\n${sortByDegree[0].university}\n_______________________________`)
    for (let data of sortByDegree) {
        let result = {
            year: data.year,
            school: data.school,
            degree: data.degree,
            employment_rate_ft_perm: data.employment_rate_ft_perm
        }
        arrayForFullTimeEmployee.push(result)
    }

    arrayForFullTimeEmployee.forEach(uni => {
        if (uni.school == 'SUTD') {
            uni.school = 'Not Available Yet!'
        }
    })
    return arrayForFullTimeEmployee;
}

export { loadAllDataByYear, displayTop10Degrees, getByUniversityAndYear, displaySumarryOfEmploymentRateFtPerm };



// async function getDataByUniversity(uniCode) {
//     const maximumRefetchingData = 3;
//     let retries = 0;
//     while (retries < maximumRefetchingData) {
//         try {
//             const response = await axios.get(`http://localhost:8081/university/${uniCode}`);
//             return response.data;
//         } catch (error) {
//             if (error.code === 'ECONNRESET') {
//                 console.log('Connection reset, retrying...');
//                 retries++;
//             } else {
//                 throw error;
//             }
//         }
//     }
//     throw new Error(`Failed to establish connection after ${maximumRefetchingData} retries.`);
// }


// // async await function to get data from server

// async function getAllUniversityData() {
//     allUniversityData = await loadAllUniversityData();
// }

// async function getAllUniversityList() {
//     allUniversityList = await getUniversityData();
// }

// async function getUniversityAndYear(uniCode, year) {
//     selectedOverallEmploymentRate = await getByUniversityAndYear(uniCode, year);
// }

// async function getUniversityDataByYear(year) {
//     selectedDataByYear = await getDataByYear(year);
// }

// async function getUniversityDataByPreviousYear(year) {
//     selectedDataByPreviousYear = await getDataByYear(year);
// }


// async function getUniversityDataByUniCode(uniCode) {
//     selectedDataByUniversity = await getDataByUniversity(uniCode);
// }

// getAllUniversityData();
// getAllUniversityList();


// /* Starting Main Program */

// function getGreeting() {
//     const currentHour = new Date().getHours();

//     if (currentHour < 12) {
//         return "Good morning!";
//     } else if (currentHour < 18) {
//         return "Good afternoon!";
//     } else {
//         return "Good evening!";
//     }
// }

// function delay(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function welcomeMessage() {
//     console.log("Hello! Welcome to my program!");
//     await delay(2000);
// }

// async function newYearGreeting() {
//     console.log(getGreeting() + " Happy New Year!");
//     await delay(3000);
// }

// async function mainProgram() {
//     console.log("Let's get started the program!");
//     userOption();
//     await delay(3000);
// }

// welcomeMessage()
//     .then(newYearGreeting)
//     .then(mainProgram);


// /* Getting data by the userInput  */

// let inputUniversity;
// let inputYear;
// let inputYearForData;
// let inputUniCodeForData;

// async function selectUniversityAndYearToDisplay() {
//     let userInput = readline.question("Enter the university code to get the overall employment rate (NTU,NUS,SMU,SIT,SUTD,SUSS) : ")
//     inputUniversity = userInput.toUpperCase();
//     let foundYear;
//     do {
//         inputYear = readline.question("Enter the specific year to get the data (2013 - 2021) :")
//         foundYear = allUniversityData.find(uni => uni.year.includes(inputYear));
//         if (isNaN(inputYear)) {
//             console.log(`Input year has to be an interger value!`)
//         }
//         else if (!foundYear) {
//             console.log(`Input year has to be between (2013 - 2021).`)
//         }
//     } while (isNaN(inputYear) || !foundYear)

//     if (inputUniversity === "SUTD" && inputYear < 2015) {
//         console.log(`No data was not found related to the ${inputUniversity} in year ${inputYear}`);
//         return selectUniversityAndYearToDisplay();
//     }
//     else if (inputUniversity === "SUSS" && inputYear < 2019) {
//         console.log(`No data was not found related to the ${inputUniversity} in year ${inputYear}`);
//         return selectUniversityAndYearToDisplay();
//     }
//     else {
//         await getUniversityAndYear(inputUniversity, inputYear)
//     }

// }

// async function displayDataByYear() {
//     inputYearForData = readline.question("Enter the year between 2013 and 2021 to get the top 10 degrees : ")
//     const foundYear = allUniversityData.find(uni => uni.year.includes(inputYearForData));
//     if (isNaN(inputYearForData)) {
//         console.log(`Input year has to be an interger value!`)
//         return displayDataByYear();
//     }
//     else if (!foundYear) {
//         console.log(`Your inputYear should be between 2013 and 2021. Please type in the valid year!`)
//         return displayDataByYear();
//     }
//     else {
//         await getUniversityDataByYear(inputYearForData);
//     }
// }

// async function displayDataByUniversity() {
//     let userInputForUniCode = readline.question("Enter the university code to get the summary of Full-time Permanent Employment Rate (NTU,NUS,SMU,SIT,SUTD,SUSS) : ")
//     inputUniCodeForData = userInputForUniCode.toUpperCase();
//     const foundUniversity = allUniversityData.find(uni => uni.uni_code.includes(inputUniCodeForData));
//     if (!foundUniversity) {
//         console.log(`Your input_uniCode should be among NTU, NUS, SMU, SIT, SUTD, SUSS . Please type in the valid uniCode!`)
//         displayDataByUniversity();
//     }
//     else {
//         await getUniversityDataByUniCode(inputUniCodeForData);
//     }
// }


// // Functions to display
// function displayEmploymentRateOverall(inputUniversity, inputYear) {
//     let employmentRate_array = [];
//     console.log(`\nOverall Employment Rate for ${inputUniversity} in year ${inputYear}\n______________________________________________ `)
//     if (selectedOverallEmploymentRate.length == 0) {
//         console.log(`\nNO DATA IS NOT FOUND in provided year ${inputYear} for ${inputUniversity}.Try Another Year\nAvailable University >>  NTU,NUS,SMU,SIT,SUTD,SUSS\nAvailable Year       >>  From 2013 to 2021\n`);
//     }
//     else {
//         for (let uni of selectedOverallEmploymentRate) {
//             let result = {
//                 school: uni.school,
//                 degree: uni.degree,
//                 employment_rate_overall: uni.employment_rate_overall
//             }
//             employmentRate_array.push(result);
//         }
//         for (let uni of employmentRate_array) {
//             if (uni.school === 'SUTD') {
//                 uni.school = "Not Available Yet!"
//             }
//         }
//         console.log(employmentRate_array);
//     }

// }


// function checkingSchoolData() {
//     return new Promise((resolve, reject) => {
//         for (let uni of selectedOverallEmploymentRate) {
//             if (uni.school === 'SUTD') {
//                 reject("\nSchool data is not provided to calculate the lowest gross monthly median!\n")
//             }
//             else {
//                 resolve();
//             }
//         }
//     })
// }

// function displayTheSchoolWithGrossMonthlyMean(toSortValue) {

//     let averageMedianBySchool = {};

//     toSortValue.forEach(data => {
//         if (!averageMedianBySchool[data.school]) {
//             averageMedianBySchool[data.school] = { sum: 0, count: 0 };
//         }
//         averageMedianBySchool[data.school].sum += data.gross_monthly_median;
//         averageMedianBySchool[data.school].count += 1;
//     });

//     for (const school in averageMedianBySchool) {
//         averageMedianBySchool[school].average = averageMedianBySchool[school].sum / averageMedianBySchool[school].count;
//     }

//     let comparingAvgGross = [];

//     for (let school in averageMedianBySchool) {
//         comparingAvgGross.push({
//             school: school,
//             average: averageMedianBySchool[school].average
//         });
//     }

//     comparingAvgGross.sort(function (a, b) {
//         return a.average - b.average;
//     });

//     const lowestSchool = comparingAvgGross[0].school;
//     const lowestAverage = comparingAvgGross[0].average;

//     console.log(`\nThe School "${lowestSchool}" has the lowest gross_monthly_median with the average ${lowestAverage.toFixed(2)}$\n`);
// }



// let inputPercentile;
// let inputYearForPercentile

// function dataForpercentile(dataValue) {
//     let percentileArray = [];

//     if (inputPercentile == 1) {
//         for (let data of dataValue) {
//             percentileArray.push({
//                 year: data.year,
//                 university: data.university,
//                 school: data.school,
//                 degree: data.degree,
//                 percentile: data.gross_mthly_25_percentile
//             })
//         }
//     }
//     else if (inputPercentile == 2) {
//         for (let data of dataValue) {
//             percentileArray.push({
//                 year: data.year,
//                 university: data.university,
//                 school: data.school,
//                 degree: data.degree,
//                 percentile: data.gross_mthly_25_percentile
//             })
//         }
//     }
//     return percentileArray;
// }

// function displayGrossMonthlySalary(toFilterValue) {
//     inputPercentile = readline.questionInt(`Choose the percentile rate to get monthly goss.\n__________________________________________\n1. 25 Percentile monthly gross\n2. 75 Percetile montly gross\nPlease type in (1 or 2) : `);
//     console.log("You successfully filtered the percentile rate!")
//     arrayOfPercentile = dataForpercentile(toFilterValue);
//     inputYearForPercentile = readline.questionInt("Choose the year you want between 2013 and 2021 : ")
//     finalArray = arrayOfPercentile.filter(data => data.year == inputYearForPercentile);
//     return finalArray;
// }

// function displaysortingValuePercentile(toSortValue, attrToSort) {
//     let finalSort = [...toSortValue];


//     finalSort.forEach(item => {
//         item[attrToSort] = parseFloat(item[attrToSort]);
//     });

//     finalSort.sort((a, b) => a[attrToSort] - b[attrToSort]);

//     console.log(`\nAll data for the highest 3 in the year ${inputYearForPercentile}\n____________________________________________\n`);

//     for (let i = finalSort.length - 1; i >= finalSort.length - 3; i--) {
//         const { university, school, degree } = finalSort[i];
//         console.log({ university, school, degree });
//     }

//     console.log(`\nAll data for the lowest 3 in the year ${inputYearForPercentile}\n____________________________________________\n`);

//     for (let i = 0; i < 3; i++) {
//         const { university, school, degree } = finalSort[i];
//         console.log({ university, school, degree });
//     }

// }

// function displayPercentileAverage() {
//     inputYearForPercentile = readline.questionInt("Choose the year you want between 2013 and 2021 to get the 'Percentile Average' for each university : ");
//     finalArray = arrayOfPercentile.filter(data => data.year == inputYearForPercentile);

//     let averagePercentileBySchool = {};

//     finalArray.forEach(data => {
//         if (!averagePercentileBySchool[data.university]) {
//             averagePercentileBySchool[data.university] = { sum: 0, count: 0 };
//         }
//         averagePercentileBySchool[data.university].sum += data.percentile;
//         averagePercentileBySchool[data.university].count += 1;
//     });

//     for (const university in averagePercentileBySchool) {
//         averagePercentileBySchool[university].average = (averagePercentileBySchool[university].sum / averagePercentileBySchool[university].count).toFixed(2);
//     }

//     let comparingAvgPercentile = [];

//     for (let universityData in averagePercentileBySchool) {
//         comparingAvgPercentile.push({
//             university: universityData,
//             average: parseFloat(averagePercentileBySchool[universityData].average)
//         });
//     }

//     comparingAvgPercentile.sort(function (a, b) {
//         return b.average - a.average;
//     });

//     console.log(`\nThe Percentile rate for each university in year ${inputYearForPercentile}.\n_____________________________________________`)
//     console.log(comparingAvgPercentile);
// }

// function displayTop10SalaryIncrements(toSortValue, attrToSort, year) {
//     let finalSort = [...toSortValue];
//     let finalResultArray = [];

//     for (let i = 0; i < finalSort.length; i++) {
//         const currentYearSalary = finalSort[i][attrToSort];
//         const previousYearSalary = getPreviousYearSalary(finalSort[i].degree, finalSort[i].university, finalSort[i].school, year);
//         const difference = currentYearSalary - previousYearSalary;

//         if (previousYearSalary !== 0) {
//             finalResultArray.push({
//                 University: finalSort[i].university,
//                 School: finalSort[i].school,
//                 Degree: finalSort[i].degree,
//                 CurrentYearSalary: currentYearSalary,
//                 PreviousYearSalary: previousYearSalary,
//                 Difference: difference
//             });
//         }
//     }

//     if (finalResultArray.length == 0) {
//         console.log(`\nNO DATA is not found!The program cannot fetch the data for the previous year ${year - 1}!`)
//     }

//     else {
//         finalResultArray.sort((a, b) => b.Difference - a.Difference);
//         const top10Results = finalResultArray.slice(0, 10);
//         console.log(`\nThe top 10 degrees with the highest increment in Basic Monthly Salary - Median (S$) in year ${year}\n________________________________________________________________________________________________`);
//         console.log(top10Results);
//     }


// }

// function getPreviousYearSalary(degree, currentUniversity, currentSchool) {
//     let dataPreviousYear = selectedDataByPreviousYear.find(entry => entry.degree === degree && entry.university === currentUniversity && entry.school === currentSchool);

//     if (!dataPreviousYear) {
//         return 0;
//     }
//     else {
//         return dataPreviousYear.basic_monthly_median;
//     }
// }

// function getUniversityDetail() {
//     console.log("\nList of Universities\n___________________________");

//     allUniversityList.forEach((uni, index) => {
//         console.log(`${index + 1}. ${uni.name}`);
//     });

//     let inputUniversity = readline.question(`Please select the University to get information : `)

//     try {
//         if (inputUniversity >= 1 && inputUniversity <= 6) {
//             let index = inputUniversity - 1;
//             let filtered_university = allUniversityData.filter(uni => uni.university == allUniversityList[index].name);
//             let input_rate = readline.questionInt(`Please provide the employment overall rate above you want : `);
//             let ratefilteredUniversity = filtered_university.filter(uni => uni.employment_rate_overall >= input_rate);
//             if (ratefilteredUniversity.length == 0) {
//                 console.log(`\nNo data was found related the rate ${input_rate} above!\n`)
//             }
//             else {
//                 ratefilteredUniversity.forEach(uni => {
//                     if (uni.school === 'SUTD') {
//                         uni.school = "Not Available yet!"
//                     }
//                 })
//                 console.log(ratefilteredUniversity);
//             }
//         }
//         else {
//             throw new Error("Invalid index number. Please select a valid index.");
//         }
//     } catch (error) {
//         console.error("Error: Invalid input. Please try again.");
//         getUniversityDetail();
//     }
// }

// // var option = 0;
// var displayOption = "";

// displayOption += "1. Display overall employement rate of a specific university and year. \n";
// displayOption += "2. Display the top 10 degrees having highest Basic Monthly Salary - Median (S$)\n";
// displayOption += "3. Display the School with the lowest 'gross monthly median' average within a given university in a given year.  \n";
// displayOption += "4. Display the summary of the Full-Time Permanent Employment Rate over the years of a given university, sorted by schools followed by degree.\n";
// displayOption += "5. Diplay the Highest 3 and Lowest 3 University Data based on the chosen Percentile, and Display for the chosen Percentile Average based on the year. \n";
// displayOption += "6. Display the top 10 degrees with the highest 'Basic Monthly Salary - Median' Increment comparing the previous Year\n";
// displayOption += "7. Display all the University details.\n";
// displayOption += "8. Exit the program. \n";

// async function userOption() {

//     do {
//         console.log(`\nPlease select one option (1 to 8):`);

//         option = readline.questionInt(displayOption);

//         if (option >= 1 && option <= 8) {

//             if (option == 1) {
//                 await selectUniversityAndYearToDisplay();
//                 displayEmploymentRateOverall(inputUniversity, inputYear);
//             }

//             if (option == 2) {
//                 await displayDataByYear();
//                 displayTop10Degrees(selectedDataByYear, "basic_monthly_median", inputYearForData)
//             }

//             if (option == 3) {
//                 try {
//                     await selectUniversityAndYearToDisplay();
//                     await checkingSchoolData();
//                     displayTheSchoolWithGrossMonthlyMean(selectedOverallEmploymentRate)
//                 } catch (error) {
//                     console.log(error);
//                 }
//             }

//             if (option == 4) {
//                 await displayDataByUniversity();
//                 displaySumarryOfEmploymentRateFtPerm(selectedDataByUniversity, "school", "degree");
//             }

//             if (option == 5) {
//                 displayGrossMonthlySalary(allUniversityData);
//                 displaysortingValuePercentile(finalArray, "percentile")
//                 displayPercentileAverage();
//             }

//             if (option == 6) {
//                 await displayDataByYear();
//                 await getUniversityDataByPreviousYear(inputYearForData - 1)
//                 displayTop10SalaryIncrements(selectedDataByYear, "basic_monthly_median", inputYearForData);
//             }

//             if (option == 7) {
//                 getUniversityDetail();
//             }

//         } else {
//             console.log("Please select the option from 1 to 8.");
//         }

//     } while (option != 8);

//     console.log("End of Program! Thank you so much!");

// }

