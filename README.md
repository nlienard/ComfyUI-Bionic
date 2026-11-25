# ComfyUI-Bionic

[English](README.en.md) · **Français**

Un tchat façon Bionic directement dans ComfyUI : il parle à n'importe quel serveur local compatible OpenAI (LM Studio, Ollama, llama.cpp), accepte le texte, la voix, les images et les documents, compte les tokens de toute la conversation, et pousse le prompt dans une node qui lance le workflow.

## Sommaire

- [Fonctionnalités](#fonctionnalités)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Démarrage rapide](#démarrage-rapide)
- [Le panneau](#le-panneau)
- [Audio et détection de silence](#audio-et-détection-de-silence)
- [Compteur de tokens](#compteur-de-tokens)
- [Déchargement du modèle](#déchargement-du-modèle)
- [Réglages](#réglages)
- [Node et workflow](#node-et-workflow)
- [Accès Internet](#accès-internet)
- [Fonctionnement](#fonctionnement)
- [Limites](#limites)
- [Dépannage](#dépannage)

## Fonctionnalités

- Panneau de chat flottant branché sur un serveur local compatible OpenAI : LM Studio, Ollama, llama.cpp ou toute autre adresse.
- Sélecteur de **prompt système** à côté du modèle : passe d'un prompt enregistré à l'autre sans ouvrir les réglages.
- Interface en français ou en anglais, réglable dans ⚙ (langue du panneau et de la node).
- Réponses en streaming, raisonnement repliable, choix du modèle dans le panneau.
- Entrée vision : bouton 🖼, collage `Ctrl+V` ou glisser-déposer, jusqu'à 6 images par message, redimensionnées à 1280 px de côté maximum.
- Documents : bouton ＋ pour joindre des **PDF**, **DOCX** ou fichiers texte (TXT, MD, CSV, JSON…), envoyés au modèle comme contexte.
- Entrée audio : bouton 🎙, enregistrement du micro et transcription locale (faster-whisper), avec envoi automatique de la transcription.
- Arrêt automatique de l'enregistrement après 2 secondes de silence, avec un **vumètre** du micro et un **seuil de silence réglable**.
- Boutons `⧉ Copier`, `✎ Éditer`, `↻ Renvoyer` et `🔁 Répéter` sous chaque message : `Copier` met la demande complète (texte, images et documents joints) dans le presse-papiers pour la recoller telle quelle, `Éditer` remet la demande (texte, images, documents) dans la saisie et retire les échanges suivants pour la corriger, `Renvoyer` rejoue la demande à l'identique, `Répéter` la renvoie dans le chat à chaque fin de run ComfyUI et relance la nouvelle réponse, jusqu'à un clic sur `⏹ Arrêter`.
- Compteur de tokens **cumulatif** sur toute la conversation, avec le détail contexte / réponses au survol.
- Bouton ⏹ pour arrêter la réponse en cours ou le workflow lancé.
- Bouton ⏏ pour **décharger le modèle** de la mémoire, quel que soit le serveur, avec une option de déchargement automatique après chaque réponse.
- Node **Bionic Chat Prompt** : reçoit le prompt du chat et le sort en `STRING`.
- Bouton `⚡ Run` : écrit le prompt dans la node puis lance le workflow, comme le bouton Run de ComfyUI.
- Lancement automatique du workflow dès que le modèle a terminé sa réponse (actif par défaut, désactivable).
- Accès Internet : le modèle peut chercher sur le Web et ouvrir des pages pour répondre (désactivé par défaut).

## Prérequis

- ComfyUI (testé avec la version 0.45).
- Un serveur local compatible OpenAI, avec au moins un modèle de chat :

| Serveur | Adresse par défaut | Mise en route |
|---|---|---|
| LM Studio | `http://127.0.0.1:1234/v1` | onglet Developer → *Start server* |
| Ollama | `http://127.0.0.1:11434/v1` | `ollama serve` |
| llama.cpp | `http://127.0.0.1:9931/v1` | `llama-server -m modele.gguf` (port 8080 sur les anciennes versions, `--port` pour le changer) |

Ces trois adresses sont proposées en préréglage dans ⚙, et le champ reste librement modifiable : n'importe quel serveur exposant `/chat/completions` fait l'affaire.

## Installation

```bash
cd ComfyUI/custom_nodes
git clone https://github.com/Verolelb/ComfyUI-Bionic.git
```

Installe la dépendance de transcription dans le Python utilisé par ComfyUI :

```bash
# installation portable Windows
../../../python_embeded/python.exe -m pip install -r ComfyUI-Bionic/requirements.txt

# installation classique
pip install -r ComfyUI-Bionic/requirements.txt
```

Redémarre ComfyUI : le bouton `💬 Bionic` apparaît en bas à droite de l'interface.

Le modèle Whisper `small` (~480 Mo) est téléchargé automatiquement à la première utilisation du micro ; la taille et la langue se règlent dans ⚙.

Les documents PDF et DOCX sont optionnels et demandent `pypdf` (ou `PyPDF2`) et `python-docx` :

```bash
../../../python_embeded/python.exe -m pip install pypdf python-docx
```

## Démarrage rapide

1. Ouvre le panneau avec `💬 Bionic`, puis ⚙ : choisis le serveur (LM Studio / Ollama / llama.cpp) et vérifie l'adresse.
2. Choisis un modèle dans la liste déroulante du panneau.
3. Ajoute la node **Bionic Chat Prompt** (clic droit → Add Node → Bionic) et relie sa sortie `prompt` à l'entrée `text` d'un CLIP Text Encode.
4. Écris ton prompt, joins éventuellement images, documents ou dictée, puis envoie : à la fin du streaming, le prompt est écrit dans la node et le workflow est lancé.

Si aucune node **Bionic Chat Prompt** n'est présente dans le graphe, elle est créée automatiquement au premier Run.

## Le panneau

| Élément | Rôle |
|---|---|
| `💬 Bionic` | ouvre ou referme le panneau |
| `⚙` | réglages (serveur, prompt système, options, transcription) |
| liste à côté du modèle | prompt système actif, choisi parmi les prompts enregistrés dans ⚙ (« prompt système personnalisé » si le texte actuel n'en est aucun) |
| `＋` | nouvelle conversation : vide l'historique et remet le compteur de tokens à zéro |
| `🖼` | joint une ou plusieurs images |
| `＋` dans la barre d'outils | joint un document (PDF, DOCX, texte) |
| `🎙` | démarre ou arrête l'enregistrement du micro |
| `🌐` | active ou désactive l'accès Internet du modèle |
| `⏏` | décharge le modèle chargé sur le serveur |
| `⏹` | arrête la réponse en cours, ou le workflow qui tourne |
| `⚡ Run` | envoie le texte dans la node et lance le workflow |
| `Envoyer` | envoie le message au modèle |

Le raisonnement éventuel s'affiche dans un bloc repliable au-dessus de la réponse, et un bouton `Copier` accompagne chaque réponse. Sous chacun de tes propres messages, `✎ Éditer` recharge la demande dans la saisie — le message est retiré avec tout ce qui le suivait, à toi de corriger puis d'envoyer — et `↻ Renvoyer` rejoue la demande à l'identique, images et documents compris. Le bouton `⧉ Copier`, placé à côté de `✎ Éditer`, copie la demande entière — texte, images et documents — : recollée dans la saisie avec `Ctrl+V`, elle revient à l'identique ; collée dans un autre logiciel, elle donne le texte et le contenu des documents. Le bouton `🔁 Répéter` met la demande en boucle : dès qu'un run ComfyUI se termine, la demande repart dans le chat comme si tu venais de l'écrire, la réponse du modèle est envoyée aussitôt au workflow, et ainsi de suite ; `⏹ Arrêter`, un run en erreur, un run interrompu ou une réponse vide mettent fin à la répétition.

## Audio et détection de silence

Le bouton 🎙 enregistre le micro, puis le serveur transcrit l'audio localement avec faster-whisper (CPU, `int8`). Le texte est ajouté au champ de saisie ; si l'option **Envoi automatique de la transcription** est active, le message part tout seul, et le workflow suit si le lancement automatique est actif.

**Arrêt sur silence** (désactivé par défaut) : avec l'option cochée, l'enregistrement s'arrête après **2 secondes de silence**, puis la transcription, l'envoi et le workflow s'enchaînent sans toucher au clavier.

Pendant l'enregistrement, un **vumètre** apparaît à côté du chrono :

- la barre suit le niveau mesuré et devient **verte** quand tu parles ;
- un **trait rouge** matérialise le seuil de silence ;
- le chrono affiche le décompte, par exemple `● 00:03 · silence 1,2/2 s` ;
- le survol du vumètre donne le niveau courant en dB.

Le **seuil de silence** se règle dans ⚙ (curseur de **-70 dB à -15 dB**, **-45 dB** par défaut) :

- le silence n'est jamais détecté, ou le décompte ne démarre pas : **baisse** le seuil ;
- ça coupe pendant que tu parles, ou le bruit de fond suffit à relancer le décompte : **monte** le seuil.

La détection demande au moins 0,5 s de parole avant de s'armer, et un bruit bref (respiration, clavier) ne remet pas le décompte à zéro : il le ralentit seulement.

## Compteur de tokens

- Le chiffre affiché est le **cumul de la conversation** : tout le contexte envoyé plus toutes les réponses générées, toutes demandes confondues. Il ne repart pas de zéro à chaque message.
- Pendant une génération, il progresse en estimation (`≈ 837 tok`), puis se fige sur le total exact quand le serveur annonce son `usage`.
- L'infobulle donne le détail : « Cumul de la conversation — contexte : 645 · réponses : 192 · 3 demande(s) ». Elle précise « estimation » quand le serveur n'a pas renvoyé d'`usage`.
- Il est remis à zéro par le bouton ＋ (nouvelle conversation).

## Déchargement du modèle

Le bouton ⏏ interroge le serveur configuré et choisit la bonne méthode selon le backend :

| Serveur | Méthode utilisée |
|---|---|
| LM Studio 0.4+ | `GET /api/v1/models` pour trouver les instances chargées, puis `POST /api/v1/models/unload` |
| llama.cpp (mode routeur uniquement) | `POST /models/unload` |
| Ollama | `POST /api/generate` avec `keep_alive: 0` |

Le panneau affiche le backend et le modèle déchargés, puis rafraîchit la liste des modèles. Un serveur qui n'expose aucune de ces routes reçoit un message explicite (LM Studio 0.4+, Ollama, ou llama.cpp en mode routeur sont nécessaires).

Un `llama-server` lancé avec un modèle en `-m` n'a **aucune** route de déchargement : le modèle est le processus lui-même. Bionic reconnaît ce cas (`GET /props` répond alors avec `model_path`) et le dit, au lieu du message générique. Pour retrouver le bouton ⏏, relance-le en mode routeur (sans `-m`, avec `--models-dir <dossier>` ou `--models-preset <fichier.ini>`) ; l'id du modèle devient alors son nom de fichier, à re-sélectionner une fois dans le panneau. Sinon, `--sleep-idle-seconds 600` libère le modèle après inactivité, dans les deux modes.

L'option **Décharger automatiquement le modèle après chaque réponse** fait la même chose sans clic, après chaque réponse du modèle et après chaque `⚡ Run` : le GPU est rendu à ComfyUI tout de suite, au prix d'un rechargement du modèle au message suivant.

## Réglages

Le bouton ⚙ du panneau permet de modifier :

| Réglage | Défaut | Rôle |
|---|---|---|
| Langue de l'interface | français | panneau et messages de la node |
| Adresse prédéfinie | — | LM Studio / Ollama / llama.cpp / personnalisée |
| Serveur (OpenAI compatible) | `http://127.0.0.1:1234/v1` | adresse libre, `/chat/completions` ajouté si besoin |
| Prompt système | prompt Bionic | jusqu'à **128 000 caractères** |
| Température | `0.8` | créativité du modèle |
| Tokens maximum par réponse | `8192` | longueur maximale d'une réponse, de 256 à 32768 |
| Lancer automatiquement le workflow après la réponse | activé | enchaîne le Run après le streaming |
| Envoi automatique de la transcription après le micro | activé | envoie le texte dicté sans clic |
| Arrêter l'enregistrement après 2 s de silence | désactivé | coupe le micro tout seul |
| Seuil de silence | `-45 dB` | de `-70 dB` à `-15 dB` |
| Décharger automatiquement le modèle après chaque réponse | désactivé | libère la mémoire GPU |
| Accès Internet (recherche web + ouverture d'URL) | désactivé | outils web côté serveur |
| Modèle de transcription audio | `small` | `tiny`, `base`, `small`, `medium`, `large-v3` |
| Langue de la transcription | français | français, anglais, détection auto, espagnol, allemand, italien |

Les réglages sont enregistrés dans `bionic_chat/config.json`, dans le dossier `user` de ComfyUI. Le modèle choisi y est également stocké, mais il se sélectionne dans la liste du panneau.

Le prompt système se garde sous un nom : saisis le nom à côté du champ, clique 💾, puis retrouve-le dans la liste juste en dessous pour le recharger (`Charger`) ou le supprimer (🗑). Ces prompts nommés sont conservés dans `bionic_chat/prompts.json`.

Une valeur déjà enregistrée n'est jamais écrasée : venant d'une version antérieure, le champ des tokens peut encore afficher `4096`, c'est à toi de le relever. Une valeur supérieure à la fenêtre de contexte du modèle fait répondre une erreur au serveur.

**Après une mise à jour du dépôt, redémarre ComfyUI** : le serveur Python doit relire `bionic_server.py` pour accepter les nouveaux réglages. Un simple rafraîchissement de page ne suffit que pour l'interface.

## Node et workflow

- La node **Bionic Chat Prompt** (catégorie `Bionic`) expose une entrée `prompt` multiligne et une sortie `STRING` nommée `prompt`.
- `⚡ Run` écrit le prompt dans la node, puis met le workflow en file comme le bouton Run de ComfyUI.
- Avec le lancement automatique, la même chose se produit dès la fin du streaming, sans clic.
- `⏹` coupe la génération en cours ; utilisé alors que rien n'est en génération, il interrompt le workflow en train de tourner.

## Accès Internet

Quand 🌐 est actif (bouton du panneau ou réglage ⚙), le serveur donne au modèle deux outils :

- `web_search` : recherche Bing sans clé d'API, avec repli DuckDuckGo ;
- `open_url` : lecture du texte d'une page, pour aller au-delà d'un extrait.

Le serveur exécute la boucle d'appels d'outils (3 tours maximum, puis réponse forcée en texte) et additionne les tokens de tous les tours. Les adresses locales et privées sont refusées, pour éviter qu'un modèle aille interroger le réseau interne.

## Fonctionnement

- `nodes.py` : node `BionicChatPrompt` (sortie `STRING`).
- `bionic_server.py` : routes `/bionic_chat/config`, `/bionic_chat/prompts` (prompts système nommés), `/bionic_chat/chat` (proxy streaming vers le serveur configuré), `/bionic_chat/transcribe` (Whisper local), `/bionic_chat/document` (lecture PDF / DOCX / texte) et `/bionic_chat/unload` (libération du modèle).
- `web/bionic_chat.js` et `web/bionic_chat.css` : panneau de chat, enregistrement audio, vumètre et détection de silence, pièces jointes, compteur cumulatif et déclenchement du workflow.
- Le micro est envoyé en WAV mono 16 kHz ; le serveur ramène l'audio à ce format avant la transcription.
- Le compteur lit le champ `usage` du serveur (`stream_options: {include_usage: true}`) ; sans `usage`, une estimation est utilisée.

## Limites

- La transcription démarre après l'arrêt de l'enregistrement : pas de transcription mot-à-mot en temps réel.
- La transcription tourne sur le CPU en `int8` ; le modèle `small` reste rapide, `medium` et `large-v3` sont nettement plus lents.
- Les PDF demandent `pypdf` ou `PyPDF2`, les DOCX demandent `python-docx` : sans ces modules, ces formats sont refusés (les fichiers texte passent toujours).
- Documents limités à 3 par message, 20 Mo et 60 000 caractères chacun ; audio limité à 30 Mo par enregistrement.
- L'historique de conversation n'est pas conservé entre deux rechargements de page (le compteur repart donc de zéro).
- Le compteur dépend de l'`usage` renvoyé par le serveur ; sinon il s'agit d'une estimation (~3,8 caractères par token).
- Le déchargement n'est possible que si le serveur l'expose : un `llama-server` lancé avec un modèle unique (`-m`, sans mode routeur) ne propose pas `/models/unload` ; le panneau le signale et indique comment le relancer.
- La recherche web passe par Bing (repli DuckDuckGo), sans clé d'API : les résultats varient selon la disponibilité des moteurs.
- La détection de silence dépend du micro et du bruit ambiant : elle se règle au cas par cas avec le seuil.

## Dépannage

| Symptôme | Piste |
|---|---|
| Aucun modèle dans la liste | le serveur local n'est pas démarré, ou l'adresse/le port ne correspond pas |
| « Serveur injoignable » | vérifie le port dans ⚙ : LM Studio 1234, Ollama 11434, llama.cpp 9931 |
| Une nouvelle case à cocher ne reste pas cochée | redémarre ComfyUI : le serveur n'a pas encore rechargé les nouveaux réglages |
| Le silence n'est jamais détecté | baisse le seuil, et vérifie que la barre du vumètre monte quand tu parles |
| L'enregistrement coupe pendant la phrase | monte le seuil de silence |
| Le premier enregistrement est long | le modèle Whisper `small` se télécharge à la première utilisation |
| PDF ou DOCX refusé | installe `pypdf` et `python-docx` |
| Déchargement impossible (llama.cpp) | le serveur tourne avec un seul modèle : relance-le sans `-m`, avec `--models-dir` ou `--models-preset` |
| La réponse est coupée en plein milieu | augmente **Tokens maximum par réponse** dans ⚙ |
| Recherche web sans résultat | réessaie plus tard : les moteurs interrogés sont publics et sans clé |
