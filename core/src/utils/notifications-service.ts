import Toastify from 'toastify-js'

export interface ToastOptions {
  duration: number;
}

class NotificationsWrapper {

  htmlToElement(html: string): HTMLElement {
    const template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild as HTMLElement;
  }

  toastHTMLTemplate(title: string, message = ' '): HTMLElement {
    const template = document.createElement('template');
    title = title.trim();
    message = message.trim();
    const hasMessage = message && message !== '';
    const borderClass = hasMessage ? 'with-border' : '';
    template.innerHTML = `<div class="cat-toastify-wrapper">
        <div class="cat-toastify-title-wrapper ${borderClass}">
            <div class="cat-toastify-title">${title}</div></div>
        ${hasMessage ? `<div class="cat-toastify-message">${message}</div>` : ''}
      </div>`;
    return template.content.firstChild as HTMLElement;
  }

  error(title: string, message = ' ', options?: ToastOptions): void {
    Toastify({
      node: this.toastHTMLTemplate(title, message),
      duration: 30000,
      newWindow: true,
      close: true,
      className: 'cat-toastify',
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      onClick: function () {
      } // Callback after click
    }).showToast();
  }

  success(title: string, message = ' ', options?: ToastOptions): void {
    Toastify({
      node: this.toastHTMLTemplate(title, message),
      duration: 3000,
      newWindow: true,
      close: true,
      className: 'cat-toastify',
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      onClick: function () {
      } // Callback after click
    }).showToast();
  }

  info(title: string, message = ' ', options?: ToastOptions): void {
    Toastify({
      node: this.toastHTMLTemplate(title, message),
      duration: 90000,
      newWindow: true,
      close: true,
      className: 'cat-toastify',
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      onClick: function () {
      } // Callback after click
    }).showToast();
  }
}

export const NotificationsService = new NotificationsWrapper();


//   it is easy to just show a toast with title and (optional) text
//
//   there is a way to show  buttons with actions.
//
//     some way of providing a template (dont know how)
//
//   provide html content
//
//   make it configurable and dynamically render them
