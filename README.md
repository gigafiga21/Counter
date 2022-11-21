# Docker counter app
Example app for testing how Docker work. Listens on 3000 port.

### Routes
- `/` _- shows current counter value_
- `/stats/` _- shows current counter value and increments it_
- `/about/` _- shows info container's hostname_

## Installation and running
1. Copy `.env-template` file to `.env` and fill variables according to comments
2. Run `docker-compose up --build`

