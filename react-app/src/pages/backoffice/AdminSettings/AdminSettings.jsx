import React, { useState, useEffect } from 'react';
import SettingsService from '../../../services/Settings/SettingsService';

const AdminSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    color_nouveau: '#3b82f6',
    color_inProgress: '#f59e0b',
    color_termine: '#10b981',
    label_nouveau: 'Nouveau',
    label_inProgress: 'In progress (assigné)',
    label_termine: 'Terminé'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const data = await SettingsService.getSettings();
        setSettings({
          color_nouveau: data.color_nouveau || '#3b82f6',
          color_inProgress: data.color_inProgress || '#f59e0b',
          color_termine: data.color_termine || '#10b981',
          label_nouveau: data.label_nouveau || 'Nouveau',
          label_inProgress: data.label_inProgress || 'In progress (assigné)',
          label_termine: data.label_termine || 'Terminé'
        });
      } catch (err) {
        console.error('Error fetching settings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await SettingsService.updateSettings(settings);
      alert('Paramètres enregistrés avec succès.');
    } catch (err) {
      console.error('Error saving settings:', err);
      alert("Erreur lors de l'enregistrement des paramètres.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page-container" style={{ alignItems: 'stretch', justifyContent: 'flex-start' }}>
      <div className="card" style={{ maxWidth: 'none', width: '100%', boxSizing: 'border-box' }}>
        <h1 className="card-title">Configuration du Kanban</h1>
        <p className="card-text" style={{ marginBottom: '24px' }}>Paramètres stockés dans SQLite</p>

        {loading ? (
          <div>Chargement des paramètres...</div>
        ) : (
          <form onSubmit={handleSave}>
            <div className="admin-section" style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e293b', borderBottom: '2px solid #f1f5f9', paddingBottom: '10px', marginBottom: '20px' }}>
                i. Couleurs des colonnes Kanban
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>Couleur colonne "Nouveau"</label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={settings.color_nouveau}
                      onChange={e => setSettings(prev => ({ ...prev, color_nouveau: e.target.value }))}
                      style={{ width: '42px', height: '42px', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer' }}
                    />
                    <input
                      type="text"
                      value={settings.color_nouveau}
                      onChange={e => setSettings(prev => ({ ...prev, color_nouveau: e.target.value }))}
                      style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', textTransform: 'uppercase', flex: 1 }}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>Couleur colonne "In progress"</label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={settings.color_inProgress}
                      onChange={e => setSettings(prev => ({ ...prev, color_inProgress: e.target.value }))}
                      style={{ width: '42px', height: '42px', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer' }}
                    />
                    <input
                      type="text"
                      value={settings.color_inProgress}
                      onChange={e => setSettings(prev => ({ ...prev, color_inProgress: e.target.value }))}
                      style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', textTransform: 'uppercase', flex: 1 }}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>Couleur colonne "Terminé"</label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={settings.color_termine}
                      onChange={e => setSettings(prev => ({ ...prev, color_termine: e.target.value }))}
                      style={{ width: '42px', height: '42px', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer' }}
                    />
                    <input
                      type="text"
                      value={settings.color_termine}
                      onChange={e => setSettings(prev => ({ ...prev, color_termine: e.target.value }))}
                      style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', textTransform: 'uppercase', flex: 1 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="admin-section" style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e293b', borderBottom: '2px solid #f1f5f9', paddingBottom: '10px', marginBottom: '20px' }}>
                ii. Version malgache des noms de statuts
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>Libellé "Nouveau"</label>
                  <input
                    type="text"
                    value={settings.label_nouveau}
                    onChange={e => setSettings(prev => ({ ...prev, label_nouveau: e.target.value }))}
                    placeholder="Ex: Vaovao"
                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    required
                  />
                </div>

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>Libellé "In progress"</label>
                  <input
                    type="text"
                    value={settings.label_inProgress}
                    onChange={e => setSettings(prev => ({ ...prev, label_inProgress: e.target.value }))}
                    placeholder="Ex: Efa manao"
                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    required
                  />
                </div>

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>Libellé "Terminé"</label>
                  <input
                    type="text"
                    value={settings.label_termine}
                    onChange={e => setSettings(prev => ({ ...prev, label_termine: e.target.value }))}
                    placeholder="Ex: Vita"
                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    required
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#2563eb', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }} disabled={saving}>
                {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;
