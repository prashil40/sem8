const API = process.env.REACT_APP_BACKEND;

export const signin = async (user) => {
  const formData = new FormData();
  for (const name in user) {
    formData.append(name, user[name]);
  }

  return fetch(`${API}auth/client/login/`, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signout = async (next) => {
  const userId = isAuthenticated() && isAuthenticated().user._id;
  if (typeof window !== undefined) {
    localStorage.removeItem('token');

    return fetch(`${API}auth/client/logout/${userId}/`, {
      method: 'GET',
    })
      .then((_response) => {
        console.log('Signout success');
        next();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
};

export const authenticate = (data, next) => {
  console.log("DATA", data);
  if (typeof window !== undefined) {
    localStorage.setItem('token', JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem('token')) {
    return JSON.parse(localStorage.getItem('token'));
  } else {
    return false;
  }
};

export const signup = async (user) => {
  delete user.confirm_password;
  delete user.error;
  delete user.allValid;
  delete user.success;
  delete user.match;

  console.log('USER', JSON.stringify(user));
  const body = JSON.stringify(user);
  return fetch(`${API}auth/client/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: body,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const checkEmailValidity = async (email) => {
  return fetch(`${API}auth/client/email/${email}/`)
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const updateClientInfo = async (user, url) => {
  const body = JSON.stringify(user);
  // console.log(body);

  return fetch(url, {
    method: 'PUT',
    body: body,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getClient = async () => {
  return fetch;
};
