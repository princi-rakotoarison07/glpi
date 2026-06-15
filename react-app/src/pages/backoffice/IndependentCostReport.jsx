import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IndependentCostService from '../../services/Cost/IndependentCostService';
import TicketService from '../../services/Ticket/TicketService';
import api, { initSession } from '../../config/api';

const IndependentCostReport = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [history, setHistory] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [itemNames, setItemNames] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [costData, ticketsResult] = await Promise.all([
        IndependentCostService.getIndependentCosts().catch(() => ({ categories: [], history: [] })),
        TicketService.getTickets({ start: 0, limit: 9999 }).catch(() => ({ tickets: [] }))
      ]);
      setCategories(costData.categories || []);
      const historyData = costData.history || [];
      setHistory(historyData);
      setTickets(ticketsResult.tickets || []);
      await resolveItemNames(historyData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resolveItemNames = async (historyData) => {
    const uniqueItems = new Set();
    historyData.forEach(row => {
      if (!row.itemsList) return;
      row.itemsList.split(',').forEach(entry => {
        const match = entry.trim().match(/^(\w+)\s*#\s*(.+)$/);
        if (match) uniqueItems.add(`${match[1]}|${match[2]}`);
      });
    });

    const names = {};
    await initSession();
    await Promise.all([...uniqueItems].map(async (key) => {
      const [itemType, rawId] = key.split('|');
      const numericId = rawId.match(/^(\d+)/)?.[1];
      if (!numericId) return;
      try {
        const res = await api.get(`/${itemType}/${numericId}`);
        names[key] = res.data?.name || rawId;
      } catch {
        names[key] = rawId;
      }
    }));
    setItemNames(names);
  };

  const formatItemsList = (itemsList) => {
    if (!itemsList) return 'Aucun';
    return itemsList.split(',').map(entry => {
      const match = entry.trim().match(/^(\w+)\s*#\s*(.+)$/);
      if (!match) return entry.trim();
      return itemNames[`${match[1]}|${match[2]}`] || entry.trim();
    }).join(', ');
  };

  const getTicketName = (ticketId) => {
    const ticket = tickets.find(t => Number(t.id) === Number(ticketId));
    return ticket ? ticket.name : `Ticket #${ticketId}`;
  };

  return (
    <div>
      <button onClick={() => navigate('/accueil')}>Retour</button>
      <h1>Rapport des Coûts Indépendants</h1>
      <button onClick={fetchData} disabled={loading}>Actualiser</button>

      {loading ? (
        <div>Chargement...</div>
      ) : (
        <div>
          <div>
            <h2>Coûts par Type d'Élément</h2>
            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>Type d'Élément</th>
                  <th>Normal Cost (GLPI)</th>
                  <th>SuperCost (SQLite)</th>
                  <th>Coût de Réouverture</th>
                  <th>Cout Total</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, index) => (
                  <tr key={index}>
                    <td>{cat.category === 'Aucun' ? 'Sans équipement' : cat.category}</td>
                    <td>{cat.normalCost.toFixed(2)}</td>
                    <td>{cat.superCost.toFixed(2)}</td>
                    <td>{cat.reopenCost.toFixed(2)}</td>
                    <td>{cat.totalCost.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h2>Détails des Tickets (Historique complet)</h2>
            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>Date Action</th>
                  <th>Ticket ID</th>
                  <th>Ticket</th>
                  <th>Total Normal Cost (GLPI)</th>
                  <th>Total Super Cost (SQLite)</th>
                  <th>Pourcentage Réouverture</th>
                  <th>Total Coût Réouverture</th>
                  <th>Total Cout par Ticket</th>
                  <th>Éléments Liés</th>
                </tr>
              </thead>
              <tbody>
                {history.map((row, index) => {
                  const reopenPercent = row.totalSuperCost > 0 
                    ? (row.totalReopenCost / row.totalSuperCost) * 100 
                    : 0;
                  return (
                    <tr key={index}>
                      <td>{new Date(Number(row.groupTimestamp)).toLocaleString('fr-FR')}</td>
                      <td>{row.id_Ticket}</td>
                      <td>{getTicketName(row.id_Ticket)}</td>
                      <td>{row.totalNormalCost.toFixed(2)}</td>
                      <td>{row.totalSuperCost.toFixed(2)}</td>
                      <td>{reopenPercent.toFixed(2)}%</td>
                      <td>{row.totalReopenCost.toFixed(2)}</td>
                      <td>{row.totalCost.toFixed(2)}</td>
                      <td>{formatItemsList(row.itemsList)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndependentCostReport;
