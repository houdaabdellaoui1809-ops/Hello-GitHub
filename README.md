# 🌸 Simple CV Creator Website

Une application web moderne, élégante et intuitive permettant à toute personne de concevoir, personnaliser, prévisualiser, imprimer et télécharger un CV professionnel au format PDF en quelques minutes, sans aucune compétence technique requise.

Projet conçu en technologies web pures : **HTML5**, **CSS3** et **JavaScript (ES6)**. Aucun compte requis, aucune API payante, respect total de la vie privée.

---

## 🌟 Points Forts & Fonctionnalités

### 1. 🎨 Design Épuré et Couleurs Douces
- Palette harmonieuse et apaisante : **Rose doux**, **Blanc** et **Violet clair**.
- Typographie soignée (*Plus Jakarta Sans*) pour un rendu net et professionnel.
- Espaces aérés, ombres douces et bordures subtiles pour une lecture agréable.
- Badges visuels arrondis pour les compétences et les langues.

### 2. 🏠 Page d'Accueil Conviviale
- Message de bienvenue chaleureux et présentation claire du site.
- Bouton d'action principal « **🚀 Créer mon CV** » pour un accès direct au formulaire.
- Barre de navigation fluide permettant de basculer instantanément entre l'accueil, le formulaire et l'aperçu.
- Grille des fonctionnalités clés présentant les atouts du site.

### 3. 📝 Formulaire Complet & Intuitif
Le formulaire regroupe l'ensemble des rubriques indispensables pour un CV complet :
1. **Photo personnelle (facultative)** : Téléversement d'image avec recadrage circulaire, prévisualisation immédiate et bouton de suppression.
2. **Informations personnelles** : Nom & prénom, e-mail, téléphone, adresse/ville.
3. **Profil professionnel** : Court texte de présentation mettant en valeur vos compétences et vos objectifs.
4. **Formation et études** : Diplômes, établissements scolaires et années.
5. **Expériences professionnelles** : Postes occupés, missions et réalisations.
6. **Compétences clés** : Badges générés automatiquement à partir de listes séparées par des virgules ou retours à la ligne.
7. **Langues** : Liste des langues parlées avec indication du niveau (ex: *Français (Natif)*, *Anglais (Courant)*).

### 4. 👁️ Aperçu Dynamique en Direct
- L'aperçu du CV s'actualise **en temps réel** dès que vous tapez dans le formulaire.
- Modèle de CV moderne au format A4 avec en-tête structuré, coordonnées stylisées et sections claires.
- Présentation responsive adaptée aux grands écrans, tablettes et téléphones.

### 5. 🖨️ & 📥 Export PDF & Impression
- **Téléchargement direct en PDF** : Génère un fichier nommé `CV_[Votre_Nom].pdf` avec mise en page A4 impeccable (via `html2pdf.js`).
- **Impression optimisée (`@media print`)** : Masque automatiquement les boutons, la barre de navigation et le fond du site pour ne laisser que le document papier prêt à être imprimé ou enregistré en PDF.

### 6. 💾 Sauvegarde Automatique Locale (LocalStorage)
- Toutes les données saisies (y compris la photo) sont sauvegardées automatiquement dans votre navigateur.
- Si vous fermez la page ou rechargez votre navigateur, vos informations sont restaurées instantanément.
- Un indicateur « *Sauvegarde auto active* » vous rassure en direct.
- Bouton « **Effacer le formulaire** » avec confirmation pour repartir de zéro en toute sécurité.

---

## 📁 Structure du Projet

Le projet respecte scrupuleusement l'architecture d'origine sans dépendance lourde :

```text
my-cv-creator/
├── index.html     # Structure sémantique HTML5 (Navigation, Accueil, Formulaire, Aperçu)
├── style.css      # Feuilles de styles CSS3 (Thème rose/violet, Flexbox, Grid, Responsive, @media print)
├── script.js      # Logique JavaScript (Mise à jour dynamique, LocalStorage, Export PDF, Validation)
└── README.md      # Documentation complète du projet
```

---

## 🚀 Comment Lancer le Projet

Aucune installation de logiciel, aucun serveur et aucun compte ne sont nécessaires.

### Méthode 1 : Lancement direct dans votre navigateur
1. Ouvrez le dossier du projet :
   `C:\Users\shhenaz\.gemini\antigravity\scratch\my-cv-creator`
2. Double-cliquez directement sur le fichier **`index.html`**.
3. Le site s'ouvrira immédiatement dans votre navigateur par défaut (Google Chrome, Microsoft Edge, Firefox, etc.).

### Méthode 2 : Lancement via un serveur local (Optionnel)
Si vous disposez de l'extension *Live Server* sous VS Code ou via Python / Node :
```bash
# Exemple avec Python
python -m http.server 3000
```
Puis accédez à `http://localhost:3000` dans votre navigateur.

---

## 🛠️ Guide d'Explication du Code (Idéal pour une soutenance)

Si vous devez présenter ce projet devant votre professeur ou votre classe, voici la synthèse des 3 composants :

### 1. HTML (`index.html`)
- **Structure sémantique** : Balises `<header>`, `<nav>`, `<main>`, `<section>`, `<fieldset>`, `<legend>`, `<footer>`.
- **Formulaire accessible** : Attributs `required`, labels liés aux `id` des champs, textes d'aide explicatifs.
- **Rendu modulaire** : Séparation claire entre `#home-section`, `#form-section` et `#preview-section`.

### 2. CSS (`style.css`)
- **Variables CSS (`:root`)** : Palette douce personnalisable (`--primary-violet`, `--secondary-rose`, `--bg-page`, etc.).
- **Mise en page moderne** : Combinaison de **Flexbox** pour les alignements fluides et de **CSS Grid** pour les colonnes et fonctionnalités.
- **Style d'impression (`@media print`)** : Nettoie l'affichage en masquant la classe `.no-print` pour obtenir un document A4 propre sans entête de site ni boutons.

### 3. JavaScript (`script.js`)
- **Événements en direct (`input`)** : Écoute chaque frappe au clavier pour mettre à jour immédiatement l'aperçu du CV (`updateCVPreview`).
- **Gestion d'image (`FileReader`)** : Convertit l'image de la photo en chaîne Base64 afin de l'afficher et de la conserver dans le LocalStorage.
- **Persistance (`localStorage`)** : Stocke et recharge l'état du formulaire via `JSON.stringify` et `JSON.parse`.
- **Validation bienveillante** : Détecte les champs obligatoires vides et affiche des notifications douces (*Toasts*) sans alertes bloquantes.
- **Export PDF** : Utilise la bibliothèque client `html2pdf.js` avec solution de secours automatique (`window.print()`).

---

## 💡 Technologies Utilisées

- **HTML5** : Sémantique, structure et formulaires natifs.
- **CSS3** : Variables, Flexbox, Grid, transitions fluides et requêtes média `@media print`.
- **JavaScript (Vanilla ES6)** : Manipulation du DOM, FileReader, API LocalStorage, Promises.
- **html2pdf.js** : Conversion vectorielle HTML vers PDF côté client.
