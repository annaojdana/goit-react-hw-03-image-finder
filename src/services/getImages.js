import axios from 'axios';

const getImages = async (query, limit) => {
  const apiKey = '2517208-093ee8e26dcc8dc903fe58900';
  try {
    const response = await axios.get("https://pixabay.com/api/?${params}", {
      params: {
        key: apiKey,
        q: query,
        per_page: limit,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default getImages;

