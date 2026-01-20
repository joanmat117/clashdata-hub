# ClashData Hub 👑 ⚔️

**ClashData Hub** es una API Proxy de alto rendimiento construida con **Node.js**, **Express** y **TypeScript**. Actúa como un intermediario optimizado para la API oficial de Clash Royale, utilizando una arquitectura **MVC** para servir datos de juego en tiempo real de forma estructurada y eficiente.

<div align="center">
  <br />
  <a href="https://clashdata-hub.onrender.com/">
    <img src="https://img.shields.io/badge/Live_Frontend-Click_Here-blue?style=for-the-badge&logo=render&logoColor=white" alt="Live Demo">
  </a>
</div>

## 🚀 Características

* **Arquitectura MVC & TypeScript:** Código robusto, escalable y tipado, separando claramente la lógica de negocio de las rutas y controladores.
* **Acceso a Propiedades Dinámicas:** Endpoint especializado para consultar propiedades específicas de un jugador (`/:tag/:property`) de forma dinámica.
* **Integración en Tiempo Real:** Comunicación directa con los servidores oficiales de Clash Royale para obtener datos actualizados.
* **Endpoints Especializados:** Rutas dedicadas para el historial de guerras de clanes, batallas recientes y gestión detallada de miembros.

## 📁 Estructura del Proyecto

```text
src/
├── controllers/    # Manejo de la lógica de respuesta (Player, Clans, Cards)
├── routes/         # Definición de rutas segmentadas por recursos
├── services/       # Integración con la API oficial de Clash Royale
├── middlewares/    # Gestión de errores y validaciones
└── utils/          # Helpers y funciones auxiliares
