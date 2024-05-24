import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = () => {
    const session = getServerSession()
    if(!session){
        redirect("/")
    }
    return (
        <div className="w-full flex items-center justify-center">
            <div className="mx-auto flex items-center flex-col gap-4 my-10">
                <h1 className="text-white text-2xl">Dashboard</h1>
            </div>
        </div>
    );
};

export default Dashboard;
