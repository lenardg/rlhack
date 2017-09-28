# Roguelike hackathon

## Yleiset tiedot

**Hackathon idea: ---harjoitellaan javascriptiä--- tehdään roguelike peli javascript kielellä!**

Hackathonin aikana kolmen hengen tiimit (toki saa sooloilla) kirjoittavat roguelike pelin. Aikaa noin 7 tuntia tuottaa joku toimiva peli.

*Roguelike mitä mitä?? --> Kaikki varmaan tuntee Nethackin?*
https://en.wikipedia.org/wiki/NetHack

*Ja jos ei vieläkään auennut, niin tässä vähän lisäinfoa: mitkä ovat roguelike pelit?*
https://en.wikipedia.org/wiki/Roguelike
http://www.roguebasin.com/index.php?title=Main_Page

Ideana olisi käyttää Javascriptiä tehdä kaiken. Koska pelin aikaansaaminen kuitenkin vie aikaa, voihan käyttää valmista kirjastoa joka hoitaa perusasiat, kuten grafikat (ASCII of course) ja kartat ja whatnot. Tämmöinen olisi esim. rot.js joka soveltuu Javascriptillä tehdä peliä selaimeen. Mikään ei estä käyttää Typescript kieltä tai muuta Javascript esikääntäjä, jos tekijä(t) niin haluaa. En kuitenkaan tiedä miten hyvin rot.js toimii TS:n kanssa.

*rot.js*
http://ondras.github.io/rot.js/hp/

Yksi tiimi voisi myös työstää backendiä (of course Javascriptillä, eli nodejs FTW!), joka keräisi pelit yhteen, vastaanottaisi statistiikkoja (montako kertaa kyseisessä pelissä on kuoltu), pisteitä ja saavutuksia (Girho, anoreksinen barbaari kuoli levelillä 34, hänet tappoi myrkyllinen haskell perhonen, hän keräsi 7102 kultaa ja 90823 kokemuspistettä, tms). 

Pelit voi halutessa käyttää PWA menetelmää tehdä offline peliä (kvg pwa jos et tiedä:P, tai kysy Matilta!), säilyttää jotain asioita local storagessa, käyttää fetch apia palvelimen kanssa jutustelemiseen, jms. 

Vapaasti voisi käyttää mitä tahansa javascript lisäosaa, kirjastoa mitä vaan haluaa tai of course pärjätä vanilla.js:llä ;) (rot.js on vähän pakko ottaa mukaan jos haluaa edetä itse pelin kanssa).

Roguelike kriteereistä korostaisin:

- ASCII grafiikka (rot.js)
- Permadeath
- Random/Proceduraalinen generointi
(loput kriteerit: http://www.roguebasin.com/index.php?title=What_a_roguelike_is)

Tässä vaiheessa mittaisin kiinnostusastetta moista hackathonia kohti. Joten kommentit tähän threadiin tai sitten peukut jos kelpaa ja on kiinnostusta. 

## Getting started

Kloonaa tämä repository tiimille. Jokainen tiimi työskentelee omassa repossa. 

### Repon rakenne

Tässä vähän mitä löytyy mistäkin.

* src hakemistosta löytyy barebones skeleton lähdekoodi.
* Backendin osalta tein vaan package.jsonin, backend tiimi voi edistää tätä asiaa haluammalla tavallaan eteenpäin.
* Roguelike osalta latasin valmiiksi rot.js kirjaston ja tein minimaalisen toteutuksen josta voi lähteä liikeelle. 

## Ideoita

Mitä sitten alettais tekemään?

### Backend ideoita

* __Pelin rekisteröinti__: pelit voivat ilmoittaa backendille heidän olemassaolosta, jonka jälkeen voivat lähettää sinne pisteitä ja muuta tietoja. Backend voi näin myös näyttää mitä pelejä on olemassa
* __API dokumentaatio__: ainakin jollain karkealla tasolla, jotta muut tiimit tietää miten kommunikoida backendin kanssa
* __Statsit__: backend ottaa vastaan kaikenlaiset statsit peleistä. Pelisession pituus, kuolemien määrä, jne jne.
* __Scoreboard__: pelit voivat lähettää score tietoja, jossa lukee hahmon nimi, XP, kulta, kuka tappoi, jne
* __UI__: Tietenkin backend pitää näyttää asiat. Näyttää mitä pelejä on, scoreboardit (erikseen tai yhdessä kaikki pelit), jne

### Peli ideoita

Itse lähestyn _roguelike_ pelin aina dungeon mielestä, mutta oikeastaan voitte koodata ihan mitä tahansa peliä, kunhan ylempänä mainitut kriteerit täyttyvät. Alempana listaan joitain roguelike pelejä, jotka ovat todellakin erikoisia.

Tässä vähän ideioita, mitä kaikkea peliin voi rakentaa. Tuskinpa kaikki kuitenkin ehtii toteuttaa :)

* __Classit__: Peli voi tukea erilaiset hahmoluokat, kuten taistelija, velho, jne.
* __Rotut__: ihmiset, kääpiöt, elfit, mitä vielä?
* __Dungeon__: rot.js sisältää dungeon generoinnin, mutta se generoi vain yhden tason, ja onko sitten loppumuoto ok sinulle? Peli voi sisältää monta tasoa,
* __Kokemuspisteet ja tasot__
* __Monsterit ja taistelu__
* __Esineitä ja aarteita__: kultaa tietenkin, ja kaikenlaisia esineitä, miekkoja, hattuja, sormuksia, jne.
* __Loitsuja__
* __Tarina / kampanja__
* __Konsoli__: kuka ei muistais Quake pelisarjan kuuluisan konsolin? Pitäisikö tehdä myös ~ napista avautuva terminal konsoli sinunkin peliin? Katso [jQuery Terminal](http://terminal.jcubic.pl/)! 
* __Äänet__: musiikkia? Googlaa html5 audio ... ;)

### Erikoiset roguelike ideat

_to be written_

### Kieli

Peli saa puhua englanttia tai suomea, ihan miten vaan :)