# javascript_seminar_meeting group
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

### 3. Install dependencies
```scala
PS npm i
``` 

### 4. Configure .env file
```ini
BBB_BRIDGE_PORT=3000
BBB_URL=http://example.com/bigbluebutton/
BBB_SECRET=eXaMpLeSaLt
BBB_P_KEY=path_to_key
BBB_P_CERT=path_to_cert
```

### 5. Setup key cert
Get some help from stackoverflow  
cert and key in **pem format**  
gg ez

### 6. Learn TLS
HTTPS is mandatory, no voice or webcam support otherwise...
  
**...**

### 42. Run and enjoy
```scala
PS npm run start
```
