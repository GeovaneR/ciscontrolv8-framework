import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { cisControls } from "../../data/ciscontrols";

export default function Cascade() {
  const [expandedRows, setExpandedRows] = useState([]);
  const navigate = useNavigate();

  const handleExpandClick = (id) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  // Função para navegar para detalhes do controle
  const handleControlClick = (controlId, isMainControl) => {
    if (isMainControl) {
      navigate(`/control?type=main&id=${controlId}`);
    } else {
      navigate(`/control/detail?id=${controlId}`);
    }
  };

  // Função para truncar texto no primeiro ponto
  const truncateAtFirstPeriod = (text) => {
    if (!text || typeof text !== 'string') return '';
    const firstPeriodIndex = text.indexOf('.');
    return firstPeriodIndex !== -1 ? text.substring(0, firstPeriodIndex + 1) : text;
  };

  // Preparar as linhas para o DataGrid
  const prepareRows = () => {
    const rows = [];
    
    cisControls.controls.forEach(control => {
      // Adicionar controle principal
      const mainControlRow = {
        ...control,
        id: control.id,
        cisId: control.id,
        title: control.title,
        description: control.description || '',
        IG1: control.IG1 || '',
        IG2: control.IG2 || '',
        IG3: control.IG3 || '',
        'att&ck': control['att&ck'] || '',
        '800171': control['800171'] || '',
        pci: control.pci || '',
        isMainControl: true,
        hasSubtopics: control.topics && control.topics.length > 0,
        renderExpandButton: (params) => {
          if (!params.row.hasSubtopics) return null;
          return (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleExpandClick(params.id);
              }}
            >
              {expandedRows.includes(params.id) ? 
                <KeyboardArrowUpIcon /> : 
                <KeyboardArrowDownIcon />
              }
            </IconButton>
          );
        },
        renderTitle: (params) => (
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {params.row.id}
            </Typography>
            <Typography variant="body2">
              {params.value}
            </Typography>
            {params.row.description && (
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                  display: 'block',
                  mt: 0.5,
                  fontSize: '0.75rem',
                  fontStyle: 'italic'
                }}
              >
                {truncateAtFirstPeriod(params.row.description)}
              </Typography>
            )}
          </Box>
        )
      };
      
      rows.push(mainControlRow);

      // Adicionar sub-tópicos se o controle estiver expandido
      if (expandedRows.includes(control.id) && control.topics) {
        control.topics.forEach(topic => {
          const subTopicRow = {
            ...topic,
            id: topic.id,
            cisId: topic.id,
            title: topic.title,
            description: topic.description || '',
            IG1: topic.IG1 || '',
            IG2: topic.IG2 || '',
            IG3: topic.IG3 || '',
            'att&ck': topic['att&ck'] || '',
            '800171': topic['800171'] || '',
            pci: topic.pci || '',
            mainControlId: control.id,
            isMainControl: false,
            renderTitle: (params) => (
              <Box sx={{ pl: 3 }}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleControlClick(params.row.id, false);
                  }}
                  sx={{ 
                    textAlign: 'left',
                    fontWeight: 'medium',
                    fontSize: '0.875rem',
                    color: 'primary.main',
                    textDecoration: 'underline',
                    '&:hover': {
                      color: 'primary.dark',
                      backgroundColor: 'transparent'
                    }
                  }}
                >
                  {params.row.id} - {params.value}
                </Link>
              </Box>
            )
          };
          
          rows.push(subTopicRow);
        });
      }
    });

    return rows;
  };

  const rows = prepareRows();
  
  const columns = [
    ...cisControls.columns
  ];

  return (
    <Paper sx={{ width: '100%', height: 'auto', minHeight: `${Math.max(rows.length * 60, 1150)}px`, overflowX: 'visible' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        // Desativa completamente a paginação
        pagination={false}
        // Ajusta a altura automaticamente
        autoHeight
        checkboxSelection
        disableColumnResize
        disableColumnMenu
        getRowClassName={(params) => 
          params.row.isMainControl ? 'main-control' : 'sub-control'
        }
        onRowClick={(params, event) => {
          if (event.target.closest('button') || event.target.closest('a')) {
            return;
          }
          
          if (params.row.isMainControl) {
            handleControlClick(params.row.id, true);
          }
        }}
        sx={{ 
          border: 0,
          height: 'auto',
          minHeight: '1150px',
          // Esconde o footer da paginação
          '& .MuiDataGrid-footerContainer': {
            display: 'none',
          },
          '& .MuiDataGrid-cell': {
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'normal !important',
            wordBreak: 'break-word !important',
            height: 'auto !important',
            lineHeight: '1.5 !important',
            padding: '8px !important',
            overflow: 'visible !important',
          },
          '& .MuiDataGrid-columnHeader': {
            whiteSpace: 'normal !important',
            wordBreak: 'break-word !important',
            padding: '8px !important',
          },
          '& .MuiDataGrid-virtualScroller': {
            overflow: 'visible !important',
            minHeight: `${rows.length * 63}px`, // Altura baseada no número de linhas
          },
          '& .MuiDataGrid-row': {
            maxHeight: 'none !important',
            minHeight: 'auto !important',
          },
          '& .MuiDataGrid-main': {
            overflow: 'visible !important',
            height: 'auto !important',
          },
          // Estilos para controles principais
          '& .main-control': {
            backgroundColor: '#b53340 !important',
            color: '#ffffff !important',
            fontWeight: 'bold',
            cursor: 'pointer !important',
            '&:hover': {
              backgroundColor: '#8c2930 !important',
            },
            '&.Mui-selected': {
              backgroundColor: '#b53340 !important',
            },
            '&.Mui-selected:hover': {
              backgroundColor: '#b53340 !important',
            },
            // Estilo para o ícone de expandir nos controles principais
            '& .MuiIconButton-root': {
              color: '#ffffff !important',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }
          },
          // Estilos para sub-controles
          '& .sub-control': {
            backgroundColor: '#ffffff',
            cursor: 'default',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
            '&.Mui-selected': {
              backgroundColor: '#e3f2fd',
            },
            '&.Mui-selected:hover': {
              backgroundColor: '#bbdefb',
            }
          }
        }}
      />
    </Paper>
  );
}