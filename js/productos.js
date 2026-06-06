const productos = [
    {
        titulo: "Ramo Romántico 12 Rosas y 1 Girasol",
        descripcion: "Combina la pasión de 12 rosas rojas con la alegría radiante de un girasol dorado.",
        imagen: "./assets/img/assets/12rosas1girasol.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Corazón de Amor 36 Rosas con Chocolates Ferrero",
        descripcion: "Impresionante arreglo en forma de corazón con 36 rosas y deliciosos chocolates Ferrero Rocher.",
        imagen: "./assets/img/assets/arregloCorazon36rosasChocolatesFerreroRocher.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Arreglo Floral Mixto con Chocolates",
        descripcion: "Hermosa combinación de 24 rosas, girasoles, claveles y chocolates para ocasiones especiales.",
        imagen: "./assets/img/assets/ArregloFloral24rosasGirasolClavelYChocolates.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "mixtos"
    },
    {
        titulo: "Arreglo Tierno con Oso de Peluche",
        descripcion: "Rosas frescas acompañadas de un adorable oso de peluche, galletas y globo festivo.",
        imagen: "./assets/img/assets/arregloRosasOsodePelucheGalletasYglobo.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "peluches"
    },
    {
        titulo: "Canasta Elegante Rosas Eternas",
        descripcion: "Canasta refinada con rosas preservadas que duran para siempre y chocolates gourmet.",
        imagen: "./assets/img/assets/canastaRosasEternasYchocolates.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "canastas"
    },
    {
        titulo: "Canasta Premium Rosas Eternas II",
        descripcion: "Segunda versión de nuestra canasta premium con rosas eternas y chocolates selectos.",
        imagen: "./assets/img/assets/canastaRosasEternasYchocolates2.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "canastas"
    },
    {
        titulo: "Canasta Deluxe Rosas Eternas III",
        descripcion: "Tercera variante de nuestra exclusiva canasta con rosas preservadas y chocolates.",
        imagen: "./assets/img/assets/canastaRosasEternasYchocolates3.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "canastas"
    },
    {
        titulo: "Gardenias Rosadas Delicadas",
        descripcion: "Exquisitas gardenias en tono rosado que transmiten pureza y elegancia natural.",
        imagen: "./assets/img/assets/gardeniasRosadas.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "gardenias"
    },
    {
        titulo: "Ramo Vibrante 10 Gerberas y 24 Rosas",
        descripcion: "Explosión de color con 10 gerberas alegres, 24 rosas y chocolates dulces.",
        imagen: "./assets/img/assets/r10gerberas24rosasychocolates.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "gerberas"
    },
    {
        titulo: "Ramo Espectacular 11 Gerberas Premium",
        descripcion: "11 gerberas vibrantes con 24 rosas y 12 chocolates Ferrero Rocher de lujo.",
        imagen: "./assets/img/assets/r11gerberas24rosas12chocolatesrerrerorocher.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "gerberas"
    },
    {
        titulo: "Ramo Fresco 12 Gerberas Aromático",
        descripcion: "12 gerberas coloridas con claveles y eucalipto para un aroma natural único.",
        imagen: "./assets/img/assets/r12gerberasClavelEucalipto.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "gerberas"
    },
    {
        titulo: "Ramo Celebración 12 Girasoles Majestuosos",
        descripcion: "12 girasoles radiantes con 24 rosas rojas, chocolates y globo personalizado.",
        imagen: "./assets/img/assets/r12girasoles24rosasRojasChocolatesYglobo.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "girasoles"
    },
    {
        titulo: "Ramo Clásico 12 Rosas y Girasol",
        descripcion: "Arreglo tradicional de 12 rosas perfectamente combinadas con un girasol brillante.",
        imagen: "./assets/img/assets/r12rosas1girasol.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Graduación Personalizado",
        descripcion: "12 rosas, girasol y birrete de graduación personalizado para celebrar el éxito académico.",
        imagen: "./assets/img/assets/r12rosas1girasol1birreteGraduacionPersonalizado.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "graduacion"
    },
    {
        titulo: "Ramo Solidago Aromático",
        descripcion: "12 rosas frescas con girasol, chocolates y solidago para un toque campestre.",
        imagen: "./assets/img/assets/r12rosas1girasolChocolatesYsolidalgo.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Romántico Rosadas con Lirios",
        descripcion: "12 rosas rosadas delicadas con lirios blancos y eucalipto aromático.",
        imagen: "./assets/img/assets/r12rosasRosadasLiriosYeucaliptos.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Solidago con Tarjeta",
        descripcion: "12 rosas elegantes con solidago dorado y tarjeta personalizada incluida.",
        imagen: "./assets/img/assets/r12rosasSolidalgoYtarjeta.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Pasión 18 Rosas Ferrero",
        descripcion: "18 rosas rojas intensas acompañadas de 15 chocolates Ferrero Rocher premium.",
        imagen: "./assets/img/assets/r18rosasRojas15chocolatesFerreroRocher.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Silvestre 24 Gerberas",
        descripcion: "24 gerberas multicolor con lloviznas y solidago para un estilo natural y fresco.",
        imagen: "./assets/img/assets/r24gerberasLloviznasYsolidalgo.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "gerberas"
    },
    {
        titulo: "Ramo Celebración Globo Personalizado",
        descripcion: "24 rosas con 6 girasoles, chocolates y globo personalizado para ocasiones especiales.",
        imagen: "./assets/img/assets/r24rosas6girasolesChocolatesYGloboPersonalizado.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "celebracion"
    },
    {
        titulo: "Ramo Elegante Blancas y Rosadas",
        descripcion: "24 rosas en tonos blanco y rosado con clavel y eucalipto para máxima elegancia.",
        imagen: "./assets/img/assets/r24rosasBlancasYrosadasClavelYeucalipto.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Baby con Oso y Globos",
        descripcion: "24 rosas rojas con adorable oso de peluche, 3 globos y chocolates Ferrero Rocher.",
        imagen: "./assets/img/assets/r24rosasRojasBabyOsodePeluche3globosYchocolatesFerreroRocher.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "peluches"
    },
    {
        titulo: "Ramo Corona Metal Solidago",
        descripcion: "24 rosas rojas con solidago dorado y elegante corona de metal decorativa.",
        imagen: "./assets/img/assets/r24rosasrojasSolidagoyCoronasMetal.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Dulce 24 Rosas con Chocolates",
        descripcion: "24 rosas frescas acompañadas de deliciosos chocolates para endulzar el momento.",
        imagen: "./assets/img/assets/r24rosasRosasChocolates.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Primaveral 30 Tulipanes",
        descripcion: "30 tulipanes frescos en colores primaverales que evocan renovación y esperanza.",
        imagen: "./assets/img/assets/r30tulipanes.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "tulipanes"
    },
    {
        titulo: "Ramo Majestuoso 36 Rosas Premium",
        descripcion: "36 rosas rojas con 12 girasoles y 24 chocolates Ferrero Rocher para gran impacto.",
        imagen: "./assets/img/assets/r36rosasRojas12Girasoles24chocolatesFerreroRocher.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Delicado 5 Tulipanes",
        descripcion: "5 tulipanes selectos en un arreglo minimalista y elegante perfecto para gestos sutiles.",
        imagen: "./assets/img/assets/r5tulipanes.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "tulipanes"
    },
    {
        titulo: "Ramo Dulce 9 Gerberas con Tarjeta",
        descripcion: "9 gerberas vibrantes con chocolates artesanales y tarjeta personalizada incluida.",
        imagen: "./assets/img/assets/r9gerberaschocolatesytarjeta.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "gerberas"
    },
    {
        titulo: "Ramo Mixto 9 Girasoles Alegres",
        descripcion: "9 girasoles radiantes con 12 rosas y chocolates para transmitir alegría pura.",
        imagen: "./assets/img/assets/r9girasoles12rosasYchocolates.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "girasoles"
    },
    {
        titulo: "Ramo Impresionante 36 Rosas Baby",
        descripcion: "36 rosas rojas con decoración baby y chocolates para celebraciones importantes.",
        imagen: "./assets/img/assets/ramo36rosasRojasBabyChocolates.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Dulce de Gomitas",
        descripcion: "Original y divertido ramo hecho completamente con gomitas de colores para endulzar.",
        imagen: "./assets/img/assets/ramodegomitas.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "gomitas"
    },
    {
        titulo: "Caja Elegante con Tulipanes",
        descripcion: "Tulipanes frescos presentados en una elegante caja decorativa de lujo.",
        imagen: "./assets/img/assets/rECajacontulipanes.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "tulipanes"
    },
    {
        titulo: "Caja Premium Tulipanes II",
        descripcion: "Segunda versión de nuestra caja premium con tulipanes en presentación sofisticada.",
        imagen: "./assets/img/assets/rECajacontulipanes2.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "tulipanes"
    },
    {
        titulo: "Girasol Individual Radiante",
        descripcion: "Hermoso girasol individual perfecto para gestos sencillos pero significativos.",
        imagen: "./assets/img/assets/rEgirasolesIndividuales.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "girasoles"
    },
    {
        titulo: "Girasol Individual Brillante II",
        descripcion: "Segunda variante de nuestro girasol individual con presentación especial.",
        imagen: "./assets/img/assets/rEgirasolesIndividuales2.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "girasoles"
    },
    {
        titulo: "Girasol Individual Dorado III",
        descripcion: "Tercera versión del girasol individual con toque dorado y elegante.",
        imagen: "./assets/img/assets/rEgirasolesIndividuales3.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "girasoles"
    },
    {
        titulo: "Girasol Individual Especial IV",
        descripcion: "Cuarta variante de girasol individual con decoración especial única.",
        imagen: "./assets/img/assets/rEgirasolesIndividuales4.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "girasoles"
    },
    {
        titulo: "Girasol Individual Premium V",
        descripcion: "Quinta versión premium de nuestro girasol individual con acabado de lujo.",
        imagen: "./assets/img/assets/rEgirasolesIndividuales5.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "girasoles"
    },
    {
        titulo: "Ramo Clásico 10 Rosas",
        descripcion: "Arreglo tradicional de 10 rosas rojas, símbolo eterno de amor y pasión.",
        imagen: "./assets/img/assets/rEramo10rosas.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Elegante 10 Rosas II",
        descripcion: "Segunda versión del ramo de 10 rosas con presentación elegante y sofisticada.",
        imagen: "./assets/img/assets/rEramo10rosas2.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Romántico 10 Rosas III",
        descripcion: "Tercera variante del ramo de 10 rosas con toque romántico especial.",
        imagen: "./assets/img/assets/rEramo10rosas3.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Delicado 10 Rosas IV",
        descripcion: "Cuarta versión del ramo de 10 rosas con presentación delicada y refinada.",
        imagen: "./assets/img/assets/rEramo10rosas4.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Premium 10 Rosas V",
        descripcion: "Quinta variante premium del ramo de 10 rosas con acabado de lujo.",
        imagen: "./assets/img/assets/rEramo10rosas5.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Especial 10 Rosas VI",
        descripcion: "Sexta versión especial del ramo de 10 rosas con decoración única.",
        imagen: "./assets/img/assets/rEramo10rosas6.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Exclusivo 10 Rosas VII",
        descripcion: "Séptima versión exclusiva del ramo de 10 rosas con diseño innovador.",
        imagen: "./assets/img/assets/rEramo10rosas7.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Temático Cenicienta con Luces LED",
        descripcion: "12 rosas temáticas de Cenicienta con corona y luces LED mágicas.",
        imagen: "./assets/img/assets/rEramo12rosastematicasCenicientaLucesledCorona.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "tematicos"
    },
    {
        titulo: "Ramo Temático Princesas con Luces LED",
        descripcion: "12 rosas temáticas de princesas con corona y luces LED encantadoras.",
        imagen: "./assets/img/assets/rEramo12rosastematicasPrincesasLucesledCorona.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "tematicos"
    },
    {
        titulo: "Ramo Dulce 12 Tulipanes con Chocolates",
        descripcion: "12 tulipanes frescos acompañados de deliciosos chocolates gourmet.",
        imagen: "./assets/img/assets/rEramo12tulipanesChocolates.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "tulipanes"
    },
    {
        titulo: "Ramo Sencillo 6 Rosas",
        descripcion: "Arreglo minimalista de 6 rosas perfectas para gestos sutiles y elegantes.",
        imagen: "./assets/img/assets/rEramo6rosas.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Temático Frozen",
        descripcion: "7 rosas temáticas de Frozen en tonos azules y blancos para fans de Elsa.",
        imagen: "./assets/img/assets/rEramo7rosasTematicaFrozen.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "tematicos"
    },
    {
        titulo: "Ramo Corazón Romántico con Chocolates",
        descripcion: "Ramo en forma de corazón con chocolates para expresar amor verdadero.",
        imagen: "./assets/img/assets/rEramoenformadecorazonychocolates.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Tradicional 10 Rosas",
        descripcion: "Ramo clásico de 10 rosas rojas en presentación tradicional y elegante.",
        imagen: "./assets/img/assets/rEramos10rosas.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Personalizado con Listón",
        descripcion: "10 rosas con listón personalizado y chocolates para ocasiones especiales.",
        imagen: "./assets/img/assets/rEramos10rosasListonPersonalizadoYchocolates.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Mágico 13 Rosas con Luces LED",
        descripcion: "13 rosas con luces LED y corona de mariposas para un toque mágico.",
        imagen: "./assets/img/assets/rEramos13rosasLucesLedCoronaMariposas.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Brillante 15 Rosas con LED",
        descripcion: "15 rosas con luces LED y chocolates para iluminar momentos especiales.",
        imagen: "./assets/img/assets/rEramos15rosasLucesLedChocolates.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Espectacular 20 Rosas",
        descripcion: "Impresionante ramo de 20 rosas rojas para ocasiones memorables.",
        imagen: "./assets/img/assets/rEramos20rosas.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Tierno 20 Rosas con Stitch",
        descripcion: "20 rosas con adorable osito Stitch y chocolates para fans de Disney.",
        imagen: "./assets/img/assets/rEramos20RosasChocolatesYositoStich.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "peluches"
    },
    {
        titulo: "Ramo Dulce 20 Rosas con Stitch Rosado",
        descripcion: "20 rosas con osito Stitch rosado y chocolates en presentación tierna.",
        imagen: "./assets/img/assets/rEramos20RosasChocolatesYositoStichRosado.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "peluches"
    },
    {
        titulo: "Ramo Corona Metal con Chocolates",
        descripcion: "20 rosas con elegante corona de metal y chocolates gourmet.",
        imagen: "./assets/img/assets/rEramos20rosasCoronaMetalChocolates.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Cumpleaños Corona y Listón",
        descripcion: "20 rosas con corona de metal y listón personalizado para cumpleaños.",
        imagen: "./assets/img/assets/rEramos20RosasCoronaMetalYlistonCumpleaños.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "celebracion"
    },
    {
        titulo: "Ramo Clásico 20 Rosas con Chocolates",
        descripcion: "20 rosas en presentación clásica acompañadas de chocolates selectos.",
        imagen: "./assets/img/assets/rEramos20rosasYchocolates.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Elegante 20 Rosas Corona Metal",
        descripcion: "20 rosas con corona de metal decorativa para máxima elegancia.",
        imagen: "./assets/img/assets/rEramos20rosasYcoronaMetal.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Baby 20 Rosas con Corona",
        descripcion: "20 rosas con decoración baby y corona para celebraciones especiales.",
        imagen: "./assets/img/assets/rEramos20rosasYcoronaYbaby.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Mariposas 20 Rosas",
        descripcion: "20 rosas decoradas con mariposas para un toque de fantasía y delicadeza.",
        imagen: "./assets/img/assets/rEramos20rosasYmariposas.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Impactante 30 Rosas",
        descripcion: "Ramo impresionante de 30 rosas rojas para declaraciones de amor inolvidables.",
        imagen: "./assets/img/assets/rEramos30rosas.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Festivo 35 Rosas con Globos",
        descripcion: "35 rosas con chocolates y globos para celebraciones grandes y festivas.",
        imagen: "./assets/img/assets/rEramos35rosasYchocolatesYGlobos.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "celebracion"
    },
    {
        titulo: "Ramo Majestuoso 50 Rosas",
        descripcion: "Ramo majestuoso de 50 rosas rojas para ocasiones verdaderamente especiales.",
        imagen: "./assets/img/assets/rEramos50rosas.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Espectacular 50 Rosas II",
        descripcion: "Segunda versión del ramo de 50 rosas con presentación espectacular.",
        imagen: "./assets/img/assets/rEramos50rosas2.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Girasoles Corona Metal",
        descripcion: "7 girasoles radiantes con corona de metal y chocolates dulces.",
        imagen: "./assets/img/assets/rEramos7girasolesCoronaMetalYchocolates.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "girasoles"
    },
    {
        titulo: "Ramo Delicado 7 Rosas",
        descripcion: "Arreglo perfecto de 7 rosas rojas para gestos románticos sutiles.",
        imagen: "./assets/img/assets/rEramos7rosas.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Encantador 7 Rosas II",
        descripcion: "Segunda versión del ramo de 7 rosas con presentación encantadora.",
        imagen: "./assets/img/assets/rEramos7rosas2.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Elegante 7 Rosas III",
        descripcion: "Tercera variante del ramo de 7 rosas con toque elegante y refinado.",
        imagen: "./assets/img/assets/rEramos7rosas3.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Especial 7 Rosas IV",
        descripcion: "Cuarta versión especial del ramo de 7 rosas con decoración única.",
        imagen: "./assets/img/assets/rEramos7rosas4.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Temático Corona Metal",
        descripcion: "7 rosas temáticas con corona de metal decorativa especial.",
        imagen: "./assets/img/assets/rEramos7rosasTematicaCoronaMetal.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "tematicos"
    },
    {
        titulo: "Ramo Aurora Corona Metal",
        descripcion: "7 rosas temáticas de Aurora con corona de metal y acabado de princesa.",
        imagen: "./assets/img/assets/rEramos7rosasTematicaCoronaMetalAurora.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "tematicos"
    },
    {
        titulo: "Ramo Aurora Premium II",
        descripcion: "Segunda versión premium del ramo Aurora con corona de metal exclusiva.",
        imagen: "./assets/img/assets/rEramos7rosasTematicaCoronaMetalAurora2.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "tematicos"
    },
    {
        titulo: "Ramo Campanita Corona Metal",
        descripcion: "7 rosas temáticas de Campanita con corona de metal y magia de hadas.",
        imagen: "./assets/img/assets/rEramos7rosasTematicaCoronaMetalCampanita.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "tematicos"
    },
    {
        titulo: "Ramo Rapunzel Corona Metal",
        descripcion: "7 rosas temáticas de Rapunzel con corona de metal y cabello dorado.",
        imagen: "./assets/img/assets/rEramos7rosasTematicaCoronaMetalrapunsel.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "tematicos"
    },
    {
        titulo: "Ramo Rapunzel Premium II",
        descripcion: "Segunda versión premium del ramo Rapunzel con corona de metal especial.",
        imagen: "./assets/img/assets/rEramos7rosasTematicaCoronaMetalrapunsel2.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "tematicos"
    },
    {
        titulo: "Ramo Temático Corona Especial",
        descripcion: "7 rosas temáticas con corona de metal en diseño especial único.",
        imagen: "./assets/img/assets/rEramos7rosasTematicaYcoronaMetal.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "tematicos"
    },
    {
        titulo: "Ramo Temático Corona Premium II",
        descripcion: "Segunda versión del ramo temático con corona de metal premium.",
        imagen: "./assets/img/assets/rEramos7rosasTematicaYcoronaMetal2.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "tematicos"
    },
    {
        titulo: "Ramo Extraordinario 80 Rosas",
        descripcion: "Ramo extraordinario de 80 rosas para gestos grandiosos e inolvidables.",
        imagen: "./assets/img/assets/rEramos80rosas.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Grandioso 80 Rosas II",
        descripcion: "Segunda versión del ramo grandioso de 80 rosas con presentación épica.",
        imagen: "./assets/img/assets/rEramos80rosas2.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Graduación 8 Rosas con Birrete",
        descripcion: "8 rosas con girasol y birrete de graduación para celebrar el éxito académico.",
        imagen: "./assets/img/assets/rEramos8Rosas1girasolYbirretedeGraduacion.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "graduacion"
    },
    {
        titulo: "Ramo Graduación Premium II",
        descripcion: "Segunda versión premium del ramo de graduación con 8 rosas y birrete.",
        imagen: "./assets/img/assets/rEramos8Rosas1girasolYbirretedeGraduacion2.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "graduacion"
    },
    {
        titulo: "Ramo Graduación Especial III",
        descripcion: "Tercera versión especial del ramo de graduación con decoración única.",
        imagen: "./assets/img/assets/rEramos8Rosas1girasolYbirretedeGraduacion3.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "graduacion"
    },
    {
        titulo: "Ramo Graduación Elegante IV",
        descripcion: "Cuarta versión elegante del ramo de graduación con acabado refinado.",
        imagen: "./assets/img/assets/rEramos8Rosas1girasolYbirretedeGraduacion4.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "graduacion"
    },
    {
        titulo: "Ramo Tinkerbell Corona Metal",
        descripcion: "8 rosas temáticas de Tinkerbell con hojas y corona de metal mágica.",
        imagen: "./assets/img/assets/rEramos8rosasConHojasTematicaTinkerbellYcoronademetal.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "tematicos"
    },
    {
        titulo: "Ramo Tinkerbell Premium II",
        descripcion: "Segunda versión premium del ramo Tinkerbell con hojas y corona especial.",
        imagen: "./assets/img/assets/rEramos8rosasConHojasTematicaTinkerbellYcoronademetal2.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "tematicos"
    },
    {
        titulo: "Ramo Primaveral Tulipanes",
        descripcion: "Hermoso ramo de tulipanes frescos que evocan la belleza de la primavera.",
        imagen: "./assets/img/assets/rEramoTulipanes.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "tulipanes"
    },
    {
        titulo: "Ramo Tulipanes Elegante II",
        descripcion: "Segunda versión elegante del ramo de tulipanes con presentación sofisticada.",
        imagen: "./assets/img/assets/rEramoTulipanes2.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "tulipanes"
    },
    {
        titulo: "Ramo Tulipanes Premium III",
        descripcion: "Tercera versión premium del ramo de tulipanes con acabado de lujo.",
        imagen: "./assets/img/assets/rEramoTulipanes3.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "tulipanes"
    },
    {
        titulo: "Arreglo Fresas Ferrero con Baby",
        descripcion: "Deliciosa combinación de fresas, chocolates Ferrero Rocher y decoración baby.",
        imagen: "./assets/img/assets/rFresasChocolatesFerreroRocherYbaby.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "dulces"
    },
    {
        titulo: "Ramo Clásico Rosas Tradicional",
        descripcion: "Ramo tradicional de rosas en presentación clásica y atemporal.",
        imagen: "./assets/img/assets/rosas.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    },
    {
        titulo: "Ramo Pasión Rosas Rojas",
        descripcion: "Ramo apasionado de rosas rojas intensas para expresar amor verdadero.",
        imagen: "./assets/img/assets/rosasRojas.jpg",
        enlace: "https://wa.me/50249200595",
        categoria: "rosas"
    }
];
