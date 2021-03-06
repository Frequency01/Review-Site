import { TopPageComponentProps } from "./TopPage.component.props";
import cn from "classnames";
import styles from "./TopPage.component.module.css";
import { sortReducer } from "./sort.reducer";
import { Tag, Htag, Sort, Product } from "../../components";
import { HhData } from "../../components/Hhdata/Hhdata";
import { TopLevelCategory } from "../../interfaces/page.interface";
import { Advantages } from "../../components/Advantages/Advantages";
import { SortEnum } from "../../components/Sort/Sort.props";
import { useReducer } from "react";

export const TopPageComponent = ({
  page,
  products,
  firstCategory,
}: TopPageComponentProps): JSX.Element => {
  const [{ products: sortedProducts, sort }, dispathSort] = useReducer(
    sortReducer,
    { products, sort: SortEnum.Rating }
  );

  const setSort = (sort: SortEnum) => {
    dispathSort({ type: sort });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag="h1">{page.title}</Htag>
        <Tag color="gray" size="medium">
          {products.length}
        </Tag>
        <Sort sort={sort} setSort={setSort} />
      </div>
      <div>
        {sortedProducts &&
          sortedProducts.map((product) => (
            <Product key={product._id} product={product} />
          ))}
      </div>
      <div className={styles.hhTitle}>
        <Htag tag="h2"> Вакансии - {page.category}</Htag>
        <Tag color="red" size="medium">
          hh.ru
        </Tag>
      </div>
      {firstCategory == TopLevelCategory.Courses && page.hh && (
        <HhData {...page.hh} />
      )}
      {page.advantages && page.advantages.length > 0 && (
        <>
          <Htag tag="h2">Преимущества</Htag>
          <Advantages advantages={page.advantages} />
        </>
      )}
      {page.seoText && (
        <div
          className={styles.seoText}
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        />
      )}
      <Htag tag="h2">Получаемые навыки</Htag>
      {page.tags.map((tag) => {
        return (
          <Tag key={tag} color="primary">
            {tag}
          </Tag>
        );
      })}
    </div>
  );
};
