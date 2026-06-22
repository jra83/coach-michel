# Guide des couleurs - Coach Michel

## 🎨 Palette de couleurs en variables

Toutes les couleurs de l'application Coach Michel sont définies dans des **variables CSS** (`design-tokens.css`). Cela permet de changer **facilement toute la palette** en modifiant simplement quelques variables.

---

## 📁 Fichiers concernés

1. **`src/styles/design-tokens.css`** - Variables CSS principales (à modifier)
2. **`src/styles/color-palettes.js`** - Palettes prédéfinies (usage JS optionnel)
3. **`src/index.css`** - Importe design-tokens.css

---

## 🎯 Comment changer la palette

### Méthode 1: Modifier directement les variables CSS (recommandé)

1. Ouvrir le fichier `src/styles/design-tokens.css`
2. Trouver la section `/* ===== COULEURS PRIMAIRES ===== */`
3. Modifier les couleurs `--color-primary-500` et les autres nuances
4. Sauvegarder → l'interface se met à jour automatiquement

**Exemple - Passer au vert :**

```css
/* Dans design-tokens.css */
:root {
  --color-primary-500: #10b981;  /* Anciennement #007bff (bleu) */
  --color-primary-600: #059669;
  --color-primary-700: #047857;
  --color-primary-800: #065f46;
  --color-primary-900: #064e3b;
  --color-primary-50: #ecfdf5;
  --color-primary-100: '#d1fae5';
  /* ... etc */
}
```

### Méthode 2: Utiliser les palettes JavaScript (dynamique)

Dans la console du navigateur ou dans un script :

```javascript
// Appliquer la palette Forest (vert)
applyPalette(FOREST_PALETTE);

// Appliquer la palette Sunset (orange)
applyPalette(SUNSET_PALETTE);

// Appliquer la palette Ocean (bleu gris)
applyPalette(OCEAN_PALETTE);

// Revenir à la palette par défaut
resetPalette();
```

---

## 🎨 Palettes disponibles

### 1. Coach Michel (Bleu) - Par défaut

```css
--color-primary-500: #007bff
--color-secondary-500: #00ffde
--color-accent-500: #f97316
```

### 2. Forest (Vert)

```javascript
applyPalette(FOREST_PALETTE);
// --color-primary-500: #10b981
// --color-secondary-500: #3b82f6
// --color-accent-500: #f59e0b
```

### 3. Sunset (Orange)

```javascript
applyPalette(SUNSET_PALETTE);
// --color-primary-500: #f97316
// --color-secondary-500: #8b5cf6
// --color-accent-500: #ef4444
```

### 4. Ocean (Bleu gris)

```javascript
applyPalette(OCEAN_PALETTE);
// --color-primary-500: #0ea5e9
// --color-secondary-500: #14b8a6
// --color-accent-500: #f43f5e
```

### 5. Midnight (Bleu nuit)

```javascript
applyPalette(MIDNIGHT_PALETTE);
// --color-primary-500: #6366f1
// --color-secondary-500: #ec4899
// --color-accent-500: #06b6d4
```

### 6. Cherry (Rouge)

```javascript
applyPalette(CHERRY_PALETTE);
// --color-primary-500: #ef4444
// --color-secondary-500: #22c55e
// --color-accent-500: #eab308
```

---

## 🎨 Créer une palette personnalisée

### Option A: Modifier design-tokens.css

```css
/* Dans src/styles/design-tokens.css */
:root {
  --color-primary-50: #fef2f2;
  --color-primary-100: '#fee2e2';
  --color-primary-200: '#fecaca';
  --color-primary-300: '#fca5a5';
  --color-primary-400: '#f87171';
  --color-primary-500: '#ef4444';  /* ← Votre couleur principale */
  --color-primary-600: '#dc2626';
  --color-primary-700: '#b91c1c';
  --color-primary-800: '#991b1b';
  --color-primary-900: '#7f1d1d';

  --color-secondary-500: '#22c55e';  /* ← Couleur secondaire */
  --color-accent-500: '#eab308';      /* ← Couleur d'accent */
}
```

### Option B: Créer une palette JS

```javascript
// Dans src/styles/color-palettes.js
const MY_CUSTOM_PALETTE = {
  primary: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',  /* ← Votre couleur personnalisée */
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  secondary: { 500: '#22c55e' },
  accent: { 500: '#eab308' },
  gray: COACH_MICHEL_PALETTE.gray,
};

// Exporter
window.MY_CUSTOM_PALETTE = MY_CUSTOM_PALETTE;

// Utiliser dans la console
applyPalette(MY_CUSTOM_PALETTE);
```

---

## 🎨 Variables disponibles

### Couleurs primaires

