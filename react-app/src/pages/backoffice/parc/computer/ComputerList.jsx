import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ArrowUpDown, Eye } from 'lucide-react';
import ComputerService from '../../../../services/Computer/ComputerService';
import '../../../../styles/pages/TicketList.css';

const ComputerList = () => {
  const [computers, setComputers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComputers = async () => {
    setLoading(true);
    try {
      const data = await ComputerService.getAllComputers();
      setComputers(data);
    } catch (error) {
      console.error('Error fetching computers:', error);
      setComputers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComputers();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="ticket-list-page">
      <div className="page-header">
        <h1>Liste des ordinateurs</h1>
      </div>

      <div className="ticket-table-container">
        {loading ? (
          <div className="loading-state">Chargement...</div>
        ) : (
          <table className="ticket-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Numéro d'inventaire</th>
                <th>Date de création</th>
                <th>Dernière modification</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {computers.length > 0 ? (
                computers.map((computer) => (
                  <tr key={computer.id}>
                    <td>{computer.id}</td>
                    <td className="ticket-title">
                      {computer.name || `Ordinateur #${computer.id}`}
                    </td>
                    <td>{computer.otherserial || '-'}</td>
                    <td>{formatDate(computer.date)}</td>
                    <td>{formatDate(computer.date_mod)}</td>
                    <td className="action-cell">
                      <Link to={`/parc/computers/${computer.id}`} className="action-btn view-btn">
                        <Eye size={16} />
                        Détails
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="empty-state">
                    Aucun ordinateur trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ComputerList;
