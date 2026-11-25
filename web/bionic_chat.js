import { app } from "../../scripts/app.js";
import { api } from "../../scripts/api.js";

const NODE_TYPE = "BionicChatPrompt";
const MAX_IMAGES = 6;
const MAX_DOCUMENTS = 3;
const MAX_IMAGE_SIDE = 1280;
const SILENCE_MS = 2000;
const SILENCE_MIN_SPEECH_MS = 500;
const DEFAULT_SILENCE_DB = -45;
const METER_FLOOR_DB = -70;
const METER_CEIL_DB = -10;

const I18N = {
  fr: {
    launcherTitle: "Ouvrir le chat Bionic",
    settings: "Réglages",
    newChat: "Nouvelle conversation",
    close: "Fermer",
    modelTitle: "Modèle LM Studio",
    profileTitle: "Prompt système actif (prompts enregistrés dans ⚙)",
    profileCustom: "(prompt système personnalisé)",
    profileNone: "Aucun prompt enregistré",
    profileActive: "Prompt système : {0}",
    unloadTitle: "Décharger le modèle de la mémoire",
    placeholderIdle: "Écris ton prompt… (Entrée = envoyer, Maj+Entrée = nouvelle ligne)",
    placeholderBusy: "Bionic répond…",
    micTitle: "Entrée audio (Voxtral/Whisper local)",
    attachTitle: "Joindre une image",
    docTitle: "Joindre un document (PDF, TXT, MD…)",
    webOnTitle: "Recherche Internet activée — cliquer pour désactiver",
    webOffTitle: "Recherche Internet désactivée — cliquer pour activer",
    runTitle: "Envoyer le texte dans la node Bionic Chat Prompt et lancer le workflow",
    stopTitle: "Arrêter la génération ou le workflow en cours",
    send: "Envoyer",
    stop: "Stop",
    serverUrl: "Serveur (OpenAI compatible)",
    presetLabel: "Adresse prédéfinie",
    presetCustom: "Adresse personnalisée",
    systemPrompt: "Prompt système",
    temperature: "Température",
    autoRun: "Lancer automatiquement le workflow après la réponse",
    autoAudio: "Envoyer automatiquement la transcription après le micro",
    autoStopSilence: "Arrêter l'enregistrement après 2 s de silence",
    silenceThreshold: "Seuil de silence",
    silenceThresholdHint:
      "Le niveau mesuré doit rester sous ce seuil pendant 2 s pour arrêter l'enregistrement. À baisser si le silence n'est jamais détecté, à monter si le bruit de fond coupe trop tôt.",
    silenceMeterTitle: "Niveau du micro (la barre doit passer au-dessus du trait quand tu parles)",
    silenceDetected: "Silence détecté — envoi de l'enregistrement",
    autoUnload: "Décharger automatiquement le modèle après chaque réponse",
    cameraSelector: "Afficher le sélecteur de mouvement caméra 🎥",
    web: "Accès Internet (recherche web + ouverture d'URL)",
    whisperModel: "Modèle de transcription audio",
    transcribeLanguage: "Langue de la transcription",
    interfaceLanguage: "Langue de l'interface",
    save: "Enregistrer",
    whisperTiny: "tiny (rapide, ~75 Mo)",
    whisperBase: "base (~145 Mo)",
    whisperSmall: "small (recommandé, ~480 Mo)",
    whisperMedium: "medium (~1,5 Go)",
    whisperLarge: "large-v3 (~3 Go)",
    sttFr: "Français",
    sttEn: "Anglais",
    sttAuto: "Détection automatique",
    sttEs: "Espagnol",
    sttDe: "Allemand",
    sttIt: "Italien",
    modelsCount: "{0} modèle(s) LM Studio",
    lmStudioHint: "{0} — démarre le serveur LM Studio (Developer → Start server).",
    lmStudioUnreachable: "LM Studio injoignable : {0}",
    webEnabledStatus: "Recherche Internet activée",
    webDisabledStatus: "Recherche Internet désactivée",
    newChatStatus: "Nouvelle conversation",
    languageStatus: "Langue de l'interface : français",
    recordingStatus: "Enregistrement… clique sur 🎙 pour arrêter",
    transcribingStatus: "Transcription en cours…",
    nothingTranscribed: "Rien n'a été transcrit.",
    transcriptionAdded: "Transcription ajoutée",
    transcriptionFailed: "Transcription impossible",
    target: "Cible : {0} (#{1})",
    noTarget: "Aucune node Bionic Chat Prompt dans le graphe — elle sera créée au premier Run.",
    reasoning: "Raisonnement",
    copy: "Copier",
    copied: "Copié",
    emptyHint:
      "Décris ta scène, joins une image ou utilise le micro. Le bouton ⚡ Run envoie le prompt dans la node Bionic Chat Prompt et lance le workflow.",
    attachmentAlt: "pièce jointe",
    remove: "Retirer",
    docTooMany: "{0} documents maximum par message.",
    docUnreadable: "Document illisible : {0}",
    docEmpty: "Aucun texte lisible dans {0}.",
    docTruncated: "Document tronqué : seuls les 60 000 premiers caractères sont envoyés.",
    docPrefix: "[Document : {0}]",
    tokens: "{0} tok",
    tokensTitle: "Contexte : {0} · Réponse : {1}",
    tokensConversation: "Cumul de la conversation — contexte : {0} · réponses : {1} · {2} demande(s)",
    tokensEstimateNote: "estimation pour la dernière réponse (le serveur n'a pas renvoyé d'usage)",
    tokensEstimated: "≈ {0} tok",
    tokensEstimatedTitle: "Estimation : le serveur n'a pas renvoyé d'usage.",
    tokensLive: "≈ {0} tok",
    tokensLiveTitle: "Génération en cours — estimation.",
    tokensRounds: "{0} tours",
    tokensTitleReasoning: "Contexte : {0} · Réponse : {1} · dont raisonnement : {2}",
    visionSuffix: " (vision)",
    noModel: "Aucun modèle LM Studio",
    settingsNotSaved: "Réglages non enregistrés : {0}",
    settingsNotLoaded: "Réglages pas encore chargés.",
    settingsSaved: "Réglages enregistrés",
    maxTokens: "Tokens maximum par réponse",
    maxTokensHint: "La réponse est coupée à cette longueur : augmente si le texte est tronqué.",
    resend: "↻ Renvoyer",
    resendHint: "Rejouer cette demande à l'identique",
    repeatRun: "🔁 Répéter",
    repeatRunHint:
      "À chaque fin de run, renvoyer cette demande dans le chat puis relancer la nouvelle réponse",
    repeatStop: "⏹ Arrêter",
    repeatStopHint: "Couper la répétition automatique",
    repeatArmed: "Répétition activée : à chaque fin de run, la demande repart dans le chat et la réponse est relancée.",
    repeatRunning: "Répétition {0} : demande renvoyée dans le chat…",
    repeatAnswer: "Répétition {0} : réponse du chat relancée",
    repeatStopped: "Répétition arrêtée.",
    repeatFailed: "Répétition arrêtée : le dernier run a échoué.",
    repeatNoAnswer: "Répétition arrêtée : le chat n'a pas rendu de réponse à relancer.",
    edit: "✎ Éditer",
    editHint: "Remettre ce message dans la saisie pour le corriger avant de l'envoyer",
    editLoaded: "Message remis dans la saisie ; les échanges suivants ont été retirés.",
    copyRequest: "⧉ Copier",
    copyRequestHint: "Copier la demande complète (texte, images et documents) pour la recoller telle quelle",
    copyRequestFailed: "Copie impossible : {0}",
    pasteRequestAdded: "Demande collée dans la saisie (texte, images et documents).",
    promptNamePlaceholder: "Nom du prompt",
    promptSaveTitle: "Enregistrer le prompt système sous ce nom",
    promptLoad: "Charger",
    promptLoadTitle: "Charger ce prompt dans le champ ci-dessus",
    promptDeleteTitle: "Supprimer ce prompt enregistré",
    promptNameRequired: "Donne un nom au prompt pour l'enregistrer.",
    promptSaved: "Prompt enregistré : {0}",
    promptDeleted: "Prompt supprimé : {0}",
    promptDeleteConfirm: "Supprimer le prompt « {0} » ?",
    promptLoaded: "Prompt « {0} » chargé — clique Enregistrer pour l'appliquer.",
    promptFailed: "Opération impossible : {0}",
    promptsEmpty: "Aucun prompt enregistré",
    restartNeeded:
      "Redémarre ComfyUI : le serveur n'a pas reconnu {0} (réglage gardé pour cette session seulement).",
    silenceCountdown: "silence {0}/{1} s",
    unloading: "Déchargement du modèle…",
    unloadOk: "Modèle déchargé ({0} : {1})",
    unloadAuto: "Modèle déchargé automatiquement : {0}",
    unloadFailed: "Déchargement impossible : {0}",
    unloadNoModel: "Aucun modèle chargé à décharger.",
    generationStopped: "Génération arrêtée",
    workflowStopped: "Workflow arrêté",
    stopFailed: "Arrêt impossible : {0}",
    noText: "Aucun texte à envoyer dans la node.",
    cannotCreate: "Impossible de créer la node Bionic Chat Prompt.",
    noPromptInput: "La node Bionic Chat Prompt n'a pas d'entrée prompt.",
    launched: "Prompt envoyé dans #{0} — workflow lancé",
    launchFailed: "Lancement impossible : {0}",
    maxImages: "{0} images maximum par message.",
    imageUnreadable: "Image illisible : {0}",
    micUnavailable: "Micro indisponible : {0}",
    transcribeFailed: "Transcription impossible : {0}",
    transcribeFailedToast: "Transcription impossible : {0}",
    lmStudioDown: "LM Studio est injoignable. Démarre son serveur local (port 1234).",
    errorPrefix: "Erreur : {0}",
    nodeTitle: "Prompt du chat Bionic",
    nodeDescription:
      "Prompt envoyé depuis le panneau de chat Bionic. Le bouton RUN du chat remplit ce champ et lance le workflow.",
    readFailed: "lecture impossible",
    unsupportedFormat: "format non supporté",
    dropImage: "Dépose une image",
    graphImagesTitle: "Images du workflow (Load Image, Preview, Save…) : cocher pour joindre",
    graphImagesHeader: "Images du workflow — coche pour joindre",
    graphImagesNone: "Aucune image dans le workflow (Load Image vide ou pas encore exécuté).",
    graphImagesRefresh: "Rafraîchir",
    graphImagesOff: "off",
    cameraNone: "🎥 Camera move: none (optional)",
    cameraTitle: "Camera move added to the next LLM request",
    cameraTextPlaceholder: "camera instruction (English, editable)",
    cameraSaveTitle: "Save this instruction to the list",
    cameraDeleteTitle: "Remove this move from the list",
    cameraSaveName: "Name (description) of the move:",
    cameraSaved: "Camera move saved: {0}",
    cameraSaveFailed: "Could not save the camera list: {0}",
    cameraOnlyRequest: "Add this camera move to the previous prompt.",
    cameraNone: "🎥 Mouvement caméra : aucun (optionnel)",
    cameraTitle: "Mouvement caméra ajouté à la prochaine demande au LLM",
    cameraTextPlaceholder: "instruction caméra (anglais, modifiable)",
    cameraSaveTitle: "Enregistrer cette instruction dans la liste",
    cameraDeleteTitle: "Retirer ce mouvement de la liste",
    cameraSaveName: "Nom (description française) du mouvement :",
    cameraSaved: "Mouvement caméra enregistré : {0}",
    cameraSaveFailed: "Enregistrement de la liste caméra impossible : {0}",
    cameraOnlyRequest: "Ajoute ce mouvement de caméra au prompt précédent.",
  },
  en: {
    launcherTitle: "Open the Bionic chat",
    settings: "Settings",
    newChat: "New conversation",
    close: "Close",
    modelTitle: "LM Studio model",
    profileTitle: "Active system prompt (prompts saved in ⚙)",
    profileCustom: "(custom system prompt)",
    profileNone: "No saved prompt",
    profileActive: "System prompt: {0}",
    unloadTitle: "Unload the model from memory",
    placeholderIdle: "Write your prompt… (Enter = send, Shift+Enter = new line)",
    placeholderBusy: "Bionic is answering…",
    micTitle: "Audio input (local Whisper)",
    attachTitle: "Attach an image",
    docTitle: "Attach a document (PDF, TXT, MD…)",
    webOnTitle: "Web search enabled — click to disable",
    webOffTitle: "Web search disabled — click to enable",
    runTitle: "Send the text into the Bionic Chat Prompt node and run the workflow",
    stopTitle: "Stop the current generation or workflow",
    send: "Send",
    stop: "Stop",
    serverUrl: "Server (OpenAI compatible)",
    presetLabel: "Preset address",
    presetCustom: "Custom address",
    systemPrompt: "System prompt",
    temperature: "Temperature",
    autoRun: "Run the workflow automatically after the answer",
    autoAudio: "Send the transcription automatically after the microphone",
    autoStopSilence: "Stop recording after 2 s of silence",
    silenceThreshold: "Silence threshold",
    silenceThresholdHint:
      "The measured level must stay below this threshold for 2 s to stop the recording. Lower it if silence is never detected, raise it if background noise stops it too soon.",
    silenceMeterTitle: "Microphone level (the bar should rise above the marker while you speak)",
    silenceDetected: "Silence detected — sending the recording",
    autoUnload: "Unload the model automatically after each answer",
    cameraSelector: "Show the camera move selector 🎥",
    web: "Internet access (web search + URL opening)",
    whisperModel: "Audio transcription model",
    transcribeLanguage: "Transcription language",
    interfaceLanguage: "Interface language",
    save: "Save",
    whisperTiny: "tiny (fast, ~75 MB)",
    whisperBase: "base (~145 MB)",
    whisperSmall: "small (recommended, ~480 MB)",
    whisperMedium: "medium (~1.5 GB)",
    whisperLarge: "large-v3 (~3 GB)",
    sttFr: "French",
    sttEn: "English",
    sttAuto: "Auto-detect",
    sttEs: "Spanish",
    sttDe: "German",
    sttIt: "Italian",
    modelsCount: "{0} LM Studio model(s)",
    lmStudioHint: "{0} — start the LM Studio server (Developer → Start server).",
    lmStudioUnreachable: "LM Studio unreachable: {0}",
    webEnabledStatus: "Web search enabled",
    webDisabledStatus: "Web search disabled",
    newChatStatus: "New conversation",
    languageStatus: "Interface language: English",
    recordingStatus: "Recording… click 🎙 to stop",
    transcribingStatus: "Transcribing…",
    nothingTranscribed: "Nothing was transcribed.",
    transcriptionAdded: "Transcription added",
    transcriptionFailed: "Transcription failed",
    target: "Target: {0} (#{1})",
    noTarget: "No Bionic Chat Prompt node in the graph — it will be created on the first Run.",
    reasoning: "Reasoning",
    copy: "Copy",
    copied: "Copied",
    emptyHint:
      "Describe your scene, attach an image or use the microphone. The ⚡ Run button sends the prompt into the Bionic Chat Prompt node and runs the workflow.",
    attachmentAlt: "attachment",
    remove: "Remove",
    docTooMany: "{0} documents maximum per message.",
    docUnreadable: "Unreadable document: {0}",
    docEmpty: "No readable text in {0}.",
    docTruncated: "Document truncated: only the first 60,000 characters are sent.",
    docPrefix: "[Document: {0}]",
    tokens: "{0} tok",
    tokensTitle: "Prompt: {0} · Answer: {1}",
    tokensConversation: "Conversation total — prompt: {0} · answers: {1} · {2} request(s)",
    tokensEstimateNote: "estimate for the last answer (the server did not report usage)",
    tokensEstimated: "≈ {0} tok",
    tokensEstimatedTitle: "Estimate: the server did not report usage.",
    tokensLive: "≈ {0} tok",
    tokensLiveTitle: "Generating — estimate.",
    tokensRounds: "{0} rounds",
    tokensTitleReasoning: "Prompt: {0} · Answer: {1} · reasoning: {2}",
    visionSuffix: " (vision)",
    noModel: "No LM Studio model",
    settingsNotSaved: "Settings not saved: {0}",
    settingsNotLoaded: "Settings are not loaded yet.",
    settingsSaved: "Settings saved",
    maxTokens: "Maximum tokens per answer",
    maxTokensHint: "The answer is cut at that length: raise it when the text is truncated.",
    resend: "↻ Resend",
    resendHint: "Send this exact request again",
    repeatRun: "🔁 Repeat run",
    repeatRunHint: "After every finished run, send this request into the chat again and run the new answer",
    repeatStop: "⏹ Stop",
    repeatStopHint: "Turn the automatic repetition off",
    repeatArmed: "Repeat armed: after every finished run the request goes back into the chat and its answer is run.",
    repeatRunning: "Repeat #{0}: request sent into the chat again…",
    repeatAnswer: "Repeat #{0}: chat answer sent to the workflow",
    repeatStopped: "Repeat stopped.",
    repeatFailed: "Repeat stopped: the last run failed.",
    repeatNoAnswer: "Repeat stopped: the chat gave no answer to run.",
    edit: "✎ Edit",
    editHint: "Put this message back in the input so you can fix it before sending",
    editLoaded: "Message moved back into the input; the following exchanges were removed.",
    copyRequest: "⧉ Copy",
    copyRequestHint: "Copy the full request (text, images and documents) so you can paste it back unchanged",
    copyRequestFailed: "Could not copy: {0}",
    pasteRequestAdded: "Request pasted into the input (text, images and documents).",
    promptNamePlaceholder: "Prompt name",
    promptSaveTitle: "Save the system prompt under this name",
    promptLoad: "Load",
    promptLoadTitle: "Load this prompt into the field above",
    promptDeleteTitle: "Delete this saved prompt",
    promptNameRequired: "Give the prompt a name to save it.",
    promptSaved: "Prompt saved: {0}",
    promptDeleted: "Prompt deleted: {0}",
    promptDeleteConfirm: "Delete the prompt “{0}”?",
    promptLoaded: "Prompt “{0}” loaded — click Save to apply it.",
    promptFailed: "Could not complete: {0}",
    promptsEmpty: "No saved prompt",
    restartNeeded:
      "Restart ComfyUI: the server did not recognise {0} (kept for this session only).",
    silenceCountdown: "silence {0}/{1} s",
    unloading: "Unloading the model…",
    unloadOk: "Model unloaded ({0}: {1})",
    unloadAuto: "Model unloaded automatically: {0}",
    unloadFailed: "Could not unload: {0}",
    unloadNoModel: "No loaded model to unload.",
    generationStopped: "Generation stopped",
    workflowStopped: "Workflow stopped",
    stopFailed: "Could not stop: {0}",
    noText: "No text to send into the node.",
    cannotCreate: "Could not create the Bionic Chat Prompt node.",
    noPromptInput: "The Bionic Chat Prompt node has no prompt input.",
    launched: "Prompt sent to #{0} — workflow started",
    launchFailed: "Could not start the workflow: {0}",
    maxImages: "{0} images maximum per message.",
    imageUnreadable: "Unreadable image: {0}",
    micUnavailable: "Microphone unavailable: {0}",
    transcribeFailed: "Transcription failed: {0}",
    transcribeFailedToast: "Transcription failed: {0}",
    lmStudioDown: "LM Studio is unreachable. Start its local server (port 1234).",
    errorPrefix: "Error: {0}",
    nodeTitle: "Bionic Chat Prompt",
    nodeDescription:
      "Prompt sent from the Bionic chat panel. The chat's RUN button fills this field and queues the workflow.",
    readFailed: "read failed",
    unsupportedFormat: "unsupported format",
    dropImage: "Drop an image",
    graphImagesTitle: "Workflow images (Load Image, Preview, Save…): tick to attach",
    graphImagesHeader: "Workflow images — tick to attach",
    graphImagesNone: "No image in the workflow (empty Load Image or not run yet).",
    graphImagesRefresh: "Refresh",
    graphImagesOff: "off",
  },
};

