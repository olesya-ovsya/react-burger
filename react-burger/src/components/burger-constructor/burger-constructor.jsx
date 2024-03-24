import React from 'react';
import { CurrencyIcon, ConstructorElement, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import styles from '../burger-constructor/burger-constructor.module.css';
import { getData } from '../../utils/data.js';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';

export default class BurgerConstructor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            hasError: false,
            currentTab: 1,
            tabs: [
                {
                    id: 1,
                    name: 'Булки',
                    type: 'bun'
                },
                {
                    id: 2,
                    name: 'Соусы',
                    type: 'sauce'
                },
                {
                    id: 3,
                    name: 'Основное',
                    type: 'main'
                },
            ]
        };

        this.elementDetailRef = React.createRef();
    };

    componentDidMount() {
        const newData = getData();
        this.setState({...this.state, data: newData, loading: false });
    };

    render() {
        return(
            <div className={styles.constructorBox}>
                <div className={styles.constructor}>
                    <BurgerFormula />
                </div>
            </div>
        );
    };
};

class BurgerFormula extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingridientList: [],
            bun: undefined,
            sum: 0,
            visible: false
        }
    }

    componentDidMount() {
        const ids = [
            '60666c42cc7b410027a1a9b1',
            '60666c42cc7b410027a1a9b5',
            '60666c42cc7b410027a1a9b7',
            '60666c42cc7b410027a1a9bb',
            '60666c42cc7b410027a1a9bf',
            '60666c42cc7b410027a1a9b3',
            '60666c42cc7b410027a1a9be',
            '60666c42cc7b410027a1a9bd',
            '60666c42cc7b410027a1a9bd'];
        const newData = getData().filter(x => ids.includes(x._id));

        const bun = newData.find(x => x.type === 'bun');
        const otherIngridients = newData.filter(x => x.type !== 'bun');
        let sum = bun.price * 2;
        otherIngridients.forEach(x => { sum += x.price });

        this.setState({
            ...this.state,
            bun: newData.find(x => x.type === 'bun'),
            ingridientList: newData.filter(x => x.type !== 'bun'),
            loading: false,
            sum: sum
        });
    };

    toggleIngridientDetailVisible = () => {
        this.setState({
            ...this.state,
            visible: !this.state.visible
        });
    };

    render() {
        return (
            <div className='mt-25 ml-4'>
                {this.state.bun
                    && <ConstructorElement
                        type='top'
                        isLocked={true}
                        text={this.state.bun.name + ' (верх)'}
                        thumbnail={this.state.bun.image_mobile}
                        price={this.state.bun.price}
                        extraClass='ml-8 mb-4' />}
                <div className={styles.ingridientList}>
                    {this.state.ingridientList.map((ingridient) =>
                        <div>
                            <div onClick={this.toggleIngridientDetailVisible} ref={this.elementDetailRef}><DragIcon /></div>
                            <ConstructorElement
                                key = {ingridient._id}
                                text={ingridient.name}
                                thumbnail={ingridient.image_mobile}
                                price={ingridient.price}
                                extraClass='mb-4 ml-2'
                            />
                        </div>
                    )}
                </div>
                {this.state.bun
                    && <ConstructorElement
                        text={this.state.bun.name + ' (низ)'}
                        type='bottom'
                        isLocked={true}
                        thumbnail={this.state.bun.image_mobile}
                        price={this.state.bun.price}
                        extraClass='ml-8 mb-4' />}
                <div className='mt-10'>
                    <span className='text_type_digits-medium mr-2'>{this.state.sum}</span>
                    <CurrencyIcon style={{viewBox: "0 0 48 48"}} />
                    <Button extraClass='ml-10 mr-4'>
                        <span>Оформить заказ</span>
                    </Button>
                </div>
                <ModalOverlay visible={this.state.visible}>
                    <Modal header="Внимание!" onClose={this.handleCloseModal}> 
                        <p>Спасибо за внимание!</p>
                        <p>Открывай меня, если станет скучно</p>
                    </Modal>
                </ModalOverlay>
            </div>
        );
    }
}