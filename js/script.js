//Menu burger=======================================================================
let headerBurger = document.querySelector('.header__burger');
let headerMenu = document.querySelector('.header__menu');
let body = document.querySelector('body');
headerBurger.addEventListener('click', () => {
	headerBurger.classList.toggle('active');
	headerMenu.classList.toggle('active');
	body.classList.toggle('lock');
})
//=======================================================================

//Кнопки на превью
let previewButton1 = document.querySelector('.preview__buttons-1');
let previewButton2 = document.querySelector('.preview__buttons-2');

previewButton1.addEventListener('click', () => {
	previewButton2.style.zIndex = 1;
	previewButton1.style.zIndex = 2;
});
previewButton2.addEventListener('click', () => {
	previewButton1.style.zIndex = 1;
	previewButton2.style.zIndex = 2;
});

//Валидация инпута
let subscribe = document.querySelector('.art-world__img')
let email = document.querySelector('input[type="email"]');
let errorSpan = document.querySelector('.span');

let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


email.addEventListener('input', () => {
	if (!reg.test(email.value)) {
		errorSpan.classList.add('error-span');
		errorSpan.textContent = 'Некорректный email-адрес';
		subscribe.style.display = 'none';
		email.style.boxShadow = '0px 0px 30px 2px #f9a38f'
	} else {
		errorSpan.classList.remove('error-span');
		errorSpan.textContent = '';
	}
	if (email.value == 0) {
		errorSpan.classList.remove('error-span');
		email.style.boxShadow = 'none';
		errorSpan.textContent = '';
	}
	if (email.value !== 0 && reg.test(email.value)) {
		email.style.boxShadow = 'inset 0px 0px 5px 2px green';
		subscribe.style.display = 'block';
	}
})

//Спойлеры в футере =====================================================
let footerTitles = document.querySelectorAll('.footer__title-js');
let footerImg = document.querySelectorAll('.footer__spoiler img');
let footerLinksAll = document.querySelectorAll('.footer__links-js');

if (document.documentElement.clientWidth < 992) {
	footerLinksAll.forEach(elem => {
		elem.classList.toggle('footer__spoiler-active');
		if (elem.classList.contains('footer__spoiler-active')) {
			setTimeout(() => {
				elem.style.height = '0';
			}, 200)
		} else {
			elem.style.height = 'auto';
		}
	})
	footerImg.forEach(elem => {
		elem.classList.toggle('footer-img');
	})

	footerTitles.forEach((title) => {
		title.addEventListener('click', (event) => {
			if (event.target.closest('.footer__spoiler')) {
				let nearbyParent = event.target.closest('.footer__column-js');
				let neighbourLinks = nearbyParent.querySelector('.footer__links-js');
				neighbourLinks.classList.toggle('footer__spoiler-active');

				let neighbourImg = nearbyParent.querySelector('.footer__spoiler img');
				neighbourImg.classList.toggle('footer-img');

				if (neighbourLinks.classList.contains('footer__spoiler-active')) {
					setTimeout(() => {
						neighbourLinks.style.height = '0';
					}, 200)
				} else {
					neighbourLinks.style.height = 'auto';
				}
			}
		})
	})
}

//Анимация элементов при прокрутке страницы=======================================================================
let animItems = document.querySelectorAll('.anim-items'); //нужно добавить этот класс html-элементу.

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let i = 0; i < animItems.length; i++) {
			let animItem = animItems[i];
			let animItemHeight = animItem.offsetHeight;
			let animItemOffset = offset(animItem).top;
			let animStart = 4;
			let animItemPoint = window.innerHeight - animItemHeight / animStart;

			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('active');
			} /* else {
				if (!animItems.classList.contains('repeat-anim-items')) //если у элемента есть еще и класс 'repeat-anim-items' вдобавок к 'anim-items', то при пролистывании сайта наверх, будет повторная анимация
					animItem.classList.remove('active');
			} */
		}
	}

	function offset(el) {
		const rect = el.getBoundingClientRect();
		const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}
	animOnScroll();
}

/* Пример кода анимации для SCSS:

transform: translateX(-100%);
opacity: 0;
transition: 1.2s ease-in-out 0s;
&.active {
	opacity: 1;
	transform: translateX(0%);
}

 */
//=======================================================================