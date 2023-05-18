
# FROM ubuntu:20.04 AS builder-image
FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat
RUN apk add --update bash && rm -rf /var/cache/apk/*
WORKDIR /chaindeck-frontend
COPY package.json  ./
RUN npm install 

FROM node:16-alpine AS builder
# RUN apt-get update -yq \
#     && apt-get install curl gnupg -yq \
#     && curl -sL https://deb.nodesource.com/setup_19.x | bash \
#     && apt-get install nodejs -yq

WORKDIR /chaindeck-frontend
COPY --from=deps /chaindeck-frontend/node_modules ./node_modules

COPY . ./ 

RUN npm run build
COPY ./script.sh /
RUN chmod +x /script.sh
# ENTRYPOINT ["/script.sh"]
# RUN npm run start

RUN apk add --update bash 
RUN apk add --update nodejs npm
RUN which bash
# ENTRYPOINT ["/bin/bash"]
RUN /bin/bash
CMD "npm" "run" "start"










# FROM ubuntu:20.04 AS builder-image
# RUN apt-get update && \
#     apt-get upgrade -y && \
#     apt-get install -y net-tools git curl  build-essential --assume-yes 
# #     apt install -y net-tools git build-essential --assume-yes
# # RUN apt install -y git --assume-y
# # RUN apt install -y net-tools --assume-y
# # RUN apt install -y build-essential --assume-y
# RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
# RUN apt install nodejs -y
# RUN git clone https://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@github.com/chaindeck/chaindeck-frontend.git
# WORKDIR chaindeck-frontend
# RUN npm install
# RUN npm run build
# RUN npm run start