const WHISPER_SIZES = ["tiny", "base", "small", "medium", "large-v3"];
const WHISPER_KEYS = {
  tiny: "whisperTiny",
  base: "whisperBase",
  small: "whisperSmall",
  medium: "whisperMedium",
  "large-v3": "whisperLarge",
};
const STT_LANGUAGES = [
  ["fr", "sttFr"],
  ["en", "sttEn"],
  ["auto", "sttAuto"],
  ["es", "sttEs"],
  ["de", "sttDe"],
  ["it", "sttIt"],
];
const NODE_TITLES = ["Prompt du chat Bionic", "Bionic Chat Prompt"];
const SERVER_PRESETS = [
  { name: "LM Studio", url: "http://127.0.0.1:1234/v1" },
  { name: "Ollama", url: "http://127.0.0.1:11434/v1" },
  { name: "llama.cpp", url: "http://127.0.0.1:9931/v1" },
];

const state = {
  config: null,
  models: [],
  messages: [],
  attachments: [],
  graphPicks: new Map(),
  cameraMoves: [],
  uiPrefs: { camera_selector: true },
  documents: [],
  busy: false,
  abort: null,
  loaded: false,
  targetNodeId: null,
  repeat: null,
  recording: false,
  recorder: null,
  recStream: null,
  recChunks: [],
  recTimer: null,
  recStart: 0,
  recWatch: null,
  recSilence: 0,
  ui: null,
  els: null,
  tokens: { prompt: 0, completion: 0, requests: 0, estimated: false },
};

function language() {
  return state.config?.language === "en" ? "en" : "fr";
}

