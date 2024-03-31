import { HomeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface RoomCardProps {
  room: {
    id: string;
    name: string;
    createdAt: string;
  };
}

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const secondsAgo = Math.floor((Date.now() - date.getTime()) / 1000);

  if (secondsAgo < 60) {
    return "just now";
  } else if (secondsAgo < 3600) {
    const minutes = Math.floor(secondsAgo / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (secondsAgo < 86400) {
    const hours = Math.floor(secondsAgo / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (secondsAgo < 604800) {
    const days = Math.floor(secondsAgo / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else {
    return date.toDateString();
  }
}
function RoomCard({ room }: RoomCardProps) {
  return (
    <Link to={`/rooms/${room.id}`}>
      <Card className="transition-transform duration-200 transform group hover:scale-105 hover:shadow-lg">
        <CardHeader className="flex flex-row items-center gap-4">
          <HomeIcon className="w-8 h-8" />
          <div className="grid gap-1">
            <CardTitle>{room.name}</CardTitle>
            <div>ID: {room.id}</div>
          </div>
        </CardHeader>
        <CardContent className="mt-2 text-sm text-gray-500">
          Created: {timeAgo(room.createdAt)}
        </CardContent>
      </Card>
    </Link>
  );
}

export default RoomCard;
