# **Informe Estratégico de Diseño Instruccional: Marco Integral para Taller de Desarrollo Acelerado de MVP en Unity para Game Jams**

## **1\. Resumen Ejecutivo**

La democratización del desarrollo de videojuegos, impulsada por motores accesibles como Unity y la proliferación de eventos de desarrollo acelerado conocidos como "Game Jams", ha transformado radicalmente la pedagogía de la informática creativa. Sin embargo, persiste una barrera de entrada significativa: la "curva de complejidad inicial". Para un desarrollador principiante, la distancia cognitiva entre la conceptualización de una idea y la implementación de un Producto Mínimo Viable (MVP) funcional es a menudo insalvable dentro de las restricciones temporales de una jam (típicamente 48 a 72 horas). El presente informe técnico, solicitado para estructurar un taller virtual de 90 minutos, aborda esta problemática mediante un análisis exhaustivo de dinámicas pedagógicas, herramientas tecnológicas de bajo código ("low-code") y metodologías de gestión de alcance ("scoping").  
Este documento propone un plan de estudios riguroso que rechaza la enseñanza tradicional de sintaxis C\# "de abajo hacia arriba" en favor de un modelo de aprendizaje "justo a tiempo" (Just-in-Time Learning) basado en componentes prefabricados. Tras evaluar las metodologías implícitas en los modelos de taller estándar —codificación desde cero, modificación de Microgames y uso de Frameworks de componentes— se concluye que el uso de **Unity Playground** representa la estrategia óptima para garantizar que los participantes finalicen la sesión con un MVP tangible.  
El informe se estructura en cuatro pilares fundamentales: la fundamentación teórica del MVP en entornos lúdicos, la arquitectura técnica del taller, el diseño de dinámicas de participación virtual y la gestión de crisis técnicas. Se integra evidencia de múltiples fuentes de investigación para validar la selección de dinámicas como "Two Truths and a Lie" para la cohesión grupal y la analogía del "Skateboard" de Henrik Kniberg para la enseñanza del alcance del producto. El objetivo final no es solo la alfabetización técnica, sino la inculcación de una mentalidad de "fallar rápido" (fail faster) esencial para la supervivencia en una Game Jam.

## **2\. Marco Teórico y Pedagógico: La Micro-Estructura de 90 Minutos**

### **2.1 El Desafío de la Carga Cognitiva en Entornos Virtuales**

El diseño de una intervención educativa de 90 minutos para enseñar una herramienta tan compleja como Unity requiere una gestión draconiana de la carga cognitiva. La teoría de la carga cognitiva (Sweller, 1988\) sugiere que los aprendices tienen una capacidad limitada de memoria de trabajo. En un taller de introducción tradicional, se bombardea al estudiante con conceptos de navegación espacial (Scene View), jerarquía de objetos (Hierarchy), propiedades de componentes (Inspector) y sintaxis de programación (Visual Studio). Intentar enseñar C\# (variables, métodos, clases, sintaxis de punto y coma) simultáneamente con la interfaz del motor garantiza una sobrecarga cognitiva y, consecuentemente, una parálisis en el aprendizaje.  
Para un taller preparatorio de Game Jam, el objetivo no es la maestría sintáctica, sino la **autoeficacia**. Los participantes deben creer que son capaces de materializar una idea. Por lo tanto, este plan de estudios adopta un enfoque constructivista: los estudiantes aprenden haciendo, manipulando bloques lógicos de alto nivel que ofrecen retroalimentación visual inmediata. Eliminamos la "tasa de sintaxis" —el tiempo perdido depurando errores de compilación— para maximizar el tiempo dedicado a la lógica del juego y al diseño de niveles.

### **2.2 Definición Operativa de MVP para Videojuegos**

