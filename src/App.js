import React from 'react';
import Movie from './Components/Movie';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isLoading: true,
      movies: []
    }
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({isLoading: false});
    // }, 6000);
    fetch('https://yts-proxy.nomadcoders1.now.sh/list_movies.json?sort_by=rating')
      .then(response => response.json())
      .then(data => data.data.movies)
      .then(movies => {
        this.setState({ movies, isLoading: false });
      })
      .catch(err => console.log('error getting movies'));
  }

  renderMovies() {
    const { movies } = this.state;
    return movies.map((movie, i) => {
      return (<Movie
        id={movie.id}
        year={movie.year}
        title={movie.title}
        summary={movie.summary}
        poster={movie.medium_cover_image}
        key={i}
      />)
    })
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        {isLoading ? 'loading' : this.renderMovies()}
      </div>
    )
  }
}

export default App;
