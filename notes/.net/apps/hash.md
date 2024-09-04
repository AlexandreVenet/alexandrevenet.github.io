# Hash

Le 04-09-2024

Hacher, saler, poivrer, mélanger : une donnée bien cuisinée.

## Introduction

Sources : [OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html _blank), [Wikipédia](https://fr.wikipedia.org/wiki/Fonction_de_hachage _blank)

Une donnée qui doit être maintenue secrète, comme un mot de passe par exemple, n'est pas conservée dans un état qui en facilite la lecture. La donnée fait l'objet d'une conversion en un ***hash***.

En anglais, l'OWASP distingue ***hashing*** et ***encryption***. Un mot de passe doit être hashé car le hashage est une **opération à sens unique**, alors que l'*encryption* est à double sens (on peut retrouver l'un de l'autre et inversement).

Le hash est de **longueur fixe**. Comme le hashage est une opération à sens unique, on dit que le hash est **unidirectionnel**. Le hash est **déterministe** car la même entrée produit le même hash (sinon, ce n'est que du brouillage inutile).

Le hash doit permettre la comparaison de valeur : si je renseigne un mot de passe dans un formulaire, il faut ensuite hasher ce mot de passe puis le comparer avec le hash stocké.

Maintenant, en pratique, un hash s'obtient par une méthode de calcul. Il existe de nombreuses méthodes de calcul de hash qui sont plus ou moins efficaces, rapides, consommatrices de ressources... Exemples : Argon2id, scrypt, bcrypt, PBKDF2. La qualité des hashs obtenus est donc variable et il convient de trouver une bonne méthode, c'est-à-dire une méthode qui corresponde aux besoins, au contexte.

Le hashage doit (prescription) effectuer des opérations qui assurent une bonne **entropie** (du désordre). 
- **Hashage** : méthode de calcul proprement dite.
- **Sel** : ajout de valeur aléatoire, unique, spécifique du hash. Le sel doit être stocké en base de données avec le hash. Il est réutilisé pour effectuer la comparaison.
- **Poivre** : ajout de valeur unique, utilisée pour toutes les données. Le poivre est conservé non pas en base de donnée, mais par exemple en coffre-fort, ou dans la configuration du programme, ou en variable d'environnement... 
- **Itérations** : on parle de *work factor*. Itérer augmente la complexité du chiffrement. Il y a un équilibre à trouver : si itérer augmente la sécurité, cela nécessite du temps de calcul (temps qui peut être exploité par exemple pour faire un déni de service).

Hash, sel, poivre existent quelque part (stockage en base de données, en mémoire...). Dans tous les cas, il faut penser leur **format** (binaire, base64, hexadécimal...) et les **conversions** nécessaires. 

## Exemple

Le reste de ce document présente un exemple d'implémentation et utilisation. 

On veut effectuer les étapes suivantes : d'abord hasher un texte (obtenir un *cypher text* d'un *plain text*), ensuite hasher un second texte identique au premier, enfin comparer les deux hashs (ils doivent être identiques). 

Sources 
- [Microsoft *Learn*](https://learn.microsoft.com/en-us/troubleshoot/developer/visualstudio/csharp/language-compilers/compute-hash-values _blank)
- [Stack Overflow Comparaison de hashs](https://stackoverflow.com/questions/985651/comparing-hash-passwords _blank)
- [Stack Overflow *Hash string*](https://stackoverflow.com/questions/3984138/hash-string-in-c-sharp _blank)

Le programme est de type Console. Créons une classe `MonHash` qui contiendra notre programme et une seule méthode publique `Demarrer()`. La classe `Program.cs` contient le minimum.

```C#
class MonHash
{
	public void Demarrer()
	{
		//...
	}
}
```

```C#
internal class Program
{
	static void Main(string[] args)
	{
		new MonHash().Demarrer();
		Console.ReadKey();
	}
}
```

On va souvent utiliser des tableaux d'octets : `byte[]`. Les hashs seront de ce type de données.


## Sel

Commençons par le **sel**. Il est généré aléatoirement avec le type `RandomNumberGenerator` : entropie maximisée, valeurs plus imprévisibles qu'avec `Random`. La longueur minimum conseillée par l'OWASP est de 16 octets ; ici, je choisis 32.

```C#
private byte[] Sel()
{
	byte[] sel = new byte[32]; // 256 bits ÷ 8 
	RandomNumberGenerator.Fill(sel);
	return sel;
}
```

## Poivre

Calculons le **poivre**. L'OWASP conseille une longueur minimum de 32 octets. Tous les caractères sont autorisés. Ici, la fonction écrit en sortie une information sur la longueur du poivre.

```C#
private byte[] Poivre()
{
	int minimumBytes = 32; 
	
	byte[] poivre = Encoding.UTF8.GetBytes("§«»çĦƔҘἇ❤≈⇔9⁰€ !");
	
	int poivreBytes = poivre.Length;
	
	Console.WriteLine(poivreBytes >= minimumBytes ? $"Le poivre fait au moins {minimumBytes} octets : {poivreBytes}" : "Poivre trop court.");
	
	return poivre;
}
```

## Méthode de hashage

Voyons maintenant la **méthode de hashage**. .NET fournit le type `Rfc2898DeriveBytes` qui présente la méthode `Pbkdf2()` pour effectuer le hashage avec sel, itérations, choix de l'algorithme, contrôle de la longueur en sortie. Avant .NET6, l'utilisation de ce type était différente ; je présente le code historique en commentaires.

Sources 
- [Anthony Simmon](https://anthonysimmon.com/evolutive-and-robust-password-hashing-using-pbkdf2-in-dotnet _blank)
- [Microsoft *Learn* rfc2898derivebytes](https://learn.microsoft.com/en-us/dotnet/api/system.security.cryptography.rfc2898derivebytes _blank)
- [Stack Overflow](https://stackoverflow.com/questions/11412882/hash-password-in-c-bcrypt-pbkdf2 _blank)
- [Microsoft *Learn Hash password*](https://learn.microsoft.com/en-us/aspnet/core/security/data-protection/consumer-apis/password-hashing _blank)

La fonction de hashage ici présentée utilise la chaîne de caractères d'entrée. Cette chaîne est convertie en `byte[]` car c'est un tableau d'octets qui va être utilisé pour calculer le hash. Cette conversion implique le choix de l'encodage des caractères. Ici, j'ai choisi UTF-8 mais le contexte peut imposer d'utiliser un format non ASCII plus spécifique.

Le hash doit être d'une longueur fixe. Ici, je choisis 64 octets. La longueur fixe optimise le stockage (toutes dimensions identiques) et permet l'estimation des ressources nécessaires (calcul, stockage).

Conformément aux recommandations de l'OWASP, j'ajoute le poivre en utilisant HMAC, ici le type `HMACSHA512`. Source : [OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html _blank). 

Se sentir libre d'ajouter de la complexité, avant, pendant ou après les opérations.

```C#
private byte[] Hasher(string chaine, byte[] sel, byte[] poivre)
{
	byte[] chaineBuffer = Encoding.UTF8.GetBytes(chaine);
	
	int taille = 64; // 512 bits ÷ 8 
	
	// Version avant .NET6
	/*using (Rfc2898DeriveBytes pbkdf2 = new(
		password: chaineBuffer, 
		salt: sel,
		iterations: 300000,
		hashAlgorithm: HashAlgorithmName.SHA512
		// Pas de propriété pour la longueur. On passe la valeur dans GetBytes()
		))
	{
		byte[] hash = pbkdf2.GetBytes(taille);
	}*/
	
	// Version à partir de .NET6
	byte[] hash = Rfc2898DeriveBytes.Pbkdf2(
		password: chaineBuffer, // Par défaut, encodage UTF-8. On peut utiliser chaine
		salt: sel,
		iterations: 300000,
		hashAlgorithm: HashAlgorithmName.SHA512,
		outputLength: taille);
	
	// Appliquer le poivre
	using (HMACSHA512 hmac = new(poivre))
	{
		byte[] hmacBytes = hmac.ComputeHash(hash);
		return hmacBytes;
	}
}
```

## Stockage

Maintenant, effectuons le **stockage du hash et du sel utilisé pour ce hash**. Pour cet exemple, on ne fait que renseigner des variables du programme, en imaginant qu'il existe une base de données. Je choisis le format base64 car il produit une chaîne plus courte que l'hexadécimal et lisible (pour le débogage par exemple). On a donc besoin de deux méthodes : l'une pour convertir un tableau d'octets en chaîne formatée base64 (stockage), l'autre pour effectuer l'opération inverse (lecture).

```C#
private string ConvertirBytesEnBase64(byte[] hash)
{
	return Convert.ToBase64String(hash);
}
```

```C#
private byte[] ConvertirBase64EnBytes(string base64)
{
	return Convert.FromBase64String(base64);
}
```

## Comparaison

Enfin, nous avons besoin d'une **fonction de comparaison**. On peut utiliser LINQ et la méthode d'extension `SequenceEqual()`. On peut aussi considérer que ce serait ajouter des calculs, des dépendances, inutiles pour n'effectuer qu'une seule opération, et préférer rédiger une méthode spécifique.

```C#
private bool ComparerHashs(byte[] premier, byte[] second)
{
	if (premier == null && second == null) return true;
	if (premier == null || second == null) return false;
	if (premier.Length != second.Length) return false;
	for (int i = 0; i < premier.Length; ++i)
	{
		if (premier[i] != second[i]) return false;
	}
	return true;
}
```

## Usage

Codons la méthode `Demarrer()`. 
- Une chaîne quelconque représente la donnée à traiter. 
- Calcul du sel et du poivre. Avec cela, calcul du hash. 
- Hash et sel sont stockés en variables locales. Comme dit précédemment, on imagine une base de données.
- On crée une autre chaîne de caractères identique à la première. 
- Le sel est récupéré. On imagine l'avoir cherché en base de données par exemple à partir d'un identifiant qui aurait été fourni préalablement. Le sel est reconverti en `byte[]` pour utilisation.
- Le poivre existe dans la durée de notre programme ; on peut en disposer.
- Enfin, pour la comparaison : LINQ ou méthode personnelle.

```C#
public void Demarrer()
{
	string chaine = "Zéro plus zéro égale la tête à Toto ! ";
	
	byte[] sel = Sel();
	byte[] poivre = Poivre();
	byte[] hash = Hasher(chaine, sel, poivre);
	
	string sel64 = ConvertirBytesEnBase64(sel);
	string hash64 = ConvertirBytesEnBase64(hash);
	
	AfficherInfos(chaine, sel64, hash64);
	
	string chaine2 = chaine.Substring(0, chaine.Length); // Copie intégrale
	byte[] sel2 = ConvertirBase64EnBytes(sel64);
	byte[] hash2 = Hasher(chaine2, sel2, poivre);
	
	AfficherInfos(chaine2, sel64, ConvertirBytesEnBase64(hash2));
	
	bool hashsIdentiques = ComparerHashs(hash, hash2);
	// LINQ (extension) : bool hashsIdentiques = hashSel.SequenceEqual(hashSelItere2);
	
	AfficherComparaison(hashsIdentiques);
}
```

Deux méthodes ont été ajoutées pour afficher les données en sortie.

```C#
private void AfficherInfos(string chaine, string sel64, string hash64)
{
	Console.WriteLine($@"
Entrée
	{chaine}

Sel au format base64
	{sel64}

Hash au format base64
	{hash64}
");
}
```

```C#
private void AfficherComparaison(bool hashsIdentiques)
{
	Console.WriteLine(hashsIdentiques ? "Hashs identiques" : "Hashs différents");
}
```
