---
title: "Viikko 2"
permalink: /vko2/
weight: 2
---

# Tekemistä riittää

Noniin. Tässä ollaan tehty useampi asia. Sivusto käyttää nyt **Jekyll:iä** ja **minimal-mistakes** -teemaa.  

Tosiaan GitHub Pages ei voi käyttää uusinta versiota, joten käytössä on:

```yaml
remote_theme: "mmistakes/minimal-mistakes@4.24.0"
```

Tämä on viimeisin versio, joka toimii GitHub Pagesin kanssa.

Minimal-mistakes käyttää automaattisesti englanninkielisiä tekstejä (Previous ja Next sivun alalaidalla), joten halusin muokata nämä. Huhhuh, mikä vuoristorata!


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

Kaikki nämä tehtyään, ja kun sivusto rakennetaan eri buildille (gh-pages build), halutut suomalaiset tunnisteet eivät vieläkään toimineet.

Okei, ratkaisu:

- Lisätään _includes -hakemistoon suoraan minimal-mistakes -reposta `paginator-v1.html` ja `paginator-v2.html`.
- Hardkoodataan halutut tekstit suoraan sinne.

Tämän jälkeen testataan, toimiiko päivitys ja näyttävätkö edellinen / seuraava -painikkeet nyt suomeksi.