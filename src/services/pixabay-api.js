// Импортируем модуль axios для работы с HTTP-запросами
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '38654738-cfabe743c1eb2c961fa07a0de';

export const getImages = async (query, page) => {
  const response = await axios.get(
    `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`
  );
  if (response.status === 200) {
    const data = response.data;
    return data;
  } else {
    return Promise.reject(new Error(`Нет покемона с именем`));
  }
};
