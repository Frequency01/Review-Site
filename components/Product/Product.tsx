import { ProductProps } from "./Product.props";
import cn from "classnames";
import styles from "./Product.module.css";
import { Card } from "../Card/Card";
import { Rating } from "../Rating/Rating";
import { Tag } from "../Tag/Tag";

export const Product = ({
  product,
  className,
  ...props
}: ProductProps): JSX.Element => {
  // допилить
  return (
    <Card className={styles.product}>
      <div className={styles.logo}>
        <img
          src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
          alt={product.title}
          width={70}
          height={70}
        />
      </div>
      <div className={styles.title}>{product.title}</div>
      <div className={styles.price}>
        <span>{product.price}</span>
      </div>
      <div className={styles.credit}>
        {product.credit}/<span className={styles.month}>мес</span>
      </div>
      <div className={styles.rating}>
        <Rating rating={product.reviewAvg ?? product.initialRating} />
        <div className={styles.rateTitle}>
          {"рейтинг" + " " + (product.reviewAvg ?? product.initialRating)}
        </div>
      </div>
      <div className={styles.tags}>
        {product.categories.map((category) => (
          <Tag key={category} className={styles.category} color="ghost">
            {category}
          </Tag>
        ))}
      </div>
      <div className={styles.priceTitle} aria-hidden={true}>
        цена
      </div>
      <div className={styles.creditTitle} aria-hidden={true}>
        кредит
      </div>
    </Card>
  );
};
