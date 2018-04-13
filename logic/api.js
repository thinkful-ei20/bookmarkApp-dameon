'use strict';
// eslint-disable-next-line no-unused-vars








let api = (function(){
  let URL =  'https://thinkful-list-api.herokuapp.com/dameon/bookmarks';
  let createItem = function(name, success, error){
    let newItem = JSON.stringify({'name': name});

    $.ajax({
      url: URL,
      method: 'POST',
      contentType: 'application/json',
      data: newItem,
      success: success,
      error: error,
    }); 
  };








}());











