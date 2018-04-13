'use strict';
/*global store api*/
// eslint-disable-next-line no-unused-vars
let bookmarkList = (function(){
 
  let generateFormElement = function(){
    return ` <form role='form' class="add-bookmark-form"  >
       <label for="bookmark-name">Bookmark name:</label>
       <input type="text" id="bookmark-title" required><br>
      <label for="bookmark-url">Bookmark URL:</label>
      <input type="text" id="bookmark-url" required><br>
       <label for="bookmark-rating">Rate your bookmark:</label>
      <input type="number" id="rating" min="1" max="5"required><br>
       <label for="bookmark-description">Bookmark description:</label>
       <input type="text" id="description" required><br>
       <button type="submit" id="add-bookmark-button" >ADD</button>
     </form>`;
  };

  let generateBookmarkElement = function(bookmark){
    return `  
    <div class = 'container'>
      <li data-item-id="${bookmark.id}">         
        <h3 class="js-title">${bookmark.title} </h3> 
        <div class = 'rating'>
          <p>${bookmark.rating}</p>
          <select id ='reassignValue' >
          <option value="">Reassign rating</option>
          <option value="1">Reassign rating : 1</option>
          <option value="2">Reassign rating : 2</option>
          <option value="3">Reassign rating : 3</option>
          <option value="4">Reassign rating : 4</option>
          <option value="5">Reassign rating : 5</option>
          </select>
          <button class = 'deleteButton' type='button'>Delete</button>
          <button class = 'expandButton' type='button'>More Info</button>
        </div> 
        <div class ='expandedInfo hidden'>
          <form id="editBookmarkDescription">
            <input type="text" id="editBookmarkInput" value="${bookmark.desc}" />
          </form>
         <a href =${bookmark.url} target = 'blank'>${bookmark.url}</a> 
        </div>    
      </li>
    
    </div>
    `;
  };
  
  function generateBookmarkString(bookmarkList) {    
    let items = bookmarkList.map((item) => generateBookmarkElement(item));
    return items.join('');
  }

  let buttonString = function(){
    return `<button class="addBookmark">Add to Bookmarks</button>
  <select id ='ratingSort' class='sortBookmarks' >
      <option value="">Sort by Rating</option>
      <option value="1">Minimum rating : 1</option>
      <option value="2">Minimum rating : 2</option>
      <option value="3">Minimum rating : 3</option>
      <option value="4">Minimum rating : 4</option>
      <option value="5">Minimum rating : 5</option>
      </select>
      </div>`;};

  let ratingToSearchFor = function(){
    $('.buttons').on('change', '#ratingSort', function(){
      let ratingValue =  $('#ratingSort').val();
      store.ratingSetting = parseInt(ratingValue);
      let bookmarks =  store.bookmarks.filter(function(item){
        return item.rating >= parseInt(ratingValue);
      });
      console.log(ratingValue);
      render(bookmarks);
    });
  };
 
  let changeCurrentRating = function(){
    $('.bookmarks').on('change', '#reassignValue', function(){
      let ratingValue = $(this).closest('.container').find('#reassignValue').val();
      let newData = {
        rating:ratingValue,
      };
      let bookmarkToChange = $(this).closest('.container').find('li').attr('data-item-id');
      api.updateBookmark(bookmarkToChange,newData,function(){
        store.bookmarks = [];
        api.getItems((items) => {
          items.forEach((item) => store.addItem(item));
          bookmarkList.render(store.bookmarks);
        });
      });
    });
  };

  let editBookmarkDescription = function(){
    $('.bookmarks').on('submit','#editBookmarkDescription',function(event){
      event.preventDefault();
      let bookmarkToChange = $(this).closest('.container').find('li').attr('data-item-id');
      //let indexOfBookmark = findIndexOfElement(bookmarkToChange);
      //store.bookmarks[indexOfBookmark].description = 'newString';
      let newDesc = $(this).closest('.container').find('#editBookmarkInput').val();
      let newData = {
        desc:newDesc
      };
      api.updateBookmark(bookmarkToChange,newData,function(){
        store.bookmarks = [];
        api.getItems((items) => {
          items.forEach((item) => store.addItem(item));
          bookmarkList.render(store.bookmarks);
        });
      });
    });
  };
  
  let render = function(bookmarks){
    
    let bookmarkString = generateBookmarkString(bookmarks);
    //if(this.item is expanded){};


    if (!store.addingBookmark){
      $('.buttons').html(buttonString);
    } else {
      $('.buttons').html(generateFormElement);
    }
    $('.bookmarks').html(bookmarkString);
  };

  let addToBookmarks = function(){
    $('.buttons').on('click','.addBookmark',function(){
      console.log('hi');
      store.addingBookmark = true;
      render(store.bookmarks);
    });
  };

  let formSubmitHandler = function(){
    $('.buttons').on('submit','.add-bookmark-form',function(event){
      event.preventDefault();
      let bookmarkTitle = $('#bookmark-title').val();
      let bookmarkLink = $('#bookmark-url').val();
      let bookmarkRating = $('#rating').val();
      let bookmarkDescription = $('#description').val();
      let newBookmark = store.createBookmark(bookmarkTitle,bookmarkDescription,bookmarkRating,bookmarkLink);
      console.log(newBookmark);
      api.createBookmark(newBookmark,function(newItem){
        store.addItem(newItem);
        render(store.bookmarks);
      });
      //store.bookmarks.push(store.createBookmark(bookmarkTitle,bookmarkDescription,bookmarkRating,bookmarkLink));
      store.addingBookmark=false;
      //render(store.bookmarks);
      console.log(bookmarkDescription);
    });
  };

  let expandElementHandler = function(){
    $('.bookmarks').on('click','.expandButton',function(){
    
      
      $(this).closest('.container').find('.expandedInfo').toggleClass('hidden');
      $(this).closest('.container').find('li').toggleClass('normal');
      //.closest('li').toggleClass('normal'));
    });
  };
  
  let findIndexOfElement = function(title){
    return store.bookmarks.map(item => item.title).indexOf(title); 
  };

  let deleteBookmark = function(){
    $('.bookmarks').on('click','.deleteButton',function(){
      let itemToDelete = $(this).closest('.container').find('li').attr('data-item-id');
      let indexOfBookmark = findIndexOfElement(itemToDelete);
      store.bookmarks.splice(indexOfBookmark,1);
      render(store.bookmarks);
    });
  };

  function bindEventHandlers(){
    editBookmarkDescription();
    changeCurrentRating();
    ratingToSearchFor();
    deleteBookmark();
    expandElementHandler();
    addToBookmarks();
    formSubmitHandler();
  }

  return {
    bindEventHandlers,
    render,
    //renderNewForm,
  };

}());
