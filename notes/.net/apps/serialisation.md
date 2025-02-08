# Sérialisation

Le 03-09-2024

Convertir l'état d'un objet dans un format de données facilement manipulable.

## Introduction 

La **sérialisation** (*serialization*) consiste à convertir l'état d'un objet dans une format de données qui permette la persistance, le transfert. La **désérialisation** consiste à effectuer la conversion inverse : depuis le format vers un objet du langage, du programme. [Généralités sur la sérialisation](https://learn.microsoft.com/en-us/dotnet/standard/serialization _blank)

.NET propose des technologies de sérialisation : **JSON**, **XML**, **binaire**. Le choix dépend du besoin. [Choisir le sérialiseur](https://learn.microsoft.com/en-us/dotnet/standard/serialization/binaryformatter-migration-guide/choose-a-serializer _blank)


| | JSON | XML | Binaire |
|-|-|-|-|
| **Format** | Texte, notation d'objet JS | Texte, langage de balise|Bits|
| **Lisibilité** | Aisée. Moins verbeux que XML | Aisée. Verbeux, plus complexe que JSON | Pas lisible par un être humain, doit être interprété |
| **Taille** | Plus compact que XML, plus volumineux qu'en binaire | Plus volumineux que  JSON | Compact, optimisé pour espace de stockage et vitesse |
| **Usage** | Transferts sur le web | Pour données structurées, complexes. supporte les schémas de validation (XSD) | Pour des contextes où la performance est prioritaire (communication hauts débit, stockage, systèmes embarqués...) |
| **Facilité** | Simple, flexible, supporté par de nombreux langages de programmation | Plus complexe que JSON, nécessite une analyse plus lourde | Nécessite un schéma structurel |
| **Extensibilité** | Ne gère pas les schémas ce qui peut compliquer la validation des données | Très extensible, comprend des fonctionnalités avancées (*namespace*, commentaires, attributs...) | Très extensible mais nécessite la modification du schéma et  du code de génération pour les changements |

## JSON : fichier local

Admettons un fichier `.json` (donc une donnée sérialisée) édité manuellement et plutôt naïvement, encodé en UTF-8 et stocké dans le répertoire du programme. Pour des raisons de sécurité, l'entité parente doit toujours être un objet lorsqu'il s'agit de manipuler des *strings* ([source OWASP](https://cheatsheetseries.owasp.org/cheatsheets/AJAX_Security_Cheat_Sheet.html#always-return-json-with-an-object-on-the-outside _blank)). Le nom des entités est ici en PascalCase (on pourrait rester au camelCase par défaut en JS).

```JS
{
	"Donnees": [
		{
			"Id": 0,
			"MaDate": "2018-08-08T12:34:56",
			"Texte": "Je suis le texte."
		},
		{
			"Id": 1,
			"MaDate": "2000-01-01",
			"Texte": "Année 2000, premier jour"
		},
		{
			"Id": 10,
			"MaDate": "2022-12-31",
			"Texte": "Gné !"
		}
	]
}
```

Dans le programme, ces informations font l'objet de **modèles de données**. Voici un exemple d'implémentation :
- une entité parente pour gérer le tableau nommé `Donnees`,
- une entité représentant chaque objet du tableau, ici une `Donnee`.

```C#
internal class ParentModel
{
	public IEnumerable<DonneeModel> Donnees { get; set; }
}
```

```C#
internal class DonneeModel
{
	public int Id { get; set; }
	public DateTime MaDate { get; set; }
	public string Texte { get; set; }
}
```

Ensuite, posons simplement le chemin vers le fichier et admettons pour l'exemple que les vérifications et décisions sont prises. 

```C#
private string _cheminData = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "fichier.json");
```

Maintenant, il faut charger le fichier puis le **désérialiser**. Ici, je crée une fonction dédiée asynchrone :

```C#
private async Task<ParentModel> ObtenirDonnees()
{
	ParentModel parent;
	using (FileStream openStream = File.OpenRead(_cheminData))
	{
		parent = await JsonSerializer.DeserializeAsync<ParentModel>(openStream);
	}
	
	// synchrone
	//string jsonString = File.ReadAllText(_cheminData);
	//ParentModel parent = JsonSerializer.Deserialize<ParentModel>(jsonString);
	
	return parent;
}
```

Voici un exemple d'usage dans un contexte synchrone. Modifions une des entrées de la collection pour illustrer que nous disposons d'objets tout à fait ordinaires.

```C#
ParentModel parent = Task.Run(ObtenirDonnees).Result; // Contexte synchrone

foreach (var item in parent.Donnees)
{
	if(item.Id == 1)
	{
		item.Text = "Texte <modifié> par le programme. &% ";
	}
	
    Console.WriteLine($"{item.Id}, {item.MyDate.ToString("dd/MM/yyyy HH:mm:ss.fff")}, {item.Text}");
}
```

Maintenant, passons à la **sérialisation** de notre objet `ParentModel` tel qu'il a été modifié : 

```C#
string jsonString = JsonSerializer.Serialize(parent);
```

Voici le texte obtenu. Par défaut, le texte JSON est **minifié** pour réduire la quantité de données à transférer. De plus, JSON utilise l'encodage **ASCII** et représente les caractères spéciaux en **échappant les caractères** (`\u` en préfixe de chiffres hexadécimaux : *escapes*/*entities* **Unicode**), ceci à des fins d'interopérabilité et de sécurité (éviter l'insertion de code, faille XSS).

```JS
{"Donnees":[{"Id":0,"MyDate":"2018-08-08T12:34:56","Text":"Youpi"},{"Id":1,"MyDate":"2000-01-01T00:00:00","Text":"Texte \u003Cmodifi\u00E9\u003E par le programme. \u0026% "},{"Id":10,"MyDate":"2022-12-31T00:00:00","Text":"Gn\u00E9 !"}]}
```

Il est possible d'indenter le texte et d'inclure à des fins de lisibilité des plages de caractères (ne pas les échapper). Ceci s'effectue au moyen d'**options**. On constate néanmoins le maintien de l'échappement de caractères spéciaux relevant de sécurité.

```C#
var options = new JsonSerializerOptions 
{
	WriteIndented = true,
	Encoder = JavaScriptEncoder.Create(
		UnicodeRanges.BasicLatin,       // Caractères ASCII de base
		UnicodeRanges.Latin1Supplement, // Caractères spéciaux (é, ç...)
		UnicodeRanges.LatinExtendedA    // Autres caractères latins 
		),
};

string jsonString = JsonSerializer.Serialize(parent, options);
```

```JS
{
  "Donnees": [
    {
      "Id": 0,
      "MyDate": "2018-08-08T12:34:56",
      "Text": "Youpi"
    },
    {
      "Id": 1,
      "MyDate": "2000-01-01T00:00:00",
      "Text": "Texte \u003Cmodifié\u003E par le programme. \u0026% "
    },
    {
      "Id": 10,
      "MyDate": "2022-12-31T00:00:00",
      "Text": "Gné !"
    }
  ]
}
```

Maintenant, on peut inclure un caractère individuellement, par exemple `&` (*et* commercial, esperluette). Eh bien, cela ne fonctionne pas. Le code ci-dessous produit le même résultat que précédemment. En effet, la contrainte de sécurité est forte ; par conséquent, il conviendra de convertir ces caractères lors de la lecture des données JSON. — Inclure à l'écriture ces caractères spéciaux à risque est possible mais cela constituerait une augmentation de la surface d'attaque. 

```C#
var encoderSettings = new TextEncoderSettings();
encoderSettings.AllowRange(UnicodeRanges.BasicLatin);
encoderSettings.AllowRange(UnicodeRanges.Latin1Supplement);
encoderSettings.AllowRange(UnicodeRanges.LatinExtendedA);
encoderSettings.AllowCharacters('\u0026'); // &

var options = new JsonSerializerOptions
{
	Encoder = JavaScriptEncoder.Create(encoderSettings),
	WriteIndented = true
};

string jsonString = JsonSerializer.Serialize(parent, options);
```

Enfin, pour terminer l'exemple, enregistrons le fichier avec la modification. 

```C#
private void EcrireFichier(string texte)
{
	File.WriteAllText(_cheminData, texte, Encoding.UTF8);
}
```

```C#
EcrireFichier(jsonString);
```

Autres manipulations dans mon *repository* [TP JSON File](https://github.com/AlexandreVenet/TP_JsonFile _blank)

## JSON : API distante

Utiliser des API sur le web requiert [HttpClient](https://learn.microsoft.com/en-us/dotnet/fundamentals/networking/http/httpclient _blank). Pour cet exemple, effectuons une requête de verbe HTTP `GET` à une [API du service public français](https://api.gouv.fr _blank), l'API du découpage administratif  : [API Geo](https://api.gouv.fr/documentation/api-geo _blank)

On peut simplement récupérer les données au format texte. J'ai codé cette fonction asynchrone que j'appelle dans un contexte synchrone ou asynchrone.

```C#
private async Task ClientWebTexte()
{
	string apiUrl = "https://geo.api.gouv.fr/communes?codePostal=75001&fields=nom,code,codesPostaux,siren,codeEpci,codeDepartement,codeRegion,population&format=json&geometry=centre";

	using (HttpClient client = new())
	{
		using (HttpResponseMessage response = await client.GetAsync(apiUrl))
		{
			if (response.IsSuccessStatusCode)
			{
				string jsonResponse = await response.Content.ReadAsStringAsync();
				Console.WriteLine(jsonResponse);
			}
			else
			{
				// Gestion manuelle de l'erreur en gardant accès aux détails
				string errorResponse = await response.Content.ReadAsStringAsync();
				Console.WriteLine($"Erreur : {response.StatusCode} - {response.ReasonPhrase}");
				Console.WriteLine($"Détail : {errorResponse}");
			}
		}
	}
}
```

```C#
ClientWebTexte().Wait(); // Contexte synchrone
```

```C#
await ClientWebTexte(); // Contexte asynchrone
```

Voici la donnée reçue. Les crochets ouvrant et fermant représentent un tableau ; par conséquent, l'API nous retourne une collection. Que contient ce tableau ? Des objets. Ces objets ne sont pas nommés mais leurs propriétés le sont (`nom`, `code`, `codesPostaux`...).

```JS
[{"nom":"Paris","code":"75056","codesPostaux":["75001","75002","75003","75004","75005","75006","75007","75008","75009","75010","75011","75012","75013","75014","75015","75016","75017","75018","75019","75020","75116"],"siren":"217500016","codeEpci":"200054781","codeDepartement":"75","codeRegion":"11","population":2133111}]
```

Maintenant, passons à la désérialisation. Il n'est pas nécessaire d'utiliser le code C# qui précède car .NET fournit d'autres méthodes pour la conversion. Nous avons besoin simplement de créer nos **modèles de données** en veillant aux types utilisés (chaîne de caractères, nombre entier) puis de coder une autre fonction d'interrogation du serveur à la route demandée.

Ici, je vais créer le modèle `VilleModel`. Les propriétés `siren`, `codeEpci`, `codeDepartement` me sont inutiles, je vais donc les exclure ; ceci ne lèvera aucune erreur car c'est simplement sélectionner une partie des données sur la totalité des données reçues. Les codes postaux sont gérés simplement par un `Array` de `string`, que j'initialise avec une valeur par défaut, ce qui me permet de le manipuler sans me soucier de la valeur `null`. Enfin, je réécris `ToString()` pour faciliter le débogage. 

```C#
class VilleModel
{
	public string Nom { get; set; }
	public string Code { get; set; }
	public string[] CodesPostaux { get; set; } = Array.Empty<string>();
	public string CodeRegion { get; set; }
	public int Population { get; set; }

	public override string ToString()
	{
		StringBuilder sb = new ();
		sb.AppendLine("Nom : " + Nom);
		sb.AppendLine("Code : " + Code);
		sb.AppendLine("CodePostaux : " + string.Join(", ", CodesPostaux));
		sb.AppendLine("CodeRegion : " + CodeRegion);
		sb.AppendLine("Population : " + Population);
		return sb.ToString();
	}
}
```

Codons maintenant la fonction interrogeant l'API puis appelons cette fonction en contexte synchrone ou asynchrone. L'API retournant un tableau, je code pour l'exemple une collection de type `List` (on pourrait très bien préférer `IEnumerable` par exemple). 

```C#
private async Task ClientWebJson()
{
	string apiUrl = "https://geo.api.gouv.fr/communes?codePostal=75001&fields=nom,code,codesPostaux,siren,codeEpci,codeDepartement,codeRegion,population&format=json&geometry=centre";
	
	using (HttpClient client = new())
	{
		List<VilleModel>? liste = await client.GetFromJsonAsync<List<VilleModel>>(apiUrl);
		
		if (liste != null)
		{
			foreach (var item in liste)
			{
				Console.WriteLine(item);
			}
		}
	}
}
```

```C#
ClientWebJson().Wait(); // Contexte synchrone
```

```C#
await ClientWebJson(); // Contexte asynchrone
```

Voici le résultat en sortie. Notre collection est prête à l'emploi. 

```
Nom : Paris
Code : 75056
CodePostaux : 75001, 75002, 75003, 75004, 75005, 75006, 75007, 75008, 75009, 75010, 75011, 75012, 75013, 75014, 75015, 75016, 75017, 75018, 75019, 75020, 75116
CodeRegion : 11
Population : 2133111
```

## Binaire : fichier local 

.NET fournit les classes [BinaryWriter](https://learn.microsoft.com/fr-fr/dotnet/api/system.io.binarywriter _blank) et [BinaryReader](https://learn.microsoft.com/fr-fr/dotnet/api/system.io.binaryreader _blank) qui servent à manipuler des fichiers binaires écrits et lus ligne à ligne, dont les données sont non structurées et limitées aux [types intégrés primitifs](https://learn.microsoft.com/fr-fr/dotnet/csharp/language-reference/builtin-types/built-in-types _blank). Si ces entités sont utiles, elles impliquent coder par nous-mêmes le *parsing*, les vérifications de structure, de types, bref tous les traitements nécessaires pour alimenter les propriétés d'un objet. Ce n'est pas tout à fait de la sérialisation car ce qui est écrit ou lu ce sont les données et non pas un objet dans un certain état. 

Voyons [MessagePack](https://msgpack.org _blank), disponible pour de nombreux langages ainsi que pour Unity. Cet exemple consiste à créer un fichier binaire représentant un objet sérialisé, puis de lire ce fichier et de désérialiser les données.

Posons d'abord un chemin de fichier dans la classe principale de notre programme.

```C#
private string _cheminBinaire = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "toto.xyz");
```

Ensuite, créons un modèle de données en suivant les règles de MessagePack. 

```C#
[MessagePackObject]
public class MaSauvegarde // public nécessairement
{
	[Key(0)]
	public int Age { get; set; } = -1;
	[Key(1)]
	public string Prenom { get; set; } = "Non renseigné";
	[Key(2)]
	public string Nom { get; set; } = "Nom renseigné";
	
	[IgnoreMember]
	public string PrenomNom 
	{
		get => Prenom + ' ' + Nom; 
		//set; 
	}
	
	public override string ToString()
	{
		return $"{PrenomNom} a {Age} an(s).";
	}
}
```

Dans notre classe de programme, créons un champ d'objet. 

```C#
private MaSauvegarde _sauvegarde = new()
{
	Prenom = "Toto",
	Nom = "Tête de zéro",
	Age = 0,
};
```

On peut dorénavant créer la méthode de sérialisation et création de fichier, puis l'appeler en contexte synchrone ou asynchrone selon le besoin.

```C#
private async Task Sauvegarder()
{
	byte[] bytes = MessagePackSerializer.Serialize(_sauvegarde);
	
	using (FileStream fs = new(_cheminBinaire, FileMode.Create, FileAccess.Write))
	{
		await fs.WriteAsync(bytes, 0, bytes.Length);
	}
}
```

```C#
Sauvegarder().Wait(); // Contexte synchrone
```

```C#
await Sauvegarder() // Contexte asynchrone
```

Maintenant, créons la méthode dédiée à la lecture du fichier et la désérialisation de son contenu.

```C#
private async Task<MaSauvegarde> Lire()
{
	byte[] resultat;
	
	using (FileStream fs = new(_cheminBinaire, FileMode.Open, FileAccess.Read))
	{
		resultat = new byte[fs.Length];
		await fs.ReadAsync(resultat, 0, (int)fs.Length);
	}
	
	return MessagePackSerializer.Deserialize<MaSauvegarde>(resultat);
}
```

```C#
// Contexte synchrone
MaSauvegarde x = Task.Run(Lire).Result;
Console.WriteLine(x.ToString());
```

```C#
// Contexte asynchrone
MaSauvegarde x = await Lire();
Console.WriteLine(x.ToString());
```

On obtient en sortie :

```
Toto Tête de zéro a 0 an(s).
```

MessagePack fournit une méthode de conversion au format JSON mais elle ne sert qu'au débogage :

```C#
byte[] bytes = MessagePackSerializer.Serialize(_sauvegarde);

Console.WriteLine(MessagePackSerializer.ConvertToJson(bytes)); 
// [0,"Toto","Tête de zéro"]
```
