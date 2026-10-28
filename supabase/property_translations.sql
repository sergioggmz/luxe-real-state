-- Crear tabla de traducciones de propiedades
create table if not exists public.property_translations (
  property_id uuid not null references public.properties(id) on delete cascade,
  locale text not null check (locale ~ '^[a-z]{2}(-[A-Z]{2})?$'),
  title text not null,
  description text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (property_id, locale)
);

alter table public.property_translations enable row level security;

drop policy if exists "Allow public read access" on public.property_translations;
create policy "Allow public read access" on public.property_translations
  for select using (true);

-- Insertar o actualizar traducciones en español y francés para cada una de las 38 propiedades
with translations_data(slug, locale, title, description) as (
  values
    -- 1. alpine-sanctuary-chalet
    ('alpine-sanctuary-chalet', 'es', 'Chalet Refugio Alpino',
     'Experimente el lujo arquitectónico moderno en esta impresionante residencia ubicada en uno de los enclaves más prestigiosos. Diseñada con énfasis en una integración perfecta entre interior y exterior, cuenta con amplios muros de cristal que inundan los espacios de luz natural, acabados a medida de alta gama y una atmósfera serena.'),
    ('alpine-sanctuary-chalet', 'fr', 'Chalet Refuge Alpin',
     'Découvrez le luxe architectural contemporain dans cette splendide résidence située dans un cadre prestigieux. Conçue pour harmoniser espaces intérieurs et extérieurs, elle offre de grandes baies vitrées inondant les pièces de lumière naturelle, des finitions sur mesure haut de gamme et une ambiance sereine.'),

    -- 2. azure-heights-penthouse
    ('azure-heights-penthouse', 'es', 'Ático Azure Heights',
     'Espectacular ático de gran altura con vistas panorámicas al horizonte. Diseñado para un estilo de vida sofisticado, combina amplias terrazas, acabados de mármol y áreas sociales luminosas.'),
    ('azure-heights-penthouse', 'fr', 'Penthouse Azure Heights',
     'Spectaculaire penthouse en hauteur offrant des vues panoramiques sur l''horizon. Conçu pour un art de vivre raffiné, il allie vastes terrasses, finitions en marbre et espaces de réception baignés de lumière.'),

    -- 3. beacon-hill-brownstone-penthouse
    ('beacon-hill-brownstone-penthouse', 'es', 'Ático Brownstone en Beacon Hill',
     'Excepcionales dos últimos pisos de una auténtica residencia histórica en Beacon Hill. Terraza privada en la azotea con vistas directas al río Charles, chimeneas de leña en funcionamiento y biblioteca a medida con bar.'),
    ('beacon-hill-brownstone-penthouse', 'fr', 'Penthouse Brownstone à Beacon Hill',
     'Deux derniers étages d''exception d''une authentique demeure historique de Beacon Hill. Toit-terrasse privé avec vue directe sur le fleuve Charles, cheminées au bois fonctionnelles et bibliothèque sur mesure avec bar.'),

    -- 4. belltown-view-residence
    ('belltown-view-residence', 'es', 'Residencia con Vistas en Belltown',
     'Vistas incomparables de la bahía de Elliott y atardeceres sobre las montañas Olympic. Cocina abierta con encimeras de cuarzo en cascada, estores solares motorizados y terraza comunitaria en la azotea con parrillas.'),
    ('belltown-view-residence', 'fr', 'Résidence avec Vue à Belltown',
     'Vues imprenables sur la baie d''Elliott et les couchers de soleil sur les montagnes Olympiques. Cuisine américaine avec îlots en quartz, stores solaires motorisés et toit-terrasse communautaire avec espaces barbecue.'),

    -- 5. biscayne-bay-waterfront-villa
    ('biscayne-bay-waterfront-villa', 'es', 'Villa Frente al Mar en Biscayne Bay',
     'Frente directo a la bahía con muelle privado con capacidad para un yate de hasta 80 pies. Techos de más de 4 metros, cava de vinos acristalada, mirador en la azotea y piscina estilo resort con spa climatizado.'),
    ('biscayne-bay-waterfront-villa', 'fr', 'Villa au Bord de l''Eau à Biscayne Bay',
     'Accès direct à la baie avec ponton privé accueillant un yacht jusqu''à 24 mètres. Hauteur sous plafond de plus de 4 mètres, cave à vin vitrée, terrasse d''observation sur le toit et piscine de villégiature avec spa chauffé.'),

    -- 6. brickell-avenue-highrise-suite
    ('brickell-avenue-highrise-suite', 'es', 'Suite en Rascacielos de Brickell Avenue',
     'Luminosa unidad esquinera en el piso 42 con vista al río Miami y la bahía de Biscayne. Ventanales de piso a techo, porcelanato italiano, electrodomésticos Sub-Zero y servicios de hotel cinco estrellas.'),
    ('brickell-avenue-highrise-suite', 'fr', 'Suite Panoramique sur Brickell Avenue',
     'Appartement d''angle lumineux au 42e étage surplombant la rivière Miami et Biscayne Bay. Baies vitrées du sol au plafond, carrelage en grès cérame italien, appareils Sub-Zero et prestations hôtelières cinq étoiles.'),

    -- 7. casa-bellagio-residence
    ('casa-bellagio-residence', 'es', 'Residencia Casa Bellagio',
     'Elegante propiedad inspirada en las villas italianas con jardines paisajísticos, techos abovedados y una piscina infinita con vistas privilegiadas.'),
    ('casa-bellagio-residence', 'fr', 'Résidence Casa Bellagio',
     'Élégante propriété inspirée des villas italiennes avec jardins paysagers, plafonds voûtés et piscine à débordement offrant une vue exceptionnelle.'),

    -- 8. central-studio
    ('central-studio', 'es', 'Estudio Central de Lujo',
     'Estudio de diseño vanguardista en el corazón de la ciudad. Espacios optimizados con materiales nobles, iluminación inteligente y fácil acceso a distritos financieros y culturales.'),
    ('central-studio', 'fr', 'Studio Central de Luxe',
     'Studio au design avant-gardiste au cœur de la métropole. Espaces optimisés avec matériaux nobles, domotique de pointe et proximité immédiate des quartiers d''affaires et culturels.'),

    -- 9. cherry-creek-contemporary
    ('cherry-creek-contemporary', 'es', 'Casa Contemporánea en Cherry Creek',
     'Casa unifamiliar arquitectónica llave en mano a pasos de restaurantes y galerías de primer nivel. Ascensor privado de cuatro paradas y sala de estar en el ático que se abre a una terraza exterior con chimenea.'),
    ('cherry-creek-contemporary', 'fr', 'Maison Contemporaine à Cherry Creek',
     'Maison de ville architecturale clé en main à deux pas des restaurants et galeries réputés. Ascenseur privé sur quatre niveaux et salon de réception au dernier étage donnant sur une terrasse chauffée avec cheminée.'),

    -- 10. garden-villa
    ('garden-villa', 'es', 'Villa con Jardín',
     'Oasis sereno rodeado de exhuberante vegetación privada. Cuenta con amplias terrazas al aire libre, interiores modernos de concepto abierto y acabados artesanales en piedra y madera.'),
    ('garden-villa', 'fr', 'Villa avec Jardin',
     'Oasis de sérénité entourée d''une végétation luxuriante et privée. Vastes terrasses extérieures, espaces intérieurs ouverts et modernes avec finitions artisanales en pierre et bois noble.'),

    -- 11. gold-coast-luxury-condominium
    ('gold-coast-luxury-condominium', 'es', 'Condominio de Lujo en Gold Coast',
     'Exclusiva residencia en torre con majestuosas vistas directas al amanecer sobre el lago Michigan. Suelos de roble blanco en espiga, vestidores a medida y servicio de aparcacoches las 24 horas.'),
    ('gold-coast-luxury-condominium', 'fr', 'Copropriété de Prestige à Gold Coast',
     'Résidence de prestige en gratte-ciel offrant des vues imprenables sur le lever de soleil sur le lac Michigan. Parquet en chêne blanc à chevrons, dressings personnalisés et voiturier 24h/24.'),

    -- 12. highland-retreat
    ('highland-retreat', 'es', 'Refugio Highland',
     'Residencia campestre contemporánea enclavada en las colinas. Ofrece máxima privacidad, ventanales panorámicos y amplios espacios de descanso con chimenea central.'),
    ('highland-retreat', 'fr', 'Refuge des Hauts Plateaux',
     'Demeure contemporaine nichée au cœur des collines. Offre une intimité totale, des baies vitrées panoramiques et de généreux espaces de détente avec cheminée centrale.'),

    -- 13. hilltop-modernist-estate
    ('hilltop-modernist-estate', 'es', 'Finca Modernista en la Colina',
     'Obra maestra de la arquitectura modernista situada en la cima de la colina. Integra líneas limpias, patios interiores ajardinados y piscina con vistas infinitas al valle.'),
    ('hilltop-modernist-estate', 'fr', 'Domaine Moderniste au Sommet de la Colline',
     'Chef-d''œuvre d''architecture moderniste dominant la vallée. Lignes épurées, patios intérieurs arborés et piscine à débordement suspendue au-dessus du panorama.'),

    -- 14. kailua-oceanfront-haven
    ('kailua-oceanfront-haven', 'es', 'Paraíso Frente al Mar en Kailua',
     'Acceso directo a las arenas blancas de la mundialmente famosa costa de Lanikai. Arquitectura balinesa de concepto abierto, piscina de inmersión de agua salada, duchas exteriores de piedra volcánica y exuberante flora tropical.'),
    ('kailua-oceanfront-haven', 'fr', 'Havre en Bord de Mer à Kailua',
     'Accès direct aux plages de sable blanc de la côte réputée de Lanikai. Architecture d''inspiration balinaise, bassin d''eau salée, douches extérieures en pierre de lave et végétation tropicale luxuriante.'),

    -- 15. kensington-gardens-villa
    ('kensington-gardens-villa', 'es', 'Villa en Kensington Gardens',
     'Una de las direcciones más prestigiosas en el corazón de Londres. Residencia unifamiliar con spa subterráneo que incluye piscina cubierta de 15 m, sauna, sala de cine y garaje privado con elevador para coches.'),
    ('kensington-gardens-villa', 'fr', 'Villa à Kensington Gardens',
     'L''une des adresses les plus prestigieuses du centre de Londres. Propriété individuelle avec spa souterrain comprenant un bassin de nage de 15 m, sauna, salle de projection privée et monte-voiture.'),

    -- 16. lake-tahoe-pine-lodge
    ('lake-tahoe-pine-lodge', 'es', 'Lodge de Pinos en Lake Tahoe',
     'Construido con vigas recicladas y piedra de granito, este santuario en Tahoe cuenta con suelo radiante, chimenea de piedra de doble cara, pabellón exterior con jacuzzi y acceso a pie a las playas del lago.'),
    ('lake-tahoe-pine-lodge', 'fr', 'Chalet des Pins au Lac Tahoe',
     'Édifié en bois de récupération et granit local, ce refuge propose un plancher chauffant, une cheminée double face en pierre, un pavillon avec bain à remous extérieur et un accès à pied aux rives du lac.'),

    -- 17. malibu-pacific-cliff-villa
    ('malibu-pacific-cliff-villa', 'es', 'Villa sobre los Acantilados de Malibú',
     'Encaramada sobre los acantilados del Pacífico con escaleras privadas hacia una cala virgen. Vistas interminables al océano, mirador voladizo de cristal y cocina exterior de teca.'),
    ('malibu-pacific-cliff-villa', 'fr', 'Villa sur les Falaises de Malibu',
     'Perchée de façon spectaculaire sur les falaises de Malibu avec escalier privé menant à une crique secrète. Vues infinies sur l''océan, belvédère vitré en porte-à-faux et cuisine extérieure en teck.'),

    -- 18. modern-family-home
    ('modern-family-home', 'es', 'Hogar Familiar Moderno',
     'Espaciosa casa unifamiliar pensada para el bienestar de toda la familia. Jardín privado, cocina gourmet integrada y suite principal con terraza privada.'),
    ('modern-family-home', 'fr', 'Maison Familiale Moderne',
     'Spacieuse demeure familiale pensée pour le confort quotidien. Jardin privatif paysager, cuisine dinatoire haut de gamme et suite parentale avec terrasse privative.'),

    -- 19. monochrome-minimalist-flat
    ('monochrome-minimalist-flat', 'es', 'Piso Minimalista Monocromo',
     'Refinado apartamento urbano con estética monocromática minimalista. Materiales puros, iluminación indirecta integrada y armarios empotrados a medida.'),
    ('monochrome-minimalist-flat', 'fr', 'Appartement Minimaliste Monochrome',
     'Appartement urbain raffiné à l''esthétique minimaliste épurée. Matériaux nobles, éclairage architectural invisible et rangements intégrés sur mesure.'),

    -- 20. nordic-loft-solarium
    ('nordic-loft-solarium', 'es', 'Loft Nórdico & Solárium',
     'Inspirado en el diseño escandinavo, este loft cuenta con techos de doble altura, solárium privado acristalado, maderas claras y una calidez lumínica extraordinaria.'),
    ('nordic-loft-solarium', 'fr', 'Loft Nordique & Solarium',
     'Inspiré du design scandinave, ce loft propose une double hauteur sous plafond, un solarium vitré privé, des essences de bois clairs et une luminosité remarquable.'),

    -- 21. pacific-heights-heritage-manor
    ('pacific-heights-heritage-manor', 'es', 'Mansión Histórica en Pacific Heights',
     'Mansión victoriana restaurada con maestría, combinando molduras históricas con interiores minimalistas escandinavos. Vistas impresionantes al puente Golden Gate y Alcatraz desde la terraza principal.'),
    ('pacific-heights-heritage-manor', 'fr', 'Manoir Historique à Pacific Heights',
     'Manoir victorien magistralement rénové, alliant moulures d''époque et intérieurs scandinaves épurés. Vues époustouflantes sur le Golden Gate Bridge et Alcatraz depuis la terrasse du dernier étage.'),

    -- 22. palm-beach-royal-palm-estate
    ('palm-beach-royal-palm-estate', 'es', 'Finca Royal Palm en Palm Beach',
     'Esplendor mediterráneo clásico reimaginado con líneas puras contemporáneas. Patio interior con fuente, piscina olímpica rodeada de palmeras reales y pabellón independiente para el personal.'),
    ('palm-beach-royal-palm-estate', 'fr', 'Domaine Royal Palm à Palm Beach',
     'Splendeur méditerranéenne réinventée avec des lignes contemporaines impeccables. Cour avec fontaine, piscine olympique bordée de palmiers royaux et dépendance pour le personnel.'),

    -- 23. paradise-valley-modern-haven
    ('paradise-valley-modern-haven', 'es', 'Oasis Moderno en Paradise Valley',
     'Frente a la silueta de Camelback Mountain. Cuenta con piscina tipo resort con cascadas de fuego, pista de pickleball iluminada y suite de invitados independiente.'),
    ('paradise-valley-modern-haven', 'fr', 'Havre Contemporain à Paradise Valley',
     'Implanté face à la silhouette emblématique de Camelback Mountain. Immense piscine avec jeux d''eau et de feu, court de pickleball éclairé et maison d''amis indépendante.'),

    -- 24. scottsdale-desert-sanctuary
    ('scottsdale-desert-sanctuary', 'es', 'Santuario del Desierto en Scottsdale',
     'Arquitectura moderna orgánica que enmarca los saguaros del desierto de Sonora y las montañas McDowell. Muros de tierra compactada, piscina sin borde, pista de petanca y salones exteriores con braseros.'),
    ('scottsdale-desert-sanctuary', 'fr', 'Sanctuaire Désertique à Scottsdale',
     'Architecture moderne organique mettant en valeur les saguaros du désert de Sonora et les monts McDowell. Murs en pisé, piscine à débordement, terrain de pétanque et salons avec cheminées d''extérieur.'),

    -- 25. sea-view-penthouse
    ('sea-view-penthouse', 'es', 'Ático con Vistas al Mar',
     'Ático exclusivo con terraza envolvente sobre las aguas cristalinas. Amplios ventanales, jacuzzi exterior privado y acceso directo por ascensor.'),
    ('sea-view-penthouse', 'fr', 'Penthouse Vue Mer',
     'Penthouse d''exception avec terrasse panoramique surplombant les flots. Grandes ouvertures, jacuzzi privé en terrasse et accès direct par ascensor privatif.'),

    -- 26. skyline-grand-duplex
    ('skyline-grand-duplex', 'es', 'Gran Dúplex Panorámico',
     'Dúplex de lujo en pisos altos con techos de 6 metros y vistas 360 grados de la metrópolis. Sala de cine privada, bodega de degustación y suite principal de ensueño.'),
    ('skyline-grand-duplex', 'fr', 'Grand Duplex Skyline',
     'Duplex de prestige en étage élevé avec plafonds de 6 mètres et panorama à 360 degrés sur la ville. Salle de cinéma privée, cave de dégustation et somptueuse suite parentale.'),

    -- 27. soho-cast-iron-loft
    ('soho-cast-iron-loft', 'es', 'Loft de Hierro Fundido en SoHo',
     'Clásico loft de SoHo con acceso directo por ascensor privado, columnas corintias de hierro forjado, paredes de ladrillo visto y grandes ventanales con orientación sur y oeste. Rediseñado por un arquitecto de la lista AD100.'),
    ('soho-cast-iron-loft', 'fr', 'Loft Industriel en Fonte à SoHo',
     'Loft classique de SoHo avec ascenseur sécurisé privatif, colonnes corinthiennes en fonte, murs de briques apparentes et larges fenêtres plein sud et ouest. Entièrement repensé par un architecte AD100.'),

    -- 28. solstice-waterfront-villa
    ('solstice-waterfront-villa', 'es', 'Villa Frente al Mar Solstice',
     'Villa de arquitectura costera contemporánea con embarcadero propio, jardín frente a la orilla y amplios salones exteriores para disfrutar del atardecer.'),
    ('solstice-waterfront-villa', 'fr', 'Villa Côtière Solstice',
     'Villa d''architecture balnéaire contemporaine avec ponton privé, pelouse en front de mer et vastes salons extérieurs pour savourer le coucher du soleil.'),

    -- 29. the-austin-hillside-retreat
    ('the-austin-hillside-retreat', 'es', 'Refugio en las Colinas de Austin',
     'Situado en una parcela elevada en Westlake Hills, combina piedra caliza, acero y cristal. Piscina de entrenamiento infinita, casita de invitados, cenador exterior para barbacoa y sistema de baterías solares.'),
    ('the-austin-hillside-retreat', 'fr', 'Refuge sur les Collines d''Austin',
     'Niché sur un terrain surélevé à Westlake Hills, ce refuge marie pierre calcaire, acier et verre chaleureux. Bassin de nage à débordement, maison d''amis, pavillon barbecue et batteries solaires.'),

    -- 30. the-bamboo-pavilion
    ('the-bamboo-pavilion', 'es', 'El Pabellón de Bambú',
     'Residencia serena con arquitectura inspirada en pabellones orientales, jardines zen de bambú, estanques koi y una conexión fluida con el entorno natural.'),
    ('the-bamboo-pavilion', 'fr', 'Le Pavillon de Bambou',
     'Résidence de paix à l''architecture inspirée des pavillons d''Asie, jardins zen bordés de bambous, bassins à carpes koï et communion intime avec la nature.'),

    -- 31. the-bel-air-horizon-estate
    ('the-bel-air-horizon-estate', 'es', 'Finca Bel Air Horizon',
     'Santuario privado protegido tras altos setos en lo mejor de Bel Air. Incluye pista de tenis reglamentaria, piscina de borde cero, spa de bienestar con sauna y pabellón para invitados.'),
    ('the-bel-air-horizon-estate', 'fr', 'Domaine Bel Air Horizon',
     'Sanctuaire privé et clos protégé par de hautes haies dans le quartier recherché de Bel Air. Court de tennis de compétition, piscine zéro-bord, spa avec sauna et pavillon d''amis.'),

    -- 32. the-glass-horizon
    ('the-glass-horizon', 'es', 'El Horizonte de Cristal',
     'Vanguardia arquitectónica con paredes de cristal estructural sin marcos que difuminan los límites entre el interior y el horizonte exterior.'),
    ('the-glass-horizon', 'fr', 'L''Horizon de Verre',
     'Prouesse architecturale dotée de parois en verre structurel sans montants, effaçant les frontières entre les intérieurs et l''horizon lointain.'),

    -- 33. the-glass-pavilion
    ('the-glass-pavilion', 'es', 'El Pabellón de Cristal',
     'Emblemática obra residencial enmarcada en estructuras de acero y cristal templado, rodeada de jardines maduros y una serenidad visual absoluta.'),
    ('the-glass-pavilion', 'fr', 'Le Pavillon de Verre',
     'Résidence emblématique encadrée d''acier et de verre trempé, enveloppée de jardins arborés dans un calme absolu.'),

    -- 34. the-glass-terraces-of-presidio
    ('the-glass-terraces-of-presidio', 'es', 'Las Terrazas de Cristal de Presidio',
     'Espectacular ático de planta completa con fachada de vidrio practicable que abre directamente a una terraza climatizada de cedro. Cocina Boffi a medida y dos suites principales con baños de mármol estilo spa.'),
    ('the-glass-terraces-of-presidio', 'fr', 'Les Terrasses de Verre de Presidio',
     'Penthouse d''exception occupant un étage complet, avec façade vitrée s''ouvrant sur une terrasse chauffée en cèdre. Cuisine Boffi sur mesure et deux suites parentales en marbre avec salles de bain spa.'),

    -- 35. the-highline-terrace-penthouse
    ('the-highline-terrace-penthouse', 'es', 'Ático con Terraza sobre Highline',
     'Ático exclusivo con terraza suspendida con vistas directas al icónico parque Highline. Diseño contemporáneo, techos elevados y privacidad superior.'),
    ('the-highline-terrace-penthouse', 'fr', 'Penthouse Terrasse Highline',
     'Penthouse d''exception avec terrasse panoramique suspendue au-dessus du célèbre parc de la High Line. Architecture contemporaine, hauts plafonds et intimité totale.'),

    -- 36. the-summit-ridge-residence
    ('the-summit-ridge-residence', 'es', 'Residencia Summit Ridge',
     'Situada en lo alto de Beverly Hills, esta obra maestra arquitectónica captura vistas panorámicas del cañón y las luces de la ciudad. Puertas escamoteables, piedra italiana importada, cocina de chef y cine privado.'),
    ('the-summit-ridge-residence', 'fr', 'Résidence Summit Ridge',
     'Perchée sur les hauteurs de Beverly Hills, cette création architecturale offre une vue imprenable sur le canyon et les lumières de la ville. Baies à galandage, pierre italienne, cuisine de chef et salle de cinéma.'),

    -- 37. tribeca-sky-penthouse
    ('tribeca-sky-penthouse', 'es', 'Ático Tribeca Sky',
     'Joyel de la corona: ático dúplex con terraza privada perimetral de casi 200 m² con vistas panorámicas de 360 grados al río Hudson y al horizonte de Manhattan. Escalera escultórica de bronce y rellano de ascensor privado.'),
    ('tribeca-sky-penthouse', 'fr', 'Penthouse Céleste à Tribeca',
     'Joyau immobilier : penthouse duplex avec terrasse panoramique de 185 m² offrant une vue à 360 degrés sur l''Hudson et les gratte-ciel de Manhattan. Escalier monumental en bronze et palier d''ascenseur privatif.'),

    -- 38. urban-loft
    ('urban-loft', 'es', 'Loft Urbano',
     'Loft contemporáneo en el centro neurálgico de la ciudad. Espacios diáfanos con techos altos, vigas expuestas, cocina con isla y grandes ventanales con luz natural todo el día.'),
    ('urban-loft', 'fr', 'Loft Urbain',
     'Loft contemporain en plein cœur urbain. Beaux volumes décloisonnés sous hauteurs généreuses, poutres apparentes, cuisine avec îlot central et fenêtres baignées de soleil.')
)
insert into public.property_translations (property_id, locale, title, description)
select p.id, td.locale, td.title, td.description
from translations_data td
join public.properties p on p.slug = td.slug
on conflict (property_id, locale) do update
  set title = excluded.title,
      description = excluded.description;

