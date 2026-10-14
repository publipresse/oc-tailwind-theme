# Thème publipresse-tailwind

Starter theme October CMS de Publipresse. Les thèmes clients en dérivent : ce fichier décrit le stack et la méthode d'intégration à suivre.

## Environnement

- **October CMS 4.x** (Laravel 12, PHP 8.3).
- **Laravel Boost** (MCP) est installé : l'utiliser pour comprendre le projet avant de coder.
  - `get-theme-structure`, `get-blueprints`, `get-plugin-registration` : architecture du thème et des plugins.
  - `search-october-docs` : doc October (Twig, Tailor, composants, AJAX) avant toute implémentation.
  - `last-error`, `read-log-entries`, `browser-logs` : debug.

## Stack front

| Rôle | Outil |
| --- | --- |
| CSS | Tailwind 4 (`@tailwindcss/cli`) |
| Interactions | AlpineJS (+ plugins collapse, mask, anchor) |
| Scroll | Lenis |
| Animations | GSAP + ScrollTrigger |
| Sliders | Swiper |
| Lightbox | Fancybox |

- Tout est déjà chargé dans `partials/layout/assets.htm` : ne pas recharger une lib ailleurs.
- La navigation passe par **Turbo** (`{% framework extras turbo %}`) : tout JS s'initialise sur `page:loaded` (et `ajax:update-complete` si besoin), pas sur `DOMContentLoaded`. Voir `assets/js/core.js`.
- Compiler le CSS depuis le dossier du thème : `npm run css:build` (ou `npm run css:watch`).

## CSS (`assets/css/`)

| Fichier | Contenu |
| --- | --- |
| `config.css` | Point d'entrée Tailwind : imports, `@source`, `@theme` (design system) |
| `base.css` | Styles par défaut des éléments HTML |
| `components.css` | Composants propres au thème (boutons, etc.) |
| `utilities.css` | Classes utilitaires custom |
| `overrides.css` | Surcharges (libs tierces, plugins) |
| `tailwind.css` | **Fichier compilé, ne jamais l'éditer** |

### Règles Tailwind

- Faire le design au maximum avec les classes Tailwind.
- **Pas de valeurs arbitraires** (`h-[705px]`, `text-[17px]`…) : prendre la classe Tailwind la plus proche, quitte à arrondir de quelques pixels.
- Une valeur récurrente du design qui n'existe pas dans Tailwind devient une variable dans le `@theme` de `config.css`, pas une valeur arbitraire.

### Composants CSS (`components.css`)

Les éléments très réutilisés (boutons, tags, liens fléchés, titres de section…) deviennent des **composants** dans `assets/css/components.css`, dans `@layer components`.

- Écrire le composant avec `@apply` et des classes Tailwind plutôt qu'en CSS brut.
- **Une seule règle par composant** : tous ses comportements (`hover:`, `focus:`, `group-hover:`, responsive…) sont dans le même `@apply`. Pas de règle `.btn:hover` séparée.
- Une variante = une classe à part qui complète la classe de base (`.btn` + `.btn-primary`).

```css
@layer components {
    .btn {
        @apply inline-flex items-center gap-x-2 px-4 py-2 rounded-md border-1 transition-colors cursor-pointer;
    }

    .btn-primary {
        @apply bg-primary border-primary text-white hover:bg-primary/80 focus-visible:outline-2;
    }
}
```

## Blueprints Tailor fournis (`blueprints/`)

| Blueprint | Rôle |
| --- | --- |
| `config/infos` | Informations légales de l'entreprise |
| `config/recaptcha` | Clés reCAPTCHA des formulaires |
| `config/socials` | Réseaux sociaux |
| `forms/contact` | Formulaire de contact |
| `seo/config` | Options SEO |
| `seo/matomo` | Matomo |
| `seo/sitemap` | Sitemap |
| `popup` | Popups |

Les contenus dynamiques du projet (actualités, références, équipe…) se gèrent avec **Tailor** : créer les blueprints nécessaires en suivant la structure de ceux existants.

## Partials fournis (`partials/`)

**Toujours réutiliser ces partials** dès qu'il s'agit d'un de ces éléments, plutôt que de réécrire le HTML.

