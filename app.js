const novaTarefaInput = document.querySelector("#novaTarefaInput");
const novaTarefaSubmit = document.querySelector("#novaTarefaSubmit");
const listaTarefas = document.querySelector("#lista");
const botaoEditar = document.querySelector(".editar");
let lista = [];

novaTarefaInput.addEventListener("input", function () {
  const value = this.value;
  this.value = value.charAt(0).toUpperCase() + value.slice(1);
});

novaTarefaSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  setItemDB();
  novaTarefaInput.value = "";
  novaTarefaInput.focus();
});

novaTarefaSubmit.addEventListener("keypress", (e) => {
  e.preventDefault();
  if (e.code === "Enter") {
    novaTarefaInput.value = "";
    setItemDB();
    novaTarefaInput.focus();
  }
});

function setItemDB() {
  if (novaTarefaInput.value != "") {
    lista.push(novaTarefaInput.value);
  }
  updateDB();
}

function updateDB() {
  localStorage.setItem("todoList", JSON.stringify(lista));
  loadItens();
}

function loadItens() {
  listaTarefas.innerHTML = "";
  lista = JSON.parse(localStorage.getItem("todoList")) ?? [];
  lista.forEach((item, i) => {
    insertItemTela(item, i);
  });
}

function insertItemTela(item, i) {
  let divTarefas = document.createElement("div");
  divTarefas.classList.add("tarefas");
  listaTarefas.appendChild(divTarefas);

  let divTarefa = document.createElement("div");
  divTarefa.classList.add("tarefa");
  divTarefas.appendChild(divTarefa);

  let divConteudo = document.createElement("div");
  divConteudo.classList.add("conteudo");
  divTarefa.appendChild(divConteudo);

  let inputTexto = document.createElement("input");
  inputTexto.classList.add("texto");
  inputTexto.classList.add("capitalize");
  inputTexto.type = "text";
  inputTexto.value = `${item}`;
  inputTexto.setAttribute("readonly", "readonly");
  divConteudo.appendChild(inputTexto);

  const botaoEditar = document.createElement("button");
  botaoEditar.classList.add("botoes");
  botaoEditar.classList.add("botaoEditar");
  botaoEditar.innerText = "Editar";
  divTarefa.appendChild(botaoEditar);

  const botaoDeletar = document.createElement("button");
  botaoDeletar.classList.add("botoes");
  botaoDeletar.classList.add("botaoDeletar");
  botaoDeletar.innerText = "Deletar";
  botaoDeletar.setAttribute("onclick", `deletar(${i})`);
  divTarefa.appendChild(botaoDeletar);

  botaoEditar.addEventListener("click", () => {
    if (botaoEditar.innerText.toLowerCase() == "editar") {
      inputTexto.removeAttribute("readonly");
      inputTexto.focus();
      botaoEditar.innerText = "Salvar";
    } else {
      lista[i] = inputTexto.value;
      updateDB();
      inputTexto.setAttribute("readonly", "readonly");
      botaoEditar.innerText = "Editar";
    }
  });

  novaTarefa.value = "";
  novaTarefa.focus();
}

function deletar(i) {
  lista.splice(i, 1);
  updateDB();
}

loadItens();

// -------------------------------------------

let url = " https://type.fit/api/quotes";
fetch(url).then((response) => {
  response.json().then(fraseAutor);
});

function fraseAutor(data) {
  const frase = document.getElementById("frase");
  var rand = Math.floor(Math.random() * data.length);
  var text = data[rand].text + " - " + data[rand].author;
  frase.innerText = text;
}

// -----------------------------------------------------------------

const timer = document.querySelector(".timer");
const timerConfigIcon = document.querySelector("#timerConfigIcon");
const configContainer = document.querySelector("#configContainer");
const pausaLonga = document.getElementById("pausaLonga");
const pomodoro = document.getElementById("pomodoro");
const pausaCurta = document.getElementById("pausaCurta");
let horasPausadas = 0;
let minutosPausados = 0;
let segundosPausados = 0;
var pausar = document.getElementById("pausar");

timerConfigIcon.addEventListener("click", () => {
  configContainer.classList.toggle("toggle");
});



var salvarValor = function () {
  var pomodoroH = document.getElementById("pomodoroH").value;
  localStorage.setItem("pomodoroH", pomodoroH);

  var pomodoroM = document.getElementById("pomodoroM").value;
  localStorage.setItem("pomodoroM", pomodoroM);

  var pausaC = document.getElementById("pausaC").value;
  localStorage.setItem("pausaC", pausaC);

  var pausaLo = document.getElementById("pausaLo").value;
  localStorage.setItem("pausaLo", pausaLo);
};

if (localStorage.pomodoroH) {
  document.getElementById("pomodoroH").value = localStorage.pomodoroH;
}
if (localStorage.pomodoroM) {
  document.getElementById("pomodoroM").value = localStorage.pomodoroM;
}
if (localStorage.pausaC) {
  document.getElementById("pausaC").value = localStorage.pausaC;
}
if (localStorage.pausaLo) {
  document.getElementById("pausaLo").value = localStorage.pausaLo;
}

document.onchange = salvarValor;

document.getElementById("pomodoroH").value = ''
document.getElementById("pomodoroM").value = ''
document.getElementById("pausaC").value = ''
document.getElementById("pausaLo").value = ''

timer.innerHTML = `
<div>00</div>
<div class="colon">:</div>
<div>00</div>
<div class="colon">:</div>
<div>00</div>
`;

