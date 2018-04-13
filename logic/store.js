'use strict';





// eslint-disable-next-line no-unused-vars
let store = (function(){
  let addingBookmark = false;
  let searchingByRating = false;
  let ratingSetting;
  let bookmarks = [{
    title:'Dameon',
    description:'Some sort of string',
    rating: 2,
    link: 'http://www.google.com',
  },{
    title:'Dameon',
    description:'Some sort of string',
    rating: 4,
    link: 'http://www.google.com',
  },{
    title:'Dameon',
    description:'Some sort of string',
    rating: 5,
    link: 'http://www.google.com',
  },
  {
    title:'Dameon',
    description:'Some sort of string',
    rating: 3,
    link: 'http://www.google.com',
  }];
  let createBookmark = function(title,description,rating,link){
    return {
      title,
      description,
      rating,
      link,
      expanded:false
    };
  };

  


  return {
    bookmarks,
    addingBookmark,
    searchingByRating,
    ratingSetting,
    
    
    createBookmark,
    // editDesciption,
    // editRating,
    // removeBookmark,
    // changeDescription:false,
    // changeRating:false,
  };
}());
























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
