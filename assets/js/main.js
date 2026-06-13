document.addEventListener("DOMContentLoaded", function () {

  const navbar = document.querySelector("#navbar");
  const toggle = document.querySelector(".mobile-nav-toggle");

  if (!navbar || !toggle) return;

  toggle.addEventListener("click", function (e) {
    e.preventDefault();

    // toggle mobile menu
    navbar.classList.toggle("navbar-mobile");

    // toggle icon
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  // close menu when clicking any link
  document.querySelectorAll("#navbar a").forEach(link => {
    link.addEventListener("click", () => {
      navbar.classList.remove("navbar-mobile");

      toggle.classList.add("bi-list");
      toggle.classList.remove("bi-x");
    });
  });

});