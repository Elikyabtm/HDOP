const canvas = document.getElementById("scene")
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)

const scene = new THREE.Scene()

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5

// Load the PNG as a texture
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load("images/oursursus.png", () => {
  console.log("Image PNG chargée avec succès")
})

// Create a plane and apply the texture
const geometry = new THREE.PlaneGeometry(4, 5) // Adjust size as needed
const material = new THREE.MeshBasicMaterial({
  map: texture,
  transparent: true,
})
const plane = new THREE.Mesh(geometry, material)
plane.position.set(-2.5, -2, 0) // Initial position of the bear (more to the left)
plane.scale.set(2.5, 2.5, 1) // Make the bear 150% larger initially
scene.add(plane)

// Position target for animation
const targetPosition = { x: 0, y: 0 }

// Update the target position based on scroll
const updateTargetPosition = () => {
  const scrollY = window.pageYOffset
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollProgress = scrollY / (documentHeight - windowHeight)

  const sections = 7
  const currentSection = Math.floor(scrollProgress * sections)

  // Calculer un facteur de transition basé sur le défilement dans la première section
  const transitionFactor = Math.max(0, Math.min(1, scrollProgress * sections))

  // Interpoler la taille entre 2.5 (250%) et 2 (200%)
  const scale = 1.5 - 0.3 * transitionFactor

  if (currentSection === 0) {
    targetPosition.x = -2.5 + 2.5 * transitionFactor // Transition de -2.5 à 0
    targetPosition.y = -2 + 2 * transitionFactor // Transition de -2 à 0
  } else {
    // Augmenter l'amplitude du mouvement gauche-droite
    targetPosition.x = currentSection % 2 === 0 ? 3 : -3
    targetPosition.y = 0
  }

  // Appliquer la nouvelle échelle
  plane.scale.set(scale, scale, 1)
}

// Smooth movement to the target position
let animationFrameId

const moveToTarget = (mesh, target) => {
  const speed = 0.02
  mesh.position.x += (target.x - mesh.position.x) * speed
  mesh.position.y += (target.y - mesh.position.y) * speed

  // Transition douce de la taille
  const currentScale = mesh.scale.x
  const targetScale = plane.scale.x // Utilisez l'échelle calculée dans updateTargetPosition
  mesh.scale.x += (targetScale - currentScale) * speed
  mesh.scale.y += (targetScale - currentScale) * speed

  // Add a slight rotation to give the impression of floating
  mesh.rotation.z = Math.sin(Date.now() * 0.001) * 0.1

  animationFrameId = requestAnimationFrame(() => moveToTarget(mesh, target))
}

// Scroll event listener with debounce
let scrollTimeout
window.addEventListener("scroll", () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout)
  }
  scrollTimeout = window.requestAnimationFrame(() => {
    updateTargetPosition()
    startAnimation()
  })
})

// Animation loop
const animate = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
animate()

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

// Add Intersection Observer for fade-in animation
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    } else {
      entry.target.classList.remove("visible")
    }
  })
}, observerOptions)

document.querySelectorAll(".section").forEach((section) => {
  observer.observe(section)
})

// Add parallax effect function
const parallaxEffect = () => {
  const sections = document.querySelectorAll(".section")
  sections.forEach((section) => {
    const speed = 0.5
    const rect = section.getBoundingClientRect()
    const scrollPercentage = (window.innerHeight - rect.top) / window.innerHeight
    if (scrollPercentage > 0 && scrollPercentage < 1) {
      const yPos = -(scrollPercentage * speed * 100)
      section.style.backgroundPositionY = `${yPos}px`
    }
  })
}

// Throttle function to limit the rate at which the parallax effect is called
const throttle = (func, limit) => {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Add parallax event listener with throttling
window.addEventListener("scroll", throttle(parallaxEffect, 10))

// Add functions to start and stop animation
const startAnimation = () => {
  cancelAnimationFrame(animationFrameId)
  moveToTarget(plane, targetPosition)
}

const stopAnimation = () => {
  cancelAnimationFrame(animationFrameId)
}

// Start the animation immediately
updateTargetPosition()
startAnimation()


document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle")
  const mainNav = document.querySelector(".main-nav")

  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open")
    menuToggle.classList.toggle("open")
  })

  // Fermer le menu lorsqu'un lien est cliqué
  const navLinks = document.querySelectorAll(".main-nav a")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open")
      menuToggle.classList.remove("open")
    })
  })
})