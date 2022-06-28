import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";
import { withLayout } from "../../layout/Layout/Layout";
import axios from "axios";
import { MenuItem } from "../../interfaces/menu.interface";
import {
  TopLevelCategory,
  TopPageModel,
} from "../../interfaces/page.interface";
import { ParsedUrlQuery } from "querystring";
import { ProductModel } from "../../interfaces/producst.interface";
import { TopPageComponent } from "../../page-components";
import * as rax from "retry-axios";
import { firstLevelMenu } from "../../helpers/helpers";

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

function TopPage({ firstCategory, products, page }: TopPageProps): JSX.Element {
  return (
    <TopPageComponent
      firstCategory={firstCategory}
      page={page}
      products={products}
    />
  );
}
export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];
  for (const m of firstLevelMenu) {
    const { data: menu } = await client.post<MenuItem[]>(
      process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
      JSON.stringify({ firstCategory: m.id })
    );
    paths = paths.concat(
      menu.flatMap((s) => s.pages.map((item) => `/${m.route}/${item.alias}`))
    );
  }
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({
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

  try {
    const { data: menu } = await client.post<MenuItem[]>(
      process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
      JSON.stringify({ firstCategory: firstCategoryItem?.id })
    );
    if (menu.length == 0) {
      return {
        notFound: true,
      };
    }

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
        firstCategory: firstCategoryItem?.id,
        products,
        page,
        menu,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

interface TopPageProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}
