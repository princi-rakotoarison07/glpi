import React, { useEffect } from 'react';
import { RefreshCcw } from 'lucide-react';
import { RESET_RESOURCES } from '../../../config/resetResources';
import useResetResources from '../../../hooks/useResetResources';
import '../../../styles/Reset.css';
import '../../../styles/list.css';

const StatusCell = ({ name, progress }) => {
  const state = progress.get(name);
  if (!state || state.status === 'idle') {
    return <span className="status-badge status-badge--idle">En attente</span>;
  }
  if (state.status === 'running') {
    const pct = state.total > 0 ? Math.round((state.deleted / state.total) * 100) : 0;
    return (
      <div className="progress-mini">
        <span className="status-badge status-badge--running">
          <span className="spinner" style={{ marginRight: '6px' }} />
          {state.deleted}/{state.total} ({pct}%)
        </span>
        <div className="progress-mini__bar">
          <div className="progress-mini__fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
    );
  }
  if (state.status === 'done') {
    return <span className="status-badge status-badge--done">{state.deleted} supprimé(s)</span>;
  }
  if (state.status === 'empty') {
    return <span className="status-badge status-badge--empty">Vide</span>;
  }
  if (state.status === 'partial') {
    return <span className="status-badge status-badge--partial">{state.deleted}/{state.total}</span>;
  }
  if (state.status === 'forbidden') {
    return <span className="status-badge status-badge--forbidden">Non autorisé (403)</span>;
  }
  return <span className="status-badge status-badge--error">Erreur</span>;
};

const Reset = () => {
  const {
    selected,
    progress,
    globalStatus,
    toggleResource,
    selectAll,
    deselectAll,
    startReset,
    resetState,
    selectedCount,
    getDependenciesForParent,
  } = useResetResources();

  const isRunning = globalStatus === 'running';
  const isDone = globalStatus === 'done' || globalStatus === 'error';

  const handleReset = () => {
    if (selectedCount === 0) return;
    if (window.confirm('ATTENTION : Cette action supprime définitivement les données GLPI sélectionnées de la base de données.\n\nCette opération est irréversible. Voulez-vous continuer ?')) {
      startReset();
    }
  };

  const currentRunningResource = Array.from(progress.entries()).find(([_, state]) => state.status === 'running')?.[0];
  const currentResourceLabel = RESET_RESOURCES.find(r => r.name === currentRunningResource)?.label;

  return (
    <div className="reset-page">
      <div className="reset-header">
        <h1 className="reset-title">Réinitialisation des données</h1>
        <p className="reset-subtitle">Videz et purgez facilement les tables de votre instance GLPI 11 via l'API REST.</p>
      </div>

      {isRunning && currentResourceLabel && (
        <div className="reset-running-banner">
          <span className="spinner" style={{ width: '18px', height: '18px' }} />
          <span>Traitement en cours : <strong>{currentResourceLabel}</strong> ({currentRunningResource})</span>
        </div>
      )}

      <div className="reset-panel">
        <div className="reset-panel__header">
          <div className="reset-panel__header-info">
            <span className="reset-panel__header-icon">
              <RefreshCcw size={24} className={isRunning ? 'animate-spin' : ''} style={{ animationDuration: '2s' }} />
            </span>
            <div className="reset-panel__header-text">
              <h2>Options de réinitialisation</h2>
              <p>Cochez les ressources que vous souhaitez vider définitivement.</p>
            </div>
          </div>
          <div className="reset-panel__header-actions">
            <button className="btn-select" onClick={selectAll} disabled={isRunning}>Tout sélectionner</button>
            <button className="btn-select" onClick={deselectAll} disabled={isRunning}>Aucun</button>
          </div>
        </div>

        <div className={`reset-panel__content parc-table-container reset-table-container`}>
          <table className={`parc-table reset-table ${isRunning ? 'reset-running' : ''}`}>
            <thead>
              <tr>
                <th className="reset-col-check">
                  <input
                    type="checkbox"
                    checked={selectedCount === RESET_RESOURCES.length}
                    onChange={(e) => {
                      if (isRunning) return;
                      if (e.target.checked) selectAll();
                      else deselectAll();
                    }}
                    disabled={isRunning}
                  />
                </th>
                <th>Ressource</th>
                <th>Endpoint API</th>
                <th>Dépendances</th>
                <th className="reset-col-status">Statut</th>
              </tr>
            </thead>
            <tbody>
              {RESET_RESOURCES.map(resource => {
                const deps = getDependenciesForParent(resource.name);
                const isSelected = selected.has(resource.name);

                return (
                  <tr 
                    key={resource.name} 
                    onClick={() => !isRunning && toggleResource(resource.name)}
                    className={isSelected ? 'is-selected-row' : ''}
                  >
                    <td className="reset-col-check">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        onClick={(e) => e.stopPropagation()}
                        disabled={isRunning}
                      />
                    </td>
                    <td className="reset-col-label">{resource.label}</td>
                    <td className="reset-col-endpoint">{resource.endpoint}</td>
                    <td>
                      {deps.length > 0 ? (
                        <span className="reset-card__deps" title="Sera également vidé pour éviter des erreurs d'intégrité">
                          {deps.join(', ')}
                        </span>
                      ) : (
                        <span className="reset-deps-none">Aucune</span>
                      )}
                    </td>
                    <td className="reset-col-status">
                      <StatusCell name={resource.name} progress={progress} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {isDone && (
          <div className={`reset-panel__result reset-panel__result--${globalStatus}`}>
            {globalStatus === 'done'
              ? 'Réinitialisation terminée avec succès. Les tables sélectionnées ont été purgées.'
              : 'La réinitialisation s\'est terminée avec des erreurs. Veuillez vérifier les logs ou vos permissions API.'}
          </div>
        )}

        <div className="reset-panel__footer">
          <div className="reset-panel__summary">
            {!isDone ? (
              <><strong>{selectedCount}</strong> ressource(s) à effacer</>
            ) : (
              <span>Opération terminée</span>
            )}
          </div>
          <div className="reset-panel__footer-btns">
            {isDone ? (
              <button className="btn-reset-again" onClick={resetState}>Recommencer</button>
            ) : (
              <button 
                className="btn-reset-go" 
                onClick={handleReset} 
                disabled={isRunning || selectedCount === 0}
              >
                {isRunning ? (
                  <>Nettoyage en cours...</>
                ) : (
                  <>Vider la base de données</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
