import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  FormControl,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import HistoryIcon from "@mui/icons-material/History";
import DescriptionIcon from "@mui/icons-material/Description";
import { cisControls } from "../../data/ciscontrols";
import BasicSelect from '../buttons/select.jsx';
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Texteditor from "../../texteditor/Texteditor";
import { v4 as uuidv4 } from "uuid";

// Função debounce
const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);
  
  return (...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

const Detail = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const id = query.get("id");
  const type = query.get("type");

  // Função para encontrar o tópico ou controle principal
  const findItem = () => {
    if (type === "main") {
      return cisControls.controls.find((control) => control.id === id);
    } else {
      for (const control of cisControls.controls) {
        if (control.topics) {
          const topic = control.topics.find((t) => t.id === id);
          if (topic) {
            return {
              ...topic,
              mainControl: control
            };
          }
        }
      }
    }
    return null;
  };

  const item = findItem();
  const isMainControl = type === "main";

  // Estados principais
  const [status, setStatus] = useState("");
  const [agendamento, setAgendamento] = useState("");
  const [data, setData] = useState(dayjs());
  const [descricao, setDescricao] = useState("");
  const [loaded, setLoaded] = useState(false);

  // Estados para arquivos
  const [arquivos, setArquivos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // Estados para histórico
  const [historico, setHistorico] = useState([]);
  const [showHistorico, setShowHistorico] = useState(false);

  // Referência para controlar mudanças
  const previousValuesRef = useRef({
    status: "",
    agendamento: "",
    data: null,
    descricao: ""
  });

  // Função para formatar data
  const formatarData = (dataStr) => {
    return dayjs(dataStr).format("DD/MM/YYYY HH:mm:ss");
  };
  
  // Carregar dados do localStorage
  useEffect(() => {
    const storageKey = isMainControl ? `controle_${id}` : `topico_${id}`;
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved) {
      setStatus(saved.status || "");
      setAgendamento(saved.agendamento || "");
      setData(saved.data ? dayjs(saved.data) : dayjs());
      setDescricao(saved.descricao || "");
      setArquivos(saved.arquivos || []);
      setHistorico(saved.historico || []);
      
      // Inicializar valores anteriores
      previousValuesRef.current = {
        status: saved.status || "",
        agendamento: saved.agendamento || "",
        data: saved.data || null,
        descricao: saved.descricao || ""
      };
    }
    setLoaded(true);
  }, [id, isMainControl]);

  // Função para salvar no localStorage
  const saveToLocalStorage = useCallback(() => {
    if (!loaded) return;

    const storageKey = isMainControl ? `controle_${id}` : `topico_${id}`;
    const dados = {
      id,
      isMainControl,
      status,
      agendamento,
      data: data && data.isValid() ? data.toISOString() : null,
      descricao,
      arquivos,
      historico: historico.slice(0, 50) // Limitar histórico salvo
    };

    localStorage.setItem(storageKey, JSON.stringify(dados));
  }, [id, isMainControl, status, agendamento, data, descricao, arquivos, historico, loaded]);

  // Salvar automaticamente no localStorage com debounce
  useEffect(() => {
    const debouncedSave = setTimeout(() => {
      saveToLocalStorage();
    }, 1000); // Salva 1 segundo após a última alteração

    return () => clearTimeout(debouncedSave);
  }, [status, agendamento, data, descricao, arquivos, historico, saveToLocalStorage]);

  // Monitorar mudanças de status, agendamento e data para histórico
  useEffect(() => {
    if (!loaded) return;

    const currentValues = {
      status,
      agendamento,
      data: data && data.isValid() ? data.toISOString() : null,
      descricao
    };

    const previousValues = previousValuesRef.current;
    const alteracoes = [];

    // Verificar mudanças apenas em campos específicos (não incluir descricao)
    if (previousValues.status !== currentValues.status && currentValues.status !== "") {
      alteracoes.push(`Status alterado de "${previousValues.status}" para "${currentValues.status}"`);
    }
    
    if (previousValues.agendamento !== currentValues.agendamento && currentValues.agendamento !== "") {
      alteracoes.push(`Agendamento alterado de "${previousValues.agendamento}" para "${currentValues.agendamento}"`);
    }
    
    // Para data, verificar se é uma data válida
    if (previousValues.data !== currentValues.data && currentValues.data) {
      alteracoes.push(`Data alterada para ${formatarData(currentValues.data)}`);
    }

    // Se houve alterações significativas, registrar no histórico
    if (alteracoes.length > 0) {
      const novaEntrada = {
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        usuario: "Usuário Atual",
        alteracoes
      };

      setHistorico(prev => [novaEntrada, ...prev.slice(0, 49)]); // Limitar a 50 entradas
      
      // Atualizar valores anteriores
      previousValuesRef.current = {
        ...currentValues,
        descricao: previousValues.descricao // Manter a descrição anterior para não registrar alterações
      };
    }
  }, [status, agendamento, data, loaded]);

  // Manipulação de arquivos
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const novoArquivo = {
        id: uuidv4(),
        nome: selectedFile.name,
        tamanho: selectedFile.size,
        tipo: selectedFile.type,
        dataUpload: new Date().toISOString(),
        usuario: "Usuário Atual",
        base64: reader.result.split(',')[1] // Salva em base64
      };

      setArquivos(prev => [...prev, novoArquivo]);

      // Registrar no histórico
      const novaEntrada = {
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        usuario: "Usuário Atual",
        alteracoes: [`Arquivo "${selectedFile.name}" adicionado`]
      };

      setHistorico(prev => [novaEntrada, ...prev]);
      setSelectedFile(null);

      // Limpar input de arquivo
      document.getElementById('file-upload').value = '';
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleFileDelete = (arquivoId) => {
    const arquivo = arquivos.find(a => a.id === arquivoId);
    if (arquivo) {
      setArquivos(prev => prev.filter(a => a.id !== arquivoId));

      // Registrar no histórico
      const novaEntrada = {
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        usuario: "Usuário Atual",
        alteracoes: [`Arquivo "${arquivo.nome}" removido`]
      };

      setHistorico(prev => [novaEntrada, ...prev]);
    }
  };

  const handleFileDownload = (arquivo) => {
    const link = document.createElement('a');
    link.href = `data:${arquivo.tipo};base64,${arquivo.base64}`;
    link.download = arquivo.nome;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handler para a descrição com debounce
  const handleDescricaoChange = useDebounce((newDescricao) => {
    // Atualizar apenas o valor sem registrar no histórico
    setDescricao(newDescricao);
    
    // Atualizar o valor anterior para a descrição
    previousValuesRef.current.descricao = newDescricao;
  }, 1000);

  // Função de salvar manualmente
  const handleSave = () => {
    saveToLocalStorage();

    // Registrar ação no histórico
    const novaEntrada = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      usuario: "Usuário Atual",
      alteracoes: ["Salvamento manual realizado"]
    };

    setHistorico(prev => [novaEntrada, ...prev]);
    alert("✅ Dados salvos com sucesso!");
  };

  if (!item) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">
          {isMainControl ? "Controle" : "Tópico"} não encontrado!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Voltar
        </Button>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            startIcon={<HistoryIcon />}
            onClick={() => setShowHistorico(true)}
            variant="outlined"
          >
            Histórico ({historico.length})
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            Salvar Alterações
          </Button>
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <FormControl sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: 'wrap' }}>
          <BasicSelect
            minWidth={120}
            label="Status"
            items={["N/A", "Concluído", "Pendente", "Em Andamento"]}
            value={status}
            onChange={(e) => {
              setStatus(e.target?.value ?? e);
            }}
          />

          <BasicSelect
            minWidth={150}
            label="Agendamento"
            items={["Mensal", "Trimestral", "Semestral", "Anual"]}
            value={agendamento}
            onChange={(e) => {
              setAgendamento(e.target?.value ?? e);
            }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Data"
              format="DD/MM/YYYY"
              value={data}
              onChange={(newValue) => {
                setData(newValue);
              }}
            />
          </LocalizationProvider>
        </FormControl>
      </Box>

      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
        {item.id} - {item.title || item.name}
      </Typography>

      <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
        {item.description}
      </Typography>

      {item.details && (
        <Box
          sx={{
            borderRadius: 2,
            boxShadow: 2,
            p: 3,
            backgroundColor: "#fafafa",
            mb: 3,
          }}
          dangerouslySetInnerHTML={{ __html: item.details }}
        />
      )}

      {/* Mostrar sub-tópicos se for um controle principal */}
      {isMainControl && item.topics && item.topics.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Sub-tópicos ({item.topics.length})
          </Typography>
          {item.topics.map((topic) => (
            <Box
              key={topic.id}
              sx={{
                p: 2,
                mb: 1,
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Typography variant="subtitle1" fontWeight="medium">
                {topic.id} - {topic.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {topic.description}
              </Typography>
              <Button
                size="small"
                onClick={() => navigate(`/control/detail?id=${topic.id}`)}
                sx={{ mt: 1 }}
              >
                Ver detalhes
              </Button>
            </Box>
          ))}
        </Box>
      )}
      
      {/* Seção de Anotações */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Anotações
        </Typography>
        <Texteditor 
          descricao={descricao} 
          setDescricao={handleDescricaoChange}
        />
      </Box>

      {/* Seção de Upload de Arquivos */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Arquivos Anexados
        </Typography>

        <Paper sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<AttachFileIcon />}
            >
              Selecionar Arquivo
              <input
                id="file-upload"
                type="file"
                hidden
                onChange={handleFileSelect}
              />
            </Button>

            {selectedFile && (
              <Chip
                label={`${selectedFile.name} (${(selectedFile.size / 1024).toFixed(2)} KB)`}
                onDelete={() => setSelectedFile(null)}
              />
            )}

            <Button
              variant="contained"
              onClick={handleFileUpload}
              disabled={!selectedFile}
            >
              Anexar Arquivo
            </Button>
          </Box>

          {arquivos.length > 0 ? (
            <List>
              {arquivos.map((arquivo) => (
                <ListItem
                  key={arquivo.id}
                  secondaryAction={
                    <Box>
                      <IconButton
                        edge="end"
                        onClick={() => handleFileDownload(arquivo)}
                        title="Download"
                      >
                        <DownloadIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => handleFileDelete(arquivo.id)}
                        title="Excluir"
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={arquivo.nome}
                    secondary={`${(arquivo.tamanho / 1024).toFixed(2)} KB - ${formatarData(arquivo.dataUpload)}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              Nenhum arquivo anexado ainda.
            </Typography>
          )}
        </Paper>
      </Box>

      {/* Dialog do Histórico */}
      <Dialog
        open={showHistorico}
        onClose={() => setShowHistorico(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <HistoryIcon />
            Histórico de Modificações
          </Box>
        </DialogTitle>
        <DialogContent>
          {historico.length > 0 ? (
            <List>
              {historico.map((entry, index) => (
                <ListItem key={entry.id} alignItems="flex-start">
                  <ListItemIcon>
                    <Chip
                      label={index + 1}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" color="primary">
                        {formatarData(entry.timestamp)}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ mt: 0.5 }}>
                        <Typography variant="body2" color="text.primary">
                          <strong>Usuário:</strong> {entry.usuario}
                        </Typography>
                        {entry.alteracoes && entry.alteracoes.length > 0 && (
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2" color="text.primary" fontWeight="bold">
                              Alterações:
                            </Typography>
                            {entry.alteracoes.map((alteracao, idx) => (
                              <Typography key={idx} variant="body2" color="text.secondary">
                                • {alteracao}
                              </Typography>
                            ))}
                          </Box>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', textAlign: 'center', p: 3 }}>
              Nenhum registro no histórico ainda.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowHistorico(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Detail;