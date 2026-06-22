/**
 * CONFIGURATION DES PALETTES DE COULEURS
 *
 * Ce fichier contient différentes palettes de couleurs prédéfinies.
 * Pour changer la palette de l'application, copiez les variables
 * de la palette choisie dans le fichier design-tokens.css.
 */

/* ===========================================
   PALETTE 1: COACH MICHEL (BLEU PAR DÉFAUT)
   =========================================== */
const COACH_MICHEL_PALETTE = {
  primary: {
    50: '#e6f2ff',
    100: '#cce4ff',
    200: '#99c9ff',
    300: '#66adff',
    400: '#3392ff',
    500: '#007bff',  /* ← Couleur principale */
    600: '#0069d9',
    700: '#0056b3',
    800: '#004494',
    900: '#003275',
  },
  secondary: {
    500: '#00ffde',  /* Vert cyan */
  },
  accent: {
    500: '#f97316',   /* Orange */
  },
  gray: {
    50: '#f8f9fa',
    100: '#e9ecef',
    200: '#dee2e6',
    300: '#ced4da',
    400: '#adb5bd',
    500: '#6c757d',
    600: '#495057',
    700: '#343a40',
    800: '#212529',
    900: '#1a1d20',
  },
};

/* ===========================================
   PALETTE 2: FOREST (VERT)
   =========================================== */
const FOREST_PALETTE = {
  primary: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',  /* ← Vert forêt */
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  secondary: {
    500: '#3b82f6',   /* Bleu */
  },
  accent: {
    500: '#f59e0b',   /* Orange */
  },
  gray: COACH_MICHEL_PALETTE.gray,
};

/* ===========================================
   PALETTE 3: SUNSET (ORANGE)
   =========================================== */
const SUNSET_PALETTE = {
  primary: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',  /* ← Orange coucher de soleil */
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  secondary: {
    500: '#8b5cf6',   /* Violet */
  },
  accent: {
    500: '#ef4444',   /* Rouge */
  },
  gray: COACH_MICHEL_PALETTE.gray,
};

/* ===========================================
   PALETTE 4: OCEAN (BLEU GRIS)
   =========================================== */
const OCEAN_PALETTE = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',  /* ← Bleu océan */
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  secondary: {
    500: '#14b8a6',   /* Teal */
  },
  accent: {
    500: '#f43f5e',   /* Rose */
  },
  gray: COACH_MICHEL_PALETTE.gray,
};

/* ===========================================
   PALETTE 5: MIDNIGHT (BLEU NUIT)
   =========================================== */
const MIDNIGHT_PALETTE = {
  primary: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',  /* ← Indigo nuit */
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },
  secondary: {
    500: '#ec4899',   /* Rose */
  },
  accent: {
    500: '#06b6d4',   /* Cyan */
  },
  gray: COACH_MICHEL_PALETTE.gray,
};

/* ===========================================
   PALETTE 6: CHERRY (ROUGE)
   =========================================== */
const CHERRY_PALETTE = {
  primary: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',  /* ← Rouge cerise */
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  secondary: {
    500: '#22c55e',   /* Vert */
  },
  accent: {
    500: '#eab308',   /* Jaune */
  },
  gray: COACH_MICHEL_PALETTE.gray,
};

/* ===========================================
   FONCTION POUR CHANGER LA PALETTE
   =========================================== */

/**
 * Applique une palette de couleurs à l'application
 *
 * @param {Object} palette - Palette de couleurs à appliquer
 * @returns {void}
 */
function applyPalette(palette) {
  const root = document.documentElement;

  // Appliquer les couleurs primaires
  for (let i = 50; i <= 900; i += 50) {
    root.style.setProperty(`--color-primary-${i}`, palette.primary[i] || palette.primary[500]);
  }

  // Appliquer les couleurs secondaires
  root.style.setProperty('--color-secondary-500', palette.secondary[500]);

  // Appliquer les couleurs d'accent
  root.style.setProperty('--color-accent-500', palette.accent[500]);

  // Appliquer les couleurs de gris si fournies
  if (palette.gray) {
    for (let i = 50; i <= 900; i += 50) {
      root.style.setProperty(`--color-gray-${i}`, palette.gray[i] || palette.gray[500]);
    }
  }

  console.log('✅ Palette appliquée avec succès !');
}

/**
 * Réinitialise à la palette par défaut (Coach Michel)
 *
 * @returns {void}
 */
function resetPalette() {
  applyPalette(COACH_MICHEL_PALETTE);
}

// Exporter pour usage dans les scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    COACH_MICHEL_PALETTE,
    FOREST_PALETTE,
    SUNSET_PALETTE,
    OCEAN_PALETTE,
    MIDNIGHT_PALETTE,
    CHERRY_PALETTE,
    applyPalette,
    resetPalette,
  };
}

// Pour usage dans le navigateur
if (typeof window !== 'undefined') {
  window.COACH_MICHEL_PALETTE = COACH_MICHEL_PALETTE;
  window.FOREST_PALETTE = FOREST_PALETTE;
  window.SUNSET_PALETTE = SUNSET_PALETTE;
  window.OCEAN_PALETTE = OCEAN_PALETTE;
  window.MIDNIGHT_PALETTE = MIDNIGHT_PALETTE;
  window.CHERRY_PALETTE = CHERRY_PALETTE;
  window.applyPalette = applyPalette;
  window.resetPalette = resetPalette;
}

/* ===========================================
   EXEMPLES D'UTILISATION
   =========================================== */

/*
// Exemple 1: Changer la palette depuis la console du navigateur
applyPalette(FOREST_PALETTE);

// Exemple 2: Revenir à la palette par défaut
resetPalette();

// Exemple 3: Créer une palette personnalisée
const MY_PALETTE = {
  primary: {
    50: '#fef2f2',
    500: '#ef4444',  // Rouge personnalisé
    900: '#7f1d1d',
  },
  secondary: { 500: '#22c55e' },
  accent: { 500: '#eab308' },
  gray: COACH_MICHEL_PALETTE.gray,
};
applyPalette(MY_PALETTE);

// Exemple 4: Basculer entre deux palettes
let currentPalette = 'COACH_MICHEL';
function togglePalette() {
  currentPalette = currentPalette === 'COACH_MICHEL' ? 'FOREST' : 'COACH_MICHEL';
  applyPalette(window[currentPalette + '_PALETTE']);
}
*/