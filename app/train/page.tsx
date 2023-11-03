import BackButton from "../components/BackButton/BackButton";
import * as styles from "./page.css";

export default function Train() {
  return (
    <div className={styles.trainRoot}>
      <BackButton />
      <div className={styles.boxContainer}>
        <div></div>
        <DirectionBox name="UP" />
        <div></div>
        <DirectionBox name="LEFT" />
        <div></div>
        <DirectionBox name="RIGHT" />
        <div></div>
        <DirectionBox name="DOWN" />
        <TrainButtonBox />
      </div>
    </div>
  );
}

type DirectionBoxProps = {
  name: string;
};
const DirectionBox = ({ name }: DirectionBoxProps) => {
  return <div className={styles.box}>{name}</div>;
};

const TrainButtonBox = () => {
  return <div className={`${styles.box} ${styles.trainButton}`}>TRAIN</div>;
};
