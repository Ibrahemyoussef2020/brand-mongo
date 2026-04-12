import dbConnect from "@/lib/dbConnect";
import UserModel from "@/lib/models/UserModel";
import UsersTableClient from "./UsersTableClient";
import { dictionaries } from "@/lib/dictionaries";

export const dynamic = 'force-dynamic';

export default async function UsersPage({ params: { locale } }: { params: { locale: 'en' | 'ar' } }) {
    await dbConnect();
    const usersData = await UserModel.find({}).sort({ createdAt: -1 }).lean();
    
    // Serialize MongoDB objects for Client Component
    const users = usersData.map((user: any) => ({
        ...user,
        _id: user._id.toString(),
        createdAt: user.createdAt?.toISOString(),
        updatedAt: user.updatedAt?.toISOString()
    }));

    return (
        <div className="dashboard-page">
            <div className="page-header">
                <h2>{dictionaries.dashboard.pages.usersHeader[locale]}</h2>
            </div>
            <div className="stats-grid" style={{ display: 'block' }}>
                <UsersTableClient users={users} />
            </div>
        </div>
    )
}
