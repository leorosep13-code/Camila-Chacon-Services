# Tarea: sección "Brief de Marca" con almacenamiento en Supabase

## Contexto

Estoy construyendo la web de **club by cami** (marca personal de estrategia digital). Necesito una sección nueva, **`/brief`**, con un formulario largo que las clientas llenan antes de su proceso de estrategia. Las respuestas se guardan en **Supabase**.

Antes de escribir código:

1. Revisa la estructura del repo y respeta el stack, las convenciones y los componentes que ya existen (se espera Next.js con App Router + TypeScript; si el proyecto usa otra cosa, adáptate y avísame).
2. Si Supabase aún no está configurado en el proyecto, configúralo (`@supabase/supabase-js`, variables de entorno en `.env.local` y `.env.example`).
3. Muéstrame un plan corto antes de implementar.

---

## Requisitos funcionales

- **Formulario por pasos**: una sección por pantalla (12 secciones), con botones "Atrás" / "Siguiente" y **barra de progreso** ("Paso 3 de 12").
- **Validación por paso**: no se avanza si faltan obligatorias o si una regla falla. Mensajes de error claros, en español, junto al campo.
- **Borrador automático**: guarda el avance en `localStorage` (clave `brief-draft-v1`) en cada cambio y lo restaura al volver. Se borra al enviar con éxito. Envuelve lectura/escritura en try/catch.
- **Opciones "Otro"**: cuando una pregunta tiene la opción `Otro`, al seleccionarla aparece un input de texto para especificar.
- **Envío**: al final, botón "Enviar mi brief". Estado de carga, prevención de doble envío y manejo de error con opción de reintentar sin perder datos.
- **Pantalla de confirmación**: "¡Gracias! 🎉 Recibirás tu propuesta en máximo 3 días hábiles. Te escribiré por WhatsApp para confirmar tu reunión."
- **Mobile-first**: la mayoría llega desde Instagram en el celular.
- **Antispam**: campo honeypot oculto; si viene lleno, responde éxito sin guardar.

## Arquitectura recomendada

- **Las preguntas viven en un solo archivo de configuración** (`lib/brief/questions.ts`) con la lista tipada de secciones y preguntas definida abajo. El formulario se renderiza desde esa configuración y el esquema de validación (Zod) se genera también desde ella. Así, cambiar una pregunta = editar un solo archivo.
- **El envío pasa por el servidor** (Server Action o Route Handler `POST /api/brief`), que revalida con el mismo esquema Zod y guarda con la **service role key** (solo en servidor, nunca expuesta al cliente).
- **RLS activado** en la tabla y **sin políticas para `anon`**: nadie puede leer ni escribir desde el navegador.

### Tipos de pregunta

| tipo       | control                                            | valor guardado                           |
| ---------- | -------------------------------------------------- | ---------------------------------------- |
| `texto`    | input de una línea                                 | string                                   |
| `parrafo`  | textarea                                           | string                                   |
| `opcion`   | radio (una sola)                                   | string (si es "Otro": `"Otro: <texto>"`) |
| `casillas` | checkboxes (varias)                                | string[]                                 |
| `escala`   | 5 botones del 1 al 5 con etiquetas en los extremos | number (1–5)                             |

Reglas extra: `exactamente: 3` y `maximo: 3` en casillas; `requerido` en cualquiera.

---

## Base de datos (Supabase)

Crea una migración SQL con lo siguiente (o equivalente):

```sql
create table public.briefs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- columnas clave para filtrar y contactar rápido
  nombre text not null,
  negocio text not null,
  ciudad_pais text not null,
  whatsapp text not null,
  email text,
  categoria text,
  etapa text,
  objetivo_principal text,
  zona_horaria text,

  -- todas las respuestas, con el id de cada pregunta como clave
  respuestas jsonb not null,

  version_formulario text not null default 'v1',
  estado text not null default 'nuevo'
    check (estado in ('nuevo', 'revisado', 'propuesta_enviada', 'cerrado'))
);

alter table public.briefs enable row level security;
-- Sin políticas para anon/authenticated: solo el servidor (service role) accede.

create index briefs_created_at_idx on public.briefs (created_at desc);
create index briefs_estado_idx on public.briefs (estado);
```

Las columnas clave se llenan a partir de `respuestas` en el servidor (ids: `nombre`, `negocio`, `ciudad_pais`, `whatsapp`, `email`, `categoria`, `etapa`, `objetivo_principal`, `zona_horaria`).

## Variables de entorno

```
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

---

## Diseño (identidad web de club by cami)

- **Paleta**: morado `#826DEE` (hover `#6250D6`, oscuro `#4A3AAE`, suave `#EFEBFF`) · rosa `#FF99DC` (fuerte `#E0559F`, suave `#FFEFF9`) · verde lima `#D8F382` (`#A8CF3E`, suave `#F4FBE0`) · carbón `#1A1A1A` · gris `#4B4B4B` · gris claro `#F2F2F2` · línea `#E6E6EC`.
- **Tipografía**: Poppins en todo (300–700). Títulos en mayúscula, peso 700, `letter-spacing: -0.025em`.
- **Marca**: asterisco de 8 puntas dibujado en SVG, en rosa, como viñeta de los "eyebrows".
- **Componentes**: tarjetas con esquinas muy redondeadas (20–38 px) y sombras suaves; botones tipo píldora en mayúscula (primario morado); eyebrows en mayúscula espaciada con asterisco rosa.
- **Hero de la sección**: fondo carbón con glows morado/rosa difuminados, título "BRIEF DE MARCA" y el texto de bienvenida.
- **Opciones de casillas y radio**: como "chips" o tarjetas seleccionables grandes (fáciles de tocar en móvil), con estado seleccionado en morado suave + borde morado.
- **Barra de progreso**: verde lima sobre gris claro.
- No uses gradiente coral→fucsia ni tipografías serif.

---

## Contenido del formulario

**Título:** Brief de Marca · club by cami

**Bienvenida:** ¡Hola! 💜 Este brief es la base de tu estrategia. Mientras más me cuentes, más a tu medida será tu propuesta. Te toma entre 20 y 30 minutos. Responde con calma: si no sabes algo, escríbelo tal cual ("no sé todavía"), eso también me ayuda.

Formato abajo: `id` · tipo · **requerido (\*)** · pregunta · opciones.

### 1 · Tus datos

- `nombre` · texto \* · Tu nombre completo
- `negocio` · texto \* · Nombre de tu negocio o marca (si aún no tiene, escribe "sin nombre")
- `ciudad_pais` · texto \* · Ciudad y país
- `whatsapp` · texto \* · Tu WhatsApp, con código de país — validar: empieza con `+` y tiene 8 a 15 dígitos
- `email` · texto · Correo electrónico — validar formato si se llena
- `links` · parrafo · Links de tus redes sociales, página web o tienda (si tienes)

### 2 · Tu negocio

Ayuda: Una foto general de lo que haces.

- `descripcion` · texto \* · Describe tu negocio en una frase. Ej.: "Vendo **_ para _** en **_" o "Ayudo a _** a \_\_\_"
- `categoria` · opcion \* · ¿En qué categoría está tu negocio? · Comida y bebidas | Belleza y cuidado personal | Moda y accesorios | Salud y bienestar | Educación y cursos | Servicios profesionales | Productos digitales | Hogar y decoración | Otro
- `tipo_venta` · opcion \* · ¿Qué vendes principalmente? · Productos físicos | Servicios | Productos digitales | Una mezcla
- `etapa` · opcion \* · ¿En qué etapa está tu negocio? · Es solo una idea | Estoy empezando (menos de 6 meses) | Vendo de vez en cuando | Vendo de forma constante | Quiero crecer o escalar
- `modalidad` · opcion \* · ¿Dónde vendes? · Solo online | Solo presencial | Online y presencial
- `alcance` · opcion \* · ¿Hasta dónde llegas con tus ventas? · Mi barrio o zona | Mi ciudad | Todo mi país | Internacional
- `equipo` · opcion \* · ¿Quién trabaja en el negocio? · Solo yo | Yo y 1 a 3 personas | Un equipo de 4 o más

### 3 · Tu punto de partida

Ayuda: Dónde estás hoy. Empezar de cero está perfecto.

- `tiene_hoy` · casillas \* · ¿Qué tienes hoy? · Nombre de marca | Logo | Instagram | TikTok | Facebook | WhatsApp Business | Página web o tienda online | Fotos profesionales | Clientes | Nada todavía — si marca "Nada todavía", desmarca las demás (y viceversa)
- `ventas_mes` · opcion \* · ¿Cuánto vendes al mes aproximadamente? · Todavía no vendo | Menos de USD 200 | Entre USD 200 y 1.000 | Entre USD 1.000 y 5.000 | Más de USD 5.000
- `num_clientes` · opcion \* · ¿Cuántos clientes tienes aproximadamente? · Ninguno todavía | Menos de 10 | Entre 10 y 50 | Más de 50
- `que_funciona` · parrafo · ¿Qué te ha funcionado hasta ahora para vender o conseguir clientes?
- `que_no_funciono` · parrafo · ¿Qué has intentado que no te funcionó?
- `horas_semana` · opcion \* · ¿Cuántas horas a la semana le puedes dedicar al negocio? · Menos de 5 | Entre 5 y 10 | Entre 10 y 20 | Más de 20
- `inversion_marketing` · opcion \* · ¿Cuánto puedes invertir al mes en marketing (publicidad, diseño, herramientas)? · Nada por ahora | Menos de USD 50 | Entre USD 50 y 200 | Más de USD 200

### 4 · Tu oferta

Ayuda: Qué vendes, a cuánto y cómo.

- `productos_precios` · parrafo \* · Lista tus productos o servicios con su precio (si aún no tienes precios, escribe "sin precio")
- `estrella` · texto \* · ¿Cuál es tu producto o servicio estrella (el que más vendes o más te elogian)?
- `mas_ganancia` · texto · ¿Cuál te deja más ganancia?
- `proceso_compra` · parrafo \* · ¿Cómo te compra un cliente hoy, paso a paso? Ej.: "me escribe, le envío la información, paga y le entrego"
- `metodos_pago` · casillas · ¿Qué métodos de pago aceptas o quieres aceptar? · Efectivo | Transferencia bancaria | Tarjeta | Billeteras digitales (Nequi, Daviplata, Zelle, Venmo, etc.) | PayPal | Link de pago | Otro
- `entrega` · casillas \* · ¿Cómo entregas? · Recogida en mi casa o local | Entrega a domicilio | Envío por transportadora | Digital (link o acceso) | Presencial (servicio)
- `capacidad` · texto \* · ¿Cuántos pedidos o clientes puedes atender por semana sin agotarte?
- `diferencial` · parrafo \* · ¿Qué te hace diferente de otros que venden lo mismo?
- `por_que_te_eligen` · parrafo · Cuando alguien te compra, ¿por qué crees que te eligió a ti?

### 5 · Tu identidad

Ayuda: La esencia de tu marca: por qué existe y cómo se siente.

- `tipo_marca` · opcion \* · ¿Cómo quieres que se vea tu marca? · Marca personal (la gente me conoce a mí) | Marca de producto (el protagonista es el producto) | Una mezcla de las dos
- `historia` · parrafo \* · ¿Cómo nació tu negocio? Cuéntame la historia
- `proposito` · parrafo · ¿Por qué haces lo que haces? ¿Qué quieres lograr más allá del dinero?
- `palabras` · casillas \* · **exactamente 3** · Elige exactamente 3 palabras que quieres que la gente sienta con tu marca · Cálida | Elegante | Divertida | Nostálgica | Moderna | Artesanal | Cercana | Premium | Tierna | Atrevida | Profesional | Natural | Lujosa | Juvenil | Confiable — muestra contador "2 de 3" y deshabilita el resto al llegar a 3
- `valores` · casillas \* · **máximo 3** · ¿Qué valores representan tu negocio? · Calidad | Honestidad | Cercanía | Creatividad | Tradición | Innovación | Responsabilidad | Alegría | Excelencia | Sostenibilidad
- `marca_persona` · parrafo · Si tu marca fuera una persona, ¿cómo sería? (cómo habla, cómo se viste, qué le gusta)
- `tono_formal` · escala \* · Tono de tu marca: ¿más formal o más cercano? · 1 = Muy formal · 5 = Muy cercano
- `tono_serio` · escala \* · Tono de tu marca: ¿más serio o más divertido? · 1 = Muy serio · 5 = Muy divertido
- `no_parecer` · parrafo · ¿Qué NO quieres que parezca tu marca?

