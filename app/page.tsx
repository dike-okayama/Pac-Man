import Link from "next/link";
import { ArcadeButtonFlat as ArcadeButton } from "./components/ArcadeButton/ArcadeButton";
import * as styles from "./page.css";

export default function Home() {
  return (
    <main className={styles.homeRoot}>
      <div className={styles.buttonContainer}>
        <Button href="/play" label="PLAY" />
        <Button href="/train" label="TRAIN" />
        <Button href="/config" label="CONFIG" />
      </div>
    </main>
  );
}

const Button = ({ href, label }: { href: string; label: string }) => {
  return (
    <div className={styles.buttonWrapper}>
      <Link href={href} draggable={false}>
        <ArcadeButton />
      </Link>
      {label}
    </div>
  );
};
