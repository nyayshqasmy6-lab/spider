const web = document.querySelector("#web");
const upper = document.querySelector("#upper");
const lower = document.querySelector("#lower");
const replay = document.querySelector("#replay");

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function resetPath(path) {
  path.style.animation = "none";
  path.classList.remove("drawing");
  path.style.fillOpacity = "0";
  const length = path.getTotalLength();
  path.style.strokeDasharray = `${length}`;
  path.style.strokeDashoffset = `${length}`;
}

function tracePath(path, duration) {
  return new Promise(resolve => {
    path.style.animation = `trace ${duration}ms linear forwards`;
    path.addEventListener("animationend", resolve, { once: true });
  });
}

async function play() {
  replay.disabled = true;
  resetPath(web);
  resetPath(upper);
  resetPath(lower);
  await sleep(80);

  // First draw the long, slightly irregular web.
  await tracePath(web, 2600);

  // Then trace the silhouette shapes taken from the supplied reference image.
  await tracePath(upper, 1800);
  await tracePath(lower, 2600);

  // Fill both traced shapes to solid black.
  for (const path of [upper, lower]) {
    path.style.animation = "fillIn 850ms ease forwards";
  }

  await sleep(900);
  replay.disabled = false;
}

replay.addEventListener("click", play);
play();
