// Importe la fonction qui permet de créer l'application React.
import { createRoot } from 'react-dom/client'

// Importe le style global de l'application.
import './index.css'

// Importe le composant principal App.
import App from './App.jsx'

// Crée l'application React dans l'élément HTML qui a l'identifiant root.
createRoot(document.getElementById('root')).render(
  // Affiche le composant principal de l'application.
  <App />
)