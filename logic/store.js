'use strict';

// eslint-disable-next-line no-unused-vars
let store = (function(){
  let addingBookmark = false;
  let searchingByRating = false;
  let ratingSetting = 1;
  let bookmarks = [];
  let addItem = function(item) {
    this.bookmarks.push(item);
  };

  let createBookmark = function(title,desc,rating,url){
    return {
      title,
      desc,
      rating,
      url,
      //expanded:false
    };
  };
  return {
    bookmarks,
    addingBookmark,
    searchingByRating,
    ratingSetting,
    addItem,
    
    createBookmark,
  };
}());
