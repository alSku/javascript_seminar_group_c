# javascript_seminar_meeting group
### Install BigBlueButton v2.3 Dev on dedicated Ubuntu 18.04 amd64 Server (4G RAM needed)
```bash 
$ wget -qO- https://ubuntu.bigbluebutton.org/bbb-install.sh | bash -s -- -v bionic-230-dev -a
```
* installation can take 2+ hours

### Get Credentials
```bash
$ bbb-conf --secret
      URL: http://example.com/bigbluebutton/
      Salt: eXaMpLeSaLt
```

### Install dependencies
```scala
PS npm i
``` 

### Configure .env file
```ini
BBB_BRIDGE_PORT=3000
BBB_URL=http://example.com/bigbluebutton/
BBB_SECRET=eXaMpLeSaLt
```

### Run and enjoy
```scala
PS npm run start
```
