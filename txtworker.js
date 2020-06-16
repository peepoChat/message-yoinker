const fs = require("fs");

fs.readFile("messages.txt", "utf8", function (error, data) {
  let separator = data.split("|\r\n");
  var sortedSeparator = separator.filter(function (elem, pos) {
    return separator.indexOf(elem) == pos;
  });
  let query = "let array = " + sortedSeparator;
  fs.appendFile("finalmessages.txt", query, function (error0) {
    if (error0) {
      console.log(error0);
    }
  });
});
