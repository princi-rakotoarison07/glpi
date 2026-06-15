import React, { useState, useEffect } from 'react';
import CostService from '../../services/Cost/CostService';
import TicketService from '../../services/Ticket/TicketService';
import ItemTicketService from '../../services/ItemTicket/ItemTicketService';
import TicketCostService from '../../services/TicketCost/TicketCostService';
import { getTicketItemTypes } from '../../config/itemTypes';

const CostReport = () => {
  const [costs, setCosts] = useState([]);
  const [costsByItemType, setCostsByItemType] = useState({});
  const [loading, setLoading] = useState(true);
  const [itemTypes, setItemTypes] = useState([]);

  useEffect(() => {
    setItemTypes(getTicketItemTypes());
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const superCostsData = await CostService.getCosts().catch(() => []);
      const ticketsResult = await TicketService.getTickets({ start: 0, limit: 9999 });
      const tickets = ticketsResult.tickets || [];

      const itemPromises = [];
      const glpiCostPromises = [];
      for (const ticket of tickets) {
        itemPromises.push(ItemTicketService.getItemsForTicket(ticket.id).catch(() => []));
        glpiCostPromises.push(TicketCostService.getTicketCosts(ticket.id).catch(() => []));
      }
      const itemsResults = await Promise.all(itemPromises);
      const glpiCostsResults = await Promise.all(glpiCostPromises);

      const ticketItemsMap = {};
      const ticketGlpiCostsMap = {};
      tickets.forEach((ticket, index) => {
        ticketItemsMap[ticket.id] = itemsResults[index];
        ticketGlpiCostsMap[ticket.id] = glpiCostsResults[index];
      });

      const enrichedCosts = [];
      const ticketNormalCostMap = {};
      tickets.forEach(ticket => {
        const glpiCosts = ticketGlpiCostsMap[ticket.id] || [];
        const totalNormalCost = glpiCosts.reduce((sum, cost) => {
          const costFixed = parseFloat(cost.cost_fixed || 0);
          const costMaterial = parseFloat(cost.cost_material || 0);
          const hourlyRate = parseFloat(cost.cost_time || 0);
          const durationHours = (parseInt(cost.actiontime) || 0) / 3600;
          const timeCost = durationHours * hourlyRate;
          return sum + costFixed + costMaterial + timeCost;
        }, 0);
        ticketNormalCostMap[ticket.id] = totalNormalCost;
      });

      superCostsData.forEach(sc => {
        const ticket = tickets.find(t => t.id === sc.id_ticket);
        const items = ticketItemsMap[sc.id_ticket] || [];
        const totalNormalCost = ticketNormalCostMap[sc.id_ticket] || 0;
        
        const itemCount = items.length || 1;
        const normalCostPerItem = itemCount > 0 ? totalNormalCost / itemCount : 0;
        
        const totalSuperCost = sc.superCost || 0;
        const coutReouverturePercent = sc.coutReouverture || 0;
        const totalReopenCost = totalSuperCost * (coutReouverturePercent / 100);
        const superCostPerItem = itemCount > 0 ? totalSuperCost / itemCount : 0;
        const reopenCostPerItem = itemCount > 0 ? totalReopenCost / itemCount : 0;

        enrichedCosts.push({
          id: sc.id,
          id_ticket: sc.id_ticket,
          superCost: totalSuperCost,
          coutReouverture: coutReouverturePercent,
          totalReopenCost,
          ticket,
          items,
          itemCount,
          totalNormalCost,
          normalCostPerItem,
          superCostPerItem,
          reopenCostPerItem
        });
      });

      setCosts(enrichedCosts);

      const computedTypes = {};
      const allTypes = getTicketItemTypes();
      allTypes.forEach(type => {
        computedTypes[type.itemType] = {
          label: type.label,
          normalCost: 0,
          superCost: 0,
          reopenCost: 0,
          totalCost: 0,
          count: 0
        };
      });

      tickets.forEach(ticket => {
        const items = ticketItemsMap[ticket.id] || [];
        const totalNormalCost = ticketNormalCostMap[ticket.id] || 0;
        if (items.length > 0) {
          const normalCostPerItem = totalNormalCost / items.length;
          items.forEach(item => {
            if (computedTypes[item.itemtype]) {
              computedTypes[item.itemtype].count++;
              computedTypes[item.itemtype].normalCost += normalCostPerItem;
              computedTypes[item.itemtype].totalCost += normalCostPerItem;
            }
          });
        }
      });

      enrichedCosts.forEach(cost => {
        if (cost.items && cost.items.length > 0) {
          cost.items.forEach(item => {
            if (computedTypes[item.itemtype]) {
              computedTypes[item.itemtype].superCost += cost.superCostPerItem;
              computedTypes[item.itemtype].reopenCost += cost.reopenCostPerItem;
              computedTypes[item.itemtype].totalCost += cost.superCostPerItem + cost.reopenCostPerItem;
            }
          });
        }
      });

      setCostsByItemType(computedTypes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Rapport des Coûts</h1>

      {loading ? (
        <div>Chargement...</div>
      ) : (
        <div>
          <div>
            <h2>Coûts par Type d'Élément</h2>
            <table border="1">
              <thead>
                <tr>
                  <th>Type d'Élément</th>
                  <th>Normal Cost (API GLPI)</th>
                  <th>SuperCost (SQLite)</th>
                  <th>Coût de Réouverture</th>
                  <th>Cout Total</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(costsByItemType).map((typeData, index) => (
                  <tr key={index}>
                    <td>{typeData.label}</td>
                    <td>{typeData.normalCost.toFixed(2)}</td>
                    <td>{typeData.superCost.toFixed(2)}</td>
                    <td>{typeData.reopenCost.toFixed(2)}</td>
                    <td>{typeData.totalCost.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h2>Détails des Tickets (Historique complet)</h2>
            <table border="1">
              <thead>
                <tr>
                  <th>ID Cout</th>
                  <th>Ticket ID</th>
                  <th>Ticket</th>
                  <th>Total Normal Cost (API GLPI)</th>
                  <th>Total Super Cost (SQLite)</th>
                  <th>Pourcentage Réouverture</th>
                  <th>Total Coût Réouverture</th>
                  <th>Total Cout par Ticket</th>
                  <th>Éléments Liés</th>
                  <th>Normal Cost par Élément</th>
                  <th>Super Cost par Élément</th>
                  <th>Coût Réouverture par Élément</th>
                  <th>Cout Total par Élément</th>
                </tr>
              </thead>
              <tbody>
                {costs.map((cost, index) => (
                  <tr key={cost.id}>
                    <td>{cost.id}</td>
                    <td>{cost.id_ticket}</td>
                    <td>{cost.ticket?.name || 'N/A'}</td>
                    <td>{cost.totalNormalCost.toFixed(2)}</td>
                    <td>{cost.superCost.toFixed(2)}</td>
                    <td>{cost.coutReouverture.toFixed(2)}%</td>
                    <td>{cost.totalReopenCost.toFixed(2)}</td>
                    <td>{(cost.totalNormalCost + cost.superCost + cost.totalReopenCost).toFixed(2)}</td>
                    <td>
                      {cost.items?.map((item, i) => (
                        <div key={i}>{item.itemtype} #{item.items_id}</div>
                      )) || 'Aucun'}
                    </td>
                    <td>{cost.normalCostPerItem.toFixed(2)}</td>
                    <td>{cost.superCostPerItem.toFixed(2)}</td>
                    <td>{cost.reopenCostPerItem.toFixed(2)}</td>
                    <td>{(cost.normalCostPerItem + cost.superCostPerItem + cost.reopenCostPerItem).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CostReport;
