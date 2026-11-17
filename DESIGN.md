---
name: Podóloga Aurora
description: Podología clínica, spa médico y masajes de pies en Pachuca, Hidalgo. La página amanece al bajar.
colors:
  noche: "#0F2537"
  alba: "#F2B8A2"
  sol: "#F08A2C"
  dorado: "#F5C85A"
  cielo: "#BEE1F0"
  dia: "#F3F7F9"
  mediodia: "#63B9E6"
  ink: "#0D1E2C"
  paper: "#FFFFFF"
  paper-soft: "#C9D7E3"
  ink-hover: "#22405A"
  sol-hover: "#F7A04E"
  sol-deep: "#C2620E"
  dorado-deep: "#B7860F"
  cielo-deep: "#2F8FC4"
  sol-tint: "#FCE3CC"
  dorado-tint: "#FCF0CF"
  cielo-tint: "#E2F2FA"
typography:
  display:
    fontFamily: "Albert Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "min(8.5rem, calc(172cqi / (chars × 0.56)))"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Albert Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "min(5rem, calc(172cqi / (chars × 0.56)))"
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: "-0.035em"
  lead:
    fontFamily: "Albert Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Albert Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Albert Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 700
    lineHeight: 1.1
rounded:
  none: "0"
  arch: "999px 999px 0 0"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 2.3vw, 32px)"
  section: "clamp(96px, 11vw, 192px)"
  stack-sm: "12px"
  stack-md: "28px"
  row-gap: "4px"
components:
  button-action:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "52px"
  button-action-hover:
    backgroundColor: "{colors.ink-hover}"
  button-action-on-night:
    backgroundColor: "{colors.sol}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "52px"
  button-plain:
    backgroundColor: "rgba(13,30,44,0.07)"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "52px"
  pill-choice:
    backgroundColor: "rgba(255,255,255,0.08)"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    height: "44px"
  pill-choice-selected:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  arch-media:
    rounded: "{rounded.arch}"
  list-row:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "14px 18px 14px 50px"
---

# Design System: Podóloga Aurora

## Overview

**Creative North Star: "La página amanece"**

Aurora quiere decir amanecer, y el sitio lo hace literal: cada sección es un campo plano de color a sangre que sigue la secuencia de un amanecer sobre Pachuca (noche, alba rosa, sol, dorado, cielo de la mañana, día, mediodía) y el cierre vuelve a la noche. La forma que lo une todo es el arco, tope semicircular y base recta: el sol que asoma en el horizonte y, al mismo tiempo, la curva del borde libre de una uña. Ese arco recorta cada video y cada foto, y cuando puede nace del borde inferior de su capítulo, como un sol sobre la línea del horizonte.

El sistema rechaza la clínica de azul médico y blanco con tarjetas de íconos, sombras suaves y carrusel de testimonios. La confianza sale de mostrar el trabajo real (los videos de la podóloga), del precio dicho claro y de una acción única que siempre se llama igual: "Agendar por WhatsApp".

**Key Characteristics:**
- Campos de color a sangre, uno por sección, sin líneas ni degradados entre ellos.
- Una sola familia tipográfica, Albert Sans, con títulos enormes que siempre caben en dos líneas.
- El arco como única forma con carácter: imágenes, viñetas de lista y la progresión de pasos.
- Controles en píldora total; todo lo demás en esquina recta.
- Superficies separadas por pasos de tono, nunca por bordes ni sombras.

## Colors

Estrategia Full palette en secuencia: cada campo es un color del amanecer con su tinta asignada. La tinta corre siempre al 100% en el texto.

