// scripts.js
document.addEventListener("DOMContentLoaded", function () {
  // Encontra o container do menu na página atual.
  const menuContainer = document.getElementById("menu-container");
  if (!menuContainer) return; // Se não houver container, não faz nada.

  // Usa a função fetch para carregar o conteúdo do menu.html.
  fetch("menu.html")
    .then((response) => response.text()) // Converte a resposta para texto.
    .then((data) => {
      // Insere o HTML do menu dentro do container.
      menuContainer.innerHTML = data;

      // Encontra o nome da página atual (ex: "agenda_e_reservas.html").
      const currentPage = window.location.pathname.split("/").pop();

      // Procura todos os links dentro do menu que acabamos de carregar.
      const menuLinks = menuContainer.querySelectorAll(".nav-link");

      // Itera sobre cada link para encontrar o que corresponde à página atual.
      menuLinks.forEach((link) => {
        const linkPage = link.getAttribute("href").split("/").pop();

        if (linkPage === currentPage) {
          // Se o link corresponde à página atual, adiciona a classe "active".
          link.classList.add("active");
          // Remove a classe "text-white" para que o estilo de "active" funcione.
          link.classList.remove("text-white");
        }
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar o menu:", error);
      menuContainer.innerHTML =
        "<p class='text-danger'>Não foi possível carregar o menu.</p>";
    });
});
