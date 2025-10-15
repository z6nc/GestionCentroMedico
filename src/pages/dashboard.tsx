import { useAtom } from "jotai";
import { UserAtom } from "../store/user.atom";
import { Sidebar } from "../components/layout/Navbar/navbar";
import { Outlet } from "react-router-dom";
export default function Dashboard() {
    const [user] = useAtom(UserAtom);
    return (
        <div className="flex bg-[#f8f8f8] ">
            {user && <Sidebar user={user} />}
            <main className="flex-1  overflow-y-auto">
                <Outlet />
            </main>
        </div>
    )
}