document.addEventListener("DOMContentLoaded", () => {
  const gameImages = [
    { src: "images/Extrait1.jpg", ursusPosition: { x: 91.99, y: 87.28 } },
    { src: "images/Extrait2.jpg", ursusPosition: { x: 91.98, y: 20.81 } },
    { src: "images/Extrait3.jpg", ursusPosition: { x: 10.47, y: 36.75 } },
    { src: "images/Extrait4.jpg", ursusPosition: { x: 10.0, y: 100.73 } },
    { src: "images/Extrait5.jpg", ursusPosition: { x: 90.57, y: 35.1 } },
    { src: "images/Extrait6.jpg", ursusPosition: { x: 90.06, y: 70.15 } },
    { src: "images/Extrait7.jpg", ursusPosition: { x: 13.8, y: 36.78 } },
  ]

  const startButton = document.getElementById("start-game")
  const gameContainer = document.getElementById("game-container")
  const gameImage = document.getElementById("game-image")
  const successMessage = document.getElementById("success-message")
  const gameOver = document.getElementById("game-over")
  const replayButton = document.getElementById("replay-button")
  const timerElement = document.getElementById("timer")
  const scoreElement = document.getElementById("score")
  const finalScoreElement = document.getElementById("final-score")

  let currentImage = 0
  let score = 0
  let timeLeft = 10
  let timer
  let isPlaying = false

  function startGame() {
    isPlaying = true
    currentImage = 0
    score = 0
    scoreElement.textContent = score
    startButton.classList.add("hidden")
    gameOver.classList.add("hidden")
    gameContainer.classList.remove("hidden")
    showCurrentImage()
    startTimer()
  }

  function showCurrentImage() {
    gameImage.src = gameImages[currentImage].src
    timeLeft = 10
    timerElement.textContent = timeLeft
  }

  function startTimer() {
    clearInterval(timer)
    timer = setInterval(() => {
      timeLeft--
      timerElement.textContent = timeLeft
      if (timeLeft <= 0) {
        handleNextImage()
      }
    }, 1000)
  }

  function handleInteraction(event) {
    if (!isPlaying) return

    event.preventDefault()

    const rect = gameImage.getBoundingClientRect()
    const x =
      (((event.type.startsWith("touch") ? event.touches[0].clientX : event.clientX) - rect.left) / rect.width) * 100
    const y =
      (((event.type.startsWith("touch") ? event.touches[0].clientY : event.clientY) - rect.top) / rect.height) * 100

    const currentUrsus = gameImages[currentImage].ursusPosition
    const distance = Math.sqrt(Math.pow(x - currentUrsus.x, 2) + Math.pow(y - currentUrsus.y, 2))

    if (distance < 15) {
      // Augmentation de la zone de détection pour faciliter le jeu sur mobile
      clearInterval(timer)
      score++
      scoreElement.textContent = score
      successMessage.classList.remove("hidden")

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
  gameContainer.addEventListener("click", handleInteraction)
  gameContainer.addEventListener("touchstart", handleInteraction)

  // Gestion du menu burger
  const menuToggle = document.querySelector(".menu-toggle")
  const mainNav = document.querySelector(".main-nav")

  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open")
  })

  // Fermer le menu lorsqu'un lien est cliqué
  const navLinks = document.querySelectorAll(".main-nav a")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open")
    })
  })

  // Fermer le menu si on clique en dehors
  document.addEventListener("click", (e) => {
    if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
      mainNav.classList.remove("open")
    }
  })
})

