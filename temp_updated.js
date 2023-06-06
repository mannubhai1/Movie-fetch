
const API_KEY= 'api_key=b3fd6a3db8724330fbf190baf621d33c';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;
// console.log(API_URL);

const search = document.getElementById('search');
const form = document.getElementById('form');
const main = document.getElementById('main');

function getMovies(url){
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data.results);
        showMovies(data.results);
    })
    .catch = (err)=>{
        console.log(err);
    }
}

function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;

        // Create a movie card element
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        // Create an image element for the movie poster
        const posterImg = document.createElement('img');
        posterImg.src = IMG_URL + poster_path;
        posterImg.alt = title;
        movieCard.appendChild(posterImg);

        // Create a div for movie information
        const movieInfoDiv = document.createElement('div');
        movieInfoDiv.classList.add('movie-info');

        // Create a heading for the movie title
        const titleHeading = document.createElement('h2');
        titleHeading.textContent = title;
        movieInfoDiv.appendChild(titleHeading);

        // Create a span for the vote average
        const voteSpan = document.createElement('span');
        voteSpan.classList.add(getVoteClass(vote_average));
        voteSpan.textContent = vote_average;
        movieInfoDiv.appendChild(voteSpan);

        // Create a div for the movie overview
        const overviewDiv = document.createElement('div');
        overviewDiv.classList.add('overview');
        overviewDiv.innerHTML = `
            <h4>Overview</h4>
            <p>${overview}</p>
        `;
        movieInfoDiv.appendChild(overviewDiv);

        movieCard.appendChild(movieInfoDiv);

        // Append the movie card to the main element
        main.appendChild(movieCard);
    });
}
function getVoteClass(votes){
    if(votes >= 8){
        return 'violet';
    }else if(votes >= 5){
        return 'green';
    }else{
        return 'yellow';
    }
}

var x;

function myFunction(){
    x= document.getElementById('input').value;
    console.log(x);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = x;
    console.log(searchTerm);    
    if(searchTerm){
        getMovies(searchURL+'&query='+searchTerm);
    }else{
        getMovies(API_URL);
    }
})

getMovies(API_URL);