import * as THREE from "three"

document.addEventListener("DOMContentLoaded", () => {
  // Jeu "Où est Ursus?"
  const ursusTarget = document.getElementById("ursus-target")
  const gameResult = document.getElementById("game-result")

  ursusTarget.addEventListener("click", () => {
    gameResult.textContent = "Bravo ! Vous avez trouvé Ursus !"
    gameResult.style.color = "green"
  })

  // Animation de fond avec Three.js
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("backgroundCanvas"), alpha: true })

  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.position.z = 5

  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
  const material = new THREE.MeshBasicMaterial({ color: 0x964b00, transparent: true, opacity: 0.6 })
  const marmaladeParticles = []

  for (let i = 0; i < 100; i++) {
    const particle = new THREE.Mesh(geometry, material)
    particle.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 5 - 2.5)
    scene.add(particle)
    marmaladeParticles.push(particle)
  }

  function animate() {
    requestAnimationFrame(animate)

    marmaladeParticles.forEach((particle) => {
      particle.position.y -= 0.01
      if (particle.position.y < -5) {
        particle.position.y = 5
      }
      particle.rotation.x += 0.01
      particle.rotation.y += 0.01
    })

    renderer.render(scene, camera)
  }

  animate()

  // Redimensionnement de la fenêtre
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  // Interaction avec la souris
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(marmaladeParticles)

    marmaladeParticles.forEach((particle) => {
      particle.material.color.setHex(0x964b00)
    })

    if (intersects.length > 0) {
      intersects[0].object.material.color.setHex(0xff4500)
    }
  }

  window.addEventListener("mousemove", onMouseMove, false)
})

