'use strict';
/*global store api */
// eslint-disable-next-line no-unused-vars
let bookmarkList = (function(){
 
  let generateFormElement = function(){
    return `  <form role='form' class="add-bookmark-form" id='addBookmarkForm' aria-live="polite" >
              
              <label for="bookmark-title">Bookmark name:</label>
              <input type="text" id="bookmark-title"  required minlength="5"><br>
              
              <label for="bookmark-url">URL in the format of "http://" required</label>
              <input type="text" id="bookmark-url"  required pattern='http://.*'><br>
       
              <label for="rating">Rate your bookmark:</label>
              <input type="number" id="rating" min="1" max="5"  required><br>
      
              <label for="description" rows='2'>Bookmark description:</label>
              <input type="text" id="description" required ><br>
      
              <button type="submit" id="add-bookmark-button" >ADD</button>
              </form>`;
  };

  let generateBookmarkElement = function(bookmark){
    return `  
    <div class = 'container' ARIA-live="polite">
      <ul>
        <li data-item-id="${bookmark.id}">         
          <h2 class="js-title">${bookmark.title} </h2> 
            <form role= 'form'>
              <p>Your Rating : ${bookmark.rating}</p>
                
                  <select  role='button' class= 'reassignRating' id ='${bookmark.id}' aria-label='reassignValue' >
                    <label title='change rating' aria-label='reassignValue'></label>
                      <option value="">Reassign rating</option>
                      <option value="1">Reassign rating : 1</option>
                      <option value="2">Reassign rating : 2</option>
                      <option value="3">Reassign rating : 3</option>
                      <option value="4">Reassign rating : 4</option>
                      <option value="5">Reassign rating : 5</option>
                  </select>
                  <div class = 'rating'>
                  <button class = 'deleteButton' type='button' aria-label='Remove'>Remove Bookmark</button>
                  <button class = 'expandButton' type='button' aria-label='Expandable'> ${(!bookmark.expanded) ? 'More Information' : 'Less Information'}</button>
                </div> 
              </form>
          
          <div class ='expandedInformation ${(!bookmark.expanded) ?  'hidden' : '' }'>
            <form class="editBookmarkDescription" role='textbox'>
            
              <label for='editBookmarkDescription'>Edit Description</label>
              <textarea rows='3' col='auto' type="text" class="editBookmarkInput" aria-label="editBookmarkDescription" placeholder="${bookmark.desc}" required minlength='1' " />
            
              <button type='submit' class='button'>Change Description</button>
            </form>
            <span role="link" class='bookmarkLink'><p><a href =${bookmark.url} target ='blank'>${bookmark.url}</a></p></span>
          </div>    
        </li>
      </ul>
    </div>`;
  };

  let buttonString = function(){
    return `      
      <button class="addBookmark" id="addBookmark" aria-live="polite">Add to Bookmarks</button>
      
      <select role='button' id ='ratingFilter' aria-label='rating filter' class='ratingFilter' aria-live="polite">Filter by Rating
      <option disabled selected>Ratings of at Least</option>
        <option value="1">Minimum rating : 1</option>
        <option value="2">Minimum rating : 2</option>
        <option value="3">Minimum rating : 3</option>
        <option value="4">Minimum rating : 4</option>
        <option value="5">Minimum rating : 5</option>
      </select>`;
  };

  function generateBookmarkString(bookmarkList) {    
    let items = bookmarkList.map((item) => generateBookmarkElement(item));
    return items.join('');
  }

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

      // capture current expanded 
      // after it updates and getItems adds reassigns current expanded

      api.updateBookmark(bookmarkToChange,newData,function(){
        store.bookmarks = [];
        api.getItems((items) => {
          let bookmark = items.map((item) =>store.addItem(store.createBookmark(item.title,item.desc,item.rating,item.url,item.id)));
          render();
        },errorLogging);
      });
    });
  };

  let editBookmarkDescription = function(){
    $('.bookmarks').on('submit','.editBookmarkDescription',function(event){
      event.preventDefault();
      let bookmarkToChange = $(this).closest('.container').find('li').attr('data-item-id');
      let newDescription = $(this).closest('.container').find('.editBookmarkInput').val();
      let newData = {desc:newDescription};
      api.updateBookmark(bookmarkToChange,newData,function(){
        store.bookmarks = [];
        api.getItems((items) => {
          items.forEach((item) => store.addItem(item));
          render();
        });
      },errorLogging);
    });
  };
  
  let render = function(){
    (!store.addingBookmark) ? $('.buttons').html(buttonString) : $('.buttons').html(generateFormElement);
    let bookmarks =  store.bookmarks.filter(function(item){
      return item.rating >= store.ratingSetting;});
    let bookmarkString = generateBookmarkString(bookmarks);
    $('.bookmarks').html(bookmarkString);
  };

  let addToBookmarks = function(){
    $('.buttons').on('click','#addBookmark',function(){
      store.addingBookmark = true;
      render();
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
      },errorLogging);
      store.addingBookmark=false;
    });
  };

  let expandElementHandler = function(){
    $('.bookmarks').on('click','.expandButton',function(){
      let itemExpanded = ($(this).closest('.container').find('li').attr('data-item-id'));
      console.log();
      let bookmark = store.bookmarks.find(function(item){
        return item.id === itemExpanded;});
      bookmark.expanded =!bookmark.expanded;
      render();
    });
  };
 
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
  };

}());
