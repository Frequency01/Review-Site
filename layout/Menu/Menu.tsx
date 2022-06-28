import { useContext } from "react";
import { AppContext } from "../../context/app.context";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";
import cn from "classnames";
import { useRouter } from "next/router";
import styles from "./Menu.module.css";
import { firstLevelMenu } from "../../helpers/helpers";

export const Menu = (): JSX.Element => {
  const { menu, firstCategory, setMenu } = useContext(AppContext);

  const router = useRouter();

  const openSecondLevelMenu = (secondCategory: string) => {
    setMenu &&
      setMenu(
        menu.map((m) => {
          if (m._id.secondCategory == secondCategory) {
            m.isOpened = !m.isOpened;
          }
          return m;
        })
      );
  };

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenu.map((menu) => {
          return (
            <div key={menu.route}>
              <a href={`/${menu.route}`}>
                <div
                  className={cn(styles.firstLevel, {
                    [styles.firstLevelActive]: menu.id == firstCategory,
                  })}
                >
                  {menu.icon}
                  <span>{menu.name}</span>
                </div>
              </a>
              {menu.id == firstCategory && buildSecondLevel(menu)}
            </div>
          );
        })}
      </>
    );
  };
  const buildSecondLevel = (menuFirstLevel: FirstLevelMenuItem) => {
    return (
      <div className={styles.secondBlock}>
        {menu.map((menuItem) => {
          if (
            menuItem.pages
              .map((p) => p.alias)
              .includes(router.asPath.split("/")[2])
          ) {
            menuItem.isOpened = true;
          }
          return (
            <div key={menuItem._id.secondCategory}>
              <div
                className={styles.secondLevel}
                onClick={() => openSecondLevelMenu(menuItem._id.secondCategory)}
              >
                {menuItem._id.secondCategory}
              </div>
              <div
                className={cn(styles.secondLevelBlock, {
                  [styles.secondLevelBlockOpened]: menuItem.isOpened,
                })}
              >
                {buildThirdLevel(menuItem.pages, menuFirstLevel.route)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return (
      <div>
        {pages.map((page) => (
          <a
            key={page.alias}
            href={`/${route}/${page.alias}`}
            className={cn(styles.thirdLevel, {
              [styles.thirdLevelActive]:
                `/${route}/${page.alias}` == router.asPath,
            })}
          >
            {page.category}
          </a>
        ))}
      </div>
    );
  };

  return <div className={styles.menu}>{buildFirstLevel()}</div>;
};
