const API = process.env.REACT_APP_BACKEND;

export const getClientSub = (client_id) => {
  return fetch(`${API}s/sub/type/client/`, {
    method: 'GET',
    headers: {
      id: client_id
    }
  })
    .then((response) => {
    return response.json();
  })
  .catch((err) => console.log(err));
}

export const getClientLetterSub = (letter_sub_url) => {
  return fetch(letter_sub_url)
    .then((response) => {
    return response.json();
  })
  .catch((err) => console.log(err));
}