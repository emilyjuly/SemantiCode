FROM mcr.microsoft.com/playwright:v1.42.0-focal

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
