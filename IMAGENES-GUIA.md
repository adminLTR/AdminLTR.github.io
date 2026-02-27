# Guía para Agregar Imágenes Referenciales

## Ubicación de las Imágenes

### Experiencia y Voluntariado
Todas las imágenes referenciales para las secciones de **Experiencia** y **Voluntariado** deben estar ubicadas en:
```
img/experience/
```

### Logros (Achievements)
Todas las imágenes referenciales para la sección de **Logros** deben estar ubicadas en:
```
img/achievements/
```

## Cómo Agregar Imágenes

### Para Experiencia Laboral

En el archivo `js/data.js`, dentro del array `experience`, agrega el campo `image` con la ruta relativa:

```javascript
const experience = [       
    {
        name: 'GM Group',
        image: 'experience/gmgroup.png',  // ← Agregar esta línea
        location: {
            // ... resto de la información
        },
        // ... resto de campos
    }
]
```

### Para Voluntariado

En el archivo `js/data.js`, dentro del array `volunteer`, agrega el campo `image` de la misma manera:

```javascript
const volunteer = [
    {
        name: 'Eneisoft',
        image: 'experience/eneisoft.png',  // ← Agregar esta línea
        location: {
            // ... resto de la información
        },
        // ... resto de campos
    }
]
```

### Para Logros (Achievements) **¡NUEVO!**

En el archivo `js/data.js`, dentro del array `achievements`, agrega el campo `image`:

```javascript
const achievements = [
    {
        image: 'achievements/datapower.jpg',  // ← Agregar esta línea
        title: {
            'great-britain': 'Official Speaker at DataPower (DSRP)',
            // ... otros idiomas
        },
        location: {
            // ... resto de la información
        },
        // ... resto de campos
    }
]
```

## Especificaciones de las Imágenes

### Para Experiencia y Voluntariado
**Tamaño Recomendado:**
- **Dimensiones**: 360x280 píxeles (proporción horizontal, formato foto)
- **Formato**: PNG, JPG, o WebP
- **Peso**: Máximo 800KB
- **Estilo**: Fotos referenciales (no logos) con formato horizontal/apaisado

**Características:**
- Las imágenes se muestran **al costado** de los cards de forma intercalada
- Border-radius de 20px (esquinas redondeadas)
- Efecto hover con zoom (1.1x) y overlay de color
- En móviles (< 1024px) se ocultan automáticamente

**Posicionamiento:**
- Cards a la izquierda → Imagen a la derecha
- Cards a la derecha → Imagen a la izquierda

### Para Logros (Achievements)
**Tamaño Recomendado:**
- **Dimensiones**: 600x300 píxeles (proporción 2:1 - horizontal)
- **Formato**: PNG, JPG, o WebP
- **Peso**: Máximo 800KB

**Características:**
- Las imágenes se muestran en la **parte superior** del card
- Altura fija de 200px con object-fit: cover
- Overlay con icono del logro al hacer hover
- Visibles en todos los dispositivos

## Comportamiento Responsive

### Experiencia y Voluntariado
- **Desktop (> 1280px)**: Imágenes de 200x200px al costado de cada card
- **Tablets (1024px - 1280px)**: Imágenes reducidas a 150x150px
- **Móvil (< 1024px)**: Imágenes ocultas

### Achievements
- **Todos los dispositivos**: Imágenes siempre visibles en la parte superior del card
- Altura constante de 200px con zoom al hacer hover

## Campo Opcional

El campo `image` es **opcional** en todas las secciones. Si no agregas una imagen, el card se mostrará normalmente sin la imagen referencial.

## Ejemplos Completos

### Experiencia / Voluntariado

```javascript
const experience = [       
    {
        name: 'Nombre de la Empresa',
        image: 'experience/nombre-empresa.png',  // ← Imagen referencial
        location: {
            'great-britain': 'City, Country',
            spain: 'Ciudad, País',
            // ... otros idiomas
        },
        date: {
            'great-britain': 'Month Year - Present',
            // ... otros idiomas
        },
        'job-title': {
            'great-britain': 'Job Title',
            // ... otros idiomas
        },
        description: {
            'great-britain': "Job description...",
            // ... otros idiomas
        },
        web: "https://website.com",
        technologies: [
            "html",
            "css",
            "javascript"
        ]
    }
]
```

### Logros (Achievements)

```javascript
const achievements = [
    {
        image: 'achievements/hackathon.jpg',  // ← Imagen referencial
        title: {
            'great-britain': 'Winner at Hackathon',
            spain: 'Ganador en Hackathon',
            // ... otros idiomas
        },
        location: {
            'great-britain': 'City, Country',
            spain: 'Ciudad, País',
            // ... otros idiomas
        },
        date: {
            'great-britain': 'Month Year',
            // ... otros idiomas
        },
        description: {
            'great-britain': "Achievement description...",
            // ... otros idiomas
        },
        icon: 'trophy',
        type: 'award'
    }
]
```

## Solución de Problemas

### La imagen no se muestra
1. Verifica que la ruta sea correcta:
   - Experiencia/Voluntariado: `experience/nombre-archivo.extension`
   - Achievements: `achievements/nombre-archivo.extension`
2. Confirma que el archivo existe en la carpeta correspondiente:
   - `img/experience/` para experiencia y voluntariado
   - `img/achievements/` para logros
3. Revisa que la extensión del archivo coincida (png, jpg, etc.)

### La imagen se ve distorsionada
- **Experiencia/Voluntariado**: Usa imágenes con proporción 1:1 (cuadradas), mínimo 200x200px
- **Achievements**: Usa imágenes con proporción 2:1 (horizontal), mínimo 600x300px

### La imagen es muy pesada
- Comprime la imagen usando herramientas como TinyPNG o Squoosh
- Convierte a formato WebP para mejor compresión
- Mantén el peso por debajo de:
  - 500KB para experiencia/voluntariado
  - 800KB para achievements

### El overlay no se muestra en achievements
- Verifica que los campos `icon` y `type` estén definidos en el objeto del achievement
- Los valores válidos para `icon` son: 'trophy', 'medal', 'microphone', etc.
- Los valores válidos para `type` son: 'award', 'speaker'
