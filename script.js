"use strict";

let apiQuotes = [];

// Show New Quote
function newQuote(arr) {
  // Pick a randome quote from array
  const quote = arr[Math.floor(Math.random() * arr.length)];

  return quote;
}

// Get Quotes from API
async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const resp = await fetch(apiUrl);
    apiQuotes = await resp.json();
    console.log(newQuote(apiQuotes));
  } catch (error) {
    // Handle error here
  }
}

// On load
getQuotes();
