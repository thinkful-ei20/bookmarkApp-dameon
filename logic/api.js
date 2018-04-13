'use strict';
/*global store*/
// eslint-disable-next-line no-unused-vars
let api = (function(){
  let URL =  'https://thinkful-list-api.herokuapp.com/dameon/bookmarks';
    
  let getItems = function(callback){
    $.getJSON(URL,callback);
  };
  
  
  let createBookmark = function(newBookmark, success, error){
    let newItem = JSON.stringify(newBookmark);

    $.ajax({
      url: URL,
      method: 'POST',
      contentType: 'application/json',
      data: newItem,
      success: success,
      error: error,
    }); 
  };

  let updateBookmark = function(id,updateData,callback){
    let newData = JSON.stringify(updateData);
    $.ajax({
      url: `${URL}/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: newData,
      success: callback,
      //error: error,
    }); 

  };

  let deleteBookmark = function(id,callback){
    $.ajax({ 
      url: `${URL}/${id}`,
      method: 'DELETE',
      success: callback
    });
  };


  return {
    getItems,
    createBookmark,
    updateBookmark,
    deleteBookmark,
  };
}());
