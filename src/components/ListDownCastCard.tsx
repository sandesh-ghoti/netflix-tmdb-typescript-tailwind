import * as React from "react";
import { CastCard, ICastCardProps } from "./CastCard";

interface IListDownCastCardProps {
  list: ICastCardProps[];
}

export const ListDownCastCard: React.FunctionComponent<
  IListDownCastCardProps
> = (props) => {
  return (
    <ul className="flex flex-row overflow-scroll w-full gap-4 sm:gap-6 md:gap-8 lg:gap-10 p-4">
      {props.list.map((item) => (
        <li
          key={item.id}
          className="flex-none w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
        >
          <CastCard {...item} />
        </li>
      ))}
    </ul>
  );
};
