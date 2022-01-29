import React from 'react'
import { UserType } from '../../types/userTypes'
import style from './Users.module.scss'
import loader from './../../assets/img/loader.gif'
import { Link } from 'react-router-dom'

type PropsType = {
    users: Array<UserType>
    errorMsg: string
    loading: boolean
}

const Users:React.FC<PropsType> = ({users,errorMsg, loading}) => {
    return (
        <div className={style.wrapper}>
            <h1>Список пользователей</h1>
            <p className={style.error}>{errorMsg}</p>
            <div className={style.loading}>{loading ? <img src={loader} alt="loader"/> : ''}</div>

            {users.map((user) => {
                return (
                    <div key={user.id} className={style.userItem}>
                        <div>
                            ФИО: <span>{user.name}</span>
                        </div>
                        <div>
                            город: <span>{user.address.city}</span>
                        </div>
                        <div>
                            <div>
                            компания: <span>{user.company.name}</span>
                            </div>
                            <div>
                                <Link to={`user/${user.id}`}>Подробнее</Link>
                            </div>
                        </div>
                    </div>
                )
            })}
            <div className={style.result}>
                Найдено {users.length} пользователей
            </div>
        </div>
    );
};

export default Users;