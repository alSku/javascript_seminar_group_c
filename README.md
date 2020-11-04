# javascript_seminar_meeting group

## Setup for Windows code host and Ubuntu bbb server

### 1. Install BigBlueButton v2.3 Dev on dedicated Ubuntu 18.04 amd64 Server (4G RAM needed)
```bash 
$ wget -qO- https://ubuntu.bigbluebutton.org/bbb-install.sh | bash -s -- -v bionic-230-dev -a
```
* installation can take 2+ hours

### 2. Get Credentials
```bash
$ bbb-conf --secret
      URL: http://example.com/bigbluebutton/
      Salt: eXaMpLeSaLt
```

### 3. Clone repository on Windows and install dependencies
```scala
npm i
``` 

### 4. Configure .env file
```ini
BBB_BRIDGE_PORT=3000
BBB_URL=http://example.com/bigbluebutton/
BBB_SECRET=eXaMpLeSaLt
BBB_P_KEY=path_to_key
BBB_P_CERT=path_to_cert
```
or inside backend **#integration**
```ini
...
BBB_FQDN=http://example.com/bigbluebutton/
BBB_SECRET=eXaMpLeSaLt
BBB_P_KEY=path_to_key
BBB_P_CERT=path_to_cert
...
```

### 5. Setup HDDBS (HTTPS)
For development server: 
1. Create self-signed certificate -> cert and key in **pem format**  

For production server:
1. Setup server with public dns 
2. Create certificate with let's encrypt


### 42. Run and enjoy
```scala
npm run start
or
npm run dev
```
or inside backend **#integration**
```scala
npm run dev2
```

