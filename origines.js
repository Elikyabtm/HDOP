import * as THREE from "three"

document.addEventListener("DOMContentLoaded", () => {
  const compositionItems = document.querySelectorAll(".composition-item")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    { threshold: 0.5 },
  )

  compositionItems.forEach((item) => {
    item.style.opacity = 0
    item.style.transform = "translateY(20px)"
    item.style.transition = "opacity 0.5s, transform 0.5s"
    observer.observe(item)
  })

  // Animation de fond avec Three.js
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("backgroundCanvas"), alpha: true })

  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.position.z = 5

  const geometry = new THREE.TorusGeometry(0.3, 0.1, 16, 100)
  const material = new THREE.MeshBasicMaterial({ color: 0x8b4513, transparent: true, opacity: 0.6 })
  const teddyRings = []

  for (let i = 0; i < 50; i++) {
    const ring = new THREE.Mesh(geometry, material)
    ring.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 5 - 2.5)
    ring.rotation.x = Math.random() * Math.PI
    ring.rotation.y = Math.random() * Math.PI
    scene.add(ring)
    teddyRings.push(ring)
  }

  function animate() {
    requestAnimationFrame(animate)

    teddyRings.forEach((ring) => {
      ring.rotation.x += 0.01
      ring.rotation.y += 0.01
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
    const intersects = raycaster.intersectObjects(teddyRings)

    teddyRings.forEach((ring) => {
      ring.material.color.setHex(0x8b4513)
    })

    if (intersects.length > 0) {
      intersects[0].object.material.color.setHex(0xd2691e)
    }
  }

  window.addEventListener("mousemove", onMouseMove, false)
})

