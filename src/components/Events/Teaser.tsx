import Link from 'next/link';
import type { Event, Venue } from '@/prisma/generated/client';
import styles from '@/src/styles/app.module.css';

type Props = Event & {
  venue: Venue;
  category: {
    title: string;
  }[];
};
export default function EventTeaser({
  id,
  name,
  description,
  dateStart,
  dateEnd,
  venue,
  category: categories,
}: Props) {
  return (
    <Link href={`/events/${id}`} className={styles.card}>
      <article>
        <div>
          <h2>{name}</h2>

          {description && <p>{description}</p>}
        </div>
        <br />
        <br />

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

          <dt>Venue</dt>
          <dd>@{venue.name}</dd>

          {categories.length > 0 && (
            <>
              <dt>Categories</dt>
              <dd>{categories.map((category) => category.title).join(', ')}</dd>
            </>
          )}
        </dl>
      </article>
    </Link>
  );
}
