# tailwind-theme
Tailwind Starter theme

## Tailwind CSS 4.2 avec npm

Ce theme est configuré pour Tailwind CSS 4.2 via npm avec `@tailwindcss/cli`.

### Installation

D'abord, installer Node.js 21+ (voir `.nvmrc`), puis les dépendances :

```bash
cd themes/publipresse-tailwind
npm install
```

### Compilation

Le fichier source `assets/css/config.css` centralise toute la configuration Tailwind v4 :
- import de Tailwind
- breakpoints via `@theme`
- détection des classes via `@source`

**Compilation unique :**

```bash
npm run css:build
```

**Mode watch (compilation auto à chaque changement) :**

```bash
npm run css:watch
```

### Configuration

Fichier source : `assets/css/config.css`

Exemple :

```css
@import "tailwindcss";

@theme {
	--breakpoint-sm: 640px;
	--breakpoint-md: 768px;
	--breakpoint-lg: 1024px;
	--breakpoint-xl: 1280px;
	--breakpoint-2xl: 1536px;
	--spacing-header-height: 80px;
}

@source "../../layouts/**/*.htm";
@source "../../pages/**/*.htm";
@source "../../partials/**/*.htm";
@source "../../content/**/*.htm";
```

### Output

Fichier généré : `assets/css/tailwind.css` (minifié en production)

Les scripts npm utilisent automatiquement la minification en production.

### Fichiers

- Source Tailwind : `assets/css/config.css`
- CSS compilé : `assets/css/tailwind.css`
- Dépendances : `node_modules/` et `package.json`
- Version Node requise : voir `.nvmrc`