function updateClockDisplay(hours, minutes, seconds) {
  const hrs = hours.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const mins = minutes.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const secs = seconds.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  document.title = `${hrs}:${mins}:${secs}`;

  timer.innerHTML = `
    <div>${hrs}</div>
    <div class="colon">:</div>
    <div>${mins}</div>
    <div class="colon">:</div>
    <div>${secs}</div>
  `;
}

function displayTimeIsUp() {
  timer.innerHTML = `
    <div>00</div>
    <div class="colon">:</div>
    <div>00</div>
    <div class="colon">:</div>
    <div>00</div>
  `;
}

var tempoFormatado = "";
let timerIntervalId;

function startTimer(hours, minutes, seconds) {
  const totalTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
  const startTime = Date.now();
  const futureTime = startTime + totalTime;

  function updateTimer() {
    const currentTime = Date.now();
    const remainingTime = futureTime - currentTime;

    if (remainingTime < 0) {
      clearInterval(timerIntervalId);
      let audio = document.getElementById('audio')
      const borda = document.querySelector('.circle-container')
      const circulo = document.querySelector('.outermost-circle')
      const circle = document.querySelector('.circle-container')
    
      circle.classList.remove("animacao")
      circulo.style.backgroundColor = "rgba(155,148,148, 0.6)"
      borda.style.boxShadow = "rgba(103, 92, 92, 0.6) 0px 0px 0px 2px, " +
      "rgba(77, 73, 69, 0.6) 0px 4px 6px -1px, " +
      "rgba(255, 255, 255, 0.6) 0px 1px 0px inset";
      timer.style.color = "red";
      document.title = "Acabou o tempo!";
    
      audio.play()
      displayTimeIsUp();
      return;
    }

    const hrs = Math.floor(
      (remainingTime / (1000 * 60 * 60)) % 24
    ).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    const mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString(
      "en-US",
      {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }
    );
    const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString(
      "en-US",
      {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }
    );

    document.title = `${hrs}:${mins}:${secs}`;

    timer.innerHTML = `
      <div>${hrs}</div>
      <div class="colon">:</div>
      <div>${mins}</div>
      <div class="colon">:</div>
      <div>${secs}</div>
    `;

    tempoFormatado = `${hrs}:${mins}:${secs}`;

    if (pausar.innerText === "Pausar") {
      horasPausadas = parseInt(hrs, 10);
      minutosPausados = parseInt(mins, 10);
      segundosPausados = parseInt(secs, 10);
    }
  }

  updateTimer();
  timerIntervalId = setInterval(updateTimer, 1000);
}

pausar.addEventListener('click', () => {
  if (pausar.innerText === "Pausar") {
    clearInterval(timerIntervalId);
    const circle = document.querySelector('.circle-container')
    circle.classList.remove("animacao")
    pausar.innerText = "Retomar";
  } else if (pausar.innerText === "Retomar") {
    pausar.innerText = "Pausar";
    const totalTime = ((horasPausadas * 3600) + (minutosPausados * 60) + segundosPausados) * 1000;
    const currentTime = Date.now();
    const futureTime = currentTime + totalTime;
    const remainingTime = futureTime - currentTime;

    const horasRestantes = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    const minutosRestantes = Math.floor((remainingTime / (1000 * 60)) % 60);
    const segundosRestantes = Math.floor((remainingTime / 1000) % 60);
    startTimer(horasRestantes, minutosRestantes, segundosRestantes);
    const circle = document.querySelector('.circle-container')
    circle.classList.add("animacao")
  }
});



pausaLonga.addEventListener("click", () => {
  clearInterval(timerIntervalId);
  animacao()
  pausar.innerText = "Pausar";
  const hours = 0;
  const minutes = pausaLo.value;
  var seconds = 0;
  startTimer(hours, minutes, seconds);
});

pausaCurta.addEventListener("click", () => {
  clearInterval(timerIntervalId);
  animacao()
  const hours = 0;
  const minutes = pausaC.value;
  var seconds = 0;
  startTimer(hours, minutes, seconds);
  pausar.innerText = "Pausar";
});

pomodoro.addEventListener("click", () => {
  clearInterval(timerIntervalId);
  animacao()
  const hours = pomodoroH.value;
  const minutes = pomodoroM.value;
  var seconds = 0;
  startTimer(hours, minutes, seconds);
  pausar.innerText = "Pausar";
});

function animacao(){
  const circle = document.querySelector('.circle-container')
  const borda = document.querySelector('.circle-container')
  const circulo = document.querySelector('.outermost-circle')

  circulo.style.backgroundColor = "rgba(235, 203, 173, 0.6)"
  borda.style.boxShadow = "rgba(235, 203, 173, 0.6) 0px 0px 0px 2px, " +
  "rgba(235, 203, 173, 0.6) 0px 4px 6px -1px, " +
  "rgba(235, 203, 173, 0.6) 0px 1px 0px inset";
  timer.style.color = "white";
  circle.classList.add("animacao")
}

// ---------------------------------------------------------------------------

const urlP = "https://www.youtube.com/playlist?list=PLbLzqiv_04z7GfCYWcG_crAVhcfokgKRC"
const botaoMusica = document.querySelector(".botaoMusica")

function abrirPlaylist (urlP) {
  const win = window.open(urlP, '_blank')
  win.focus()
}

botaoMusica.addEventListener('click', () => {
  console.log('clicasd')
  abrirPlaylist(urlP)
})