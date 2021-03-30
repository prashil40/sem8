const API = process.env.REACT_APP_BACKEND;

export const getLetters = async () => {
  return fetch(`${API}l/letter/ `, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createLetters = async (data, id_proof) => {
  let formData = new FormData();
  formData.append("data", JSON.stringify(data));
  formData.append("id_proof", id_proof);
  return fetch(`${API}l/create/ `, {
    body: formData,
    method: "POST",
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
