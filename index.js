const url = "https://www.omdbapi.com/?apikey=cbe0bb3f&";  //if key dont work enter here from readme.md
const itemsPerPage = 10; 
let currentPage = 1 , totalPages = 1 , crntId = "tt1300854";

const reviewList = JSON.parse(localStorage.getItem("reviewList")) || [];


const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const movieList = document.getElementById('movieList');
const pagination = document.getElementById('pagination');
const totResSpan = document.getElementById('totResSpan');
const totPagesSpan = document.getElementById('totPagesSpan');
const crntPageSpan = document.getElementById('crntPageSpan');
const enterPage = document.getElementById('enterPage');
const movieDetails = document.getElementById('movieDetails'); 
const givenRating = document.getElementById('givenRating');
const givenReview = document.getElementById('givenReview');
const review = document.getElementById('review');



async function findMovies(){
    console.log(reviewList);
    let val = searchInput.value;
    console.log(val);
    if(val==="")val = "avenger";
    const [movies,tot] = await getMovies(val);
    console.log(tot);
    if(!movies || movies.length===0)
    {
        movieList.innerHTML = "<p>No Results Found , Try using other keywords (maybe of more length)<p>";
        pagination.innerHTML = "";
        return; 
    }
    else
    {
        renderMovies(movies);
        changePagination(tot);
    }
}

findMovies();

async function getMovies(val)
{
    try
    {
        const response = await fetch(`${url}&s=${val}&page=${currentPage}`);
        const result = await response.json();
        return [result.Search,result.totalResults];
    } 
    catch (error) 
    {
        console.error('Error fetching movies:', error);
        return [];
    }
}

function renderMovies(list)
{
    movieList.innerHTML = "";
    for(let i=0;i<list.length;i++)
    {
        var card = document.createElement("div");
        card.setAttribute("class","card");
        card.id = String(list[i].imdbID);
        card.setAttribute('onclick',"itemClicked()");
        const poster = list[i].Poster !== 'N/A' ? list[i].Poster : 'poster.jpg';
        card.innerHTML = `<img src="${poster}" alt="${list[i].Title}" id="${card.id}"><h3 id="${card.id}">${list[i].Title}</h3>`;
        movieList.appendChild(card);
    }
}

function changePagination(tot)
{
    totalPages = Math.floor(tot/itemsPerPage);
    totResSpan.innerHTML = "";
    totPagesSpan.innerHTML = "";
    crntPageSpan.innerHTML = "";
    totResSpan.appendChild(document.createTextNode(`${tot}`)); 
    totPagesSpan.appendChild(document.createTextNode(`${totalPages}`));
    crntPageSpan.appendChild(document.createTextNode(`${currentPage}`));
}

function decPage()
{
    if(currentPage===1)return;
    currentPage = currentPage-1;
    findMovies();
}

function incPage()
{
    if(currentPage===totalPages)return;
    currentPage = currentPage+1;
    findMovies();
}

function jumpPage()
{
    var x = enterPage.value;
    if(!x)x=1;
    if(x<1 || x>totalPages)
    {
        alert("Enter correct Page");
        return;
    }
    currentPage = x;
    findMovies();
}

let timeoutId;
function handleRealTimeSearch() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(findMovies, 500); // Wait for 500ms after the user stops typing to trigger the search
}
searchInput.addEventListener('input', handleRealTimeSearch);

async function getMovie(val)
{
    try
    {
        const response = await fetch(`${url}&i=${val}`);
        const result = await response.json();
        return result;
    } 
    catch (error) 
    {
        console.error('Error fetching movie:', error);
        return [];
    }
}


async function itemClicked()
{
    var id = event.target.id;
    const data = await getMovie(id);
    // console.log(id);
    const poster = data.Poster !== 'N/A' ? data.Poster : 'poster.jpg';
    const childs = movieDetails.children;
    childs[0].src = poster;
    childs[1].innerHTML = `<b>Title: </b>${data.Title}`;
    childs[2].innerHTML = `<b>Year: </b>${data.Year}`;
    childs[3].innerHTML = `<b>Rated: </b>${data.Rated}`;
    childs[4].innerHTML = `<b>Released: </b>${data.Released}`;
    childs[5].innerHTML = `<b>Runtime: </b>${data.Runtime}`;
    childs[6].innerHTML = `<b>Genre: </b>${data.Genre}`;
    childs[7].innerHTML = `<b>Director: </b>${data.Director}`;
    childs[8].innerHTML = `<b>Writer: </b>${data.Writer}`;
    childs[9].innerHTML = `<b>Actors: </b>${data.Actors}`;
    childs[10].innerHTML = `<b>Plot: </b>${data.Plot}`;
    childs[11].innerHTML = `<b>Language: </b>${data.Language}`;
    childs[12].innerHTML = `<b>Country: </b>${data.Country}`;
    childs[13].innerHTML = `<b>Awards: </b>${data.Awards}`;
    childs[14].innerHTML = `<b>Metascore: </b>${data.Metascore}`;
    childs[15].innerHTML = `<b>IMDb Rating: </b>${data.imdbRating}`;
    childs[16].innerHTML = `<b>IMDb Votes: </b>${data.imdbVotes}`;
    childs[17].innerHTML = `<b>Type: </b>${data.Type}`;
    childs[18].innerHTML = `<b>DVD: </b>${data.DVD}`;
    childs[19].innerHTML = `<b>Box Office: </b>${data.BoxOffice}`;
    childs[20].innerHTML = `<b>Production: </b>${data.Production}`;

    let idx = -1;
    if(reviewList.length)idx=reviewList.findIndex(elmnt => String(elmnt.id)===String(id));
    console.log(idx);
    if(idx!==-1)
    {
        console.log(reviewList[idx]);
        givenReview.innerHTML = reviewList[idx].review;
        givenRating.innerHTML = reviewList[idx].rating;
    }
    else
    {
        givenReview.innerHTML = "";
        givenRating.innerHTML = "";
    }
    scrollToPageEnd();
}

function scrollToPageEnd() {
    const scrollDuration = 500;
    const endPosition = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: endPosition,
      behavior: 'smooth',
      duration: scrollDuration
    });
  }


function submitRating()
{
    let val = event.target.value;
    let idx = -1;
    if(reviewList.length)idx=reviewList.findIndex(elmnt => String(elmnt.id)===String(crntId));
    if(idx===-1)
    {
        reviewList.push({id:crntId,rating:val,review:""});
    }
    else
    {
        reviewList[idx].rating = val;
    }
    localStorage.setItem("reviewList", JSON.stringify(reviewList));
    givenRating.innerHTML = val;
    event.target.value = "";
}

function submitReview()
{
    let val = review.value;
    console.log(val);
    if(val==="")return;
    let idx = -1;
    if(reviewList.length)idx=reviewList.findIndex(elmnt => String(elmnt.id)===String(crntId));
    if(idx===-1)
    {
        reviewList.push({id:crntId,rating:"",review:val});
    }
    else
    {
        reviewList[idx].review = val;
    }
    localStorage.setItem("reviewList", JSON.stringify(reviewList));
    givenReview.innerHTML = val;
    review.val = "";
}

function initValues(){
    if(reviewList.length===0)return
    givenReview.innerHTML = reviewList[0].review;
    givenRating.innerHTML = reviewList[0].rating;
}
initValues();
// localStorage.clear();
