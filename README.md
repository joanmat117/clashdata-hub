## 🎯 **OBJETIVO PRINCIPAL**
Crear una API en Node.js/Express que funcione como intermediario entre tu aplicación y la API oficial de Clash Royale. Tu servidor obtendrá datos en tiempo real del juego, los combinará con información almacenada en tu base de datos, y servirá todo a través de una aplicación estructurada con arquitectura MVC.

## 📁 **ESTRUCTURA DEL PROYECTO**
Organiza tu aplicación siguiendo el patrón MVC para separar responsabilidades claramente:
```
src/
├── controllers/       # Controladores de rutas (PlayerController, ClanController)
├── models/           # Modelos de base de datos (Favorite, UserCache)
├── routes/           # Definición de rutas de Express
├── services/         # Lógica de negocio & llamadas API externas (ClashRoyaleService)
├── middlewares/      # Middlewares personalizados (auth, errores, caché)
└── utils/            # Funciones auxiliares (validadores, formateadores)
```

## ⚙️ **TAREAS DE IMPLEMENTACIÓN**

### **1. CONFIGURACIÓN INICIAL**
- Inicializa Express e instala: `express`, `cors`, `@varandas/clash-royale-api`, y tu driver SQL
- Configura el middleware `cors` para desarrollo (permite `http://localhost:3000`)
- Configura el cliente `ClashRoyaleAPI` en un servicio, usando tu token oficial

### **2. BASE DE DATOS SQL (CREA ESTAS TABLAS)**
```sql
-- Tabla de favoritos de usuarios
CREATE TABLE favorites (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(100) NOT NULL,
    player_tag VARCHAR(20),
    clan_tag VARCHAR(20),
    type ENUM('player', 'clan') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para caché de API (optimiza peticiones)
CREATE TABLE api_cache (
    id INT PRIMARY KEY AUTO_INCREMENT,
    endpoint VARCHAR(100) NOT NULL,
    parameters TEXT,
    data JSON NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **3. CAPA DE SERVICIO (ClashRoyaleService)**
- Crea una clase que use el cliente `ClashRoyaleAPI`
- Implementa métodos como `getPlayerData(tag)`, `getClanData(tag)`, `getClanWarLog(tag)`
- **Implementa caché**: Consulta la tabla `api_cache` antes de llamar a la API externa

### **4. RUTAS Y CONTROLADORES (MVC)**
**Endpoints principales a construir:**

- `GET /api/jugadores/:tag`
  - **Controlador**: `PlayerController.getPlayer`
  - **Lógica**: Obtiene datos del servicio, combina con favoritos de tu BD

- `POST /api/favoritos`
  - **Controlador**: `FavoriteController.add`
  - **Lógica**: Valida y almacena player/clan tag en tu BD

- `GET /api/clanes/buscar?nombre=...&minScore=...`
  - **Controlador**: `ClanController.search`
  - **Lógica**: Pasa parámetros de query al servicio `getClans(params)`

### **5. MIDDLEWARES PERSONALIZADOS**
- **Autenticación**: Middleware simple que verifica un header `user-id`
- **Manejo de errores**: Centraliza errores de API y base de datos
- **Validación**: Usa `express-validator` para validar formato de tags (#9UG8Q2L)
- **Rate limiting**: Limita peticiones por usuario (ej: 100/hora)

### **6. FORMATO DE RESPUESTAS**
- Estandariza respuestas: `{ success, data, message }`
- Transforma datos complejos de Clash Royale a estructura más simple si es necesario

## 🔧 **REQUISITOS TÉCNICOS OBLIGATORIOS**
Tu implementación debe:

1. **Usar el wrapper** `@varandas/clash-royale-api` para todos los datos externos
2. **Configurar CORS** correctamente para tu frontend
3. **Seguir arquitectura MVC**: Rutas → Controladores → Servicios → Modelos
4. **Interactuar con SQL** usando queries directos o un ORM
5. **Crear al menos 2 middlewares** personalizados (ej: `validateTag`, `cacheMiddleware`)

## 🚀 **ENDPOINTS SUGERIDOS PARA IMPLEMENTAR**
- `GET /api/jugadores/:tag/batallas` - Historial de batallas
- `GET /api/clanes/:tag/miembros` - Lista de miembros del clan
- `GET /api/favoritos` - Lista favoritos del usuario actual
- `DELETE /api/favoritos/:id` - Eliminar favorito
- `GET /api/cartas` - Todas las cartas disponibles (con filtros)

## 💡 **PASOS PARA COMENZAR**
1. Crea carpeta del proyecto e inicia `npm`
2. Instala dependencias: `express`, `cors`, `@varandas/clash-royale-api`, `dotenv`, `express-validator`, y tu cliente SQL
3. **Obtén tu Token API** en [developer.clashroyale.com](https://developer.clashroyale.com)
4. Configura tu base de datos SQL y crea las tablas
5. Comienza construyendo el `ClashRoyaleService` para verificar conexión con la API externa

## 📋 **TAREAS ESPECÍFICAS PARA PRACTICAR**
1. **Completa el modelo** `Favorite` con métodos CRUD
2. **Implementa el controlador** `ClanController` con búsqueda y filtros
3. **Crea middleware de validación** para player tags (formato correcto)
4. **Agrega caché en base de datos** para reducir llamadas a API externa
5. **Maneja errores específicos**: Jugador no encontrado, Clan inexistente, etc.

## 🔍 **PRUEBAS CON THUNDER CLIENT/POSTMAN**
```http
### Obtener datos de un jugador
GET http://localhost:3000/api/jugadores/#9UG8Q2L

### Buscar clanes por nombre
GET http://localhost:3000/api/clanes/buscar?nombre=legendarios&minScore=50000

### Agregar a favoritos
POST http://localhost:3000/api/favoritos
Content-Type: application/json
user-id: usuario123

{
    "type": "player",
    "player_tag": "#9UG8Q2L"
}
```
