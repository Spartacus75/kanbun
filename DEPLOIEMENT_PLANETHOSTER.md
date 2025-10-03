# 🚀 Guide de déploiement sur PlanetHoster

## Prérequis
- Accès SSH à votre compte PlanetHoster
- Node.js installé sur le serveur (vérifier avec `node -v`)
- Git installé (optionnel mais recommandé)

## 📋 Étape 1 : Préparer les fichiers localement

### 1.1 Tester le build en local
```bash
npm run build
npm run start
```
Visitez http://localhost:3000 pour vérifier que tout fonctionne.

### 1.2 Créer un fichier .gitignore (si pas déjà fait)
Assurez-vous que `.gitignore` contient :
```
node_modules/
.next/
.env.local
.DS_Store
```

## 📤 Étape 2 : Uploader sur PlanetHoster

### Option A : Via Git (Recommandé)

**Sur votre machine locale :**
```bash
# Si pas encore fait, initialisez le repo
git init
git add .
git commit -m "Prêt pour déploiement"

# Créez un repo sur GitHub/GitLab
git remote add origin https://github.com/votre-username/kanbun.git
git push -u origin master
```

**Sur le serveur PlanetHoster (via SSH) :**
```bash
# Connectez-vous en SSH
ssh votre-user@votre-serveur.planethoster.net

# Allez dans le dossier web
cd ~/public_html  # ou le dossier de votre domaine

# Clonez le repo
git clone https://github.com/votre-username/kanbun.git
cd kanbun
```

### Option B : Via SFTP (FileZilla/WinSCP)

1. Connectez-vous via SFTP à votre serveur PlanetHoster
2. Uploadez **tous les fichiers** sauf :
   - `node_modules/`
   - `.next/`
   - `.git/`
3. Uploadez dans le dossier : `~/public_html/kanbun/` (ou votre domaine)

## ⚙️ Étape 3 : Installation sur le serveur

**Via SSH sur PlanetHoster :**

```bash
# Allez dans le dossier de l'app
cd ~/public_html/kanbun

# Installez les dépendances
npm install --production

# Créez le fichier .env.production (si pas uploadé)
nano .env.production
```

Contenu du `.env.production` :
```env
NEXT_PUBLIC_SUPABASE_URL=https://hafdafypuuvsgpcvylvf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhZmRhZnlwdXV2c2dwY3Z5bHZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0MzIwNTQsImV4cCI6MjA1NDAwODA1NH0.eNr9gOwJcqxaWgxTJ38m6U2NbP6hKuQb6WaTjL3m2xg
NODE_ENV=production
```

Sauvegardez avec `Ctrl+O`, `Enter`, puis `Ctrl+X`.

```bash
# Build l'application
npm run build
```

## 🔄 Étape 4 : Démarrer l'application avec PM2

PM2 est un gestionnaire de processus qui garde votre app en ligne 24/7.

```bash
# Installer PM2 globalement
npm install -g pm2

# Démarrer l'app avec PM2
pm2 start ecosystem.config.js

# Vérifier que l'app tourne
pm2 status

# Voir les logs
pm2 logs kanbun

# Sauvegarder la config PM2
pm2 save

# Activer le démarrage automatique au boot
pm2 startup
# Suivez les instructions affichées
```

**Commandes PM2 utiles :**
```bash
pm2 restart kanbun    # Redémarrer l'app
pm2 stop kanbun       # Arrêter l'app
pm2 delete kanbun     # Supprimer l'app de PM2
pm2 logs kanbun       # Voir les logs en temps réel
pm2 monit             # Monitoring en temps réel
```

## 🌐 Étape 5 : Configuration du domaine

### 5.1 Configuration Apache (Reverse Proxy)

PlanetHoster utilise Apache. Il faut créer un reverse proxy vers le port 3000.

Créez/modifiez le fichier `.htaccess` dans votre dossier racine :

```bash
nano ~/public_html/.htaccess
```

Contenu :
```apache
RewriteEngine On

# Rediriger tout le trafic vers Node.js sur le port 3000
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

**OU** si vous utilisez un sous-domaine dédié (ex: kanbun.votredomaine.com) :

Créez un fichier `.htaccess` dans le dossier du sous-domaine :
```apache
RewriteEngine On
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

### 5.2 Configuration via cPanel (PlanetHoster)

1. Connectez-vous à **cPanel PlanetHoster**
2. Allez dans **Node.js App**
3. Cliquez sur **Create Application**
4. Remplissez :
   - **Node.js version** : 18.x ou 20.x
   - **Application mode** : Production
   - **Application root** : `/home/votre-user/public_html/kanbun`
   - **Application URL** : votre domaine
   - **Application startup file** : `node_modules/next/dist/bin/next`
   - **Arguments** : `start -p 3000`
5. Cliquez sur **Create**

### 5.3 SSL (HTTPS)

Dans cPanel PlanetHoster :
1. Allez dans **SSL/TLS Status**
2. Activez **AutoSSL** pour votre domaine
3. Attendez 5-10 minutes que le certificat soit généré

## ✅ Étape 6 : Vérification

Visitez votre domaine : `https://votredomaine.com`

Vous devriez voir votre landing page Kanbun ! 🎉

### Tests à faire :
- [ ] Page d'accueil s'affiche correctement
- [ ] Changement de langue fonctionne
- [ ] Formulaire d'inscription email fonctionne
- [ ] Page `/privacy` accessible
- [ ] Page `/blog` accessible
- [ ] Responsive mobile fonctionne

## 🔄 Mises à jour futures

Quand vous faites des modifications :

### Via Git :
```bash
# Sur votre machine locale
git add .
git commit -m "Vos modifications"
git push

# Sur le serveur PlanetHoster
cd ~/public_html/kanbun
git pull
npm install
npm run build
pm2 restart kanbun
```

### Via SFTP :
1. Uploadez les fichiers modifiés
2. Connectez-vous en SSH
3. Exécutez :
```bash
cd ~/public_html/kanbun
npm install
npm run build
pm2 restart kanbun
```

## 🆘 Dépannage

### L'app ne démarre pas
```bash
# Vérifier les logs
pm2 logs kanbun

# Vérifier le processus Node.js
pm2 status
ps aux | grep node

# Redémarrer
pm2 restart kanbun
```

### Port 3000 déjà utilisé
```bash
# Voir qui utilise le port 3000
lsof -i :3000

# Changer le port dans package.json et ecosystem.config.js
# Puis redémarrer
```

### Problème de permissions
```bash
# Donner les bonnes permissions
chmod -R 755 ~/public_html/kanbun
```

### Variables d'environnement non chargées
```bash
# Vérifier que .env.production existe
cat .env.production

# Recharger avec PM2
pm2 restart kanbun --update-env
```

## 📞 Support PlanetHoster

Si vous avez des problèmes spécifiques à PlanetHoster :
- Support : https://www.planethoster.com/fr/Support
- Chat en direct disponible
- Documentation Node.js : https://docs.planethoster.com/

---

**Bon déploiement ! 🚀**
