// Import anime and Howl libraries
const anime = window.anime
const Howl = window.Howl

// Preloader
window.addEventListener("load", () => {
  setTimeout(() => {
    anime({
      targets: "#preloader",
      opacity: 0,
      duration: 1000,
      easing: "easeOutQuad",
      complete: () => {
        document.getElementById("preloader").style.display = "none"
        initApp()
      },
    })
  }, 1500)
})

// Sons
const sounds = {
  click: new Howl({
    src: ["https://assets.codepen.io/217233/click.mp3"],
    volume: 0.5,
  }),
  start: new Howl({
    src: ["https://assets.codepen.io/217233/start.mp3"],
    volume: 0.7,
  }),
  reveal: new Howl({
    src: ["https://assets.codepen.io/217233/reveal.mp3"],
    volume: 0.7,
  }),
  option: new Howl({
    src: ["https://assets.codepen.io/217233/option.mp3"],
    volume: 0.4,
  }),
}

// Perguntas do Quiz
const questions = [
  {
    text: "Em uma situação de emergência, qual seria sua primeira reação?",
    options: [
      "Analisar rapidamente todas as variáveis antes de agir",
      "Confiar nos instintos e agir imediatamente",
      "Procurar ajuda ou alguém para colaborar",
      "Observar a situação de longe antes de se envolver",
      "Tentar acalmar e organizar as pessoas ao redor",
    ],
  },
  {
    text: "Qual elemento da natureza você se sente mais conectado?",
    options: [
      "Fogo - intenso e transformador",
      "Água - adaptável e profundo",
      "Ar - livre e em constante movimento",
      "Terra - estável e resistente",
      "Éter - misterioso e transcendental",
    ],
  },
  {
    text: "Como você prefere resolver problemas complexos?",
    options: [
      "Analisando padrões e buscando conexões ocultas",
      "Testando diferentes abordagens até encontrar a solução",
      "Consultando outras pessoas e buscando diferentes perspectivas",
      "Seguindo métodos comprovados e sistemáticos",
      "Confiando na intuição e deixando a solução surgir naturalmente",
    ],
  },
  {
    text: "Se pudesse escolher uma habilidade para dominar instantaneamente, qual seria?",
    options: [
      "Compreender e falar todos os idiomas do mundo",
      "Dominar qualquer instrumento musical ou forma de arte",
      "Entender profundamente o funcionamento do corpo humano",
      "Compreender sistemas complexos de tecnologia e engenharia",
      "Perceber e influenciar as emoções das pessoas",
    ],
  },
  {
    text: "Em um grupo, qual papel você geralmente assume?",
    options: [
      "Líder que toma decisões e direciona o grupo",
      "Mediador que harmoniza diferentes opiniões",
      "Pensador que analisa e propõe soluções criativas",
      "Executor que coloca as ideias em prática",
      "Observador que percebe detalhes que outros não notam",
    ],
  },
]

// Poderes e suas descrições
const powers = [
  {
    name: "Visão de Raio-X",
    description:
      "Você pode ver através de objetos sólidos, detectar estruturas internas e perceber detalhes invisíveis ao olho humano comum.",
    color: "#00e5ff",
  },
  {
    name: "Superinteligência",
    description:
      "Sua mente opera em níveis extraordinários, permitindo processar informações complexas instantaneamente e encontrar soluções para qualquer problema.",
    color: "#4a00e0",
  },
  {
    name: "Controle do Tempo",
    description:
      "Você pode manipular o fluxo temporal, desacelerando, acelerando ou até mesmo parando o tempo ao seu redor.",
    color: "#ffd700",
  },
  {
    name: "Teletransporte",
    description:
      "Você consegue se deslocar instantaneamente de um lugar para outro, atravessando o espaço sem percorrer a distância física entre os pontos.",
    color: "#ff00ff",
  },
  {
    name: "Invisibilidade",
    description:
      "Você pode tornar-se completamente invisível, manipulando como a luz interage com seu corpo, tornando-se imperceptível aos olhos.",
    color: "#a0a0a0",
  },
  {
    name: "Telecinese",
    description:
      "Você pode mover e manipular objetos com o poder da mente, controlando a matéria através de pura força de vontade.",
    color: "#ff5722",
  },
  {
    name: "Cura Acelerada",
    description:
      "Seu corpo regenera-se em velocidade extraordinária, curando ferimentos e doenças quase instantaneamente.",
    color: "#00ff7f",
  },
  {
    name: "Controle Elemental",
    description:
      "Você domina os elementos fundamentais da natureza, manipulando fogo, água, terra e ar conforme sua vontade.",
    color: "#ff4500",
  },
  {
    name: "Manipulação de Energia",
    description:
      "Você pode absorver, canalizar e projetar energia pura em suas diversas formas, desde eletricidade até energia cósmica.",
    color: "#ffff00",
  },
  {
    name: "Velocidade Sobrehumana",
    description:
      "Você se move em velocidades incríveis, percebendo o mundo em câmera lenta enquanto se desloca mais rápido que o olho humano pode acompanhar.",
    color: "#ff0000",
  },
  {
    name: "Leitura da Mente",
    description:
      "Você pode acessar os pensamentos e memórias de outras pessoas, compreendendo suas intenções e sentimentos mais profundos.",
    color: "#9370db",
  },
  {
    name: "Projeção Astral",
    description:
      "Sua consciência pode separar-se do corpo físico, permitindo que você viaje pelo plano astral e observe o mundo de uma perspectiva etérea.",
    color: "#00bfff",
  },
  {
    name: "Intangibilidade",
    description:
      "Você pode alterar a densidade molecular do seu corpo, passando através de objetos sólidos como se fossem ar.",
    color: "#87cefa",
  },
  {
    name: "Criação de Campo de Força",
    description:
      "Você gera barreiras de energia impenetráveis que podem proteger você e outros de praticamente qualquer ataque.",
    color: "#4169e1",
  },
  {
    name: "Manipulação da Realidade",
    description:
      "O poder supremo de alterar a própria estrutura da realidade, redefinindo as leis da física e transformando o mundo ao seu redor.",
    color: "#8a2be2",
  },
]

