/* ========================================================
   SIMPLE CV CREATOR - SCRIPT.JS
   Logique JavaScript moderne, claire, commentée et accessible pour les étudiants.
   Gère la saisie, l'aperçu en temps réel, la sauvegarde LocalStorage,
   l'export PDF direct et l'impression.
   ======================================================== */

// ========================================================
// 1. SÉLECTION DES ÉLÉMENTS DU DOM
// ========================================================

// 1.1 Conteneurs principaux
const formSection = document.getElementById('form-section');
const previewSection = document.getElementById('preview-section');
const homeSection = document.getElementById('home-section');
const cvForm = document.getElementById('cv-form');
const cvPaper = document.getElementById('cv-paper');
const toastContainer = document.getElementById('toast-container');
const saveStatus = document.getElementById('save-status');

// 1.2 Champs de saisie du formulaire
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const addressInput = document.getElementById('address');
const profileInput = document.getElementById('profile');
const educationInput = document.getElementById('education');
const experienceInput = document.getElementById('experience');
const skillsInput = document.getElementById('skills');
const languagesInput = document.getElementById('languages');

// 1.3 Gestion de la photo
const photoInput = document.getElementById('photo');
const photoPreviewThumbnail = document.getElementById('photo-preview-thumbnail');
const photoPlaceholder = document.getElementById('photo-placeholder');
const removePhotoBtn = document.getElementById('remove-photo-btn');
const previewPhotoContainer = document.getElementById('preview-photo-container');
const previewPhoto = document.getElementById('preview-photo');

// 1.4 Éléments de l'aperçu du CV
const previewName = document.getElementById('preview-name');
const previewEmail = document.getElementById('preview-email');
const previewPhone = document.getElementById('preview-phone');
const previewAddress = document.getElementById('preview-address');
const previewProfile = document.getElementById('preview-profile');
const previewProfileBlock = document.getElementById('preview-profile-block');
const previewEducation = document.getElementById('preview-education');
const previewEducationBlock = document.getElementById('preview-education-block');
const previewExperience = document.getElementById('preview-experience');
const previewExperienceBlock = document.getElementById('preview-experience-block');
const previewSkills = document.getElementById('preview-skills');
const previewSkillsBlock = document.getElementById('preview-skills-block');
const previewLanguages = document.getElementById('preview-languages');
const previewLanguagesBlock = document.getElementById('preview-languages-block');

// 1.5 Boutons d'action
const generateBtn = document.getElementById('generate-btn');
const editBtn = document.getElementById('edit-btn');
const printBtn = document.getElementById('print-btn');
const downloadPdfBtn = document.getElementById('download-pdf-btn');
const resetBtn = document.getElementById('reset-btn');
const previewQuickBtn = document.getElementById('preview-quick-btn');
const startCvBtn = document.getElementById('start-cv-btn');
const heroPreviewBtn = document.getElementById('hero-preview-btn');

// Variable globale pour stocker l'image en Base64
let photoBase64 = '';

// Clé de stockage LocalStorage
const LOCAL_STORAGE_KEY = 'simple_cv_creator_data';


// ========================================================
// 2. INITIALISATION AU CHARGEMENT DE LA PAGE
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  // 2.1 Charger les données sauvegardées depuis le LocalStorage
  loadFromLocalStorage();

  // 2.2 Synchroniser l'aperçu initial
  updateCVPreview();

  // 2.3 Écouter les modifications sur tous les champs pour la mise à jour en direct
  setupLiveListeners();
});


// ========================================================
// 3. ÉCOUTEURS D'ÉVÉNEMENTS EN DIRECT (LIVE PREVIEW & AUTO-SAVE)
// ========================================================
function setupLiveListeners() {
  const textInputs = [
    fullNameInput,
    emailInput,
    phoneInput,
    addressInput,
    profileInput,
    educationInput,
    experienceInput,
    skillsInput,
    languagesInput
  ];

  textInputs.forEach(input => {
    if (!input) return;

    // Mise à jour instantanée à chaque frappe de touche
    input.addEventListener('input', () => {
      // Retirer l'état invalide si l'utilisateur commence à saisir
      if (input.classList.contains('invalid') && input.value.trim() !== '') {
        input.classList.remove('invalid');
      }
      updateCVPreview();
      saveToLocalStorage();
    });
  });

  // Gestion du téléversement de la photo
  if (photoInput) {
    photoInput.addEventListener('change', handlePhotoUpload);
  }

  // Suppression de la photo
  if (removePhotoBtn) {
    removePhotoBtn.addEventListener('click', handleRemovePhoto);
  }
}


