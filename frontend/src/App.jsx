// Importe useEffect pour charger les données au démarrage de la page.
import { useEffect } from 'react'

// Importe useState pour stocker les données et les changements dans l'interface.
import { useState } from 'react'

// Importe le fichier CSS de l'application.
import './App.css'

// Déclare le composant principal de l'application.
function App() {
  // Crée une variable pour stocker toutes les données venant du fichier JSON.
  const [mailData, setMailData] = useState(null)

  // Crée une variable pour stocker le texte tapé dans la barre de recherche.
  const [searchTerm, setSearchTerm] = useState('')

  // Crée une variable pour savoir si les données sont encore en chargement.
  const [loading, setLoading] = useState(true)

  // Crée une variable pour stocker un message d'erreur si le chargement échoue.
  const [error, setError] = useState('')

  // Lance automatiquement le chargement des mails quand la page s'ouvre.
  useEffect(() => {
    // Crée une fonction asynchrone pour charger les données du fichier JSON.
    async function loadMails() {
      // Essaie d'exécuter le chargement des données.
      try {
        // Demande au navigateur de récupérer le fichier JSON dans le dossier public.
        const response = await fetch('/data/mails-today.json')

        // Vérifie si le fichier a bien été trouvé.
        if (!response.ok) {
          // Lance une erreur si le fichier JSON n'est pas disponible.
          throw new Error('Impossible de charger le fichier des e-mails.')
        }

        // Convertit la réponse reçue en données JavaScript utilisables.
        const data = await response.json()

        // Enregistre les données reçues dans la variable mailData.
        setMailData(data)

        // Vide le message d'erreur parce que le chargement a réussi.
        setError('')
      } catch (problem) {
        // Affiche l'erreur dans la console du navigateur pour aider au diagnostic.
        console.error(problem)

        // Enregistre un message simple pour l'utilisateur.
        setError('Les e-mails ne peuvent pas être chargés pour le moment.')
      } finally {
        // Indique que le chargement est terminé, avec ou sans erreur.
        setLoading(false)
      }
    }

    // Appelle la fonction qui charge les mails.
    loadMails()
  }, [])

  // Récupère la liste des mails si les données existent, sinon utilise une liste vide.
  const mails = mailData?.mails || []

  // Filtre les mails selon le texte écrit dans la barre de recherche.
  const filteredMails = mails.filter((mail) => {
    // Transforme le texte recherché en minuscules pour faciliter la comparaison.
    const search = searchTerm.toLowerCase()

    // Vérifie si l'expéditeur contient le texte recherché.
    const senderMatch = mail.expediteur.toLowerCase().includes(search)

    // Vérifie si l'objet contient le texte recherché.
    const subjectMatch = mail.objet.toLowerCase().includes(search)

    // Vérifie si le résumé contient le texte recherché.
    const summaryMatch = mail.resume.toLowerCase().includes(search)

    // Garde le mail si une des trois vérifications est vraie.
    return senderMatch || subjectMatch || summaryMatch
  })

  // Retourne toute l'interface visible dans le navigateur.
  return (
    // Conteneur principal de la page.
    <main className="app">
      {/* Section principale de présentation. */}
      <section className="hero">
        {/* Bloc contenant le texte principal. */}
        <div className="hero-content">
          {/* Badge qui indique le contexte technique du projet. */}
          <p className="badge">Projet de stage • React + n8n + OpenAI</p>

          {/* Grand titre de l'application. */}
          <h1>Assistant intelligent des e-mails du jour</h1>

          {/* Description claire du rôle de l'application. */}
          <p className="hero-description">
            Consultez vos e-mails reçus aujourd’hui, obtenez un résumé automatique et préparez vos réponses facilement depuis une interface moderne.
          </p>

          {/* Zone contenant les deux boutons principaux. */}
          <div className="hero-actions">
            {/* Bouton qui servira plus tard à actualiser les mails depuis n8n. */}
            <button className="primary-button">Actualiser les e-mails</button>

            {/* Bouton qui servira plus tard à générer un résumé avec OpenAI. */}
            <button className="secondary-button">Générer un résumé IA</button>
          </div>
        </div>

        {/* Carte d'aperçu rapide des informations du jour. */}
        <div className="hero-card">
          {/* Titre de la carte d'aperçu. */}
          <h2>Aperçu du jour</h2>

          {/* Ligne qui affiche le nombre total de mails. */}
          <div className="stat-line">
            {/* Texte de la statistique. */}
            <span>E-mails reçus</span>

            {/* Valeur de la statistique. */}
            <strong>{mails.length}</strong>
          </div>

          {/* Ligne qui affiche la date des mails. */}
          <div className="stat-line">
            {/* Texte de la statistique. */}
            <span>Date</span>

            {/* Valeur de la statistique. */}
            <strong>{mailData?.date || 'Non chargée'}</strong>
          </div>

          {/* Ligne qui affiche l'état du chargement. */}
          <div className="stat-line">
            {/* Texte de la statistique. */}
            <span>État</span>

            {/* Valeur de la statistique. */}
            <strong>{loading ? 'Chargement' : 'Prêt'}</strong>
          </div>
        </div>
      </section>

      {/* Section du résumé global. */}
      <section className="summary-section">
        {/* Carte qui contient le résumé global. */}
        <article className="card large-card">
          {/* Petit label de la carte. */}
          <p className="card-label">Résumé automatique</p>

          {/* Titre de la carte. */}
          <h2>Résumé global de la journée</h2>

          {/* Affiche un message de chargement si les données ne sont pas encore prêtes. */}
          {loading && <p>Chargement du résumé global...</p>}

          {/* Affiche un message d'erreur si le chargement a échoué. */}
          {error && <p className="error-message">{error}</p>}

          {/* Affiche le résumé global si les données sont disponibles. */}
          {!loading && !error && <p>{mailData?.resumeGlobal}</p>}
        </article>
      </section>

      {/* Section qui contient les outils et la liste des mails. */}
      <section className="mail-section">
        {/* Bloc supérieur de la liste des mails. */}
        <div className="mail-toolbar">
          {/* Bloc contenant le titre et le sous-titre. */}
          <div>
            {/* Titre de la section des mails. */}
            <h2>E-mails reçus aujourd’hui</h2>

            {/* Petit texte qui indique le nombre de mails affichés. */}
            <p>{filteredMails.length} e-mail(s) affiché(s)</p>
          </div>

          {/* Champ de recherche des mails. */}
          <input
            // Type du champ de recherche.
            type="text"

            // Texte affiché quand le champ est vide.
            placeholder="Rechercher par expéditeur, objet ou résumé..."

            // Valeur actuelle du champ.
            value={searchTerm}

            // Met à jour searchTerm quand l'utilisateur tape du texte.
            onChange={(event) => setSearchTerm(event.target.value)}

            // Classe CSS du champ de recherche.
            className="search-input"
          />
        </div>

        {/* Affiche un message si les données sont encore en chargement. */}
        {loading && <p className="info-message">Chargement des e-mails...</p>}

        {/* Affiche un message si aucun mail ne correspond à la recherche. */}
        {!loading && !error && filteredMails.length === 0 && (
          // Message visible quand aucun résultat n'est trouvé.
          <p className="info-message">Aucun e-mail ne correspond à votre recherche.</p>
        )}

        {/* Grille contenant les cartes des mails. */}
        <div className="mail-grid">
          {/* Parcourt tous les mails filtrés pour les afficher un par un. */}
          {filteredMails.map((mail) => (
            // Carte individuelle d'un mail.
            <article className="mail-card" key={mail.id}>
              {/* En-tête de la carte du mail. */}
              <div className="mail-card-header">
                {/* Bloc contenant l'expéditeur et l'objet. */}
                <div>
                  {/* Adresse de l'expéditeur. */}
                  <p className="mail-sender">{mail.expediteur}</p>

                  {/* Objet du mail. */}
                  <h3>{mail.objet}</h3>
                </div>

                {/* Badge qui affiche le statut du mail. */}
                <span className="mail-status">{mail.statut}</span>
              </div>

              {/* Date de réception du mail. */}
              <p className="mail-date">{mail.dateReception}</p>

              {/* Résumé court du mail. */}
              <p className="mail-summary">{mail.resume}</p>

              {/* Zone contenant les boutons d'action du mail. */}
              <div className="mail-actions">
                {/* Bouton pour répondre manuellement plus tard. */}
                <button className="small-primary-button">Répondre</button>

                {/* Bouton pour générer une réponse automatique plus tard. */}
                <button className="small-secondary-button">Réponse IA</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

// Exporte le composant App pour que React puisse l'afficher.
export default App