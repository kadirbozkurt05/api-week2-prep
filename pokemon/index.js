"use strict";

const VALID_URL = "https://pokeapi.co/api/v2/pokemon/?limit=5";
const INVALID_URL = "https://pokeapi.co/api/v2/pokemons/?limit=5";

async function fetchJSON(url) {
  const result = await fetch(url);
  if (!result.ok) {
    return result.status;
  }
  const data = await result.json();
  return data;
}

function renderResults(pokemons) {
  const errorElement = document.querySelector("#error");
  errorElement.innerText = "";

  const pokemonsElement = document.querySelector("#json");
  pokemonsElement.innerText = JSON.stringify(pokemons, null, 2);
}

function renderError(err) {
  const pokemonsElement = document.querySelector("#json");
  pokemonsElement.innerText = "";

  const errorElement = document.querySelector("#error");
  errorElement.innerText = err;
}

function main() {
  const button = document.querySelector("#button");
  button.addEventListener("click", async () => {
    const option = document.querySelector("#option");
    const url = option.checked ? INVALID_URL : VALID_URL;

    try {
      const data = await fetchJSON(url);
      renderResults(data);
    } catch (err) {
      renderError(err.message);
    }
  });
}

window.addEventListener("load", main);
