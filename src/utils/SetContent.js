import Spinner from '../resources/img/Spinner';
import ErrorMassage from '../components/errorMessage/ErrorMessage';
import Skeleton from '../components/skeleton/Skeleton';

const SetContent =(process, Component, data)=>{
    switch (process) {
        case 'waiting': 
        return <Skeleton />;
        case 'loading':
            return <Spinner />;
        case 'confirmed':
            return <Component data={data} />;
        case 'error':
            return <ErrorMassage />
        default: throw new Error('Unexpendet process')

    }
}
export default SetContent;