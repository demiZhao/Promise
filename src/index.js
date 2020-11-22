import "./styles.css";

const output = document.getElementById("app");
const spinner = document.getElementById("spinner");
const URL = `https://swapi.dev/api/`;
const getFilms = (films) => {
  return films
    .sort((a, b) => a.episode_id - b.episode_id)
    .map((film) => `${film.episode_id} ${film.title}`)
    .join("\n");
};

fetch(URL + "films/")
  // Promise.resolve($.getJSON(URL + "films/"))
  .then((resp) => {
    //console.log(resp.ok);
    if (!resp.ok) {
      return Promise.reject(new Error("fail to fetch!"));
    }
    return resp.json();
  })
  .then((data) => data.results)
  .then((films) => {
    output.innerText = getFilms(films);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    spinner.remove();
  });

const delay = (ms) => {
  return new Promise((resolve, reject) => {
    throw new Error("boom!");
    setTimeout(resolve, ms);
  });
};

delay(3000)
  .then(() => console.log("resolved"))
  .catch((err) => console.log(err));