// Variáveis do aplicativo
let currentQuestion = 0
let answers = []
const particles = []

// Inicialização do aplicativo
function initApp() {
  // Animação do título na tela inicial
  anime({
    targets: ".title",
    opacity: [0, 1],
    translateY: [50, 0],
    duration: 1500,
    easing: "easeOutExpo",
  })

  anime({
    targets: ".subtitle",
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 1500,
    delay: 300,
    easing: "easeOutExpo",
  })

  anime({
    targets: "#start-btn",
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 1000,
    delay: 600,
    easing: "easeOutExpo",
  })

  // Inicializar partículas
  createParticles()
  animateParticles()

  // Event Listeners
  document.getElementById("start-btn").addEventListener("click", startQuiz)
  document.getElementById("share-btn").addEventListener("click", sharePower)
  document.getElementById("restart-btn").addEventListener("click", restartQuiz)
}

// Criar partículas para o fundo
function createParticles() {
  const container = document.getElementById("particles-container")

  for (let i = 0; i < 100; i++) {
    const particle = document.createElement("div")
    particle.classList.add("particle")
    particle.style.position = "absolute"
    particle.style.width = `${Math.random() * 3 + 1}px`
    particle.style.height = particle.style.width
    particle.style.background = Math.random() > 0.5 ? "var(--primary-color)" : "var(--secondary-color)"
    particle.style.borderRadius = "50%"
    particle.style.opacity = Math.random() * 0.5 + 0.2
    particle.style.left = `${Math.random() * 100}%`
    particle.style.top = `${Math.random() * 100}%`

    container.appendChild(particle)
    particles.push({
      element: particle,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25,
    })
  }
}

