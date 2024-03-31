import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import useNewRoom from "../hooks/useNewRoom";
import useNewRooms from "../hooks/useNewRooms";

function getNamesMap(name: string) {
  return name
    .split(",")
    .map((n) => {
      if (n.trim() === "") return;
      return { name: n.trim() };
    })
    .filter(Boolean);
}

export function NewRoom() {
  const [name, setName] = useState("");
  const [seperateRooms, setSeperateRooms] = useState<any>([]);
  const [createMany, setCreateMany] = useState(false);

  const { mutate: createRoom, isPending } = useNewRoom();

  const { mutate: createRooms, isPending: isManyPending } = useNewRooms();

  useEffect(() => {
    //if name has , then create many rooms
    //if there is a comma in the end but no text after it, it should be ignored
    if (name.includes(",")) {
      setCreateMany(true);
      const rms = getNamesMap(name);
      setSeperateRooms(rms);
    } else {
      setCreateMany(false);
    }
  }, [name]);

  function handleCreate() {
    toast.promise(
      createRoom({ name }) as never,
      {
        loading: "Creating room...",
        success: "Room created successfully",
        error: "Failed to create room",
      },
      {
        style: {
          minWidth: "250px",
        },
      }
    );
  }

  function handleMultiCreate() {
    const roomsMap = getNamesMap(name);
    toast.promise(
      createRooms(roomsMap) as never,
      {
        loading: `Creating ${roomsMap.length} rooms...`,
        success: "Rooms created successfully",
        error: "Failed to create rooms",
      },
      {
        style: {
          minWidth: "250px",
        },
      }
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New Room</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create room</DialogTitle>
          <DialogDescription>
            Add a new room to your dashboard.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="AF13"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="-mt-1">
              <label htmlFor="name" className="text-sm text-gray-400">
                Use comma (,) to create many rooms at once.
              </label>
            </div>
            <div className="flex flex-row space-x-2">
              {createMany &&
                seperateRooms.length > 0 &&
                seperateRooms.map((room: { name: string }) => (
                  <div className="px-2 bg-gray-100 rounded-xl">
                    <label htmlFor="">{room.name}</label>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            {!createMany ? (
              <Button type="submit" onClick={handleCreate} disabled={isPending}>
                Create room
              </Button>
            ) : (
              <Button
                type="submit"
                onClick={handleMultiCreate}
                disabled={isManyPending}
              >
                Create {seperateRooms.length} rooms
              </Button>
            )}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
