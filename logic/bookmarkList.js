'use strict';
/*global store api*/
// eslint-disable-next-line no-unused-vars
let bookmarkList = (function(){
 
  let generateFormElement = function(){
    return ` <form role='form' class="add-bookmark-form" aria-live="polite" >
       
       <label for="bookmark-title">Bookmark name:</label>
       <input type="text" id="bookmark-title"  required minlength="5"><br>
      
       <label for="bookmark-url">URL in the format of http://</label>
       <input type="text" id="bookmark-url"  required pattern='http://.*'><br>
       
       <label for="rating">Rate your bookmark:</label>
       <input type="number" id="rating" min="1" max="5"  required><br>
      
       <label for="description">Bookmark description:</label>
       <input type="text" id="description" required ><br>
      
       <button type="submit" id="add-bookmark-button" >ADD</button>
     </form>`;
  };

  let generateBookmarkElement = function(bookmark){
    return `  
    <div class = 'container' aria-live="polite">
    <ul>
      <li data-item-id="${bookmark.id}">         
        <h2 class="js-title">${bookmark.title} </h2> 
        <div class = 'rating'>
        <form>
          <p>Your Rating : ${bookmark.rating}</p>
          <select  class= 'reassignRating' id ='${bookmark.id}' aria-label='reassignValue' >
          <label title='change rating' aria-label='reassignValue'></label>
          <option value="">Reassign rating</option>
          <option value="1">Reassign rating : 1</option>
          <option value="2">Reassign rating : 2</option>
          <option value="3">Reassign rating : 3</option>
          <option value="4">Reassign rating : 4</option>
          <option value="5">Reassign rating : 5</option>
          </select>
         
          <button class = 'deleteButton' type='button'>Delete</button>
          <button class = 'expandButton' type='button'>More Info</button>
          </form>
        </div> 
        <div class ='expandedInfo ${(bookmark.expanded) ?  '' : 'hidden' }'>
          <form class="editBookmarkDescription" role='textbox'>
            
            <label for='editBookmarkDescription'>Edit Description</label>
            <textarea rows='3' col='auto' type="text" class="editBookmarkInput" aria-label="editBookmarkDescription" placeholder="${bookmark.desc}" required minlength='1' " />
            
            <button type='submit'>Change Description</button>
          </form><br><br><br><br>
          <span role="link">
          <a href =${bookmark.url} target = 'blank'>${bookmark.url}</a>
          </span>
          </ul>
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
    return `
      
      <button class="addBookmark" id="addBookmark" aria-live="polite">Add to Bookmarks</button>
      
      <select id ='ratingFilter' class='sortBookmarks' aria-labelledby='ratingFilter' >
      <option disabled selected>Filter by Rating</option>
        <option value="1">Minimum rating : 1</option>
        <option value="2">Minimum rating : 2</option>
        <option value="3">Minimum rating : 3</option>
        <option value="4">Minimum rating : 4</option>
        <option value="5">Minimum rating : 5</option>
      </select>
      `;};

  function errorLogging(jqXHR, status, err) {
    console.log(jqXHR.responseJSON.message);
    console.log(status);
    console.log(err);
    console.log(jqXHR);
  }

  let ratingToSearchFor = function(){
    $('.buttons').on('change', '#ratingFilter', function(){
      store.searchingByRating = true;
      store.ratingSetting = parseInt($('#ratingFilter').val());
      render();
    });
  };
 
  let changeCurrentRating = function(){
    $('.bookmarks').on('change', '.reassignRating', function(){
      let ratingValue = $(this).closest('.container').find('.reassignRating').val();
      let bookmarkToChange = $(this).closest('.container').find('li').attr('data-item-id');
      let newData = {rating:ratingValue,};
      api.updateBookmark(bookmarkToChange,newData,function(){
        store.bookmarks = [];
        api.getItems((items) => {
          items.forEach((item) => store.addItem(item));
          bookmarkList.render(store.bookmarks);
        },errorLogging);
      });
    });
  };

  let editBookmarkDescription = function(){
    $('.bookmarks').on('submit','.editBookmarkDescription',function(event){
      event.preventDefault();
      let bookmarkToChange = $(this).closest('.container').find('li').attr('data-item-id');
      let newDesc = $(this).closest('.container').find('.editBookmarkInput').val();
      let newData = {
        desc:newDesc
      };
      api.updateBookmark(bookmarkToChange,newData,function(){
        store.bookmarks = [];
        api.getItems((items) => {
          items.forEach((item) => store.addItem(item));
          bookmarkList.render(store.bookmarks);
        });
      },errorLogging);
    });
  };
  
  let render = function(){
    (!store.addingBookmark) ? $('.buttons').html(buttonString) : $('.buttons').html(generateFormElement);
    //let bookmarks = store.bookmarks;
    let bookmarks =  store.bookmarks.filter(function(item){
      return item.rating >= store.ratingSetting;});

    console.log(bookmarks);
    let bookmarkString = generateBookmarkString(bookmarks);
    $('.bookmarks').html(bookmarkString);


    //array of bookmarks . then for each bookmark get a string based on whether or not it's expanded'


    // let bookmarks = store.bookmarks;
    
    // if (store.searchingByRating){
    //   let bookmarksFilteredByRating = store.bookmarks.filter(function(item){
    //     return item.rating >= store.rating;});
    //     console.log(bookmarksFilteredByRating);
    //   let bookmarkString = generateBookmarkElement(bookmarksFilteredByRating);
    //   $('.bookmarks').html(bookmarkString);
    // } else {

    // let bookmarkString = generateBookmarkString(store.bookmarks);
    // $('.bookmarks').html(bookmarkString);
    // }

    // let bookmarks =store.bookmarks.filter(function(item){
    //       return item.rating = store.rating;});
   
    //parseInt(ratingValue);
    
    
    // if (store.searchingByRating){
    //   bookmarks = store.bookmarks.filter(function(item){
    //     return item.rating = store.rating;});
    // }
    
    //creating different states of the DOM
    //default
    //adding bookmark
    //search by rating
    //bookmark expanded

    // if (store.searchingByRating) {
    //   if (!store.addingBookmark){$('.buttons').html(buttonString);} else {$('.buttons').html(generateFormElement);}
    //   $('.bookmarks').html(bookmarkString);
    // }
    
    
    //let bookmarksToRender = bookmarks;
    // if (bookmarksToRender.length === 0){bookmarks = store.bookmarks;}
   
    
    
  
  };

  let addToBookmarks = function(){
    $('.buttons').on('click','#addBookmark',function(){
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
      api.createBookmark(newBookmark,function(item){
        let bookmark =store.createBookmark(item.title,item.desc,item.rating,item.url,item.id);
        
        store.addItem(bookmark);
        render();
        //render(store.bookmarks);
      },errorLogging);
      store.addingBookmark=false;
    });
  };

  let expandElementHandler = function(){
    $('.bookmarks').on('click','.expandButton',function(){
      console.log($(this).closest('.container').find('li').attr('data-item-id'));
    });};
          //   changes this expanded property in the store
          // then render function


  //     $(this).closest('.container').find('.expandedInfo').toggleClass('hidden');
  //     $(this).closest('.container').find('li').toggleClass('normal');
  //     //.closest('li').toggleClass('normal'));
  //   });
  // };
   
  
      





   
  






  let deleteBookmark = function(){
    $('.bookmarks').on('click','.deleteButton',function(){
      let itemToDelete = $(this).closest('.container').find('li').attr('data-item-id');
      api.deleteBookmark(itemToDelete,function(){
        store.bookmarks = [];
        api.getItems((items) => {
          items.forEach((item) => store.addItem(item));
          bookmarkList.render(store.bookmarks);
        });   
     
      });
    });
  };
  function bindEventHandlers(){
    //testHandler();
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


