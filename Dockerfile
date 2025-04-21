# Используем официальный образ Node.js
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем Angular CLI глобально
RUN npm install -g @angular/cli

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем все файлы проекта
COPY . .

# Строим Angular приложение
RUN npm run build --prod

# Устанавливаем сервер для обслуживания статики
RUN npm install -g http-server

# Открываем порт для сервера
EXPOSE 4200

# Запускаем сервер
CMD ["http-server", "dist/angular-authentication", "-p", "4200"]
