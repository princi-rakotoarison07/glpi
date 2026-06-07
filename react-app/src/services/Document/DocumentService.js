import api, { initSession } from '../../config/api';

/**
 * SERVICE : DocumentService
 * RÔLE    : Récupérer les documents (images) liés à un équipement GLPI.
 *
 * Utilise la même instance api (Axios + proxy Vite) que tous les autres services.
 * Les images sont téléchargées comme Blob et converties en URL locale (createObjectURL),
 * ce qui évite tout problème de CORS ou de session.
 *
 * Flux API GLPI :
 *   1. GET /{itemType}/{id}/Document_Item  → liste des liaisons
 *   2. GET /Document/{documentId}          → métadonnées (name, filename, mime)
 *   3. GET /Document/{documentId}/download → téléchargement du fichier (blob)
 */

const DocumentService = {

  /**
   * Récupère tous les documents liés à un équipement.
   * @param {string|number} itemId
   * @param {string}        itemType — 'Computer', 'Monitor', etc.
   * @returns {Array<{ id, name, filename, mime, url, isImage }>}
   */
  getDocumentsForItem: async (itemId, itemType = 'Computer') => {
    await initSession();

    // 1. Récupérer les liaisons Document_Item
    let linkItems = [];
    try {
      const resp = await api.get(`/${itemType}/${itemId}/Document_Item`, {
        params: { range: '0-100' },
      });
      linkItems = Array.isArray(resp.data) ? resp.data : [];
    } catch (e) {
      console.warn(`Aucun document pour ${itemType} ID=${itemId}:`, e.message);
      return [];
    }

    if (linkItems.length === 0) return [];

    // 2. Pour chaque lien, récupérer les métadonnées + télécharger le blob
    const documents = await Promise.all(
      linkItems.map(async (link) => {
        const docId = link.documents_id || link.id;
        try {
          // Métadonnées du document
          const docResp = await api.get(`/Document/${docId}`);
          const doc = docResp.data;

          const mime     = doc.mime || 'image/jpeg';
          const filename = doc.filename || '';
          const isImage  = mime.startsWith('image/') ||
                           /\.(jpg|jpeg|png|gif|webp)$/i.test(filename);

          if (!isImage) return null; // on ignore les non-images

          // 3. Télécharger le fichier comme Blob via la même instance api
          // GLPI expose le téléchargement via GET /Document/{id} avec header Accept: image/*
          const blobResp = await api.get(`/Document/${docId}`, {
            headers: { Accept: mime },
            params:  { alt: 'media' },   // certaines versions GLPI acceptent ce paramètre
            responseType: 'blob',
          });

          const blobUrl = URL.createObjectURL(blobResp.data);

          return {
            id: docId,
            name: doc.name || filename || `Document ${docId}`,
            filename,
            mime,
            url: blobUrl,
            isImage: true,
          };
        } catch (e) {
          console.warn(`Impossible de charger Document ID=${docId}:`, e.message);
          return null;
        }
      })
    );

    return documents.filter(Boolean);
  },
};

export default DocumentService;