### 6 · Identidad visual

Ayuda: Cómo se ve tu marca.

- `logo` · opcion \* · ¿Tienes logo? · Sí, hecho por un diseñador | Sí, lo hice yo o con una app | Tengo solo una idea | No tengo
- `logo_link` · texto · Si tienes logo o una idea, pega aquí el link o envíamelo por WhatsApp
- `estilos` · casillas \* · ¿Qué estilos visuales te gustan? (puedes elegir varios) · Pastel y tierno | Minimalista | Rústico y artesanal | Moderno y colorido | Elegante y lujoso | Retro o vintage | Natural y orgánico | Atrevido y llamativo
- `colores_si` · parrafo · Colores que te encantan para tu marca
- `colores_no` · parrafo · Colores que NO quieres
- `tipografia` · casillas · ¿Qué estilo de letra te gusta? · Elegante (con serifas) | Moderna y limpia | Escrita a mano | Divertida y redondeada | No sé
- `marcas_visuales` · parrafo · Marcas que te gustan visualmente (de cualquier tema) y qué te gusta de cada una

### 7 · Tu cliente ideal

Ayuda: A quién le vendes (o quieres venderle).

- `edades` · casillas \* · ¿Qué edad tienen tus clientes? (puedes elegir varios rangos) · Menos de 18 | 18 a 24 | 25 a 34 | 35 a 44 | 45 a 54 | 55 o más
- `genero_cliente` · opcion \* · ¿A quién le vendes principalmente? · Mujeres | Hombres | A los dos por igual
- `cliente_ideal` · parrafo \* · Describe a tu cliente ideal como si fuera una persona real (a qué se dedica, cómo es su día, qué le gusta)
- `problema` · parrafo \* · ¿Qué problema le resuelves o qué deseo le cumples?
- `motivo_compra` · casillas \* · ¿Para qué te compran? · Para ellos mismos | Para regalar | Para una ocasión especial | Por necesidad | Por antojo o capricho | Para su negocio
- `objeciones` · parrafo · ¿Qué dudas o excusas ponen antes de comprarte? Ej.: "está caro", "no te conozco"
- `donde_estan` · casillas \* · ¿Dónde pasan tiempo tus clientes en internet? · Instagram | TikTok | Facebook | Grupos de Facebook | WhatsApp | YouTube | Pinterest | Google | LinkedIn | No sé
- `cliente_no` · parrafo · ¿Hay algún tipo de cliente al que NO quieres venderle?

### 8 · Competencia y referencias

Ayuda: Quién más vende lo que tú vendes, y a quién admiras.

- `competidores` · parrafo · Nombra hasta 3 competidores (links o usuarios) y qué hacen bien o mal
- `inspiracion` · parrafo \* · Comparte 3 cuentas que te inspiran (de tu tema o de cualquier otro) y qué te gusta de cada una
- `harias_distinto` · parrafo · ¿Qué ves en tu competencia que tú harías distinto?

### 9 · Contenido y comunicación

Ayuda: Para crear un plan de contenido que de verdad puedas cumplir.

