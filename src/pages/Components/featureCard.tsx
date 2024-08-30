import { Card, CardContent, CardTitle} from "../../components/ui/card";
import { cn } from "../../lib/utils";

interface FeatureCardProps {
    cardtitle: string;
    cardContent: string;
    className?: string;
    onClick?: () => void;
}

export default function FeatureCard({cardtitle, cardContent, onClick, className}: FeatureCardProps ) {
  return (
    <Card onClick={onClick} className="min-w-52 font-hubot w-full border-b-2 border-b-[#C1FA6B]">
        <CardTitle className="text-sm text-[#025A2E]">
            {cardtitle}
        </CardTitle>
        <CardContent className="p-0 max-w-xs text-[#01170C]">
            <img src="Image container.png" alt="" />
            <div className={cn(" mr-8 pb-6 leading-5 text-sm", className)}>
                {cardContent }
            </div>
        </CardContent>
    </Card>
  )
}
