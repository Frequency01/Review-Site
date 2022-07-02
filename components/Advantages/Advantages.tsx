import { AdvantagesProps } from "./Advantages.props";
import styles from "./Advantages.module.css";
import CheckIcon from "./check.svg";

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
  return (
    <>
      {advantages.map((advantage) => {
        return (
          <div key={advantage._id} className={styles.advantageContainer}>
            <CheckIcon />
            <div className={styles.title}>{advantage.title}</div>
            <hr className={styles.line} />
            <div>{advantage.description}</div>
          </div>
        );
      })}
    </>
  );
};
