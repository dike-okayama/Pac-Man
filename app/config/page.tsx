"use client";

import { useState } from "react";

import BackButton from "@/app/_components/BackButton/BackButton";

import * as styles from "./page.css";

export default function Config() {
  return (
    <div className={styles.configRoot}>
      <BackButton />
      <div className={styles.itemContainer}>
        <ConfigItem
          key_={"hidden units"}
          defaultValue={128}
          options={[32, 64, 128, 256]}
        />
        <ConfigItem
          key_={"epochs"}
          defaultValue={10}
          options={[1, 5, 10, 20]}
        />
        <ConfigItem key_={"batch size"} defaultValue={5} options={[1, 5, 10]} />
        <ConfigItem
          key_={"optimizer"}
          defaultValue={"adam"}
          options={["adam"]}
        />
      </div>
    </div>
  );
}

const ConfigItem = ({
  key_,
  defaultValue,
  options,
}: {
  key_: string;
  defaultValue: string | number;
  options: (string | number)[];
}) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <div
      className={styles.item}
      onClick={() => {
        setValue(options[(options.indexOf(value) + 1) % options.length]);
      }}
    >
      <span>{key_}</span>
      <span>{value}</span>
    </div>
  );
};
