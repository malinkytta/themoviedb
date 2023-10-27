# FED22 JavaScript 2 - Inlämningsuppgift 2

## Beskrivning

Det här projektet är en webbapplikation som använder sig av The Movie DB (TMDB) API för att erbjuda användaren information om bioaktuella filmer, populära filmer, topplistade filmer, samt möjlighet att bläddra och söka filmer baserat på genre. Det inkluderar också detaljerad information om filmer och skådespelare, inklusive relaterade filmer och filmhistorik.


## Kravspecifikation

- Använda React, React Router och React Query.
- Responsiv design (mobile first).
- Komponentbaserad arkitektur.
- Kommunikation med TMDB API i en separat service.
- Inkluderar loading och felhantering.
- Skriven i TypeScript, väl indenterad och versionshanterad.
- Deployad till Netlify.
- All kod är egen och oanvänd kod är borttagen.

## Funktionalitet

### Besökaren kan:

- Se de senaste bioaktuella filmerna.
- Se de mest populära filmerna.
- Se de mest topplistade filmerna.
- Bläddra och söka filmer baserat på genre.
- Klicka på en film för att se detaljerad information och lista över skådespelare.
- Klicka på en skådespelare för att se detaljerad information och lista över filmer hen har medverkat i.

### VG-krav:

- Användning av Custom Hooks.
- Se relaterade/liknande filmer på en enskild film.
- Söka efter filmer med paginering och behålla sökfråga och paginering vid omladdning av sidan.
- Visa de senaste 10 visade filmer med historik som överlever sessioner.
- Möjlighet att välja mellan populära filmer för dagen eller veckan som bibehålls vid omladdning av sidan.
