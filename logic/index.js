'use strict';
/* global bookmarkList store $ api*/


// $(document).ready(function() {
   
//   bookmarkList.bindEventHandlers();
//   api.getItems((items) => {
//     items.forEach((item) => store.addItem(item));
//     bookmarkList.render();
//   });
// });





$(document).ready(function() {
   
  bookmarkList.bindEventHandlers();
  api.getItems((items) => {
    items.forEach(function(item)  {
      let bookmark =store.createBookmark(item.title,item.desc,item.rating,item.url,item.id);
      console.log(bookmark);
    store.addItem(bookmark);});
    
    bookmarkList.render();
  });

});