El concepto de Producto Mínimo Viable (MVP), originado en la metodología Lean Startup, a menudo se malinterpreta en el desarrollo de juegos como "un juego incompleto". Para efectos de este taller, redefinimos el MVP basándonos en la analogía del transporte de Kniberg.  
La enseñanza tradicional (Modelo Cascada) intentaría construir un "auto" enseñando primero a hacer una rueda, luego un eje, luego un chasis. Al final de 90 minutos, el estudiante tendría una rueda perfecta, pero ningún medio de transporte. El enfoque MVP propone construir primero una patineta (skateboard). No tiene motor, ni luces, ni frenos, pero cumple la función fundamental: transporte. En el contexto de una Game Jam, un MVP es un "ciclo de juego cerrado": Inicio \-\> Desafío \-\> Condición de Victoria/Derrota \-\> Reinicio.  
El taller está diseñado para que, en el minuto 60, cada participante tenga su "patineta": un cuadrado que se mueve, recoge un objeto y gana. Todo lo demás (gráficos, sonido, partículas) se trata como iteraciones posteriores (el monopatín, la bicicleta, la moto). Esta distinción es crucial para evitar el *feature creep* (alcance desmedido), que es la causa principal de fracaso en las Game Jams.

### **2.3 Selección de la Herramienta: Análisis Comparativo**

Basándonos en la investigación de activos disponibles en el ecosistema de Unity, evaluamos tres enfoques potenciales (correspondientes a las ideas de los Talleres 1, 2 y 3 mencionados implícitamente como opciones estándar):  
**Opción A: Codificación C\# desde Cero ("Taller 1")**

* *Ventaja:* Control total y comprensión profunda.  
* *Desventaja:* Altísimo riesgo de fracaso en 90 minutos. Un solo error de sintaxis en el código de un estudiante puede detener la clase por 10 minutos.  
* *Veredicto:* Inviable para principiantes absolutos en este marco de tiempo.

**Opción B: Modificación de Microgames ("Taller 2")**

* *Ventaja:* Gráficos AAA inmediatos (FPS, Karting, Platformer).  
* *Desventaja:* Complejidad oculta. Los sistemas internos de los Microgames son avanzados. Los estudiantes aprenden a cambiar variables ("velocidad \= 10"), pero no entienden *por qué* el personaje se mueve. Es "caja negra".  
* *Veredicto:* Bueno para la motivación visual, malo para el aprendizaje de la lógica fundamental necesaria para una Jam original.

**Opción C: Unity Playground ("Taller 3")**

* *Ventaja:* Utiliza scripts de propósito único ("Move", "Jump", "Collect") que se arrastran y sueltan. Expone la lógica (Condiciones y Acciones) sin requerir código escrito. Permite crear mecánicas personalizadas combinando componentes.  
* *Veredicto:* **Óptimo**. Equilibra la comprensión lógica con la velocidad de implementación. Permite iterar y "fallar rápido".

## **3\. Arquitectura del Taller: Pre-Producción y Logística**

El éxito de un taller virtual de 90 minutos se determina antes de que comience la videollamada. La gestión de los requisitos técnicos es el primer filtro de viabilidad.

### **3.1 Protocolo "Hora Cero"**

Dado que la descarga e instalación de Unity puede tardar horas dependiendo del ancho de banda, se debe implementar un protocolo de comunicación estricto 72 horas antes del evento.  
**Comunicado Previo Obligatorio:** Se debe enviar una guía paso a paso que instruya a los participantes a:

1. Instalar **Unity Hub** y una versión **LTS (Long Term Support)** específica (e.g., 2022.3) para asegurar compatibilidad universal.  
2. Crear un **Unity ID**.  
3. Descargar e importar el paquete **Unity Playground** desde la Asset Store en un proyecto nuevo llamado "JamPractice".  
4. Confirmar la instalación mediante una captura de pantalla enviada a un canal de Discord o formulario de registro.

Este "filtro de entrada" asegura que los 90 minutos se dediquen a la creación y no al soporte técnico de instalaciones.

### **3.2 Configuración del Entorno Virtual**

