## DNS Leak Server

- Uses Docker to run safely in a container on port 53

### Usage

    git clone git@github.com:mdp/dns_leak_server.git
    cd dns_leak_server
    sudo docker build -t <your username>/dns_leak_server .
    sudo docker run -p 53:5353/udp -e NS="ns.yourserver.com" -d <your username>/dns_leak_server