// Animar partículas
function animateParticles() {
  particles.forEach((particle) => {
    particle.x += particle.speedX
    particle.y += particle.speedY

    // Verificar limites
    if (particle.x < 0 || particle.x > window.innerWidth) particle.speedX *= -1
    if (particle.y < 0 || particle.y > window.innerHeight) particle.speedY *= -1

    particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`
  })

  requestAnimationFrame(animateParticles)
}

// Iniciar o quiz
function startQuiz() {
  sounds.start.play()

  switchScreen("start-screen", "quiz-screen")
  loadQuestion(currentQuestion)
}

// Carregar pergunta
function loadQuestion(index) {
  const question = questions[index]
  const progressBar = document.querySelector(".progress")
  const questionText = document.getElementById("question-text")
  const optionsContainer = document.getElementById("options-container")

  // Atualizar barra de progresso
  progressBar.style.width = `${(index / questions.length) * 100}%`

  // Animar a transição da pergunta
  anime({
    targets: questionText,
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 800,
    easing: "easeOutQuad",
  })

  // Definir texto da pergunta
  questionText.textContent = question.text

  // Limpar opções anteriores
  optionsContainer.innerHTML = ""

  // Adicionar novas opções
  question.options.forEach((option, i) => {
    const optionBtn = document.createElement("button")
    optionBtn.classList.add("option-btn")
    optionBtn.textContent = option
    optionBtn.dataset.index = i

    optionBtn.addEventListener("click", () => selectOption(i))

    optionsContainer.appendChild(optionBtn)

    // Animar entrada das opções
    anime({
      targets: optionBtn,
      opacity: [0, 1],
      translateX: [-20, 0],
      duration: 600,
      delay: 100 + i * 100,
      easing: "easeOutQuad",
    })
  })
}

// Selecionar opção
function selectOption(optionIndex) {
  sounds.option.play()

  // Remover seleção anterior
  const options = document.querySelectorAll(".option-btn")
  options.forEach((opt) => opt.classList.remove("selected"))

  // Selecionar opção atual
  options[optionIndex].classList.add("selected")

  // Animar opção selecionada
  anime({
    targets: options[optionIndex],
    scale: [1, 1.05, 1],
    duration: 400,
    easing: "easeOutQuad",
  })

  // Salvar resposta
  answers[currentQuestion] = optionIndex

  // Avançar para próxima pergunta após um breve delay
  setTimeout(() => {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++

      // Animar transição entre perguntas
      anime({
        targets: ".question-container",
        opacity: [1, 0],
        translateX: [0, -30],
        duration: 300,
        easing: "easeInQuad",
        complete: () => {
          loadQuestion(currentQuestion)
          anime({
            targets: ".question-container",
            opacity: [0, 1],
            translateX: [30, 0],
            duration: 500,
            easing: "easeOutQuad",
          })
        },
      })
    } else {
      showResult()
    }
  }, 800)
}

// Mostrar resultado
function showResult() {
  sounds.reveal.play()

  // Calcular poder com base nas respostas
  const powerIndex = calculatePower()
  const power = powers[powerIndex]

  // Definir informações do poder
  document.getElementById("power-name").textContent = power.name
  document.getElementById("power-description").textContent = power.description

  // Personalizar a cor do orbe de energia
  document.querySelector(".energy-orb").style.background = `radial-gradient(circle, ${power.color} 0%, transparent 70%)`
  document.querySelector(".energy-orb").style.boxShadow = `0 0 30px ${power.color}`

  // Transição para tela de resultado
  switchScreen("quiz-screen", "result-screen")

  // Animar elementos da tela de resultado
  anime({
    targets: ".power-name",
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 1000,
    easing: "easeOutElastic(1, .5)",
  })

  anime({
    targets: ".power-description",
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 800,
    delay: 300,
    easing: "easeOutQuad",
  })

  anime({
    targets: ".energy-orb",
    scale: [0, 1],
    opacity: [0, 1],
    duration: 1500,
    delay: 500,
    easing: "easeOutElastic(1, .5)",
  })

  anime({
    targets: "#share-btn, #restart-btn",
    opacity: [0, 1],
    translateY: [20, 0],
    delay: anime.stagger(200, { start: 1000 }),
    duration: 800,
    easing: "easeOutQuad",
  })
}

// Calcular poder com base nas respostas
function calculatePower() {
  // Algoritmo simples para determinar o poder com base nas respostas
  // Soma ponderada das respostas para gerar um índice
  let sum = 0

  answers.forEach((answer, index) => {
    sum += answer * (index + 1)
  })

  // Normalizar para o intervalo de poderes disponíveis
  return sum % powers.length
}

// Compartilhar poder
function sharePower() {
  sounds.click.play()

  const powerName = document.getElementById("power-name").textContent
  const text = `Meu superpoder no Projeto Gênesis é: ${powerName}! Descubra o seu em [URL do aplicativo]`

  // Animar botão
  anime({
    targets: "#share-btn",
    scale: [1, 1.1, 1],
    duration: 400,
    easing: "easeOutQuad",
  })

  // Verificar se a API de compartilhamento está disponível
  if (navigator.share) {
    navigator
      .share({
        title: "Projeto Gênesis",
        text: text,
      })
      .catch(console.error)
  } else {
    // Fallback - copiar para a área de transferência
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Texto copiado para a área de transferência!")
      })
      .catch((err) => {
        console.error("Erro ao copiar: ", err)
      })
  }
}

// Reiniciar quiz
function restartQuiz() {
  sounds.click.play()

  // Resetar variáveis
  currentQuestion = 0
  answers = []

  // Voltar para a tela inicial
  switchScreen("result-screen", "start-screen")
}

// Alternar entre telas
function switchScreen(fromId, toId) {
  const fromScreen = document.getElementById(fromId)
  const toScreen = document.getElementById(toId)

  // Animar saída da tela atual
  anime({
    targets: fromScreen,
    opacity: [1, 0],
    translateY: [0, -20],
    duration: 500,
    easing: "easeOutQuad",
    complete: () => {
      fromScreen.classList.remove("active")
      toScreen.classList.add("active")

      // Animar entrada da nova tela
      anime({
        targets: toScreen,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 500,
        easing: "easeOutQuad",
      })
    },
  })
}