Para el facilitador, se recomienda una configuración de doble monitor. El monitor principal comparte la pantalla completa de Unity (no solo la ventana, para que se vean los menús emergentes y exploradores de archivos). El monitor secundario gestiona el chat, la lista de participantes y las notas del guion.  
Se debe establecer un canal de comunicación paralelo (Discord o Slack) donde los "Mentores Flotantes" (si están disponibles) o el propio facilitador puedan pegar enlaces directos a activos, fragmentos de soluciones o paquetes de rescate ("Rescue Packages"). Los paquetes de rescate son archivos .unitypackage preparados previamente que contienen el proyecto en diferentes estados (ej. "Paso1\_Completo.unitypackage"). Si un estudiante se bloquea irremediablemente, descarga e importa el paquete para sincronizarse con la clase.

## **4\. Plan de Estudio Detallado: Cronograma Minuto a Minuto**

El taller se divide en cuatro módulos distintos: Activación, Teoría, Ejecución Técnica y Cierre.

### **Módulo 1: Activación y Dinámicas de Equipo (0:00 – 0:15)**

El objetivo de este módulo es romper la barrera del miedo y establecer una cultura de colaboración rápida.  
**0:00 – 0:05 | Bienvenida y "Check-in" Técnico**

* Mientras los participantes ingresan, el facilitador verifica que todos tengan Unity abierto.  
* **Dinámica de Entrada: "Chat Waterfall" (Cascada de Chat):** El facilitador hace una pregunta simple (ej. "¿Cuál es tu videojuego favorito de la infancia?"). Pide a todos que escriban la respuesta pero *no* envíen hasta que él diga "YA". Esto genera una lluvia de respuestas simultáneas que energiza la sala virtual.

**0:05 – 0:10 | Rompehielos: "Bad Ideas Only" (Solo Malas Ideas)**

* *Concepto:* En lugar de pedir buenas ideas (lo cual genera ansiedad de rendimiento), se pide a los participantes que propongan mecánicas de juego terribles o frustrantes en el chat.  
* *Ejemplos:* "Un juego de carreras donde el auto solo gira a la izquierda", "Un FPS donde las balas curan a los enemigos".  
* *Justificación Pedagógica:* Esta técnica de **Brainstorming Inverso** reduce la presión social. Valida la creatividad sin juicio y a menudo revela, paradójicamente, mecánicas interesantes (el juego *Super Monkey Ball* es esencialmente una carrera con controles limitados). Prepara la mente para la iteración rápida de la Game Jam.

**0:10 – 0:15 | Dinámica de Conexión: "Two Truths and a Lie" (Edición Game Dev)**

* *Concepto:* El facilitador presenta tres afirmaciones sobre el desarrollo de juegos o sobre sí mismo (ej. "Unity se usó para hacer Pokémon GO", "El primer prototipo de Minecraft se hizo en 6 días", "Nunca he introducido un bug en mi código"). Los estudiantes votan cuál es la mentira.  
* *Justificación:* Humaniza al instructor, introduce trivia cultural del desarrollo y fomenta la participación activa mediante encuestas o chat.

### **Módulo 2: Teoría de Alcance y Mentalidad MVP (0:15 – 0:25)**

Antes de tocar Unity, debemos calibrar las expectativas.  
**0:15 – 0:20 | La Analogía del Skateboard**

* Se presenta visualmente la gráfica de Henrik Kniberg. Se explica que en la Game Jam no construirán un Ferrari. Construirán una patineta.  
  * *Paso 1:* Tabla \+ Ruedas (MVP). Te lleva de A a B.  
  * *Paso 2:* Manubrio (Patinete). Mejora el control.  
  * *Paso 3:* Motor (Moto). Aumenta la velocidad.  
* *Aplicación:* "Si al final de la Jam tu personaje es un cubo blanco que salta y llega a una meta, has tenido éxito. Si tienes un modelo 3D precioso que no se mueve, has fallado."

**0:20 – 0:25 | Ejercicio Rápido: "El Corte de Características" (Feature Cut)**

