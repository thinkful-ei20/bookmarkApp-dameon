'use strict';


console.log('Hello World!');


// eslint-disable-next-line no-unused-vars
let store = (function(){


  let addingBookmark = false;
  let searchingByRating = false;
  let ratingSetting;

  let bookmarks = [];

  // let populateBookmarkArray = function(items){
  //   this.bookmarks = items;
 // };
// let createBookmark = function(title,description,rating,link){
//     return {
//       id: cuid(),
//       title,
//       description,
//       rating,
//       link,
//     };
//   };
 
  // let editDesciption = function(item){};
  // let editRating = function (item){};
  // let removeBookmark = function(item){};
  


  return {
    bookmarks:[],
    
    // createBookmark,
    // editDesciption,
    // editRating,
    // removeBookmark,
    addingBookmark,
    searchingByRating,
    ratingSetting,
    expanded:false,

    // changeDescription:false,
    // changeRating:false,
  };
}());


