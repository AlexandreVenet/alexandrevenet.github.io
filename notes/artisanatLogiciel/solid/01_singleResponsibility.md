# Responsabilité unique

Le 16-08-2025

Une entité se charge d'une seule chose.

## Argument

Une classe ou un module est responsable d'une seule chose. Si cette entité doit être modifiée ultérieurement, alors elle n'a qu'une seule raison de changer. Cela permet de conserver un code simple, lisible, et des entités indépendantes.

La responsabilité unique ne signifie pas qu'une entité est réduite à une seule action (par exemple une seule méthode publique). Il est peut-être nécessaire pour l'entité de passer par plusieurs étapes ou d'exposer plusieurs méthodes. L'effort consiste à concevoir le périmètre, les limites de l'entité, c'est-à-dire définir ce dont elle a la charge (on peut construire la notion de l'entité par sa nature, ce qu'elle est, ou inversement par sa responsabilité dont on va déduire une essence, un nom).

## Exemple

Traitons des factures à imprimer et à sauvegarder dans une application Console .NET C#. On ne s'occupe dans cet exemple que de données, pas de mise en forme (pas de fichier PDF ou d'image de facture).

```C#
// Une facture ne s'occupe que des données comptables
public class Facture
{
	public int Numero { get; set; }
    public decimal Montant { get; set; }
	
    public void CalculerTotal() { /* ... */ }
}
```
```C#
// Une imprimante de facture ne s'occupe que d'imprimer une facture
public class FactureImprimante
{
    public void Imprimer(Facture facture) { /* ... */ }
}
```
```C#
// Une sauvegarde de facture s'occupe que de sauvegarder une facture
public class FactureSauvegarde
{
    public void Sauvegarder(Facture facture) { /* ... */ }
}
```

Dans cet exemple, chaque entité est clairement définie : facture, imprimante et facture, sauvegarde de facture. 

L'imprimante et la sauvegarde sont peut-être encore trop spécifiques de la facture. Comment les généraliser tout en respectant le principe de responsabilité unique ? 

Introduisons la notion de document. Une facture est un type de document, l'imprimante et la sauvegarde traitent un document qui peut être spécifiquement une facture ou non, du moment que le document fournit l'essentiel au traitement. 

Parfait mais comment mettre en œuvre cette notion de document : interface, classe ? Une classe pour stocker concrètement des informations dans des attributs, une interface pour poser une abstraction comportementale, un modèle. À première vue, notre document n'a besoin que de fournir son contenu (qui peut être spécifiquement une facture ou non), donc optons pour une interface.

```C#
public interface IDocument
{
	string ObtenirContenu();
}
```
```C#
public class Facture : IDocument
{
	public int Numero { get; set; }
	public decimal Montant { get; set; }

	public string ObtenirContenu()
	{
		return $"Facture n°{Numero} - Montant : {Montant} €";
	}

	public void CalculerTotal() { /* ... */ }
}
```
```C#
public class Imprimante
{
	public void Imprimer(IDocument document)
	{
		Console.WriteLine("Impression en cours...");
		Console.WriteLine(document.ObtenirContenu());
	}
}
```
```C#
public class SauvegardeFichier
{
	public void Sauvegarder(IDocument document, string chemin)
	{
		Console.WriteLine("Sauvegarde en cours...");
		File.WriteAllText(chemin, document.ObtenirContenu());
		Console.WriteLine($"Document sauvegardé dans {chemin}");
	}
}
```
```C#
// Usage
var facture = new Facture { Numero = 123, Montant = 456.78m };

var imprimante = new Imprimante();
imprimante.Imprimer(facture);

var sauvegarde = new SauvegardeFichier();
sauvegarde.Sauvegarder(facture, "facture123.txt");
```

De cette manière, on peut imprimer et sauvegarder d'autres documents que la seule facture (rapport, contrat...). Le principe d'ouvert/fermé est respecté : ouvert à l'extension mais pas à la modification (la notion de document n'a pas à changer). Le principe d'inversion de dépendance est aussi respecté car l'imprimante et la sauvegarde dépendent d'une abstraction et non pas d'une classe concrète.

On peut mettre en œuvre l'imprimante et la sauvegarde d'une autre manière en .NET C# : avec un type générique. Ceci a l'avantage de poser un outil dans sa spécificité et donc d'assurer une certaine sécurité de type (par exemple, on ne passe pas un rapport à une imprimante de facture). Ceci a l'inconvénient de devoir créer une imprimante par type. La généricité respecte-t-elle néanmoins SOLID ? Oui car `T` réfère à l'abstraction `IDocument` et l'imprimante et la sauvegarde sont codées de façon plus abstraite que sans généricité, et les entités ont toujours une responsabilité unique.

```C#
public class Imprimante<T> where T : IDocument { /*...*/ }
```
```C#
// Usage
var imprimanteFacture = new Imprimante<Facture>();
imprimanteFacture.Imprimer(facture);
```
