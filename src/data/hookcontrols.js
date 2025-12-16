import { useState, useEffect } from 'react';
import { cisControls } from '../data/ciscontrols';

export const useControlStats = () => {
  const [stats, setStats] = useState({
    total: 0,
    concluido: 0,
    pendente: 0,
    emAndamento: 0,
    na: 0,
    percentualConcluido: 0,
    percentualPendente: 0,
    percentualEmAndamento: 0,
    percentualNA: 0
  });

  useEffect(() => {
    const loadStats = () => {
      let total = 0;
      let concluido = 0;
      let pendente = 0;
      let emAndamento = 0;
      let na = 0;

      // Contar apenas sub-tópicos
      cisControls.controls.forEach(control => {
        if (control.topics) {
          control.topics.forEach(topic => {
            const storageKey = `topico_${topic.id}`;
            const saved = JSON.parse(localStorage.getItem(storageKey));
            const status = saved?.status || 'N/A';
            
            total++;
            
            switch(status) {
              case 'Concluído':
                concluido++;
                break;
              case 'Pendente':
                pendente++;
                break;
              case 'Em Andamento':
                emAndamento++;
                break;
              default:
                na++;
            }
          });
        }
      });

      // Calcular percentuais
      const percentualConcluido = total > 0 ? Math.round((concluido / total) * 100) : 0;
      const percentualPendente = total > 0 ? Math.round((pendente / total) * 100) : 0;
      const percentualEmAndamento = total > 0 ? Math.round((emAndamento / total) * 100) : 0;
      const percentualNA = total > 0 ? Math.round((na / total) * 100) : 0;

      setStats({
        total,
        concluido,
        pendente,
        emAndamento,
        na,
        percentualConcluido,
        percentualPendente,
        percentualEmAndamento,
        percentualNA
      });
    };

    loadStats();
    
    // Listener para atualizar quando houver mudanças no localStorage
    const handleStorageChange = () => {
      loadStats();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return stats;
};