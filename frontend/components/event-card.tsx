import React from "react";
import { EventCardProps } from "@/types";
import GreenButton from "./green-button";
import Image from "next/image";

const EventCard = (props: EventCardProps) => {
  return props.show ? (
    <div className="w-[400px] min-h-[300px] border-purple-br  border-2 bg-purple-md rounded-lg m-3 flex flex-col justify-center items-center p-5">
      <h2 className="text-4xl font-raccoons">{props.title}</h2>

      {props.cardImage ? (
        <Image
          priority
          src={props.cardImage}
          width={300}
          height={200}
          alt="Image from event"
        />
      ) : null}
      <GreenButton
        buttonStyles="rounded-lg mt-7"
        buttonHref={props.buttonLink}
        buttonText={props.buttonText}
      />
    </div>
  ) : null;
};

export default EventCard;
