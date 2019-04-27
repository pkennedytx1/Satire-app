// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br /><a target='_blank' href='" + data[i].link + "'>Link to Full Article Here.</a></p>");
      $("#articles").append("<div><button data-id='" + data[i]._id + "' class='comment btn btn-outline-secondary'>Add Article Note</button>&nbsp&nbsp&nbsp&nbsp<button data-id='" + data[i]._id + "'class='save btn btn-outline-success'>Save Article</button></div><br>");
      $("#articles").append("<div class='comment-field' id='comment-field-" + data[i]._id + "'</div>");
      $("#articles").append("<hr>");
    }
  });
  
  
  // Whenever someone clicks a p tag
  $(document).on("click", ".comment", function() {
    // Empty the notes from the note section
    $(".comment-field").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // For future of creating a comment system
        // if(data.comment) {
        //   $("#comment-field-" + thisId).append('<p>' + data.comment.author + ':<br>' + data.comment.comment + '</p>')
        // }
        // The title of the  article
        $("#comment-field-" + thisId).append("<h5>" + data.title + "</h5>");
        // An input to enter a new title
        $("#comment-field-" + thisId).append("<input class='form-control' id='authorinput' name='author'><br>");
        // A textarea to add a new note body
        $("#comment-field-" + thisId).append("<textarea class='form-control' id='commentinput' name='comment'></textarea><br>");
        // A button to submit a new note, with the id of the article saved to it
        $("#comment-field-" + thisId).append("<button class='btn btn-outline-secondary' data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        // If there's a note in the article
        if (data.comment) {
          // Place the title of the note in the title input
          $("#authorinput").val(data.comment.author);
          // Place the body of the note in the body textarea
          $("#commentinput").val(data.comment.comment);
        }
      });
  });

  $(document).on('click', '.save', function(){

    var thisId = $(this).attr("data-id");

    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      .then(function(data) {
        console.log(data);
        $(".saved-articles").append("<a href='" + data.link + "'><p data-id='" + data._id + "'>" + data.title + "</p></a>");

        let notification = "You saved an article titled: " + data.title;
        activityArr.push(notification);

        updateActivity();
      });
  });
  
  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    console.log(thisId);
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        author: $("#authorinput").val(),
        // Value taken from note textarea
        comment: $("#commentinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);

        let notification = "You added a note on " + data.title;
        activityArr.push(notification);

        updateActivity();
        
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    // $("#authorinput").val("");
    // $("#commentinput").val("");
  });

const activityArr = [];

function updateActivity() {
  $(".activity").empty();

  if (activityArr.length > 5) {
    activityArr.shift();
  }
  for (let i = 0; i < activityArr.length; i++) {
    $(".activity").append("<div>" + activityArr[i] + "</div><br>");
  };

};
