import React, {useEffect, useState} from 'react'
import {Link, Route, Routes} from 'react-router-dom';
import {SortType, UserType} from "../../types/userTypes";
import axios from "axios";
import Users from "../Users/Users";
import User from "../Users/User";
import style from './App.module.scss'

const App: React.FC = () => {

    const [sort, setSort] = useState<SortType>(null)
    const [users, setUsers] = useState<Array<UserType>>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [errorMsg, setErrorMsg] = useState<string>('')

    useEffect(() => {
        setLoading(true)
        axios.get<Array<UserType>>('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                setLoading(false)
                setUsers(res.data)
            })
            .catch(e => {
                setLoading(false)
                setErrorMsg('Ошибка при загрузке пользователей, попробуйте перезагрузить страницу')
            })
    }, [])

    useEffect(() => {
        if (sort === 'city') {
            setUsers((prevState): Array<UserType> => {
                return [...prevState].sort((a, b) => {
                    if (a.address.city > b.address.city) {
                        return 1;
                    }
                    if (a.address.city < b.address.city) {
                        return -1;
                    }
                    // a должно быть равным b
                    return 0;
                })
            })
        } else if (sort === 'name') {
            setUsers((prevState): Array<UserType> => {
                return [...prevState].sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    // a должно быть равным b
                    return 0;
                })
            })
        } else if (sort === 'company') {
            setUsers((prevState): Array<UserType> => {
                return [...prevState].sort((a, b) => {
                    if (a.company.name > b.company.name) {
                        return 1;
                    }
                    if (a.company.name < b.company.name) {
                        return -1;
                    }
                    // a должно быть равным b
                    return 0;
                })
            })
        } else{
            setUsers((prevState): Array<UserType> => {
                return [...prevState].sort((a, b) => {
                    if (a.id > b.id) {
                        return 1;
                    }
                    if (a.id < b.id) {
                        return -1;
                    }
                    // a должно быть равным b
                    return 0;
                })
            })
        }
    }, [sort])

    function changeSort(type: SortType) {
        if (type !== sort){
            setSort(type)
        }else {
            setSort(null)
        }
    }


    return (
        <div className={style.container}>
            <div className={style.sort}>
                <p>Сортировка</p>
                <button className={sort === 'name' ? 'activeBtn' : ''} onClick={() => changeSort('name')}>по имени</button>
                <button className={sort === 'city' ? 'activeBtn' : ''} onClick={() => changeSort('city')}>по городу</button>
                <button className={sort === 'company' ? 'activeBtn' : ''} onClick={() => changeSort('company')}>по компании</button>
            </div>
            <main className={style.content}>
                <Routes>
                    <Route path="/" element={<Users loading={loading} users={users} errorMsg={errorMsg}/>}/>
                    <Route path="user/:id" element={<User/>}/>
                    <Route path='*'
                           element={<div>404 NOT FOUND <Link to={'/'}>Перейти на главную страницу</Link>  </div>} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
