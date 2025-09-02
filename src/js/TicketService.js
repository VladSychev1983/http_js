/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class TicketService {
  list(callback) {
    const xhr = new XMLHttpRequest();
    const url = "http://localhost:7070";
    const path = "method=allTickets";
    const fullUrl = `${url}?${path}`;
    xhr.open("GET", fullUrl, true);
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data_obj = JSON.parse(xhr.responseText);
        callback(data_obj);
        //console.log("Response:", xhr.responseText);
      } else {
        console.error("Error:", xhr.statusText);
      }
    };
    xhr.onerror = function () {
      console.error("Network error occurred.");
    };
    xhr.send();
  }
  get(id, callback) {}

  create(data, callback) {}

  update(id, data, callback) {}

  delete(id, callback) {}
}
