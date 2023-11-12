import styles from "./styles.module.scss";

export function ArcadeButton() {
  return <button className={styles["push--flat"]} draggable={false}></button>;
}

export function ArcadeButtonFlat() {
  return <button className={styles["push--skeuo"]} draggable={false}></button>;
}