// ========================================================
// 4. MISE À JOUR DE L'APERÇU DU CV
// ========================================================
function updateCVPreview() {
  // 4.1 Nom et prénom
  const nameValue = fullNameInput.value.trim();
  previewName.textContent = nameValue || 'Votre Nom et Prénom';

  // 4.2 Coordonnées
  const emailValue = emailInput.value.trim();
  previewEmail.textContent = emailValue || 'votre.email@exemple.com';

  const phoneValue = phoneInput.value.trim();
  previewPhone.textContent = phoneValue || '06 00 00 00 00';

  const addressValue = addressInput.value.trim();
  previewAddress.textContent = addressValue || 'Ville, Pays';

  // 4.3 Profil professionnel
  const profileValue = profileInput ? profileInput.value.trim() : '';
  if (profileValue) {
    previewProfile.textContent = profileValue;
    previewProfileBlock.style.display = 'block';
  } else {
    previewProfile.textContent = 'Passionné(e) et rigoureux(se), je souhaite mettre mes compétences au service de projets ambitieux.';
    previewProfileBlock.style.display = 'block';
  }

  // 4.4 Formation et études
  const educationValue = educationInput.value.trim();
  previewEducation.textContent = educationValue || 'Exemple : Licence en Informatique - Université (2022 - 2024)';

  // 4.5 Expériences professionnelles
  const experienceValue = experienceInput.value.trim();
  previewExperience.textContent = experienceValue || 'Exemple : Stage Développeur Web - Entreprise ABC (2023)\n• Création et intégration de pages web';

  // 4.6 Compétences (Badges élégants)
  renderSkillsBadges(skillsInput.value.trim());

  // 4.7 Langues (Badges élégants)
  renderLanguagesBadges(languagesInput ? languagesInput.value.trim() : '');

  // 4.8 Photo
  if (photoBase64) {
    previewPhoto.src = photoBase64;
    previewPhotoContainer.classList.remove('hidden');
  } else {
    previewPhoto.src = '';
    previewPhotoContainer.classList.add('hidden');
  }
}


// ========================================================
// 5. RENDU DES BADGES (COMPÉTENCES & LANGUES)
// ========================================================