* *Dinámica:* El facilitador presenta una idea de juego ambiciosa (ej. "Un RPG de mundo abierto con crafteo, diálogo y combate naval").  
* *Acción:* Los estudiantes tienen 2 minutos para eliminar el 80% de las características y dejar solo UNA mecánica central.  
* *Discusión:* Se demuestra cómo el "combate naval" por sí solo es un juego completo (tipo *Battleship*), y cómo el "diálogo" es otro juego (Novela Visual). Esto enseña a priorizar el núcleo lúdico.

### **Módulo 3: Ejecución Técnica \- Construyendo el MVP (0:25 – 0:75)**

Este es el núcleo del taller ("The Sprint"). Utilizaremos **Unity Playground** para construir un juego de acción 2D simple ("Space Scavenger"). El flujo es demostrativo y acumulativo.  
**0:25 – 0:35 | Paso 1: El Actor (Física y Movimiento)**

* *Acción:* Importar un sprite de nave espacial desde la carpeta Images de Playground.  
* *Concepto:* **GameObject vs. Componente**. Explicar que el GameObject es el contenedor y los Componentes son el comportamiento.  
* *Física:* Añadir Rigidbody2D. Dar Play. La nave cae.  
  * *Insight:* Explicar la gravedad en el motor de física. Cambiar Gravity Scale a 0 para un juego "Top-Down".  
* *Lógica:* Añadir el script Move (de Playground). Configurar controles a WASD.  
* *Ajuste (Game Feel):* La nave se desliza demasiado. Aumentar el Linear Drag (fricción) en el Rigidbody para dar un control más preciso.

**0:35 – 0:45 | Paso 2: El Conflicto (Enemigos e Interacción)**

* *Acción:* Arrastrar un sprite de asteroide.  
* *Comportamiento:* Añadir el script AutoRotate para darle vida visual.  
* *Colisiones:* Añadir PolygonCollider2D a la nave y al asteroide. Explicar que sin "colliders", los objetos son fantasmas.  
* *Lógica de Daño:*  
  * En el Asteroide: Añadir script ModifyHealthAttribute (Valor: \-1).  
  * En la Nave: Añadir script HealthSystemAttribute (Salud: 3).  
* *Test:* Chocar la nave. Observar la consola o las variables en el inspector disminuir. Hemos creado combate sin código.

**0:45 – 0:55 | Paso 3: El Objetivo (Condición de Victoria y UI)**

* *Acción:* Crear un objeto "Estrella" o "Gema".  
* *Lógica:* Añadir script CollectableAttribute.  
* *Interfaz de Usuario:* Arrastrar el prefab UserInterface desde la carpeta Prefabs de Playground.  
  * *Insight Técnico:* Explicar que este prefab ya tiene la lógica interna para buscar al objeto etiquetado como "Player".  
  * *Etiquetado:* **Paso Crítico.** Cambiar el Tag de la nave a "Player". Sin esto, la UI no funciona.  
* *Condición de Victoria:* En el script de la UI, establecer "Score to Win" en 5\.  
* *Test:* Recoger estrellas. Al llegar a 5, aparece la pantalla "You Win". El ciclo de juego está cerrado.

**0:55 – 0:65 | Paso 4: Escalado y Diseño de Nivel**

* *Concepto:* **Prefabs**. Explicar el peligro de duplicar objetos en la escena (si cambias uno, los otros no cambian).  
* *Acción:* Arrastrar el Asteroide y la Estrella desde la Jerarquía a la carpeta de Proyecto para crear Prefabs originales.  
* *Diseño:* Usar los Prefabs para pintar un nivel rápido. Crear un campo de asteroides y una ruta de monedas.  
* *Iteración:* Ajustar la velocidad de la nave y la masa de los asteroides para mejorar la sensación de juego (*Game Feel*).

**0:65 – 0:75 | Opcional / Avanzado: Disparo**

