FROM node:16.15.0

COPY . .

RUN yarn install
RUN yarn build

EXPOSE 3000

#CMD ["npx prisma generate","&", "npm run start"]
CMD npx prisma generate & yarn start