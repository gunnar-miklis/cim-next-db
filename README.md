# Prisma

## yarn (pnp) + prisma

- there seem to be issues with PnP
- as a workaround:
  - `generator client { output = "./client" }`
  - `yarn pnpify prisma generate`
  - `import { PrismaClient } from "../prisma/client";`

### dependencies

```bash
yarn add prisma @prisma/client @vercel/postgres vercel@latest
yarn add -D @yarnpkg/pnpify
```

### init prisma

```bash
yarn prisma init --datasource-provider PostgreSQL
```

### create .env

```bash
touch .env
```

add

```typescript
generator client {
    provider = "prisma-client-js"
    output   = "./client" // import { PrismaClient } from "../prisma/client";
}

datasource db {
    provider  = "postgresql"
    url       = env("POSTGRES_PRISMA_URL") // uses connection pooling
    directUrl = env("POSTGRES_URL_NON_POOLING") // uses a direct connection
}

model ... {
  ....
}
```

### migrate and generate

```bash
yarn prisma migrate dev --name init --skip-generate
yarn pnpify prisma generate
```

### import in .ts

```typescript
import { PrismaClient } from './client';

const prisma = new PrismaClient();
export default prisma;
```

## resources

- [prisma.io/docs](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql)

- [vercel.com/docs](https://vercel.com/docs/storage/vercel-postgres/using-an-orm#prisma)

- [git issue](https://github.com/prisma/prisma/issues/1439#issuecomment-1023884266)
