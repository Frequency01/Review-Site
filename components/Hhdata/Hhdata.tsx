import { HhDataProps } from "./Hhdata.props";
import styles from "./Hhdata.module.css";
import classNames from "classnames";
import RateIcon from "./rate.svg";
import { Card } from "../Card/Card";
import { priceRu } from "../../helpers/helpers";

export const HhData = ({
  count,
  juniorSalary,
  middleSalary,
  seniorSalary,
}: HhDataProps): JSX.Element => {
  return (
    <div className={styles.hh}>
      <>
        <Card className={styles.count}>
          <div className={styles.title}>Всего вакансий</div>
          <div className={styles.countValue}>{count}</div>
        </Card>
        <Card className={styles.salary}>
          <div>
            <div className={styles.titleSalary}>Начальный</div>
            <div className={styles.salaryValue}>{priceRu(juniorSalary)}</div>
            <div className={styles.rate}>
              <RateIcon className={styles.filled} />
              <RateIcon />
              <RateIcon />
            </div>
          </div>
          <div>
            <div className={styles.titleSalary}>Средний</div>

            <div className={styles.salaryValue}>{priceRu(middleSalary)}</div>
            <div className={styles.rate}>
              <RateIcon className={styles.filled} />
              <RateIcon className={styles.filled} />
              <RateIcon />
            </div>
          </div>
          <div>
            <div className={styles.titleSalary}>Профессионал</div>

            <div className={styles.salaryValue}>{priceRu(seniorSalary)}</div>
            <div className={styles.rate}>
              <RateIcon className={styles.filled} />
              <RateIcon className={styles.filled} />
              <RateIcon className={styles.filled} />
            </div>
          </div>
        </Card>
      </>
    </div>
  );
};
