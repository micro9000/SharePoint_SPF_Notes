import * as React from "react";
import { escape } from "@microsoft/sp-lodash-subset";

import styles from "./AppStyles.module.scss";

export interface PlaceholderComponentProps {
  toDisplayMsg: string;
  placeHolderClassName: string;
}

const PlaceholderComponent = ({
  toDisplayMsg,
  placeHolderClassName,
}: PlaceholderComponentProps) => {
  return (
    <div className={styles.app}>
      <div
        className={`ms-bgColor-themeDark ms-fontColor-white ${placeHolderClassName}`}
      >
        <i className="ms-Icon ms-Icon--Info" aria-hidden="true"></i>{" "}
        {escape(toDisplayMsg)}
      </div>
    </div>
  );
};

export default PlaceholderComponent;
