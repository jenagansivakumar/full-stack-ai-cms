FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
RUN npm install ajv@^6 ajv-keywords@^3 --legacy-peer-deps
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
