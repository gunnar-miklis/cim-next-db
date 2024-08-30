import type { User } from 'next-auth';
import Image from 'next/image';

export default function User({ name, image }: User) {
  if (!name || !image) return <h2>User is not authenticated</h2>;
  else
    return (
      <div>
        <h2>Hello {name} !!</h2>
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          blurDataURL={image}
          placeholder='blur'
          loading='lazy'
        />
      </div>
    );
}
