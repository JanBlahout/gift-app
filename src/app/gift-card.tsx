import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Doc } from '../../convex/_generated/dataModel';
import { Button } from '@/components/ui/button';

type GiftCardProps = {
  gift: Doc<'gifts'>;
};

function GiftCard(props: GiftCardProps) {
  const { gift } = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{gift.name}</CardTitle>
        <CardDescription>{gift.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
        <Button>Open link</Button>
      </CardFooter>
    </Card>
  );
}

export default GiftCard;
