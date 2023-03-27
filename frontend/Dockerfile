FROM node:18

WORKDIR /app

# COPY package.json and package-lock.json files
COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
