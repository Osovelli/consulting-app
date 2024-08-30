import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar"
import { cn } from "../../lib/utils"

export function AvatarGroup() {
    return (
      <div className={cn("flex items-center -space-x-3",)}>
        <Avatar className="bg-[#ff6b6b] text-white">
          <AvatarImage src="/avatars/avatar1.png" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Avatar className="bg-[#ffa500] text-white">
          <AvatarImage src="/avatars/avatar2.png" />
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <Avatar className="bg-[#6c5ce7] text-white">
          <AvatarImage  src="/avatars/avatar3.png" />
          <AvatarFallback>KL</AvatarFallback>
        </Avatar>
        <Avatar className="bg-[#6c5ce7] text-white">
          <AvatarImage  src="/avatars/avatar4.png" />
          <AvatarFallback>KL</AvatarFallback>
        </Avatar>
        <Avatar className="bg-green-300 text-white">
          <AvatarImage src="" />
          <AvatarFallback className=" text-gray-900">+ 9</AvatarFallback>
        </Avatar>
      </div>
    )
  }