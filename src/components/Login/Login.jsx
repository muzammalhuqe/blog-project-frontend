import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";
const apiURL = import.meta.env.VITE_REST_API_URL;

const Login = () => {
    const toast = useRef(null);
    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('value') });
    };

    const defaultValues = {
        username: '',
        password: '',
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ defaultValues });

    const onSubmit = async (data) => {
        data.username && show();
        console.log(data)
        const bodyData = JSON.stringify(data)
        console.log(bodyData)
        const response = await fetch(`${apiURL}/authentication/login`, {
            // mode: 'no-cors',
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: bodyData
        }).then(res => {
            console.log(res)
        }).catch(error => {
            console.error(error)
        });
        // const resData = await response.json();
        // console.log(resData)
        reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    const InputController = ({ name, label, type, requiredLabel, id }) => {
        return <Controller
            name={name || ''}
            control={control}
            rules={{ required: requiredLabel || 'This field is required' }}
            render={({ field, fieldState }) => (
                <div>
                    <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                    <span className="p-float-label">
                        <InputText id={id || field.name}
                            value={field.value}
                            style={{ width: '100%' }}
                            className={classNames({ 'p-invalid': fieldState.error })}
                            onChange={(e) => field.onChange(e.target.value)}
                            type={type || ''}
                        />
                        <label htmlFor={field.name}>{label}</label>
                    </span>
                    {getFormErrorMessage(field.name)}
                </div>
            )}
        />
    };

    return (
        <div className='mx-auto'>
            <div className="w-[400px] md:w-[600px] mt-[10vh] border mx-auto rounded-2xl shadow-sm">
                <h2 className='text-center mt-[3vh]'>Sign in</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-4 gap-5 mx-auto">
                    <Toast ref={toast} />
                    <InputController
                        name="username"
                        label="Username"
                        requiredLabel="Username is required"
                        type="text"
                    />
                    <InputController
                        name="password"
                        label="Password"
                        requiredLabel="Password is required"
                        type="password"
                        id="pass"
                    />
                    <Button label="Submit" type="submit" icon="pi pi-check" />
                </form>
            </div>
        </div>
    );
};

export default Login;