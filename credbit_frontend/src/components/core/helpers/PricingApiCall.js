const API = process.env.REACT_APP_BACKEND;

export const getPricings = async () => {
  return fetch(`${API}p/pricing/ `, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getPricing = (pricing_url) => {
  return fetch(pricing_url, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};