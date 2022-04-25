import { useState } from "react";
import { Button, Htag, Ptag, Rating, Tag} from "../components";


export default function Home(): JSX.Element {
  const[rating, setRating] = useState<number>(4)
  return (
    <div>
      <Htag tag="h1">fjefjj</Htag>
      <Button appearance="primary" arrow="right">Кнопка</Button>
      <Button appearance="ghost" arrow="down">Кнопка</Button>
      <Ptag size="large">Я текст</Ptag>
      <Tag size='small' color="red">Hopa</Tag>
      <Tag size='medium' color="green">Popa</Tag>
      <Rating rating={rating} isEditable setRating={setRating}/>
    </div>
  );
}
