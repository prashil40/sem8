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

export const getClientLetters = async (client_id) => {
  return fetch(`${API}l/letter/client/ `, {
    method: 'GET',
    headers: {
      'id': client_id,
      'content-type': 'application/json',
    }
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
}
