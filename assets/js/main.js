console.log("MAIN JS IS LOADED");

document.addEventListener("DOMContentLoaded", function () {

  console.log("DOM READY");

  const navbar = document.getElementById("navbar");
  const toggle = document.querySelector(".mobile-nav-toggle");

  console.log(navbar);
  console.log(toggle);

  toggle.addEventListener("click", function () {

    console.log("CLICKED");

    navbar.classList.toggle("navbar-mobile");

    console.log(navbar.className);

  });

});