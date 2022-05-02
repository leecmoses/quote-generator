"use strict";

const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector(".quote-author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

let apiQuotes = [];

const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const removeLoadingSpinner = () => {
  quoteContainer.hidden = false;
  loader.hidden = true;
};

// Show New Quote
const newQuote = (arr) => {
  showLoadingSpinner();
  // Pick a random quote from array
  let { text: quote, author } = arr[Math.floor(Math.random() * arr.length)];

  // Check if Author field is blank and replace it with 'Unknown'
  author = author ?? "Unknown";

  // Check Quote length to determine styling
  quote.length > 120
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");

  // Set Quote and Auther, Hide Loader
  quoteText.textContent = quote;
  authorText.textContent = `– ${author}`;
  removeLoadingSpinner();
};

// Get Quotes from API
const getQuotes = async () => {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const resp = await fetch(apiUrl);
    apiQuotes = await resp.json();
    newQuote(apiQuotes);
  } catch (error) {
    // Handle error here
  }
};

// Tweet Quote
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} ${authorText.textContent}`;

  window.open(twitterUrl, "_blank");
};

// On load
getQuotes();

// Event Listeners
twitterBtn.addEventListener("click", (e) => tweetQuote());

newQuoteBtn.addEventListener("click", (e) => newQuote(apiQuotes));
