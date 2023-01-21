import ErrorMassage from "../errorMessage/ErrorMessage"
import { Link } from "react-router-dom";
const Page404 = () => {
    return (
        <div>
            <div>
                <ErrorMassage />
                <p style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'color': 'white'}}>Page doesn't exist</p>
                <Link style={{ 'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px','color': 'white' }} to="/">Back to main page</Link>
            </div>
        </div>
    )
}

export default Page404;