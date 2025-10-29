---
title: "Viikko 2"
permalink: /vko2/
weight: 2
previous: /vko1/
next: /vko3/
---

# Tekemistä riittää

### 2.3. Lyhyt kirjoitus
Tee viikolle 2 oma sivu (esimerkiksi vko2.md), jossa kuvailet miten Jekyll sivustoa voisi automatisoida käyttäen GitHub Actions-toimintoja. Vastaa myös millaisilla kehitystyökaluilla ja -tekniikoilla saataisiin CI/CD-putkisto rakennettua web-sovellukselle. Tekstimäärä noin 150 sanaa.

### Omaa kontsaa

Noniin. Tässä ollaan tehty useampi asia. Sivusto käyttää nyt **Jekyll:iä** ja **minimal-mistakes** -teemaa.  

Tosiaan GitHub Pages ei voi käyttää uusinta versiota, joten käytössä on:

```yaml
remote_theme: "mmistakes/minimal-mistakes@4.24.0"
```

Tämä on viimeisin versio, joka toimii GitHub Pagesin kanssa.

Minimal-mistakes käyttää automaattisesti englanninkielisiä tekstejä (Previous ja Next sivun alalaidalla), joten halusin muokata nämä. Ja huhhuh tämä oli vuoristorata muokata:


```yaml
defaults:
  - scope:
      path: ""
      type: pages 
    values:
      layout: single # default layout for _pages
      previous_label: "Edellinen viikko" # legacy from testing
      next_label: "Seuraava viikko" # legacy from testing
```

Tämä ei kuitenkaan toiminut.

```yaml
---
title: "Viikko 2"
permalink: /vko2/
weight: 2
previous: /vko1/
previous_label: "Edellinen viikko"
next: /vko3/
next_label: "Seuraava viikko"
---
```

Tämäkään ei toiminut. GitHubin `Jekyll version 3.x`:ssä next_label ja previous_label eivät kuulemma toimi.
Niinpä mentiin rakentamaan sivustoa `Jekyll 4.x` versiolla, mikä vaatii oman GitHub Actions workflowin. Tähän malliin lisättiin:

```text
- Gemfile
- GitHub Actions workflow (jekyll.yml)
- Tarvittavat pluginit
```

Kaikki nämä tehtyään halutut suomalaiset tunnisteet eivät vieläkään toimineet.

Okei, ratkaisu:

- Lisätään _includes -hakemistoon suoraan minimal-mistakes -reposta `paginator-v1.html` ja `paginator-v2.html`.
- Hardkoodataan halutut tekstit suoraan sinne.

Tämän jälkeen testataan, toimiiko päivitys ja näyttävätkö edellinen / seuraava -painikkeet nyt suomeksi.

...

Ei, ei toimi. Lisäsin vielä `post_pagination.html` ja modifoin sitä. Eipä juuri toimi lainkaan.

Viimeinen kikka lisätä fi lokalisaatio config tiedostoon:

```yaml
locale: fi
```
ja `_data`:aan:
```yaml
fi:
  pagination_previous: "Edellinen viikko"
  pagination_next: "Seuraava viikko"
```

Ja build ja deploy ja VIIMEINKIN TOIMII. Ei siinä mennyt kun 3-4 tuntia kikkailua ja ~40 deployment:ii.

Ehkä voin nyt palata tehtävien pariin.
