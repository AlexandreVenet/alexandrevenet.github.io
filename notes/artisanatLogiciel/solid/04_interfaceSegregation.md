# Ségrégation des interfaces

le 16-08-2025

Des petites interfaces.

## Argument

Même les interfaces doivent n'avoir qu'une seule responsabilité, car une entité qui les utilise ne devrait pas dépendre de membres dont elle ne se sert pas.

## Exemple

Jouons en application Console .NET C# avec une imprimante, un scanner, et un appareil multifonction qui propose et l'impression et le scan. Admettons qu'on dispose déjà d'un type `Document`.

```C#
public interface IMachine
{
	void Imprimer(Document doc);
	void Scanner(Document doc);
}
```

Voilà, avec `IMachine`, je peux tout faire. Or, si je veux créer une machine qui ne fait qu'imprimer, malheureusement cette machine embarquera nécessairement un scanner même si je ne m'en servirai jamais. Idem avec une machine qui ne fait que scanner, elle embarquera tout aussi inutilement une imprimante.

Donc, il est plus judicieux de scinder cette interface en plusieurs plus petites. On peut ainsi composer nos machines selon nos besoins et de façon suffisante.

```C#
public interface IImprimante
{
	void Imprimer(Document doc);
}

public interface IScanner
{
	void Scanner(Document doc);
}
```
```C#
public class Scanner : IScanner
{
	public void Scanner(Document doc) => Console.WriteLine("Scan...");
}

public class Imprimante : IImprimante
{
	public void Imprimer(Document doc) => Console.WriteLine("Impression...");
}

public class ScannerImprimante : IImprimante, IScanner
{
	public void Imprimer(Document doc) => Console.WriteLine("Impression...");
	public void Scanner(Document doc) => Console.WriteLine("Scan...");
}
```
