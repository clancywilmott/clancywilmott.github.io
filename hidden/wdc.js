(function () {
var myConnector = tableau.makeConnector();
myConnector.getSchema = function (schemaCallback) {
var cols = [
{ id : "location", alias:"Location", dataType : tableau.dataTypeEnum.string },
{ id : "date",alias: "Date", dataType : tableau.dataTypeEnum.date },
{ id : "totalcases",alias: "Total Cases", dataType : tableau.dataTypeEnum.float},
{ id : "newcases",alias: "New Cases", dataType : tableau.dataTypeEnum.float},
{ id : "totaldeaths", alias: "Total Deaths",dataType : tableau.dataTypeEnum.float },
{ id : "newdeaths", alias: "New Deaths",dataType : tableau.dataTypeEnum.float },
{ id : "totalcasesspermillion", alias: "Total Cases Per Million",dataType : tableau.dataTypeEnum.float },
{ id : "newcasespermillion", alias: "New Cases Per Million",dataType : tableau.dataTypeEnum.float },
{ id : "totaldeathspermillion",alias: "Total Deaths Per Million", dataType : tableau.dataTypeEnum.float },
{ id : "newdeathspermillion", alias: "News Deaths Per Million",dataType : tableau.dataTypeEnum.float },
{ id : "stringencyindex", alias: "Stringency Index",dataType : tableau.dataTypeEnum.float },
{ id : "population", alias: "Population", dataType : tableau.dataTypeEnum.float},
{ id : "populationdensity", alias: "Population Density",dataType : tableau.dataTypeEnum.float },
{ id : "medianage", alias: "Median Age",dataType : tableau.dataTypeEnum.float },
{ id : "65older", alias: "Age 65 or older",dataType : tableau.dataTypeEnum.float },
{ id : "70older", alias: "Age 70 or older",dataType : tableau.dataTypeEnum.float },
{ id : "gdppercapita", alias: "GDP Per Capita",dataType : tableau.dataTypeEnum.float },
{ id : "diabetesprevalence", alias: "Diabetes Prevalence",dataType : tableau.dataTypeEnum.float }
];
var tableInfo = {
id : "covid19",
alias : "Covid19",
columns : cols
};
schemaCallback([tableInfo]);
};
myConnector.getData = function(table, doneCallback) {
$.getJSON("https://covid.ourworldindata.org/data/owid-covid-data.json", function(resp) {
var feat = resp;
tableData = [];
// Iterate over the JSON object
for (var i = 0, len = feat.length; i < len; i++) {
tableData.push({
"location": feat[i]["location"],
"date": feat[i]["date"],
"totalcases": feat[i] ["total_cases"],
"newcases": feat[i] ["new_cases"],
"totaldeaths": feat[i] ["total_deaths"],
"newdeaths": feat[i] ["new_deaths"],
"totalcasesspermillion": feat[i] ["total_cases_per_million"],
"newcasespermillion": feat[i] ["new_cases_per_million"],
"totaldeathspermillion": feat[i] ["total_deaths_per_million"],
"newdeathspermillion": feat[i] ["new_deaths_per_million"],
"stringencyindex": feat[i] ["stringency_index"],
"population": feat[i] ["population"],
"populationdensity": feat[i] ["population_density"],
"medianage": feat[i] ["median_age"],
"65older": feat[i] ["aged_65_older"],
"70older": feat[i] ["aged_70_older"],
"gdppercapita": feat[i] ["gdp_per_capita"],
"diabetesprevalence": feat[i] ["diabetes_prevalence"]
});
}
table.appendRows(tableData);
doneCallback();
});
};
tableau.registerConnector(myConnector);
$(document).ready(function () {
$("#submitButton").click(function () {
tableau.connectionName = "covid19";
tableau.submit();
});
});})();
