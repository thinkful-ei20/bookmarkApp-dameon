'use strict';
/* global bookmarkList store api*/

$(document).ready(function() {
   
  bookmarkList.bindEventHandlers();
  api.getItems((items) => {
    items.forEach((item) => store.addItem(item));
    bookmarkList.render(store.bookmarks);
  });
});