* Si el grupo avanza rápido, añadir la mecánica de disparo.  
* *Acción:* Añadir ObjectShooter a la nave. Asignar un prefab de "Laser" (con BulletAttribute).  
* *Resultado:* La nave ahora puede destruir asteroides (si se añade DestroyForPointsAttribute a los asteroides).

### **Módulo 4: Cierre, Exportación y Supervivencia (0:75 – 0:90)**

**0:75 – 0:80 | La "Hora Dorada" y la Exportación**

* Explicar la regla de la "Hora Dorada" : Dejar de desarrollar 1 hora antes del límite de la Jam para compilar y subir.  
* *Acción:* Ir a File \> Build Settings. Seleccionar **WebGL**.  
* *Justificación:* Los juegos de Jam que se juegan en el navegador tienen 10 veces más probabilidades de ser jugados y votados que los que requieren descarga.  
* Iniciar la compilación (mientras compila, pasar a Q\&A).

**0:80 – 0:90 | Consejos de Supervivencia y Q\&A**

* **Gestión del Sueño:** 4 horas de sueño \= código roto. Dormir es una ventaja competitiva.  
* **Scope Cutting:** Si una mecánica no funciona en 1 hora, se corta.  
* **Herramientas de Colaboración:** Mencionar brevemente GitHub/Plastic SCM para control de versiones y Trello para tareas.  
* *Cierre:* Preguntas finales y compartir recursos (enlaces a Kenney assets, documentación de Playground).

## **5\. Análisis Técnico: Por Qué Unity Playground**

La elección de **Unity Playground** sobre otras opciones se fundamenta en la eficiencia pedagógica para el perfil de "principiante absoluto".

### **5.1 Abstracción de la Sintaxis**

Los scripts de Playground (Move.cs, Jump.cs) encapsulan llamadas complejas a la API de Unity (Input.GetAxis, transform.Translate, Time.deltaTime). Esto permite a los estudiantes aplicar el **Principio de Responsabilidad Única** (un objeto se mueve, otro rota, otro daña) sin luchar contra la sintaxis de C\#. Se enseña la lógica de programación (Si X entonces Y) visualmente a través del Inspector.

### **5.2 Retroalimentación Visual Inmediata**

A diferencia de los scripts personalizados que a menudo son invisibles en la escena, los componentes de Playground utilizan **Gizmos** (flechas verdes para movimiento, círculos para áreas de detección) que muestran visualmente lo que hará el objeto antes de pulsar Play. Esto refuerza la comprensión espacial del diseño de niveles.

### **5.3 Comparación con Starter Assets**

Los paquetes "Starter Assets" (First Person / Third Person Controller) de Unity son excelentes, pero dependen del **Input System** nuevo, que utiliza mapas de acción abstractos y máquinas de estados complejas. Depurar un error en el Input System de Starter Assets requiere un conocimiento intermedio de Unity. Playground utiliza el sistema de física estándar y transformaciones directas, lo que es mucho más robusto frente a errores de novatos.

## **6\. Dinámicas de "Gamificación" del Taller**

Para mantener la sesión "divertida y educativa" como solicita el usuario, integramos elementos lúdicos en el propio proceso de aprendizaje:

1. **El "Bug Hunt" (Caza de Bugs):** El facilitador introduce intencionalmente un error (ej. poner la gravedad de la nave en 1, haciendo que caiga al vacío). Pide al chat que identifique por qué la nave "se rompió". El primero en responder gana puntos ficticios ("puntos de experiencia"). Esto transforma la depuración, que suele ser frustrante, en un juego de detectives.  
2. **La Ruleta de Temas (Simulacro de Jam):** En los últimos 5 minutos, usar un generador de temas aleatorios (ej. "Tostadora", "Bajo el agua", "Solo un botón"). Pedir a los estudiantes que escriban en el chat cómo adaptarían el juego que acaban de crear (Space Scavenger) a ese tema. Ejemplo: Si el tema es "Bajo el agua", la fricción del Rigidbody aumenta y los asteroides son burbujas. Esto ejercita la flexibilidad mental necesaria para interpretar temas de Jam.

