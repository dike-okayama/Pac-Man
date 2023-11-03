import Link from "next/link";
import * as styles from "./BackButton.css";

export default function BackButton() {
  return (
    <div className={styles.button}>
      <span>{"<"}</span>
      <Link href="/">
        <span className={styles.buttonText}>Back</span>
      </Link>
    </div>
  );
}
