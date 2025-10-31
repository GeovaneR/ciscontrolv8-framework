export const cisControls = [
  {
    id: "CIS CSC 01",
    title: "Inventário e Controle de Ativos de Hardware",
    topics: [
      {
        id: "1.1",
        name: "Estabelecer e manter inventário detalhado de ativos da empresa",
        description:
          "Mantenha um inventário atualizado de todos os dispositivos conectados à rede, incluindo portáteis e móveis.",
        details: `
        <p>Estabelecer e manter um inventário preciso, detalhado e atualizado de todos os ativos da
        empresa com potencial para armazenar ou processar dados, incluindo: dispositivos de usuário 
        final (incluindo portáteis e móveis), dispositivos de rede, dispositivos não computacionais/IoT,
        e servidores. Certifique-se de que o inventário registre o endereço de rede (se estático), 
        endereço de hardware, nome da máquina, proprietário do ativo corporativo, departamento para cada 
        ativo e se o ativo foi aprovado para se conectar à rede. Para dispositivos móveis de usuário 
        final, as ferramentas do tipo MDM podem oferecer suporte a esse processo, quando apropriado. 
        Esse inventário inclui ativos conectados à infraestrutura fisicamente, virtualmente, remotamente 
        e aqueles em ambientes de nuvem. Além disso, inclui ativos que estão regularmente conectados à 
        infraestrutura de rede da empresa, mesmo que não estejam sob o controle da empresa. 
        Revise e atualize o inventário de todos os ativos da empresa semestralmente ou com mais frequência.</p>
        `,
      },
      {
        id: "1.2",
        name: "Verificação regular de ativos",
        description: "Revise e verifique periodicamente o inventário de ativos.",
        details: `
        <p>Os ativos devem ser revisados trimestralmente para identificar inconsistências.
        Compare relatórios de inventário com logs de rede e sistemas de endpoint.</p>
        `,
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
        details: `
        <p>Somente softwares aprovados pela equipe de segurança devem ser instalados nos dispositivos corporativos.</p>
        `,
      },
    ],
  },
];
