export function fetchAPI(id) {
    return fetch('https://swapi.dev/api/people/{id}/').then((response) => response.json());
}

export function fetchHW(url) {
    return fetch(url).then((response) => response.json());
}

export function fetchFilmsList(urls) {
    const filmPromises = urls.map((url) => fetch(url).then((response) => response.json()));
    return Promise.all(filmPromises);
}