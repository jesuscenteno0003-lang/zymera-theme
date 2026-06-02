# Guía de Migración: Zymera a Shopify

## 📋 Archivos Creados

```
Zymera/shopify/
├── assets/
│   ├── zym.css                 ← CSS completo de la tienda
│   └── zym.js                  ← JavaScript (carrito, nav, etc.)
├── config/
│   ├── settings_schema.json    ← Configuración de colores/fonts
│   └── settings_data.json      ← Valores por defecto
├── sections/
│   ├── header.liquid           ← Navegación principal
│   ├── hero-banner.liquid      ← Sección hero principal
│   ├── featured-categories.liquid ← Categorías destacadas
│   ├── featured-products.liquid ← Productos destacados
│   ├── benefits.liquid         ← Beneficios de la tienda
│   ├── testimonials.liquid     ← Testimonios
│   ├── newsletter.liquid       ← Formulario newsletter
│   └── footer.liquid           ← Pie de página
├── snippets/
│   └── product-card.liquid     ← Tarjeta de producto reutilizable
├── templates/
│   ├── index.json              ← Homepage
│   ├── page.about.json         ← Página Nosotros
│   └── page.contact.json       ← Página Contacto
└── guia-instrucciones.md       ← Este archivo
```

---

## 🚀 Pasos para Subir a Shopify

### **Paso 1: Preparar el Tema**

1. Ve a **Online Store > Themes** en tu admin de Shopify
2. Busca el tema **Dawn** (gratuito) o haz clic en "Explore free themes"
3. Instala Dawn
4. Haz clic en **"Actions" > "Duplicate"** para crear una copia de seguridad
5. En la copia, haz clic en **"Actions" > "Edit code"**

---

### **Paso 2: Subir Archivos CSS y JS**

#### Subir CSS:
1. En el editor de código, ve a **Assets**
2. Haz clic en **"Add a new asset"**
3. Selecciona **"Upload a file"**
4. Sube `zym.css` desde la carpeta `Zymera/shopify/assets/`

#### Subir JS:
1. Repite el proceso para `zym.js`

---

### **Paso 3: Editar theme.liquid**

1. En **Layout**, abre `theme.liquid`
2. Agrega ANTES de `</head>`:
```liquid
{{ 'zym.css' | asset_url | stylesheet_tag }}
```
3. Agrega ANTES de `</body>`:
```liquid
{{ 'zym.js' | asset_url | script_tag }}
```

---

### **Paso 4: Crear Secciones**

Para cada archivo en `sections/`:

1. Ve a **Sections** en el editor
2. Haz clic en **"Add a new section"**
3. Nombre: nombre del archivo (sin .liquid)
4. Copia y pega el contenido del archivo correspondiente
5. Guarda

Repite para:
- `header` → `header.liquid`
- `hero-banner` → `hero-banner.liquid`
- `featured-categories` → `featured-categories.liquid`
- `featured-products` → `featured-products.liquid`
- `benefits` → `benefits.liquid`
- `testimonials` → `testimonials.liquid`
- `newsletter` → `newsletter.liquid`
- `footer` → `footer.liquid`

---

### **Paso 5: Crear Snippets**

1. Ve a **Snippets**
2. Haz clic en **"Add a new snippet"**
3. Nombre: `product-card`
4. Copia el contenido de `snippets/product-card.liquid`
5. Guarda

---

### **Paso 6: Configurar Templates**

#### Homepage:
1. Ve a **Templates**
2. Abre o crea `index.json`
3. Reemplaza con el contenido de `templates/index.json`

#### Página About:
1. Ve a **Pages** > Crea página "Nosotros"
2. Template: `page.about`

#### Página Contact:
1. Crea página "Contacto"
2. Template: `page.contact`

---

### **Paso 7: Configurar Colores y Fonts**

1. Ve a **Online Store > Themes > Customize**
2. **Theme settings**:
   - **Primary**: #4A7C59 (Verde)
   - **Secondary**: #D4AF37 (Dorado)
   - **Accent**: #C67D51 (Terracota)
   - **Heading Font**: Montserrat
   - **Body Font**: Poppins

