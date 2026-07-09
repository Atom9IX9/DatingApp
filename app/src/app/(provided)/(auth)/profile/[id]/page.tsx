const Profile = async ({ params }: PageProps) => {
  const { id } = await params;

  return <div>profile: {id}</div>;
};

export default Profile;
type PageProps = {
  params: Promise<{
    id: string;
  }>;
};