## **7\. Recomendaciones Estratégicas para el Facilitador**

1. **Narrativa sobre Técnica:** No diga "Vamos a añadir un Rigidbody2D". Diga "Vamos a darle peso y existencia física a nuestra nave; para eso usamos el componente Rigidbody". Conecte siempre la función técnica con la fantasía del juego.  
2. **Gestión del Fracaso:** Celebre los errores. Si Unity se bloquea o algo sale mal en la pantalla del instructor, úselo como momento de enseñanza: "Esto es el desarrollo de juegos. Guardad vuestro proyecto cada 5 minutos (Ctrl+S). Es la lección más importante de hoy".  
3. **El Kit de Emergencia:** Tenga listo un enlace a **Kenney.nl**. Los principiantes pierden horas buscando arte. Proporcione una carpeta de "Activos Seguros" para que no pierdan tiempo navegando en Google Images durante la Jam.

## **8\. Conclusión**

Este plan de estudio de 90 minutos está diseñado no para producir expertos en Unity, sino para producir **participantes viables de Game Jam**. Al eliminar la barrera del código sintáctico mediante Unity Playground y enfocar la pedagogía en la estructura del MVP (Ciclo de Juego Completo), dotamos a los estudiantes de la herramienta más poderosa para una Jam: la capacidad de terminar.  
La integración de dinámicas de grupo como el "Feature Cut" y el "Bad Ideas Only" atiende la dimensión psicológica del evento, vacunando a los desarrolladores contra el perfeccionismo paralizante. Al finalizar el taller, los estudiantes no solo tendrán un juego funcional exportado en WebGL, sino un modelo mental de desarrollo iterativo que les servirá mucho más allá del fin de semana de la competencia.

# **Apéndice A: Tablas de Referencia para el Taller**

## **Tabla 1: Comparativa de Herramientas para el Taller**

| Herramienta | Curva de Aprendizaje | Tiempo de Setup | Flexibilidad | Veredicto para 90min |
| :---- | :---- | :---- | :---- | :---- |
| **C\# Scripting** | Muy Alta | Bajo | Infinita | **Riesgo Alto**. Demasiado propenso a errores de sintaxis. |
| **Starter Assets (3D)** | Media/Alta | Medio | Alta | **Riesgo Medio**. El sistema de inputs es complejo de modificar. |
| **Microgames (Modding)** | Muy Baja | Alto (Instalación) | Baja | **Riesgo Bajo**, pero bajo aprendizaje conceptual. |
| **Unity Playground (2D)** | **Baja** | **Bajo** | **Media** | **Óptimo**. Balance perfecto entre facilidad y lógica real. |

## **Tabla 2: Cronograma de Supervivencia para la Game Jam (Recurso para Estudiantes)**

| Fase | Tiempo (48h Jam) | Actividad Clave | Enfoque Mental |
| :---- | :---- | :---- | :---- |
| **Viernes Noche** | 20:00 \- 24:00 | Brainstorming & Concepto | Divergencia. "Malas ideas bienvenidas". |
| **Sábado Mañana** | 09:00 \- 13:00 | MVP "Patineta" | Funcionalidad pura. Cubos grises. |
| **Sábado Tarde** | 14:00 \- 20:00 | Core Loop & Mecánicas | Implementación. "¿Es divertido?" |
| **Domingo Mañana** | 09:00 \- 13:00 | Arte & Sonido (Juice) | Pulido. Reemplazar cubos por arte. |
| **Domingo Tarde** | 14:00 \- 16:00 | **Hora Dorada (Freeze)** | No más funciones. Solo bugs y Builds. |
| **Domingo Final** | 16:00 \- 17:00 | Subida a Itch.io | Marketing. Screenshots. Descansar. |

## **Tabla 3: Scripts Clave de Unity Playground a Enseñar**

