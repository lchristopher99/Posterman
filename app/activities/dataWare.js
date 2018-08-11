import { SecureStore } from 'expo';

export const postData = (user, pass, route) => {
  return new Promise((resolve, reject) => {
    let url = 'https://postman-bbc87.firebaseio.com' + route;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user,
        pass
      }),
    })
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

// will be used later as a general getData request
// export const getData = (route) => {
//   return new Promise((resolve, reject) => {
//     let url = 'https://postman-bbc87.firebaseio.com' + route;
//     fetch(url)
//       .then(res => res.json())
//       .then(parsedRes => {
//         const credsArray = [];
//         for (const key in parsedRes) {
//           credsArray.push({
//             user: parsedRes[key].user,
//             pass: parsedRes[key].pass,
//             id: key
//           });
//         }
//         resolve(credsArray);
//       })
//       .catch(err => reject(err));
//   })
// }

export const loginUser = (user, pass, route) => {
  return new Promise((resolve, reject) => {
    let url = 'https://postman-bbc87.firebaseio.com' + route;
    fetch(url)
      .then(res => res.json())
      .then(parsedRes => {
        const getKeys = (callback) => {
          const credsArray = [];
          for (const key in parsedRes) {
            credsArray.push({
              user: parsedRes[key].user,
              pass: parsedRes[key].pass,
              id: key
            });
          }
          callback(credsArray);
        }
        getKeys((credsArray) => {
          let i;
          for (i = 0; i < credsArray.length; i++) {
            if (credsArray[i].user == user && credsArray[i].pass == pass) {
              let UID = {
                user,
                pass
              }
              SecureStore.setItemAsync('UID', JSON.stringify(UID));
              resolve(true);
              break;
            } else {
              resolve(false);
              break;
            }
          }
        });
      })
      .catch(err => reject(err));
  })
}