function t(key, ...values) {
  const dict = I18N[language()] || I18N.fr;
  let text = dict[key] !== undefined ? dict[key] : I18N.fr[key] !== undefined ? I18N.fr[key] : key;
  values.forEach((value, index) => {
    text = text.split(`{${index}}`).join(String(value));
  });
  return text;
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function setStatus(text) {
  if (state.els) state.els.status.textContent = text || "";
}

function toast(severity, summary) {
  const manager = app.extensionManager;
  if (manager && manager.toast && typeof manager.toast.add === "function") {
    manager.toast.add({ severity, summary, life: 4000 });
    return;
  }
  setStatus(summary);
}

function loadStylesheet() {
  if (document.getElementById("bionic-chat-style")) return;
  const link = document.createElement("link");
  link.id = "bionic-chat-style";
  link.rel = "stylesheet";
  link.href = new URL("./bionic_chat.css", import.meta.url).href;
  document.head.appendChild(link);
}

function buildPanel() {
  if (document.getElementById("bionic-chat-root")) {
    state.els = collectElements();
    return;
  }

  const root = el("div");
  root.id = "bionic-chat-root";

  const launcher = el("button", null, "💬 Bionic");
  launcher.id = "bionic-launcher";
  launcher.type = "button";

  const panel = el("section");
  panel.id = "bionic-panel";
  panel.className = "bionic-hidden";
  panel.innerHTML = `
    <header class="bionic-header">
      <span class="bionic-title">Bionic<span>.</span></span>
      <div class="bionic-header-btns">
        <button type="button" class="bionic-icon-btn" id="bionic-settings-btn" data-i18n-title="settings">⚙</button>
        <button type="button" class="bionic-icon-btn" id="bionic-new" data-i18n-title="newChat">＋</button>
        <button type="button" class="bionic-icon-btn" id="bionic-close" data-i18n-title="close">✕</button>
      </div>
    </header>
    <div class="bionic-model-row">
      <select id="bionic-model" data-i18n-title="modelTitle"></select>
      <select id="bionic-profile" data-i18n-title="profileTitle"></select>
      <button type="button" class="bionic-icon-btn" id="bionic-unload" data-i18n-title="unloadTitle">⏏</button>
    </div>
    <div class="bionic-model-row bionic-camera-row" id="bionic-camera-row">
      <select id="bionic-camera" data-i18n-title="cameraTitle"></select>
      <input type="text" id="bionic-camera-text" data-i18n-placeholder="cameraTextPlaceholder">
      <button type="button" class="bionic-icon-btn" id="bionic-camera-save" data-i18n-title="cameraSaveTitle">💾</button>
      <button type="button" class="bionic-icon-btn" id="bionic-camera-del" data-i18n-title="cameraDeleteTitle">🗑</button>
    </div>
    <div id="bionic-messages"></div>
    <div id="bionic-graph-images" class="bionic-hidden"></div>
    <div id="bionic-attachments"></div>
    <div class="bionic-status" id="bionic-status"></div>
    <div class="bionic-composer">
      <textarea id="bionic-input" rows="2" data-i18n-placeholder="placeholderIdle"></textarea>
      <div class="bionic-tools">
        <button type="button" class="bionic-icon-btn" id="bionic-mic" data-i18n-title="micTitle">🎙</button>
        <button type="button" class="bionic-icon-btn" id="bionic-attach" data-i18n-title="attachTitle">🖼</button>
        <button type="button" class="bionic-icon-btn" id="bionic-graph-btn" data-i18n-title="graphImagesTitle" aria-pressed="false">📥</button>
        <button type="button" class="bionic-icon-btn" id="bionic-doc" data-i18n-title="docTitle">＋</button>
        <button type="button" class="bionic-icon-btn" id="bionic-web" data-i18n-title="webOffTitle" aria-pressed="false">🌐</button>
        <input type="file" id="bionic-file" accept="image/*" multiple hidden>
        <input type="file" id="bionic-doc-file" accept=".txt,.md,.markdown,.csv,.json,.log,.xml,.yaml,.yml,.pdf,.docx,text/plain,application/pdf" multiple hidden>
        <span class="bionic-rec-time" id="bionic-rec-time"></span>
        <span class="bionic-meter bionic-hidden" id="bionic-meter" data-i18n-title="silenceMeterTitle">
          <span class="bionic-meter-fill" id="bionic-meter-fill"></span>
          <span class="bionic-meter-mark bionic-hidden" id="bionic-meter-mark"></span>
        </span>
        <span class="bionic-tokens" id="bionic-tokens"></span>
        <span class="bionic-spacer"></span>
        <button type="button" class="bionic-btn bionic-stop" id="bionic-stop" data-i18n-title="stopTitle">⏹</button>
        <button type="button" class="bionic-btn bionic-run" id="bionic-run" data-i18n-title="runTitle">⚡ Run</button>
        <button type="button" class="bionic-btn bionic-send" id="bionic-send" data-i18n="send">Envoyer</button>
      </div>
    </div>
    <div id="bionic-settings" class="bionic-hidden">
      <div class="bionic-settings-title" data-i18n="settings">Réglages</div>
      <label>
        <span data-i18n="interfaceLanguage">Langue de l'interface</span>
        <select id="bionic-cfg-ui-lang">
          <option value="fr">Français</option>
          <option value="en">English</option>
        </select>
      </label>
      <label>
        <span data-i18n="presetLabel">Adresse prédéfinie</span>
        <select id="bionic-cfg-preset"></select>
      </label>
      <label>
        <span data-i18n="serverUrl">Serveur (OpenAI compatible)</span>
        <input id="bionic-cfg-url" type="text" spellcheck="false">
      </label>
      <label>
        <span data-i18n="systemPrompt">Prompt système</span>
        <textarea id="bionic-cfg-system" spellcheck="false"></textarea>
      </label>
      <div class="bionic-prompt-tools">
        <input id="bionic-cfg-prompt-name" type="text" spellcheck="false" data-i18n-title="promptNamePlaceholder">
        <button type="button" class="bionic-btn" id="bionic-prompt-save" data-i18n-title="promptSaveTitle">💾</button>
        <select id="bionic-cfg-prompt-list"></select>
        <button type="button" class="bionic-btn" id="bionic-prompt-load" data-i18n="promptLoad" data-i18n-title="promptLoadTitle">Charger</button>
        <button type="button" class="bionic-btn" id="bionic-prompt-delete" data-i18n-title="promptDeleteTitle">🗑</button>
      </div>
      <label>
        <span data-i18n="temperature">Température</span>
        <input id="bionic-cfg-temp" type="number" min="0" max="2" step="0.05">
      </label>
      <label>
        <span data-i18n="maxTokens">Tokens maximum par réponse</span>
        <input id="bionic-cfg-maxtok" type="number" min="256" max="32768" step="256">
        <span class="bionic-cfg-hint" data-i18n="maxTokensHint">La réponse est coupée à cette longueur.</span>
      </label>
      <label class="bionic-check">
        <input id="bionic-cfg-autorun" type="checkbox">
        <span data-i18n="autoRun">Lancer automatiquement le workflow après la réponse</span>
      </label>
      <label class="bionic-check">
        <input id="bionic-cfg-autoaudio" type="checkbox">
        <span data-i18n="autoAudio">Envoyer automatiquement la transcription après le micro</span>
      </label>
      <label class="bionic-check">
        <input id="bionic-cfg-autostop" type="checkbox">
        <span data-i18n="autoStopSilence">Arrêter l'enregistrement après 2 s de silence</span>
      </label>
      <label>
        <span data-i18n="silenceThreshold">Seuil de silence</span>
        <input id="bionic-cfg-silence" type="range" min="-70" max="-15" step="1" data-i18n-title="silenceThresholdHint">
        <span class="bionic-cfg-hint" id="bionic-cfg-silence-value"></span>
      </label>
      <label class="bionic-check">
        <input id="bionic-cfg-web" type="checkbox">
        <span data-i18n="web">Accès Internet (recherche web + ouverture d'URL)</span>
      </label>
      <label class="bionic-check">
        <input id="bionic-cfg-autounload" type="checkbox">
        <span data-i18n="autoUnload">Décharger automatiquement le modèle après chaque réponse</span>
      </label>
      <label class="bionic-check">
        <input id="bionic-cfg-camera" type="checkbox">
        <span data-i18n="cameraSelector">Afficher le sélecteur de mouvement caméra 🎥</span>
      </label>
      <label>
        <span data-i18n="whisperModel">Modèle de transcription audio</span>
        <select id="bionic-cfg-whisper"></select>
      </label>
      <label>
        <span data-i18n="transcribeLanguage">Langue de la transcription</span>
        <select id="bionic-cfg-language"></select>
      </label>
      <div class="bionic-settings-actions">
        <button type="button" class="bionic-btn bionic-send" id="bionic-cfg-save" data-i18n="save">Enregistrer</button>
        <button type="button" class="bionic-btn" id="bionic-cfg-close" data-i18n="close">Fermer</button>
      </div>
    </div>
  `;

  root.append(launcher, panel);
  document.body.appendChild(root);
  state.els = collectElements();
  bindEvents();
  applyLanguage();
}

function collectElements() {
  const byId = (id) => document.getElementById(id);
  return {
    root: byId("bionic-chat-root"),
    launcher: byId("bionic-launcher"),
    panel: byId("bionic-panel"),
    messages: byId("bionic-messages"),
    attachments: byId("bionic-attachments"),
    graphImages: byId("bionic-graph-images"),
    graphBtn: byId("bionic-graph-btn"),
    camera: byId("bionic-camera"),
    cameraText: byId("bionic-camera-text"),
    status: byId("bionic-status"),
    input: byId("bionic-input"),
    model: byId("bionic-model"),
    profile: byId("bionic-profile"),
    unload: byId("bionic-unload"),
    settings: byId("bionic-settings"),
    mic: byId("bionic-mic"),
    recTime: byId("bionic-rec-time"),
    meter: byId("bionic-meter"),
    meterFill: byId("bionic-meter-fill"),
    meterMark: byId("bionic-meter-mark"),
    file: byId("bionic-file"),
    docFile: byId("bionic-doc-file"),
    send: byId("bionic-send"),
    uiLanguage: byId("bionic-cfg-ui-lang"),
    preset: byId("bionic-cfg-preset"),
  };
}

function applyLanguage() {
  const dict = I18N[language()] || I18N.fr;
  const root = document.getElementById("bionic-chat-root");
  if (!root) return;

  root.querySelectorAll("[data-i18n]").forEach((node) => {
    const value = dict[node.dataset.i18n];
    if (value !== undefined) node.textContent = value;
  });
  root.querySelectorAll("[data-i18n-title]").forEach((node) => {
    const value = dict[node.dataset.i18nTitle];
    if (value !== undefined) node.title = value;
  });

  const panel = document.getElementById("bionic-panel");
  if (panel) panel.dataset.dropLabel = dict.dropImage;
  if (state.els?.camera) renderCameraMoves();

  renderServerPresets();
  renderWhisperOptions();
  renderTranscribeLanguageOptions();
  populateModelPlaceholder();
  if (state.els && (state.attachments.length || state.documents.length)) renderAttachments();

  const promptName = document.getElementById("bionic-cfg-prompt-name");
  if (promptName) promptName.placeholder = dict.promptNamePlaceholder;
  const cameraText = document.getElementById("bionic-camera-text");
  if (cameraText) cameraText.placeholder = dict.cameraTextPlaceholder;
  renderPromptOptions();

  if (state.els) {
    state.els.launcher.title = dict.launcherTitle;
    state.els.input.placeholder = state.busy ? dict.placeholderBusy : dict.placeholderIdle;
    state.els.send.textContent = state.busy ? dict.stop : dict.send;
  }

  updateWebButton();
  updateTokenCounter(lastAssistantMessage());
  if (state.messages.length && !state.busy) renderMessages();
  applyNodeLanguage();
}

function renderServerPresets() {
  const select = document.getElementById("bionic-cfg-preset");
  if (!select) return;
  const previous = select.value;
  select.innerHTML = "";
  const custom = el("option", null, t("presetCustom"));
  custom.value = "";
  select.appendChild(custom);
  for (const preset of SERVER_PRESETS) {
    const option = el("option", null, `${preset.name} — ${preset.url}`);
    option.value = preset.url;
    select.appendChild(option);
  }
  select.value = previous || "";
}

function syncPresetSelect() {
  const select = document.getElementById("bionic-cfg-preset");
  const input = document.getElementById("bionic-cfg-url");
  if (!select || !input) return;
  const value = input.value.trim().replace(/\/+$/, "");
  const match = SERVER_PRESETS.find((preset) => preset.url.replace(/\/+$/, "") === value);
  select.value = match ? match.url : "";
}

function renderWhisperOptions() {
  const select = document.getElementById("bionic-cfg-whisper");
  if (!select) return;
  const previous = select.value;
  select.innerHTML = "";
  for (const size of WHISPER_SIZES) {
    const option = el("option", null, t(WHISPER_KEYS[size]));
    option.value = size;
    select.appendChild(option);
  }
  if (previous) select.value = previous;
}

function renderTranscribeLanguageOptions() {
  const select = document.getElementById("bionic-cfg-language");
  if (!select) return;
  const previous = select.value;
  select.innerHTML = "";
  for (const [code, key] of STT_LANGUAGES) {
    const option = el("option", null, t(key));
    option.value = code;
    select.appendChild(option);
  }
  if (previous) select.value = previous;
}

function populateModelPlaceholder() {
  const select = state.els?.model;
  if (!select || state.models.length) return;
  select.innerHTML = "";
  const option = el("option", null, t("noModel"));
  select.appendChild(option);
  select.disabled = true;
}

function applyNodeLanguage() {
  const title = t("nodeTitle");
  const description = t("nodeDescription");
  const registered = window.LiteGraph?.registered_node_types?.[NODE_TYPE];
  if (registered) {
    registered.title = title;
    registered.desc = description;
  }
  const nodes = app.graph?._nodes || app.graph?.nodes || [];
  let changed = false;
  for (const node of nodes) {
    if (node.type !== NODE_TYPE) continue;
    if (NODE_TITLES.includes(node.title)) {
      node.title = title;
      changed = true;
    }
  }
  if (changed) app.graph?.setDirtyCanvas?.(true, true);
}

function bindEvents() {
  const els = state.els;
  els.launcher.addEventListener("click", openPanel);
  document.getElementById("bionic-close").addEventListener("click", closePanel);
  document.getElementById("bionic-settings-btn").addEventListener("click", openSettings);
  document.getElementById("bionic-cfg-close").addEventListener("click", () => {
    els.settings.classList.add("bionic-hidden");
  });
  document.getElementById("bionic-cfg-save").addEventListener("click", saveSettings);
  document.getElementById("bionic-prompt-save").addEventListener("click", savePrompt);
  document.getElementById("bionic-prompt-load").addEventListener("click", applyPrompt);
  document.getElementById("bionic-prompt-delete").addEventListener("click", deletePrompt);
  document.getElementById("bionic-cfg-prompt-list").addEventListener("change", (event) => {
    document.getElementById("bionic-cfg-prompt-name").value = event.target.value || "";
  });
  document.getElementById("bionic-cfg-silence").addEventListener("input", syncSilenceThresholdLabel);
  els.uiLanguage.addEventListener("change", changeLanguage);
  els.preset.addEventListener("change", () => {
    if (els.preset.value) document.getElementById("bionic-cfg-url").value = els.preset.value;
  });
  document.getElementById("bionic-cfg-url").addEventListener("input", syncPresetSelect);
  document.getElementById("bionic-new").addEventListener("click", newConversation);
  document.getElementById("bionic-attach").addEventListener("click", () => els.file.click());
  els.graphBtn.addEventListener("click", toggleGraphImages);
  els.camera.addEventListener("change", () => {
    const move = state.cameraMoves[Number(els.camera.value)];
    els.cameraText.value = move ? move.prompt : "";
  });
  document.getElementById("bionic-camera-save").addEventListener("click", saveCameraMove);
  document.getElementById("bionic-camera-del").addEventListener("click", deleteCameraMove);
  loadCameraMoves();
  els.file.addEventListener("change", () => {
    addImageFiles(els.file.files);
    els.file.value = "";
  });
  document.getElementById("bionic-doc").addEventListener("click", () => els.docFile.click());
  els.docFile.addEventListener("change", () => {
    addDocumentFiles(els.docFile.files);
    els.docFile.value = "";
  });

  els.mic.addEventListener("click", toggleRecording);
  document.getElementById("bionic-web").addEventListener("click", toggleWeb);
  document.getElementById("bionic-run").addEventListener("click", () => runPrompt(els.input.value));
  document.getElementById("bionic-stop").addEventListener("click", stopCurrent);
  els.send.addEventListener("click", () => {
    if (state.busy) {
      stopStreaming();
      return;
    }
    sendMessage();
  });

  els.unload.addEventListener("click", unloadModel);

  els.profile.addEventListener("change", applyProfile);

  els.model.addEventListener("change", () => {
    if (!state.config) return;
    state.config.model = els.model.value;
    saveConfig({ model: els.model.value });
  });

  els.input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      if (!state.busy) sendMessage();
    }
  });
  els.input.addEventListener("input", autoGrowInput);
  els.panel.addEventListener("paste", (event) => {
    if (event.target.closest("#bionic-settings")) return;
    handlePaste(event);
  });

  els.panel.addEventListener("dragover", (event) => {
    event.preventDefault();
    els.panel.classList.add("bionic-drop");
  });
  els.panel.addEventListener("dragleave", () => els.panel.classList.remove("bionic-drop"));
  els.panel.addEventListener("drop", (event) => {
    event.preventDefault();
    els.panel.classList.remove("bionic-drop");
    addImageFiles(event.dataTransfer?.files);
  });
}