| Script / Componente | Función en el Juego | Concepto Pedagógico |
| :---- | :---- | :---- |
| Rigidbody2D | Da cuerpo físico (gravedad, masa). | Motor de Física, Simulación. |
| Move | Mueve el objeto con flechas/WASD. | Input, Controladores. |
| AutoRotate | Rota el objeto constantemente. | Transformaciones, Comportamiento Autónomo. |
| ModifyHealthAttribute | Resta salud al chocar. | Lógica de Interacción, Datos. |
| CollectableAttribute | Suma puntos y desaparece. | Sistemas de Recompensa, Triggers. |
| UserInterface (Prefab) | Muestra Salud/Puntos y Pantalla Win. | UI, Feedback al Jugador, Estados de Juego. |

# **Apéndice B: Guion de Dinámicas Específicas**

### **Dinámica: "Subasta de Características" (The Feature Auction)**

*Para enseñar el alcance (scoping).*

1. **Setup:** "Tenéis 100 dólares de presupuesto de desarrollo".  
2. **Menú:**  
   * Personaje que camina: $40  
   * Salto doble: $20  
   * Inventario: $50  
   * Multijugador: $500  
   * Condición de ganar (llegar a la meta): $30  
   * Gráficos 4K: $80  
3. **Ejecución:** Los estudiantes intentan "comprar" su juego. Se dan cuenta de que con $100 solo pueden comprar "Caminar" ($40) \+ "Ganar" ($30) \+ "Salto" ($20). Sobran $10.  
4. **Lección:** No puedes permitirte el Inventario ni el Multijugador. El presupuesto es el tiempo. En una Jam, sois pobres en tiempo. Gastadlo en lo esencial.

### **Dinámica: "El Abogado del Diablo" (Invertir el Rol)**

*Para testear ideas.*

1. Un estudiante presenta su idea de MVP en 30 segundos.  
2. Otro estudiante (o el profesor) debe preguntar: "¿Qué es lo ÚNICO que hace este juego divertido?".  
3. Si la respuesta requiere más de una frase, la idea es demasiado compleja para una Jam.  
4. Esto entrena la capacidad de síntesis y foco ("El juego es divertido porque el salto es satisfactorio", no "porque tiene una historia compleja y 50 niveles").

#### **Fuentes citadas**

