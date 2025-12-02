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
      id: "CIS CSC 01",
      title: "Inventário e Controle de Ativos de Hardware",
      isMainControl: true,
      topics: [
        {
          id: "1.1",
          title: "Estabelecer e manter inventário detalhado de ativos da empresa",
          description: "Mantenha um inventário atualizado de todos os dispositivos conectados à rede, incluindo portáteis e móveis.",
          IG1: ' ',
          IG2: '',
          IG3: ' ',
          'att&ck': ' ',
          '800171': ' ',
          pci: ' '
        },
        {
          id: "1.2",
          title: "Verificação regular de ativos",
          description: "Revise e verifique periodicamente o inventário de ativos.",
          IG1: ' ',
          IG2: ' ',
          IG3: '',
          'att&ck': '',
          '800171': ' ',
          pci: ''
        },
      ],
    },
    {
      id: "CIS CSC 02",
      title: "Inventário e Controle de Ativos de Software",
      isMainControl: true,
      topics: [
        {
          id: "2.1",
          title: "Lista de softwares aprovados",
          description: "Mantenha uma lista de softwares autorizados para uso na empresa.",
          IG1: ' ',
          IG2: '',
          IG3: '',
          'att&ck': ' ',
          '800171': '',
          pci: ' '
        },
      ],
    },
  ]
};
