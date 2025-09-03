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
    //добавляем кнопку создания тикетов.
    this.createBtn();
    // добавляем модальное окно создания тикета.
    this.modalCreate();
    console.info("init");
  }

  createBtn() {
    const myBtn = document.createElement("button");
    myBtn.classList.add("btn-create");
    myBtn.classList.add("btn-primary");
    myBtn.style.position = "absolute";
    myBtn.style.top = "20px";
    myBtn.style.right = "50px";
    myBtn.style.padding = "5px";
    myBtn.textContent = "Create Ticket";
    document.body.appendChild(myBtn);
    // откываем модальное окно по кнопке.
    myBtn.addEventListener("click", function () {
      const modalDiv = document.getElementById("myModalCreate");
      modalDiv.style.display = "block";
    });
  }
  modalCreate() {
    const modalDiv = document.createElement("div");
    modalDiv.id = "myModalCreate";
    modalDiv.classList.add("modal");
    document.body.append(modalDiv);
    const modalContentDiv = document.createElement("div");
    modalContentDiv.classList.add("modal-content");
    const span = document.createElement("span");
    span.classList.add("btn-close");
    span.id = 'btn-close-create';
    span.setAttribute("aria-label", "Close");
    modalContentDiv.append(span);
    const h2 = document.createElement("h2");
    h2.textContent = "Create new ticket";
    modalContentDiv.append(h2);
    const p = document.createElement("p");
    p.textContent = "this is body of the modal window";
    modalContentDiv.append(p);
    const buttonCreate = document.createElement("button");
    buttonCreate.id = "createNewTicketBtn";
    buttonCreate.textContent = "Add New Ticket";
    buttonCreate.classList.add("btn-primary");
    modalContentDiv.append(buttonCreate);
    modalDiv.append(modalContentDiv);

    //закрываем модальное окно при клике вне окна.
    window.onclick = function (event) {
      if (event.target == modalDiv) {
        modalDiv.style.display = "none";
      }
    };
    //закрываем модальное окно по кнопке.
    var closeBtn = document.getElementById("btn-close-create");
    closeBtn.onclick = function () {
      modalDiv.style.display = "none";
    }
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
