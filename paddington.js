document.addEventListener("DOMContentLoaded", () => {
  // Configuration du jeu
  const gameImages = [
    {
      "src": "images/Extrait1.jpg",
      "ursusPosition": { "x": 91.99, "y": 87.28 }
    },
    {
      "src": "images/Extrait2.jpg",
      "ursusPosition": { "x": 91.98, "y": 20.81 }
    },    
    {
      "src": "images/Extrait3.jpg",
      "ursusPosition": { "x": 10.47, "y": 36.75 }
    },
    {
      "src": "images/Extrait4.jpg",
      "ursusPosition": { "x": 10.0, "y": 100.73 }
    },
    {
      "src": "images/Extrait5.jpg",
      "ursusPosition": { "x": 90.57, "y": 35.1 }
    },
    {
      "src": "images/Extrait6.jpg",
      "ursusPosition": { "x": 90.06, "y": 70.15 }
    },
    {
      "src": "images/Extrait7.jpg",
      "ursusPosition": { "x": 13.8, "y": 36.78 }
    }
  ]

  // Éléments du DOM
  const startButton = document.getElementById("start-game")
  const gameContainer = document.getElementById("game-container")
  const gameImage = document.getElementById("game-image")
  const successMessage = document.getElementById("success-message")
  const gameOver = document.getElementById("game-over")
  const replayButton = document.getElementById("replay-button")
  const timerElement = document.getElementById("timer")
  const scoreElement = document.getElementById("score")
  const finalScoreElement = document.getElementById("final-score")

  // Variables du jeu
  let currentImage = 0
  let score = 0
  let timeLeft = 10
  let timer
  let isPlaying = false
  let canClick = true // Nouvelle variable pour contrôler les clics

  // Fonctions du jeu
  function startGame() {
    isPlaying = true
    currentImage = 0
    score = 0
    scoreElement.textContent = score
    startButton.classList.add("hidden")
    gameOver.classList.add("hidden")
    gameContainer.classList.remove("hidden")
    canClick = true // Réinitialiser canClick au début du jeu
    showCurrentImage()
    startTimer()
  }

  function showCurrentImage() {
    gameImage.src = gameImages[currentImage].src
    timeLeft = 10
    timerElement.textContent = timeLeft
    canClick = true // Réactiver les clics pour la nouvelle image
  }

  function startTimer() {
    timer = setInterval(() => {
      timeLeft--
      timerElement.textContent = timeLeft
      if (timeLeft <= 0) {
        handleNextImage()
      }
    }, 1000)
  }

  function handleClick(e) {
    if (!isPlaying || !canClick) return // Vérifier si on peut cliquer

    const rect = gameImage.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    const currentUrsus = gameImages[currentImage].ursusPosition
    const distance = Math.sqrt(Math.pow(x - currentUrsus.x, 2) + Math.pow(y - currentUrsus.y, 2))

    if (distance < 10) {
      clearInterval(timer)
      score++
      scoreElement.textContent = score
      successMessage.classList.remove("hidden")
      canClick = false // Désactiver les clics après avoir trouvé Ursus

      setTimeout(() => {
        successMessage.classList.add("hidden")
        handleNextImage()
      }, 1500)
    }
  }

  function handleNextImage() {
    clearInterval(timer)
    if (currentImage < gameImages.length - 1) {
      currentImage++
      showCurrentImage()
      startTimer()
    } else {
      endGame()
    }
  }

  function endGame() {
    isPlaying = false
    clearInterval(timer)
    finalScoreElement.textContent = score
    gameContainer.classList.add("hidden")
    gameOver.classList.remove("hidden")
  }

  // Event listeners
  startButton.addEventListener("click", startGame)
  replayButton.addEventListener("click", startGame)
  gameContainer.addEventListener("click", handleClick)
})

