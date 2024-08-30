import { Card, CardContent, CardTitle, CardFooter} from "../../components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar";
import { cn } from "../../lib/utils";

interface FeatureCardProps {
    cardContent: string;
    className?: string;
    cardFooter?: {
        image: string,
        header: string,
        content: string,
    };
}

export default function TestimonialCard({cardContent, cardFooter, className}: FeatureCardProps ) {
  return (
    <Card className="inline-block font-hubot p-6 border-b-4 border-r-4 border-[#F17B2C]">
        <CardContent className="p-0 max-w-sm md:max-w-md text-[#01170C]">
            <div className={cn("pb-6 leading-5 text-2xl", className)}>
                {cardContent }
            </div>
        </CardContent>
        <CardFooter className="flex gap-2 p-0">
            <Avatar className="bg-[#ff6b6b] text-white">
                <AvatarImage src={cardFooter?.image} />
                <AvatarFallback>Av</AvatarFallback>
            </Avatar>
            <div className="">
                <h4 className="text-sm font-medium">{cardFooter?.header}</h4>
                <p className="text-sm">{cardFooter?.content}</p>
            </div>
        </CardFooter>
    </Card>
  )
}