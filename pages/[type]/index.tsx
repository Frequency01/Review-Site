import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { withLayout } from "../../layout/Layout/Layout";
import { ParsedUrlQuery } from "querystring";
import axios from "axios";
import * as rax from "retry-axios";
import { MenuItem } from "../../interfaces/menu.interface";
import { firstLevelMenu } from "../../helpers/helpers";

function Type({ firstCategory }: TypeProps): JSX.Element {
  return <>type:{firstCategory}</>;
}
export default withLayout(Type);

const client = axios.create({
  headers: { "Content-Type": "application/json" },
  timeout: 500,
});
client.defaults.raxConfig = {
  instance: client,
  retry: 10,
  noResponseRetries: 10,
  onRetryAttempt: (err) => {
    const retryAttempt = rax.getConfig(err)!.currentRetryAttempt!;
    // console.log(
    //   `Retry attempt #${retryAttempt}. Error: ${err.code}: ${err.message}`
    // );
  },
};
const interceptorId = rax.attach(client);

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];
  return {
    paths: firstLevelMenu.map((menu) => "/" + menu.route),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }
  const firstCategoryItem = firstLevelMenu.find((m) => m.route == params.type);
  if (!firstCategoryItem) {
    return {
      notFound: true,
    };
  }
  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
    JSON.stringify({ firstCategory: firstCategoryItem.id }),
    { headers: { "Content-Type": "application/json" } }
  );
  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id,
    },
  };
};

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
