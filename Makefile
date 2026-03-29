IMAGE_NAME=my-portfolio
IMAGE_NAME_PROD=my-portfolio-prod
CONTAINER_NAME=my-portfolio-container
CONTAINER_NAME_PROD=my-portfolio-container-prod
PORT=3000

.PHONY: all dev prod docker-build docker-build-prod docker-run docker-run-prod docker-cleanup docker-cleanup-prod

# Default: Development with hot-reload
all: docker-cleanup docker-build docker-run

# Development mode with volume mounting for hot-reload
dev: docker-cleanup docker-build
	docker run --name $(CONTAINER_NAME) -p $(PORT):3000 -v $(PWD):/app -v /app/node_modules $(IMAGE_NAME)

# Production mode
prod: docker-cleanup-prod docker-build-prod docker-run-prod

# Build development image
docker-build:
	docker build -t $(IMAGE_NAME) .

# Build production image
docker-build-prod:
	docker build -f Dockerfile.prod -t $(IMAGE_NAME_PROD) .

# Run development container
docker-run:
	docker run --name $(CONTAINER_NAME) -p $(PORT):3000 $(IMAGE_NAME)

# Run production container
docker-run-prod:
	docker run --name $(CONTAINER_NAME_PROD) -p $(PORT):3000 $(IMAGE_NAME_PROD)

# Cleanup development
docker-cleanup:
	docker rm -f $(CONTAINER_NAME) || true
	docker rmi -f $(IMAGE_NAME) || true

# Cleanup production
docker-cleanup-prod:
	docker rm -f $(CONTAINER_NAME_PROD) || true
	docker rmi -f $(IMAGE_NAME_PROD) || true

# Cleanup both
clean-all: docker-cleanup docker-cleanup-prod
