IMAGE_NAME=my-portfolio
CONTAINER_NAME=my-portfolio-container
PORT=3000

.PHONY: all docker-build docker-run docker-cleanup

all: docker-cleanup docker-build docker-run

docker-build:
	docker build -t $(IMAGE_NAME) .

docker-run:
	docker run --name $(CONTAINER_NAME) -p $(PORT):3000 $(IMAGE_NAME)

docker-cleanup:
	docker rm -f $(CONTAINER_NAME) || true
	docker rmi -f $(IMAGE_NAME) || true
