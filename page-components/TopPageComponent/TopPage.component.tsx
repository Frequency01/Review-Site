import { TopPageComponentProps } from "./TopPage.component.props";
import cn from "classnames";
import styles from "./TopPage.component.module.css";
import { Tag, Htag, Card } from "../../components";

export const TopPageComponent = ({
  page,
  products,
  firstCategory,
}: TopPageComponentProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag="h1">{page.title}</Htag>
        <Tag color="gray" size="medium">
          {products.length}
        </Tag>
        <span>Sorting</span>
      </div>
      <div>
        {products &&
          products.map((product) => (
            <div key={product._id}>{product.title}</div>
          ))}
      </div>
      <div className={styles.hhTitle}>
        <Htag tag="h2"> Вакансии - {page.category}</Htag>
        <Tag color="red" size="medium">
          hh.ru
        </Tag>
      </div>
      <div className={styles.blockHH}>
        {" "}
        <Card className={styles.numberOfVacancy}>
          <div className={styles.statTitle}>Всего вакансий</div>
          <div className={styles.statCount}>{page.hh?.count}</div>
        </Card>
      </div>
    </div>
  );
};