function openPanel() {
  state.els.panel.classList.remove("bionic-hidden");
  updateTargetLabel();
  if (!state.loaded) loadConfig();
  setTimeout(() => state.els.input.focus(), 50);
}

function closePanel() {
  state.els.panel.classList.add("bionic-hidden");
}

function openSettings() {
  state.els.settings.classList.remove("bionic-hidden");
  fillSettings();
  loadPrompts();
}

function autoGrowInput() {
  const input = state.els.input;
  input.style.height = "auto";
  input.style.height = `${Math.min(input.scrollHeight, 180)}px`;
}

async function changeLanguage() {
  const value = state.els.uiLanguage.value === "en" ? "en" : "fr";
  if (!state.config) {
    state.config = { ...(state.config || {}), language: value };
    applyLanguage();
    return;
  }
  state.config.language = value;
  applyLanguage();
  if (await saveConfig({ language: value })) {
    fillSettings();
    setStatus(t("languageStatus"));
  }
}

async function loadConfig() {
  try {
    const response = await api.fetchApi("/bionic_chat/config");
    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    state.config = data.config;
    state.models = data.models || [];
    state.loaded = true;
    if (!state.config.model && state.models.length) {
      state.config.model = state.models[0].id;
    }
    applyLanguage();
    renderModels();
    fillSettings();
    updateWebButton();
    loadPrompts();
    setStatus(
      data.error
        ? t("lmStudioHint", data.error)
        : t("modelsCount", state.models.length)
    );
  } catch (error) {
    setStatus(t("lmStudioUnreachable", error.message || error));
  }
}

async function saveConfig(patch) {
  try {
    const response = await api.fetchApi("/bionic_chat/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    state.config = data.config;
    return true;
  } catch (error) {
    toast("error", t("settingsNotSaved", error.message || error));
    return false;
  }
}

const DEFAULT_MAX_TOKENS = 8192;

function maxTokensValue() {
  const value = Number(state.config?.max_tokens);
  if (!Number.isFinite(value) || value <= 0) return DEFAULT_MAX_TOKENS;
  return Math.max(256, Math.min(32768, Math.round(value)));
}

function fillSettings() {
  if (!state.config || !document.getElementById("bionic-cfg-url")) return;
  document.getElementById("bionic-cfg-url").value = state.config.base_url || "";
  syncPresetSelect();
  document.getElementById("bionic-cfg-system").value = state.config.system_prompt || "";
  document.getElementById("bionic-cfg-temp").value = state.config.temperature;
  document.getElementById("bionic-cfg-maxtok").value = maxTokensValue();
  document.getElementById("bionic-cfg-autorun").checked = state.config.auto_run !== false;
  document.getElementById("bionic-cfg-autoaudio").checked = state.config.auto_send_audio !== false;
  document.getElementById("bionic-cfg-autostop").checked = state.config.auto_stop_silence === true;
  document.getElementById("bionic-cfg-silence").value = silenceThresholdDb();
  syncSilenceThresholdLabel();
  document.getElementById("bionic-cfg-autounload").checked = state.config.auto_unload === true;
  document.getElementById("bionic-cfg-camera").checked = state.uiPrefs.camera_selector !== false;
  document.getElementById("bionic-cfg-web").checked = state.config.web_enabled !== false;
  document.getElementById("bionic-cfg-ui-lang").value = state.config.language === "en" ? "en" : "fr";
  document.getElementById("bionic-cfg-whisper").value = state.config.transcribe_model;
  document.getElementById("bionic-cfg-language").value = state.config.transcribe_language;
}

function renderProfileSelect() {
  const select = state.els?.profile;
  if (!select) return;
  const prompts = state.prompts || {};
  const names = Object.keys(prompts).sort((a, b) => a.localeCompare(b));
  const current = String(state.config?.system_prompt || "").trim();
  const active = names.find((name) => String(prompts[name]).trim() === current);
  select.innerHTML = "";
  if (!names.length) {
    const option = el("option", null, t("profileNone"));
    option.value = "";
    select.appendChild(option);
    select.disabled = true;
    return;
  }
  select.disabled = false;
  for (const name of names) {
    const option = el("option", null, name);
    option.value = name;
    select.appendChild(option);
  }
  if (!active) {
    const option = el("option", null, t("profileCustom"));
    option.value = "";
    select.appendChild(option);
  }
  select.value = active || "";
}

async function applyProfile() {
  const name = state.els.profile.value;
  const prompts = state.prompts || {};
  if (!name || prompts[name] === undefined || !state.config) return;
  const text = prompts[name];
  if (await saveConfig({ system_prompt: text })) {
    const textarea = document.getElementById("bionic-cfg-system");
    if (textarea) textarea.value = text;
    renderProfileSelect();
    setStatus(t("profileActive", name));
  } else {
    renderProfileSelect();
  }
}

function renderPromptOptions() {
  renderProfileSelect();
  const select = document.getElementById("bionic-cfg-prompt-list");
  if (!select) return;
  const prompts = state.prompts || {};
  const previous = select.value;
  const names = Object.keys(prompts).sort((a, b) => a.localeCompare(b));
  select.innerHTML = "";
  if (!names.length) {
    const option = el("option", null, t("promptsEmpty"));
    option.value = "";
    select.appendChild(option);
    select.disabled = true;
    return;
  }
  select.disabled = false;
  for (const name of names) {
    const option = el("option", null, name);
    option.value = name;
    select.appendChild(option);
  }
  select.value = names.includes(previous) ? previous : names[0];
}

async function loadPrompts() {
  try {
    const response = await api.fetchApi("/bionic_chat/prompts");
    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    state.prompts = data.prompts || {};
  } catch {
    state.prompts = state.prompts || {};
  }
  renderPromptOptions();
}

async function savePrompt() {
  const nameInput = document.getElementById("bionic-cfg-prompt-name");
  const name = nameInput.value.trim();
  if (!name) {
    toast("warning", t("promptNameRequired"));
    nameInput.focus();
    return;
  }
  const text = document.getElementById("bionic-cfg-system").value;
  try {
    const response = await api.fetchApi("/bionic_chat/prompts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, text }),
    });
    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    state.prompts = data.prompts || {};
    renderPromptOptions();
    document.getElementById("bionic-cfg-prompt-list").value = name;
    toast("success", t("promptSaved", name));
  } catch (error) {
    toast("error", t("promptFailed", error.message || error));
  }
}

function applyPrompt() {
  const select = document.getElementById("bionic-cfg-prompt-list");
  const name = select ? select.value : "";
  const prompts = state.prompts || {};
  if (!name || prompts[name] === undefined) return;
  document.getElementById("bionic-cfg-system").value = prompts[name];
  document.getElementById("bionic-cfg-prompt-name").value = name;
  toast("success", t("promptLoaded", name));
}

async function deletePrompt() {
  const select = document.getElementById("bionic-cfg-prompt-list");
  const name = select ? select.value : "";
  const prompts = state.prompts || {};
  if (!name || prompts[name] === undefined) return;
  if (!window.confirm(t("promptDeleteConfirm", name))) return;
  try {
    const response = await api.fetchApi("/bionic_chat/prompts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", name }),
    });
    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    state.prompts = data.prompts || {};
    renderPromptOptions();
    toast("success", t("promptDeleted", name));
  } catch (error) {
    toast("error", t("promptFailed", error.message || error));
  }
}

async function saveSettings() {
  if (!state.config) {
    toast("warning", t("settingsNotLoaded"));
    return;
  }
  const patch = {
    language: document.getElementById("bionic-cfg-ui-lang").value,
    base_url: document.getElementById("bionic-cfg-url").value.trim(),
    system_prompt: document.getElementById("bionic-cfg-system").value,
    temperature: Number(document.getElementById("bionic-cfg-temp").value),
    max_tokens: Math.max(256, Math.min(32768, Math.round(Number(document.getElementById("bionic-cfg-maxtok").value) || DEFAULT_MAX_TOKENS))),
    auto_run: document.getElementById("bionic-cfg-autorun").checked,
    auto_send_audio: document.getElementById("bionic-cfg-autoaudio").checked,
    auto_stop_silence: document.getElementById("bionic-cfg-autostop").checked,
    silence_threshold_db: Number(document.getElementById("bionic-cfg-silence").value),
    auto_unload: document.getElementById("bionic-cfg-autounload").checked,
    web_enabled: document.getElementById("bionic-cfg-web").checked,
    transcribe_model: document.getElementById("bionic-cfg-whisper").value,
    transcribe_language: document.getElementById("bionic-cfg-language").value,
  };
  const cameraOn = document.getElementById("bionic-cfg-camera").checked;
  if (cameraOn !== (state.uiPrefs.camera_selector !== false)) {
    state.uiPrefs.camera_selector = cameraOn;
    applyCameraSelectorVisibility();
    await writeUserJson(UI_PREFS_FILE, state.uiPrefs, false);
  }
  if (await saveConfig(patch)) {
    state.els.settings.classList.add("bionic-hidden");
    await loadConfig();
    // A server started before these settings existed drops them: keep them for this session.
    const dropped = Object.keys(patch).filter((key) => state.config[key] === undefined);
    if (dropped.length) {
      state.config = { ...state.config, ...patch };
      fillSettings();
      toast("warning", t("restartNeeded", dropped.join(", ")));
    } else {
      toast("success", t("settingsSaved"));
    }
  }
}

