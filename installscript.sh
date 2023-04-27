#!/bin/sh
cd /usr/bin

echo "Installing Node.js"

curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
bash nodesource_setup.sh
apt install nodejs
echo "Done! Node.js version installed:"
nodejs -v

echo "Building node"
apt install build-essential
echo "Done!"

#echo "Installing pm2 to run app as service"
#npm install pm2@latest -g
#echo "Done!"

echo "Cloning git"
git clone -b rhoades26-patch-1 https://github.com/upcs/cs341-spring-2023-cisgo.git

echo "Installing MariaDB"
apt install mariadb-server
mysql_secure_installation

echo "Starting MariaDB as service"
systemctl start mariadb.service

echo "Setting up MariaDB"
mysql -u root -p admin -h localhost -e "
CREATE DATABASE interactivemap;
USE interactivemap;
CREATE USER 'cisgouser'@'localhost' IDENTIFIED BY 'cisgo';
GRANT ALL PRIVILEGES ON interactivemap.* TO 'cisgouser'@'localhost';"
echo"Done!"

echo "Setting up Node as service"
service_definition="[Unit]
Description=Node.js Application
After=syslog.target network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root
Environment=NODE_ENV=production
ExecStart=/usr/bin/cs341-spring-2023-cisgo/CISGO/node app.js

Restart=always

[Install]
WantedBy=multi-user.target
"

echo "$service_definition" | sudo tee /lib/systemd/system/nodeserv.service > /dev/null

echo "Starting services"
systemctl daemon-reload
systemctl start nodeserv
systemctl enable mariadb
systemctl enable nodeserv
echo "Done!"

echo "---------Status---------"
systemctl status mariadb
systemctl status nodeserv
echo "------------------------"