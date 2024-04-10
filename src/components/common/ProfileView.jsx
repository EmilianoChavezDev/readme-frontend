import Image from "next/image";

const ProfileView = ({ username, imagen, size }) => {
  const initials = username
    ?.split(" ")
    ?.map((word) => word[0])
    ?.join("")
    ?.toUpperCase();

  return (
    <div>
      {imagen ? (
        <Image
          src={imagen}
          alt="User"
          className={`h-${size} w-${size} rounded-full`}
          width={200}
          height={200}
        />
      ) : (
        <div
          className={`flex items-center justify-center h-${size} w-${size} bg-textColorGray text-white rounded-full`}
        >
          {initials}
        </div>
      )}
    </div>
  );
};

export default ProfileView;
