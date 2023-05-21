import { clientCredentials } from '../utils/client';
// API CALLS FOR Resources

const endpoint = clientCredentials.databaseURL;

const getResources = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/resources.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getFaves = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/resources.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const favorite = Object.values(data).filter((item) => item.favorite); resolve(favorite);
    })
    .catch(reject);
});

const deleteResource = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/resources/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleResource = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/resources/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createResource = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/resources.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      const setcode = { firebaseKey: data.name };
      fetch(`${endpoint}/resources/${setcode.firebaseKey}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(setcode),
      }).then(resolve);
    })
    .catch(reject);
});

const updateResource = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/resources/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  updateResource,
  createResource,
  getSingleResource,
  deleteResource,
  getResources,
  getFaves,
};
