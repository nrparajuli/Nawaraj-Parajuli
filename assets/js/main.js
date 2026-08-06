document.addEventListener("DOMContentLoaded", () => {

  const navbar = document.querySelector("#navbar");
  const toggle = document.querySelector(".mobile-nav-toggle");

  if (!navbar || !toggle) return;

  // Open / Close mobile menu
  toggle.addEventListener("click", () => {
    navbar.classList.toggle("navbar-mobile");
    toggle.classList.toggle("bi-list");
    toggle.classList.toggle("bi-x");
  });

  // Mobile dropdowns
  document.querySelectorAll(".navbar .dropdown > a").forEach(link => {

    link.addEventListener("click", function(e){

      if(!navbar.classList.contains("navbar-mobile")) return;

      e.preventDefault();

      this.nextElementSibling.classList.toggle("dropdown-active");

    });

  });

  // Close menu only for normal links
  document.querySelectorAll("#navbar a").forEach(link=>{

    link.addEventListener("click",function(){

      if(this.parentElement.classList.contains("dropdown")) return;

      navbar.classList.remove("navbar-mobile");

      toggle.classList.add("bi-list");
      toggle.classList.remove("bi-x");

    });

  });

});