import React, { useState, useEffect, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { cisControls } from "../../data/ciscontrols";

export default function Cascade() {
  const [expandedRows, setExpandedRows] = useState([]);
  const [controlStatuses, setControlStatuses] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [expandedByFilter, setExpandedByFilter] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Carregar todos os status dos sub-tópicos salvos
    const loadAllStatuses = () => {
      const statuses = {};
      
      // Apenas para sub-tópicos
      cisControls.controls.forEach(control => {
        if (control.topics) {
          control.topics.forEach(topic => {
            const topicStorageKey = `topico_${topic.id}`;
            const topicSaved = JSON.parse(localStorage.getItem(topicStorageKey));
            if (topicSaved && topicSaved.status) {
              statuses[topic.id] = topicSaved.status;
            }
          });
        }
      });
      
      setControlStatuses(statuses);
    };
    
    loadAllStatuses();
    
    // Adicionar listener para atualizar quando houver mudanças no localStorage
    const handleStorageChange = () => {
      loadAllStatuses();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

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

  // Função para obter a cor do status
  const getStatusColor = (status) => {
    switch(status) {
      case 'Concluído':
        return 'success';
      case 'Pendente':
        return 'warning';
      case 'Em Andamento':
        return 'info';
      case 'N/A':
        return 'default';
      default:
        return 'default';
    }
  };

  // Função para renderizar o status (apenas para sub-controles)
  const renderStatus = (params) => {
    // Se for controle principal, não renderiza nada
    if (params.row.isMainControl) {
      return null;
    }
    
    const status = params.value || 'N/A';
    
    if (!status || status === 'N/A') {
      return <Chip label="N/A" size="small" variant="outlined" />;
    }
    
    return (
      <Chip 
        label={status} 
        size="small" 
        color={getStatusColor(status)}
        variant="filled"
        sx={{ 
          fontWeight: 'medium',
          minWidth: '100px'
        }}
      />
    );
  };

  // Função para verificar se deve expandir automaticamente
  const shouldAutoExpand = (control, rows) => {
    if (!control.topics) return false;
    
    // Verificar se algum sub-tópico corresponde ao filtro
    return control.topics.some(topic => {
      const topicStatus = controlStatuses[topic.id] || 'N/A';
      const topicMatchesSearch = 
        searchTerm === '' || 
        topic.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const topicMatchesStatus = 
        statusFilter === 'todos' || 
        (statusFilter === 'N/A' && (topicStatus === 'N/A' || !topicStatus)) ||
        topicStatus === statusFilter;
      
      return topicMatchesSearch && topicMatchesStatus;
    });
  };

  // Preparar as linhas para o DataGrid
  const prepareRows = () => {
    const rows = [];
    const autoExpandedRows = [];
    
    cisControls.controls.forEach(control => {
      const shouldExpand = shouldAutoExpand(control, rows);
      const isExpanded = expandedRows.includes(control.id) || shouldExpand;
      
      if (shouldExpand && !expandedRows.includes(control.id)) {
        autoExpandedRows.push(control.id);
      }
      
      // Adicionar controle principal (sempre visível)
      const mainControlRow = {
        ...control,
        id: control.id,
        cisId: control.id,
        title: control.title,
        description: control.description || '',
        status: '', // Vazio para controles principais
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
              {isExpanded ? 
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
      if (isExpanded && control.topics) {
        control.topics.forEach(topic => {
          const topicStatus = controlStatuses[topic.id] || 'N/A';
          
          // Verificar filtros para sub-tópicos
          const topicMatchesSearch = 
            searchTerm === '' || 
            topic.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            topic.description.toLowerCase().includes(searchTerm.toLowerCase());
          
          const topicMatchesStatus = 
            statusFilter === 'todos' || 
            (statusFilter === 'N/A' && (topicStatus === 'N/A' || !topicStatus)) ||
            topicStatus === statusFilter;
          
          // Se não passar pelos filtros, não adicionar
          if (!topicMatchesSearch || !topicMatchesStatus) {
            return;
          }
          
          const subTopicRow = {
            ...topic,
            id: topic.id,
            cisId: topic.id,
            title: topic.title,
            description: topic.description || '',
            status: topicStatus,
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

    // Atualizar expandedRows se houver auto-expansion
    if (autoExpandedRows.length > 0) {
      setExpandedRows(prev => [...new Set([...prev, ...autoExpandedRows])]);
    }

    return rows;
  };

  const rows = useMemo(() => prepareRows(), [expandedRows, controlStatuses, searchTerm, statusFilter]);
  
  const columns = [
    ...cisControls.columns.slice(0, 1), // Primeira coluna (título)
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      sortable: true,
      filterable: true,
      renderCell: (params) => renderStatus(params)
    },
    ...cisControls.columns.slice(1) // Restante das colunas
  ];

  // Handler para limpar filtros
  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('todos');
    setExpandedRows([]);
  };

  return (
    <Box>
      {/* Filtros */}
      <Paper sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Pesquisar por ID, título ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Filtrar por Status</InputLabel>
              <Select
                value={statusFilter}
                label="Filtrar por Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="todos">Todos os Status</MenuItem>
                <MenuItem value="Concluído">Concluído</MenuItem>
                <MenuItem value="Pendente">Pendente</MenuItem>
                <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                <MenuItem value="N/A">N/A</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              </Box>
              
              {(searchTerm || statusFilter !== 'todos') && (
                <Button
                  size="small" 
                  variant="outlined" 
                  onClick={handleClearFilters}
                >
                  Limpar Filtros
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>

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
            if (event.target.closest('button') || event.target.closest('a') || event.target.closest('.MuiChip-root')) {
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
    </Box>
  );
}