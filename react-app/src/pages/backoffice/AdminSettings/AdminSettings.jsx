import React, { useState, useEffect } from 'react';
import SettingsService from '../../../services/Settings/SettingsService';
import '../../../styles/AdminSettings.css';

const AdminSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [apiError, setApiError] = useState('');
  
  const [colors, setColors] = useState({});
  const [languages, setLanguages] = useState([]);
  const [selectedLanguageId, setSelectedLanguageId] = useState(null);
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      setApiError('');
      try {
        const data = await SettingsService.getSettings();
        
        // Use only API data
        setColors({
          color_nouveau: data.color_nouveau,
          color_inProgress: data.color_inProgress,
          color_termine: data.color_termine
        });
        setSelectedLanguageId(parseInt(data.selected_language_id));
        setLanguages(data.languages || []);
        setTranslations(data.all_translations || {});
        
      } catch (err) {
        console.error('Error fetching settings:', err);
        setApiError('Impossible de se connecter à l\'API. La page de configuration n\'est pas disponible.');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleLabelChange = (field, value) => {
    setTranslations(prev => ({
      ...prev,
      [selectedLanguageId]: {
        ...prev[selectedLanguageId],
        [field]: value
      }
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');
    setErrorMessage('');
    try {
      const payload = {
        color_nouveau: colors.color_nouveau,
        color_inProgress: colors.color_inProgress,
        color_termine: colors.color_termine,
        selected_language_id: String(selectedLanguageId),
        all_translations: translations
      };

      await SettingsService.updateSettings(payload);
      setSuccessMessage('Paramètres enregistrés avec succès !');
      setTimeout(() => {
        setSuccessMessage('');
      }, 4000);
    } catch (err) {
      console.error('Error saving settings:', err);
      setErrorMessage("Erreur lors de l'enregistrement des paramètres.");
      setTimeout(() => {
        setErrorMessage('');
      }, 4000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page-container" style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', minHeight: 'auto' }}>
      <div className="card" style={{ maxWidth: 'none', width: '100%', boxSizing: 'border-box', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        
        {/* Header Section with Title on Left, Language Dropdown on Right */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="card-title" style={{ margin: 0, color: '#2f3f64', fontSize: '24px', fontWeight: '700' }}>Configuration du Kanban</h1>
            <p className="card-text" style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>Paramètres stockés dans SQLite</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#475569', whiteSpace: 'nowrap' }}>Langue active :</label>
            <select
              value={selectedLanguageId}
              onChange={e => setSelectedLanguageId(parseInt(e.target.value))}
              style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '14px', fontWeight: '600', color: '#334155', cursor: 'pointer', outline: 'none' }}
            >
              {languages.map(lang => (
                <option key={lang.id} value={lang.id}>
                  {lang.nom}
                </option>
              ))}
            </select>
          </div>
        </div>

        {successMessage && (
          <div className="admin-settings-alert admin-settings-alert-success" style={{ marginBottom: '24px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="admin-settings-alert admin-settings-alert-error" style={{ marginBottom: '24px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {errorMessage}
          </div>
        )}

        {loading ? (
          <div style={{ color: '#64748b', fontSize: '14px' }}>Chargement des paramètres...</div>
        ) : apiError ? (
          <div style={{ 
            padding: '24px', 
            background: '#fee2e2', 
            color: '#991b1b', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            {apiError}
          </div>
        ) : (
          <form onSubmit={handleSave}>
            
            {/* Visual configuration cards representing the 3 columns */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '32px' }}>
              
              {/* Column 1: Nouveau */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <div style={{ padding: '14px 18px', background: colors.color_nouveau, color: '#ffffff', fontWeight: '700', fontSize: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{translations[selectedLanguageId]?.label_nouveau || 'Nouveau'}</span>
                  <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '4px' }}>Aperçu</span>
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>Nom de la colonne</label>
                    <input
                      type="text"
                      value={translations[selectedLanguageId]?.label_nouveau || ''}
                      onChange={e => handleLabelChange('label_nouveau', e.target.value)}
                      placeholder="Ex: Nouveau"
                      style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
                      required
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>Couleur</label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <input
                        type="color"
                        value={colors.color_nouveau}
                        onChange={e => setColors(prev => ({ ...prev, color_nouveau: e.target.value }))}
                        style={{ width: '42px', height: '42px', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer', padding: 0, background: 'none' }}
                      />
                      <input
                        type="text"
                        value={colors.color_nouveau}
                        onChange={e => setColors(prev => ({ ...prev, color_nouveau: e.target.value }))}
                        style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', textTransform: 'uppercase', fontSize: '14px', flex: 1, outline: 'none' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2: In progress */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <div style={{ padding: '14px 18px', background: colors.color_inProgress, color: '#ffffff', fontWeight: '700', fontSize: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{translations[selectedLanguageId]?.label_inProgress || 'En cours'}</span>
                  <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '4px' }}>Aperçu</span>
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>Nom de la colonne</label>
                    <input
                      type="text"
                      value={translations[selectedLanguageId]?.label_inProgress || ''}
                      onChange={e => handleLabelChange('label_inProgress', e.target.value)}
                      placeholder="Ex: In progress (assigné)"
                      style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
                      required
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>Couleur</label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <input
                        type="color"
                        value={colors.color_inProgress}
                        onChange={e => setColors(prev => ({ ...prev, color_inProgress: e.target.value }))}
                        style={{ width: '42px', height: '42px', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer', padding: 0, background: 'none' }}
                      />
                      <input
                        type="text"
                        value={colors.color_inProgress}
                        onChange={e => setColors(prev => ({ ...prev, color_inProgress: e.target.value }))}
                        style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', textTransform: 'uppercase', fontSize: '14px', flex: 1, outline: 'none' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 3: Terminé */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <div style={{ padding: '14px 18px', background: colors.color_termine, color: '#ffffff', fontWeight: '700', fontSize: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{translations[selectedLanguageId]?.label_termine || 'Terminé'}</span>
                  <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '4px' }}>Aperçu</span>
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>Nom de la colonne</label>
                    <input
                      type="text"
                      value={translations[selectedLanguageId]?.label_termine || ''}
                      onChange={e => handleLabelChange('label_termine', e.target.value)}
                      placeholder="Ex: Terminé"
                      style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
                      required
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>Couleur</label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <input
                        type="color"
                        value={colors.color_termine}
                        onChange={e => setColors(prev => ({ ...prev, color_termine: e.target.value }))}
                        style={{ width: '42px', height: '42px', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer', padding: 0, background: 'none' }}
                      />
                      <input
                        type="text"
                        value={colors.color_termine}
                        onChange={e => setColors(prev => ({ ...prev, color_termine: e.target.value }))}
                        style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', textTransform: 'uppercase', fontSize: '14px', flex: 1, outline: 'none' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '20px', display: 'flex', justifyContent: 'flex-start' }}>
              <button 
                type="submit" 
                disabled={saving}
                style={{ 
                  padding: '12px 24px', 
                  borderRadius: '6px', 
                  border: 'none', 
                  background: '#2f3f64', 
                  color: '#ffffff', 
                  fontWeight: '700', 
                  fontSize: '15px', 
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => e.target.style.background = '#1d273e'}
                onMouseLeave={(e) => e.target.style.background = '#2f3f64'}
              >
                {saving ? 'Enregistrement en cours...' : 'Enregistrer la configuration'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;
