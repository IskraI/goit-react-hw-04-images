import React, { Component } from 'react';
import css from '../components/App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from '../components/Button/Button';
import Loader from '../components/Loader/Loader';

import * as ImageService from '../service/image-service';
class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    totalResults: 0,
    perPage: 12,
    error: null,
    showGallery: false,
    isLoading: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getImage(query, page);
    }
  }

  handleSubmit = data => {
    this.setState({
      query: data,
      page: 1,
      images: [],
      totalResults: 0,
      perPage: 12,
      error: null,
      showGallery: false,
      isLoading: false,
    });
    // console.log(data);
  };

  getImage = async (query, page) => {
    this.setState({ isLoading: true });
    try {
      const data = await ImageService.getImages(query, page);
      // console.log(data);
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        totalResults: data.totalHits,
        perPage: 12,
      }));
      if (data.hits.length === 0) {
        this.setState({
          showGallery: true,
        });
      }
      // console.log(data.hits);
    } catch (error) {
      this.setState({ error: error.message });
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };
  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, totalResults, showGallery, error, isLoading } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSubmit} />
        {showGallery && (
          <p className={css.error}>Sorry. There are no images ... 😭</p>
        )}
        {error && <p className={css.error}>Sorry. There are {error} 😭</p>}

        {isLoading && <Loader />}
        {images.length > 0 && <ImageGallery dataGallery={this.state.images} />}
        {images.length > 0 && images.length < totalResults && (
          <Button onClick={this.handleLoadMore} looktext={isLoading}></Button>
        )}
      </div>
    );
  }
}
export default App;
