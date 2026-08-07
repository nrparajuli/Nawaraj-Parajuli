document.addEventListener("DOMContentLoaded", function () {

  const navbar = document.querySelector("#navbar");
  const toggle = document.querySelector(".mobile-nav-toggle");

  if (!navbar || !toggle) return;

  // Toggle mobile menu
  toggle.addEventListener("click", function () {

    navbar.classList.toggle("navbar-mobile");

    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");

  });

  // Mobile dropdowns
  document.querySelectorAll(".navbar .dropdown > a").forEach(function (item) {

    item.addEventListener("click", function (e) {

      if (!navbar.classList.contains("navbar-mobile")) return;

      e.preventDefault();

      const submenu = this.nextElementSibling;

      submenu.classList.toggle("dropdown-active");

    });

  });

  // Close menu when normal link clicked
  document.querySelectorAll(".navbar a").forEach(function (link) {

    link.addEventListener("click", function () {

      if (this.parentElement.classList.contains("dropdown")) return;

      navbar.classList.remove("navbar-mobile");

      toggle.classList.add("bi-list");
      toggle.classList.remove("bi-x");

      document.querySelectorAll(".dropdown-active").forEach(function (d) {
        d.classList.remove("dropdown-active");
      });

    });

  });

});