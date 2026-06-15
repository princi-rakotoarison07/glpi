import React, { useEffect } from 'react';
import { RefreshCcw, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';
import { RESET_RESOURCES } from '../../../config/resetResources';
import useResetResources from '../../../hooks/useResetResources';
import '../../../styles/Reset.css';
import '../../../styles/list.css';

const StatusCell = ({ name, progress }) => {
  const state = progress.get(name);
  if (!state || state.status === 'idle') {
    return (
      <span className="status-badge status-badge--idle" style={{ background: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>
        En attente
      </span>
    );
  }
  if (state.status === 'running') {
    const pct = state.total > 0 ? Math.round((state.deleted / state.total) * 100) : 0;
    return (
      <div className="progress-mini" style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '120px' }}>
        <span className="status-badge status-badge--running" style={{ background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <span className="spinner" style={{ border: '2px solid rgba(180, 83, 9, 0.1)', borderLeftColor: '#b45309', borderRadius: '50%', width: '10px', height: '10px', animation: 'spin 1s linear infinite' }} />
          {state.deleted}/{state.total} ({pct}%)
        </span>
        <div className="progress-mini__bar" style={{ width: '100%', height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
          <div className="progress-mini__fill" style={{ width: `${pct}%`, height: '100%', background: '#b45309' }} />
        </div>
      </div>
    );
  }
  if (state.status === 'done') {
    return (
      <span className="status-badge status-badge--done" style={{ background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>
        {state.deleted} supprimé(s)
      </span>
    );
  }
  if (state.status === 'empty') {
    return (
      <span className="status-badge status-badge--empty" style={{ background: '#eff6ff', color: '#1e40af', border: '1px solid #bfdbfe', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>
        Vide
      </span>
    );
  }
  if (state.status === 'partial') {
    return (
      <span className="status-badge status-badge--partial" style={{ background: '#e0f2fe', color: '#0369a1', border: '1px solid #bae6fd', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>
        {state.deleted}/{state.total}
      </span>
    );
  }
  if (state.status === 'forbidden') {
    return (
      <span className="status-badge status-badge--forbidden" style={{ background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>
        Non autorisé (403)
      </span>
    );
  }
  return (
    <span className="status-badge status-badge--error" style={{ background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>
      Erreur
    </span>
  );
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

  // Calculate overall global progress metrics
  const selectedList = Array.from(selected);
  const totalSelected = selectedList.length;
  const completedSelected = selectedList.filter(name => {
    const state = progress.get(name);
    return state && ['done', 'empty', 'partial', 'forbidden', 'error'].includes(state.status);
  }).length;
  
  const currentRunning = selectedList.find(name => {
    const state = progress.get(name);
    return state && state.status === 'running';
  });
  const currentRunningState = currentRunning ? progress.get(currentRunning) : null;
  
  let runningPercent = 0;
  if (currentRunningState && currentRunningState.total > 0) {
    runningPercent = (currentRunningState.deleted / currentRunningState.total);
  }
  
  const globalPercent = totalSelected > 0 
    ? Math.round(((completedSelected + runningPercent) / totalSelected) * 100)
    : 0;

  return (
    <div className="reset-page" style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div className="reset-header" style={{ textAlign: 'center', marginBottom: '8px' }}>
        <h1 className="reset-title" style={{ fontSize: '28px', fontWeight: '800', color: '#2f3f64', margin: 0 }}>
          Réinitialisation des données
        </h1>
        <p className="reset-subtitle" style={{ fontSize: '15px', color: '#64748b', marginTop: '6px' }}>
          Videz et purgez les tables de votre instance GLPI 11 via l'API REST
        </p>
      </div>

      {/* Global Progress Bar at the top */}
      {(isRunning || isDone) && (
        <div style={{ 
          background: '#ffffff', 
          borderRadius: '12px', 
          border: '1px solid #e2e8f0', 
          padding: '24px', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#2f3f64', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isRunning && <span className="spinner" style={{ border: '2px solid rgba(47, 63, 100, 0.1)', borderLeftColor: '#2f3f64', borderRadius: '50%', width: '14px', height: '14px', animation: 'spin 1s linear infinite' }} />}
              {globalStatus === 'done' 
                ? 'Réinitialisation complétée avec succès !' 
                : globalStatus === 'error' 
                  ? 'Opération interrompue par une erreur' 
                  : 'Purge de la base de données en cours...'}
            </span>
            <span style={{ fontSize: '15px', fontWeight: '800', color: '#2f3f64' }}>{globalPercent}%</span>
          </div>
          <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
            <div style={{ height: '100%', width: `${globalPercent}%`, background: globalStatus === 'error' ? '#ef4444' : '#2f3f64', transition: 'width 0.4s ease' }} />
          </div>
          <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <span>{completedSelected} sur {totalSelected} tables sélectionnées purgées</span>
            {currentRunning && (
              <span>Ressource en cours : <strong>{RESET_RESOURCES.find(r => r.name === currentRunning)?.label || currentRunning}</strong></span>
            )}
          </div>
        </div>
      )}

      {/* Warning Area */}
      {!isRunning && !isDone && (
        <div style={{ 
          background: '#fffbeb', 
          border: '1px solid #fef3c7', 
          borderLeft: '4px solid #f59f00', 
          borderRadius: '10px', 
          padding: '16px 20px', 
          display: 'flex', 
          gap: '14px', 
          alignItems: 'flex-start' 
        }}>
          <AlertTriangle color="#f59f00" size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ margin: 0, fontWeight: '700', color: '#92400e', fontSize: '14px' }}>Zone de Danger de Données</h4>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#b45309', lineHeight: '1.5' }}>
              Cette action supprimera définitivement les éléments sélectionnés de la base de données GLPI. Cette opération est immédiate et irréversible.
            </p>
          </div>
        </div>
      )}

      {/* Main Panel */}
      <div className="reset-panel" style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
        
        <div className="reset-panel__header" style={{ padding: '24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div className="reset-panel__header-info" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: '#2f3f64', display: 'flex', alignItems: 'center' }}>
              <RefreshCcw size={22} className={isRunning ? 'animate-spin' : ''} style={{ animationDuration: '2s' }} />
            </span>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#2f3f64', margin: 0 }}>Options de réinitialisation</h2>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '2px 0 0 0' }}>Cochez les ressources que vous souhaitez vider définitivement.</p>
            </div>
          </div>
          <div className="reset-panel__header-actions" style={{ display: 'flex', gap: '8px' }}>
            <button className="btn-select" onClick={selectAll} disabled={isRunning} style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', color: '#334155', fontWeight: '600', fontSize: '12px', cursor: 'pointer' }}>
              Tout sélectionner
            </button>
            <button className="btn-select" onClick={deselectAll} disabled={isRunning} style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', color: '#334155', fontWeight: '600', fontSize: '12px', cursor: 'pointer' }}>
              Aucun
            </button>
          </div>
        </div>

        {/* Resources Grid of Cards */}
        <div className={`reset-panel__content ${isRunning ? 'reset-running' : ''}`} style={{ maxHeight: '600px', overflowY: 'auto', background: '#f8fafc' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', padding: '24px' }}>
            {RESET_RESOURCES.map(resource => {
              const deps = getDependenciesForParent(resource.name);
              const isSelected = selected.has(resource.name);

              return (
                <div 
                  key={resource.name} 
                  onClick={() => !isRunning && toggleResource(resource.name)}
                  style={{ 
                    border: isSelected ? '1px solid #2f3f64' : '1px solid #e2e8f0', 
                    background: '#ffffff',
                    borderRadius: '10px',
                    padding: '18px',
                    cursor: isRunning ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '160px',
                    boxShadow: isSelected ? '0 4px 10px rgba(47, 63, 100, 0.05)' : 'none',
                  }}
                  className="reset-resource-card"
                >
                  <div>
                    {/* Header with Checkbox + Label */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        onClick={(e) => e.stopPropagation()}
                        disabled={isRunning}
                        style={{ cursor: isRunning ? 'not-allowed' : 'pointer' }}
                      />
                      <span style={{ fontWeight: '700', color: '#2f3f64', fontSize: '14px' }}>
                        {resource.label}
                      </span>
                    </div>

                    {/* API Endpoint */}
                    <div style={{ fontFamily: 'monospace', fontSize: '11px', color: '#64748b', marginBottom: '8px', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', width: 'fit-content' }}>
                      {resource.endpoint}
                    </div>

                    {/* Dependencies */}
                    {deps.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                        <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '500' }}>Dépendances :</span>
                        {deps.map((dep, dIdx) => (
                          <span key={dIdx} style={{ fontSize: '10px', color: '#b45309', background: '#fffbeb', padding: '1px 6px', borderRadius: '4px', fontWeight: '600' }}>
                            {dep}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Status / Progress Footer */}
                  <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '12px', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>STATUT</span>
                      <StatusCell name={resource.name} progress={progress} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Result Panel */}
        {isDone && (
          <div 
            className={`reset-panel__result reset-panel__result--${globalStatus}`}
            style={{ 
              padding: '16px 24px', 
              fontSize: '14px', 
              fontWeight: '600', 
              borderTop: '1px solid #e2e8f0',
              background: globalStatus === 'done' ? '#f0fdf4' : '#fef2f2',
              color: globalStatus === 'done' ? '#15803d' : '#b91c1c'
            }}
          >
            {globalStatus === 'done'
              ? 'Réinitialisation terminée avec succès. Les tables sélectionnées ont été purgées de votre instance GLPI.'
              : 'La réinitialisation s\'est terminée avec des erreurs. Veuillez vérifier vos logs Apache ou les droits d\'accès de votre compte API.'}
          </div>
        )}

        {/* Footer controls */}
        <div className="reset-panel__footer" style={{ padding: '20px 24px', borderTop: '1px solid #f1f5f9', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="reset-panel__summary" style={{ fontSize: '14px', color: '#475569', fontWeight: '500' }}>
            {!isDone ? (
              <span><strong>{selectedCount}</strong> ressource(s) sélectionnée(s)</span>
            ) : (
              <span>Opération complétée</span>
            )}
          </div>
          <div className="reset-panel__footer-btns">
            {isDone ? (
              <button 
                className="btn-reset-again" 
                onClick={resetState}
                style={{ 
                  padding: '10px 20px', 
                  borderRadius: '6px', 
                  border: '1px solid #cbd5e1', 
                  background: '#fff', 
                  color: '#334155', 
                  fontWeight: '700', 
                  fontSize: '14px', 
                  cursor: 'pointer' 
                }}
              >
                Recommencer
              </button>
            ) : (
              <button 
                className="btn-reset-go" 
                onClick={handleReset} 
                disabled={isRunning || selectedCount === 0}
                style={{ 
                  padding: '10px 24px', 
                  borderRadius: '6px', 
                  border: 'none', 
                  background: isRunning || selectedCount === 0 ? '#94a3b8' : '#ef4444', 
                  color: '#fff', 
                  fontWeight: '700', 
                  fontSize: '14px', 
                  cursor: isRunning || selectedCount === 0 ? 'not-allowed' : 'pointer',
                  boxShadow: selectedCount > 0 && !isRunning ? '0 2px 8px rgba(239, 68, 68, 0.2)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                {isRunning ? 'Purge en cours...' : 'Vider la base de données'}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Reset;
