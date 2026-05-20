// Importe le fichier CSS lié au composant App.
import './App.css'

// Déclare le composant principal de notre application.
function App() {
  // Retourne toute l'interface visible dans le navigateur.
  return (
    // Conteneur principal de toute la page.
    <main className="app">
      {/* Section principale qui contient l'accueil de l'application. */}
      <section className="hero">
        {/* Bloc de texte situé à gauche ou en haut selon l'écran. */}
        <div className="hero-content">
          {/* Petit badge qui présente le contexte du projet. */}
          <p className="badge">Projet de stage • React + n8n + OpenAI</p>

          {/* Titre principal de l'application. */}
          <h1>Assistant intelligent des e-mails du jour</h1>

          {/* Description simple du rôle de l'application. */}
          <p className="hero-description">
            Consultez vos e-mails reçus aujourd’hui, obtenez un résumé automatique et préparez vos réponses facilement depuis une interface moderne.
          </p>

          {/* Zone contenant les boutons principaux. */}
          <div className="hero-actions">
            {/* Bouton principal de consultation des mails. */}
            <button className="primary-button">Voir les e-mails</button>

            {/* Bouton secondaire de génération de résumé. */}
            <button className="secondary-button">Résumé IA</button>
          </div>
        </div>

        {/* Carte visuelle située à droite ou en dessous selon l'écran. */}
        <div className="hero-card">
          {/* Titre de la carte visuelle. */}
          <h2>Aperçu du jour</h2>

          {/* Ligne affichant une statistique temporaire. */}
          <div className="stat-line">
            {/* Libellé de la statistique. */}
            <span>E-mails reçus</span>

            {/* Valeur temporaire avant la connexion réelle. */}
            <strong>0</strong>
          </div>

          {/* Ligne affichant l'état du résumé IA. */}
          <div className="stat-line">
            {/* Libellé de la fonctionnalité. */}
            <span>Résumé IA</span>

            {/* Statut temporaire de la fonctionnalité. */}
            <strong>En attente</strong>
          </div>

          {/* Ligne affichant l'état de n8n. */}
          <div className="stat-line">
            {/* Libellé de la connexion n8n. */}
            <span>Connexion n8n</span>

            {/* Statut temporaire de la connexion. */}
            <strong>Bientôt</strong>
          </div>
        </div>
      </section>

      {/* Tableau de bord principal de l'application. */}
      <section className="dashboard">
        {/* Carte dédiée au résumé global des e-mails. */}
        <article className="card large-card">
          {/* Petit texte de catégorie. */}
          <p className="card-label">Résumé automatique</p>

          {/* Titre de la carte. */}
          <h2>Résumé global de la journée</h2>

          {/* Texte temporaire avant la connexion avec OpenAI. */}
          <p>
            Le résumé généré par OpenAI apparaîtra ici après la récupération des e-mails par n8n.
          </p>
        </article>

        {/* Carte dédiée à la liste des e-mails. */}
        <article className="card">
          {/* Petit texte de catégorie. */}
          <p className="card-label">Boîte mail</p>

          {/* Titre de la carte. */}
          <h2>E-mails reçus aujourd’hui</h2>

          {/* Texte temporaire avant l'ajout des données. */}
          <p>
            La liste des e-mails sera affichée ici sous forme de tableau ou de cartes.
          </p>
        </article>

        {/* Carte dédiée aux réponses. */}
        <article className="card">
          {/* Petit texte de catégorie. */}
          <p className="card-label">Réponses</p>

          {/* Titre de la carte. */}
          <h2>Répondre rapidement</h2>

          {/* Texte temporaire avant l'ajout de la réponse manuelle et automatique. */}
          <p>
            Vous pourrez rédiger une réponse manuelle ou demander une proposition générée par l’IA.
          </p>
        </article>

        {/* Carte dédiée à l'état d'avancement. */}
        <article className="card">
          {/* Petit texte de catégorie. */}
          <p className="card-label">Avancement</p>

          {/* Titre de la carte. */}
          <h2>Statut du projet</h2>

          {/* Texte indiquant l'étape actuelle. */}
          <p>
            L’interface React est en cours de construction avant la connexion avec n8n, Gmail et OpenAI.
          </p>
        </article>
      </section>
    </main>
  )
}

// Exporte le composant App pour qu'il soit utilisé dans le fichier main.jsx.
export default App