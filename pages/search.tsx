import { GetStaticProps } from "next";
import { withLayout } from "../layout/Layout/Layout";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";

function Search({ menu }: HomeProps): JSX.Element {
  return <>search</>;
}
export default withLayout(Search);

export const getStaticProps: GetStaticProps = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
    JSON.stringify({ firstCategory: 0 }),
    { headers: { "Content-Type": "application/json" } }
  );
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
