import { ProductProps } from "./Product.props";
import cn from "classnames";
import styles from "./Product.module.css";

export const Product = ({
  product,
  className,
  ...props
}: ProductProps): JSX.Element => {
  return <div {...props}>{product.title}</div>;
};
