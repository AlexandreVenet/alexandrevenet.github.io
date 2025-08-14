# Limites

Le 14-08-2025

Notes du chapitre 8 : comment coder lorsque notre champ d'action ne peut plus s'étendre.

## Envelopper Map

En général, envelopper le type `Map` dans une classe qui s'occupe de renvoyer un type métier. En effet, il y a de grandes chances que ce type `Map` fasse l'objet de type générique ou de conversions ; par conséquent, l'enveloppe isole les traitements techniques et permet de changer de type si besoin par la suite.

## Tests d'apprentissage

Jim Newkirk appelle **test d'apprentissage** le test que l'on fait avec du code tiers inconnu afin de comprendre ce code tiers. Ce test ne se fait pas en production mais dans des applications autonomes concentrées sur ce que nous voulons obtenir du code tiers.

Si le code tiers fait l'objet de nouvelle version, on effectue de nouveaux tests avec l'application de test d'apprentissage afin de repérer les différences éventuelles de comportement (cas des mises à jour majeures, par exemple).

## Avec du code inconnu

On va travailler avec une API qui n'est pas encore opérationnelle ? Laisser les détails à plus tard. Se concentrer sur le besoin : une classe ou une interface qui va servir à communiquer avec l'API et qui présente les éléments jugés nécessaires. On peut ainsi coder, faire des tests avec une API fictive, en attendant que l'API finale arrive.

