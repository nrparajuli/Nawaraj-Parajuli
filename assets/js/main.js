document.addEventListener("DOMContentLoaded", function () {

  const navbar = document.querySelector("#navbar");
  const toggle = document.querySelector(".mobile-nav-toggle");

  if (!navbar || !toggle) return;

  toggle.addEventListener("click", function () {
    navbar.classList.toggle("navbar-mobile");

    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  document.querySelectorAll("#navbar a").forEach(link => {
    link.addEventListener("click", () => {
      navbar.classList.remove("navbar-mobile");
      toggle.classList.add("bi-list");
      toggle.classList.remove("bi-x");
    });
  });

});