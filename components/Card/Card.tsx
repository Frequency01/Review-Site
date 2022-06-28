import { CardProps } from "./Card.props";
import styles from "./Card.module.css";
import classNames from "classnames";

export const Card = ({
  background,
  children,
  className,
}: CardProps): JSX.Element => {
  return (
    <div
      className={classNames(styles.card, className, {
        [styles.blue]: background == "blue",
        [styles.white]: background == "white",
      })}
    ></div>
  );
};
