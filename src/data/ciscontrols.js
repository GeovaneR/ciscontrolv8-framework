export const cisControls = [
  {
    id: "CIS CSC 01",
    title: "Inventário e Controle de Ativos de Hardware",
    topics: [
      {
        id: "1.1",
        name: "Estabelecer e manter inventário detalhado de ativos da empresa",
        description: "Mantenha um inventário atualizado de todos os dispositivos conectados à rede, incluindo portáteis e móveis.",
        implementationGroups: ["IG1"], // Adicione esta linha para tópicos específicos
        details: `...`
      },
      {
        id: "1.2",
        name: "Verificação regular de ativos",
        description: "Revise e verifique periodicamente o inventário de ativos.",
        implementationGroups: ["IG1", "IG2"], // Adicione esta linha
        details: `...`
      },
    ],
  },
  {
    id: "CIS CSC 02",
    title: "Inventário e Controle de Ativos de Software",
    topics: [
      {
        id: "2.1",
        name: "Lista de softwares aprovados",
        description: "Mantenha uma lista de softwares autorizados para uso na empresa.",
        implementationGroups: ["IG1"], // Adicione esta linha
        details: `...`
      },
    ],
  },
];