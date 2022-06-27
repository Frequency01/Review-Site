import { RatingProps } from "./Rating.props";
import cn from "classnames";
import StarIcon from "./star.svg";
import styles from "./Rating.module.css";
import { useEffect, useState, KeyboardEvent } from "react";

export const Rating = ({
  isEditable = false,
  rating,
  setRating,
  ...props
}: RatingProps): JSX.Element => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
    new Array(5).fill(<></>)
  );

  useEffect(() => {
    constructReating(rating);
  }, [rating]);

  const constructReating = (currentRating: number) => {
    const updatedArray = ratingArray.map((r: JSX.Element, index: number) => {
      return (
        <StarIcon
          key={index}
          className={cn(styles.starIcon, {
            [styles.filled]: index < currentRating,
            [styles.editable]: isEditable,
          })}
          onMouseEnter={() => changeDisplay(index + 1)}
          onMouseLeave={() => changeDisplay(rating)}
          onClick={() => index + 1}
          tabIndex={isEditable ? 0 : -1}
          onKeyDown={(e: KeyboardEvent<SVGElement>) =>
            isEditable && handleSpace(index + 1, e)
          }
        />
      );
    });
    setRatingArray(updatedArray);
  };

  const changeDisplay = (i: number) => {
    if (!isEditable || !setRating) {
      return;
    }
    setRating(i);
  };

  const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
    if (e.code != "Space" || !setRating) {
      return;
    }
    setRating(i);
  };

  return (
    <div {...props}>
      {ratingArray.map((r, index) => (
        <span key={index}>{r}</span>
      ))}
    </div>
  );
};
