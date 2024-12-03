window.addEventListener("load", sidenVises);
// Opretter global variables
let points;
let liv;

// Opretter global konstanter
const good = document.querySelectorAll(".good_sprite");
const bad = document.querySelectorAll(".bad_sprite");

console.log(good);

function sidenVises() {
  console.log("sidenVises");
  startSpillet();
}

function startSpillet() {
  console.log("startSpillet");
  //Nulstil point og udskriv
  points = 0;
  document.querySelector("#points").textContent = points
    .toString()
    .padStart(2, "0");

  //reset liv til 3
  liv = 3;
  document.querySelector("#liv").textContent = liv;

  //Start timer
  document.querySelector("#time_sprite").classList.add("time");
  document
    .querySelector("#time_container")
    .addEventListener("animationend", stopSpillet);

  //Giv en random position, start fald-animationer
  good.forEach((goodElement) => {
    goodElement.classList.add("pos" + nytRand(6), "fald", "delay" + nytRand(4));
    goodElement.addEventListener("animationiteration", genstartGood);
    goodElement.addEventListener("mousedown", clickGood);
  });

  bad.forEach((badElement) => {
    badElement.classList.add("pos" + nytRand(6), "fald", "delay" + nytRand(4));
    badElement.addEventListener("animationiteration", genstartBad);
    badElement.addEventListener("mousedown", clickBad);
  });
}

function clickGood() {
  console.log("clickGood");
  //ryd op, så man ikke kan kilkke på den samme flere gange
  this.removeEventListener("mousedown", clickGood);

  //frys (pause), fald-animationen
  this.classList.add("frys");

  //Tæl en op på points og udskriv
  points++;
  document.querySelector("#points").textContent = points
    .toString()
    .padStart(2, "0");
  setTimeout(() => genstartGood.call(this), 100); // bind `this` korrekt
}

function genstartGood() {
  console.log("genstartGood");
  //ryd op, fjern alt er på container og sprite
  this.classList = "";

  //For at kunne genstarte fald animationen, da vi fjener og tilføjer den i samme function
  this.offsetLeft;

  //Giv en random position til container og fald-animationer på element
  this.classList.add("good_sprite", "pos" + nytRand(6), "fald");

  //Lyt efter klik på element
  this.addEventListener("mousedown", clickGood);
}

function clickBad() {
  console.log("clickBad");
  //ryd op, så man ikke kan kilkke på den samme flere gange
  this.removeEventListener("mousedown", clickBad);

  //frys (pause), fald-animationen
  this.classList.add("frys");

  //Lyt efter forsvind-animationer er færdig
  this.addEventListener("animationend", genstartBad);

  //Tæl en ned på liv og udskriv
  liv--;
  document.querySelector("#liv").textContent = liv;
  if (liv <= 0) {
    stopSpillet();
  }
  setTimeout(() => genstartBad.call(this), 100); // bind `this` korrekt
}

function genstartBad() {
  console.log("genstartBad");
  //ryd op, fjern alt er på container og sprite
  this.classList = "";

  //For at kunne genstarte fald animationen, da vi fjener og tilføjer den i samme function
  this.offsetLeft;

  //Giv en random position til container og fald-animationer på element
  this.classList.add("bad_sprite", "pos" + nytRand(6), "fald");

  //Lyt efter klik på element
  this.addEventListener("mousedown", clickBad);
}

function stopSpillet() {
  console.log("stopSpillet");

  //Stop timer
  document.querySelector("#time_sprite").classList.remove("time");
  document
    .querySelector("#time_container")
    .removeEventListener("animationend", stopSpillet);

  //nulstil alle gode elementer

  good.forEach((element) => {
    element.classList = "";
    element.removeEventListener("animationiteration", genstartGood);
    element.removeEventListener("animationend", genstartGood);
    element.removeEventListener("mousedown", clickGood);
  });

  bad.forEach((element) => {
    element.classList = "";
    element.removeEventListener("animationiteration", genstartBad);
    element.removeEventListener("animationend", genstartBad);
    element.removeEventListener("mousedown", clickBad);
  });

  if (liv <= 0) {
    gameover();
  } else if (points >= 5) {
    levelComplete();
  } else {
    gameover();
  }
}

function gameover() {
  console.log("gameover");
}

function levelComplete() {
  console.log("levelComplete");
}

function nytRand(max) {
  return Math.floor(Math.random() * max) + 1;
}
