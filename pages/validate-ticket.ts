import { getTicketDetails } from "@/app/actions/getTicketDetails";


export default async function handler(req: any, res: any) {
  const { userId, eventId } = req.query;

  try {
    const ticket = await getTicketDetails(parseInt(userId), parseInt(eventId));
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json({ message: 'Ticket is valid', ticket });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}