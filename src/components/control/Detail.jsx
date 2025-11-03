import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { cisControls } from "../../data/ciscontrols";
import FormControl from "@mui/material/FormControl";
import BasicSelect from "../../buttons/select";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Texteditor from "../../texteditor/Texteditor";

const Detail = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const id = query.get("id");
  const topic = cisControls.flatMap((c) => c.topics).find((t) => t.id === id);

  const [status, setStatus] = useState("");
  const [agendamento, setAgendamento] = useState("");
  const [data, setData] = useState(dayjs());
  const [descricao, setDescricao] = useState("");
  const [loaded, setLoaded] = useState(false);

  // Carregar dados do localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`topico_${id}`));
    if (saved) {
      setStatus(saved.status || "");
      setAgendamento(saved.agendamento || "");
      setData(saved.data ? dayjs(saved.data) : dayjs());
      setDescricao(saved.descricao || "");
    }
    setLoaded(true);
  }, [id]);


  // Salvar automaticamente no localStorage após carregado
  useEffect(() => {
    if (!loaded) return;
    const dados = {
      id,
      status,
      agendamento,
      data: data && data.isValid() ? data.toISOString() : null,
      descricao,
    };
    localStorage.setItem(`topico_${id}`, JSON.stringify(dados));
  }, [status, agendamento, data, descricao, id, loaded]);

  // Função de salvar manualmente
  const handleSave = () => {
    const dados = {
      id,
      status,
      agendamento,
      data: data && data.isValid() ? data.toISOString() : null,
      descricao,
    };
    localStorage.setItem(`topico_${id}`, JSON.stringify(dados));
    alert("✅ Dados salvos com sucesso!");
  };

  if (!topic) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">Tópico não encontrado!</Typography>
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
        {topic.id} - {topic.name}
      </Typography>

      <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
        {topic.description}
      </Typography>

      <Box
        sx={{
          borderRadius: 2,
          boxShadow: 2,
          p: 3,
          backgroundColor: "#fafafa",
        }}
        dangerouslySetInnerHTML={{ __html: topic.details }}
      />

      <Box>
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