- `redes_hoy` · casillas \* · ¿En qué redes publicas hoy? · Instagram | TikTok | Facebook | YouTube | LinkedIn | Estados de WhatsApp | Ninguna todavía — "Ninguna todavía" es excluyente
- `frecuencia` · opcion \* · ¿Cada cuánto publicas hoy? · No publico | De vez en cuando | 1 a 2 veces por semana | 3 o más veces por semana | Todos los días
- `comodidad_camara` · escala \* · ¿Qué tan cómoda o cómodo te sientes en cámara? · 1 = Nada · 5 = Muchísimo
- `dispuesta_mostrar` · casillas \* · ¿Qué estás dispuesta o dispuesto a mostrar? · Mi cara | Mi voz | Mis manos trabajando | Mi historia personal | Mi día a día | Solo el producto o servicio
- `formatos` · casillas \* · ¿Qué formatos te gustaría hacer? · Reels o videos cortos | Carruseles | Fotos | Historias | En vivos | No sé todavía
- `temas_facil` · parrafo · ¿De qué temas podrías hablar con facilidad? (lo que sabes, te apasiona o te preguntan)
- `temas_no` · parrafo · ¿Hay temas de los que NO quieres hablar?
- `herramientas` · casillas · ¿Qué herramientas usas o sabes usar? · Canva | CapCut | Editor de Instagram o TikTok | Photoshop o similares | Ninguna
- `publicidad` · opcion \* · ¿Has hecho publicidad pagada (anuncios en Instagram, Facebook, TikTok, Google)? · Nunca | Sí, sin buenos resultados | Sí, con buenos resultados

### 10 · Canales de venta

Ayuda: Dónde vendes hoy y dónde quieres vender.

- `vende_hoy` · casillas \* · ¿Dónde vendes hoy? · WhatsApp | Mensajes de Instagram | Página web o tienda online | Tienda física | Ferias o eventos | Marketplaces (Amazon, Mercado Libre, Etsy, etc.) | Apps de domicilios | Todavía no vendo — "Todavía no vendo" es excluyente
- `quiere_vender` · casillas · ¿Dónde te gustaría vender? · WhatsApp | Mensajes de Instagram | Página web o tienda online | Tienda física | Ferias o eventos | Marketplaces (Amazon, Mercado Libre, Etsy, etc.) | Apps de domicilios

### 11 · Tus metas

Ayuda: Tus números y lo que esperas de este proceso.

- `objetivo_principal` · opcion \* · ¿Cuál es tu objetivo principal en este momento? · Empezar a vender | Vender más | Que más gente me conozca | Lanzar un producto o servicio nuevo | Profesionalizar mi marca | Crear comunidad
- `meta_3m` · texto \* · ¿Cuánto te gustaría vender al mes en 3 meses? (en tu moneda)
- `meta_1a` · texto · ¿Y en 1 año?
- `exito_1m` · parrafo \* · Si en un mes todo sale bien, ¿qué habría pasado?
- `miedo` · parrafo \* · ¿Qué es lo que más te frena o te da miedo?
- `expectativa` · parrafo \* · ¿Qué esperas recibir de este proceso conmigo?

### 12 · Tu reunión

Ayuda: Recibirás tu propuesta en máximo 3 días hábiles. Elige cuándo te queda mejor la reunión.

- `disponibilidad` · casillas \* · ¿Cuándo te queda mejor la reunión? · Lunes a viernes, mañana | Lunes a viernes, tarde | Lunes a viernes, noche | Sábado | Domingo
- `zona_horaria` · texto \* · ¿En qué zona horaria estás? Ej.: Bogotá, Ciudad de México, Madrid
- `como_conociste` · opcion · ¿Cómo me conociste? · Instagram | TikTok | Recomendación | Otro
- `algo_mas` · parrafo · ¿Algo más que quieras contarme?

---

## Criterios de aceptación

- [ ] `/brief` carga en móvil y escritorio con la identidad descrita.
- [ ] No se avanza de paso con obligatorias vacías; `palabras` exige exactamente 3 y `valores` máximo 3.
- [ ] Opciones "Otro" piden texto y se guardan como `"Otro: <texto>"`.
- [ ] Al recargar la página, el avance se recupera del borrador.
- [ ] Un envío válido crea una fila en `briefs` con las columnas clave llenas y `respuestas` completo.
- [ ] Desde el navegador no se puede leer la tabla (verifica que RLS bloquea al cliente anónimo).
- [ ] La service role key solo se usa en código de servidor.
- [ ] Tras enviar se muestra la confirmación y se borra el borrador.

## Fuera de alcance (por ahora)

Panel de administración para ver los briefs, notificaciones por correo/WhatsApp y edición de respuestas después de enviadas. Déjalo fácil de agregar después.
