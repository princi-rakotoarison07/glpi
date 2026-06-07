import React, { useState, useRef } from 'react';
import GLPIImportServiceV2 from '../../../services/import/GLPIImageImportServiceV2';
import {
  Package, Eye, ShoppingCart, Image as ImageIcon,
  Upload, CheckCircle2, AlertCircle, Terminal,
  ShieldCheck, RotateCcw, X,
} from 'lucide-react';

// ─── CSV Parser ──────────────────────────────────────────────────────────────
const parseCSV = (text) => {
  const lines = text.split(/\r?\n/).filter((l) => l.trim() !== '');
  if (!lines.length) return { headers: [], rows: [] };
  const parseLine = (line) => {
    const result = []; let cur = ''; let inQ = false;
    for (const ch of line) {
      if (ch === '"') { inQ = !inQ; }
      else if (ch === ',' && !inQ) { result.push(cur); cur = ''; }
      else { cur += ch; }
    }
    result.push(cur);
    return result;
  };
  return { headers: parseLine(lines[0]), rows: lines.slice(1).map(parseLine) };
};

// ─── Styles ──────────────────────────────────────────────────────────────────
const S = {
  page:  { padding: '28px', maxWidth: '1100px', margin: '0 auto', fontFamily: "'Inter','Segoe UI',sans-serif" },
  card:  { background: '#fff', borderRadius: '14px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden', marginBottom: '24px' },
  hdr:   { background: 'linear-gradient(135deg,#1e3a5f,#2563eb)', padding: '24px 28px', color: '#fff' },
  h1:    { fontSize: '20px', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' },
  sub:   { fontSize: '13px', opacity: 0.8, marginTop: '4px', marginBottom: 0 },
  badge: { display:'inline-flex', alignItems:'center', gap:'5px', background:'rgba(255,255,255,0.15)',
           border:'1px solid rgba(255,255,255,0.3)', borderRadius:'20px', padding:'3px 10px',
           fontSize:'11px', fontWeight:600, marginTop:'10px' },
  body:  { padding: '24px' },
  grid:  { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' },
  field: { border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px 16px',
           background: '#f8fafc', cursor: 'pointer', transition: 'border-color 0.2s' },
  fieldOk: { border: '1px solid #bbf7d0', background: '#f0fdf4' },
  lbl:   { display:'flex', alignItems:'center', gap:'7px', fontWeight:600, fontSize:'13px', color:'#334155', marginBottom:'8px' },
  infoBox: (color, bg, border) => ({
    margin:'16px 0', padding:'13px 16px', background: bg,
    border: `1px solid ${border}`, borderRadius:'8px',
    display:'flex', gap:'10px', alignItems:'flex-start', fontSize:'13px', color,
  }),
  progressBox: { marginTop:'16px', background:'#f1f5f9', borderRadius:'8px', padding:'16px', border:'1px solid #e2e8f0' },
  terminal: { background:'#0f172a', borderRadius:'12px', padding:'20px', color:'#f1f5f9',
              fontFamily:"'Fira Code','Courier New',monospace", fontSize:'12px' },
  logC: { error:'#f87171', success:'#4ade80', warn:'#fbbf24', info:'#93c5fd' },
  btn: (disabled, danger) => ({
    display:'inline-flex', alignItems:'center', gap:'8px', padding:'11px 24px',
    borderRadius:'8px', fontWeight:700, fontSize:'14px', border:'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    background: disabled ? '#94a3b8' : danger ? '#dc2626' : 'linear-gradient(135deg,#2563eb,#1d4ed8)',
    color:'#fff',
    boxShadow: disabled ? 'none' : '0 4px 12px rgba(37,99,235,0.25)',
  }),
};

// ─── FileField ───────────────────────────────────────────────────────────────
const FileField = ({ label, icon: Icon, file, count, accept, onChange, disabled, onRemove }) => {
  const ref = useRef(null);
  return (
    <div style={{ ...S.field, ...(file ? S.fieldOk : {}) }} onClick={() => !file && ref.current?.click()}>
      <input ref={ref} type="file" accept={accept} onChange={onChange} disabled={disabled} style={{ display:'none' }} />
      <div style={S.lbl}><Icon size={15} />{label}</div>
      {file ? (
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'7px' }}>
            <CheckCircle2 size={15} color="#16a34a" />
            <span style={{ fontWeight:600, fontSize:'13px', color:'#166534' }}>{file.name}</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            {count !== undefined && <span style={{ fontSize:'12px', color:'#64748b' }}>{count} lignes</span>}
            <button onClick={(e) => { e.stopPropagation(); onRemove(); }} disabled={disabled}
              style={{ background:'none', border:'none', cursor:'pointer', color:'#94a3b8', padding:'2px' }}>
              <X size={13} />
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display:'flex', alignItems:'center', gap:'8px', color:'#94a3b8', fontSize:'13px' }}>
          <Upload size={13} /> Choisir un fichier
        </div>
      )}
    </div>
  );
};

