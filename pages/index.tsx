import { GetStaticProps } from "next";
import { useState } from "react";
import { Button, Htag, Ptag, Rating, Tag } from "../components";
import { withLayout } from "../layout/Layout/Layout";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";

function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(4);
  return (
    <>
      <Htag tag="h1">fjefjj</Htag>
      <Button appearance="primary" arrow="right">
        Кнопка
      </Button>
      <Button appearance="ghost" arrow="down">
        Кнопка
      </Button>
      <Ptag size="large">Я текст</Ptag>
      <Tag size="small" color="red">
        Hopa
      </Tag>
      <Tag size="medium" color="green">
        Popa
      </Tag>
      <Rating rating={rating} isEditable setRating={setRating} />
      <>
        {menu.map((category) => {
          return (
            <li key={category._id.secondCategory}>
              {category._id.secondCategory}
            </li>
          );
        })}
      </>
    </>
  );
}
export default withLayout(Home);

export const getStaticProps: GetStaticProps = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
    JSON.stringify({ firstCategory: 0 }),
    { headers: { "Content-Type": "application/json" } }
  );
  console.log("BLA");
  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
