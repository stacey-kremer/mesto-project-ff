

const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-16', 
    headers: {
        authorization: '9a04eedd-18d6-48b8-8224-f2e868a5f7df',
        'Content-Type': 'application/json',
    },
  };

  function checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
  
  export const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    }).then(checkResponse);
  };
  
  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    }).then(checkResponse);
  };
  
   export const editUserData = (data) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify(data),
    }).then(checkResponse);
  };
  
  export const postNewCard = ({ name, link }) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({ name, link }),
    }).then(checkResponse);
  };
  
  export const deleteLikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    }).then(checkResponse);
  };
  
  export const addLikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers,
    }).then(checkResponse);
  };
  
  export const removeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    }).then(checkResponse);
  };
  
    export const updateAvatar = (avatar) => {
      return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          avatar: avatar,
        }),
      }).then(checkResponse);
    };