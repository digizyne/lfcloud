set shell := ["/usr/bin/env", "bash", "-c"]

default: up

up:
    docker compose up

down:
    docker compose down --rmi local --remove-orphans

build:
    npm run build

build-docker:
    docker build -t lfcloud:dev -f Dockerfile .

run-docker:
    docker run -it --rm --name lfcloud -p 3000:3000 lfcloud:dev

add PACKAGE *FLAGS:
    npm install {{FLAGS}} {{PACKAGE}}
