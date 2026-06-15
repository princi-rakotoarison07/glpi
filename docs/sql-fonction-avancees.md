# Guide Complet des Fonctions SQL Avancées en Entreprise

## Table des matières

1. [CASE WHEN](https://claude.ai/chat/e5f3d835-6c44-48cf-8386-90ee2cbef25d#case-when)
2. [COALESCE](https://claude.ai/chat/e5f3d835-6c44-48cf-8386-90ee2cbef25d#coalesce)
3. [ROW_NUMBER](https://claude.ai/chat/e5f3d835-6c44-48cf-8386-90ee2cbef25d#row_number)
4. [RANK](https://claude.ai/chat/e5f3d835-6c44-48cf-8386-90ee2cbef25d#rank)
5. [DENSE_RANK](https://claude.ai/chat/e5f3d835-6c44-48cf-8386-90ee2cbef25d#dense_rank)
6. [SUM() OVER()](https://claude.ai/chat/e5f3d835-6c44-48cf-8386-90ee2cbef25d#sum-over)
7. [COUNT() OVER()](https://claude.ai/chat/e5f3d835-6c44-48cf-8386-90ee2cbef25d#count-over)
8. [EXISTS](https://claude.ai/chat/e5f3d835-6c44-48cf-8386-90ee2cbef25d#exists)
9. [WITH (CTE)](https://claude.ai/chat/e5f3d835-6c44-48cf-8386-90ee2cbef25d#with-cte)
10. [MERGE](https://claude.ai/chat/e5f3d835-6c44-48cf-8386-90ee2cbef25d#merge)
11. [PIVOT](https://claude.ai/chat/e5f3d835-6c44-48cf-8386-90ee2cbef25d#pivot)
12. [Partitionnement avec OVER()](https://claude.ai/chat/e5f3d835-6c44-48cf-8386-90ee2cbef25d#partitionnement)
13. [Requêtes Récursives](https://claude.ai/chat/e5f3d835-6c44-48cf-8386-90ee2cbef25d#requetes-recursives)

---

## CASE WHEN

### Description

Permet d'ajouter une logique conditionnelle dans les requêtes SQL, similaire aux instructions `if-then-else` en programmation.

### Syntaxe

```sql
CASE 
    WHEN condition1 THEN valeur1
    WHEN condition2 THEN valeur2
    ELSE valeur_par_defaut
END
```

### Exemples pratiques

**Exemple 1 : Catégorisation de clients**

```sql
SELECT 
    client_id,
    nom,
    montant_achat,
    CASE 
        WHEN montant_achat > 10000 THEN 'Premium'
        WHEN montant_achat > 5000 THEN 'Gold'
        WHEN montant_achat > 1000 THEN 'Silver'
        ELSE 'Bronze'
    END AS categorie_client
FROM clients
ORDER BY montant_achat DESC;
```

**Exemple 2 : Évaluation de performance**

```sql
SELECT 
    employe_id,
    nom,
    salaire,
    CASE 
        WHEN salaire > 80000 THEN 'A'
        WHEN salaire > 60000 THEN 'B'
        WHEN salaire > 40000 THEN 'C'
        ELSE 'D'
    END AS niveau_salarial
FROM employes;
```

### Cas d'usage en entreprise

* Catégorisation de données
* Calcul de commissions basées sur des seuils
* Ajustement des prix selon des critères
* Étiquetage de statuts

---

## COALESCE

### Description

Retourne la première valeur non-NULL dans une liste de colonnes. Très utile pour gérer les valeurs manquantes.

### Syntaxe

```sql
COALESCE(expression1, expression2, expression3, ...)
```

### Exemples pratiques

**Exemple 1 : Fusionner des informations de contact**

```sql
SELECT 
    id,
    nom,
    COALESCE(email_pro, email_perso, 'Pas d\'email') AS email_principal,
    COALESCE(telephone_pro, telephone_perso, 'Pas de téléphone') AS telephone_principal
FROM contacts;
```

**Exemple 2 : Calcul avec valeurs manquantes**

```sql
SELECT 
    produit_id,
    nom,
    prix_actuel,
    COALESCE(prix_promo, prix_actuel) AS prix_final,
    COALESCE(stock_actuel, 0) AS quantite_disponible
FROM produits;
```

### Comparaison avec ISNULL/IFNULL

```sql
-- COALESCE (multi-colonnes)
COALESCE(col1, col2, col3)

-- ISNULL (SQL Server - 2 colonnes)
ISNULL(col1, valeur_par_defaut)

-- IFNULL (MySQL - 2 colonnes)
IFNULL(col1, valeur_par_defaut)
```

### Cas d'usage en entreprise

* Gestion des données incomplètes
* Fusion de sources de données
* Calcul de valeurs par défaut
* Rapports sans valeurs NULL

---

## ROW_NUMBER

### Description

Assigne un numéro unique à chaque ligne dans un ensemble de résultats, en fonction d'une partition et d'un ordre.

### Syntaxe

```sql
ROW_NUMBER() OVER (PARTITION BY colonne ORDER BY colonne)
```

### Exemples pratiques

**Exemple 1 : Classement des ventes par vendeur**

```sql
SELECT 
    vendeur_id,
    nom_vendeur,
    date_vente,
    montant,
    ROW_NUMBER() OVER (PARTITION BY vendeur_id ORDER BY montant DESC) AS rang_vente
FROM ventes
ORDER BY vendeur_id, rang_vente;
```

Résultat:

```
vendeur_id | nom_vendeur | montant | rang_vente
-----------+-------------+---------+----------
1          | Alice       | 5000    | 1
1          | Alice       | 3000    | 2
1          | Alice       | 1000    | 3
2          | Bob         | 4500    | 1
2          | Bob         | 2000    | 2
```

**Exemple 2 : Récupérer le dernier log par utilisateur**

```sql
SELECT 
    user_id,
    action,
    timestamp
FROM (
    SELECT 
        user_id,
        action,
        timestamp,
        ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY timestamp DESC) AS rn
    FROM logs
) sub
WHERE rn = 1;
```

### Cas d'usage en entreprise

* Paginer les résultats
* Identifier les doublons
* Récupérer le premier/dernier enregistrement par groupe
* Créer des numéros de séquence

---

## RANK

### Description

Assigne un rang à chaque ligne, mais contrairement à ROW_NUMBER, les valeurs égales reçoivent le même rang. Les rangs suivants sont sautés.

### Syntaxe

```sql
RANK() OVER (PARTITION BY colonne ORDER BY colonne)
```

### Exemples pratiques

**Exemple 1 : Classement avec valeurs égales**

```sql
SELECT 
    etudiant_id,
    nom,
    note,
    RANK() OVER (ORDER BY note DESC) AS classement
FROM resultats_examen;
```

Résultat:

```
etudiant_id | nom    | note | classement
------------+--------+------+-----------
1           | Alice  | 95   | 1
2           | Bob    | 95   | 1
3           | Charlie| 90   | 3
4           | David  | 85   | 4
```

**Exemple 2 : Top 3 produits par catégorie**

```sql
SELECT 
    categorie,
    nom_produit,
    ventes
FROM (
    SELECT 
        categorie,
        nom_produit,
        ventes,
        RANK() OVER (PARTITION BY categorie ORDER BY ventes DESC) AS rang
    FROM produits
) sub
WHERE rang <= 3;
```

### RANK vs ROW_NUMBER vs DENSE_RANK

```
Note | ROW_NUMBER | RANK | DENSE_RANK
-----|------------|------|----------
95   | 1          | 1    | 1
95   | 2          | 1    | 1
90   | 3          | 3    | 2
85   | 4          | 4    | 3
```

### Cas d'usage en entreprise

* Classements sportifs/académiques
* Sélection des top N éléments
* Détection de performance égale

---

## DENSE_RANK

### Description

Similaire à RANK, mais sans sauter les numéros de rang.

### Syntaxe

```sql
DENSE_RANK() OVER (PARTITION BY colonne ORDER BY colonne)
```

### Exemples pratiques

**Exemple 1 : Classement des salaires**

```sql
SELECT 
    departement,
    nom,
    salaire,
    DENSE_RANK() OVER (PARTITION BY departement ORDER BY salaire DESC) AS rang
FROM employes;
```

**Exemple 2 : Top 2 vendeurs par région (sans sauter)**

```sql
SELECT 
    region,
    nom_vendeur,
    total_ventes
FROM (
    SELECT 
        region,
        nom_vendeur,
        total_ventes,
        DENSE_RANK() OVER (PARTITION BY region ORDER BY total_ventes DESC) AS rang
    FROM ventes_par_vendeur
) sub
WHERE rang <= 2;
```

### Cas d'usage en entreprise

* Classements avec distribution équitable
* Comparaisons de performances
* Sélection de groupes égaux

---

## SUM() OVER()

### Description

Calcule la somme cumulée ou agrégée dans une partition, sans regrouper les lignes.

### Syntaxe

```sql
SUM(colonne) OVER (PARTITION BY colonne ORDER BY colonne ROWS BETWEEN ... AND ...)
```

### Exemples pratiques

**Exemple 1 : Total des ventes par vendeur (cumul)**

```sql
SELECT 
    date,
    vendeur_id,
    montant,
    SUM(montant) OVER (PARTITION BY vendeur_id ORDER BY date) AS ventes_cumulees
FROM ventes
ORDER BY vendeur_id, date;
```

Résultat:

```
date       | vendeur_id | montant | ventes_cumulees
-----------|------------|---------|----------------
2024-01-01 | 1          | 1000    | 1000
2024-01-02 | 1          | 1500    | 2500
2024-01-03 | 1          | 500     | 3000
```

**Exemple 2 : Total mensuel (fenêtre glissante 30 jours)**

```sql
SELECT 
    date,
    montant,
    SUM(montant) OVER (
        ORDER BY date 
        ROWS BETWEEN 29 PRECEDING AND CURRENT ROW
    ) AS total_30_jours
FROM transactions
ORDER BY date;
```

**Exemple 3 : Pourcentage du total**

```sql
SELECT 
    produit_id,
    nom_produit,
    ventes,
    SUM(ventes) OVER () AS total_general,
    ROUND(100 * ventes / SUM(ventes) OVER (), 2) AS pourcentage
FROM produits
ORDER BY ventes DESC;
```

### Cas d'usage en entreprise

* Cumuls de ventes
* Calculs de totaux par groupe
* Analyses trend/évolution
* Calcul de pourcentages

---

## COUNT() OVER()

### Description

Compte le nombre de lignes dans une partition, sans regrouper les résultats.

### Syntaxe

```sql
COUNT(*) OVER (PARTITION BY colonne ORDER BY colonne)
```

### Exemples pratiques

**Exemple 1 : Nombre de commandes par client**

```sql
SELECT 
    client_id,
    nom,
    date_commande,
    montant,
    COUNT(*) OVER (PARTITION BY client_id) AS nb_commandes
FROM commandes
ORDER BY client_id;
```

**Exemple 2 : Pourcentage avec COUNT**

```sql
SELECT 
    departement,
    nom,
    salaire,
    COUNT(*) OVER (PARTITION BY departement) AS effectif_dept,
    COUNT(*) OVER () AS effectif_total
FROM employes;
```

**Exemple 3 : Identifier les clients VIP (3+ commandes)**

```sql
SELECT 
    client_id,
    nom,
    date_commande,
    montant
FROM (
    SELECT 
        client_id,
        nom,
        date_commande,
        montant,
        COUNT(*) OVER (PARTITION BY client_id) AS nb_commandes
    FROM commandes
) sub
WHERE nb_commandes >= 3
ORDER BY client_id;
```

### Cas d'usage en entreprise

* Identification de clients fidèles
* Distribution d'effectifs
* Analyse de segmentation
* Détection d'anomalies

---

## EXISTS

### Description

Teste l'existence d'au moins une ligne dans un sous-ensemble de résultats. Retourne TRUE/FALSE.

### Syntaxe

```sql
WHERE EXISTS (SELECT 1 FROM table WHERE condition)
```

### Exemples pratiques

**Exemple 1 : Clients ayant au moins une commande**

```sql
SELECT 
    client_id,
    nom,
    email
FROM clients c
WHERE EXISTS (
    SELECT 1 
    FROM commandes cmd 
    WHERE cmd.client_id = c.client_id
)
ORDER BY nom;
```

**Exemple 2 : Produits sans commande**

```sql
SELECT 
    produit_id,
    nom,
    categorie
FROM produits p
WHERE NOT EXISTS (
    SELECT 1 
    FROM lignes_commande lc 
    WHERE lc.produit_id = p.produit_id
)
ORDER BY nom;
```

**Exemple 3 : Vendeurs avec ventes > 50000**

```sql
SELECT 
    vendeur_id,
    nom
FROM vendeurs v
WHERE EXISTS (
    SELECT 1 
    FROM ventes v2 
    WHERE v2.vendeur_id = v.vendeur_id
    GROUP BY v2.vendeur_id
    HAVING SUM(v2.montant) > 50000
);
```

### EXISTS vs IN vs JOIN

```sql
-- EXISTS (plus rapide pour sous-requêtes)
WHERE EXISTS (SELECT 1 FROM ...)

-- IN (plus lisible, peut être lent)
WHERE id IN (SELECT id FROM ...)

-- JOIN (meilleur pour agrégations)
FROM table1 
JOIN table2 ON table1.id = table2.id
```

### Cas d'usage en entreprise

* Filtrer les enregistrements liés
* Valider l'existence de données
* Optimiser les performances
* Requêtes anti-join (NOT EXISTS)

---

## WITH (CTE - Common Table Expression)

### Description

Crée une requête temporaire nommée réutilisable dans la requête principale. Améliore la lisibilité et la maintenabilité.

### Syntaxe

```sql
WITH nom_cte AS (
    SELECT ...
)
SELECT ... FROM nom_cte;
```

### Exemples pratiques

**Exemple 1 : CTE simple**

```sql
WITH clients_vip AS (
    SELECT 
        client_id,
        nom,
        SUM(montant) AS total_achat
    FROM commandes
    GROUP BY client_id, nom
    HAVING SUM(montant) > 10000
)
SELECT 
    client_id,
    nom,
    total_achat,
    ROUND(100 * total_achat / (SELECT SUM(total_achat) FROM clients_vip), 2) AS pct_ventes
FROM clients_vip
ORDER BY total_achat DESC;
```

**Exemple 2 : CTE multiple**

```sql
WITH ventes_2024 AS (
    SELECT 
        vendeur_id,
        SUM(montant) AS total_ventes
    FROM ventes
    WHERE YEAR(date) = 2024
    GROUP BY vendeur_id
),
classement_vendeurs AS (
    SELECT 
        vendeur_id,
        total_ventes,
        RANK() OVER (ORDER BY total_ventes DESC) AS rang
    FROM ventes_2024
)
SELECT 
    v.vendeur_id,
    v.nom,
    c.total_ventes,
    c.rang
FROM vendeurs v
JOIN classement_vendeurs c ON v.vendeur_id = c.vendeur_id
WHERE c.rang <= 10;
```

**Exemple 3 : CTE pour éviter les calculs répétitifs**

```sql
WITH stats_ventes AS (
    SELECT 
        departement,
        COUNT(*) AS nb_ventes,
        AVG(montant) AS montant_moyen,
        MAX(montant) AS montant_max
    FROM ventes
    GROUP BY departement
)
SELECT 
    departement,
    nb_ventes,
    montant_moyen,
    montant_max,
    ROUND(montant_max / montant_moyen, 2) AS ratio_max_moyen
FROM stats_ventes
ORDER BY nb_ventes DESC;
```

### Avantages des CTEs

* Améliore la lisibilité
* Évite la répétition
* Facilite le débogage
* Améliore les performances

### Cas d'usage en entreprise

* Décomposer les requêtes complexes
* Créer des étapes intermédiaires
* Réutiliser des sous-requêtes
* Améliorer la maintenance

---

## MERGE

### Description

Combine les opérations INSERT, UPDATE et DELETE en une seule instruction. Très utile pour synchroniser les données.

### Syntaxe

```sql
MERGE INTO table_cible t
USING table_source s
ON t.id = s.id
WHEN MATCHED THEN 
    UPDATE SET t.colonne = s.colonne
WHEN NOT MATCHED THEN 
    INSERT (colonnes) VALUES (valeurs);
```

### Exemples pratiques

**Exemple 1 : Synchronisation de prix**

```sql
MERGE INTO produits_catalogue p
USING produits_nouveaux n
ON p.produit_id = n.produit_id
WHEN MATCHED THEN 
    UPDATE SET 
        p.prix = n.prix,
        p.stock = n.stock,
        p.date_maj = GETDATE()
WHEN NOT MATCHED THEN 
    INSERT (produit_id, nom, prix, stock, date_creation)
    VALUES (n.produit_id, n.nom, n.prix, n.stock, GETDATE());
```

**Exemple 2 : Mettre à jour les statuts de commandes**

```sql
MERGE INTO commandes_live cl
USING commandes_import ci
ON cl.commande_id = ci.commande_id
WHEN MATCHED AND cl.statut != ci.statut THEN 
    UPDATE SET 
        cl.statut = ci.statut,
        cl.date_maj = GETDATE()
WHEN NOT MATCHED THEN 
    INSERT (commande_id, client_id, statut, date_creation)
    VALUES (ci.commande_id, ci.client_id, ci.statut, GETDATE());
```

**Exemple 3 : Synchronisation avec suppression**

```sql
MERGE INTO employes_actifs e
USING employes_import i
ON e.emp_id = i.emp_id
WHEN MATCHED THEN 
    UPDATE SET 
        e.nom = i.nom,
        e.salaire = i.salaire
WHEN NOT MATCHED THEN 
    INSERT (emp_id, nom, salaire)
    VALUES (i.emp_id, i.nom, i.salaire)
WHEN NOT MATCHED BY SOURCE THEN 
    DELETE;
```

### Cas d'usage en entreprise

* ETL (Extract, Transform, Load)
* Synchronisation de bases de données
* Imports de données en masse
* Mises à jour complexes

---

## PIVOT

### Description

Transforme les lignes en colonnes. Très utile pour créer des rapports ou tableaux croisés dynamiques.

### Syntaxe

```sql
SELECT *
FROM (SELECT ... FROM table)
PIVOT (
    aggregation_function(colonne)
    FOR valeur_source IN (valeur1, valeur2, ...)
)
```

### Exemples pratiques

**Exemple 1 : Ventes par trimestre (SQL Server)**

```sql
SELECT *
FROM (
    SELECT 
        vendeur_id,
        DATEPART(QUARTER, date_vente) AS trimestre,
        montant
    FROM ventes
    WHERE YEAR(date_vente) = 2024
)
PIVOT (
    SUM(montant)
    FOR trimestre IN ([1], [2], [3], [4])
) AS tableau_pivot;
```

Résultat:

```
vendeur_id | 1      | 2      | 3      | 4
-----------|--------|--------|--------|--------
1          | 50000  | 45000  | 60000  | 55000
2          | 35000  | 40000  | 42000  | 38000
```

**Exemple 2 : Ventes par catégorie de produit**

```sql
SELECT *
FROM (
    SELECT 
        mois = FORMAT(date_vente, 'MMMM'),
        categorie,
        montant
    FROM ventes
    WHERE YEAR(date_vente) = 2024
)
PIVOT (
    SUM(montant)
    FOR categorie IN ([Electronique], [Vetements], [Alimentaire], [Autres])
) AS pivot_table;
```

**Exemple 3 : Alternative avec CASE WHEN (compatible tous SGBD)**

```sql
SELECT 
    mois,
    SUM(CASE WHEN categorie = 'Electronique' THEN montant ELSE 0 END) AS Electronique,
    SUM(CASE WHEN categorie = 'Vetements' THEN montant ELSE 0 END) AS Vetements,
    SUM(CASE WHEN categorie = 'Alimentaire' THEN montant ELSE 0 END) AS Alimentaire,
    SUM(CASE WHEN categorie = 'Autres' THEN montant ELSE 0 END) AS Autres
FROM ventes
WHERE YEAR(date_vente) = 2024
GROUP BY FORMAT(date_vente, 'MMMM')
ORDER BY DATEPART(MONTH, MIN(date_vente));
```

### Cas d'usage en entreprise

* Créer des tableaux croisés dynamiques
* Rapports de synthèse
* Analyses comparatives
* Visualisations pour présentation

---

## Partitionnement avec OVER()

### Description

Divise les données en partitions et applique des fonctions à chaque partition indépendamment.

### Syntaxe

```sql
fonction() OVER (
    PARTITION BY colonne1, colonne2
    ORDER BY colonne3
    ROWS/RANGE BETWEEN ... AND ...
)
```

### Exemples pratiques

**Exemple 1 : Moyenne mobile (fenêtre glissante)**

```sql
SELECT 
    date,
    ventes,
    AVG(ventes) OVER (
        ORDER BY date 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS moyenne_7_jours
FROM ventes_journalieres
ORDER BY date;
```

**Exemple 2 : Comparaison avec la moyenne du département**

```sql
SELECT 
    employe_id,
    nom,
    departement,
    salaire,
    ROUND(AVG(salaire) OVER (PARTITION BY departement), 2) AS salaire_moyen_dept,
    ROUND(salaire - AVG(salaire) OVER (PARTITION BY departement), 2) AS ecart
FROM employes
ORDER BY departement, nom;
```

**Exemple 3 : Écart-type par région**

```sql
SELECT 
    region,
    vendeur_id,
    total_ventes,
    ROUND(AVG(total_ventes) OVER (PARTITION BY region), 2) AS avg_region,
    ROUND(STDEV(total_ventes) OVER (PARTITION BY region), 2) AS ecart_type
FROM ventes_par_vendeur
ORDER BY region;
```

**Exemple 4 : LAG et LEAD (comparaison avec ligne précédente/suivante)**

```sql
SELECT 
    date,
    ventes,
    LAG(ventes) OVER (ORDER BY date) AS ventes_precedentes,
    LEAD(ventes) OVER (ORDER BY date) AS ventes_suivantes,
    ROUND(100 * (ventes - LAG(ventes) OVER (ORDER BY date)) / LAG(ventes) OVER (ORDER BY date), 2) AS pct_variation
FROM ventes_journalieres
WHERE YEAR(date) = 2024
ORDER BY date;
```

### Types de fenêtres

```sql
-- Fenêtre complète (par défaut)
ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING

-- Fenêtre glissante
ROWS BETWEEN 5 PRECEDING AND CURRENT ROW

-- De la première ligne à la courante
ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW

-- Depuis la courante à la fin
ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING
```

### Cas d'usage en entreprise

* Analyses de trend
* Comparaisons temps précédent
* Moyennes mobiles
* Analyses statistiques

---

## Requêtes Récursives

### Description

Permet de traiter des structures hiérarchiques ou arborescentes (arborescence organisationnelle, catégories imbriquées, etc.).

### Syntaxe

```sql
WITH cte_recursive AS (
    -- Partie d'ancrage (cas de base)
    SELECT colonnes FROM table WHERE condition
  
    UNION ALL
  
    -- Partie récursive
    SELECT colonnes FROM table 
    JOIN cte_recursive ON condition
)
SELECT * FROM cte_recursive;
```

### Exemples pratiques

**Exemple 1 : Hiérarchie des employés (manager)**

```sql
WITH hierarchie_employes AS (
    -- Ancrage : les directeurs (pas de manager)
    SELECT 
        emp_id,
        nom,
        manager_id,
        niveau = 0,
        chemin = CAST(nom AS VARCHAR(MAX))
    FROM employes
    WHERE manager_id IS NULL
  
    UNION ALL
  
    -- Récursion : les employés avec leur manager
    SELECT 
        e.emp_id,
        e.nom,
        e.manager_id,
        he.niveau + 1,
        CAST(he.chemin + ' > ' + e.nom AS VARCHAR(MAX))
    FROM employes e
    JOIN hierarchie_employes he ON e.manager_id = he.emp_id
)
SELECT 
    emp_id,
    nom,
    manager_id,
    niveau,
    chemin
FROM hierarchie_employes
ORDER BY chemin;
```

**Exemple 2 : Catégories imbriquées**

```sql
WITH categories_hierarchie AS (
    -- Catégories racine
    SELECT 
        categorie_id,
        nom,
        parent_id,
        niveau = 0,
        chemin_categorie = nom
    FROM categories
    WHERE parent_id IS NULL
  
    UNION ALL
  
    -- Sous-catégories
    SELECT 
        c.categorie_id,
        c.nom,
        c.parent_id,
        ch.niveau + 1,
        ch.chemin_categorie + ' > ' + c.nom
    FROM categories c
    JOIN categories_hierarchie ch ON c.parent_id = ch.categorie_id
)
SELECT *
FROM categories_hierarchie
ORDER BY chemin_categorie;
```

**Exemple 3 : Calcul hiérarchique de budget**

```sql
WITH budget_hierarchique AS (
    -- Budgets des départements racine
    SELECT 
        dept_id,
        nom_dept,
        parent_dept_id,
        budget,
        budget_cumule = budget,
        niveau = 0
    FROM departements
    WHERE parent_dept_id IS NULL
  
    UNION ALL
  
    -- Budgets des sous-départements
    SELECT 
        d.dept_id,
        d.nom_dept,
        d.parent_dept_id,
        d.budget,
        bh.budget_cumule + d.budget,
        bh.niveau + 1
    FROM departements d
    JOIN budget_hierarchique bh ON d.parent_dept_id = bh.dept_id
)
SELECT 
    dept_id,
    nom_dept,
    budget,
    budget_cumule,
    niveau
FROM budget_hierarchique
ORDER BY budget_cumule DESC;
```

**Exemple 4 : Traversée d'arbre avec limite**

```sql
WITH arbre_limite AS (
    -- Commencer à partir d'un nœud spécifique
    SELECT 
        emp_id,
        nom,
        manager_id,
        niveau = 0,
        profondeur = 1
    FROM employes
    WHERE emp_id = 5  -- Chercher à partir du manager avec ID 5
  
    UNION ALL
  
    SELECT 
        e.emp_id,
        e.nom,
        e.manager_id,
        al.niveau + 1,
        al.profondeur + 1
    FROM employes e
    JOIN arbre_limite al ON e.manager_id = al.emp_id
    WHERE al.profondeur < 3  -- Limiter la profondeur à 3
)
SELECT * FROM arbre_limite;
```

### Cas d'usage en entreprise

* Organigramme d'entreprise
* Hiérarchies de catégories
* Flux de validation (workflows)
* Plans comptables (hiérarchie de comptes)
* Structures BOM (Bill of Materials)

---

## Résumé Comparatif

| Fonction        | Cas d'Usage               | Performance | Complexité        |
| --------------- | ------------------------- | ----------- | ------------------ |
| CASE WHEN       | Conditions simples        | Excellent   | Faible             |
| COALESCE        | Gestion des NULLs         | Excellent   | Faible             |
| ROW_NUMBER      | Numérotation unique      | Bon         | Moyen              |
| RANK            | Classement avec égalité | Bon         | Moyen              |
| DENSE_RANK      | Classement sans sauts     | Bon         | Moyen              |
| SUM() OVER      | Cumuls/totaux             | Bon         | Moyen              |
| COUNT() OVER    | Comptage par groupe       | Bon         | Moyen              |
| EXISTS          | Vérification existence   | Excellent   | Moyen              |
| WITH (CTE)      | Requêtes complexes       | Moyen       | Faible/Lisibilité |
| MERGE           | Synchronisation données  | Bon         | Moyen              |
| PIVOT           | Tableaux croisés         | Moyen       | Moyen              |
| Partitionnement | Fenêtres d'analyse       | Bon         | Moyen/Avancé      |
| Récursive      | Structures hiérarchiques | Moyen       | Avancé            |

---

## Bonnes Pratiques

### 1. **Optimisation des requêtes**

```sql
-- ❌ Mauvais : Sous-requête dans SELECT
SELECT 
    client_id,
    nom,
    (SELECT COUNT(*) FROM commandes WHERE client_id = c.client_id) AS nb_commandes
FROM clients c;

-- ✅ Bon : Utiliser une fenêtre
SELECT 
    client_id,
    nom,
    COUNT(*) OVER (PARTITION BY client_id) AS nb_commandes
FROM (SELECT DISTINCT client_id, nom FROM clients) c;
```

### 2. **Lisibilité avec CTEs**

```sql
-- ✅ Requête lisible
WITH client_stats AS (
    SELECT client_id, COUNT(*) AS nb_cmd, SUM(montant) AS total
    FROM commandes
    GROUP BY client_id
),
clients_vip AS (
    SELECT client_id FROM client_stats WHERE total > 10000
)
SELECT * FROM clients_vip;
```

### 3. **Gestion des NULLs**

```sql
-- ✅ Toujours gérer les NULLs
SELECT 
    client_id,
    COALESCE(telephone, 'Pas de téléphone') AS contact,
    COALESCE(montant_achat, 0) AS montant
FROM clients;
```

### 4. **Partitionnement efficace**

```sql
-- ✅ Spécifier ORDER BY pour les cumulatifs
SELECT 
    date,
    montant,
    SUM(montant) OVER (ORDER BY date) AS cumul
FROM ventes;
```

---

## Conclusion

Les fonctions SQL avancées sont essentielles pour:

* **Analyser** les données complexes
* **Optimiser** les performances
* **Simplifier** la maintenance du code
* **Automatiser** les processus de données

Maîtriser ces fonctions vous permettra d'écrire des requêtes plus efficaces et élégantes en entreprise.

---

 **Dernière mise à jour** : 2024
 **Auteur** : Guide SQL Avancé