### Primary
- **Sol** (#F08A2C): campo de la clínica y color de la acción sobre fondos de noche. Su tinta es Ink.

### Secondary
- **Noche** (#0F2537): primera pantalla, barra de navegación, pasos de proceso, cierres y pie. Su tinta es Paper, con Paper Soft (#C9D7E3) para lo secundario.
- **Alba** (#F2B8A2), **Dorado** (#F5C85A), **Cielo** (#BEE1F0), **Mediodía** (#63B9E6): campos de servicios, spa, masajes y ubicación, todos con tinta Ink.

### Neutral
- **Día** (#F3F7F9): campo de lectura en las páginas de servicio y preguntas.
- **Ink** (#0D1E2C) y **Paper** (#FFFFFF).

### Named Rules
**The Assigned Ink Rule.** Cada campo tiene una sola tinta: Paper sobre Noche, Ink sobre todo lo demás. Nunca gris para texto corrido.
**The Dawn Order Rule.** En una página los campos avanzan en el orden del amanecer; dos campos iguales no se tocan.
**The One Action Rule.** El botón principal es Ink sobre campos claros y Sol sobre Noche; Sol no aparece como acento decorativo en campos claros.

## Typography

**Display y todo lo demás:** Albert Sans variable (100–900), autoalojada en /fonts con `font-display: swap`. Una sola familia.

### Hierarchy
- **Display** (800, 0.92, -0.04em): el h1. Tamaño `min(máximo, 172cqi / (caracteres × 0.56))` sobre la columna que lo contiene, así cabe en dos líneas en cualquier ancho.
- **Title** (800, 0.96, -0.035em): los h2 de capítulo, con la misma fórmula y su `--chars`.
- **Lead** (400, 1.375rem, 1.45): la frase bajo cada título, 34–48 caracteres por línea.
- **Body** (400, 1.125rem, 1.55): texto corrido, máximo 72ch.
- **Label** (700, 1.0625rem): botones, píldoras, leyendas.

### Named Rules
**The Two-Line Rule.** Ningún título pasa de dos líneas; el tamaño sale del ancho de su columna y de su número de caracteres (`style="--chars:N"`, con las mayúsculas contadas 1.3).
**The No-Eyebrow Rule.** Nada pequeño encima de un título; la información va en el título o en la primera frase.

## Layout

Marco de márgenes iguales `clamp(16px, 2.3vw, 32px)` a ambos lados, sin contenedor máximo: lo grande llega al borde y el texto se limita por medida. Rejilla de 12 columnas en los capítulos de inicio. Entre secciones `clamp(96px, 11vw, 192px)` dentro de cada campo. Composiciones distintas en capítulos vecinos (split con tabla, arco a la izquierda desde el horizonte, título ancho con arco horizonte a todo lo ancho, título ancho con tres columnas). Puntos de quiebre: 1080, 980, 860, 760, 560 px. En celular hay una barra inferior sólida con la acción, respetando el área segura.

## Elevation & Depth

Plano. Las superficies se separan con pasos de tono (`rgba(13,30,44,.07)` sobre campos claros, `rgba(255,255,255,.08)` sobre Noche). Sombra solo en lo que flota de verdad: el submenú desplegado y la barra fija de celular, con desplazamiento y desenfoque suave.

## Shapes

Dos radios, decididos para todo el sitio: píldora total (999px) en controles y arco (999px 999px 0 0) en imágenes y viñetas. Todo lo demás, esquina recta. Nada de radios intermedios de 12–24px.

## Components

### Buttons
Píldora de 52px de alto, 700, un solo relleno. Acción: Ink/Paper en claro, Sol/Ink en noche. Secundario: paso de tono con la tinta del campo. Hover cambia el relleno; al presionar escala a 0.97.

### Chips (if used)
Las píldoras de "Arma tu cita" son radios reales: 44px, paso de tono, seleccionada en Paper con texto Ink, foco con anillo Sol.

### Cards / Containers
No hay tarjetas. Las listas son filas de Paper separadas por 4px sobre el campo, con la viñeta de arco en el color profundo del grupo. Las preguntas son `details` nativos en filas de Paper con un más dibujado en CSS.

### Navigation
Barra de Noche pegajosa: logo y "Aurora", cuatro enlaces con submenú (hover/focus) y la acción en Sol. En celular, botón "Menú" que abre un panel de Noche a pantalla completa.

### Arma tu cita (Signature Component)
Servicio y día como grupos de radios; el resultado muestra el precio real publicado (o "precio según valoración") y actualiza todos los enlaces de WhatsApp con el mensaje armado. Sin JavaScript, el botón abre WhatsApp con un mensaje genérico. Junto a él, el estado abierto/cerrado con la hora de Pachuca.

## Do's and Don'ts

### Do:
- **Do** dar a cada sección un campo entero del amanecer, en orden.
- **Do** recortar toda foto o video con el arco y, cuando se pueda, apoyarlo en el borde inferior del campo.
- **Do** usar los videos propios de la podóloga antes que cualquier foto de banco.
- **Do** escribir `--chars` en cada h1/h2 nuevo y verificar dos líneas a 1440, 768 y 390.
- **Do** llamar a la acción siempre "Agendar por WhatsApp".

### Don't:
- **Don't** usar el azul médico con blanco y tarjetas de íconos del rubro.
- **Don't** poner degradados, glass, sombras en reposo, líneas finas divisorias ni etiquetas sobre los títulos.
- **Don't** numerar pasos con 01/02/03; el orden lo da la posición y el sol que crece.
- **Don't** presentar una foto de banco como el consultorio, la podóloga o un paciente.
- **Don't** inventar reseñas, cifras de pacientes ni precios que el cliente no haya publicado.
