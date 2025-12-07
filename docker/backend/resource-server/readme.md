1. Build Product Service Image
   docker build -t rupesh1997/resource-server:1.0.0 -f ../docker/backend/resource-server/Dockerfile .

2. Run Product Service Container
   docker run -d \
   -p 8181:8181 \
   --name resource-server \
   --network=usm-network \
   -e JWK_SET_URI=http://authorization-server:9000/oauth2/jwks \
   rupesh1997/resource-server:1.0.0


3. Docker Network Commands
    - List networks
      docker network ls

    - Create network
      docker network create purely-goods-nw --driver bridge

    - Inspect a network
      docker network inspect <network_id_or_name>
      E.g. docker network inspect purely-goods-nw

   