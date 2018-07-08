export default (response) => {
    if (response.ok) {
        return response.text();
    } else {
        throw Error(response.statusText);
    }
}