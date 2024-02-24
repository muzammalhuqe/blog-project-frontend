import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";

const apiURL = import.meta.env.VITE_REST_API_URL;
const Register = () => {
    const toast = useRef(null);

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('value') });
    };

    const defaultValues = {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        confirm_password: '',
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ defaultValues });

    const onSubmit = async (data) => {
        data.email && show();
        console.log(data)
        const response = await fetch(`${apiURL}/authentication/register`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        console.log(response)
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
            <h2 className='text-center mt-[3vh]'>Register</h2>
            <div className="w-[50%] border p-10 mx-auto rounded-3xl shadow">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mx-auto">
                    <Toast ref={toast} />
                    <div className='grid grid-cols-2 gap-5'>
                        <InputController
                            name="first_name"
                            label="First name"
                            requiredLabel="First name is required"
                            type="text"
                        />
                        <InputController
                            name="last_name"
                            label="Last name"
                            requiredLabel="Last name is required"
                            type="text"
                        />
                    </div>
                    <InputController
                        name="username"
                        label="Username"
                        requiredLabel="Username is required"
                        type="text"
                    />
                    <InputController
                        name="email"
                        label="Email"
                        requiredLabel="Email is required"
                        type="email"
                    />
                    <InputController
                        name="password"
                        label="Password"
                        requiredLabel="Password is required"
                        type="password"
                        id="pass"
                    />
                    <InputController
                        name="confirm_password"
                        label="Confirm password"
                        requiredLabel="Confirm password is required"
                        type="password"
                        id="confirm_pass"
                    />
                    <Button label="Submit" type="submit" icon="pi pi-check" />
                </form>
            </div>
        </div>
    )
};

export default Register;