---

### **Paso 8: Crear Menús**

#### Main Menu:
- Inicio → /
- Tienda → /collections/all
- Nosotros → /pages/about
- Blog → /blog
- Contacto → /pages/contact

#### Footer - Shop:
- Aromaterapia → /collections/aromatherapy
- Skincare → /collections/skincare
- Yoga & Meditación → /collections/yoga
- Sueño & Descanso → /collections/sleep

#### Footer - Company:
- Sobre Nosotros → /pages/about
- Blog → /blog
- Contacto → /pages/contact

#### Footer - Support:
- Política de Envío → /pages/shipping-policy
- Política de Devolución → /pages/refund-policy
- Términos → /pages/terms-of-service
- Privacidad → /pages/privacy-policy

---

### **Paso 9: Crear Colecciones**

| Nombre | Tags |
|--------|------|
| Aromaterapia | aromatherapy |
| Skincare | skincare |
| Yoga & Meditación | yoga |
| Sueño & Descanso | sleep |
| Bienestar | supplements |
| Todos los Productos | (automática) |

---

### **Paso 10: Cargar Productos**

| Producto | Precio | Colección | Tags |
|----------|--------|-----------|------|
| Aceite Esencial de Lavanda | $15.99 | Aromaterapia | aromatherapy, bestseller |
| Sérum Vitamina C | $24.99 | Skincare | skincare, new |
| Cojín de Meditación | $29.99 | Yoga | yoga |
| Mascarilla de Seda | $19.99 | Sueño | sleep |
| Aceite Eucalipto | $14.99 | Aromaterapia | aromatherapy |
| Pack Mascarillas (5) | $19.99 | Skincare | skincare |
| Bloques de Yoga (2) | $22.99 | Yoga | yoga |
| Manta Ponderada | $59.99 | Sueño | sleep, premium |
| Vitamina D3 + K2 | $22.99 | Bienestar | supplements |
| Colágeno | $27.99 | Bienestar | supplements |
| Magnesio | $23.99 | Bienestar | supplements |
| Cuenco Tibetana | $44.99 | Yoga | yoga, artisan |

---

### **Paso 11: Página de Inicio**

En **Customize** > Template > Home page, agrega:
1. Hero Banner
2. Featured Categories
3. Featured Products (colección: Todos los Productos)
4. Benefits
5. Testimonials
6. Newsletter

---

### **Paso 12: Configuración Final**

- **Pagos**: Settings > Payments > Shopify Payments
- **Envíos**: Settings > Shipping > Envío gratis > $50, Flat $5.99
- **Dominio**: Settings > Domains

---

## ✅ Checklist

- [ ] Tema Dawn instalado
- [ ] zym.css subido
- [ ] zym.js subido
- [ ] theme.liquid actualizado
- [ ] 8 secciones creadas
- [ ] Snippet product-card creado
- [ ] Templates configurados
- [ ] Colores y fonts configurados
- [ ] Menús creados
- [ ] 6 colecciones creadas
- [ ] 12 productos cargados
- [ ] Página de inicio configurada
- [ ] Pagos activados
- [ ] Envíos configurados
- [ ] Dominio conectado

---

## 🎨 Colores Zymera

| Color | Hex | Uso |
|-------|-----|-----|
| Verde | #4A7C59 | Principal |
| Verde Oscuro | #2D5A3D | Hover |
| Dorado | #D4AF37 | Badges |
| Terracota | #C67D51 | Acentos |

---

## 📝 Notas

1. Sube imágenes reales de productos
2. SSL incluido automáticamente
3. Siempre duplica antes de editar
4. Prueba en preview antes de publicar

## 🆕 Próximos Pasos

1. Actualizar logo con "Zymera"
2. Crear redes @zymera
3. Blog posts
4. Email marketing
5. Reviews app
6. SEO
7. Google Analytics
8. Facebook Pixel
