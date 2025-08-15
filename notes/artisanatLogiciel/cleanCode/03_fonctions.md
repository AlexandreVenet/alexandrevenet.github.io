# Fonctions

Le 14-08-2025

Notes du chapitre 3

## Faire une seule chose, être court

Une fonction doit faire une seule chose, la faire bien, ne faire qu'elle. 

Une fonction qui ne fait qu'une seule chose ne peut pas être décomposée en sections ou étapes. Donc, extraire ces choses et en faire des fonctions.

Si une fonction ne fait qu'une seule chose, alors cela implique des fonctions courtes. Si on souhaite faire des fonctions courtes, alors consacrer chaque fonction à une seule chose.

## Bloc et indentation

Pas de structures imbriquées. Ainsi, le niveau d'indentation ne doit pas être supérieure à un ou deux.

Par conséquent, il y a de grandes chances que le corps d'un `if`, `else` ou `while` appelle une fonction.

## Un niveau d'abstraction

Écrire des fonctions dont les concepts sont au même niveau d'abstraction. 

Dans le cas contraire, le lecteur peut ne pas déterminer si une expression est un concept essentiel ou un détail. Pire : des détails mélangés à des concepts essentiels conduisent à de plus en plus de détails.

```Java
getHTML();
string pagePathName = PathParser.render(pagePath);
toto.append("\n");
// Du haut vers le bas niveau
```

## Règle de décroissance

Chaque fonction est suivie des fonctions de niveau d'abstraction inférieure, de façon à lire le programme en descendant d'un niveau d'abstraction à la fois.

On peut penser la chose de la manière suivante. Une fonction est faite POUR quelque chose. Elle fait référence à d'autres fonctions de niveau inférieur d'abstraction, chacune étant faite POUR quelque chose.

## Switch

L'instruction `switch` sert à faire plusieurs choses à partir d'une expression. 

Ne l'utiliser qu'une fois, pour créer des objets polymorphes, et la cacher derrière une relation d'héritage, dans une fonction dédiée. En clair, c'est utiliser le patron Fabrique où la classe de fabrication renvoie des types dérivés de la classe de base. 

```Java
public abstract class Employee 
{
	public abstract boolean isPayday();
	public abstract Money calculatePay();
	public abstract void deliverPay(Money pay);
}
	
public interface EmployeeFactory
{
	public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType;
}
	
public class EmployeeFactoryImpl implements EmployeeFactory 
{
	public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType 
	{
		switch (r.type) {
			case COMMISSIONED:
				return new CommissionedEmployee(r); 
			case HOURLY:
				return new HourlyEmployee(r);
			case SALARIED:
				return new SalariedEmploye(r);
			default:
				throw new InvalidEmployeeType(r.type);
		}
	}
}
```

## Nommer une fonction

Une fonction que je lis doit correspondre presque parfaitement à ce que j'en attends par son nom.

## Arguments

Préférer :
- une fonction sans arguments (niladique),
- à une fonction à un argument (monadique, unaire),
- à une fonction à deux arguments (dyadique),
- à une fonction à trois arguments (triadique),
- à une fonction à plusieurs arguments (polyadique) qui doivent exiger d'excellentes raisons d'exister.

Une signature de fonction est en général plus facile à lire sans arguments qu'avec car l'argument se trouve à un niveau d'abstraction différent du nom de la fonction, ce qui oblige à connaître le détail de la fonction, détail qui peut ne pas être important à cette étape.

Le nombre de tests à effectuer sur une fonction augmente avec son nombre d'arguments.

Les arguments dits de sortie (c'est-à-dire avec un passage par référence) sont plus difficiles à comprendre que ceux d'entrée car moins utilisés que la seule valeur de retour. Il est souvent déroutant de modifier l'entité en entrée. Se fier en général à `return`. Si la fonction doit modifier quelque chose, faire en sorte que ce soit l'objet auquel elle appartient et non pas des entités extérieures par arguments de sortie.

Éviter l'usage d'arguments dits indicateurs, comme une valeur booléenne pour cibler un comportement selon `true` ou `false`. Préférer écrire une fonction pour chaque cas.

Pour réduire les arguments, tout est bon : 
- faire un membre d'instance, 
- créer des classes avec des méthodes spécifiques,
- créer une classe dont le constructeur prend l'entité en argument et fournit une méthode,
- transformer tous les arguments en un seul objet (ces arguments font peut-être partie d'un même concept méritant un nom).

La fonction porte un nom de verbe, l'argument un substantif. Trouver une bonne association de concepts entre l'action et son objet. Comparer par exemple : `Ecrire(nom)` (on sait qu'on écrit un nom) et `EcrireDansChamp(nom)` (on sait qu'on écrit un nom dans un champ).

## Exposer le caché

La fonction ne doit contenir que des actions qui relèvent de son ou ses concepts car sinon ce serait faire une fonction qui cache des choses ou cacher une fonction qui fait plusieurs choses (ce que l'on ne veut pas). Exemple : introduire une initialisation de session dans un traitement de *credentials*.

Ceci doit être l'objet d'une réflexion sur le temps : décomposer la fonction en fonctions qui seront appelées ailleurs dans l'ordre désiré. De cette manière, la procédure temporelle est explicite, les fonctions courtes et spécialisées.

## Séparer commandes et demandes

Une fonction fait quelque chose ou répond à quelque chose, pas les deux. Ceci s'effectue en distinguant les concepts. 

Par exemple : 
- une fonction qui demande un état et une fonction qui définit l'état (cas des *getters*/*setters*),
- et non pas une seule fonction de définition qui renvoie un booléen pour signifier l'état car ceci génère de l'imbrication de structures.

## Exceptions plutôt que codes d'erreur

Préférer les exceptions et les exceptions personnelles (héritage du type `Exception`) aux codes d'erreur personnalisés car ces codes conduisent à de l'imbrication de structures (cas des `if` imbriqués), à une augmentation des dépendances (tout le programme doit les connaître), à des difficultés de maintenance ou d'évolution (ajouter un code implique revisiter tout le programme).

## Try... catch extraits

L'instruction `try...catch` est lourde et ajoute un concept d'erreur au code normal. L'extraire dans une fonction dédiée et appeler cette fonction par ailleurs. Ainsi, on obtient une fonction qui ne fait qu'une chose : traiter l'erreur.

## Ne pas se répéter

Eviter du code qui se répète car se répéter augmente le code inutilement et oblige à répéter la maintenance éventuelle.

## La propreté s'acquiert, non se pose

On ne peut pas écrire le code en suivant immédiatement les règles car il faut d'abord clarifier notre confusion en vue du but à atteindre. Préférer écrire un premier jet, puis le remanier jusqu'à ce qu'il respecte les règles.

