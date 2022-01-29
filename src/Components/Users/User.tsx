import React, {useEffect, useState} from 'react';
import {useForm, SubmitHandler} from "react-hook-form";
import {useParams} from 'react-router-dom';
import style from "./Users.module.scss";
import axios from "axios";
import {UserType} from "../../types/userTypes";
import loader from "../../assets/img/loader.gif";
import { Link } from 'react-router-dom';

type Inputs = {
    name: string,
    username: string,
    email: string,
    street: string,
    city: string,
    zipcode: string,
    phone: string,
    website: string,
    comment: string,
};

const User: React.FC = () => {

    let params = useParams();

    const [loading, setLoading] = useState<boolean>(false)
    const [editMode, setEditMode] = useState<boolean>(true)
    const [errorMsg, setErrorMsg] = useState<string>('')


    const {register, handleSubmit, reset, formState: {errors}} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(JSON.stringify(data));


    useEffect(() => {
        setLoading(true)
        axios.get<UserType>('https://jsonplaceholder.typicode.com/users/' + params.id)
            .then(res => {
                setLoading(false)
                reset({
                    name: res.data.name,
                    username: res.data.username,
                    email: res.data.email,
                    street: res.data.address.street,
                    city: res.data.address.city,
                    zipcode: res.data.address.zipcode,
                    phone: res.data.phone,
                    website: res.data.website
                });

            })
            .catch(e => {
                setLoading(false)
                setErrorMsg('Ошибка при загрузке пользоватя, попробуйте перезагрузить страницу')
            })
    }, [reset])


    return (
        <div className={style.wrapper}>
            <div className={style.edit}>
                <h1>Профиль пользователя</h1>
                <button onClick={()=>setEditMode(prevState => !prevState)} >Редактировать</button>
            </div>
            <p className={style.error}>{errorMsg}</p>
            <div className={style.loading}>{loading ? <img src={loader} alt="loader"/> : ''}</div>
            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.inputSection}>
                    Name
                    <input readOnly={editMode}  className={errors.name ? style.errorField : ''}
                           {...register("name", {required: true})}
                    />
                    User name
                    <input readOnly={editMode}
                        className={errors.username ? style.errorField : ''}
                        {...register("username", {required: true})}
                    />
                    E-mail
                    <input readOnly={editMode}
                        className={errors.email ? style.errorField : ''}
                        {...register("email", {required: true, pattern: /^\S+@\S+$/i})}
                    />
                    Street
                    <input readOnly={editMode}
                        className={errors.street ? style.errorField : ''}
                        {...register("street", {required: true})} />
                    City
                    <input readOnly={editMode}
                        className={errors.city ? style.errorField : ''}
                        {...register("city", {required: true})} />
                    Zip code
                    <input readOnly={editMode}
                        className={errors.zipcode ? style.errorField : ''}
                        {...register("zipcode", {required: true})} />
                    Phone
                    <input readOnly={editMode}
                        className={errors.phone ? style.errorField : ''}
                        {...register("phone", {required: true})} />
                    Website
                    <input readOnly={editMode}
                        className={errors.website ? style.errorField : ''}
                        {...register("website", {required: true})} />
                    Comment
                    <textarea readOnly={editMode} {...register("comment")} />
                </div>
                <div className={style.submit}>
                    <Link to={'/'}><button> Закрыть </button></Link>
                    <button disabled={editMode} className={editMode ? style.disables : ''} type="submit">Отправить </button>
                </div>
            </form>
        </div>
    );
};

export default User;