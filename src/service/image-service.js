import axios from 'axios';

const API_KEY = '34827172-203207521b1a5ab45d0b9403b';
axios.defaults.baseURL = 'https://pixabay.com/api/';
export const perPage = 12;

export const getImages = async (query, page) => {
  const responce = await axios.get(
    `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );
  return responce.data;
};

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