// ─── Page principale ─────────────────────────────────────────────────────────
const GLPIImageImportPageV2 = () => {
  const [file1, setFile1]     = useState(null);
  const [file2, setFile2]     = useState(null);
  const [file3, setFile3]     = useState(null);
  const [fileZip, setFileZip] = useState(null);

  const [preview1, setPreview1] = useState({ headers:[], rows:[] });
  const [preview2, setPreview2] = useState({ headers:[], rows:[] });
  const [preview3, setPreview3] = useState({ headers:[], rows:[] });

  const [validationErrors, setValidationErrors] = useState([]);
  const [isImporting, setIsImporting]           = useState(false);
  const [isRollingBack, setIsRollingBack]       = useState(false);   // ← comme PrestaShop
  const [rollbackStatus, setRollbackStatus]     = useState('');      // ← comme PrestaShop
  const [progress, setProgress]                 = useState(0);
  const [results, setResults]                   = useState({ success:0, errors:0, details:[] });
  const [messages, setMessages]                 = useState([]);
  const logEndRef = useRef(null);

  const addMessage = (msg, type = 'info') => {
    setMessages(prev => [{ msg, type, ts: new Date().toLocaleTimeString() }, ...prev]);
  };

  // ── CSV helpers ─────────────────────────────────────────────────────────────
  const readCSV = (f, setPreview, validateFn, prefix) => {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const parsed = parseCSV(e.target.result);
      setPreview(parsed);
      setResults({ success:0, errors:0, details:[] });
      if (parsed.rows.length > 0) {
        const v = validateFn(parsed);
        setValidationErrors(prev => [
          ...prev.filter(err => !err.startsWith(prefix)),
          ...v.errors.map(er => `${prefix} ${er}`)
        ]);
      }
    };
    reader.readAsText(f);
  };

  const handleFile1  = (e) => { const f = e.target.files[0]; if (!f) return; setFile1(f);   readCSV(f, setPreview1, GLPIImportServiceV2.validateItemHeaders,   '[Équipements]'); };
  const handleFile2  = (e) => { const f = e.target.files[0]; if (!f) return; setFile2(f);   readCSV(f, setPreview2, GLPIImportServiceV2.validateTicketHeaders, '[Tickets]'); };
  const handleFile3  = (e) => { const f = e.target.files[0]; if (!f) return; setFile3(f);   readCSV(f, setPreview3, GLPIImportServiceV2.validateCostHeaders,   '[Coûts]'); };
  const handleZip    = (e) => { const f = e.target.files[0]; if (!f) return; setFileZip(f); setResults({ success:0, errors:0, details:[] }); };

  const removeFile = (setter, setPreview, emptyPrev, prefix) => () => {
    setter(null);
    if (setPreview) setPreview(emptyPrev);
    setValidationErrors(prev => prev.filter(e => !e.startsWith(prefix)));
    setResults({ success:0, errors:0, details:[] });
  };

  // ── Import — PATTERN IDENTIQUE À PRESTASHOP ─────────────────────────────────
  const handleImport = async () => {
    const hasData = preview1.rows.length || preview2.rows.length || preview3.rows.length || fileZip;
    if (!hasData || isImporting || validationErrors.length > 0) return;

    setIsImporting(true);
    setProgress(0);
    setResults({ success:0, errors:0, details:[] });
    setMessages([]);
    addMessage("Début de l'importation...", 'info');

    const newResults = { success:0, errors:0, details:[] };

    // ═══════════════════════════════════════════════════════════════════
    // ROLLBACK STACK — même pattern que ProductImport.jsx (PrestaShop)
    // Chaque ressource créée est enregistrée ici.
    // Si une ligne throw une erreur → elle remonte au catch global
    // → runRollback() supprime TOUT ce qui a été créé.
    // ═══════════════════════════════════════════════════════════════════
    const rollbackStack = [];
    const addToRollback = (type, id, itemType = null) =>
      rollbackStack.push({ type, id, itemType });

    const runRollback = async () => {
      console.warn('🚨 Erreur critique. Déclenchement du Rollback Global...');
      setIsRollingBack(true);
      addMessage('Une erreur est survenue. Nettoyage de sécurité en cours...', 'error');
      try {
        const deleted = await GLPIImportServiceV2.runRollback(
          rollbackStack,
          (msg, type) => {
            setRollbackStatus(msg);
            addMessage(msg, type || 'warn');
          }
        );
        addMessage(`Rollback terminé. ${deleted} ressource(s) supprimée(s).`, 'success');
      } catch (e) {
        addMessage('Erreur lors du nettoyage.', 'error');
      } finally {
        setIsRollingBack(false);
        setRollbackStatus('');
      }
    };

    const totalRows = preview1.rows.length + preview2.rows.length + preview3.rows.length;
    let processed = 0;
    let hasFailed = false; // ← empêche l'import images si une erreur CSV a eu lieu

    try {
      // ── Feuille 1 : Équipements ─────────────────────────────────────────
      if (preview1.rows.length > 0) addMessage('📦 Importation des équipements...', 'info');
      for (let i = 0; i < preview1.rows.length; i++) {
        const row = preview1.rows[i];
        const lineNumber = i + 2;

        // Validation ligne par ligne — comme PrestaShop
        const v = GLPIImportServiceV2.validateItemRow(row, lineNumber);
        if (!v.valid) throw new Error(`Ligne ${lineNumber} : ${v.errors.join(', ')}`);

        try {
          const res = await GLPIImportServiceV2.importItemRow(row, addToRollback);
          newResults.success++;
          newResults.details.push({ status:'success', name: res.name, message: `${res.itemType} "${res.name}" créé (ID=${res.id})` });
          addMessage(`✅ ${res.itemType} "${res.name}" importé.`, 'success');
        } catch (err) {
          hasFailed = true;
          newResults.errors++;
          newResults.details.push({ status:'error', name: row[0], row: lineNumber, message: err.message });
          throw err; // ← REMONTE AU CATCH GLOBAL → ROLLBACK (comme PrestaShop)
        }

        processed++;
        setProgress(Math.round((processed / totalRows) * 100));
        setResults({ ...newResults });
      }

      // ── Feuille 2 : Tickets ────────────────────────────────────────────
      const ticketMap = {};
      if (preview2.rows.length > 0) addMessage('🎫 Importation des tickets...', 'info');
      for (let i = 0; i < preview2.rows.length; i++) {
        const row = preview2.rows[i];
        const lineNumber = preview1.rows.length + i + 2;

        const v = GLPIImportServiceV2.validateTicketRow(row, lineNumber);
        if (!v.valid) throw new Error(`Ligne ${lineNumber} : ${v.errors.join(', ')}`);

        try {
          const res = await GLPIImportServiceV2.importTicketRow(row, addToRollback);
          ticketMap[res.refTicket] = res.id;
          newResults.success++;
          newResults.details.push({ status:'success', name: row[4], message: `Ticket "${row[4]}" créé (ID=${res.id})` });
          addMessage(`✅ Ticket "${row[4]}" importé (ID=${res.id}).`, 'success');
        } catch (err) {
          hasFailed = true;
          newResults.errors++;
          newResults.details.push({ status:'error', name: row[4], row: lineNumber, message: err.message });
          throw err; // ← REMONTE AU CATCH GLOBAL → ROLLBACK
        }

        processed++;
        setProgress(Math.round((processed / totalRows) * 100));
        setResults({ ...newResults });
      }

      // ── Feuille 3 : Coûts ──────────────────────────────────────────────
      if (preview3.rows.length > 0) addMessage('💰 Importation des coûts...', 'info');
      for (let i = 0; i < preview3.rows.length; i++) {
        const row = preview3.rows[i];
        const lineNumber = preview1.rows.length + preview2.rows.length + i + 2;

        const v = GLPIImportServiceV2.validateCostRow(row, lineNumber);
        if (!v.valid) throw new Error(`Ligne ${lineNumber} : ${v.errors.join(', ')}`);

        try {
          const res = await GLPIImportServiceV2.importCostRow(row, ticketMap, addToRollback);
          newResults.success++;
          newResults.details.push({ status:'success', name:`Coût ticket ${row[0]}`, message:`Coût pour ticket "${row[0]}" importé.` });
          addMessage(`✅ Coût pour ticket "${row[0]}" importé.`, 'success');
        } catch (err) {
          hasFailed = true;
          newResults.errors++;
          newResults.details.push({ status:'error', name:`Ticket ${row[0]}`, row: lineNumber, message: err.message });
          throw err; // ← REMONTE AU CATCH GLOBAL → ROLLBACK
        }

        processed++;
        setProgress(Math.round((processed / totalRows) * 100));
        setResults({ ...newResults });
      }

    } catch (globalError) {
      // ═══════════════════════════════════════════════════════════════════
      // CATCH GLOBAL — déclenché par chaque throw dans les boucles ci-dessus
      // Exactement comme PrestaShop ProductImport.jsx lignes 290-293
      // ═══════════════════════════════════════════════════════════════════
      addMessage(`Échec : ${globalError.message}`, 'error');
      await runRollback();
    }

    // ── Feuille 4 : Images — seulement si pas d'échec CSV (comme PrestaShop) ──
    if (fileZip && !hasFailed) {
      addMessage('🖼️ Importation des images (rollback local par image)...', 'info');
      try {
        const imgResults = await GLPIImportServiceV2.importImages(
          fileZip,
          addMessage,
          (pct) => setProgress(Math.min(99, 80 + pct * 0.2))
        );
        newResults.success      += imgResults.success;
        newResults.errors       += imgResults.errors;
        newResults.details.push(...imgResults.details);
        addMessage(`✅ Images : ${imgResults.success} succès, ${imgResults.errors} erreur(s).`, 'success');
      } catch (imgErr) {
        addMessage(`❌ Erreur images : ${imgErr.message}`, 'error');
      }
    }

    setIsImporting(false);
    setProgress(100);
    setResults({ ...newResults });
    addMessage('Processus terminé.', 'info');
  };

  const hasFiles = file1 || file2 || file3 || fileZip;
  const canImport = hasFiles && !isImporting && validationErrors.length === 0;

  return (
    <div style={S.page}>

      {/* ── Carte principale ── */}
      <div style={S.card}>
        <div style={S.hdr}>
          <h1 style={S.h1}><ShieldCheck size={22}/> Import GLPI — v2 (avec Rollback)</h1>
          <p style={S.sub}>Importez équipements, tickets, coûts et images. En cas d'erreur sur une ligne, toutes les données de la session sont automatiquement supprimées.</p>
          <div style={S.badge}><RotateCcw size={12}/> Rollback automatique activé</div>
        </div>

        <div style={S.body}>

          {/* Overlay Rollback en cours — identique à PrestaShop */}
          {isRollingBack && (
            <div style={S.infoBox('#92400e', '#fffbeb', '#fcd34d')}>
              <RotateCcw size={18} color="#d97706" style={{ flexShrink:0, marginTop:'1px' }}/>
              <div>
                <strong>Nettoyage de sécurité en cours...</strong>
                {rollbackStatus && <div style={{ marginTop:'4px', fontWeight:600 }}>{rollbackStatus}</div>}
              </div>
            </div>
          )}

          {/* Explication rollback */}
          <div style={S.infoBox('#1e40af', '#eff6ff', '#bfdbfe')}>
            <ShieldCheck size={17} color="#2563eb" style={{ flexShrink:0, marginTop:'1px' }}/>
            <div>
              <strong>Rollback identique à PrestaShop :</strong> Si une ligne est invalide ou échoue,
              l'import s'arrête immédiatement et <em>toutes</em> les ressources créées pendant cette
              session sont supprimées. Pour les images, le rollback est local (uniquement le document orphelin).
            </div>
          </div>

          {/* 4 file fields */}
          <div style={S.grid}>
            <FileField label="1. Équipements (CSV)" icon={Package}
              file={file1} count={preview1.rows.length} accept=".csv"
              onChange={handleFile1} disabled={isImporting}
              onRemove={removeFile(setFile1, setPreview1, {headers:[],rows:[]}, '[Équipements]')} />
            <FileField label="2. Tickets (CSV)" icon={Eye}
              file={file2} count={preview2.rows.length} accept=".csv"
              onChange={handleFile2} disabled={isImporting}
              onRemove={removeFile(setFile2, setPreview2, {headers:[],rows:[]}, '[Tickets]')} />
            <FileField label="3. Coûts (CSV)" icon={ShoppingCart}
              file={file3} count={preview3.rows.length} accept=".csv"
              onChange={handleFile3} disabled={isImporting}
              onRemove={removeFile(setFile3, setPreview3, {headers:[],rows:[]}, '[Coûts]')} />
            <FileField label="4. Images (.zip)" icon={ImageIcon}
              file={fileZip} accept=".zip"
              onChange={handleZip} disabled={isImporting}
              onRemove={removeFile(setFileZip, null, null, '')} />
          </div>

          {/* Erreurs de validation */}
          {validationErrors.length > 0 && !isImporting && (
            <div style={{ marginTop:'14px', padding:'13px 16px', background:'#fef2f2',
                          border:'1px solid #fca5a5', borderRadius:'8px' }}>
              <div style={{ fontWeight:700, color:'#991b1b', display:'flex', alignItems:'center', gap:'6px', marginBottom:'8px' }}>
                <AlertCircle size={15}/> {validationErrors.length} erreur(s) de validation — l'import est bloqué
              </div>
              <ul style={{ margin:0, paddingLeft:'18px', color:'#b91c1c', fontSize:'12px', maxHeight:'120px', overflowY:'auto' }}>
                {validationErrors.map((e,i) => <li key={i}>{e}</li>)}
              </ul>
            </div>
          )}

          {/* Barre de progression */}
          {isImporting && (
            <div style={S.progressBox}>
              <div style={{ display:'flex', justifyContent:'space-between', fontWeight:600, color:'#334155', marginBottom:'8px' }}>
                <span>{isRollingBack ? '⏪ Rollback en cours…' : 'Importation en cours…'}</span>
                <span>{progress}%</span>
              </div>
              <div style={{ height:'8px', background:'#e2e8f0', borderRadius:'4px', overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${progress}%`,
                              background: isRollingBack
                                ? 'linear-gradient(90deg,#f59e0b,#ef4444)'
                                : 'linear-gradient(90deg,#2563eb,#60a5fa)',
                              transition:'width 0.3s' }}/>
              </div>
            </div>
          )}

          {/* Résultats */}
          {results.details.length > 0 && !isImporting && (
            <div style={{ border:`1px solid ${results.errors>0?'#fca5a5':'#bbf7d0'}`,
                          borderRadius:'10px', overflow:'hidden', marginTop:'18px' }}>
              <div style={{ padding:'12px 18px', background: results.errors>0?'#fef2f2':'#f0fdf4',
                            display:'flex', gap:'20px', flexWrap:'wrap' }}>
                <span style={{ fontWeight:700, color:'#166534', display:'flex', alignItems:'center', gap:'5px' }}>
                  <CheckCircle2 size={15}/> {results.success} succès
                </span>
                <span style={{ fontWeight:700, color:'#991b1b', display:'flex', alignItems:'center', gap:'5px' }}>
                  <AlertCircle size={15}/> {results.errors} erreur(s)
                </span>
              </div>
              {results.errors > 0 && (
                <div style={{ maxHeight:'200px', overflowY:'auto', background:'#fff' }}>
                  {results.details.filter(d=>d.status==='error').map((d,i)=>(
                    <div key={i} style={{ display:'flex', gap:'10px', padding:'10px 18px',
                                          borderBottom:'1px solid #f1f5f9', fontSize:'13px' }}>
                      <AlertCircle size={13} color="#dc2626" style={{ flexShrink:0, marginTop:'2px' }}/>
                      <div>
                        <strong>Ligne {d.row} {d.name ? `(${d.name})` : ''}</strong>
                        <div style={{ color:'#64748b', marginTop:'2px' }}>{d.message}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Boutons — comme PrestaShop */}
          {hasFiles && !isImporting && (
            <div style={{ marginTop:'18px', display:'flex', justifyContent:'flex-end', gap:'12px' }}>
              <button onClick={() => {
                setFile1(null); setFile2(null); setFile3(null); setFileZip(null);
                setPreview1({headers:[],rows:[]}); setPreview2({headers:[],rows:[]}); setPreview3({headers:[],rows:[]});
                setResults({success:0,errors:0,details:[]}); setValidationErrors([]); setProgress(0); setMessages([]);
              }} style={S.btn(false, false)}>
                Tout annuler
              </button>
              <button id="btn-import-v2" onClick={handleImport} disabled={!canImport} style={S.btn(!canImport)}>
                <Upload size={15}/> Lancer l'importation
              </button>
            </div>
          )}

        </div>
      </div>

      {/* ── Terminal ── */}
      <div style={S.terminal}>
        <div style={{ display:'flex', alignItems:'center', gap:'8px', color:'#94a3b8', fontWeight:600, fontSize:'13px', marginBottom:'14px' }}>
          <Terminal size={15}/> Journal d'importation
        </div>
        <div style={{ maxHeight:'260px', overflowY:'auto', display:'flex', flexDirection:'column', gap:'2px' }}>
          {messages.length === 0
            ? <span style={{ color:'#475569' }}>En attente d'actions…</span>
            : messages.map((l,i) => (
                <div key={i} style={{ color: S.logC[l.type] || '#93c5fd', lineHeight:'1.6' }}>
                  <span style={{ color:'#475569' }}>[{l.ts}]</span> {l.msg}
                </div>
              ))
          }
          <div ref={logEndRef}/>
        </div>
      </div>

    </div>
  );
};

export default GLPIImageImportPageV2;
