// script.js

const apiKey = 'YOUR_OMDB_API_KEY';
const itemsPerPage = 10; // Number of movies to show per page
let currentPage = 1;

const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const movieListContainer = document.getElementById('movieList');
const paginationContainer = document.getElementById('pagination');

// Function to fetch movies from OMDB API
async function fetchMovies(searchQuery) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${cbe0bb3f}&s=${searchQuery}&page=${currentPage}`);
    const data = await response.json();
    return data.Search;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

// Function to display movies in the movie list container
function displayMovies(movies) {
  movieListContainer.innerHTML = '';
  movies.forEach(movie => {
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');
    movieDiv.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
    `;
    movieListContainer.appendChild(movieDiv);
  });
}

// Function to update pagination buttons
function updatePagination(totalResults) {
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  paginationContainer.innerHTML = '';

  for (let page = 1; page <= totalPages; page++) {
    const button = document.createElement('button');
    button.textContent = page;
    button.addEventListener('click', () => {
      currentPage = page;
      searchMovies();
    });
    paginationContainer.appendChild(button);
  }
}

// Function to handle search movies
async function searchMovies() {
  const searchQuery = searchInput.value;
  if (!searchQuery) return;

  const movies = await fetchMovies(searchQuery);
  if (movies.length === 0) {
    movieListContainer.innerHTML = '<p>No results found</p>';
    paginationContainer.innerHTML = '';
  } else {
    displayMovies(movies);
    updatePagination(movies.length);
  }
}

// Event listener for the search button
searchButton.addEventListener('click', searchMovies);

// Initial search when page loads
searchMovies();
