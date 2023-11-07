fetch('https://api.quotable.io/random?maxLength=50')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // Set default quote as a fallback
    const defaultQuote = 'Carpe Diem';

    // Set quote text and quote author with optional chaining to handle undefined
    const quoteText = data?.content;
    const quoteAuthor = data?.author || '';

    // If quoteText is not undefined, set newQuote the quoteText and quoteAuthor
    // Otherwise set newQuote to the defaultQuote
    const newQuote = quoteText ? `${quoteText} - ${quoteAuthor}` : defaultQuote;

    // Get the quote element and set the innerHTML to the text of the new quote
    document.getElementById('quote').innerHTML = newQuote;
  });
