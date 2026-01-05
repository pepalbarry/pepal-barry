import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../common/Button";
import BackButton from "../common/BackButton";

export default function AdminLayout() {
    const { logout } = useAuth();
    const location = useLocation();

    const navItems = [
        { label: "Orders", path: "/admin/orders" },
        { label: "Products", path: "/admin/products" },
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col md:flex-row md:h-screen md:overflow-hidden">
            <BackButton fallback="/" />
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r border-primary/10 p-6 flex flex-col md:overflow-y-auto">
                <div className="mb-8 mt-16">
                    <h1 className="text-xl font-bold text-heading tracking-tight">
                        PEPAL BARRY <span className="text-primary text-sm font-normal">Admin</span>
                    </h1>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`block px-4 py-2 rounded-xl text-sm font-medium transition-colors ${location.pathname === item.path
                                ? "bg-primary/10 text-primary"
                                : "text-subtle hover:bg-muted"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="pt-6 border-t border-primary/10">
                    <Button variant="outline" className="w-full justify-center" onClick={logout}>
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
