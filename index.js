const url = "https://www.omdbapi.com/?apikey=cbe0bb3f&";
const itemsPerPage = 10; 
let currentPage = 1 , totalPages = 1;

const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const movieList = document.getElementById('movieList');
const pagination = document.getElementById('pagination');
const totResSpan = document.getElementById('totResSpan');
const totPagesSpan = document.getElementById('totPagesSpan');
const crntPageSpan = document.getElementById('crntPageSpan');
const enterPage = document.getElementById('enterPage');
const movieDetails = document.getElementById('movieDetails'); 



async function findMovies(){
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
    console.log(id);
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

    scrollToPageEnd();
}


function scrollToPageEnd() {
    const scrollDuration = 1000;
    const endPosition = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: endPosition,
      behavior: 'smooth'
    });
  }



{/* <div class="movie-details" id="movieDetails">
        <img src="https://m.media-amazon.com/images/M/MV5BMTMxMjU0MTMxMl5BMl5BanBnXkFtZTcwNjY4Mjc3MQ@@._V1_SX300.jpg" alt="Movie Poster">
        <h2>The Top 14 Perform</h2>
        <p><strong>Year:</strong> 2008</p>
        <p><strong>Rated:</strong> N/A</p>
        <p><strong>Runtime:</strong> N/A</p>
        <p><strong>Genre:</strong> Music, Reality-TV</p>
        <p><strong>Director:</strong> Don Weiner</p>
        <p><strong>Writer:</strong> Simon Fuller, Nigel Lythgoe</p>
        <p><strong>Actors:</strong> Joshua Allen, Stephen Boss, Cat Deeley</p>
        <p><strong>Plot:</strong> Host Cat Deeley promised at the outset that the final 14 dancers will face some changes and the competition would get more difficult for the final seven couples. She soon explained that each of the couples would have to dance twic...</p>
        <p><strong>Language:</strong> N/A</p>
        <p><strong>Country:</strong> N/A</p>
        <p><strong>Awards:</strong> N/A</p>
        <p><strong>IMDb Rating:</strong> N/A</p>
        <p><strong>IMDb Votes:</strong> 21</p>
        <p><strong>Type:</strong> episode</p>
    </div> */}