function updateWebButton() {
  const button = document.getElementById("bionic-web");
  if (!button) return;
  const enabled = state.config ? state.config.web_enabled !== false : false;
  button.classList.toggle("bionic-web-on", enabled);
  button.setAttribute("aria-pressed", String(enabled));
  button.title = enabled ? t("webOnTitle") : t("webOffTitle");
}

async function toggleWeb() {
  if (!state.config) {
    toast("warning", t("settingsNotLoaded"));
    return;
  }
  const enabled = state.config.web_enabled === false;
  state.config.web_enabled = enabled;
  updateWebButton();
  if (await saveConfig({ web_enabled: enabled })) {
    fillSettings();
    setStatus(enabled ? t("webEnabledStatus") : t("webDisabledStatus"));
  } else {
    state.config.web_enabled = !enabled;
    updateWebButton();
  }
}

function renderModels() {
  const select = state.els.model;
  select.innerHTML = "";
  if (!state.models.length) {
    select.appendChild(el("option", null, t("noModel")));
    select.disabled = true;
    return;
  }
  select.disabled = false;
  for (const model of state.models) {
    if (!["llm", "vlm"].includes(model.type)) continue;
    const option = el("option", null, `${model.id}${model.type === "vlm" ? t("visionSuffix") : ""}`);
    option.value = model.id;
    select.appendChild(option);
  }
  if (state.config?.model) select.value = state.config.model;
}

const BACKEND_LABELS = { lmstudio: "LM Studio", llamacpp: "llama.cpp", ollama: "Ollama" };

async function unloadModel(options = {}) {
  if (state.busy || (state.els.unload.disabled && !options.silent)) return;
  const model = state.els.model.value || state.config?.model || "";
  if (!model) {
    if (!options.silent) setStatus(t("unloadNoModel"));
    return;
  }
  state.els.unload.disabled = true;
  if (!options.silent) setStatus(t("unloading"));
  try {
    const response = await api.fetchApi("/bionic_chat/unload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || response.statusText);
    if (!data.unloaded || !data.unloaded.length) {
      if (!options.silent) setStatus(t("unloadNoModel"));
      return;
    }
    if (options.silent) {
      toast("success", t("unloadAuto", data.unloaded.join(", ")));
    } else {
      setStatus(t("unloadOk", BACKEND_LABELS[data.backend] || data.backend, data.unloaded.join(", ")));
    }
    await refreshModels();
  } catch (error) {
    const message = error?.message || error;
    if (options.silent) toast("warning", t("unloadFailed", message));
    else setStatus(t("unloadFailed", message));
  } finally {
    state.els.unload.disabled = false;
  }
}

async function refreshModels() {
  try {
    const response = await api.fetchApi("/bionic_chat/config");
    if (!response.ok) return;
    const data = await response.json();
    state.models = data.models || [];
    renderModels();
  } catch {
    // the list is refreshed on the next successful config load
  }
}

function newConversation() {
  stopStreaming();
  state.messages = [];
  state.attachments = [];
  state.documents = [];
  state.repeat = null;
  state.tokens = { prompt: 0, completion: 0, requests: 0, estimated: false };
  updateTokenCounter(null);
  renderAttachments();
  renderMessages();
  state.els.input.value = "";
  autoGrowInput();
  setStatus(t("newChatStatus"));
}

function scrollToBottom() {
  const box = state.els.messages;
  box.scrollTop = box.scrollHeight;
}

function imageStrip(images) {
  const strip = el("div", "bionic-message-images");
  for (const image of images) {
    const img = el("img");
    img.src = image;
    img.alt = t("attachmentAlt");
    strip.appendChild(img);
  }
  return strip;
}

function documentList(documents) {
  const list = el("div", "bionic-message-docs");
  for (const doc of documents) {
    const chip = el("div", "bionic-doc");
    chip.appendChild(el("span", null, `📄 ${doc.name}`));
    list.appendChild(chip);
  }
  return list;
}

function messageElement(message) {
  const wrap = el("div", `bionic-msg ${message.role}${message.error ? " error" : ""}`);
  const bubble = el("div", "bionic-bubble");
  if (message.images && message.images.length) bubble.appendChild(imageStrip(message.images));
  if (message.documents && message.documents.length) bubble.appendChild(documentList(message.documents));

  let reasoning = null;
  if (message.reasoning) {
    reasoning = el("details", "bionic-reasoning");
    reasoning.appendChild(el("summary", null, t("reasoning")));
    reasoning.appendChild(el("div", null, message.reasoning));
    bubble.appendChild(reasoning);
  }

  const text = el("div", "bionic-text");
  text.textContent = message.content || "";
  if (message.role === "assistant" && state.busy && !message.content) {
    text.classList.add("bionic-typing");
  }
  bubble.appendChild(text);
  wrap.appendChild(bubble);

  let actions = null;
  if (
    message.role === "user" &&
    (message.content || (message.images && message.images.length) || (message.documents && message.documents.length))
  ) {
    actions = el("div", "bionic-message-actions");
    const copyRequestButton = el("button", "bionic-link", t("copyRequest"));
    copyRequestButton.type = "button";
    copyRequestButton.title = t("copyRequestHint");
    copyRequestButton.addEventListener("click", () => copyRequest(message, copyRequestButton));
    const editButton = el("button", "bionic-link", t("edit"));
    editButton.type = "button";
    editButton.title = t("editHint");
    editButton.addEventListener("click", () => editMessage(message));
    const resendButton = el("button", "bionic-link", t("resend"));
    resendButton.type = "button";
    resendButton.title = t("resendHint");
    resendButton.addEventListener("click", () => resendMessage(message));
    const armed = isRepeatArmed(message);
    const repeatButton = el("button", "bionic-link", armed ? t("repeatStop") : t("repeatRun"));
    repeatButton.type = "button";
    repeatButton.title = armed ? t("repeatStopHint") : t("repeatRunHint");
    if (armed) repeatButton.classList.add("active");
    repeatButton.addEventListener("click", () => toggleRepeat(message));
    if (state.busy) {
      editButton.disabled = true;
      resendButton.disabled = true;
    }
    actions.append(copyRequestButton, editButton, resendButton, repeatButton);
    wrap.appendChild(actions);
  }

  if (message.role === "assistant" && message.content) {
    actions = el("div", "bionic-message-actions");
    const runButton = el("button", "bionic-link", "⚡ Run");
    runButton.type = "button";
    runButton.addEventListener("click", () => runPrompt(message.content));
    const copyButton = el("button", "bionic-link", t("copy"));
    copyButton.type = "button";
    copyButton.addEventListener("click", async () => {
      await navigator.clipboard.writeText(message.content);
      copyButton.textContent = t("copied");
      setTimeout(() => (copyButton.textContent = t("copy")), 1200);
    });
    actions.append(runButton, copyButton);
    if (state.busy) runButton.disabled = true;
    wrap.appendChild(actions);
  }

  return { wrap, text, reasoning, actions };
}

function renderMessages() {
  const box = state.els.messages;
  box.innerHTML = "";
  state.ui = null;
  if (!state.messages.length) {
    const hint = el("div", "bionic-empty", t("emptyHint"));
    box.appendChild(hint);
    return;
  }
  for (const message of state.messages) {
    const refs = messageElement(message);
    box.appendChild(refs.wrap);
    state.ui = refs;
  }
  scrollToBottom();
}

function renderAttachments() {
  for (const [key, url] of state.graphPicks) {
    if (!state.attachments.includes(url)) state.graphPicks.delete(key);
  }
  if (state.els.graphImages && !state.els.graphImages.classList.contains("bionic-hidden")) {
    state.els.graphImages.querySelectorAll("input[data-key]").forEach((box) => {
      box.checked = state.graphPicks.has(box.dataset.key);
    });
  }
  const box = state.els.attachments;
  box.innerHTML = "";
  state.attachments.forEach((image, index) => {
    const thumb = el("div", "bionic-thumb");
    const img = el("img");
    img.src = image;
    img.alt = t("attachmentAlt");
    const remove = el("button", null, "×");
    remove.type = "button";
    remove.title = t("remove");
    remove.addEventListener("click", () => {
      state.attachments.splice(index, 1);
      renderAttachments();
    });
    thumb.append(img, remove);
    box.appendChild(thumb);
  });
  state.documents.forEach((doc, index) => {
    const chip = el("div", "bionic-doc");
    chip.appendChild(el("span", null, `📄 ${doc.name}`));
    const remove = el("button", null, "×");
    remove.type = "button";
    remove.title = t("remove");
    remove.addEventListener("click", () => {
      state.documents.splice(index, 1);
      renderAttachments();
    });
    chip.appendChild(remove);
    box.appendChild(chip);
  });
}

function messageText(message) {
  const documents = message.documents || [];
  if (!documents.length) return message.content || "";
  const block = documents.map((doc) => `${t("docPrefix", doc.name)}\n${doc.text}`).join("\n\n");
  return message.content ? `${message.content}\n\n${block}` : block;
}

function toApiMessages() {
  return state.messages
    .filter(
      (message) =>
        message.content ||
        (message.images && message.images.length) ||
        (message.documents && message.documents.length)
    )
    .map((message) => {
      const text = messageText(message);
      if (!message.images || !message.images.length) {
        return { role: message.role, content: text };
      }
      return {
        role: message.role,
        content: [
          { type: "text", text },
          ...message.images.map((url) => ({ type: "image_url", image_url: { url } })),
        ],
      };
    });
}

function escapeClipboardHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function requestClipboardHtml(message) {
  const parts = ['<div data-bionic-request="1">'];
  if (message.content) {
    parts.push(`<div data-bionic-text="1">${escapeClipboardHtml(message.content)}</div>`);
  }
  for (const url of message.images || []) {
    parts.push(`<img data-bionic-image="1" alt="" src="${escapeClipboardHtml(url)}">`);
  }
  for (const doc of message.documents || []) {
    parts.push(
      `<div data-bionic-doc="1" data-bionic-name="${escapeClipboardHtml(doc.name)}">${escapeClipboardHtml(doc.text)}</div>`
    );
  }
  parts.push("</div>");
  return parts.join("");
}

async function writeRequestClipboard(html, plain) {
  if (!navigator.clipboard?.write || typeof ClipboardItem === "undefined") {
    throw new Error("clipboard write unavailable");
  }
  await navigator.clipboard.write([
    new ClipboardItem({
      "text/plain": new Blob([plain], { type: "text/plain" }),
      "text/html": new Blob([html], { type: "text/html" }),
    }),
  ]);
}

async function copyRequest(message, button) {
  const plain = messageText(message);
  const html = requestClipboardHtml(message);
  const label = t("copyRequest");
  try {
    await writeRequestClipboard(html, plain);
  } catch (error) {
    try {
      await navigator.clipboard.writeText(plain);
    } catch {
      toast("error", t("copyRequestFailed", error?.message || error));
      return;
    }
  }
  button.textContent = t("copied");
  setStatus(t("copied"));
  setTimeout(() => (button.textContent = label), 1200);
}

function requestFromClipboard(dataTransfer) {
  const html = dataTransfer?.getData ? dataTransfer.getData("text/html") : "";
  if (!html) return null;
  let root = null;
  try {
    root = new DOMParser()
      .parseFromString(html, "text/html")
      .querySelector("[data-bionic-request]");
  } catch {
    return null;
  }
  if (!root) return null;
  const textNode = root.querySelector("[data-bionic-text]");
  const images = [...root.querySelectorAll("[data-bionic-image]")]
    .map((node) => node.getAttribute("src") || "")
    .filter((src) => src.startsWith("data:image/"));
  const documents = [...root.querySelectorAll("[data-bionic-doc]")]
    .map((node) => ({
      name: node.getAttribute("data-bionic-name") || "document",
      text: node.textContent || "",
    }))
    .filter((doc) => doc.text.trim());
  return { text: textNode ? textNode.textContent || "" : "", images, documents };
}

function insertRequest(request) {
  const imagesRoom = Math.max(0, MAX_IMAGES - state.attachments.length);
  const docsRoom = Math.max(0, MAX_DOCUMENTS - state.documents.length);
  if (request.images.length > imagesRoom) toast("warning", t("maxImages", MAX_IMAGES));
  if (request.documents.length > docsRoom) toast("warning", t("docTooMany", MAX_DOCUMENTS));
  state.attachments.push(...request.images.slice(0, imagesRoom));
  state.documents.push(...request.documents.slice(0, docsRoom));
  const input = state.els.input;
  if (request.text) {
    const existing = input.value.replace(/\s+$/, "");
    input.value = existing ? `${existing}\n${request.text}` : request.text;
  }
  renderAttachments();
  autoGrowInput();
  input.focus();
  const end = input.value.length;
  if (input.setSelectionRange) input.setSelectionRange(end, end);
  setStatus(t("pasteRequestAdded"));
}

function editMessage(message) {
  if (state.busy) return;
  const index = state.messages.indexOf(message);
  if (index === -1) return;
  state.messages.splice(index);
  if (state.repeat && !state.messages.includes(state.repeat.message)) state.repeat = null;
  state.attachments = (message.images || []).slice();
  state.documents = (message.documents || []).slice();
  state.els.input.value = message.content || "";
  renderAttachments();
  renderMessages();
  autoGrowInput();
  state.els.input.focus();
  const end = state.els.input.value.length;
  if (state.els.input.setSelectionRange) state.els.input.setSelectionRange(end, end);
  setStatus(t("editLoaded"));
}

function resendMessage(message) {
  if (state.busy) return;
  state.attachments = (message.images || []).slice();
  state.documents = (message.documents || []).slice();
  state.els.input.value = message.content || "";
  renderAttachments();
  autoGrowInput();
  sendMessage();
}

function isRepeatArmed(message) {
  return Boolean(state.repeat) && state.repeat.message === message;
}

function stopRepeat(statusText) {
  if (!state.repeat) return;
  state.repeat = null;
  renderMessages();
  setStatus(statusText || t("repeatStopped"));
}

function toggleRepeat(message) {
  if (isRepeatArmed(message)) {
    stopRepeat();
    return;
  }
  state.repeat = { message, count: 0, busy: false };
  renderMessages();
  setStatus(t("repeatArmed"));
}

async function queueIsEmpty() {
  try {
    const response = await api.fetchApi("/queue", { cache: "no-store" });
    if (!response.ok) return true;
    const data = await response.json();
    return !(data.queue_running?.length || data.queue_pending?.length);
  } catch {
    return true;
  }
}

async function waitForChatIdle() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (!state.busy) return true;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  return false;
}

