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

    // Crée une variable pour filtrer les mails selon leur statut.
  const [statusFilter, setStatusFilter] = useState('tous')

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

    // Crée une variable pour savoir quel mail est en cours de génération IA.
  const [aiLoadingMailId, setAiLoadingMailId] = useState(null)

    // Crée une variable pour savoir si une réponse est en cours d'envoi.
  const [isSendingReply, setIsSendingReply] = useState(false)

    // Crée une variable pour afficher un message après l'actualisation des mails.
  const [refreshMessage, setRefreshMessage] = useState('')

    // Crée une variable pour afficher une bulle d'information à l'utilisateur.
  const [scrollNotice, setScrollNotice] = useState('')

    // Crée une variable pour stocker le message reçu depuis n8n.
  const [n8nMessage, setN8nMessage] = useState('')

    // Crée une variable pour stocker l'identifiant du mail à lire complètement.
  const [fullMailId, setFullMailId] = useState(null)

  // Crée une variable pour savoir si le test n8n est en cours.
  const [n8nLoading, setN8nLoading] = useState(false)

    // Charge les e-mails depuis n8n.
  async function loadMailsFromN8n(showSuccessMessage = false) {
    // Indique que le chargement commence.
    setLoading(true)

    // Vide l'ancien message d'erreur.
    setError('')

    // Vide l'ancien message d'actualisation.
    setRefreshMessage('')

    // Essaie de récupérer les mails depuis n8n.
    try {
      // Récupère l'URL n8n depuis le fichier .env.
      const mailsUrl = import.meta.env.VITE_N8N_GET_MAILS_URL

      // Vérifie si l'URL n8n est absente.
      if (!mailsUrl) {
        // Signale une erreur si l'URL n'existe pas.
        throw new Error('URL n8n des mails manquante dans le fichier .env.')
      }

      // Demande les mails à n8n en évitant le cache du navigateur.
      const response = await fetch(`${mailsUrl}?time=${Date.now()}`)

      // Vérifie si n8n a répondu avec une erreur.
      if (!response.ok) {
        // Signale une erreur si la réponse n'est pas correcte.
        throw new Error('n8n a renvoyé une erreur pendant le chargement des mails.')
      }

      // Convertit la réponse n8n en objet JavaScript.
      const data = await response.json()

      // Applique les statuts répondus déjà enregistrés dans le navigateur.
      const dataWithStatuses = applyAnsweredStatuses(data)

      // Enregistre les données corrigées dans React.
      setMailData(dataWithStatuses)

      // Vérifie si on doit afficher un message de succès.
      if (showSuccessMessage) {
        // Affiche un message de succès.
        setRefreshMessage('E-mails actualisés avec succès.')
      }
    } catch (problem) {
      // Affiche l'erreur dans la console du navigateur.
      console.error(problem)

      // Garde les anciennes données si elles existent déjà.
      setMailData((previousData) => {
        // Vérifie si des données sont déjà présentes.
        if (previousData) {
          // Garde les anciennes données.
          return previousData
        }

        // Retourne null si aucune donnée n'existe.
        return null
      })

      // Affiche un message d'erreur.
      setError('Les e-mails ne peuvent pas être chargés pour le moment.')
    } finally {
      // Indique que le chargement est terminé.
      setLoading(false)
    }
  }

  // Lance le chargement des e-mails quand la page s'ouvre.
  useEffect(() => {
    // Charge les mails depuis n8n sans afficher de message de succès.
    loadMailsFromN8n(false)
  }, [])

  // Récupère la liste des e-mails si elle existe, sinon utilise une liste vide.
  const mails = mailData?.mails || []

  // Recherche le mail actuellement sélectionné par l'utilisateur.
  const selectedMail = mails.find((mail) => mail.id === selectedMailId)

    // Recherche le mail que l'utilisateur veut lire entièrement.
  const fullMail = mails.find((mail) => mail.id === fullMailId)

    // Filtre les e-mails selon la recherche et le statut choisi.
  const filteredMails = mails.filter((mail) => {
    // Transforme la recherche en minuscules.
    const search = searchTerm.toLowerCase()

    // Vérifie si l'expéditeur contient le texte recherché.
    const senderMatch = mail.expediteur.toLowerCase().includes(search)

    // Vérifie si l'objet contient le texte recherché.
    const subjectMatch = mail.objet.toLowerCase().includes(search)

    // Vérifie si le résumé contient le texte recherché.
    const summaryMatch = mail.resume.toLowerCase().includes(search)

    // Vérifie si le mail correspond à la recherche.
    const searchMatch = senderMatch || subjectMatch || summaryMatch

    // Vérifie si l'utilisateur veut voir tous les mails.
    const allStatusMatch = statusFilter === 'tous'

    // Vérifie si l'utilisateur veut voir seulement les mails non répondus.
    const notAnsweredMatch = statusFilter === 'non-repondu' && mail.statut === 'non répondu'

    // Vérifie si l'utilisateur veut voir seulement les mails répondus.
    const answeredMatch = statusFilter === 'repondu' && mail.statut === 'répondu'

    // Vérifie si le mail correspond au filtre de statut.
    const statusMatch = allStatusMatch || notAnsweredMatch || answeredMatch

    // Garde le mail seulement s'il correspond à la recherche et au statut.
    return searchMatch && statusMatch
  })

    // Compte le nombre total de mails.
  const totalMails = mails.length

  // Compte le nombre de mails non répondus.
  const notAnsweredCount = mails.filter((mail) => mail.statut === 'non répondu').length

  // Compte le nombre de mails répondus.
  const answeredCount = mails.filter((mail) => mail.statut === 'répondu').length

    // Ouvre la zone de réponse pour un mail précis.
  function handleOpenReply(mail) {
    // Enregistre l'identifiant du mail sélectionné.
    setSelectedMailId(mail.id)

    // Vide l'ancien texte de réponse.
    setReplyText('')

    // Vide l'ancien message de statut.
    setReplyStatus('')

    // Affiche une bulle pour guider l'utilisateur.
    showScrollNotice('La zone de réponse s’affiche plus bas. Descendez pour écrire votre réponse.')

    // Descend légèrement après l'ouverture de la zone.
    setTimeout(() => {
      // Fait descendre la page vers le bas.
      scrollToBottom()
    }, 300)
  }

      // Envoie la réponse manuelle vers n8n.
  async function handleSendReply() {
    // Vérifie si aucun mail n'est sélectionné.
    if (!selectedMail) {
      // Arrête la fonction si aucun mail n'est sélectionné.
      return
    }

    // Vérifie si un envoi est déjà en cours.
    if (isSendingReply) {
      // Arrête la fonction pour éviter un double clic.
      return
    }

    // Vérifie si le champ de réponse est vide.
    if (replyText.trim() === '') {
      // Affiche un message si l'utilisateur n'a rien écrit.
      setReplyStatus('Veuillez écrire une réponse avant de continuer.')

      // Arrête la fonction.
      return
    }

    // Récupère l'URL n8n utilisée pour envoyer la réponse.
    const replyUrl = import.meta.env.VITE_N8N_REPLY_MANUAL_URL

    // Vérifie si l'URL est absente.
    if (!replyUrl) {
      // Affiche un message d'erreur.
      setReplyStatus('URL n8n manquante pour envoyer la réponse.')

      // Arrête la fonction.
      return
    }

    // Indique que l'envoi commence.
    setIsSendingReply(true)

    // Affiche un message pendant l'envoi.
    setReplyStatus('Envoi de la réponse en cours...')

    // Essaie d'envoyer la réponse à n8n.
    try {
      // Envoie une requête POST vers le webhook n8n.
      const response = await fetch(replyUrl, {
        // Utilise la méthode POST pour envoyer des données.
        method: 'POST',

        // Indique que les données envoyées sont au format JSON.
        headers: {
          // Définit le type du contenu envoyé.
          'Content-Type': 'application/json',
        },

        // Transforme les données JavaScript en JSON.
        body: JSON.stringify({
          // Envoie l'identifiant Gmail du message.
          messageId: selectedMail.messageId,

          // Envoie le contenu de la réponse.
          message: replyText,
        }),
      })

      // Vérifie si n8n a renvoyé une erreur.
      if (!response.ok) {
        // Lance une erreur si la réponse n'est pas correcte.
        throw new Error('Erreur pendant l’envoi de la réponse.')
      }

      // Convertit la réponse de n8n en JSON.
      const data = await response.json()

      // Enregistre ce mail comme répondu dans le navigateur.
      saveAnsweredMessageId(selectedMail.messageId)

      // Met à jour la liste des mails après l'envoi de la réponse.
      setMailData((previousData) => {
        // Vérifie si les anciennes données existent.
        if (!previousData) {
          // Retourne les anciennes données si elles n'existent pas.
          return previousData
        }

        // Crée une nouvelle liste de mails avec le statut mis à jour.
        const updatedMails = previousData.mails.map((mail) => {
          // Vérifie si le mail courant est celui qui vient de recevoir une réponse.
          if (mail.messageId === selectedMail.messageId) {
            // Retourne le même mail avec le statut répondu.
            return {
              // Garde toutes les anciennes informations du mail.
              ...mail,

              // Modifie seulement le statut.
              statut: 'répondu',
            }
          }

          // Retourne les autres mails sans modification.
          return mail
        })

        // Retourne toutes les données avec la nouvelle liste de mails.
        return {
          // Garde toutes les anciennes données.
          ...previousData,

          // Remplace seulement la liste des mails.
          mails: updatedMails,
        }
      })

      // Affiche le message de succès.
      setReplyStatus(data.message || 'Réponse envoyée avec succès.')

      // Vide le champ de réponse après l'envoi.
      setReplyText('')
    } catch (problem) {
      // Affiche l'erreur dans la console du navigateur.
      console.error(problem)

      // Affiche un message simple à l'utilisateur.
      setReplyStatus('Impossible d’envoyer la réponse pour le moment.')
    } finally {
      // Indique que l'envoi est terminé.
      setIsSendingReply(false)
    }
  }

    // Teste la connexion entre React et n8n.
  async function handleTestN8nConnection() {
    // Vide l'ancien message n8n avant de commencer un nouveau test.
    setN8nMessage('')

    // Indique que le test est en cours.
    setN8nLoading(true)

    // Essaie d'appeler le webhook n8n.
    try {
      // Récupère l'URL du webhook n8n depuis le fichier .env.
      const n8nUrl = import.meta.env.VITE_N8N_TEST_URL

      // Vérifie si l'URL du webhook est absente.
      if (!n8nUrl) {
        // Lance une erreur si l'URL n'est pas définie.
        throw new Error('URL n8n manquante dans le fichier .env.')
      }

      // Envoie une demande GET vers n8n.
      const response = await fetch(n8nUrl)

      // Vérifie si n8n a répondu avec une erreur.
      if (!response.ok) {
        // Lance une erreur si la réponse n'est pas correcte.
        throw new Error('n8n a répondu avec une erreur.')
      }

      // Convertit la réponse JSON de n8n en objet JavaScript.
      const data = await response.json()

      // Affiche le message reçu depuis n8n dans l'interface.
      setN8nMessage(data.message || 'Connexion réussie avec n8n.')
    } catch (problem) {
      // Affiche l'erreur dans la console du navigateur.
      console.error(problem)

      // Affiche un message d'erreur simple dans l'interface.
      setN8nMessage('Connexion impossible avec n8n. Vérifiez que n8n est lancé et que le workflow est actif.')
    } finally {
      // Indique que le test est terminé.
      setN8nLoading(false)
    }
  }

    // Ouvre la zone de lecture complète d'un mail.
  function handleOpenFullMail(mail) {
    // Enregistre l'identifiant du mail à afficher complètement.
    setFullMailId(mail.id)

    // Affiche une bulle pour guider l'utilisateur.
    showScrollNotice('Le mail complet s’affiche plus bas. Descendez pour le lire.')

    // Descend légèrement après l'ouverture de la zone.
    setTimeout(() => {
      // Fait descendre la page vers le bas.
      scrollToBottom()
    }, 300)
  }

  // Ferme la zone de lecture complète.
  function handleCloseFullMail() {
    // Supprime l'identifiant du mail affiché.
    setFullMailId(null)
  }
  
    // Transforme le résumé global en lignes propres à afficher.
  function formatSummaryText(summary) {
    // Vérifie si le résumé est vide.
    if (!summary) {
      // Retourne une liste vide.
      return []
    }

    // Supprime les astérisques inutiles produits parfois par l'IA.
    const cleanedSummary = summary.replace(/\*\*/g, '')

    // Coupe le texte en lignes quand il y a des titres connus.
    const formattedSummary = cleanedSummary
      .replace(/Résumé général\s*:/gi, '\nRésumé général :')
      .replace(/Points importants\s*:/gi, '\nPoints importants :')
      .replace(/Actions à faire\s*:/gi, '\nActions à faire :')
      .replace(/\s-\s/g, '\n- ')

    // Coupe le résumé ligne par ligne.
    const lines = formattedSummary.split('\n')

    // Nettoie chaque ligne et retire les lignes vides.
    return lines.map((line) => line.trim()).filter(Boolean)
  }

    // Génère une proposition de réponse avec Groq via n8n.
  async function handleGenerateAiReply(mail) {
    // Enregistre le mail sélectionné pour ouvrir la zone de réponse.
    setSelectedMailId(mail.id)

    // Affiche une bulle pour guider l'utilisateur.
    showScrollNotice('La réponse IA va s’afficher plus bas. Descendez pour la consulter et la modifier.')

    // Vide l'ancien texte de réponse.
    setReplyText('')

    // Affiche un message pendant la génération.
    setReplyStatus('Génération de la réponse IA en cours...')

    // Indique quel mail est en cours de traitement.
    setAiLoadingMailId(mail.id)

        // Descend légèrement après l'ouverture de la zone.
    setTimeout(() => {
      // Fait descendre la page vers le bas.
      scrollToBottom()
    }, 300)

    // Récupère l'URL n8n pour la réponse IA.
    const aiUrl = import.meta.env.VITE_N8N_REPLY_AI_URL

    // Vérifie si l'URL est absente.
    if (!aiUrl) {
      // Affiche une erreur.
      setReplyStatus('URL n8n manquante pour générer la réponse IA.')

      // Arrête le chargement IA.
      setAiLoadingMailId(null)

      // Arrête la fonction.
      return
    }

    // Essaie d'appeler n8n.
    try {
      // Envoie les informations du mail à n8n.
      const response = await fetch(aiUrl, {
        // Utilise POST pour envoyer des données.
        method: 'POST',

        // Indique que les données envoyées sont en JSON.
        headers: {
          // Définit le type du contenu envoyé.
          'Content-Type': 'application/json',
        },

        // Convertit les données du mail en JSON.
        body: JSON.stringify({
          // Envoie l'expéditeur.
          expediteur: mail.expediteur,

          // Envoie l'objet.
          objet: mail.objet,

          // Envoie le contenu complet.
          contenu: mail.contenu,
        }),
      })

      // Vérifie si n8n a renvoyé une erreur.
      if (!response.ok) {
        // Lance une erreur.
        throw new Error('Erreur pendant la génération de la réponse IA.')
      }

      // Convertit la réponse en JSON.
      const data = await response.json()

      // Met la réponse IA dans la zone de texte.
      setReplyText(data.reply || '')

      // Affiche un message de succès.
      setReplyStatus(data.message || 'Réponse IA générée avec succès. Vous pouvez la modifier avant envoi.')
    } catch (problem) {
      // Affiche l'erreur dans la console.
      console.error(problem)

      // Affiche un message simple.
      setReplyStatus('Impossible de générer une réponse IA pour le moment.')
    } finally {
      // Arrête le chargement IA.
      setAiLoadingMailId(null)
    }
  }

    // Affiche une bulle qui indique à l'utilisateur de descendre dans la page.
  function showScrollNotice(message) {
    // Affiche le message reçu dans la bulle.
    setScrollNotice(message)

    // Cache automatiquement la bulle après quelques secondes.
    setTimeout(() => {
      // Vide le message pour cacher la bulle.
      setScrollNotice('')
    }, 5000)
  }

  // Fait descendre automatiquement la page vers le bas.
  function scrollToBottom() {
    // Demande au navigateur de descendre doucement jusqu'en bas de la page.
    window.scrollTo({
      // Position verticale tout en bas de la page.
      top: document.body.scrollHeight,

      // Animation douce pendant le déplacement.
      behavior: 'smooth',
    })
  }

    // Récupère la liste des messages déjà répondus depuis le navigateur.
  function getAnsweredMessageIds() {
    // Récupère la valeur stockée dans localStorage.
    const savedValue = localStorage.getItem('answeredMessageIds')

    // Vérifie si aucune valeur n'existe encore.
    if (!savedValue) {
      // Retourne une liste vide.
      return []
    }

    // Essaie de convertir le texte stocké en tableau JavaScript.
    try {
      // Retourne le tableau récupéré.
      return JSON.parse(savedValue)
    } catch (problem) {
      // Affiche l'erreur dans la console.
      console.error(problem)

      // Retourne une liste vide en cas d'erreur.
      return []
    }
  }

  // Enregistre un mail comme répondu dans le navigateur.
  function saveAnsweredMessageId(messageId) {
    // Vérifie si l'identifiant du mail est absent.
    if (!messageId) {
      // Arrête la fonction.
      return
    }

    // Récupère les anciens identifiants déjà enregistrés.
    const oldIds = getAnsweredMessageIds()

    // Vérifie si ce mail est déjà enregistré.
    if (oldIds.includes(messageId)) {
      // Arrête la fonction pour éviter les doublons.
      return
    }

    // Ajoute le nouvel identifiant à la liste.
    const newIds = [...oldIds, messageId]

    // Enregistre la nouvelle liste dans le navigateur.
    localStorage.setItem('answeredMessageIds', JSON.stringify(newIds))
  }

  // Applique les statuts répondus sur les mails chargés depuis n8n.
  function applyAnsweredStatuses(data) {
    // Récupère les identifiants des mails déjà répondus.
    const answeredIds = getAnsweredMessageIds()

    // Vérifie si les données ou les mails sont absents.
    if (!data || !Array.isArray(data.mails)) {
      // Retourne les données telles quelles.
      return data
    }

    // Met à jour les mails avec le bon statut.
    const updatedMails = data.mails.map((mail) => {
      // Vérifie si ce mail a déjà été répondu.
      if (answeredIds.includes(mail.messageId)) {
        // Retourne le mail avec le statut répondu.
        return {
          // Garde toutes les informations du mail.
          ...mail,

          // Met le statut à répondu.
          statut: 'répondu',
        }
      }

      // Retourne le mail sans changement.
      return mail
    })

    // Retourne les données avec la liste mise à jour.
    return {
      // Garde toutes les autres données.
      ...data,

      // Remplace seulement la liste des mails.
      mails: updatedMails,
    }
  }

  // Retourne l'interface visible de l'application.
  return (
    // Conteneur principal de l'application.
    <main className="app">

      {/* Affiche un message après l'actualisation des e-mails. */}
      {refreshMessage && (
        // Section visible seulement quand un message d'actualisation existe.
        <section className="refresh-section">
          {/* Carte du message d'actualisation. */}
          <article className="refresh-card">
            {/* Texte du message. */}
            <p>{refreshMessage}</p>
          </article>
        </section>
      )}


      {/* Section principale de présentation. */}
      <section className="hero">
        {/* Bloc du texte principal. */}
        <div className="hero-content">
          {/* Badge de présentation du projet. */}
          <p className="badge">Projet • React + n8n + OpenAI</p>

          {/* Titre principal de l'application. */}
          <h1>Assistant intelligent des e-mails du jour</h1>

          {/* Description de l'application. */}
          <p className="hero-description">
            Consultez vos e-mails reçus aujourd’hui, obtenez un résumé automatique et préparez vos réponses facilement depuis une interface moderne.
          </p>

          {/* Zone des boutons principaux. */}
          <div className="hero-actions">
                        {/* Bouton qui recharge les e-mails depuis n8n. */}
            <button
              // Classe CSS du bouton principal.
              className="primary-button"

              // Recharge les mails au clic.
              onClick={() => loadMailsFromN8n(true)}

              // Désactive le bouton pendant le chargement.
              disabled={loading}
            >
              {/* Change le texte du bouton pendant le chargement. */}
              {loading ? 'Actualisation...' : 'Actualiser les e-mails'}
            </button>

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

          {/* Ligne qui affiche le message reçu depuis n8n. */}
          <div className="stat-line">
            {/* Libellé de la connexion n8n. */}
            <span>n8n</span>

            {/* Message court selon l'état de la connexion. */}
            <strong>{n8nMessage ? 'Connecté' : 'Non testé'}</strong>
          </div>
        </div>

              {/* Affiche le message retourné par n8n après le test de connexion. */}
      {n8nMessage && (
        // Section visible uniquement quand un message n8n existe.
        <section className="connection-section">
          {/* Carte du résultat de connexion. */}
          <article className="connection-card">
            {/* Petit label de la carte. */}
            <p className="card-label">Connexion n8n</p>

            {/* Message reçu depuis n8n. */}
            <p>{n8nMessage}</p>
          </article>
        </section>
      )}
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

          {/* Affiche le résumé global avec une mise en forme propre. */}
          {!loading && mailData?.resumeGlobal && (
            // Bloc qui contient le résumé formaté.
            <div className="summary-content">
              {/* Parcourt chaque ligne du résumé. */}
              {formatSummaryText(mailData.resumeGlobal).map((line, index) => (
                // Affiche chaque ligne avec un style adapté.
                <p
                  // Donne une clé unique à chaque ligne.
                  key={index}

                  // Applique une classe différente aux titres.
                  className={line.endsWith(':') ? 'summary-title' : 'summary-line'}
                >
                  {/* Affiche le texte de la ligne. */}
                  {line}
                </p>
              ))}
            </div>
          )}
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

                    {/* Zone des boutons de filtre par statut. */}
          <div className="status-filters">
            {/* Bouton pour afficher tous les mails. */}
            <button
              // Applique une classe active si le filtre actuel est tous.
              className={statusFilter === 'tous' ? 'filter-button active' : 'filter-button'}

              // Active le filtre tous au clic.
              onClick={() => setStatusFilter('tous')}
            >
              {/* Texte du bouton avec le nombre total de mails. */}
              Tous ({totalMails})
            </button>

            {/* Bouton pour afficher les mails non répondus. */}
            <button
              // Applique une classe active si le filtre actuel est non répondu.
              className={statusFilter === 'non-repondu' ? 'filter-button active' : 'filter-button'}

              // Active le filtre non répondu au clic.
              onClick={() => setStatusFilter('non-repondu')}
            >
              {/* Texte du bouton avec le nombre de mails non répondus. */}
              Non répondus ({notAnsweredCount})
            </button>

            {/* Bouton pour afficher les mails répondus. */}
            <button
              // Applique une classe active si le filtre actuel est répondu.
              className={statusFilter === 'repondu' ? 'filter-button active' : 'filter-button'}

              // Active le filtre répondu au clic.
              onClick={() => setStatusFilter('repondu')}
            >
              {/* Texte du bouton avec le nombre de mails répondus. */}
              Répondus ({answeredCount})
            </button>
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
                {/* Bouton pour lire tout le contenu du mail. */}
                <button className="small-neutral-button" onClick={() => handleOpenFullMail(mail)}>
                  Lire tout le mail
                </button>

                {/* Bouton pour ouvrir la zone de réponse manuelle. */}
                <button className="small-primary-button" onClick={() => handleOpenReply(mail)}>
                  Répondre
                </button>

                                {/* Bouton pour générer une réponse automatique avec Groq. */}
                <button
                  // Classe CSS du bouton secondaire.
                  className="small-secondary-button"

                  // Lance la génération IA au clic.
                  onClick={() => handleGenerateAiReply(mail)}

                  // Désactive le bouton pendant la génération IA.
                  disabled={aiLoadingMailId === mail.id}
                >
                  {/* Affiche un texte différent pendant la génération. */}
                  {aiLoadingMailId === mail.id ? 'Génération...' : 'Réponse IA'}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

            {/* Affiche la lecture complète seulement si un mail est sélectionné. */}
      {fullMail && (
        // Section de lecture complète du mail.
        <section className="full-mail-section">
          {/* Carte qui contient tout le contenu du mail. */}
          <article className="full-mail-card">
            {/* En-tête de la carte de lecture complète. */}
            <div className="full-mail-header">
              {/* Bloc du titre de la lecture complète. */}
              <div>
                {/* Petit label de la section. */}
                <p className="card-label">Lecture complète</p>

                {/* Titre de la section. */}
                <h2>{fullMail.objet}</h2>
              </div>

              {/* Bouton pour fermer la lecture complète. */}
              <button className="close-button" onClick={handleCloseFullMail}>
                Fermer
              </button>
            </div>

            {/* Informations principales du mail. */}
            <div className="full-mail-meta">
              {/* Affiche l'expéditeur du mail. */}
              <p><strong>Expéditeur :</strong> {fullMail.expediteur}</p>

              {/* Affiche la date de réception du mail. */}
              <p><strong>Date :</strong> {fullMail.dateReception}</p>

              {/* Affiche le statut du mail. */}
              <p><strong>Statut :</strong> {fullMail.statut}</p>
            </div>

            {/* Bloc contenant le contenu complet du mail. */}
            <div className="full-mail-content-box">
              {/* Titre du contenu. */}
              <h3>Contenu du message</h3>

              {/* Affiche tout le contenu disponible du mail. */}
              <p className="full-mail-content">{fullMail.contenu}</p>
            </div>
          </article>
        </section>
      )}

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
                            {/* Bouton pour envoyer la réponse par Gmail. */}
              <button
                // Classe CSS du bouton principal.
                className="primary-button"

                // Appelle la fonction d'envoi au clic.
                onClick={handleSendReply}

                // Désactive le bouton pendant l'envoi.
                disabled={isSendingReply}
              >
                {/* Affiche un texte différent pendant l'envoi. */}
                {isSendingReply ? 'Envoi...' : 'Envoyer la réponse'}
              </button>

                            {/* Bouton pour vider le champ de réponse. */}
              <button
                // Classe CSS du bouton secondaire.
                className="secondary-button"

                // Vide le champ de réponse au clic.
                onClick={() => setReplyText('')}

                // Désactive le bouton pendant l'envoi.
                disabled={isSendingReply}
              >
                {/* Texte du bouton. */}
                Effacer
              </button>
            </div>

            {/* Message affiché après une action sur la réponse. */}
            {replyStatus && <p className="reply-status">{replyStatus}</p>}
          </article>
        </section>
      )}
            {/* Affiche une bulle pour guider l'utilisateur vers le bas de la page. */}
      {scrollNotice && (
        // Bulle d'information visible temporairement.
        <div className="scroll-notice">
          {/* Texte de la bulle. */}
          <p>{scrollNotice}</p>

          {/* Bouton pour descendre automatiquement. */}
          <button onClick={scrollToBottom}>
            Descendre
          </button>
        </div>
      )}
    </main>
  )
}

// Exporte le composant principal.
export default App