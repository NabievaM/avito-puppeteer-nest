# Avito Puppeteer -> Nest.js -> WebSocket (Demo)

Этот репозиторий демонстрирует, как с помощью сервера на Nest.js и Puppeteer можно отслеживать сообщения в личном кабинете Avito и передавать их на фронтенд в реальном времени через Socket.io.

> Структура DOM на сайте Avito может изменяться, поэтому при необходимости адаптируйте селекторы в `puppeteer.service.ts`.
> Так как у меня нет аккаунта Avito, для теста используются демонстрационные сообщения (`demo mode`).
---

## Локальный запуск

1. Backend:

```bash
cd backend
cp .env.example .env
# Заполните .env: AVITO_EMAIL, AVITO_PASSWORD, AVITO_TARGET_NAME
npm install

# Для разработки
npm run start:dev

# Для продакшн сборки
npm run build
npm start

2. Frontend:

Откройте public/index.html в браузере.

Соединение с WebSocket-сервером должно быть активным, новые сообщения будут отображаться в списке в реальном времени.

Особенности

Nest.js + TypeScript

Puppeteer для эмуляции браузера и получения сообщений

WebSocket (Socket.io) для передачи данных на фронтенд

Модульная структура: MessagesModule, PuppeteerModule, WsModule

Dockerfile и docker-compose подготовлены для запуска контейнеров

Настройка Puppeteer

Используйте .env для конфигурации:

AVITO_EMAIL=your_email
AVITO_PASSWORD=your_password
AVITO_TARGET_NAME=Имя
PUPPETEER_HEADLESS=true
CHECK_INTERVAL_MS=5000


Для отладки можно установить PUPPETEER_HEADLESS=false.