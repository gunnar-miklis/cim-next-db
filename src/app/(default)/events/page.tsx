import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '@/src/styles/app.module.css';
import prisma from '@/prisma/db';
import EventTeaser from '@/src/components/Events/Teaser';

export const metadata: Metadata = { title: 'EventPage' };

export default async function EventPage() {
  const futureEvents = await prisma.event.findMany({
    where: {
      dateStart: {
        gte: new Date(Date.now()),
      },
    },
    include: {
      venue: true,
      category: {
        select: {
          title: true,
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
      category: {
        select: {
          title: true,
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
        <h1>Upcoming Events</h1>
      </div>
      {futureEvents.map((event) => (
        <div key={event.id} className={styles.description}>
          <EventTeaser {...event} />
        </div>
      ))}

      <br />
      <hr />
      <br />

      <div className={styles.description}>
        <h1>Past Events</h1>
      </div>
      {pastEvents.map((event) => (
        <div key={event.id} className={styles.description}>
          <EventTeaser {...event} />
        </div>
      ))}
    </main>
  );
}
