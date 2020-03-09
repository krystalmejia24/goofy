FROM golang:1.13-alpine3.10 AS build


RUN apk add --no-cache ca-certificates curl git openssh build-base

RUN mkdir -p /goofy-rundown
#RUN git clone https://github.com/flavioribeiro/goofy-rundown.git /goofy-rundown
RUN go get -v -u github.com/gorilla/mux
RUN ls src
COPY main.go /goofy-rundown/
RUN cd /goofy-rundown && go build -o goofy-rundown main.go

FROM alpine:latest

RUN apk add --no-cache ca-certificates
RUN mkdir -p /usr/local/bin/

COPY --from=build /goofy-rundown/goofy-rundown /usr/local/bin/goofy-rundown

ENTRYPOINT ["/usr/local/bin/goofy-rundown"]
