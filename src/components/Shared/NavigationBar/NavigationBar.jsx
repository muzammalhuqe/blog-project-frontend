import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
    const navigate = useNavigate();

    const itemRenderer = (item) => (
        <a className="flex items-center p-menuitem-link"
            onClick={() => navigate(item.path)}
        >
            <span className="mx-2">{item.label}</span>
        </a>
    );
    const items = [
        {
            label: 'Home',
            path: '/',
            template: itemRenderer
        },
    ];

    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height={10} className="mr-2 h-[30px]"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
            {itemRenderer({ label: 'Register', path: '/register' })} {itemRenderer({ label: 'Login', path: '/login' })}
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
        </div>
    );

    return (
        <div>
            <div className="">
                <Menubar model={items} start={start} end={end} />
            </div>
        </div>
    );
};

export default NavigationBar;