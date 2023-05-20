import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from '../components/App.module.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from '../components/Button/Button';
import Loader from '../components/Loader/Loader';

import * as ImageService from '../service/image-service';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showGallery, setShowGallery] = useState(true);
  const [prevQuery, setPrevQuery] = useState('');
  const [prevPage, setPrevPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);

  const handleSubmit = searchQuery => {
    if (query === searchQuery) {
      toast.warning(
        'The same request was detected. Please change you search query.',
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      return;
    }
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
    setError(null);
    setShowGallery(true);
    setIsLoading(false);
    setLoadMore(false);
  };

  useEffect(() => {
    if (query === '') return;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const { hits, totalHits } = await ImageService.getImages(query, page);
        setImages(prevImages => [...prevImages, ...hits]);

        if (totalHits === 0) {
          setShowGallery(false);
        }

        if (totalHits <= page * ImageService.perPage) {
          setLoadMore(true);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (query !== '' && (query !== prevQuery || page !== prevPage)) {
      fetchData();
    }

    setPrevQuery(query);
    setPrevPage(page);
  }, [query, page, prevPage, prevQuery]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleSubmit} />
      {!showGallery && (
        <p className={css.error}>Sorry. There are no images ... 😭</p>
      )}
      {error && <p className={css.error}>Sorry. There are {error} 😭</p>}

      {isLoading && <Loader />}

      {images.length > 0 && <ImageGallery dataGallery={images} />}
      {images.length > 0 && !loadMore && (
        <Button onClick={handleLoadMore} looktext={isLoading}></Button>
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default App;
