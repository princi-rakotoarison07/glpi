import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, LogIn } from 'lucide-react';
import { toast } from 'react-toastify';
import AuthService from '../../services/AuthService';
import '../../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('glpi');
  const [password, setPassword] = useState('glpi');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Utilisation du service Auth pour vérifier l'accès via l'API GLPI
      const user = await AuthService.login(username, password);
      
      if (user) {
        toast.success(`Bienvenue ${user.realname || user.name} !`);
        console.log('Login successful, navigating...');
        // Redirection vers le dashboard ou la page d'accueil
        window.location.href = '/';
      }
    } catch (err) {
      console.error('Login error:', err);
      // Affichage de la "vraie" notification d'erreur en toast
      toast.error(err.message || 'Identifiant ou mot de passe incorrect.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            GLPI
          </div>
          <h1>Bienvenue</h1>
          <p>Connectez-vous à votre interface GLPI</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-group">
            <label htmlFor="username">Identifiant</label>
            <div className="login-input-wrapper">
              <User className="login-icon" size={20} />
              <input
                type="text"
                id="username"
                placeholder="votre identifiant"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="login-group">
            <label htmlFor="password">Mot de passe</label>
            <div className="login-input-wrapper">
              <Lock className="login-icon" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Se souvenir de moi</span>
            </label>
            <a href="#" className="forgot-password">Mot de passe oublié ?</a>
          </div>

          <button type="submit" className="login-submit-btn" disabled={isLoading}>
            {isLoading ? (
              'Connexion en cours...'
            ) : (
              <>
                <LogIn size={20} />
                Se connecter
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>© 2026 GLPI React App</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
