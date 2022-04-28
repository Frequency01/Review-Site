import { useState } from "react";
import { Button, Htag, Ptag, Rating, Tag } from "../components";
import { withLayout } from "../layout/Layout/Layout";


function Home(): JSX.Element {
  const [rating, setRating] = useState<number>(4)
  return (
    <>
      <Htag tag="h1">fjefjj</Htag>
      <Button appearance="primary" arrow="right">Кнопка</Button>
      <Button appearance="ghost" arrow="down">Кнопка</Button>
      <Ptag size="large">Я текст</Ptag>
      <Tag size='small' color="red">Hopa</Tag>
      <Tag size='medium' color="green">Popa</Tag>
      <Rating rating={rating} isEditable setRating={setRating} />
    </>
  );
}
export default withLayout(Home)