$(document).ready(function() {
  // This is the javascript for the user page

  var nameInput = $("#author-name");
  var authorList = $("tbody");
  var authorContainer = $(".author-container");

  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author
  $(document).on("click", ".delete-author", handleDeleteButtonPress);

  // Getting the intiial list of Authors
  getAuthors();

// The initial button click on the user
// Get the user name, send to back end for authentication



  // A function to handle what happens when the form is submitted to create a new Author
  $(document).on("submit", "#userName" {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim()) {
      return;
    }
    // Calling the user enter function and passing in the name input
    $.post("/api/user", userName)
      .then(getUser);
    });
  }

  // A function for creating an author. Calls getAuthors upon completion
  function upsertAuthor(authorData) {
  }
