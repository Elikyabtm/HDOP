document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      })
    })
  })

  // Fade-in animation for sections
  const sections = document.querySelectorAll(".section")
  const fadeInOptions = {
    threshold: 0.1,
  }

  const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1
        entry.target.style.transform = "translateY(0)"
        observer.unobserve(entry.target)
      }
    })
  }, fadeInOptions)

  sections.forEach((section) => {
    section.style.opacity = 0
    section.style.transform = "translateY(20px)"
    section.style.transition = "opacity 0.5s ease, transform 0.5s ease"
    fadeInObserver.observe(section)
  })

  // Hover effect for composition items
  const compositionItems = document.querySelectorAll(".composition-item")
  compositionItems.forEach((item) => {
    item.addEventListener("mouseover", () => {
      item.style.transform = "scale(1.1)"
    })
    item.addEventListener("mouseout", () => {
      item.style.transform = "scale(1)"
    })
  })
})

document.addEventListener("DOMContentLoaded", () => {
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
