document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const galleryContainer = document.getElementById('galleryContainer');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const navBtns = document.querySelectorAll('.nav-btn');
    const contentSections = document.querySelectorAll('.content-section');
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const submitBtn = document.getElementById('submitArt');
    const joinRitualBtn = document.querySelector('.join-ritual-btn');

    // Данные галереи с локальными изображениями
    let galleryData = [
        {
            id: 1,
            type: 'dark',
            url: 'assets/images/dark1.jpg',
            title: 'Дружеская посиделка',
            description: 'Голландский штурвал',
            author: 'MoonHunter',
            date: 'Ночь кровавой луны',
            likes: 128
        },
        {
            id: 2,
            type: 'mystic',
            url: 'assets/images/dark2.jpg',
            title: 'Лесная перепалка',
            description: 'Хуй сосалка',
            author: 'DreamWeaver',
            date: 'Время серебряных снов',
            likes: 95
        },
        {
            id: 3,
            type: 'nocturnal',
            url: 'assets/images/dark3.jpg',
            title: 'Создатель сайта',
            description: 'Это не фейк',
            author: 'ShadowDancer',
            date: 'Сумерки древних',
            likes: 156
        },
        {
            id: 4,
            type: 'dark',
            url: 'assets/images/wolf1.jpg',
            title: 'Посиделка в баре',
            description: 'Это пиздец',
            author: 'NightStalker',
            date: 'Час теней',
            likes: 87
        },
        {
            id: 5,
            type: 'mystic',
            url: 'assets/images/ruini1.jpg',
            title: 'Хранитель руин',
            description: 'Сидит на помойке',
            author: 'RuinKeeper',
            date: 'Эпоха забытия',
            likes: 112
        },
        {
            id: 6,
            type: 'nocturnal',
            url: 'assets/images/luna1.jpg',
            title: 'Лунный призыв',
            description: 'дай бог ей здоровья',
            author: 'MoonCaller',
            date: 'Зов ночи',
            likes: 203
        }
    ];

    let currentFilter = 'all';

    // Инициализация
    init();

    function init() {
        initHoverEffects();
        setupEventListeners();
        setupImageErrorHandling();
        loadGallery();
        startCountdown();

        // Показываем уведомление о загрузке
        setTimeout(() => {
            showMagicAlert('Логово теней пробуждается... 🌑', 'info');
        }, 1000);
    }

    function initHoverEffects() {
        document.addEventListener('mousemove', (e) => {
            const effects = document.querySelectorAll('.effect');
            if (effects[0]) {
                effects[0].style.left = e.clientX + 'px';
                effects[0].style.top = e.clientY + 'px';
                effects[0].style.opacity = '0.3';

                setTimeout(() => {
                    effects[0].style.opacity = '0';
                }, 500);
            }
        });
    }

    function setupImageErrorHandling() {
        document.addEventListener('error', function(e) {
            if (e.target.tagName === 'IMG' && e.target.classList.contains('gallery-img')) {
                console.warn('Ошибка загрузки изображения:', e.target.src);
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMkQyRDJEIi8+CjxwYXRoIGQ9Ik0yMDAgMTIwQzE2MS4zIDEyMCAxMzAgMTUxLjMgMTMwIDE5MEMxMzAgMjI4LjcgMTYxLjMgMjYwIDIwMCAyNjBDMjM4LjcgMjYwIDI3MCAyMjguNyAyNzAgMTkwQzI3MCAxNTEuMyAyMzguNyAxMjAgMjAwIDEyMFoiIGZpbGw9IiM4QjVDRjYiLz4KPHBhdGggZD0iTTE0MCAzMjBIMTYwTDIwMCAyNDBMMjQwIDMyMEgyNjBMMjEwIDIyMEwxOTAgMjIwTDE0MCAzMjBaIiBmaWxsPSIjOEI1Q0Y2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMzUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2Ij7QmNC30LLQtdC90LjRjyDQvdC10L7QutC70Y7Rh9C40LrQuDwvdGV4dD4KPC9zdmc+';
                e.target.alt = 'Изображение не загружено';
            }
        }, true);
    }

    function loadGallery() {
        const filteredData = currentFilter === 'all'
            ? galleryData
            : galleryData.filter(item => item.type === currentFilter);

        renderGallery(filteredData);
    }

    function renderGallery(items) {
        if (items.length === 0) {
            galleryContainer.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 4rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">🌑</div>
                    <h3 style="color: #8b5cf6; margin-bottom: 1rem; font-size: 2rem;">Безмолвие</h3>
                    <p style="font-size: 1.2rem; opacity: 0.8;">Тени еще не проявились... Будь первым, кто призовет видение!</p>
                </div>
            `;
            return;
        }

        galleryContainer.innerHTML = items.map(item => `
            <div class="gallery-item" data-id="${item.id}">
                <img src="${item.url}" alt="${item.title}" class="gallery-img" loading="lazy">
                <div class="item-info">
                    <h4 style="color: #8b5cf6; font-size: 1.3rem; margin-bottom: 0.5rem;">${item.title}</h4>
                    <p style="font-size: 1rem; margin-bottom: 1rem; opacity: 0.9;">${item.description}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; opacity: 0.7;">
                        <span><i class="fas fa-user"></i> ${item.author}</span>
                        <span><i class="fas fa-heart"></i> ${item.likes}</span>
                        <span><i class="fas fa-calendar"></i> ${item.date}</span>
                    </div>
                </div>
            </div>
        `).join('');

        // Добавляем обработчики клика
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                const itemId = parseInt(item.dataset.id);
                const galleryItem = galleryData.find(i => i.id === itemId);
                if (galleryItem) {
                    openModal(galleryItem);
                }
            });
        });
    }

    function openModal(item) {
        modalImage.src = item.url;
        modalImage.alt = item.title;
        modalImage.style.display = 'block';

        // Обновляем информацию в модальном окне
        document.getElementById('modalTitle').textContent = item.title;
        document.getElementById('modalDescription').textContent = item.description;
        document.getElementById('modalAuthor').textContent = `Призвал: ${item.author}`;
        document.getElementById('modalDate').textContent = `В ночь: ${item.date}`;

        // Обновляем количество лайков
        const likeBtn = document.querySelector('.action-btn .fa-heart')?.parentNode;
        if (likeBtn) {
            likeBtn.innerHTML = `<i class="fas fa-heart"></i> ${item.likes}`;
        }

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Добавляем анимацию появления
        modal.style.animation = 'fadeInUp 0.5s ease';
    }

    function setupEventListeners() {
        // Фильтрация
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                currentFilter = filter;

                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                loadGallery();
            });
        });

        // Навигация
        navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const section = btn.dataset.section;

                navBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                contentSections.forEach(s => s.classList.remove('active'));
                const targetSection = document.getElementById(section);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            });
        });

        // Модальное окно
        closeModal.addEventListener('click', closeModalHandler);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModalHandler();
        });

        // Загрузка файлов
        uploadArea.addEventListener('click', () => fileInput.click());

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#8b5cf6';
            uploadArea.style.background = 'rgba(139, 92, 246, 0.15)';
            uploadArea.style.transform = 'scale(1.02)';
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = 'rgba(139, 92, 246, 0.5)';
            uploadArea.style.background = 'rgba(139, 92, 246, 0.05)';
            uploadArea.style.transform = 'scale(1)';
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'rgba(139, 92, 246, 0.5)';
            uploadArea.style.background = 'rgba(139, 92, 246, 0.05)';
            uploadArea.style.transform = 'scale(1)';

            const files = e.dataTransfer.files;
            handleFiles(files);
        });

        fileInput.addEventListener('change', (e) => {
            const files = e.target.files;
            handleFiles(files);
        });

        submitBtn.addEventListener('click', handleArtSubmit);

        if (joinRitualBtn) {
            joinRitualBtn.addEventListener('click', handleJoinRitual);
        }

        // Действия в модальном окне
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const icon = this.querySelector('i');

                if (icon.classList.contains('fa-heart')) {
                    // Анимация лайка
                    this.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 300);
                }
            });
        });

        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModalHandler();
            }
        });
    }

    function closeModalHandler() {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    uploadArea.innerHTML = `
                        <div style="text-align: center;">
                            <img src="${e.target.result}" style="max-width: 200px; max-height: 200px; border-radius: 15px; border: 2px solid #8b5cf6; margin-bottom: 1rem;">
                            <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">${file.name}</p>
                            <small style="color: #10b981;">Видение готово к призыву! ✨</small>
                        </div>
                    `;
                };
                reader.readAsDataURL(file);
            } else {
                showMagicAlert('Только изображения могут быть призваны в наше логово!', 'error');
            }
        }
    }

    function handleArtSubmit() {
        const title = document.getElementById('artTitle').value;
        const category = document.getElementById('artCategory').value;
        const description = document.getElementById('artDescription').value;

        if (!title) {
            showMagicAlert('Твое видение должно иметь имя!', 'warning');
            return;
        }

        // Анимация кнопки
        submitBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            submitBtn.style.transform = 'scale(1)';
        }, 150);

        // Создаем новый элемент галереи
        const newArt = {
            id: galleryData.length + 1,
            type: category,
            url: uploadArea.querySelector('img')?.src || 'assets/images/dark1.jpg',
            title: title,
            description: description || 'Без описания...',
            author: 'Ты',
            date: getCurrentMoonDate(),
            likes: 0
        };

        galleryData.unshift(newArt);

        showMagicAlert(`Видение "${title}" успешно призвано в логово! 🌙\n\nСила твоего искусства пополнила archives теней.`, 'success');

        // Переключаемся на галерею и обновляем
        document.querySelectorAll('.nav-btn').forEach(btn => {
            if (btn.dataset.section === 'gallery') {
                btn.click();
            }
        });

        // Сбрасываем форму
        document.getElementById('artTitle').value = '';
        document.getElementById('artDescription').value = '';
        uploadArea.innerHTML = `
            <div class="upload-icon">
                <i class="fas fa-cloud-upload-alt"></i>
            </div>
            <p>Брось сюда свой свиток с изображением</p>
            <small>Только для посвященных: PNG, JPG, WEBP</small>
        `;
    }

    function getCurrentMoonDate() {
        const phases = ['Новолуние', 'Растущая луна', 'Полнолуние', 'Убывающая луна'];
        const times = ['Полночь', 'Рассвет', 'Закат', 'Сумерки'];
        return `${phases[Math.floor(Math.random() * phases.length)]}, ${times[Math.floor(Math.random() * times.length)]}`;
    }

    function handleJoinRitual() {
        showMagicAlert('Ты присоединился к ритуалу Призыва Теней! 🔮\n\nТвоя энергия усиливает магию логова.', 'success');

        // Анимация кнопки
        joinRitualBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            joinRitualBtn.style.transform = 'scale(1)';
        }, 150);
    }

    function showMagicAlert(message, type = 'info') {
        const alertDiv = document.createElement('div');
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#8b5cf6'
        };

        alertDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(26, 26, 26, 0.95);
            border: 2px solid ${colors[type]};
            border-radius: 15px;
            padding: 1.5rem 2rem;
            color: white;
            z-index: 10000;
            backdrop-filter: blur(20px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
            border-left: 5px solid ${colors[type]};
        `;

        alertDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="font-size: 1.5rem;">
                    ${type === 'success' ? '✨' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : '🔮'}
                </div>
                <div>
                    <div style="font-weight: bold; margin-bottom: 0.5rem; color: ${colors[type]};">${type === 'success' ? 'Успех!' : type === 'error' ? 'Ошибка!' : type === 'warning' ? 'Внимание!' : 'Информация'}</div>
                    <div style="line-height: 1.4;">${message}</div>
                </div>
            </div>
        `;

        document.body.appendChild(alertDiv);

        // Анимация появления
        setTimeout(() => {
            alertDiv.style.transform = 'translateX(0)';
        }, 100);

        // Автоматическое скрытие
        setTimeout(() => {
            alertDiv.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (alertDiv.parentNode) {
                    alertDiv.parentNode.removeChild(alertDiv);
                }
            }, 300);
        }, 5000);
    }

    function startCountdown() {
        const countdownElement = document.querySelector('.countdown');
        if (!countdownElement) return;

        let days = 3;

        const interval = setInterval(() => {
            if (days > 0) {
                days--;
                countdownElement.textContent = `${days} лунную ночь`;

                // Обновляем прогресс
                const progress = document.querySelectorAll('.progress-bar');
                if (progress[1]) {
                    progress[1].style.width = `${85 - (days * 28)}%`;
                }
            } else {
                clearInterval(interval);
                countdownElement.textContent = 'сегодня ночью!';
                showMagicAlert('Ритуал Призыва Теней завершается сегодня! Присоединяйся! 🌕', 'warning');
            }
        }, 5000); // Каждые 5 секунд для демонстрации
    }

    // Добавляем CSS для анимации исчезновения
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }

        .gallery-img {
            transition: transform 0.3s ease;
        }

        .gallery-item:hover .gallery-img {
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(style);
});