| Partial | Rôle |
| --- | --- |
| `layout/assets` | Chargement CSS, fonts, scripts |
| `layout/core` | Pages techniques (404, maintenance…) |
| `layout/header` / `layout/footer` | Header / footer du site |
| `layout/meta` | Metas du site |
| `layout/popup` | Gestion des popups |
| `ui/alert`, `ui/flash` | Alertes, messages flash October |
| `ui/input`, `ui/textarea`, `ui/select`, `ui/checkbox`, `ui/file` | Champs de formulaire |
| `ui/recaptcha` | reCAPTCHA |
| `ui/image` | Images (resize intégré) |
| `ui/modal` | Modales |

Lire les `props` en tête de chaque partial avant de l'utiliser.

## Méthode d'intégration Figma

L'utilisateur fournit **un seul lien : celui de la maquette Figma globale**. C'est à Claude de parcourir le fichier via le MCP pour trouver les pages, frames et sections, puis de récupérer chaque nœud. Ne pas demander un lien par page ou par section.

1. **Vérifier le MCP Figma** (`whoami`, puis `get_metadata` sur l'URL fournie). S'il ne répond pas ou n'a pas accès au fichier : **s'arrêter et remonter le problème à l'utilisateur**, ne pas intégrer à l'aveugle.
2. **Analyser toute la maquette** avant de coder : lister les pages, puis repérer les blocs identiques ou similaires.
3. **Définir le design system** dans le `@theme` de `config.css` : couleurs, typos, tailles de texte, espacements, radius, ombres, container, breakpoints. Partir des variables Figma (`get_variable_defs`) quand elles existent.
4. **Créer les partials** des blocs récurrents (voir ci-dessous), puis les composants de `components.css` (boutons…).
5. **Intégrer les pages section par section** : pour chaque section, récupérer son nœud (`get_design_context` + `get_screenshot`), l'intégrer, comparer au screenshot, puis passer à la suivante. Ne jamais intégrer une page entière en une seule passe.
6. Créer les blueprints Tailor et brancher les contenus éditables.

## Partials de blocs

- Un bloc qui revient (même avec de petites variantes) = **un partial**, avec quelques `props` pour gérer les variantes. Pas de copier-coller de HTML entre pages.
- Utiliser les **placeholders** pour injecter des bouts de HTML (boutons, médias…) :

    ```twig
    {% partial 'blocks/hero' title="…" reverse=true body %}
        {% put actions %}<a href="…" class="btn">…</a>{% endput %}
    {% endpartial %}
    ```

    Le mot-clé `body` est obligatoire dans l'appel dès qu'on utilise `{% put %}` à l'intérieur. Côté partial : `{% placeholder actions %}`, conditionné par `hasPlaceholder('actions')`.

- **Partials autonomes et portables** : ce qui ne relève pas de Tailwind vit dans le partial lui-même.
  - Animations GSAP, init Swiper, JS spécifique → `{% put scripts %}` dans le partial.
  - Styles impossibles en Tailwind → `{% put styles %}` dans le partial.
  - Utiliser `{% put scripts once %}` pour le code commun à toutes les instances, et respecter la ré-initialisation Turbo (`page:loaded`).

## Metas

- **Pages statiques** : renseigner les metas dans les settings de la page (`title`, `meta_title`, `meta_description`…).
- **Contenus dynamiques** (Tailor) : via placeholders, lus par `layout/meta` :

    ```twig
    {% put meta_title = post.title %}
    {% put meta_description = post.excerpt %}
    {% put og_image = post.image.path %}
    ```

## Contenus statiques éditables : `publipresse.tiptap`

Les textes, images et vidéos statiques modifiables par le client passent par le plugin **Publipresse.Tiptap** (édition en ligne pour les non-techniques). Lire `plugins/publipresse/tiptap/README.md` pour les modes (`normal`, `simple`, `image`, `video`, `media`) et les propriétés.

```twig
{% component 'editor' file="home/hero/title" mode="simple" tag="h1" class="text-5xl" %}
{% component 'editor' file="home/hero/image" mode="image" width=1600 height=900 class="w-full" %}
```

- Les fichiers sont écrits dans `content/{site}/{file}.htm`. **Les ranger par page / section / élément** : `file="page/section/element"` (ex. `about/team/intro`).
- Contenu commun à plusieurs pages (ex. footer) : un dossier dédié (`global/footer/...`).
- Les classes de mise en forme restent dans l'appel du composant, pas dans le contenu.
