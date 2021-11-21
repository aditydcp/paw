FROM node:16.13-slim
ENV NODE_ENV=production

WORKDIR /usr/bin/paw-server

# Copy dependency files.
COPY ["./backend/package.json", "./backend/package-lock.json*", "./backend/"]
COPY ["./frontend/package.json", "./frontend/package-lock.json*", "./frontend/"]

# Install dependencies.
WORKDIR /usr/bin/paw-server/backend
RUN npm install

WORKDIR /usr/bin/paw-server/frontend
RUN npm install

# Prepare the front end.
WORKDIR /usr/bin/paw-server/frontend

COPY ./frontend .

RUN npm run build

# Prepare the back end and run the server.
WORKDIR /usr/bin/paw-server/backend

COPY ./backend .

RUN mv ../frontend/build/* ./public

CMD ["node", "app.js"]