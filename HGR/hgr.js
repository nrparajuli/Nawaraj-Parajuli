
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav-links");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", nav.classList.contains("open"));
    });
  }

  document.querySelectorAll(".year").forEach(function(el){
    el.textContent = new Date().getFullYear();
  });

  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener("click", function(e){
      const target = document.querySelector(a.getAttribute("href"));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:"smooth"});
      }
    });
  });
});
