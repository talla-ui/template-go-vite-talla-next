# Stage 1: Build Node.js package with Vite
FROM node:20-alpine AS node-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Build Go application
FROM golang:1.23-alpine AS go-builder
WORKDIR /app
#COPY go.mod go.sum ./
COPY go.mod ./
RUN go mod download
COPY server ./server
RUN CGO_ENABLED=0 GOOS=linux go build -o main ./server/main.go

# Stage 3: Combine and run
FROM alpine:3.18
WORKDIR /app
COPY --from=node-builder /app/dist ./dist
COPY --from=go-builder /app/main .
EXPOSE 8080
CMD ["./main"]
