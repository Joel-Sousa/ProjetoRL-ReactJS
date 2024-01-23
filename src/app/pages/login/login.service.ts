import api from '../../../config/api.service';
import Cookies from 'universal-cookie';
import moment from 'moment';
import { Subject } from 'rxjs';
import { LoginType } from '../../types/types';

class Login {

    protected subject = new Subject();
    protected cookies = new Cookies();

    async login(data: LoginType) {

        const resp = await api.post("login", data)
            .then((resp) => {
                if (resp.data.token) {
                    // this.cookies.set('user', JSON.stringify(resp.data.user), { path: '/', expires: moment().add(8, 'hour').toDate() });

                    this.cookies.set('token', JSON.stringify(resp.data.token), { path: '/', expires: moment().add(8, 'hour').toDate() });
                    this.cookies.set('name', JSON.stringify(resp.data.user.user_data.name), { path: '/', expires: moment().add(8, 'hour').toDate() });
                    this.cookies.set('profile', JSON.stringify(resp.data.user.role.name), { path: '/', expires: moment().add(8, 'hour').toDate() });

                    this.observable.setToken(resp.data.token);
                }
                return resp.data;
            }).catch((err) => err.response.data.message);

        return resp;
    }

    async permission() {
        const token = this.cookies.get('token');
        
        if(!!token){
            const resp = await api.get("permission")
            .then((resp) => resp.data)
            .catch((err) => err.response.data.message);
            
            return resp;
        }
    }

    async logout() {

        // this.cookies.remove('user');
        
        this.cookies.remove('token');
        this.cookies.remove('name');
        this.cookies.remove('profile');
        this.observable.clearToken();

        const resp = await api.post("logout")
            .then((resp) => resp.data)
            .catch((err) => err.response.data.message);

        return resp;
    }

    getToken() {
        const token = this.cookies.get('token');
        if (token !== undefined)
            return token;
        return null;
    }

    observable = {
        setToken: (token: string) => this.subject.next(token),
        clearToken: () => this.subject.next(null),
        onToken: () => this.subject.asObservable()
    }

    // isLogged() {
    //     const navigate = useNavigate();
    //     const [isToken, setIsToken] = useState(false);

    //     useEffect(() => {
    //         this.observable.onToken().subscribe((token: unknown) => {
    //             if (token) {
    //                 setIsToken(true);
    //             } else if (token === null) {
    //                 setIsToken(false);
    //                 navigate('/');
    //             }
    //         });

    //         this.observable.setToken(this.getToken())
    //     }, []);

    //     return isToken;
    // }
}

export default new Login();