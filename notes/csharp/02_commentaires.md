# Commentaires

Le 22-09-2022

Rédiger du texte informatif dans le code.

## Standard C#

Les **commentaires en une ligne ou en bout de ligne** s'écrivent avec `//`.

Les **blocs de commentaire** `/* texte */` peuvent être multilignes. Les étoiles ajoutées par Visual Studio à chaque ligne peuvent être supprimées.

Pour les **commentaires techniques**, entrer `///` au-dessus d'une fonction, d'une classe, d'un champ, puis appuyer sur la touche `Entrée`. Visual Studio ajoute un sommaire, des paramètres. Ces informations apparaissent en *Intellisense* pour fournir une aide au développeur. 
```
/// <summary>
/// Test de <b>fonction</b>.<br/>Ceci est une nouvelle ligne.
/// <para>toto</para>
/// </summary>
/// <param name="str">Chaîne de caractères</param>
/// <returns>Une valeur booléenne</returns>
private bool MaFonction(bool value)
{
	return value;
}
```

Un pratique répandue consiste à écrire un commentaire de présentation du script en début de celui-ci, par exemple : 
```
/*
PRESENTATION
.... du texte...
ARCHITECTURE
.... du texte...
*/
```

## Dans Unity

L'*attribute* `Tooltip` d'Unity est utilisable sur les champs. Cet attribut fonctionne ET pour Visual Studio ET pour l'*Inspector* (passer le curseur de la souris sur le nom du champ concerné).
```
[Tooltip("Des infos sur un Collider.")]
[SerializeField] private Collider _collider;
```
