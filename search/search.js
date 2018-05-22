/**
 *     [This module gives you a custom search with dropdown results]
 *     @author  Winston Grocholski
 */
var search = (function(){

  var data; // Type:Array - Search Data
  var id;   // type:String - Element id where the search box will be placed

  let inputId = 'searchInput';
  let resultsId = 'searchResults';
  let searchContainerId = 'searchContainer';
  let maxDisplay = 5;
  let inputPlaceholder = 'Search';

  /**
   *     [This function is called when you wish to setup a search box on a page.
   *     @param  {[Array]} searchData
   *     @param  {[String]} tagID
   */
  var setup = function(searchData, tagID){
    data  = searchData.sort();
    id = tagID;
    buildSearch();
  };

  /**
   *     [This function is used to build the search input after setup]
   *     @author  Winston Grocholski
   */
  var buildSearch = function(){
    var el = document.getElementById(id);
    var content = `
    <div id='${searchContainerId}'>
      <input id='${inputId}' oninput='search.filter()' placeholder='${inputPlaceholder}'>
      <div id='${resultsId}'></div>
    <div>`;
    el.innerHTML = content;
  }

  /**
   *     [This function will get the current value of the inpt field and compare
   *     that with the search data, returning the matching results.
   *     Not case sensitive]
   *     @author  Winston Grocholski
   */
  var filter = function(){
    var toFind = document.getElementById(inputId).value.toLowerCase();
    if(toFind == ''){ var results = []}
    else{
      var results = data.filter(function(str){
        var lowStr = str.toLowerCase();
        if(lowStr.includes(toFind)){
          return str;
        }
      });
    }
    buildResults(results);
  }

  /**
   *     [This function is called when a the user selects one of the dropdown items]
   *     @author  Winston Grocholski
   *     @param  {[String]} selected [the selected value]
   */
  var select = function(selected){
    document.getElementById(inputId).value = selected;
    filter();
  }

  /**
   *     [This function will build the results block og HTML]
   *     @author  Winston Grocholski
   *     @param  {[Array]} results
   */
  var buildResults = function(results){
    var count = 0;
    var content = ``;
    while(count < maxDisplay && count < results.length){
      content += `<span onclick="search.select('${results[count]}')">${results[count]}</span>`
      count++;
    }
    showHideResults(results.length);
    document.getElementById(resultsId).innerHTML = content;
  }

  /**
   *     [This function will determine if the results show be hidden or not]
   *     @author  Winston Grocholski
   *     @param  {[Int]} size [The number of filtered results]
   */
  var showHideResults = function(size){
    if(size == 0){
      document.getElementById(resultsId).style.display = 'none';
    }
    else{
      document.getElementById(resultsId).style.display = 'flex';
    }
  }

  var getData = function(){
    return data;
  }

  var getID = function(){
    return id;
  }

  return{
    setup:setup,
    filter:filter,
    select:select,
    getData:getData,
    getID:getID,
  }
})();
