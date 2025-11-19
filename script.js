document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');
    const closeModal = document.getElementById('closeModal');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let mediaItems = []; // Здесь будут все загруженные медиа
    let currentFilter = 'all';

    // Загружаем контент из JSON
    fetch('./data/content.json')
        .then(response => response.json())
        .then(data => {
            mediaItems = data;
            renderGallery(mediaItems);
            document.querySelector('.loader').style.display = 'none';
        })
        .catch(err => {
            console.error('Ошибка загрузки контента:', err);
            gallery.innerHTML = '<p>Не удалось загрузить контент. Проверь консоль.</p>';
        });

    // Функция рендера галереи
    function renderGallery(items) {
        gallery.innerHTML = '';
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = `gallery-item ${item.type}`;
            itemElement.dataset.type = item.type;

            if (item.type === 'image') {
                itemElement.innerHTML = `<img src="${item.url}" alt="${item.title || 'Фурри арт'}" loading="lazy">`;
            } else if (item.type === 'video') {
                // Используем превью для видео, чтобы не грузить все сразу
                itemElement.innerHTML = `
                    <video muted loop playsinline>
                        <source src="${item.previewUrl || item.url}" type="video/mp4">
                    </video>
                    <div class="video-play-icon">▶</div>
                `;
            }

            itemElement.addEventListener('click', () => openModal(item));
            gallery.appendChild(itemElement);
        });
    }

    // Открытие модального окна
    function openModal(item) {
        if (item.type === 'image') {
            modalImage.src = item.url;
            modalImage.style.display = 'block';
            modalVideo.style.display = 'none';
        } else if (item.type === 'video') {
            modalVideo.innerHTML = `<source src="${item.url}" type="video/mp4">`;
            modalVideo.style.display = 'block';
            modalImage.style.display = 'none';
            modalVideo.play();
        }
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Блокируем скролл
    }

    // Закрытие модального окна
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        modalVideo.pause();
        modalVideo.currentTime = 0;
        document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal.click();
        }
    });

    // Фильтрация
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            currentFilter = filter;

            // Обновляем активную кнопку
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Фильтруем и рендерим
            const filteredItems = filter === 'all'
                ? mediaItems
                : mediaItems.filter(item => item.type === filter);
            renderGallery(filteredItems);
        });
    });

    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal.click();
        }
    });
});