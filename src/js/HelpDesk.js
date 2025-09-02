/**
 *  Основной класс приложения
 * */
export default class HelpDesk {
  constructor(container, ticketService) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("This is not HTML element!");
    }
    this.container = container;
    this.ticketService = ticketService;
  }

  init() {
    //отрисовываем список существующих тикетов на странице.
    this.ticketService.list(this.queryList);
    console.info("init");
  }

  queryList(responseData) {
    //тут надо прочитать object resposeData (уже Array) и запихнуть в созданный объект узел.
    const container = document.getElementById("root");
    const newDiv = document.createElement("div");
    newDiv.classList.add("ticket-container");
    container.append(newDiv);
    const ticketContainer = container.querySelector(".ticket-container");
    let content = "";
    const renderList = (id, status, text, created) => {
      return `
        <div class='ticket-item' id="${id}">
        <span>${status}</span>
        <span>${text}}</span></td>
        <span>${created}</span></td>
        <span><a class="btn-edit" href="#" data-id="${id}">edit</a></span>
        <span><a class="btn-delete" href="#" data-id="${id}">delete</a></span>
        </div>
            `;
    };

    responseData.forEach((element) => {
      content += renderList(
        element.id,
        element.status,
        element.name,
        element.created,
      );
    });
    ticketContainer.innerHTML = content;
    //console.log(content);
    //console.log(responseData);
  }
}
