# Kanbun Landing Page

Landing page pour Kanbun - La plateforme d'apprentissage intelligente pour réussir le JLPT.

## 🚀 Démarrage rapide

### Installation

```bash
npm install
```

### Développement local

```bash
npm run dev
```

Ouvrez [http://localhost:3001](http://localhost:3001) dans votre navigateur.

Le site sera disponible en 4 langues :
- English: http://localhost:3001/en
- Français: http://localhost:3001/fr
- 中文: http://localhost:3001/zh
- 한국어: http://localhost:3001/ko

### Build production

```bash
npm run build
npm start
```

## 📧 Configuration de la capture d'emails

La landing page capture les emails via l'API `/api/subscribe`. Deux options sont disponibles :

### Option 1: Web3Forms (Recommandé pour démarrer)

1. Créez un compte gratuit sur [Web3Forms](https://web3forms.com/)
2. Obtenez votre clé d'accès
3. Créez un fichier `.env.local` :
   ```
   WEB3FORMS_ACCESS_KEY=votre_clé_ici
   ```
4. Décommentez le code Web3Forms dans `app/api/subscribe/route.ts`

### Option 2: Resend (Pour l'envoi d'emails)

1. Créez un compte sur [Resend](https://resend.com/)
2. Obtenez votre clé API
3. Installez Resend :
   ```bash
   npm install resend
   ```
4. Ajoutez à `.env.local` :
   ```
   RESEND_API_KEY=votre_clé_ici
   ```
5. Décommentez le code Resend dans `app/api/subscribe/route.ts`

## 🎨 Personnalisation

### Logo

Placez votre logo dans `public/logo.svg` ou `public/logo.png`.

### Couleurs

Modifiez les couleurs dans `tailwind.config.ts` :

```typescript
colors: {
  primary: {
    // Vos couleurs personnalisées
  }
}
```

### Contenu

- **Hero** : `components/Hero.tsx`
- **Fonctionnalités** : `components/Features.tsx`
- **Footer** : `components/Footer.tsx`

## 📱 SEO

Le site est optimisé pour le SEO avec :
- Meta tags OpenGraph
- Twitter Cards
- Sitemap automatique (Next.js)
- Robots.txt
- URLs canoniques

Configurez `app/layout.tsx` pour personnaliser les meta tags.

## 🚢 Déploiement sur Vercel

### Déploiement automatique

1. Poussez votre code sur GitHub
2. Allez sur [Vercel](https://vercel.com)
3. Importez votre repository
4. Configurez les variables d'environnement
5. Déployez !

### Configuration du domaine

1. Dans Vercel, allez dans Settings → Domains
2. Ajoutez `kanbun.co` et `www.kanbun.co`
3. Suivez les instructions DNS
4. Le blog sera automatiquement sur `www.kanbun.co/blog`

### CLI Vercel

```bash
npm i -g vercel
vercel
```

## 📊 Analytics (Optionnel)

### Google Analytics

Décommentez la section analytics dans `app/layout.tsx` et ajoutez :
```
NEXT_PUBLIC_GA_ID=votre_id
```

### Plausible (Alternative privacy-friendly)

Plus léger et respectueux de la vie privée :
```
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=kanbun.co
```

## 🗂️ Structure du projet

```
.
├── app/
│   ├── api/subscribe/     # API route pour emails
│   ├── blog/              # Page blog
│   ├── layout.tsx         # Layout principal avec SEO
│   ├── page.tsx           # Page d'accueil
│   └── globals.css        # Styles globaux
├── components/
│   ├── Hero.tsx           # Section héro
│   ├── Features.tsx       # Fonctionnalités
│   └── Footer.tsx         # Footer
├── public/                # Assets statiques
└── package.json
```

## 🎯 Fonctionnalités

✅ Landing page responsive
✅ Capture d'emails avec validation
✅ SEO optimisé
✅ Dark mode
✅ Animations (Framer Motion)
✅ Route /blog préparée
✅ TypeScript
✅ Tailwind CSS
✅ Next.js 15 (App Router)

## 📝 TODO pour la production

- [ ] Ajouter votre logo dans `public/`
- [ ] Configurer Web3Forms ou Resend
- [ ] Personnaliser les couleurs
- [ ] Ajouter Google Analytics
- [ ] Créer une image OG (`public/og-image.png` 1200x630)
- [ ] Vérifier les liens sociaux dans Footer
- [ ] Connecter à une base de données (Postgres, MongoDB, etc.)
- [ ] Ajouter des articles de blog

## 🛠️ Technologies

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Language**: TypeScript
- **Deployment**: Vercel

## 📄 Licence

© 2025 Kanbun. Tous droits réservés.