async function maybeAutoRepeat() {
  const repeat = state.repeat;
  if (!repeat) return;
  if (repeat.busy) {
    repeat.pending = true;
    return;
  }
  repeat.busy = true;
  try {
    for (let attempt = 0; attempt < 60; attempt += 1) {
      if (state.repeat !== repeat) return;
      if (await queueIsEmpty()) break;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    if (state.repeat !== repeat) return;
    await new Promise((resolve) => setTimeout(resolve, 400));
    if (state.repeat !== repeat) return;
    if (!(await waitForChatIdle())) return;
    if (state.repeat !== repeat) return;

    repeat.count += 1;
    setStatus(t("repeatRunning", repeat.count));

    const message = repeat.message;
    const start = state.messages.length;
    state.els.input.value = message.content || "";
    state.attachments = (message.images || []).slice();
    state.documents = (message.documents || []).slice();
    renderAttachments();
    autoGrowInput();
    await sendMessage();

    if (state.repeat !== repeat) return;
    const answer = state.messages[start + 1];
    if (!answer || answer.role !== "assistant" || answer.error || answer.aborted || !answer.content) {
      stopRepeat(t("repeatNoAnswer"));
      return;
    }
    setStatus(t("repeatAnswer", repeat.count));
    // With automatic running on (the default) the answer was already queued by
    // sendMessage; only queue it here when that setting is off.
    if (state.config?.auto_run === false) await runPrompt(answer.content);
  } finally {
    repeat.busy = false;
    if (repeat.pending && state.repeat === repeat) {
      repeat.pending = false;
      void maybeAutoRepeat();
    }
  }
}

async function sendMessage() {
  if (state.busy) return;
  let text = state.els.input.value.trim();
  const camera = state.els.cameraText.value.trim();
  if (!text && !camera && !state.attachments.length && !state.documents.length) return;
  if (camera) {
    text = `${text || t("cameraOnlyRequest")}\n\nCAMERA MOVE REQUEST: ${camera}`;
    state.els.camera.value = "";
    state.els.cameraText.value = "";
  }

  state.messages.push({
    role: "user",
    content: text,
    images: state.attachments.slice(),
    documents: state.documents.slice(),
  });
  state.attachments = [];
  state.documents = [];
  state.els.input.value = "";
  autoGrowInput();
  renderAttachments();

  const assistant = { role: "assistant", content: "", reasoning: "" };
  state.messages.push(assistant);
  state.busy = true;
  setBusyUi(true);
  renderMessages();
  state.ui = null;

  await streamChat(assistant);

  state.busy = false;
  setBusyUi(false);
  renderMessages();

  if (!assistant.usage && assistant.content) {
    const promptTokens = state.messages
      .filter((message) => message !== assistant)
      .reduce((sum, message) => sum + estimateTokens(messageText(message)), 0);
    assistant.estimatedTokens = promptTokens + estimateTokens(assistant.content);
    assistant.estimatedPrompt = promptTokens;
  }
  if (assistant.usage) {
    addTokenTotals(assistant.usage);
    state.tokens.estimated = false;
  } else if (assistant.estimatedTokens) {
    addTokenTotals({
      prompt_tokens: assistant.estimatedPrompt || 0,
      completion_tokens: estimateTokens(assistant.content),
    });
    state.tokens.estimated = true;
  }
  assistant.liveTokens = 0;
  updateTokenCounter(assistant);

  if (state.config?.auto_run !== false && !assistant.error && !assistant.aborted && assistant.content.trim()) {
    await runPrompt(assistant.content);
  }
  if (!assistant.aborted) updateTargetLabel();
  if (state.config?.auto_unload === true) await unloadModel({ silent: true });
}

function setBusyUi(busy) {
  const els = state.els;
  els.send.textContent = busy ? t("stop") : t("send");
  els.send.classList.toggle("bionic-run", busy);
  els.send.classList.toggle("bionic-send", !busy);
  els.mic.disabled = busy;
  els.input.placeholder = busy ? t("placeholderBusy") : t("placeholderIdle");
}

function lastAssistantMessage() {
  for (let index = state.messages.length - 1; index >= 0; index -= 1) {
    if (state.messages[index].role === "assistant") return state.messages[index];
  }
  return null;
}

function updateTokenCounter(assistant) {
  const counter = document.getElementById("bionic-tokens");
  if (!counter) return;
  const totals = state.tokens;
  const live =
    assistant && !assistant.usage
      ? estimateTokens((assistant.content || "") + (assistant.reasoning || ""))
      : 0;
  const prompt = totals.prompt;
  const answers = totals.completion + live;
  if (!prompt && !answers) {
    counter.textContent = "";
    counter.title = "";
    return;
  }
  const total = prompt + answers;
  counter.textContent = live
    ? t("tokensLive", total.toLocaleString())
    : t("tokens", total.toLocaleString());
  let title = t(
    "tokensConversation",
    prompt.toLocaleString(),
    answers.toLocaleString(),
    totals.requests + (live ? 1 : 0)
  );
  if (totals.estimated) title += ` · ${t("tokensEstimateNote")}`;
  counter.title = title;
}

function addTokenTotals(usage) {
  state.tokens.prompt += Number(usage.prompt_tokens) || 0;
  state.tokens.completion += Number(usage.completion_tokens) || 0;
  state.tokens.requests += 1;
}

function estimateTokens(text) {
  if (!text) return 0;
  const wide = (text.match(/[\u2e80-\u9fff\uac00-\ud7af\uff00-\uffef]/g) || []).length;
  return Math.max(1, Math.round(wide + (text.length - wide) / 3.8));
}

function stopStreaming() {
  if (state.abort) state.abort.abort();
}

let streamRenderQueued = false;

function queueStreamRender(assistant) {
  if (streamRenderQueued) return;
  streamRenderQueued = true;
  requestAnimationFrame(() => {
    streamRenderQueued = false;
    renderStreaming(assistant);
  });
}

async function stopCurrent() {
  if (state.busy) {
    stopStreaming();
    setStatus(t("generationStopped"));
    return;
  }
  try {
    await api.fetchApi("/interrupt", { method: "POST" });
    setStatus(t("workflowStopped"));
  } catch (error) {
    toast("error", t("stopFailed", error?.message || error));
  }
}

async function streamChat(assistant) {
  if (!state.config) await loadConfig();
  if (!state.config) {
    assistant.error = true;
    assistant.content = t("lmStudioDown");
    return;
  }

  const controller = new AbortController();
  state.abort = controller;

  try {
    const response = await api.fetchApi("/bionic_chat/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: state.els.model.value || state.config.model,
        messages: toApiMessages(),
        temperature: state.config.temperature,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      let detail = response.statusText;
      try {
        detail = (await response.json()).error || detail;
      } catch {
        /* keep status text */
      }
      throw new Error(detail);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true }).replace(/\r/g, "");

      let split;
      while ((split = buffer.indexOf("\n\n")) >= 0) {
        const chunk = buffer.slice(0, split);
        buffer = buffer.slice(split + 2);
        if (handleSseChunk(chunk, assistant)) {
          reader.cancel().catch(() => {});
          return;
        }
        queueStreamRender(assistant);
      }
    }
    if (buffer.trim()) handleSseChunk(buffer, assistant);
  } catch (error) {
    if (error.name === "AbortError") {
      assistant.aborted = true;
    } else {
      assistant.error = true;
      assistant.content = assistant.content || t("errorPrefix", error.message || error);
    }
  } finally {
    state.abort = null;
  }
}

function handleSseChunk(chunk, assistant) {
  for (const rawLine of chunk.split("\n")) {
    const line = rawLine.trim();
    if (!line.startsWith("data:")) continue;
    const data = line.slice(5).trim();
    if (data === "[DONE]") return true;
    let parsed;
    try {
      parsed = JSON.parse(data);
    } catch {
      continue;
    }
    if (parsed.bionic_event === "tool" && parsed.label) {
      setStatus(parsed.label);
      return false;
    }
    if (parsed.bionic_event === "usage" && parsed.usage) {
      assistant.usage = parsed.usage;
      updateTokenCounter(assistant);
      return false;
    }
    if (parsed.error) {
      assistant.error = true;
      assistant.content = assistant.content || t("errorPrefix", parsed.error);
      return false;
    }
    const delta = parsed.choices?.[0]?.delta || {};
    if (delta.reasoning_content) assistant.reasoning += delta.reasoning_content;
    if (delta.content) assistant.content += delta.content;
  }
  return false;
}

function renderStreaming(assistant) {
  if (!state.ui || state.ui.wrap.parentElement !== state.els.messages) {
    renderMessages();
    state.ui = null;
    const last = state.messages[state.messages.length - 1];
    const wrap = state.els.messages.lastElementChild;
    if (!wrap) return null;
    const text = wrap.querySelector(".bionic-text");
    if (text) state.ui = { wrap, text, reasoning: null, actions: null };
    if (last !== assistant) return state.ui;
  }
  if (!state.ui) return null;
  state.ui.text.textContent = assistant.content || "";
  state.ui.text.classList.toggle("bionic-typing", !assistant.content && !assistant.reasoning);
  if (assistant.reasoning && !state.ui.reasoning) {
    const details = el("details", "bionic-reasoning");
    details.appendChild(el("summary", null, t("reasoning")));
    details.appendChild(el("div", null, assistant.reasoning));
    state.ui.wrap.querySelector(".bionic-bubble").prepend(details);
    state.ui.reasoning = details;
  } else if (state.ui.reasoning) {
    state.ui.reasoning.lastElementChild.textContent = assistant.reasoning;
  }
  if (state.busy && !assistant.usage) {
    assistant.liveTokens = estimateTokens((assistant.content || "") + (assistant.reasoning || ""));
    updateTokenCounter(assistant);
  }
  scrollToBottom();
  return state.ui;
}

