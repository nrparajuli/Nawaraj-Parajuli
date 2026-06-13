(function () {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /* =========================
     Navbar active on scroll
  ========================== */
  let navbarlinks = select("#navbar .scrollto", true);

  const navbarlinksActive = () => {
    let position = window.scrollY + 200;

    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;

      let section = select(navbarlink.hash);
      if (!section) return;

      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };

  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /* =========================
     Scroll to section
  ========================== */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    if (!header.classList.contains("header-scrolled")) {
      offset -= 20;
    }

    let elementPos = select(el).offsetTop;

    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /* =========================
     Header scroll class
  ========================== */
  let selectHeader = select("#header");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
    };

    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /* =========================
     Back to top button
  ========================== */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };

    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /* =========================
     MOBILE NAV FIX (IMPORTANT)
  ========================== */
  on("click", ".mobile-nav-toggle", function (e) {
    e.preventDefault();

    const navbar = select("#navbar");
    navbar.classList.toggle("navbar-mobile");

    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /* =========================
     Dropdown in mobile
  ========================== */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /* =========================
     Scroll links (FIXED — prevents instant close bug)
  ========================== */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");

        // close mobile menu only AFTER clicking link
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");

          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.remove("bi-x");
          navbarToggle.classList.add("bi-list");
        }

        scrollto(this.hash);
      }
    },
    true
  );

  /* =========================
     Scroll on page load with hash
  ========================== */
  window.addEventListener("load", () => {
    if (window.location.hash && select(window.location.hash)) {
      scrollto(window.location.hash);
    }
  });
})();