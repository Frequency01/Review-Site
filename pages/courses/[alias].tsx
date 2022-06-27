import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";
import { withLayout } from "../../layout/Layout/Layout";
import axios from "axios";
import { MenuItem } from "../../interfaces/menu.interface";
import { TopPageModel } from "../../interfaces/page.interface";
import { ParsedUrlQuery } from "querystring";
import { ProductModel } from "../../interfaces/producst.interface";

import * as rax from "retry-axios";

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
const firstCategory = 0;

function Course({ menu, products, page }: CourseProps): JSX.Element {
  return <>{products && products.length}</>;
}
export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: menu } = await client.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
    JSON.stringify({ firstCategory: 0 })
  );
  // console.log(menu.flatMap((m) => m.pages.map((p) => "/courses/" + p.alias)));
  return {
    paths: menu.flatMap((m) => m.pages.map((p) => "/courses/" + p.alias)),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<CourseProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const { data: menu } = await client.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
    JSON.stringify({ firstCategory: 0 })
  );

  const { data: page } = await client.get<TopPageModel>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/byAlias/" + params.alias
  );

  const { data: products } = await client.post<ProductModel[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/product/find",
    {
      category: page.category,
      limit: 10,
    }
  );

  return {
    props: {
      firstCategory,
      products,
      page,
      menu,
    },
  };
};

interface CourseProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
  page: TopPageModel;
  products: ProductModel[];
}
