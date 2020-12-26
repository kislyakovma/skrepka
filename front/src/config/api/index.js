/**
 * It's suggested to configure the RESTful endpoints in this file
 * so that there is only one source of truth, future update of endpoints
 * could be done from here without refactoring on multiple places throughout the app
 */

const tinkoffApi = (uri, method) => {
  fetch(uri, {
    method,
    mode: 'no-cors',
    headers: {
      Authorization: 'Bearer t.C2O3PPv35gWjHRKy6LJ0v4b1tQWhnoWFInoekjbdVvGDHbKECgd3y1ELjZtN9Aria0ekzMg3N75TIn-75GdBXg',
    },
  }).then((response) => {
    console.log(response);
    return response;
  });
};

export { tinkoffApi };
