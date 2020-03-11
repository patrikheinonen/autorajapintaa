# Auto rajapinta
Avoimet rajapinnat ja avoin data kurssin projekti

Käytetyt tekniikat:
- Frontend: Javascript, Bootstrap, CSS, HTML5
- Backend: Node.js
- Tietokanta: MariaDB

**Ohjeet projektin testaamiseen:**

Aja ensin luontiskripti joka löytyy projektin juuresta nimellä : dbCreationScript.

Kun työhakemistosi on autorajapintaa
kirjoita: npm start ja serveri käynnistyy jolloin voit tehdä api
kutsuja. Api kutsujen alku polku : ```http://localhost:8082```

Jos haluat kokeilla käyttöliittymää niin se löytyy osoitteesta ```http://localhost:8082```
kunhan olet ensin käynnistänyt serverin.

**Kutsumuodot:**

| **GET** | Cars |
| :--- | :--- |
| Näytä kaikki autot|  ```/cars``` |
| Näytä autot merkin perusteella | ```/cars/merkki``` |
| Näytä autot mallin perusteella | ```/cars/malli``` |

| **POST** | Cars |
| :--- | :--- |
| Lisää uusi auto |  ```/cars``` |

| **PUT** | Cars |
| :--- | :--- |
| Päivitä autoa |  ```/cars/AutoId``` |

| **DELETE** | Cars |
| :--- | :--- |
| Poista auto |  ```/cars/AutoId``` |

**Request Bodyn muoto:**
```
{
	"mark":String,
	"model":String,
	"year":Number,
	"fuel":String,
	"weight":Number,
	"co2":Number,
	"price":Number,
	"topSpeed":Number,
	"from0to100":Number,
	"horsePower":Number,
	"wheels":String,
	"img": String //Haluamasi valokuvan URL

	
}
```

Esimerkki API kutsusta
 - ```http://localhost:8082/cars/BMW```

Tulos:

```
[{"AutoId": 5,"Merkki": "BMW","Malli": "X7","Valmistusvuosi": 2016,"Polttoaine": "Korkealaatuinen bensiini","Paino": 2500,"CO2": 100,"Hinta": 30000,"MaxNopeus": 231,"NollastaSataan": 9,"HevosVoimat": 300,"VetävätRenkaat": "Neliveto","Kuva": "https://www.bmw.fi/content/dam/bmw/common/all-models/x-series/x7/2018/Inform/bmw-x7-inform-stage-desktop.jpg"}]
```