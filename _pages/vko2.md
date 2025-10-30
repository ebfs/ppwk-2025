---
title: "Viikko 2"
permalink: /vko2/
weight: 2
previous: /vko1/
next: /vko3/
---

# Tekemistä riittää

### 2.3. Lyhyt kirjoitus

Tämä sivusto on jo itseasiassa automatisoitu GitHub Actionsillä. `jekyll.yml` workflow hakee projektin GitHubista, asentaa Ruby-ympäriston käyttämään Bundler välimuistin (nopeuttaa toimintaa mustalla magialla), asentaa kirjastot mitkä ovat määritelty Gemfile:ssä:
```Gemfile
source "https://rubygems.org"

gem "jekyll", "~> 4.4"
gem "minimal-mistakes-jekyll", "~> 4.24"
gem "jekyll-include-cache"
gem "jekyll-remote-theme"
```
Sitten luo sivuston `_site` kansioon, ja julkaisee sivuston GitHub Pages:iin. Täten kun muutoksia pusketaan `main` branch:iin, sivusto rakentuu automaattisesti ja julkaisee ne `gh-pages` branch:iin. Tämä on yksinkertainen CI/CD putkisto.

Firmassa missä olen töissä käytetään Jenkins automaatioalustaa, jota käytetään erityisesti CI/CD putkistojen rakentamiseen. Jenkins mahdollistaa koodin rakentamisen, testaamisen, ja julkaimisen automaattisesti kun muutoksia tehdään versionhallintaan. Jenkins:iin löytyy paljon plugin:eja eri rakennustyökaluille ja pilvipalveluille. Firmassa eräs dokumentaatio sivusto rakennetaan käyttäen Sphinx (documentation generator) ja Jenkins. Sphinx generoi dokumentaation `HTML` muodossa ja Jenkins hoitaa buildin ja deploymentin automaattisesti.

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

Pahoittelut, että tämä osa ei ole ollut kovin suoraviivainen. Dokumentaatio tehtiin pääosin vasta testailun jälkeen.

Päivitettään vielä `remote_theme: "mmistakes/minimal-mistakes@4.24.0"` -> `remote_theme: "mmistakes/minimal-mistakes@4.27.3"`

Voikohan olla että haluamani muutokset eivät toimineet koska oli 4.24 versio käytössä. Olisi kenties pitänyt tarkistaa. Noh, tekemällä oppii.
