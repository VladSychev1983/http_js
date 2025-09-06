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
    window.deleteFunc = this.ticketService.delete;
    window.callbackDeleteFunc = this.callbackDeleteTicket;
  }

  init() {
    //отрисовываем список существующих тикетов на странице.
    this.ticketService.list(this.queryList);
    //добавляем кнопку создания тикетов.
    this.createBtn();
    //добавляем модальное окно создания тикета.
    this.modalCreate();
    //добавляем модальное окно подтверждения удаления.
    this.modalConfirm();
    //добавляем модальное окно редактирования.
    this.modalEdit();
    //создаем новый тикет.
    const createBtn = document.getElementById("createNewTicketBtn");
    createBtn.addEventListener("click", () => {
      const dataJson = this.getCreateData();
      this.ticketService.create(dataJson, this.callbackCreateTicket);
    });
    createBtn.removeEventListener("click", () => {});

    //удаляем тикет.
    this.deleteTicket();
    //кликаем по чемарку.
    this.checkmarkClick(this.ticketService.update, this.checkmarkCallback);

    //редактируем тикет.
    this.editTicket();
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
    myBtn.removeEventListener("click", function () {});
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
    span.id = "btn-close-create";
    span.setAttribute("aria-label", "Close");
    modalContentDiv.append(span);
    const h2 = document.createElement("h2");
    h2.textContent = "Добавить тикет";
    modalContentDiv.append(h2);

    const p = document.createElement("p");
    p.textContent = "Краткое описание";
    modalContentDiv.append(p);

    const inputShort = document.createElement("textarea");
    inputShort.id = "btn-short-create";
    modalContentDiv.append(inputShort);

    const p2 = document.createElement("p");
    p2.textContent = "Подробное описание";
    modalContentDiv.append(p2);

    const inputFull = document.createElement("textarea");
    inputFull.id = "btn-full-create";
    modalContentDiv.append(inputFull);

    const buttonCreate = document.createElement("button");
    buttonCreate.id = "createNewTicketBtn";
    buttonCreate.textContent = "Создать";
    buttonCreate.classList.add("btn-primary");
    modalContentDiv.append(buttonCreate);
    modalDiv.append(modalContentDiv);

    //закрываем модальное окно при клике вне окна.
    modalDiv.addEventListener('click', (event) => {
                if (event.target === modalDiv) {
                    console.log('Клик вне модального окна, удаление отменено.');
                    modalDiv.style.display = "none";
                }
            });

    //закрываем модальное окно по кнопке.
    var closeBtn = document.getElementById("btn-close-create");
    closeBtn.onclick = function () {
      modalDiv.style.display = "none";
    };

  }
  modalEdit() {
    const modalDiv = document.createElement("div");
    modalDiv.id = "myModalEdit";
    modalDiv.classList.add("modal");
    document.body.append(modalDiv);
    const modalContentDiv = document.createElement("div");
    modalContentDiv.classList.add("modal-content");
    const span = document.createElement("span");
    span.classList.add("btn-close");
    span.id = "btn-close-edit";
    span.setAttribute("aria-label", "Close");
    modalContentDiv.append(span);
    const h2 = document.createElement("h2");
    h2.textContent = "Изменить тикет";
    modalContentDiv.append(h2);
    const p = document.createElement("p");
    p.textContent = "Краткое описание";
    modalContentDiv.append(p);
    const inputShort = document.createElement("textarea");
    inputShort.id = "btn-short-edit";
    modalContentDiv.append(inputShort);
    const p2 = document.createElement("p");
    p2.textContent = "Подробное описание";
    modalContentDiv.append(p2);
    const inputFull = document.createElement("textarea");
    inputFull.id = "btn-full-edit";
    modalContentDiv.append(inputFull);
    const buttonEdit = document.createElement("button");
    buttonEdit.id = "editTicketBtn";
    buttonEdit.textContent = "Редактировать";
    buttonEdit.classList.add("btn-primary");
    modalContentDiv.append(buttonEdit);
    modalDiv.append(modalContentDiv);
    //закрываем модальное окно вне области.
    modalDiv.addEventListener('click', (event) => {
      if (event.target === modalDiv) {
        console.log('Клик вне модального окна, удаление отменено.');
        modalDiv.style.display = "none";
        }
            });

    //закрываем модальное окно по кнопке.
    var closeBtn = document.getElementById("btn-close-edit");
    closeBtn.onclick = function () {
      modalDiv.style.display = "none";
    };
  }

  modalConfirm() {
    const modalDiv = document.createElement("div");
    modalDiv.id = "myModalConfirm";
    modalDiv.classList.add("modal");
    document.body.append(modalDiv);
    const modalContentDiv = document.createElement("div");
    modalContentDiv.classList.add("modal-content");
    const span = document.createElement("span");
    span.classList.add("btn-close");
    span.id = "btn-close-confirm";
    span.setAttribute("aria-label", "Close");
    modalContentDiv.append(span);
    const h2 = document.createElement("h2");
    h2.textContent = "Удалить тикет";
    modalContentDiv.append(h2);
    const p = document.createElement("p");
    p.textContent =
      "Вы уверены, что хотите удалить тикет? Это действие необратимо.";
    modalContentDiv.append(p);
    const divButtons = document.createElement("div");
    divButtons.classList.add("modal-buttons");
    modalContentDiv.append(divButtons);
    const buttonOk = document.createElement("button");
    buttonOk.id = "button-confirm-ok";
    buttonOk.textContent = "OK";
    buttonOk.classList.add("btn-primary");
    divButtons.append(buttonOk);
    const buttonDiscard = document.createElement("button");
    buttonDiscard.id = "button-confirm-discard";
    buttonDiscard.textContent = "Отмена";
    buttonDiscard.classList.add("btn-primary");
    divButtons.append(buttonDiscard);
    modalDiv.append(modalContentDiv);
  }

  queryList(responseData) {
    //читаем resposeData (уже Array) и рендерим в созданный объект узел.
    const container = document.getElementById("root");
    const newDiv = document.createElement("div");
    newDiv.classList.add("ticket-container");
    container.append(newDiv);
    const ticketContainer = container.querySelector(".ticket-container");
    let content = "";

    //конвертируем дату.
    const convertDate = (unixtime) => {
      unixtime = Math.trunc(unixtime / 1000);
      const dateObject = new Date(unixtime * 1000);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth() + 1;
      const day = dateObject.getDate();
      const hours = dateObject.getHours();
      const minutes = dateObject.getMinutes();
      const seconds = dateObject.getSeconds();
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      return `${day}.${month}.${year} ${hours}:${minutes}`;
    };

    const renderList = (id, status, text, created) => {
      const status_element =
    (status === true) 
          ? `<span class="checkmark" data-id="${id}" data-status="${status}" style="color: blue" title="Тикет выполнет">&#10003;</span>`
          : `<span class="checkmark" data-id="${id}" data-status="${status}" title="Тикет в работе">&times;</span>`;
      return `
        <div class='ticket-item' id="${id}">
        ${status_element}
        <span style="flex-grow:2;">${text}</span>
        <span style="max-width: 100px;">${convertDate(created)}</span>
        <span style="flex-grow:0; width: 30px;"><a class="btn-edit bi-pencil" href="#" data-id="${id}" title="Edit ticket"></a></span>&nbsp&nbsp
        <span style="flex-grow:0; width: 30px;"><a class="btn-delete bi-trash" href="#" data-id="${id}" title="Delete ticket"></a></span>&nbsp&nbsp
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

  getCreateData() {
    let data = {};
    const eshortText = document.getElementById("btn-short-create");
    const efullText = document.getElementById("btn-full-create");
    const shortText = eshortText.value;
    const fullText = efullText.value;
    data.name = shortText;
    data.description = fullText;
    data.id = null;
    const jsonData = JSON.stringify(data);
    return jsonData;
  }

  callbackCreateTicket(dataResponse) {
    const createModal = document.getElementById("myModalCreate");
    if (dataResponse.id !== undefined) {
      createModal.style.display = "";
      window.location.reload();
    }
  }

  deleteTicket() {
    document.addEventListener("DOMContentLoaded", function () {
      const modalConfirmDiv = document.getElementById("myModalConfirm");
      const deleteButtons = document.getElementsByClassName(
        "btn-delete bi-trash",
      );
      //подписываемся на события по кнопкам подтверждения удаления.
      const buttonOk = document.getElementById("button-confirm-ok");
      const buttonDiscard = document.getElementById("button-confirm-discard");
      const buttonCloseConfirm = document.getElementById("btn-close-confirm");

      buttonDiscard.onclick = () => {
        modalConfirmDiv.style.display = "none";
      };
      buttonCloseConfirm.onclick = () => {
        modalConfirmDiv.style.display = "none";
      };

      let myTimer = setTimeout(() => {
        const array = Array.from(deleteButtons);
        console.log("Найдено кнопок для удаления:", deleteButtons.length);
        array.forEach((button) => {
          button.addEventListener("click", (event) => {
            const dataId = event.target.dataset.id;
            modalConfirmDiv.style.display = "block";
            buttonOk.onclick = () => {
              window.deleteFunc(dataId, window.callbackDeleteFunc);
              console.log(`clicked ok! ${dataId}`);
            };
            console.log(`Атрибут data-id равен ${dataId}`);
          }); //listener
        }); //foreach
      }, 100); //timer
    }); //contentloaded
  } //method end

  callbackDeleteTicket(statusResponse) {
    console.log(`callbackdelete: ${statusResponse}`);
    if (statusResponse === 204) {
      window.location.reload();
    }
  }

  checkmarkClick(sendQueryFunc, callbackFunc) {
    const data = {};
    const checkmarkBtns = document.getElementsByClassName(
        "checkmark",
      );
      let myTimer = setTimeout(() => {
      const checkmarkArray = Array.from(checkmarkBtns);
      checkmarkArray.forEach((button) => {
        //console.dir(button);
        button.addEventListener('click', (e) => {
          const dataId = e.target.dataset.id;
          const status = e.target.dataset.status;
          data.id = dataId;
          data.status = (status === 'false') ? true : false; 
          console.log(`Атрибут data-id равен ${dataId}`);
          // вызываем фукцию обновления Id здесь, передаем dataId
          sendQueryFunc(dataId, data, callbackFunc);
        }); //click event
      }) //foreach

      }, 100); //myTimer
  }
  checkmarkCallback(dataResponse) {
    console.log('checkmarkCallback called!');
    if(dataResponse.id !== "") {
      window.location.reload();
    }
  }
  editTicket() {
    const editModal = document.getElementById("myModalEdit");
    const buttonClose = document.getElementById('btn-close-edit');
    const buttonEdit = document.getElementById("editTicketBtn");
    const buttonsPencil = document.getElementsByClassName('btn-edit bi-pencil');
    setTimeout(() => {
      const buttonsEditArray = Array.from(buttonsPencil);
      buttonsEditArray.forEach(button => {
        button.addEventListener('click', (event) => {
          const dataId = event.target.dataset.id;
          editModal.style.display = "block";
          console.log(`Атрибут data-id равен ${dataId}`);
        }); //listener
      });
    }, 100);
  }
}
