FROM alpine:3.10.1 AS base_image

FROM base_image AS build

RUN apk add --no-cache curl build-base openssl openssl-dev zlib-dev linux-headers pcre-dev luajit luajit-dev ffmpeg ffmpeg-dev

RUN mkdir nginx nginx-vod-module nginx-lua-module ngx_devel_kit

ENV NGINX_VERSION 1.17.9
ENV DEV_MODULE_VERSION v0.3.1
ENV LUA_MODULE_VERSION v0.10.15

RUN curl -sL https://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz | tar -C nginx --strip 1 -xz
RUN curl -sL https://github.com/kaltura/nginx-vod-module/tarball/master | tar -C /nginx-vod-module --strip 1 -xz
RUN curl -sL https://github.com/simpl/ngx_devel_kit/archive/${DEV_MODULE_VERSION}.tar.gz | tar -C ngx_devel_kit --strip 1 -xz
RUN curl -sL https://github.com/openresty/lua-nginx-module/archive/${LUA_MODULE_VERSION}.tar.gz | tar -C nginx-lua-module --strip 1 -xz

ENV LUAJIT_INC /usr/include/luajit-2.1/
ENV LUAJIT_LIB /usr/lib

WORKDIR /nginx
RUN ./configure --prefix=/usr/local/nginx \
	--add-module=../nginx-vod-module \
	--add-module=../ngx_devel_kit \
	--add-module=../nginx-lua-module \
	--with-file-aio \
	--with-threads \
	--with-cc-opt="-O3" \
  --with-debug
RUN make
RUN make install

FROM base_image
RUN apk add --no-cache ca-certificates openssl pcre zlib luajit ffmpeg

COPY --from=build /usr/local/nginx /usr/local/nginx
RUN rm -rf /usr/local/nginx/html /usr/loca/nginx/conf/*.default

COPY nginx.conf /usr/local/nginx/conf/nginx.conf

ENTRYPOINT ["/usr/local/nginx/sbin/nginx"]
CMD ["-g", "daemon off;"]
