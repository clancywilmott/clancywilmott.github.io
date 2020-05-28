(function () {
var myConnector = tableau.makeConnector();
myConnector.getSchema = function (schemaCallback) {
var cols = [
{ id : "dateRep", alias:"Date", dataType : tableau.dataTypeEnum.date },
{ id : "day",alias: "Day", dataType : tableau.dataTypeEnum.float },
{ id : "month",alias: "Month", dataType : tableau.dataTypeEnum.float},
{ id : "year",alias: "Year", dataType : tableau.dataTypeEnum.float},
{ id : "cases", alias: "Cases",dataType : tableau.dataTypeEnum.float },
{ id : "deaths", alias: "Deaths",dataType : tableau.dataTypeEnum.float },
{ id : "countriesAndTerritories", alias: "Country",dataType : tableau.dataTypeEnum.string },
{ id : "geoID", alias: "GeoID",dataType : tableau.dataTypeEnum.string },
{ id : "countryterritoryCode",alias: "Country Code", dataType : tableau.dataTypeEnum.float },
{ id : "popData2018", alias: "Population 2018",dataType : tableau.dataTypeEnum.float },
{ id : "continentExp", alias: "Continent",dataType : tableau.dataTypeEnum.float }
];
var tableInfo = {
id : "covid19",
alias : "Covid19",
columns : cols
};
schemaCallback([tableInfo]);
};
myConnector.getData = function(table, doneCallback) {
$.getJSON("https://opendata.ecdc.europa.eu/covid19/casedistribution/json/", function(resp) {
var feat = resp;
tableData = [];
// Iterate over the JSON object
for (var i = 0, len = feat.length; i < len; i++) {
tableData.push({
"dateRep": feat[i]["dateRep"],
"day": feat[i]["day"],
"month": feat[i] ["month"],
"year": feat[i] ["year"],
"cases": feat[i] ["cases"],
"deaths": feat[i] ["deaths"],
"countriesAndTerritories": feat[i] ["countriesAndTerritories"],
"geoID": feat[i] ["geoID"],
"countryterritoryCode": feat[i] ["countryterritoryCode"],
"popData2018": feat[i] ["popData2018"],
"continentExp": feat[i] ["continentExp"]
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
