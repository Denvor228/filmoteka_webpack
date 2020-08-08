const baseURL = 'https://api.themoviedb.org/3/';
const apiKey = '60413e4c0935df0adbee558138220381';

export default{
  page:1,
  query: '',

  //пример запроса
  //https://api.themoviedb.org/3/trending/all/day?api_key=60413e4c0935df0adbee558138220381
  //https://developers.themoviedb.org/3/trending/get-trending

  // fetch на популярные фильмы
  fetchPopularMoviesList(){
    return fetch(`${baseURL}trending/all/day?api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
              return data.results;
    });
  },
  
  // fetch на фильмы по запросу
  fetchFilms(){
    return fetch(`${baseURL}search/movie?api_key=${apiKey}&language=en-US&query=${this.query}&page=${this.page}&include_adult=false`)
            .then(response => response.json())
            .then(data => {
              this.incrementPage();
              console.log(data.results)
              return data.results;
    });
  },
  get searchQuery(){
    return this.query;
  },
  set searchQuery(string){
    this.query = string;
  },
  incrementPage(){
    this.page += 1;
  },
  resetPage(){
    this.page = 1;
  },

  // fetch на фильмы по Id
  fetchMovieDetails(movieId){
    return fetch(`${baseURL}movie/${movieId}?api_key=${apiKey}`).then(response => response.json());
  }
  
}
