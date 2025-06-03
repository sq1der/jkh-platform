FROM node:alpine as build

COPY package.json .
RUN npm install

COPY . .

ENV DATABASE_URL=postgresql://jkh_db_user:kHVhSWBlEdasUyOlv1rXaodakuM8CbVT@dpg-d07t8pur433s73bk9mq0-a/jkh_db
ENV SECRET_KEY=yx2z#o_6@7n4u9h*aii+e14qug(0kjw*z5x1v6lm&*n=g@0dfl

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /dist /usr/share/nginx/html
COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
