// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



// your first API endpoint... 
app.get('/api/:date?', (req, res) => {
  const input = req.params.date;

  // If the input is empty, return the current time
  if (!input) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }

  let date;
  let unixTimestamp;

  // Check if input is a valid Unix timestamp (number)
  if (!isNaN(input) && !isNaN(parseInt(input, 10))) {
    unixTimestamp = parseInt(input, 10);
    date = new Date(unixTimestamp); // Convert to Date object
  } else {
    // Otherwise, assume input is a date string in "YYYY-MM-DD" format
    date = new Date(input);  // This can handle a "YYYY-MM-DD" format
    unixTimestamp = date.getTime(); // Get Unix timestamp in milliseconds
  }

  // If the date object is invalid (either a bad timestamp or an invalid date string)
  if (isNaN(date.getTime())) {
    return res.status(400).json({ error: 'Invalid Date' });
  }

  // Format the Date object to a UTC string
  const utcDate = date.toUTCString();

  // Respond with the Unix timestamp and UTC date
  res.json({
    unix: unixTimestamp,
    utc: utcDate
  });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
