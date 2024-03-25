import styles from './ingridient-list.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { IngridientPropTypes, IngridientTabPropTypes } from '../../../utils/shared-prop-types';

export default function IngridientList ({ tabData, ingridients }) {
    return (
        <div className={styles.ingridientList}>
            {tabData.map((tab) => (
                <div key={tab.id} className='mt-10 mb-6'>
                    <h2 className={`${styles.header} text_type_main-medium`}>{tab.name}</h2>
                    <div className={styles.ingridientListBlock}>
                        {ingridients.filter(x => x.type === tab.type).map((i)=>(
                            <div key={i._id} className={`${styles.ingridientCard} mr-4 mt-6`}>
                                <div className={styles.imageBox}>
                                    <img src={i.image} className='ml-4' />
                                    <Counter count={1} styles={{zIndex: '3', position: 'absolute'}}/>
                                </div>
                                <div className='mt-1 mb-1'>
                                    <span className={`${styles.ingridientPrice} text_type_digits-default mr-2`}>{i.price}</span>
                                    <CurrencyIcon />
                                </div>
                                <span className='text_type_main-default'>{i.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
} 

IngridientList.propTypes = {
    ingridientList: PropTypes.arrayOf(IngridientPropTypes).isRequired,
    tabData: PropTypes.arrayOf(IngridientTabPropTypes).isRequired
}