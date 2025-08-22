# Annotations

Le 22-08-2025

Valider une donnée en une ligne.

## Introduction

D'ordinaire, on valide une donnée en effectuant des tests. C# propose des **annotations** ou **attributs** pour faciliter ces traitements. Les annotations sont très utilisées notamment en ASP.NET ou Blazor.

Les annotations se trouvent dans l'espace de noms `System.ComponentModel.DataAnnotations`. 
- Elles prennent la forme d'une instruction entre crochets juste au-dessus du **membre** concerné ou juste au-dessus de la **classe**.
- Si plusieurs annotations sont à déclarer, les inscrire chacune sur une nouvelle ligne ou bien séparées par des virgules.
- Ce sont des méthodes et peuvent donc prendre des paramètres. Attention à la syntaxe : remarquer l'usage des caractères `:` et `=`, le caractère obligatoire ou non du paramètre. 

## Déclaration

Un membre obligatoire, un autre obligatoire avec un message personnalisé, dans une langue spécifique :

```C#
public class Personne
{
	[Required]
	public string Nom { get; set; }
	
	[Required(ErrorMessage = "Requis")]
	public string Prenom { get; set; }
}
```

Deux annotations pour la même propriété et valider la donnée selon une expression régulière :

```C#
[Required(ErrorMessage = "Requis")]
[RegularExpression(pattern: "[A-Za-z0-9]{5, 10}", ErrorMessage = "5 à 10 caractères alphanumériques")]
public string Reference { get; set; }
```

Imposer un intervalle de valeurs, par exemple pour un prix ; ici avec la syntaxe utilisant la virgule en séparateur. On peut récupérer les valeurs renseignées (ici `{1}` pour le minmum) et les mettre en forme.

```C#
[Required(ErrorMessage = "Requis"), 
Range(minimum: 0.0, maximum: 999.99, ErrorMessage = "Prix compris entre {1:0.00}€ et {2:0.00}€")
]
public double Prix { get; set; }
```

Imposer un nombre de caractères. Remarquer qu'il est possible de récupérer les valeurs utilisées pour les utiliser dans le message : ici, `{2}` et `{1}` récupèrent dynamiquement les valeurs utilisées, respectivement 5 et 20.

```C#
[StringLength(maximumLength: 20, MinimumLength = 5, ErrorMessage = "Longueur requise entre {2} et {1} caractères")]
public string Nom { get; set; }
```

Valider le courriel :

```C#
[EmailAddress(ErrorMessage = "Doit être une adresse courriel valide")]
public string Courriel { get; set; }
```

Valider une URL :

```C#
[Url(ErrorMessage = "Doit être une URL")]
public string Page { get; set; }
```

Valider selon un critère personnalisé : il est nécessaire de définir une classe de validation.

```C#
public class Personne
{
	[CustomValidation(typeof(PersonneValidateur), nameof(PersonneValidateur.ValiderDateNaissance))]
	public DateTime DateNaissance { get; set; }
}
```

```C#
public static class PersonneValidateur
{
	public static ValidationResult ValiderDateNaissance(DateTime date, ValidationContext contexte)
	{
		if (date > DateTime.Now)
		{
			return new ValidationResult("La date de naissance doit être dans le passé.");
		}
		return ValidationResult.Success;
	}
}
```

Application d'une validation personnalisée à une classe pour poser les règles globales :

```C#
[CustomValidation(typeof(CommandeValidateur), nameof(CommandeValidateur.ValiderCommande))]
public class Commande
{
    public int Quantite { get; set; }
    public decimal Prix { get; set; }
}
```

```C#
public static class CommandeValidateur
{
	public static ValidationResult ValiderCommande(Commande commande, ValidationContext contexte)
	{
		if (commande.Quantite <= 0)
		{
			return new ValidationResult("La quantité doit être positive.");
		}	
		if (commande.Prix <= 0)
		{
			return new ValidationResult("Le prix doit être supérieur à zéro.");
		}	
		return ValidationResult.Success;
	}
}
```

## Validation

En ASP.NET, la validation est automatique. Mais en Console par exemple, elle ne l'est pas car les annotations seules ne représentent que des critères à la procédure. La validation reste possible mais il faut coder la procédure. 

La validation la plus simple s'effectue avec `Validator.ValidateObject()`. On obtient ainsi la première erreur trouvée.

```C#
public class Chose
{
	[Required(ErrorMessage = "La référence de la chose est requise.")]
	public string Reference { get; set; }
	
	[Required(ErrorMessage = "Le nom de la chose est requis.")]
	public string Nom { get; set; }
}
```
```C#
Chose chose = new();

try
{
	ValidationContext validation = new(chose);
	Validator.ValidateObject(chose, validation);
}
catch (Exception e)
{
	Console.WriteLine(e.Message);
}
// La référence de la chose est requise.
```

Pour avoir toutes les erreurs, utiliser `Validator.TryValidateObject()`. Cette méthode requiert une liste de résultats.

