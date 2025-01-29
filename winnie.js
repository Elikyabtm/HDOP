import * as THREE from "three"

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#section2")
  const anecdotes = document.querySelectorAll(".anecdote")

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        anecdotes.forEach((anecdote, index) => {
          setTimeout(() => {
            anecdote.classList.add("visible")
          }, index * 200)
        })
        observer.unobserve(section)
      }
    },
    { threshold: 0.3 },
  )

  observer.observe(section)


  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })


  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(honeyParticles)

    honeyParticles.forEach((particle) => {
      particle.material.color.setHex(0xffd700)
    })

    if (intersects.length > 0) {
      intersects[0].object.material.color.setHex(0xff0000)
    }
  }

  window.addEventListener("mousemove", onMouseMove, false)
})

