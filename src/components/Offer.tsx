import { type Offer } from "@prisma/client";
import { Card } from "./ui/card";

const Offer = (offer: Offer) => {
  return <Card>{offer.id}</Card>;
};

export default Offer;
