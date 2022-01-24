BEGIN;

TRUNCATE TABLE bottle RESTART IDENTITY CASCADE;

INSERT INTO bottle (label, color, millesime, quantity, comment, rack, appellation_id) VALUES 
('Georges Lombrière - cuvée Marie', 'rouge', 2018, 1, '', 0, 48),
('Savigny-les-Beaune cuvée Fouquerand', 'rouge', 2014, 1, 'Cadeau de Baudouin', 0, 71),
('Château Cambon la Pelouse', 'rouge', 2018, 1, '', 0, 19),
('Brunel de la gardine', 'rouge', 2013, 1, 'Cadeau de Sébastien', 0, 54),
('Château Capbern', 'rouge', 2015, 1, 'Cadeau de Marco', 1, 14),
('Domaine du Séminaire - Valréas', 'rouge', 2019, 1, '', 2, 50),
('La croix Pardillac', 'rouge', 2019, 1, 'Super U', 1, 68),
('Château du Bos vieilles vignes', 'rouge', 2020, 1, 'Super U', 1, 8),
('Château Mazails', 'rouge', 2016, 1, 'Super U', 1, 22),
('Château des Bruges', 'rouge', 2019, 1, '', 1, 26),
('Château Tour de Gillet', 'rouge', 2019, 1, 'Super U', 1, 11),
('Domaine Mabileau', 'rouge', 2020, 1, 'Super U', 1, 38),
('La Chevalière', 'rouge', 2017, 1, 'Super U', 1, 52),
('Domaine Nicolas', 'rouge', 2019, 1, 'Super U', 1, 72),
('Domaine Minchin', 'blanc', 2019, 1, 'Super U', 2, 73),
('Château Pérenne', 'rouge', 2018, 1, '', 2, 5),
('Château Haut Favier', 'rouge', 2018, 2, 'Leclerc', 2, 5),
('Château le Monteil d''Arsac', 'rouge', 2015, 1, 'Leclerc', 1, 19),
('Château Haut Cabut - cuvée Camille', 'rouge', 2018, 1, 'Super U', 1, 5),
('Château la Rose Puyblanquet', 'rouge', 2015, 1, '', 1, 13),
('Domaine de l''oiselet', 'rouge', 2020, 1, '', 1, 53),
('Chapoutier', 'rouge', 2020, 1, '', 2, 49),
('René Blanck - cuvée tradition', 'rouge', 2019, 1, 'Cadeau de Thomas', 2, 70);

COMMIT;