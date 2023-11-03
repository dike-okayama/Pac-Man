import Link from "next/link";
import { ArcadeButtonFlat as ArcadeButton } from "./components/ArcadeButton/ArcadeButton";
import * as styles from "./page.css";

export default function Home() {
  return (
    <main className={styles.homeRoot}>
      <div className={styles.buttonContainer}>
        <div className={styles.buttonWrapper}>
          <Link href="/play" draggable={false}>
            <ArcadeButton />
          </Link>
          PLAY
        </div>
        <div className={styles.buttonWrapper}>
          <Link href="/train" draggable={false}>
            <ArcadeButton />
          </Link>
          TRAIN
        </div>
        <div className={styles.buttonWrapper}>
          <Link href="/config" draggable={false}>
            <ArcadeButton />
          </Link>
          CONFIG
        </div>
      </div>
    </main>
  );
}
