# Roguelike hackathon

## Yleiset tiedot

**Hackathon idea: ~~harjoitellaan javascriptiä~~ tehdään roguelike peli javascript kielellä!**

Hackathonin aikana kolmen hengen tiimit (saa myös sooloilla) kirjoittavat roguelike pelin. Aikaa noin 7 tuntia tuottaa toimiva peli.

*Roguelike mitä mitä?? --> Kaikki varmaan tuntee Nethackin?*
https://en.wikipedia.org/wiki/NetHack

*Ja jos ei vieläkään auennut, niin tässä vähän lisäinfoa: mitkä ovat roguelike pelit?*
https://en.wikipedia.org/wiki/Roguelike
http://www.roguebasin.com/index.php?title=Main_Page

Tavoite on käyttää Javascript kieltä toteutuksessa. Pelin aikaansaaminen kuitenkin vie aikaa, joten on hyvä käyttää valmista kirjastoa joka hoitaa perusasiat, kuten grafikat (ASCII of course!) ja kartat ja whatnot. Tämmöinen olisi rot.js joka soveltuu roguelike pelien tekemiseen Javascriptillä. 

Saa myös käyttää Typescript kieltä tai muuta Javascript esikääntäjä, jos tekijä(t) niin haluaa. En kuitenkaan tiedä miten hyvin rot.js toimii näiyden kanssa - asian selvittäminen on tiimien vastuulla!

*rot.js*
http://ondras.github.io/rot.js/hp/

Yksi tiimi saa tehdä backendiä (tietenkin myös Javascriptillä, eli Node.JS FTW!), joka kerää pelit yhteen, vastaanottaa statistiikkoja (montako kertaa kyseisessä pelissä on kuoltu), pisteitä ja saavutuksia (_Girho, anoreksinen barbaari kuoli levelillä 34, hänet tappoi myrkyllinen haskell perhonen, hän keräsi 7102 kultaa ja 90823 kokemuspistettä_, tms). 

Pelit voi halutessa käyttää PWA menetelmää toimiakseen offline (kvg PWA jos et tiedä :P, tai kysy Matilta!), säilyttää jotain asioita local storagessa (pelin tallennus), käyttää fetch() kutsuja backend API:n kanssa, jms. 

Vapaasti saa käyttää mitä tahansa Javascript lisäosaa tai kirjastoa mutta tietenkin voi yrittää mennä pelkällä vanilla.js:llä ;) (rot.js on vähän pakko ottaa mukaan jos haluaa edetä itse pelin kanssa).

Roguelike kriteereistä korostaisin:

- ASCII grafiikka (rot.js)
- Permadeath
- Random/Proceduraalinen generointi
(loput kriteerit: http://www.roguebasin.com/index.php?title=What_a_roguelike_is)

Tässä vaiheessa mittaisin kiinnostusastetta moista hackathonia kohti. Joten kommentit tähän threadiin tai sitten peukut jos kelpaa ja on kiinnostusta.

Ajankohta: 13.1.2018
Aloitus: 9.00

## Getting started

Kloonaa tämä repository tiimille. Jokainen tiimi työskentelee omassa repossa. 

### Repon rakenne

Tässä vähän mitä löytyy mistäkin.

* src hakemistosta löytyy minimitoteutuksen lähdekoodi.
* Backendin osalta tein vaan package.jsonin, backend tiimi voi edistää tätä asiaa haluammalla tavallaan eteenpäin.
* Roguelike osalta latasin valmiiksi rot.js kirjaston ja tein minimaalisen toteutuksen josta voi lähteä liikeelle. 

## roguelike peli

Tässä vähän ohjeita ja vaatimuksia itse peliä kohti. Ensimmäinen vaatimus on tietenkin, että näistä vaatimuksista voi poiketa, koska tarkoitus on pitää hauskaa ja koodata. Joten tämän sektion nimi kuuluisikin olla mielummin ehdotukset tai vinkit alkuun. 

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

Aikaa on noin 7 tuntia, ja siihen ei kaikki kuitenkaan mahdu. Ehdotan että pysytään dungeon crawler teemassa tämän rajallisuuden takia - ja koska rot.js tarjoaa valmiit karttageneraattorit tämmöiselle pelille. Mutta loppupelissä tiimi päättä!

Ylempänä mainittu repo sisältää yksinkertaisen templatein, jossa on perus-dungeon generointia käytetty ja hahmo voi liikkua ympärilleen. Lisäksi siinä on jotain rakenteita ja dataa idean-antona, mutta ei mitenkään pakollisena tekijänä. Ja toki saa kaiken kirjoittaa alusta loppuun uusiksi.

Mitä kaikkea siis voi edistää?

Itse lähestyn _roguelike_ pelin dungeon-crawler mielellä, mutta oikeastaan voitte koodata ihan mitä tahansa peliä, kunhan roguelike kriteerit täyttyvät. Tässä vähän ideioita, mitä kaikkea peliin voi rakentaa. Tuskinpa kaikki kuitenkin ehtii toteuttaa :)

