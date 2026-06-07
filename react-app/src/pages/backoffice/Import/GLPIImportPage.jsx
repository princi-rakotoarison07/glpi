import React, { useState } from 'react';
import GLPIImportServiceFast from '../../../services/import/GLPIImportServiceFast';
import GLPIImageImportService from '../../../services/import/GLPIImageImportService';
import { Package, Eye, ShoppingCart, CheckCircle2, AlertCircle, Terminal, Upload, Image as ImageIcon } from 'lucide-react';
import '../../../styles/pages/TicketList.css'; // On va utiliser un style proche ou générique
// Assurez-vous d'avoir form.css ou import.css importé si nécessaire. On se base sur les styles existants.

/**
 * COMPOSANT : FileField
 */
const FileField = ({ label, icon: Icon, file, count, onChange, accept = ".csv", isImporting }) => (
  <div className="import-field">
    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '8px' }}>
      <Icon size={18} />
      {label}
    </label>
    <div className="file-input-wrapper" style={{ position: 'relative', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', background: '#fff' }}>
      <input 
        type="file" 
        accept={accept} 
        onChange={onChange} 
        disabled={isImporting} 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
      />
      <div className="file-info-text" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {file ? (
          <>
            <CheckCircle2 size={24} color="#16a34a" />
            <span className="file-name" style={{ fontWeight: 600 }}>{file.name}</span>
            {count !== undefined && <span className="file-meta" style={{ marginLeft: 'auto', color: '#64748b' }}>{count} lignes détectées</span>}
          </>
        ) : (
          <>
            <Upload size={24} color="#64748b" />
            <span style={{ fontWeight: '600', color: '#64748b' }}>Choisir un fichier</span>
          </>
        )}
      </div>
    </div>
  </div>
);

const GLPIImportPage = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [fileImages, setFileImages] = useState(null);

  const [preview1, setPreview1] = useState({ headers: [], rows: [] });
  const [preview2, setPreview2] = useState({ headers: [], rows: [] });
  const [preview3, setPreview3] = useState({ headers: [], rows: [] });

  const [isImporting, setIsImporting] = useState(false);
  const [results, setResults] = useState({ success: 0, errors: 0, details: [] });
  const [progress, setProgress] = useState(0);
  const [validationErrors, setValidationErrors] = useState([]);
  const [messages, setMessages] = useState([]);

  const addMessage = (msg, type = 'info') => {
    setMessages((prev) => [...prev, { msg, type, timestamp: new Date().toLocaleTimeString() }]);
  };

  // Parser simple pour CSV (gestion basique des guillemets)
  const parseCSV = (text) => {
    const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length === 0) return { headers: [], rows: [] };
    
    // Une fonction très basique pour parser une ligne CSV
    const parseLine = (line) => {
      const result = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current);
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current);
      return result;
    };

    const headers = parseLine(lines[0]);
    const rows = lines.slice(1).map(parseLine);
    return { headers, rows };
  };

  const readAndParseCsv = (selectedFile, setPreviewState, validationFunction, errorPrefix) => {
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const parsed = parseCSV(text);
      setPreviewState(parsed);
      setResults({ success: 0, errors: 0, details: [] });
      setProgress(0);

      if (parsed.rows.length > 0) {
        const validation = validationFunction(parsed);
        setValidationErrors(prev => [...prev.filter(err => !err.startsWith(errorPrefix)), ...validation.errors.map(e => `${errorPrefix} ${e}`)]);
      }
    };
    reader.readAsText(selectedFile);
  };

  const handleFile1Change = (e) => {
    if (!e.target.files[0]) return;
    setFile1(e.target.files[0]);
    readAndParseCsv(e.target.files[0], setPreview1, GLPIImportServiceFast.validateItemFile, 'Fichier 1 (Équipements):');
  };

  const handleFile2Change = (e) => {
    if (!e.target.files[0]) return;
    setFile2(e.target.files[0]);
    readAndParseCsv(e.target.files[0], setPreview2, GLPIImportServiceFast.validateTicketFile, 'Fichier 2 (Tickets):');
  };

  const handleFile3Change = (e) => {
    if (!e.target.files[0]) return;
    setFile3(e.target.files[0]);
    readAndParseCsv(e.target.files[0], setPreview3, GLPIImportServiceFast.validateCostFile, 'Fichier 3 (Coûts):');
  };

  const handleFileImagesChange = (e) => {
    if (!e.target.files[0]) return;
    setFileImages(e.target.files[0]);
  };

  const handleImport = async () => {
    if (preview1.rows.length === 0 && preview2.rows.length === 0 && preview3.rows.length === 0 && !fileImages) return;
    if (validationErrors.length > 0) return;

    setIsImporting(true);
    setResults({ success: 0, errors: 0, details: [] });
    setMessages([]);
    addMessage("Initialisation de l'importation GLPI...", 'info');

    const newResults = { success: 0, errors: 0, details: [] };
    const totalRows = preview1.rows.length + preview2.rows.length + preview3.rows.length;
    let processed = 0;
    
    // Mapping pour lier Ref_Ticket (CSV) à l'ID GLPI réel
    const ticketMap = {};

    try {
      // 1. Équipements (Feuille 1)
      if (preview1.rows.length > 0) addMessage("Importation des équipements...", 'info');
      for (let i = 0; i < preview1.rows.length; i++) {
        const row = preview1.rows[i];
        try {
          const res = await GLPIImportServiceFast.importItemRow(row);
          // row[4] correspond à l'Item_Type dans le CSV s'il est à l'index 4
          // Modifions le message pour qu'il soit dynamique
          const itemType = (row[4] && row[4].trim()) ? row[4].trim() : 'Computer';
          newResults.success++;
          addMessage(`${itemType} '${row[0]}' importé.`, 'success');
        } catch (error) {
          newResults.errors++;
          newResults.details.push({ row: i + 2, status: 'error', name: row[0], message: error.message });
        }
        processed++; setProgress(Math.round((processed / totalRows) * 100));
      }

      // 2. Tickets (Feuille 2)
      if (preview2.rows.length > 0) addMessage("Importation des tickets...", 'info');
      for (let i = 0; i < preview2.rows.length; i++) {
        const row = preview2.rows[i];
        const refTicket = row[0];
        try {
          const res = await GLPIImportServiceFast.importTicketRow(row);
          ticketMap[refTicket] = res.id; // Sauvegarde de l'ID réel
          newResults.success++;
          addMessage(`Ticket '${row[4]}' importé (GLPI ID: ${res.id}).`, 'success');
        } catch (error) {
          newResults.errors++;
          newResults.details.push({ row: preview1.rows.length + i + 2, status: 'error', name: row[4], message: error.message });
        }
        processed++; setProgress(Math.round((processed / totalRows) * 100));
      }

      // 3. Coûts (Feuille 3)
      if (preview3.rows.length > 0) addMessage("Importation des coûts...", 'info');
      for (let i = 0; i < preview3.rows.length; i++) {
        const row = preview3.rows[i];
        try {
          await GLPIImportServiceFast.importCostRow(row, ticketMap);
          newResults.success++;
          addMessage(`Coût pour le ticket réf '${row[0]}' importé.`, 'success');
        } catch (error) {
          newResults.errors++;
          newResults.details.push({ row: preview1.rows.length + preview2.rows.length + i + 2, status: 'error', name: `Ticket ${row[0]}`, message: error.message });
        }
        processed++; setProgress(Math.round((processed / totalRows) * 100));
      }

      // 4. Images (ZIP)
      if (fileImages) {
        addMessage("Extraction et importation des images...", 'info');
        try {
          const imageResults = await GLPIImageImportService.importImages(fileImages, (prog) => {
            // onProgress update (optionnel)
          });
          newResults.success += imageResults.success;
          newResults.errors += imageResults.errors;
          newResults.details.push(...imageResults.details);
          
          imageResults.details.forEach(detail => {
            if (detail.status === 'success') {
              addMessage(`Image importée : ${detail.message}`, 'success');
            }
          });
        } catch (error) {
          addMessage(`Erreur lors de l'import des images: ${error.message}`, 'error');
        }
      }

    } catch (err) {
      addMessage(`Erreur critique: ${err.message}`, 'error');
    }

    setIsImporting(false);
    setProgress(100);
    setResults({ ...newResults });
    addMessage('Processus d\'importation terminé.', 'info');
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
        <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>Import GLPI (CSV)</h1>
          <p style={{ color: '#64748b', marginTop: '8px' }}>Importez vos ordinateurs, tickets et coûts dans l'ordre chronologique.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <FileField label="1. Équipements (Feuille 1)" icon={Package} file={file1} count={preview1.rows.length} onChange={handleFile1Change} isImporting={isImporting} />
          <FileField label="2. Tickets (Feuille 2)" icon={Eye} file={file2} count={preview2.rows.length} onChange={handleFile2Change} isImporting={isImporting} />
          <FileField label="3. Coûts (Feuille 3)" icon={ShoppingCart} file={file3} count={preview3.rows.length} onChange={handleFile3Change} isImporting={isImporting} />
          <FileField label="4. Images (.zip)" icon={ImageIcon} file={fileImages} onChange={handleFileImagesChange} accept=".zip" isImporting={isImporting} />
        </div>

        {validationErrors.length > 0 && !isImporting && (
          <div style={{ marginTop: '24px', padding: '16px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px' }}>
            <h3 style={{ color: '#991b1b', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={20} />
              Erreurs de validation ({validationErrors.length})
            </h3>
            <ul style={{ margin: 0, paddingLeft: '24px', color: '#b91c1c', fontSize: '14px', maxHeight: '150px', overflowY: 'auto' }}>
              {validationErrors.map((err, i) => <li key={i} style={{ marginBottom: '4px' }}>{err}</li>)}
            </ul>
          </div>
        )}

        {isImporting && (
          <div style={{ marginTop: '24px', background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontWeight: 'bold', color: '#334155' }}>
              <span>Importation en cours...</span>
              <span>{progress}%</span>
            </div>
            <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: '#2563eb', width: `${progress}%`, transition: 'width 0.3s' }}></div>
            </div>
          </div>
        )}

        {results.details.length > 0 && !isImporting && (
          <div style={{ marginTop: '24px', border: `1px solid ${results.errors > 0 ? '#fca5a5' : '#bbf7d0'}`, borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '16px', background: results.errors > 0 ? '#fef2f2' : '#f0fdf4', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: results.errors > 0 ? '#991b1b' : '#166534', fontWeight: 'bold' }}>
                Rapport : {results.success} succès — {results.errors} erreurs
              </span>
            </div>
            {results.errors > 0 && (
              <div style={{ padding: '16px', background: '#fff', maxHeight: '200px', overflowY: 'auto' }}>
                {results.details.filter(d => d.status === 'error').map((err, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', paddingBottom: '12px', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', fontSize: '14px' }}>
                    <AlertCircle size={16} color="#dc2626" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ color: '#1e293b' }}>Ligne {err.row} {err.name ? `(${err.name})` : ''}</strong>
                      <div style={{ color: '#64748b', marginTop: '4px' }}>{err.message}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {(file1 || file2 || file3 || fileImages) && !isImporting && (
          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              onClick={handleImport}
              disabled={validationErrors.length > 0}
              style={{
                background: validationErrors.length > 0 ? '#94a3b8' : '#2563eb',
                color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px',
                fontWeight: 'bold', cursor: validationErrors.length > 0 ? 'not-allowed' : 'pointer'
              }}
            >
              Démarrer l'import
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: '24px', background: '#1e293b', borderRadius: '12px', padding: '24px', color: '#f1f5f9', fontFamily: 'monospace' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 16px 0', color: '#94a3b8', fontSize: '16px' }}>
          <Terminal size={20} /> Journal Technique
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto' }}>
          {messages.map((msg, index) => (
            <div key={index} style={{ color: msg.type === 'error' ? '#fca5a5' : msg.type === 'success' ? '#86efac' : '#93c5fd' }}>
              <span style={{ color: '#64748b' }}>[{msg.timestamp}]</span> {msg.msg}
            </div>
          ))}
          {messages.length === 0 && <div style={{ color: '#475569' }}>En attente d'actions...</div>}
        </div>
      </div>
    </div>
  );
};

export default GLPIImportPage;
