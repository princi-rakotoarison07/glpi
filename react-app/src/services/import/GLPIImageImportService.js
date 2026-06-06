import api from '../../config/api';
import JSZip from 'jszip';
import GLPIImportHelpers from './GLPIImportHelpers';

const GLPIImageImportService = {
  /**
   * Extrait les images d'un fichier ZIP
   * Ignore les dossiers et prend toutes les images (png/jpg/jpeg)
   * Retourne un objet { [nom_equipement]: File }
   */
  extractImagesFromZip: async (zipFile) => {
    const zip = new JSZip();
    const contents = await zip.loadAsync(zipFile);
    const images = {};

    for (const [filename, file] of Object.entries(contents.files)) {
      if (!file.dir && (filename.toLowerCase().endsWith('.png') || filename.toLowerCase().endsWith('.jpg') || filename.toLowerCase().endsWith('.jpeg'))) {
        const basename = filename.split('/').pop().replace(/\.(png|jpg|jpeg)$/i, '');
        const blob = await file.async('blob');
        const mimeType = filename.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';
        const imageFile = new File([blob], filename, { type: mimeType });
        images[basename] = imageFile;
      }
    }

    console.log('📦 Images extraites du ZIP:', Object.keys(images));
    return images;
  },

  /**
   * Upload une image et la lie à un équipement dans GLPI
   */
  uploadItemImage: async (itemId, itemType, imageFile, documentName) => {
    try {
      const formData = new FormData();
      
      // En GLPI, pour uploader un document via l'API REST, 
      // on utilise un champ uploadManifest avec les données JSON et on attache le fichier
      const manifest = {
        input: {
          name: documentName,
          itemtype: itemType,
          items_id: itemId,
          _filename: [imageFile.name]
        }
      };
      
      formData.append('uploadManifest', JSON.stringify(manifest));
      formData.append('filename[0]', imageFile);

      const response = await api.post('/Document', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Erreur uploadItemImage:', documentName, error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Importe toutes les images d'un ZIP et les lie aux équipements par nom
   */
  importImages: async (zipFile, onProgress = null) => {
    const images = await GLPIImageImportService.extractImagesFromZip(zipFile);
    const results = { success: 0, errors: 0, details: [] };
    const itemNames = Object.keys(images);
    const total = itemNames.length;
    let processed = 0;

    for (const itemName of itemNames) {
      try {
        const itemData = await GLPIImportHelpers.resolveItem(itemName);
        
        if (!itemData) {
          results.errors++;
          results.details.push({
            name: itemName,
            status: 'error',
            message: `Équipement introuvable pour l'image`
          });
        } else {
          await GLPIImageImportService.uploadItemImage(itemData.id, itemData.type, images[itemName], itemName);
          results.success++;
          results.details.push({
            name: itemName,
            status: 'success',
            message: `Image importée et liée avec succès à l'équipement (${itemData.type})`
          });
        }
      } catch (error) {
        results.errors++;
        results.details.push({
          name: itemName,
          status: 'error',
          message: error.message || 'Erreur lors de l\'importation de l\'image'
        });
      }
      processed++;
      if (onProgress) {
        onProgress(Math.round((processed / total) * 100));
      }
    }

    return results;
  }
};

export default GLPIImageImportService;
