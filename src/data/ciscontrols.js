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
  if (!value) return null; // Não mostra nada se estiver vazio
  
  return (
    <div style={{
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      backgroundColor: color,
      color: 'white',
      fontWeight: 'bold',
      fontSize: '10px',
      margin: '0 auto'
    }}>
      {value}
    </div>
  );
};

export const cisControls = {
  columns: [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Título', width: 130 },
    { field: 'asset-type', headerName: 'Grupo de implementação', width: 200 },
    { 
      field: 'IG1', 
      headerName: 'IG1', 
      width: 90,
      renderHeader: () => <CircleHeader label="IG1" color="#4CAF50" />,
      renderCell: (params) => <CircleCell value={params.value} color="#4CAF50" />,
      align: 'center',
      headerAlign: 'center'
    },
    { 
      field: 'IG2', 
      headerName: 'IG2', 
      width: 90,
      renderHeader: () => <CircleHeader label="IG2" color="#FF9800" />,
      renderCell: (params) => <CircleCell value={params.value} color="#FF9800" />,
      align: 'center',
      headerAlign: 'center'
    },
    { 
      field: 'IG3', 
      headerName: 'IG3', 
      width: 90,
      renderHeader: () => <CircleHeader label="IG3" color="#00BCD4" />,
      renderCell: (params) => <CircleCell value={params.value} color="#00BCD4" />,
      align: 'center',
      headerAlign: 'center'
    },
    { 
      field: 'att&ck', 
      headerName: 'ATT&CK', 
      width: 90,
      renderHeader: () => <CircleHeader label="ATT&CK" color="#F44336" width={80} />,
      renderCell: (params) => <CircleCell value={params.value} color="#F44336" />,
      align: 'center',
      headerAlign: 'center'
    },
    { 
      field: '800171', 
      headerName: '800171', 
      width: 90,
      renderHeader: () => <CircleHeader label="800171" color="#2196F3" width={80}/>, 
      renderCell: (params) => <CircleCell value={params.value} color="#2196F3" />,
      align: 'center',
      headerAlign: 'center'
    },
    { 
      field: 'pci', 
      headerName: 'PCI', 
      width: 90,
      renderHeader: () => <CircleHeader label="PCI 3.2.1" color="#2E7D32" width={80}  />, 
      renderCell: (params) => <CircleCell value={params.value} color="#2E7D32" />,
      align: 'center',
      headerAlign: 'center'
    },
  ],
  rows: [
    { 
      id: 1, 
      title: 'Controle 1', 
      'asset-type': 'Segurança',
      IG1: ' ',
      IG3: ' ',
      'att&ck': ' ',
      pci: ' '
    },
    { 
      id: 2, 
      title: 'Controle 2', 
      'asset-type': 'Rede',
      IG1: '',
      IG2: '✓',
      IG3: '',
      'att&ck': '',
      '800171': '✓',
      pci: ''
    },
    { 
      id: 3, 
      title: 'Controle 3', 
      'asset-type': 'Dados',
      IG1: '✓',
      IG2: '✓',
      IG3: '✓',
      'att&ck': '✓',
      '800171': '✓',
      pci: '✓'
    },
  ]
};
// {
//   id: "CIS CSC 01",
//     title: "Inventário e Controle de Ativos de Hardware",
//       topics: [
//         {
//           id: "1.1",
//           name: "Estabelecer e manter inventário detalhado de ativos da empresa",
//           description: "Mantenha um inventário atualizado de todos os dispositivos conectados à rede, incluindo portáteis e móveis.",
//           implementationGroups: ["IG1"], // Adicione esta linha para tópicos específicos
//           details: `...`
//         },
//         {
//           id: "1.2",
//           name: "Verificação regular de ativos",
//           description: "Revise e verifique periodicamente o inventário de ativos.",
//           implementationGroups: ["IG1", "IG2"], // Adicione esta linha
//           details: `...`
//         },
//       ],
//   },
// {
//   id: "CIS CSC 02",
//     title: "Inventário e Controle de Ativos de Software",
//       topics: [
//         {
//           id: "2.1",
//           name: "Lista de softwares aprovados",
//           description: "Mantenha uma lista de softwares autorizados para uso na empresa.",
//           implementationGroups: ["IG1"], // Adicione esta linha
//           details: `...`
//         },
//       ],
//   },
// ];