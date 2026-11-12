
# 1. Use Node.js as the base environment
FROM node:22-alpine

# 2. Set the working directory
WORKDIR /app

# 3. Copy dependency manifests
COPY package*.json ./

# 4. Install backend dependencies
RUN npm install

# 5. Copy backend source code
COPY . .

# 6. Document the backend port
EXPOSE 5000

# 7. Start the Express server
CMD ["npm", "start"]
