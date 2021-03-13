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
