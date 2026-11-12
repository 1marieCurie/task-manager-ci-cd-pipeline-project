
# 1. Start from a Node.js base image
FROM node:22-alpine

# 2. Define the working directory
WORKDIR /app

# 3. Copy package configuration files
COPY package*.json ./

# 4. Install project dependencies
RUN npm ci

# 5. Copy the rest of the application
COPY . .

# 6. Document the port used by Vite
EXPOSE 5173

# 7. Start the Vite development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
