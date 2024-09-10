# Next + Database + Authentication

Educational project to learn how to integrate a database and authentication in Next.

## 🚀 Features

### Database

- Create a `Prisma ORM` schema and connect to the `Vercel PostgreSQL` Database.
- Add various SQL relation: one-to-one, one-to-many, many-to-many.
- Query the database via `Prisma ORM` and "populate" relations during querying.
- Integrate a simple pagination mechanism to read the database.

### Next

- Create client and server components.
- Handle form submit in Next.js via: `useFormState()` + `useFormStatus()` to control the "pending-status" and "response-messages" on the client-side.
- Use Next.js `Server Actions` to read and write data from the database via `Prisma ORM` on the server-side.
- Validate form data against a Zod schema.

### Authentication

- Authenticate a user via GitHub OAuth procedure.
- Lock certain features based on the session/login status.

## 🛠️ Technologies and Frameworks

- TypeScript
- Next.js
- Next-Auth (**OAuth** with Auth.js)
- Vercel PostgreSQL Database
- Prisma ORM

## 🖥️ Usage

1. Start the development server: `yarn dev` or `npm run dev`.
2. Open your browser and visit `http://localhost:3000`.
3. Explore the features.

&nbsp;

---

&nbsp;

# 🚧 Yarn (PnP) + Prisma Client

There seem to be issues with `yarn PnP` and the `prisma client`. Here is my workaround:

1. Generate the client manually in a specif direction: `generator client { output = "./client" }`
2. Use yarn pnpfify to generate the prisma client: `yarn pnpify prisma generate`
3. Use the this client in the project instead of the one installed via package.json: `import { PrismaClient } from "../prisma/client";`

## Install Dependencies

```bash
yarn add @prisma/client
yarn add -D prisma @yarnpkg/pnpify
```

## Setup

### 1. init prisma

```bash
yarn prisma init --datasource-provider PostgreSQL
```

### 2. add an .env file and add credentials if not already done

credentials can be optained from: `vercel.com > login > user dashboard > Storage > your database > ".env.local" tab > Copy Snippet`.

```bash
touch .env
```

```javascript
POSTGRES_PRISMA_URL="postgres://default:xxxxxxxxx.aws.neon.tech:5432/verceldb?xxxxxx"
POSTGRES_URL_NON_POOLING="postgres://default:xxxxxxxxx.aws.neon.tech:5432/verceldb?xxxxxx"
```

### 3. in the prisma/schema.prisma file

add this line: `output = "./client"` in the `generator client {}` object.

```typescript
generator client {
    provider = "prisma-client-js"
    output   = "./client" // <== this line, here
}

datasource db {
    provider  = "postgresql"
    url       = env("POSTGRES_PRISMA_URL")
    directUrl = env("POSTGRES_URL_NON_POOLING")
}

model ... {
  ....
}
```

### 4. migrate the schema and generate the prisma client

```bash
yarn prisma migrate dev --name init --skip-generate
yarn pnpify prisma generate
```

## Usage

### import the manual generated prisma client in your project

```typescript
// root/prisma/db.ts

import { PrismaClient } from './client';

const prisma = new PrismaClient();
export default prisma;
```

## Resources about this issue

- [offical prisma.io/docs](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql)

- [offical vercel.com/docs](https://vercel.com/docs/storage/vercel-postgres/using-an-orm#prisma)

- [GitHub issue regarding PnP problems](https://github.com/prisma/prisma/issues/1439#issuecomment-1023884266)
