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

const delay = (ms, value) => {
  return new Promise((resolve, reject) => {
    //throw new Error("boom!");
    setTimeout(() => resolve(value), ms);
  });
};

delay(3000)
  .then(() => console.log("resolved"))
  .catch((err) => console.log(err));

const timeoutPromise = (ms, promise) => {
  let timeoutId;
  const timedOutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error("boom!"));
    }, ms);
  });

  return Promise.race([promise, timedOutPromise]).finally(() =>
    clearTimeout(timeoutId)
  );
};

const p1 = delay(5000, "A");
timeoutPromise(1000, p1)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

const queryData = (url) => {
  return fetch(url)
    .then((resp) => resp.json())
    .catch((err) => {
      return Promise.reject(err);
    });
};

const queryData = async (url) => {
  const resp = await fetch(url);
  if (!resp.ok) {
    throw Error("boom!");
  }
  return resp.json();
};

// Promise.all([?

//Async & Await
const main = async () => {
  try {
    const [films, people] = await Promise.all([
      queryData("https://swapi.dev/api/films/"),
      queryData("https://swapi.dev/api/people/")
    ]);
    output.innerText = `${films.count} films ${people.count} people`;
  } catch (err) {
    output.innerText = ":(";
  } finally {
    spinner.remove();
  }
};

main();
