document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const header = document.querySelector(".header");

  const revealItems = document.querySelectorAll(
    ".section, .card, .project, .portfolio-item, .blog-card, .interior-card, .technology-feature"
  );

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      alert("Спасибо! Ваша заявка отправлена.");
    });
  }

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 60) {
        header.classList.add("header-scrolled");
      } else {
        header.classList.remove("header-scrolled");
      }
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.12
  });

  revealItems.forEach((item) => {
    item.classList.add("reveal");
    observer.observe(item);
  });

  const currentPage = window.location.pathname.split("/").pop();

  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");

    if (href === currentPage) {
      link.classList.add("active-link");
    }

    if (currentPage === "" && href === "index.html") {
      link.classList.add("active-link");
    }
  });
});

const verdeButton = document.querySelector('.verde-button');
const verdeChat = document.querySelector('.verde-chat');
const verdeClose = document.querySelector('.verde-close');
const verdeInput = document.querySelector('.verde-input input');
const verdeSend = document.querySelector('.verde-input button');
const verdeBody = document.querySelector('.verde-body');
const verdeActionButtons = document.querySelectorAll('.verde-actions button');

let verdeStep = null;
let waitingForContact = false;

if (verdeButton && verdeChat) {
  verdeButton.addEventListener('click', () => {
    verdeChat.style.display = 'block';
  });

  verdeClose.addEventListener('click', () => {
    verdeChat.style.display = 'none';
  });
}

function verdeAnswer(text) {
  const message = document.createElement('div');
  message.className = 'verde-ai-message';
  message.textContent = text;
  verdeBody.appendChild(message);
  verdeBody.scrollTop = verdeBody.scrollHeight;
}

function verdeUser(text) {
  const message = document.createElement('div');
  message.className = 'verde-user-message';
  message.textContent = text;
  verdeBody.appendChild(message);
  verdeBody.scrollTop = verdeBody.scrollHeight;
}

function verdeChoices() {
  const box = document.createElement('div');
  box.className = 'verde-choice-box';

  box.innerHTML = `
    <button type="button">Да, оставить контакты</button>
    <button type="button">Позже</button>
  `;

  verdeBody.appendChild(box);
  verdeBody.scrollTop = verdeBody.scrollHeight;

  box.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      const text = button.textContent.trim();

      verdeUser(text);
      box.remove();

      if (text.includes('Да')) {
        waitingForContact = true;
        verdeAnswer('Отлично. Напишите номер телефона или Telegram для связи.');
      } else {
        verdeAnswer('Хорошо. Я останусь здесь, если захотите продолжить подбор проекта.');
      }
    });
  });
}

function verdeProjectButton(link) {
  const box = document.createElement('div');
  box.className = 'verde-choice-box';

  box.innerHTML = `
    <button type="button">Смотреть проект</button>
  `;

  verdeBody.appendChild(box);
  verdeBody.scrollTop = verdeBody.scrollHeight;

  box.querySelector('button').addEventListener('click', () => {
    window.open(link, '_blank');
  });
}

function verdeRestartButton() {
  const box = document.createElement('div');
  box.className = 'verde-choice-box';

  box.innerHTML = `
    <button type="button">Начать новый подбор</button>
  `;

  verdeBody.appendChild(box);
  verdeBody.scrollTop = verdeBody.scrollHeight;

  box.querySelector('button').addEventListener('click', () => {
    box.remove();

    verdeUser('Начать новый подбор');

    verdeStep = 'family';

    verdeAnswer('С удовольствием. Сколько человек будет постоянно проживать в доме?');
  });
}

function handleVerdeQuestion(question) {
  const q = question.toLowerCase();

  if (waitingForContact) {
    waitingForContact = false;

    verdeAnswer('Спасибо! 🌿 Наш специалист свяжется с вами в ближайшее время.');

    setTimeout(() => {
      verdeRestartButton();
    }, 700);

    return;
  }

  if (verdeStep === 'family') {
    verdeStep = 'plot';

    setTimeout(() => {
      verdeAnswer('Отлично. Какая площадь участка?');
    }, 700);

    return;
  }

  if (verdeStep === 'plot') {
    verdeStep = 'budget';

    verdeAnswer('Понял. Какой бюджет строительства вы рассматриваете?');

    return;
  }

  if (verdeStep === 'budget') {
    verdeStep = null;

    if (question.includes('25') || question.includes('24') || question.includes('30')) {
  verdeAnswer('Рекомендую проект Harmony Residence. Площадь: 280 м². Стоимость: от 24 800 000 ₽.');

  setTimeout(() => {
    verdeProjectButton('projects.html');
  }, 700);

} else if (question.includes('21') || question.includes('22') || question.includes('20')) {
  verdeAnswer('Рекомендую проект Northern Light. Площадь: 240 м². Стоимость: от 21 500 000 ₽.');

  setTimeout(() => {
    verdeProjectButton('projects.html');
  }, 700);

} else if (question.includes('15') || question.includes('13') || question.includes('14')) {
  verdeAnswer('Рекомендую проект Eco Horizon. Площадь: 170 м². Стоимость: от 13 700 000 ₽.');

  setTimeout(() => {
    verdeProjectButton('projects.html');
  }, 700);

} else if (question.includes('12') || question.includes('11') || question.includes('10')) {
  verdeAnswer('Рекомендую проект Forest Residence. Площадь: 140 м². Стоимость: от 11 900 000 ₽.');

  setTimeout(() => {
    verdeProjectButton('projects.html');
  }, 700);

} else {
  verdeAnswer('Я подготовлю индивидуальную рекомендацию проекта под ваши параметры.');
}

    return;
  }

  if (q.includes('стоим') || q.includes('цен') || q.includes('бюджет')) {
    verdeAnswer('Ориентировочная стоимость зависит от площади дома, инженерных систем, отделки и участка.');
  } else if (q.includes('проект') || q.includes('дом')) {
    verdeStep = 'family';
    verdeAnswer('С удовольствием помогу подобрать проект. Сколько человек будет постоянно проживать в доме?');
  } else if (q.includes('технолог')) {
    verdeAnswer('Мы используем энергоэффективные технологии, современные инженерные системы и натуральные материалы.');
  } else {
    verdeAnswer('Расскажите подробнее о доме вашей мечты, и я помогу подобрать оптимальное решение.');
  }
}

if (verdeSend && verdeInput) {
  verdeSend.addEventListener('click', () => {
    const question = verdeInput.value.trim();

    if (!question) return;

    verdeUser(question);
    verdeInput.value = '';

    setTimeout(() => {
      handleVerdeQuestion(question);
    }, 500);
  });
}

verdeActionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const text = button.textContent.trim();

    verdeUser(text);

    setTimeout(() => {
      handleVerdeQuestion(text);
    }, 500);
  });
});