1\. How to Build a Minimal Viable Product (MVP) \- DigitalOcean, https://www.digitalocean.com/resources/articles/minimum-viable-product 2\. Making sense of MVP (Minimum Viable Product) \- and why I prefer Earliest Testable/Usable/Lovable \- Crisp's Blog, https://blog.crisp.se/2016/01/25/henrikkniberg/making-sense-of-mvp 3\. Feature creep \- Wikipedia, https://en.wikipedia.org/wiki/Feature\_creep 4\. Feature Creep \- UAT Student Blog, https://blog.uat.edu/blogs/feature-creep 5\. Learn to make a Game with Unity\! Beginners and Intermediates \- Code Monkey, https://unitycodemonkey.com/kitchenchaoscourse.php 6\. Explore a Microgame \- Unity Learn, https://learn.unity.com/course/vr-curricular-framework-resources/tutorial/explore-a-microgame 7\. Playground concepts \- Unity Learn, https://learn.unity.com/course/teaching-game-design-and-development/unit/unity-playground/tutorial/playground-concepts 8\. Playground: Get started on your first game \- Unity Learn, https://learn.unity.com/tutorial/playground-get-started-on-your-first-game?uv=2022.2\&projectId=5c5147e8edbc2a002069444e 9\. Introduction \- Unity, https://connect-prd-cdn.unity.com/20190610/8c363dc0-7042-4fe0-b2b1-b22dc96ec928\_Unity\_Playground\_Script\_Reference\_Guide.pdf?\_ga=2.266103433.740188803.1591626934-1249330694.1591626934 10\. Prepare for your first game jam \- Unity Learn, https://learn.unity.com/course/get-started-with-game-jams/tutorial/prepare-for-your-first-game-jam 11\. Global Game Jam – Survival Guide –, http://www.sfu.ca/\~lws2/GDC/GGJ\_GDC\_SurvivalGuide.pdf 12\. 01: Unity Foundation \- CE Workshops, https://workshops.cetools.org/codelabs/casa0019-01-unity-foundation/index.html?index=..%2F..index 13\. 35 Virtual Team Building Activities in 2025 (Ranked) \- Museum Hack, https://museumhack.com/virtual-team-building-for-remote-teams/ 14\. 25 Fun Icebreakers for the Virtual Classroom \- Engageli, https://www.engageli.com/blog/icebreakers-for-online-classrooms 15\. 5 Brainstorming Warm-up Exercises to Activate Your Creativity | Lucidspark \- Lucid Software, https://lucid.co/blog/brainstorming-warm-up-exercises 16\. 29 Brainstorming Techniques for Better Brainstorms \[2025\] \- Asana, https://asana.com/resources/brainstorming-techniques 17\. 28 Training Activities and Games You Can Use to Liven up Your Sessions, https://www.arlo.co/blog/training-activities-and-games 18\. 63 Virtual Icebreaker Ideas, Games & Activities For 2026 \- Airmeet, https://www.airmeet.com/hub/blog/virtual-icebreaker-ideas/ 19\. 45 Team-Building Games That Bring Teams Together \[2025\] \- Asana, https://asana.com/resources/team-building-games 20\. Ideas always going out of scope- should I try Jams to help with this? : r/gamedev \- Reddit, https://www.reddit.com/r/gamedev/comments/1mdyz5t/ideas\_always\_going\_out\_of\_scope\_should\_i\_try\_jams/ 21\. How to play the 'Buy a feature' design game \- UXM, https://www.uxforthemasses.com/buy-the-feature/ 22\. Game Jam Tips \- Game Design Thinking, https://gamedesignthinking.com/game-jam-tips/ 23\. Complete a successful game jam \- Unity Learn, https://learn.unity.com/course/get-started-with-game-jams/tutorial/complete-a-successful-game-jam 24\. My first game jam\! Any advice for a beginner? : r/gamedev \- Reddit, https://www.reddit.com/r/gamedev/comments/1hmnbbu/my\_first\_game\_jam\_any\_advice\_for\_a\_beginner/ 25\. 72 Hours, 1 Game: A First-Timer's Guide to Game Jams | by Andrew Lukes | Medium, https://medium.com/@andwebdev/72-hours-1-game-a-first-timers-guide-to-game-jams-792617432290 26\. How to Make a Game in 1 Hour in Unity: from 0 to a Match Three Game : r/gamedev \- Reddit, https://www.reddit.com/r/gamedev/comments/xjxh3j/how\_to\_make\_a\_game\_in\_1\_hour\_in\_unity\_from\_0\_to\_a/ 27\. The Game Jam Suvival Guide \- Game Developer, https://www.gamedeveloper.com/design/the-game-jam-suvival-guide 28\. Game Jam Survival Guide: From Zero to Game in 48 Hours \- Wayline, https://www.wayline.io/blog/game-jam-survival-guide 29\. How to Setup Unity's 3rd Person Character Controller | by Ricardo Miranda | Medium, https://medium.com/@ricardoemiranda/how-to-setup-unitys-3rd-person-character-controller-2dcb832dc6f0 30\. Team Building Activities for Developers: 20 Virtual Games & Challenges Beyond the Usual, https://superglue.games/team-building-activities-for-developers/ 31\. Game Jam Theme Generator \- Let's Make a Game, https://letsmakeagame.net/game-jam-theme-generator/ 32\. Best Game Jam Ideas for 2024 Game Jams \- Inworld AI, https://inworld.ai/blog/best-game-jam-ideas-for-2024-game-jams-- 33\. Kenney Game Assets All-in-1 by Kenney, https://kenney.itch.io/kenney-game-assets