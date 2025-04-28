FROM --platform=linux/amd64 node:20-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM --platform=linux/amd64 nginx:alpine
COPY --from=builder /app/dist/angular-authentication /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf