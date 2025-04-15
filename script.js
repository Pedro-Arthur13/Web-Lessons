let currentAudio = null;

function getLangFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("lang") || "en";
}

const lang = getLangFromUrl();

const translations = {
  en: {
    title: "The Children Who Saw the Slenderman",
    paragraph: "Slender Man is a popular internet urban legend and horror icon...",
    quote: "We didn't want to go, we didn't want to kill them...",
    entities: [
      {
        name: "Skibidi Toilet",
        desc: "A bizarre viral internet phenomenon where human heads emerge from toilets and battle with camera-headed agents."
      },
      {
        name: "Slenderman",
        desc: "A tall, faceless entity with long limbs, known to stalk children and lure them into the forest."
      },
      {
        name: "John Pork",
        desc: "A surreal digital entity with a pig's head and a human body. Mysterious and uncanny, he appears in phone calls you cannot ignore."
      }
    ],
    fandoon: "View on Fandoon",
    playAudio: "Play Random Audio"
  },
  pt: {
    title: "As Crianças que Viram o Slenderman",
    paragraph: "Slender Man é uma lenda urbana popular da internet e um ícone do horror...",
    quote: "Nós não queríamos ir, nós não queríamos matá-los...",
    entities: [
      {
        name: "Skibidi Toilet",
        desc: "Um fenômeno viral bizarro da internet onde cabeças humanas emergem de vasos sanitários e lutam contra agentes com cabeças de câmera."
      },
      {
        name: "Slenderman",
        desc: "Uma entidade alta, sem rosto, com membros longos, conhecida por perseguir crianças e atraí-las para a floresta."
      },
      {
        name: "John Pork",
        desc: "Uma entidade digital surreal com cabeça de porco e corpo humano. Misterioso e inquietante, ele aparece em ligações que você não pode ignorar."
      }
    ],
    fandoon: "Ver no Fandoon",
    playAudio: "Tocar Áudio Aleatório"
  }
};

const t = translations[lang];

// Atualiza os textos na página
document.querySelector("h1").innerText = t.title;
document.querySelector("p").innerText = t.paragraph;
document.querySelector("blockquote").childNodes[0].nodeValue = `“${t.quote}”`;

const entityElements = document.querySelectorAll(".entity");
t.entities.forEach((data, index) => {
  const entity = entityElements[index];
  entity.querySelector("strong").innerText = data.name;
  entity.querySelector("p").innerText = data.desc;
});

document.getElementById("play-random-audio").innerText = t.playAudio;

// Função para tocar um áudio aleatório
document.getElementById("play-random-audio").addEventListener("click", () => {
  const sounds = [
    "sounds/italian_brainrot.mp3",
    "sounds/skibid.mp3",
    "sounds/shitpost.mp3",
    "sounds/audio4.mp3"
  ];

  const randomChoice = Math.random();

  if (randomChoice < 0.5) {
    // Tocar áudio aleatório
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    currentAudio = new Audio(randomSound);
    currentAudio.play();
  } else {
    // Exibir vídeo aleatório (não ambos, apenas um)
    const videoOptions = [
      { videoId: "rickroll-video", chance: 0.2 },   // 20% de chance para Rickroll
      { videoId: "video-2", chance: 0.2 },           // 20% de chance para outro vídeo
      { videoId: "video-3", chance: 0.2 },           // 20% de chance para outro vídeo
      { videoId: "video-4", chance: 0.2 },           // 20% de chance para outro vídeo
      { videoId: "video-5", chance: 0.2 }            // 20% de chance para outro vídeo
    ];

    let random = Math.random();
    let selectedVideo = null;
    let cumulativeChance = 0;

    for (let option of videoOptions) {
      cumulativeChance += option.chance;
      if (random < cumulativeChance) {
        selectedVideo = option.videoId;
        break;
      }
    }

    // Exibir o vídeo selecionado e esconder os outros
    if (selectedVideo) {
      const popup = document.getElementById("rickroll-popup");
      popup.classList.add("show");

      // Esconder todos os vídeos
      const allVideos = document.querySelectorAll(".popup-video");
      allVideos.forEach(video => video.style.display = "none");

      // Exibir o vídeo selecionado
      const selected = document.getElementById(selectedVideo);
      selected.style.display = "block";
      selected.currentTime = 0;
      currentAudio.pause();
      selected.play();
    }
  }
});

// Fechar o popup
document.getElementById("close-popup").addEventListener("click", () => {
  const popup = document.getElementById("rickroll-popup");
  const videos = document.querySelectorAll(".popup-content video");

  popup.classList.remove("show");

  // Pausar e resetar os vídeos
  videos.forEach(video => {
    video.pause();
    video.currentTime = 0;
  });
});
