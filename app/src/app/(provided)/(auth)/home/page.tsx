"use client"
import { PositionedAvatar, selectAvatar } from "@/entities/avatar";
import { useAppSelector } from "@/shared/lib";

const Home = () => {
  const avatar = useAppSelector(selectAvatar)

  return <div> <PositionedAvatar avatar={avatar} size={30} /> </div>;
}

export default Home;