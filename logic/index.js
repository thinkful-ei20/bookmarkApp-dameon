'use strict';
/* global bookmarkList store*/

$(document).ready(function() {
  
  console.log(store);
  
  
  bookmarkList.render();
  bookmarkList.bindEventHandlers();



  //bookmarkList.renderNewForm();
  
  
  
  // api.getItems((items) => {
  //   items.forEach((item) => store.addItem(item));
  //   bookmarkList.render();
  // });
});