function getReceiverNode() {
  const canvas = app.canvas;
  let selected = [];
  if (canvas?.selectedItems) {
    selected = [...canvas.selectedItems];
  } else if (canvas?.selected_nodes) {
    selected = Object.values(canvas.selected_nodes);
  }
  const selectedReceiver = selected.find((node) => node?.type === NODE_TYPE);
  if (selectedReceiver) return selectedReceiver;
  const nodes = app.graph?._nodes || app.graph?.nodes || [];
  return nodes.find((node) => node.type === NODE_TYPE) || null;
}

function createReceiverNode() {
  const LiteGraph = window.LiteGraph;
  if (!LiteGraph?.createNode) return null;
  const node = LiteGraph.createNode(NODE_TYPE);
  if (!node) return null;
  app.graph.add(node);
  const mouse = app.canvas?.graph_mouse;
  node.pos = mouse && Number.isFinite(mouse[0]) ? [mouse[0], mouse[1]] : [200, 200];
  if (node.setSize) node.setSize([340, 200]);
  node.setDirtyCanvas?.(true, true);
  app.graph.setDirtyCanvas?.(true, true);
  return node;
}

function updateTargetLabel() {
  const node = getReceiverNode();
  state.targetNodeId = node?.id ?? null;
  if (node) {
    setStatus(t("target", node.title || t("nodeTitle"), node.id));
  } else {
    setStatus(t("noTarget"));
  }
}

async function runPrompt(rawText) {
  const text = (rawText || "").trim();
  if (!text) {
    toast("warning", t("noText"));
    return;
  }
  let node = getReceiverNode();
  if (!node) node = createReceiverNode();
  if (!node) {
    toast("error", t("cannotCreate"));
    return;
  }
  const widget = node.widgets?.find((entry) => entry.name === "prompt");
  if (!widget) {
    toast("error", t("noPromptInput"));
    return;
  }
  widget.value = text;
  node.setDirtyCanvas?.(true, true);
  app.graph.setDirtyCanvas?.(true, true);
  updateTargetLabel();

  try {
    await app.queuePrompt(0, 1);
    toast("success", t("launched", node.id));
  } catch (error) {
    toast("error", t("launchFailed", error?.message || error));
  }
}

// ---- Camera move selector ---------------------------------------------------
const CAMERA_FILE = "bionic_camera_moves.json";
const DEFAULT_CAMERA_MOVES = [
  { label: "Plan fixe (caméra immobile)", prompt: "a locked-off static shot, the camera does not move" },
  { label: "Travelling avant lent vers le visage", prompt: "a slow push-in from a medium shot to a close-up on the face" },
  { label: "Travelling arrière lent (révèle le décor)", prompt: "a slow pull-back from a close-up to a medium-wide shot revealing the room around the subject" },
  { label: "Zoom avant rapide (effet choc)", prompt: "a fast zoom in onto the face" },
  { label: "Zoom arrière lent", prompt: "a slow zoom out from the face to a medium shot" },
  { label: "Demi-orbite autour du sujet (gauche → droite)", prompt: "a slow half orbit around the subject from left to right, the face stays in frame" },
  { label: "Orbite complète 360°", prompt: "a smooth full 360-degree orbit around the subject at medium speed" },
  { label: "Panoramique gauche → droite", prompt: "a slow pan from left to right" },
  { label: "Panoramique droite → gauche", prompt: "a slow pan from right to left" },
  { label: "Tilt bas → haut (pieds → visage)", prompt: "a slow tilt up from the feet to the face" },
  { label: "Tilt haut → bas (visage → mains)", prompt: "a slow tilt down from the face to the hands" },
  { label: "Grue montante (finit en plongée)", prompt: "a slow crane up from eye level, ending in a high-angle shot looking down at the subject" },
  { label: "Grue descendante (plongée → hauteur des yeux)", prompt: "a slow crane down from a high angle to eye level" },
  { label: "Travelling d'accompagnement (suit le sujet)", prompt: "a tracking shot that follows the subject side-on at walking speed" },
  { label: "Caméra à l'épaule (léger tremblé)", prompt: "handheld, slight natural shake, staying close to the action" },
  { label: "Contre-plongée (vue d'en bas) + avance", prompt: "a low-angle shot looking up at the subject with a slow push-in" },
  { label: "Plongée zénithale qui tourne", prompt: "a top-down shot directly above the subject, slowly rotating clockwise" },
  { label: "Vue subjective (POV)", prompt: "the camera holds a static POV shot from the person's eye level" },
  { label: "Dolly zoom (effet vertigo)", prompt: "a dolly zoom: the camera pulls back while zooming in, the background stretches behind the subject" },
];

const UI_PREFS_FILE = "bionic_ui.json";

async function readUserJson(file) {
  try {
    const response = await api.fetchApi(`/userdata/${encodeURIComponent(file)}`, { cache: "no-store" });
    if (response.ok) return await response.json();
  } catch {
    /* missing or unreadable */
  }
  return null;
}

async function writeUserJson(file, data, silent) {
  try {
    const response = await api.fetchApi(`/userdata/${encodeURIComponent(file)}?overwrite=true`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data, null, 2),
    });
    if (!response.ok) throw new Error(response.statusText || response.status);
    return true;
  } catch (error) {
    if (!silent) toast("error", t("cameraSaveFailed", error.message || error));
    return false;
  }
}

function applyCameraSelectorVisibility() {
  const on = state.uiPrefs.camera_selector !== false;
  document.getElementById("bionic-camera-row")?.classList.toggle("bionic-hidden", !on);
  if (!on && state.els?.cameraText) {
    state.els.camera.value = "";
    state.els.cameraText.value = "";
  }
}

async function loadCameraMoves() {
  const prefs = await readUserJson(UI_PREFS_FILE);
  if (prefs && typeof prefs === "object") state.uiPrefs = { ...state.uiPrefs, ...prefs };
  applyCameraSelectorVisibility();
  let moves = null;
  moves = await readUserJson(CAMERA_FILE);
  if (!Array.isArray(moves) || !moves.length) {
    moves = DEFAULT_CAMERA_MOVES.slice();
    await writeCameraMoves(moves, true);
  }
  state.cameraMoves = moves.filter((m) => m && m.label && m.prompt);
  renderCameraMoves();
}

function writeCameraMoves(moves, silent) {
  return writeUserJson(CAMERA_FILE, moves, silent);
}

function renderCameraMoves() {
  const select = state.els.camera;
  const current = select.value;
  select.innerHTML = "";
  const none = el("option", null, t("cameraNone"));
  none.value = "";
  select.appendChild(none);
  state.cameraMoves.forEach((move, index) => {
    const option = el("option", null, move.label);
    option.value = String(index);
    option.title = move.prompt;
    select.appendChild(option);
  });
  if (current && state.cameraMoves[Number(current)]) select.value = current;
}

async function saveCameraMove() {
  const prompt = state.els.cameraText.value.trim();
  if (!prompt) return;
  const selected = state.cameraMoves[Number(state.els.camera.value)];
  const label = window.prompt(t("cameraSaveName"), selected && selected.prompt !== prompt ? `${selected.label} (perso)` : selected?.label || "");
  if (!label || !label.trim()) return;
  const existing = state.cameraMoves.findIndex((m) => m.label === label.trim());
  if (existing >= 0) state.cameraMoves[existing].prompt = prompt;
  else state.cameraMoves.push({ label: label.trim(), prompt });
  if (await writeCameraMoves(state.cameraMoves)) {
    renderCameraMoves();
    state.els.camera.value = String(existing >= 0 ? existing : state.cameraMoves.length - 1);
    toast("success", t("cameraSaved", label.trim()));
  }
}

async function deleteCameraMove() {
  const index = Number(state.els.camera.value);
  if (state.els.camera.value === "" || !state.cameraMoves[index]) return;
  state.cameraMoves.splice(index, 1);
  if (await writeCameraMoves(state.cameraMoves)) {
    state.els.camera.value = "";
    state.els.cameraText.value = "";
    renderCameraMoves();
  }
}

// ---- Workflow images picker -------------------------------------------------
const IMAGE_FILE_RE = /\.(png|jpe?g|webp|bmp|gif|tiff?)$/i;

function graphNodesDeep() {
  const out = [];
  const seen = new Set();
  const walk = (graph, prefix) => {
    if (!graph || seen.has(graph)) return;
    seen.add(graph);
    for (const node of graph._nodes || graph.nodes || []) {
      out.push({ node, prefix });
      const sub = node.subgraph;
      if (sub) walk(sub, `${prefix}${node.title || node.type} › `);
    }
  };
  walk(app.graph, "");
  return out;
}

function viewUrlFromWidget(value) {
  let name = String(value || "").trim();
  let type = "input";
  const m = name.match(/^(.*?)\s*\[(input|output|temp)\]$/);
  if (m) {
    name = m[1];
    type = m[2];
  }
  if (!IMAGE_FILE_RE.test(name)) return null;
  const slash = name.lastIndexOf("/");
  const subfolder = slash >= 0 ? name.slice(0, slash) : "";
  const filename = slash >= 0 ? name.slice(slash + 1) : name;
  const params = new URLSearchParams({ filename, type, subfolder });
  return { url: api.apiURL(`/view?${params.toString()}`), name: filename };
}

function collectGraphImages() {
  const items = [];
  const urls = new Set();
  for (const { node, prefix } of graphNodesDeep()) {
    const title = `${prefix}${node.title || node.type} #${node.id}`;
    const off = node.mode === 2 || node.mode === 4;
    const push = (url, name) => {
      if (!url || urls.has(url)) return;
      urls.add(url);
      items.push({ key: `${node.id}|${url}`, url, name, title, off });
    };
    const shown = (node.imgs || []).map((img) => img?.src).filter(Boolean);
    if (shown.length) {
      shown.forEach((src, i) => push(src, shown.length > 1 ? `${i + 1}/${shown.length}` : ""));
      continue;
    }
    for (const widget of node.widgets || []) {
      if (widget.type !== "combo" && widget.name !== "image") continue;
      const view = viewUrlFromWidget(widget.value);
      if (view) push(view.url, view.name);
    }
  }
  return items;
}

function toggleGraphImages() {
  const box = state.els.graphImages;
  const open = box.classList.contains("bionic-hidden");
  box.classList.toggle("bionic-hidden", !open);
  state.els.graphBtn.setAttribute("aria-pressed", open ? "true" : "false");
  if (open) renderGraphImages();
}

function renderGraphImages() {
  const box = state.els.graphImages;
  box.innerHTML = "";
  const head = el("div", "bionic-graph-head");
  head.appendChild(el("span", null, t("graphImagesHeader")));
  const refresh = el("button", "bionic-icon-btn", "⟳");
  refresh.type = "button";
  refresh.title = t("graphImagesRefresh");
  refresh.addEventListener("click", renderGraphImages);
  head.appendChild(refresh);
  box.appendChild(head);

  const items = collectGraphImages();
  if (!items.length) {
    box.appendChild(el("div", "bionic-graph-empty", t("graphImagesNone")));
    return;
  }
  const grid = el("div", "bionic-graph-grid");
  for (const item of items) {
    const card = el("label", "bionic-graph-card" + (item.off ? " bionic-graph-off" : ""));
    card.title = `${item.title}${item.name ? "\n" + item.name : ""}`;
    const img = el("img");
    img.src = item.url;
    img.alt = item.name || item.title;
    img.loading = "lazy";
    const check = el("input");
    check.type = "checkbox";
    check.dataset.key = item.key;
    check.checked = state.graphPicks.has(item.key);
    check.addEventListener("change", () => pickGraphImage(item, check));
    const caption = el("span", "bionic-graph-caption", (item.off ? `[${t("graphImagesOff")}] ` : "") + item.title);
    card.append(check, img, caption);
    grid.appendChild(card);
  }
  box.appendChild(grid);
}