* __Dungeon__: rot.js sisältää dungeon generoinnin, ja tekemäni template generoi vain yhden tason. 
  * Peli voi sisältää monta tasoa, joiden välillä liikutaan käyttäen portaita. Liikkua voi ylös-alas, eli tasot mahdollisesti säilyvät?
  * Level generointi uusiksi / custom level generoindi / kiinteät levelit. Tosiaan aikarajan takia suosittelen joko rot.js omaa generaattoria tai kiinteät levelit, ainakin alkuun.
  * Ei ole näkyvyys toteutettu, eli koko level näkyy heti ensalkuun -- yleensä pelaaja joutuu seikkailemaan ympärille jotta näkisi kaiken. Voi siis toteuttaa sen että kartta tulee näkyviin pikku hiljaa
  * Field of View implementaatio: rot.js voi auttaa FOV laskennassa, jolla pääse siis laskemaan mitä osia dungeonista näkyy. Katso [Field of View computation](http://ondras.github.io/rot.js/manual/#fov)
  * Valon käyttä. rot.js voi myös valotuksen laskennassa auttaa. [Global lighting](http://ondras.github.io/rot.js/manual/#lighting)
  * Magic mapping scroll, jolla saa koko kartan näkyviin
  * Reveal monsters scroll, jolla saa kaikki levelin monsterit näkymään ainakin hetkeks
* __Classit__: Peli voi tukea erilaiset hahmoluokat, kuten 
  * Taistelija
  * Velho
  * Barbaari
  * jne.
* __Rotut__: 
  * ihmiset
  * kääpiöt
  * keijut
  * mitä vielä?
* __Kokemuspisteet ja tasot__: kun pelihahmot tappaa monstereita, saa he kokemuspisteitä. Kun tarpeeksi pisteitä on saatu, nousee kokemus-taso (experience level), ja hahmosta tulee voimakkaampi, saa hän uusia kykyjä, jne
  * Toinen vaihtoehto on toki, että XP:stä voi ostaa uusia kykyjä, jolloin ei ole tasoa, mutta kokemuksen pohjalta hahmo kuitenkin kehittyy?
* __Monsterit ja taistelu__: Aika perusmateriaali on viholliset roguelike peleissä. Yleensä heitä representoidaan kirjaimilla, on eri kykyisiä ja vahvoja. Heitä vastaan taistellaan (yleensä jos yritetään liikkua suuntaan, jossa on vihollinen, tarkoittaa se hyökkäämistä). Monsterit myös liikkuu, jotkut seuraa pelaaja. Ei kaikki voi ovea avata, mutta jotkut voivat myös sen tehdä.
* __Esineitä ja aarteita__: kultaa tietenkin, ja kaikenlaisia esineitä voi toteuttaa mitä pelaaja voi löytää. Myös jonkinlainen inventaario-näkymä voi olla hyödyllistä. Ja jos esineitä on eri tarkoituksiin, niin pitäähän sekin tietää mitä niistä käytetään (eli jos sulla on 5 miekkaa mukana, millä niistä taistelet):
  * _Aseita_, kuten miekkoja, kirveitä, tikareita, jne
  * _Vaatteita_, kuten takkia, hattua
  * _Sormuksia_
  * jne.
* __Loitsuja__: Loitsut ovat suosittu lisä, mutta mistä ne tulevat?
  * Loitsut tulee classin kautta, esim jos olet velho, voit niitä heittää
  * Loitsut voi oppia, kuka tahansa voi niitä oppia
  * Loitsut käytetään vaan jonkun esineen esim. wandin tai scrollin avulla.
* __Ampumaaseita__: tai heittoaseita? Miten valitset kohteen?
* __Kauppoja__: löydettyjä esineitä voi kaupata, tai ostaa uutta ja parempaa jos kullat vaan riittää
* __Tarina / kampanja__: Joissain peleissä on enemmän tai vähemmän tarinaakin mukana. Onko tarina yksinkertaista, kuin esim: mene alas tasolle 50 ja löydä amuletti? Vai onko se monimutkikkaampi? (toki meidän slotissa kannattaa varmaan tehdä aika simppeli tarina)
* __Integraatio backendin kanssa__
* __Konsoli__: kuka ei muistais Quake pelisarjan kuuluisan konsolin? Pitäisikö tehdä myös ~ napista avautuva terminal konsoli sinunkin peliin? Katso [jQuery Terminal](http://terminal.jcubic.pl/)! 
* __Äänet__: musiikkia? Googlaa html5 audio ... ;)
* __Load/Save__: roguelike pelejä ei yleensä voi tallentaa erikseen. Jos kuitenkin suljet pelin, tallentaa se tilanteen jotta seuraavan kerran voisi jatkaa samasta paikasta. Tämähän sopii myös web sovellukselle! Toki roguelike-it yleensä poisti tämän tallenteen heti kun se ladattiin, tällä lailla tukevat permadeathiä. Tallenne esim poistetaan samalla hetkellä kun hahmo kuolee, ettei pelaaja voi sitä mitenkään ladata uudestaan.  

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

## Backend

Mitä odotetaan backendiltä? Noh ainakin seuraavat asiat:

* __Pelin rekisteröinti__: pelit voivat ilmoittaa backendille heidän olemassaolosta, jonka jälkeen voivat lähettää sinne pisteitä ja muuta tietoja. Backend voi näin myös näyttää mitä pelejä on olemassa
* __API dokumentaatio__: ainakin jollain karkealla tasolla, jotta muut tiimit tietää miten kommunikoida backendin kanssa
* __Statsit__: backend ottaa vastaan kaikenlaiset statsit peleistä. Pelisession pituus, kuolemien määrä, jne jne.
* __Scoreboard__: pelit voivat lähettää score tietoja, jossa lukee hahmon nimi, XP, kulta, kuka tappoi, jne
* __UI__: Tietenkin backend pitää näyttää asiat. Näyttää mitä pelejä on, scoreboardit (erikseen tai yhdessä kaikki pelit), jne

Mutta jos keksit vielä jotain, niin sitä parempi! :)

## Kieli

Peli saa puhua englanttia tai suomea, ihan miten vaan :)

## Kysymyksiä?

Lenard vastaa kysymyksiin eventin aikana, sitä ennen, ja sen jälkeen. Voi kysyä teknisiä, peli-teknisiä, ja muuta tapahtumaan liittyviä kysymyksiä.

## Valmistelu

Jos et tiedä miten koodata Javascriptia tai mitä työkaluja käyttäisit, niin tästä vähän eväistä.

Asenna Visual Studio Code (tämä toimii Macissä myös Windowsin lisäksi) ja jonkinlainen git clientti (Git for Windows). 

