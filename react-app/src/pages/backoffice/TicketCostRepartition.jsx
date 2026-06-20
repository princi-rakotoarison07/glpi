import { useState, useEffect } from 'react';
import TicketCostService from '../../services/TicketCost/TicketCostService';
import ItemTicketService from '../../services/ItemTicket/ItemTicketService';

import { Calculator, LayoutList } from 'lucide-react';
import '../../styles/TicketCostRepartition.css';

const TicketCostRepartition = () => {
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        // 1. Fetch all item-ticket relations
        const itemTickets = await ItemTicketService.getAllItemTickets();
        
        // Count elements per ticket to divide costs equally
        const elementsCountPerTicket = {};
        itemTickets.forEach(link => {
          const tId = Number(link.tickets_id);
          if (!elementsCountPerTicket[tId]) {
            elementsCountPerTicket[tId] = 0;
          }
          elementsCountPerTicket[tId]++;
        });

        // 2. Fetch all regular costs from GLPI
        const allCosts = await TicketCostService.getAllCosts();
        const costPerTicket = {};
        allCosts.forEach(cost => {
          const tId = Number(cost.tickets_id);
          const costFixed = parseFloat(cost.cost_fixed || 0);
          const costMaterial = parseFloat(cost.cost_material || 0);
          const hourlyRate = parseFloat(cost.cost_time || 0);
          const durationHours = (parseInt(cost.actiontime) || 0) / 3600;
          const timeCost = durationHours * hourlyRate;
          const total = costFixed + costMaterial + timeCost;

          if (!costPerTicket[tId]) {
            costPerTicket[tId] = { coutFixe: 0, coutTotal: 0 };
          }
          costPerTicket[tId].coutFixe += costFixed;
          costPerTicket[tId].coutTotal += total;
        });

        // 3. Fetch all super costs from Express backend
        let allSuperCosts = [];
        try {
          allSuperCosts = await TicketCostService.getAllSuperCosts();
        } catch (err) {
          console.warn('Erreur lors de la récupération des Super Costs', err);
        }

        const superCostPerTicket = {};
        allSuperCosts.forEach(sc => {
          const tId = Number(sc.ticket_id);
          if (!superCostPerTicket[tId]) superCostPerTicket[tId] = 0;
          superCostPerTicket[tId] += parseFloat(sc.super_cost || 0);
        });

        // 3.5 Fetch all reopen costs from Express backend
        let allReopenCosts = [];
        try {
          allReopenCosts = await TicketCostService.getAllReopenCosts();
        } catch (err) {
          console.warn('Erreur lors de la récupération des Reopen Costs', err);
        }

        const reopenCostPerTicket = {};
        allReopenCosts.forEach(rc => {
          const tId = Number(rc.ticket_id);
          if (!reopenCostPerTicket[tId]) reopenCostPerTicket[tId] = 0;
          reopenCostPerTicket[tId] += parseFloat(rc.reopen_cost || 0);
        });

        // 4. Calculate total costs per element
        const elementsMap = {};

        itemTickets.forEach(link => {
          const tId = Number(link.tickets_id);
          const itemId = link.items_id;
          const itemType = link.itemtype;
          
          // Unique key for the element
          const elementKey = `${itemType}_${itemId}`;
          
          if (!elementsMap[elementKey]) {
            elementsMap[elementKey] = {
              id: itemId,
              type: itemType,
              name: link.item?.name || `Élément #${itemId}`,
              coutFixe: 0,
              coutTotal: 0,
              superCost: 0,
              reopenCost: 0
            };
          }

          const numElementsInThisTicket = elementsCountPerTicket[tId] || 1;
          
          // Add proportion of ticket costs
          if (costPerTicket[tId]) {
            elementsMap[elementKey].coutFixe += (costPerTicket[tId].coutFixe / numElementsInThisTicket);
            elementsMap[elementKey].coutTotal += (costPerTicket[tId].coutTotal / numElementsInThisTicket);
          }
          
          if (superCostPerTicket[tId]) {
            elementsMap[elementKey].superCost += (superCostPerTicket[tId] / numElementsInThisTicket);
          }
          
          if (reopenCostPerTicket[tId]) {
            elementsMap[elementKey].reopenCost += (reopenCostPerTicket[tId] / numElementsInThisTicket);
          }
        });

        // Convert map to array and sort by type then name
        const elementsArray = Object.values(elementsMap).sort((a, b) => {
          if (a.type !== b.type) return a.type.localeCompare(b.type);
          return a.name.localeCompare(b.name);
        });

        setElements(elementsArray);

      } catch (error) {
        console.error('Erreur lors du calcul de la répartition globale:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const totalGlpi = elements.reduce((acc, el) => acc + el.coutTotal, 0);
  const totalSuper = elements.reduce((acc, el) => acc + el.superCost, 0);
  const totalReopen = elements.reduce((acc, el) => acc + el.reopenCost, 0);
  const grandTotal = totalGlpi + totalSuper + totalReopen;

  return (
    <div className="cost-repartition-container">
      <div className="repartition-header">
        <h1 className="repartition-title">
          <Calculator size={32} className="title-icon" />
          Répartition Globale des Coûts par Élément
        </h1>
        <p style={{ color: '#64748b', marginTop: '12px', fontSize: '1rem' }}>
          Ce tableau liste tous les éléments liés à des tickets et affiche la somme de leurs coûts proportionnels (coût du ticket divisé par le nombre d'éléments liés).
        </p>
      </div>

      <div className="repartition-card">
        {loading ? (
          <div className="repartition-loading">Calcul de la répartition globale des coûts...</div>
        ) : elements.length === 0 ? (
          <div className="repartition-empty">
            <LayoutList size={48} className="repartition-empty-icon" />
            <h3>Aucun élément lié trouvé</h3>
            <p>Il semble qu'aucun ticket avec des coûts ne possède d'éléments liés dans le système.</p>
          </div>
        ) : (
          <>
            <h2 className="repartition-section-title">Liste des éléments et leurs coûts cumulés</h2>
            <div className="repartition-table-container">
              <table className="repartition-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Nom de l'élément</th>
                    <th>Coût Total(GLPI)</th>
                    <th>Super Cost Total</th>
                    <th>Coût Réouverture</th>
                    <th>Somme</th>
                  </tr>
                </thead>
                <tbody>
                  {elements.map((el, index) => {
                    const somme = el.coutTotal + el.superCost + el.reopenCost;
                    return (
                    <tr key={index}>
                      <td><span className="item-type">{el.type}</span></td>
                      <td className="item-id">{el.name}</td>
                      <td>
                        <span className="cost-badge green">
                          {el.coutTotal > 0 ? el.coutTotal.toFixed(3) : '-'}
                        </span>
                      </td>
                      <td>
                        <span className="cost-badge purple">
                          {el.superCost > 0 ? el.superCost.toFixed(3) : '-'}
                        </span>
                      </td>
                      <td>
                        <span className="cost-badge" style={{ backgroundColor: '#fdf4ff', color: '#c026d3', border: '1px solid #f0abfc' }}>
                          {el.reopenCost > 0 ? el.reopenCost.toFixed(3) : '-'}
                        </span>
                      </td>
                      <td>
                        <span className="cost-badge" style={{ backgroundColor: '#f8fafc', color: '#0f172a', border: '1px solid #94a3b8', fontWeight: 'bold' }}>
                          {somme > 0 ? somme.toFixed(3) : '-'}
                        </span>
                      </td>
                    </tr>
                  )})}
                </tbody>
                <tfoot>
                  <tr style={{ backgroundColor: '#e2e8f0' }}>
                    <td colSpan="2" style={{ textAlign: 'right', fontWeight: 'bold', paddingRight: '20px', color: '#1e293b', fontSize: '1.1rem' }}>Total général</td>
                    <td>
                      <span className="cost-badge green" style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                        {totalGlpi > 0 ? totalGlpi.toFixed(3) : '-'}
                      </span>
                    </td>
                    <td>
                      <span className="cost-badge purple" style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                        {totalSuper > 0 ? totalSuper.toFixed(3) : '-'}
                      </span>
                    </td>
                    <td>
                      <span className="cost-badge" style={{ backgroundColor: '#fdf4ff', color: '#c026d3', border: '1px solid #f0abfc', fontWeight: 'bold', fontSize: '1rem' }}>
                        {totalReopen > 0 ? totalReopen.toFixed(3) : '-'}
                      </span>
                    </td>
                    <td>
                      <span className="cost-badge" style={{ backgroundColor: '#0f172a', color: '#ffffff', border: '1px solid #0f172a', fontWeight: 'bold', fontSize: '1rem' }}>
                        {grandTotal > 0 ? grandTotal.toFixed(3) : '-'}
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TicketCostRepartition;
