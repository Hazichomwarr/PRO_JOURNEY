const hamburger = document.getElementById("hamburger");
      const navLinks = document.getElementById("nav-links");

      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
      });

        const imagesArr = [
          {
            src: "images/pic-with-son.jpeg",
            alt: "Hamza and son in traditionnal attires ",
          },
          { src: "images/me&kids.jpg", alt: "Hamza at play with kids" },
          { src: "images/pic.jpeg", alt: "Hamza in a tux" },
        ];

        let randomIndex = Math.floor(Math.random() * imagesArr.length);
        let randomImg = imagesArr[randomIndex];

        const headerImg = document.getElementById("hero-imag");
        headerImg.setAttribute("src", `./${randomImg.src}`);
        headerImg.setAttribute("alt", `./${randomImg.alt}`);
