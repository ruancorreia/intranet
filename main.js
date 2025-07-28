/* Intranet/main.js */

document.addEventListener("DOMContentLoaded", () => {
    // --- EFEITOS DE SCROLL (FADE-IN) ---
    const fadeInElements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Para a animação não repetir
        }
      });
    }, { threshold: 0.1 });
  
    fadeInElements.forEach(el => observer.observe(el));
  
    // --- DADOS MOCADOS (SIMULANDO BANCO DE DADOS) ---
    const db = {
      funcionarios: [
        { nome: "João da Silva", ramal: "1234", email: "joao.silva@empresa.com.br", setor: "Tecnologia da Informação" },
        { nome: "Ana Carolina Souza", ramal: "4321", email: "ana.souza@empresa.com.br", setor: "Recursos Humanos" },
        { nome: "Carlos Pereira", ramal: "5678", email: "carlos.pereira@empresa.com.br", setor: "Financeiro" },
        { nome: "Mariana Costa", ramal: "8765", email: "mariana.costa@empresa.com.br", setor: "Marketing" },
      ],
      chamados: [
        { id: 1581, abertura: "16/08/2022", tipo: "Problemas de rede", solicitante: "Administrator", produto: "E-Commerce", categoria: "Hardware", situacao: "Rejeitado" },
        { id: 1587, abertura: "16/08/2022", tipo: "Computador não liga", solicitante: "Administrator", produto: "E-Commerce", categoria: "Software", situacao: "Aguardando" },
        { id: 1599, abertura: "16/08/2022", tipo: "Software indisponível", solicitante: "Administrator", produto: "Site", categoria: "Software", situacao: "Rejeitado" },
        { id: 1601, abertura: "16/08/2022", tipo: "Software indisponível", solicitante: "Administrator", produto: "CRM", categoria: "Rede", situacao: "Fechado" },
        { id: 1615, abertura: "16/08/2022", tipo: "Problemas de rede", solicitante: "Administrator", produto: "CRM", categoria: "Hardware", situacao: "Em Atendimento" },
        { id: 1645, abertura: "16/08/2022", tipo: "Computador não liga", solicitante: "Administrator", produto: "E-Commerce", categoria: "Hardware", situacao: "Aberto" },
        { id: 1663, abertura: "16/08/2022", tipo: "Regra de negócio falha", solicitante: "Administrator", produto: "Site", categoria: "Software", situacao: "Fechado" },
      ],
      ordensServico: [
         { id: "OS-2024-001", abertura: "20/07/2024", solicitante: "Carlos Pereira", tipo: "Manutenção Ar Condicionado", local: "Sala de Reuniões 1", status: "Concluída"},
         { id: "OS-2024-002", abertura: "22/07/2024", solicitante: "Mariana Costa", tipo: "Reparo Elétrico", local: "Cozinha", status: "Em Andamento"},
         { id: "OS-2024-003", abertura: "25/07/2024", solicitante: "João da Silva", tipo: "Instalação de Prateleira", local: "Almoxarifado", status: "Aguardando Atendimento"},
      ],
      ideias: [
          { titulo: "Implementar coleta seletiva nos andares", votos: 14 },
          { titulo: "Criar um clube do livro na empresa", votos: 8 },
          { titulo: "Happy hour mensal por Teams", votos: 22 },
      ]
    };
  
    // --- FUNÇÕES DA INTRANET ---
  
    // 1. Central de Telefonia: Busca
    const formBuscaRamal = document.getElementById("formBuscaRamal");
    if (formBuscaRamal) {
      formBuscaRamal.addEventListener("submit", (e) => {
        e.preventDefault();
        const termo = document.getElementById("buscaInput").value.toLowerCase();
        const resultados = db.funcionarios.filter(f =>
          f.nome.toLowerCase().includes(termo) ||
          f.ramal.includes(termo) ||
          f.setor.toLowerCase().includes(termo)
        );
        renderTabelaFuncionarios(resultados);
      });
      // Inicia a tabela com todos os funcionários
      renderTabelaFuncionarios(db.funcionarios);
    }
  
    function renderTabelaFuncionarios(funcionarios) {
      const corpoTabela = document.getElementById("tabelaRamaisBody");
      if (!corpoTabela) return;
      corpoTabela.innerHTML = "";
      if (funcionarios.length === 0) {
          corpoTabela.innerHTML = `<tr><td colspan="4" class="text-center">Nenhum resultado encontrado.</td></tr>`;
          return;
      }
      funcionarios.forEach(f => {
        corpoTabela.innerHTML += `<tr><td>${f.nome}</td><td>${f.ramal}</td><td>${f.email}</td><td>${f.setor}</td></tr>`;
      });
    }
  
    // 2. Chamados (Help Desk): Cadastro e Renderização
    const formNovoChamado = document.getElementById("formNovoChamado");
    if (formNovoChamado) {
      formNovoChamado.addEventListener("submit", (e) => {
        e.preventDefault();
        const novoChamado = {
          id: Math.floor(Math.random() * 1000) + 1700,
          abertura: new Date().toLocaleDateString('pt-BR'),
          tipo: "Novo Problema Genérico",
          solicitante: "Usuário Logado",
          produto: "Sistema Interno",
          categoria: "Software",
          situacao: "Aberto"
        };
        // Futuramente, aqui viria a chamada para o backend (MariaDB)
        console.log("Enviando para o banco de dados:", novoChamado);
        db.chamados.unshift(novoChamado); // Adiciona no início do array
        renderTabelaChamados();
        alert("Chamado cadastrado com sucesso!");
      });
    }
    
    function renderTabelaChamados() {
        const corpoTabela = document.getElementById("tabelaChamadosBody");
        if(!corpoTabela) return;
        corpoTabela.innerHTML = "";
        const statusMap = {
            Rejeitado: 'danger',
            Aguardando: 'primary',
            Fechado: 'secondary',
            'Em Atendimento': 'warning',
            Aberto: 'info'
        };
        db.chamados.forEach(c => {
          corpoTabela.innerHTML += `
            <tr>
              <td><a href="#" class="text-secondary"><i class="bi bi-search"></i></a> <a href="#" class="text-secondary"><i class="bi bi-pencil-square"></i></a></td>
              <td>${c.id}</td>
              <td>${c.abertura}</td>
              <td>${c.tipo}</td>
              <td>${c.solicitante}</td>
              <td>${c.produto}</td>
              <td>${c.categoria}</td>
              <td><span class="badge text-bg-${statusMap[c.situacao] || 'light'}">${c.situacao}</span></td>
            </tr>
          `;
        });
    }
    if(document.getElementById("tabelaChamadosBody")) {
        renderTabelaChamados();
    }
    
    // 3. Central de Ideias: Cadastro e Renderização
    const formNovaIdeia = document.getElementById("formNovaIdeia");
    if(formNovaIdeia) {
        formNovaIdeia.addEventListener("submit", (e) => {
            e.preventDefault();
            const tituloInput = document.getElementById("tituloIdeia");
            const descInput = document.getElementById("descIdeia");
            if(!tituloInput.value) {
                alert("Por favor, dê um título para a sua ideia.");
                return;
            }
            const novaIdeia = { titulo: tituloInput.value, votos: 1 };
            console.log("Enviando nova ideia para o banco:", novaIdeia);
            db.ideias.unshift(novaIdeia);
            renderListaIdeias();
            formNovaIdeia.reset();
        });
    }
    
    function renderListaIdeias() {
      const lista = document.getElementById("listaIdeias");
      if(!lista) return;
      lista.innerHTML = "";
      db.ideias.sort((a, b) => b.votos - a.votos).forEach(ideia => {
          lista.innerHTML += `
              <li class="list-group-item d-flex justify-content-between align-items-center">
                  ${ideia.titulo}
                  <div>
                      <button class="btn btn-sm btn-success vote-btn"><i class="bi bi-hand-thumbs-up"></i></button>
                      <span class="badge bg-primary rounded-pill mx-1">${ideia.votos}</span>
                  </div>
              </li>
          `;
      });
    }
    if(document.getElementById("listaIdeias")){
        renderListaIdeias();
    }
  
    // 4. Ordens de Serviço: Cadastro e Renderização
    const formNovaOS = document.getElementById("formNovaOS");
      if (formNovaOS) {
          formNovaOS.addEventListener("submit", (e) => {
              e.preventDefault();
              const solicitante = "Usuário Logado";
              const tipo = "Serviço Genérico";
              const local = "Local a Definir";
  
              const novaOS = {
                  id: `OS-2024-${String(db.ordensServico.length + 1).padStart(3, '0')}`,
                  abertura: new Date().toLocaleDateString('pt-BR'),
                  solicitante: solicitante,
                  tipo: tipo,
                  local: local,
                  status: "Aguardando Atendimento"
              };
              console.log("Salvando nova Ordem de Serviço:", novaOS);
              db.ordensServico.unshift(novaOS);
              renderTabelaOS();
              alert("Ordem de Serviço cadastrada com sucesso!");
          });
      }
  
      function renderTabelaOS() {
          const corpoTabela = document.getElementById("tabelaOSBody");
          if (!corpoTabela) return;
          corpoTabela.innerHTML = "";
          const statusMap = {
              'Concluída': 'success',
              'Em Andamento': 'warning',
              'Aguardando Atendimento': 'info',
              'Cancelada': 'danger'
          };
          db.ordensServico.forEach(os => {
              corpoTabela.innerHTML += `
                  <tr>
                      <td>${os.id}</td>
                      <td>${os.abertura}</td>
                      <td>${os.solicitante}</td>
                      <td>${os.tipo}</td>
                      <td>${os.local}</td>
                      <td><span class="badge text-bg-${statusMap[os.status] || 'light'}">${os.status}</span></td>
                      <td><a href="#" class="btn btn-sm btn-outline-primary"><i class="bi bi-search"></i></a></td>
                  </tr>
              `;
          });
      }
  
      if (document.getElementById("tabelaOSBody")) {
          renderTabelaOS();
      }
  });