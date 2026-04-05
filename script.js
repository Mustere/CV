const dictionary = {
  ru: {
    photoPlaceholder: "PHOTO",
    name: "Дмитрий Масловский",
    location: "📍 Moscow, Russia",
    goalTitle: "🧑‍💻 Профиль инженера",
    goalText:
      "Инженер-разработчик (Embedded / Backend / System Engineer) с практическим опытом разработки микроконтроллерных систем, CRM-модулей и администрирования Linux-систем.",
    skillsTitle: "⚙️ Ключевые навыки",
    embeddedTitle: "📟 Embedded / Электроника",
    embedded1: "STM32 (USB HID, bootloader, отладка устройств)",
    embedded2: "Цифровая схемотехника (триггеры, конечные автоматы, карты Карно)",
    embedded3: "Разработка и анализ логических схем",
    embedded4: "Работа с временными диаграммами",
    programmingTitle: "💻 Программирование",
    programming1: "C / C++ (embedded)",
    programming2: "JavaScript / PHP (Webasyst CRM)",
    programming3: "Работа с базами данных",
    programming4: "UI-разработка (модальные окна, Select2)",
    programming5: "Отладка и анализ ошибок (hardware + software)",
    linuxTitle: "🐧 Linux / Администрирование",
    linux1: "Уверенная работа в Linux (CLI, bash)",
    linux2: "Настройка и администрирование серверов",
    linux3: "SSH, SMB, VNC / RDP",
    linux4: "Развертывание и настройка LAMP",
    linux5: "Хостинг, поддержка сайтов, диагностика сети",
    cadTitle: "🛠 CAD / Дизайн",
    cad1: "SolidWorks, КОМПАС-3D",
    cad2: "Micro-Cap, NI-Multisim",
    cad3: "CorelDRAW (векторная графика, допечатная подготовка)",
    cad4: "Adobe Photoshop (обработка изображений, UI/графика)",
    educationTitle: "🎓 Образование",
    educationText: "Студент, МГТУ им. Н.Э.Баумана, РЛ1 (с 2023 г.)",
    languagesTitle: "🌍 Языки",
    languagesText: "Русский — родной; Английский — B1",
    typingText: "Пользователи берут на себя ответственность за управление своими системами, резервное копирование данных и решение технических проблем."
  },
  en: {
    photoPlaceholder: "PHOTO",
    name: "Dmitry Maslovskiy",
    location: "📍 Moscow, Russia",
    goalTitle: "🧑‍💻 Engineer's profile",
    goalText:
      "Engineer (Embedded / Backend / System Engineer) with hands-on experience in microcontroller systems, CRM module development, and Linux administration.",
    skillsTitle: "⚙️ Key Skills",
    embeddedTitle: "📟 Embedded / Electronics",
    embedded1: "STM32 (USB HID, bootloader, device debugging)",
    embedded2: "Digital circuitry (triggers, finite-state machines, Karnaugh maps)",
    embedded3: "Logic circuit design and analysis",
    embedded4: "Timing diagram analysis",
    programmingTitle: "💻 Programming",
    programming1: "C / C++ (embedded)",
    programming2: "JavaScript / PHP (Webasyst CRM)",
    programming3: "Database work",
    programming4: "UI development (modals, Select2)",
    programming5: "Error debugging and analysis (hardware + software)",
    linuxTitle: "🐧 Linux / Administration",
    linux1: "Confident Linux usage (CLI, bash)",
    linux2: "Server setup and administration",
    linux3: "SSH, SMB, VNC / RDP",
    linux4: "LAMP deployment and configuration",
    linux5: "Website hosting, support, and basic network diagnostics",
    cadTitle: "🛠 CAD / Design",
    cad1: "SolidWorks, КОМПАС-3D",
    cad2: "Micro-Cap, NI-Multisim",
    cad3: "CorelDRAW (vector graphics, prepress preparation)",
    cad4: "Adobe Photoshop (image processing, UI/graphics)",
    educationTitle: "🎓 Education",
    educationText: "Student, Bauman Moscow State Technical University, RL1 (since 2023)",
    languagesTitle: "🌍 Languages",
    languagesText: "Russian — Native; English — B1",
    typingText: "Users accept responsibility for managing their systems, data backups, and technical issues."
  }
};

const typedText = document.getElementById("typed-text");
const langButtons = document.querySelectorAll(".lang-btn");
let currentLang = "en";

function typeLine(text) {
  typedText.textContent = "";
  let i = 0;
  const speed = 17;
  const timer = setInterval(() => {
    typedText.textContent += text[i] ?? "";
    i += 1;
    if (i > text.length) clearInterval(timer);
  }, speed);
}

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dictionary[lang][key]) {
      el.textContent = dictionary[lang][key];
    }
  });

  langButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.lang === lang));
  typeLine(dictionary[lang].typingText);
}

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

setLanguage("ru");

const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
let points = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  points = Array.from({ length: 50 }).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6
  }));
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  points.forEach((p, idx) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(107, 240, 255, 0.8)";
    ctx.fill();

    for (let j = idx + 1; j < points.length; j += 1) {
      const p2 = points[j];
      const dx = p.x - p2.x;
      const dy = p.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(88, 255, 168, ${0.13 - dist / 1200})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(draw);
}

window.addEventListener("resize", resize);
resize();
draw();