```C#
Chose chose = new();

ValidationContext validationContexte = new(chose);

List<ValidationResult> resultatsValidation = new();

if (Validator.TryValidateObject(chose, validationContexte, resultatsValidation, validateAllProperties: true))
{
	Console.WriteLine("L'instance de Chose est OK");
}
else
{
	Console.WriteLine("L'instance de Chose est KO :");
	foreach (ValidationResult resultat in resultatsValidation)
	{
		//Console.WriteLine($"- {resultat.MemberNames.First()} : {resultat.ErrorMessage}");
		// First() : First() est une méthode de LINQ
		
		// Sans LINQ :
		string membre = null;
		using (IEnumerator<string> enumerator = resultat.MemberNames.GetEnumerator())
		{
			if (enumerator.MoveNext())
			{
				membre = enumerator.Current;
			}
		}
		Console.Error.WriteLine($"- {membre} : {resultat.ErrorMessage}");
	}
}
// L'instance de Chose est KO :
// - Reference : La référence de la chose est requise.
// - Nom : Le nom de la chose est requis.
```

Idem avec les annotations personnalisées. Ici, simplement, le type `DateTime` est déclaré nullable car c'est un `struct` et a donc une valeur par défaut : `DateTime.MinValue` (01/01/0001) ; ce qui satisfait la règle d'être dans le passé... mais autoriserait l'immortalité !

```C#
public class Personne
{
	[CustomValidation(typeof(PersonneValidateur), nameof(PersonneValidateur.ValiderDateNaissance))]
	public DateTime? DateNaissance { get; set; }
	
	[CustomValidation(typeof(PersonneValidateur), nameof(PersonneValidateur.ValiderNom))]
	public string Nom { get; set; }
}

public static class PersonneValidateur
{
	public static ValidationResult ValiderDateNaissance(DateTime? date, ValidationContext contexte)
	{
		if(date == null)
		{
			return new ValidationResult("La date de naissance est obligatoire.");
		}
		if (date > DateTime.Now)
		{
			return new ValidationResult("La date de naissance doit être dans le passé.");
		}
		return ValidationResult.Success;
	}
	
	public static ValidationResult ValiderNom(string nom, ValidationContext contexte)
	{
		if (string.IsNullOrWhiteSpace(nom) || nom.Length <= 3 || nom.Length > 20)
		{
			return new ValidationResult("Le nom doit avoir entre 3 et 20 caractères.");
		}
		return ValidationResult.Success;
	}
}
```
```C#
Personne toto = new();

ValidationContext validationContexte = new(toto);

List<ValidationResult> resultatsValidation = new();

if (Validator.TryValidateObject(toto, validationContexte, resultatsValidation, validateAllProperties: true))
{
	Console.WriteLine("toto est OK");
}
else
{
	Console.WriteLine("toto est KO : ");
	foreach (ValidationResult resultat in resultatsValidation)
	{
		Console.Error.WriteLine($"- {resultat.ErrorMessage}");
	}
}
// toto est KO :
// - La date de naissance est obligatoire.
// - Le nom doit avoir entre 3 et 20 caractères.
```

Dans le cas d'une annotation de classe, retenir que l'annotation `[CustomValidation]` ne renvoie qu'un seul résultat. C'est parfait pour valider une règle globalement ; mais c'est aussi la limite de cette API car on ne peut pas obtenir tous les résultats sur chaque membre uniquement avec une annotation de classe. Il faut donc choisir l'approche (globale ou par membre). Voici un exemple de validation globale qui étend l'exemple précédent :

```C#
[CustomValidation(typeof(PersonneValidateur), nameof(PersonneValidateur.ValiderPersonne))]
public class Personne
{
	[CustomValidation(typeof(PersonneValidateur), nameof(PersonneValidateur.ValiderDateNaissance))]
	public DateTime? DateNaissance { get; set; }
	
	[CustomValidation(typeof(PersonneValidateur), nameof(PersonneValidateur.ValiderNom))]
	public string Nom { get; set; }
}

public static class PersonneValidateur
{
	public static ValidationResult ValiderDateNaissance(DateTime? date, ValidationContext contexte)
	{
		if(date == null)
		{
			return new ValidationResult("La date de naissance est obligatoire.");
		}
		if (date > DateTime.Now)
		{
			return new ValidationResult("La date de naissance doit être dans le passé.");
		}
		return ValidationResult.Success;
	}
	
	public static ValidationResult ValiderNom(string nom, ValidationContext contexte)
	{
		if (string.IsNullOrWhiteSpace(nom) || nom.Length <= 3 || nom.Length > 20)
		{
			return new ValidationResult("Le nom doit avoir entre 3 et 20 caractères.");
		}
		return ValidationResult.Success;
	}
	
	public static ValidationResult ValiderPersonne(Personne personne, ValidationContext contexte)
	{
		if (personne != null
			&& string.Equals(personne.Nom, "Toto", StringComparison.OrdinalIgnoreCase)
			&& personne.DateNaissance == DateTime.MinValue)
		{
			return new ValidationResult("Ah non, pas de Toto de l'an 1.");
		}
		return ValidationResult.Success;
	}
}
```
```C#
Personne toto = new();

toto.Nom = "Toto";
toto.DateNaissance = DateTime.MinValue;
// Commenter ces deux lignes pour obtenir le même comportement que l'exemple précédent.

ValidationContext validationContexte = new(toto);

List<ValidationResult> resultatsValidation = new();

if (Validator.TryValidateObject(toto, validationContexte, resultatsValidation, validateAllProperties: true))
{
	Console.WriteLine("toto est OK");
}
else
{
	Console.WriteLine("toto est KO : ");
	foreach (ValidationResult resultat in resultatsValidation)
	{
		Console.Error.WriteLine($"- {resultat.ErrorMessage}");
	}
}
// toto est KO :
// - Ah non, pas de Toto de l'an 1.
```

