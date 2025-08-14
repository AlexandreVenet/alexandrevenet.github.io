# Gestion des erreurs

Le 14-08-2025

Notes du chapitre 7 : le code de traitement des erreurs ne doit pas encombrer la logique métier.

## Exceptions plutôt que codes de retour

Ne pas utiliser de codes de retour personnalisés car cela encombre le code appelant qui doit vérifier la présence d'erreurs immédiatement après l'appel. Mieux vaut utiliser une exception. Le code appelant en gagnera en clarté.

## Fonctions de gestion d'erreur

Écrire la fonction attendue. Écrire une autre fonction qui ne possède qu'un `try...catch` pour la fonction attendue. Ainsi, les deux aspects sont séparés et plus faciles à manipuler, modifier, de façon indépendante.

## Approche par les tests

Développer « négativement » une fonction en pensant d'abord aux erreurs qu'elle risque de produire. Ceci conduit à poser rapidement un `try...catch`, ce qui peut certes ralentir le développement de la fonctionnalité, mais fournit un gain de temps considérable sur le reste du développement du programme : en effet, tous les tests ayant été passés, la fonction est validée et utilisable sereinement (pas besoin d'y revenir plus tard). De plus, si d'autres erreurs doivent être gérées, il suffira de compléter la structure `try... catch` déjà en place (plutôt que tout créer plus tard).

## Informer dans l'exception

Fournir un message personnalisé pour chaque exception. Sans cela, la maintenance implique revoir tout le code (perte de temps, efforts inutiles).

## Définir les classes d'exceptions selon les besoins de l'appelant

Voyons les appels à une API. Si chaque `catch` fait la même chose, alors créer une classe enveloppant les appels d'API, appels qui feront l'objet de méthodes ne contenant qu'un `try...catch`. Avantages : 
- un `try...catch` léger dans l'appelant, voire pas du tout si les exceptions doivent être gérées plus spécifiquement,
- facilité de maintenance, d'évolution, de changement de fournisseur d'API car la classe d'enveloppe est la seule à communiquer avec l'API.

Attention, la classe d'enveloppe pour les exceptions est une sélection : il faut décider comment traiter ce qu'elle ne couvre pas.

```Java
// Code principal
LocalPort port = new LocalPort(12);
try
{
	port.open();
}
catch (PortDeviceFailure e)
{
	reportError(e);
	logger.log(e.getMessage(), e);
}
finally {...}

// Entité
public class LocalPort
{
	private ACMEPort innerPort;
	
	public LocalPort(int portNumber)
	{
		innerPort = new ACMEPort(portNumber);
	}
	
	public void open()
	{
		try
		{
			innerPort.open();
		}
		catch(DeviceResponseException e)
		{
			throw new PortDeviceFailure(e);
		}
		catch(ATM1212UnlockedException e)
		{
			throw new PortDeviceFailure(e);
		}
		catch(GMXError e)
		{
			throw new PortDeviceFailure(e);
		}
		// Poursuivre si nécessaire
	}
}
```

## Définir le flux normal

Si le cas nominal passe par un traitement d'erreur, alors envelopper le traitement de l'erreur dans une fonction dédiée. Ainsi, le traitement de l'erreur est délégué à du code spécifique et n'encombre pas la lecture du code normal.

Dans l'exemple précédent, je pourrais transformer en fonction le code principal : tous, seulement le `try...`, seulement le corps du `catch`... ?

## Ne pas retourner null

Retourner `null` est selon l'auteur une pratique qui a tendance à accumuler les erreurs car (1) tester `null` s'oublie vite, (2) tester `null` se retrouve de nombreuses fois dans tout le programme.

S'il faut absolument tester `null` (exemple : communiquer avec une API tierce), alors on peut créer une classe ou fonction d'enveloppe spécifique de ce test.

`null` concerne les types référence. Donc, on peut l'éviter par l'instanciation. Par exemple : instancier une collection vide.

## Ne pas passer null

Ne pas passer `null` à une fonction est difficile. Par conséquent, c'est la fonction elle-même qui doit lever une exception lorsque ce la se produit (ou bien utiliser une valeur par défaut si nécessaire).

