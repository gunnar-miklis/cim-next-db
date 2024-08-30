import type { Metadata } from 'next';
import Link from 'next/link';
import prisma from '@/prisma/db';
import EventTeaser from '@/src/components/Events/Teaser';
import CreateEventForm from '@/src/components/Events/Form';
import styles from '@/src/styles/app.module.css';
import { auth } from '@/src/auth';

export default async function EventPage() {
  const session = await auth();

  const venues = await prisma.venue.findMany();
  const categories = await prisma.category.findMany();
  const futureEvents = await prisma.event.findMany({
    where: {
      dateStart: {
        gte: new Date(Date.now()),
      },
    },
    include: {
      venue: true,
      categories: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { dateStart: 'desc' },
  });
  const pastEvents = await prisma.event.findMany({
    where: {
      dateStart: {
        lt: new Date(Date.now()),
      },
    },
    include: {
      venue: true,
      categories: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { dateStart: 'desc' },
  });

  return (
    <main className={styles.main}>
      <Link href='/' className={styles.card}>
        <h2>
          Home <span>-&gt;</span>
        </h2>
        <p>Go to the home page</p>
      </Link>

      <div className={styles.description}>
        <h1>Create a new event</h1>
        {!session && (
          <Link href='/' style={{ color: 'red', textDecoration: 'underline' }}>
            Login with GitHub to create events
          </Link>
        )}
        <CreateEventForm venues={venues} categories={categories} isLoggedIn={!session} />
      </div>
      <br />

      <div className={styles.description}>
        <h1>Upcoming Events</h1>
      </div>
      {futureEvents.map((event) => (
        <EventTeaser key={event.id} {...event} />
      ))}

      <br />
      <hr />
      <br />

      <div className={styles.description}>
        <h1>Past Events</h1>
      </div>
      {pastEvents.map((event) => (
        <EventTeaser key={event.id} {...event} />
      ))}
    </main>
  );
}

export const metadata: Metadata = { title: 'EventPage' };