```css
--color-primary-50      → Le plus clair
--color-primary-100
--color-primary-200
--color-primary-300
--color-primary-400
--color-primary-500     ← Couleur principale
--color-primary-600
--color-primary-700
--color-primary-800
--color-primary-900     → Le plus foncé
```

### Alias

```css
--color-primary           → var(--color-primary-500)
--color-primary-hover     → var(--color-primary-600)
--color-primary-active    → var(--color-primary-700)
--color-primary-light     → var(--color-primary-100)
--color-primary-lighter   → var(--color-primary-50)
```

### Couleurs secondaires

```css
--color-secondary         → var(--color-secondary-500)
--color-secondary-hover   → var(--color-secondary-600)
--color-secondary-active  → var(--color-secondary-700)
```

### Couleurs d'accent

```css
--color-accent            → var(--color-accent-500)
--color-accent-hover      → var(--color-accent-600)
--color-accent-active     → var(--color-accent-700)
```

### Couleurs neutres (gris)

```css
--color-gray-50      → Le plus clair (background)
--color-gray-100
--color-gray-200
--color-gray-300
--color-gray-400
--color-gray-500
--color-gray-600
--color-gray-700
--color-gray-800
--color-gray-900     → Le plus foncé (texte)
```

### Couleurs sémantiques

```css
--color-success      → Vert (succès)
--color-error        → Rouge (erreur)
--color-warning      → Orange (avertissement)
--color-info         → Bleu (information)
```

### Autres variables

```css
/* Backgrounds */
--color-bg-primary      → Fond principal (#ffffff)
--color-bg-secondary    → Fond secondaire (#f8f9fa)
--color-bg-tertiary     → Fond tertiaire (#e9ecef)

/* Textes */
--color-text-primary    → Texte principal (#212529)
--color-text-secondary  → Texte secondaire (#495057)
--color-text-tertiary   → Texte tertiaire (#6c757d)
--color-text-inverse    → Texte inversé (#ffffff)

/* Borders */
--color-border-primary  → Bordure principale (#ced4da)
--color-border-secondary → Bordure secondaire (#dee2e6)
--color-border-focus    → Bordure focus (#007bff)
```

---

## 🎨 Utilisation dans les composants

### En CSS

```css
.my-button {
  background-color: var(--color-primary-500);
  color: var(--color-text-inverse);
  border: 1px solid var(--color-border-primary);
}

.my-button:hover {
  background-color: var(--color-primary-hover);
}

.my-button:active {
  background-color: var(--color-primary-active);
}

.my-card {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border-primary);
  color: var(--color-text-primary);
}
```

### En React / Tailwind

```jsx
// Dans tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'primary-active': 'var(--color-primary-active)',
        gray: {
          50: 'var(--color-gray-50)',
          100: 'var(--color-gray-100)',
          // ... etc
        },
      },
    },
  },
};

// Utilisation
<button className="bg-primary text-white hover:bg-primary-hover">
  Mon bouton
</button>
```

---

## 🎨 Tester les palettes

Dans la console du navigateur (F12) :

```javascript
// 1. Charger le fichier des palettes (si pas déjà chargé)
import('/src/styles/color-palettes.js');

// 2. Tester une palette
applyPalette(FOREST_PALETTE);

// 3. Basculer entre palettes
function testAllPalettes() {
  const palettes = [
    'COACH_MICHEL_PALETTE',
    'FOREST_PALETTE',
    'SUNSET_PALETTE',
    'OCEAN_PALETTE',
    'MIDNIGHT_PALETTE',
    'CHERRY_PALETTE',
  ];

  let index = 0;
  setInterval(() => {
    applyPalette(window[palettes[index]]);
    index = (index + 1) % palettes.length;
    console.log(`✅ Palette: ${palettes[index - 1]}`);
  }, 3000);
}

testAllPalettes();
```

---

## 🎨 Bonnes pratiques

1. **Utiliser les variables, pas les couleurs en dur**
   ❌ `background-color: #007bff;`
   ✅ `background-color: var(--color-primary-500);`

2. **Respecter l'échelle de nuances**
   - 50-100 pour backgrounds très clairs
   - 200-300 pour backgrounds moyens
   - 400-500 pour éléments actifs
   - 600-700 pour hover/active
   - 800-900 pour textes foncés

3. **Maintenir le contraste d'accessibilité**
   - Ratio de 4.5:1 minimum pour le texte normal
   - Ratio de 3:1 minimum pour le texte large

4. **Utiliser les couleurs sémantiques pour le feedback**
   - `--color-success` pour les succès
   - `--color-error` pour les erreurs
   - `--color-warning` pour les avertissements

---

## 🎨 Outils

- **Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Color Picker**: https://www.google.com/search?q=color+picker
- **Palette Generator**: https://coolors.co/

---

**Réalisé par Picasso** - Design System Coach Michel