describe('dnd in burger constructor work correctly', function() {
    before(function() {
        cy.visit('http://localhost:3000');
    });

    it('should set bun and other ingredients to target area with dnd', function() {
        // первая булка в списке ингредиентов
        cy.get('[id=ingredient-list_bun]').children().first().as('bun');
        // другой ингредиент (соус)
        cy.get('[id=ingredient-list_sauce]').children().first().as('sauce');
        // другой ингредиент (начинка)
        cy.get('[id=ingredient-list_main]').children().first().as('filling');
        // верхняя целевая зона для булки
        cy.get('[id=constructor-area-top]').as('targetAreaTop');
        // целевая зона для остальных ингредиентов
        cy.get('[id=constructor-area-middle]').as('targetAreaMiddle');
        // нижняя целевая зона для булки
        cy.get('[id=constructor-area-bottom]').as('targetAreaBottom');

        // записываем имена ингредиентов
        let bunName;
        cy.get('@bun').children('a').children('.text_type_main-default').then($el => { bunName = $el.text });
        let sauceName;
        cy.get('@sauce').children('a').children('.text_type_main-default').then($el => { sauceName = $el.text });
        let fillingName;
        cy.get('@filling').children('a').children('.text_type_main-default').then($el => { fillingName = $el.text });

        // используем dnd и кидаем ингредиенты в соотвествующие области
        let dataTransfer = new DataTransfer();
        // булка
        cy.get('@bun').trigger('dragstart', { dataTransfer });
        cy.get('@targetAreaTop').trigger('drop', { dataTransfer });
        // соус
        cy.get('@sauce').trigger('dragstart', { dataTransfer });
        cy.get('@targetAreaMiddle').trigger('drop', { dataTransfer });
        // начинка
        cy.get('@filling').trigger('dragstart', { dataTransfer });
        cy.get('@targetAreaMiddle').trigger('drop', { dataTransfer });
        
        // проверяем, что в верхней целевой зоне появилась наша булка
        cy.get('@targetAreaTop')
            .children()
            .children('.constructor-element__row')
            .children('.constructor-element__text')
            .should($el => expect(bunName).to.eq($el.text));
        // проверяем, что в нижней целевой зоне появилась наша булка
        cy.get('@targetAreaBottom')
            .children()
            .children('.constructor-element__row')
            .children('.constructor-element__text')
            .should($el => expect(bunName).to.eq($el.text));
        // проверяем, что соус появился в целевой зоне
        cy.get('@targetAreaMiddle')
            .children('[class^=other-ingredients_ingredientListContainer__]')
            .children('[class^=other-ingredients_elementListItem]')
            .children('[class^=constructor-element]')
            .children('[class=constructor-element__row]')
            .children('[class=constructor-element__text]')
            .first()
            .should($el => expect(sauceName).to.eq($el.text));
        // проверяем, что начинка появилась в целевой зоне
        cy.get('@targetAreaMiddle')
            .children('[class^=other-ingredients_ingredientListContainer__]')
            .children('[class^=other-ingredients_elementListItem]')
            .eq(1)
            .children('[class^=constructor-element]')
            .children('.constructor-element__row')
            .children('.constructor-element__text')
            .should($el => expect(fillingName).to.eq($el.text));

        // проверяем счетчики
        cy.get('@bun').children('a').children('div').children('.counter').should('contain', '2');
        cy.get('@sauce').children('a').children('div').children('.counter').should('contain', '1');
        cy.get('@filling').children('a').children('div').children('.counter').should('contain', '1');
    });

    it('should open and close modal with ingredient details', function() {
        cy.visit('http://localhost:3000');
        // кликаем по ингредиенту в списке
        cy.get('[id=ingredient-list_bun]').children().first().as('bun');
        let bunName;
        cy.get('@bun').children('a').children('.text_type_main-default').then($el => { bunName = $el.text });
        cy.get('@bun').children('a').click();
        // получаем элемен с модалкой
        cy.get('[class^=ingredient-details_container__]').first().as('modal');
        // проверяем наполнение модалки
        cy.get('@modal').children('[class^=ingredient-details_detailImage__]').should('have.attr', 'src');
        cy.get('@modal').children('[class*=detailIngredientName]').should($el => expect(bunName).to.eq($el.text));
        cy.get('@modal').children('[class*=nutrition-element_nutritionBlock__]').children().should($elements => {
            expect($elements).to.have.length(4);
        });
        // проверяем закрытие модального окна
        cy.get('[class^=modal_modalHeader__]').children('div').click({ force: true });
        cy.get('[id=modals]').children().should($elements => { expect($elements).to.have.length(0)});
    });

    it('should open and close modal with created order details', function() {
        // для проверки функционала оформления заказов сначала залогинимся
        cy.visit('http://localhost:3000/login');
        cy.get('[type=email]').type('test-email@test.ru');
        cy.get('[type=password]').type('12345qwert');
        cy.get('[type=submit]').click();

        // наполняем ингредиентами
        cy.get('[id=ingredient-list_bun]').children().first().as('bun');
        cy.get('[id=ingredient-list_sauce]').children().first().as('sauce');
        cy.get('[id=ingredient-list_main]').children().first().as('filling');
        cy.get('[id=constructor-area-top]').as('targetAreaTop');
        cy.get('[id=constructor-area-middle]').as('targetAreaMiddle');

        let dataTransfer = new DataTransfer();
        cy.get('@bun').trigger('dragstart', { dataTransfer });
        cy.get('@targetAreaTop').trigger('drop', { dataTransfer });
        cy.get('@sauce').trigger('dragstart', { dataTransfer });
        cy.get('@targetAreaMiddle').trigger('drop', { dataTransfer });
        cy.get('@filling').trigger('dragstart', { dataTransfer });
        cy.get('@targetAreaMiddle').trigger('drop', { dataTransfer });

        // кликаем по кнопке Оформить заказ
        cy.get('[id=create-order-button]').click();

        // получаем элемен с модалкой
        cy.get('[class^=order-status_orderStatusContainer__]').first().as('modal');

        // ожидаем оформления заказа
        cy.wait(15000);

        // проверяем, что появился контейнер с номером заказа
        cy.get('@modal').children('p').should('be.visible');
        cy.get('@modal').children('p').should('have.class', 'text_type_digits-large');

        // проверяем закрытие модального окна
        cy.get('[id=close-modal]').click({ force: true });
        cy.get('[id=modals]').children().should($elements => { expect($elements).to.have.length(0)});
    });
});