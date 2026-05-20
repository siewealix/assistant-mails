// Importe useEffect pour charger les données au démarrage de la page.
import { useEffect } from 'react'

// Importe useState pour gérer les données qui changent dans l'interface.
import { useState } from 'react'

// Importe le fichier CSS de l'application.
import './App.css'

// Déclare le composant principal de l'application.
function App() {
  // Crée une variable pour stocker les données des e-mails.
  const [mailData, setMailData] = useState(null)

  // Crée une variable pour stocker le texte recherché par l'utilisateur.
  const [searchTerm, setSearchTerm] = useState('')

  // Crée une variable pour savoir si les données sont en chargement.
  const [loading, setLoading] = useState(true)

  // Crée une variable pour stocker un message d'erreur.
  const [error, setError] = useState('')

  // Crée une variable pour stocker l'identifiant du mail sélectionné.
  const [selectedMailId, setSelectedMailId] = useState(null)

  // Crée une variable pour stocker le texte de la réponse écrite par l'utilisateur.
  const [replyText, setReplyText] = useState('')

  // Crée une variable pour afficher un message après la préparation de la réponse.
  const [replyStatus, setReplyStatus] = useState('')

  // Lance le chargement des e-mails quand la page s'ouvre.
  useEffect(() => {
    // Crée une fonction pour charger les données depuis le fichier JSON.
    async function loadMails() {
      // Essaie de charger les données.
      try {
        // Récupère le fichier JSON placé dans le dossier public.
        const response = await fetch('/data/mails-today.json')

        // Vérifie si la récupération du fichier a échoué.
        if (!response.ok) {
          // Arrête le chargement et signale une erreur.
          throw new Error('Impossible de charger le fichier des e-mails.')
        }

        // Convertit le contenu du fichier JSON en objet JavaScript.
        const data = await response.json()

        // Enregistre les données dans l'état de l'application.
        setMailData(data)

        // Vide l'éventuel message d'erreur.
        setError('')
      } catch (problem) {
        // Affiche l'erreur dans la console du navigateur.
        console.error(problem)

        // Affiche un message simple à l'utilisateur.
        setError('Les e-mails ne peuvent pas être chargés pour le moment.')
      } finally {
        // Indique que le chargement est terminé.
        setLoading(false)
      }
    }

    // Appelle la fonction de chargement.
    loadMails()
  }, [])

  // Récupère la liste des e-mails si elle existe, sinon utilise une liste vide.
  const mails = mailData?.mails || []

  // Recherche le mail actuellement sélectionné par l'utilisateur.
  const selectedMail = mails.find((mail) => mail.id === selectedMailId)

  // Filtre les e-mails selon la recherche de l'utilisateur.
  const filteredMails = mails.filter((mail) => {
    // Transforme la recherche en minuscules.
    const search = searchTerm.toLowerCase()

    // Vérifie si l'expéditeur contient le texte recherché.
    const senderMatch = mail.expediteur.toLowerCase().includes(search)

    // Vérifie si l'objet contient le texte recherché.
    const subjectMatch = mail.objet.toLowerCase().includes(search)

    // Vérifie si le résumé contient le texte recherché.
    const summaryMatch = mail.resume.toLowerCase().includes(search)

    // Garde le mail si une condition est vraie.
    return senderMatch || subjectMatch || summaryMatch
  })

  // Ouvre la zone de réponse pour un mail précis.
  function handleOpenReply(mail) {
    // Enregistre l'identifiant du mail sélectionné.
    setSelectedMailId(mail.id)

    // Vide l'ancien texte de réponse.
    setReplyText('')

    // Vide l'ancien message de statut.
    setReplyStatus('')
  }

  // Prépare la réponse manuelle écrite par l'utilisateur.
  function handleSendReply() {
    // Vérifie si aucun mail n'est sélectionné.
    if (!selectedMail) {
      // Arrête la fonction si aucun mail n'est sélectionné.
      return
    }

    // Vérifie si le champ de réponse est vide.
    if (replyText.trim() === '') {
      // Affiche un message si l'utilisateur n'a rien écrit.
      setReplyStatus('Veuillez écrire une réponse avant de continuer.')

      // Arrête la fonction.
      return
    }

    // Affiche la réponse dans la console pour vérifier le contenu.
    console.log({
      destinataire: selectedMail.expediteur,
      objet: `Re: ${selectedMail.objet}`,
      message: replyText,
    })

    // Affiche un message de succès temporaire.
    setReplyStatus('Réponse préparée avec succès. Elle sera envoyée avec n8n dans la prochaine étape.')
  }

  // Retourne l'interface visible de l'application.
  return (
    // Conteneur principal de l'application.
    <main className="app">
      {/* Section principale de présentation. */}
      <section className="hero">
        {/* Bloc du texte principal. */}
        <div className="hero-content">
          {/* Badge de présentation du projet. */}
          <p className="badge">Projet de stage • React + n8n + OpenAI</p>

          {/* Titre principal de l'application. */}
          <h1>Assistant intelligent des e-mails du jour</h1>

          {/* Description de l'application. */}
          <p className="hero-description">
            Consultez vos e-mails reçus aujourd’hui, obtenez un résumé automatique et préparez vos réponses facilement depuis une interface moderne.
          </p>

          {/* Zone des boutons principaux. */}
          <div className="hero-actions">
            {/* Bouton prévu plus tard pour actualiser les données depuis n8n. */}
            <button className="primary-button">Actualiser les e-mails</button>

            {/* Bouton prévu plus tard pour générer un résumé avec l'IA. */}
            <button className="secondary-button">Générer un résumé IA</button>
          </div>
        </div>

        {/* Carte d'aperçu rapide. */}
        <div className="hero-card">
          {/* Titre de la carte d'aperçu. */}
          <h2>Aperçu du jour</h2>

          {/* Ligne du nombre d'e-mails. */}
          <div className="stat-line">
            {/* Libellé de la statistique. */}
            <span>E-mails reçus</span>

            {/* Nombre total d'e-mails. */}
            <strong>{mails.length}</strong>
          </div>

          {/* Ligne de la date. */}
          <div className="stat-line">
            {/* Libellé de la date. */}
            <span>Date</span>

            {/* Date des e-mails. */}
            <strong>{mailData?.date || 'Non chargée'}</strong>
          </div>

          {/* Ligne de l'état de chargement. */}
          <div className="stat-line">
            {/* Libellé de l'état. */}
            <span>État</span>

            {/* Valeur de l'état. */}
            <strong>{loading ? 'Chargement' : 'Prêt'}</strong>
          </div>
        </div>
      </section>

      {/* Section du résumé global. */}
      <section className="summary-section">
        {/* Carte du résumé global. */}
        <article className="card large-card">
          {/* Label de la carte. */}
          <p className="card-label">Résumé automatique</p>

          {/* Titre de la carte. */}
          <h2>Résumé global de la journée</h2>

          {/* Message affiché pendant le chargement. */}
          {loading && <p>Chargement du résumé global...</p>}

          {/* Message affiché en cas d'erreur. */}
          {error && <p className="error-message">{error}</p>}

          {/* Résumé global affiché quand tout est chargé. */}
          {!loading && !error && <p>{mailData?.resumeGlobal}</p>}
        </article>
      </section>

      {/* Section principale des e-mails. */}
      <section className="mail-section">
        {/* Barre supérieure de la liste des e-mails. */}
        <div className="mail-toolbar">
          {/* Bloc du titre de la section. */}
          <div>
            {/* Titre de la section. */}
            <h2>E-mails reçus aujourd’hui</h2>

            {/* Nombre d'e-mails affichés. */}
            <p>{filteredMails.length} e-mail(s) affiché(s)</p>
          </div>

          {/* Champ de recherche. */}
          <input
            type="text"
            placeholder="Rechercher par expéditeur, objet ou résumé..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="search-input"
          />
        </div>

        {/* Message affiché pendant le chargement des e-mails. */}
        {loading && <p className="info-message">Chargement des e-mails...</p>}

        {/* Message affiché si aucun mail ne correspond à la recherche. */}
        {!loading && !error && filteredMails.length === 0 && (
          <p className="info-message">Aucun e-mail ne correspond à votre recherche.</p>
        )}

        {/* Grille des cartes d'e-mails. */}
        <div className="mail-grid">
          {/* Parcourt les e-mails filtrés. */}
          {filteredMails.map((mail) => (
            // Carte d'un e-mail.
            <article className="mail-card" key={mail.id}>
              {/* En-tête de la carte. */}
              <div className="mail-card-header">
                {/* Bloc contenant l'expéditeur et l'objet. */}
                <div>
                  {/* Expéditeur du mail. */}
                  <p className="mail-sender">{mail.expediteur}</p>

                  {/* Objet du mail. */}
                  <h3>{mail.objet}</h3>
                </div>

                {/* Statut du mail. */}
                <span className="mail-status">{mail.statut}</span>
              </div>

              {/* Date de réception. */}
              <p className="mail-date">{mail.dateReception}</p>

              {/* Résumé du mail. */}
              <p className="mail-summary">{mail.resume}</p>

              {/* Zone des boutons du mail. */}
              <div className="mail-actions">
                {/* Bouton pour ouvrir la zone de réponse manuelle. */}
                <button className="small-primary-button" onClick={() => handleOpenReply(mail)}>
                  Répondre
                </button>

                {/* Bouton prévu plus tard pour générer une réponse IA. */}
                <button className="small-secondary-button">
                  Réponse IA
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Affiche la zone de réponse seulement si un mail est sélectionné. */}
      {selectedMail && (
        // Section de réponse manuelle.
        <section className="reply-section">
          {/* Carte de réponse. */}
          <article className="reply-card">
            {/* En-tête de la carte de réponse. */}
            <div className="reply-header">
              {/* Bloc du titre de réponse. */}
              <div>
                {/* Label de la carte. */}
                <p className="card-label">Réponse manuelle</p>

                {/* Titre de la carte. */}
                <h2>Répondre à cet e-mail</h2>
              </div>

              {/* Bouton pour fermer la zone de réponse. */}
              <button className="close-button" onClick={() => setSelectedMailId(null)}>
                Fermer
              </button>
            </div>

            {/* Informations du mail sélectionné. */}
            <div className="reply-meta">
              {/* Destinataire de la réponse. */}
              <p><strong>À :</strong> {selectedMail.expediteur}</p>

              {/* Objet de la réponse. */}
              <p><strong>Objet :</strong> Re: {selectedMail.objet}</p>
            </div>

            {/* Contenu original du mail sélectionné. */}
            <div className="original-message">
              {/* Titre du contenu original. */}
              <h3>Message reçu</h3>

              {/* Texte du contenu original. */}
              <p>{selectedMail.contenu}</p>
            </div>

            {/* Champ de saisie de la réponse. */}
            <textarea
              placeholder="Écrivez votre réponse ici..."
              value={replyText}
              onChange={(event) => setReplyText(event.target.value)}
              className="reply-textarea"
            />

            {/* Zone des boutons de la réponse. */}
            <div className="reply-actions">
              {/* Bouton pour préparer la réponse. */}
              <button className="primary-button" onClick={handleSendReply}>
                Préparer la réponse
              </button>

              {/* Bouton pour vider le champ de réponse. */}
              <button className="secondary-button" onClick={() => setReplyText('')}>
                Effacer
              </button>
            </div>

            {/* Message affiché après une action sur la réponse. */}
            {replyStatus && <p className="reply-status">{replyStatus}</p>}
          </article>
        </section>
      )}
    </main>
  )
}

// Exporte le composant principal.
export default App