
// listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
   
    // get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    
    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    // object to store values
    var bookmark ={
        name:siteName,
        url:siteUrl
    }

    /*
        // local storage test
        localStorage.setItem('test', 'Hello world');
        console.log(localStorage.getItem('test'));
        localStorage.removeItem('test');
        console.log(localStorage.getItem('test'));
    */

    // check if bookmark is null
    if(localStorage.getItem('bookmarks') === null ){

        //init arr
        var bookmarks = [];
        // add to array
        bookmarks.push(bookmark);
        //set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }else{
        //get bookmarks fron localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //add bookmark to array
        bookmarks.push(bookmark);
        //re-set back to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //clear the form
    document.getElementById('myForm').reset();

    //re-fetch bookmarks
    fetchBookmarks();

    // prevent form from submitting
    e.preventDefault();
}

//delete bookmark
function deleteBookmark(url){
    //get bookmark from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //loop through bookmarks
    for(var i=0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            //remove from array
            bookmarks.splice(i, 1);
        }
    }
    //re-set back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //re-fetch bookmarks
    fetchBookmarks();
}


//fetch bookmark
function fetchBookmarks(){
    //get bookmarks fron localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //get output id
    var bookmarksResults = document.getElementById('bookmarkResults');

    //build output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i<bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">'+
                                        '<h4 class="nameStyle">'+name+
                                        ' <a class="btn btn-info" target="_blank" href="'+url+'">Visit</a>'+
                                        ' <a class="btn btn-danger" onclick="deleteBookmark(\''+url+'\')"  href="#">Delete</a>'+
                                        '</h4>'+
                                        '</div>';
    }
}

//validate form
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('Plese enter site name or url');
        return false;
    }

    var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!siteUrl.match(regex)){
        alert('Please use a valid url');
        return false;
    }
    return true;
}