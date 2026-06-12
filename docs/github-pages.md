# 🌐 Anleitung: Auf GitHub Pages veröffentlichen

GitHub Pages hostet die Seite **kostenlos**. Da das Projekt ohne Build-Schritt
auskommt, genügt es, den Code hochzuladen – GitHub liefert die Dateien direkt aus.

## Einmalige Einrichtung

### 1. GitHub-Konto und Repository anlegen

1. Falls noch nicht vorhanden: kostenloses Konto auf [github.com](https://github.com) erstellen.
2. Oben rechts auf **„+" → „New repository"** klicken.
3. **Repository name:** z. B. `lernen-mit-kneschke` (klein, mit Bindestrichen).
4. Sichtbarkeit: **Public** (nötig für kostenloses GitHub Pages).
5. **Keine** Häkchen bei „Add a README" etc. setzen → **„Create repository"**.

### 2. Code hochladen

Im Projektordner ein Terminal öffnen (Windows: Rechtsklick im Ordner →
„In Terminal öffnen") und diese Befehle ausführen.
`DEIN-NAME` durch deinen GitHub-Benutzernamen ersetzen:

```
git init
git add .
git commit -m "Erste Version von Lernen mit Kneschke"
git branch -M main
git remote add origin https://github.com/DEIN-NAME/lernen-mit-kneschke.git
git push -u origin main
```

> Beim ersten Push fragt GitHub nach einer Anmeldung – einfach dem
> Browser-Dialog folgen. Falls `git` nicht installiert ist:
> [git-scm.com/downloads](https://git-scm.com/downloads)

### 3. GitHub Pages aktivieren

1. Auf der Repository-Seite: **Settings** (Reiter oben).
2. Links im Menü: **Pages**.
3. Bei **„Build and deployment" → Source**: „Deploy from a branch" wählen.
4. Bei **Branch**: `main` und Ordner `/ (root)` auswählen → **Save**.
5. Nach 1–2 Minuten ist die Seite erreichbar unter:

```
https://DEIN-NAME.github.io/lernen-mit-kneschke/
```

Die fertige Adresse wird oben auf der Pages-Einstellungsseite angezeigt.
Diesen Link bekommen die Schüler – am besten als QR-Code an die Tafel
(QR-Code-Generatoren gibt es kostenlos im Netz, z. B. den im Browser
eingebauten: Rechtsklick auf die Seite → „QR-Code für diese Seite erstellen").

## Änderungen veröffentlichen (immer wieder)

Nach jeder Änderung (neues Spiel, Korrektur, …) im Projektordner:

```
git add .
git commit -m "Kurze Beschreibung der Änderung"
git push
```

Nach etwa einer Minute ist die Live-Seite aktualisiert. Falls Schüler noch die
alte Version sehen: Seite einmal neu laden.

## Häufige Stolpersteine

| Problem | Lösung |
| --- | --- |
| Seite zeigt 404 | Pages-Einstellungen prüfen (Branch `main`, Ordner `/ (root)`); liegt `index.html` im Hauptordner des Repos? |
| Änderungen erscheinen nicht | 1–2 Minuten warten, dann Browser-Cache umgehen: `Strg + F5` |
| Seite ist weiß / leer | Browser-Konsole öffnen (`F12`) – meist ein Tippfehler in einer zuletzt geänderten JS-Datei, z. B. im Manifest oder der Registry |
