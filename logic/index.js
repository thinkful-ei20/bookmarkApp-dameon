'use strict';
/* global bookmarkList store api*/

$(document).ready(function() {
  
  console.log(store);
  
  
  //bookmarkList.render(store.bookmarks);
  bookmarkList.bindEventHandlers();

 
  // api.getItems(function(data) {
  //   console.log(data);
  // });
  
  // console.log(api.BASE_URL);
  //bookmarkList.renderNewForm();
  
  
  
  api.getItems((items) => {
    items.forEach((item) => store.addItem(item));
    bookmarkList.render(store.bookmarks);
  });
});













