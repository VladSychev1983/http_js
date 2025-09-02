import HelpDesk from "./HelpDesk";
import TicketService from "./TicketService";

const root = document.getElementById("root");

const ticketService = new TicketService();
const app = new HelpDesk(root, ticketService);

app.init();

// for test
export default function demo(value) {
  return `Demo: ${value}`;
}
