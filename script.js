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

  targetPosition.x = currentSection === 0 ? 0 : currentSection % 2 === 0 ? 1.5 : -1.5
  targetPosition.y = currentSection === 0 ? -1.5 : 0
}

// Smooth movement to the target position
let animationFrameId

const moveToTarget = (mesh, target) => {
  const speed = 0.02
  mesh.position.x += (target.x - mesh.position.x) * speed
  mesh.position.y += (target.y - mesh.position.y) * speed

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

