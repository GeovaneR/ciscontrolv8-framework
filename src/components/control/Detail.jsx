import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { cisControls } from "../../data/ciscontrols";
import FormControl from "@mui/material/FormControl";
import BasicSelect from '../buttons/select.jsx';
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Texteditor from "../../texteditor/Texteditor";

const Detail = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const id = query.get("id");
  const type = query.get("type"); // "main" para controle principal, undefined para sub-tópico
  
  // Função para encontrar o tópico (sub-controle) ou controle principal
  const findItem = () => {
    if (type === "main") {
      // Buscar controle principal
      return cisControls.controls.find((control) => control.id === id);
    } else {
      // Buscar sub-tópico (tópico)
      for (const control of cisControls.controls) {
        if (control.topics) {
          const topic = control.topics.find((t) => t.id === id);
          if (topic) {
            return {
              ...topic,
              mainControl: control // Inclui referência ao controle principal
            };
          }
        }
      }
    }
    return null;
  };

  const item = findItem();
  const isMainControl = type === "main";
  
  const [status, setStatus] = useState("");
  const [agendamento, setAgendamento] = useState("");
  const [data, setData] = useState(dayjs());
  const [descricao, setDescricao] = useState("");
  const [loaded, setLoaded] = useState(false);

  // Carregar dados do localStorage
  useEffect(() => {
    const storageKey = isMainControl ? `controle_${id}` : `topico_${id}`;
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved) {
      setStatus(saved.status || "");
      setAgendamento(saved.agendamento || "");
      setData(saved.data ? dayjs(saved.data) : dayjs());
      setDescricao(saved.descricao || "");
    }
    setLoaded(true);
  }, [id, isMainControl]);

  // Salvar automaticamente no localStorage após carregado
  useEffect(() => {
    if (!loaded) return;
    const storageKey = isMainControl ? `controle_${id}` : `topico_${id}`;
    const dados = {
      id,
      isMainControl,
      status,
      agendamento,
      data: data && data.isValid() ? data.toISOString() : null,
      descricao,
    };
    localStorage.setItem(storageKey, JSON.stringify(dados));
  }, [status, agendamento, data, descricao, id, loaded, isMainControl]);

  // Função de salvar manualmente
  const handleSave = () => {
    const storageKey = isMainControl ? `controle_${id}` : `topico_${id}`;
    const dados = {
      id,
      isMainControl,
      status,
      agendamento,
      data: data && data.isValid() ? data.toISOString() : null,
      descricao,
    };
    localStorage.setItem(storageKey, JSON.stringify(dados));
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
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
      >
        Voltar
      </Button>

      <Box sx={{ mb: 2 }}>
        <FormControl sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <BasicSelect
            minWidth={120}
            label="Status"
            items={["N/A", "Concluído", "Pendente", "Em Andamento"]}
            value={status}
            onChange={(e) => setStatus(e.target?.value ?? e)}
          />

          <BasicSelect
            minWidth={150}
            label="Agendamento"
            items={["Mensal", "Trimestral", "Semestral", "Anual"]}
            value={agendamento}
            onChange={(e) => setAgendamento(e.target?.value ?? e)}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Data"
              format="DD/MM/YYYY"
              value={data}
              onChange={(newValue) => setData(newValue)}
            />
          </LocalizationProvider>
        </FormControl>
      </Box>

      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
        {item.id} - {item.title || item.name}
      </Typography>

      {!isMainControl && item.mainControl && (
        <Typography variant="subtitle1" sx={{ color: "text.secondary", mb: 1 }}>
          Controle principal: {item.mainControl.id} - {item.mainControl.title}
        </Typography>
      )}

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

      <Box>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Anotações
        </Typography>
        <Texteditor descricao={descricao} setDescricao={setDescricao} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ mt: 3 }}
        >
          Salvar Alterações
        </Button>
      </Box>
    </Box>
  );
};

export default Detail;