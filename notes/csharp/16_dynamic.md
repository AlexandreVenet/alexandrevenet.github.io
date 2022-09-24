# Dynamic

Le 24-09-2022

Un objet dont le type est résolu à l'exécution seulement.

## Introduction

Le type `dynamic` passe outre la vérification de type par le compilateur et est **résolu en type spécifique à l'exécution** par le CLR par déduction de la valeur. [MS Learn Dynamic](https://learn.microsoft.com/fr-fr/dotnet/csharp/programming-guide/types/using-type-dynamic "MS Learn Dynamic")
```
private dynamic toto = "Youpi !";
Console.WriteLine(toto.GetType());
```

## Conversion

Le type `dynamic` est converti implicitement par déduction de la valeur.
```
dynamic i = 10;
int j = i;
```

## Avec des objets

Si on affecte un objet à un type `dynamic` le compilateur ne vérifie pas les contenus (méthode, propriétés...). Par conséquent, il n'y a **pas d'erreur à la compilation.. mais il y en aura à l'exécution**.
```
class ClasseExemple
{
    public ClasseExemple() { }
    public ClasseExemple(int param) { }
	
    public void Methode1(int i) { }
    public void Methode2(string str) { }
}
	
dynamic x = new ClasseExemple();

x.Methode1(10, 4); 
x.UneMethodeInexistante(10, 4); 
x.AutreMethodeInexistante(); 
```

## Opérations

Le résultat d'opérations sur des types `dynamic` est souvent un type `dynamic`.
```
dynamic x = 1;
var test = x + 2;
	
Console.WriteLine(test);
```

Mais si le type peut être converti dynamiquement, alors le CLR effectue la conversion.
```
var ex = new ClasseExemple(2); // type ClassExemple
```