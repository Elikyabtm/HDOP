document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector("#section2")
    const anecdotes = document.querySelectorAll(".anecdote")
  
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          anecdotes.forEach((anecdote, index) => {
            setTimeout(() => {
              anecdote.classList.add("visible")
            }, index * 200) // Ajoute un délai pour une apparition en cascade
          })
          observer.unobserve(section) // Arrête d'observer une fois que l'animation est déclenchée
        }
      },
      { threshold: 0.3 },
    ) // Déclenche quand 30% de la section est visible
  
    observer.observe(section)
  })
  
  