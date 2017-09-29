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

## Vaatimukset

Ensimmäinen vaatimus on tietenkin, että näistä vaatimuksista voi poiketa, koska tarkoitus on pitää hauskaa ja koodata. Joten tämän sektion nimi kuuluisikin olla mielummin ehdotukset tai vinkit alkuun. 

### Pelin teema

Nykyään termi _roguelike_ ei välttämättä tarkoita dungeon crawler tyyppistä hack-n-slash peliä. Sen sijaan ne kriteerit sallii ihan hyvin erilaisten pelien tekemistä, kunhan tietyt perusasiat ovat niissä kunnossa.

* Permadeath. Kun hahmo kuolee, se on siinä. Voi aloittaa alusta. a.k.a. Diablo hardcore mode.
* ASCII tai tile grafiikka, maailmaa on gridi pohjainen. Pelaaja on yleensä @ merkki, joka kulkee dungeonissa. Seinät ovat # merkeistä, lattia . merkeistä, ovet voivat olla kiinni + tai auki /, voi olla monstereita (D on lohikäärme, H haskell perhonen, k koira tai kobold, jne), esineet myös merkkejä, kuten ? on scrolli tai | miekka. Kultaa tietenkin kaikki haluaa löytyy: $$$.
* Turn based ajankäyttö. Aika aina etenee yhden vuoron kun pelaaja tekee jotain. Pelimaailma ei etene ellei pelaaja tee jotain
* Peliradan proceduraalinen (tai random:) ) generointi
* hack-n-slash taistelut on korkeasti arvostettuja :)
* Kompleksiteetti, asioita voi ratkoa useammalla eri tavalla
* Ympäristön tutkiminen

### Eli?

Dungeons and Dragons tyyppinen peli on yhtä hyvä kuin avaruusaluksen suojelu, viidakosta pois pääseminen tai zombie apocalypse. 

### Mitä mahtuu 7 tuntiin?

Aikaa on noin 7 tuntia, ja siihen ei kaikki kuitenkaan mahdu. Ylempänä mainittu repo sisältää yksinkertaisen templatein, jossa on perus-dungeon generointia käytetty ja hahmo voi liikkua ympärilleen. Lisäksi siinä on jotain rakenteita ja dataa idean-antona, mutta ei mitenkään pakollisena tekijänä. Ja toki saa kaiken kirjoittaa alusta loppuun uusiksi.

Mitä kaikkea siis voi edistää?

* Level generointi uusiksi / kustom level generoindi / kiinteät levelit
* Monsterit ja taistelu
* Erilaiset itemit
* Hahmoluokat ja rotut
* Hahmon kehitys, kokemuspisteet, levelit
* Magiaa / ampumaaseita
* Kaupat
* Integraatio backendin kanssa

Näistä lisää alempana.

### Ohjaus

