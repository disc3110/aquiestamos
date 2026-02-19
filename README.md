# AquiEstamos – Plataforma para la comunidad latina

## Estructura del proyecto

- `services/`
  - `auth-service/`: autenticación, usuarios, roles y áreas metropolitanas
  - `community-service/`: posts, comentarios, reacciones, follows
  - `business-service/`: negocios, reseñas, empleos y eventos
  - `api-gateway/`: punto de entrada único para web y mobile

- `apps/`
  - `web/`: front web (Next.js + Tailwind)
  - `mobile/`: app mobile (React Native + Expo)

- `infra/`
  - `docker-compose.yml` y configs de infraestructura