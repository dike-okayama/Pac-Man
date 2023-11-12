import BackButton from "@/app/_components/BackButton/BackButton";

import * as styles from "./page.css";

export default function Config() {
  return (
    <div className={styles.configRoot}>
      <BackButton />
      <div className={styles.itemContainer}>
        <ConfigItem />
        <ConfigItem />
        <ConfigItem />
        <ConfigItem />
        <ConfigItem />
        <ConfigItem />
        <ConfigItem />
        <ConfigItem />
        <ConfigItem />
      </div>
    </div>
  );
}

const ConfigItem = () => {
  return (
    <div className={styles.item}>
      <span>key</span>
      <span>value</span>
    </div>
  );
};
