import { NextRequest } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { fetchIpv4 } from '@/lib/fetchIpv4'

const APPS_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL!

// Directorio de imágenes del proyecto original (carpeta hermana)
const IMG_DIR = join(process.cwd(), '..', 'jackyFlowers', 'assets', 'img', 'assets')

const PRODUCTOS: { titulo: string; descripcion: string; precio: number; categoria: string; imagen: string }[] = [
  { titulo: 'Ramo Romántico 12 Rosas y 1 Girasol',             descripcion: 'Combina la pasión de 12 rosas rojas con la alegría radiante de un girasol dorado.',                        precio: 0, categoria: 'Ocasiones especiales', imagen: '12rosas1girasol.jpg' },
  { titulo: 'Corazón de Amor 36 Rosas con Chocolates Ferrero', descripcion: 'Impresionante arreglo en forma de corazón con 36 rosas y deliciosos chocolates Ferrero Rocher.',            precio: 0, categoria: 'Ocasiones especiales', imagen: 'arregloCorazon36rosasChocolatesFerreroRocher.jpg' },
  { titulo: 'Arreglo Floral Mixto con Chocolates',             descripcion: 'Hermosa combinación de 24 rosas, girasoles, claveles y chocolates para ocasiones especiales.',              precio: 0, categoria: 'Ocasiones especiales', imagen: 'ArregloFloral24rosasGirasolClavelYChocolates.jpg' },
  { titulo: 'Arreglo Tierno con Oso de Peluche',               descripcion: 'Rosas frescas acompañadas de un adorable oso de peluche, galletas y globo festivo.',                       precio: 0, categoria: 'Ocasiones especiales', imagen: 'arregloRosasOsodePelucheGalletasYglobo.jpg' },
  { titulo: 'Canasta Elegante Rosas Eternas',                  descripcion: 'Canasta refinada con rosas preservadas que duran para siempre y chocolates gourmet.',                      precio: 0, categoria: 'Ocasiones especiales', imagen: 'canastaRosasEternasYchocolates.jpg' },
  { titulo: 'Canasta Premium Rosas Eternas II',                descripcion: 'Segunda versión de nuestra canasta premium con rosas eternas y chocolates selectos.',                      precio: 0, categoria: 'Ocasiones especiales', imagen: 'canastaRosasEternasYchocolates2.jpg' },
  { titulo: 'Canasta Deluxe Rosas Eternas III',                descripcion: 'Tercera variante de nuestra exclusiva canasta con rosas preservadas y chocolates.',                        precio: 0, categoria: 'Ocasiones especiales', imagen: 'canastaRosasEternasYchocolates3.jpg' },
  { titulo: 'Gardenias Rosadas Delicadas',                     descripcion: 'Exquisitas gardenias en tono rosado que transmiten pureza y elegancia natural.',                           precio: 0, categoria: 'Ocasiones especiales', imagen: 'gardeniasRosadas.jpg' },
  { titulo: 'Ramo Vibrante 10 Gerberas y 24 Rosas',            descripcion: 'Explosión de color con 10 gerberas alegres, 24 rosas y chocolates dulces.',                                precio: 0, categoria: 'Ocasiones especiales', imagen: 'r10gerberas24rosasychocolates.jpg' },
  { titulo: 'Ramo Espectacular 11 Gerberas Premium',           descripcion: '11 gerberas vibrantes con 24 rosas y 12 chocolates Ferrero Rocher de lujo.',                               precio: 0, categoria: 'Ocasiones especiales', imagen: 'r11gerberas24rosas12chocolatesrerrerorocher.jpg' },
  { titulo: 'Ramo Fresco 12 Gerberas Aromático',               descripcion: '12 gerberas coloridas con claveles y eucalipto para un aroma natural único.',                              precio: 0, categoria: 'Ocasiones especiales', imagen: 'r12gerberasClavelEucalipto.jpg' },
  { titulo: 'Ramo Celebración 12 Girasoles Majestuosos',       descripcion: '12 girasoles radiantes con 24 rosas rojas, chocolates y globo personalizado.',                             precio: 0, categoria: 'Cumpleaños',           imagen: 'r12girasoles24rosasRojasChocolatesYglobo.jpg' },
  { titulo: 'Ramo Clásico 12 Rosas y Girasol',                 descripcion: 'Arreglo tradicional de 12 rosas perfectamente combinadas con un girasol brillante.',                      precio: 0, categoria: 'Ocasiones especiales', imagen: 'r12rosas1girasol.jpg' },
  { titulo: 'Ramo Graduación Personalizado',                   descripcion: '12 rosas, girasol y birrete de graduación personalizado para celebrar el éxito académico.',                precio: 0, categoria: 'Ocasiones especiales', imagen: 'r12rosas1girasol1birreteGraduacionPersonalizado.jpg' },
  { titulo: 'Ramo Solidago Aromático',                         descripcion: '12 rosas frescas con girasol, chocolates y solidago para un toque campestre.',                             precio: 0, categoria: 'Ocasiones especiales', imagen: 'r12rosas1girasolChocolatesYsolidalgo.jpg' },
  { titulo: 'Ramo Romántico Rosadas con Lirios',               descripcion: '12 rosas rosadas delicadas con lirios blancos y eucalipto aromático.',                                     precio: 0, categoria: 'Bodas',               imagen: 'r12rosasRosadasLiriosYeucaliptos.jpg' },
  { titulo: 'Ramo Solidago con Tarjeta',                       descripcion: '12 rosas elegantes con solidago dorado y tarjeta personalizada incluida.',                                 precio: 0, categoria: 'Ocasiones especiales', imagen: 'r12rosasSolidalgoYtarjeta.jpg' },
  { titulo: 'Ramo Pasión 18 Rosas Ferrero',                    descripcion: '18 rosas rojas intensas acompañadas de 15 chocolates Ferrero Rocher premium.',                             precio: 0, categoria: 'Ocasiones especiales', imagen: 'r18rosasRojas15chocolatesFerreroRocher.jpg' },
  { titulo: 'Ramo Silvestre 24 Gerberas',                      descripcion: '24 gerberas multicolor con lloviznas y solidago para un estilo natural y fresco.',                        precio: 0, categoria: 'Ocasiones especiales', imagen: 'r24gerberasLloviznasYsolidalgo.jpg' },
  { titulo: 'Ramo Celebración Globo Personalizado',            descripcion: '24 rosas con 6 girasoles, chocolates y globo personalizado para ocasiones especiales.',                   precio: 0, categoria: 'Cumpleaños',           imagen: 'r24rosas6girasolesChocolatesYGloboPersonalizado.jpg' },
  { titulo: 'Ramo Elegante Blancas y Rosadas',                 descripcion: '24 rosas en tonos blanco y rosado con clavel y eucalipto para máxima elegancia.',                         precio: 0, categoria: 'Bodas',               imagen: 'r24rosasBlancasYrosadasClavelYeucalipto.jpg' },
  { titulo: 'Ramo Baby con Oso y Globos',                      descripcion: '24 rosas rojas con adorable oso de peluche, 3 globos y chocolates Ferrero Rocher.',                       precio: 0, categoria: 'Ocasiones especiales', imagen: 'r24rosasRojasBabyOsodePeluche3globosYchocolatesFerreroRocher.jpg' },
  { titulo: 'Ramo Corona Metal Solidago',                      descripcion: '24 rosas rojas con solidago dorado y elegante corona de metal decorativa.',                                precio: 0, categoria: 'Ocasiones especiales', imagen: 'r24rosasrojasSolidagoyCoronasMetal.jpg' },
  { titulo: 'Ramo Dulce 24 Rosas con Chocolates',              descripcion: '24 rosas frescas acompañadas de deliciosos chocolates para endulzar el momento.',                         precio: 0, categoria: 'Ocasiones especiales', imagen: 'r24rosasRosasChocolates.jpg' },
  { titulo: 'Ramo Primaveral 30 Tulipanes',                    descripcion: '30 tulipanes frescos en colores primaverales que evocan renovación y esperanza.',                          precio: 0, categoria: 'Ocasiones especiales', imagen: 'r30tulipanes.jpg' },
  { titulo: 'Ramo Majestuoso 36 Rosas Premium',                descripcion: '36 rosas rojas con 12 girasoles y 24 chocolates Ferrero Rocher para gran impacto.',                       precio: 0, categoria: 'Bodas',               imagen: 'r36rosasRojas12Girasoles24chocolatesFerreroRocher.jpg' },
  { titulo: 'Ramo Delicado 5 Tulipanes',                       descripcion: '5 tulipanes selectos en un arreglo minimalista y elegante perfecto para gestos sutiles.',                 precio: 0, categoria: 'Ocasiones especiales', imagen: 'r5tulipanes.jpg' },
  { titulo: 'Ramo Dulce 9 Gerberas con Tarjeta',               descripcion: '9 gerberas vibrantes con chocolates artesanales y tarjeta personalizada incluida.',                       precio: 0, categoria: 'Cumpleaños',           imagen: 'r9gerberaschocolatesytarjeta.jpg' },
  { titulo: 'Ramo Mixto 9 Girasoles Alegres',                  descripcion: '9 girasoles radiantes con 12 rosas y chocolates para transmitir alegría pura.',                           precio: 0, categoria: 'Ocasiones especiales', imagen: 'r9girasoles12rosasYchocolates.jpg' },
  { titulo: 'Ramo Impresionante 36 Rosas Baby',                descripcion: '36 rosas rojas con decoración baby y chocolates para celebraciones importantes.',                         precio: 0, categoria: 'Cumpleaños',           imagen: 'ramo36rosasRojasBabyChocolates.jpg' },
  { titulo: 'Ramo Dulce de Gomitas',                           descripcion: 'Original y divertido ramo hecho completamente con gomitas de colores para endulzar.',                     precio: 0, categoria: 'Cumpleaños',           imagen: 'ramodegomitas.jpg' },
  { titulo: 'Caja Elegante con Tulipanes',                     descripcion: 'Tulipanes frescos presentados en una elegante caja decorativa de lujo.',                                  precio: 0, categoria: 'Bodas',               imagen: 'rECajacontulipanes.jpg' },
  { titulo: 'Caja Premium Tulipanes II',                       descripcion: 'Segunda versión de nuestra caja premium con tulipanes en presentación sofisticada.',                      precio: 0, categoria: 'Bodas',               imagen: 'rECajacontulipanes2.jpg' },
  { titulo: 'Girasol Individual Radiante',                     descripcion: 'Hermoso girasol individual perfecto para gestos sencillos pero significativos.',                          precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEgirasolesIndividuales.jpg' },
  { titulo: 'Girasol Individual Brillante II',                 descripcion: 'Segunda variante de nuestro girasol individual con presentación especial.',                               precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEgirasolesIndividuales2.jpg' },
  { titulo: 'Girasol Individual Dorado III',                   descripcion: 'Tercera versión del girasol individual con toque dorado y elegante.',                                     precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEgirasolesIndividuales3.jpg' },
  { titulo: 'Girasol Individual Especial IV',                  descripcion: 'Cuarta variante de girasol individual con decoración especial única.',                                    precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEgirasolesIndividuales4.jpg' },
  { titulo: 'Girasol Individual Premium V',                    descripcion: 'Quinta versión premium de nuestro girasol individual con acabado de lujo.',                               precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEgirasolesIndividuales5.jpg' },
  { titulo: 'Ramo Clásico 10 Rosas',                           descripcion: 'Arreglo tradicional de 10 rosas rojas, símbolo eterno de amor y pasión.',                                precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEramo10rosas.jpg' },
  { titulo: 'Ramo Elegante 10 Rosas II',                       descripcion: 'Segunda versión del ramo de 10 rosas con presentación elegante y sofisticada.',                          precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEramo10rosas2.jpg' },
  { titulo: 'Ramo Romántico 10 Rosas III',                     descripcion: 'Tercera variante del ramo de 10 rosas con toque romántico especial.',                                    precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEramo10rosas3.jpg' },
  { titulo: 'Ramo Delicado 10 Rosas IV',                       descripcion: 'Cuarta versión del ramo de 10 rosas con presentación delicada y refinada.',                              precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEramo10rosas4.jpg' },
  { titulo: 'Ramo Premium 10 Rosas V',                         descripcion: 'Quinta variante premium del ramo de 10 rosas con acabado de lujo.',                                      precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEramo10rosas5.jpg' },
  { titulo: 'Ramo Especial 10 Rosas VI',                       descripcion: 'Sexta versión especial del ramo de 10 rosas con decoración única.',                                      precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEramo10rosas6.jpg' },
  { titulo: 'Ramo Exclusivo 10 Rosas VII',                     descripcion: 'Séptima versión exclusiva del ramo de 10 rosas con diseño innovador.',                                   precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEramo10rosas7.jpg' },
  { titulo: 'Ramo Temático Cenicienta con Luces LED',          descripcion: '12 rosas temáticas de Cenicienta con corona y luces LED mágicas.',                                       precio: 0, categoria: 'Cumpleaños',           imagen: 'rEramo12rosastematicasCenicientaLucesledCorona.jpg' },
  { titulo: 'Ramo Temático Princesas con Luces LED',           descripcion: '12 rosas temáticas de princesas con corona y luces LED encantadoras.',                                   precio: 0, categoria: 'Cumpleaños',           imagen: 'rEramo12rosastematicasPrincesasLucesledCorona.jpg' },
  { titulo: 'Ramo Dulce 12 Tulipanes con Chocolates',          descripcion: '12 tulipanes frescos acompañados de deliciosos chocolates gourmet.',                                      precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEramo12tulipanesChocolates.jpg' },
  { titulo: 'Ramo Sencillo 6 Rosas',                           descripcion: 'Arreglo minimalista de 6 rosas perfectas para gestos sutiles y elegantes.',                              precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEramo6rosas.jpg' },
  { titulo: 'Ramo Temático Frozen',                            descripcion: '7 rosas temáticas de Frozen en tonos azules y blancos para fans de Elsa.',                               precio: 0, categoria: 'Cumpleaños',           imagen: 'rEramo7rosasTematicaFrozen.jpg' },
  { titulo: 'Ramo Corazón Romántico con Chocolates',           descripcion: 'Ramo en forma de corazón con chocolates para expresar amor verdadero.',                                  precio: 0, categoria: 'Bodas',               imagen: 'rEramoenformadecorazonychocolates.jpg' },
  { titulo: 'Ramo Tradicional 10 Rosas',                       descripcion: 'Ramo clásico de 10 rosas rojas en presentación tradicional y elegante.',                                 precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEramos10rosas.jpg' },
  { titulo: 'Ramo Personalizado con Listón',                   descripcion: '10 rosas con listón personalizado y chocolates para ocasiones especiales.',                               precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEramos10rosasListonPersonalizadoYchocolates.jpg' },
  { titulo: 'Ramo Mágico 13 Rosas con Luces LED',              descripcion: '13 rosas con luces LED y corona de mariposas para un toque mágico.',                                     precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEramos13rosasLucesLedCoronaMariposas.jpg' },
  { titulo: 'Ramo Brillante 15 Rosas con LED',                 descripcion: '15 rosas con luces LED y chocolates para iluminar momentos especiales.',                                 precio: 0, categoria: 'Cumpleaños',           imagen: 'rEramos15rosasLucesLedChocolates.jpg' },
  { titulo: 'Ramo Espectacular 20 Rosas',                      descripcion: 'Impresionante ramo de 20 rosas rojas para ocasiones memorables.',                                        precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEramos20rosas.jpg' },
  { titulo: 'Ramo Tierno 20 Rosas con Stitch',                 descripcion: '20 rosas con adorable osito Stitch y chocolates para fans de Disney.',                                   precio: 0, categoria: 'Cumpleaños',           imagen: 'rEramos20RosasChocolatesYositoStich.jpg' },
  { titulo: 'Ramo Dulce 20 Rosas con Stitch Rosado',           descripcion: '20 rosas con osito Stitch rosado y chocolates en presentación tierna.',                                  precio: 0, categoria: 'Cumpleaños',           imagen: 'rEramos20RosasChocolatesYositoStichRosado.jpg' },
  { titulo: 'Ramo Corona Metal con Chocolates',                descripcion: '20 rosas con elegante corona de metal y chocolates gourmet.',                                            precio: 0, categoria: 'Bodas',               imagen: 'rEramos20rosasCoronaMetalChocolates.jpg' },
  { titulo: 'Ramo Cumpleaños Corona y Listón',                 descripcion: '20 rosas con corona de metal y listón personalizado para cumpleaños.',                                   precio: 0, categoria: 'Cumpleaños',           imagen: 'rEramos20RosasCoronaMetalYlistonCumpleaños.jpg' },
  { titulo: 'Ramo Clásico 20 Rosas con Chocolates',            descripcion: '20 rosas en presentación clásica acompañadas de chocolates selectos.',                                   precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEramos20rosasYchocolates.jpg' },
  { titulo: 'Ramo Elegante 20 Rosas Corona Metal',             descripcion: '20 rosas con corona de metal decorativa para máxima elegancia.',                                         precio: 0, categoria: 'Bodas',               imagen: 'rEramos20rosasYcoronaMetal.jpg' },
  { titulo: 'Ramo Baby 20 Rosas con Corona',                   descripcion: '20 rosas con decoración baby y corona para celebraciones especiales.',                                   precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEramos20rosasYcoronaYbaby.jpg' },
  { titulo: 'Ramo Mariposas 20 Rosas',                         descripcion: '20 rosas decoradas con mariposas para un toque de fantasía y delicadeza.',                               precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEramos20rosasYmariposas.jpg' },
  { titulo: 'Ramo Impactante 30 Rosas',                        descripcion: 'Ramo impresionante de 30 rosas rojas para declaraciones de amor inolvidables.',                          precio: 0, categoria: 'Bodas',               imagen: 'rEramos30rosas.jpg' },
  { titulo: 'Ramo Festivo 35 Rosas con Globos',                descripcion: '35 rosas con chocolates y globos para celebraciones grandes y festivas.',                                precio: 0, categoria: 'Cumpleaños',           imagen: 'rEramos35rosasYchocolatesYGlobos.jpg' },
  { titulo: 'Ramo Majestuoso 50 Rosas',                        descripcion: 'Ramo majestuoso de 50 rosas rojas para ocasiones verdaderamente especiales.',                            precio: 0, categoria: 'Bodas',               imagen: 'rEramos50rosas.jpg' },
  { titulo: 'Ramo Espectacular 50 Rosas II',                   descripcion: 'Segunda versión del ramo de 50 rosas con presentación espectacular.',                                    precio: 0, categoria: 'Bodas',               imagen: 'rEramos50rosas2.jpg' },
  { titulo: 'Ramo Girasoles Corona Metal',                     descripcion: '7 girasoles radiantes con corona de metal y chocolates dulces.',                                         precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEramos7girasolesCoronaMetalYchocolates.jpg' },
  { titulo: 'Ramo Delicado 7 Rosas',                           descripcion: 'Arreglo perfecto de 7 rosas rojas para gestos románticos sutiles.',                                      precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEramos7rosas.jpg' },
  { titulo: 'Ramo Encantador 7 Rosas II',                      descripcion: 'Segunda versión del ramo de 7 rosas con presentación encantadora.',                                      precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEramos7rosas2.jpg' },
  { titulo: 'Ramo Elegante 7 Rosas III',                       descripcion: 'Tercera variante del ramo de 7 rosas con toque elegante y refinado.',                                    precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEramos7rosas3.jpg' },
  { titulo: 'Ramo Especial 7 Rosas IV',                        descripcion: 'Cuarta versión especial del ramo de 7 rosas con decoración única.',                                      precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEramos7rosas4.jpg' },
  { titulo: 'Ramo Temático Corona Metal',                      descripcion: '7 rosas temáticas con corona de metal decorativa especial.',                                             precio: 0, categoria: 'Cumpleaños',           imagen: 'rEramos7rosasTematicaCoronaMetal.jpg' },
  { titulo: 'Ramo Aurora Corona Metal',                        descripcion: '7 rosas temáticas de Aurora con corona de metal y acabado de princesa.',                                 precio: 0, categoria: 'Cumpleaños',           imagen: 'rEramos7rosasTematicaCoronaMetalAurora.jpg' },
  { titulo: 'Ramo Aurora Premium II',                          descripcion: 'Segunda versión premium del ramo Aurora con corona de metal exclusiva.',                                 precio: 0, categoria: 'Cumpleaños',           imagen: 'rEramos7rosasTematicaCoronaMetalAurora2.jpg' },
  { titulo: 'Ramo Campanita Corona Metal',                     descripcion: '7 rosas temáticas de Campanita con corona de metal y magia de hadas.',                                   precio: 0, categoria: 'Cumpleaños',           imagen: 'rEramos7rosasTematicaCoronaMetalCampanita.jpg' },
  { titulo: 'Ramo Rapunzel Corona Metal',                      descripcion: '7 rosas temáticas de Rapunzel con corona de metal y cabello dorado.',                                    precio: 0, categoria: 'Cumpleaños',           imagen: 'rEramos7rosasTematicaCoronaMetalrapunsel.jpg' },
  { titulo: 'Ramo Rapunzel Premium II',                        descripcion: 'Segunda versión premium del ramo Rapunzel con corona de metal especial.',                                precio: 0, categoria: 'Cumpleaños',           imagen: 'rEramos7rosasTematicaCoronaMetalrapunsel2.jpg' },
  { titulo: 'Ramo Temático Corona Especial',                   descripcion: '7 rosas temáticas con corona de metal en diseño especial único.',                                        precio: 0, categoria: 'Cumpleaños',           imagen: 'rEramos7rosasTematicaYcoronaMetal.jpg' },
  { titulo: 'Ramo Temático Corona Premium II',                 descripcion: 'Segunda versión del ramo temático con corona de metal premium.',                                         precio: 0, categoria: 'Cumpleaños',           imagen: 'rEramos7rosasTematicaYcoronaMetal2.jpg' },
  { titulo: 'Ramo Extraordinario 80 Rosas',                    descripcion: 'Ramo extraordinario de 80 rosas para gestos grandiosos e inolvidables.',                                 precio: 0, categoria: 'Bodas',               imagen: 'rEramos80rosas.jpg' },
  { titulo: 'Ramo Grandioso 80 Rosas II',                      descripcion: 'Segunda versión del ramo grandioso de 80 rosas con presentación épica.',                                 precio: 0, categoria: 'Bodas',               imagen: 'rEramos80rosas2.jpg' },
  { titulo: 'Ramo Graduación 8 Rosas con Birrete',             descripcion: '8 rosas con girasol y birrete de graduación para celebrar el éxito académico.',                          precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEramos8Rosas1girasolYbirretedeGraduacion.jpg' },
  { titulo: 'Ramo Graduación Premium II',                      descripcion: 'Segunda versión premium del ramo de graduación con 8 rosas y birrete.',                                  precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEramos8Rosas1girasolYbirretedeGraduacion2.jpg' },
  { titulo: 'Ramo Graduación Especial III',                    descripcion: 'Tercera versión especial del ramo de graduación con decoración única.',                                  precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEramos8Rosas1girasolYbirretedeGraduacion3.jpg' },
  { titulo: 'Ramo Graduación Elegante IV',                     descripcion: 'Cuarta versión elegante del ramo de graduación con acabado refinado.',                                   precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEramos8Rosas1girasolYbirretedeGraduacion4.jpg' },
  { titulo: 'Ramo Tinkerbell Corona Metal',                    descripcion: '8 rosas temáticas de Tinkerbell con hojas y corona de metal mágica.',                                    precio: 0, categoria: 'Cumpleaños',           imagen: 'rEramos8rosasConHojasTematicaTinkerbellYcoronademetal.jpg' },
  { titulo: 'Ramo Tinkerbell Premium II',                      descripcion: 'Segunda versión premium del ramo Tinkerbell con hojas y corona especial.',                               precio: 0, categoria: 'Cumpleaños',           imagen: 'rEramos8rosasConHojasTematicaTinkerbellYcoronademetal2.jpg' },
  { titulo: 'Ramo Primaveral Tulipanes',                       descripcion: 'Hermoso ramo de tulipanes frescos que evocan la belleza de la primavera.',                               precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEramoTulipanes.jpg' },
  { titulo: 'Ramo Tulipanes Elegante II',                      descripcion: 'Segunda versión elegante del ramo de tulipanes con presentación sofisticada.',                           precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEramoTulipanes2.jpg' },
  { titulo: 'Ramo Tulipanes Premium III',                      descripcion: 'Tercera versión premium del ramo de tulipanes con acabado de lujo.',                                     precio: 0, categoria: 'Ocasiones especiales', imagen: 'rEramoTulipanes3.jpg' },
  { titulo: 'Arreglo Fresas Ferrero con Baby',                 descripcion: 'Deliciosa combinación de fresas, chocolates Ferrero Rocher y decoración baby.',                          precio: 0, categoria: 'Ocasiones especiales', imagen: 'rFresasChocolatesFerreroRocherYbaby.jpg' },
  { titulo: 'Ramo Clásico Rosas Tradicional',                  descripcion: 'Ramo tradicional de rosas en presentación clásica y atemporal.',                                         precio: 0, categoria: 'Ocasiones especiales', imagen: 'rosas.jpg' },
  { titulo: 'Ramo Pasión Rosas Rojas',                         descripcion: 'Ramo apasionado de rosas rojas intensas para expresar amor verdadero.',                                  precio: 0, categoria: 'Bodas',               imagen: 'rosasRojas.jpg' },
]

async function appsPost(body: object): Promise<{ ok?: boolean; imagenUrl?: string; id?: string; error?: string }> {
  const { text } = await fetchIpv4(APPS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return JSON.parse(text)
}

// Server-Sent Events: una línea por evento
function sseEvent(data: object): string {
  return `data: ${JSON.stringify(data)}\n\n`
}

export const dynamic = 'force-dynamic'
export const maxDuration = 300 // 5 minutos

export async function GET(_req: NextRequest) {
  const encoder = new TextEncoder()
  const total = PRODUCTOS.length

  console.log('🚀 [SETUP] Iniciando carga de catálogo...')
  console.log('📂 [SETUP] IMG_DIR:', IMG_DIR)
  console.log('📱 [SETUP] APPS_URL:', APPS_URL)

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: object) => {
        console.log('[SETUP]', JSON.stringify(data))
        controller.enqueue(encoder.encode(sseEvent(data)))
      }

      let cargados = 0
      let errores  = 0

      for (let i = 0; i < total; i++) {
        const p = PRODUCTOS[i]
        send({ tipo: 'progreso', paso: 'imagen', indice: i + 1, total, nombre: p.titulo })

        // 1 — Subir imagen
        let imagenUrl = ''
        const imgPath = join(IMG_DIR, p.imagen)

        send({ tipo: 'log', msg: `📷 [${i + 1}/${total}] Buscando: ${p.imagen}` })

        if (existsSync(imgPath)) {
          send({ tipo: 'log', msg: `✓ [${i + 1}/${total}] Imagen encontrada, subiendo...` })
          try {
            const buffer  = readFileSync(imgPath)
            const base64  = buffer.toString('base64')
            const ext      = p.imagen.split('.').pop()?.toLowerCase() ?? 'jpg'
            const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg'

            send({ tipo: 'log', msg: `📤 [${i + 1}/${total}] POST a Apps Script...` })
            const up = await appsPost({
              action: 'subirImagen',
              base64,
              nombreArchivo: p.imagen,
              mimeType,
            })
            send({ tipo: 'log', msg: `📡 [${i + 1}/${total}] Respuesta: ${JSON.stringify(up).slice(0, 100)}` })
            imagenUrl = up.imagenUrl ?? ''
            if (imagenUrl) {
              send({ tipo: 'log', msg: `✓ [${i + 1}/${total}] URL obtenida` })
            } else {
              send({ tipo: 'log', msg: `⚠️ [${i + 1}/${total}] Sin URL en respuesta` })
            }
          } catch (err) {
            errores++
            send({ tipo: 'log', msg: `❌ [${i + 1}/${total}] Error: ${String(err).slice(0, 80)}` })
          }
        } else {
          send({ tipo: 'log', msg: `❌ [${i + 1}/${total}] NO encontrada: ${imgPath}` })
        }

        // 2 — Crear producto
        try {
          const res = await appsPost({
            action:      'crearProducto',
            nombre:      p.titulo,
            descripcion: p.descripcion,
            precio:      p.precio,
            categoria:   p.categoria,
            imagenUrl,
            disponible:  true,
            destacado:   false,
          })
          if (!res.ok) {
            console.error('❌ [SETUP] Error creando producto:', p.titulo, res)
            errores++
            send({ tipo: 'error', nombre: p.titulo, error: res.error })
          } else {
            cargados++
            send({ tipo: 'ok', indice: i + 1, total, nombre: p.titulo, conImagen: !!imagenUrl })
          }
        } catch (err) {
          errores++
          console.error('❌ [SETUP] Error POST:', p.titulo, String(err).slice(0, 100))
          send({ tipo: 'error', nombre: p.titulo, error: String(err).slice(0, 100) })
        }

        // Pausa mínima para no saturar Apps Script
        await new Promise(r => setTimeout(r, 300))
      }

      console.log('✅ [SETUP] Completado -', cargados, 'cargados,', errores, 'errores')
      send({ tipo: 'completo', cargados, errores, total })
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type':  'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection':    'keep-alive',
    },
  })
}
