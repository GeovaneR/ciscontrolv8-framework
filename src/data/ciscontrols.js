import React from 'react';

// Componente para o círculo no HEADER (texto dentro do círculo)
const CircleHeader = ({ label, color, width = 45, height = 25 }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: '25px',
    backgroundColor: color,
    color: 'white',
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 auto'
  }}>
    {label}
  </div>
);

// Componente para o círculo nas ROWS (células)
const CircleCell = ({ value, color }) => {
  if (!value || value === '') return null;
  
  return (
    <div style={{
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      backgroundColor: color,
      color: 'white',
      fontWeight: 'bold',
      fontSize: '10px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {value}
    </div>
  );
};

export const cisControls = {
  columns: [
    {
      field: 'expand',
      headerName: '',
      width: 30,
      renderCell: (params) => params.row.renderExpandButton?.(params) || null,
    },
    { 
      field: 'title', 
      headerName: 'Controle CIS', 
      width: 300,
      renderCell: (params) => params.row.renderTitle?.(params) || params.value
    },
    { 
      field: 'IG1', 
      headerName: 'IG1', 
      width: 120,
      renderHeader: () => <CircleHeader label="IG1" color="#4CAF50" />,
      renderCell: (params) => <CircleCell value={params.value} color="#4CAF50" />,
      align: 'center',
      headerAlign: 'center'
    },
    { 
      field: 'IG2', 
      headerName: 'IG2', 
      width: 120,
      renderHeader: () => <CircleHeader label="IG2" color="#FF9800" />,
      renderCell: (params) => <CircleCell value={params.value} color="#FF9800" />,
      align: 'center',
      headerAlign: 'center'
    },
    { 
      field: 'IG3', 
      headerName: 'IG3', 
      width: 120,
      renderHeader: () => <CircleHeader label="IG3" color="#00BCD4" />,
      renderCell: (params) => <CircleCell value={params.value} color="#00BCD4" />,
      align: 'center',
      headerAlign: 'center'
    },
    { 
      field: 'att&ck', 
      headerName: 'ATT&CK', 
      width: 120,
      renderHeader: () => <CircleHeader label="ATT&CK" color="#F44336" width={80} />,
      renderCell: (params) => <CircleCell value={params.value} color="#F44336" />,
      align: 'center',
      headerAlign: 'center'
    },
    { 
      field: '800171', 
      headerName: '800171', 
      width: 120,
      renderHeader: () => <CircleHeader label="800171" color="#2196F3" width={80}/>, 
      renderCell: (params) => <CircleCell value={params.value} color="#2196F3" />,
      align: 'center',
      headerAlign: 'center'
    },
    { 
      field: 'pci', 
      headerName: 'PCI', 
      width: 120,
      renderHeader: () => <CircleHeader label="PCI 3.2.1" color="#2E7D32" width={80}  />, 
      renderCell: (params) => <CircleCell value={params.value} color="#2E7D32" />,
      align: 'center',
      headerAlign: 'center'
    },
  ],

  // Dados hierárquicos
  controls: [
    {
      "id": "CIS CSC 01",
      "title": "Inventário e Controle de Ativos de Hardware",
      "isMainControl": true,
      "topics": [
        {
          "id": "1.1",
          "title": "Estabelecer e manter um inventário detalhado de ativos corporativos",
          "description": "Estabeleça e mantenha um inventário preciso, detalhado e atualizado de todos os ativos corporativos com potencial para armazenar ou processar dados, incluindo: dispositivos de usuário final (incluindo portáteis e móveis), dispositivos de rede, dispositivos não computacionais/IoT e servidores. Certifique-se de que o inventário registre o endereço de rede (se estático), endereço de hardware, nome da máquina, proprietário do ativo de dados, departamento para cada ativo e se o ativo foi aprovado para se conectar à rede. Este inventário inclui ativos conectados à infraestrutura fisicamente, virtualmente, remotamente e aqueles dentro dos ambientes de nuvem. Revise e atualize o inventário de todos os ativos corporativos semestralmente ou com mais frequência.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "1.2",
          "title": "Endereçar ativos não autorizados",
          "description": "Assegure que exista um processo para lidar com ativos não autorizados semanalmente. A empresa pode escolher remover o ativo da rede, negar que o ativo se conecte remotamente à rede ou colocar o ativo em quarentena.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "1.3",
          "title": "Usar uma ferramenta de descoberta ativa",
          "description": "Utilize uma ferramenta de descoberta ativa para identificar ativos conectados à rede corporativa. Configure a ferramenta de descoberta ativa para executar diariamente ou com mais frequência.",
          "IG1": '',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "1.4",
          "title": "Usar o Dynamic Host Configuration Protocol (DHCP) para atualizar o inventário de ativos corporativos",
          "description": "Use o log do DHCP em todos os servidores DHCP ou ferramentas de gestão de endereço Internet Protocol (IP) para atualizar o inventário de ativos corporativos. Revise e use logs para atualizar o inventário de ativos corporativos semanalmente ou com mais frequência.",
          "IG1": '',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "1.5",
          "title": "Usar uma ferramenta de descoberta passiva",
          "description": "Use uma ferramenta de descoberta passiva para identificar ativos conectados à rede corporativa. Revise e use varreduras para atualizar o inventário de ativos corporativos pelo menos semanalmente ou com mais frequência.",
          "IG1": '',
          "IG2": '',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        }
      ]
    },
    {
      "id": "CIS CSC 02",
      "title": "Inventário e Controle de Ativos de Software",
      "isMainControl": true,
      "topics": [
        {
          "id": "2.1",
          "title": "Estabelecer e manter um inventário de software",
          "description": "Estabeleça e mantenha um inventário detalhado de todos os softwares licenciados instalados em ativos corporativos. O inventário de software deve documentar o título, editor, data inicial de instalação/uso e objetivo de negócio de cada entrada; quando apropriado, inclua o Uniform Resource Locator(URL), app store(s), versão(ões), mecanismo de implantação e data de desativação. Revise e atualize o inventário de software semestralmente ou com mais frequência.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "2.2",
          "title": "Assegurar que o software autorizado seja atualmente suportado",
          "description": "Assegure que apenas software atualmente suportado seja designado como autorizado no inventário de software para ativos corporativos. Se o software não é suportado, mas é necessário para o cumprimento da missão da empresa, documente uma exceção detalhando os controles de mitigação e a aceitação do risco residual. Para qualquer software não suportado sem uma documentação de exceção, designe como não autorizado. Revise o inventário de software para verificar o suporte do software pelo menos uma vez por mês ou com mais frequência.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "2.3",
          "title": "Endereçar o software não autorizado",
          "description": "Assegure que o software não autorizado seja retirado de uso em ativos corporativos ou receba uma exceção documentada. Revise mensalmente ou com mais frequência.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "2.4",
          "title": "Utilizar ferramentas automatizadas de inventário de software",
          "description": "Utilize ferramentas de inventário de software, quando possível, em toda a empresa para automatizar a descoberta e documentação do software instalado.",
          "IG1": '',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "2.5",
          "title": "Lista de permissões de Software autorizado",
          "description": "Use controles técnicos, como a lista de permissões de aplicações, para garantir que apenas o software autorizado possa ser executado ou acessado. Reavalie semestralmente ou com mais frequência.",
          "IG1": '',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "2.6",
          "title": "Lista de permissões de bibliotecas autorizadas",
          "description": "Use os controles técnicos para garantir que apenas as bibliotecas de software autorizadas, como arquivos .dll, .ocx, .so, etc. específicos, tenham permissão para carregar em um processo do sistema. Impedir que bibliotecas não autorizadas sejam carregadas em um processo do sistema. Reavalie semestralmente ou com mais frequência.",
          "IG1": '',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "2.7",
          "title": "Lista de permissões de Scripts autorizados",
          "description": "Use controles técnicos, como assinaturas digitais e controle de versão, para garantir que apenas scripts autorizados, como arquivos .ps1, .py, etc. específicos, tenham permissão para executar. Bloqueie a execução de scripts não autorizados. Reavalie semestralmente ou com mais frequência.",
          "IG1": '',
          "IG2": '',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        }
      ]
    },
    {
      "id": "CIS CSC 03",
      "title": "Proteção de Dados",
      "isMainControl": true,
      "topics": [
        {
          "id": "3.1",
          "title": "Estabelecer e manter um processo de gestão de dados",
          "description": "Estabeleça e mantenha um processo de gestão de dados. No processo, trate a sensibilidade dos dados, o proprietário dos dados, o manuseio dos dados, os limites de retenção de dados e os requisitos de descarte, com base em padrões de sensibilidade e retenção para a empresa. Revise e atualize a documentação anualmente ou quando ocorrerem mudanças significativas na empresa que possam impactar esta medida de segurança.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "3.2",
          "title": "Estabelecer e manter um inventário de dados",
          "description": "Estabeleça e mantenha um inventário de dados, com base no processo de gestão de dados da empresa. No mínimo, inventarie os dados sensíveis. Revise e atualize o inventário anualmente, no mínimo, com prioridade para os dados sensíveis.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "3.3",
          "title": "Configurar listas de controle de acesso a dados",
          "description": "Configure listas de controle de acesso a dados com base na necessidade de conhecimento do usuário. Aplique listas de controle de acesso a dados, também conhecidas como permissões de acesso, a sistemas de arquivos, bancos de dados e aplicações locais e remotos.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "3.4",
          "title": "Aplicar retenção de dados",
          "description": "Retenha os dados de acordo com o processo de gestão de dados da empresa. A retenção de dados deve incluir prazos mínimos e máximos.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "3.5",
          "title": "Descartar dados com segurança",
          "description": "Descarte os dados com segurança conforme descrito no processo de gestão de dados da empresa. Certifique-se de que o processo e o método de descarte sejam compatíveis com a sensibilidade dos dados.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "3.6",
          "title": "Criptografar dados em repouso",
          "description": "Criptografe dados sensíveis em repouso. Use criptografia validada por FIPS 140-2, quando apropriado.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "3.7",
          "title": "Criptografar dados em trânsito",
          "description": "Criptografe dados sensíveis em trânsito. Use criptografia validada por FIPS 140-2, quando apropriado.",
          "IG1": '',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "3.8",
          "title": "Implementar Prevenção de Perda de Dados (DLP)",
          "description": "Implemente uma solução de Prevenção de Perda de Dados (DLP) para detectar e impedir a exfiltração de dados sensíveis.",
          "IG1": '',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "3.9",
          "title": "Implementar segmentação de dados",
          "description": "Implemente a segmentação de dados para separar dados sensíveis de dados não sensíveis.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        }
      ]
    },
    {
      "id": "CIS CSC 04",
      "title": "Configuração Segura de Ativos de Hardware e Software",
      "isMainControl": true,
      "topics": [
        {
          "id": "4.1",
          "title": "Estabelecer e manter uma configuração segura",
          "description": "Estabeleça e mantenha uma configuração segura para todos os ativos corporativos. Revise e atualize a configuração segura anualmente ou quando ocorrerem mudanças significativas na empresa.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "4.2",
          "title": "Estabelecer e manter um processo de gestão de configuração segura",
          "description": "Estabeleça e mantenha um processo de gestão de configuração segura para ativos corporativos. O processo deve incluir a identificação de uma linha de base de configuração segura, a implementação da linha de base, a gestão de mudanças e o monitoramento contínuo.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "4.3",
          "title": "Configurar automaticamente ativos corporativos",
          "description": "Utilize ferramentas para configurar automaticamente ativos corporativos com a linha de base de configuração segura. Reavalie semestralmente ou com mais frequência.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "4.4",
          "title": "Gerenciar contas de administrador padrão",
          "description": "Altere as senhas padrão e desative ou remova todas as contas de administrador padrão desnecessárias em ativos corporativos. Reavalie trimestralmente ou com mais frequência.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "4.5",
          "title": "Remover ou desativar serviços e aplicações desnecessárias",
          "description": "Remova ou desative serviços e aplicações desnecessárias em ativos corporativos. Reavalie trimestralmente ou com mais frequência.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "4.6",
          "title": "Configurar a desativação automática de sessão",
          "description": "Configure a desativação automática de sessão após um período de inatividade para ativos corporativos.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "4.7",
          "title": "Implementar o gerenciamento de configuração e mudança",
          "description": "Implemente o gerenciamento de configuração e mudança para todos os ativos corporativos. O processo deve incluir a documentação, revisão e aprovação de todas as mudanças de configuração.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        }
      ]
    },
    {
      "id": "CIS CSC 05",
      "title": "Gestão de Contas",
      "isMainControl": true,
      "topics": [
        {
          "id": "5.1",
          "title": "Estabelecer e manter um inventário de contas",
          "description": "Estabeleça e mantenha um inventário de todas as contas ativas e inativas. Revise e atualize o inventário anualmente ou com mais frequência.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "5.2",
          "title": "Gerenciar contas de administrador",
          "description": "Gerencie contas de administrador, incluindo a criação, uso, desativação e exclusão. Revise e atualize o inventário de contas de administrador trimestralmente ou com mais frequência.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "5.3",
          "title": "Gerenciar contas de serviço",
          "description": "Gerencie contas de serviço, incluindo a criação, uso, desativação e exclusão. Revise e atualize o inventário de contas de serviço trimestralmente ou com mais frequência.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "5.4",
          "title": "Gerenciar contas de usuário",
          "description": "Gerencie contas de usuário, incluindo a criação, uso, desativação e exclusão. Revise e atualize o inventário de contas de usuário anualmente ou com mais frequência.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "5.5",
          "title": "Desativar contas de usuário inativas",
          "description": "Desative contas de usuário inativas após um período de 45 dias. Revise e atualize o inventário de contas de usuário inativas mensalmente ou com mais frequência.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "5.6",
          "title": "Restringir o uso de contas de administrador",
          "description": "Restrinja o uso de contas de administrador a tarefas administrativas. Use contas de usuário padrão para tarefas não administrativas.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "5.7",
          "title": "Gerenciar credenciais de contas de serviço",
          "description": "Gerencie credenciais de contas de serviço, incluindo a criação, uso, rotação e exclusão. Revise e atualize o inventário de credenciais de contas de serviço trimestralmente ou com mais frequência.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        }
      ]
    },
    {
      "id": "CIS CSC 06",
      "title": "Gestão do Controle de Acesso",
      "isMainControl": true,
      "topics": [
        {
          "id": "6.1",
          "title": "Estabelecer e manter um processo de gestão de acesso",
          "description": "Estabeleça e mantenha um processo de gestão de acesso. O processo deve incluir a identificação de usuários, a atribuição de privilégios, a revisão de acesso e a revogação de acesso.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "6.2",
          "title": "Exigir autenticação multifator (MFA)",
          "description": "Exija autenticação multifator (MFA) para todas as contas de administrador e para todas as contas de usuário que acessam dados sensíveis ou sistemas críticos. Implemente MFA para todos os acessos remotos.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "6.3",
          "title": "Estabelecer e manter um processo de gestão de privilégios",
          "description": "Estabeleça e mantenha um processo de gestão de privilégios. O processo deve incluir a identificação de privilégios, a atribuição de privilégios, a revisão de privilégios e a revogação de privilégios.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "6.4",
          "title": "Usar o princípio do menor privilégio",
          "description": "Use o princípio do menor privilégio para todas as contas de usuário e contas de serviço. Conceda apenas os privilégios necessários para realizar as tarefas.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "6.5",
          "title": "Gerenciar o acesso de terceiros",
          "description": "Gerencie o acesso de terceiros a ativos corporativos. O processo deve incluir a identificação de terceiros, a atribuição de privilégios, a revisão de acesso e a revogação de acesso.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        }
      ]
    },
    {
      "id": "CIS CSC 07",
      "title": "Gestão Contínua de Vulnerabilidades",
      "isMainControl": true,
      "topics": [
        {
          "id": "7.1",
          "title": "Estabelecer e manter um processo de gestão de vulnerabilidades",
          "description": "Estabeleça e mantenha um processo de gestão de vulnerabilidades. O processo deve incluir a descoberta de vulnerabilidades, a classificação de vulnerabilidades, a correção de vulnerabilidades e o monitoramento contínuo.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "7.2",
          "title": "Executar varreduras automatizadas de vulnerabilidades",
          "description": "Execute varreduras automatizadas de vulnerabilidades em todos os ativos corporativos. Execute varreduras semanalmente ou com mais frequência.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "7.3",
          "title": "Remediar vulnerabilidades automaticamente",
          "description": "Utilize ferramentas para remediar vulnerabilidades automaticamente. Priorize a correção de vulnerabilidades de alta e média criticidade.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "7.4",
          "title": "Configurar varreduras de vulnerabilidades autenticadas",
          "description": "Configure varreduras de vulnerabilidades autenticadas para todos os ativos corporativos. Use credenciais de menor privilégio para varreduras autenticadas.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "7.5",
          "title": "Executar varreduras de vulnerabilidades em aplicações web",
          "description": "Execute varreduras de vulnerabilidades em aplicações web. Execute varreduras mensalmente ou com mais frequência.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        }
      ]
    },
    {
      "id": "CIS CSC 08",
      "title": "Gestão de Registros de Auditoria",
      "isMainControl": true,
      "topics": [
        {
          "id": "8.1",
          "title": "Estabelecer e manter um processo de gestão de registros de auditoria",
          "description": "Estabeleça e mantenha um processo de gestão de registros de auditoria. O processo deve incluir a coleta, armazenamento, proteção, análise e descarte de registros de auditoria.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "8.2",
          "title": "Coletar registros de auditoria",
          "description": "Colete registros de auditoria de todos os ativos corporativos. Colete registros de auditoria de todos os eventos de segurança relevantes.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "8.3",
          "title": "Proteger registros de auditoria",
          "description": "Proteja registros de auditoria contra modificação e exclusão não autorizadas. Armazene registros de auditoria em um local centralizado e seguro.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "8.4",
          "title": "Analisar registros de auditoria",
          "description": "Analise registros de auditoria para detectar atividades suspeitas. Utilize ferramentas de Gestão de Informações e Eventos de Segurança (SIEM) para análise automatizada.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "8.5",
          "title": "Reter registros de auditoria",
          "description": "Reter registros de auditoria por um período de tempo definido. O período de retenção deve ser baseado em requisitos regulatórios e de conformidade.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        }
      ]
    },
    {
      "id": "CIS CSC 09",
      "title": "Proteções de E-mail e Navegador Web",
      "isMainControl": true,
      "topics": [
        {
          "id": "9.1",
          "title": "Gerenciar a segurança do navegador web",
          "description": "Gerencie a segurança do navegador web, incluindo a configuração de políticas de segurança, a desativação de plugins desnecessários e a atualização regular.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "9.2",
          "title": "Gerenciar a segurança do e-mail",
          "description": "Gerencie a segurança do e-mail, incluindo a implementação de filtros de spam e malware, a desativação de anexos perigosos e a criptografia de e-mails sensíveis.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "9.3",
          "title": "Implementar a filtragem de conteúdo web",
          "description": "Implemente a filtragem de conteúdo web para bloquear o acesso a sites maliciosos e não autorizados.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "9.4",
          "title": "Implementar a proteção de e-mail contra phishing",
          "description": "Implemente a proteção de e-mail contra phishing, incluindo a autenticação de remetente (SPF, DKIM, DMARC) e o treinamento de conscientização.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        }
      ]
    },
    {
      "id": "CIS CSC 10",
      "title": "Defesas Contra Malware",
      "isMainControl": true,
      "topics": [
        {
          "id": "10.1",
          "title": "Implementar e gerenciar software anti-malware",
          "description": "Implemente e gerencie software anti-malware em todos os ativos corporativos. Configure o software anti-malware para atualizar automaticamente e executar varreduras regulares.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "10.2",
          "title": "Configurar a proteção de e-mail contra malware",
          "description": "Configure a proteção de e-mail contra malware, incluindo a varredura de anexos e links maliciosos.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "10.3",
          "title": "Configurar a proteção de navegador web contra malware",
          "description": "Configure a proteção de navegador web contra malware, incluindo o bloqueio de downloads maliciosos e a prevenção de execução de scripts não autorizados.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "10.4",
          "title": "Implementar o gerenciamento de patches de software anti-malware",
          "description": "Implemente o gerenciamento de patches de software anti-malware. Mantenha o software anti-malware atualizado com as últimas assinaturas e patches.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        }
      ]
    },
    {
      "id": "CIS CSC 11",
      "title": "Recuperação de Dados",
      "isMainControl": true,
      "topics": [
        {
          "id": "11.1",
          "title": "Estabelecer e manter um processo de recuperação de dados",
          "description": "Estabeleça e mantenha um processo de recuperação de dados. O processo deve incluir a identificação de dados críticos, a realização de backups regulares e o teste de recuperação.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "11.2",
          "title": "Realizar backups automatizados de dados críticos",
          "description": "Realize backups automatizados de dados críticos. Armazene backups em um local seguro e isolado.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "11.3",
          "title": "Proteger backups de dados",
          "description": "Proteja backups de dados contra modificação e exclusão não autorizadas. Use criptografia para proteger backups em repouso e em trânsito.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "11.4",
          "title": "Testar o processo de recuperação de dados",
          "description": "Teste o processo de recuperação de dados anualmente ou com mais frequência. Documente os resultados dos testes e corrija quaisquer deficiências.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        }
      ]
    },
    {
      "id": "CIS CSC 12",
      "title": "Gestão da Infraestrutura de Rede",
      "isMainControl": true,
      "topics": [
        {
          "id": "12.1",
          "title": "Estabelecer e manter um inventário de dispositivos de rede",
          "description": "Estabeleça e mantenha um inventário de todos os dispositivos de rede, incluindo roteadores, switches, firewalls e pontos de acesso sem fio. Revise e atualize o inventário semestralmente ou com mais frequência.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "12.2",
          "title": "Configurar a segurança de dispositivos de rede",
          "description": "Configure a segurança de dispositivos de rede, incluindo a alteração de senhas padrão, a desativação de serviços desnecessários e a implementação de listas de controle de acesso.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "12.3",
          "title": "Implementar a segmentação de rede",
          "description": "Implemente a segmentação de rede para separar redes de produção, desenvolvimento e teste. Use firewalls para controlar o tráfego entre segmentos.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "12.4",
          "title": "Gerenciar a segurança de redes sem fio",
          "description": "Gerencie a segurança de redes sem fio, incluindo a implementação de criptografia forte (WPA2/WPA3) e a desativação de redes sem fio não autorizadas.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "12.5",
          "title": "Implementar a filtragem de tráfego de rede",
          "description": "Implemente a filtragem de tráfego de rede para bloquear o tráfego malicioso e não autorizado. Use firewalls e sistemas de prevenção de intrusão (IPS).",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        }
      ]
    },
    {
      "id": "CIS CSC 13",
      "title": "Monitoramento e Defesa da Rede",
      "isMainControl": true,
      "topics": [
        {
          "id": "13.1",
          "title": "Estabelecer e manter um processo de monitoramento de rede",
          "description": "Estabeleça e mantenha um processo de monitoramento de rede. O processo deve incluir a coleta de logs, a análise de tráfego e a detecção de atividades suspeitas.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "13.2",
          "title": "Implementar a detecção de intrusão",
          "description": "Implemente sistemas de detecção de intrusão (IDS) para monitorar o tráfego de rede em busca de atividades maliciosas. Configure o IDS para alertar sobre eventos suspeitos.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "13.3",
          "title": "Implementar a prevenção de intrusão",
          "description": "Implemente sistemas de prevenção de intrusão (IPS) para bloquear o tráfego malicioso. Configure o IPS para bloquear ataques conhecidos e suspeitos.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "13.4",
          "title": "Coletar e analisar logs de rede",
          "description": "Colete e analise logs de rede de todos os dispositivos de rede. Use ferramentas SIEM para análise automatizada.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "13.5",
          "title": "Implementar a detecção de anomalias de rede",
          "description": "Implemente a detecção de anomalias de rede para identificar atividades incomuns ou suspeitas. Use ferramentas de análise de comportamento de rede.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        }
      ]
    },
    {
      "id": "CIS CSC 14",
      "title": "Conscientização sobre Segurança e Treinamento de Competências",
      "isMainControl": true,
      "topics": [
        {
          "id": "14.1",
          "title": "Estabelecer e manter um programa de conscientização sobre segurança",
          "description": "Estabeleça e mantenha um programa de conscientização sobre segurança. O programa deve incluir treinamento inicial e contínuo para todos os funcionários.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "14.2",
          "title": "Treinar funcionários sobre ameaças de segurança",
          "description": "Treine funcionários sobre ameaças de segurança, incluindo phishing, engenharia social e malware. Realize simulações de phishing regularmente.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "14.3",
          "title": "Treinar funcionários sobre políticas e procedimentos de segurança",
          "description": "Treine funcionários sobre políticas e procedimentos de segurança, incluindo o uso aceitável de ativos corporativos e a gestão de senhas.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "14.4",
          "title": "Treinar funcionários sobre a identificação de dados sensíveis",
          "description": "Treine funcionários sobre a identificação de dados sensíveis e o manuseio adequado. O treinamento deve incluir a classificação de dados e os requisitos de proteção.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        }
      ]
    },
    {
      "id": "CIS CSC 15",
      "title": "Gestão de Provedores de Serviços",
      "isMainControl": true,
      "topics": [
        {
          "id": "15.1",
          "title": "Estabelecer e manter um processo de gestão de provedores de serviços",
          "description": "Estabeleça e mantenha um processo de gestão de provedores de serviços. O processo deve incluir a avaliação de riscos, a seleção de provedores, a gestão de contratos e o monitoramento contínuo.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "15.2",
          "title": "Avaliar o risco de provedores de serviços",
          "description": "Avalie o risco de provedores de serviços antes de contratar. A avaliação deve incluir a revisão de controles de segurança e a conformidade com requisitos regulatórios.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "15.3",
          "title": "Monitorar a segurança de provedores de serviços",
          "description": "Monitore a segurança de provedores de serviços continuamente. O monitoramento deve incluir a revisão de relatórios de auditoria e a realização de auditorias de segurança.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        }
      ]
    },
    {
      "id": "CIS CSC 16",
      "title": "Segurança de Aplicações",
      "isMainControl": true,
      "topics": [
        {
          "id": "16.1",
          "title": "Estabelecer e manter um processo de gestão de segurança de aplicações",
          "description": "Estabeleça e mantenha um processo de gestão de segurança de aplicações. O processo deve incluir a identificação de aplicações, a avaliação de riscos, a correção de vulnerabilidades e o monitoramento contínuo.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "16.2",
          "title": "Treinar desenvolvedores sobre segurança de aplicações",
          "description": "Treine desenvolvedores sobre segurança de aplicações. O treinamento deve incluir a codificação segura, a identificação de vulnerabilidades e a correção de falhas.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "16.3",
          "title": "Implementar testes de segurança de aplicações",
          "description": "Implemente testes de segurança de aplicações, incluindo testes estáticos e dinâmicos. Realize testes de segurança antes da implantação.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "16.4",
          "title": "Gerenciar vulnerabilidades de aplicações",
          "description": "Gerencie vulnerabilidades de aplicações, incluindo a identificação, classificação e correção. Priorize a correção de vulnerabilidades de alta e média criticidade.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        }
      ]
    },
    {
      "id": "CIS CSC 17",
      "title": "Gestão de Respostas a Incidentes",
      "isMainControl": true,
      "topics": [
        {
          "id": "17.1",
          "title": "Estabelecer e manter um plano de resposta a incidentes",
          "description": "Estabeleça e mantenha um plano de resposta a incidentes. O plano deve incluir a preparação, detecção, análise, contenção, erradicação e recuperação.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "17.2",
          "title": "Treinar a equipe de resposta a incidentes",
          "description": "Treine a equipe de resposta a incidentes sobre o plano de resposta a incidentes. Realize exercícios de simulação de incidentes anualmente ou com mais frequência.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "17.3",
          "title": "Estabelecer e manter um kit de resposta a incidentes",
          "description": "Estabeleça e mantenha um kit de resposta a incidentes. O kit deve incluir ferramentas, documentação e recursos de contato.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "17.4",
          "title": "Comunicar incidentes de segurança",
          "description": "Comunique incidentes de segurança a partes interessadas internas e externas. O processo de comunicação deve ser definido no plano de resposta a incidentes.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        }
      ]
    },
    {
      "id": "CIS CSC 18",
      "title": "Testes de Invasão",
      "isMainControl": true,
      "topics": [
        {
          "id": "18.1",
          "title": "Estabelecer e manter um processo de testes de invasão",
          "description": "Estabeleça e mantenha um processo de testes de invasão. O processo deve incluir a definição de escopo, a realização de testes, a documentação de resultados e a correção de vulnerabilidades.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "18.2",
          "title": "Realizar testes de invasão externos",
          "description": "Realize testes de invasão externos anualmente ou com mais frequência. Os testes devem ser realizados por terceiros independentes.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "18.3",
          "title": "Realizar testes de invasão internos",
          "description": "Realize testes de invasão internos anualmente ou com mais frequência. Os testes devem ser realizados por terceiros independentes.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        },
        {
          "id": "18.4",
          "title": "Realizar testes de invasão de aplicações web",
          "description": "Realize testes de invasão de aplicações web anualmente ou com mais frequência. Os testes devem ser realizados por terceiros independentes.",
          "IG1": ' ',
          "IG2": ' ',
          "IG3": ' ',
          "att&ck": "",
          "800171": "",
          "pci": ""
        }
      ]
    }
  ]
}

