# Docker counter app
Example app for testing how Docker work. Listens on 3000 port.

### Routes
- `/` _- shows current counter value_
- `/stats/` _- shows current counter value and increments it_
- `/about/` _- shows info container's hostname_

## Installation and running
Run following script to start app from repository:
```sh
docker build -t gigafiga21/counter .
docker run -p 3000:3000 gigafiga21/counter
```

