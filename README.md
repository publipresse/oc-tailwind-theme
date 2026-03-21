# oc-tailwind-theme
Tailwind Starter theme

## Tailwind CLI standalone

Ce theme est configure pour Tailwind CSS 4.2 (CLI standalone).

Lancer les commandes depuis le dossier du theme.

Le fichier source `assets/css/config.css` centralise toute la configuration Tailwind v4 :
- import Tailwind
- breakpoints via `@theme`
- detection des classes via `@source`

Extrait :

```css
@import "tailwindcss";

@theme {
	--breakpoint-sm: 640px;
	--breakpoint-md: 768px;
	--breakpoint-lg: 1024px;
	--breakpoint-xl: 1280px;
	--breakpoint-2xl: 1536px;
}

@source "../../layouts/**/*.htm";
@source "../../pages/**/*.htm";
@source "../../partials/**/*.htm";
@source "../../content/**/*.htm";
```

Important : le binaire doit etre executable. Si besoin :

```bash
cd /var/www/vhosts/dev02.publipresse.ovh/github.dev02.publipresse.ovh/httpdocs/themes/oc-tailwind-theme
chmod +x ./assets/vendor/tailwind/tailwind
```

### Developpement

Compilation automatique a chaque modification :

```bash
cd /var/www/vhosts/dev02.publipresse.ovh/github.dev02.publipresse.ovh/httpdocs/themes/oc-tailwind-theme
./assets/vendor/tailwind/tailwind -i ./assets/css/config.css -o ./assets/css/tailwind.css --watch
```

### Production

Generation du CSS optimise et minifie :

```bash
cd /var/www/vhosts/dev02.publipresse.ovh/github.dev02.publipresse.ovh/httpdocs/themes/oc-tailwind-theme
./assets/vendor/tailwind/tailwind -i ./assets/css/config.css -o ./assets/css/tailwind.css --minify
```

### Verification version

Verifier la version du CLI installe :

```bash
cd /var/www/vhosts/dev02.publipresse.ovh/github.dev02.publipresse.ovh/httpdocs/themes/oc-tailwind-theme
./assets/vendor/tailwind/tailwind --version 2>&1
```

La sortie attendue doit contenir `tailwindcss v4.2` (ou un patch `v4.2.x`).

### Diagnostic serveur

Si la commande est tuee (`Killed` / code 137), tester d'abord sans minification :

```bash
cd /var/www/vhosts/dev02.publipresse.ovh/github.dev02.publipresse.ovh/httpdocs/themes/oc-tailwind-theme
./assets/vendor/tailwind/tailwind -i ./assets/css/config.css -o ./assets/css/tailwind.css
```

Si le binaire est tue meme sur `--version`, le probleme vient du serveur (limite memoire/process) et pas de la configuration Tailwind.

### Fichiers

- Source Tailwind : `assets/css/config.css`
- CSS compile : `assets/css/tailwind.css`
- CLI standalone : `assets/vendor/tailwind/tailwind`
