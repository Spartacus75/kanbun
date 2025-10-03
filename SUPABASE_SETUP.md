# 🚀 Configuration Supabase pour Kanbun

Ce guide vous explique comment configurer Supabase pour sauvegarder les emails de votre landing page.

## ⏱️ Temps estimé : 5-10 minutes

---

## Étape 1 : Créer un compte et un projet Supabase

1. **Aller sur [supabase.com](https://supabase.com)**
2. **Cliquer sur "Start your project"** (ou "Sign in" si vous avez déjà un compte)
3. **Se connecter** avec GitHub, Google, ou email
4. **Créer un nouveau projet** :
   - Cliquer sur "New Project"
   - Nom du projet : `kanbun-landing` (ou autre nom)
   - Database Password : Générer un mot de passe fort (notez-le !)
   - Region : Choisir la région la plus proche de vos utilisateurs
     - Europe : `eu-central-1` (Frankfurt)
     - USA : `us-east-1` (Virginia)
     - Asie : `ap-northeast-1` (Tokyo) ⚡ Recommandé pour JLPT
   - Cliquer sur "Create new project"

⏳ **Attendez 2-3 minutes** que le projet soit créé.

---

## Étape 2 : Créer la table `subscribers`

1. **Aller dans l'onglet "SQL Editor"** (dans le menu de gauche)
2. **Créer une nouvelle query** (bouton "+ New query")
3. **Copier-coller le contenu du fichier** [`supabase/schema.sql`](supabase/schema.sql) :

```sql
-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  language TEXT NOT NULL DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  user_agent TEXT,
  ip_address TEXT
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_subscribers_created_at ON subscribers(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow INSERT from anyone (for the public form)
CREATE POLICY "Allow public insert" ON subscribers
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow SELECT only for authenticated users (you in the dashboard)
CREATE POLICY "Allow authenticated select" ON subscribers
  FOR SELECT
  USING (auth.role() = 'authenticated');
```

4. **Cliquer sur "Run"** (ou Ctrl/Cmd + Enter)
5. ✅ Vous devriez voir "Success. No rows returned"

---

## Étape 3 : Récupérer vos clés API

1. **Aller dans "Project Settings"** (icône ⚙️ en bas à gauche)
2. **Cliquer sur "API"** dans le menu
3. **Copier les 2 valeurs suivantes** :

   - **Project URL** : `https://xxxxx.supabase.co`
   - **anon public** (dans la section "Project API keys")

---

## Étape 4 : Configurer les variables d'environnement

1. **Créer un fichier `.env.local`** à la racine du projet :

```bash
cp .env.local.example .env.local
```

2. **Éditer `.env.local`** et remplacer les valeurs :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. **Sauvegarder le fichier**

---

## Étape 5 : Installer les dépendances et tester

1. **Installer Supabase** :

```bash
npm install
```

2. **Lancer le serveur de développement** :

```bash
npm run dev
```

3. **Ouvrir http://localhost:3001**

4. **Tester le formulaire** :
   - Entrer un email
   - Cliquer sur "Rejoindre la liste"
   - ✅ Vous devriez voir "🎉 Merci ! Vous êtes inscrit à la liste d'attente."

---

## Étape 6 : Vérifier dans Supabase

1. **Retourner dans Supabase**
2. **Aller dans "Table Editor"** (menu de gauche)
3. **Cliquer sur la table `subscribers`**
4. **Voir votre email** dans la liste ! 🎉

---

## 📊 Voir vos statistiques

### Option 1 : Dashboard Supabase

**Aller dans Table Editor → subscribers**
- Vous verrez tous les emails
- Date d'inscription
- Langue utilisée
- Export CSV possible (bouton en haut)

### Option 2 : API endpoint

**Visiter dans votre navigateur** :
```
http://localhost:3001/api/subscribe
```

Vous verrez :
```json
{
  "total": 5,
  "byLanguage": {
    "en": 2,
    "fr": 2,
    "zh": 1
  }
}
```

---

## 🔒 Sécurité (Important pour la production)

### Row Level Security (RLS)

✅ **Déjà configuré** dans le schema SQL !

- ✅ **Les visiteurs peuvent INSERT** (ajouter leur email)
- ✅ **Les visiteurs NE PEUVENT PAS SELECT** (voir les autres emails)
- ✅ **Vous pouvez voir tout** via le dashboard (authenticated)

### Protection de l'endpoint GET

⚠️ **L'endpoint GET `/api/subscribe` est public** pour voir les stats.

**Pour la production, protégez-le** :

1. Option A : Le retirer complètement
2. Option B : Ajouter une authentification
3. Option C : Ajouter un token secret

**Exemple avec token** :

```typescript
// app/api/subscribe/route.ts
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // ... rest of code
}
```

---

## 🎯 Prochaines étapes (Optionnel)

### 1. **Email de confirmation**

Installer Resend pour envoyer un email de bienvenue :

```bash
npm install resend
```

Ajouter dans `.env.local` :
```
RESEND_API_KEY=re_xxxxx
```

Modifier `app/api/subscribe/route.ts` pour envoyer un email.

### 2. **Export automatique vers Google Sheets**

Utiliser Zapier ou Make.com pour :
- Trigger : Nouvelle ligne dans Supabase
- Action : Ajouter à Google Sheets

### 3. **Webhook Discord/Slack**

Recevoir une notification à chaque nouvel inscrit :

```typescript
// Dans app/api/subscribe/route.ts après l'insert
await fetch(process.env.DISCORD_WEBHOOK_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    content: `🎉 Nouvel inscrit : ${email} (${language})`
  })
});
```

---

## ❓ Troubleshooting

### Erreur : "Missing Supabase environment variables"

➡️ **Solution** : Vérifiez que `.env.local` existe et contient les bonnes valeurs.

### Erreur : "relation 'subscribers' does not exist"

➡️ **Solution** : Vous n'avez pas exécuté le schema SQL. Retournez à l'Étape 2.

### Erreur : "new row violates row-level security policy"

➡️ **Solution** : Les policies RLS ne sont pas bien configurées. Re-exécutez le schema SQL.

### L'email n'apparaît pas dans Supabase

➡️ **Solution** :
1. Vérifiez la console du navigateur (F12) pour les erreurs
2. Vérifiez la console du serveur Next.js
3. Vérifiez que les credentials Supabase sont corrects

---

## 🆘 Besoin d'aide ?

- **Documentation Supabase** : https://supabase.com/docs
- **Discord Supabase** : https://discord.supabase.com
- **GitHub Issues** : Créez une issue dans le repo

---

## 🎉 C'est terminé !

Votre landing page sauvegarde maintenant tous les emails dans Supabase.

Vous pouvez :
- ✅ Voir tous les emails dans le dashboard
- ✅ Exporter en CSV
- ✅ Voir les stats par langue
- ✅ Accéder aux données via API

**Bonne chance avec Kanbun ! 🇯🇵**
