import { PublicUser, UserCard } from "@/entities";
import { MatchBtn } from "@/features";

const UserMatchCard: React.FC<Props> = ({ user, isEven }) => {
  return <UserCard user={user} bottomSection={<MatchBtn />} isEven={isEven} />;
};

export default UserMatchCard;
type Props = {
  user: PublicUser;
  isEven?: boolean;
};
