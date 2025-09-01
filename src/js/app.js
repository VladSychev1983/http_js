// TODO: write code here
import HelpDesk from "./HelpDesk";
import TicketService from "./TicketService";

const root = document.getElementById("root");

const ticketService = new TicketService();
const app = new HelpDesk(root, ticketService);

app.init();

// comment this to pass build
//const unusedVariable = "variable";

// for demonstration purpose only
export default function demo(value) {
  return `Demo: ${value}`;
}

console.log("app.js included");
