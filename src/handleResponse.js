export default (response) => {
  if (response.ok) {
    return response.text();
  }
  throw Error(response.statusText);
};
