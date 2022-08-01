import "./charts.js";
import { setPokemon, setImage } from "./pokemon.js";

const $form = document.querySelector("#form");
const $next = document.querySelector("#next-pokemon");
const $nextImage = document.querySelector("#next-image");
const $prevImage = document.querySelector("#prev-image");
const $prev = document.querySelector("#prev-pokemon");
const $pokedex = document.querySelector("#pokedex");

// $form.addEventListener("submit", async (event) => {
//   event.preventDefault();
//   const form = new FormData($form);
//   const id = form.get("id");
//   const pokemon = await getPokemon(id);
//   const species = await getSpecies(id);
//   const description = species.flavor_text_entries.find(
//     (flavor) => flavor.language.name === "es"
//   );
//   $image.src = pokemon.sprites.front_default;
//   $description.textContent = description.flavor_text;

// });

$form.addEventListener("submit", handleSubmit);
$next.addEventListener("click", handleNextPokemon);
$prev.addEventListener("click", handlePrevPokemon);
$nextImage.addEventListener("click", handleNextImage);
$prevImage.addEventListener("click", handlePrevImage);
// $pokedex.addEventListener("click", handlePrevPokemon);

let activePokemon = null;

async function handleSubmit(event) {
  event.preventDefault();
  $pokedex.classList.add("is-open");
  const form = new FormData($form);
  const id = form.get("id");
  activePokemon = await setPokemon(id);
}

async function handleNextPokemon() {
  const id =
    activePokemon === null || activePokemon.id === 893
      ? 1
      : activePokemon.id + 1;
  // if (activePokemon.id === 894) {
  activePokemon = await setPokemon(id);
  // }
  // if (activePokemon !== null) {
  //   activePokemon = await setPokemon(activePokemon.id + 1);
  // }
}
async function handlePrevPokemon() {
  const id =
    activePokemon === null || activePokemon.id === 1
      ? 893
      : activePokemon.id - 1;
  activePokemon = await setPokemon(id);
}
let activeSprite = 0;
function handleNextImage() {
  if (activePokemon === null) return false;
  if (activeSprite >= activePokemon.sprites.length - 1) {
    activeSprite = 0;
    return setImage(activePokemon.sprites[activeSprite]);
  }
  activeSprite = activeSprite + 1;
  return setImage(activePokemon.sprites[activeSprite]);
}
function handlePrevImage() {
  if (activePokemon === null) return false;
  if (activeSprite <= 0) {
    activeSprite = activePokemon.sprites.length - 1;
    return setImage(activePokemon.sprites[activeSprite]);
  }
  activeSprite = activeSprite - 1;
  return setImage(activePokemon.sprites[activeSprite]);
}
