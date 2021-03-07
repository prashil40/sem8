const API = process.env.REACT_APP_BACKEND;

export const getLetters = async () => {
  return fetch(`${API}l/letter/ `, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
