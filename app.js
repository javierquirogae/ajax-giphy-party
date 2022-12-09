const $gifArea = $("#gif-area");
const $searchInput = $("#search");

/* handle form submission: clear search box & make ajax call */

$("form").on("submit", async function(evt) {
    evt.preventDefault();
  
    let searchTerm = $searchInput.val();
  
    const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
      params: {
        q: searchTerm,
        api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
      }
    });
    addGif(response.data);
  });

/* use ajax result to add a gif */

function addGif(res) {
  let numResults = res.data.length;
  console.log(numResults);
  console.log(res);
  if (numResults) {
    let randomIdx = Math.floor(Math.random() * numResults);
    console.log(randomIdx);
    let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
    let $newGif = $("<img>", {
      src: res.data[randomIdx].images.original.url,
      class: "w-100"
    });
    console.log(res.data[randomIdx]);
    console.log(res.data[randomIdx].images.original);
    $newCol.append($newGif);
    $gifArea.append($newCol);
  }
}



/* remove gif */

$("#remove").on("click", function() {
    $searchInput.val("");
    $gifArea.empty();
});