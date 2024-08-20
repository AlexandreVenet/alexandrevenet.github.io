# Boucles

Le 18-08-2024

Faire tourner des calculs sous une certaine condition.

## For

On peut contrôler le temps entre chaque itération de la boucle avec une ***coroutine*** : **énumérateur** dont on peut définir par exemple le temps de pause avant d'effectuer une instruction ou après.

```C#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
	
public class BouclesFor : MonoBehaviour
{
    public int pommes;
	
    void Start()
    {
        // Test avec coroutine permettant de contrôler les itérations
        StartCoroutine(AjouterPommesRoutine());

        // la coroutine est asynchrone, ceci apparaît avant la fin du traitement de l'IEnumerator
        Debug.Log(pommes);
    }
	
    IEnumerator AjouterPommesRoutine()
    {
        for (int i = 0; i < 15; i++)
        {
            pommes++;
            yield return new WaitForSeconds(0.5f);
        }
    }
}
```

## While

On peut temporiser une boule `while` avec une ***coroutine*** :

```C#
/*
   Un programme où on a une vitesse maximale aléatoire entre 60 et 120.
    On incrémente toutes les 1 seconde la vitesse de 5.
    Quand la vitesse égale ou dépasse la vitesse maximale, arrêter l'incrémentation.
*/
	
public int vitesseMax;
public int vitesse;
	
void Start()
{	
    vitesseMax = Random.Range(60,121); // min inclus, max exclu
    StartCoroutine(VitessePlus5Routine());
}
	
IEnumerator VitessePlus5Routine()
{
    /*
        for n'est pas pertinent car on est obligé d'y déclarer une condition avec une valeur maximum :
            - valeur arbitraire comme 1000,
            - vitesseMax.
        do... while non plus pour la même raison.
        Avec While, il n'y a pas de telle limite
    */
    while (true)
    {
        yield return new WaitForSeconds(1.0f);
        vitesse += 5;
        if(vitesse > vitesseMax)
            break; 
    }
}
```
