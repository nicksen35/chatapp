import { handleLogout } from "../Auth/auth"

function Logout()
{

    return (
        <>
        <h1> Logout </h1>
        <button onClick={handleLogout()}> Log Out </button> 
        <button> </button>
        </>
    )
}
export default Logout