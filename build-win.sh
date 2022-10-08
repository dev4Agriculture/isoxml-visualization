docker stop isoxml-visualisation
docker rm isoxml-visualization --force
DOCKER_BUILDKIT=1 docker build --no-cache -t isoxml-visualization .
docker run -p 8080:3000 --name isoxml-visualization -d isoxml-visualization & 

