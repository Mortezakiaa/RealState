import styles from './CategoryCard.module.css'
import Link from "next/link";
import Image from "next/image";

export default function CategoryCard({ name, title }) {
  return (
    <div className={styles.card}>
      <Link href={`/buy-residential?category=${name}`}>
        <Image
          src={`/images/${name}.png`}
          alt={title}
          width={240}
          height={144}
          priority={true}
        />
        <p>{title}</p>
      </Link>
    </div>
  )
}
