

const searchForm = document.querySelector('#news-search');
const input = document.querySelector('#news-search-input');
const newsList = document.querySelector('#news-list');

// Added eventListener for submit and called the retrieve function
searchForm.addEventListener('submit', retrieve);

function retrieve(e) {
  e.preventDefault();

  // Set the topic as the value entered in news-search-input
  // Set URL to the API + Topic + API Key
  let topic = input.value;
  let url = `${newsDomain}?q=${topic}&api-key=${apiKey}`;

  // Fetch the URL and return Json response
  fetch(url)
    .then((response) => {
      return response.json();
    })
    // Call the clearlist function below in case a search was already performed it will clear the list
    .then((data) => {
      clearList();
      // Loop through all of the articles listed in the JSON response and add it to the output innerHTML
      for (let i = 0; i < data.response.docs.length; i++) {
        let output = document.getElementById('output');

        try {
          output.innerHTML += `
                <div id="news-card">
                    <div id="news-body">
                    <img src="https://www.nytimes.com/${data.response.docs[i].multimedia[0].url}" />
                    <br>
                    <a href="${data.response.docs[i].web_url}"<h2 id="news-h2">${data.response.docs[i].headline.main}</h2></a>
                        <div id="news-text">
                        <p>${data.response.docs[i].abstract}</p>
                        </div>
                    </div>
                </div>
                `;}
                
        catch(err){
          console.error(err);
        }
      }
    });

  // Function to call above to clear the list if a search was performed
  function clearList() {
    while (output.firstChild) {
      output.removeChild(output.firstChild);
    }
  }
}