// 5.1 Compétences
function renderSkillsBadges(skillsText) {
  previewSkills.innerHTML = '';
  const container = document.createElement('div');
  container.className = 'skills-list';

  if (!skillsText) {
    // Compétences par défaut à titre d'exemple
    const defaults = ['HTML5', 'CSS3', 'JavaScript', 'Communication', 'Organisation'];
    defaults.forEach(skill => {
      const tag = document.createElement('span');
      tag.className = 'skill-tag';
      tag.textContent = skill;
      container.appendChild(tag);
    });
  } else {
    const list = skillsText
      .split(/[\n,;]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    list.forEach(skill => {
      const tag = document.createElement('span');
      tag.className = 'skill-tag';
      tag.textContent = skill;
      container.appendChild(tag);
    });
  }

  previewSkills.appendChild(container);
}

// 5.2 Langues
function renderLanguagesBadges(langText) {
  previewLanguages.innerHTML = '';
  const container = document.createElement('div');
  container.className = 'languages-list';

  if (!langText) {
    const defaults = ['Français (Natif)', 'Anglais (Intermédiaire)'];
    defaults.forEach(lang => {
      const tag = document.createElement('span');
      tag.className = 'language-tag';
      tag.textContent = lang;
      container.appendChild(tag);
    });
  } else {
    const list = langText
      .split(/[\n,;]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    list.forEach(lang => {
      const tag = document.createElement('span');
      tag.className = 'language-tag';
      tag.textContent = lang;
      container.appendChild(tag);
    });
  }

  previewLanguages.appendChild(container);
}


// ========================================================
// 6. GESTION DE LA PHOTO PERSONNELLE
// ========================================================
function handlePhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Validation du type de fichier
  if (!file.type.startsWith('image/')) {
    showToast('⚠️ Veuillez sélectionner un fichier image valide (JPG, PNG, WebP).', 'warning');
    photoInput.value = '';
    return;
  }

  // Validation de la taille (Max 2 Mo pour éviter d'engorger le LocalStorage)
  if (file.size > 2 * 1024 * 1024) {
    showToast('⚠️ La taille de l\'image ne doit pas dépasser 2 Mo.', 'warning');
    photoInput.value = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    photoBase64 = e.target.result;

    // Mise à jour de la vignette dans le formulaire
    photoPreviewThumbnail.src = photoBase64;
    photoPreviewThumbnail.classList.remove('hidden');
    photoPlaceholder.classList.add('hidden');
    removePhotoBtn.classList.remove('hidden');

    // Mise à jour sur le CV
    updateCVPreview();
    saveToLocalStorage();
    showToast('📸 Photo ajoutée avec succès !', 'success');
  };

  reader.onerror = function () {
    showToast('❌ Erreur lors de la lecture de l\'image.', 'danger');
  };

  reader.readAsDataURL(file);
}

function handleRemovePhoto() {
  photoBase64 = '';
  photoInput.value = '';
  photoPreviewThumbnail.src = '';
  photoPreviewThumbnail.classList.add('hidden');
  photoPlaceholder.classList.remove('hidden');
  removePhotoBtn.classList.add('hidden');

  updateCVPreview();
  saveToLocalStorage();
  showToast('🗑️ Photo supprimée.', 'info');
}


// ========================================================
// 7. SOUMISSION DU FORMULAIRE ("Créer mon CV")
// ========================================================
cvForm.addEventListener('submit', function (event) {
  event.preventDefault();

  // Validation des champs obligatoires
  const requiredFields = [
    { input: fullNameInput, label: 'Nom et prénom' },
    { input: emailInput, label: 'Adresse e-mail' },
    { input: phoneInput, label: 'Numéro de téléphone' },
    { input: addressInput, label: 'Adresse / Ville' },
    { input: educationInput, label: 'Formation et études' },
    { input: skillsInput, label: 'Compétences' },
    { input: experienceInput, label: 'Expériences professionnelles' }
  ];

  let missingFields = [];
  let firstInvalid = null;

  requiredFields.forEach(field => {
    if (!field.input.value.trim()) {
      field.input.classList.add('invalid');
      missingFields.push(field.label);
      if (!firstInvalid) firstInvalid = field.input;
    } else {
      field.input.classList.remove('invalid');
    }
  });

  if (missingFields.length > 0) {
    showToast(`⚠️ Informations manquantes : ${missingFields.slice(0, 3).join(', ')}${missingFields.length > 3 ? '...' : ''}`, 'warning');
    if (firstInvalid) {
      firstInvalid.focus();
    }
    return;
  }

  // Tout est valide ! Mise à jour complète de l'aperçu
  updateCVPreview();
  saveToLocalStorage();

  // Défilement fluide vers l'aperçu
  previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  showToast('✨ Félicitations ! Votre CV a été généré avec succès.', 'success');
});


// ========================================================
// 8. BOUTON "Modifier les informations"
// ========================================================
editBtn.addEventListener('click', () => {
  formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  fullNameInput.focus();
  showToast('✏️ Vous pouvez modifier vos informations dans le formulaire ci-dessous.', 'info');
});


// ========================================================
// 9. BOUTON "Prévisualiser le CV"
// ========================================================
if (previewQuickBtn) {
  previewQuickBtn.addEventListener('click', () => {
    updateCVPreview();
    previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

if (heroPreviewBtn) {
  heroPreviewBtn.addEventListener('click', () => {
    updateCVPreview();
    previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}


// ========================================================
// 10. BOUTON "Effacer le formulaire"
// ========================================================
resetBtn.addEventListener('click', () => {
  const confirmReset = window.confirm(
    'Êtes-vous sûr de vouloir effacer tout le formulaire ? Vos données sauvegardées seront réinitialisées.'
  );

  if (confirmReset) {
    cvForm.reset();
    handleRemovePhoto();

    // Effacer le LocalStorage
    localStorage.removeItem(LOCAL_STORAGE_KEY);

    // Réinitialiser les champs invalides
    document.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));

    // Réinitialiser l'aperçu
    updateCVPreview();

    formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    showToast('🗑️ Le formulaire et les données sauvegardées ont été effacés.', 'info');
  }
});


// ========================================================
// 11. BOUTON "Imprimer le CV"
// ========================================================
printBtn.addEventListener('click', () => {
  // S'assurer que le CV est à jour avant l'impression
  updateCVPreview();

  showToast('🖨️ Préparation de l\'impression...', 'info', 2000);

  setTimeout(() => {
    window.print();
  }, 300);
});


// ========================================================
// 12. BOUTON "Télécharger le CV au format PDF"
// ========================================================
downloadPdfBtn.addEventListener('click', () => {
  updateCVPreview();

  const rawName = fullNameInput.value.trim() || 'Mon_CV';
  const cleanName = rawName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^a-zA-Z0-9_-]/g, '_'); // Remplace les caractères spéciaux par des underscores
  
  const fileName = `CV_${cleanName}.pdf`;

  // Vérifier si la bibliothèque html2pdf est disponible
  if (typeof html2pdf !== 'undefined') {
    showToast('📄 Génération de votre CV en PDF...', 'info', 3000);

    const opt = {
      margin:       [8, 8, 8, 8], // marges douces en mm
      filename:     fileName,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf()
      .set(opt)
      .from(cvPaper)
      .save()
      .then(() => {
        showToast('✅ Votre CV au format PDF a été téléchargé avec succès !', 'success');
      })
      .catch((err) => {
        console.error('Erreur html2pdf :', err);
        // Solution de secours : impression standard vers PDF
        showToast('⚠️ Ouverture de la boîte de dialogue : choisissez "Enregistrer au format PDF".', 'warning', 4000);
        window.print();
      });
  } else {
    // Secours si hors ligne ou si le script n'a pas chargé
    showToast('🖨️ Dans la boîte d\'impression, sélectionnez "Enregistrer en PDF".', 'info', 4000);
    window.print();
  }
});


// ========================================================
// 13. SAUVEGARDE & CHARGEMENT DANS LE LOCALSTORAGE
// ========================================================
function saveToLocalStorage() {
  const data = {
    fullName: fullNameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    address: addressInput.value,
    profile: profileInput ? profileInput.value : '',
    education: educationInput.value,
    experience: experienceInput.value,
    skills: skillsInput.value,
    languages: languagesInput ? languagesInput.value : '',
    photo: photoBase64,
    lastSaved: new Date().toISOString()
  };

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    showSaveIndicator();
  } catch (err) {
    console.warn('Impossible de sauvegarder dans LocalStorage (peut-être plein ou bloqué) :', err);
  }
}

function loadFromLocalStorage() {
  try {
    const rawData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!rawData) return;

    const data = JSON.parse(rawData);

    if (data.fullName !== undefined) fullNameInput.value = data.fullName;
    if (data.email !== undefined) emailInput.value = data.email;
    if (data.phone !== undefined) phoneInput.value = data.phone;
    if (data.address !== undefined) addressInput.value = data.address;
    if (data.profile !== undefined && profileInput) profileInput.value = data.profile;
    if (data.education !== undefined) educationInput.value = data.education;
    if (data.experience !== undefined) experienceInput.value = data.experience;
    if (data.skills !== undefined) skillsInput.value = data.skills;
    if (data.languages !== undefined && languagesInput) languagesInput.value = data.languages;

    if (data.photo) {
      photoBase64 = data.photo;
      photoPreviewThumbnail.src = photoBase64;
      photoPreviewThumbnail.classList.remove('hidden');
      photoPlaceholder.classList.add('hidden');
      removePhotoBtn.classList.remove('hidden');
    }

    showToast('💾 Vos informations ont été restaurées depuis votre navigateur.', 'info', 3000);
  } catch (err) {
    console.error('Erreur lors du chargement de LocalStorage :', err);
  }
}

function showSaveIndicator() {
  if (!saveStatus) return;
  const textSpan = saveStatus.querySelector('.status-text');
  if (textSpan) {
    textSpan.textContent = 'Enregistré ✓';
    clearTimeout(saveStatus._timer);
    saveStatus._timer = setTimeout(() => {
      textSpan.textContent = 'Sauvegarde auto active';
    }, 2500);
  }
}


// ========================================================
// 14. SYSTÈME DE NOTIFICATIONS (TOASTS ÉLÉGANTS)
// ========================================================
function showToast(message, type = 'info', duration = 3500) {
  if (!toastContainer) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, duration);
}
