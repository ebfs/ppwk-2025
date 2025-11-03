---
layout: home
title: "Harjoitustyö"
permalink: /harjoitustyo/
---
# Community Event Hub

## Tavoite:
Käyttäjät voivat luoda tapahtumia, ja muut käyttäjät voivat olla vuorovaikutuksessa niiden kanssa ilmoittautumalla, liittymällä mukaan, kommentoimalla ja lisäämällä kuvia tapahtumasta. Tavoite on saada ihmiset liikkeelle ja sosialisoimaan.

## Ominaisuudet:

**Tapahtuman luominen**
- Otsikko, kuvaus, päivämäärä/aika, sijainti (valinnainen: karttapinni).
- Mahdollisesti tunnisteet tai kategoriat (esim. “Musiikki”, “Urheilu”, “Meetup”).

**Tapahtumasyöte / lista**
- Lista tulevista tapahtumista.
- Suodatus/haku päivämäärän, kategorian tai sijainnin mukaan.

**Tapahtuman yksityiskohdasivu**
- Näyttää tapahtuman tiedot.
- Käyttäjät voivat kommentoida tapahtumaa.
- Käyttäjät voivat ladata tapahtumaan liittyviä kuvia (tallennetaan Firebase Storageen).

**Käyttäjäprofiili / autentikointi**
- Firebase Authentication (sähköposti/salasana tai Google-kirjautuminen).
- Käyttäjät voivat muokata omia julkaisujaan ja kommenttejaan.

## Roadmap:

### Tehty:

- React-sovellus rakennettu Vite:llä.

- ProtectedRoute-komponentti käytössä rajoittamaan pääsyä Luo tapahtuma -sivulle.

- Navigaatiopainikkeet tyylitelty yhtenevästi kirjautumispainikkeiden kanssa

- Firebase/Firestore

- Reititys täysin toiminnassa, sisältäen tapahtumasyötteen, Luo tapahtuma- ja Kirjaudu-sivut.

- Responsiivinen layout mobiilille (max-width: 600px rootissa app.css:ssä, flex-wrap nav-painikkeille ja otsikko/päivämäärä-riville).

- Otsikot, painikkeet ja typografia yhteneväisiä.

- Luo tapahtuma lomake

- Pääsiäismuna

### Known issues:

- Aikavalitsimen tyylittely: tunti- ja minuuttikentät korkeampia kuin päivämääräkenttä. Samoin Samsung Android -> minuuttikenttä on päivämäärä- ja tuntikentän alla.

### Työn alla:

#### Tehtävät:

- Luo tapahtumasivu

- Lomake on jo olemassa (otsikko, kuvaus, päivämäärä/aika, kategoria (puuttuu), valinnainen sijainti (puuttuu)).

- Tallenna tiedot Firestoreen events-kokoelmaan.

#### Tapahtumasyöte

- Hae tapahtumat Firestoresta (done).

- Näytä lista- tai korttinäkymänä.

- Sisällytä valinnainen suodatus/haun toiminto (kategorian, päivämäärän, sijainnin mukaan).

#### Tapahtuman yksityiskohdat

- Hae yksittäinen tapahtuma ID:n perusteella.

- Näytä kaikki tiedot: kuvaus, päivämäärä/aika, luojan tiedot.

- Kommentit ja kuvat lisätään myöhemmin.

- Tulos: Käyttäjät voivat lisätä ja katsella tapahtumia.

#### Kommentit

- Kommentit

- Alikokoelma jokaisen tapahtuman alle.

- Vain kirjautuneet käyttäjät voivat kommentoida.

-  Näytä kommentit tapahtuman yksityiskohtasivulla.

#### Kuvat

- Latauspainike → Firebase Storage.

- Tallenna lataus-URL Firestoreen images-alikokoelmaan.

- Näytä kuvat tapahtuman yksityiskohtasivulla.

- Tulos: Jokaisella tapahtumalla voi olla kommentteja ja kuvia.

#### Valinnainen sijainti/karttaintegraatio

- Käytä Google Mapsia / OpenStreetMapia (esim. react-leaflet).

- Mahdollista sijainnin valinta tapahtumaa luotaessa.

- Näytä sijainti tapahtuman yksityiskohtasivulla.

#### Esteettömyys & käyttökokemus

- Alt-teksti kuville.

- ARIA-labelit painikkeille/lomakkeille.

- Näppäimistönavigointi.