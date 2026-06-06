import React from 'react';
import { Link } from 'react-router-dom';
import FrontOfficeLayout from '../../layouts/FrontOfficeLayout';
import '../../styles/FrontOffice.css';

const Accueil = () => {
  return (
    <FrontOfficeLayout>
      <div className="frontoffice-page">
        <h1>Bienvenue sur le FrontOffice GLPI</h1>
        <p>Explorez et recherchez dans le parc informatique</p>
        <Link to="/frontoffice/elements" className="btn-elements">Voir les éléments du parc</Link>
      </div>
    </FrontOfficeLayout>
  );
};

export default Accueil;
