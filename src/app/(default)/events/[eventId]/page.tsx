import prisma from '@/prisma/db';
import type { Event } from '@/prisma/generated/client';
import styles from '@/src/styles/app.module.css';
import type { Metadata } from 'next';
import Link from 'next/link';

type Props = Event & { params: { eventId: string } };
export default async function EventPage({ params: { eventId } }: Props) {
  const {
    name,
    description,
    dateStart,
    dateEnd,
    venueId,
    category: categories,
  } = await getEventData(parseEventId(eventId));

  const venue = await getNextEventsInVenue(venueId, parseEventId(eventId));

  return (
    <article className={styles.main}>
      <Link href='/events' className={styles.card}>
        <h2>
          Events <span>-&gt;</span>
        </h2>
        <p>Go back to events page</p>
      </Link>

      <div className={styles.description}>
        <h1>
          {name} @{venue.name}
        </h1>
        {description && <p>{description}</p>}
      </div>

      <div className={styles.description}>
        <dl className={styles.dList}>
          {dateEnd ? (
            <>
              <dt>Start Date</dt>
              <dd>
                <time dateTime={dateStart.toISOString()}>{dateStart.toLocaleDateString('de')}</time>
              </dd>

              <dt>End Date</dt>
              <dd>
                <time dateTime={dateEnd.toISOString()}>{dateEnd.toLocaleDateString('de')}</time>
              </dd>
            </>
          ) : (
            <>
              <dt>Date</dt>
              <dd>
                <time dateTime={dateStart.toISOString()}>{dateStart.toLocaleDateString('de')}</time>
              </dd>
            </>
          )}

          {categories.length > 0 && (
            <>
              <dt>Categories</dt>
              <dd>{categories.map((category) => category.title).join(', ')}</dd>
            </>
          )}
        </dl>
      </div>

      <br />

      <section className={styles.description}>
        <h2>Upcoming events @{venue.name}</h2>

        {venue.event.length ? (
          venue.event.map(({ id, name, dateStart }) => (
            <Link key={id} href={`/events/${id}`} className={styles.card}>
              <h3>{name}</h3>
              <p>{dateStart.toLocaleDateString('de')}</p>
            </Link>
          ))
        ) : (
          <p>no events scheduled</p>
        )}
      </section>
    </article>
  );
}

function parseEventId(eventId: string) {
  const id: number = Math.floor(parseInt(eventId));
  return id;
}

async function getEventData(id: number) {
  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      venue: true,
      category: {
        select: {
          title: true,
        },
      },
    },
  });
  if (event) return event;
  else throw new Error('Unable to fetch event data');
}

export async function generateMetadata({ params: { eventId } }: Props): Promise<Metadata> {
  const { name } = await getEventData(parseEventId(eventId));
  return { title: name };
}

async function getNextEventsInVenue(venueId: number, eventId: number) {
  const venue = await prisma.venue.findUnique({
    where: {
      id: venueId,
    },
    include: {
      event: {
        where: {
          id: {
            not: eventId,
          },
          dateStart: {
            gte: new Date(Date.now()),
          },
        },
        orderBy: {
          dateStart: 'desc',
        },
      },
    },
  });
  if (venue) return venue;
  else throw new Error('Unable to fetch venue data');
}