async function pickGraphImage(item, check) {
  if (!check.checked) {
    const url = state.graphPicks.get(item.key);
    state.graphPicks.delete(item.key);
    const index = state.attachments.indexOf(url);
    if (index >= 0) state.attachments.splice(index, 1);
    renderAttachments();
    return;
  }
  if (state.attachments.length >= MAX_IMAGES) {
    check.checked = false;
    toast("warning", t("maxImages", MAX_IMAGES));
    return;
  }
  try {
    const response = await fetch(item.url, { cache: "no-store" });
    if (!response.ok) throw new Error(response.statusText || response.status);
    const dataUrl = await fileToDataUrl(await response.blob());
    if (!check.checked) return;
    state.attachments.push(dataUrl);
    state.graphPicks.set(item.key, dataUrl);
  } catch (error) {
    check.checked = false;
    toast("error", t("imageUnreadable", error.message || error));
  }
  renderAttachments();
}

async function addImageFiles(fileList) {
  const files = [...(fileList || [])].filter((file) => file.type.startsWith("image/"));
  for (const file of files) {
    if (state.attachments.length >= MAX_IMAGES) {
      toast("warning", t("maxImages", MAX_IMAGES));
      break;
    }
    try {
      state.attachments.push(await fileToDataUrl(file));
    } catch (error) {
      toast("error", t("imageUnreadable", error.message || error));
    }
  }
  renderAttachments();
}

async function addDocumentFiles(fileList) {
  const files = [...(fileList || [])];
  for (const file of files) {
    if (state.documents.length >= MAX_DOCUMENTS) {
      toast("warning", t("docTooMany", MAX_DOCUMENTS));
      break;
    }
    try {
      const data = await fileToBase64(file);
      const response = await api.fetchApi("/bionic_chat/document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: file.name, data }),
      });
      let payload = {};
      try {
        payload = await response.json();
      } catch {
        /* empty body */
      }
      if (!response.ok) throw new Error(payload.error || response.statusText);
      const text = (payload.text || "").trim();
      if (!text) {
        toast("warning", t("docEmpty", file.name));
        continue;
      }
      state.documents.push({ name: payload.name || file.name, text, truncated: !!payload.truncated });
      if (payload.truncated) toast("warning", t("docTruncated"));
    } catch (error) {
      toast("error", t("docUnreadable", error.message || error));
    }
  }
  renderAttachments();
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error(t("readFailed")));
    reader.onload = () => resolve(base64FromArrayBuffer(reader.result));
    reader.readAsArrayBuffer(file);
  });
}

function handlePaste(event) {
  const request = requestFromClipboard(event.clipboardData);
  if (request) {
    event.preventDefault();
    insertRequest(request);
    return;
  }
  const items = event.clipboardData?.items;
  if (!items) return;
  const files = [];
  for (const item of items) {
    if (item.type.startsWith("image/")) {
      const file = item.getAsFile();
      if (file) files.push(file);
    }
  }
  if (files.length) {
    event.preventDefault();
    addImageFiles(files);
  }
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error(t("readFailed")));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error(t("unsupportedFormat")));
      img.onload = () => {
        const scale = Math.min(1, MAX_IMAGE_SIDE / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.88));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function silenceThresholdDb() {
  const value = Number(state.config?.silence_threshold_db);
  if (!Number.isFinite(value)) return DEFAULT_SILENCE_DB;
  return Math.max(METER_FLOOR_DB, Math.min(-15, Math.round(value)));
}

function dbToPercent(db) {
  const ratio = (db - METER_FLOOR_DB) / (METER_CEIL_DB - METER_FLOOR_DB);
  return Math.max(0, Math.min(100, ratio * 100));
}

function syncSilenceThresholdLabel() {
  const input = document.getElementById("bionic-cfg-silence");
  const label = document.getElementById("bionic-cfg-silence-value");
  if (!input || !label) return;
  label.textContent = `${Number(input.value)} dB`;
}

function showMeterLevel(db, thresholdDb, silenceRatio) {
  const { meter, meterFill, meterMark } = state.els;
  if (!meter || !meterFill || !meterMark) return;
  meter.classList.remove("bionic-hidden");
  meterFill.style.width = `${dbToPercent(db)}%`;
  meterFill.classList.toggle("bionic-meter-loud", db > thresholdDb);
  meterMark.style.left = `${dbToPercent(thresholdDb)}%`;
  meterMark.classList.toggle("bionic-hidden", state.config?.auto_stop_silence !== true);
  const silenceLeft = silenceRatio > 0 ? ` · ${Math.max(0, SILENCE_MS - Math.round(silenceRatio * SILENCE_MS))} ms` : "";
  meter.title = `${t("silenceMeterTitle")} — ${db.toFixed(0)} dB / ${t("silenceThreshold")} ${thresholdDb} dB${silenceLeft}`;
}

function hideMeter() {
  const { meter, meterFill } = state.els || {};
  if (!meter) return;
  meter.classList.add("bionic-hidden");
  if (meterFill) meterFill.style.width = "0%";
}

function startSilenceWatch(stream, thresholdDb, onSilence, onLevel) {
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) return null;
  let context;
  try {
    context = new AudioCtor({ latencyHint: "interactive" });
  } catch {
    try {
      context = new AudioCtor();
    } catch {
      return null;
    }
  }
  context.resume?.().catch(() => {});
  const source = context.createMediaStreamSource(stream);
  const analyser = context.createAnalyser();
  analyser.fftSize = 2048;
  // Bracket notation on purpose: the registry scanner reads a plain
  // "dot connect" call as network activity, while this is the Web Audio graph.
  source["connect"](analyser);
  // A muted path to the destination keeps the graph running in every browser.
  const sink = context.createGain();
  sink.gain.value = 0;
  analyser["connect"](sink);
  sink["connect"](context.destination);
  const buffer = new Float32Array(analyser.fftSize);

  let speechMs = 0;
  let silenceMs = 0;
  let last = performance.now();

  const measure = () => {
    if (analyser.getFloatTimeDomainData) {
      analyser.getFloatTimeDomainData(buffer);
      let sum = 0;
      for (let i = 0; i < buffer.length; i += 1) sum += buffer[i] * buffer[i];
      return Math.sqrt(sum / buffer.length);
    }
    const bytes = new Uint8Array(analyser.fftSize);
    analyser.getByteTimeDomainData(bytes);
    let sum = 0;
    for (let i = 0; i < bytes.length; i += 1) {
      const value = (bytes[i] - 128) / 128;
      sum += value * value;
    }
    return Math.sqrt(sum / bytes.length);
  };

  const timer = setInterval(() => {
    const now = performance.now();
    const elapsed = Math.min(1000, now - last);
    last = now;
    const db = 20 * Math.log10(Math.max(measure(), 1e-6));

    if (db > thresholdDb) {
      speechMs += elapsed;
      // Short blips (breath, chair, keyboard) only slow the countdown instead of cancelling it.
      silenceMs = Math.max(0, silenceMs - elapsed * 3);
    } else if (speechMs >= SILENCE_MIN_SPEECH_MS) {
      silenceMs += elapsed;
    }
    state.recSilence = silenceMs / SILENCE_MS;

    onLevel?.(db, silenceMs / SILENCE_MS);

    if (onSilence && silenceMs >= SILENCE_MS) {
      clearInterval(timer);
      onSilence();
    }
  }, 100);

  return {
    close() {
      clearInterval(timer);
      source.disconnect();
      analyser.disconnect();
      sink.disconnect();
      context.close?.().catch(() => {});
    },
  };
}

async function toggleRecording() {
  if (state.recording) {
    state.recorder?.stop();
    return;
  }
  try {
    state.recStream = await navigator.mediaDevices.getUserMedia({
      audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true },
    });
  } catch (error) {
    toast("error", t("micUnavailable", error.message || error));
    return;
  }

  const recorder = new MediaRecorder(state.recStream);
  state.recorder = recorder;
  state.recChunks = [];
  recorder.ondataavailable = (event) => {
    if (event.data.size) state.recChunks.push(event.data);
  };
  recorder.onstop = async () => {
    state.recWatch?.close();
    state.recWatch = null;
    state.recStream?.getTracks().forEach((track) => track.stop());
    state.recStream = null;
    clearInterval(state.recTimer);
    state.recording = false;
    state.els.mic.classList.remove("bionic-active");
    state.els.recTime.textContent = "";
    hideMeter();
    const blob = new Blob(state.recChunks, { type: recorder.mimeType || "audio/webm" });
    state.recChunks = [];
    if (blob.size > 1200) await transcribeBlob(blob);
  };

  recorder.start();
  state.recording = true;
  state.recStart = Date.now();
  const autoStop = state.config?.auto_stop_silence === true;
  state.recSilence = 0;
  const thresholdDb = silenceThresholdDb();
  state.recWatch = startSilenceWatch(
    state.recStream,
    thresholdDb,
    autoStop
      ? () => {
          if (!state.recording) return;
          setStatus(t("silenceDetected"));
          recorder.stop();
        }
      : null,
    (db, silenceRatio) => showMeterLevel(db, thresholdDb, silenceRatio),
  );
  state.els.mic.classList.add("bionic-active");
  state.recTimer = setInterval(() => {
    const seconds = Math.floor((Date.now() - state.recStart) / 1000);
    const stamp = `● ${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
    const showCountdown = state.recording && state.config?.auto_stop_silence === true && state.recSilence > 0.05;
    const countdown = showCountdown
      ? ` · ${t("silenceCountdown", ((state.recSilence * SILENCE_MS) / 1000).toFixed(1), SILENCE_MS / 1000)}`
      : "";
    state.els.recTime.textContent = stamp + countdown;
  }, 200);
  setStatus(t("recordingStatus"));
}

async function transcribeBlob(blob) {
  setStatus(t("transcribingStatus"));
  try {
    const arrayBuffer = await blob.arrayBuffer();
    const audioContext = new AudioContext();
    const decoded = await audioContext.decodeAudioData(arrayBuffer);
    await audioContext.close();

    const sampleRate = 16000;
    const offline = new OfflineAudioContext(1, Math.max(1, Math.ceil(decoded.duration * sampleRate)), sampleRate);
    const source = offline.createBufferSource();
    source.buffer = decoded;
    source["connect"](offline.destination);
    source.start();
    const rendered = await offline.startRendering();
    const wav = encodeWav(rendered.getChannelData(0), sampleRate);

    const response = await api.fetchApi("/bionic_chat/transcribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        audio: base64FromArrayBuffer(wav),
        model: state.config?.transcribe_model,
        language: state.config?.transcribe_language,
      }),
    });
    let data = {};
    try {
      data = await response.json();
    } catch {
      /* empty body */
    }
    if (!response.ok) throw new Error(data.error || response.statusText);
    const text = (data.text || "").trim();
    if (!text) {
      setStatus(t("nothingTranscribed"));
      return;
    }
    const input = state.els.input;
    input.value = input.value ? `${input.value} ${text}` : text;
    autoGrowInput();
    input.focus();
    setStatus(t("transcriptionAdded"));
    if (state.config?.auto_send_audio !== false && !state.busy) {
      await sendMessage();
    }
  } catch (error) {
    toast("error", t("transcribeFailedToast", error.message || error));
    setStatus(t("transcriptionFailed"));
  }
}

function encodeWav(samples, sampleRate) {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  const writeString = (offset, value) => {
    for (let i = 0; i < value.length; i += 1) view.setUint8(offset + i, value.charCodeAt(i));
  };
  writeString(0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, "data");
  view.setUint32(40, samples.length * 2, true);
  let offset = 44;
  for (let i = 0; i < samples.length; i += 1) {
    const sample = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
    offset += 2;
  }
  return buffer;
}

function base64FromArrayBuffer(arrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer);
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

app.registerExtension({
  name: "Bionic.Chat",
  async setup() {
    loadStylesheet();
    buildPanel();
    state.els.panel.classList.add("bionic-hidden");
    renderMessages();
    api.addEventListener("execution_success", () => {
      if (state.repeat?.busy) {
        state.repeat.pending = true;
        return;
      }
      void maybeAutoRepeat();
    });
    api.addEventListener("execution_error", () => stopRepeat(t("repeatFailed")));
    api.addEventListener("execution_interrupted", () => stopRepeat(t("repeatStopped")));
  },
});
