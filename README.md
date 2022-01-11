# valora
This is a web page (tested on web browser) that shows you how to connect to your valora mobile app.\
It shows your account address, CELO and cUSD balances\
Project is tested with node v17.3.0

## Prerequisites
Make sure you have nvm installed. This helps you switch between node versions very easy, depending on project needs
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```
Install and use node v17.3.0
```
nvm install v17.3.0
nvm use 17.3.0
```
Clone the project
```
git clone https://github.com/mirceac/valora.git
```
The file package.json contains all libraries needed and all dependencies, so just run the following
```
cd valora
npm install
```
Depending on the operating system where you need to start the application, you may need to run (from valora directory):
```
export NODE_OPTIONS=--openssl-legacy-provider
```
Start the application
```
expo start
```
