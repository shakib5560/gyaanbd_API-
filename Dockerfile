FROM node:20-alpine

WORKDIR /app

# enable pnpm
RUN corepack enable

# copy lock + package
COPY package.json pnpm-lock.yaml ./

# install dependencies
RUN pnpm install

# copy project
COPY . .

# generate prisma client
RUN pnpm prisma generate

# build nest app
RUN pnpm build

EXPOSE 3001

CMD ["node", "dist/main.js"]