---
title: "Viikko 3"
permalink: /vko3/
weight: 3
previous: /vko2/
next: /vko4/
---

# Vite + React App

Oman sivuston appi löytyy: https://ebfs.github.io/ppwk-2025/app/

# # Ohjeet (Windows):

Jos ei ole node.js PATH:issä: lataa https://nodejs.org/en

Testaa että node ja npm ovat oikein asennettu (esim cmd):

```
C:\Users\ebfs>node -v
v24.11.0

C:\Users\ebfs>npm -v
11.6.1
```

Hox! PowerShell voi estää npm.ps1-skriptin ajon suojakäytännön vuoksi (Execution Policy).

PowerShellin suorituskäytäntöä (Execution Policy) muuttava komento:

`Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`

Tämä komento sallii vain omalle käyttäjälle (ei koko koneelle), että paikallisesti luotuja .ps1-skriptejä voi suorittaa, ja estää internetistä ladattujen skriptien ajon, jos niitä ei ole allekirjoitettu (eli varmistettu turvallisiksi).

Yksinkertaistettuna komento antaa sinun ajaa omia PowerShell-skriptejä, mutta ei avaa porttia kaikille haitallisille skripteille.

Ja jatkuu:

VSCode terminal: `react-deploy % npm create vite@latest`

Lisää project name, omaa projektia varten käytän `ppwk-2025-vite`

Avaa projektin kansio VSCodessa

`vite.config.js` tiedostossa lisää seuraavat rivit:

```js
export default defineConfig({
  plugins: [react()],
  base: "/ppwk-2025/react-app",
  server: {            //tämä
    open: true,        //tämä
    port: 5173         //ei ole pakko olla 5173, tämä on vain esimerkki, voi olla esim 3001
  }
})
```

[Tältä sivulta](https://www.npmjs.com/package/gh-pages) löytyy tarvittava npm-paketti saada projekti toimimaan GitHub Pages:in kanssa.

Kun paketti on asennettu, `npm run build`, tämä luo optimoidun version sovelluksesta tuotantoon mikä löytyy dist kansiosta.

"scripts": {
  "deploy": "gh-pages -d dist"
}

