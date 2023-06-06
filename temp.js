


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
        if(data.ok)
            showMovies(data.results);
    })
    .catch = (err)=>{
        console.log(err);
    }
}

function showMovies(data){
    main.innerHTML = '';
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie', 'col-md-4','img-responsive','img-resize');
        movieElement.innerHTML = `
            <div class='movie-pic'>
                <img src="${IMG_URL+poster_path}" alt="${title}">
            </div>
            <div class="movie-info">
                <h4>${title}</h4>
                <span class="${getVoteClass(vote_average)}">${vote_average}</span>
            </div>
             <div class="overview">
                 <h4>Overview</h4>
                 ${overview}
             </div>
        `;
        main.appendChild(movieElement);
    } )
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