document.addEventListener("DOMContentLoaded", () => {
  const anecdoteItems = document.querySelectorAll(".anecdote-item")
  const menuToggle = document.querySelector(".menu-toggle")
  const mainNav = document.querySelector(".main-nav")

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1
        entry.target.style.transform = "translateY(0)"
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  anecdoteItems.forEach((item, index) => {
    item.style.opacity = 0
    item.style.transform = "translateY(20px)"
    item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`
    observer.observe(item)
  })

  // Burger menu functionality
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open")
  })

  // Close menu when a link is clicked
  const navLinks = document.querySelectorAll(".main-nav a")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open")
    })
  })

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
      mainNav.classList.remove("open")
    }
  })
})

