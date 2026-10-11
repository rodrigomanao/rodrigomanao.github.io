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
	docker run --rm --name $(CONTAINER_NAME) -p $(PORT):3000 -v "$(PWD):/app" -v /app/node_modules $(IMAGE_NAME)

# Production mode
prod: docker-cleanup-prod docker-build-prod docker-run-prod

# Build development image
docker-build:
	docker build --pull -t $(IMAGE_NAME) .

# Build production image
docker-build-prod:
	docker build --pull -f Dockerfile.prod -t $(IMAGE_NAME_PROD) .

# Run development container
docker-run:
	docker run --rm --name $(CONTAINER_NAME) -p $(PORT):3000 $(IMAGE_NAME)

# Run production container
docker-run-prod:
	docker run --rm --name $(CONTAINER_NAME_PROD) -p $(PORT):3000 $(IMAGE_NAME_PROD)

# Cleanup development
docker-cleanup:
	-docker rm -f -v $(CONTAINER_NAME)
	-docker image rm -f $(IMAGE_NAME)

# Cleanup production
docker-cleanup-prod:
	-docker rm -f -v $(CONTAINER_NAME_PROD)
	-docker image rm -f $(IMAGE_NAME_PROD)

# Cleanup both
clean-all: docker-cleanup docker-cleanup-prod