Roguelike pelit ohjataan nuolinäppäimille. Usein on erilaiset erikoisnapit, kuten i tuo esiin inventory:n, q juo jonkun taikajuoman, jne. Tässä esimerkki ääripäästä, eli todella monimutkikkaasta ohjauksesta:

            a   Aim and fire a wand         @ B ~    Bash (object/creature)
            b   Browse a book                 C      Change name
            c ~ Close a door                @ D ~    Disarm a trap/chest
            d   Drop an item                  E      Eat some food
            e   Equipment list                F      Fill lamp with oil
            f   Fire/Throw an item            G      Gain new magic spells
            i   Inventory list                L      Locate with map
          @ j ~ Jam a door with spike         M      Map shown reduced size
            l ~ Look given direction        @ R      Rest for a period
            m   Magic spell casting           S      Search Mode
          @ o ~ Open a door/chest           @ T ~    Tunnel in a direction
            p   Pray                          V      View scoreboard
            q   Quaff a potion                =      Set options
            r   Read a scroll                 ?      Command quick reference
          @ s   Search for trap or door       {      Inscribe an object
            t   Take off an item            @ - ~    Move without pickup
            u   Use a staff                   . ~    Run in direction
            v   Version, credits and manual   /      Identify a character
            w   Wear/Wield an item            CTRL-K Quit the game
            x   Exchange weapon             @ CTRL-P Repeat the last message
            <   Go up an up staircase         CTRL-X Save character and quit
            >   Go down a down staircase    @ ~      for movement

Toki helpommaksikin voi sen tehdä, kuten esim Brogue sen tekee. 

### Inspiraatioita

* Blizzardin [Diablo pelit](https://en.wikipedia.org/wiki/Diablo_(series))
* [Nethack](https://www.nethack.org/), [Moria](http://www.roguebasin.com/index.php?title=Moria) (lataa esim [täältä](https://umoria.org/)), [Angband](http://rephial.org/), [Hack](http://www.roguebasin.com/index.php?title=Hack), klassiset roguelike pelit
* [Brogue](https://sites.google.com/site/broguegame/home)

## Lisä ideoita

Mitä sitten alettais tekemään?

### Backend ideoita

* __Pelin rekisteröinti__: pelit voivat ilmoittaa backendille heidän olemassaolosta, jonka jälkeen voivat lähettää sinne pisteitä ja muuta tietoja. Backend voi näin myös näyttää mitä pelejä on olemassa
* __API dokumentaatio__: ainakin jollain karkealla tasolla, jotta muut tiimit tietää miten kommunikoida backendin kanssa
* __Statsit__: backend ottaa vastaan kaikenlaiset statsit peleistä. Pelisession pituus, kuolemien määrä, jne jne.
* __Scoreboard__: pelit voivat lähettää score tietoja, jossa lukee hahmon nimi, XP, kulta, kuka tappoi, jne
* __UI__: Tietenkin backend pitää näyttää asiat. Näyttää mitä pelejä on, scoreboardit (erikseen tai yhdessä kaikki pelit), jne

### Pelimekaniikka ideoita

Itse lähestyn _roguelike_ pelin aina dungeon mielestä, mutta oikeastaan voitte koodata ihan mitä tahansa peliä, kunhan ylempänä mainitut kriteerit täyttyvät. Alempana listaan joitain roguelike pelejä, jotka ovat todellakin erikoisia.

Tässä vähän ideioita, mitä kaikkea peliin voi rakentaa. Tuskinpa kaikki kuitenkin ehtii toteuttaa :)

* __Classit__: Peli voi tukea erilaiset hahmoluokat, kuten taistelija, velho, jne.
* __Rotut__: ihmiset, kääpiöt, elfit, mitä vielä?
* __Dungeon__: rot.js sisältää dungeon generoinnin, mutta se generoi vain yhden tason, ja onko sitten loppumuoto ok sinulle? Peli voi sisältää monta tasoa, joiden välillä
* __Kokemuspisteet ja tasot__: kun pelihahmot tappaa monstereita, saa he kokemuspisteitä. Kun tarpeeksi pisteitä on saatu, nousee kokemus-taso (experience level), ja hahmosta tulee voimakkaampi, saa hän uusia kykyjä, jne
* __Monsterit ja taistelu__: Aika perusmateriaali on viholliset roguelike peleissä. Yleensä heitä representoidaan kirjaimilla, on eri kykyisiä ja vahvoja. Heitä vastaan taistellaan (yleensä jos yritetään liikkua suuntaan, jossa on vihollinen, tarkoittaa se hyökkäämistä)
* __Esineitä ja aarteita__: kultaa tietenkin, ja kaikenlaisia esineitä, miekkoja, hattuja, sormuksia, jne.
* __Loitsuja__
* __Kauppoja__: löydettyjä esineitä voi kaupata, tai ostaa uutta ja parempaa jos kullat vaan riittää
* __Tarina / kampanja__: Joissain peleissä on enemmän tai vähemmän tarinaakin mukana. Onko tarina yksinkertaista, kuin esim: mene alas tasolle 50 ja löydä amuletti? Vai onko se monimutkikkaampi? (toki meidän slotissa kannattaa varmaan tehdä aika simppeli tarina)
* __Konsoli__: kuka ei muistais Quake pelisarjan kuuluisan konsolin? Pitäisikö tehdä myös ~ napista avautuva terminal konsoli sinunkin peliin? Katso [jQuery Terminal](http://terminal.jcubic.pl/)! 
* __Äänet__: musiikkia? Googlaa html5 audio ... ;)
* __Load/Save__: roguelike pelejä ei yleensä voi tallentaa erikseen, muuten kuin keskeyttää pelisessio, ja jatkaa samasta kohdasta seuraavalla keralla. Permadeathin tarkoitus korostuu näin, koska yleensä tallennettu peli poistetaan kun kuolema tulee. 

### Erikoiset roguelike ideat

* 

### Kieli

Peli saa puhua englanttia tai suomea, ihan miten vaan :)