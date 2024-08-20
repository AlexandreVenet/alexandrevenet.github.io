# Interface

Le 18-08-2024

Une entité qui définit des fonctionnalités et qui contraint des entités à les implémenter.

## L'*Inspector*

Selon la version d'Unity, les interfaces ne sont pas nécessairement sérialisées, donc ne sont pas affichées dans l'*Inspector*. Des solutions de contournement plus ou moins complexes existent.

**Solution 1** : remplacer les interfaces par des classes abstraites. On crée une classe héritant de la classe de base, puis par exemple on définit un champ dans une classe d'objet joueur.

```C#
public abstract class MaBase : MonoBehaviour 
{
	public abstract void Utiliser(); 
}
```

```C#
public class Derivee : MaBase 
{ 
	public override void Utiliser()
	{ 
		//...
	}
} 
```

```C#
[SerializedField] MaBase chose;
```

**Solution 2** : passer par une variable passerelle et rafraîchir la variable cible. S'il y a une erreur, utiliser non des `Array` mais des `List`.

```C#
public List<IMonInterface> monInterface  = new List<IMonInterface>(); // ne s'affiche pas
public List<MonoBehaviour> mesScripts = new List<MonoBehaviour>(); // scripts implémentant l'interface

private void OnValidate() // en éditeur : au chargement ou au changement de contenu
{
	monInterface.Clear();
	foreach (MonoBehaviour item in mesScripts)
	{
		if (item is IMonInterface)
		{
			monInterface.Add((IMonInterface) item);
		}
	}
}
```

Dans cette solution 2, on peut très bien **appeler la méthode de l'interface directement**, ce qui évite de devoir passer par une seconde liste. La syntaxe est un peu particulière :

```C#
public List<MonoBehaviour> mesScripts = new List<MonoBehaviour>(); // scripts implémentant l'interface

if (mesScripts.Count > 0)
{
	foreach (MonoBehaviour mb in mesScripts)
	{
		if (mb is IMonInterface)
		{
			((IMonInterface)mb).LaMethode(); // syntaxe du cast d'appel de méthode
		}
	}
}
```
