export const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': `${process.env.API_KEY}`,
    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
  },
};

export const baseUrl = 'https://moviesdatabase.p.rapidapi.com';
