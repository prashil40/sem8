const API = process.env.REACT_APP_BACKEND;

export const getBureaus = async () => {
  return fetch(`${API}b/bureau/ `, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
